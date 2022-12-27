import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IImageModel, IUser } from '../../models'
import { getCookie, parseJson, setCookie } from '../../utils'

interface IUserState {
  info?: Partial<IUser>
}

const getInitialUserState = (): IUserState => ({
  info: parseJson<IUser>(getCookie('user'))
})

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUserState(),
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<IUser>>) {
      setCookie('user', JSON.stringify(action.payload))
      state.info = action.payload
    },
    setUserAvatar(state, action: PayloadAction<IImageModel>) {
      if (state.info !== undefined) {
        state.info.avatar = action.payload
        setCookie(
          'user',
          JSON.stringify({
            ...state.info,
            avatar: action.payload
          })
        )
      }
    },
    resetUserInfo(state) {
      state.info = {}
    }
  }
})

export const { resetUserInfo, setUserInfo, setUserAvatar } = userSlice.actions

export default userSlice.reducer
