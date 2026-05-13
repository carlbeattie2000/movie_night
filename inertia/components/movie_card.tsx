import { Data } from '@generated/data'
import Button from './button'
import React, { useState } from 'react'
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
} & Partial<Data.Movie>

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
  const [addStatus, setAddStatus] = useState<string>('Add')
  const [addVariant, setAddVariant] = useState<'normal' | 'success' | 'danger'>('normal')

  const onAddMovie = async (movieId: number) => {
    try {
      const res = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movieId,
        }),
      })

      setAddStatus('Adding....')

      const data = await res.json()

      if (data.status === 'success') {
        setAddStatus('✓ Added')
        setAddVariant('success')
      } else {
        setAddStatus(data.message || 'Failed')
        setAddVariant('danger')

        setTimeout(() => {
          setAddStatus('Add')
          setAddVariant('normal')
        }, 2e3)
      }
    } catch {
      setAddStatus('Failed')
      setAddVariant('danger')
    }
  }
  return (
    <div className="flex flex-col shadow-2xl rounded-b bg-white" id="movie_{{ id }}" key={id}>
      <div className="aspect-2/3 overflow-hidden">
        <img src={posterUrl} alt={title} className="rounded-t w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-zinc-900 text-md font-semibold leading-tight line-clamp-1">{title}</p>
        {releaseDate && <p className="text-zinc-500 text-xs mt-0.5">{releaseDate}</p>}
        {voteAverage && <p className="text-zinc-500 text-xs mt-0.5">★ {voteAverage.toFixed(1)}</p>}
        {lastWatched && lastWatched >= 0 && (
          <p className="text-zinc-500 text-xs mt-0.5">
            Last watched: {lastWatched === 0 ? 'Today' : `${lastWatched} days ago`}
          </p>
        )}

        {addBtn && id && (
          <Button text={addStatus} variant={addVariant} onClick={() => onAddMovie(id)} />
        )}

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
