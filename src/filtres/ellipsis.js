// 省略过滤器

export default function(value, num = 10) {
  if (!value) {
    return ''
  }
  if (value.length > num) {
    return value.slice(0, num) + '...'
  }
  return value
}
