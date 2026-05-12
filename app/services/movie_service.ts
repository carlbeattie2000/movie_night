import { DateTime } from 'luxon'
import { type MovieResult, type MovieSearchResult } from '../contracts/tmdb.ts'
import { tmdb } from '../utils/tmdb.ts'

type MovieQueryResult =
  | { status: 'success'; result: MovieSearchResult }
  | { status: 'error'; message: string }

export class MovieService {
  #formatMovieResults(movieResults: MovieResult[]): MovieResult[] {
    return movieResults.map((result) => ({
      ...result,
      poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      release_date: DateTime.fromISO(result.release_date).toFormat('d LLLL yyyy'),
    }))
  }

  async searchForMovie(title: string): Promise<MovieQueryResult> {
    const searchResult = await tmdb.search(title)

    if (searchResult.status === 'error') {
      return { status: 'error', message: 'Failed to fetch movie from TMDB' }
    }

    const { result } = searchResult

    result.results = this.#formatMovieResults(result.results)

    return { status: 'success', result }
  }

  async browseByCategory(genreId: number, page: number): Promise<MovieQueryResult> {
    const moviesResult = await tmdb.movies(genreId, page ?? 1)

    if (moviesResult.status === 'error') {
      return { status: 'error', message: 'Failed to fetch movie from TMDB' }
    }

    const { result } = moviesResult

    result.results = this.#formatMovieResults(result.results)

    return { status: 'success', result }
  }
}
