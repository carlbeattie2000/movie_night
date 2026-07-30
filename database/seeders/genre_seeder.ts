import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { tmdb } from '../../app/utils/tmdb.ts'
import Genre from '#models/genre'

export default class extends BaseSeeder {
  async run() {
    const genresResult = await tmdb.genres()

    if (genresResult.status === 'error') {
      throw new Error(genresResult.message)
    }

    const genres = genresResult.result.genres

    for (const genre of genres) {
      await Genre.create({
        tmdbId: genre.id,
        name: genre.name,
      })
    }
  }
}
