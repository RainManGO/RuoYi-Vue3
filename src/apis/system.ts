/*
 * @Description:表格数据接口
 * @Autor: scy😊
 * @Date: 2021-01-12 11:31:47
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-04 20:33:51
 */
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import { ListTypeFace } from '../model/imgModel'

export const listData = (params: any) => {
  return https().request<RootObject<any>>('system/dict/data/list', Method.GET, params, ContentType.json)
}

export const getData = (dictCode: any) => {
  return https().request<RootObject<any>>('system/dict/data/', Method.GET, dictCode, ContentType.json)
}

export const addData = (data: any) => {
  return https().request<RootObject<any>>('system/dict/data', Method.POST, data, ContentType.json)
}

export const updateData = (data: any) => {
  return https().request<RootObject<any>>('system/dict/data', Method.PUT, data, ContentType.json)
}

export const delData = (dictCode: any) => {
  return https().request<RootObject<any>>(`system/dict/data/${dictCode}`, Method.DELETE, undefined, ContentType.json)
}
export const exportData = (params: any) => {
  return https().request<RootObject<any>>('system/dict/data/export', Method.GET, params, ContentType.json)
}

export const listType = (params: any) => {
  return https().request<ListTypeFace<any>>('system/dict/type/list', Method.GET, params, ContentType.form)
}

export const getTypeApi = (dictId: any) => {
  return https().request<RootObject<any>>(`system/dict/type/${dictId}`, Method.GET, undefined, ContentType.json)
}

export const getDicts = (dictType: any) => {
  return https().request<RootObject<any>>(`system/dict/data/type/${dictType}`, Method.GET, undefined, ContentType.json)
}

export const getType = (dictId: any) => {
  return https().request<RootObject<any>>(`system/dict/type/${dictId}`, Method.GET, undefined, ContentType.json)
}

// 删除字典类型
export const delType = (dictId: any) => {
  return https().request<RootObject<any>>(`system/dict/type/${dictId}`, Method.DELETE, undefined, ContentType.json)
}

// 新增字典类型
export const addType = (data: any) => {
  return https().request<RootObject<any>>('system/dict/type/', Method.POST, data, ContentType.json)
}

// 修改字典类型
export const updateType = (data: any) => {
  return https().request<RootObject<any>>('system/dict/type/', Method.PUT, data, ContentType.json)
}

// 导出字典类型
export const exportType = (data: any) => {
  return https().request<RootObject<any>>('system/dict/type/export', Method.GET, data, ContentType.form)
}

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
