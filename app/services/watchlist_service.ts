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
      const alreadyExist = await WatchlistItem.query().where('movieId', localMovieResult.id).first()

      if (alreadyExist) {
        return {
          status: 'error',
          message:
            alreadyExist.userId !== userId
              ? 'Already on someone elses list'
              : 'Movie already on watch list',
        }
      }

      await WatchlistItem.create({ movieId: localMovieResult.id, userId })

      return { status: 'success', message: 'Movie added' }
    }

    const tmdbMovieResult = await tmdb.movie(tmdbMovieId)

    if (tmdbMovieResult.status === 'invalid_json') {
      return { status: 'error', message: tmdbMovieResult.message }
    }

    const tmdbMovie = tmdbMovieResult.result

    const movie = await Movie.create({
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,
      voteAverage: tmdbMovie.vote_average,
    })

    const genreIdMap = tmdbMovie.genres.map((g) => g.id)
    const genres = await Genre.query().whereIn('tmdbId', genreIdMap)

    for (const genre of genres) {
      await MovieGenre.create({ movieId: movie.id, genreId: genre.id })
    }

    await WatchlistItem.create({ movieId: movie.id, userId })

    return { status: 'success', message: 'Movie added' }
  }

  async removeMovie(userId: number, movieId: number) {
    await WatchlistItem.query().where('userId', userId).andWhere('movieId', movieId).delete()
  }

  async combinedWatchedList(): Promise<WatchlistItem[]> {
    return await WatchlistItem.query().where('watched', true).preload('movie')
  }
}
