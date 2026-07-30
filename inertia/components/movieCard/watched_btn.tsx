import { useState } from 'react'
import { GoCheckCircle } from 'react-icons/go'
import ConfirmModal from '../confirm_modal'

interface WatchedBtnProps {
  show: boolean
  title?: string
  onWatched?: () => void
}

export default function WatchedBtn({ show, title, onWatched }: WatchedBtnProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  if (show && onWatched) {
    return (
      <>
        <ConfirmModal
          icon={<GoCheckCircle />}
          title={`Have you watched ${title ?? 'Movie/Show'}`}
          description="Are you sure you want to add this movie/show to your watched list?"
          open={showConfirmModal}
          onCancel={() => {
            setShowConfirmModal(false)
          }}
          onConfirm={() => {
            if (onWatched) {
              onWatched()
            }
            setShowConfirmModal(false)
          }}
          confirmText="Watched"
        />
        <button
          className="text-green-400 rounded-full p-1.5 text-lg"
          onClick={() => {
            setShowConfirmModal(true)
          }}
        >
          <GoCheckCircle />
        </button>
      </>
    )
  }
}
