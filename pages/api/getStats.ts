/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 4 * 60 * 60 * 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const now = Date.now();

        if (cache && now - cache.timestamp < CACHE_DURATION) {
            return res.status(200).json(cache.data);
        }

        try {
            console.log("Sending Request To Github API")
            const response = await axios.get('https://api.github.com/users/Anthony01M');
            const data = response.data;

            cache = {
                data,
                timestamp: now,
            };

            return res.status(200).json(data);
        } catch (error: any) {
            console.error('Error fetching GitHub stats:', error);
            return res.status(500).json({ error: 'Failed to fetch GitHub stats' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}