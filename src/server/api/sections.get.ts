import { SectionWithQuestionId, sectionWithQuestionId } from '~/types'

export default defineCachedEventHandler(
  async (event): Promise<SectionWithQuestionId[]> => {
    return event.context.prisma.section.findMany({
      ...sectionWithQuestionId,
      cacheStrategy: { swr: 60, ttl: 60 },
    })
  },
  { swr: true, staleMaxAge: 300 }
)
