import { Box, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'
import { StandardButton } from '../../components'
import { Link } from 'react-router-dom'
import { PublicRoutes } from '../../models/routesModel'
import { Formik } from 'formik'
import {
  initialValues,
  TFormSignupValues,
  validationSchema
} from './validationSchema'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAppDispatch } from '../../app/hooks'
import { authSignup, googleLogin } from '../../features'
import React, { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
function SignupForm(): JSX.Element {
  const [temrsChecked, setTermsChecked] = useState(false)
  const dispatch = useAppDispatch()

  const handleFormSubmit = (data: TFormSignupValues): void => {
    if (!temrsChecked) {
      enqueueSnackbar('Primero debes aceptar los términos y condiciones', {
        variant: 'error'
      })
      return
    }
    dispatch(authSignup(data))
  }

  const handleGoogleResponse = (response: CredentialResponse): void => {
    dispatch(googleLogin(response.credential))
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTermsChecked(e.currentTarget.checked)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, handleBlur }) => {
        const getInputError = (
          field: keyof TFormSignupValues
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
                lg: '30px',
                md: '20px',
                xs: '15px'
              }
            }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2.5}>
              <Grid item xs={6}>
                <TextField
                  label="Nombre"
                  name="names"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('names')}
                  error={Boolean(getInputError('names'))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Apellidos"
                  name="surnames"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('surnames')}
                  error={Boolean(getInputError('surnames'))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nombre de usuario"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('userName')}
                  error={Boolean(getInputError('userName'))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  name="birthday"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('birthday')}
                  error={Boolean(getInputError('birthday'))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Correo electrónico"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('email')}
                  error={Boolean(getInputError('email'))}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  label="Repite la contraseña"
                  name="repeatPassword"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('repeatPassword')}
                  error={Boolean(getInputError('repeatPassword'))}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ marginRight: '5px' }}
                  control={
                    <Checkbox
                      onChange={handleTermsChange}
                      checked={temrsChecked}
                    />
                  }
                  label="Acepto los"
                />
                <a target="_blank" href="Terminos_y_condiciones_0.0.1.pdf">
                  términos y condiciones
                </a>
              </Grid>

              <Grid item xs={12}>
                <StandardButton type="submit">Crear cuenta</StandardButton>
              </Grid>

              <Grid item xs={12}>
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={() => {
                    console.error('Error on google signup')
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    fontSize: '13px'
                  }}
                >
                  ¿Ya tienes una cuenta?{' '}
                  <span>
                    <Link replace to={`/${PublicRoutes.LOGIN}`}>
                      clic aqui para acceder
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
export default SignupForm
