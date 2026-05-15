import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ratings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('movie_id')
        .unsigned()
        .references('id')
        .inTable('movies')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')

      table.integer('rating').unsigned().checkBetween([1, 10])

      table.primary(['movie_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
