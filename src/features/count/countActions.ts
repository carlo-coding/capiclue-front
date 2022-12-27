import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { serviceGetGeneralCount } from '../../services'
import { setCounts } from './countSlice'

export const getCounts = (): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetGeneralCount()
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, {
        variant: 'error'
      })
      return
    }
    dispatch(setCounts(response))
  }) as unknown as AnyAction
}
