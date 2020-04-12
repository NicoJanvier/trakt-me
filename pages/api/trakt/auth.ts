import { NextApiRequest, NextApiResponse } from 'next'
import getHost from '../../../utils/getHost';

const AUTH_URL = 'https://trakt.tv/oauth/authorize';
const TRAKT_REDIRECT_URI = "/api/trakt/callback";

const getQueryString = obj => 
  Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

async function handler(req: NextApiRequest,res: NextApiResponse) {
  const authUrl = AUTH_URL;
  const authObj = ({
    response_type: 'code',
    client_id: process.env.TRAKT_CLIENT_ID,
    redirect_uri: `${getHost(req)}${TRAKT_REDIRECT_URI}`,
  });
  const queryString = `?${getQueryString(authObj)}`;
  const authorizationtUrl = `${authUrl}${queryString}`;
  
  res.writeHead(302, {
    Location: authorizationtUrl,
  });
  res.end();
};

export default handler;