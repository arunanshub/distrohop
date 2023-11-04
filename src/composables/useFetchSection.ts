export default async function () {
  const { data: sections, error } = await useFetch('/_api/sections')
  return { sections, error } as const
}
