import { IPaginatedResults, TPublicationPartial } from '../../models'
import { mapUserInfo } from '../userService'
import {
  TManyPublicationsResponse,
  TPublicationResponse
} from './publicationService'

export type TManyPublicationsOutput = IPaginatedResults<TPublicationPartial>

export function mapOnePublication(
  publication: TPublicationResponse['data']['publication']
): TPublicationPartial {
  return {
    ...publication,
    author: mapUserInfo(publication.author)
  }
}

export function mapPublicationsData(
  data: TManyPublicationsResponse
): TManyPublicationsOutput {
  return {
    ...data,
    items: data.items.map(mapOnePublication)
  }
}
