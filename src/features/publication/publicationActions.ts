import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { closeModal } from '../../components'
import {
  ICreatePublicationPayload,
  IUpdatePubPaylod,
  serviceAddPublicationToFavorites,
  serviceCreatePublication,
  serviceDeletePublication,
  serviceGetAllPublications,
  serviceGetFavoritePublications,
  serviceGetFriendPublications,
  serviceGetPopularPublications,
  serviceGetUserPublications,
  serviceSearchPublications,
  serviceUpdatePublication
} from '../../services'
import {
  addPublication,
  removePublication,
  setPublications,
  TSections,
  updateOnePublication,
  updatePublications
} from './publicationSlice'

export const postPublication = (
  payload: ICreatePublicationPayload
): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceCreatePublication(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(
        addPublication({
          publication: response.data.publication,
          section: ['all', 'user']
        })
      )
      enqueueSnackbar('Publicación creada con éxito !', { variant: 'success' })
      dispatch(closeModal())
    }
  }) as unknown as AnyAction
}

export const addPublicationToFavorites = (payload?: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceAddPublicationToFavorites(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(
        addPublication({
          publication: response.data.publication,
          section: 'favorite'
        })
      )
      enqueueSnackbar('Publicación agregada a favoritos !', {
        variant: 'success'
      })
    }
  }) as unknown as AnyAction
}

export const deletePublication = (payload?: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [, error] = await serviceDeletePublication(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    dispatch(
      removePublication({
        publicationId: payload,
        section: ['all', 'favorite', 'user', 'popular']
      })
    )
    enqueueSnackbar('Publicación eliminada con éxito !', { variant: 'success' })
    dispatch(closeModal())
  }) as unknown as AnyAction
}

export const updatePublication = (payload: IUpdatePubPaylod): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceUpdatePublication(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response !== null) {
      dispatch(
        updateOnePublication({
          publication: response.data.publication,
          section: ['user', 'popular', 'all']
        })
      )
      enqueueSnackbar('Publicación editada con éxito !', { variant: 'success' })
      dispatch(closeModal())
    }
  }) as unknown as AnyAction
}

export const getPublications = (payload: {
  section: TSections
  page: number
  search?: string
}): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const serviceFunction = {
      friends: serviceGetFriendPublications,
      favorite: serviceGetFavoritePublications,
      popular: serviceGetPopularPublications,
      user: serviceGetUserPublications,
      all: serviceGetAllPublications,
      search: () => {
        if (payload.search === undefined || payload.search === '') {
          return [null, null]
        }
        return serviceSearchPublications({
          page: payload.page,
          search: payload.search
        })
      }
    }
    const [response, error] = await serviceFunction[payload.section]?.(
      payload.page
    )
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    if (response === null) return
    if (payload.section === 'search') {
      dispatch(
        setPublications({
          response,
          section: payload.section
        })
      )
    } else {
      dispatch(
        updatePublications({
          response,
          section: payload.section
        })
      )
    }
  }) as unknown as AnyAction
}
