import { Data } from '@generated/data'
import MovieCard from '~/components/movie_card'
import Pagination from '~/components/pagination'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  result: Data.MovieResult[]
  totalPages: number
  currentPage: number
  genreId: number
}>

export default function Index({ result, totalPages, currentPage, genreId }: PageProps) {
  return (
    <div className="flex flex-col gap-8 bg-zinc-50">
      <div className="mt-8">
        <Pagination
          route="movies.browse"
          currentPage={currentPage}
          totalPages={totalPages}
          query={{ genreId }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-10 w-full p-6">
        {result.map((movie) => {
          return (
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterUrl={movie.poster_path}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              addBtn
            />
          )
        })}
      </div>

      <div className='mb-8'>
        <Pagination
          route="movies.browse"
          currentPage={currentPage}
          totalPages={totalPages}
          query={{ genreId }}
        />
      </div>
    </div>
  )
}
