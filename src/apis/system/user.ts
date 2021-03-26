/*
 * @Description: 用户相关接口
 * @Author: ZY
 * @Date: 2020-12-28 14:40:50
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-25 16:42:54
 */
import { RootObject } from '@/model/rootObject'
import { UserInfoModel, Users, UserDesc } from '@/model/userModel'
import https from '@/utils/https'
import { LoginModel } from '@/views/user-manager/login/model/loginModel'
import { RequestParams, ContentType, Method } from 'axios-mapper'
import { SmsModel } from '@/model/imgModel'
import { praseStrEmpty } from '@/utils/ruoyi'
export const loginRequest = (userInfo: RequestParams) => {
  return https().request<LoginModel>('auth/login', Method.POST, userInfo, ContentType.json)
}
export const userInfoRequest = () => {
  return https().request<UserInfoModel<UserDesc>>('boss.system/user/getInfo', Method.GET, undefined, ContentType.form)
}

export const getUsers = (user: any) => {
  return https().request<RootObject<Users>>('user/getUsers', Method.GET, user, ContentType.form)
}

// 获取验证码
export const getCodeImg = () => {
  return https().request<SmsModel>('captchaImage', Method.GET, undefined, ContentType.form)
}

// 查询用户列表
export const listUser = (params: any) => {
  return https().request<any>('system/user/list', Method.GET, params, ContentType.form)
}

// 查询用户详细

export const getUser = (userId?: any) => {
  return https().request<any>(`system/user/${praseStrEmpty(userId)}`, Method.GET, undefined, ContentType.form)
}

// 新增用户

export const addUser = (params: any) => {
  return https().request<any>('system/user', Method.POST, params, ContentType.json)
}

// 修改用户

export const updateUser = (params: any) => {
  return https().request<any>('system/user', Method.PUT, params, ContentType.json)
}

// 删除用户

export const delUser = (userId: string|number) => {
  return https().request<any>(`system/user/${userId}`, Method.DELETE, undefined, ContentType.json)
}

// 导出用户

export const exportUser = (params: any) => {
  return https().request<any>('system/user/export', Method.GET, params, ContentType.form)
}

// 用户密码重置
export const resetUserPwd = (userId: string, password: string) => {
  const data = {
    userId,
    password
  }
  return https().request<any>('system/user/resetPwd', Method.DELETE, data, ContentType.json)
}

// 用户状态修改

export const changeUserStatus = (userId: string, status: string | number) => {
  const data = {
    userId,
    status
  }
  return https().request<any>('system/user/changeStatus', Method.PUT, data, ContentType.json)
}

// 查询是否登录

export const getCheckLogin = () => {
  return https().request<any>('boss.system/user/checkLogin', Method.GET, undefined, ContentType.form)
}

// 退出登录

export const checkLoginOut = () => {
  return https().request<any>('boss.system/user/logout', Method.GET, undefined, ContentType.form)
}

// 查询用户个人信息

export const getUserProfile = () => {
  return https().request<any>('boss.system/user/profile', Method.GET, undefined, ContentType.form)
}

// 修改用户个人信息

export const updateUserProfile = (params: any) => {
  return https().request<any>('system/user/profile', Method.PUT, params, ContentType.form)
}

// 用户密码重置

export const updateUserPwd = (oldPassword: string|number|undefined, newPassword: string|number|undefined) => {
  const data = {
    oldPassword,
    newPassword
  }
  return https().request<any>('system/user/profile/updatePwd', Method.PUT, data, ContentType.json)
}

// 用户头像上传

export const uploadAvatar = (params: any) => {
  return https().request<any>('system/user/profile/avatar', Method.POST, params, ContentType.json)
}

// 下载用户导入模板

export const importTemplate = () => {
  return https().request<any>('system/user/importTemplate', Method.GET, undefined, ContentType.json)
}
