import { DateTime } from 'luxon'
import {
  type NormalizedSearchResult,
  type NormalizedMovieGenreSearchResult,
} from '../contracts/tmdb.ts'
import { TMDB } from '../utils/tmdb.ts'
import { FlashException } from '../errors/flash_exception.ts'

export class MovieService {
  #formatMovieResults(movieResults: NormalizedSearchResult[]): NormalizedSearchResult[] {
    const filteredMovieResults = movieResults.filter((result) => {
      if (result.media_type) {
        return result.media_type === 'movie' || result.media_type === 'tv'
      }

      return true
    })

    return filteredMovieResults.map((result) => {
      return {
        ...result,
        poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        release_date: DateTime.fromISO(result.release_date).toFormat('d LLLL yyyy'),
      }
    })
  }

  async searchForMovie(title: string): Promise<NormalizedSearchResult[]> {
    const searchResults = await TMDB.query().byTitle(title)

    if (!searchResults) {
      throw new FlashException('Failed to fetch movie from TMDB', 'movies.show_search')
    }

    return this.#formatMovieResults(searchResults)
  }

  async browseByCategory(genreId: number, page: number): Promise<NormalizedMovieGenreSearchResult> {
    const moviesResult = await TMDB.query().moviesByGenre(genreId, page ?? 1)

    if (!moviesResult) {
      throw new FlashException('Failed to fetch movie from TMDB', 'home.show')
    }

    return { ...moviesResult, results: this.#formatMovieResults(moviesResult.results) }
  }
}
