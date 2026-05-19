import User from '#models/user'
import { getIO } from '#services/socket_service'
import { lobbyStore } from '#stores/index'
import { WordGame } from '../engines/word_game.ts'

const io = getIO()

let gameState: WordGame = new WordGame()

function wordGame() {
  if (!io) return

  io.on('connection', (socket) => {
    socket.on('word_game__connect', (userId: number) => {
      gameState.join(userId)

      if (gameState.hasAnyUserDeclined()) {
        socket.emit('word_game__declined')
      }
    })

    socket.on('word_game__decline', (userId: number) => {
      gameState.decline(userId)

      io.sockets.emit('word_game__declined')
    })

    socket.on('word_game__ready_up', (userId: number) => {
      if (gameState.hasAnyUserDeclined()) {
        socket.emit('word_game__declined')
      }

      const readiedUp = gameState.readyUp(userId)

      if (readiedUp) {
        const started = gameState.start()

        if (started.error === null) {
          io.sockets.emit('word_game__started', started.gameData)
        }
      }
    })

    socket.on('word_game__result', async (userId: number, words: string[]) => {
      if (typeof userId !== 'number' || !Array.isArray(words)) {
        return
      }

      if (gameState.invalid()) {
        gameState.reset()
      }

      gameState.userGameResult({ userId, words })

      const results = gameState.getWinner()

      if (results.error === null) {
        lobbyStore.increaseUsersProbability(results.winner, 25)
        const user = await User.findOrFail(results.winner)
        io.sockets.emit('word_game__winner', user.name)
        gameState.reset()
      }
    })
  })
}

wordGame()
