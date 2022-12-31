import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearchInputState {
  search: string
}

const searchInitialState: ISearchInputState = {
  search: ''
}

const searchInputSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    }
  }
})

export const { setSearch } = searchInputSlice.actions
export default searchInputSlice.reducer
