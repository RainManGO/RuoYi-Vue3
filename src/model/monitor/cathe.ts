/*
 * @Description:
 * @Autor: scy🤗
 * @Date: 2021-03-02 14:49:39
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-03 09:07:55
 */
export interface CommandStat {
  name: string
  value: string
}
export interface CacheData {
  commandStats: CommandStat[]
  info: any
  dbSize: number
}
