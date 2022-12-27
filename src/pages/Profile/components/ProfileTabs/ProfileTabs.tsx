import { Box, Tabs, Tab } from '@mui/material'
import { LazyLoad, Publication } from '../../../../components'
import { FriendBox } from '../FriendBox'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { getAllFriends, getPublications } from '../../../../features'

function ProfileTabs(): JSX.Element {
  const [value, setValue] = useState(0)
  const dispatch = useAppDispatch()

  const friendsList = useAppSelector((state) => state.friend.friends.list)
  const totalFriendsListPages = useAppSelector(
    (state) => state.friend.friends.totalPages
  )

  const userPublications = useAppSelector(
    (state) => state.count.all.userPublications
  )

  const totalFriends = useAppSelector((state) => state.count.all.totalFriends)

  const publications = useAppSelector(
    (state) => state.publication.user.publications
  )
  const totalUserPublicationPages = useAppSelector(
    (state) => state.publication.user.totalPages
  )

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue)
  }

  const a11yProps = (
    index: number
  ): {
    id: string
    'aria-controls': string
  } => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  return (
    <>
      <Tabs
        sx={{
          width: '100%',
          '& .MuiTabs-flexContainer': {
            width: '100%',
            justifyContent: {
              md: 'start',
              xs: 'space-evenly'
            }
          }
        }}
        value={value}
        onChange={handleChange}
      >
        <Tab label={`${totalFriends} amigos`} {...a11yProps(0)}></Tab>
        <Tab
          label={`${userPublications} publicaciones`}
          {...a11yProps(1)}
        ></Tab>
      </Tabs>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '10px',
          padding: '10px',
          maxHeight: 'calc(100vh - 312px)',
          overflowY: 'auto'
        }}
      >
        {value === 0 && (
          <LazyLoad
            totalPages={totalFriendsListPages}
            onEndReached={(page) => dispatch(getAllFriends(page))}
          >
            {friendsList.map((friend, index) => (
              <FriendBox {...friend} key={`profile-friend-box-${index}`} />
            ))}
          </LazyLoad>
        )}
        {value === 1 && (
          <LazyLoad
            totalPages={totalUserPublicationPages}
            onEndReached={(page) =>
              dispatch(
                getPublications({
                  section: 'user',
                  page
                })
              )
            }
          >
            {publications.map((publication, index) => (
              <Publication
                {...publication}
                key={`profile-publication-box-${index}`}
              />
            ))}
          </LazyLoad>
        )}
      </Box>
    </>
  )
}
export default ProfileTabs
