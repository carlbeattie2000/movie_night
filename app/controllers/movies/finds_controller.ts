import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'

export default class FindsController {
  async create({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async results({ request, view }: HttpContext) {
    const query = request.input('title')

    const result = await tmdb.search(query)

    result.results.forEach((r) => {
      r.poster_path = `https://image.tmdb.org/t/p/w500${r.poster_path}`
    })

    return view.render('pages/movies/results', { results: result.results })
  }
}
