import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../features/auth/authSlice'
import { PrivateRoutes } from '../../../models/routesModel'
import { MakePublication, openModal, setModalContent } from '../../Modal'

interface ISetting {
  onClick: () => void
  text: string
}

export const useGetSettings = (): ISetting[] => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const settings = [
    {
      onClick: () => {
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PROFILE}`, {
          replace: true
        })
      },
      text: 'Ir a mi perfil'
    },
    {
      onClick: () => {
        dispatch(setModalContent(<MakePublication />))
        dispatch(openModal())
      },
      text: 'Crear una publicación'
    },
    {
      onClick: () => {
        dispatch(logout())
      },
      text: 'Cerrar sesión'
    }
  ]
  return settings
}
