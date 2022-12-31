import { Box, Typography } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { StandardButton } from '../../StandardButton'
import { TextArea } from '../../TextArea'
import { closeModal } from '../redux/modalSlice'
import { useState } from 'react'

interface IReportProps {
  cb: (content: string) => void
}

function Report({ cb }: IReportProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value)
  }

  const handleReport = (): void => {
    cb(comment)
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
