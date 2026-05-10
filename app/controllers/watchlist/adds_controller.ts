import Movie from '#models/movie'
import WatchlistItem from '#models/watchlist_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class AddsController {
  async store({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const id = request.input('movie_id')

    const localMovieResult = await Movie.query().where('tmdbId', id).first()

    if (localMovieResult) {
      const alreadyExist = await WatchlistItem.query()
        .where('userId', user.id)
        .andWhere('movieId', localMovieResult.id)
        .first()
      if (alreadyExist) {
        return response.badRequest('Movie already on watch list')
      }
      await WatchlistItem.create({ movieId: localMovieResult.id, userId: user.id })
      return response.ok('movie added')
    }
  }
}
