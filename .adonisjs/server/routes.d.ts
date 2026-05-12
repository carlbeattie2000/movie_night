import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'watchlist.api.store': { paramsTuple?: []; params?: {} }
    'watchlist.api.destroy': { paramsTuple?: []; params?: {} }
    'movies.api.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'movies.show_search': { paramsTuple?: []; params?: {} }
    'movies.search_results': { paramsTuple?: []; params?: {} }
    'movies.browse': { paramsTuple?: []; params?: {} }
    'matches.lobby': { paramsTuple?: []; params?: {} }
    'matches.ready': { paramsTuple?: []; params?: {} }
    'matches.result': { paramsTuple?: []; params?: {} }
    'matches.cancel': { paramsTuple?: []; params?: {} }
    'selects.store': { paramsTuple?: []; params?: {} }
    'selects.random': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'movies.api.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'movies.show_search': { paramsTuple?: []; params?: {} }
    'movies.browse': { paramsTuple?: []; params?: {} }
    'matches.lobby': { paramsTuple?: []; params?: {} }
    'matches.result': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'movies.api.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'movies.show_search': { paramsTuple?: []; params?: {} }
    'movies.browse': { paramsTuple?: []; params?: {} }
    'matches.lobby': { paramsTuple?: []; params?: {} }
    'matches.result': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'watchlist.api.store': { paramsTuple?: []; params?: {} }
    'movies.search_results': { paramsTuple?: []; params?: {} }
    'matches.ready': { paramsTuple?: []; params?: {} }
    'matches.cancel': { paramsTuple?: []; params?: {} }
    'selects.store': { paramsTuple?: []; params?: {} }
    'selects.random': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'watchlist.api.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}