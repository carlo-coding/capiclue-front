import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useState } from 'react'
import { Box } from '@mui/material'
import { MakeComment } from '../MakeComment'
import { Comment } from '../Comment'
import { getComments } from '../../../../features'

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

interface IAllCommentsProps {
  publicationId: number
}

function AllComments({ publicationId }: IAllCommentsProps): JSX.Element {
  const dispatch = useAppDispatch()

  const [commentIndex, setCommentIndex] = useState(1)
  const [showComments, setShowComments] = useState(true)

  const comments = useAppSelector(
    (state) => state.comment.memory[publicationId]?.comments
  )
  const totalComments = useAppSelector(
    (state) => state.comment.memory[publicationId]?.totalItems
  )

  const [commentBtnText, shouldFetchComments, shouldHideComments] =
    getCommentBtnText(showComments, comments?.length, totalComments)

  const handleShowComments = (): void => {
    if (shouldHideComments) {
      setShowComments((prev) => !prev)
      return
    }
    if (!shouldFetchComments) return
    dispatch(
      getComments({
        publicationId,
        page: commentIndex
      })
    )
    setCommentIndex((prev) => prev + 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: 4
      }}
    >
      <MakeComment publicationId={publicationId} />
      {showComments &&
        comments?.map((comment) => (
          <Comment
            comment={comment}
            key={`publication-${publicationId}-comment-${comment.id}`}
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
  )
}
export default AllComments
