import { requiresGitHubData } from "../src/services/github-query.service.js";

const githubQueries = [
    "Show me my GitHub repositories",
    "How many stars do my repos have?",
    "When was my latest repository updated?",
    "Show repository branches",
    "What issues are open in my repository?",
];

for (const query of githubQueries) {
    if (!requiresGitHubData(query)) {
        throw new Error(`Expected GitHub query to match: ${query}`);
    }
}

const generalQueries = [
    "Explain React hooks",
    "What skills have I learned?",
    "Describe my portfolio projects",
    "How does my RAG pipeline work?",
];

for (const query of generalQueries) {
    if (requiresGitHubData(query)) {
        throw new Error(`Expected general query not to match: ${query}`);
    }
}

console.log("All GitHub query detection tests passed.");