import WatchlistItem from '#models/watchlist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class MatchesController {
  async lobby({ inertia }: HttpContext) {
    return inertia.render('lobby/index', {})
  }

  async cancel({ response, request }: HttpContext) {
    const movieId = request.input('movie_id')

    const watchListItem = await WatchlistItem.query().where('movieId', movieId).firstOrFail()

    if (!watchListItem) {
      return response.badRequest('No movie has been selected to cancel')
    }

    if (
      watchListItem.firstWatchedAt === null ||
      Math.abs(watchListItem.firstWatchedAt.diffNow('hours').hours) < 1
    ) {
      await WatchlistItem.query().where('movieId', watchListItem.movieId).update({
        watched: false,
        last_watched: null,
        first_watched_at: null,
      })
    } else {
      await WatchlistItem.query().where('movieId', watchListItem.movieId).update({ watched: false })
    }

    return response.redirect().toRoute('home.show')
  }
}
