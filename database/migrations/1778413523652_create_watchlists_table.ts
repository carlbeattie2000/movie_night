import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'watchlists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('movieId')
        .unsigned()
        .references('id')
        .inTable('movies')
        .notNullable()
        .onDelete('CASCADE')

      table.boolean('watched').notNullable().defaultTo(false)

      table.timestamp('last_watched').nullable()
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
