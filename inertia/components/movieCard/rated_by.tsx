import Rate from '../rate'

interface RatedByProps {
  show: boolean
  ratedByUsers?: {
    id: number
    name: string | null
    rating?: number
  }[]
}

export default function RatedBy({ show, ratedByUsers }: RatedByProps) {
  if (show && ratedByUsers) {
    return ratedByUsers.map((rate) => {
      const textColor = rate.name === 'Carl' ? 'text-[#7797db]' : 'text-[#db77ca]'
      const strokeColor = rate.name === 'Carl' ? '#7797db' : '#db77ca'

      return (
        <div className="flex flex-col gap-2">
          <p className={`${textColor} text-xs mt-0.5 font-bold`}>{rate.name} ({rate.rating}/10)</p>
          <Rate maxStars={10} rated={rate.rating} strokeColor={strokeColor} />
        </div>
      )
    })
  }
}
