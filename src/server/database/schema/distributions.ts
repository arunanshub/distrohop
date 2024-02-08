import { char, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const distributions = mysqlTable('distributions', {
  id: char('id', { length: 36 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  identifier: varchar('identifier', { length: 200 }).notNull(),
  fgColor: varchar('fg_color', { length: 50 }),
  bgColor: varchar('bg_color', { length: 50 }),
  logo: varchar('logo', { length: 256 }),
  url: varchar('url', { length: 256 }),
})
