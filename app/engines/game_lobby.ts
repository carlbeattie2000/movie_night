import { DateTime } from 'luxon'

type ConnectedState = 'connected' | 'ready' | 'unready' | 'declined'
type ConnectedUser = {
  state: ConnectedState
}
type GameLobbyState = 'open' | 'closed'

const LOBBY_STALE_AFTER_MINUTES = 5

export class GameLobby {
  #users: Map<number, ConnectedUser>
  #minRequiredUsers: number
  #createdAt: DateTime
  #state: GameLobbyState

  constructor(minUsers: number) {
    this.#users = new Map()
    this.#minRequiredUsers = minUsers
    this.#createdAt = DateTime.now()
    this.#state = 'open'
  }

  public connectedUsersLength(): number {
    return this.#users.size
  }

  public resetLobby() {
    this.#users = new Map()
    this.#createdAt = DateTime.now()
    this.#state = 'open'
  }

  public canJoin(): boolean {
    return this.#state === 'open' && !this.isExpired()
  }

  public join(userId: number): boolean {
    if (!this.canJoin()) {
      this.resetLobby()
    }

    if (this.#users.has(userId)) return false

    this.#users.set(userId, { state: 'connected' })
    return true
  }

  public disconnect(userId: number): boolean {
    if (this.#users.has(userId)) {
      this.#users.delete(userId)
      return true
    }
    return false
  }

  public hasUser(userId: number): boolean {
    return this.#users.has(userId)
  }

  public readyUp(userId: number): boolean {
    const user = this.#users.get(userId)
    if (user) {
      user.state = 'ready'
      return true
    }
    return false
  }

  public unready(userId: number) {
    const user = this.#users.get(userId)
    if (user) {
      user.state = 'unready'
      return true
    }
    return false
  }

  public decline(userId: number) {
    const user = this.#users.get(userId)
    if (user) {
      user.state = 'declined'
      return true
    }
    return false
  }

  public hasValidUsersCount(): boolean {
    return this.#users.size >= this.#minRequiredUsers
  }

  public isExpired(): boolean {
    return Math.abs(this.#createdAt.diffNow('minutes').minutes) > LOBBY_STALE_AFTER_MINUTES
  }

  public allUsersReady(): boolean {
    for (const [, value] of this.#users) {
      if (value.state !== 'ready') {
        return false
      }
    }
    return true
  }

  public hasAnyUserDeclined(): boolean {
    for (const [, value] of this.#users) {
      if (value.state === 'declined') {
        return true
      }
    }
    return false
  }

  public canStartGame(): boolean {
    return (
      !this.isExpired() &&
      this.#state === 'open' &&
      this.hasValidUsersCount() &&
      this.allUsersReady()
    )
  }

  public startGame(): boolean {
    if (this.canStartGame()) {
      this.#state = 'closed'
      return true
    }
    return false
  }
}
