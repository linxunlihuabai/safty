import { getSessionStorage } from '@/utils/storage'

import { downloadClick } from '@/utils'

import { checkUploaded, addreport } from '@/api/reportStatistics'

const mixin = {
  data() {
    return {
      operates: [
        {
          label: '预览',
          method: (row, index) => {
            console.log(row, index)
            this.handleFileListView(row.files)
          }
        },
        {
          label: '下载',
          method: (row, index) => {
            const { fileId, name } = row.files[0]
            downloadClick(fileId, name)
          }
        }
      ],
      pagination: {
        cpage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  methods: {
    // 生成报表
    handleGenerate(title) {
      const { enterpriseCode } = getSessionStorage('user')
      const baseUrl = process.env.VUE_APP_BASE_API + `/ureport/preview?_u=mysql:${title}.ureport.xml&enterprise_code=${enterpriseCode}`
      window.open(baseUrl)
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
    // 提交
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const params = this.depClone(this.form)

          // 改造时间
          const arr = params.time.split('-')
          params.year = arr[0]
          params.month = arr[1]

          // 改造文件
          params.fileId = params.files[0].fileId

          // 提交添加
          const addSubmit = (data) => {
            this.btnLoading = true
            addreport(data).then(() => {
              this.formDialog = false
            }).finally(() => {
              this.btnLoading = false
              this.fetchList()
            })
          }
          checkUploaded(params).then((res) => {
            if (res.data.obj) {
              this.handleCofirm(res.data.msg, 'warning')
                .then(() => {
                  addSubmit(params)
                }).catch(e => { console.log('取消') })
            } else {
              addSubmit(params)
            }
          }).finally(() => {
            this.btnLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
export default mixin
