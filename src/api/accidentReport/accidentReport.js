import { postRequest, deleteRequest, putRequest, getRequest } from '@/utils/request'

// 事故报告 -> 添加
export function accidentsAdd(data) {
  return postRequest('/accidentReport/accidents/add', data)
}

// 事故报告 -> 删除
export function accidentsDelete(id) {
  return deleteRequest(`/accidentReport/accidents/delete/${id}`)
}

// 事故报告 -> 修改
export function accidentsUpdate(data) {
  return putRequest(`/accidentReport/accidents/update/${data.id}`, data)
}

// 事故报告 -> 查看
export function accidentsList(data) {
  return postRequest('/accidentReport/accidents/list', data)
}

// 事故报告 -> 历史修改记录
export function historyAccidents(id) {
  return postRequest(`/accidentReport/accidents/historys/${id}`)
}

// 获取项目列表
export function getAccidents() {
  return getRequest('/accidentReport/accidents/getInjurySummaryOptions')
}

