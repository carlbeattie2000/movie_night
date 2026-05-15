import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { manyToMany } from '@adonisjs/lucid/orm'
import Movie from './movie.ts'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @manyToMany(() => Movie, {
    pivotTable: 'watchlist_items',
    pivotColumns: ['watched', 'last_watched'],
  })
  declare watchlist_items: ManyToMany<typeof Movie>

  @manyToMany(() => Movie, {
    pivotTable: 'ratings',
    pivotColumns: ['rating'],
  })
  declare ratings: ManyToMany<typeof Movie>
}
