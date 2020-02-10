import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [教育培训] 列表
export function getTrainsList(data) {
  return postRequest('/safetyCulture/trains/list', data)
}

// 添加 [教育培训] 信息
export function addTrains(data) {
  return postRequest('/safetyCulture/trains/add', data)
}

// 修改 [教育培训] 信息
export function updateTrains(id, data) {
  return putRequest(`/safetyCulture/trains/update/${id}`, data)
}

// 通过 id 删除 [教育培训] 信息
export function deleteTrains(id) {
  return deleteRequest(`/safetyCulture/trains/delete/${id}`)
}

// 通过 id 查询 [教育培训] 的修改历史记录
export function historyTrains(id) {
  return postRequest(`/safetyCulture/trains/historys/${id}`)
}
