<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="addWorkplaceForm">
            <i class="el-icon-plus" /> 工作场所登记
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-form :model="params">
            <el-form-item label="所属项目" prop="healthProjectId" label-width="110px">
              <sun-select v-model="params.healthProjectId" :options="projectOptions" @change="changeOption" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 工作场所情况表 -->
      <el-table
        v-loading="workplaceListLoading"
        :data="workplacePage.list"
        border
        style="width: 100%"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        @expand-change="expandSelect"
      >
        <!-- @row-dblclick="workplaceClick" -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- testingResult定期检查情况 -->
            <el-row>
              <!-- <div class="prompt zhou-prompt">双击工作场所，即可获取对应定期检查情况表！（默认显示第一条）</div> -->
              <el-table
                v-loading="testingResultListLoading"
                :data="testingResultPage.list"
                border
                style="width: 100%"
              >
                <el-table-column
                  label="定期检查情况表"
                  align="center"
                >
                  <el-table-column
                    prop="checkDate"
                    label="检测时间"
                  />
                  <el-table-column
                    prop="checkResult"
                    label="检测结果"
                  />
                  <el-table-column
                    prop="testingOrganization"
                    label="检测评价机构"
                  />
                  <!-- <el-table-column
                    prop="workplaceId"
                    label="工作场所"
                  /> -->
                  <el-table-column
                    prop="remarks"
                    label="备注"
                  />
                  <el-table-column label="年检合格证" width="100">
                    <template slot-scope="scope">
                      <el-button-group class="operate">
                        <sun-button :type="'view'" @click="handleFileListView(scope.row.files)" />
                      </el-button-group>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button-group class="operate">
                        <sun-button :type="'edit'" @click="editTestingResultForm(scope.$index, scope.row)" />
                        <sun-button :type="'delete'" @click="delTestingResult(scope.$index, scope.row)" />
                      </el-button-group>
                    </template>
                  </el-table-column>
                  <el-table-column label="历史记录" width="80">
                    <template slot-scope="scope">
                      <el-button-group class="operate">
                        <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-view"
                          @click="historyTestingResult(scope)"
                        />
                      </el-button-group>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-row>
                <!-- 分页栏 -->
                <el-pagination
                  class="pagination"
                  layout="total, sizes, prev, pager, next, jumper"
                  :current-page="testingResultPage.page"
                  :total="testingResultPage.total"
                  :page-sizes="[5, 10, 15, 100]"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </el-row>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="工作场所情况表"
          align="center"
        ><el-table-column
           prop="enterpriseName"
           label="企业名称"
         />
          <el-table-column
            prop="equipment"
            label="防护设备"
          />
          <el-table-column
            prop="name"
            label="场所名称"
          />
          <el-table-column label="是否告知">
            <template slot-scope="scope">
              {{ scope.row.isinform == true ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="workplaceDangers"
            label="工作场所危险有害因素"
          />
          <el-table-column label="是否有效">
            <template slot-scope="scope">
              {{ scope.row.iseffective == true ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
          />
          <el-table-column label="附件" width="80">
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                style="padding-left:20px"
              >
                <el-row>
                  <el-col :span="12">
                    <!-- 合同,单 -->
                    <el-button
                      type="text"
                      @click="handleFileListView(scope.row.contractFiles)"
                    >合同查看</el-button>
                  </el-col>
                  <el-col :span="12">
                    <!-- 设备照片,多 -->
                    <el-button type="text" @click="handleFileListView(scope.row.equipmentPhotoFiles)">设备照片</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <!-- 培训内容,多 -->
                    <el-button type="text" @click="handleFileListView(scope.row.trainingContentFiles)">培训内容</el-button>
                  </el-col>
                  <el-col :span="12">
                    <!-- 场所照片,多 -->
                    <el-button type="text" @click="handleFileListView(scope.row.workplacePhotoFiles)">场所照片</el-button>
                  </el-col>
                </el-row>
                <el-button
                  slot="reference"
                  size="medium"
                  type="text"
                  style="text-align:center"
                  icon="el-icon-search"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button-group class="operate">
                <sun-button :type="'edit'" @click="editWorkplaceForm(scope.$index, scope.row)" />
                <sun-button :type="'delete'" @click="delWorkplaceForm(scope.$index, scope.row)" />
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column label="登记定期检查" :width="GLOBAL.TABLE_CELL_WIDTH.MINI">
            <template slot-scope="scope">
              <el-button-group class="operate">
                <sun-button :type="'add'" @click="addTestingResultForm(scope.row)" />
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column label="历史记录" width="80">
            <template slot-scope="scope">
              <el-button-group class="operate">
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-view"
                  @click="historyWorkplace(scope)"
                />
              </el-button-group>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="workplacePage.page"
          :total="workplacePage.total"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <!-- 2.工作场所 -->
      <el-dialog
        title="工作场所情况"
        :visible.sync="workplaceFormDialog"
        :width="GLOBAL.DIALOG_WIDTH_ZH.MEDIUM"
        @closed="handleDialogClosed('workplaceForm')"
      >
        <el-form
          ref="workplaceForm"
          :rules="workplaceFormRules"
          size="small"
          :label-width="GLOBAL.DIALOG_LABLEWIDTH.FOUR"
          :model="workplaceForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="场所名称" prop="name">
                <el-input v-model="workplaceForm.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="职业健康项目"
                prop="healthProjectId"
                label-width="140px"
              >
                <sun-select v-model="workplaceForm.healthProjectId" :options="projectOptions" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="防护设备" prop="equipment">
                <el-input v-model="workplaceForm.equipment" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否有效" prop="iseffective">
                    <el-radio-group v-model="workplaceForm.iseffective">
                      <el-radio :checked="workplaceForm.iseffective==true" :label="true">是</el-radio>
                      <el-radio :checked="workplaceForm.iseffective==false" :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否告知" prop="isinform">
                    <el-radio-group v-model="workplaceForm.isinform">
                      <el-radio :checked="workplaceForm.isinform==true" :label="true">是</el-radio>
                      <el-radio :checked="workplaceForm.isinform==false" :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="工作场所危险有害因素"
                prop="workplaceDangers"
                :label-width="GLOBAL.DIALOG_LABLEWIDTH.SIX"
              >
                <el-input v-model="workplaceForm.workplaceDangers" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="workplaceForm.remarks" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同" prop="contractFiles">
                <sun-upload
                  ref="UPLOAD"
                  :limit="1"
                  :data="GLOBAL.FILE_TYPE.OTHER"
                  accept=".pdf,.PDF,.txt,.doc"
                  :file-list.sync="workplaceForm.contractFiles"
                  :multiple="true"
                  :btn-loading.sync="btnLoading"
                />

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="设备照片"
                :multiple="true"
                prop="equipmentPhotoFiles"
                :label-width="GLOBAL.DIALOG_LABLEWIDTH.FOUR"
              >
                <sun-upload
                  ref="UPLOAD"
                  :data="GLOBAL.FILE_TYPE.OTHER"
                  :file-list.sync="workplaceForm.equipmentPhotoFiles"
                  :multiple="true"
                  :btn-loading.sync="btnLoading"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="培训内容" prop="trainingContentFiles">
                <sun-upload
                  ref="UPLOAD"
                  :action="GLOBAL.FILE_API"
                  accept=".pdf,.PDF,.txt,.doc"
                  :data="GLOBAL.FILE_TYPE.OTHER"
                  :file-list.sync="workplaceForm.trainingContentFiles"
                  :multiple="true"
                  :btn-loading.sync="btnLoading"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="场所照片"
                prop="workplacePhotoFiles"
                :label-width="GLOBAL.DIALOG_LABLEWIDTH.FOUR"
              >
                <sun-upload
                  ref="UPLOAD"
                  :data="GLOBAL.FILE_TYPE.OTHER"
                  :file-list.sync="workplaceForm.workplacePhotoFiles"
                  :multiple="true"
                  :btn-loading.sync="btnLoading"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button :loading="btnLoading" type="primary" @click="workplaceFormSubmit">确定</el-button>
            <el-button @click="handleDialogClosed('workplaceForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 3.定期检查情况表 -->
      <el-dialog
        title="定期检查情况"
        :visible.sync="testingResultFormDialog"
        :width="GLOBAL.DIALOG_WIDTH_ZH.SMALL"
        @closed="handleDialogClosed('testingResultForm')"
      >
        <el-form
          ref="testingResultForm"
          :rules="testingResultFormRules"
          size="small"
          :label-width="GLOBAL.DIALOG_LABLEWIDTH.SIX"
          :model="testingResultForm"
        >
          <el-form-item label="检测时间" prop="checkDate">
            <el-date-picker
              v-model="testingResultForm.checkDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择年月"
            />
          </el-form-item>
          <el-form-item label="检测结果" prop="checkResult">
            <el-input v-model="testingResultForm.checkResult" type="textarea" />
          </el-form-item>
          <el-form-item label="年检合格证" prop="files">
            <sun-upload
              ref="UPLOAD"
              :data="GLOBAL.FILE_TYPE.OTHER"
              :file-list.sync="testingResultForm.files"
              :multiple="true"
              :btn-loading.sync="btnLoading"
            />
          </el-form-item>
          <el-form-item label="检测评价机构" prop="testingOrganization">
            <el-input v-model="testingResultForm.testingOrganization" type="textarea" />
          </el-form-item>
          <!--  <el-form-item label="工作场所" prop="workplaceId">
            <el-input v-model="testingResultForm.workplaceId" disabled />
          </el-form-item> -->
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="testingResultForm.remarks" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="btnLoading" type="primary" @click="testingResultFormSubmit">确定</el-button>
            <el-button @click="handleDialogClosed('testingResultForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="历史记录-工作场所情况表" :visible.sync="historyWorkplaceDialog" :close-on-click-modal="false" width="72%">
        <el-table ref="table" border :data="historyWorkplaceTable" size="small" stripe>
          <el-table-column
            prop="equipment"
            label="防护设备"
          />
          <el-table-column
            prop="name"
            label="场所名称"
          />
          <!--  <el-table-column
                    prop="healthProjectId"
                    label="职业健康项目编号/id"
                  /> -->
          <el-table-column label="是否告知">
            <template slot-scope="scope">
              {{ scope.row.isinform == true ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="workplaceDangers"
            label="工作场所危险有害因素"
          />
          <el-table-column label="是否有效">
            <template slot-scope="scope">
              {{ scope.row.iseffective == true ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
          />
          <el-table-column label="附件">
            <template slot-scope="scope">
              <el-button-group class="operate">
                <!-- 合同,单 -->
                <el-button type="text" size="mini" icon="el-icon-search" @click="handleFileListView(scope.row.contractFiles)" />
                <!-- 设备照片,多 -->
                <el-button type="text" size="mini" icon="el-icon-search" @click="handleFileListView(scope.row.equipmentPhotoFiles)" />
                <!-- 培训内容,多 -->
                <el-button type="text" size="mini" icon="el-icon-search" @click="handleFileListView(scope.row.trainingContentFiles)" />
                <!-- 场所照片,多 -->
                <el-button type="text" size="mini" icon="el-icon-search" @click="handleFileListView(scope.row.workplacePhotoFiles)" />
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="操作人" />
          <el-table-column prop="updateTime" label="操作时间" />
        </el-table>
      </el-dialog>

      <el-dialog title="历史记录-定期检查情况表" :visible.sync="historyTestingResultDialog" :close-on-click-modal="false" width="72%">
        <el-table ref="table" border :data="historyTestingResultTable" size="small" stripe>
          <el-table-column
            prop="checkDate"
            label="检测时间"
          />
          <el-table-column
            prop="checkResult"
            label="检测结果"
          />
          <el-table-column
            prop="remarks"
            label="备注"
          />
          <el-table-column
            prop="testingOrganization"
            label="检测评价机构"
          />
          <el-table-column prop="operatorName" label="操作人" />
          <el-table-column prop="updateTime" label="操作时间" />
        </el-table>
      </el-dialog>
      <!-- 用于预览上传多张图片的dialog -->
      <pic-dialog :visible.sync="sunViewPics" :pic-list="sunPicList" />
      <!-- 用于预览多文件的dialog -->
      <file-dialog :visible.sync="sunFileVisible" :file-list="sunFileList" />
    </div>
  </div>
</template>

<script>
import { zhClassify } from '@/utils'
import { historyHealthProject,
  testingResultAdd, testingResultDelete, testingResultUpdate, testingResultList, historyTestingResult, workplaceAdd, workplaceDelete, workplaceUpdate, workplaceList, historyWorkplace, getHealthProjectIdList } from '@/api/occupationalHealth/projectOccupationalHealth'
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 12,
        workplaceId: 0
      },
      testingResultPage: { list: [], page: 0, size: 0, total: 0, totalPage: 0 },
      workplacePage: { list: [], page: 0, size: 0, total: 0, totalPage: 0 },
      workplaceForm: {
        // 合同，单个附件
        contract: '',
        contractFiles: [],
        equipment: '',
        // 设备照片，附件
        equipmentPhotoIds: [],
        equipmentPhotoFiles: [],
        // 职业健康项目编号
        healthProjectId: null,
        iseffective: false,
        isinform: false,
        name: '',
        remarks: '',
        // 培训内容附加
        trainingContentIds: [],
        trainingContentFiles: [],
        workplaceDangers: '',
        // 场所照片
        workplacePhotoIds: [],
        workplacePhotoFiles: []
      },
      workplaceFormRules: {
        contractFiles: [{ required: true, message: '合同不能为空', trigger: 'blur' }],
        equipment: [{ required: true, message: '防护设备不能为空', trigger: 'blur' }],
        equipmentPhotoFiles: [{ required: true, message: '防护设备不能为空', trigger: 'blur' }],
        iseffective: [{ required: true, message: '是否有效不能为空', trigger: 'blur' }],
        isinform: [{ required: true, message: '是否告知不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '场所名称不能为空', trigger: 'blur' }],
        trainingContentFiles: [{ required: true, message: '培训内容不能为空', trigger: 'blur' }],
        workplaceDangers: [{ required: true, message: '工作场所危险有害因素不能为空', trigger: 'blur' }],
        workplacePhotoFiles: [{ required: true, message: '场所照片不能为空', trigger: 'blur' }]
      },
      testingResultForm: {
        checkDate: '',
        checkResult: '',
        testingOrganization: '',
        files: [],
        fileIds: [],
        // 工作场所编号
        workplaceId: '',
        remarks: ''
      },
      testingResultFormRules: {
        files: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        checkDate: [{ required: true, message: '检测日期不能为空', trigger: 'blur' }],
        workplaceId: [{ required: true, message: '请选择工作场所', trigger: 'blur' }],
        testingOrganization: [{ required: true, message: '检测评价机构不能为空', trigger: 'blur' }],
        checkResult: [{ required: true, message: '检测结果不能为空', trigger: 'blur' }]
      },
      projectOptions: [],
      // 定期检查
      testingResultListLoading: false,
      testingResultFormDialog: false,
      historyTestingResultTable: false,
      historyTestingResultDialog: false,
      // 工作场所
      workplaceListLoading: false,
      workplaceFormDialog: false,
      historyWorkplaceTable: false,
      historyWorkplaceDialog: false,

      btnLoading: false
    }
  },
  created() {
    this.fetchWorkplace()
    getHealthProjectIdList().then(res => {
      const data = res.data.obj
      this.projectOptions = data.map(item => {
        return {
          label: item.projectName,
          value: item.id
        }
      })
      console.log(this.projectOptions)
    })
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.params.size = val
    },
    handleCurrentChange(val) {
      this.params.size = val
    },
    fetchTestingResult() {
      this.testingResultListLoading = true
      testingResultList(this.params).then(res => {
        this.testingResultListLoading = false
        this.testingResultPage = res.data.obj
      })
    },
    fetchWorkplace() {
      this.workplaceListLoading = true
      workplaceList(this.params).then(res => {
        this.workplacePage = res.data.obj
        // 判断有工作场所才去查询定期检查情况
        // if (this.workplacePage.list.length > 0) {
        //   this.params.workplaceId = this.workplacePage.list[0].id
        //   console.log(this.params)
        //   this.fetchTestingResult()
        // }
        // 清空上一次查询的记录
        // this.testingResultPage = { list: [], page: 0, size: 0, total: 0, totalPage: 0 }

        this.workplaceListLoading = false
      })
    },
    // 工作场所
    delWorkplaceForm(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          workplaceDelete(Object.assign({}, row).id).then(res => {
            this.fetchWorkplace()
          })
        })
    },
    // 定期检查
    delTestingResult(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          testingResultDelete(Object.assign({}, row).id).then(res => {
            this.fetchWorkplace()
            this.fetchTestingResult()
          })
        })
    },
    /*   workplaceClick(row, column, event) {
      console.log('row是' + row)
      console.log(this.params.workplaceId)
      this.fetchTestingResult()
    }, */
    // 折叠面板每次只能展开一行
    expandSelect(row, expandedRows) {
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          this.params.workplaceId = row.id
          // // 打开当前点击的 详情
          that.expands.push(row.id)// 每次push进去的是每行的ID
          this.fetchTestingResult()
        }
      } else {
        that.expands = []// 默认不展开
      }
    },
    // 提交的按钮
    testingResultFormSubmit() {
      this.$refs.testingResultForm.validate((valid) => {
        if (valid) {
          const params = this.depClone(this.testingResultForm)
          // 附件
          params.fileIds = params.files.map(item => {
            return item.fileId
          })
          console.log(params.fileIds)
          this.btnLoading = true
          if (this.handle === '添加') {
            testingResultAdd(params).then(res => {
              this.btnLoading = false
              this.testingResultFormDialog = false
              this.fetchWorkplace()
              this.fetchTestingResult()
            })
          } else if (this.handle === '修改') {
            testingResultUpdate(params).then((res) => {
              this.btnLoading = false
              this.testingResultFormDialog = false
              this.fetchWorkplace()
              this.fetchTestingResult()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    workplaceFormSubmit() {
      this.$refs.workplaceForm.validate((valid) => {
        if (valid) {
          const params = this.depClone(this.workplaceForm)
          console.log(params)
          // 合同，单个附件
          params.contract = params.contractFiles[0].fileId // 签到情况
          // 设备照片，附件
          params.equipmentPhotoIds = params.equipmentPhotoFiles.map(item => {
            return item.fileId
          })
          // 培训内容
          params.trainingContentIds = params.trainingContentFiles.map(item => {
            return item.fileId
          })
          // 场所照片
          params.workplacePhotoIds = params.workplacePhotoFiles.map(item => {
            return item.fileId
          })
          this.btnLoading = true
          if (this.handle === '添加') {
            workplaceAdd(params).then(res => {
              this.btnLoading = false
              this.workplaceFormDialog = false
              this.fetchWorkplace()
            })
          } else if (this.handle === '修改') {
            workplaceUpdate(params).then((res) => {
              this.btnLoading = false
              this.workplaceFormDialog = false
              this.fetchWorkplace()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 打开修改定期检查的窗口
    editTestingResultForm(index, row) {
      this.handle = '修改'
      this.testingResultFormDialog = true
      this.$nextTick(() => {
      // 获得所有数据显示在编辑信息模态框里面;
        this.testingResultForm = Object.assign({}, row)
        this.testingResultForm.workplaceId = row.id
        this.params.workplaceId = row.id
      })
    },
    addTestingResultForm(row) {
      this.handle = '添加'
      // 默认表格为空
      this.testingResultFormDialog = true
      this.$nextTick(() => {
        // 每次打开，重置表单并清除验证
        this.testingResultForm.workplaceId = row.id
        this.params.workplaceId = row.id
      })
    },
    addWorkplaceForm(row) {
      this.handle = '添加'
      // this.workplaceForm.healthProjectId = row.id
      // this.params.healthProjectId = row.id
      this.workplaceFormDialog = true
    },
    editWorkplaceForm(index, row) {
      this.handle = '修改'
      // 获得所有数据显示在编辑信息模态框里面;
      this.workplaceFormDialog = true
      this.$nextTick(() => {
        this.workplaceForm = Object.assign({}, row)
        // this.workplaceForm.healthProjectId = row.id
        // this.params.healthProjectId = row.id
      })
    },
    // 查看历史修改
    history(scope) {
      historyHealthProject(scope.row.id).then((res) => {
        this.historyProjectOccupationalHealthTable = res.data.obj
        this.historyProjectOccupationalHealthTable = this.historyProjectOccupationalHealthTable.map((item) => {
          // 改造修改时间
          item.updateTime = this.parseTime(item.updateTime, '{y}-{m}-{d}')
          return item
        })
        zhClassify(this.historyProjectOccupationalHealthTable, [['职业病危害类别', 'dangerType'], ['项目现处阶段', 'stage']])
        this.historyProjectOccupationalHealthDialog = true
      })
    },
    historyWorkplace(scope) {
      historyWorkplace(scope.row.id).then((res) => {
        this.historyWorkplaceTable = res.data.obj
        this.historyWorkplaceTable = this.historyWorkplaceTable.map((item) => {
          // 改造修改时间
          item.updateTime = this.parseTime(item.updateTime, '{y}-{m}-{d}')
          return item
        })
        this.historyWorkplaceDialog = true
      })
    },
    // 查看历史修改
    historyTestingResult(scope) {
      historyTestingResult(scope.row.id).then((res) => {
        this.historyTestingResultTable = res.data.obj
        this.historyTestingResultTable = this.historyTestingResultTable.map((item) => {
          // 改造修改时间
          item.updateTime = this.parseTime(item.updateTime, '{y}-{m}-{d}')
          return item
        })
        this.historyTestingResultDialog = true
      })
    },
    // 选择一个职业健康项目时刷新数据
    changeOption() {
      this.fetchWorkplace()
    }
  }
}
</script>
