import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'
import { DateTime } from 'luxon'
import { browseFilterValidator } from '#validators/browse_filter'

export default class BrowsesController {
  async view({ request, view, response, session }: HttpContext) {
    const { genreId, page } = await request.validateUsing(browseFilterValidator)

    const moviesResult = await tmdb.movies(genreId, page ?? 1)

    if (moviesResult.status === 'invalid_json') {
      session.flash('error', moviesResult.message)
      return response.redirect().toRoute('home.show')
    }

    moviesResult.result.results.forEach((r) => {
      r.poster_path = `https://image.tmdb.org/t/p/w500${r.poster_path}`
      r.release_date = DateTime.fromISO(r.release_date).toFormat('d LLLL yyyy')
    })

    return view.render('pages/movies/browse', {
      movies: moviesResult.result.results,
      totalPages: moviesResult.result.total_pages,
      currentPage: moviesResult.result.page,
      genreId,
    })
  }
}
