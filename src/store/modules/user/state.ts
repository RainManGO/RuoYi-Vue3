/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-28 11:26:33
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-23 14:36:40
 */
import { getToken } from '@/utils/cookies'

export interface UserState{
    token: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
    permissions: string[]
}

export const state: UserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  permissions: []
}
