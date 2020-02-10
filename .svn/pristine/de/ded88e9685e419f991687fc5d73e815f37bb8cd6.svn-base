import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取分类列表
export function getClassifyList() {
  return getRequest('/system/manage/category/tree')
}

// 添加分类
export function addClassify(data) {
  return postRequest('/system/manage/category/add', data)
}

// 修改分类
export function updateClassify(id, data) {
  return putRequest(`/system/manage/category/update/${id}`, data)
}

// 删除分类
export function deleteClassify(id) {
  return deleteRequest(`/system/manage/category/delete/${id}`)
}
