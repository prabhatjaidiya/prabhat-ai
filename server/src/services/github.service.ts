export interface GitHubRepository {
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
    topics: string[];
}

interface GitHubApiRepository {
    name: string;
    full_name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
    topics?: string[];
    private: boolean;
}

export async function getPublicRepositories(): Promise<GitHubRepository[]> {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
        throw new Error("GITHUB_USERNAME is not configured.");
    }

    const repositories: GitHubRepository[] = [];
    const perPage = 100;

    for (let page = 1; ; page++) {
        const url = new URL(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos`
        );

        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("page", String(page));
        url.searchParams.set("sort", "updated");

        const response = await fetch(url, {
            headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "Prabhat-AI",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) {
            throw new Error(
                `GitHub API request failed with status ${response.status}.`
            );
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Unexpected response from GitHub API.");
        }

        const pageRepositories = data as GitHubApiRepository[];

        for (const repo of pageRepositories) {
            if (
                !repo ||
                typeof repo.name !== "string" ||
                typeof repo.full_name !== "string" ||
                typeof repo.html_url !== "string" ||
                typeof repo.updated_at !== "string" ||
                typeof repo.stargazers_count !== "number" ||
                typeof repo.private !== "boolean"
            ) {
                throw new Error("Invalid repository data from GitHub API.");
            }

            if (repo.private) continue;

            repositories.push({
                name: repo.name,
                full_name: repo.full_name,
                description: repo.description ?? null,
                language: repo.language ?? null,
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                updated_at: repo.updated_at,
                topics: Array.isArray(repo.topics)
                    ? repo.topics.filter(
                          (topic): topic is string =>
                              typeof topic === "string"
                      )
                    : [],
            });
        }

        if (pageRepositories.length < perPage) break;
    }

    return repositories;
}