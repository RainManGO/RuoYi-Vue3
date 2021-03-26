/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-25 17:02:36
 */

import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
// import axios from 'axios'

const https = () => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {},
    withCredentials: true
  }
  return new HttpClient(config)
}

https().httpClient.interceptors.response.use(
  response => {
    console.log(111)
    console.log('response', response)
    const htmlReg = /<[^>]+>/g
    if (htmlReg.test(String(response))) {
      const oppcUrl = process.env.VUE_APP_BASE_API + '/boss.system/cas/doLogin?targetUrl=' + window.document.location.href
      window.location.href = oppcUrl
    }
    return response
  },
  err => {
    console.log(22222222)
    console.log('response', err.response)
    return Promise.reject(err)
  }
)

export default https
