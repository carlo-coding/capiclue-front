import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography
} from '@mui/material'
import { IPublication } from '../../models'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useGetAuthorOptions, useGetPublicationOptions } from './hooks'
import React, { useState } from 'react'
import { Comment, ImageLayout, MakeComment } from './components'
import { formatDate } from '../../utils'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getComments } from '../../features'

function getCommentBtnText(
  showComments: boolean,
  commentsLength?: number,
  totalComments?: number
): [string, boolean, boolean] {
  if (commentsLength === undefined || totalComments === undefined) {
    return ['Mostrar comentarios', true, false]
  } else if (totalComments === 0) {
    return ['No hay comentarios que mostrar', false, false]
  } else if (commentsLength < totalComments) {
    return ['Mostrar más comentarios', true, false]
  } else if (!showComments) {
    return ['Mostrar comentarios', false, true]
  }
  return ['Ocultar comentarios', false, true]
}

function Publication(publication: IPublication): JSX.Element {
  const { id, author, content, createdAt, images = [] } = publication
  const userInfo = useAppSelector((state) => state.user.info)

  const dispatch = useAppDispatch()

  const [commentIndex, setCommentIndex] = useState(1)
  const [showComments, setShowComments] = useState(true)

  const comments = useAppSelector((state) => state.comment.memory[id]?.comments)
  const totalComments = useAppSelector(
    (state) => state.comment.memory[id]?.totalItems
  )

  const [commentBtnText, shouldFetchComments, shouldHideComments] =
    getCommentBtnText(showComments, comments?.length, totalComments)

  const [anchorAuthorEl, setAnchorAuthorEl] = useState<null | HTMLElement>(null)

  const [anchorPublicationEl, setAnchorPublicationEl] =
    useState<null | HTMLElement>(null)

  const handleOpenAuthorOptions = (e: React.MouseEvent<HTMLElement>): void => {
    setAnchorAuthorEl(e.currentTarget)
  }
  const handleCloseAuthorOptions = (): void => {
    setAnchorAuthorEl(null)
  }

  const handleOpenPublicationOptions = (
    e: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorPublicationEl(e.currentTarget)
  }
  const handleClosePublicationOptions = (): void => {
    setAnchorPublicationEl(null)
  }

  const handleShowComments = (): void => {
    if (shouldHideComments) {
      setShowComments((prev) => !prev)
      return
    }
    if (!shouldFetchComments) return
    dispatch(
      getComments({
        publicationId: id,
        page: commentIndex
      })
    )
    setCommentIndex((prev) => prev + 1)
  }

  const authorOptions = useGetAuthorOptions(author)
  const publicationOption = useGetPublicationOptions(author?.id as number)
  return (
    <Paper
      sx={{
        borderRadius: '10px',
        width: '100%',
        flexDirection: 'column',
        padding: '20px',
        border: '1px solid',
        borderColor: 'layout.carolinaBlue'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <IconButton onClick={handleOpenAuthorOptions}>
            <Avatar src={author?.avatar?.urlString} alt="author avatar" />
          </IconButton>
          {author.id !== userInfo?.id && (
            <Menu
              anchorEl={anchorAuthorEl}
              open={Boolean(anchorAuthorEl)}
              onClose={handleCloseAuthorOptions}
            >
              {authorOptions.map((option) => (
                <MenuItem
                  key={`menu-item-author-menu-${option.text}`}
                  onClick={() => {
                    option.onClick(author)
                    handleCloseAuthorOptions()
                  }}
                >
                  {option.text}
                </MenuItem>
              ))}
            </Menu>
          )}
          <Typography>{author?.userName}</Typography>
        </Box>

        <IconButton onClick={handleOpenPublicationOptions}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorPublicationEl}
          open={Boolean(anchorPublicationEl)}
          onClose={handleClosePublicationOptions}
        >
          {publicationOption.map((option) => (
            <MenuItem
              key={`menu-item-publication-menu-${option.text}`}
              onClick={() => {
                option.onClick(publication)
                handleClosePublicationOptions()
              }}
            >
              {option.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        sx={{
          fontSize: '12px',
          margin: '8px 0',
          color: 'rgba(0,0,0,0.7)'
        }}
      >
        {createdAt === undefined ? '' : formatDate(createdAt)}
      </Typography>
      <Box>
        <Typography>{content}</Typography>
      </Box>
      {Boolean(images.length) && (
        <ImageLayout images={images.map((img) => img.urlString)} />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: 4
        }}
      >
        <MakeComment publicationId={id} />
        {showComments &&
          comments?.map((comment) => (
            <Comment
              comment={comment}
              key={`publication-${id}-comment-${comment.id}`}
            />
          ))}
        <Box
          component="button"
          onClick={handleShowComments}
          sx={{
            color: 'layout.indigoDye',
            background: 'transparent',
            cursor: 'pointer',
            border: 'none',
            margin: '8px 0'
          }}
        >
          {commentBtnText}
        </Box>
      </Box>
    </Paper>
  )
}
export default Publication
