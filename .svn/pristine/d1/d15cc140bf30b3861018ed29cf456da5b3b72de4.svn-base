import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 特种作业人员复训登记 -> 添加
export function retrainingAdd(data) {
  return postRequest('/safetyCulture/retraining/add', data)
}

// 特种作业人员复训登记 -> 删除
export function retrainingDelete(id) {
  return deleteRequest(`/safetyCulture/retraining/delete/${id}`)
}

// 特种作业人员复训登记 -> 修改
export function retrainingUpdate(data) {
  return putRequest(`/safetyCulture/retraining/update/${data.id}`, data)
}

// 特种作业人员复训登记 -> 查看
export function retrainingList(data) {
  return postRequest('/safetyCulture/retraining/list', data)
}

// 特种作业人员复训登记 -> 历史修改记录
export function historyRetraining(id) {
  return postRequest(`/safetyCulture/retraining/historys/${id}`)
}
