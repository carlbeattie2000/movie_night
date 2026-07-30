import env from '#start/env'
import {
  type SingleMovieResult,
  type MovieSearchResult,
  type GenresResult,
  type Providers,
  type NormalizedSearchResult,
  type NormalizedMovieGenreSearchResult,
  type SingleTvResult,
  type MovieOrShownFound,
} from '../contracts/tmdb.ts'
import { normalizeTmdbSearchResults } from '../helpers/normalize_tmdb_search_results.ts'

const BASE_URL = 'https://api.themoviedb.org/3'

type TMDBRequestResult<T> = { status: 'error'; message: string } | { status: 'success'; result: T }

async function tmdbFetch<T>(path: string): Promise<TMDBRequestResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${env.get('TMDB_KEY')}` },
  })

  if (!res.ok) throw new Error(`TMDB error: ${res.status} ${path}`)

  try {
    const jsonResult = (await res.json()) as unknown as T
    return { status: 'success', result: jsonResult }
  } catch {
    return { status: 'error', message: 'Failed to parse JSON' }
  }
}

export class TMDB {
  private includeMovies = true
  private includeShows = true

  public static query() {
    return new TMDB()
  }

  public withoutMovies() {
    this.includeMovies = false
    return this
  }

  public withoutShows() {
    this.includeShows = false
    return this
  }

  private buildUrlForByTitle(title: string): string {
    if ((!this.includeShows && !this.includeMovies) || !this.includeShows) {
      return `/search/movie?query=${encodeURIComponent(title)}&language=en-US`
    }

    if (!this.includeMovies) {
      return `/search/tv?query=${encodeURIComponent(title)}&language=en-US`
    }

    return `/search/multi?query=${encodeURIComponent(title)}&language=en-US`
  }

  public async byTitle(title: string): Promise<NormalizedSearchResult[] | null> {
    const queryURL = this.buildUrlForByTitle(title)
    const results = await tmdbFetch<MovieSearchResult>(queryURL)

    if (results.status === 'error') {
      return null
    }

    return normalizeTmdbSearchResults(results.result.results)
  }

  public async moviesByGenre(
    genreId: number,
    page: number
  ): Promise<NormalizedMovieGenreSearchResult | null> {
    const results = await tmdbFetch<MovieSearchResult>(
      `/discover/movie?with_genres=${genreId}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_count.gte=200`
    )

    if (results.status === 'error') {
      return null
    }

    const resultsWithMediaType = results.result.results.map((result) => {
      return {
        ...result,
        media_type: 'movie',
      }
    }) as NormalizedSearchResult[]

    return {
      ...results.result,
      results: resultsWithMediaType,
    }
  }

  public async findById(id: number, mediaType: 'movie' | 'tv'): Promise<MovieOrShownFound | null> {
    switch (mediaType) {
      case 'movie':
        const movieResult = await tmdbFetch<SingleMovieResult>(`/movie/${id}?language=en-US`)

        if (movieResult.status === 'error') {
          return null
        }

        return {
          ...movieResult.result,
          media_type: 'movie',
        }
      case 'tv':
        const tvShow = await tmdbFetch<SingleTvResult>(`/tv/${id}?language=en-US`)

        if (tvShow.status === 'error') {
          return null
        }

        return {
          ...tvShow.result,
          media_type: 'tv',
        }
    }
  }
}

export const tmdb = {
  search: (query: string) =>
    tmdbFetch<MovieSearchResult>(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`),
  multi: (query: string) =>
    tmdbFetch<MovieSearchResult>(`/search/multi?query=${encodeURIComponent(query)}&language=en-US`),
  genres: () => tmdbFetch<GenresResult>('/genre/movie/list?language=en-US'),
  movie: (tmdbId: number) => tmdbFetch<SingleMovieResult>(`/movie/${tmdbId}?language=en-US`),
  movies: (genreId: number, page: number) =>
    tmdbFetch<MovieSearchResult>(
      `/discover/movie?with_genres=${genreId}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_count.gte=200`
    ),
  providers: (movieId: number) => tmdbFetch<Providers>(`/movie/${movieId}/watch/providers`),
}
