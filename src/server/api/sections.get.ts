import { getSectionsWithoutId } from '@/server/crud/section'

export default defineCachedEventHandler(
  async (event) => {
    return await getSectionsWithoutId(event.context.db)
  },
  { swr: true, staleMaxAge: 3600, maxAge: 3600 },
)
