import type { HttpContext } from '@adonisjs/core/http'
import { browseFilterValidator } from '#validators/browse_filter'
import { MovieService } from '#services/movie_service'
import { inject } from '@adonisjs/core'
import MovieResultTransformer from '#transformers/movie_result_transformer'

@inject()
export default class MoviesController {
  constructor(protected movieService: MovieService) {}

  async showSearch({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async searchResults({ request, inertia }: HttpContext) {
    const query = request.input('title')

    const searchResults = await this.movieService.searchForMovie(query)
    const { results } = searchResults

    return inertia.render('search/index', {
      result: MovieResultTransformer.transform(results),
    })
  }

  async browse({ request, view }: HttpContext) {
    const { genreId, page } = await request.validateUsing(browseFilterValidator)

    const result = await this.movieService.browseByCategory(genreId, page ?? 1)

    return view.render('pages/movies/browse', {
      movies: result.results,
      totalPages: result.total_pages,
      currentPage: result.page,
      genreId,
    })
  }
}
