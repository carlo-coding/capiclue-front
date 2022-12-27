import { Box, Grid, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { StandardButton } from '../../components'
import { PublicRoutes } from '../../models/routesModel'
import { Formik } from 'formik'
import {
  initialLoginValues,
  TFormLoginValues,
  validationLoginSchema
} from './validationSchema'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { authLogin, googleLogin } from '../../features'
import { useAppDispatch } from '../../app/hooks'

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch()

  const handleGoogleResponse = (response: CredentialResponse): void => {
    dispatch(googleLogin(response.credential))
  }

  const handleLogin = (data: TFormLoginValues): void => {
    dispatch(authLogin(data))
  }
  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={validationLoginSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched, handleSubmit, handleChange, handleBlur }) => {
        const getInputError = (
          field: keyof TFormLoginValues
        ): string | undefined => {
          return errors[field] !== '' && touched[field] !== undefined
            ? errors[field]
            : ''
        }

        return (
          <Box
            component="form"
            sx={{
              padding: {
                lg: '110px',
                md: '70px',
                xs: '20px'
              }
            }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Correo o nombre de usuario"
                  name="userNameOrEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('userNameOrEmail')}
                  error={Boolean(getInputError('userNameOrEmail'))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('password')}
                  error={Boolean(getInputError('password'))}
                />
              </Grid>
              <Grid item xs={12}>
                <StandardButton type="submit">Iniciar sesión</StandardButton>
              </Grid>
              <Grid item xs={12}>
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={() => {
                    console.error('Error on google login')
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    fontSize: '13px'
                  }}
                >
                  ¿No tienes una cuenta?{' '}
                  <span>
                    <Link replace to={`/${PublicRoutes.SIGNUP}`}>
                      clic aqui para crear una
                    </Link>
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      }}
    </Formik>
  )
}
export default LoginForm
