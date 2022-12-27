import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import {
  Chat,
  IGetMessagesPayload,
  mapOneMessage,
  serviceGetChatlist,
  serviceGetMessages,
  serviceReadMessages
} from '../../services'
import { getCounts } from '../count'
import {
  addMessage,
  initNewChat,
  setReadState,
  updateChatlist,
  updateMessages,
  ISetReadStatePayload
} from './chatSlice'

export const initChat = (friendId: number): AnyAction => {
  return ((dispatch: Dispatch) => {
    const chat = new Chat(friendId)
    chat.onMessage = (message) =>
      dispatch(
        addMessage({
          friendId,
          message: mapOneMessage(message)
        })
      )
    dispatch(initNewChat(chat))
  }) as unknown as AnyAction
}

export const getChatlist = (payload: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetChatlist(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (response !== null) {
      dispatch(updateChatlist(response))
    }
  }) as unknown as AnyAction
}

export const getMessages = (payload: IGetMessagesPayload): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetMessages(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (response !== null) {
      dispatch(
        updateMessages({
          friendId: payload.friendId,
          messagesOutput: response
        })
      )
    }
  }) as unknown as AnyAction
}

export const readMessages = (payload: ISetReadStatePayload): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceReadMessages(payload.messagesIds)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    if (response !== null) {
      dispatch(setReadState(payload))
      dispatch(getChatlist(1))
      dispatch(getCounts())
    }
  }) as unknown as AnyAction
}
