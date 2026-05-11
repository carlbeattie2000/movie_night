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
        router.post('/watchlist/add', [controllers.watchlist.Api, 'store'])
        router.delete('/watchlist/remove', [controllers.watchlist.Api, 'destroy'])
      })
      .prefix('api')
      .as('watchlist')

    router
      .group(() => {
        router.get('find', [controllers.movies.Finds, 'create'])
        router.post('find', [controllers.movies.Finds, 'results'])

        router.get('browse', [controllers.movies.Browses, 'view'])

        router.get(':movieId', [controllers.movies.Gets, 'fetch'])
      })
      .prefix('movies')

    router
      .group(() => {
        router.post('add', [controllers.watchlist.Watchlists, 'store'])
        router.delete('delete', [controllers.watchlist.Watchlists, 'destroy'])
      })
      .prefix('watchlist')

    router
      .group(() => {
        router.post('/', [controllers.movies.Selects, 'store'])
        router.post('/random', [controllers.movies.Selects, 'random'])
        router.get('/', [controllers.movies.Results, 'show'])
        router.post('/result/ready', [controllers.movies.Results, 'ready'])
      })
      .prefix('select')
  })
  .use(middleware.auth())
