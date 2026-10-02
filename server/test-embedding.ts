
import "dotenv/config";
import { generateEmbedding } from "./src/services/embedding.service";

async function main() {
  const document =
    "Prabhat is building ShopSphere, a full-stack e-commerce platform.";

  const query =
    "Which online shopping platform is Prabhat developing?";

  const documentVector = await generateEmbedding(document, "document");
  const queryVector = await generateEmbedding(query, "query");

  console.log("Embedding service test successful.");
  console.log("Document vector dimensions:", documentVector.length);
  console.log("Query vector dimensions:", queryVector.length);
  console.log("Document vector sample:", documentVector.slice(0, 5));
  console.log("Query vector sample:", queryVector.slice(0, 5));
}

main().catch((error) => {
  console.error("Test failed:", error);
  process.exitCode = 1;
});