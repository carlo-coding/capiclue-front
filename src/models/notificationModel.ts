import { NotificationTypes } from './notificationTypes'

export interface INotification {
  id: number
  content: string
  actionType: NotificationTypes
  actionPayload: string
  read: boolean
}
