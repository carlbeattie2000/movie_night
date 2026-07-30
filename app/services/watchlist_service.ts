import Genre from '#models/genre'
import Movie from '#models/movie'
import MovieGenre from '#models/movie_genre'
import WatchlistItem from '#models/watchlist_item'
import { DateTime } from 'luxon'
import { TMDB } from '../utils/tmdb.ts'
import db from '@adonisjs/lucid/services/db'
import MoviePickedResult from '#models/movie_picked_result'

type AddMovieResult = { status: 'success'; message: string } | { status: 'error'; message: string }

export class WatchlistService {
  async #addFromLocalMovie(movie: Movie, userId: number): Promise<AddMovieResult> {
    const alreadyExist = await WatchlistItem.query().where('movieId', movie.id).first()

    if (alreadyExist) {
      return {
        status: 'error',
        message:
          alreadyExist.userId !== userId
            ? 'Already on someone elses list'
            : 'Movie already on watch list',
      }
    }

    await WatchlistItem.create({ movieId: movie.id, userId })

    return { status: 'success', message: 'Movie added' }
  }

  async #addFromTMDB(
    tmdbMovieId: number,
    mediaType: 'movie' | 'tv',
    userId: number
  ): Promise<AddMovieResult> {
    const tmdbMovieResult = await TMDB.query().findById(tmdbMovieId, mediaType)

    if (!tmdbMovieResult) {
      return { status: 'error', message: 'Failed to fetch movie from TMDB' }
    }

    let title =
      tmdbMovieResult.media_type === 'movie' ? tmdbMovieResult.title : tmdbMovieResult.name

    await db.transaction(async (trx) => {
      const movie = await Movie.create(
        {
          tmdbId: tmdbMovieResult.id,
          title,
          posterUrl: `https://image.tmdb.org/t/p/w500${tmdbMovieResult.poster_path}`,
          voteAverage: tmdbMovieResult.vote_average,
          mediaType: tmdbMovieResult.media_type,
        },
        { client: trx }
      )

      const genreIdMap = tmdbMovieResult.genres.map((g) => g.id)
      const genres = await Genre.query({ client: trx }).whereIn('tmdbId', genreIdMap)

      await MovieGenre.createMany(
        genres.map((genre) => ({ movieId: movie.id, genreId: genre.id })),
        { client: trx }
      )

      await WatchlistItem.create({ movieId: movie.id, userId }, { client: trx })
    })

    return { status: 'success', message: 'Movie added' }
  }

  async addMovie(
    tmdbMovieId: number,
    mediaType: 'movie' | 'tv',
    userId: number
  ): Promise<AddMovieResult> {
    const localMovieResult = await Movie.query()
      .where('tmdbId', tmdbMovieId)
      .andWhere('mediaType', mediaType)
      .first()

    if (localMovieResult) {
      return this.#addFromLocalMovie(localMovieResult, userId)
    }

    return this.#addFromTMDB(tmdbMovieId, mediaType, userId)
  }

  async removeMovie(userId: number, movieId: number) {
    await WatchlistItem.query().where('userId', userId).andWhere('movieId', movieId).delete()
  }

  async combinedWatchedList(): Promise<WatchlistItem[]> {
    return await WatchlistItem.query()
      .where('watched', true)
      .orderBy('lastWatched', 'desc')
      .preload('movie', (query) => {
        query.preload('ratedBy')
      })
  }

  async markMovieAsWatched(movieId: number) {
    await db.transaction(async (trx) => {
      await WatchlistItem.query({ client: trx })
        .whereIn('userId', [1, 2])
        .where('movieId', movieId)
        .update({ watched: true, lastWatched: DateTime.now().toSQL() })

      await WatchlistItem.query({ client: trx })
        .whereIn('userId', [1, 2])
        .where('movieId', movieId)
        .whereNull('firstWatchedAt')
        .update({ firstWatchedAt: DateTime.now().toSQL() })

      await MoviePickedResult.create(
        {
          movieId,
        },
        { client: trx }
      )
    })
  }
}
