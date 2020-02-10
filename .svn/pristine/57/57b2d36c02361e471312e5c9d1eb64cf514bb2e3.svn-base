<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <!-- 个人信息显示面板 -->
      <el-card class="box-card zhou-box-card">
        <div slot="header" class="clearfix">
          <el-button style="float: left;" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
          <span>修改密码</span>
        </div>
        <!-- 修改密码 -->
        <el-form
          ref="resetForm"
          :model="resetForm"
          :rules="rules"
          status-icon
          label-width="120px"
          size="medium"
        >
          <el-form-item label="旧密码：" prop="oldPassword">
            <el-input v-model="resetForm.oldPassword" type="password" auto-complete="off" />
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="resetForm.newPassword" type="password" auto-complete="off" />
          </el-form-item>
          <el-form-item label="确认密码：" prop="newPassword2">
            <el-input v-model="resetForm.newPassword2" type="password" auto-complete="off" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="toModifyPassword('resetForm')"
            >确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-dialog
        top="36vh"
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="30%"
        :show-close="false"
      >
        <span>确定修改此账号密码吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = true">确 定</el-button>
          <el-button @click="quit()">取消及退出</el-button>
        </span>
      </el-dialog>

      <el-dialog
        ref="authenticationEmail"
        top="36vh"
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose"
        :model="authenticationEmail"
      >
        <el-form
          ref="authenticationEmail"
          :rules="rules"
          :model="authenticationEmail"
          label-width="70px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="authenticationEmail.email" disabled />
          </el-form-item>
          <el-row>
            <el-form-item label="验证码" class="captcha" prop="captcha">
              <el-col :span="14">
                <el-input v-model="authenticationEmail.captcha" placeholder="请输入验证码" />
              </el-col>
              <el-col :span="8" style="padding-left:10px;" class="sendCode">
                <el-button
                  v-if="!disabled"
                  type="button"
                  :disabled="disabled"
                  @click="sendCode('authenticationEmail')"
                >进行邮箱验证</el-button>
                <el-button
                  v-if="disabled"
                  type="button"
                  :disabled="disabled"
                  @click="sendCode('authenticationData')"
                >{{ btntxt }}</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="btnLoading" @click="successAuthenticationEmail('authenticationEmail')">确 定</el-button>
              <el-button @click="dialogVisible2 = false">取 消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getUpdatePasswordCaptcha, checkUpdatePasswordCaptcha, updatePasswordData } from '@/api/user/index'
import { validatePassword } from '@/utils/regList'
import { get, clear } from '@/utils/sessionStorage'
export default {
  data() {
    const validateOldPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      } else if (value === this.resetForm.oldPassword) {
        callback(new Error('您未修改密码'))
      } else {
        callback()
      }
    }
    const validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value === this.resetForm.oldPassword) {
        callback(new Error('您未修改密码'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        taskId: ''
      },
      // 邮箱验证
      authenticationEmail: {
        email: '',
        captcha: '',
        taskId: ''
      },
      rules: {
        oldPassword: [
          { required: true, validator: validateOldPwd, trigger: 'blur' },
          { required: true, validator: validateOldPwd, trigger: 'change' }
        ],
        newPassword: [
          { required: true, validator: validatePwd, trigger: 'blur' },
          { required: true, validator: validatePwd, trigger: 'change' }
        ],
        newPassword2: [
          { required: true, validator: validatePwd2, trigger: 'blur' },
          { required: true, validator: validatePwd2, trigger: 'change' }
        ]
      },
      time: 0,
      disabled: false,
      btntxt: '重新发送',
      btnLoading: false,
      // 第一个弹窗默认打开出现
      dialogVisible: true,
      // 第二个弹窗进行身份验证
      dialogVisible2: false
    }
  },
  created() {
    this.authenticationEmail.email = get('user').email
  },
  methods: {
    // 60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    sendCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getUpdatePasswordCaptcha(this.authenticationEmail).then(res => {
            res = res.data
            if (res.status === 200) {
              this.authenticationEmail.taskId = res.obj
              /*  this.$message({
                message: '发送成功',
                type: 'success',
                center: true
              }) */
              this.time = 60
              this.disabled = true
              this.timer()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('验证码发送失败！请重试')
          })
        } else {
          this.$message.error('请输入完整信息')
          return false
        }
      })
    },
    // 修改密码
    successAuthenticationEmail(formName) {
      // 添加按钮缓冲事件
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          checkUpdatePasswordCaptcha(this.authenticationEmail).then(res => {
            res = res.data
            this.resetForm.taskId = res.obj
            if (res.status === 200) {
              /*  this.$message({
                message: '身份验证成功',
                type: 'success',
                center: true
              }) */
              this.dialogVisible2 = false
              this.dialogVisible = false
            } else {
              this.$message.error(res.msg)
            }
            this.btnLoading = false
          }).catch(() => {
            this.btnLoading = false
            this.$message.error('操作异常！请重试')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击修改密码的确认键
    toModifyPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          updatePasswordData(this.resetForm).then(res => {
            res = res.data
            if (res.status === 200) {
              /*  this.$message({
                message: '密码修改成功',
                type: 'success',
                center: true
              }) */
              clear()
              localStorage.clear()
              this.$router.push({ path: '/login' })
            } else {
              this.$message.error(res.msg)
            }
            this.btnLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 弹窗：是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeDialog() {
      this.dialogVisible2 = this.authenticationEmail
      this.dialogVisible2 = false
      // 第二个弹窗进行身份验证
      this.dialogVisible = false
    },
    quit() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
