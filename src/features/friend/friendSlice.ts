import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models'
import { TGetFriendsOutput } from '../../services'
import { obtenerObjetosUnicos } from '../../utils'

export interface IFriendState {
  friends: {
    list: Array<Partial<IUser>>
    totalPages: number
  }
}

const initialFriendState: IFriendState = {
  friends: {
    list: [],
    totalPages: 0
  }
}

const friendSlice = createSlice({
  name: 'friend',
  initialState: initialFriendState,
  reducers: {
    updateFriendList(state, action: PayloadAction<TGetFriendsOutput>) {
      state.friends.list = obtenerObjetosUnicos(
        state.friends.list,
        action.payload.items
      )
      state.friends.totalPages = action.payload.meta.totalPages
    },
    removeFriend(state, action: PayloadAction<number>) {
      state.friends.list = state.friends.list.filter(
        (friend) => friend.id !== action.payload
      )
    },
    addFriend(state, action: PayloadAction<Partial<IUser>>) {
      state.friends.list = [...state.friends.list, action.payload]
    }
  }
})

export const { addFriend, removeFriend, updateFriendList } = friendSlice.actions

export default friendSlice.reducer
