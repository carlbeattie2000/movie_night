import { DateTime } from 'luxon'
import { type MovieResult, type MovieSearchResult } from '../contracts/tmdb.ts'
import { tmdb } from '../utils/tmdb.ts'
import { FlashException } from '../errors/flash_exception.ts'

export class MovieService {
  #formatMovieResults(movieResults: MovieResult[]): MovieResult[] {
    return movieResults.map((result) => ({
      ...result,
      poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      release_date: DateTime.fromISO(result.release_date).toFormat('d LLLL yyyy'),
    }))
  }

  async searchForMovie(title: string): Promise<MovieSearchResult> {
    const searchResult = await tmdb.search(title)
    if (searchResult.status === 'error') {
      throw new FlashException('Failed to fetch movie from TMDB', 'movies.show_search')
    }

    const { result } = searchResult
    return { ...result, results: this.#formatMovieResults(result.results) }
  }

  async browseByCategory(genreId: number, page: number): Promise<MovieSearchResult> {
    const moviesResult = await tmdb.movies(genreId, page ?? 1)
    if (moviesResult.status === 'error') {
      throw new FlashException('Failed to fetch movie from TMDB', 'home.show')
    }

    const { result } = moviesResult
    return { ...result, results: this.#formatMovieResults(result.results) }
  }
}
