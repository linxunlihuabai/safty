<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <return-back />

      <div class="message">
        <div class="header">
          <p class="title">{{ msg.title }}</p>
          <p class="sender">发件人: {{ msg.sendname }}</p>
          <p class="time">时&nbsp;&nbsp;&nbsp;间: {{ msg.createdate | dateFormat('YYYY-MM-DD') }}</p>
          <p v-if="msg.files" class="files">附&nbsp;&nbsp;&nbsp;件: {{ msg.files.length }}个</p>
        </div>

        <!-- 消息内容 -->
        <div class="content" v-html="msg.content" />

        <!-- 附件 -->
        <div v-if="msg.files" class="enclosure">
          <div class="title">
            <i class="el-icon-paperclip" /><span>附件</span>
          </div>
          <div class="fileList">
            <template v-for="item in msg.files">
              <div :key="item.id" class="fileItem">
                <span class="name">{{ item.name }}</span>
                <div class="operation">
                  <el-divider direction="vertical" />
                  <el-button
                    type="text"
                    size="mini"
                    @click="filePreview(item)"
                  >预览</el-button>
                  <el-divider direction="vertical" />
                  <file-download :file-id="item.fileId" :file-name="item.name" />
                  <el-divider direction="vertical" />
                </div>

              </div>
              <el-divider :key="item.id" />
            </template>
          </div>

        </div>

        <!-- 回复(已读回执没有回复) -->
        <div v-if="msg.replyId != -1" class="reply">
          <div class="replyBtn">
            <el-button type="primary" size="small" @click="handleReply">{{ replyShow ? '取消':'回复' }}</el-button>
          </div>

          <transition name="el-fade-in-linear">
            <release v-if="replyShow" ref="sendMsg" v-model="form" :form-rules="formRules" @send-method="replyMessage">
              <template v-slot>
                <el-form-item prop="content">
                  <tinymce v-model="form.content" height="100" />
                </el-form-item>
              </template>
            </release>
          </transition>

        </div>

        <!-- 回复内容(已读回执没有回复) -->
        <div v-if="msg.replyId != -1" class="replyContent">
          <div class="title">
            <i class="el-icon-chat-line-square" />
            <span>回复</span>
          </div>
          <div v-for="item in replyList" :key="item.id" class="main">
            <div class="header">
              <span class="name">{{ item.sendname }}</span>
              <span class="time">{{ item.createdate | dateFormat('YYYY-MM-DD') }}</span>
            </div>
            <div class="content" v-html="item.content" />
            <el-divider />
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>

import Release from './components/Release'
import Tinymce from '@/components/Tinymce'
import FileDownload from '@/components/fileDownload'
import ReturnBack from './components/ReturnBack'
import {
  getMessages,
  replyMessages
} from '@/api/messageNotify/message'
export default {
  components: {
    Release,
    Tinymce,
    FileDownload,
    ReturnBack
  },
  data() {
    return {
      replyShow: false,
      form: {
        content: ''
      },
      formRules: {
        content: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      },
      msg: {},
      replyList: []
    }
  },
  created() {
    this.fetchMessages()
  },
  methods: {
    fetchMessages() {
      const id = this.$route.params.id

      // 获取信息详情
      getMessages({ msgid: id }).then(res => {
        // 信息详情
        this.msg = res.data.obj.filter(item => {
          return item.replyId === 0 || item.replyId === -1
        })[0]
        // 回复列表
        this.replyList = res.data.obj.filter(item => {
          return item.replyId !== 0 && item.replyId !== -1
        })
      })
    },
    handleReply() {
      this.replyShow = !this.replyShow
    },
    replyMessage(form) {
      const params = this.depClone(form)

      params.replyId = this.msg.id // 回复id，0代表发送消息，-1代表已读回执消息，其他代表关联的消息id

      replyMessages(params).then(res => {
        this.fetchMessages()
        this.$refs.sendMsg.$emit('success')
        this.replyShow = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message{
  padding-bottom:  20px;
  >.header{
    background-color: #f2f2f2;
    padding: 5px 15px;
    border-bottom: 1px solid #ccc;
    p{
      color: #817777;
      margin: 0;
      padding-top: 2px;
      line-height: 20px;
      &.title{
        font-weight: bold;
        font-size: 14px;
        color: #000;
      }
    }
  }
  >.content{
    font-size: 16px;
    height: auto;
    padding: 30px 60px;
    line-height: 1.7;
  }

  //附件
  >.enclosure{
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    margin-bottom: 20px;
    >.title{
      padding: 5px 10px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      span{
        margin-left: 5px;
      }
    }
    >.fileList{
      background-color: #fff;
      padding: 12px;
      >.fileItem{
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >.name{
          font-weight: bold;
          color: #000;
        }
      }
      >.el-divider--horizontal{
        margin: 10px 0;
      }
    }
  }

  //回复
  .reply{

    margin-bottom: 20px;
    .replyBtn{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 10px;
    }

  }

  //回复内容
  >.replyContent{
    border: 1px solid #f2f2f2;
    font-size: 14px;
    font-weight: bold;
    >.title{
      background-color: #f2f2f2;
      border-bottom: 1px solid #ccc;
      padding: 5px 15px;
      span{
        margin-left: 5px;
      }
    }
    >.main{
      padding: 20px 30px 0;
      >.header{
        padding-bottom: 10px;
        >.name{
          color: #409EFF;
          font-size: 14px;
          margin-right: 10px;
        }
        >.time{
          font-weight: normal
        }
      }
      >.content{
        font-weight: normal;
      }
    }

  }
}

</style>
