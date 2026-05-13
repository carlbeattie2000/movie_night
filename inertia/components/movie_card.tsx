import { Data } from '@generated/data'
import Button from './button'
import React from 'react'
import { Form } from '@adonisjs/inertia/react'

type MovieCardProps = {
  id?: number
  releaseDate?: string
  lastWatched?: number
  voteAverage?: number
  selectBtn?: boolean
  addBtn?: boolean
  removeBtn?: boolean
  onRemove?: React.MouseEventHandler<HTMLButtonElement>
} & Data.Movie

export default function MovieCard({
  id,
  title,
  releaseDate,
  voteAverage,
  lastWatched,
  posterUrl,
  selectBtn,
  addBtn,
  removeBtn,
  onRemove,
}: MovieCardProps) {
  return (
    <div className="flex flex-col shadow-2xl rounded-b bg-white" id="movie_{{ id }}" key={id}>
      <div className="aspect-2/3 overflow-hidden">
        <img src={posterUrl} alt={title} className="rounded-t w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-zinc-900 text-md font-semibold leading-tight line-clamp-1">{title}</p>
        {releaseDate && <p className="text-zinc-500 text-xs mt-0.5">{releaseDate}</p>}
        {voteAverage && <p className="text-zinc-500 text-xs mt-0.5">★ {voteAverage}</p>}
        {lastWatched && lastWatched >= 0 && (
          <p className="text-zinc-500 text-xs mt-0.5">
            Last watched: {lastWatched === 0 ? 'Today' : `${lastWatched} days ago`}
          </p>
        )}

        {addBtn && <Button text="Add" variant="normal" />}

        {selectBtn && id && (
          <Form route="selects.store" formMethod="POST">
            <input name="movie_id" type="hidden" value={id} />
            <Button text="Select" variant="normal" />
          </Form>
        )}

        {removeBtn && <Button text="Remove" variant="danger" onClick={onRemove} />}
      </div>
    </div>
  )
}
