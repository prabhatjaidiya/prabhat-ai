import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const embeddingModel: string = process.env.GEMINI_EMBEDDING_MODEL
    || "gemini-embedding-001";

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

if (!embeddingModel) {
    throw new Error(
        "GEMINI_EMBEDDING_MODEL is missing from environment variables."
    );
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates an embedding for a document or a user query.
 *
 * Use "document" for knowledge being stored.
 * Use "query" for a user's search question.
 */
export async function generateEmbedding(
    text: string,
    type: "document" | "query" = "document"
): Promise<number[]> {
    const normalizedText = text.trim();

    if (!normalizedText) {
        throw new Error("Text cannot be empty when generating an embedding.");
    }

    try {
        const response = await ai.models.embedContent({
            model: embeddingModel,
            contents: normalizedText,
            config: {
                taskType:
                    type === "query" ? "RETRIEVAL_QUERY" : "RETRIEVAL_DOCUMENT",
            },
        });

        const values = response.embeddings?.[0]?.values;

        if (!values || values.length === 0) {
            throw new Error("The embedding API returned an empty vector.");
        }

        return values;
    } catch (error) {
        console.error("Embedding generation failed:", error);
        throw error;
    }
}