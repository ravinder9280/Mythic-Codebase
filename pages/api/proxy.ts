import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { owner, repo, commithash } = req.query;

    if (typeof owner !== 'string' || typeof repo !== 'string' || typeof commithash !== 'string') {
      res.status(400).json({ error: 'Invalid query parameters' });
      return;
    }

    const response = await axios.get(`https://github.com/${owner}/${repo}/commit/${commithash}.diff`, {
      headers: {
        Accept: 'application/vnd.github.v3.diff',
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Use your GitHub token
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}