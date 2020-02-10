// 布尔转中文过滤器

export default function(value, zhStr = { true: '是', false: '否' }) {
  return zhStr[value]
}
