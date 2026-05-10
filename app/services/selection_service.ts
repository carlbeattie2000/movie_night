class SelectionService {
  private selections: Record<number, number> = {}
  private ready: Set<number> = new Set()

  set(userId: number, movieId: number) {
    this.selections[userId] = movieId
  }

  get() {
    return this.selections
  }

  setReady(userId: number) {
    this.ready.add(userId)
  }

  bothSelected() {
    return Object.keys(this.selections).length === 2
  }

  bothReady() {
    return this.ready.size === 2
  }

  pick() {
    const ids = Object.values(this.selections)
    return ids[Math.floor(Math.random() * ids.length)]
  }

  clear() {
    this.selections = {}
    this.ready.clear()
  }
}

const selectionService = new SelectionService()

export default selectionService
