import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { ServerData } from '@/model/monitor/server'
import { RootObject } from '@/model/rootObject'
import { ServerPath } from '@/constant/network'

// 查询服务器详细
export const getServer = (query?: RequestParams) => {
  return https.request<RootObject<ServerData>>(`${ServerPath.MONITOR}/server`, Method.GET, query, ContentType.form)
}
