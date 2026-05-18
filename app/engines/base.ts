import { DateTime } from 'luxon'

const GAME_EXPIRE_AFTER_MINUTES = 10

export default class Game {
  #minUsersForGameStart: number
  #startedAt: DateTime | null
  #finishedAt: DateTime | null
  #users: number[]

  constructor(minUsersForGameStart = 2) {
    this.#minUsersForGameStart = minUsersForGameStart
    this.#startedAt = null
    this.#finishedAt = null
    this.#users = []
  }

  public connectUser(userId: number): boolean {
    if (this.#users.includes(userId)) {
      return false
    }
    this.#users.push(userId)
    return true
  }

  public disconnectUser(userId: number): void {
    this.#users = this.#users.filter((id) => id !== userId)
  }

  public connectedUsersIds(): number[] {
    return [...this.#users]
  }

  public connectedUsers(): number {
    return this.#users.length
  }

  public hasUser(userId: number): boolean {
    return this.#users.includes(userId)
  }

  public hasUsers(userIds: number[]): boolean {
    return userIds.every((id) => this.#users.includes(id))
  }

  public started(): boolean {
    return this.#startedAt !== null
  }

  public finished(): boolean {
    return this.#finishedAt !== null
  }

  public minutesSinceStarted() {
    return this.#startedAt?.diffNow('minute').minutes ?? 0
  }

  public minutesSinceFinished() {
    return this.#finishedAt?.diffNow('minute').minutes ?? 0
  }

  public invalid() {
    return this.#finishedAt || Math.abs(this.minutesSinceStarted()) > GAME_EXPIRE_AFTER_MINUTES
  }

  public canStart(): boolean {
    if (this.#users.length < this.#minUsersForGameStart) {
      return false
    }

    if (this.#startedAt !== null || this.#finishedAt !== null) {
      return false
    }

    return true
  }

  public start(): boolean {
    if (!this.canStart()) {
      return false
    }
    this.#startedAt = DateTime.now()
    return true
  }

  public finish() {
    this.#finishedAt = DateTime.now()
  }

  public reset() {
    this.#startedAt = null
    this.#finishedAt = null
    this.#users = []
  }
}
