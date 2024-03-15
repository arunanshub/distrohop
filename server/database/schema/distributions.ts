import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const distributions = sqliteTable('distributions', {
  id: text('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text('name', { length: 200 }).notNull(),
  identifier: text('identifier', { length: 200 }).notNull(),
  fgColor: text('fg_color', { length: 50 }),
  bgColor: text('bg_color', { length: 50 }),
  logo: text('logo', { length: 256 }),
  url: text('url', { length: 256 }),
})
