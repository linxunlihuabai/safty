import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取菜单列表
export function getMenuList() {
  return getRequest('/system/manage/menu/list')
}

// 添加菜单
export function addMenu(data) {
  return postRequest('/system/manage/menu/add', data)
}

// 修改菜单
export function updateMenu(id, data) {
  return putRequest(`/system/manage/menu/update/${id}`, data)
}

// 删除菜单
export function deleteMenu(id) {
  return deleteRequest(`/system/manage/menu/delete/${id}`)
}
