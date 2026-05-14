import { BaseTransformer } from '@adonisjs/core/transformers'
import type Genre from '#models/genre'

export default class GenreTransformer extends BaseTransformer<Genre> {
  toObject() {
    return this.pick(this.resource, ['id', 'tmdbId', 'name'])
  }
}
