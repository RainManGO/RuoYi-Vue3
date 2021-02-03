/*
 * @Description: 用户相关接口
 * @Author: ZY
 * @Date: 2020-12-28 14:40:50
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 16:08:38
 */
import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users, UserDesc } from '@/model/userModel'
import https from '@/utils/https'
import { LoginModel } from '@/views/user-manager/login/model/loginModel'
import { RequestParams, ContentType, Method } from 'axios-mapper'
import { SmsModel } from '../model/imgModel'

export const loginRequest = (userInfo: RequestParams) => {
  return https(false).request<LoginModel>('/login', Method.POST, userInfo, ContentType.json)
}
export const userInfoRequest = () => {
  return https().request<UserInfoModel<UserDesc>>('/getInfo', Method.GET, undefined, ContentType.form)
}

export const getUsers = (user: any) => {
  return https().request<RootObject<Users>>('user/getUsers', Method.GET, user, ContentType.form)
}

// 获取验证码
export const getCodeImg = () => {
  return https().request<SmsModel>('/captchaImage', Method.GET, undefined, ContentType.form)
}
