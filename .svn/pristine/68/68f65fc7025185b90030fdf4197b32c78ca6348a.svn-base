<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row type="flex" justify="space-between" align="top">

        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addform"
        >
          新增
        </el-button>

        <div>
          <el-autocomplete
            v-model="searchTemp"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            style="width:180px;margin-right:10px"
            :trigger-on-focus="false"
            @select="handleSelect"
          />

          <el-button type="primary" icon="el-icon-search" size="small" @click="onSearch">查询</el-button>
        </div>
      </el-row>
      <el-row>
        <el-col>
          <!-- 企业资质 -->
          <el-table
            ref="table"
            v-loading="tableDataLoading"
            border
            :data="tableData"
            :span-method="objectSpanMethod"
            size="small"
            stripe
          >
            <!-- 企业资质详情展示 -->
            <el-table-column prop="enterpriseName" label="企业名称" width="250" />
            <el-table-column prop="qualificationName" label="资质名称" />
            <el-table-column prop="qualificationType" label="资质类型" />
            <el-table-column prop="qualificationLevel" label="资质等级" />
            <el-table-column prop="termOfValidity" label="资质有效期" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.qualificationValidityStartTime }}</span>
                <i class="el-icon-minus" />
                <span>{{ scope.row.qualificationValidityEndTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="qualificationContent" label="资质内容" />
            <el-table-column label="照片" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
              <template slot-scope="scope">
                <el-button-group class="operate">
                  <el-button type="text" size="mini" icon="el-icon-search" @click="viewPics(scope.row.qualificationScanFiles)" />
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column label="操作" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL">
              <template slot-scope="scope">
                <el-button-group class="operate">
                  <el-button type="text" size="mini" icon="el-icon-edit" @click="editItem(scope)" />
                  <el-button type="text" size="mini" icon="el-icon-delete" @click="delItem(scope)" />
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column label="历史修改" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
              <template slot-scope="scope">
                <el-button-group class="operate">
                  <el-button
                    type="text"
                    size="mini"
                    icon="el-icon-view"
                    @click="history(scope)"
                  />
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 分页栏 -->

      <el-row ref="page">
        <!-- 分页栏 -->
        <el-pagination
          :current-page.sync="cpage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size.sync="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCpageChange"
        />
      </el-row>
      <!-- 弹出添加窗口 -->

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
          <el-form-item label="企业名称" prop="enterpriseId">
            <sun-select v-model="form.enterpriseId" :options="enterprise_options" />
          </el-form-item>

          <el-form-item label="资质名称" prop="qualificationName">
            <el-input v-model="form.qualificationName" />
          </el-form-item>

          <el-form-item label="资质类型" prop="qualificationType">
            <el-input v-model="form.qualificationType" />
          </el-form-item>

          <el-form-item label="资质等级" prop="qualificationLevel">
            <el-input v-model="form.qualificationLevel" />
          </el-form-item>

          <el-form-item label="资质有效期" prop="termOfValidity">
            <el-date-picker
              v-model="form.termOfValidity"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="资质内容" prop="qualificationContent">
            <el-input
              v-model="form.qualificationContent"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            />
          </el-form-item>

          <el-form-item label="资质扫描上传" prop="qualificationScanFiles">
            <sun-upload
              ref="UPLOAD"
              :data="GLOBAL.FILE_TYPE.QUALIFICATION"
              :file-list.sync="form.qualificationScanFiles"
              :multiple="true"
              :btn-loading.sync="btnLoading"
            />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDialogClosed('form')">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="formSubmit">{{ handle }}</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 用于预览上传多张图片的dialog -->
    <pic-dialog :visible.sync="sunViewPics" :pic-list="sunPicList" />
    <!-- 用于查看历史记录的dialog -->
    <el-dialog
      title="历史记录"
      :visible.sync="historyDialog"
      :close-on-click-modal="false"
      :width="GLOBAL.DIALOG_WIDTH.BIG"
    >
      <el-table ref="table" border :data="historyTable" size="small" stripe>
        <!-- 历史记录详情展示 -->
        <el-table-column prop="enterpriseName" label="企业名称" width="250" />
        <el-table-column prop="qualificationName" label="资质名称" />
        <el-table-column prop="qualificationType" label="资质类型" />
        <el-table-column prop="qualificationLevel" label="资质等级" />
        <el-table-column prop="termOfValidity" label="资质有效期" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.qualificationValidityStartTime }}</span>
            <i class="el-icon-minus" />
            <span>{{ scope.row.qualificationValidityEndTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qualificationContent" label="资质内容" />
        <el-table-column label="照片" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
          <template slot-scope="scope">
            <el-button-group class="operate">
              <el-button type="text" size="mini" icon="el-icon-search" @click="viewPics(scope.row.qualificationScanFiles)" />
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL" />
        <el-table-column label="操作时间" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL">
          <template slot-scope="scope">
            {{ scope.row.updateTime | dateFormat('YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getQualificationList,
  addQualification,
  updateQualification,
  deleteQualification,
  historyQualification
} from '@/api/basedata/qualification'
export default {
  data() {
    return {
      form: {
        enterpriseId: '', // 企业id
        qualificationName: '',
        qualificationType: '',
        qualificationLevel: '',
        termOfValidity: [], // 有效期
        qualificationContent: null,
        qualificationScanFiles: []
      },
      btnLoading: false,
      // 验证规则
      formRules: {
        enterpriseId: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],
        qualificationName: [
          { required: true, message: '请输入资质名称', trigger: 'blur' }
        ],
        qualificationType: [
          { required: true, message: '请输入资质类型', trigger: 'blur' }
        ],
        qualificationLevel: [
          { required: true, message: '请输入资质等级', trigger: 'blur' }
        ],
        termOfValidity: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        qualificationContent: [
          { required: true, message: '请输入资质内容', trigger: 'blur' }
        ],
        qualificationScanFiles: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ]
      },
      // formDialog: false, // 弹出框标志
      table: [],
      cpage: 1,
      pageSize: 5,
      total: 0,
      historyDialog: false,
      historyTable: [] // 历史记录
    }
  },
  computed: {
    ...mapGetters([
      'enterprise_options' // 企业名称
    ]
    ),
    tableData() {
      const search = this.search
      return this.fuzzySearch(this.table, search, 'qualificationName')
    },
    queryList() {
      return this.table.map(data => {
        return { value: data.qualificationName }
      })
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    // 动态分页查询企业资质信息
    fetchList(cpage, pageSize) {
      this.tableDataLoading = true
      const params = {}
      params.page = cpage || this.cpage
      params.size = pageSize || this.pageSize
      getQualificationList(params)
        .then(res => {
          const pageObj = res.data.obj
          this.total = pageObj.total
          // 改造时间戳
          const list = pageObj.list.map((item) => {
            return {
              ...item,
              termOfValidity: [item.qualificationValidityStartTime, item.qualificationValidityEndTime]
            }
          })

          this.table = list
          this.tableDataLoading = false
        }).catch(() => {})
    },
    // 提交日常登记表
    formSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          try {
            this.btnLoading = true
            const params = this.depClone(this.form)
            // 起始时间
            params.qualificationValidityStartTime = params.termOfValidity[0]
            params.qualificationValidityEndTime = params.termOfValidity[1]
            // 改造文件
            params.fileIds = params.qualificationScanFiles.map(item => {
              return item.fileId
            })
            if (this.handle === '添加') {
              await addQualification(params)
            } else if (this.handle === '修改') {
              await updateQualification(params.id, params)
            }

            this.btnLoading = false
            this.formDialog = false
            this.fetchList()
          } catch (e) {
            this.btnLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    delItem(scope) {
      this.handleCofirm('你确定要删除么？', 'warning')
        .then(() => {
          deleteQualification(scope.row.id).then((res) => {
            this.fetchList()
          })
        })
    },
    // 查看历史修改
    history(scope) {
      historyQualification(scope.row.id).then((res) => {
        this.historyTable = res.data.obj
        this.historyDialog = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.enterpriseId{
width: 100%;
}
</style>
