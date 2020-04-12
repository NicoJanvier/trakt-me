import { NextApiRequest, NextApiResponse } from 'next';
import { getWatchedShows } from '../../../../services/trakt';
import { getPostersUrl } from '../../../../services/tmdb';

export type WatchedShowObject = {
  last_watched_at: string;
  title: string;
  image: string;
  trakt_id: number; 
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const watchedShows = await getWatchedShows(req);
    const shows = await watchedShows.map(watchedShow => {
      const { last_watched_at, show: { title, ids } } = watchedShow;
      return {
        title,
        last_watched_at,
        trakt_id: ids.trakt,
        tmdb_id: ids.tmdb,
      }
    });
    const images = await getPostersUrl(shows.map(({ tmdb_id }) => tmdb_id), 'show');
    const watchedShowObjects = shows.map((show, idx) => ({
      ...show,
      image: images[idx],
    }));

    res.status(200).json(watchedShowObjects);    
  } catch (error) {
    console.log('ERROR GETTING PROGRESS', error);
    res.status(500).end();
  }
};

export default handler;