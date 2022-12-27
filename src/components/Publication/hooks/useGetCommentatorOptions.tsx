import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { sendFriendRequest } from '../../../features'
import { IOption, PrivateRoutes, TUserPartial } from '../../../models'
import { Report } from '../../Modal'
import {
  openModal,
  setModalContent,
  setModalMetadata
} from '../../Modal/redux/modalSlice'

export const useGetCommentatorOptions = (author: TUserPartial): IOption[] => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (author.isFriend !== undefined && author.isFriend) {
    return [
      {
        text: 'Mandar mensaje',
        onClick: () => {
          navigate(
            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESSAGES}?id=${
              author.id as number
            }`
          )
        }
      },
      {
        text: 'Reportar',
        onClick: (commentId: number): void => {
          dispatch(setModalMetadata({ commentId }))
          dispatch(setModalContent(<Report />))
          dispatch(openModal())
        }
      }
    ]
  }
  return [
    {
      text: 'Mandar solicitud de amistad',
      onClick: () => {
        dispatch(sendFriendRequest(author.id as number))
      }
    },
    {
      text: 'Reportar',
      onClick: (commentId: number): void => {
        dispatch(setModalMetadata({ commentId }))
        dispatch(setModalContent(<Report />))
        dispatch(openModal())
      }
    }
  ]
}
