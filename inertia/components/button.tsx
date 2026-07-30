import React, { JSX, useEffect, useState } from 'react'

type ButtonVariant = 'success' | 'normal' | 'danger' | 'warning' | 'favourite'

type ButtonProps = {
  text?: string
  icon?: JSX.Element
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  variant: ButtonVariant
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, icon, fontSize, variant, onClick }: ButtonProps) {
  const [style, setStyle] = useState<string>('')

  useEffect(() => {
    switch (variant) {
      case 'success':
        if (icon) {
          setStyle('text-green-500 hover:text-green-200')
        } else {
          setStyle('bg-green-400')
        }
        break
      case 'normal':
        if (icon) {
          setStyle('text-blue-500 hover:text-blue-200')
        } else {
          setStyle('bg-yellow-400 hover:bg-yellow-300')
        }
        break
      case 'danger':
        if (icon) {
          setStyle('text-red-500 hover:text-red-200')
        } else {
          setStyle('bg-red-400 hover:bg-red-300')
        }
        break
      case 'warning':
        if (icon) {
          setStyle('text-yellow-500 hover:text-yellow-200')
        } else {
          setStyle('bg-yellow-400 hover:bg-yellow-300')
        }
        break
      case 'favourite':
        if (icon) {
          setStyle('text-[#d23f55] hover:text-[#e67e8d]')
        } else {
          setStyle('bg-[#d23f55] hover:bg-[#e67e8d]')
        }
    }
  }, [variant])

  if (icon) {
    return (
      <div className="w-full flex justify-center">
        <button
          onClick={onClick}
          className={`rounded-full ${style} text-${fontSize ?? '2xl'} transition-colors duration-150`}
        >
          {icon}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`mt-2 w-full py-1.5 rounded-lg ${style} text-black text-xs font-semibold transition-colors duration-150`}
    >
      {text ?? icon ?? 'Submit'}
    </button>
  )
}
