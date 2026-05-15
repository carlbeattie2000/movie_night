/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'login.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/login_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/login_controller').default['create']>>>
    }
  }
  'login.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/login_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/login_controller').default['store']>>>
    }
  }
  'login.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/login_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/login_controller').default['destroy']>>>
    }
  }
  'home.show': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist/home_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist/home_controller').default['show']>>>
    }
  }
  'watchlist.api.store': {
    methods: ["POST"]
    pattern: '/api/watchlist/add'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist/api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist/api_controller').default['store']>>>
    }
  }
  'watchlist.api.destroy': {
    methods: ["DELETE"]
    pattern: '/api/watchlist/remove'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/watchlist/api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/watchlist/api_controller').default['destroy']>>>
    }
  }
  'movies.api.fetch': {
    methods: ["GET","HEAD"]
    pattern: '/api/movies/:movieId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { movieId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/api_controller').default['fetch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/api_controller').default['fetch']>>>
    }
  }
  'movies.ratings.get_movie_to_rate': {
    methods: ["POST"]
    pattern: '/api/rating'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['getMovieToRate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['getMovieToRate']>>>
    }
  }
  'movies.ratings.get_next_to_rate': {
    methods: ["POST"]
    pattern: '/api/rating/next'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['getNextToRate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['getNextToRate']>>>
    }
  }
  'movies.ratings.rate_movie': {
    methods: ["POST"]
    pattern: '/api/rating/rate'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['rateMovie']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['rateMovie']>>>
    }
  }
  'movies.show_search': {
    methods: ["GET","HEAD"]
    pattern: '/movies/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['showSearch']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['showSearch']>>>
    }
  }
  'movies.search_results': {
    methods: ["POST"]
    pattern: '/movies/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['searchResults']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['searchResults']>>>
    }
  }
  'movies.browse': {
    methods: ["GET","HEAD"]
    pattern: '/movies/browse'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/browse_filter').browseFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['browse']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/movies_controller').default['browse']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'matches.lobby': {
    methods: ["GET","HEAD"]
    pattern: '/match/lobby'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/matches_controller').default['lobby']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/matches_controller').default['lobby']>>>
    }
  }
  'matches.cancel': {
    methods: ["POST"]
    pattern: '/match/cancel'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/matches_controller').default['cancel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/matches_controller').default['cancel']>>>
    }
  }
  'selects.store': {
    methods: ["POST"]
    pattern: '/select'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/selects_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/selects_controller').default['store']>>>
    }
  }
  'selects.random': {
    methods: ["POST"]
    pattern: '/select/random'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/movies/selects_controller').default['random']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/movies/selects_controller').default['random']>>>
    }
  }
}
