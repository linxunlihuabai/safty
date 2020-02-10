import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取组织列表
export function getOrganizeList() {
  return getRequest('/system/manage/enterprise/list')
}

// 获取角色列表
export function getRolesList() {
  return getRequest('/system/manage/enterprise/roles')
}
// 添加组织
export function addOrganize(type, data) {
  if (type === 'Y') {
    return postRequest('/system/manage/enterprise/add/y', data)
  } else {
    return postRequest('/system/manage/enterprise/add', data)
  }
}

// 修改组织
export function updateOrganize(id, type, data) {
  if (type === 'Y') {
    return putRequest(`/system/manage/enterprise/update/y/${id}`, data)
  } else {
    return putRequest(`/system/manage/enterprise/update/${id}`, data)
  }
}

// 删除组织
export function deleteOrganize(id) {
  return deleteRequest(`/system/manage/enterprise/delete/${id}`)
}
