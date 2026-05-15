import { useState } from 'react'
import Rate from './rate'

export default function RateMovie() {
  const [open, setOpen] = useState<boolean>(false)

  const [movieId, setMovieId] = useState<string>(-1)
  const [title, setTitle] = useState<string>('')
  const [imagePath, setImagePath] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  if (!open) {
    return
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed bg-white shadow-2xl w-[90%] h-[70%] sm:w-[80%] sm:h-[50%] md:w-[15%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden">
        <img src={imagePath} alt="" className="h-[75%] sm:h-[65%] w-full object-cover" />
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-2xl">{title}</h1>
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
            <button className="w-full py-2 rounded-lg bg-zinc-900 text-white text-md font-medium hover:bg-zinc-700 transition-colors">
              Rate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
