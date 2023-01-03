import { Box, Paper } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  Layout,
  LazyLoad,
  MakePublication,
  Publication
} from '../../components'
import { getPublications } from '../../features'
import { IPublication } from '../../models'
import { useQuery, validateSectionQuery } from '../../utils'
import { ExploreSearchInput, ExploreSidebar } from './components'

function Explore(): JSX.Element {
  const section = useQuery().get('section')
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.search.search)
  const querySection = validateSectionQuery(section, search)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

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
          position: 'relative',
          flexGrow: 1,
          gridTemplateColumns: {
            md: '300px 1fr',
            xs: '1fr'
          },
          gridTemplateRows: {
            md: 'none',
            xs: '0 104px'
          }
        }}
      >
        <Box
          sx={{
            width: '100%',
            flexDirection: 'column',
            position: 'fixed',
            alignItems: 'center',
            backgroundColor: '#FFF',
            zIndex: 500,
            top: '56px',
            display: {
              md: 'none',
              xs: 'flex'
            }
          }}
        >
          <ExploreSearchInput />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '104px',
            display: {
              md: 'none',
              xs: 'block'
            }
          }}
        ></Box>

        <ExploreSidebar />
        <div></div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              width: '100%',
              alignItems: 'center',
              backgroundColor: 'layout.mintCream',
              padding: {
                md: '30px 60px',
                xs: '15px'
              },
              flexGrow: 1,
              gap: '20px'
            }}
          >
            {isAuthenticated && (
              <Paper
                sx={{
                  borderRadius: '10px',
                  width: '100%',
                  flexDirection: 'column',
                  padding: {
                    md: '20px 40px',
                    xs: '10px 20px'
                  },
                  border: '1px solid',
                  borderColor: 'layout.carolinaBlue'
                }}
              >
                <MakePublication />
              </Paper>
            )}
            {
              <LazyLoad
                totalPages={totalPublicationPages}
                dependencies={[querySection, search.length]}
                emptinessMessage="No hay publicaciones"
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
                    {...(publication as IPublication)}
                    key={`explore-publication-${publication.id as number}`}
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
