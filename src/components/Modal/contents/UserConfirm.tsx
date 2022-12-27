import { Box } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { StandardButton } from '../../StandardButton'
import { closeModal } from '../redux'

interface IUserConfirmProps {
  children?: React.ReactNode
  cb: () => void
}
function UserConfirm({ children, cb }: IUserConfirmProps): JSX.Element {
  const dispatch = useAppDispatch()

  const handleClose = (): void => {
    dispatch(closeModal())
  }

  return (
    <>
      <Box>
        <Box>{children}</Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            marginTop: '15px'
          }}
        >
          <StandardButton
            sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
            onClick={handleClose}
          >
            Cancelar
          </StandardButton>
          <StandardButton
            sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
            onClick={cb}
          >
            Aceptar
          </StandardButton>
        </Box>
      </Box>
    </>
  )
}
export default UserConfirm
