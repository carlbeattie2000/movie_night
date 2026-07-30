import { Data } from '@generated/data'
import RatedBy from './rated_by'
import MovieCardPoster from './movie_card_poster'
import MovieCardContentBody from './movie_card_content_body'
import MovieCardActions from './movie_card_actions'

type MovieCardProps = {
  id?: number
  releaseDate?: string
  lastWatched?: number
  voteAverage?: number
  selectBtn?: boolean
  addBtn?: boolean
  rateBtn?: boolean
  removeBtn?: boolean
  watchedBtn?: boolean
  onWatched?: () => void
  onRemove?: () => void
  onRate?: () => void
} & Partial<Data.Movie>

export default function MovieCard({
  id,
  title,
  mediaType,
  releaseDate,
  voteAverage,
  lastWatched,
  posterUrl,
  ratedBy,
  selectBtn,
  addBtn,
  rateBtn,
  watchedBtn,
  removeBtn,
  onRemove,
  onWatched,
  onRate,
}: MovieCardProps) {
  return (
    <div className="flex flex-col shadow-2xl rounded-b bg-white relative" id="movie_{{ id }}">
      <MovieCardPoster url={posterUrl} title={title} ratedByUsers={ratedBy} />

      <div className="p-3 flex flex-col gap-3">
        <MovieCardContentBody
          title={title}
          releaseDate={releaseDate}
          voteAverage={voteAverage}
          lastWatched={lastWatched}
        />

        <MovieCardActions
          movieId={id}
          mediaType={mediaType}
          title={title}
          showSelectBtn={selectBtn}
          showAddBtn={addBtn}
          showRateBtn={rateBtn}
          showRemoveBtn={removeBtn}
          showWatchedBtn={watchedBtn}
          onRemove={onRemove}
          onWatched={onWatched}
          onRate={onRate}
        />
      </div>
    </div>
  )
}
