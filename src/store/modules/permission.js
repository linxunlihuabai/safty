import { constantRoutes } from '@/router'
import Layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      // 解决重定向问题
      const isRedirect = route.children.some(item => {
        return route.redirect == route.path + '/' + item.path
      })
      if (!isRedirect) {
        route.redirect = route.path + '/' + route.children[0].path
      }

      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {

  generateRoutes({ commit }, asyncRouterMap) {
    return new Promise(resolve => {
      let accessedRoutes

      // eslint-disable-next-line prefer-const
      accessedRoutes = filterAsyncRouter(asyncRouterMap)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
