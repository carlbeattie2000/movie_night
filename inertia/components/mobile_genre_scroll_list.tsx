import { Link } from '@adonisjs/inertia/react'
import { urlFor } from '~/client'

import { Data } from '@generated/data'

interface GenreCardProps {
  genres: Data.Genre[]
}

export function MobileGenreScrollList({ genres }: GenreCardProps) {
  return (
    <div className="md:hidden flex gap-2 overflow-x-auto pb-3 mb-4">
      {genres.map((genre) => {
        return (
          <Link href={urlFor('movies.browse', {}, { qs: { genreId: genre.tmdbId } })} key={genre.id}>
            <p className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 hover:bg-yellow-400 hover:text-black transition-colors duration-150">
              {genre.name}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
