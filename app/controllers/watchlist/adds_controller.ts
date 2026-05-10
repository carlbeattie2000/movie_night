import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { WatchlistService } from '#services/watchlist_service'

@inject()
export default class AddsController {
  constructor(protected watchlistService: WatchlistService) {}

  async store({ request, auth, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = request.input('movie_id')

    const addMovieResult = await this.watchlistService.addMovie(id, user.id)

    session.flash(addMovieResult.status, addMovieResult.message)

    return response.redirect().toRoute('home.show')
  }
}
