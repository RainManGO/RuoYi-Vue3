import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { } from '@/model/rootPageModel'
import { ServerPath } from '@/constant/network'

// 查询定时任务调度列表
export const listJobLog = (query: RequestParams) => {
  return https.request<any>(`${ServerPath.MONITOR}/jobLog/list`, Method.GET, query, ContentType.form)
}

// 删除调度日志
export const delJobLog = (jobLogId: any) => {
  return https.request<any>(`${ServerPath.MONITOR}/jobLog/${jobLogId}`, Method.DELETE, undefined, ContentType.form)
}

// 清空调度日志
export const cleanJobLog = () => {
  return https.request<any>(`${ServerPath.MONITOR}/jobLog/clean`, Method.DELETE, undefined, ContentType.form)
}

// 导出调度日志

export const exportJobLog = (query: RequestParams) => {
  return https.request<any>(`${ServerPath.MONITOR}/jobLog/export`, Method.GET, query, ContentType.form)
}
