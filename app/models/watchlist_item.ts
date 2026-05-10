import { WatchlistItemSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import User from './user.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Movie from './movie.ts'

export default class WatchlistItem extends WatchlistItemSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>
}
