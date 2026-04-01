import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { DeviceDetailPage } from './pages/devices/DeviceDetailPage'
import { DeviceManagementPage } from './pages/devices/DeviceManagementPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OtaDetailPage } from './pages/ota/OtaDetailPage'
import { OtaSettingsPage } from './pages/ota/OtaSettingsPage'
import { PermissionManagementPage } from './pages/permissions/PermissionManagementPage'
import { RoleManagementPage } from './pages/roles/RoleManagementPage'
import { UserDetailPage } from './pages/users/UserDetailPage'
import { UserManagementPage } from './pages/users/UserManagementPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/:userId" element={<UserDetailPage />} />
          <Route path="roles" element={<RoleManagementPage />} />
          <Route path="permissions" element={<PermissionManagementPage />} />
          <Route path="devices" element={<DeviceManagementPage />} />
          <Route path="devices/:deviceId" element={<DeviceDetailPage />} />
          <Route path="ota" element={<OtaSettingsPage />} />
          <Route path="ota/:otaId" element={<OtaDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
