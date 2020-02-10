import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 安全生产月 -> 添加
export function safetyMonthAdd(data) {
  return postRequest('/safetyCulture/safetyMonth/add', data)
}

// 安全生产月 -> 删除
export function safetyMonthDelete(id) {
  return deleteRequest(`/safetyCulture/safetyMonth/delete/${id}`)
}

// 安全生产月 -> 修改
export function safetyMonthUpdate(data) {
  return putRequest(`/safetyCulture/safetyMonth/update/${data.id}`, data)
}

// 安全生产月 -> 查看
export function safetyMonthList(data) {
  return postRequest('/safetyCulture/safetyMonth/list', data)
}

// 安全生产月 -> 历史修改记录
export function historySafetyMonth(id) {
  return postRequest(`/safetyCulture/safetyMonth/historys/${id}`)
}
