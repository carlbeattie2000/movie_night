import { describe } from 'node:test'
import { JSX, useState } from 'react'

interface ConfirmModalProps {
  onCancel: () => void
  onConfirm: () => void
  icon?: JSX.Element
  open: boolean
  title: string
  description?: string
  confirmText?: string
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  icon,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) {
    return
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900/50 z-10" onClick={onCancel}>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="bg-white w-[90vw] min-h-[30vh] rounded-md z-[100]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3 items-center mt-6">
            {icon && <div className="text-2xl text-red-500">{icon}</div>}

            <h2 className="font-bold text-wrap w-[80vw] text-center">{title}</h2>

            {description && <p className="text-sm text-gray-600 text-wrap text-center w-[80vw]">{description}</p>}

            <div className="flex w-full gap-3 pl-4 pr-4 mt-3">
              <button
                className="w-full bg-blue-500 text-white pt-2 pb-2 pr-6 pl-6 font-bold rounded-sm"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="w-full bg-red-500 text-white pt-2 pb-2 pr-6 pl-6 font-bold rounded-sm"
                onClick={onConfirm}
              >
                {confirmText ?? 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
