import request from '@/utils/request'
import { Permission, PermissionAttrs, PermissionConditions } from './types/permission'
import { PageResult } from '../types'

export const getAllPermissions = () => {
  return request<Permission[]>({
    method: 'GET',
    url: '/system/permissions'
  })
}

export const getPermissionsByConditions = (params?: PermissionConditions) => {
  return request<PageResult<Permission>>({
    method: 'GET',
    url: '/system/permissions/by-conditions',
    params
  })
}

export const deletePermission = (id: number) => {
  return request<Permission>({
    method: 'DELETE',
    url: `/system/permissions/${id}`
  })
}

export const getPermissionById = (id: number) => {
  return request<Permission>({
    method: 'GET',
    url: `/system/permissions/${id}`
  })
}

export const createPermission = (data: PermissionAttrs) => {
  return request<Permission>({
    method: 'POST',
    url: '/system/permissions',
    data
  })
}

export const updatePermission = (id: number, data: PermissionAttrs) => {
  return request<Permission>({
    method: 'PATCH',
    url: `/system/permissions/${id}`,
    data
  })
}
