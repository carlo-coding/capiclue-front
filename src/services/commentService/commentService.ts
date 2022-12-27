import { IComment, IPaginatedResults } from '../../models'
import { ICommonServiceResponse } from '../../models/commonServiceResponse'
import { checkError, getCookie } from '../../utils'
import { TUserResponse } from '../authService'
import { CommentServiceEndpoints } from './endpoints'
import { mapComments } from './mapComments'
import { mapOneComment } from './mapOneComment'

const apiUrl = import.meta.env.VITE_API_URL as string

export type TCommentsResponse = IPaginatedResults<
  Omit<IComment, 'commentator'> & {
    commentator: TUserResponse
  }
>

export type TCommentsOutput = IPaginatedResults<IComment>

export interface IGetCommentsPayload {
  publicationId: number
  page: number
}

export async function serviceGetComments(
  dto: IGetCommentsPayload
): Promise<[TCommentsOutput | null, Error | null]> {
  let result: TCommentsOutput | null = null
  let error: Error | null = null

  try {
    const limit = 3
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${CommentServiceEndpoints.GET_PUBLICATION_COMMENTS}${dto.publicationId}?page=${dto.page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await checkError<TCommentsResponse>(response)
    result = mapComments(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface ICreateCommentPayload {
  publicationId: number
  comment: string
}

export interface TCommentResponse {
  data: {
    comment: Omit<IComment, 'commentator'> & {
      commentator: TUserResponse
    }
  }
}

export interface TCommentOutput {
  data: {
    comment: IComment
  }
}

export async function serviceCreateComment(
  dto: ICreateCommentPayload
): Promise<[TCommentOutput | null, Error | null]> {
  let result: TCommentOutput | null = null
  let error: Error | null = null

  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${CommentServiceEndpoints.CREATE_COMMENT}${dto.publicationId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment: dto.comment })
      }
    )
    const data = await checkError<TCommentResponse>(response)
    result = mapOneComment(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceDeleteComment(
  commentId?: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null

  if (commentId === undefined) return [result, error]

  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${CommentServiceEndpoints.DELETE_COMMENT}${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IUpdateCommentPayload {
  commentId: number
  comment: string
}

export async function serviceUpdateComment(
  dto: IUpdateCommentPayload
): Promise<[TCommentOutput | null, Error | null]> {
  let result: TCommentOutput | null = null
  let error: Error | null = null

  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${CommentServiceEndpoints.UPDATE_COMMENT}${dto.commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment: dto.comment })
      }
    )
    const data = await checkError<TCommentResponse>(response)
    result = mapOneComment(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
