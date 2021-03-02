// 部门管理
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'

export const listDept = (data?: any) => {
  return https().request<RootObject<any>>('system/dept/list', Method.GET, data, ContentType.form)
}

export const getDept = (deptId: any) => {
  return https().request<RootObject<any>>(`system/dept/${deptId}`, Method.GET, undefined, ContentType.form)
}

export const listDeptExcludeChild = (deptId: any) => {
  return https().request<RootObject<any>>(`system/dept/list/exclude/${deptId}`, Method.GET, undefined, ContentType.form)
}

export const delDept = (deptId: any) => {
  return https().request<RootObject<any>>(`system/dept/${deptId}`, Method.DELETE, undefined, ContentType.form)
}

// 修改部门

export const updateDept = (data: any) => {
  return https().request<RootObject<any>>('system/dept/', Method.PUT, data, ContentType.form)
}

// 新增部门

export const addDept = (data: any) => {
  return https().request<RootObject<any>>('system/dept/', Method.POST, data, ContentType.form)
}

// 根据角色ID查询部门树结构

export const roleDeptTreeselect = (roleId: number | string) => {
  return https().request<any>(`system/dept/roleDeptTreeselect/${roleId}`, Method.GET, undefined, ContentType.form)
}

// 查询部门下拉树结构

export const treeselect = () => {
  return https().request<RootObject<any>>('system/dept/treeselect', Method.GET, undefined, ContentType.form)
}
