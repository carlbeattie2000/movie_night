import { type NormalizedSearchResult, type MovieResult } from '../contracts/tmdb.ts'

export function normalizeTmdbSearchResults(results: MovieResult[]): NormalizedSearchResult[] {
  return results.map((result) => {
    return {
      id: result.id,
      title: result.media_type === 'movie' ? result.title : result.name,
      genre_ids: result.genre_ids,
      popularity: result.popularity,
      poster_path: result.poster_path,
      release_date: result.media_type === 'movie' ? result.release_date : result.first_air_date,
      vote_average: result.vote_average,
      media_type: result.media_type,
    }
  })
}
