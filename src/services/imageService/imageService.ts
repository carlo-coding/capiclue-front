import imageCompression from 'browser-image-compression'
import { IImageModel } from '../../models/imageModel'
import { checkError, getCookie, validateImage } from '../../utils'
import { ImageServiceEndpoints } from './endpoints'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface IUploadAvatarResponse {
  data: {
    avatar: IImageModel
  }
}

export async function serviceUploadAvatar(
  file: File
): Promise<[IUploadAvatarResponse | null, Error | null]> {
  let result: IUploadAvatarResponse | null = null
  let error: Error | null = null
  try {
    const validImage = await validateImage(file)

    const token = getCookie('token')
    const formData = new FormData()
    formData.append('avatar', validImage)
    const response = await fetch(
      `${apiUrl}${ImageServiceEndpoints.UPLOAD_AVATAR}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
    result = await checkError<IUploadAvatarResponse>(response, {
      413: 'La imagen es muy grande'
    })
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IUploadPublicationImagesResponse {
  data: {
    images: IImageModel[]
  }
}

export interface IUploadPublicationImagesPayload {
  files: File[]
  publicationId: number
}

export async function serviceUploadPublicationImages(
  data: IUploadPublicationImagesPayload
): Promise<[IUploadPublicationImagesResponse | null, Error | null]> {
  let result: IUploadPublicationImagesResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const formData = new FormData()
    await Promise.all(
      data.files.map(async (file) => {
        const validImage = await validateImage(file)
        formData.append('images', validImage)
      })
    )
    const response = await fetch(
      `${apiUrl}${ImageServiceEndpoints.UPLOAD_PUBLICATION_IMAGES}${data.publicationId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
    result = await checkError<IUploadPublicationImagesResponse>(response, {
      413: 'La imagen es muy grande'
    })
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
