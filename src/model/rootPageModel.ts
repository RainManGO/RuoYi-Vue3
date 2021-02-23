/*
 * @Description: 分页主model
 * @Author: ZY
 * @Date: 2021-02-22 15:30:27
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-22 15:31:09
 */

export interface RootPageObject<T> {
  total: number
  rows: T[]
  code: number
  msg?: any
}
