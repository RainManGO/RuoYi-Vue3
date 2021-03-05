import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { ServerData } from '@/model/monitor/server'
import { RootObject } from '@/model/rootObject'
// 查询服务器详细
export const getServer = (query?: RequestParams) => {
  return https().request<RootObject<ServerData>>('monitor/server', Method.GET, query, ContentType.form)
}
