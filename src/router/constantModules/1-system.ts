/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-03 16:45:46
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-23 18:23:44
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
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dict/index.vue'),
        name: 'management',
        meta: {
          title: 'management',
          icon: 'management',
          noCache: true
        }
      },
      {
        path: 'menu',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/menu/Index.vue'),
        name: 'Menu',
        meta: {
          title: 'menu',
          icon: 'menu',
          noCache: true
        }
      },
      {
        path: 'department',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dept/department.vue'),
        name: 'department',
        meta: {
          title: 'department',
          icon: 'department',
          noCache: true
        }
      },
      {
        path: 'config',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/config/Index.vue'),
        name: 'config',
        meta: {
          title: 'config',
          icon: 'config',
          noCache: true
        }
      },
      {
        path: 'post',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/post/Index.vue'),
        name: 'post',
        meta: {
          title: 'post',
          icon: 'post',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/role/Index.vue'),
        name: 'role',
        meta: {
          title: 'role',
          icon: 'role',
          noCache: true
        }
      }
    ]
  }
]

export default SystemRouter
