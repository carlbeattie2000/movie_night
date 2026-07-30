import AddToWatchlistBtn from './add_to_watchlist_btn'
import { Form } from '@adonisjs/inertia/react'
import Button from '../button'
import RemoveButton from './removeBtn'
import RateBtn from './rate_btn'
import WatchedBtn from './watched_btn'
import IconButtonContainer from './icon_btn_container'
import { GoPlay } from 'react-icons/go'

interface MovieCardActionsProps {
  movieId?: number
  mediaType?: string
  title?: string

  showSelectBtn?: boolean
  showAddBtn?: boolean
  showRateBtn?: boolean
  showRemoveBtn?: boolean
  showWatchedBtn?: boolean

  onWatched?: () => void
  onRemove?: () => void
  onRate?: () => void
}

export default function MovieCardActions({
  movieId,
  mediaType,
  title,
  showSelectBtn,
  showAddBtn,
  showRateBtn,
  showRemoveBtn,
  showWatchedBtn,
  onWatched,
  onRemove,
  onRate,
}: MovieCardActionsProps) {
  return (
    <>
      <IconButtonContainer>
        <RemoveButton show={showRemoveBtn ?? false} title={title} onRemove={onRemove} />

        <RateBtn show={showRateBtn ?? false} onRate={onRate} />

        <WatchedBtn show={showWatchedBtn ?? false} title={title} onWatched={onWatched} />

        <AddToWatchlistBtn show={showAddBtn ?? false} movieId={movieId} mediaType={mediaType} />
      </IconButtonContainer>
      {showSelectBtn && movieId && (
        <Form route="selects.store" formMethod="POST">
          <input name="movie_id" type="hidden" value={movieId} />
          <Button icon={<GoPlay />} fontSize="4xl" variant="success" />
        </Form>
      )}
    </>
  )
}
