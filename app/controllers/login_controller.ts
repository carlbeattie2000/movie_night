import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, auth, response }: HttpContext) {
    const { password } = request.all()

    const users = await User.all()

    for (const user of users) {
      if (await hash.verify(user.password, password)) {
        await auth.use('web').login(user)
        return response.redirect().toRoute('home')
      }
    }

    return response.unauthorized()
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('login.create')
  }
}
