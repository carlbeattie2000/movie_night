import { test } from '@japa/runner'
import { TMDB } from '../../../app/utils/tmdb.ts'

test.group('Utils tmdb', () => {
  test('should query tmdb for movies/shows by title', async ({ assert }) => {
    const results = await TMDB.query().byTitle('game')

    assert.isDefined(results)
    if (results) {
      assert.isTrue(results.length > 0)

      for (const result of results) {
        assert.property(result, 'id')
        assert.property(result, 'title')
        assert.property(result, 'genre_ids')
        assert.property(result, 'popularity')
        assert.property(result, 'poster_path')
        assert.property(result, 'release_date')
        assert.property(result, 'vote_average')
        assert.property(result, 'media_type')
      }
    }
  })
})
