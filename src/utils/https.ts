/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: WJM
 * @LastEditTime: 2021-04-01 08:53:05
 */

import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
// import axios from 'axios'

const config: HttpClientConfig = {
  baseURL: networkConfig.host,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
}

const https = new HttpClient(config)

https.httpClient.interceptors.response.use(
  response => {
    console.log('response', response)
    return response
  },
  err => {
    console.log('response', err.response)
    if (err.response.status === 401) {
      const oppcUrl = err.response.data.data + '?targetUrl=' + window.document.location.href
      window.location.href = oppcUrl
    }
    return Promise.reject(err)
  }
)

export default https
