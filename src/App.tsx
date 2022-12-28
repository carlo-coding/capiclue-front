import { ThemeProvider } from '@mui/material/styles'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
import { store } from './app/store'
import { Loading, RoutesWith404 } from './components'
import AuthGuard from './guards/AuthGuard'
import { PrivateRoutes, PublicRoutes } from './models/routesModel'
import { Private } from './pages'
import { defaultTheme } from './themes'
import { SnackbarProvider } from 'notistack'

const Signup = lazy(async () => await import('./pages/Signup/Signup'))
const Login = lazy(async () => await import('./pages/Login/Login'))
const Explore = lazy(async () => await import('./pages/Explore/Explore'))

function App(): JSX.Element {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
        >
          <SnackbarProvider>
            <Provider store={store}>
              <ThemeProvider theme={defaultTheme}>
                <RoutesWith404>
                  <Route
                    path="/"
                    element={<Navigate to={PublicRoutes.EXPLORE} />}
                  />
                  <Route path={PublicRoutes.SIGNUP} element={<Signup />} />
                  <Route path={PublicRoutes.LOGIN} element={<Login />} />
                  <Route path={PublicRoutes.EXPLORE} element={<Explore />} />
                  <Route element={<AuthGuard />}>
                    <Route
                      path={`${PrivateRoutes.PRIVATE}/*`}
                      element={<Private />}
                    />
                  </Route>
                </RoutesWith404>
              </ThemeProvider>
            </Provider>
          </SnackbarProvider>
        </GoogleOAuthProvider>
      </Suspense>
    </div>
  )
}

export default App
