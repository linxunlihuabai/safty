<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row type="flex" :justify="enterpriseType=='J' ? 'space-between':'end'" align="top">

        <el-button
          v-if="enterpriseType=='J'"
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

          <el-table
            ref="table"
            v-loading="tableDataLoading"
            class="open-table"
            border
            :data="tableData"
            size="small"
            stripe
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            :span-method="objectExpandSpanMethod"
            @expand-change="expandChange"
          >
            <!-- 详情展示 -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <!-- 打非治违查处 -->
                <el-table
                  v-loading="achievementsLoading"
                  :data="achievementsTable"
                  :span-method="objectSpanMethod"
                  border
                  style="width: 100%"
                  class="inner-table usage"
                >
                  <el-table-column
                    prop="date"
                    label="打非治违查处"
                    align="center"
                  >
                    <template slot="header" slot-scope="scope">
                      <el-row class="slot-header">
                        <el-col>
                          打非治违查处
                        </el-col>
                        <el-col class="operation-group">
                          <el-button-group class="operate">
                            <el-button
                              size="mini"
                              type="text"
                              title="新增"
                              icon="el-icon-circle-plus-outline"
                              @click="addAchievementsItem(props)"
                            />
                          </el-button-group>
                        </el-col>
                      </el-row>
                    </template>
                    <el-table-column
                      prop="enterpriseName"
                      label="单位名称"
                    />
                    <el-table-column
                      prop="illegalActivities"
                      label="整治项"
                    />
                    <el-table-column
                      prop="exist"
                      label="是否存在违法行为"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.exist | booleanFormat }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="processingMode"
                      label="处理方式"
                    />
                    <el-table-column label="操作" :width="GLOBAL.TABLE_CELL_WIDTH.MEDIUM">
                      <template slot-scope="scope">
                        <el-button-group class="operate">
                          <el-button type="text" size="mini" title="编辑" icon="el-icon-edit" @click="editAchievementsItem(scope)" />
                          <el-button type="text" size="mini" title="删除" icon="el-icon-delete" @click="delAchievementsItem(scope)" />
                        </el-button-group>
                      </template>
                    </el-table-column>
                    <el-table-column label="历史修改" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL">
                      <template slot-scope="scope">
                        <el-button-group class="operate">
                          <el-button
                            type="text"
                            size="mini"
                            title="查看历史"
                            icon="el-icon-view"
                            @click="historyAchievements(scope)"
                          />
                        </el-button-group>
                      </template>
                    </el-table-column>

                  </el-table-column>
                </el-table>
                <el-row>
                  <!-- 分页栏 -->
                  <el-pagination
                    :current-page.sync="achievementsPage.achievementsCpage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size.sync="achievementsPage.achievementsPageSize"
                    layout="sizes, prev, pager, next"
                    :total="achievementsPage.achievementsTotal"
                    @size-change="fetchAchievementsList(props.row.id)"
                    @current-change="fetchAchievementsList(props.row.id)"
                  />
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="enterpriseName" label="企业名称" width="250" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="termOfValidity" label="时间">
              <template slot-scope="scope">
                <span>{{ scope.row.startDate }}</span>
                <i class="el-icon-minus" />
                <span>{{ scope.row.endDate }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" />
            <el-table-column label="附件" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
              <template slot-scope="scope">
                <el-button-group class="operate">
                  <el-button
                    type="text"
                    size="mini"
                    title="查看"
                    icon="el-icon-search"
                    @click="filePreview(scope.row.file[0])"
                  />
                </el-button-group>
              </template>
            </el-table-column>
            <el-table-column label="操作" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL">
              <template slot-scope="scope">
                <el-button-group class="operate">
                  <el-button type="text" size="mini" icon="el-icon-edit" @click="editPlanItem(scope)" />
                  <el-button type="text" size="mini" icon="el-icon-delete" @click="delPlanItem(scope)" />
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
                    @click="historyPlan(scope)"
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
          :current-page.sync="planCpage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size.sync="planPageSize"
          layout="sizes, prev, pager, next"
          :total="planTotal"
          @size-change="fetchPlanList"
          @current-change="fetchPlanList"
        />
      </el-row>
    </div>

    <!-- 弹出添加窗口 -->

    <!-- 计划登记表 -->
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
        :label-width="GLOBAL.FORM_LABEL_WIDTH.SMALL"
      >

        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="时间" prop="termOfValidity">
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
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="附件" prop="file">
          <sun-upload
            ref="UPLOAD"
            :data="GLOBAL.FILE_TYPE.OTHER"
            :action="GLOBAL.FILE_API"
            :file-list.sync="form.file"
            :limit="1"
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

    <!-- 查处登记表 -->
    <el-dialog
      :title="handle"
      :visible.sync="achievementsFormDialog"
      :width="GLOBAL.DIALOG_WIDTH.MEDIUM"
      :close-on-click-modal="false"
      @closed="handleDialogClosed('achievementsForm')"
    >

      <!-- 新增时使用的表单 -->
      <el-form
        v-if="handle=='添加'"
        ref="achievementsForm"
        size="small"
        :model="achievementsForm"
        :label-width="GLOBAL.FORM_LABEL_WIDTH.BIG"
      >
        <div v-for="(item,index) in achievementsForm.achievementsList" :key="item.key">
          <el-row type="flex" justify="end">
            <sun-button
              v-if="index!==0"
              :type="'delete'"
              @click="delAchievements(index)"
            />
          </el-row>

          <el-form-item
            :label="'整治项'+index"
            :prop="'achievementsList.' + index + '.illegalActivities'"
            :rules="{
              required: true, message: '请输入整治项', trigger: 'blur'
            }"
          >
            <el-input v-model="item.illegalActivities" />
          </el-form-item>

          <el-form-item
            label="是否存在违法行为"
            :prop="'achievementsList.'+index+'.exist'"
            :rules="{
              required: true, message: '请选择是否存在违法行为', trigger: 'change'
            }"
          >
            <el-radio-group v-model="item.exist">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="处理方式"
            :prop="'achievementsList.'+index+'.processingMode'"
            :rules="{
              required: true, message: '请输入处理方式', trigger: 'blur'
            }"
          >
            <el-input v-model="item.processingMode" />
          </el-form-item>
        </div>

        <el-row type="flex" justify="center">
          <el-button type="text" @click="addAchievements">新增</el-button>
        </el-row>

      </el-form>

      <!-- 修改时使用的表单 -->
      <el-form
        v-else-if="handle=='修改'"
        ref="achievementsForm"
        size="small"
        :model="achievementsForm"
        :label-width="GLOBAL.FORM_LABEL_WIDTH.BIG"
      >

        <el-form-item
          label="整治项"
          prop="illegalActivities"
          :rules="{
            required: true, message: '请输入整治项', trigger: 'blur'
          }"
        >
          <el-input v-model="achievementsForm.illegalActivities" />
        </el-form-item>

        <el-form-item
          label="是否存在违法行为"
          prop="exist"
          :rules="{
            required: true, message: '请选择是否存在违法行为', trigger: 'change'
          }"
        >
          <el-radio-group v-model="achievementsForm.exist">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="处理方式"
          prop="processingMode"
          :rules="{
            required: true, message: '请输入处理方式', trigger: 'blur'
          }"
        >
          <el-input v-model="achievementsForm.processingMode" />
        </el-form-item>

      </el-form>

      <!-- 底部操作 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClosed('achievementsForm')">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="achievementsFormSubmit">{{ handle }}</el-button>
      </div>
    </el-dialog>

    <!-- 用于查看历史记录的dialog -->
    <el-dialog
      title="历史记录"
      :visible.sync="historyDialog"
      :close-on-click-modal="false"
      :width="GLOBAL.DIALOG_WIDTH.BIG"
    >
      <el-table ref="table" border :data="historyTable" size="small" stripe>
        <!-- 历史记录详情展示 -->

        <!-- 打非治违计划 -->

        <template v-if="history==='计划'">
          <el-table-column prop="enterpriseName" label="企业名称" width="250" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="termOfValidity" label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.startDate }}</span>
              <i class="el-icon-minus" />
              <span>{{ scope.row.endDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" />
          <el-table-column label="附件" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
            <template slot-scope="scope">
              <el-button-group class="operate">
                <el-button
                  type="text"
                  size="mini"
                  title="查看"
                  icon="el-icon-search"
                  @click="filePreview(scope.row.file)"
                />
              </el-button-group>
            </template>
          </el-table-column>
        </template>

        <!-- 打非治违查处 -->

        <template v-if="history==='查处'">
          <el-table-column
            prop="enterpriseName"
            label="单位名称"
          />
          <el-table-column
            prop="illegalActivities"
            label="整治项"
          />
          <el-table-column
            prop="exist"
            label="是否存在违法行为"
          >
            <template slot-scope="scope">
              {{ scope.row.exist | booleanFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="processingMode"
            label="处理方式"
          />
        </template>

        <el-table-column prop="operatorName" label="操作人" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL" />
        <el-table-column prop="updateTime" label="操作时间" :width="GLOBAL.TABLE_CELL_WIDTH.SMALL" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import {
  getPlanList,
  addPlan,
  updatePlan,
  deletePlan,
  historyPlan
} from '@/api/safetyInspection/renovation' // 打非治违计划API
import {
  getAchievementsList,
  addAchievements,
  updateAchievements,
  deleteAchievements,
  historyAchievements
} from '@/api/safetyInspection/renovation' // 打非治违查处API

import { getSessionStorage } from '@/utils/storage'

// 内部分页器状态
const achievementsPage = {
  achievementsCpage: 1,
  achievementsPageSize: 5,
  achievementsTotal: 0
}

export default {

  data() {
    return {

      enterpriseType: getSessionStorage('user').enterprise.type,

      // 打非治违计划
      form: {
        title: '',
        termOfValidity: '', // 有效期
        content: null,
        file: []
      },

      // 验证规则
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        termOfValidity: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入资质内容', trigger: 'blur' }
        ],
        file: [
          { required: true, message: '请上传附件', trigger: 'change' }
        ]
      },
      formDialog: false, // 弹出框标志

      // 打非治违查处
      achievementsFormDialog: false,
      achievementsForm: {
        achievementsList: [
          {
            key: Date.now(),
            illegalActivities: '',
            exist: '',
            processingMode: ''
          }
        ]
      },
      table: [], // 过滤前表格数据

      // 计划的分页器
      planCpage: 1,
      planPageSize: 5,
      planTotal: 0,
      achievementsPage: this.depClone(achievementsPage), // 内部页码初始化
      tableDataLoading: true,
      achievementsLoading: true,
      achievementsTable: [],
      btnLoading: false,
      history: '',
      historyDialog: false,
      historyTable: [] // 历史记录
    }
  },
  computed: {
    // 过滤后数据
    tableData() {
      const search = this.search
      return this.fuzzySearch(this.table, search, 'title')
    },
    queryList() {
      return this.table.map(data => {
        return { value: data.title }
      })
    }
  },
  created() {
    this.fetchPlanList()
  },
  methods: {
    // 动态分页查询 [打非治违计划] 列表
    fetchPlanList(planCpage, planPageSize) {
      this.tableDataLoading = true
      const params = {}
      params.page = planCpage || this.planCpage
      params.size = planPageSize || this.planPageSize
      getPlanList(params)
        .then(res => {
          const pageObj = res.data.obj
          this.planTotal = pageObj.total

          const list = pageObj.list.map((item) => {
            item.file = [item.file]
            item.termOfValidity = [item.startDate, item.endDate]
            return item
          })
          this.table = list
          this.tableDataLoading = false
        }).catch(() => {})
    },
    // 通过 打非治违计划 id 分页查询 [打非治违查处] 列表
    fetchAchievementsList(id, Cpage, PageSize) {
      this.achievementsLoading = true
      const params = {}
      params.illegalId = id
      params.page = Cpage || this.achievementsPage.achievementsCpage
      params.size = PageSize || this.achievementsPage.achievementsPageSize
      getAchievementsList(params)
        .then(res => {
          const pageObj = res.data.obj
          this.achievementsPage.achievementsTotal = pageObj.total
          this.achievementsTable = pageObj.list
          this.achievementsLoading = false
        }).catch(() => {})
    },
    // 折叠面板每次只能展开一行
    expandChange(row, expandedRows) {
      if (expandedRows.length) {
        this.expands = []
        if (row) {
          // 打开当前点击的 详情
          this.expands.push(row.id) // 每次push进去的是每行的ID

          // 还原内部页码初始化
          this.achievementsPage = this.depClone(achievementsPage)

          // 请求数据
          this.fetchAchievementsList(row.id)
        }
      } else {
        this.expands = [] // 默认不展开
      }
    },
    // 添加查处条目
    addAchievements() {
      this.$nextTick(() => {
        this.achievementsForm.achievementsList.push({
          key: Date.now(),
          illegalActivities: '',
          exist: '',
          processingMode: ''
        })
      })
    },
    // 删除查处条目
    delAchievements(index) {
      this.$nextTick(() => {
        this.handleCofirm('你确定要删除么？', 'warning')
          .then(() => {
            this.achievementsForm.achievementsList.splice(index, 1)
          }).catch(() => {})
      })
    },
    // 处理dialog关闭
    handleDialogClosed(formName) {
      this.dialogClosed(this, formName)

      // 还原条数为初始状态
      this.achievementsForm = { achievementsList: [
        {
          key: Date.now(),
          illegalActivities: '',
          exist: '',
          processingMode: ''
        }
      ] }
    },
    // 添加按钮
    addform() {
      this.formDialog = true
      this.handle = '添加'
    },
    // 提交计划登记表
    formSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          try {
            this.btnLoading = true
            const params = this.depClone(this.form)
            // 改造起始时间
            params.startDate = params.termOfValidity[0]
            params.endDate = params.termOfValidity[1]
            params.report = params.file.map(item => {
              if (item.response) {
                return item.response.obj.fileId
              } else {
                return item.fileId
              }
            })[0]

            if (this.handle === '添加') {
              await addPlan(params)
            } else if (this.handle === '修改') {
              await updatePlan(params.id, params)
            }

            this.btnLoading = false
            this.formDialog = false
            this.fetchPlanList()
          } catch (e) {
            this.btnLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑单行表格
    editPlanItem(scope) {
      this.formDialog = true
      this.handle = '修改'
      this.$nextTick(() => {
        this.form = { ...scope.row }
      })
    },
    // 删除
    delPlanItem(scope) {
      this.handleCofirm('你确定要删除么？', 'warning')
        .then(() => {
          deletePlan(scope.row.id).then((res) => {
            this.fetchPlanList()
          })
        })
    },
    // 查看历史修改
    historyPlan(scope) {
      this.history = '计划'
      historyPlan(scope.row.id).then((res) => {
        this.historyTable = res.data.obj
        this.historyTable = this.historyTable.map((item) => {
          // 改造修改时间
          item.updateTime = this.parseTime(item.updateTime, '{y}-{m}-{d}')
          return item
        })
        this.historyDialog = true
      })
    },
    // 添加查处按钮
    addAchievementsItem(scope) {
      this.achievementsFormDialog = true
      this.handle = '添加'

      this.$nextTick(() => {
        this.achievementsForm.illegalId = scope.row.id
      })
    },
    // 修改查处按钮
    editAchievementsItem(scope) {
      this.achievementsFormDialog = true
      this.handle = '修改'
      this.$nextTick(() => {
        this.achievementsForm = { ...scope.row }
        console.log(this.achievementsForm)
      })
    },
    // 提交查处登记表
    achievementsFormSubmit() {
      this.$refs.achievementsForm.validate(async(valid) => {
        if (valid) {
          try {
            const params = this.depClone(this.achievementsForm)
            this.btnLoading = true

            if (this.handle === '添加') {
              const { achievementsList, illegalId } = params
              params.list = achievementsList
              params.list.forEach(item => {
                item.illegalId = illegalId
              })
              delete params.achievementsList
              await addAchievements(params)
            } else if (this.handle === '修改') {
              await updateAchievements(params.id, params)
            }

            this.btnLoading = false
            this.achievementsFormDialog = false
            this.fetchAchievementsList(params.illegalId)
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
    delAchievementsItem(scope) {
      this.handleCofirm('你确定要删除么？', 'warning')
        .then(() => {
          deleteAchievements(scope.row.id).then((res) => {
            this.fetchAchievementsList(scope.row.illegalId)
          })

          console.log(scope)
        })
    },
    // 查看支出历史修改
    historyAchievements(scope) {
      this.history = '查处'
      historyAchievements(scope.row.id).then((res) => {
        this.historyTable = res.data.obj
        this.historyTable = this.historyTable.map((item) => {
          // 改造修改时间
          item.updateTime = this.parseTime(item.updateTime, '{y}-{m}-{d}')
          return item
        })
        this.historyDialog = true
      })
    },
    // 返回合并对象
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const prop = column.property

        const arr = this.getSpanArr(this.achievementsTable, prop)

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
