const mixin = {
  methods: {
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
