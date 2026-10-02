
import "dotenv/config";
import { generateEmbedding } from "./src/services/embedding.service";

function cosineSimilarity(a: number[], b: number[]): number {
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
        throw new Error("Cosine similarity is undefined for zero vectors.");
    }

    return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

async function main() {
    const documents = [
        "Prabhat is building ShopSphere, a full-stack e-commerce platform.",
        "Prabhat is learning Node.js and the MERN stack.",
        "Prabhat has built a full-stack Job Tracker application.",
    ];

    const question =
        "Which online shopping platform is Prabhat developing?";

    // Embed the question using the query task type.
    const queryVector = await generateEmbedding(question, "query");

    console.log("Question:", question);
    console.log("\nSimilarity results:");

    const results = [];

    for (const document of documents) {
        const documentVector = await generateEmbedding(document, "document");

        const similarity = cosineSimilarity(queryVector, documentVector);

        results.push({ document, similarity });
    }

    results.sort((a, b) => b.similarity - a.similarity);

    for (const result of results) {
        console.log(
            `${result.similarity.toFixed(4)} | ${result.document}`
        );
    }

    console.log("\nSimilarity test completed.");
}

main().catch((error) => {
    console.error("Similarity test failed:", error);
    process.exitCode = 1;
});