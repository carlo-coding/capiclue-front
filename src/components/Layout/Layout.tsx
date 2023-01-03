import { Box } from '@mui/material'
import { useAppDispatch } from '../../app/hooks'
import { getCounts } from '../../features'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Modal } from '../Modal'
import { useEffect } from 'react'
interface ILayoutProps {
  children: React.ReactNode
}
function Layout({ children }: ILayoutProps): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCounts())
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: {
          md: '64px',
          xs: '52px'
        },
        background: 'layout.mintCream'
      }}
    >
      <Header />
      {children}
      <Footer />
      <Modal />
    </Box>
  )
}
export default Layout
