"use server"
import { getDb } from "@/server/db"

/**
 * For now we have removed the `use cache: remote` directive since it's still buggy.
 * The navigations don't work properly with `use cache: remote` in some cases.
 *
 * See: https://github.com/arunanshub/distrohop/pull/546/files,
 * https://distrohop-git-fix-caching-sections-directive-my-team-0598bad4.vercel.app/
 *
 * (navigate from home -> results -> back to home, the sections don't load properly)
 */
export async function getSections() {
  const db = getDb()
  return db.query.sections.findMany({
    columns: { id: false },
    orderBy: (sections, { asc }) => [asc(sections.msgid)],
  })
}

export type Section = Awaited<ReturnType<typeof getSections>>[number]
