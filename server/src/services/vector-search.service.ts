export type VectorDocument = {
    id: string;
    type: "project" | "skill" | "learning";
    content: string;
    embedding: number[];
};

export type VectorSearchResult = VectorDocument & {
    similarity: number;
};

function cosineSimilarity(
    a: number[],
    b: number[]
): number {
    if (a.length !== b.length) {
        throw new Error("Vectors must have the same dimensions.");
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }

    if (magnitudeA === 0 || magnitudeB === 0) {
        throw new Error(
            "Cosine similarity is undefined for zero vectors."
        );
    }

    return dotProduct / (
        Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)
    );
}

export function searchVectors(
    queryVector: number[],
    documents: VectorDocument[],
    topK = 3,
    threshold = 0
): VectorSearchResult[] {
    if (!Number.isInteger(topK) || topK < 1) {
        throw new Error("topK must be a positive integer.");
    }

    if (queryVector.length === 0) {
        throw new Error("Query vector cannot be empty.");
    }

    return documents
        .map((document) => ({
            ...document,
            similarity: cosineSimilarity(
                queryVector,
                document.embedding
            ),
        }))
        .filter((result) => result.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}