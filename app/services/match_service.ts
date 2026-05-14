import MoviePickedResult from '#models/movie_picked_result'
import WatchlistItem from '#models/watchlist_item'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export class MatchService {
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
