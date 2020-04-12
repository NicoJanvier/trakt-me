import { NextApiRequest, NextApiResponse } from 'next';
import { traktServerFetch } from '../../../utils/fetch';

const API_URL = 'https://api.trakt.tv/users/me';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await traktServerFetch(req, API_URL);
  const profile = await result.json();
  res.status(200).json(profile);
};

export default handler;