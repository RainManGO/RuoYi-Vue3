/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-23 15:14:11
 */

import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
const https = () => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {

    },
    withCredentials: true
  }
  return new HttpClient(config)
}

export default https
