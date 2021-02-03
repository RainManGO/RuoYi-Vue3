/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-02 17:41:39
 */

import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
const https = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      Authorization: hasToken ? useStore().state.user.token : ''
    }
  }
  return new HttpClient(config)
}

export default https
