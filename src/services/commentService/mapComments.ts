import { mapUserInfo } from '../userService'
import { TCommentsOutput, TCommentsResponse } from './commentService'

export function mapComments(response: TCommentsResponse): TCommentsOutput {
  return {
    ...response,
    items: response.items.map((comment) => ({
      ...comment,
      commentator: mapUserInfo(comment.commentator)
    }))
  }
}
