import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

/*
**打非治违计划
*/

// 动态分页查询 [打非治违计划] 列表
export function getPlanList(data) {
  return postRequest('/safetyCheck/illegal/plan/list', data)
}

// 添加 [打非治违计划] 信息
export function addPlan(data) {
  return postRequest('/safetyCheck/illegal/plan/add', data)
}

// 修改 [打非治违计划] 信息
export function updatePlan(id, data) {
  return putRequest(`/safetyCheck/illegal/plan/update/${id}`, data)
}

// 通过 id 删除 [打非治违计划] 信息
export function deletePlan(id) {
  return deleteRequest(`/safetyCheck/illegal/plan/delete/${id}`)
}

// 通过 id 查询 [打非治违计划] 的修改历史记录
export function historyPlan(id) {
  return postRequest(`/safetyCheck/illegal/plan/historys/${id}`)
}

/*
**打非治违查处
*/

// 通过 打非治违计划 id 查询 [打非治违查处] 列表
export function getAchievementsList(data) {
  return postRequest(`/safetyCheck/illegal/achievements/list`, data)
}

// 添加 [打非治违查处] 信息
export function addAchievements(data) {
  return postRequest('/safetyCheck/illegal/achievements/adds', data)
}

// 通过 id 修改 [打非治违查处] 信息
export function updateAchievements(id, data) {
  return putRequest(`/safetyCheck/illegal/achievements/update/${id}`, data)
}

// 通过 id 删除 [打非治违查处] 信息
export function deleteAchievements(id) {
  return deleteRequest(`/safetyCheck/illegal/achievements/delete/${id}`)
}

// 通过 id 查询 [打非治违查处] 的修改历史记录
export function historyAchievements(id) {
  return postRequest(`/safetyCheck/illegal/achievements/historys/${id}`)
}
