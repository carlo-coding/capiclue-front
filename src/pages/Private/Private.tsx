import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { RoutesWith404 } from '../../components'
import { PrivateRoutes } from '../../models/routesModel'

const Explore = lazy(async () => await import('../Explore/Explore'))
const Messages = lazy(async () => await import('../Messages/Messages'))
const Profile = lazy(async () => await import('../Profile/Profile'))
const Settings = lazy(async () => await import('../Settings/Settings'))

function Private(): JSX.Element {
  return (
    <RoutesWith404>
      <Route path="/" element={<Navigate to={PrivateRoutes.EXPLORE} />} />
      <Route path={PrivateRoutes.EXPLORE} element={<Explore />} />
      <Route path={`${PrivateRoutes.MESSAGES}/*`} element={<Messages />} />
      <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
      <Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
    </RoutesWith404>
  )
}
export default Private
