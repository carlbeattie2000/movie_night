import { Exception } from '@adonisjs/core/exceptions'
import { type GetRoutesForMethod } from '@adonisjs/core/types/http'
import { type RoutesList } from '@adonisjs/http-server/types'

type RouteName = keyof GetRoutesForMethod<RoutesList, 'GET'> & string

export class FlashException extends Exception {
  constructor(
    public message: string,
    public redirectRoute: RouteName
  ) {
    super(message)
  }
}
