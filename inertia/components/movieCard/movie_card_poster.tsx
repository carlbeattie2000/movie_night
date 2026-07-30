import RatedBy from './rated_by'

interface PosterProps {
  url?: string
  title?: string
  ratedByUsers?: {
    id: number
    name: string | null
    rating?: number
  }[]
}

export default function MovieCardPoster({ url, title, ratedByUsers }: PosterProps) {
  const showRatedBy = ratedByUsers && ratedByUsers.length > 0

  return (
    <div className="aspect-2/3 overflow-hidden relative">
      {showRatedBy && (
        <div className="bg-black/95 absolute w-full h-fit bottom-0 p-2 flex flex-col gap-2">
          <RatedBy
            show={ratedByUsers !== undefined && ratedByUsers.length > 0}
            ratedByUsers={ratedByUsers}
          />
        </div>
      )}

      <img src={url} alt={title} className="rounded-t w-full h-full object-cover" />
    </div>
  )
}
