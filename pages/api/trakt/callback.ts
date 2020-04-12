import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import Cookies from 'cookies';
import { runMiddleware } from '../../../utils/api';
import { exchangeToken } from '../../../services/trakt';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});


export type Token = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
  scope: 'public' | string;
  created_at: number;
}
async function handler(req: NextApiRequest,res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    return get(req, res);
  } else {
    res.status(403).end();
  }
}

async function get(req: NextApiRequest,res: NextApiResponse) {
  const { code } = req.query;
  const token = await exchangeToken(req, code as string);
  if (token) {
    const cookies = new Cookies(req, res);
    cookies.set('token', JSON.stringify(token), {
      httpOnly: true,
    });
    res.writeHead(302, { Location: '/profile' }).end();
  } else {
    res.writeHead(302, { Location: '/' }).end();
  }
}

export default handler;