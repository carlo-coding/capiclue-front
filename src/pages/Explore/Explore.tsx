import { Box } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Layout, LazyLoad, Publication } from '../../components'
import { getPublications } from '../../features'
import { useQuery, validateSectionQuery } from '../../utils'
import { ExploreSearchInput, ExploreSidebar } from './components'

function Explore(): JSX.Element {
  const section = useQuery().get('section')
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const querySection = validateSectionQuery(section, search)

  const publications = useAppSelector(
    (state) => state.publication[querySection].publications
  )
  const totalPublicationPages = useAppSelector(
    (state) => state.publication[querySection].totalPages
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ExploreSearchInput search={search} setSearch={setSearch} />

          <Box
            sx={{
              display: 'grid',
              width: '100%',
              alignItems: 'center',
              padding: {
                md: '60px',
                xs: '15px'
              },
              flexGrow: 1,
              overflowY: 'scroll',
              maxHeight: {
                md: 'calc(100vh - 130px)',
                xs: 'calc(100vh - 178px)'
              },
              gap: '20px'
            }}
          >
            {
              <LazyLoad
                totalPages={totalPublicationPages}
                dependencies={[querySection, search.length]}
                onEndReached={(page) =>
                  dispatch(
                    getPublications({
                      section: querySection,
                      search,
                      page
                    })
                  )
                }
              >
                {publications?.map((publication) => (
                  <Publication
                    {...publication}
                    key={`explore-publication-${publication.id}`}
                  ></Publication>
                ))}
              </LazyLoad>
            }
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
export default Explore
