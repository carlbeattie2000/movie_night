interface MovieCardContentBodyProps {
  title?: string
  releaseDate?: string
  voteAverage?: number
  lastWatched?: number
  ratedByUsers?: {
    id: number
    name: string | null
    rating?: number
  }[]
}

export default function MovieCardContentBody({
  title,
  releaseDate,
  voteAverage,
  lastWatched,
  ratedByUsers,
}: MovieCardContentBodyProps) {
  let avgRating = null

  if (ratedByUsers && ratedByUsers.length > 0) {
    avgRating =
      ratedByUsers.reduce((acc, current) => {
        return acc + (current.rating ?? 0)
      }, 0) / ratedByUsers.length
  }

  return (
    <>
      <p className="text-zinc-900 text-md font-semibold leading-tight line-clamp-1">{title}</p>
      {releaseDate && <p className="text-zinc-500 text-xs mt-0.5">{releaseDate}</p>}
      {voteAverage && <p className="text-zinc-500 text-xs mt-0.5">★ {voteAverage.toFixed(1)}</p>}
      {lastWatched !== undefined && (
        <p className="text-zinc-500 text-xs mt-0.5">
          Last watched: {lastWatched === 0 ? 'Today' : `${lastWatched} days ago`}
        </p>
      )}
      {avgRating && (
        <div className="absolute top-2 bg-[rgba(0,0,0,.8)] border border-zinc-600 text-xs p-2 w-10 h-10 rounded-full flex justify-center items-center">
          <p className="text-yellow-300 text-xs font-bold">{avgRating}</p>
        </div>
      )}
    </>
  )
}
