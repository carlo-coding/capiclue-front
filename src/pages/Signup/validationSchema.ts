import * as Yup from 'yup'
import { isOverEighteen } from '../../utils'

export const initialValues = {
  names: '',
  surnames: '',
  userName: '',
  birthday: '',
  email: '',
  password: '',
  repeatPassword: ''
}

export type TFormSignupValues = typeof initialValues

export const validationSchema = Yup.object().shape({
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
    .required('Campo requerido'),
  email: Yup.string().email('No es valido').required('Campo requerido'),
  password: Yup.string()
    .min(8, 'Al menos 8 carácteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
      'Un carácter especial y un número'
    )
    .required('Campo requerido'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'No coinciden')
    .required('Campo requerido')
})
