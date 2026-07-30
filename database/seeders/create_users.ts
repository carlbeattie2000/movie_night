import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      { name: 'user_01', password: 'password' },
      { name: 'user_02', password: 'password' },
    ])
  }
}
