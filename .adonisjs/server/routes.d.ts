import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'login.create': { paramsTuple?: []; params?: {} }
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'adds.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'login.create': { paramsTuple?: []; params?: {} }
    'home.show': { paramsTuple?: []; params?: {} }
    'finds.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.store': { paramsTuple?: []; params?: {} }
    'login.destroy': { paramsTuple?: []; params?: {} }
    'finds.results': { paramsTuple?: []; params?: {} }
    'adds.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}