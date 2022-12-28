import { IUser } from '../../models'
import { getCookie, parseJson } from '../../utils'
import { IMessageOutput, TMessageResponse } from './chatService'

export function mapOneMessage(m: TMessageResponse): IMessageOutput {
  const userId = parseJson<IUser>(getCookie('user')).id
  return {
    id: m.id,
    type: 'text',
    title: m.sender.userName,
    text: m.message,
    position: userId === m.senderId ? 'right' : 'left',
    date: m.createdAt,
    read: m.read
  }
}
