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
        router.post('add', [controllers.watchlist.Api, 'store'])
        router.delete('remove', [controllers.watchlist.Api, 'destroy'])
      })
      .prefix('api/watchlist')
      .as('watchlist')

    router
      .group(() => {
        router.get(':movieId', [controllers.movies.Api, 'fetch'])
      })
      .prefix('api/movies')
      .as('movies')

    router
      .group(() => {
        router.get('search', [controllers.movies.Movies, 'showSearch'])
        router.post('search', [controllers.movies.Movies, 'searchResults'])

        router.get('browse', [controllers.movies.Movies, 'browse'])
      })
      .prefix('movies')

    router
      .group(() => {
        router.get('lobby', [controllers.Matches, 'lobby'])
        router.post('cancel', [controllers.Matches, 'cancel'])
      })
      .prefix('match')

    router
      .group(() => {
        router.post('/', [controllers.movies.Selects, 'store'])
        router.post('/random', [controllers.movies.Selects, 'random'])
      })
      .prefix('select')
  })
  .use(middleware.auth())
