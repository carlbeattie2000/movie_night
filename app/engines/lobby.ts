import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

const STALE_AFTER_MINUTES = 10
const MIN_PLAYERS_TO_START = 2
const BASE_PROBABILITY = 100

type ConnectedUser = {
  movieId: number
  probability: number
  upperBound: number
  ready: boolean
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
  #result: Winner | null
  #startedAt: DateTime | null

  constructor() {
    this.#id = null
    this.#connectedUsers = new Map()
    this.#totalProbability = 0
    this.#result = null
    this.#startedAt = null
  }

  public getId() {
    return this.#id
  }

  public isOpen(): boolean {
    const expired =
      this.#startedAt && Math.abs(this.#startedAt.diffNow('minutes').minutes) >= STALE_AFTER_MINUTES
    const invalid = this.#id === null || this.#result !== null

    return !expired && !invalid
  }

  #open() {
    this.#id = randomUUID()
    this.#startedAt = DateTime.now()
    this.#connectedUsers.clear()
    this.#result = null
  }

  #normalizeUsersProbabilities() {
    for (const [id, value] of this.#connectedUsers) {
      this.#connectedUsers.set(id, {
        ...value,
        upperBound: value.probability + this.#totalProbability,
      })
      this.#totalProbability += value.probability
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

    if (this.#connectedUsers.has(userId)) {
      return false
    }

    this.#connectedUsers.set(userId, {
      movieId,
      probability: BASE_PROBABILITY,
      ready: false,
      upperBound: 0,
    })

    return true
  }

  public disconnect(userId: number): boolean {
    if (this.#connectedUsers.has(userId)) {
      this.#connectedUsers.delete(userId)
      return true
    }
    return false
  }

  public readyUp(userId: number): boolean {
    const connectedUser = this.#connectedUsers.get(userId)

    if (connectedUser && this.isOpen()) {
      connectedUser.ready = true
      return true
    }
    return false
  }

  #finished(): boolean {
    return this.#result !== null
  }

  #canStart(): boolean {
    const valid = this.isOpen() && this.#connectedUsers.size >= MIN_PLAYERS_TO_START
    const playersReady = this.#connectedUsers.values().every((val) => val.ready)

    return valid && playersReady
  }

  #roll(): Winner {
    const rolled = Math.random() * this.#totalProbability

    for (const [id, value] of this.#connectedUsers) {
      if (rolled <= value.upperBound) {
        return {
          userId: id,
          movieId: value.movieId,
          probability: value.probability / this.#totalProbability,
        }
      }
    }

    throw new Error('Unable to find a winner')
  }

  public results(): Winner | null {
    return this.#result
  }

  public start(): Winner | null {
    if (this.#finished()) {
      return this.#result
    }

    if (!this.#canStart()) {
      return null
    }

    this.#normalizeUsersProbabilities()

    this.#result = this.#roll()

    return this.#result
  }
}
