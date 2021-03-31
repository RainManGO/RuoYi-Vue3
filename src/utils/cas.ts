/*
 * @Description:
 * @Autor: WJM
 * @Date: 2021-03-23 14:47:09
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-25 14:08:38
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { useStore } from '../store'
import { UserActionTypes } from '../store/modules/user/action-types'

// 查询是否登录
export const getCheckLogin = () => {
  return https.request<any>('boss.system/user/checkLogin', Method.GET, undefined, ContentType.form)
}

// 退出登录
export const checkLoginOut = () => {
  return https.request<any>('boss.system/user/logout', Method.GET, undefined, ContentType.form)
}

export const casCheckLogin = () => {
  const store = useStore()
  getCheckLogin().then((res) => {
    const htmlReg = /<[^>]+>/g
    if (htmlReg.test(String(res))) {
      const oppcUrl = process.env.VUE_APP_BASE_API + '/boss.system/cas/doLogin?targetUrl=' + window.document.location.href
      window.location.href = oppcUrl
    } else {
      store.dispatch(UserActionTypes.ACTION_SET_CAS_LOGIN, true)
    }
  })
}
