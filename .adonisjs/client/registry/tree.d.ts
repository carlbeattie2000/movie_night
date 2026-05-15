/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  login: {
    create: typeof routes['login.create']
    store: typeof routes['login.store']
    destroy: typeof routes['login.destroy']
  }
  home: {
    show: typeof routes['home.show']
  }
  watchlist: {
    api: {
      store: typeof routes['watchlist.api.store']
      destroy: typeof routes['watchlist.api.destroy']
    }
  }
  movies: {
    api: {
      fetch: typeof routes['movies.api.fetch']
    }
    ratings: {
      getNextToRate: typeof routes['movies.ratings.get_next_to_rate']
      rateMovie: typeof routes['movies.ratings.rate_movie']
    }
    showSearch: typeof routes['movies.show_search']
    searchResults: typeof routes['movies.search_results']
    browse: typeof routes['movies.browse']
  }
  matches: {
    lobby: typeof routes['matches.lobby']
    cancel: typeof routes['matches.cancel']
  }
  selects: {
    store: typeof routes['selects.store']
    random: typeof routes['selects.random']
  }
}
