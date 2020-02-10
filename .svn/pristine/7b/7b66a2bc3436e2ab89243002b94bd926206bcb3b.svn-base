
import dateFormat from './dateFormat'
import classifyFormat from './classifyFormat'
import booleanFormat from './booleanFormat'
import ellipsis from './ellipsis'

const filters = {
  install(Vue) {
    // 日期转换过滤器
    Vue.filter('dateFormat', dateFormat)
    // 自定义分类id转对应中文过滤器
    Vue.filter('classifyFormat', classifyFormat)
    // 布尔转中文过滤器
    Vue.filter('booleanFormat', booleanFormat)
    // 省略过滤器
    Vue.filter('ellipsis', ellipsis)
  }
}

export default filters
