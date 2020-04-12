import { NextApiRequest, NextApiResponse } from 'next';
import { traktServerFetch } from '../../../utils/fetch';

const TRAKT_URI = 'https://api.trakt.tv/';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { slug, ...queries }, method } = req;
  if (method !== 'GET') res.status(403).end();
  const slugs = slug as string[];
  const url = `${TRAKT_URI}${slugs.join("/")}?${Object.entries(queries).map(([key, value]) => `${key}=${value}`).join('&')}`;
  const result = await traktServerFetch(req, url);

  const data = await result.json();
  res.status(200).json(data);
};

export default handler;