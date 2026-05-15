import { BaseTransformer } from '@adonisjs/core/transformers'
import type Movie from '#models/movie'
import GenreTransformer from './genre_transformer.ts'
import UserTransformer from './user_transformer.ts'

export default class MovieTransformer extends BaseTransformer<Movie> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'watchlistedBy', 'posterUrl', 'title']),
      genres: GenreTransformer.transform(this.whenLoaded(this.resource.genres)),
      watchlistedBy: UserTransformer.transform(this.whenLoaded(this.resource.watchlistedBy)),
      ratedBy: UserTransformer.transform(this.whenLoaded(this.resource.ratedBy)),
    }
  }
}
