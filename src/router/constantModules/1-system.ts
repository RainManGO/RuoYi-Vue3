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
        path: 'dict/type/data/:id',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dict/data.vue'),
        name: 'Data',
        meta: { title: '字典数据', icon: '', hiddden: true }
      },

      {
        path: 'dict',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dict/Index.vue'),
        name: 'dict',
        meta: {
          title: 'dict', icon: 'dict', noCache: false
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
        name: 'dept',
        path: 'dept',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/dept/Index.vue'),
        meta: { title: 'dept', icon: 'tree', noCache: false }

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
      },
      {
        name: 'notice',
        path: 'notice',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/notice/Index.vue'),
        meta: { title: 'notice', icon: 'message', noCache: true }
      },
      {
        name: 'user',
        path: 'user',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/user/Index.vue'),
        meta: { title: 'user', icon: 'user', noCache: true }
      }
    ]
  }
]

export default SystemRouter
