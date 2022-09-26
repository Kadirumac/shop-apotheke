export interface GithubRepo {
    id: string,
    owner: Owner,
    name: string,
    created_at: string,
    description: string,
    html_url: string,
    homepage: string,
    stargazers_count: string,
}

interface Owner {
    avatar_url: string
}