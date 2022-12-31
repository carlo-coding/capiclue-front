import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { sendFriendRequest } from '../../../features'
import { makeReport } from '../../../features/report/reportActions'
import { IOption, PrivateRoutes, TUserPartial } from '../../../models'
import { Report } from '../../Modal'
import { openModal, setModalContent } from '../../Modal/redux/modalSlice'

export const useGetAuthorOptions = (author: TUserPartial): IOption[] => {
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
        onClick: (): void => {
          dispatch(
            setModalContent(
              <Report
                cb={(content) => {
                  dispatch(
                    makeReport({
                      content,
                      reportedUserId: author.id
                    })
                  )
                }}
              />
            )
          )
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
      onClick: (): void => {
        dispatch(
          setModalContent(
            <Report
              cb={(content) => {
                dispatch(
                  makeReport({
                    content,
                    reportedUserId: author.id
                  })
                )
              }}
            />
          )
        )
        dispatch(openModal())
      }
    }
  ]
}
