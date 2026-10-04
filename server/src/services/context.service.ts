import { VectorSearchResult } from "./vector-search.service";

export function formatKnowledgeContext(
    results: VectorSearchResult[]
): string {
    if (results.length === 0) {
        return "No relevant knowledge was found.";
    }

    const knowledge = results
        .map((result, index) => {
            return `${index + 1}. ${result.content}`;
        })
        .join("\n");

    return `Relevant Knowledge:\n\n${knowledge}`;
}