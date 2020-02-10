import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [月报表] 列表
export function getreportList(data) {
  return postRequest('/report/reportUpload/list', data)
}

// 添加 [报表] 信息
export function addreport(data) {
  return postRequest('/report/reportUpload/add', data)
}

// 修改 [报表] 信息
export function updatereport(id, data) {
  return putRequest(`/report/reportUpload/update/${id}`, data)
}

// 通过 id 删除 [报表] 信息
export function deletereport(id) {
  return deleteRequest(`/report/reportUpload/delete/${id}`)
}

// 通过 id 查询 [报表] 的修改历史记录
export function historyreport(id) {
  return postRequest(`/report/reportUpload/historys/${id}`)
}
