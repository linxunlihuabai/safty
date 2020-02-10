import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [隐患情况] 列表
export function getHiddenDangerList(data) {
  return postRequest('/safetyCheck/hiddenDanger/list', data)
}

// 添加 [隐患情况] 信息
export function addHiddenDanger(data) {
  return postRequest('/safetyCheck/hiddenDanger/add', data)
}

// 通过 id 删除 [隐患情况] 信息
export function deleteHiddenDanger(id) {
  return deleteRequest(`/safetyCheck/hiddenDanger/delete/${id}`)
}

// 通过 id 查询 [隐患情况] 的修改历史记录
export function historyHiddenDanger(id) {
  return postRequest(`/safetyCheck/hiddenDanger/historys/${id}`)
}

// 获取检查编号列表
export function getSafetyChecksList() {
  return getRequest('/safetyCheck/hiddenDanger/getSafetyChecks')
}
