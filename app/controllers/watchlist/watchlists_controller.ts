import { WatchlistService } from '#services/watchlist_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class WatchlistsController {
  constructor(protected watchlistService: WatchlistService) {}

  async store({ request, auth, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = request.input('movie_id')

    const addMovieResult = await this.watchlistService.addMovie(id, user.id)

    session.flash(addMovieResult.status, addMovieResult.message)

    return response.redirect().toRoute('home.show')
  }

  async destroy({ request, auth, session, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const movieId = request.input('movie_id')

    this.watchlistService.removeMovie(user.id, movieId)

    session.flash('error', 'Movie removed from list')
    return response.redirect().toRoute('home.show')
  }
}
