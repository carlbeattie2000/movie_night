import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { WatchlistService } from '#services/watchlist_service'

@inject()
export default class ApiController {
  constructor(protected watchlistService: WatchlistService) {}

  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = request.input('movie_id')

    const result = await this.watchlistService.addMovie(id, user.id)

    if (result.status === 'error') {
      return response.badRequest(result)
    }

    return response.ok(result)
  }

  async destroy({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const movieId = request.input('movie_id')

    this.watchlistService.removeMovie(user.id, movieId)

    return response.noContent()
  }
}
