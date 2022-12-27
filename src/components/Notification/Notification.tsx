import { Box, Divider, IconButton, ListItem } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import {
  INotification,
  INotificationPayloads,
  NotificationTypes
} from '../../models'
import { parseJson } from '../../utils'
import { useAppDispatch } from '../../app/hooks'
import { acceptFriend, deleteNotification, rejectFriend } from '../../features'

function Notification({
  actionPayload,
  actionType,
  content,
  id
}: INotification): JSX.Element {
  const dispatch = useAppDispatch()

  const handleDeleteNotification = (): void => {
    dispatch(deleteNotification(id))
  }

  const notificationButtons = {
    [NotificationTypes.FRIEND_REQUEST]: (
      <>
        <ListItemButton
          onClick={() => {
            const payload =
              parseJson<INotificationPayloads['friend_request']>(actionPayload)
            dispatch(acceptFriend(payload.senderId))
            dispatch(deleteNotification(id))
          }}
        >
          Aceptar
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            const payload =
              parseJson<INotificationPayloads['friend_request']>(actionPayload)
            dispatch(rejectFriend(payload.senderId))
            dispatch(deleteNotification(id))
          }}
        >
          Rechazar
        </ListItemButton>
      </>
    ),
    [NotificationTypes.NEW_COMMENT]: null,
    [NotificationTypes.FRIEND_REQUEST_REJECTED]: null,
    [NotificationTypes.WELCOME]: null
  }
  return (
    <>
      <ListItem
        sx={{
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <IconButton onClick={handleDeleteNotification}>
            <CloseIcon color="error" sx={{ fontSize: '10px' }} />
          </IconButton>
        </Box>
        <ListItemText>{content}</ListItemText>
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {notificationButtons[actionType]}
        </Box>
      </ListItem>
      <Divider />
    </>
  )
}
export default Notification
