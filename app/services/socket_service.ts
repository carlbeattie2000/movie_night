import { Server } from 'socket.io'
import type { Server as HttpServer } from 'node:http'

let io: Server

export function getIO() {
  return io
}

export function createIO(httpServer: HttpServer | undefined) {
  if (!httpServer) throw new Error('HTTP server not ready')
  io = new Server(httpServer)
  return io
}
