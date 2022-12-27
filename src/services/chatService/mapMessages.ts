import { TMessagesOutput, TMessagesResponse } from './chatService'
import { mapOneMessage } from './mapOneMessage'

export function mapMessages(response: TMessagesResponse): TMessagesOutput {
  return {
    ...response,
    items: response.items.map(mapOneMessage)
  }
}
