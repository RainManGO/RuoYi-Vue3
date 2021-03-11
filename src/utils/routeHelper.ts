/*
 * @Description: 路由助手类
 * @Author: ZY
 * @Date: 2021-02-02 09:21:03
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-03 08:25:40
 */
import layout from '@/layout/Index.vue'
import ParentView from '@/components/ParentView/Index.vue'
// import { RemoteRoute } from '@/model/remoteRouteModel'
const loadView = (view: string) => {
  const viewReg = view.replace('index', 'Index')
  return () => require(`@/views/${viewReg}.vue`)
}
export const asyncJsonRoutes = (routes: any) => {
  const asyncRouters = routes.filter((route: any) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    // 如果有子路由，递归添加
    if (route.children && route.children.length) {
      asyncJsonRoutes(route.children)
    }
    return true
  })
  return asyncRouters
}
