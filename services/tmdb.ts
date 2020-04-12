import myFetch from "../utils/fetch";

const TMDB_URL = 'https://api.themoviedb.org/3';
const apiKey = process.env.TMDB_API_KEY;

type GetConfig = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
};

async function getConfig():Promise<GetConfig> {
  try {
    const response = await myFetch(`${TMDB_URL}/configuration?api_key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching TMDB configuration', error);
    throw new Error('Error fetching TMDB configuration');
  }
}

interface ImageMetadata {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
};

interface GetImages {
  id: number;
  backdrops: ImageMetadata[];
  posters: ImageMetadata[];
};

async function getTvImages(id: number):Promise<GetImages> {
  try {
    const response = await myFetch(`${TMDB_URL}/tv/${id}/images?api_key=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching TMDB TV Images');    
  }
}

async function getMovieImages(id: number):Promise<GetImages> {
  try {
    const response = await myFetch(`${TMDB_URL}/movie/${id}/images?api_key=${apiKey}`);
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching TMDB TV Images');    
  }
}

function getSize(sizes: string[], size?: string): string {
  return sizes.includes(size) ? size : sizes[sizes.length - 1];
};

function getBestRatedImage(images: ImageMetadata[]): ImageMetadata {
  const sortedImages = [...images].sort((a, b) => a.vote_count - b.vote_count);
  return sortedImages[0];
}

export async function getPostersUrl(ids: number[], type: 'show' | 'movie'): Promise<string[]> {
  const { images: { secure_base_url, poster_sizes } } = await getConfig();
  const size = getSize(poster_sizes, 'w500');
  return Promise.all(ids.map(async id => {
    if (id === null) return '/no-poster.jpg'
    const { posters } = type === 'show' ? await getTvImages(id) : await getMovieImages(id);
    const { file_path } = getBestRatedImage(posters);
    return `${secure_base_url}${size}${file_path}`;
  }))
};
