import { DateTime } from 'luxon'

class Room {
  private selections: Record<number, number> = {}
  private lastAccessedAt: DateTime
  private resultPicked: boolean
  private expireAfterMinutes = 10

  constructor(firstUserId: number, firstUserMovieId: number) {
    this.selections[firstUserId] = firstUserMovieId
    this.lastAccessedAt = DateTime.now()
    this.resultPicked = false
  }

  ready() {
    return Object.keys(this.selections).length === 2
  }

  valid(): boolean {
    return (
      this.lastAccessedAt.diffNow('minutes').minutes < this.expireAfterMinutes && !this.resultPicked
    )
  }

  expired(): boolean {
    return (
      this.lastAccessedAt.diffNow('minutes').minutes > this.expireAfterMinutes || this.resultPicked
    )
  }

  set(userId: number, movieId: number) {
    this.selections[userId] = movieId
  }

  get() {
    return this.selections
  }

  pick() {
    const movieIds = Object.values(this.selections)
    this.resultPicked = true
    return movieIds[Math.floor(Math.random() * movieIds.length)]
  }
}

class GameRooms {
  private rooms: Record<string, Room> = {}

  #createRoom(room: string, userId: number, movieId: number): void {
    this.rooms[room] = new Room(userId, movieId)
  }

  set(room: string, userId: number, movieId: number): void {
    if (room in this.rooms) {
      const gameRoom = this.rooms[room]

      if (gameRoom.valid()) {
        return gameRoom.set(userId, movieId)
      }
    }

    this.#createRoom(room, userId, movieId)
  }

  get(room: string): Room | undefined {
    if (room in this.rooms) {
      const gameRoom = this.rooms[room]

      if (gameRoom.valid()) {
        return gameRoom
      }
    }

    return undefined
  }
}

const gameRooms = new GameRooms()

export default gameRooms
