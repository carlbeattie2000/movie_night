import { useState } from 'react'
import ConfirmModal from '../confirm_modal'
import { GoTrash } from 'react-icons/go'

interface RemoveButtonProps {
  show: boolean
  title?: string
  onRemove?: () => void
}

export default function RemoveButton({ show, title, onRemove }: RemoveButtonProps) {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)

  if (show && onRemove) {
    return (
      <>
        <ConfirmModal
          icon={<GoTrash />}
          title={`Delete ${title ?? 'Movie/Show'}`}
          description="Are you sure you want to delete this movie/show?"
          open={confirmDeleteModalOpen}
          onCancel={() => {
            setConfirmDeleteModalOpen(false)
          }}
          onConfirm={() => {
            if (onRemove) {
              onRemove()
            }
            setConfirmDeleteModalOpen(false)
          }}
          confirmText='Delete'
        />

        <button
          className="text-red-400 rounded-full p-1.5 text-lg"
          onClick={() => {
            setConfirmDeleteModalOpen(true)
          }}
        >
          <GoTrash />
        </button>
      </>
    )
  }
}
