import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteComment } from '../../../features'
import { setCommentEditContent } from '../../../features/comment/commentSlice'
import { makeReport } from '../../../features/report/reportActions'
import { IComment, IOption } from '../../../models'
import { Report, UserConfirm } from '../../Modal'
import { openModal, setModalContent } from '../../Modal/redux/modalSlice'

export const useGetCommentOptions = (comment: IComment): IOption[] => {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.user.info)
  const commentatorId = comment.commentator.id

  if (userInfo?.id === commentatorId) {
    return [
      {
        text: 'Editar',
        onClick: (): void => {
          dispatch(setCommentEditContent(comment))
        }
      },
      {
        text: 'Eliminar',
        onClick: (): void => {
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
      onClick: (): void => {
        dispatch(
          setModalContent(
            <Report
              cb={(content) => {
                dispatch(
                  makeReport({
                    content,
                    reportedCommentId: comment.id
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
