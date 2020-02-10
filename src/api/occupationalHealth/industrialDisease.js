import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 新增职业病 -> 添加
export function newIllnessAdd(data) {
  return postRequest('/occupationalHealth/newIllness/add', data)
}

// 新增职业病 -> 删除
export function newIllnessDelete(id) {
  return deleteRequest(`/occupationalHealth/newIllness/delete/${id}`)
}

// 新增职业病 -> 修改
export function newIllnessUpdate(data) {
  return putRequest(`/occupationalHealth/newIllness/update/${data.id}`, data)
}

// 新增职业病 -> 查看
export function newIllnessList(data) {
  return postRequest('/occupationalHealth/newIllness/list', data)
}

// 新增职业病 -> 历史修改记录
export function historyNewIllness(id) {
  return postRequest(`/occupationalHealth/newIllness/historys/${id}`)
}

// 职业病统计 -> 添加
export function illnessSummaryAdd(data) {
  return postRequest('/occupationalHealth/illnessSummary/add', data)
}

// 职业病统计 -> 删除
export function illnessSummaryDelete(id) {
  return deleteRequest(`/occupationalHealth/illnessSummary/delete/${id}`)
}

// 职业病统计 -> 修改
export function illnessSummaryUpdate(data) {
  return putRequest(`/occupationalHealth/illnessSummary/update/${data.id}`, data)
}

// 职业病统计 -> 查看
export function illnessSummaryList(data) {
  return postRequest('/occupationalHealth/illnessSummary/list', data)
}

// 职业病统计 -> 历史修改记录
export function historyIllnessSummary(id) {
  return postRequest(`/occupationalHealth/illnessSummary/historys/${id}`)
}
