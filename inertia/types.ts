import { type Data } from '@generated/data'
import { type PropsWithChildren } from 'react'
import { type JSONDataTypes } from '@adonisjs/core/types/transformers'

export type InertiaProps<T extends JSONDataTypes = {}> = PropsWithChildren<Data.SharedProps & T>

export interface Movie {
  id: number
  title: string
  release_date: string
  vote_average: number
  last_watched: number
  poster_path: string
  select_btn: boolean
  add_btn: boolean
  remove_btn: boolean
}
