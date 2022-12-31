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
import { AllComments, ImageLayout } from './components'
import { formatDate } from '../../utils'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CommentIcon, FlagIcon, HeartIcon } from '../SvgIcons'
import { addPublicationToFavorites } from '../../features'
import { openModal, Report, setModalContent } from '../Modal'
import { makeReport } from '../../features/report/reportActions'

function Publication(publication: IPublication): JSX.Element {
  const { id, author, content, createdAt, images = [] } = publication
  const [showComments, setShowComments] = useState(false)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [anchorAuthorEl, setAnchorAuthorEl] = useState<null | HTMLElement>(null)
  const [anchorPublicationEl, setAnchorPublicationEl] =
    useState<null | HTMLElement>(null)
  const isAuthor = useAppSelector((state) => state.user.info?.id === author?.id)

  const dispatch = useAppDispatch()
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
  const authorOptions = useGetAuthorOptions(author)
  const publicationOption = useGetPublicationOptions(publication, isAuthor)

  const handleAddToFavorites = () => {
    dispatch(addPublicationToFavorites(id))
  }
  const handleReportPublication = () => {
    dispatch(
      setModalContent(
        <Report
          cb={(content) =>
            dispatch(
              makeReport({
                content,
                reportedPublicationId: id
              })
            )
          }
        />
      )
    )
    dispatch(openModal())
  }
  return (
    <Paper
      sx={{
        borderRadius: '10px',
        width: '100%',
        flexDirection: 'column',
        padding: {
          md: '20px 40px',
          xs: '10px 20px'
        },
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
          {!isAuthor && isAuthenticated && (
            <Menu
              anchorEl={anchorAuthorEl}
              open={Boolean(anchorAuthorEl)}
              onClose={handleCloseAuthorOptions}
            >
              {authorOptions.map((option) => (
                <MenuItem
                  key={`menu-item-author-menu-${option.text}`}
                  onClick={() => {
                    option.onClick()
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

        {isAuthenticated && publicationOption.length > 0 && (
          <IconButton onClick={handleOpenPublicationOptions}>
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          anchorEl={anchorPublicationEl}
          open={Boolean(anchorPublicationEl)}
          onClose={handleClosePublicationOptions}
        >
          {publicationOption.map((option) => (
            <MenuItem
              key={`menu-item-publication-menu-${option.text}`}
              onClick={() => {
                option.onClick()
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

      {isAuthenticated && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                md: 'flex-start',
                xs: 'center'
              },
              gap: '20px',
              margin: '20px 0 0 0',
              '& > button': {
                background: 'transparent',
                border: 'none',
                '&:hover': {
                  cursor: 'pointer'
                }
              },
              '& p': {
                fontSize: '10px'
              }
            }}
          >
            <Box component="button" onClick={handleAddToFavorites}>
              <HeartIcon width={22} height={22} />
              <Typography>Guardar</Typography>
            </Box>
            <Box component="button" onClick={() => setShowComments(true)}>
              <CommentIcon width={22} height={22} />
              <Typography>Comentar</Typography>
            </Box>
            {!isAuthor && (
              <Box component="button" onClick={handleReportPublication}>
                <FlagIcon width={22} height={22} />
                <Typography>Reportar</Typography>
              </Box>
            )}
          </Box>
          {showComments && <AllComments publicationId={id} />}
        </>
      )}
    </Paper>
  )
}
export default Publication
