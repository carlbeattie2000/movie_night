import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'

export default class FindsController {
  async create({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async results({ request, view }: HttpContext) {
    const query = request.input('title')

    const result = await tmdb.search(query)

    return view.render('pages/movies/results', { totalResults: result.total_results })
  }
}
