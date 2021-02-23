/*
 * @Description: 操作权限处理
 * @Author: ZY
 * @Date: 2021-02-22 17:11:16
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-22 18:06:47
 */

import { useStore } from '@/store'
import { Directive } from 'vue'

export const hasPermi: Directive = {
  mounted(el, binding) {
    const store = useStore()
    const { value } = binding
    const allPermission = '*:*:*'
    const permissions = store.state.user.permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      const hasPermissions = permissions.some(permission => {
        return allPermission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  }
}
