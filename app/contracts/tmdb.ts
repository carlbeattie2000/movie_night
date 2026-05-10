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
  total_page: number
  total_results: number
}
