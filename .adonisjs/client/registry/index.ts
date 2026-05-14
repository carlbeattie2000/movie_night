/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'login.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.create']['types'],
  },
  'login.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.store']['types'],
  },
  'login.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['login.destroy']['types'],
  },
  'home.show': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home.show']['types'],
  },
  'watchlist.api.store': {
    methods: ["POST"],
    pattern: '/api/watchlist/add',
    tokens: [{"old":"/api/watchlist/add","type":0,"val":"api","end":""},{"old":"/api/watchlist/add","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/add","type":0,"val":"add","end":""}],
    types: placeholder as Registry['watchlist.api.store']['types'],
  },
  'watchlist.api.destroy': {
    methods: ["DELETE"],
    pattern: '/api/watchlist/remove',
    tokens: [{"old":"/api/watchlist/remove","type":0,"val":"api","end":""},{"old":"/api/watchlist/remove","type":0,"val":"watchlist","end":""},{"old":"/api/watchlist/remove","type":0,"val":"remove","end":""}],
    types: placeholder as Registry['watchlist.api.destroy']['types'],
  },
  'movies.api.fetch': {
    methods: ["GET","HEAD"],
    pattern: '/api/movies/:movieId',
    tokens: [{"old":"/api/movies/:movieId","type":0,"val":"api","end":""},{"old":"/api/movies/:movieId","type":0,"val":"movies","end":""},{"old":"/api/movies/:movieId","type":1,"val":"movieId","end":""}],
    types: placeholder as Registry['movies.api.fetch']['types'],
  },
  'movies.show_search': {
    methods: ["GET","HEAD"],
    pattern: '/movies/search',
    tokens: [{"old":"/movies/search","type":0,"val":"movies","end":""},{"old":"/movies/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['movies.show_search']['types'],
  },
  'movies.search_results': {
    methods: ["POST"],
    pattern: '/movies/search',
    tokens: [{"old":"/movies/search","type":0,"val":"movies","end":""},{"old":"/movies/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['movies.search_results']['types'],
  },
  'movies.browse': {
    methods: ["GET","HEAD"],
    pattern: '/movies/browse',
    tokens: [{"old":"/movies/browse","type":0,"val":"movies","end":""},{"old":"/movies/browse","type":0,"val":"browse","end":""}],
    types: placeholder as Registry['movies.browse']['types'],
  },
  'matches.lobby': {
    methods: ["GET","HEAD"],
    pattern: '/match/lobby',
    tokens: [{"old":"/match/lobby","type":0,"val":"match","end":""},{"old":"/match/lobby","type":0,"val":"lobby","end":""}],
    types: placeholder as Registry['matches.lobby']['types'],
  },
  'matches.cancel': {
    methods: ["POST"],
    pattern: '/match/cancel',
    tokens: [{"old":"/match/cancel","type":0,"val":"match","end":""},{"old":"/match/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['matches.cancel']['types'],
  },
  'selects.store': {
    methods: ["POST"],
    pattern: '/select',
    tokens: [{"old":"/select","type":0,"val":"select","end":""}],
    types: placeholder as Registry['selects.store']['types'],
  },
  'selects.random': {
    methods: ["POST"],
    pattern: '/select/random',
    tokens: [{"old":"/select/random","type":0,"val":"select","end":""},{"old":"/select/random","type":0,"val":"random","end":""}],
    types: placeholder as Registry['selects.random']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
