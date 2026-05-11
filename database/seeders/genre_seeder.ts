import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { tmdb } from '../../app/utils/tmdb.ts'
import Genre from '#models/genre'

export default class extends BaseSeeder {
  async run() {
    const genresResult = await tmdb.genres()

    if (genresResult.status === 'invalid_json') {
      throw new Error(genresResult.message)
    }

    genresResult.result.genres.forEach(async (genre) => {
      await Genre.create({
        tmdbId: genre.id,
        name: genre.name,
      })
    })
  }
}
