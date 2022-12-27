import { Box } from '@mui/material'
import SignupImage from '../../assets/SignupImage.svg'
import { StandardForm } from '../../components'
import SignupForm from './SignupForm'
function Signup(): JSX.Element {
  const Facade = (): JSX.Element => (
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
        Sign up
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
          Crea una cuenta para ser parte de capiclub
        </Box>
        <img src={SignupImage} alt="Signup Image" width="230" height="230" />
      </Box>
    </>
  )
  return (
    <StandardForm leftComponent={<Facade />} rightComponent={<SignupForm />} />
  )
}
export default Signup
