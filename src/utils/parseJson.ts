export function parseJson<T>(content: string): Partial<T> {
  let result = {} as unknown as T
  try {
    result = JSON.parse(content) as unknown as T
  } catch (err) {
    console.error(err)
  }
  return result
}
