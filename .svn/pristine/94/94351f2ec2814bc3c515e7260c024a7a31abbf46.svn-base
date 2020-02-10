import { postRequest, downloadRequest, getRequest } from '@/utils/request'

// 附件 -> 查看
// export function fileManageList(id) {
//   return postRequest(`/file/fileManage/list/${id}`, {})
// }

// 附件 -> 查看
export function fileManageList(data) {
  return postRequest(`/file/fileManage/list/${data.id}`, data)
}

// 附件 -> 下载
export function fileDownload(id) {
  return downloadRequest(`/file/fileManage/download/${id}`)
}

// 获取当前用户附件数量
export function getFilesCount() {
  return getRequest('/config/getFilesCount')
}
