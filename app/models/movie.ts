import { MovieSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Genre from './genre.ts'

export default class Movie extends MovieSchema {
  @manyToMany(() => User, {
    pivotTable: 'watchlist_items',
    pivotColumns: ['watched', 'last_watched', 'created_at'],
  })
  declare watchlistedBy: ManyToMany<typeof User>

  @manyToMany(() => Genre, {
    pivotTable: 'movie_genres',
  })
  declare genres: ManyToMany<typeof Genre>

  @manyToMany(() => User, {
    pivotTable: 'ratings',
    pivotColumns: ['rating'],
  })
  declare ratedBy: ManyToMany<typeof User>
}
