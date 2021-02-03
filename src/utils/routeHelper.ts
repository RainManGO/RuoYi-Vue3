/*
 * @Description: 路由助手类
 * @Author: ZY
 * @Date: 2021-02-02 09:21:03
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-03 08:25:40
 */
import layout from '@/layout/Index.vue'
// import { RemoteRoute } from '@/model/remoteRouteModel'

export const asyncJsonRoutes = (routes: any[]) => {
  const asyncRouters = routes.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = layout
      } else {
        // const name = route.component
        console.log(import('@/views/charts/BarChartDemo.vue'))
        route.component = import('@/views/charts/BarChartDemo.vue')
        // route.component = () => import(`@/${name}.vue`)
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
