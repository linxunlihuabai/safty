// 日期转换工具
import moment from 'moment'

export default function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatStr)
}
