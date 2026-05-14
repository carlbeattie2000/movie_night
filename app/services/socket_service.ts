import { Server } from 'socket.io'
import type { Server as HttpServer } from 'node:http'

let io: Server

export function getIO() {
  return io
}

export function createIO(httpServer: HttpServer | undefined) {
  if (!httpServer) return
  io = new Server(httpServer)
  return io
}
