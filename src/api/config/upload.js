import { postRequest } from '@/utils/request'

// 上传文件
export function upload(data) {
  return postRequest('/ajax/upload', data)
}
