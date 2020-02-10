<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>

      <el-row
        type="flex"
        justify="space-between"
        align="top"
      >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-upload2"
          @click="addform"
        >
          上传安全生产综合表
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-view"
          @click="handleGenerate('安全生产综合表')"
        >
          生成安全生产综合表
        </el-button>

      </el-row>

      <tips-card ref="tipsCard" :report-category="1802" />
      <sun-table
        border
        :loading="tableDataLoading"
        :columns="columns"
        :data-source="tableData"
        :operates="operates"
        :pagination="pagination"
        :span-method="objectSpanMethod"
        @size-change="handlePageSizeChange"
        @current-change="handleCpageChange"
      >
        <template v-slot:files="scope">
          {{ scope.row.files[0].name }}
        </template>
      </sun-table>

    </div>

    <!-- 登记表 -->
    <el-dialog
      :title="handle "
      :visible.sync="formDialog"
      :width="GLOBAL.DIALOG_WIDTH.MEDIUM"
      :close-on-click-modal="false"
      @closed="handleDialogClosed('form')"
    >

      <el-form
        id="addData"
        ref="form"
        size="small"
        :model="form"
        :rules="formRules"
        :label-width="GLOBAL.FORM_LABEL_WIDTH.MEDIUM"
      >

        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择时间"
          />
        </el-form-item>

        <el-form-item label="附件" prop="files">
          <sun-upload
            ref="UPLOAD"
            :data="GLOBAL.FILE_TYPE.RULES"
            :file-list.sync="form.files"
            :limit="1"
            :btn-loading.sync="btnLoading"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formDialog=false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="formSubmit">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SunTable from '@/components/table'
import TipsCard from './components/TipsCard'

import { getreportList } from '@/api/reportStatistics/halfMonthView'

import mixin from './mixins'

export default {
  components: {
    SunTable,
    TipsCard
  },
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      columns: [
        {
          prop: 'enterpriseName', // <String>  对应属性名
          label: '单位'
        },
        {
          prop: 'year', // <String>  对应属性名
          label: '年份'
        },
        {
          prop: 'month', // <String>  对应属性名
          label: '月份'
        },
        {
          prop: 'files', // <String>  对应属性名
          label: '报表名称',
          slot: true
        }

      ],
      form: {
        reportCategory: 1802, // 报表类别(半月报)
        type: 1701, // 报表类型
        time: '', // 年月
        files: []
      },
      btnLoading: false,
      // 验证规则
      formRules: {
        time: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        files: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList(cpage, pageSize) {
      this.tableDataLoading = true
      const params = {}
      params.page = cpage || this.pagination.cpage
      params.size = pageSize || this.pagination.pageSize
      getreportList(params)
        .then(res => {
          const pageObj = res.data.obj
          this.tableData = pageObj.list
          this.pagination.total = pageObj.total
          this.tableDataLoading = false
          this.btnLoading = false

          // 调用子组件方法
          console.log('字')
          this.$refs.tipsCard.fetchList()
        })
        .catch(() => {})
    },

    // 利用返回的数组合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 2) {
        const prop = column.property
        let arr
        if (columnIndex === 0) {
          arr = this.getSpanArr(this.tableData, prop)
        } else if (columnIndex === 1) {
          arr = this.getSpanArr(this.tableData, ['enterpriseName', 'year'])
        } else {
          arr = this.getSpanArr(this.tableData, ['enterpriseName', 'year', 'month'])
        }

        const _row = arr[rowIndex]
        const _col = _row > 0 ? 1 : 0

        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
