/*
 * @Description: 定时任务模型
 * @Author: ZY
 * @Date: 2021-02-22 20:12:58
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-22 20:16:45
 */

export interface JobModel {
  searchValue?: any
  createBy: string
  createTime: string
  updateBy?: any
  updateTime?: any
  remark: string
  params: object
  jobId: number
  jobName: string
  jobGroup: string
  invokeTarget: string
  cronExpression: string
  misfirePolicy: string
  concurrent: string
  status: string
  nextValidTime: string
}
