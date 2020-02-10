import { postRequest, deleteRequest, putRequest } from '@/utils/request'

/**
reportCategory*	integer($int32)
报表类别：1801整月报，1802上半月报，1803下半月报

type*	integer($int32)
报表类型：1701安全生产综合情况报表，1702隐患情况报表，1703隐患整改情况报表
 **/

// 查询是否上传过该类别报表
export function checkUploaded(data) {
  return postRequest('/report/reportUpload/checkUploaded', data)
}

// 查询本企业是否已上传
// 参数year：年、month：月、type：类型（安全生产综合表、隐患情况表、隐患整改情况表的类别id）、reportCategory：月报类别（月报、上半月报、下半月报的类别id）
export function checkSubmited(data) {
  return postRequest('/report/reportUpload/checkSubmited', data)
}

// 查询未上传报表的企业
// 参数year：年、month：月、type：类型（安全生产综合表、隐患情况表、隐患整改情况表的类别id）、reportCategory：月报类别（月报、上半月报、下半月报的类别id）
export function getNotSubmitEnterprises(data) {
  return postRequest('/report/reportUpload/getNotSubmitEnterprises', data)
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
