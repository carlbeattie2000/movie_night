import React, { useState } from 'react'

type ButtonVariant = 'success' | 'normal' | 'danger'

type ButtonProps = {
  text: string
  variant: ButtonVariant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, variant, onClick }: ButtonProps) {
  const [btnVariant, _] = useState<ButtonVariant>(variant)

  let style = ''

  switch (btnVariant) {
    case 'success':
    case 'normal':
      style = 'bg-yellow-400 hover:bg-yellow-300'
      break
    case 'danger':
      style = 'bg-red-400 hover:bg-red-300'
  }

  return (
    <button
      onClick={onClick}
      className={`mt-2 w-full py-1.5 rounded-lg ${style} text-black text-xs font-semibold transition-colors duration-150`}
    >
      {text}
    </button>
  )
}
