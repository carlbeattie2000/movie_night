type Props = {
  open: boolean
  text: string
  onSuccess: () => void
  onCancel: () => void
}

export default function ActionPopup({ open, text, onSuccess, onCancel }: Props) {
  if (!open) {
    return
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <div className="fixed bg-white shadow-lg w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-100 p-8 z-50 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Confirm action</p>
          <p className="text-base text-gray-800 leading-relaxed">{text}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors"
            onClick={onSuccess}
          >
            Yes
          </button>
          <button
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </>
  )
}
