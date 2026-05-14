import Genre from '#models/genre'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { WatchlistService } from '#services/watchlist_service'
import GenreTransformer from '../../transformers/genre_transformer.ts'
import MovieTransformer from '../../transformers/movie_transformer.ts'
import UserTransformer from '#transformers/user_transformer'

@inject()
export default class HomeController {
  constructor(protected watchlistService: WatchlistService) {}

  async show({ auth, inertia }: HttpContext) {
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

    const combinedWatchedList = await this.watchlistService.combinedWatchedList()

    return inertia.render('home', {
      selfUnwatched: MovieTransformer.transform(selfUnwatched),
      otherUnwatched: MovieTransformer.transform(otherUnwatched),
      other: UserTransformer.transform(otherUser),
      genres: GenreTransformer.transform(genres),
      combinedWatched: MovieTransformer.transform(
        combinedWatchedList.map((watchList) => watchList.movie)
      ),
    })
  }
}
