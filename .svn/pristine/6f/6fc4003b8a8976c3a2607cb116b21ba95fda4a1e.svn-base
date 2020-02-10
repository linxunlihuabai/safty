import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 保险情况 -> 添加
export function insuranceAdd(data) {
  return postRequest('/occupationalHealth/insurance/add', data)
}

// 保险情况 -> 删除
export function insuranceDelete(id) {
  return deleteRequest(`/occupationalHealth/insurance/delete/${id}`)
}

// 保险情况 -> 修改
export function insuranceUpdate(data) {
  return putRequest(`/occupationalHealth/insurance/update/${data.id}`, data)
}

// 保险情况 -> 查看
export function insuranceList(data) {
  return postRequest('/occupationalHealth/insurance/list', data)
}

// 保险情况 -> 历史修改记录
export function historyInsurance(id) {
  return postRequest(`/occupationalHealth/insurance/historys/${id}`)
}
