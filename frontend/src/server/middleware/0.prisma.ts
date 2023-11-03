import { PrismaClient } from '@prisma/client'

type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

function getExtendedClient() {
  return new PrismaClient()
}

let prisma: ExtendedPrismaClient

declare module 'h3' {
  interface H3EventContext {
    prisma: ExtendedPrismaClient
  }
}

export default defineEventHandler((event) => {
  if (!prisma) {
    prisma = getExtendedClient()
  }
  event.context.prisma = prisma
})
