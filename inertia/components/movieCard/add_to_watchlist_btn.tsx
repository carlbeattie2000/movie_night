import { useState } from 'react'
import Button from '../button'
import {
  GoAlert,
  GoHeart,
  GoHeartFill,
  GoHourglass,
} from 'react-icons/go'

interface AddMovieBtnProps {
  movieId?: number
  mediaType?: string
  show: boolean
}

export default function AddToWatchlistBtn({ show, movieId, mediaType }: AddMovieBtnProps) {
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const onAddMovie = async () => {
    try {
      const res = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movieId,
          media_type: mediaType,
        }),
      })

      setLoading(true)

      const data = await res.json()

      if (data.status === 'success') {
        setAdded(true)
        setLoading(false)
        setFailed(false)
      } else {
        setLoading(false)

        if (data.message === 'Movie already on watch list') {
          setAdded(true)
        } else {
          setFailed(true)

          setTimeout(() => {
            setFailed(false)
          }, 2e3)
        }
      }
    } catch {
      setFailed(true)
    }
  }

  if (show && movieId && mediaType) {
    if (loading) {
      return <Button icon={<GoHourglass />} variant="warning" />
    }

    if (failed) {
      return <Button icon={<GoAlert />} variant="danger" />
    }

    if (added) {
      return <Button icon={<GoHeartFill />} variant="favourite" />
    }

    return <Button icon={<GoHeart />} variant="success" onClick={onAddMovie} />
  }
}
