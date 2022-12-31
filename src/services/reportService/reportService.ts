import { ICommonServiceResponse } from '../../models'
import { checkError, getCookie } from '../../utils'
import { ReportServiceEndpoints } from './endpoints'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface IMakeReportPayload {
  content: string
  reportedUserId?: number
  reportedPublicationId?: number
  reportedCommentId?: number
}

export async function serviceReport(
  dto: IMakeReportPayload
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(`${apiUrl}${ReportServiceEndpoints.REPORT}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dto)
    })
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
