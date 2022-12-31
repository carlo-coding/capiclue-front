import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { IMakeReportPayload, serviceReport } from '../../services'

export const makeReport = (payload: IMakeReportPayload): AnyAction => {
  return (async (_dispatch: Dispatch) => {
    const [, error] = await serviceReport(payload)
    if (error != null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    enqueueSnackbar('Reporte exitoso', { variant: 'success' })
  }) as unknown as AnyAction
}
