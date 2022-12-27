import { TPublicationPartial } from './publicationModel'

interface TReportData {
  userId?: number
  publicationId?: number
  commentId?: number
  publication?: TPublicationPartial
}

export type TModalMetadata = TReportData
