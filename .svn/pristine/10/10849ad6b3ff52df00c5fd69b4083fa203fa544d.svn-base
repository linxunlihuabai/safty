import { postRequest, putRequest } from '@/utils/request'

// 动态分页查询注册待审核列表
export function getAuditList(data) {
  return postRequest('/system/manage/user/audit/list', data)
}

// 不通过审核
export function auditNopass(taskId) {
  return putRequest(`/system/manage/user/audit/nopass/${taskId}`)
}

// 通过审核
export function auditPass(taskId) {
  return putRequest(`/system/manage/user/audit/pass/${taskId}`)
}
