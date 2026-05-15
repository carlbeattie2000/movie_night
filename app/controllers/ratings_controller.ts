import { RatingService } from '#services/rating_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import MovieTransformer from '#transformers/movie_transformer'

@inject()
export default class RatingsController {
  constructor(protected ratingService: RatingService) {}

  async getNextToRate({ auth, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const movieToRateResult = await this.ratingService.getMovieToRate(user.id)

    if (movieToRateResult.status === 'error') {
      return response.badRequest(movieToRateResult.message)
    }

    return serialize(MovieTransformer.transform(movieToRateResult.movie))
  }

  async rateMovie({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    await this.ratingService.rateMovie(user.id, request.input('movie_id'), request.input('rating'))

    return response.noContent()
  }
}
