import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Popover,
  List
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getNotifications, readNotifications } from '../../features'
import { PrivateRoutes, PublicRoutes } from '../../models'
import { ExploreSearchInput } from '../ExploreSearchInput'
import { LazyLoad } from '../LazyLoad'
import { Notification } from '../Notification'
import { StandardButton } from '../StandardButton'
import { ChatIcon, NotificationIcon, SettingsIcon } from '../SvgIcons'
import { useGetSettings } from './hooks/useGetSettings'

function Header(): JSX.Element {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null)
  const settings = useGetSettings()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const unreadNotifications = useAppSelector(
    (state) => state.count.all.unreadNotifications
  )

  const unreadMessages = useAppSelector(
    (state) => state.count.all.unreadMessages
  )

  const notifications = useAppSelector(
    (state) => state.notification.notifications
  )
  const totalNotifications = useAppSelector(
    (state) => state.notification.totalItems
  )

  const userInfo = useAppSelector((state) => state.user.info)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  const handleOpenNotifications = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    setAnchorElNoti(event.currentTarget)
  }
  const handleCloseNotifications = (): void => {
    setAnchorElNoti(null)
  }

  useEffect(() => {
    const notReadNotificationIds = notifications
      .filter((n) => !n.read)
      .map((n) => n.id)
    if (notReadNotificationIds.length === 0) return
    dispatch(readNotifications(notReadNotificationIds))
  }, [notifications.length])

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'layout.carolinaBlue'
      }}
    >
      <Container
        sx={{
          minWidth: '100vw',
          backgroundColor: 'layout.babyPowder'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box
            component="button"
            sx={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/${PublicRoutes.EXPLORE}`)}
          >
            <Typography
              sx={{
                color: 'layout.gunmetal',
                fontWeight: 600
              }}
            >
              Explorar
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 100px',
              display: {
                md: 'flex',
                xs: 'none'
              }
            }}
          >
            <ExploreSearchInput />
          </Box>

          {isAuthenticated ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <IconButton
                  onClick={() =>
                    navigate(
                      `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MESSAGES}`
                    )
                  }
                >
                  <Badge color="error" badgeContent={unreadMessages} max={9}>
                    <ChatIcon width={24} height={24} />
                  </Badge>
                </IconButton>
                <IconButton onClick={handleOpenNotifications}>
                  <Badge
                    color="error"
                    badgeContent={unreadNotifications}
                    max={9}
                  >
                    <NotificationIcon width={26} height={26} />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(
                      `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SETTINGS}`
                    )
                  }}
                >
                  <SettingsIcon width={26} height={26} />
                </IconButton>
              </Box>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  src={userInfo?.avatar?.urlString}
                  alt={userInfo?.userName}
                />
              </IconButton>
              <Popover
                id="Notifications-popover"
                open={Boolean(anchorElNoti)}
                anchorEl={anchorElNoti}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <List
                  sx={{
                    maxWidth: '250px'
                  }}
                >
                  <LazyLoad
                    emptinessMessage="No hay notificationes"
                    totalPages={totalNotifications}
                    onEndReached={(page) => dispatch(getNotifications(page))}
                  >
                    {notifications.map((notification) => (
                      <Notification {...notification} key={notification.id} />
                    ))}
                  </LazyLoad>
                </List>
              </Popover>
              )
              <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={`id-menu-item-${setting.text}`}
                    onClick={() => {
                      setting.onClick()
                      handleCloseUserMenu()
                    }}
                  >
                    {setting.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <StandardButton
              sx={{ width: '180px' }}
              onClick={() => {
                navigate(`/${PublicRoutes.SIGNUP}`)
              }}
            >
              Crear una cuenta
            </StandardButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
