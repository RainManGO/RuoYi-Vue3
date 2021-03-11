/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-25 15:03:52
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-23 20:42:38
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
// import { asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { getRoutesList } from '@/apis/system/menu'
import { asyncJsonRoutes } from '@/utils/routeHelper'
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface Actions {
    [PermissionActionType.ACTION_SET_ROUTES](
      { commit }: AugmentedActionContext): Promise<RouteRecordRaw[]>
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  async [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext) {
    return new Promise((resolve, reject) => {
      getRoutesList().then(response => {
        const menus = response?.data.slice(0, 2)
        if (menus) {
          const remoteRoutes = asyncJsonRoutes(menus)
          commit(PermissionMutationType.SET_ROUTES, remoteRoutes)
          resolve(remoteRoutes as unknown as RouteRecordRaw[])
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
