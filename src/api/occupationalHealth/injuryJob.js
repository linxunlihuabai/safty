import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 新增工伤 -> 添加
export function newInjuryAdd(data) {
  return postRequest('/occupationalHealth/newInjury/add', data)
}

// 新增工伤 -> 删除
export function newInjuryDelete(id) {
  return deleteRequest(`/occupationalHealth/newInjury/delete/${id}`)
}

// 新增工伤 -> 修改
export function newInjuryUpdate(data) {
  return putRequest(`/occupationalHealth/newInjury/update/${data.id}`, data)
}

// 新增工伤 -> 查看
export function newInjuryList(data) {
  return postRequest('/occupationalHealth/newInjury/list', data)
}

// 新增工伤 -> 历史修改记录
export function historyNewInjury(id) {
  return postRequest(`/occupationalHealth/newInjury/historys/${id}`)
}

// 年度工伤统计 -> 添加
export function injurySummaryAdd(data) {
  return postRequest('/occupationalHealth/injurySummary/add', data)
}

// 年度工伤统计 -> 删除
export function injurySummaryDelete(id) {
  return deleteRequest(`/occupationalHealth/injurySummary/delete/${id}`)
}

// 年度工伤统计 -> 修改
export function injurySummaryUpdate(data) {
  return putRequest(`/occupationalHealth/injurySummary/update/${data.id}`, data)
}

// 年度工伤统计 -> 查看
export function injurySummaryList(data) {
  return postRequest('/occupationalHealth/injurySummary/list', data)
}

// 年度工伤统计 -> 历史修改记录
export function historyInjurySummary(id) {
  return postRequest(`/occupationalHealth/injurySummary/historys/${id}`)
}
