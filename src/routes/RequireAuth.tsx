import { observer } from 'mobx-react-lite'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'

export const RequireAuth = observer(() => {
  const store = useAppStore()
  const location = useLocation()

  if (!store.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
})
