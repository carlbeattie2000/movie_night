import { useState } from 'react'
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
  const [ratedByToggled, setRatedByToggled] = useState(false)

  const showRatedBy = ratedByUsers && ratedByUsers.length > 0

  return (
    <div
      className="aspect-2/3 overflow-hidden relative"
      onClick={() => {
        setRatedByToggled(!ratedByToggled)
      }}
    >
      {showRatedBy && (
        <div className={`absolute w-full h-full ${ratedByToggled ? 'opacity-100 z-30' : 'opacity-0 z-0'} transition-opacity`}>
          <div className="absolute w-full h-full bg-[rgba(0,0,0,.95)]"></div>
          <div className="absolute w-full h-full bottom-0 p-2 flex flex-col gap-2">
            <RatedBy
              show={ratedByUsers !== undefined && ratedByUsers.length > 0}
              ratedByUsers={ratedByUsers}
            />
          </div>
        </div>
      )}

      <img src={url} alt={title} className="rounded-t w-full h-full object-cover" />
    </div>
  )
}
