import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [法律法规] 列表
export function getLawsList(data) {
  return postRequest('/lawandrules/laws/getlawsbypage', data)
}

// 添加 [法律法规] 信息
export function addLaws(data) {
  return postRequest('/lawandrules/laws/add', data)
}

// 修改 [法律法规] 信息
export function updateLaws(id, data) {
  return putRequest(`/lawandrules/laws/update/${id}`, data)
}

// 通过 id 删除 [法律法规] 信息
export function deleteLaws(id) {
  return deleteRequest(`/lawandrules/laws/delete/${id}`)
}

// 通过 id 查询 [法律法规] 的修改历史记录
export function historyLaws(id) {
  return postRequest(`/lawandrules/laws/historys/${id}`)
}
