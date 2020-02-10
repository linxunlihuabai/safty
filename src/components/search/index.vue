<template>
  <div class="sun-search">
    <el-autocomplete
      v-model="searchTemp"
      size="small"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      style="width:160px;margin-right:10px"
      :trigger-on-focus="false"
      @select="handleSelect"
    />

    <el-button type="primary" icon="el-icon-search" size="small" @click="onSearch">查询</el-button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    keyWord: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      search: '', // 搜索字段
      searchTemp: '' // 搜索字段中间变量
    }
  },
  computed: {
    filterData() {
      const search = this.search
      return this.fuzzySearch(this.data, search, this.keyWord)
    },
    queryList() {
      return this.data.map(item => {
        return { value: item[this.keyWord] }
      })
    }
  },
  watch: {
    searchTemp(val) {
      if (!val) {
        this.search = ''
      }
    },
    filterData: {
      handler(val) {
        this.$emit('filterData', val)
      },
      deep: true,
      immediate: true

    }
  },
  methods: {
    // 过滤表格
    onSearch() {
      this.search = this.searchTemp
    },
    querySearch(queryString, cb) {
      var results = this.fuzzySearch(this.queryList, queryString, 'value')
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect() {
      this.onSearch()
    }
  }

}
</script>

<style>

</style>
