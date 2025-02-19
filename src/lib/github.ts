import axios from 'axios';
import { aiSummariseCommit } from '~/lib/gemini';
import { db } from '~/server/db'; // Assuming you have a db module for database operations

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

if (!BASE_URL) {
  throw new Error('Base URL is not defined');
}

// const summariseCommit = async (owner: string, repo: string, commithash: string) => {
//   try {
//     const response = await axios.get(`https://github.com/${owner}/${repo}/commit/${commithash}.diff`, {
     
//     });
    
//     const summary = await aiSummariseCommit(response.data);
//     return summary || "";
//   } catch (error) {
//     console.log(error)
//     return ""
    
//   }
   
// };
const summariseCommit = async (owner: string, repo: string, commithash: string) => {
  try {
    const response = await axios.get(`https://github.com/${owner}/${repo}/commit/${commithash}.diff`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Use your GitHub token
      },
    });    const summary = await aiSummariseCommit(response.data);
    return summary || "";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error('Error fetching data:', error);
    }
    return "";
  }
};

const fetchProjectUrl = async (projectId: string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        githubUrl: true,
      },
    });
    if (!project?.githubUrl) {
      throw new Error('No github url');
    }
    return { project: project, githubUrl: project.githubUrl };
  } catch (error) {
    console.error('Error fetching project URL:', JSON.stringify(error, null, 2));
    throw new Error('Failed to fetch project URL');
  }
};

const getCommitsHashes = async (owner: string, repo: string) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Use your GitHub token
      },
    });
    const sortedCommits = response.data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());
    const rCommits = sortedCommits.slice(0, 15).map((commit: any) => ({
      commitHash: commit.sha as string,
      commitMessage: commit.commit.message ?? '',
      commitAuthorName: commit.commit.author.name ?? "",
      commitAuthorAvatar: commit.author.avatar_url ?? "",
      commitDate: commit.commit.author.date ?? "",
    }));
    return rCommits;
  } catch (error) {
    console.error('Error fetching commit hashes:', JSON.stringify(error, null, 2));
    throw new Error('Failed to fetch commit hashes');
  }
};

const filterUnprocessedCommits = async (projectId: string, commitHashes: any[]) => {
  try {
    const processedCommits = await db.commit.findMany({
      where: { projectId },
    });
    const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));
    return unprocessedCommits;
  } catch (error) {
    console.error('Error filtering unprocessed commits:', JSON.stringify(error, null, 2));
    throw new Error('Failed to filter unprocessed commits');
  }
};

const extractOwnerAndRepo = (githubUrl: string): { owner: string, repo: string } => {
  const urlParts = githubUrl.split('/');
  const owner = urlParts[urlParts.length - 2];
  const repo = urlParts[urlParts.length - 1];
  return { owner, repo };
};

export const pollCommits = async (projectId: string) => {
  try {
    const { project, githubUrl } = await fetchProjectUrl(projectId);
    const { owner, repo } = extractOwnerAndRepo(githubUrl);
    const commitHashes = await getCommitsHashes(owner, repo);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    const summaryResponses = await Promise.allSettled(unprocessedCommits.map(commit => {
      return summariseCommit(owner, repo, commit.commitHash);
    }));
    const summaries = summaryResponses.map((response, index) => {
      if (response.status === 'fulfilled') {
        console.log('Summary fulfilled:', response.value);
        return {
          projectId: projectId,
          commitHash: unprocessedCommits[index]!.commitHash,
          commitMessage: unprocessedCommits[index]!.commitMessage,
          commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
          commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
          commitDate: unprocessedCommits[index]!.commitDate,
          summary: response.value as string,
        };
      }
      console.log('Summary rejected:', response.reason);
      return {
        projectId: projectId,
        commitHash: unprocessedCommits[index]!.commitHash,
        commitMessage: unprocessedCommits[index]!.commitMessage,
        commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
        commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
        commitDate: unprocessedCommits[index]!.commitDate,
        summary: "",
      };
    });

    const commits = await db.commit.createMany({
      data: summaries,
    });

    return commits;
  } catch (error) {
    console.error('Error polling commits:', JSON.stringify(error, null, 2));
    throw new Error('Failed to poll commits');
  }
};
console.log( await summariseCommit('ravinder9280','chatty','4bfd537ccf8ed14e91efeed7ea8ebfd314deca9d'))

export { summariseCommit };