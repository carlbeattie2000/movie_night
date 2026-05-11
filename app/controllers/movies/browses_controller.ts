import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'
import { DateTime } from 'luxon'

export default class BrowsesController {
  async view({ view, response, session }: HttpContext) {
    const moviesResult = await tmdb.movies()

    if (moviesResult.status === 'invalid_json') {
      session.flash('error', moviesResult.message)
      return response.redirect().toRoute('home.show')
    }

    moviesResult.result.results.forEach((r) => {
      r.poster_path = `https://image.tmdb.org/t/p/w500${r.poster_path}`
      r.release_date = DateTime.fromISO(r.release_date).toFormat('d LLLL yyyy')
    })

    return view.render('pages/movies/browse', { movies: moviesResult.result.results })
  }
}
