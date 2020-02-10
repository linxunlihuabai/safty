<template>
  <li class="todo">
    <div class="view">
      <label v-if="type==='audit'">
        <el-button type="text" @click="handleTodo">{{ todo.user.username }}</el-button>
        <el-tag type="danger">待审核</el-tag>
      </label>
      <label v-if="type==='report' && !todo.value">
        <el-button type="text" @click="handleTodo">{{ report }}</el-button>
        <el-tag type="danger">待提交</el-tag>
      </label>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    type: {
      type: String
    },
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    report() {
      let name = this.todo.label

      if (name === 'yhqkb') {
        name = '隐患情况表'
      } else if (name === 'yhzgqkb') {
        name = '隐患整改情况表'
      } else if (name === 'aqsczhb') {
        const type = this.todo.type
        if (type === 'yue') {
          name = '安全生产综合表(月报)'
        } else {
          name = '安全生产综合表(半月报)'
        }
      }
      return name
    }
  },
  methods: {
    handleTodo() {
      this.$emit('click', this.todo)
    }
  }
}
</script>
