import { getRequest, postRequest, deleteRequest, putRequest } from '@/utils/request'

// 获取当前用户菜单路由
export function getUserMenu() {
  return getRequest('/config/menu')
}

// 获取分类列表
export function getUserClassifyList() {
  return getRequest('/config/category')
}

// 获取企业名称
export function getEnterpriseOptions() {
  return getRequest('/config/getEnterpriseOptions')
}

// 获取项目列表
export function getProjectsList() {
  return getRequest('/config/getProjects')
}
