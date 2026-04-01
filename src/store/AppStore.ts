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

  constructor() {
    makeAutoObservable(this)
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
}

export const appStore = new AppStore()
