import { lobbyStore } from '#stores/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class SelectsController {
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const movieId = request.input('movie_id')

    lobbyStore.join(user.id, movieId)

    return response.redirect().toRoute('matches.lobby')
  }

  async random({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const watchListMovies = await user.related('watchlist_items').query().where('watched', false)

    const movie = watchListMovies[Math.floor(Math.random() * watchListMovies.length)]

    lobbyStore.join(user.id, movie.id)

    return response.redirect().toRoute('matches.lobby')
  }
}
