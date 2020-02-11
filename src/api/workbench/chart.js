import { getRequest } from '@/utils/request'

// 主页的获取 [隐患数量趋势] 数据
export function getAllCount() {
  return getRequest('/safetyCheck/safetyCheck/getAllCount')
}

// 主页查询安全费用图表数据，返回数组，顺序是：宣传教育培训-安全设施措施-提取安全生产费-安全生产奖励-安全生产罚款-职业卫生-劳保用品-职工保险
export function getPlanExpenses() {
  return getRequest('/basicData/expenses/getPlanExpenses')
}
