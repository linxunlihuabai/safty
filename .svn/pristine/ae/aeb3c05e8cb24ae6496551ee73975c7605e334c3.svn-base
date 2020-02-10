<template>

  <el-button type="text" @click="downloadClick">下载</el-button>

</template>

<script>
import { fileDownload } from '@/api/fileManagement/myFile'
export default {
  props: {
    fileId: {
      type: Number,
      required: true,
      default: 0
    },
    fileName: {
      type: String,
      default: '下载文件' + new Date().getTime()
    }
  },
  methods: {
    downloadClick() {
      console.log('下载的文件编号为：' + this.fileId)
      if (!this.fileId || this.fileId === 0) {
        return
      }
      fileDownload(this.fileId).then(res => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', this.fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象
        // console.log(url)
        // console.log(link)
      }).catch(() => {})

      // const downloadUrl = process.env.VUE_APP_BASE_API + `/file/fileManage/download/${this.fileId}`
      // window.open(downloadUrl)
    }
  }
}
</script>

<style>

</style>
