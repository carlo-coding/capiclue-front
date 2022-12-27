import { Box, Avatar, Typography, IconButton } from '@mui/material'
import { IUser, PrivateRoutes } from '../../../../models'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ChatIcon from '@mui/icons-material/Chat'
import { useDispatch } from 'react-redux'
import { openModal, setModalContent, UserConfirm } from '../../../../components'
import { deleteFriend } from '../../../../features'
import { useNavigate } from 'react-router-dom'
function FriendBox({ id, avatar, userName }: Partial<IUser>): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChatFriend = (): void => {
    navigate(
      `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESSAGES}?id=${id as number}`
    )
  }

  const handleRemoveFriend = (): void => {
    if (id === undefined) return
    dispatch(
      setModalContent(
        <UserConfirm cb={() => dispatch(deleteFriend(id))}>
          ¿Seguro que quieres eliminar la amistad con {userName}?
        </UserConfirm>
      )
    )
    dispatch(openModal())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '5px',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: 'layout.carolinaBlue',
        borderRadius: '5px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Avatar src={avatar?.urlString} alt={userName} />
        <Typography>{userName}</Typography>
      </Box>
      <Box>
        <IconButton onClick={handleChatFriend}>
          <ChatIcon color="primary" />
        </IconButton>
        <IconButton onClick={handleRemoveFriend}>
          <RemoveCircleOutlineIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  )
}
export default FriendBox
