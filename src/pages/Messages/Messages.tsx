import 'react-chat-elements/dist/main.css'
import { Box, TextField } from '@mui/material'
import {
  ChatList,
  MessageList,
  IMessageListProps,
  IChatListProps
} from 'react-chat-elements'
import { InverseLazyLoad, Layout, LazyLoad } from '../../components'
import { SendButton } from './components'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../utils'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getChatlist,
  getMessages,
  initChat,
  readMessages
} from '../../features'
import { sendMessage } from '../../features/chat/chatSlice'
import { IMessageOutput } from '../../services'
import { useUpdateEffect } from '../../utils/useUpdateEffect'

function Messages(): JSX.Element {
  const [messageContent, setMessageContent] = useState('')
  const [messagesScroll, setMessagesScroll] = useState(0)
  const navigate = useNavigate()
  const idParam = useQuery().get('id')
  const friendId = idParam === null ? 0 : parseInt(idParam)
  const showChat = idParam !== null && idParam !== '' && friendId !== 0
  const messagesRef = useRef<HTMLDivElement | null>(null)

  const handleMessagesScroll = (): void => {
    if (messagesRef.current === null) return
    setMessagesScroll(messagesRef.current.scrollTop)
  }

  const dispatch = useAppDispatch()

  const messages = useAppSelector((state) => {
    if (
      friendId === null ||
      state.chat.messages[friendId]?.list === undefined
    ) {
      return [] as IMessageOutput[]
    }
    return state.chat.messages[friendId]?.list as IMessageOutput[]
  })

  const totalMessagePages = useAppSelector((state) => {
    if (
      friendId === null ||
      state.chat.messages[friendId]?.total === undefined
    ) {
      return 0
    }
    return state.chat.messages[friendId]?.total as number
  })

  const chatlist = useAppSelector((state) => state.chat.chatList.list)
  const chatlistTotal = useAppSelector((state) => state.chat.chatList.total)

  useEffect(() => {
    if (showChat) {
      dispatch(initChat(friendId))
    }
  }, [friendId, totalMessagePages])

  useUpdateEffect(() => {
    if (messagesRef.current === null) return
    const scrollHeight = messagesRef.current?.scrollHeight
    const height = messagesRef.current?.clientHeight
    const maxScrollTop = scrollHeight - height
    if (messagesScroll > maxScrollTop - 300) {
      messagesRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    } else {
      messagesRef.current.scrollTop += 150
    }

    if (messages.length > 0) {
      dispatch(
        readMessages({
          friendId,
          messagesIds: messages.filter((msg) => !msg.read).map((msg) => msg.id)
        })
      )
    }
  }, [messages.length])

  useEffect(() => {
    if (messagesRef.current === null) return
    const scrollHeight = messagesRef.current?.scrollHeight
    const height = messagesRef.current?.clientHeight
    const maxScrollTop = scrollHeight - height
    messagesRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }, [friendId])

  const handleSendMessage = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault()
    if (messageContent === '' || !showChat) return
    dispatch(sendMessage(messageContent))
    setMessageContent('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessageContent(e.currentTarget.value)
  }
  return (
    <Layout>
      <Box
        sx={{
          display: 'grid',
          flexGrow: 1,
          gridTemplateColumns: {
            md: '350px 1fr',
            xs: '1fr'
          }
        }}
      >
        <Box
          sx={{
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            borderRight: '1px solid',
            borderColor: 'layout.carolinaBlue',
            display: {
              md: 'grid',
              xs: showChat ? 'none' : 'grid'
            }
          }}
        >
          <LazyLoad
            totalPages={chatlistTotal}
            onEndReached={(page) => {
              dispatch(getChatlist(page))
            }}
            emptinessMessage="Aún no tienes amigos"
          >
            {chatlist.length > 0
              ? [
                  <ChatList
                    key={'chatlist'}
                    {...({
                      className: 'chat-list',
                      dataSource: chatlist,
                      id: 'chatListId',
                      onClick: (item: IChatListProps['dataSource'][0]) =>
                        navigate(`?id=${item.id}`)
                    } as unknown as IChatListProps)}
                  />
                ]
              : []}
          </LazyLoad>
        </Box>
        <Box
          sx={{
            display: {
              md: 'flex',
              xs: showChat ? 'flex' : 'none'
            },
            flexDirection: 'column'
          }}
        >
          <Box
            ref={messagesRef}
            onScroll={handleMessagesScroll}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 150px)'
            }}
          >
            <InverseLazyLoad
              onEndReached={(page) => {
                if (showChat) {
                  dispatch(
                    getMessages({
                      friendId,
                      page
                    })
                  )
                }
              }}
              dependencies={[friendId]}
              emptinessMessage="Aún no hay mensajes"
              totalPages={totalMessagePages}
            >
              {messages?.length > 0
                ? [
                    <MessageList
                      key="message-list"
                      {...({
                        className: 'message-list',
                        lockable: true,
                        toBottomHeight: '100%',
                        dataSource: messages
                      } as unknown as IMessageListProps)}
                    />
                  ]
                : []}
            </InverseLazyLoad>
          </Box>
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              padding: '17px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <TextField
              placeholder="Escribe algo ..."
              onChange={handleInputChange}
              value={messageContent}
            />
            <SendButton />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
export default Messages
