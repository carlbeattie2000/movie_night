import Movie from '#models/movie'
import User from '#models/user'
import { MatchService } from '#services/match_service'
import { getIO } from '#services/socket_service'
import { lobbyStore } from '#stores/index'
import { tmdb } from '../utils/tmdb.ts'

const io = getIO()

function lobbySocket() {
  if (!io) return

  const matchesService = new MatchService()

  io.on('connection', (socket) => {
    socket.on('ready', async (userId: number) => {
      lobbyStore.readyUp(userId)

      const cachedResult = lobbyStore.results()
      const result = lobbyStore.start()

      if (!result) {
        return
      }

      const winningUser = await User.findOrFail(result.userId)
      const movie = await Movie.findOrFail(result.movieId)

      if (movie) {
        if (!cachedResult) {
          await matchesService.markMovieAsWatched(movie.id)
        }
        const providers = await tmdb.providers(movie.tmdbId)

        if (providers.status === 'success') {
          const { results } = providers.result
          return io.sockets.emit('result', {
            movie: { ...movie.toJSON(), providers: results?.GB?.flatrate },
            winner: winningUser.name,
            probability: result.probability,
          })
        }

        return io.sockets.emit('result', {
          movie,
          winner: winningUser.name,
          probability: result.probability,
        })
      }
    })

    socket.on('unready', (userId: number) => {
      lobbyStore.disconnect(userId)
    })
  })
}

lobbySocket()
