import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { sendFriendRequest } from '../../../features'
import { makeReport } from '../../../features/report/reportActions'
import { IOption, PrivateRoutes, TUserPartial } from '../../../models'
import { Report } from '../../Modal'
import { openModal, setModalContent } from '../../Modal/redux/modalSlice'

export const useGetCommentatorOptions = (
  commentator: TUserPartial
): IOption[] => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (commentator.isFriend !== undefined && commentator.isFriend) {
    return [
      {
        text: 'Mandar mensaje',
        onClick: () => {
          navigate(
            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESSAGES}?id=${
              commentator.id as number
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
                      reportedUserId: commentator.id
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
        dispatch(sendFriendRequest(commentator.id as number))
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
                    reportedUserId: commentator.id
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
