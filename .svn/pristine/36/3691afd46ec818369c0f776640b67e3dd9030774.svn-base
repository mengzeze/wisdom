<template>
  <div>
    <el-date-picker
      @focus="$utils.handleTimeFocus"
      @change="handleStartChange"
      :value-format="format"
      v-model="start"
      type="date"
      :picker-options="pickerStart"
      :style="{width:Number(width)+ 'px'}"
      placeholder="开始日期">
    </el-date-picker>
    <span class="query-date-mid">至</span>
    <el-date-picker
      @focus="$utils.handleTimeFocus"
      @change="handleEndChange"
      :value-format="format"
      v-model="end"
      type="date"
      :picker-options="pickerEnd"
      :style="{width:Number(width)+ 'px'}"
      placeholder="结束日期">
    </el-date-picker>
  </div>

</template>

<script>
export default {
  name: 'DateRange',
  props: {
    dateStart: [String, Date],
    dateEnd: [String, Date],
    format: [String],
    options: [Object],
    width: {
      default: 210
    }
  },
  watch:{
    dateStart(val){
      this.start = val
    },
    dateEnd(val){
      this.end = val
    }
  },
  data () {
    return {
      start: this.dateStart,
      end: this.dateEnd,
      pickerStart: { // 开始日期 开始日期不能大于结束日期
        disabledDate: (time) => {
          if(this.options && this.options.key==='task'){
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          }
          // let isBforeToday = time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          // let isBforeEnd = true
          // if (!this.end) { // 没有结束日期
          //   isBforeEnd = false
          // } else {
          //   let endDateVal = this.end.substr(0, 10) + ' 00:00:00'
          //   isBforeEnd = time.getTime() > new Date(endDateVal).getTime()
          // }
          // return isBforeToday || isBforeEnd
        }
      },
      pickerEnd: { // 结束日期 结束日期不能小于开始日期
        disabledDate: (time) => {
          if (!this.start) {
            return false
          }
          let beginDateVal = (this.start.substr(0, 10) + ' 00:00:00').replace(/-/g, '/')
          return !(time.getTime() + 1 > new Date(beginDateVal).getTime())
        }
      }
    }
  },
  methods: {
    handleStartChange (val) {
      if(val == null){
          this.$emit('update:date-start', '')
          return
      }
      let time = val.replace(/-/g, '/')
      if(!this.end){
        this.$emit('update:date-start', val)
        return
      }
      let endDateVal = (this.end.substr(0, 10) + ' 00:00:00').replace(/-/g, '/')
      if(new Date(time).getTime() > new Date(endDateVal).getTime()){
        this.end =''
        this.$emit('update:date-end', this.end)
      }
      this.$emit('update:date-start', val)

    },
    handleEndChange (val) {
      if(val == null){
        this.$emit('update:date-end', '')
        return
      }
      let time = val.replace(/-/g, '/')
      if(!this.start) {
        this.$emit('update:date-end', val)
        return
      }
      let beginDateVal = (this.start.substr(0, 10) + ' 00:00:00').replace(/-/g, '/')
      if(!(new Date(time).getTime() + 1 > new Date(beginDateVal).getTime())) {
        this.start = ''
        this.$emit('update:date-start', this.start)
      } else {
        this.$emit('update:date-end', val)
      }
    }
  }

}
</script>

<style scoped>
  .query-date-short {
    cursor: pointer;
  }
  .query-date-short:hover {
    color: #66b1ff;
  }
  .active-week,.active-month {
    color: #66b1ff;
  }
  .query-date-input{
    width:180px;
  }

</style>
