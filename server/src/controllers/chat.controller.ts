import { Request, Response } from "express";
import {
    generateRAGResponse,
    resolveContextualQuery,
} from "../services/ai.service.js";
import { retrieveKnowledge } from "../services/knowledge.service.js";
import {
    addMessage,
    getConversationHistory,
} from "../services/memory.service.js";
import {
    getPublicRepositories,
    getLatestRepositoryCommits,
} from "../services/github.service.js";

import {
    requiresGitHubData,
    requiresCommitHistory,
} from "../services/github-query.service.js";


const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONVERSATION_ID_LENGTH = 128;

export const chatController = async (
    req: Request,
    res: Response
) => {
    try {
        const { message, conversationId } = req.body;

        if (
            !message ||
            typeof message !== "string" ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        if (
            !conversationId ||
            typeof conversationId !== "string" ||
            !conversationId.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }

        if (
            conversationId.length > MAX_CONVERSATION_ID_LENGTH
        ) {
            return res.status(400).json({
                success: false,
                message: `Conversation ID must not exceed ${MAX_CONVERSATION_ID_LENGTH} characters`,
            });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`,
            });
        }

        const cleanMessage = message.trim();
        const cleanConversationId = conversationId.trim();

        // 1. Get previous conversation history
        const conversationHistory =
            getConversationHistory(cleanConversationId);

        // 2. Resolve contextual references before retrieval
        const resolvedQuery = await resolveContextualQuery(
            cleanMessage,
            conversationHistory
        );

        console.log("Query resolution diagnostics:", {
            originalMessageLength: cleanMessage.length,
            resolvedQueryLength: resolvedQuery.length,
            historyMessages: conversationHistory.length,
        });

        // 3. Retrieve knowledge using the resolved query
        const knowledge = await retrieveKnowledge(resolvedQuery);

        // 4. Retrieve GitHub context only when required
        let githubContext:
            | {
                status: "available";
                repositories: Awaited<
                    ReturnType<typeof getPublicRepositories>
                >;
                commits?: Awaited<
                    ReturnType<typeof getLatestRepositoryCommits>
                >;
            }
            | {
                status: "unavailable";
                message: string;
            }
            | {
                status: "skipped";
                message: string;
            };

        if (requiresGitHubData(resolvedQuery)) {
            try {
                const repositories = await getPublicRepositories();

                const needsCommits =
                    requiresCommitHistory(resolvedQuery);

                let commits: Awaited<
                    ReturnType<typeof getLatestRepositoryCommits>
                > = [];

                if (needsCommits) {
                    const username = process.env.GITHUB_USERNAME;

                    if (!username) {
                        throw new Error(
                            "GITHUB_USERNAME is not configured."
                        );
                    }

                    commits = await getLatestRepositoryCommits(
                        username,
                        "prabhat-ai",
                        3
                    );
                }

                githubContext = {
                    status: "available",
                    repositories,
                    ...(needsCommits ? { commits } : {}),
                };
            } catch (error) {
                console.error("GitHub retrieval failed:", {
                    errorType:
                        error instanceof Error
                            ? error.name
                            : "UnknownError",
                });

                githubContext = {
                    status: "unavailable",
                    message:
                        "GitHub repository or commit data could not be retrieved.",
                };
            }
        } else {
            githubContext = {
                status: "skipped",
                message:
                    "GitHub data was not retrieved because this query does not require it.",
            };
        }

        // 5. Assemble RAG context
        const context = JSON.stringify(
            {
                profile: knowledge.profile,
                results: knowledge.results,
                github: githubContext,
            },
            null,
            2
        );

        console.log("GitHub context diagnostics:", {
            included: context.includes('"github"'),
            status: githubContext.status,
            repositoryCount:
                githubContext.status === "available"
                    ? (githubContext.repositories?.length ?? 0)
                    : 0,
        });

        // 6. Generate response using the original question,
        // retrieved knowledge, and previous conversation history
        const response = await generateRAGResponse(
            cleanMessage,
            context,
            conversationHistory
        );

        // 7. Save user message
        addMessage(cleanConversationId, {
            role: "user",
            content: cleanMessage,
        });

        // 8. Save assistant response
        addMessage(cleanConversationId, {
            role: "assistant",
            content: response,
        });

        return res.status(200).json({
            success: true,
            response,
        });
    } catch (error) {
        console.error("Chat controller failed:", {
            errorType:
                error instanceof Error
                    ? error.name
                    : "UnknownError",
        });

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while processing your message",
        });
    }
};