import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [安全检查表] 列表
export function getCheckRulesList(data) {
  return postRequest('/lawandrules/checkrules/getbypage', data)
}

// 添加 [安全检查表] 信息
export function addCheckRules(data) {
  return postRequest('/lawandrules/checkrules/add', data)
}

// 修改 [安全检查表] 信息
export function updateCheckRules(id, data) {
  return putRequest(`/lawandrules/checkrules/update/${id}`, data)
}

// 通过 id 删除 [安全检查表] 信息
export function deleteCheckRules(id) {
  return deleteRequest(`/lawandrules/checkrules/delete/${id}`)
}

// 通过 id 查询 [安全检查表] 的修改历史记录
export function historyCheckRules(id) {
  return postRequest(`/lawandrules/checkrules/historys/${id}`)
}
