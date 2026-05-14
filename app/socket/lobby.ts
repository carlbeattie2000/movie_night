import Movie from '#models/movie'
import gameRooms from '#services/game_rooms_service'
import { MatchService } from '#services/match_service'
import { getIO } from '#services/socket_service'
import { tmdb } from '../utils/tmdb.ts'

const io = getIO()

function lobby() {
  if (!io) return

  const matchesService = new MatchService()

  const connectedUsers = new Set<number>()
  let lastMovieId: number | null = null

  io.on('connection', (socket) => {
    socket.on('ready', async (userId: number) => {
      connectedUsers.add(userId)

      const room = gameRooms.get('main')

      if (connectedUsers.size === 2) {
        if (room && room.valid() && room.ready()) {
          lastMovieId = room.pick()

          const movie = await Movie.findOrFail(lastMovieId)

          if (movie) {
            await matchesService.markMovieAsWatched(movie.id)
          }

          const providers = await tmdb.providers(movie.tmdbId)

          if (providers.status === 'success') {
            const { results } = providers.result
            return io.sockets.emit('result', movie, results?.GB?.flatrate)
          }

          return io.sockets.emit('result', movie)
        }

        if (!room && lastMovieId) {
          const movie = await Movie.find(lastMovieId)
          io.sockets.emit('result', movie)
          return
        }

        return io.sockets.emit('invalid_room')
      }

      if (room?.expired() && lastMovieId) {
        const movie = await Movie.findOrFail(lastMovieId)
        const providers = await tmdb.providers(movie.tmdbId)

        if (providers.status === 'success') {
          const { results } = providers.result
          return io.sockets.emit('result', movie, results?.GB?.flatrate)
        }

        return io.sockets.emit('result', movie)
      }
    })

    socket.on('unready', (userId: number) => {
      connectedUsers.delete(userId)
    })
  })
}

lobby()
