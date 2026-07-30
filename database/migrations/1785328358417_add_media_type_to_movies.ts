import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('media_type', 10).nullable()
    })

    this.defer(async (db) => {
      await db.from(this.tableName).whereNull('media_type').update({ media_type: 'movie' })
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.string('media_type', 10).notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('media_type')
    })
  }
}
