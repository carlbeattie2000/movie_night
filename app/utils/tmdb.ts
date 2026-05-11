import env from '#start/env'
import {
  type SingleMovieResult,
  type MovieSearchResult,
  type GenresResult,
} from '../contracts/tmdb.ts'

const BASE_URL = 'https://api.themoviedb.org/3'

type TMDBRequestResult<T> =
  | { status: 'invalid_json'; message: string }
  | { status: 'success'; result: T }

async function tmdbFetch<T>(path: string): Promise<TMDBRequestResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${env.get('TMDB_KEY')}` },
  })

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)

  try {
    const jsonResult = (await res.json()) as unknown as T
    return { status: 'success', result: jsonResult }
  } catch {
    return { status: 'invalid_json', message: 'Invalid JSON' }
  }
}

export const tmdb = {
  search: (query: string) =>
    tmdbFetch<MovieSearchResult>(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`),
  genres: () => tmdbFetch<GenresResult>('/genre/movie/list?language=en-US'),
  movie: (tmdbId: number) => tmdbFetch<SingleMovieResult>(`/movie/${tmdbId}?language=en-US`),
  movies: () =>
    tmdbFetch<MovieSearchResult>(
      '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
    ),
}
