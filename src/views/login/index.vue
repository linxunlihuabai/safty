<template>
  <div style="width:100%;min-width:1024px;">
    <div class="banner">
      <img
        src="@/assets/images/logo.png"
        alt="江西省核工业地质局安全生产管理系统"
        title="江西省核工业地质局安全生产管理系统"
      >
      <h1>江西省核工业地质局安全生产管理系统</h1>
      <a href=""><i class="el-icon-warning-outline" />帮助手册</a>
    </div>
    <div class="login-container">
      <div class="login-container-one">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">欢迎您登录</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item prop="identifyCode">
            <div>
              <span class="svg-container">
                <svg-icon icon-class="verificationCode" />
              </span>
              <el-input
                v-model="loginForm.identifyCode"
                class="identifyCode"
                placeholder="验证码"
                name="identifyCode"
              />
              <div
                class="get-code"
                @click="refreshCode()"
              >
                <s-identify :identify-code="identifyCode" />
              </div>
            </div>
          </el-form-item>

          <el-button
            :loading="btnLoading"
            type="primary"
            class="loginButton"
            @click.native.prevent="handleLogin"
          >登录</el-button>

          <div class="tips">
            <router-link
              style="margin-right:20px;"
              to="/login/register"
            > <i class="el-icon-edit" />立即注册</router-link>
            <router-link
              style="margin-right:20px;"
              to="/login/forgetPassword"
            ><i class="el-icon-edit-outline" /> 忘记密码</router-link>
          </div>
        </el-form>
        <div class="state">
          <ul>
            <li>技术人员服务电话：19979199198</li>
            <li>如有任何疑问，可拨打技术人员电话。</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ban">
      <ul style="list-style:none;">
        <li>
          版权所有：江西省核工业地质局
        </li>
        <li>
          地址：江西省南昌市北京西路160号
        </li>
        <li>
          电话: 0791-86351112
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  validatePassword
} from '@/utils/regList'
import SIdentify from '@/components/sIdentify'

export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data() {
    // 密码包含 数字,英文,字符中的两种以上，长度8-20
    const validatePass = (rule, value, callback) => {
      /* 密码不能全部是数字，或全部是小写字母，或全部是大写字母 */
      if (value === '') {
        callback(new Error('密码不能为空'))
      }
      if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      }
      callback()
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error('验证码输入错误'))
      } else {
        callback()
      }
    }
    return {
      identifyCode: '1111',
      identifyCodes:
        'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789', // 随便打的
      loginForm: {
        username: 'admin',
        password: '12345678a',
        identifyCode: '1111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        identifyCode: [
          { required: true, trigger: 'blur', validator: validateIdentifyCode }
        ]
      },
      btnLoading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    // this.refreshCode()
  },
  methods: {
    refreshCode() {
      // 刷新验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          // 登录
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            // 获取菜单路由
            this.$store.dispatch('config/getRouter').then(() => {
              this.$router.push({ path: this.redirect || '/home' })
              this.btnLoading = false
            }).catch((err) => {
              this.btnLoading = false
              console.log(err)
            })
            // 获取企业信息
            this.$store.dispatch('config/getEnterpriseOptions')
            // 获取当前用户附件数量
            // this.$store.dispatch('config/getFilesCount')
            // 获取分类列表
            this.$store.dispatch('config/getClassifyOptions')
          }).catch((err) => {
            this.btnLoading = false
            this.refreshCode()
            console.log(err)
          })
        } else {
          this.refreshCode()
          return false
        }
      })
    },
    toForgotPassword() {
      location.href = '/#/login/forgetPassword'
      location.reload()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #E5E5E5;
$light_gray: #fff;
$cursor: #454545;

/* reset element-ui css */
.login-container {
  height: 660px;
  position: relative;
  .login-container-one {
    width: 450px;
    background-color: white;
    position: absolute;
    right: 20%;
    top: 80px;
    .loginButton {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .el-input {
    display: inline-block;
    // height: 30px;
    width: 85%;
    &.identifyCode {
      width: 50%;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $bg;
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content {
    line-height: 30px !important;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background: url('../../assets/images/loginImg.jpg') no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  width: 100%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .get-code {
      float: right;
      // height: 30px;
      cursor: pointer;
    }
  }

  .tips {
    font-size: 14px;
    color: black;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 8px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #158fff;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

h1 {
  font-size: 36px;
  background: linear-gradient(#bcddff, #0e88eb);
  -webkit-background-clip: text;
  /* #108BFC,#008CD6 */
  color: transparent;
}
.state {
  border-top: #ededed solid 1px;
  width: 400px;
  margin-left: 20px;
}
.state ul li {
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 16px;
  color: #898989;
}

.banner > * {
  display: inline-block;
  vertical-align: middle;
}
.ban{
  padding-top: 12px;
}
.ban ul li {
  padding-top: 12px;
  font-size: 14px;
  text-align: center;
  color: #898989;
}
.banner {
  padding: 10px 0;
  margin: 0 auto;
  width: 1024px;
  a {
    font-size: 14px;
    padding: 37px 0;
    color: blue;
    float: right;
  }
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
