<template>
  <el-tabs
    v-height="height"
    type="border-card"
    class="table-container"
  >
    <el-tab-pane
      v-for="item in list"
      :key="item"
    >
      <template slot="label">
        <el-tag
          class="tags"
          :type="item.tagType || tagType"
        >{{ item.title || item }}</el-tag>
      </template>

      <sun-table
        :loading="tableDataLoading"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        class="pointer-table"
        @row-click="handleRowClick"
        @current-change="handleCpageChange"
      >
        <template v-slot:createdate="scope">
          {{
            scope.row.createdate | dateFormat("YYYY-MM-DD")
          }}
        </template>

        <template v-slot:operation="scope">
          <el-button-group class="operate">
            <sun-button
              :type="'edit'"
              @click="editItem(scope)"
            />
            <sun-button
              :type="'delete'"
              @click="delItem(scope)"
            />
          </el-button-group>
        </template>
      </sun-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SunTable from '@/components/table'
import { getNoticeList, deleteNotice } from '@/api/messageNotify/notice'

export default {
  directives: {
    height: {
      bind(el, { value }) {
        if (value) {
          el.style.height = value
        }
      }
    }
  },
  components: {
    SunTable
  },
  props: {
    height: {
      type: String,
      default: ''
    },
    tagType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: ['公告'],
      showHeader: false,
      tableData: [],
      columns: [
        {
          prop: 'title' // <String>  对应属性名
        },
        {
          prop: 'enterpriseName' // <String>  对应属性名
        },
        {
          prop: 'createdate', // <String>  对应属性名
          align: 'right', // <String> 内容对齐方式
          slot: true,
          width: 120 // <String,Number> 列宽
        },
        {
          prop: 'operation', // <String>  对应属性名
          align: 'right', // <String> 内容对齐方式
          slot: true,
          width: 120 // <String,Number> 列宽
        }
      ],
      pagination: {
        cpage: 1,
        pageSize: 6,
        total: 0,
        layout: 'total, prev, pager, next'
      }
    }
  },
  created() {
    this.fetchNoticeList()
  },
  methods: {
    fetchNoticeList(cpage, pageSize) {
      const params = {}
      params.page = cpage || this.pagination.cpage
      params.size = pageSize || this.pagination.pageSize
      getNoticeList(params).then(res => {
        const pageObj = res.data.obj

        this.pagination.total = pageObj.total

        const list = pageObj.list
        this.tableData = list

        this.tableDataLoading = false
      })
    },
    handleCpageChange() {
      this.fetchNoticeList()
    },
    // 单行被点击事件
    handleRowClick(row, column, event) {
      this.$router.push(`/messageNotify/noticeDetails/${row.id}`)
    },

    editItem(scope) {
      const { row } = scope
      this.$router.push(`/messageNotify/noticeEdit/${row.id}`)
      console.log(scope)
    },
    delItem(scope) {
      const { row } = scope
      this.handleCofirm('你确定要删除么？', 'warning').then(() => {
        deleteNotice(row.id).then(res => {
          this.fetchNoticeList()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  width: 200px;
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  text-align: center;
}

.table-container {
  background-color: #fff;
  overflow: hidden;

  /deep/ .el-tabs__item {
    padding: 10px 30px;
    height: auto;
  }

  /deep/ .el-tabs__content {
    padding: 20px 30px 16px;
  }
}

.pointer-table {
  /deep/ .el-table__row {
    cursor: pointer;

    .operate {
      transition: all 0.3s ease-in-out;
      visibility: hidden;
      opacity: 0;
    }

    &:hover {
      .operate {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
