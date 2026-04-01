import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Button, Dropdown, Layout, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'
import './AppLayout.css'

const { Header, Sider, Content } = Layout
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '数据仪表盘',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/roles',
    icon: <TeamOutlined />,
    label: '角色管理',
  },
  {
    key: '/permissions',
    icon: <LockOutlined />,
    label: '权限管理',
  },
  {
    key: '/devices',
    icon: <DeploymentUnitOutlined />,
    label: '设备管理',
  },
  {
    key: '/ota',
    icon: <SettingOutlined />,
    label: 'OTA 设置',
  },
]

const menuTitleMap: Record<string, string> = {
  dashboard: '数据仪表盘',
  users: '用户管理',
  roles: '角色管理',
  permissions: '权限管理',
  devices: '设备管理',
  ota: 'OTA 设置',
}

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, logout } = useAppStore()

  const selectedKey = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/users/')) return '/users'
    if (path.startsWith('/devices/')) return '/devices'
    if (path.startsWith('/ota/')) return '/ota'
    if (path === '/') return '/dashboard'
    const root = `/${path.split('/')[1]}`
    return root
  }, [location.pathname])

  const breadcrumbItems = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    if (pathSegments.length === 0) {
      return [{ title: '首页' }, { title: '数据仪表盘' }]
    }

    const items: Array<{ title: ReactNode }> = [{ title: <Link to="/">首页</Link> }]
    pathSegments.forEach((segment, index) => {
      const isLast = index === pathSegments.length - 1
      const title = menuTitleMap[segment] ?? segment
      if (isLast) {
        items.push({ title })
      } else {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`
        items.push({ title: <Link to={path}>{title}</Link> })
      }
    })
    return items
  }, [location.pathname])

  return (
    <Layout className="app-layout">
      <Sider width={240} breakpoint="lg" collapsedWidth={80} theme="dark" className="app-layout__sider">
        <div className="app-layout__logo">IoT Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>
      <Layout>
        <Header className="app-layout__header">
          <Title level={4} className="app-layout__title">
            设备管理后台
          </Title>
          <Dropdown
            menu={{
              items: [{ key: 'logout', label: '退出登录', icon: <LogoutOutlined /> }],
              onClick: () => {
                logout()
                navigate('/login', { replace: true })
              },
            }}
            placement="bottomRight"
          >
            <Button type="text">{currentUser?.name ?? '当前用户'}</Button>
          </Dropdown>
        </Header>
        <Content className="app-layout__content">
          <Breadcrumb items={breadcrumbItems} className="app-layout__breadcrumb" />
          <div className="app-layout__content-body">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
