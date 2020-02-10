<template>

  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addHalfMonthSetup">
            <i class="el-icon-plus" /> 新增
          </el-button>
        </el-col>
      </el-row>
      <!-- 展示页面 -->
      <el-row>
        <el-table
          ref="table"
          v-loading="pageHalfMonthSetupListLoading"
          :data="page.list"
          stripe
          border
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="expandChange"
        >
          <el-table-column prop="enterpriseName" label="企业名称" />
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page.page"
          :total="page.total"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <el-dialog
        title="半月报公司设置"
        :visible.sync="halfMonthSetupFormDialog"
        width="600px"
        @closed="handleDialogClosed('halfMonthSetupForm')"
      >
        <el-form
          ref="halfMonthSetupForm"
          :rules="halfMonthSetupFormRules"
          size="small"
          :model="halfMonthSetupForm"
        >
          <el-form-item label="企业名称" prop="enterpriseId" :label-width="GLOBAL.DIALOG_LABLEWIDTH.FOUR">
            <el-cascader
              v-model="halfMonthSetupForm.enterpriseId"
              style="width: 100%"
              size="small"
              placeholder="请选择企业"
              :options="enterpriseOptions"
              :props="{ checkStrictly: true }"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="btnLoading" type="primary" @click="halfMonthSetupFormSubmit">确定</el-button>
            <el-button @click="handleDialogClosed('halfMonthSetupForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEnterpriseOptions } from '@/api/config/index'
import { semiMonthReportAdd, semiMonthReportList } from '@/api/reportStatistics/halfMonthSetup'
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10
      },
      page: { list: [], page: 0, size: 0, total: 0, totalPage: 0 },
      pageHalfMonthSetupListLoading: true,
      btnLoading: false,
      halfMonthSetupForm: {
        enterpriseId: ''
	  },
      enterpriseOptions: [],
	  halfMonthSetupFormDialog: false,
      halfMonthSetupFormRules: {
        enterpriseId: [{ required: true, message: '请选择不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    getEnterpriseOptions().then(res => {
      this.enterpriseOptions = res.data.obj
    })
    this.fetchData()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.params.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.params.size = val
      this.fetchData()
    },
    // 获取信息
    fetchData() {
      semiMonthReportList(this.params).then(res => {
        this.pageHalfMonthSetupListLoading = false
        this.page = res.data.obj
      })
    },
    addHalfMonthSetup() {
      this.handle = '添加'
      this.halfMonthSetupFormDialog = true
      // 默认表格为空
    },
    halfMonthSetupFormSubmit() {
      this.$refs.halfMonthSetupForm.validate((valid) => {
        if (valid) {
          this.halfMonthSetupForm.enterpriseId = this.halfMonthSetupForm.enterpriseId[this.halfMonthSetupForm.enterpriseId.length - 1]
          this.btnLoading = true
          if (this.handle === '添加') {
            semiMonthReportAdd(this.halfMonthSetupForm).then(res => {
              this.btnLoading = false
              this.halfMonthSetupFormDialog = false
              this.fetchData()
            })
          } else if (this.handle === '修改') {
            console.log('我是修改')
          }
          this.btnLoading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
