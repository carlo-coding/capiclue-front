import { Box, Container } from '@mui/material'
import { useGetOptions } from './hooks/useGetOptions'

function ExploreSidebar(): JSX.Element {
  const options = useGetOptions()

  return (
    <Container
      sx={{
        height: '100%',
        backgroundColor: 'layout.babyPowder',
        borderRight: '2px solid',
        borderColor: 'layout.carolinaBlue',
        display: {
          md: 'flex',
          xs: 'none'
        },
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '30px',
          margin: '30px'
        }}
      >
        {options.map((option) => (
          <Box
            component="button"
            sx={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px'
            }}
            key={option.text}
            onClick={option.onClick}
          >
            {option.text}
          </Box>
        ))}
      </Box>
    </Container>
  )
}
export default ExploreSidebar
