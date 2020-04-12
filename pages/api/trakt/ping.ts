import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { Token } from './callback';
import { exchangeToken } from '../../../services/trakt';

const tokenExpiresSoon = (token: Token): boolean => {
  const now = Date.now() / 1000;
  const expiryDate = token.created_at + token.expires_in;
  return expiryDate <= now
} 

async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.cookies.token) {
    const token: Token = JSON.parse(req.cookies.token);
    if (tokenExpiresSoon(token)) {
      const newToken = exchangeToken(req, null,token.refresh_token);
      const cookies = new Cookies(req, res);
      cookies.set('token', JSON.stringify(newToken), {
        httpOnly: true,
      });
    }
    res.status(200).end();
  } else {
    res.status(403).end();
  }
};

export default handler;