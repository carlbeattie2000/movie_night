import User from '#models/user'
import { getIO } from '#services/socket_service'
import { lobbyStore } from '#stores/index'
import { WordGame } from '../engines/word_game.ts'

const io = getIO()

let gameState: WordGame = new WordGame()

function wordGame() {
  if (!io) return

  io.on('connection', (socket) => {
    socket.on('word_game__start', (userId: number) => {
      if (gameState.invalid() || gameState.finished()) {
        gameState.reset()
      }

      gameState.connectUser(userId)

      const started = gameState.startGame()

      if (started.error === 'could_not_start_game') {
        return
      }

      io.sockets.emit('word_game__started', started.gameData)
    })

    socket.on('word_game__result', async (userId: number, words: string[]) => {
      if (typeof userId !== 'number' || !Array.isArray(words)) {
        return
      }

      if (gameState.invalid()) {
        return
      }

      gameState.registerUserResult({ userId, words })

      const results = gameState.getWinner()

      if (results.error === null) {
        lobbyStore.increaseUsersProbability(results.winner, 25)
        const user = await User.findOrFail(results.winner)
        io.sockets.emit('word_game__winner', user.name)
      }
    })
  })
}

wordGame()
