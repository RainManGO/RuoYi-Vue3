/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 09:05:40
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-02 16:52:38
 */

export interface RootObject<T>{
  permissions: string[]
  user: any
  roles: string[]
  code: number
  msg: string
  data: T
}
