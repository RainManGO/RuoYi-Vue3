/*
 * @Description: app types
 * @Author: ZY
 * @Date: 2021-02-02 09:51:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-02 20:38:48
 */

import { defineComponent } from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);
