import MoviePickedResult from '#models/movie_picked_result'
import WatchlistItem from '#models/watchlist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class MatchesController {
  async lobby({ inertia }: HttpContext) {
    return inertia.render('lobby/index', {})
  }

  async cancel({ response }: HttpContext) {
    const lastPicked = await MoviePickedResult.query()
      .orderBy('createdAt', 'desc')
      .preload('movie')
      .first()

    if (!lastPicked) {
      return response.badRequest('No movie has been selected to cancel')
    }

    const watchListItem = await WatchlistItem.query()
      .where('movieId', lastPicked.movieId)
      .firstOrFail()

    if (!watchListItem) {
      return response.badRequest('No movie has been selected to cancel')
    }

    if (
      watchListItem.firstWatchedAt === null ||
      watchListItem.firstWatchedAt.diffNow('hours').hours < 1
    ) {
      await WatchlistItem.query().where('movieId', lastPicked.movieId).update({
        watched: false,
        last_watched: null,
        first_watched_at: null,
      })
    } else {
      await watchListItem.merge({ watched: false }).save()
    }

    await lastPicked.delete()

    return response.redirect().toRoute('home.show')
  }
}
