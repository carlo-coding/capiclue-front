import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '../../../../../models'

interface IOption {
  text: string
  onClick: () => void
}
export const useGetOptions = (): IOption[] => {
  const navigate = useNavigate()
  const route = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EXPLORE}`
  const options: IOption[] = [
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

  return options
}
