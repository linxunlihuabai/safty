<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <release ref="sendMsg" v-model="form" :form-rules="formRules" @send-method="sendMessage">
        <template v-slot:header>
          <el-form-item label="公告类型" prop="type">
            <sun-select v-model="form.type" :module="'公告类型'" />
          </el-form-item>
          <el-form-item label="截止时间" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </template>
      </release>
    </div>
  </div>
</template>

<script>

import Release from './components/Release'

import {
  addNotice
} from '@/api/messageNotify/notice'
export default {
  components: {
    Release
  },
  data() {
    return {
      form: {
        type: 1601,
        endDate: '',
        title: '',
        content: null,
        files: []
      },
      formRules: {
        type: [
          { required: true, message: '请选择公告类型', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择截止日期', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入主题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendMessage(form) {
      const params = this.depClone(form)

      if (params.files && params.files.length > 0) {
        params.attachments = params.files.map(item => {
          return item.fileId
        })
      }

      console.log(params)

      addNotice(params).then(res => {
        this.$refs.sendMsg.$emit('success')
      })
    }
  }

}
</script>

<style>

</style>
