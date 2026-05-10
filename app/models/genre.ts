import { GenreSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import Movie from './movie.ts'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Genre extends GenreSchema {
  @manyToMany(() => Movie, {
    pivotTable: 'movie_genres',
  })
  declare movies: ManyToMany<typeof Movie>
}
