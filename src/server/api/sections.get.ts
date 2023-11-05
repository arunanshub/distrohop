import { SectionWithQuestionId, sectionWithQuestionId } from '~/types'

export default defineCachedEventHandler(
  async (event): Promise<SectionWithQuestionId[]> => {
    event.node.res.appendHeader('CDN-Cache-Control', '3600')

    return event.context.prisma.section.findMany({
      ...sectionWithQuestionId,
    })
  },
  { swr: true, staleMaxAge: 3_600 }
)
