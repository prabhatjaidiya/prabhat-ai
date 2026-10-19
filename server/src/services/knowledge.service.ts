import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

import { generateEmbedding } from "./embedding.service.js";
import {
    searchVectors,
    type VectorDocument,
} from "./vector-search.service.js";
import { getLatestRepositoryCommits } from "./github.service.js";

const MIN_RELEVANCE_SCORE = Number(
    process.env.RAG_MIN_RELEVANCE_SCORE || "0.68"
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

function isProjectListQuery(message: string): boolean {
    const normalizedMessage = message.toLowerCase().trim();

    const explicitListRequest =
        /\b(all|every|list all|show all|give me all)\b/.test(
            normalizedMessage
        );

    const broadProjectRequest =
        /\b(what projects has|what projects have|which projects has|which projects have)\b/.test(
            normalizedMessage
        );

    const asksForProjectOverview =
        /\b(tell me about|describe|overview of|summary of|summari[sz]e|give me an overview of)\b/.test(
            normalizedMessage
        ) &&
        /\bprojects\b/.test(normalizedMessage);

    const asksForProjectTechnologies =
        /\bprojects\b/.test(normalizedMessage) &&
        /\b(technologies|tech stacks?|technology stack|tools used)\b/.test(
            normalizedMessage
        );

    return (
        /\bprojects?\b/.test(normalizedMessage) &&
        (
            explicitListRequest ||
            broadProjectRequest ||
            asksForProjectOverview ||
            asksForProjectTechnologies
        )
    );
}

function isLearningRoadmapListQuery(message: string): boolean {
    const normalizedMessage = message.toLowerCase().trim();

    const mentionsLearning =
        /\b(learning|roadmaps?|learning paths?|progress|journey|what have i learned|what has prabhat learned)\b/.test(
            normalizedMessage
        );

    const asksForOverview =
        /\b(all|every|overall|combined|each|both|current|currently|status|progress|journey|complete|completed|next steps|what comes next)\b/.test(
            normalizedMessage
        );

    const mentionsMultipleTracks =
        /\b(shopsphere|prabhat ai|node\.?js|mern|projects|tracks|roadmaps?)\b/.test(
            normalizedMessage
        );

    return (
        (mentionsLearning && asksForOverview) ||
        (asksForOverview && mentionsMultipleTracks)
    );
}

function getProjectNameFromQuery(
    message: string,
    projectTitles: string[]
): string | undefined {
    const normalizedMessage = message.toLowerCase();

    return projectTitles.find((title) =>
        normalizedMessage.includes(title.toLowerCase())
    );
}

function isGitHubCommitQuery(message: string): boolean {
    return (
        /\b(commit|commits|commit history|recent changes|latest changes)\b/i.test(
            message
        ) &&
        /\b(github|git hub|repository|repo|prabhat ai)\b/i.test(
            message
        )
    );
}

async function retrieveGitHubCommitKnowledge(
    message: string
): Promise<KnowledgeResult | null> {
    if (!isGitHubCommitQuery(message)) {
        return null;
    }

    const profile = await Profile.findOne().lean();

    const commits = await getLatestRepositoryCommits(
        "prabhatjaidiya",
        "prabhat-ai",
        3
    );

    const results = commits.map((commit) => ({
        id: commit.sha,
        type: "project" as const,
        content: [
            `GitHub commit: ${commit.message}`,
            `Author: ${commit.author}`,
            `Date: ${commit.date || "Not provided"}`,
            `Commit URL: ${commit.html_url}`,
        ].join("\n"),
        similarity: 1,
    }));

    return {
        profile,
        results,
        hasRelevantKnowledge: results.length > 0,
    };
}

export async function retrieveKnowledge(
    message: string
): Promise<KnowledgeResult> {

    const githubCommitKnowledge =
        await retrieveGitHubCommitKnowledge(message);

    if (githubCommitKnowledge) {
        return githubCommitKnowledge;
    }

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
                    `Technologies: ${Array.isArray(project.technologies)
                        ? project.technologies.join(", ")
                        : ""}. ` +
                    `GitHub repository: ${project.githubUrl || "Not provided"}. ` +
                    `Live demo: ${project.liveUrl || "Not provided"}`,
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
     * LEARNING ROADMAP LIST / EXHAUSTIVE RETRIEVAL
     * ------------------------------------------------
     */
    if (isLearningRoadmapListQuery(message)) {
        const [profile, learning] = await Promise.all([
            Profile.findOne().lean(),
            Learning.find().lean(),
        ]);

        const results = learning.map((item) => ({
            id: String(item._id),
            type: "learning" as const,
            content:
                `${item.topic}. ` +
                `${item.description}. ` +
                `Status: ${item.status}. ` +
                `Progress: ${item.progress}%`,
            similarity: 1,
        }));

        return {
            profile,
            results,
            hasRelevantKnowledge: results.length > 0,
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
            `Technologies: ${Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : ""}. ` +
            `GitHub repository: ${typeof project.githubUrl === "string"
                ? project.githubUrl
                : "Not provided"}. ` +
            `Live demo: ${typeof project.liveUrl === "string"
                ? project.liveUrl
                : "Not provided"}`;

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



    // 6. Detect explicit project-specific questions
    const projectName = getProjectNameFromQuery(
        message,
        projects.map((project) => project.title)
    );

    const normalizedProjectName =
        projectName?.toLowerCase();

    const relevantDocuments = projectName
        ? documents.filter((document) => {
            const normalizedContent =
                document.content.toLowerCase();

            if (document.type === "project") {
                return normalizedContent.startsWith(
                    normalizedProjectName + "."
                );
            }

            if (document.type === "learning") {
                return normalizedContent.startsWith(
                    normalizedProjectName + "."
                );
            }

            return false;
        })
        : documents;

    // 7. Semantic vector search
    const searchResults = searchVectors(
        queryVector,
        relevantDocuments,
        3,
        MIN_RELEVANCE_SCORE
    );

    // 7. Prepare AI-safe context
    const results = toAIContext(searchResults);

    return {
        profile,
        results,
        hasRelevantKnowledge: results.some(
            (result) => result.similarity >= 0.72
        ),
    };
}