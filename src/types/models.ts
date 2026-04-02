export interface DashboardStat {
  id: string
  title: string
  value: number
  suffix?: string
}

export interface Permission {
  id: string
  name: string
  code: string
  resource: string
  action: string
  description: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissionIds: string[]
  memberCount: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'disabled'
  roleId: string
  createdAt: string
  lastLoginAt: string
}

export interface Device {
  id: string
  name: string
  serialNumber: string
  model: string
  status: 'online' | 'offline' | 'warning'
  firmwareVersion: string
  ownerUserId: string
  location: string
  lastSeenAt: string
}

export interface OtaPlan {
  id: string
  name: string
  targetVersion: string
  channel: 'stable' | 'gray'
  status: 'draft' | 'publishing' | 'finished'
  targetDeviceCount: number
  successRate: number
  releaseNote: string
  operatorUserId: string
  createdAt: string
}
