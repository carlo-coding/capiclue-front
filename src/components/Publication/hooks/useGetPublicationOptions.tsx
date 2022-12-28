import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addPublicationToFavorites, deletePublication } from '../../../features'
import { IOption, IPublication, TPublicationPartial } from '../../../models'
import { MakePublication, Report, UserConfirm } from '../../Modal'
import { openModal, setModalContent } from '../../Modal/redux/modalSlice'

export const useGetPublicationOptions = (authorId: number): IOption[] => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector((state) => state.user.info?.id)

  let options: IOption[]

  if (authorId === userId) {
    options = [
      {
        text: 'Eliminar',
        onClick: (publication: TPublicationPartial): void => {
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
        onClick: (publication: TPublicationPartial): void => {
          dispatch(
            setModalContent(
              <MakePublication publication={publication as IPublication} />
            )
          )
          dispatch(openModal())
        }
      }
    ]
  } else {
    options = [
      {
        text: 'Guardar en favoritos',
        onClick: (publication: TPublicationPartial): void => {
          dispatch(addPublicationToFavorites(publication.id))
        }
      },
      {
        text: 'Reportar',
        onClick: (publication: TPublicationPartial): void => {
          dispatch(setModalContent(<Report cb={() => {}} />))
          dispatch(openModal())
        }
      }
    ]
  }
  return options
}
