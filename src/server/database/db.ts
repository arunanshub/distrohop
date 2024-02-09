import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import * as answers from './schema/answers'
import * as distributions from './schema/distributions'
import * as questions from './schema/questions'
import * as results from './schema/results'
import * as sections from './schema/sections'

export function getDb(url: string) {
  const connection = connect({ url })
  return drizzle(connection, {
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
