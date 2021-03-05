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
        component: () => import(/* webpackChunkName: "job" */ '@/views/monitor/job/Index.vue'),
        name: 'Job',
        meta: {
          title: 'job',
          icon: 'job',
          noCache: true
        }
      },
      {
        path: 'job/log',
        component: () => import(/* webpackChunkName: "job" */ '@/views/monitor/job/log.vue'),
        name: 'jobLog',
        meta: {
          title: 'jobLog',
          icon: 'jobLog',
          noCache: true
        }
      },
      {
        path: 'cache',
        component: () => import(/* webpackChunkName: "cache" */ '@/views/monitor/cache/Index.vue'),
        name: 'cache',
        meta: {
          title: 'cache',
          icon: 'cache',
          noCache: true
        }
      },
      {
        path: 'server',
        component: () => import(/* webpackChunkName: "server" */ '@/views/monitor/server/Index.vue'),
        name: 'server',
        meta: {
          title: 'server',
          icon: 'server',
          noCache: true
        }
      },
      {
        path: 'druid',
        component: () => import(/* webpackChunkName:"druid" */ '@/views/monitor/druid/Index.vue'),
        name: 'druid',
        meta: {
          title: 'druid',
          icon: 'druid',
          noCache: true
        }
      }
    ]
  }
]

export default MonitorRouter
