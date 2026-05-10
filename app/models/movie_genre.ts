import { MovieGenreSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Genre from './genre.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Movie from './movie.ts'

export default class MovieGenre extends MovieGenreSchema {
  @belongsTo(() => Genre)
  declare genre: BelongsTo<typeof Genre>

  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>
}
