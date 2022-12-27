import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { StandardButton } from '../../StandardButton'
import { TextArea } from '../../TextArea'
import { closeModal, setModalMetadata } from '../redux/modalSlice'
import { useState } from 'react'
function Report(): JSX.Element {
  const dispatch = useAppDispatch()
  const metadata = useAppSelector((state) => state.modal.metadata)

  const [comment, setComment] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value)
  }

  const handleReport = (): void => {
    console.log(metadata)
    if (metadata.projectId !== undefined) {
      // TODO: Report proyect
    } else if (metadata.userId !== undefined) {
      // TODO: Report user
    } else if (metadata.commentId !== undefined) {
      // TODO: Report comment
    }
    dispatch(setModalMetadata({}))
    dispatch(closeModal())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}
    >
      <Typography>¿Cuál es la razón del reporte?</Typography>
      <TextArea value={comment} onChange={handleChange} />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <StandardButton
          sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
          onClick={handleReport}
        >
          Reportar
        </StandardButton>
      </Box>
    </Box>
  )
}
export default Report
