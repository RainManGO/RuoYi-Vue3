/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 15:57:00
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-22 17:22:49
 */
export interface UserInfoModel <T> {
  code: number
  permissions: string[]
  roles: string[]
  user: T
}

export interface UserDesc {
  admin: boolean
  avatar: string
  createBy: string
  dept: any
  deptId: number
  email: string
  nickName: string
  phonenumber: string
  postIds: any
  remark: string
  userName: string
}

export interface Users{
  items: any
}
