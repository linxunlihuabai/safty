import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 应急预案 -> 添加
export function emergencePlansAdd(data) {
  return postRequest('/safetyManage/emergencePlans/add', data)
}

// 应急预案 -> 删除
export function emergencePlansDelete(id) {
  return deleteRequest(`/safetyManage/emergencePlans/delete/${id}`)
}

// 应急预案 -> 修改
export function emergencePlansUpdate(data) {
  return putRequest(`/safetyManage/emergencePlans/update/${data.id}`, data)
}

// 应急预案 -> 查看
export function emergencePlansList(data) {
  return postRequest('/safetyManage/emergencePlans/list', data)
}

// 应急预案 -> 历史修改记录
export function historyEmergencePlans(id) {
  return postRequest(`/safetyManage/emergencePlans/historys/${id}`)
}
