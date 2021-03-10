/*
 * @Description: 系统监控
 * @Author: scy
 * @Date: 2021-02-22 13:57:55
 * @LastEditors: scy
 * @LastEditTime: 2021-02-22 15:17:21
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const ToolRouter: Array<RouteRecordRaw> = [
  {
    path: '/tool',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Tool',
    meta: {
      title: 'tool',
      icon: '#iconzhifeiji'
    },
    children: [
      {
        path: 'swagger',
        component: () => import(/* webpackChunkName: "server" */ '@/views/tool/swagger/Index.vue'),
        name: 'swagger',
        meta: {
          title: 'swagger',
          icon: 'swagger',
          noCache: true
        }
      },
      {
        path: 'gen',
        component: () => import(/* webpackChunkName: "gen" */ '@/views/tool/gen/Index.vue'),
        name: 'gen',
        meta: {
          title: 'gen',
          icon: 'gen',
          noCache: true
        }
      }
    ]
  }
]

export default ToolRouter
