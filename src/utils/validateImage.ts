import imageCompression from 'browser-image-compression'
export async function validateImage(file: File): Promise<File> {
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  if (!allowedExtensions.exec(file.name)) {
    const shortFilename =
      file.name.slice(0, 10) + (file.name.length > 10 ? '...' : '')
    throw new Error(
      `El archivo ${shortFilename} no es válido, debe ser una imagen`
    )
  }
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 512,
    useWebWorker: true,
    fileType: 'png'
  })
  return new File([compressedFile], file.name)
}
