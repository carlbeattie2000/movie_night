import type { ApplicationService } from '@adonisjs/core/types'

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  async ready() {
    const server = await this.app.container.make('server')
    const { createIO } = await import('#services/socket_service')
    createIO(server.getNodeServer())
    await import('#socket/lobby')
    await import('#socket/word_game')
  }
}
