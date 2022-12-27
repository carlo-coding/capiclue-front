import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INotification } from '../../models'
import { TGetNotificationsResponse } from '../../services'
import { obtenerObjetosUnicos } from '../../utils'

interface INotificationState {
  notifications: INotification[]
  totalItems: number
}

const initialNotificationState: INotificationState = {
  notifications: [],
  totalItems: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    updateNotifications(
      state,
      action: PayloadAction<TGetNotificationsResponse>
    ) {
      state.notifications = obtenerObjetosUnicos(
        state.notifications,
        action.payload.items
      )
      state.totalItems = action.payload.meta.totalItems
    },
    changeNotificationReadState(state, action: PayloadAction<number[]>) {
      state.notifications = state.notifications.map((noti) =>
        action.payload.includes(noti.id)
          ? {
              ...noti,
              read: true
            }
          : noti
      )
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(
        (noti) => noti.id !== action.payload
      )
    }
  }
})

export const {
  changeNotificationReadState,
  removeNotification,
  updateNotifications
} = notificationSlice.actions

export default notificationSlice.reducer
