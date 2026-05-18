import { readFileSync } from 'node:fs'
import Game from './base.ts'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'

const WORDS = readFileSync(join(app.makePath('resources/data/words.txt')), 'utf-8').split('\n')
const VOWELS = 'aeiou'.split('')
const CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('').filter((char) => !VOWELS.includes(char))

const MIN_VALID_WORDS_BEFORE_START = 60

type GameData = {
  chars: string[]
  words: string[]
}

type Result = {
  userId: number
  words: string[]
}

type WordGameResponse =
  | 'user_not_registered'
  | 'user_already_submited'
  | 'could_not_start_game'
  | null

type FindWinnerResponse =
  | { error: 'not_all_players_submited' | 'could_not_find_winner' }
  | { error: null; winner: number }

type StartGameResponse = { error: 'could_not_start_game' } | { error: null; gameData: GameData }

export class WordGame extends Game {
  #results: Result[]
  #winner: number | null

  constructor() {
    super()

    this.#results = []
    this.#winner = null
  }

  #makeWordCharCount(word: string | string[]): Record<string, number> {
    const wordChars = !Array.isArray(word)
      ? word.split('')
      : word.every((char) => char.length === 1)
        ? word
        : []

    if (wordChars.length === 0) {
      return {}
    }

    const charCount: Record<string, number> = {}

    for (const char of wordChars) {
      charCount[char] = (charCount[char] ?? 0) + 1
    }

    return charCount
  }

  #hasCharsForWord(charCountCollection: Record<string, number>, word: string | string[]): boolean {
    const wordCharCount = this.#makeWordCharCount(word)

    for (const [char, count] of Object.entries(wordCharCount)) {
      if ((charCountCollection[char] ?? 0) < count) return false
    }

    return true
  }

  #generateCharsForGame(
    { vowels, consonants }: { vowels: number; consonants: number } = { vowels: 2, consonants: 4 }
  ): string[] {
    const chars = []

    for (let i = 0; i < vowels; i++) {
      chars.push(VOWELS[Math.floor(Math.random() * VOWELS.length)])
    }

    for (let i = 0; i < consonants; i++) {
      chars.push(CHARS[Math.floor(Math.random() * CHARS.length)])
    }

    return chars.sort(() => Math.random() - 0.5)
  }

  #generateGameData(): GameData {
    const chars = this.#generateCharsForGame()
    const charCountCollection = this.#makeWordCharCount(chars)
    const words = WORDS.filter((word) => this.#hasCharsForWord(charCountCollection, word))

    return { chars, words }
  }

  public startGame(): StartGameResponse {
    if (!this.start()) {
      return { error: 'could_not_start_game' }
    }

    let gameData = this.#generateGameData()

    while (gameData.words.length < MIN_VALID_WORDS_BEFORE_START) {
      gameData = this.#generateGameData()
    }

    return { error: null, gameData }
  }

  public registerUserResult(result: Result): WordGameResponse {
    if (!this.hasUser(result.userId)) {
      return 'user_not_registered'
    }

    if (this.#results.some((savedResult) => savedResult.userId === result.userId)) {
      return 'user_already_submited'
    }

    this.#results.push(result)

    return null
  }

  public getWinner(): FindWinnerResponse {
    if (this.#winner !== null) {
      return { error: null, winner: this.#winner }
    }

    if (this.#results.length !== this.connectedUsers()) {
      return { error: 'not_all_players_submited' }
    }

    let topScore = 0
    let userId = -1

    for (const result of this.#results) {
      const totalLength = result.words.join('').trim().length

      if (totalLength > topScore) {
        topScore = totalLength
        userId = result.userId
      }
    }

    if (userId === -1) {
      return { error: 'could_not_find_winner' }
    }

    this.#winner = userId
    this.finish()

    return { error: null, winner: userId }
  }

  public override reset(): void {
    super.reset()

    this.#results = []
    this.#winner = null
  }
}
