import axios from "axios";
import dotenv from "dotenv";
import { saveJSON } from "./utils.js";

dotenv.config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "github-rpg-dashboard",
};

if (token) {
  headers.Authorization = `Bearer ${token}`;
}

async function getUser() {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers }
  );

  return data;
}

async function getRepos() {
  let repos = [];
  let page = 1;

  while (true) {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers,
        params: {
          per_page: 100,
          page,
        },
      }
    );

    if (data.length === 0) break;

    repos.push(...data);
    page++;
  }

  return repos;
}

function calculateRepositoryStats(repos) {
  const stats = {
    total: repos.length,
    stars: 0,
    forks: 0,
    watchers: 0,
    openIssues: 0,
    size: 0,
    languages: {},
  };

  for (const repo of repos) {
    stats.stars += repo.stargazers_count;
    stats.forks += repo.forks_count;
    stats.watchers += repo.watchers_count;
    stats.openIssues += repo.open_issues_count;
    stats.size += repo.size;

    if (repo.language) {
      stats.languages[repo.language] =
        (stats.languages[repo.language] || 0) + 1;
    }
  }

  return stats;
}

async function main() {
  console.log("Fetching GitHub data...");

  const user = await getUser();
  const repos = await getRepos();

  const repositoryStats = calculateRepositoryStats(repos);

  saveJSON("data/stats.json", {
    generatedAt: new Date().toISOString(),

    user: {
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      company: user.company,
      location: user.location,
      blog: user.blog,
      twitter: user.twitter_username,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    },

    repositories: repositoryStats,
  });

  console.log("✓ data/stats.json updated");
}

main().catch((err) => {
  console.error(err.response?.data || err.message);
});
