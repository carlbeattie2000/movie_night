export interface MovieResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
}

export interface MovieSearchResult {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export interface SingleMovieResult {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: { id: number; name: string; poster_path: string }
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: number
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  softcore: boolean
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface GenresResult {
  genres: {
    id: number
    name: string
  }[]
}

export interface Providers {
  results?: {
    GB?: {
      flatrate?: {
        logo_path: string
        provider_name: string
      }[]
    }
  }
}
