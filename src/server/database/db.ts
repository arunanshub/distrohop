import { drizzle } from 'drizzle-orm/d1'
import * as answers from './schema/answers'
import * as distributions from './schema/distributions'
import * as questions from './schema/questions'
import * as results from './schema/results'
import * as sections from './schema/sections'

export function getDb(db: D1Database) {
  return drizzle(db, {
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
