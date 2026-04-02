import { makeAutoObservable } from 'mobx'
import { dashboards, devices, otaTasks, permissions, roles, users } from '../mock/data'
import type { DashboardStat, Device, OtaPlan, Permission, Role, User } from '../types/models'

export class AppStore {
  dashboardStats: DashboardStat[] = dashboards
  users: User[] = users
  roles: Role[] = roles
  permissions: Permission[] = permissions
  devices: Device[] = devices
  otaPlans: OtaPlan[] = otaTasks
  currentUserId: string | null = localStorage.getItem('tongyu-admin-current-user')

  constructor() {
    makeAutoObservable(this)
  }

  get currentUser() {
    if (!this.currentUserId) {
      return undefined
    }
    return this.users.find((user) => user.id === this.currentUserId)
  }

  get isAuthenticated() {
    return Boolean(this.currentUser)
  }

  get roleMap() {
    return new Map(this.roles.map((role) => [role.id, role]))
  }

  get userList() {
    return this.users
  }

  get filteredUsers() {
    return this.users
  }

  get deviceList() {
    return this.devices
  }

  get otaList() {
    return this.otaPlans
  }

  get onlineDeviceCount() {
    return this.devices.filter((device) => device.status === 'online').length
  }

  get offlineDeviceCount() {
    return this.devices.filter((device) => device.status === 'offline').length
  }

  get pendingOtaCount() {
    return this.otaPlans.filter((task) => task.status === 'draft').length
  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId)
  }

  getDeviceById(deviceId: string) {
    return this.devices.find((device) => device.id === deviceId)
  }

  getDevicesByOwnerId(userId: string) {
    return this.devices.filter((device) => device.ownerUserId === userId)
  }

  getOtaById(otaId: string) {
    return this.otaPlans.find((task) => task.id === otaId)
  }

  getOtaByOperatorId(userId: string) {
    return this.otaPlans.filter((task) => task.operatorUserId === userId)
  }

  login(username: string, password: string) {
    const matchedUser = this.users.find(
      (user) => user.email.toLowerCase() === username.toLowerCase() && user.status === 'active',
    )
    if (!matchedUser || password !== '123456') {
      return false
    }
    this.currentUserId = matchedUser.id
    localStorage.setItem('tongyu-admin-current-user', matchedUser.id)
    return true
  }

  logout() {
    this.currentUserId = null
    localStorage.removeItem('tongyu-admin-current-user')
  }
}

export const appStore = new AppStore()
