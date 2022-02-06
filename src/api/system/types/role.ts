import { User } from './user'
import { Permission } from './permission'
import { Menu } from './menu'

export interface Role {
  id: number
  name: string
  value: string
  label: string
  users: User[]
  permissions: Permission[]
  menuIds: number[]
  status: boolean
  createdAt: Date
  updatedAt: Date
  menus: Menu[]
}
