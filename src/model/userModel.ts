/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 15:57:00
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 16:09:35
 */

// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "id": 0,
//         "username": "admin",
//         "password": "any",
//         "name": "Super Admin",
//         "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
//         "introduction": "I am a super administrator",
//         "email": "admin@test.com",
//         "phone": "1234567890",
//         "roles": [
//             "admin"
//         ]
//     }
// }

export interface UserInfoModel <T> {
  code: number
  permissions: string[]
  roles: string[]
  user: T
}

export interface UserDesc {
  admin: boolean
  avatar: string
  createBy: string
  dept: any
  deptId: number
  email: string
  nickName: string
  phonenumber: string
  postIds: any
  remark: string
  userName: string
}

export interface Users{
  items: any
}
