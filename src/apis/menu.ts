/*
 * @Description: 路由相关
 * @Author: ZY
 * @Date: 2021-02-02 11:54:00
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-02 20:43:02
 */

import https from '@/utils/https'
// import { ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { RemoteRoute } from '@/model/remoteRouteModel'

export const getRoutesList = () => {
  return https().request<RootObject<RemoteRoute[]>>('menu/listForRouter')
}
