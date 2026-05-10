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

    return response.redirect().toRoute('results.show')
  }
}
