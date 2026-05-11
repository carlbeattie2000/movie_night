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
    'finds.create': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'browses.view': { paramsTuple?: []; params?: {} }
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'watchlists.store': { paramsTuple?: []; params?: {} }
    'watchlists.destroy': { paramsTuple?: []; params?: {} }
    'selects.store': { paramsTuple?: []; params?: {} }
    'selects.random': { paramsTuple?: []; params?: {} }
    'results.show': { paramsTuple?: []; params?: {} }
    'results.ready': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
    'browses.view': { paramsTuple?: []; params?: {} }
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'results.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
    'browses.view': { paramsTuple?: []; params?: {} }
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'results.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'watchlist.api.store': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'watchlists.store': { paramsTuple?: []; params?: {} }
    'selects.store': { paramsTuple?: []; params?: {} }
    'selects.random': { paramsTuple?: []; params?: {} }
    'results.ready': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'watchlist.api.destroy': { paramsTuple?: []; params?: {} }
    'watchlists.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}