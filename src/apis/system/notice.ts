
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
//= ===========================公告通知==============================

// 查询公告列表

export const listNotice = (params: any) => {
  return https().request<any>('system/notice/list', Method.GET, params, ContentType.form)
}

// 查询公告详细

export const getNotice = (noticeId: number) => {
  return https().request<any>(`system/notice/${noticeId}`, Method.GET, undefined, ContentType.form)
}

// 新增公告

export const addNotice = (params: any) => {
  return https().request<any>('system/notice', Method.GET, params, ContentType.json)
}
// 修改公告

export const updateNotice = (params: any) => {
  return https().request<any>('system/notice', Method.PUT, params, ContentType.json)
}

// 删除公告

export const delNotice = (noticeId: number) => {
  return https().request<any>(`system/notice/${noticeId}`, Method.DELETE, undefined, ContentType.json)
}
