import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

import { generateEmbedding } from "./embedding.service.js";
import {
    searchVectors,
    type VectorDocument,
} from "./vector-search.service.js";

const MIN_RELEVANCE_SCORE = Number(
    process.env.RAG_MIN_RELEVANCE_SCORE || "0.7"
);

type KnowledgeResult = {
    profile: unknown;
    results: {
        id: string;
        type: "project" | "skill" | "learning";
        content: string;
        similarity: number;
    }[];
    hasRelevantKnowledge: boolean;
};

type SearchableRecord = {
    _id: unknown;
    [key: string]: unknown;
};

function toAIContext(
    results: ReturnType<typeof searchVectors>
) {
    return results.map(
        ({ id, type, content, similarity }) => ({
            id,
            type,
            content,
            similarity: Number(
                similarity.toFixed(4)
            ),
        })
    );
}

function isProjectListQuery(
    message: string
): boolean {
    const normalizedMessage =
        message.toLowerCase();

    const mentionsProjects =
        /\bprojects?\b/.test(
            normalizedMessage
        );

    const asksForList =
        /\b(all|every|list|which|what|tell me about|show me)\b/.test(
            normalizedMessage
        );

    const asksWhatBuilt =
        /\b(worked on|built|developed|created|made)\b/.test(
            normalizedMessage
        );

    return (
        mentionsProjects &&
        (asksForList || asksWhatBuilt)
    );
}

export async function retrieveKnowledge(
    message: string
): Promise<KnowledgeResult> {

    /*
     * ------------------------------------------------
     * PROJECT LIST / EXHAUSTIVE RETRIEVAL
     * ------------------------------------------------
     *
     * For questions asking for all projects,
     * do not use semantic Top-K retrieval.
     *
     * Retrieve every project directly from MongoDB.
     */
    if (isProjectListQuery(message)) {
        const [profile, projects] =
            await Promise.all([
                Profile.findOne().lean(),
                Project.find().lean(),
            ]);

        const results = projects.map(
            (project) => ({
                id: String(project._id),
                type: "project" as const,
                content:
                    `${project.title}. ` +
                    `${project.description}. ` +
                    `Technologies: ${
                        Array.isArray(
                            project.technologies
                        )
                            ? project.technologies.join(
                                  ", "
                              )
                            : ""
                    }`,
                similarity: 1,
            })
        );

        return {
            profile,
            results,
            hasRelevantKnowledge:
                results.length > 0,
        };
    }

    /*
     * ------------------------------------------------
     * NORMAL SEMANTIC RAG RETRIEVAL
     * ------------------------------------------------
     */

    // 1. Convert user question into query embedding
    const queryVector =
        await generateEmbedding(
            message,
            "query"
        );

    // 2. Load knowledge
    const [
        profile,
        skills,
        projects,
        learning,
    ] = await Promise.all([
        Profile.findOne().lean(),
        Skill.find().lean(),
        Project.find().lean(),
        Learning.find().lean(),
    ]);

    const documents: VectorDocument[] = [];

    // 3. Prepare skill documents
    for (
        const skill of
        skills as unknown as SearchableRecord[]
    ) {
        const content =
            `${skill.name}. ` +
            `Category: ${skill.category}. ` +
            `Level: ${skill.level}`;

        documents.push({
            id: String(skill._id),
            type: "skill",
            content,
            embedding:
                await generateEmbedding(
                    content,
                    "document"
                ),
        });
    }

    // 4. Prepare project documents
    for (
        const project of
        projects as unknown as SearchableRecord[]
    ) {
        const content =
            `${project.title}. ` +
            `${project.description}. ` +
            `Technologies: ${
                Array.isArray(
                    project.technologies
                )
                    ? project.technologies.join(
                          ", "
                      )
                    : ""
            }`;

        documents.push({
            id: String(project._id),
            type: "project",
            content,
            embedding:
                await generateEmbedding(
                    content,
                    "document"
                ),
        });
    }

    // 5. Prepare learning documents
    for (
        const item of
        learning as unknown as SearchableRecord[]
    ) {
        const content =
            `${item.topic}. ` +
            `${item.description}. ` +
            `Status: ${item.status}. ` +
            `Progress: ${item.progress}%`;

        documents.push({
            id: String(item._id),
            type: "learning",
            content,
            embedding:
                await generateEmbedding(
                    content,
                    "document"
                ),
        });
    }

    // 6. Semantic vector search
    const searchResults =
        searchVectors(
            queryVector,
            documents,
            3,
            MIN_RELEVANCE_SCORE
        );

    // 7. Prepare AI-safe context
    const results =
        toAIContext(searchResults);

    return {
        profile,
        results,
        hasRelevantKnowledge:
            results.length > 0,
    };
}