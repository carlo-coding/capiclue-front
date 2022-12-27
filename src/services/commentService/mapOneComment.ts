import { mapUserInfo } from '../userService'
import { TCommentOutput, TCommentResponse } from './commentService'

export function mapOneComment(comment: TCommentResponse): TCommentOutput {
  return {
    data: {
      comment: {
        ...comment.data.comment,
        commentator: mapUserInfo(comment.data.comment.commentator)
      }
    }
  }
}
