import Movie from '#models/movie'
import WatchlistItem from '#models/watchlist_item'

type AddMovieResult = { status: 'success'; message: string } | { status: 'error'; message: string }

export class WatchlistService {
  async addMovie(tmdbMovieId: number, userId: number): Promise<AddMovieResult> {
    const localMovieResult = await Movie.query().where('tmdbId', tmdbMovieId).first()

    if (localMovieResult) {
      const alreadyExist = await WatchlistItem.query()
        .where('userId', userId)
        .andWhere('movieId', localMovieResult.id)
        .first()

      if (alreadyExist) {
        return { status: 'error', message: 'Movie already on watch list' }
      }

      await WatchlistItem.create({ movieId: localMovieResult.id, userId })

      return { status: 'success', message: 'Movie added' }
    }
  }
}
