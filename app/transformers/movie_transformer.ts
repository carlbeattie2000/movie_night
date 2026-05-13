import { BaseTransformer } from '@adonisjs/core/transformers'
import type Movie from '#models/movie'

export default class MovieTransformer extends BaseTransformer<Movie> {
  toObject() {
    return this.pick(this.resource, ['id', 'watchlist', 'posterUrl', 'title'])
  }
}
