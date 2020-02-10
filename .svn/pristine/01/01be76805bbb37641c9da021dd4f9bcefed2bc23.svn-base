import {
  getUserMenu,
  getUserClassifyList,
  getEnterpriseOptions
} from '@/api/config/index'
import { saveLocalStorage } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    EnterpriseOptions: [],
    ClassifyOptions: {}
  },
  mutations: {
    SET_ENTERPRISEOPTIONS(state, data) {
      state.EnterpriseOptions = data
    },
    SET_CLASSIFYOPTIONS(state, data) {
      state.ClassifyOptions = data
    },
    // 增加分类下拉列表数据
    UPDATE_CLASSIFYOPTIONS(state, list) {
      const arr = list[0].children
      const data = {}
      arr.forEach(key => {
        data[key.module] = {}
        key.children.forEach(item => {
          data[key.module][item.id] = {
            id: item.id,
            label: item.label,
            value: item.id
          }
        })
      })
      state.ClassifyOptions = data
    }
  },
  actions: {

    // 获取路由菜单
    getRouter() {
      return new Promise((resolve, reject) => {
        getUserMenu().then(res => {
          const accessRoutes = res.data.obj
          saveLocalStorage('router', accessRoutes) // 存储路由到localStorage
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取企业下拉列表数据
    getEnterpriseOptions({ commit }) {
      getEnterpriseOptions()
        .then((res) => {
          commit('SET_ENTERPRISEOPTIONS', res.data.obj)
        })
    },

    // 获取分类下拉列表数据
    getClassifyOptions({ commit }) {
      getUserClassifyList().then(res => {
        const arr = res.data.obj[0].children

        const data = {}
        arr.forEach(key => {
          data[key.module] = {}
          key.children.forEach(item => {
            data[key.module][item.id] = {
              id: item.id,
              label: item.label,
              value: item.id
            }
          })
        })
        commit('SET_CLASSIFYOPTIONS', data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

