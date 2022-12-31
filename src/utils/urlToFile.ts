export async function urlToFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url)
  const blob = await response.blob()
  const file = new File([blob], fileName, {
    type: 'image/png'
  })
  return file
}
