<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="uploadFormRules"
        label-width="110px"
        size="small"
      >
        <el-form-item label="事故名称" prop="title">
          <el-input v-model="uploadForm.title" class="zhou-input" />
        </el-form-item>
        <el-row>
          <el-col :span="7">
            <el-form-item label="发生时间" prop="time">
              <el-date-picker
                v-model="uploadForm.time"
                value-format="yyyy-MM-dd"
                style="width:300px;"
                :picker-options="pickerOptions"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="统计年份" prop="year">
              <el-date-picker
                v-model="uploadForm.year"
                type="year"
                value-format="yyyy"
                :picker-options="pickerOptions"
                placeholder="选择年"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="轻伤人数" prop="minorInjuries">
              <el-input-number
                v-model="uploadForm.minorInjuries"
                :min="0"
                :max="1000"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="重伤人数" prop="seriousInjuries">
              <el-input-number
                v-model="uploadForm.seriousInjuries"
                :min="0"
                :max="1000"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="死亡人数" prop="deathToll">
              <el-input-number
                v-model="uploadForm.deathToll"
                :min="0"
                :max="1000"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="type" label="是否工伤" prop="industrialInjury">
          <el-radio-group v-model="uploadForm.industrialInjury" @change="industrialInjuryChange">
            <el-radio :checked="uploadForm.industrialInjury==true" :label="true">是</el-radio>
            <el-radio :checked="uploadForm.industrialInjury==false" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="type" v-show="industrialInjuryShow">
          <el-row>
            <el-col :span="12">
              <el-form-item label="工伤" prop="injurySummaryId">
                <sun-select
                  v-model="uploadForm.injurySummaryId"
                  placeholder="请选择对应工伤"
                  :options="industrialInjuryOptions"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年月" prop="yyyymm">
                <el-date-picker
                  v-model="uploadForm.yyyymm"
                  type="month"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  placeholder="选择年月"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="受伤等级" prop="injurieLevel">
                <el-input v-model="uploadForm.injurieLevel">
                  <template slot="append">级</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="工伤人数" prop="injurieNumber">
                <el-input-number
                  v-model="uploadForm.injurieNumber"
                  :min="0"
                  :max="1000"
                  size="small"
                />
              </el-form-item></el-col>
          </el-row>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="uploadForm.remarks" type="textarea" />
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="直接经济损失" prop="directLosses" required>
              <el-input v-model="uploadForm.directLosses" class="zhou-input">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="间接经济损失" prop="indirectLosses" required>
              <el-input v-model="uploadForm.indirectLosses" class="zhou-input">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="受伤原因" prop="injurieReason">
          <el-input v-model="uploadForm.injurieReason" type="textarea" />
        </el-form-item>
        <el-form-item label="事故原因" prop="reason">
          <el-input
            v-model="uploadForm.reason"
            class="zhou-input"
            type="textarea"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="accidentReportFormSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAccidents } from '@/api/accidentReport/accidentReport' // 获取项目列表API
