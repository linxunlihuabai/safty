import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 体检情况 -> 添加
export function healthExaminationAdd(data) {
  return postRequest('/occupationalHealth/healthExamination/add', data)
}

// 体检情况 -> 删除
export function healthExaminationDelete(id) {
  return deleteRequest(`/occupationalHealth/healthExamination/delete/${id}`)
}

// 体检情况 -> 修改
export function healthExaminationUpdate(data) {
  return putRequest(`/occupationalHealth/healthExamination/update/${data.id}`, data)
}

// 体检情况 -> 查看
export function healthExaminationList(data) {
  return postRequest('/occupationalHealth/healthExamination/list', data)
}

// 体检情况 -> 历史修改记录
export function historyHealthExamination(id) {
  return postRequest(`/occupationalHealth/healthExamination/historys/${id}`)
}
