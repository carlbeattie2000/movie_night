import { Data } from '@generated/data'
import MovieCard from '~/components/movie_card'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  result: Data.MovieResult[]
}>

export default function Index({ result }: PageProps) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 p-4">
        {result.map((movie) => {
          return (
            <MovieCard
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterUrl={movie.poster_path}
              voteAverage={movie.vote_average}
              addBtn
            />
          )
        })}
      </div>
    </>
  )
}
