import { MovieSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Genre from './genre.ts'

export default class Movie extends MovieSchema {
  @manyToMany(() => User, {
    pivotTable: 'watchlist_items',
    pivotColumns: ['watched', 'last_watched', 'created_at'],
    pivotTimestamps: true,
  })
  declare watchlist: ManyToMany<typeof User>

  @manyToMany(() => Genre, {
    pivotTable: 'movie_genres',
  })
  declare genres: ManyToMany<typeof Genre>
}
