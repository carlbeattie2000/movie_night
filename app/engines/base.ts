import { DateTime } from 'luxon'
import { GameLobby } from './game_lobby.ts'

const GAME_EXPIRE_AFTER_MINUTES = 10

export default class Game extends GameLobby {
  #startedAt: DateTime | null
  #finishedAt: DateTime | null

  constructor(minUsersForGameStart = 2) {
    super(minUsersForGameStart)
    this.#startedAt = null
    this.#finishedAt = null
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
    return (
      this.#finishedAt ||
      Math.abs(this.minutesSinceStarted()) > GAME_EXPIRE_AFTER_MINUTES ||
      this.isExpired()
    )
  }

  public override canStartGame(): boolean {
    if (this.#startedAt !== null || this.#finishedAt !== null) {
      return false
    }

    return super.canStartGame()
  }

  public override startGame(): boolean {
    if (!this.canStartGame()) {
      return false
    }

    super.startGame()
    this.#startedAt = DateTime.now()
    return true
  }

  public finishGame() {
    this.#finishedAt = DateTime.now()
  }

  public reset() {
    this.resetLobby()
    this.#startedAt = null
    this.#finishedAt = null
  }
}
