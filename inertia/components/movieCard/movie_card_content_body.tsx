interface MovieCardContentBodyProps {
  title?: string
  releaseDate?: string
  voteAverage?: number
  lastWatched?: number
}

export default function MovieCardContentBody({
  title,
  releaseDate,
  voteAverage,
  lastWatched,
}: MovieCardContentBodyProps) {
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
    </>
  )
}
