import { Data } from '@generated/data'
import { useEffect, useState } from 'react'
import { GenreSidebar } from '~/components/genre_sidebar'
import { MobileGenreScrollList } from '~/components/mobile_genre_scroll_list'
import MovieCard from '~/components/movie_card'
import Popcorn from '~/components/popcorn'
import RateMovie from '~/components/rate_movie'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  genres: Data.Genre[]
  selfUnwatched: Data.Movie[]
  otherUnwatched: Data.Movie[]
  combinedWatched: Data.WatchlistItem[]
  other: Data.User
}>

enum MoviesToShow {
  OWN,
  OTHER,
  WATCHED,
}

export default function Home({
  genres,
  selfUnwatched,
  otherUnwatched,
  combinedWatched,
  user,
  other,
}: PageProps) {
  const [usersUnwatched, setUsersUnwatched] = useState<Data.Movie[]>(selfUnwatched)
  const [localSearchInput, setLocalSearchInput] = useState<string>('')
  const [movieToRateId, setMovieToRateId] = useState<number | null>(null)

  const [moviesToShow, setMoviesToShow] = useState<MoviesToShow>(MoviesToShow.OWN)

  const onRemoveMovie = async (movieId: number) => {
    const res = await fetch('/api/watchlist/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movieId,
      }),
    })

    if (res.ok) {
      setUsersUnwatched(usersUnwatched.filter((movie) => movie.id !== movieId))
    }
  }

  const onWatchedMovie = async (movieId: number) => {
    const res = await fetch('/api/watchlist/watched', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movieId,
      }),
    })

    if (res.ok) {
      setUsersUnwatched(usersUnwatched.filter((movie) => movie.id !== movieId))
    }
  }

  const updateLocalSearchResults = () => {
    if (localSearchInput === '') {
      return setUsersUnwatched(selfUnwatched)
    }

    setUsersUnwatched(
      selfUnwatched.filter((movie) =>
        movie.title.toLowerCase().includes(localSearchInput.toLowerCase())
      )
    )
  }

  useEffect(() => {
    updateLocalSearchResults()
  }, [localSearchInput])

  return (
    <>
      <div className="relative min-h-screen bg-white">
        <Popcorn amount={256} />

        <div className="max-w-7xl mx-auto px-4 py-6 relative z-20">
          <div className="flex flex-col gap-8 md:hidden">
            <MobileGenreScrollList genres={genres} />

            <div className="md:hidden flex gap-2 overflow-x-auto">
              <button
                onClick={() => setMoviesToShow(MoviesToShow.OWN)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-400 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-150"
              >
                My List
              </button>

              <button
                onClick={() => setMoviesToShow(MoviesToShow.OTHER)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-400 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-150"
              >
                {other.name}'s List
              </button>

              <button
                onClick={() => setMoviesToShow(MoviesToShow.WATCHED)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-400 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-150"
              >
                Watched
              </button>
            </div>

            <h2 className="text-zinc-900 text-lg font-semibold">
              {moviesToShow === MoviesToShow.OWN
                ? user?.name + "'s picks"
                : moviesToShow === MoviesToShow.OTHER
                  ? other.name + "'s picks"
                  : 'Watched'}{' '}
            </h2>

            {moviesToShow === MoviesToShow.OWN && (
              <input
                placeholder="search"
                className="border border-gray-400 rounded-sm px-4 py-2 w-full"
                value={localSearchInput}
                onInput={(e) => {
                  setLocalSearchInput(e.currentTarget.value)
                }}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              {moviesToShow === MoviesToShow.OWN &&
                usersUnwatched.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      {...movie}
                      selectBtn
                      removeBtn
                      watchedBtn
                      onWatched={() => onWatchedMovie(movie.id)}
                      onRemove={() => onRemoveMovie(movie.id)}
                    />
                  )
                })}

              {moviesToShow === MoviesToShow.OTHER &&
                otherUnwatched.map((movie) => {
                  return <MovieCard {...movie} />
                })}

              {moviesToShow === MoviesToShow.WATCHED &&
                combinedWatched.map((watchlistItem) => {
                  return (
                    <MovieCard
                      {...watchlistItem.movie}
                      key={watchlistItem.movie.id}
                      lastWatched={watchlistItem.daysSinceWatched}
                      selectBtn={watchlistItem.userId === user?.id}
                      onClick={() => {
                        setMovieToRateId(watchlistItem.movie.id)
                      }}
                    />
                  )
                })}
            </div>
          </div>

          <div className="gap-8 hidden md:flex">
            <GenreSidebar genres={genres} />

            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:divide-x md:divide-zinc-200 gap-8 md:gap-0">
                <div className="md:pr-8 md:flex-1">
                  <h2 className="text-zinc-900 text-lg font-semibold mb-4">{user?.name}'s picks</h2>

                  <input
                    placeholder="search"
                    className="border border-gray-400 rounded-sm px-4 py-2 w-full mb-4"
                    value={localSearchInput}
                    onInput={(e) => {
                      setLocalSearchInput(e.currentTarget.value)
                    }}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-3">
                    {usersUnwatched.map((movie) => {
                      return (
                        <MovieCard
                          key={movie.id}
                          {...movie}
                          selectBtn
                          removeBtn
                          watchedBtn
                          onWatched={() => onWatchedMovie(movie.id)}
                          onRemove={() => onRemoveMovie(movie.id)}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="md:pl-8 md:flex-1">
                  <h2 className="text-zinc-900 text-lg font-semibold mb-4">{other.name}'s picks</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-3">
                    {otherUnwatched.map((movie) => {
                      return <MovieCard {...movie} />
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:pl-8 md:flex-1 mt-8 hidden md:block">
            <h2 className="text-zinc-900 text-lg font-semibold mb-4">Watched</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {combinedWatched.map((watchlistItem) => {
                return (
                  <MovieCard
                    {...watchlistItem.movie}
                    key={watchlistItem.movie.id}
                    lastWatched={watchlistItem.daysSinceWatched}
                    selectBtn={watchlistItem.userId === user?.id}
                    onClick={() => {
                      setMovieToRateId(watchlistItem.movie.id)
                    }}
                  />
                )
              })}
            </div>
          </div>

          <RateMovie
            movieId={movieToRateId}
            onMovieRateRequest={() => {
              setMovieToRateId(null)
            }}
          />
        </div>
      </div>
    </>
  )
}
