import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 日常文化建设 -> 添加
export function dailyCultureAdd(data) {
  return postRequest('/safetyCulture/dailyCulture/add', data)
}

// 日常文化建设 -> 删除
export function dailyCultureDelete(id) {
  return deleteRequest(`/safetyCulture/dailyCulture/delete/${id}`)
}

// 日常文化建设 -> 修改
export function dailyCultureUpdate(data) {
  return putRequest(`/safetyCulture/dailyCulture/update/${data.id}`, data)
}

// 日常文化建设 -> 查看
export function dailyCultureList(data) {
  return postRequest('/safetyCulture/dailyCulture/list', data)
}

// 日常文化建设 -> 历史修改记录
export function historyDailyCulture(id) {
  return postRequest(`/safetyCulture/dailyCulture/historys/${id}`)
}
