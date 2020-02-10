import { postRequest, deleteRequest, putRequest } from '@/utils/request'

// 安全生产会议 -> 添加
export function safetyMeetingAdd(data) {
  return postRequest('/safetyCulture/safetyMeeting/add', data)
}

// 安全生产会议 -> 删除
export function safetyMeetingDelete(id) {
  return deleteRequest(`/safetyCulture/safetyMeeting/delete/${id}`)
}

// 安全生产会议 -> 修改
export function safetyMeetingUpdate(data) {
  return putRequest(`/safetyCulture/safetyMeeting/update/${data.id}`, data)
}

// 安全生产会议 -> 查看
export function safetyMeetingList(data) {
  return postRequest('/safetyCulture/safetyMeeting/list', data)
}

// 安全生产会议 -> 历史修改记录
export function historySafetyMeeting(id) {
  return postRequest(`/safetyCulture/safetyMeeting/historys/${id}`)
}
