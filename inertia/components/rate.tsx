import { useEffect, useState } from 'react'

interface RateProps {
  maxStars: number
  onRatingSet: (rating: number) => void
}

export default function Rate({ maxStars, onRatingSet }: RateProps) {
  const [selected, setSelected] = useState<number[]>(new Array(maxStars).fill(0))

  useEffect(() => {
    const rating = selected.reduce((prev, next) => {
      return next ? prev + 1 : prev
    }, 0)

    onRatingSet(rating)
  }, [selected])

  function updateSelectedStars(clickedIndex: number) {
    setSelected(
      selected.map((_, i) => {
        return i <= clickedIndex ? 1 : 0
      })
    )
  }

  return (
    <div className="flex">
      {selected.map((v, i) => {
        return (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => updateSelectedStars(i)}
          >
            <polygon
              points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"
              fill={v ? '#f5a623' : 'transparent'}
              stroke="#f5a623"
              stroke-width="1"
              stroke-linejoin="round"
            />
          </svg>
        )
      })}
    </div>
  )
}
