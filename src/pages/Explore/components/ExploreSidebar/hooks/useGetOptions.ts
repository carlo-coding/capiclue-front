import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../app/hooks'
import { PublicRoutes } from '../../../../../models'

interface IOption {
  text: string
  onClick: () => void
}
export const useGetOptions = (): IOption[] => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const route = `/${PublicRoutes.EXPLORE}`

  if (!isAuthenticated) {
    return [
      {
        text: 'Para ti',
        onClick: () => {
          navigate(`${route}?section=all`)
        }
      },
      {
        text: 'Popular',
        onClick: () => {
          navigate(`${route}?section=popular`)
        }
      }
    ]
  }
  return [
    {
      text: 'Para ti',
      onClick: () => {
        navigate(`${route}?section=all`)
      }
    },
    {
      text: 'Siguiendo',
      onClick: () => {
        navigate(`${route}?section=friends`)
      }
    },
    {
      text: 'Popular',
      onClick: () => {
        navigate(`${route}?section=popular`)
      }
    },
    {
      text: 'Favoritos',
      onClick: () => {
        navigate(`${route}?section=favorite`)
      }
    }
  ]
}
