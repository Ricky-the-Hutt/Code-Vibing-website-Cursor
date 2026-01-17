import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
        return res.status(500).json({ error: 'GITHUB_CLIENT_ID is not set' });
    }

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
    res.redirect(url);
}
