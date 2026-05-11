import MoviePickedResult from '#models/movie_picked_result'
import WatchlistItem from '#models/watchlist_item'
import selectionService from '#services/selection_service'
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import { DateTime } from 'luxon'
import { tmdb } from '../../utils/tmdb.ts'

export default class ResultsController {
  async show({ view }: HttpContext) {
    return view.render('pages/movies/result')
  }

  async ready({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    selectionService.setReady(user.id)

    if (selectionService.bothReady()) {
      const winnerId = selectionService.pick()

      await WatchlistItem.query()
        .whereIn('userId', [1, 2])
        .where('movieId', winnerId)
        .update({ watched: true, lastWatched: DateTime.now().toSQL() })

      await WatchlistItem.query()
        .whereIn('userId', [1, 2])
        .where('movieId', winnerId)
        .whereNull('firstWatchedAt')
        .update({ firstWatchedAt: DateTime.now().toSQL() })

      await MoviePickedResult.create({
        movieId: winnerId,
      })

      transmit.broadcast('result', { winner: winnerId })
      selectionService.clear()
    }

    return response.ok({})
  }

  async view({ view, response, session }: HttpContext) {
    const lastPicked = await MoviePickedResult.query()
      .orderBy('createdAt', 'desc')
      .preload('movie')
      .first()

    if (!lastPicked) {
      return response.badRequest('You must pick a movie before viewing the result.')
    }

    const providersResult = await tmdb.providers(lastPicked.movie.tmdbId)

    if (providersResult.status === 'invalid_json') {
      session.flash('error', providersResult.message)
      return view.render('pages/movies/picked', { movie: lastPicked.movie })
    }

    return view.render('pages/movies/picked', {
      movie: lastPicked.movie,
      providers: providersResult.result.results?.GB?.flatrate,
    })
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
