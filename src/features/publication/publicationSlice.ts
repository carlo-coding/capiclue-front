import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPublicationPartial } from '../../models'
import { TManyPublicationsOutput } from '../../services/publicationService/mapPublicationsData'
import { obtenerObjetosUnicos } from '../../utils'

interface ISectionPublications {
  publications: TPublicationPartial[]
  totalPages: number
}

export interface IPublicationState {
  user: ISectionPublications
  all: ISectionPublications
  popular: ISectionPublications
  friends: ISectionPublications
  favorite: ISectionPublications
  search: ISectionPublications
}

export type TSections = keyof IPublicationState

const initialPublicationState: IPublicationState = {
  user: { publications: [], totalPages: 0 },
  all: { publications: [], totalPages: 0 },
  popular: { publications: [], totalPages: 0 },
  friends: { publications: [], totalPages: 0 },
  favorite: { publications: [], totalPages: 0 },
  search: { publications: [], totalPages: 0 }
}

export interface IUpdatePublicationsPayload {
  response: TManyPublicationsOutput
  section: TSections | TSections[]
}

export interface IRemovePublicationPayload {
  publicationId?: number
  section: TSections | TSections[]
}

export interface IAddPublicationPayload {
  publication: TPublicationPartial
  section: TSections | TSections[]
}

const publicationSlice = createSlice({
  name: 'publication',
  initialState: initialPublicationState,
  reducers: {
    updatePublications(
      state,
      action: PayloadAction<IUpdatePublicationsPayload>
    ) {
      if (!Array.isArray(action.payload.section)) {
        state[action.payload.section].publications = obtenerObjetosUnicos(
          state[action.payload.section].publications,
          action.payload.response.items
        )
        state[action.payload.section].totalPages =
          action.payload.response.meta.totalPages
      } else {
        for (const section of action.payload.section) {
          state[section].publications = obtenerObjetosUnicos(
            state[section].publications,
            action.payload.response.items
          )
          state[section].totalPages = action.payload.response.meta.totalPages
        }
      }
    },
    setPublications(state, action: PayloadAction<IUpdatePublicationsPayload>) {
      if (!Array.isArray(action.payload.section)) {
        state[action.payload.section].publications =
          action.payload.response.items
        state[action.payload.section].totalPages =
          action.payload.response.meta.totalPages
      } else {
        for (const section of action.payload.section) {
          state[section].publications = action.payload.response.items
          state[section].totalPages = action.payload.response.meta.totalPages
        }
      }
    },
    updateOnePublication(state, action: PayloadAction<IAddPublicationPayload>) {
      if (!Array.isArray(action.payload.section)) {
        state[action.payload.section].publications = state[
          action.payload.section
        ].publications.map((publication) => {
          if (publication.id === action.payload.publication.id) {
            return action.payload.publication
          }
          return publication
        })
      } else {
        for (const section of action.payload.section) {
          state[section].publications = state[section].publications.map(
            (publication) => {
              if (publication.id === action.payload.publication.id) {
                return action.payload.publication
              }
              return publication
            }
          )
        }
      }
    },
    removePublication(state, action: PayloadAction<IRemovePublicationPayload>) {
      if (!Array.isArray(action.payload.section)) {
        state[action.payload.section].publications = state[
          action.payload.section
        ].publications.filter(
          (publication) => publication.id !== action.payload.publicationId
        )
      } else {
        for (const section of action.payload.section) {
          state[section].publications = state[section].publications.filter(
            (publication) => publication.id !== action.payload.publicationId
          )
        }
      }
    },
    addPublication(state, action: PayloadAction<IAddPublicationPayload>) {
      if (!Array.isArray(action.payload.section)) {
        state[action.payload.section].publications = [
          ...state[action.payload.section].publications,
          action.payload.publication
        ]
      } else {
        for (const section of action.payload.section) {
          state[section].publications = [
            ...state[section].publications,
            action.payload.publication
          ]
        }
      }
    }
  }
})

export const {
  addPublication,
  removePublication,
  updatePublications,
  updateOnePublication,
  setPublications
} = publicationSlice.actions

export default publicationSlice.reducer
