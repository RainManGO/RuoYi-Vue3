
import { RootObject } from '@/model/rootObject'
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
interface Treeselect{
  code: number
  msg: string
  menus: []
}
export const roleMenuTreeselect = (roleId?: number | string) => {
  return https().request<Treeselect>(`system/menu/roleMenuTreeselect/${roleId}`, Method.GET, undefined, ContentType.form)
}

export const treeselect = () => {
  return https().request<RootObject<any>>('system/menu/treeselect', Method.GET, undefined, ContentType.form)
}
