import { INotification, NotificationTypes } from '../../../models'

export const notifications: INotification[] = [
  {
    id: 1,
    content: 'Bienvenido a capiclue',
    actionPayload: '',
    actionType: NotificationTypes.WELCOME
  },
  {
    id: 2,
    content: 'La solicitud de amistad ha sido rechazada',
    actionPayload: '',
    actionType: NotificationTypes.FRIEND_REQUEST_REJECTED
  },
  {
    id: 3,
    content: 'Tienes una nueva solicitud de amistad',
    actionPayload: '{ senderId: 2 }',
    actionType: NotificationTypes.FRIEND_REQUEST
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  },
  {
    id: 4,
    content: 'Un usuario a hecho un comentario en una de tus publicaciones',
    actionPayload: '{ commentId: 4 }',
    actionType: NotificationTypes.NEW_COMMENT
  }
]
