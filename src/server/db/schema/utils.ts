import { sqliteTableCreator } from "drizzle-orm/sqlite-core"

export const createTable = sqliteTableCreator((name) => `distrohop_${name}`)
