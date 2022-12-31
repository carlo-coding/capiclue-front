import {
  Conditional,
  Layout,
  MakePublication,
  openModal,
  setModalContent,
  StandardButton,
  UpdateUserInfo
} from '../../components'
import { Box, Avatar, Typography } from '@mui/material'
import { ExploreSidebar } from '../Explore/components'
import { useState, useEffect, useRef } from 'react'
import { ProfileTabs } from './components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useQuery } from '../../utils'
import { IUser } from '../../models'
import { uploadAvatar } from '../../features'
function Profile(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [profile, setProfile] = useState<Partial<IUser> | undefined>({})
  const dispatch = useAppDispatch()

  const userId = useQuery().get('userId')
  const userInfo = useAppSelector((state) => state.user.info)
  const isUserProfile = userId == null || parseInt(userId) === userInfo?.id

  useEffect(() => {
    if (isUserProfile) {
      setProfile(userInfo)
    } else {
      // TODO: Fetch userId profile and use setProfile
    }
  }, [userId, ...Object.values(userInfo != null ? userInfo : {})])

  const handleUpdateImage = (): void => {
    if (!isUserProfile) return
    inputRef.current?.click()
  }
  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      event.currentTarget.files == null ||
      event.currentTarget.files.length === 0
    ) {
      return
    }
    dispatch(uploadAvatar(event.currentTarget.files[0]))
  }

  const handleShowPublicationModal = (): void => {
    dispatch(setModalContent(<MakePublication />))
    dispatch(openModal())
  }

  const handleShowEditInfoModal = (): void => {
    dispatch(setModalContent(<UpdateUserInfo />))
    dispatch(openModal())
  }

  const profileButtons = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        gap: '15px',
        width: '100%',
        padding: '15px'
      }}
    >
      <StandardButton
        onClick={handleShowEditInfoModal}
        sx={{
          width: 'max-content',
          fontSize: '14px',
          padding: '8px'
        }}
      >
        Editar Información
      </StandardButton>
      <StandardButton
        onClick={handleShowPublicationModal}
        sx={{
          width: 'max-content',
          fontSize: '14px',
          padding: '8px'
        }}
      >
        Crear Publicación
      </StandardButton>
    </Box>
  )

  return (
    <Layout>
      <Box
        sx={{
          display: 'grid',
          flexGrow: 1,
          gridTemplateColumns: {
            md: '300px 1fr',
            xs: '1fr'
          }
        }}
      >
        <ExploreSidebar />
        <Box sx={{ display: { md: 'block', xs: 'none' } }}></Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'layout.mintCream'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              padding: '15px',
              marginTop: {
                md: '20px',
                xs: '10px'
              }
            }}
          >
            <Avatar
              src={profile?.avatar?.urlString}
              alt="User avatar"
              onClick={handleUpdateImage}
              sx={{
                width: {
                  md: '150px',
                  xs: '80px'
                },
                height: {
                  md: '150px',
                  xs: '80px'
                },
                ...(isUserProfile && {
                  '&:hover::after': {
                    opacity: 1
                  },
                  '&::after': {
                    content: '"Editar"',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'white',
                    position: 'absolute',
                    opacity: '0',
                    inset: 0,
                    bgcolor: 'rgba(30,210,30,0.5)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: '0.3s ease opacity'
                  }
                })
              }}
            />
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleImageInputChange}
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  width: '100%',
                  padding: '15px',
                  flexGrow: 1
                }}
              >
                <Conditional parent={<Typography />}>
                  {profile?.userName}
                </Conditional>
                <Conditional
                  parent={
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.5)'
                      }}
                    />
                  }
                >
                  {profile?.names}
                </Conditional>
              </Box>
              <Box
                sx={{
                  display: {
                    md: 'flex',
                    xs: 'none'
                  }
                }}
              >
                {profileButtons}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                md: 'none',
                xs: 'flex'
              }
            }}
          >
            {profileButtons}
          </Box>
          <ProfileTabs />
        </Box>
      </Box>
    </Layout>
  )
}
export default Profile
