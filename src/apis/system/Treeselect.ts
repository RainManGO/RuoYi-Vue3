
import { RootObject } from '@/model/rootObject'
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { ServerPath } from '@/constant/network'

interface Treeselect{
  code: number
  msg: string
  menus: []
}
export const roleMenuTreeselect = (roleId?: number | string) => {
  return https.request<Treeselect>(`${ServerPath.SYSTEM}/menu/roleMenuTreeselect/${roleId}`, Method.GET, undefined, ContentType.form)
}

export const treeselect = () => {
  return https.request<RootObject<any>>(`${ServerPath.SYSTEM}/menu/treeselect`, Method.GET, undefined, ContentType.form)
}
