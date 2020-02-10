import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'
import { getLocalStorage } from '@/utils/storage'
import { resetRouter } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

var accessRoutes // 用来获取后台拿到的路由

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (to.path === '/login') {
    // 重置路由
    resetRouter()
    accessRoutes = false
    next()
  } else if (to.path === '/login/register' || to.path === '/login/forgetPassword') {
    next()
  } else if (!accessRoutes) { // 不加这个判断，路由会陷入死循环
    if (!getLocalStorage('router')) {
      next('/login')
    } else { // 从localStorage拿到了路由
      accessRoutes = getLocalStorage('router')// 拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

async function routerGo(to, next) {
  accessRoutes = await store.dispatch('permission/generateRoutes', accessRoutes) // 过滤路由并添加到vuex中，做菜单渲染
  console.log(accessRoutes)
  router.addRoutes(accessRoutes) // 动态添加路由
  next({ ...to, replace: true })
}
