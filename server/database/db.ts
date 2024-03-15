import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as answers from './schema/answers'
import * as distributions from './schema/distributions'
import * as questions from './schema/questions'
import * as results from './schema/results'
import * as sections from './schema/sections'

interface Options {
  url: string
  authToken: string
}

export function getDb(opts: Options) {
  const client = createClient({ ...opts })
  return drizzle(client, {
    schema: {
      ...questions,
      ...answers,
      ...sections,
      ...distributions,
      ...results,
    },
  })
}

export type DatabaseClient = ReturnType<typeof getDb>
