/*
 * @Description: 系统监控
 * @Author: ZY
 * @Date: 2021-02-22 13:57:55
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-22 15:17:21
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const MonitorRouter: Array<RouteRecordRaw> = [
  {
    path: '/monitor',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Monitor',
    meta: {
      title: 'monitor',
      icon: '#iconexample'
    },
    children: [
      {
        path: 'online',
        component: () => import(/* webpackChunkName: "online" */ '@/views/monitor/online/Index.vue'),
        name: 'Online',
        meta: {
          title: 'online',
          icon: 'online',
          noCache: true
        }
      },
      {
        path: 'job',
        component: () => import(/* webpackChunkName: "system" */ '@/views/monitor/job/Index.vue'),
        name: 'Job',
        meta: {
          title: 'job',
          icon: 'job',
          noCache: true
        }
      }
    ]
  }
]

export default MonitorRouter
