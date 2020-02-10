<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getSessionStorage, saveSessionStorage } from '@/utils/storage'
export default {
  name: 'App',
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (getSessionStorage('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, getSessionStorage('store')))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      saveSessionStorage('store', this.$store.state)
    })
  }
}
</script>

<style>
.zhou-box-card {
  width: 45%;
  min-width: 992px;
  text-align: center;
  margin:auto;
  font-size: 18px;
}
.zhou-colBorder {
  border: 1px solid #ebeef5;
}
.zhou-lei{
width: 200px;
}
.zhou-one {
    background: #f0f9eb;
}
.zhou-prompt {
  height: 36px;
  line-height: 36px;
  background-color: #07c181;
  color: white;
  font-size: 14px;
  padding-left: 12px;
  margin:20px;
}
/* 去除左下角没有百度地图的logo和版本信息 */
.BMap_cpyCtrl,
    .anchorBL {
      display: none;
    }
</style>
