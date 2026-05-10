import env from '#start/env'

const BASE_URL = 'https://api.themoviedb.org/3'

async function tmdbFetch<T>(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${env.get('TMDB_KEY')}` },
  })

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)

  return res.json() as T
}

export const tmdb = {
  search: (query: string) =>
    tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`),
  genres: () => tmdbFetch('/genre/movie/list?language=en-US'),
  movie: (tmdbId: number) => tmdbFetch(`/movie/${tmdbId}?language=en-US`),
}
