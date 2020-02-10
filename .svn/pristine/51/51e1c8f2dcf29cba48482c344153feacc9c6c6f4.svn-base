import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 人员持证 -> 添加
export function personnelCertificateAdd(data) {
  return postRequest('/basicData/personnelInfo/add', data)
}

// 人员持证 -> 删除
export function personnelCertificateDelete(id) {
  return deleteRequest(`/basicData/personnelInfo/delete/${id}`)
}

// 人员持证 -> 修改
export function personnelCertificateUpdate(data) {
  return putRequest(`/basicData/personnelInfo/update/${data.id}`, data)
}

// 人员持证 -> 查看
export function personnelCertificateList(data) {
  return postRequest('/basicData/personnelInfo/list', data)
}

// 人员持证 历史修改
export function historyPersonnelCertificate(id) {
  return postRequest(`/basicData/personnelInfo/historys/${id}`)
}
