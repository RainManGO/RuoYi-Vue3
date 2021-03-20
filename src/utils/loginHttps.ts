/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-20 09:39:52
 */
import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import oppcNetworkConfig from '@/config/default/loginNet.config'
const loginHttps = (hasToken = true) => {
  const config: HttpClientConfig = {
    baseURL: oppcNetworkConfig.host,
    headers: {
      Authorization: hasToken ? useStore().state.user.token : ''
    },
    withCredentials: true
  }
  return new HttpClient(config)
}

export default loginHttps
