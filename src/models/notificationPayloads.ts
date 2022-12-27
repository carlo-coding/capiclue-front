import { NotificationTypes } from './notificationTypes'

export interface INotificationPayloads {
  [NotificationTypes.FRIEND_REQUEST]: {
    senderId: number
  }
  [NotificationTypes.NEW_COMMENT]: {
    commentId: number
  }
}
