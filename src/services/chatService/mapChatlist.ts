import { TChatlistOuput, TChatlistResponse } from './chatService'

export function mapChatlist(
  resp: TChatlistResponse,
  userId?: number
): TChatlistOuput {
  return {
    ...resp,
    items: resp.items.map((c) => {
      const avatar =
        c.friend.avatars[0]?.urlString === undefined
          ? `https://ui-avatars.com/api/?name=${c.friend.names as string}`
          : c.friend.avatars[0].urlString
      const date = c.message?.createdAt === undefined ? '' : c.message.createdAt
      return {
        date,
        avatar,
        id: c.friend.id,
        alt: c.friend.userName,
        title: c.friend.userName,
        subtitle: c.message?.message,
        unread: c.unread
      }
    })
  }
}
