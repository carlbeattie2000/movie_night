import { Data } from '@generated/data'
import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

const GAME_LENGTH_SECONDS = 50

type GameData = {
  chars: string[]
  words: string[]
}

export default function WordGame({
  user,
  open,
  onCloseClick,
}: {
  user?: Data.User
  open: boolean
  onCloseClick: () => void
}) {
  if (!open) {
    return
  }

  const [waitingForPlayers, setWaitingForPlayers] = useState<boolean>(false)

  const [winner, setWinner] = useState<number | null>(null)
  const [ioInstance, setIoInstance] = useState<Socket | null>(null)

  const [started, setStarted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const [words, setWords] = useState<Set<string>>(new Set())
  const [usedWords, setUsedWords] = useState<string[]>([])

  const [chars, setChars] = useState<Record<number, string>>({})

  const [usedChars, setUsedChars] = useState<number[]>([])

  const usedWordsRef = useRef<string[]>([])

  const updateUsedWords = (words: string[]) => {
    usedWordsRef.current = words
    setUsedWords(words)
  }

  useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          if (ioInstance) {
            ioInstance.emit('word_game__result', user?.id, usedWordsRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [started])

  const checkWordMatchesWord = () => {
    const currentWord = usedChars
      .map((charIndex) => chars[charIndex])
      .join('')
      .toLowerCase()

    if (words.has(currentWord) && !usedWordsRef.current.includes(currentWord)) {
      updateUsedWords([...usedWords, currentWord])
      setUsedChars([])
    }
  }

  useEffect(() => {
    checkWordMatchesWord()
  }, [usedChars])

  useEffect(() => {
    const socket = io()

    socket.on('word_game__started', (gameData: GameData) => {
      setWaitingForPlayers(false)
      setChars(Object.fromEntries(gameData.chars.map((char, i) => [i, char])))
      setWords(new Set(gameData.words))
      setStarted(true)
      setTimeLeft(GAME_LENGTH_SECONDS)
    })

    socket.on('word_game__winner', (winnerId: number) => {
      setStarted(false)
      setWinner(winnerId)
    })

    setIoInstance(socket)
  }, [])

  function onStart() {
    if (ioInstance) {
      setWaitingForPlayers(true)
      ioInstance.emit('word_game__start', user?.id)
    }
  }

  if (waitingForPlayers) {
    return (
      <>
        <style>{`
    @keyframes bop {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .dot { width: 8px; height: 8px; border-radius: 9999px; background: #16a34a; animation: bop 0.8s ease-in-out infinite; }
    .dot:nth-child(2) { animation-delay: 0.15s; }
    .dot:nth-child(3) { animation-delay: 0.3s; }
  `}</style>
        <div className="fixed inset-0 bg-black/50 z-50" />
        <div className="fixed bg-white shadow-lg w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-100 p-10 z-50 flex flex-col items-center gap-6">
          <div className="flex gap-2 items-center">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg font-medium text-gray-900">Waiting for players</p>
          </div>
        </div>
      </>
    )
  }

  if (winner !== null) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50" />
        <div className="fixed bg-white shadow-lg w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-100 p-10 z-50 flex flex-col items-center gap-6">
          <div className="text-5xl">🏆</div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Winner</p>
            <p className="text-2xl font-semibold text-gray-900">{winner}</p>
          </div>
          <button
            className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
            onClick={onCloseClick}
          >
            Close
          </button>
        </div>
      </>
    )
  }

  if (!started) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50" />
        <div className="fixed bg-white shadow-lg w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-100 p-10 z-50 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-medium text-gray-900">Word Game</h1>
            <p className="text-sm text-gray-400">Make as many words as you can</p>
          </div>
          <button
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors"
            onClick={onStart}
          >
            Start game
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <div className="fixed bg-white shadow-2xl w-[95%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden flex flex-col gap-12 items-center z-50">
        <div className="flex flex-col gap-6 p-4 items-center">
          <h1 className="text-4xl line-clamp-1">Word Game</h1>
          <p className="text-2xl line-clamp-1">{timeLeft}</p>
        </div>

        <div className="flex flex-wrap flex-col gap-2 py-4 px-2 bg-gray-800 w-[90%] h-[30%] rounded-lg">
          {usedWords.map((word) => {
            return <p className="uppercase font-bold text-sm text-mist-100">{word}</p>
          })}
        </div>

        <div className="grid grid-cols-6 gap-2 py-4 px-2 items-center justify-center bg-gray-800 w-[90%] rounded-lg">
          {new Array(Object.keys(chars).length).fill(undefined).map((_, position) => {
            const charIndex = usedChars[position]
            const char = charIndex !== undefined ? chars[charIndex] : ''
            return (
              <div
                key={position}
                className="flex bg-green-200 rounded-md w-full h-15 justify-center items-center"
              >
                <button
                  className="uppercase font-bold text-2xl w-full h-full"
                  onClick={() => {
                    if (charIndex === undefined) return
                    setUsedChars(usedChars.filter((_, idx) => idx !== position))
                  }}
                >
                  {char}
                </button>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Object.entries(chars).map(([key, char]) => {
            const charIndex = Number(key)
            const charUsed = usedChars.includes(charIndex)
            return (
              <button
                key={charIndex}
                disabled={charUsed}
                className={`px-4 py-3 rounded-md font-bold text-xl uppercase transition-opacity
        ${charUsed ? 'opacity-0 cursor-not-allowed' : 'bg-green-200'}`}
                onClick={() => setUsedChars([...usedChars, charIndex])}
              >
                {char}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
