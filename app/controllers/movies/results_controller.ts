import WatchlistItem from '#models/watchlist_item'
import selectionService from '#services/selection_service'
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import { DateTime } from 'luxon'

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
        .update({ watched: true, lastWatched: DateTime.now().toISO() })

      transmit.broadcast('result', { winner: winnerId })
      selectionService.clear()
    }

    return response.ok({})
  }
}
