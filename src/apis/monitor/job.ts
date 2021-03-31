/*
 * @Description: 定时任务的接口
 * @Author: ZY
 * @Date: 2021-02-22 20:02:15
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-12 14:29:26
 */

import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { JobModel } from '@/model/monitor/jobModel'
import { RootPageObject } from '@/model/rootPageModel'
import { ServerPath } from '@/constant/network'

// 查询定时任务调度列表
export const listJob = (query: RequestParams) => {
  return https.request<RootPageObject<JobModel>>(`${ServerPath.JOB}/job/list`, Method.GET, query, ContentType.form)
}

// 查询定时任务调度详细
export const getJob = (jobId: string) => {
  return https.request<any>(`${ServerPath.JOB}/job/${jobId}`, Method.GET)
}

// 新增定时任务调度
export const addJob = (data: RequestParams) => {
  return https.request<RootPageObject<any>>(`${ServerPath.JOB}/job`, Method.POST, data, ContentType.json)
}

// 修改定时任务调度
export const updateJob = (data: RequestParams) => {
  return https.request<RootPageObject<any>>(`${ServerPath.JOB}/job`, Method.PUT, data, ContentType.json)
}

// 删除定时任务调度
export const delJob = (jobId: string) => {
  return https.request<RootPageObject<any>>(`${ServerPath.JOB}/job/${jobId}`, Method.DELETE)
}

// 导出定时任务调度
export const exportJob = (query?: RequestParams) => {
  return https.request<RootPageObject<JobModel>>(`${ServerPath.JOB}/job/export`, Method.POST, query, ContentType.json)
}

// 任务状态修改
export const changeJobStatus = (jobId: string, status: string) => {
  const data = {
    jobId,
    status
  }
  return https.request<RootPageObject<JobModel>>(`${ServerPath.JOB}/job/changeStatus`, Method.PUT, data, ContentType.json)
}

// 定时任务立即执行一次
export const runJob = (jobId: string, jobGroup: string) => {
  const data = {
    jobId,
    jobGroup
  }
  return https.request<RootPageObject<JobModel>>(`${ServerPath.JOB}/job/run`, Method.PUT, data, ContentType.json)
}
