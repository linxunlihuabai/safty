<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

import { getPlanExpenses } from '@/api/workbench/chart'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      seriesData: [],
      legendNames: [],
      chart: null
    }
  },
  mounted() {
    this.fetchList()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchList() {
      getPlanExpenses().then(res => {
        const data = res.data.obj
        this.seriesData = data.filter(item => {
          return item.value > 0
        })
        if (this.seriesData.length < data.length) {
          this.seriesData.push({ name: '其他', value: 0 })
        }
        this.legendNames = this.seriesData.map((item) => {
          return item.name
        })
        console.log(this.seriesData, this.legendNames)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '安全费用',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.legendNames
        },
        series: [
          {
            name: '费用来源',
            type: 'pie',
            radius: '50%',
            label: {
              formatter: '{b} : \n({d}%)'
            },
            center: ['48%', '65%'],
            data: this.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
