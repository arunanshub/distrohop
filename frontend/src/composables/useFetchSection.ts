export default async function () {
  const { data: sections, error } = await useFetch('/api/sections')
  return { sections, error }
}
