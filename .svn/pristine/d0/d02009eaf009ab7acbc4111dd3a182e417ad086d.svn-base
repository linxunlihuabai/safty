<template>
  <el-row>
    <el-card class="tips-card">
      <div
        slot="header"
        class="tips-header"
      >
        <span>未提交报表企业{{ dataList.length }}个</span>

        <el-date-picker
          v-model="time"
          :clearable="false"
          type="month"
          placeholder="选择时间"
          @change="fetchList"
        />

      </div>
      <el-row v-loading="contentLoading" class="tips-content">
        <el-col
          v-for="item in dataShow"
          :key="item.id"
          :span="6"
        >
          <el-tag>{{ item.name }}</el-tag>
        </el-col>
      </el-row>
      <div v-if="dataList.length>20" class="more" @click="handleMore">
        <i class="el-icon-d-arrow-right" :class="hidden ? 'hidden':'show'" />
        <span>{{ hidden ? '查看全部':'收起' }}</span>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import { getNotSubmitEnterprises } from '@/api/reportStatistics'

export default {
  props: {
    type: {
      type: Number,
      default: 1701
    },
    reportCategory: {
      type: Number,
      default: 1801
    }
  },
  data() {
    return {
      time: Date.now(),
      dataList: [],
      length: 20,
      contentLoading: true,
      hidden: true,
      checkList: '1802,1803'
    }
  },
  computed: {
    dataShow() {
      return this.dataList.slice(0, this.length)
    }
  },
  methods: {
    fetchList() {
      console.log('调用')
      this.contentLoading = true
      const params = {}
      const date = new Date(this.time)

      // 年份
      params.year = date.getFullYear()

      // 月份
      params.month = date.getMonth() + 1

      // 报表类型
      params.type = this.type

      // 报表类别
      params.reportCategory = this.reportCategory

      // 请求
      getNotSubmitEnterprises(params).then(res => {
        this.dataList = res.data.obj
        this.contentLoading = false
      })
    },
    handleMore() {
      this.length = (this.length > 20 ? 20 : this.dataList.length)

      this.hidden = !this.hidden
    }
  }

}
</script>

<style lang="scss" scoped>
.tips-card {
  /deep/ .el-card__body {
    padding-bottom: 0;
  }
  .tips-header {
    display: flex;
    justify-content: space-between;
    .el-date-editor {
      width: 322px;
    }
  }
  .tips-content {
    min-height: 80px;
    .el-col {
      margin-bottom: 10px;
    }
  }
  .more {
    border-top: 1px solid #eaeefb;
    height: 44px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;

    i {
      line-height: 44px;

      &.show{
        transform: rotate(-90deg);
      }

      &.hidden{
        transform: rotate(90deg);
      }
    }

    &:hover {

        color: #409eff;

    }
  }
}
</style>
