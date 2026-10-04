import { generateEmbedding } from "./embedding.service";
import {
    searchVectors,
    VectorDocument,
    VectorSearchResult,
} from "./vector-search.service";

export async function retrieveRelevantKnowledge(
    question: string,
    documents: VectorDocument[],
    topK = 3
): Promise<VectorSearchResult[]> {
    if (!question.trim()) {
        throw new Error("Question cannot be empty.");
    }

    // 1. Convert user's question into an embedding
    const queryVector = await generateEmbedding(question, "query");

    // 2. Search stored knowledge using the query embedding
    const results = searchVectors(
        queryVector,
        documents,
        topK
    );

    // 3. Return the most relevant knowledge
    return results;
}