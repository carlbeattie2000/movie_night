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
    'finds.create': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'adds.store': { paramsTuple?: []; params?: {} }
    'deletes.destroy': { paramsTuple?: []; params?: {} }
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
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'results.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
    'gets.fetch': { paramsTuple: [ParamValue]; params: {'movieId': ParamValue} }
    'results.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'adds.store': { paramsTuple?: []; params?: {} }
    'selects.store': { paramsTuple?: []; params?: {} }
    'selects.random': { paramsTuple?: []; params?: {} }
    'results.ready': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'deletes.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}