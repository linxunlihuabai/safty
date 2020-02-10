import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [日常安全检查] 列表
export function getSafetyCheckList(data) {
  return postRequest('/safetyCheck/safetyCheck/list', data)
}

// 添加 [日常安全检查] 信息
export function addSafetyCheck(data) {
  return postRequest('/safetyCheck/safetyCheck/add', data)
}

// 修改 [日常安全检查] 信息
export function updateSafetyCheck(id, data) {
  return putRequest(`/safetyCheck/safetyCheck/update/${id}`, data)
}

// 通过 id 删除 [日常安全检查] 信息
export function deleteSafetyCheck(id) {
  return deleteRequest(`/safetyCheck/safetyCheck/delete/${id}`)
}

// 通过 id 查询 [日常安全检查] 的修改历史记录
export function historySafetyCheck(id) {
  return postRequest(`/safetyCheck/safetyCheck/historys/${id}`)
}

// 提交 [隐患情况] 状态 至 <整改中>（提交正在整改，即 [整改中] 状态）
export function updateState2(id, data) {
  return putRequest(`/safetyCheck/safetyCheck/updateState2/${id}`, data)
}

// 提交 [隐患情况] 状态 至 <待验收>（提交已整改，即 [待验收] 状态）
export function updateState3(id, data) {
  return putRequest(`/safetyCheck/safetyCheck/updateState3/${id}`, data)
}

// 提交 [隐患情况] 状态 至 <整改完成> （提交已验收，即 [整改完成] 状态）
export function updateState4(id, data) {
  return putRequest(`/safetyCheck/safetyCheck/updateState4/${id}`, data)
}

// 不通过验收，提交 [隐患情况] 状态 至 <待整改>
export function addNoPass(id, data) {
  return putRequest(`/safetyCheck/safetyCheck/add/noPass/${id}`, data)
}
