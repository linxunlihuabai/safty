const mixin = {
  data() {
    return {
      handle: '', // 处理方式
      search: '', // 搜索字段
      searchTemp: '', // 搜索字段中间变量
      tableDataLoading: true, // 表格加载

      expands: [], // 展开行数组

      formDialog: false, // 弹出框标志

      sunViewPics: false, // 多图片预览-弹出框标志
      sunPicList: [], // 多图片预览-列表

      sunFileVisible: false, // 多文件预览-弹出框标志
      sunFileList: [], // 多文件预览-文件列表

      historyDialog: false,
      historyTable: [] // 历史记录
    }
  },
  watch: {
    searchTemp(val) {
      if (!val) {
        this.search = ''
      }
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
    },
    // 添加按钮
    addform() {
      this.formDialog = true
      this.handle = '添加'
    },
    // 编辑单行表格
    editItem(scope) {
      this.formDialog = true
      this.handle = '修改'
      this.$nextTick(() => {
        this.form = { ...scope.row }
      })
    },
    // 获取表格单行id
    getRowKeys(row) {
      return row.id
    },

    // 折叠面板每次只能展开一行
    expandChange(row, expandedRows) {
      console.log(row, expandedRows)
      if (expandedRows.length) {
        this.expands = []
        if (row) {
          // 打开当前点击的 详情
          this.expands.push(row.id) // 每次push进去的是每行的ID
        }
      } else {
        this.expands = [] // 默认不展开
      }
    },
    // 查看照片
    viewPics(picList) {
      this.picsPreview(this, picList)
    },
    // 多文件预览方法
    handleFileListView(fileList) {
      if (fileList.length > 1) {
        // const extArr = ['jpg', 'bmp', 'jpeg', 'png', 'gif', 'JPG', 'BMP', 'JPEG', 'PNG', 'GIF'] // 图片后缀名数组
        // const flag = fileList.every(item => {
        //   const fileName = item.name // 文件名
        //   const ext = fileName.substring(fileName.lastIndexOf('.') + 1) // 文件后缀名
        //   return extArr.includes(ext)
        // })
        // // 假如是多张图片
        // if (flag) {
        //   let url = ''
        //   fileList.forEach(item => {
        //     // const itemUrl = process.env.VUE_APP_BASE_API + item.url
        //     const itemUrl = 'http://47.99.113.105:8084' + item.url
        //     url = url + itemUrl + '|'
        //   })
        //   url = url.slice(0, -1)
        //   window.open('http://47.99.113.105:8012/picturesPreview?urls=' + encodeURIComponent(url))
        //   console.dir(url)
        // } else {
        this.sunFileVisible = true
        this.sunFileList = fileList
        //   console.log(flag)
        // }
      } else {
        this.filePreview(fileList[0])
      }
    },
    // 处理dialog关闭
    handleDialogClosed(formName) {
      this.dialogClosed(this, formName)
    },
    // 重置表单
    handleResetForm(formName) {
      this.resetForm(this, formName)
    },
    // 分页大小改变
    handlePageSizeChange(val) {
      this.fetchList()
    },
    // 当前页改变
    handleCpageChange(val) {
      this.fetchList()
    },
    // 得到合并表格的数组
    getSpanArr(data, prop) {
      const spanArr = []
      let pos
      let group
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.push(1)
          pos = 0
        } else {
          if (Array.isArray(prop)) {
            group = prop.every(item => {
              return data[i][item] === data[i - 1][item]
            })
          }
          if (data[i][prop] && data[i][prop] === data[i - 1][prop] || group) {
            spanArr[pos] += 1
            spanArr.push(0)
          } else {
            spanArr.push(1)
            pos = i
          }
        }
      }

      return spanArr
    },
    // 返回合并对象
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const prop = column.property

        const arr = this.getSpanArr(this.tableData, prop)

        const _row = arr[rowIndex]
        const _col = _row > 0 ? 1 : 0

        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 带展开行的
    objectExpandSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const prop = column.property

        const arr = this.getSpanArr(this.tableData, prop)

        const _row = arr[rowIndex]
        const _col = _row > 0 ? 1 : 0

        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}

export default mixin
