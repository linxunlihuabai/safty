import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取用户列表
export function getUserList(data) {
  return postRequest('/system/manage/user/list', data)
}

// 获取角色列表
export function getRolesList() {
  return getRequest('/system/manage/user/roles')
}

// 添加用户
export function addUser(data) {
  return postRequest('/system/manage/user/add', data)
}

// 修改用户
export function updateUser(id, data) {
  return putRequest(`/system/manage/user/update/${id}`, data)
}

// 修改用户状态——禁用用户
export function updateUserDisable(id) {
  return putRequest(`/system/manage/user/disable/${id}`)
}

// 修改用户状态——启用用户
export function updateUserEnable(id) {
  return putRequest(`/system/manage/user/enable/${id}`)
}
// 重置密码
export function resetUserPassword(id) {
  return putRequest(`/system/manage/user/resetPassword/${id}`)
}

// 删除用户
export function deleteUser(id) {
  return deleteRequest(`/system/manage/user/delete/${id}`)
}
