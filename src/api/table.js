import {request postRequest, deleteRequest, putRequest, getRequest } from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 附件 -> 查看
export function fileManageList(data) {
  return postRequest('/file/fileManage/list', data)
}
