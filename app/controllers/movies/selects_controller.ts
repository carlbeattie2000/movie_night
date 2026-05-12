import selectionService from '#services/selection_service'
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

export default class SelectsController {
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const movieId = request.input('movie_id')

    selectionService.set(user.id, movieId)
    transmit.broadcast('selections', {
      selections: selectionService.get(),
    })

    return response.redirect().toRoute('matches.lobby')
  }

  async random({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const watchListMovies = await user.related('watchlist_items').query().where('watched', false)

    const movie = watchListMovies[Math.floor(Math.random() * watchListMovies.length)]

    selectionService.set(user.id, movie.id)
    transmit.broadcast('selections', {
      selections: selectionService.get(),
    })

    return response.redirect().toRoute('matches.lobby')
  }
}
