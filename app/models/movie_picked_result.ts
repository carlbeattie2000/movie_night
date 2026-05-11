import { MoviePickedResultSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Movie from './movie.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MoviePickedResult extends MoviePickedResultSchema {
  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>
}
