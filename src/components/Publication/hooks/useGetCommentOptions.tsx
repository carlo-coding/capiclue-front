import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteComment } from '../../../features'
import { setCommentEditContent } from '../../../features/comment/commentSlice'
import { IComment, IOption } from '../../../models'
import { Report, UserConfirm } from '../../Modal'
import {
  openModal,
  setModalContent,
  setModalMetadata
} from '../../Modal/redux/modalSlice'

export const useGetCommentOptions = (commentatorId?: number): IOption[] => {
  const dispatch = useAppDispatch()

  const userInfo = useAppSelector((state) => state.user.info)

  if (userInfo?.id === commentatorId) {
    return [
      {
        text: 'Editar',
        onClick: (comment: IComment): void => {
          dispatch(setCommentEditContent(comment))
        }
      },
      {
        text: 'Eliminar',
        onClick: (comment: IComment): void => {
          dispatch(
            setModalContent(
              <UserConfirm
                cb={() => {
                  dispatch(
                    deleteComment({
                      commentId: comment.id,
                      publicationId: comment.publicationId
                    })
                  )
                  dispatch(setCommentEditContent(null))
                }}
              >
                Seguro que quieres eliminar este comentario?
              </UserConfirm>
            )
          )
          dispatch(openModal())
        }
      }
    ]
  }
  return [
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
