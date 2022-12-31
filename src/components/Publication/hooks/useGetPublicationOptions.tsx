import { useAppDispatch } from '../../../app/hooks'
import { deletePublication } from '../../../features'
import { IOption, IPublication } from '../../../models'
import { MakePublication, UserConfirm } from '../../Modal'
import { openModal, setModalContent } from '../../Modal/redux/modalSlice'

export const useGetPublicationOptions = (
  publication: IPublication,
  isAuthor: boolean
): IOption[] => {
  const dispatch = useAppDispatch()
  if (isAuthor) {
    return [
      {
        text: 'Eliminar',
        onClick: (): void => {
          dispatch(
            setModalContent(
              <UserConfirm
                cb={() => dispatch(deletePublication(publication.id))}
              >
                Seguro que quieres borrar esta publicación?
              </UserConfirm>
            )
          )
          dispatch(openModal())
        }
      },
      {
        text: 'Editar',
        onClick: (): void => {
          dispatch(
            setModalContent(<MakePublication publication={publication} />)
          )
          dispatch(openModal())
        }
      }
    ]
  } else {
    return []
  }
}
