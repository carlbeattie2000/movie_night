import { BaseTransformer } from '@adonisjs/core/transformers'
import type WatchlistItem from '#models/watchlist_item'
import MovieTransformer from './movie_transformer.ts'

export default class WatchlistItemTransformer extends BaseTransformer<WatchlistItem> {
  toObject() {
    return {
      ...this.pick(this.resource, ['userId']),
      movie: MovieTransformer.transform(this.resource.movie).depth(2),
      daysSinceWatched: this.resource.lastWatched
        ? Math.round(Math.abs(this.resource.lastWatched.diffNow('days').days))
        : -1,
    }
  }
}
