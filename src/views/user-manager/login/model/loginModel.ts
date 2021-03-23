/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 09:12:24
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-15 09:45:04
 */
// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "accessToken": "admin-token"
//     }
// }

export interface LoginModel {
  data: Data
  code: number | string
  msg: string
}

export interface Data {
	access_token: string
	expires_in: number
}
