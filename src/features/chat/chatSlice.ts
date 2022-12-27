import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import {
  Chat,
  IChatItemOutput,
  IMessageOutput,
  TChatlistOuput,
  TMessagesOutput
} from '../../services'
import { obtenerObjetosUnicos } from '../../utils'

export interface IChatState {
  chat: Chat | null
  chatList: {
    list: IChatItemOutput[]
    total: number
  }
  messages: {
    [friendId: number]:
      | {
          total?: number
          list?: IMessageOutput[]
        }
      | undefined
  }
}

const initialChatState: IChatState = {
  chat: null,
  chatList: {
    list: [],
    total: 0
  },
  messages: {}
}

export interface IUpdateMessagesPayload {
  friendId: number
  messagesOutput: TMessagesOutput
}

export interface IUpdateMessagePayload {
  friendId: number
  message: IMessageOutput
}

export interface ISetReadStatePayload {
  friendId: number
  messagesIds: number[]
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    initNewChat(state, action: PayloadAction<Chat>) {
      state.chat?.leaveChat()
      state.chat = action.payload as unknown as WritableDraft<
        WritableDraft<Chat>
      >
    },
    addMessage(state, action: PayloadAction<IUpdateMessagePayload>) {
      state.messages[action.payload.friendId] = {
        ...state.messages[action.payload.friendId],
        list: obtenerObjetosUnicos(
          state.messages[action.payload.friendId]?.list,
          [action.payload.message]
        )
      }
    },
    updateMessages(state, action: PayloadAction<IUpdateMessagesPayload>) {
      state.messages[action.payload.friendId] = {
        list: obtenerObjetosUnicos(
          state.messages[action.payload.friendId]?.list,
          action.payload.messagesOutput.items
        ).sort(function (item1, item2) {
          const date1 = new Date(item1.date)
          const date2 = new Date(item2.date)
          if (date1 < date2) {
            return -1
          } else if (date1 > date2) {
            return 1
          } else {
            return 0
          }
        }),
        total: action.payload.messagesOutput.meta.totalPages
      }
    },
    sendMessage(state, action: PayloadAction<string>) {
      state.chat?.sendMessage(action.payload)
    },
    updateChatlist(state, action: PayloadAction<TChatlistOuput>) {
      state.chatList.list = obtenerObjetosUnicos(
        state.chatList.list,
        action.payload.items
      )
      state.chatList.total = action.payload.meta.totalItems
    },
    setReadState(state, action: PayloadAction<ISetReadStatePayload>) {
      if (state.messages[action.payload.friendId]?.list === undefined) return
      state.messages[action.payload.friendId] = {
        ...state.messages[action.payload.friendId],
        list: state.messages[action.payload.friendId]?.list?.map((msg) => {
          if (action.payload.messagesIds.includes(msg.id)) {
            return {
              ...msg,
              read: true
            }
          }
          return msg
        })
      }
    }
  }
})

export const {
  initNewChat,
  updateMessages,
  addMessage,
  sendMessage,
  updateChatlist,
  setReadState
} = chatSlice.actions

export default chatSlice.reducer
