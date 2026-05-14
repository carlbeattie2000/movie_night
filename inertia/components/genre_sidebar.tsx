import { urlFor } from '~/client'

import { Data } from '@generated/data'

interface GenreCardProps {
  genres: Data.Genre[]
}

export function GenreSidebar({ genres }: GenreCardProps) {
  return (
    <aside className="hidden md:block w-48 shrink-0">
      <h3 className="text-zinc-900 text-sm font-semibold mb-3">Genres</h3>
      <ul className="flex flex-col gap-1">
        {genres.map((genre) => {
          return (
            <li key={genre.tmdbId}>
              <a href={urlFor('movies.browse', {}, { qs: { genreId: genre.tmdbId } })}>
                <p className="block text-sm text-zinc-500 hover:text-zinc-900 py-1 transition-colors duration-150">
                  {genre.name}
                </p>
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
