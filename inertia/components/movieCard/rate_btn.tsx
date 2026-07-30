import { GoStar } from 'react-icons/go'

interface RateBtnProps {
  show: boolean
  onRate?: () => void
}

export default function RateBtn({ show, onRate }: RateBtnProps) {
  if (show && onRate) {
    return (
      <button
        className="text-yellow-400 rounded-full p-1.5 text-lg"
        onClick={onRate}
      >
        <GoStar />
      </button>
    )
  }
}
