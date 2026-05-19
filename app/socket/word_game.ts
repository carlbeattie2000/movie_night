import User from '#models/user'
import { getIO } from '#services/socket_service'
import { lobbyStore, wordGameStore } from '#stores/index'

const io = getIO()

function wordGame() {
  if (!io) return

  io.on('connection', (socket) => {
    socket.on('word_game__connect', (userId: number) => {
      wordGameStore.join(userId)

      if (wordGameStore.hasAnyUserDeclined()) {
        socket.emit('word_game__declined')
      }
    })

    socket.on('word_game__decline', (userId: number) => {
      wordGameStore.decline(userId)

      io.sockets.emit('word_game__declined')
    })

    socket.on('word_game__ready_up', (userId: number) => {
      if (wordGameStore.hasAnyUserDeclined()) {
        socket.emit('word_game__declined')
      }

      const readiedUp = wordGameStore.readyUp(userId)

      if (readiedUp) {
        const started = wordGameStore.start()

        if (started.error === null) {
          io.sockets.emit('word_game__started', started.gameData)
        }
      }
    })

    socket.on('word_game__result', async (userId: number, words: string[]) => {
      if (typeof userId !== 'number' || !Array.isArray(words)) {
        return
      }

      if (wordGameStore.invalid()) {
        wordGameStore.reset()
      }

      wordGameStore.userGameResult({ userId, words })

      const results = wordGameStore.getWinner()

      if (results.error === null) {
        lobbyStore.increaseUsersProbability(results.winner, 25)
        const user = await User.findOrFail(results.winner)
        io.sockets.emit('word_game__winner', user.name)
        wordGameStore.reset()
      }
    })
  })
}

wordGame()
