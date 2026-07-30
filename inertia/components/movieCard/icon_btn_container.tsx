import React from 'react'

export default function IconButtonContainer({
  children,
  background,
}: {
  children: React.ReactNode
  background?: string
}) {
  return (
    <div
      className={`absolute top-2 right-2 ${background ?? 'bg-black/85'} p-1 rounded-full flex flex-col`}
    >
      {children}
    </div>
  )
}
