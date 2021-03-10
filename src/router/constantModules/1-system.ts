/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-03 16:45:46
 * @LastEditors: WJM
 * @LastEditTime: 2021-02-26 15:27:09
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
import View from '@/components/view/Index.vue'
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
        meta: { title: '字典数据', icon: '', hidden: true }
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
      },
      {
        name: 'log',
        path: '/system/log',
        redirect: 'noRedirect',
        component: View,
        meta: {
          title: 'log',
          icon: '#icontable'
        },
        children: [
          {
            path: 'operlog',
            component: () => import(/* webpackChunkName: "system" */ '@/views/system/log/operlog.vue'),
            name: 'operlog',
            meta: {
              title: 'operlog'
            }
          },
          {
            name: 'logininfor',
            path: 'logininfor',
            component: () => import(/* webpackChunkName: "system" */ '@/views/system/log/logininfor.vue'),
            meta: {
              title: 'logininfor'
            }
          }
        ]
      }

    ]
  }
]

export default SystemRouter
