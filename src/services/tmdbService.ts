const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type: 'movie' | 'tv';
}

export const GENRES: { [key: number]: string } = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Cinema TV',
  53: 'Suspense',
  10752: 'Guerra',
  37: 'Faroeste',
  10759: 'Ação e Aventura',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

export async function fetchTrending() {
  if (!TMDB_API_KEY) return [];
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=pt-BR`);
    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
}

export async function fetchByGenre(genreId: number) {
  if (!TMDB_API_KEY) return [];
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=pt-BR`);
    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error('Error fetching by genre:', error);
    return [];
  }
}

export async function searchMovies(query: string) {
  if (!TMDB_API_KEY) return [];
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}&language=pt-BR`);
    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error('Error searching:', error);
    return [];
  }
}

export async function fetchVideos(id: number, type: 'movie' | 'tv') {
  if (!TMDB_API_KEY) return null;
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=pt-BR`);
    const data = await response.json();
    // Try to find a trailer from YouTube
    const trailer = data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
}

export function getImageUrl(path: string) {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://picsum.photos/seed/movie/800/450';
}
