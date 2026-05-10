import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('tmdb_id').unsigned().notNullable().index()

      table.string('title').notNullable()
      table.string('category').notNullable()
      table.string('poster_url').notNullable()
      table.integer('vote_average').notNullable()

      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
