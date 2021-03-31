
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'

import { ServerPath } from '@/constant/network'

//= ===========================公告通知==============================

// 查询公告列表

export const listNotice = (params: any) => {
  return https.request<any>(`${ServerPath.SYSTEM}/notice/list`, Method.GET, params, ContentType.form)
}

// 查询公告详细

export const getNotice = (noticeId: number) => {
  return https.request<any>(`${ServerPath.SYSTEM}/notice/${noticeId}`, Method.GET, undefined, ContentType.form)
}

// 新增公告

export const addNotice = (params: any) => {
  return https.request<any>(`${ServerPath.SYSTEM}/notice`, Method.POST, params, ContentType.json)
}
// 修改公告

export const updateNotice = (params: any) => {
  return https.request<any>(`${ServerPath.SYSTEM}/notice`, Method.PUT, params, ContentType.json)
}

// 删除公告

export const delNotice = (noticeId: number) => {
  return https.request<any>(`${ServerPath.SYSTEM}/notice/${noticeId}`, Method.DELETE, undefined, ContentType.json)
}
