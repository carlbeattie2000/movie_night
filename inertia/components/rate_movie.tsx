import { useEffect, useState } from 'react'
import Rate from './rate'

interface Movie {
  id: number
  posterUrl: string
  title: string
}

export default function RateMovie() {
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
  }

  useEffect(() => {
    const getNextMovieToRate = async () => {
      const req = await fetch('/api/rating/next', {
        method: 'POST',
      })

      if (req.ok) {
        const result = await req.json()

        setMovie(result.data)
      }
    }

    getNextMovieToRate()
  }, [])

  if (!movie) {
    return
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed bg-white shadow-2xl w-[90%] h-[70%] sm:w-[80%] sm:h-[50%] md:w-[15%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden">
        <img src={movie.posterUrl} alt="" className="h-[75%] sm:h-[65%] w-full object-cover" />
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl">{movie.title}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 text-xs mt-0.5">What do you rate this film?</p>
            <Rate
              maxStars={10}
              onRatingSet={(rating) => {
                setRating(rating)
              }}
            />
          </div>
          <div className="flex justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitRateMovieRequest()
              }}
            >
              <input type="hidden" value={rating} name="rating" />
              <input type="hidden" value={movie.id} name="movie_id" />

              <button className="w-full py-2 rounded-lg bg-zinc-900 text-white text-md font-medium hover:bg-zinc-700 transition-colors">
                Rate
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