import { accidentsAdd, accidentsUpdate } from '@/api/accidentReport/accidentReport'
import { isNumber } from '@/utils/regList'
export default {
  data() {
    const isNumberValidatore = (rule, value, callback) => {
      console.log(value)
      isNumber(rule, value, callback)
    }
    return {
      pickerOptions: {
        // 限制选择时间不让选择今天以前的
        disabledDate(time) {
          return time.getTime() > Date.now()
          // return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          // 24 * 60 * 60 * 1000减去当前的时间
          // return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      uploadForm: {
        title: '',
        time: '',
        reason: '',
        minorInjuries: '',
        seriousInjuries: '',
        deathToll: '',
        directLosses: '',
        indirectLosses: '',
        year: '',
        handlingOfRelevantResponsiblePerson: '',
        industrialInjury: false,
        newInjury: {
          injurySummaryId: '',
          injurieLevel: 0,
          injurieNumber: 0,
          injurieReason: '',
          remarks: '',
          yyyymm: ''
        },
        injurySummaryId: '',
        injurieLevel: 0,
        injurieNumber: 0,
        injurieReason: '',
        remarks: '',
        yyyymm: ''
      },
      uploadFormRules: {
        injurySummaryId: [{ required: true, message: '工伤不能为空', trigger: 'blur' }],
        injurieLevel: [{ required: true, message: '受伤等级不能为空', trigger: 'blur' }],
        yyyymm: [{ required: true, message: '年月不能为空', trigger: 'blur' }],
        injurieNumber: [{ required: true, message: '工伤人数不能为空', trigger: 'blur' }],
        injurieReason: [{ required: true, message: '工伤原因不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '事故名称不能为空', trigger: 'blur' }],
        year: [{ required: true, message: '统计年份不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '发生时间不能为空', trigger: 'blur' }],
        reason: [{ required: true, message: '事故原因不能为空', trigger: 'blur' }],
        minorInjuries: [{ required: true, message: '轻伤人数不能为空', trigger: 'blur' }],
        seriousInjuries: [{ required: true, message: '重伤人数不能为空', trigger: 'blur' }],
        deathToll: [{ required: true, message: '死亡人数不能为空', trigger: 'blur' }],
        directLosses: [{ validator: isNumberValidatore, trigger: 'blur' }, { validator: isNumberValidatore, trigger: 'change' }],
        indirectLosses: [{ validator: isNumberValidatore, trigger: 'blur' }, { validator: isNumberValidatore, trigger: 'change' }],
        handlingOfRelevantResponsiblePerson: [{ required: true, message: '相关责任人处理情况不能为空', trigger: 'blur' }],
        industrialInjury: [{ required: true, message: '工伤选择不能为空', trigger: 'blur' }]
      },
      industrialInjuryOptions: [],
      uploadDialog: false,
      btnLoading: false,
      industrialInjuryShow: false,
      type: true
    }
  },
  created() {
    getAccidents().then(res => {
      const data = res.data.obj
      this.industrialInjuryOptions = data.map(item => {
        return {
          label: item.label,
          value: item.value
        }
      })
      console.log(this.industrialInjuryOptions)
    })
  },
  mounted() {
    const params = this.$route.params
    this.handle = params.handle
    if (this.handle === '修改') {
      this.uploadForm = params.row
      this.uploadForm.year = this.uploadForm.year + ''
      this.type = false
    } else {
      this.handle = '添加'
    }
  },
  methods: {
    accidentReportFormSubmit() {
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          this.uploadForm.injurySummaryId = this.uploadForm.newInjury.injurySummaryId
          this.uploadForm.injurieLevel = this.uploadForm.newInjury.injurieLevel
          this.uploadForm.injurieNumber = this.uploadForm.newInjury.injurieNumber
          this.uploadForm.injurieReason = this.uploadForm.newInjury.injurieReason
          this.uploadForm.remarks = this.uploadForm.newInjury.remarks
          this.uploadForm.yyyymm = this.uploadForm.newInjury.yyyymm
          this.uploadForm.btnLoading = true
          if (this.handle === '添加') {
            accidentsAdd(this.uploadForm).then(res => {
              this.btnLoading = false
              if (res.data.status === 200) {
                this.$router.push('/accidentReport/accidentReport')
              }
            })
          } else if (this.handle === '修改') {
            accidentsUpdate(this.uploadForm).then((res) => {
              this.btnLoading = false
              // this.$router.push('/accidentReport/accidentReport')
              if (res.data.status === 200) {
                this.$router.push('/accidentReport/accidentReport')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    industrialInjuryChange() {
      if (this.uploadForm.industrialInjury) {
        this.industrialInjuryShow = true
      } else {
        this.industrialInjuryShow = false
      }
    }
  }
}
</script>

<style>
.zhou-input{
width: 100%;
}
.el-input--small,.el-select--small,.el-input-number--small{
  width:100%;
}
</style>
