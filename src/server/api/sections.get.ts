import { SectionWithQuestionId, sectionWithQuestionId } from '~/types'

export default defineCachedEventHandler(
  async (event): Promise<SectionWithQuestionId[]> => {
    return event.context.prisma.section.findMany({
      ...sectionWithQuestionId,
    })
  },
  { swr: true, staleMaxAge: 1 }
)
