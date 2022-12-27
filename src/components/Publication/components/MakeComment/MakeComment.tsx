import Box from '@mui/material/Box'
import { StandardButton } from '../../../StandardButton'
import { FormEvent, useEffect, useState } from 'react'
import { TextArea } from '../../../TextArea'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { editComment, postComment } from '../../../../features'
import { setCommentEditContent } from '../../../../features/comment/commentSlice'

interface IMakeCommentProps {
  publicationId: number
}

function MakeComment({ publicationId }: IMakeCommentProps): JSX.Element {
  const [comment, setComment] = useState('')

  const editContent = useAppSelector((state) => state.comment.editContent)

  const isEditMode = editContent !== null

  useEffect(() => {
    if (isEditMode) {
      setComment(editContent.comment)
    }
  }, [isEditMode])

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value)
  }

  const closeEdition = (): void => {
    dispatch(setCommentEditContent(null))
    setComment('')
  }

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (comment.length === 0) return
    if (isEditMode) {
      dispatch(
        editComment({
          comment,
          commentId: editContent.id
        })
      )
      closeEdition()
      return
    }
    dispatch(
      postComment({
        comment,
        publicationId
      })
    )
    setComment('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmitComment}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}
    >
      <TextArea
        rows={5}
        placeholder="Escribe un comentario ..."
        onChange={handleChange}
        value={comment}
      ></TextArea>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        {isEditMode && (
          <StandardButton
            type="button"
            onClick={closeEdition}
            sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
          >
            Cancelar
          </StandardButton>
        )}
        <StandardButton
          type="submit"
          sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
        >
          {isEditMode ? 'Editar' : 'Commentar'}
        </StandardButton>
      </Box>
    </Box>
  )
}
export default MakeComment
