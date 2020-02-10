import { postRequest, deleteRequest, putRequest, getRequest } from '@/utils/request'

// 安全机构设置 -> 添加
export function managePositionsAdd(data) {
  return postRequest('/safetyManage/managePositions/add', data)
}

// 安全机构设置 -> 查看人员持证的信息
export function getPersonalInfos() {
  return getRequest('/safetyManage/managePositions/getPersonalInfos')
}

// 安全机构设置 -> 删除
export function managePositionsDelete(id) {
  return deleteRequest(`/safetyManage/managePositions/delete/${id}`)
}

// 安全机构设置 -> 修改
export function managePositionsUpdate(data) {
  return putRequest(`/safetyManage/managePositions/update/${data.id}`, data)
}

// 安全机构设置 -> 查看
export function managePositionsList(data) {
  return postRequest('/safetyManage/managePositions/list', data)
}

// 安全机构设置 -> 历史修改记录
export function historyManagePositions(id) {
  return postRequest(`/safetyManage/managePositions/historys/${id}`)
}
