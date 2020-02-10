<template>
  <el-select v-model="selectVal" :disabled="disabled" :multiple="multiple" :placeholder="placeholder">
    <el-option
      v-for="item in selectOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: null,
      default: null
    },
    module: {
      type: String,
      default: null
    },
    options: {
      type: [Array, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itemDisabled: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selectVal: this.value
    }
  },
  computed: {
    ...mapGetters([
      'classify_options'
    ]),
    selectOptions() {
      let data
      if (this.options) {
        data = this.depClone(this.options)
      } else {
        data = this.depClone(this.classify_options[this.module])
      }
      if (this.itemDisabled && this.itemDisabled.length > 0) {
        for (const key in data) {
          if (this.itemDisabled.indexOf(data[key].value) > -1) {
            data[key].disabled = true
          }
        }
      }
      console.log(this.selectVal, data)
      return data
    }
  },
  watch: {
    value(val) {
      // if (this.multiple) {
      //   this.selectVal = val
      // } else {
      //   if (val === '' || val === null) {
      //     this.selectVal = val
      //   } else {
      //     this.selectVal = Number(val)
      //   }
      // }
      this.selectVal = val
    },
    selectVal(val) {
      // this.$emit('update:value', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style>

</style>
