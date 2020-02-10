import { postRequest, getRequest } from '@/utils/request'

// 人员持证 -> 添加
export function semiMonthReportAdd(data) {
  return postRequest('/report/semiMonthReport/add', data)
}

// 人员持证 -> 查看
export function semiMonthReportList(data) {
  return postRequest('/report/semiMonthReport/list', data)
}

// 获取企业基本信息所有的经纬度
export function getCoordinates() {
  return getRequest('/config/getEnterpriseOptions')
}
