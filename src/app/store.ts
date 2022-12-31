import { configureStore } from '@reduxjs/toolkit'
import { modalSlice } from '../components'
import thunk from 'redux-thunk'
import {
  authSlice,
  chatSlice,
  commentSlice,
  notificationSlice,
  userSlice,
  countSlice
} from '../features'
import { friendSlice } from '../features/friend'
import { publicationSlice } from '../features/publication'
import { SearchInputSlice } from '../pages'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    user: userSlice,
    friend: friendSlice,
    publication: publicationSlice,
    comment: commentSlice,
    notification: notificationSlice,
    chat: chatSlice,
    count: countSlice,
    search: SearchInputSlice
  },
  middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
