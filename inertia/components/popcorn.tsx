import { useMemo } from 'react'

const POPCORN_SHAPES = [
  '60% 40% 30% 70% / 50% 60% 40% 50%',
  '40% 60% 70% 30% / 60% 40% 50% 60%',
  '50% 50% 30% 70% / 40% 60% 70% 30%',
  '70% 30% 50% 50% / 30% 70% 40% 60%',
  '45% 55% 60% 40% / 55% 45% 35% 65%',
]

const KERNEL_SHAPES = [
  '30% 70% 40% 60% / 50% 40% 60% 50%',
  '50% 50% 30% 70% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 60% 40% 40% 60%',
]

type Piece = {
  left: number
  top: number
  delay: number
  duration: number
  size: number
  shape: string
  rotate: number
  isPopped: boolean
}

export default function Popcorn({ amount }: { amount?: number }) {
  const pieces = useMemo<Piece[]>(
    () =>
      [...Array(amount ?? 32)].map((_, i) => {
        const isPopped = i < 20
        return {
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: -(Math.random() * 8),
          duration: 6 + Math.random() * 4,
          size: isPopped ? 14 + Math.random() * 10 : 8 + Math.random() * 6,
          shape: isPopped
            ? POPCORN_SHAPES[Math.floor(Math.random() * POPCORN_SHAPES.length)]
            : KERNEL_SHAPES[Math.floor(Math.random() * KERNEL_SHAPES.length)],
          rotate: Math.random() * 360,
          isPopped,
        }
      }),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.shape,
            backgroundColor: p.isPopped ? '#fffbeb' : '#fbbf24',
            border: p.isPopped ? '1.5px solid #fde68a' : '1px solid #f59e0b',
            boxShadow: p.isPopped
              ? `inset -2px -2px 3px rgba(251,191,36,0.25), inset 1px 1px 2px rgba(255,255,255,0.8)`
              : `inset -1px -1px 2px rgba(180,100,0,0.2)`,
            animationName: 'floatUp',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes floatUp {
          0%   { opacity: 0;    translate: 0 10px;   scale: 0.8; }
          8%   { opacity: 0.75;                                   }
          50%  { opacity: 0.6;  translate: 0 -55px;  scale: 1;   }
          92%  { opacity: 0.25;                                   }
          100% { opacity: 0;    translate: 0 -115px; scale: 0.85; }
        }
      `}</style>
    </div>
  )
}
