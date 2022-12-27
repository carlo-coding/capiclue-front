import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, redirectTo, setCookie } from '../../utils'
interface IAuthState {
  token: string
}

const getInitialAuthState = (): IAuthState => ({
  token: getCookie('token')
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
      state = { token: '' }
      deleteCookie('token')
      deleteCookie('user')
      redirectTo('/')
    }
  }
})

export const { logout, setAuthState } = authSlice.actions
export default authSlice.reducer
