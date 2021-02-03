/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-03 16:45:46
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 16:48:52
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const SystemRouter: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/management',
    name: 'system',
    meta: {
      title: 'system',
      icon: '#icontable'
    },
    children: [
      {
        path: 'management',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dict/management.vue'),
        name: 'management',
        meta: {
          title: 'management',
          icon: 'management',
          noCache: true
        }
      },
      {
        path: 'cfg',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dict/test.vue'),
        name: 'cfg',
        meta: {
          title: 'cfg',
          icon: 'cfg',
          noCache: true
        }
      }
    ]
  }
]

export default SystemRouter
