import { BaseTransformer } from '@adonisjs/core/transformers'
import type { MovieResult } from '../contracts/tmdb.js'

export default class MovieResultTransformer extends BaseTransformer<MovieResult> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'title',
      'release_date',
      'poster_path',
      'popularity',
      'vote_average',
    ])
  }
}
