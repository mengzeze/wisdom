<template>
  <el-form 
    class="form__box"
    :inline="true"  
    label-width="80px"
     @keydown.enter.native="enter"
    label-position="right">
    <el-form-item 
      v-for="(item,idx) in data" 
      :key="idx" 
      :prop="item.key" 
      :label="`${item.label}:`">
      <!-- 输入框 -->
      <el-input 
        class="form__item-input"
        v-if="item.type==='input'" 
        v-model="input[item.key]" 
        :maxlength="50"
        :placeholder="`请输入${item.label}`">
      </el-input>
      <template v-if="item.type === 'dialog'">
        <el-input class="form__item-input" v-model="dialog[item.key]"  :placeholder="`请选择${item.label}`" disabled></el-input>
        <el-button  @click="$emit('dialog',item)" type="primary" style="margin-left:-4px; margin-bottom:3px;">选择</el-button>
      </template>
      <!-- 下拉框 -->
      <el-select
        clearable
        class="form__item-select"
        v-if="item.type==='select'" 
        v-model="select[item.key]" 
        :placeholder="`请选择${item.label}`"
      >
        <el-option 
          v-for="(oItem,oIdx) in options[item.key]" 
          :key="oIdx"
          :label="oItem.label"
          :value="oItem.id">
        </el-option>
      </el-select>
      <!-- 下拉框 -->
      <el-select
        clearable
        class="form__item-select"
        v-if="item.type==='groupSelect'" 
        v-model="groupSelect[item.key]" 
        :placeholder="`请选择${item.label}`"
      >
        <el-option-group
          v-for="(oItem,oIdx) in options[item.key]" 
          :key="oIdx"
          :label="oItem.label">
          <el-option 
            v-for="(cItem,cIdx) in oItem.option" 
            :key="cIdx"
            :label="cItem.label"
            :value="cItem.id">
          </el-option>
        </el-option-group>
      </el-select>
      <el-date-picker
        v-if="item.type==='date'"
        class="form__date-center"
        v-model="date[item.key]"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot :data="Object.assign({},input,select,date,dialogData,groupSelect)" ></slot>
    </el-form-item>
  </el-form>
</template>
<script>
import {selectOptions} from '../data/data.js'
export default {
  name:'report-list',
  props:{
    data:{
      type:Array,
      default:()=>({})
    }
  },
  data(){
    return {
      options:selectOptions,
      title:'报送列表',
      groupSelect:{},
      dialogData:{},
      dialog:{},
      select:{},
      input:{},
      date:{},
      show:true,
    }
  },
  created(){
    this.init(this.data,this)
  },
  watch:{
    date:{
      handler(params){
        this.dateSwitch(params)
      },
      deep:true
    }
  },
  methods:{
    init(data,obj){
      data.forEach(x=>this.$set(obj[x.type],x.key,''))
    },
    enter(){
      this.$emit('enter',{ data:{...this.input,...this.select,...this.date,...this.dialogData,...this.groupSelect} })
    },
    reset(arr,def){
      arr.forEach(x=>{
        Object.keys(x).forEach(y=>{
          x[y] = def
        })
      })
    },
    resetFields(formName){
      this.reset([this.input,this.select,this.date,this.dialog,this.groupSelect],'');
      this.reset([this.dialogData],[]);
      return {...this.input,...this.select,...this.groupSelect,...this.dialogData,...this.date}
    },
    setDialog(data,params){
      this.dialog[data.key] = params.map(x=>x.name).join(',')
      this.dialogData[data.key] = params.map(x=>x.id)
    },
    dateSwitch(params){
      let arr = Object.keys(params)
      arr.forEach(x=>{
        if(params[x][1] && params[x][1].includes('00:00:00')){
          params[x][1] = params[x][1].replace('00:00:00','23:59:59')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form__box{
  text-align: left;
  /deep/ {
    .form__date-center{
      input{
        text-align:left;
        padding-left:10px;
      }
    }
    .form__item-input,.form__item-select{
      &.el-input{
        width: 196px;
      }
      .el-input{
        width: 196px;
      }
    }
  }
}
</style>
