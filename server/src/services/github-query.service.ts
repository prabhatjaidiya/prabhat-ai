const GITHUB_QUERY_PATTERN =
    /\b(github|git hub|repositories|repository|repos|repo|stars?|stargazers?|forks?|branches|commits?|pull requests?|issues|contributors|topics|releases?|workflow runs|readme|last updated|latest update|public repos?|pushed)\b/i;

export function requiresGitHubData(query: string): boolean {
    return GITHUB_QUERY_PATTERN.test(query);
}