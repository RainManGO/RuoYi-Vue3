/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-04 09:08:51
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-23 14:44:09
 */
const baseURL = process.env.VUE_APP_BASE_API

export function download(fileName: any) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 添加日期范围

type Params = {[key: string]: any}

export const addDateRange = (params: Params, dateRange: any, propName?: any) => {
  const search = params
  search.params = {}
  if (dateRange !== null && dateRange !== '') {
    if (typeof (propName) === 'undefined') {
      search.params.beginTime = dateRange[0]
      search.params.endTime = dateRange[1]
    } else {
      search.params['begin' + propName] = dateRange[0]
      search.params['end' + propName] = dateRange[1]
    }
  }
  console.log(search)
  return search
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export const handleTree = (data?: any, id?: any, parentId?: any, children?: any, rootId?: any) => {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  const parentIds = data.map((item: any) => { return item[parentId] })
  rootId = rootId || Math.min(...parentIds) || 0
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter((father: any) => {
    const branchArr = cloneData.filter((child: any) => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    if (branchArr.length > 0) {
      father.children = branchArr
    }
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}

// 回显数据字典
export const selectDictLabel = (datas: Array<any>, value: string) => {
  const actions: string[] = []
  Object.keys(datas).some((key) => {
    if (datas[key].dictValue === value) {
      actions.push(datas[key].dictLabel)
      return true
    }
  })
  return actions.join('')
}
