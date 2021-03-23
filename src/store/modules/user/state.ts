/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-28 11:26:33
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-23 10:22:40
 */
import { getToken, getSession } from '@/utils/cookies'

export interface UserState{
    token: string
    session: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
    permissions: string[]
}

export const state: UserState = {
  token: getToken() || '',
  session: getSession() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  permissions: []
}
