<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <!-- 个人信息显示面板 -->
      <el-card class="box-card">
        <div
          slot="header"
          style="text-align: center;"
          class="clearfix"
        >
          <el-button style="float: left;" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
          <span style="line-height: 40px;">基本资料</span>
          <el-button style="float: right;" type="text" @click="authenticationClickDialog()">修改</el-button>
        </div>
        <div>
          <el-form label-width="450px" class="userInfo">
            <el-form-item>
              <el-avatar
                shape="square"
                :size="80"
                :src="userInfo.avatar"
                class="imgUser"
              />
            </el-form-item>
            <el-form-item label="用户名称：">
              <span class="rightSpan">{{ userInfo.username }}</span>
            </el-form-item>
            <el-form-item label="用户职位：">
              <span v-for="item in userInfo.roles" class="rightSpan">{{ item.roleName }} </span>
            </el-form-item>
            <el-form-item label="手机号：">
              <span class="rightSpan">{{ userInfo.responsiblePersonPhone }}</span>
            </el-form-item>
            <el-form-item label="邮箱地址：">
              <span class="rightSpan">{{ userInfo.email }}</span>
            </el-form-item>
            <el-form-item label="安全负责人:">
              <span class="rightSpan">{{ userInfo.responsiblePerson }}</span>
            </el-form-item>
            <el-form-item label="所属企业:">
              <span class="rightSpan">{{ userInfo.enterprise.name }}</span>
            </el-form-item>
            <!-- N585PXPF -->
          </el-form>
        </div>
      </el-card>
      <el-dialog
        ref="authenticationData"
        title="验证身份"
        width="450px"
        :visible.sync="authenticationDialog"
        size="small"
        :before-close="handleClose"
        :model="authenticationData"
      >
        <el-form
          ref="authenticationData"
          :rules="rules"
          :model="authenticationData"
          label-width="60px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="authenticationData.email" disabled />
          </el-form-item>
          <el-row>
            <el-form-item label="验证码" class="captcha" prop="captcha">
              <el-col :span="13">
                <el-input v-model="authenticationData.captcha" placeholder="请输入验证码" />
              </el-col>
              <el-col :span="11" style="padding-left:10px;" class="sendCode">
                <el-button
                  v-if="!disabled"
                  type="button"
                  :disabled="disabled"
                  @click="sendCode('authenticationData')"
                >进行邮箱验证</el-button>
                <el-button
                  v-if="disabled"
                  type="button"
                  :disabled="disabled"
                  @click="sendCode('authenticationData')"
                >{{ btntxt }}</el-button>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              :loading="btnLoading"
              @click="successfulAuthentication('authenticationData')"
            >确定</el-button>
            <el-button @click="authenticationDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 弹出一个修改个人资料 -->
      <el-dialog
        title="修改个人信息"
        :visible.sync="personalEditDialog"
        width="400px"
        :before-close="handleClose"
        size="small"
      >
        <el-form ref="userInfo" :rules="rules" :model="userInfo" label-width="100px">
          <el-row>
            <el-avatar
              shape="square"
              :size="70"
              :src="userInfo.avatar"
            />
          </el-row>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" />
          </el-form-item>
          <el-form-item label="电话" prop="responsiblePersonPhone">
            <el-input v-model="userInfo.responsiblePersonPhone" />
          </el-form-item>
          <el-form-item label="安全负责人" prop="responsiblePerson">
            <el-input v-model="userInfo.responsiblePerson" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="btnLoading" @click="submitUpdateInfo('userInfo')">确定</el-button>
            <el-button @click="personalEditDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUpdateInfoCaptcha, checkUpdateInfoCaptcha, updateInfo } from '@/api/user/index'
import { get, set } from '@/utils/sessionStorage'
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        username: '',
        responsiblePersonPhone: '',
        email: '',
        responsiblePerson: ''
      },
      authenticationData: {
        email: '',
        captcha: '',
        taskId: ''
      },
      rules: {
        responsiblePersonPhone: [
          { required: true, message: '安全负责人电话不能为空', trigger: 'blur' }
        ],
        responsiblePerson: [
          { required: true, message: '安全负责人不能为空', trigger: 'blur' }
        ]
      },
      as: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577250493012&di=c385b010e35dbd30baa71d74dc218399&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F19%2F20150519231117_wmYEU.thumb.700_0.jpeg',
      personalEditDialog: false,
      time: 0,
      authenticationDialog: false,
      disabled: false,
      btntxt: '重新发送',
      btnLoading: false
    }
  },
  created() {
    // 获取登录用户信息
    var user = get('user')
    this.userInfo = user
    console.log(user.enterpriseCode)
    // this.userInfo.userName = user.username
    // this.userInfo.avatar = user.avatar
    if (user.avatar !== null && user.avatar !== '') {
      this.userInfo.avatar = user.avatar
    } else {
      this.userInfo.avatar = this.as
    }
    // this.userInfo.roleName = user.roles.roleName
    // this.userInfo.email = user.email
    // this.userInfo.responsiblePerson = user.responsiblePerson
    // this.userInfo.responsiblePersonPhone = user.responsiblePersonPhone
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
          getUpdateInfoCaptcha(this.authenticationData).then(res => {
            res = res.data
            if (res.status === 200) {
              this.authenticationData.taskId = res.obj
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
    successfulAuthentication(formName) {
      // 添加按钮缓冲事件
      this.$refs[formName].validate(valid => {
        if (this.authenticationData.captcha === '') {
          this.$message.error('验证码不能为空')
          return
        }
        if (valid) {
          this.btnLoading = true
          checkUpdateInfoCaptcha(this.authenticationData).then(res => {
            res = res.data
            if (res.status === 200) {
              this.userInfo.taskId = res.obj
              /*  this.$message({
                message: '身份验证成功',
                type: 'success',
                center: true
              }) */
              this.authenticationDialog = false
              this.personalEditDialog = true
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
    // 点击修改个人信息的确认键
    submitUpdateInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          updateInfo(this.userInfo).then(res => {
            res = res.data
            set('user', res.obj)
            if (res.status === 200) {
              /* this.$message({
                message: '个人信息修改成功',
                type: 'success',
                center: true
              }) */

              this.personalEditDialog = false
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
    // 点击修改获取到一些数据
    authenticationClickDialog() {
      this.authenticationData.email = this.userInfo.email
      this.authenticationDialog = true
    },
    // 弹窗：是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 45%;
  min-width: 992px;
  margin:auto;
  font-size: 18px;
}
.rightSpan{
  font-size: 16px;
}

.userInfo * {
  font-size: 20px !important;
}
.imgUser {
  /* margin-left: 50px; */
}
</style>
