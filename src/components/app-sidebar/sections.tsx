import { use } from "react"
import { connection } from "next/server"
import AppSidebarClient from "./client"
import { Section } from "@/actions/sections"

export default function SidebarSections({
  sectionsPromise,
}: {
  sectionsPromise: Promise<Section[]>
}) {
  use(connection())
  const sections = use(sectionsPromise)

  return <AppSidebarClient sections={sections} />
}
