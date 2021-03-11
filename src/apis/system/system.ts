/*
 * @Description:表格数据接口
 * @Autor: scy😊
 * @Date: 2021-01-12 11:31:47
 * @LastEditors: WJM
 * @LastEditTime: 2021-02-26 16:00:25
 */
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method, RequestParams } from 'axios-mapper'
import { ListTypeFace, ConfigModel } from '@/model/imgModel'
import { MenuModel } from '@/model/system/menuModel'
//= ===========================字典管理==============================
export const listData = (params: any) => {
  return https().request<RootObject<any>>('system/dict/data/list', Method.GET, params, ContentType.form)
}

export const getData = (dictCode: any) => {
  return https().request<RootObject<any>>(`system/dict/data/${dictCode}`, Method.GET, undefined, ContentType.form)
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

export const listType = (params?: any) => {
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

//= ==============日志管理==================//
// 查询操作日志列表
export const listOperlog = (params: any) => {
  console.log(params)
  return https().request<any>('monitor/operlog/list', Method.GET, params, ContentType.form)
}
// 查询登录日志列表
export const listLogin = (params: any) => {
  console.log(params)
  return https().request<any>('monitor/logininfor/list', Method.GET, params, ContentType.form)
}

// 删除登录日志
export const delLogin = (infoId: any) => {
  return https().request<RootObject<any>>(`monitor/logininfor/${infoId}/`, Method.DELETE, undefined, ContentType.form)
}
// 清空登录日志
export const cleanLogin = (params: any) => {
  console.log(params)
  return https().request<any>('monitor/logininfor/clean', Method.DELETE, undefined, ContentType.form)
}
// 导出登录日志

export const exportLogin = (data: any) => {
  return https().request<RootObject<any>>('monitor/logininfor/export/', Method.GET, data, ContentType.form)
}

// 清空操作日志
export const cleanOperlog = (params: any) => {
  console.log(params)
  return https().request<any>('monitor/operlog/clean', Method.DELETE, undefined, ContentType.form)
}
// 导出操作日志

export const exportOperlog = (data: any) => {
  return https().request<RootObject<any>>('monitor/operlog/export/', Method.GET, data, ContentType.form)
}

// 删除操作日志
export const delOperlog = (operId: any) => {
  return https().request<RootObject<any>>(`monitor/operlog/${operId}/`, Method.DELETE, undefined, ContentType.form)
}

//= ==============参数管理==================//
// 查询参数列表

export const listConfig = (params: any) => {
  console.log(params)
  return https().request<ConfigModel>('system/config/list/', Method.GET, params, ContentType.form)
}

// 查询参数详细

export const getConfig = (params: any) => {
  return https().request<RootObject<any>>(`system/config/${params}`, Method.GET, params, ContentType.form)
}

// 根据参数键名查询参数值

export const getConfigKey = (params: any) => {
  return https().request<RootObject<any>>(`system/config/configKey/${params}`, Method.GET, params, ContentType.form)
}

// 新增参数配置
export const addConfig = (data: any) => {
  return https().request<RootObject<any>>('system/config/', Method.POST, data, ContentType.form)
}

// 修改参数配置

export const updateConfig = (data: any) => {
  return https().request<RootObject<any>>('system/config/', Method.PUT, data, ContentType.form)
}

// 删除参数配置
export const delConfig = (configId: any) => {
  return https().request<RootObject<any>>(`system/config/${configId}/`, Method.DELETE, undefined, ContentType.form)
}

// 清理参数缓存

export const clearCache = () => {
  return https().request<RootObject<any>>('system/config/clearCache/', Method.DELETE, undefined, ContentType.form)
}

// 导出参数

export const exportConfig = (data: any) => {
  return https().request<RootObject<any>>('system/config/export/', Method.GET, data, ContentType.form)
}

//= =============岗位管理============//

// 查询岗位列表

export const listPost = (params: any) => {
  return https().request<RootObject<any>>('system/post/list/', Method.GET, params, ContentType.form)
}

// 查询岗位详细
export const getPost = (postId: any) => {
  return https().request<RootObject<any>>(`system/post/${postId}`, Method.GET, undefined, ContentType.form)
}

// 新增岗位

export const addPost = (data: any) => {
  return https().request<RootObject<any>>('system/post/', Method.POST, data, ContentType.form)
}

// 修改岗位

export const updatePost = (data: any) => {
  return https().request<RootObject<any>>('system/post/', Method.PUT, data, ContentType.form)
}

// 删除岗位
export const delPost = (postId: any) => {
  return https().request<RootObject<any>>(`system/post/${postId}`, Method.DELETE, undefined, ContentType.form)
}

// 导出岗位

export const exportPost = (params: any) => {
  return https().request<RootObject<any>>('system/post/export', Method.GET, params, ContentType.form)
}

//= =============菜单管理============//

// 查询菜单列表
export const listMenu = (query: RequestParams) => {
  return https().request<RootObject<MenuModel[]>>('system/menu/list', Method.GET, query, ContentType.form)
}

// 查询菜单详细
export const getMenu = (menuId: string) => {
  return https().request<RootObject<MenuModel>>(`system/menu/${menuId}`, Method.GET)
}

// 查询菜单下拉树结构
export const treeselect = () => {
  return https().request<RootObject<MenuModel[]>>('system/menu/treeselect', Method.GET)
}

// 根据角色ID查询菜单下拉树结构
export const roleMenuTreeselect = (roleId: string) => {
  return https().request<RootObject<MenuModel[]>>(`system/menu/treeselect/${roleId}`, Method.GET)
}

// 新增菜单
export const addMenu = (data: MenuModel) => {
  return https().request<RootObject<any>>('system/menu', Method.POST, data)
}

// 修改菜单
export const updateMenu = (data: MenuModel) => {
  return https().request<RootObject<any>>('system/menu', Method.PUT, data)
}

// 删除菜单
export const delMenu = (menuId: string) => {
  return https().request<RootObject<any>>(`system/menu/${menuId}`, Method.DELETE)
}
