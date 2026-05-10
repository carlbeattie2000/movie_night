import type { HttpContext } from '@adonisjs/core/http'
import { tmdb } from '../../utils/tmdb.ts'

export default class FindsController {
  async create({ view }: HttpContext) {
    return view.render('pages/movies/find')
  }

  async results({ request }: HttpContext) {
    const query = request.input('title')

    return tmdb.search(query)
  }
}
