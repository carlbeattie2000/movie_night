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
      <div className="fixed bg-white shadow-2xl w-[95%] h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden z-50">
        <div className="flex flex-col gap-6 h-full p-4 justify-center items-center">
          <p>{text}</p>
          <button
            className="px-4 py-6 bg-green-400 hover:bg-green-200 text-white font-bold text-2xl w-[60%] rounded-sm"
            onClick={onSuccess}
          >
            Yes
          </button>
          <button
            className="px-4 py-6 bg-red-400 hover:bg-red-200 text-white font-bold text-2xl w-[60%] rounded-sm"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </>
  )
}
