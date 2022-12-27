import { Box } from '@mui/material'
import { StandardForm } from '../../components'
import LoginForm from './LoginForm'
import LoginImage from '../../assets/LoginImage.svg'
function Login() {
  const Facade = () => (
    <>
      <Box
        component="h1"
        sx={{
          color: 'layout.babyPowder',
          fontWeight: '500',
          fontSize: '20px',
          position: 'absolute',
          margin: 1,
          top: 0,
          left: 0
        }}
      >
        Login
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}
      >
        <Box
          component="p"
          sx={{
            color: 'layout.babyPowder',
            fontWeight: '500',
            fontSize: '20px',
            textAlign: 'center'
          }}
        >
          Hola! es bueno verte de nuevo
        </Box>
        <img src={LoginImage} alt="Signup Image" width="230" height="230" />
      </Box>
    </>
  )

  return (
    <StandardForm leftComponent={<Facade />} rightComponent={<LoginForm />} />
  )
}
export default Login
