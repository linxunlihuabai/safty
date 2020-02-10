// 封装弹出框
import { MessageBox } from 'element-ui'

// confirm框
export function handleCofirm(text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}

// alert框
export function handleAlert(text = '确定执行此操作吗？', type = 'warning', callback) {
  return MessageBox.alert(text, '提示', {
    confirmButtonText: '确定',
    type: type,
    callback
  })
}

/** 重置message，防止重复弹出message弹框 */
import {
  Message
} from 'element-ui'
let messageInstance = null
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message(options)
}
;['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const SingleMessage = resetMessage
