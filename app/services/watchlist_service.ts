import Genre from '#models/genre'
import Movie from '#models/movie'
import MovieGenre from '#models/movie_genre'
import WatchlistItem from '#models/watchlist_item'
import { tmdb } from '../utils/tmdb.ts'

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

    const tmdbMovieResult = await tmdb.movie(tmdbMovieId)

    const movie = await Movie.create({
      tmdbId: tmdbMovieResult.id,
      title: tmdbMovieResult.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${tmdbMovieResult.poster_path}`,
      voteAverage: tmdbMovieResult.vote_average,
    })

    const genreIdMap = tmdbMovieResult.genres.map((g) => g.id)
    const genres = await Genre.query().whereIn('tmdbId', genreIdMap)

    for (const genre of genres) {
      await MovieGenre.create({ movieId: movie.id, genreId: genre.id })
    }

    await WatchlistItem.create({ movieId: movie.id, userId })

    return { status: 'success', message: 'Movie added' }
  }
}
