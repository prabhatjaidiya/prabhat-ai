const GITHUB_QUERY_PATTERN =
    /\b(github|git hub|repositories|repository|repos|repo|stars?|stargazers?|forks?|branches|commits?|pull requests?|issues|contributors|topics|releases?|workflow runs|readme|last updated|latest update|public repos?|pushed)\b/i;

export function requiresGitHubData(query: string): boolean {
    return GITHUB_QUERY_PATTERN.test(query);
}

const COMMIT_HISTORY_PATTERN =
    /\b(commits?|commit history|recent changes|latest changes|recent commits|latest commits|last commits|who committed|commit messages)\b/i;

export function requiresCommitHistory(query: string): boolean {
    return COMMIT_HISTORY_PATTERN.test(query);
}