import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 特种设备 -> 添加
export function specialEquipmentAdd(data) {
  return postRequest('/safetyManage/specialEquipment/add', data)
}

// 特种设备 -> 删除
export function specialEquipmentDelete(id) {
  return deleteRequest(`/safetyManage/specialEquipment/delete/${id}`)
}

// 特种设备 -> 修改
export function specialEquipmentUpdate(data) {
  return putRequest(`/safetyManage/specialEquipment/update/${data.id}`, data)
}

// 特种设备 -> 查看
export function specialEquipmentsList(data) {
  return postRequest('/safetyManage/specialEquipment/list', data)
}

// 特种设备 -> 历史修改记录
export function historySpecialEquipment(id) {
  return postRequest(`/safetyManage/specialEquipment/historys/${id}`)
}
