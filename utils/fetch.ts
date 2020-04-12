import unfetch from 'isomorphic-unfetch';
import { Token } from '../pages/api/trakt/callback';
import { NextApiRequest } from 'next';

export type Fetch = typeof fetch;

const myFetch: Fetch = (input, init?) => {
  if (init?.method === 'POST') {
    init.headers = {
      'Content-Type': 'application/json',
      ...init.headers,
    }
  }
  return unfetch(input, init);
}

const CLIENT_ID = 'e51b93af3851c5ba39767a7b4f66c7264dc699bb4c229816181c222addc95293';

export const traktServerFetch = (req: NextApiRequest, input: RequestInfo, init: RequestInit = {}) => {
  const token: Token = JSON.parse(req.cookies.token);
  init.headers = {
    'trakt-api-key': CLIENT_ID,
    'trakt-api-version': '2',
    Authorization: `${token.token_type} ${token.access_token}`,
    ...init.headers,
  }
  return myFetch(input, init);
}

export default myFetch;