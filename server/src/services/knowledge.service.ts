import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

import { generateEmbedding } from "./embedding.service.js";
import {
    searchVectors,
    type VectorDocument,
    type VectorSearchResult,
} from "./vector-search.service.js";

type KnowledgeResult = {
    profile: unknown;
    skills: unknown[];
    projects: unknown[];
    learning: unknown[];
};

type SearchableRecord = {
    _id: unknown;
    [key: string]: unknown;
};


function toAIContext(
    results: VectorSearchResult[]
) {
    return results.map(({ id, type, content, similarity }) => ({
        id,
        type,
        content,
        similarity: Number(similarity.toFixed(4)),
    }));
}

async function searchKnowledgeRecords(
    records: SearchableRecord[],
    type: "project" | "skill" | "learning",
    queryVector: number[],
    getContent: (record: SearchableRecord) => string
) {
    const documents: VectorDocument[] = await Promise.all(
        records.map(async (record) => {
            const content = getContent(record);

            return {
                id: String(record._id),
                type,
                content,
                embedding: await generateEmbedding(content, "document"),
            };
        })
    );

    return searchVectors(queryVector, documents, 3, 0);
}

export async function retrieveKnowledge(
    message: string
): Promise<KnowledgeResult> {
    const queryVector = await generateEmbedding(message, "query");

    const [profile, skills, projects, learning] = await Promise.all([
        Profile.findOne().lean(),
        Skill.find().lean(),
        Project.find().lean(),
        Learning.find().lean(),
    ]);

    const skillResults = await searchKnowledgeRecords(
        skills as unknown as SearchableRecord[],
        "skill",
        queryVector,
        (skill) =>
            `${skill.name}. Category: ${skill.category}. Level: ${skill.level}`
    );

    const projectResults = await searchKnowledgeRecords(
        projects as unknown as SearchableRecord[],
        "project",
        queryVector,
        (project) =>
            `${project.title}. ${project.description}. Technologies: ${Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : ""
            }`
    );

    const learningResults = await searchKnowledgeRecords(
        learning as unknown as SearchableRecord[],
        "learning",
        queryVector,
        (item) =>
            `${item.topic}. ${item.description}. Status: ${item.status}. Progress: ${item.progress}%`
    );


    return {
        profile,
        skills: toAIContext(skillResults),
        projects: toAIContext(projectResults),
        learning: toAIContext(learningResults),
    };
}