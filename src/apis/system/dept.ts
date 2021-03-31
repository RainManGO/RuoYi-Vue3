// 部门管理
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import { ServerPath } from '@/constant/network'
export const listDept = (data?: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/list`, Method.GET, data, ContentType.form)
}

export const getDept = (deptId: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/${deptId}`, Method.GET, undefined, ContentType.form)
}

export const listDeptExcludeChild = (deptId: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/list/exclude/${deptId}`, Method.GET, undefined, ContentType.form)
}

export const delDept = (deptId: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/${deptId}`, Method.DELETE, undefined, ContentType.form)
}

// 修改部门

export const updateDept = (data: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/`, Method.PUT, data, ContentType.json)
}

// 新增部门

export const addDept = (data: any) => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/`, Method.POST, data, ContentType.json)
}

// 根据角色ID查询部门树结构

export const roleDeptTreeselect = (roleId: number | string) => {
  return https.request<any>(`${ServerPath.SYSTEM}/dept/roleDeptTreeselect/${roleId}`, Method.GET, undefined, ContentType.form)
}

// 查询部门下拉树结构

export const treeselect = () => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/dept/treeselect`, Method.GET, undefined, ContentType.form)
}
