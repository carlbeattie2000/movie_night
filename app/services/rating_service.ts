import type Movie from '#models/movie'
import MoviePickedResult from '#models/movie_picked_result'
import Rating from '#models/rating'

type RateMovieResult =
  | {
      status: 'success'
      movie: Movie
    }
  | { status: 'error'; message: string }

export class RatingService {
  async getMovieToRate(userId: number): Promise<RateMovieResult> {
    const lastWatchedMovie = await MoviePickedResult.query()
      .orderBy('createdAt', 'desc')
      .preload('movie')
      .first()

    if (!lastWatchedMovie) {
      return { status: 'error', message: 'No last watched movie' }
    }

    const userRatedResult = await Rating.query()
      .where('userId', userId)
      .andWhere('movieId', lastWatchedMovie.movieId)
      .first()

    if (userRatedResult) {
      return { status: 'error', message: 'User already rated latest movie' }
    }

    return {
      status: 'success',
      movie: lastWatchedMovie.movie,
    }
  }

  async rateMovie(userId: number, movieId: number, rating: number) {
    await Rating.create({
      userId,
      movieId,
      rating,
    })
  }
}
