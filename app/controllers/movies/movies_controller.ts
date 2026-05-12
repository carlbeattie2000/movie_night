import type { HttpContext } from '@adonisjs/core/http'
import { browseFilterValidator } from '#validators/browse_filter'
import { MovieService } from '#services/movie_service'
import { inject } from '@adonisjs/core'

@inject()
export default class MoviesController {
  constructor(protected movieService: MovieService) {}

  async showSearch({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async searchResults({ request, view, response, session }: HttpContext) {
    const query = request.input('title')

    const searchResults = await this.movieService.searchForMovie(query)

    if (searchResults.status === 'error') {
      session.flash('error', searchResults.message)
      return response.redirect().toRoute('home.show')
    }

    const { results } = searchResults.result

    return view.render('pages/movies/results', { results })
  }

  async browse({ request, view, response, session }: HttpContext) {
    const { genreId, page } = await request.validateUsing(browseFilterValidator)

    const moviesResult = await this.movieService.browseByCategory(genreId, page ?? 1)

    if (moviesResult.status === 'error') {
      session.flash('error', moviesResult.message)
      return response.redirect().toRoute('home.show')
    }

    const { result } = moviesResult

    return view.render('pages/movies/browse', {
      movies: result.results,
      totalPages: result.total_pages,
      currentPage: result.page,
      genreId,
    })
  }
}
