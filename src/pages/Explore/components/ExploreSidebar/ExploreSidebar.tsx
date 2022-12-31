import { Box, Container } from '@mui/material'
import { useGetOptions } from './hooks/useGetOptions'

function ExploreSidebar(): JSX.Element {
  const options = useGetOptions()

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: '300px',
        backgroundColor: 'layout.babyPowder',
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: '54px',
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
          margin: '60px'
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
    </Box>
  )
}
export default ExploreSidebar
