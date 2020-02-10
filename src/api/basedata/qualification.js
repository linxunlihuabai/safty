import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 分页获取企业资质列表
export function getQualificationList(data) {
  return postRequest('/basicData/enterpriseQualificationInfo/list', data)
}

// 添加企业资质
export function addQualification(data) {
  return postRequest('/basicData/enterpriseQualificationInfo/add', data)
}

// 修改企业资质
export function updateQualification(id, data) {
  return putRequest(`/basicData/enterpriseQualificationInfo/update/${id}`, data)
}

// 删除企业资质
export function deleteQualification(id) {
  return deleteRequest(`/basicData/enterpriseQualificationInfo/delete/${id}`)
}

// 历史修改记录企业资质
export function historyQualification(id) {
  return postRequest(`/basicData/enterpriseQualificationInfo/historys/${id}`)
}
