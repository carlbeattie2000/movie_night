import { useEffect, useState } from 'react'

const GAME_LENGTH = 45

export default function WordGame() {
  const [started, setStarted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const [words, setWords] = useState<string[]>([])
  const [usedWords, setUsedWords] = useState<string[]>([])

  const [chars, _] = useState<Record<number, string>>({
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'r',
    4: 'l',
    5: 'd',
  })

  const [usedChars, setUsedChars] = useState<number[]>([])

  useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
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

    if (words.includes(currentWord) && !usedWords.includes(currentWord)) {
      setUsedWords([...usedWords, currentWord])
      setUsedChars([])
    }
  }

  useEffect(() => {
    checkWordMatchesWord()
  }, [usedChars])

  if (!started) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed bg-white shadow-2xl w-[95%] h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden">
          <div className="flex flex-col gap-6 h-full p-4 justify-center items-center">
            <button
              className="px-4 py-6 bg-green-400 hover:bg-green-200 text-white font-bold text-2xl w-[60%] rounded-sm"
              onClick={() => {
                setStarted(true)
                setTimeLeft(GAME_LENGTH)
              }}
            >
              Start
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed bg-white shadow-2xl w-[95%] h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-6 p-4 items-center">
          <h1 className="text-4xl line-clamp-1">Word Game</h1>
          <p className="text-2xl line-clamp-1">{timeLeft}</p>
        </div>

        <div className="flex flex-wrap flex-col gap-2 py-4 px-2 bg-gray-800 w-[90%] h-[30%] rounded-lg">
          {usedWords.map((word) => {
            return <p className="uppercase font-bold text-sm text-mist-100">{word}</p>
          })}
        </div>

        <div className="grid grid-cols-6 gap-2 py-4 px-2 items-center justify-center bg-gray-800 w-[90%]">
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

        <div className="flex gap-4 p-4 items-center justify-center">
          {Object.entries(chars).map(([key, char]) => {
            const charIndex = Number(key)
            const charUsed = usedChars.includes(charIndex)
            return (
              <button
                key={charIndex}
                disabled={charUsed}
                className={`px-6 py-4 rounded-md font-bold text-2xl uppercase transition-opacity
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
