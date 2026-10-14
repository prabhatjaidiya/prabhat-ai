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
import { getPublicRepositories } from "../services/github.service.js";

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

        const cleanMessage = message.trim();
        const cleanConversationId = conversationId.trim();

        // 1. Get previous conversation history
        const conversationHistory =
            getConversationHistory(cleanConversationId);

        console.log("Conversation history:", conversationHistory);

        // 2. Resolve contextual references before retrieval
        const resolvedQuery = await resolveContextualQuery(
            cleanMessage,
            conversationHistory
        );

        console.log("Query resolution diagnostics:", {
            originalQuestion: cleanMessage,
            resolvedQuery,
        });

        // 3. Retrieve knowledge using the resolved query
        const knowledge = await retrieveKnowledge(resolvedQuery);

        // 4. Retrieve GitHub repository context
        let githubContext;

        try {
            const repositories = await getPublicRepositories();

            githubContext = {
                status: "available",
                repositories,
            };
        } catch (error) {
            console.error("GitHub retrieval error:", error);

            githubContext = {
                status: "unavailable",
                message:
                    "GitHub repository data could not be retrieved.",
            };
        }

        console.log("Retrieved knowledge:", knowledge);

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
        console.error("Chat controller error:", error);

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while processing your message",
        });
    }
};