import { Layout, StandardButton } from '../../components'
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { ExploreSidebar } from '../Explore/components'
function Settings(): JSX.Element {
  return (
    <Layout>
      <Box
        sx={{
          display: 'grid',
          flexGrow: 1,
          gridTemplateColumns: {
            md: '300px 1fr',
            xs: '1fr'
          }
        }}
      >
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
          <Box>
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
          </Box>
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
              Cambiar Contraseña
            </Typography>
            <StandardButton sx={{ width: 'max-content', padding: '10px' }}>
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
