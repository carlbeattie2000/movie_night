import { useEffect, useState } from 'react'
import Rate from './rate'

interface Movie {
  id: number
  posterUrl: string
  title: string
}

export default function RateMovie({
  movieId,
  onMovieRateRequest,
}: {
  movieId: number | null
  onMovieRateRequest?: () => void
}) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [rating, setRating] = useState<number>(0)

  async function submitRateMovieRequest() {
    if (!movie) {
      return
    }

    const req = await fetch('/api/rating/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movie.id,
        rating,
      }),
    })

    if (req.ok) {
      setMovie(null)
    }

    if (onMovieRateRequest) {
      onMovieRateRequest()
    }
  }

  useEffect(() => {
    const getMovieToRate = async () => {
      if (!movieId) return

      const req = await fetch('/api/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movieId,
        }),
      })

      if (req.ok) {
        const result = await req.json()

        setMovie(result.data)
      }
    }

    if (movieId) {
      getMovieToRate()
    }
  }, [movieId])

  if (!movie) {
    return
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed bg-white shadow-2xl w-[90%] h-[70%] sm:w-[80%] sm:h-[50%] md:w-[15%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden">
        <img src={movie.posterUrl} alt="" className="h-[40%] sm:h-[65%] w-full object-cover" />
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl line-clamp-1">{movie.title}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 text-xs mt-0.5">What do you rate this film?</p>
            <Rate
              maxStars={10}
              onRatingSet={(rating) => {
                setRating(rating)
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitRateMovieRequest()
              }}
              className="w-full"
            >
              <input type="hidden" value={rating} name="rating" />
              <input type="hidden" value={movie.id} name="movie_id" />

              <button className="w-full py-2 rounded-lg bg-zinc-900 text-white text-md font-medium hover:bg-zinc-700 transition-colors">
                Rate
              </button>
            </form>
            <button
              className="w-full py-2 rounded-lg bg-red-900 text-white text-md font-medium hover:bg-zinc-700 transition-colors"
              onClick={() => setMovie(null)}
            >
              Not Watched
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
