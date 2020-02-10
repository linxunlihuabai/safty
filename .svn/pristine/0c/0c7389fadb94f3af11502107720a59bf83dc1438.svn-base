<template>

  <el-form
    id="addData"
    ref="form"
    size="small"
    :model="form"
    :rules="formRules"
    label-width="auto"
  >
    <slot name="header" />

    <slot>
      <el-form-item label="主题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="正文" prop="content">
        <tinymce v-model="form.content" @blur="handleBlur" />
      </el-form-item>

      <el-form-item label="附件" prop="files">
        <sun-upload
          ref="UPLOAD"
          :data="GLOBAL.FILE_TYPE.OTHER"
          :file-list.sync="form.files"
          :btn-loading.sync="btnLoading"
        />
      </el-form-item>
    </slot>

    <slot name="footer">
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" :loading="btnLoading" @click="sendForm">发布</el-button>
      </el-form-item>
    </slot>

  </el-form>
</template>

<script>

import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          title: '',
          content: null,
          files: []
        }
      }
    },
    formRules: {
      type: Object,
      default: () => {
        return {
          title: [
            { required: true, message: '请输入主题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入正文', trigger: 'blur' }
          ]
        }
      }
    }
  },
  data() {
    return {
      btnLoading: false
    }
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('change', val)
      },
      deep: true
    }
  },
  mounted() {
    this.$on('success', () => {
      this.btnLoading = false

      // this.resetForm(this, 'form')
      this.$refs.form.resetFields()
    })
    this.$on('btnLoading', (val) => {
      this.btnLoading = val
    })
  },
  methods: {
    sendForm() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.btnLoading = true
          this.$emit('send-method', this.form)
        } else {
          return false
        }
      })
    },

    // 富文本失去焦点后验证
    handleBlur() {
      this.$nextTick(() => {
        this.$refs.form.validateField('content')
      })
    }
  }

}
</script>

<style>

</style>
