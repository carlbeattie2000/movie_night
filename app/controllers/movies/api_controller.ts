import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiController {
  async fetch({ params }: HttpContext) {
    const { movieId } = params

    return await Movie.findOrFail(movieId)
  }
}
