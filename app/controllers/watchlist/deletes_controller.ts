import WatchlistItem from '#models/watchlist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeletesController {
  async destroy({ request, auth, session, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const movieId = request.input('movie_id')

    await WatchlistItem.query().where('userId', user.id).andWhere('movieId', movieId).delete()

    session.flash('error', 'Movie removed from list')
    return response.redirect().toRoute('home.show')
  }
}
