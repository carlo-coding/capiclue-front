import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

function AuthGuard(): JSX.Element {
  const user = useAppSelector((state) => state.user.info)
  return user?.id !== undefined ? <Outlet /> : <Navigate to="/" />
}
export default AuthGuard
