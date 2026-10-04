import { generateEmbedding } from "./embedding.service";
import {
    searchVectors,
    VectorDocument,
} from "./vector-search.service";
import { formatKnowledgeContext } from "./context.service";
import { generateRAGResponse } from "./ai.service";

export async function runRAGPipeline(
    question: string,
    documents: VectorDocument[]
): Promise<string> {
    if (!question.trim()) {
        throw new Error("Question cannot be empty.");
    }

    // 1. Convert the user's question into an embedding
    const queryVector = await generateEmbedding(
        question,
        "query"
    );

    // 2. Search for the most relevant knowledge
    const searchResults = searchVectors(
        queryVector,
        documents,
        3
    );

    // 3. Convert retrieved knowledge into readable context
    const context = formatKnowledgeContext(searchResults);

    // 4. Send question + context to Gemini
    const response = await generateRAGResponse(
        question,
        context
    );

    return response;
}