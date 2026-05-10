/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('login', [controllers.Login, 'create'])
    router.post('login', [controllers.Login, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Login, 'destroy'])

    router
      .group(() => {
        router.get('find', [controllers.movies.Finds, 'create'])
        router.post('find', [controllers.movies.Finds, 'results'])
      })
      .prefix('movies')

    router
      .group(() => {
        router.post('add', [controllers.watchlist.Adds, 'store'])
      })
      .prefix('watchlist')
  })
  .use(middleware.auth())
