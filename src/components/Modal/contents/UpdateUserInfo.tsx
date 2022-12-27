import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { updateUser } from '../../../features'
import { formatInputDate, isOverEighteen } from '../../../utils'
import { StandardButton } from '../../StandardButton'

const initialUpdateInfoFormValues = {
  names: '',
  surnames: '',
  userName: '',
  birthday: ''
}

export type TFormUpdateUserValues = typeof initialUpdateInfoFormValues

const validationSchema = Yup.object().shape({
  names: Yup.string()
    .min(3, 'Al menos 3 carácteres')
    .required('Campo requerido'),
  surnames: Yup.string()
    .min(3, 'Al menos 3 carácteres')
    .required('Campo requerido'),
  userName: Yup.string()
    .min(3, 'Al menos 3 carácteres')
    .required('Campo requerido'),
  birthday: Yup.string()
    .test('mayor-de-edad', 'No es mayor de edad', (value) => {
      return isOverEighteen(value ?? '')
    })
    .required('Campo requerido')
})

function UpdateUserInfo(): JSX.Element {
  const dispatch = useAppDispatch()

  const userInfo = useAppSelector((state) => state.user.info)

  const handleFormSubmit = (data: TFormUpdateUserValues): void => {
    dispatch(updateUser(data))
  }

  return (
    <Formik
      initialValues={
        userInfo != null
          ? {
              userName: userInfo.userName as string,
              names: userInfo.names as string,
              surnames: userInfo.surnames as string,
              birthday: userInfo.birthday as string
            }
          : initialUpdateInfoFormValues
      }
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, handleBlur }) => {
        const getInputError = (
          field: keyof TFormUpdateUserValues
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  defaultValue={userInfo?.userName}
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
                  defaultValue={userInfo?.names}
                  label="Nombres"
                  name="names"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('names')}
                  error={Boolean(getInputError('names'))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={userInfo?.surnames}
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
                  defaultValue={
                    userInfo?.birthday !== undefined
                      ? formatInputDate(userInfo.birthday)
                      : ''
                  }
                  type="date"
                  name="birthday"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={getInputError('birthday')}
                  error={Boolean(getInputError('birthday'))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '30px'
                  }}
                >
                  <StandardButton
                    type="button"
                    sx={{ fontSize: '14px', padding: '4px 0' }}
                  >
                    Click aqui para cambiar contraseña
                  </StandardButton>

                  <StandardButton
                    type="submit"
                    sx={{ fontSize: '14px', padding: '4px 0' }}
                  >
                    Editar información
                  </StandardButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      }}
    </Formik>
  )
}
export default UpdateUserInfo
