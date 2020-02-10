import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 动态分页查询 [公告] 列表
export function getNoticeList(data) {
  return postRequest('/home/sendNotice/list', data)
}

// 添加 [公告] 信息
export function addNotice(data) {
  return postRequest('/home/sendNotice/add', data)
}

// 修改 [公告] 信息
export function updateNotice(id, data) {
  return putRequest(`/home/sendNotice/update/${id}`, data)
}

// 通过 id 删除 [公告] 信息
export function deleteNotice(id) {
  return deleteRequest(`/home/sendNotice/delete/${id}`)
}

// 通过 id 查询 [公告] 的修详情
export function noticeDetail(id) {
  return postRequest(`/home/sendNotice/detail/${id}`)
}
