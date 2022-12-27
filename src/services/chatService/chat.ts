import { io, Socket } from 'socket.io-client'
import { getCookie } from '../../utils'
import { TMessageResponse } from './chatService'

const socketUrl = import.meta.env.VITE_SOCKET_URL as string

export class Chat {
  friendId: number
  socket: Socket
  chatId?: number
  onMessage: ((message: TMessageResponse) => void) | null = null

  constructor(friendId: number) {
    const token = getCookie('token')
    this.friendId = friendId
    this.socket = io(socketUrl, {
      extraHeaders: {
        Authorization: token
      }
    })
    this.socket.emit('event_join', { friendId })
    this.socket.on(
      'event_chatId',
      ({ chatId }: { chatId: number }) => (this.chatId = chatId)
    )
    this.socket.on('event_receive', (message: TMessageResponse) => {
      this.onMessage?.(message)
    })
  }

  sendMessage(message: string): void {
    if (this.chatId === undefined) return
    this.socket.emit('event_send', {
      to: this.friendId,
      chatId: this.chatId,
      message
    })
  }

  leaveChat(): void {
    this.socket.emit('event_leave', { chatId: this.chatId })
    this.socket.disconnect()
  }
}
