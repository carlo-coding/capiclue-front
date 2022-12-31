import {
  Layout,
  openModal,
  setModalContent,
  StandardButton,
  UserConfirm
} from '../../components'
import {
  Box,
  Typography
  /* FormGroup,
  FormControlLabel,
  Checkbox */
} from '@mui/material'
import { ExploreSidebar } from '../Explore/components'
import { useAppDispatch } from '../../app/hooks'
import { resetPassword, userDelete } from '../../features'
function Settings(): JSX.Element {
  const dispatch = useAppDispatch()

  const handleChangePassword = (): void => {
    dispatch(resetPassword())
  }

  const handleDeleteAccount = (): void => {
    dispatch(
      setModalContent(
        <UserConfirm
          cb={() => {
            dispatch(userDelete())
          }}
        >
          Seguro que quieres eliminar tu cuenta?
        </UserConfirm>
      )
    )
    dispatch(openModal())
  }

  return (
    <Layout>
      <Box
        sx={{
          display: 'grid',
          backgroundColor: 'layout.mintCream',
          flexGrow: 1,
          gridTemplateColumns: {
            md: '300px 1fr',
            xs: '1fr'
          }
        }}
      >
        <div></div>
        <ExploreSidebar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: {
              md: '30px',
              xs: '10px'
            }
          }}
        >
          {/* <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
              Silenciar Notificaciones
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Silenciar sólicitudes de amistad "
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Silenciar comentarios"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Silenciar mensajes "
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Silenciar notificaciones del sistema "
              />
            </FormGroup>
          </Box> */}
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
              Cambiar Contraseña
            </Typography>
            <StandardButton
              sx={{ width: 'max-content', padding: '10px' }}
              onClick={handleChangePassword}
            >
              Click aqui para cambiar contraseña
            </StandardButton>
          </Box>
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
              Borrar Cuenta
            </Typography>
            <StandardButton
              sx={{
                width: 'max-content',
                padding: '10px',
                bgcolor: 'layout.rubyRed'
              }}
              onClick={handleDeleteAccount}
            >
              Click aqui para borrar tu cuenta
            </StandardButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
export default Settings
