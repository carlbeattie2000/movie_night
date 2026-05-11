import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'

export default class FindsController {
  async create({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async results({ request, view, response, session }: HttpContext) {
    const query = request.input('title')

    const searchResult = await tmdb.search(query)

    if (searchResult.status === 'invalid_json') {
      session.flash('error', searchResult.message)
      return response.redirect().toRoute('home.show')
    }

    searchResult.result.results.forEach((r) => {
      r.poster_path = `https://image.tmdb.org/t/p/w500${r.poster_path}`
    })

    return view.render('pages/movies/results', { results: searchResult.result.results })
  }
}
