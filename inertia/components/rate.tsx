import { useEffect, useState } from 'react'

interface RateProps {
  maxStars: number
  rated?: number
  onRatingSet?: (rating: number) => void
}

export default function Rate({ maxStars, rated, onRatingSet }: RateProps) {
  const [selected, setSelected] = useState<number[]>(new Array(maxStars).fill(0))

  useEffect(() => {
    if (rated !== undefined && rated !== null) {
      setSelected(Array.from({ length: selected.length }, (_, i) => (i < rated ? 1 : 0)))
    }
  }, [rated])

  useEffect(() => {
    if (rated !== undefined && rated !== null) return // Don't call onRatingSet in display mode

    const currentRating = selected.reduce((sum, star) => sum + (star ? 1 : 0), 0)
    onRatingSet?.(currentRating)
  }, [selected, rated, onRatingSet])

  function updateSelectedStars(clickedIndex: number) {
    if (rated) return

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
