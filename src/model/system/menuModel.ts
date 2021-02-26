/*
 * @Description: 菜单模型
 * @Author: ZY
 * @Date: 2021-02-23 15:54:08
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-25 11:50:31
 */

export interface MenuModel {
  searchValue?: any
  createBy?: any
  createTime: string
  updateBy?: any
  updateTime?: any
  remark?: any
  params: {}
  menuId: number
  menuName: string
  parentName?: any
  parentId: number
  orderNum: string
  path: string
  component?: any
  isFrame: string
  isCache: string
  menuType: string
  visible: string
  status: string
  perms: string
  icon: string
  children: any[]
}
