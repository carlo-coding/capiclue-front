import { IPaginatedResults, TPublicationPartial } from '../../models'
import { ICommonServiceResponse } from '../../models/commonServiceResponse'
import { checkError, getCookie } from '../../utils'
import { TUserResponse } from '../authService'
import { serviceUploadPublicationImages } from '../imageService'
import { PublicationEndpoints } from './endpoints'
import {
  mapOnePublication,
  mapPublicationsData,
  TManyPublicationsOutput
} from './mapPublicationsData'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface ICreatePublicationPayload {
  content: string
  images: File[]
}
export interface IPublicationOuput {
  data: {
    publication: TPublicationPartial
  }
}

export interface TPublicationResponse {
  data: {
    publication: Omit<TPublicationPartial, 'author'> & {
      author: TUserResponse
    }
  }
}

export async function serviceCreatePublication(
  dto: ICreatePublicationPayload
): Promise<[IPublicationOuput | null, Error | null]> {
  let result: IPublicationOuput | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.CREATE_PUBLICATION}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: dto.content })
      }
    )
    const data = await checkError<TPublicationResponse>(response, {
      418: 'Debes verificar tu correo para poder crear una publicación'
    })
    const [imagesResponse, imagesError] = await serviceUploadPublicationImages({
      files: dto.images,
      publicationId: data.data.publication.id as number
    })
    if (imagesError !== null) throw new Error(imagesError.message)
    result = {
      data: {
        publication: mapOnePublication({
          ...data.data.publication,
          images: imagesResponse?.data.images
        })
      }
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export type TManyPublicationsResponse = IPaginatedResults<
  Omit<TPublicationPartial, 'author'> & { author: TUserResponse }
>

export async function serviceGetUserPublications(
  page: number
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.GET_USER_PUBLICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceGetAllPublications(
  page: number
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.GET_ALL_PUBLICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface ISearchPublicationPayload {
  page: number
  search: string
}

export async function serviceSearchPublications(
  dto: ISearchPublicationPayload
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.SEARCH_PUBLICATION}${dto.search}?limit=${limit}&page=${dto.page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceGetPopularPublications(
  page: number
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.GET_POPULAR_PUBLICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceGetFriendPublications(
  page: number
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.GET_FRIENDS_PUBLICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceGetFavoritePublications(
  page: number
): Promise<[TManyPublicationsOutput | null, Error | null]> {
  let result: TManyPublicationsOutput | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.GET_FAVORITE_PUBLICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TManyPublicationsResponse>(response)
    result = mapPublicationsData(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceAddPublicationToFavorites(
  publicationId?: number
): Promise<[IPublicationOuput | null, Error | null]> {
  let result: IPublicationOuput | null = null
  let error: Error | null = null
  if (publicationId === undefined) {
    return [result, error]
  }
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.ADD_PUBLICATION_TO_FAVORITES}${publicationId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<TPublicationResponse>(response)
    result = {
      data: {
        publication: mapOnePublication(data.data.publication)
      }
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceDeletePublication(
  publicationId?: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  if (publicationId === undefined) {
    return [result, error]
  }
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.DELETE_PUBLICATION}${publicationId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IUpdatePubPaylod {
  publicationId: number
  content: string
  images: File[]
}

export async function serviceUpdatePublication(
  dto: IUpdatePubPaylod
): Promise<[IPublicationOuput | null, Error | null]> {
  let result: IPublicationOuput | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${PublicationEndpoints.UPDATE_PUBLICATION}${dto.publicationId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: dto.content })
      }
    )
    const data = await checkError<TPublicationResponse>(response)
    const [imagesResponse, imagesError] = await serviceUploadPublicationImages({
      files: dto.images,
      publicationId: data.data.publication.id as number
    })
    if (imagesError !== null) throw new Error(imagesError.message)
    result = {
      data: {
        publication: mapOnePublication({
          ...data.data.publication,
          images: imagesResponse?.data.images
        })
      }
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
