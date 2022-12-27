import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import { TModalMetadata } from '../../../models'

interface IModalState {
  open: boolean
  content: React.ReactElement
  metadata: TModalMetadata
}

const modalState: IModalState = {
  open: false,
  content: <></>,
  metadata: {}
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalState,
  reducers: {
    openModal(state) {
      state.open = true
    },
    closeModal(state) {
      state.open = false
      state.metadata = {}
    },
    setModalContent(state, action: PayloadAction<React.ReactElement>) {
      state.content = action.payload
    },
    setModalMetadata(state, action: PayloadAction<TModalMetadata>) {
      state.metadata = action.payload
    }
  }
})

export const { closeModal, openModal, setModalContent, setModalMetadata } =
  modalSlice.actions
export default modalSlice.reducer
