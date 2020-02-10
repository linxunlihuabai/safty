import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [规章制度] 列表
export function getRulesList(data) {
  return postRequest('/lawandrules/rules/getrulesbypage', data)
}

// 添加 [规章制度] 信息
export function addRules(data) {
  return postRequest('/lawandrules/rules/add', data)
}

// 修改 [规章制度] 信息
export function updateRules(id, data) {
  return putRequest(`/lawandrules/rules/update/${id}`, data)
}

// 通过 id 删除 [规章制度] 信息
export function deleteRules(id) {
  return deleteRequest(`/lawandrules/rules/delete/${id}`)
}

// 通过 id 查询 [规章制度] 的修改历史记录
export function historyRules(id) {
  return postRequest(`/lawandrules/rules/historys/${id}`)
}
