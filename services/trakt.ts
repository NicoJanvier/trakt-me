import { NextApiRequest } from "next"
import getHost from "../utils/getHost"
import myFetch, { traktServerFetch } from "../utils/fetch";
import { Token } from "../pages/api/trakt/callback";

const TRAKT_URI = 'https://api.trakt.tv';

export async function exchangeToken(req: NextApiRequest, code?: string, refresh_token?: string): Promise<Token> {
  const data = {
    code,
    refresh_token,
    client_id: process.env.TRAKT_CLIENT_ID,
    client_secret: process.env.TRAKT_CLIENT_SECRET,
    redirect_uri: `${getHost(req)}${process.env.TRAKT_REDIRECT_URI}`,
    grant_type: code ? 'authorization_code' : 'refresh_token'
  };
  const response = await myFetch(`${TRAKT_URI}/oauth/token`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    const token: Token = await response.json();
    return token;
  } else if (response.status === 401) {
    console.log('TRAKT SERVICE - EXCHANGE TOKEN 401', response.statusText);
    return null;
  }
}

export type WatchedShow = {
  last_watched_at: string;
  show: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      tmdb: number;
    };
  };
}

export async function getWatchedShows(req: NextApiRequest): Promise<WatchedShow[]> {
  const result = await traktServerFetch(req, `${TRAKT_URI}/users/me/watched/shows?extended=noseasons&language=en`);
  const data = await result.json();
  return data as WatchedShow[];
}