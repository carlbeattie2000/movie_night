import Genre from '#models/genre'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ auth, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const otherId = user.id === 1 ? 2 : 1

    const [selfUnwatched, otherUser] = await Promise.all([
      user.related('watchlist_items').query().where('watched', false).preload('genres'),
      User.findOrFail(otherId),
    ])

    const otherUnwatched = await otherUser
      .related('watchlist_items')
      .query()
      .where('watched', false)
      .preload('genres')

    const genres = await Genre.query().orderBy('name', 'asc')

    return view.render('pages/home', {
      selfUnwatched,
      otherUnwatched,
      self: user,
      other: otherUser,
      genres,
    })
  }
}
