import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetCountResponse } from '../../services'

interface ICountState {
  all: IGetCountResponse['data']
}

const initialCountState: ICountState = {
  all: {
    totalFriends: 0,
    unreadNotifications: 0,
    unreadMessages: 0,
    userPublications: 0
  }
}

const countSlice = createSlice({
  name: 'count',
  initialState: initialCountState,
  reducers: {
    setCounts(state, action: PayloadAction<IGetCountResponse>) {
      state.all = action.payload.data
    }
  }
})

export const { setCounts } = countSlice.actions
export default countSlice.reducer
