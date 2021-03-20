/*
 * @Description: 路由相关
 * @Author: ZY
 * @Date: 2021-02-02 11:54:00
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-12 13:44:18
 */

import https from '@/utils/https'
// import { ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { RemoteRoute } from '@/model/remoteRouteModel'

export const getRoutesList = () => {
  return https().request<RootObject<RemoteRoute[]>>('system/menu/getRouters')
}
