import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

const STALE_AFTER_MINUTES = 10
const MIN_PLAYERS_TO_START = 2
const BASE_PROBABILITY = 100

type ConnectedUser = {
  movieId: number
  probability: number
}

type Winner = {
  movieId: number
  userId: number
  probability: number
}

export class Lobby {
  #id: string | null
  #connectedUsers: Map<number, ConnectedUser>
  #totalProbability: number
  #pickedMovieId: number | null
  #startedAt: DateTime | null

  constructor() {
    this.#id = null
    this.#connectedUsers = new Map()
    this.#totalProbability = 0
    this.#pickedMovieId = null
    this.#startedAt = null
  }

  public getId() {
    return this.#id
  }

  public isOpen(): boolean {
    const expired =
      this.#startedAt && Math.abs(this.#startedAt.diffNow('minutes').minutes) >= STALE_AFTER_MINUTES
    const invalid = this.#id === null || this.#pickedMovieId !== null

    return !expired && !invalid
  }

  #open() {
    this.#id = randomUUID()
    this.#startedAt = DateTime.now()
    this.#connectedUsers.clear()
    this.#pickedMovieId = null
  }

  #normalizeUsersProbabilities() {
    for (const [id, value] of this.#connectedUsers) {
      const originalProbability = value.probability
      this.#connectedUsers.set(id, {
        ...value,
        probability: value.probability + this.#totalProbability,
      })
      this.#totalProbability += originalProbability
    }
  }

  public increaseUsersProbability(userId: number, amount: number): boolean {
    const connectedUser = this.#connectedUsers.get(userId)
    if (connectedUser) {
      connectedUser.probability += amount
      return true
    }
    return false
  }

  public join(userId: number, movieId: number): boolean {
    if (!this.isOpen()) {
      this.#open()
    }

    if (userId in this.#connectedUsers) {
      return false
    }

    this.#connectedUsers.set(userId, {
      movieId,
      probability: BASE_PROBABILITY,
    })

    return true
  }

  #canStart(): boolean {
    return this.isOpen() && Object.values(this.#connectedUsers).length >= MIN_PLAYERS_TO_START
  }

  #roll(): Winner {
    const rolled = Math.random() * this.#totalProbability

    for (const [id, value] of this.#connectedUsers) {
      if (rolled <= value.probability) {
        return {
          userId: id,
          movieId: value.movieId,
          probability: value.probability / this.#totalProbability,
        }
      }
    }

    throw new Error('Unable to find a winner')
  }

  public start(): Winner | null {
    if (!this.#canStart()) {
      return null
    }

    this.#normalizeUsersProbabilities()

    const winner = this.#roll()

    return winner
  }
}
