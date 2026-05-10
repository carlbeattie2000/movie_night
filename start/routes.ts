/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import transmit from '@adonisjs/transmit/services/main'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

transmit.registerRoutes((route) => {
  route.middleware(middleware.auth())
})

router
  .group(() => {
    router.get('login', [controllers.Login, 'create'])
    router.post('login', [controllers.Login, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Login, 'destroy'])

    router.get('/', [controllers.watchlist.Home, 'show'])

    router
      .group(() => {
        router.get('find', [controllers.movies.Finds, 'create'])
        router.post('find', [controllers.movies.Finds, 'results'])

        router.get(':movieId', [controllers.movies.Gets, 'fetch'])
      })
      .prefix('movies')

    router
      .group(() => {
        router.post('add', [controllers.watchlist.Adds, 'store'])
      })
      .prefix('watchlist')

    router
      .group(() => {
        router.post('/', [controllers.movies.Selects, 'store'])
        router.get('/', [controllers.movies.Results, 'show'])
        router.post('/result/ready', [controllers.movies.Results, 'ready'])
      })
      .prefix('select')
  })
  .use(middleware.auth())
