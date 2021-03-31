/*
 * @Description: 路由相关
 * @Author: ZY
 * @Date: 2021-02-02 11:54:00
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-23 15:11:55
 */

import https from '@/utils/https'
// import { ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { RemoteRoute } from '@/model/remoteRouteModel'
import { ServerPath } from '@/constant/network'

export const getRoutesList = () => {
  return https.request<RootObject<RemoteRoute[]>>(`${ServerPath.SYSTEM}/menu/getRouters`)
}
