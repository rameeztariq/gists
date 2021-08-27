import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({     
    auth: "AUTHENTICATION_TOKEN",
});

export const getPublicGists = () => octokit.gists.listPublic()
export const getGistForUser = username =>  octokit.gists.listForUser({ username });