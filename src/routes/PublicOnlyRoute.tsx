import { Navigate, Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useAppStore } from '../hooks/useAppStore'

export const PublicOnlyRoute = observer(() => {
  const { isAuthenticated } = useAppStore()
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
})
