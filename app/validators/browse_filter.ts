import vine from '@vinejs/vine'

export const browseFilterValidator = vine.create({
  genreId: vine.number(),
  page: vine.number().optional(),
})
