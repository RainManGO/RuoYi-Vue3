
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
//= ===========================角色管理==============================

// 查询角色列表
export const listRole = (params: any) => {
  return https().request<any>('system/role/list', Method.GET, params, ContentType.form)
}

// 查询角色详细

export const getRole = (roleId: number) => {
  return https().request<any>(`system/role/${roleId}`, Method.GET, undefined, ContentType.form)
}

// 新增角色

export const addRole = (params: any) => {
  return https().request<RootObject<any>>('system/role', Method.POST, params, ContentType.json)
}

// 修改角色

export const updateRole = (params: any) => {
  return https().request<RootObject<any>>('system/role', Method.PUT, params, ContentType.json)
}

// 角色数据权限

export const dataScope = (params: any) => {
  return https().request<RootObject<any>>('system/role/dataScope', Method.PUT, params, ContentType.json)
}

// 角色状态修改

export const changeRoleStatus = (roleId: any, status: any) => {
  const data = {
    roleId,
    status
  }
  return https().request<RootObject<any>>('system/role/changeStatus', Method.PUT, data, ContentType.json)
}

// 删除角色

export const delRole = (roleId: any) => {
  return https().request<RootObject<any>>(`system/role/${roleId}`, Method.DELETE, undefined, ContentType.form)
}

// 导出角色

export const exportRole = (params: any) => {
  return https().request<RootObject<any>>('system/role/export', Method.GET, params, ContentType.form)
}
