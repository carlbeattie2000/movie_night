import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'watchlist_items'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('first_watched_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('first_watched_at')
    })
  }
}
