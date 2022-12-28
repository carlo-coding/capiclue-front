import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models'
import {
  deleteCookie,
  getCookie,
  parseJson,
  redirectTo,
  setCookie
} from '../../utils'
interface IAuthState {
  token: string
  isAuthenticated: boolean
}

const getInitialAuthState = (): IAuthState => ({
  token: getCookie('token'),
  isAuthenticated: parseJson<IUser>(getCookie('user')).id !== undefined
})

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    setAuthState(state, action: PayloadAction<string>) {
      state.token = action.payload
      setCookie('token', action.payload)
    },
    logout(state) {
      state = { token: '', isAuthenticated: false }
      deleteCookie('token')
      deleteCookie('user')
      redirectTo('/')
    }
  }
})

export const { logout, setAuthState } = authSlice.actions
export default authSlice.reducer
