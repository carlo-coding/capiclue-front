import * as Yup from 'yup'

export const initialLoginValues = {
  userNameOrEmail: '',
  password: ''
}

export type TFormLoginValues = typeof initialLoginValues

export const validationLoginSchema = Yup.object().shape({
  userNameOrEmail: Yup.string()
    .min(3, 'Al menos 3 carácteres')
    .required('Campo requerido'),
  password: Yup.string().required('Campo requerido')
})
