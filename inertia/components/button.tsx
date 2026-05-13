import React, { useEffect, useState } from 'react'

type ButtonVariant = 'success' | 'normal' | 'danger'

type ButtonProps = {
  text: string
  variant: ButtonVariant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, variant, onClick }: ButtonProps) {
  const [style, setStyle] = useState<string>('')

  useEffect(() => {
    switch (variant) {
      case 'success':
        setStyle('bg-green-400')
        break
      case 'normal':
        setStyle('bg-yellow-400 hover:bg-yellow-300')
        break
      case 'danger':
        setStyle('bg-red-400 hover:bg-red-300')
    }
  }, [variant])

  return (
    <button
      onClick={onClick}
      className={`mt-2 w-full py-1.5 rounded-lg ${style} text-black text-xs font-semibold transition-colors duration-150`}
    >
      {text}
    </button>
  )
}
