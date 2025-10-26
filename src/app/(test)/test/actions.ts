"use server"
import { getDb } from "@/server/db"
import { connection } from "next/server"

export async function getData() {
  await connection()
  return await getDataInner()
}

async function getDataInner() {
  "use cache: remote"
  const x = await getDb().query.sections.findFirst()

  return {
    message: "This is test data",
    section: x?.msgid,
  }
}
