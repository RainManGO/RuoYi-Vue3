/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-12 16:39:17
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-02 11:56:54
 */

import { RouteRecordRaw } from 'vue-router'
import { Component } from '@/@types/types'

export interface Meta {
  hidden: boolean
}

export interface Children {
  path: string
  component: string
}

export interface Route {
  path: string
  component: string
  meta: Meta
  children: Children[]
}

export interface Routes {
  routes: Route[]
}
export interface RouteMeta{
    roles: [string]
    title: string
    icon: string
    noCache: boolean
    breadcrumb: boolean
    affix: true
    activeMenu: string
    alwaysShow: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  id: number
  parentId: number
  path: string
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  hidden?: boolean
}

export type AppRouteModule = AppRouteRecordRaw;
