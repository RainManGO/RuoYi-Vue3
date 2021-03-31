/*
 * @Description: 在线用户接口
 * @Author: ZY
 * @Date: 2021-02-22 15:22:48
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-12 14:13:06
 */

import { RequestParams, Method, ContentType } from 'axios-mapper'
import https from '@/utils/https'
import { OnlineUserModel } from '@/model/monitor/onlineUserModel'
import { RootPageObject } from '@/model/rootPageModel'
import { ServerPath } from '@/constant/network'

// 查询在线用户列表
export const list = (query: RequestParams) => {
  return https.request<RootPageObject<OnlineUserModel>>(`${ServerPath.SYSTEM}/online/list`, Method.GET, query, ContentType.form)
}

// 强退用户
export const forceLogout = (tokenId: string) => {
  return https.request<RootPageObject<OnlineUserModel>>(`${ServerPath.SYSTEM}/online/${tokenId}`, Method.DELETE)
}
