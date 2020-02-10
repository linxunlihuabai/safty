import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取角色列表
export function getRoleList(data) {
  return postRequest('/system/manage/role/list', data)
}

// 添加角色
export function addRole(data) {
  return postRequest(`/system/manage/role/add`, data)
}

// 修改角色
export function updateRole(id, data) {
  return putRequest(`/system/manage/role/menu/update/${id}`, data)
}

// 删除角色
export function deleteRole(id) {
  return deleteRequest(`/system/manage/role/delete/${id}`)
}
