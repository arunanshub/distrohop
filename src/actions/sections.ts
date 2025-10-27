"use server"
import { getDb } from "@/server/db"
import { connection } from "next/server"
import { unstable_cache as cache } from "next/cache"

export async function getSections() {
  // If we don't use the `connection` call here, nextjs will try to call this
  // during prerender.
  await connection()
  return await getSectionsInner()
}

/**
 * We want to cache the sections list for performance, but we cannot afford to
 * have it cached during build time since the database may or may not be
 * available then. Hence we use "use cache: remote" to tell nextjs to cache it
 * only at runtime.
 */
const getSectionsInner = cache(
  async () => {
    const db = getDb()
    return db.query.sections.findMany({
      columns: { id: false },
      orderBy: (sections, { asc }) => [asc(sections.msgid)],
    })
  },
  undefined,
  { tags: ["sections"], revalidate: 300 },
)

export type Section = Awaited<ReturnType<typeof getSections>>[number]
