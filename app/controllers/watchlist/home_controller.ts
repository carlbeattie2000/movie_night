import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const unwatched = user
      .related('watchlist_items')
      .query()
      .where('watched', false)
      .preload('genres')

    return unwatched
  }
}
