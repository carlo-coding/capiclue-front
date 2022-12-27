import MoreVert from '@mui/icons-material/MoreVert'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Paper
} from '@mui/material'
import React, { useState } from 'react'
import { IComment } from '../../../../models'
import { formatDate } from '../../../../utils'
import { useGetCommentOptions } from '../../hooks'
import { useGetCommentatorOptions } from '../../hooks/useGetCommentatorOptions'

interface ICommentProps {
  comment: IComment
}

function Comment({ comment }: ICommentProps): JSX.Element {
  const [anchorCommentatorEl, setAnchorCommentatorEl] =
    useState<HTMLElement | null>(null)
  const [anchorCommentEl, setAnchorCommentEl] = useState<HTMLElement | null>(
    null
  )

  const commentatorOptions = useGetCommentatorOptions(comment.commentator)

  // TODO: Replace "3" with logged user id
  const commentOptions = useGetCommentOptions(comment.commentator.id)

  const handleOpenCommentatorOptions = (
    e: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorCommentatorEl(e.currentTarget)
  }
  const handleCloseCommentatorOptions = (): void => {
    setAnchorCommentatorEl(null)
  }

  const handleOpenCommentOptions = (e: React.MouseEvent<HTMLElement>): void => {
    setAnchorCommentEl(e.currentTarget)
  }
  const handleCloseCommentOptions = (): void => {
    setAnchorCommentEl(null)
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'layout.carolinaBlue'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <IconButton onClick={handleOpenCommentatorOptions}>
            <Avatar
              sx={{ width: 26, height: 26 }}
              src={comment.commentator.avatar?.urlString}
              alt={'commentator avatar'}
            />
          </IconButton>
          <Typography sx={{ fontSize: '14px' }}>
            {comment.commentator.userName}
          </Typography>
          <Typography sx={{ fontSize: '10px' }}>
            {formatDate(comment.commentator.createdAt)}
          </Typography>
        </Box>
        <IconButton onClick={handleOpenCommentOptions}>
          <MoreVert />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorCommentatorEl}
        open={Boolean(anchorCommentatorEl)}
        onClose={handleCloseCommentatorOptions}
      >
        {commentatorOptions.map((option) => (
          <MenuItem
            key={`menu-item-commentator-menu-${option.text}`}
            onClick={() => option.onClick(comment.commentator)}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorCommentEl}
        open={Boolean(anchorCommentEl)}
        onClose={handleCloseCommentOptions}
      >
        {commentOptions.map((option) => (
          <MenuItem
            key={`menu-item-comment-menu-${option.text}`}
            onClick={() => {
              option.onClick(comment)
              handleCloseCommentOptions()
            }}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
      <Typography
        sx={{
          padding: '10px',
          color: 'layout.gunmetal',
          fontSize: '14px'
        }}
      >
        {comment.comment}
      </Typography>
    </Paper>
  )
}
export default Comment
