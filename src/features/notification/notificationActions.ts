import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import {
  serviceDeleteNotification,
  serviceGetNotifications,
  serviceReadNotification
} from '../../services'
import { getCounts } from '../count'
import {
  changeNotificationReadState,
  removeNotification,
  updateNotifications
} from './notificationSlice'

export const getNotifications = (page: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetNotifications(page)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response === null) return
    dispatch(updateNotifications(response))
  }) as unknown as AnyAction
}

export const readNotifications = (notificationIds: number[]): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceReadNotification(notificationIds)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response === null) return
    dispatch(changeNotificationReadState(notificationIds))
    dispatch(getCounts())
  }) as unknown as AnyAction
}

export const deleteNotification = (notificationId: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceDeleteNotification(notificationId)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response === null) return
    dispatch(removeNotification(notificationId))
    dispatch(getCounts())
  }) as unknown as AnyAction
}
