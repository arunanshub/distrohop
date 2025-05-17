export default async function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params

  // simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return <div>SectionPage {sectionId}</div>
}
