import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { } from '@/model/rootPageModel'

// 查询定时任务调度列表
export const listJobLog = (query: RequestParams) => {
  return https().request<any>('monitor/jobLog/list', Method.GET, query, ContentType.form)
}

// 删除调度日志
export const delJobLog = (jobLogId: any) => {
  return https().request<any>(`/monitor/jobLog/${jobLogId}`, Method.DELETE, undefined, ContentType.form)
}

// 清空调度日志
export const cleanJobLog = () => {
  return https().request<any>('monitor/jobLog/clean', Method.DELETE, undefined, ContentType.form)
}

// 导出调度日志

export const exportJobLog = (query: RequestParams) => {
  return https().request<any>('monitor/jobLog/export', Method.GET, query, ContentType.form)
}
