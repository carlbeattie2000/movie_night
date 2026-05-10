import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { tmdb } from '../../app/utils/tmdb.ts'
import Genre from '#models/genre'

export default class extends BaseSeeder {
  async run() {
    const genresResult = await tmdb.genres()

    genresResult.genres.forEach(async (genre) => {
      await Genre.create({
        tmdbId: genre.id,
        name: genre.name,
      })
    })
  }
}
