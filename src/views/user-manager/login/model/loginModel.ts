/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 09:12:24
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 15:30:21
 */
// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "accessToken": "admin-token"
//     }
// }

export interface LoginModel {
  token: string
  code: number | string
  msg: string
}
