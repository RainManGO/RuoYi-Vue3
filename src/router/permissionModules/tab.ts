/*
 * @Description:分栏
 * @Author: scy
 * @Date: 2021-01-08 19:21:46
 * @LastEditors: WJM
 * @LastEditTime: 2021-03-19 09:23:48
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const tabRouter: Array<RouteRecordRaw> = [
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/Index.vue'),
        name: 'Tab',
        meta: {
          title: 'tab',
          icon: '#icontab'
        }
      }
    ]
  }
]

export default tabRouter
