import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { closeModal } from '../../components'
import {
  ICreateCommentPayload,
  IGetCommentsPayload,
  serviceCreateComment,
  serviceDeleteComment,
  serviceGetComments,
  serviceUpdateComment,
  IUpdateCommentPayload
} from '../../services'
import {
  addComment,
  removeComment,
  updateComment,
  updateCommentsMemory
} from './commentSlice'

export const postComment = (payload: ICreateCommentPayload): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceCreateComment(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(addComment(response?.data.comment))
      enqueueSnackbar('Comentario agregado con éxito!', { variant: 'success' })
    }
  }) as unknown as AnyAction
}

export const getComments = (payload: IGetCommentsPayload): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetComments(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(
        updateCommentsMemory({
          output: response,
          publicationId: payload.publicationId
        })
      )
    }
  }) as unknown as AnyAction
}

export const deleteComment = (payload: {
  commentId?: number
  publicationId?: number
}): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [, error] = await serviceDeleteComment(payload.commentId)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    dispatch(removeComment(payload))
    dispatch(closeModal())
    enqueueSnackbar('Comentario eliminado!', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}

export const editComment = (payload: IUpdateCommentPayload): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceUpdateComment(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(updateComment(response.data.comment))
      enqueueSnackbar('Comentario actualizado con éxito!', {
        variant: 'success'
      })
    }
  }) as unknown as AnyAction
}
