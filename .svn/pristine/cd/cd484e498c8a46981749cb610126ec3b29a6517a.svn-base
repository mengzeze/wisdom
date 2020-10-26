<template>
  <div  class="form-dynamic">
    <div :class="[formClass]">
      <el-form :model="form" ref="form" class="form-flex">
        <div v-for="(item, index) in form.stkAndTps" :key="index"  class="form-border-sold clear-success">
          <div class="form-border-solid clear-success">
            <!-- type === 'reportMessage' && itemStage == 2 ?  -->
            <el-form-item
              label="证券代码："
              label-width="100px"
              :prop="'stkAndTps.' + index + '.stkCode'"
              :rules="[{ required: itemStage == 2 && true, message: '证券代码不能为空', trigger: 'blur' }]">
              <el-input
                  v-model="item.stkCode"
                  placeholder="请输入证券代码"
                  :disabled="type === 'reportMessage'"
                  @input="item.stkCode = item.stkCode.replace(/[^0-9a-zA-Z.]{0,}$/g,'')"
                  :maxlength="15">
              </el-input>
            </el-form-item>
            <el-form-item
              class="ml-12"
              label="证券简称："
              label-width="130px"
              :prop="'stkAndTps.' + index + '.stkSpName'"
              :rules="[{ required: itemStage == 2 && true, message: '证券简称不能为空', trigger: 'blur' }]">
              <el-input
                  :disabled="type === 'reportMessage'"
                  v-model="item.stkSpName"
                  placeholder="请输入证券简称"
                  :maxlength="20">
              </el-input>
            </el-form-item>
            <!-- type === 'reportMessage' && itemType == 3 ? -->
            <el-form-item
              label="交易场所："
              label-width="100px"
              :prop="'stkAndTps.' + index + '.tpCode'"
              :rules="[{ required: itemType == 3 && true, message: '交易场所不能为空', trigger: 'blur' }]">
              <el-select
                  v-model="item.tpCode"
                  clearable
                  :disabled="type === 'reportMessage'"
                  @change="tradingOption(item, index)"
                  placeholder="请选择交易场所" style="width:217px;">
                  <el-option
                      v-for="trad in tradingPlace"
                      :key="trad.label"
                      :label="trad.label"
                      :value="trad.id">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="ml-12"
              v-show="item.tpCode === '2007' || type === 'reportMessage'"
              label="交易场所名称："
              label-width="130px"
              :rules="[
                { required: item.tpCode == '2007' && true, message: '交易场所名称不能为空', trigger: 'blur' }
              ]">
              <el-input
                  v-model="item.tpName"
                  :disabled="type === 'reportMessage'"
                  placeholder="请输入交易场所名称"
                  :maxlength="30">
              </el-input>
            </el-form-item>
          </div>
          <div class="remove-btn">
            <i
              v-show="index <= form.stkAndTps.length - 1 && form.stkAndTps.length !== 1 && type !== 'reportMessage'"
              @click="removeDomain(item, index)"
              class="el-icon-circle-close btn-icon">
            </i>
            <i
              v-show="index == form.stkAndTps.length - 1 && form.stkAndTps.length <= 29 && type !== 'reportMessage'"
              type="primary"
              @click="addDomain"
              class="el-icon-circle-plus-outline btn-icon">
            </i>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SecurityMessage',
  props: {
    // 区分样式的类型：新建-newMessage  项目信息-projectMessage  报送-reportMessage
    type:{
      type: String,
      default: ''
    },
    // 回显的数据
    stkAndTps:{
      type: Array,
      default: ()=>[{
        stkCode: '', // 证券代码
        stkSpName:'',
        tpCode:'',
        tpName: ''
      }]
    },
    // itemStage--项目阶段类型 1-申报阶段 2-发行完成/终止阶段  3-其他阶段
    itemStage:{
      type: String,
      default: '9'
    },
    // itemType 1-保荐类 2-权益类 3-债券类
    itemType:{
      type: String,
      default: '9'
    }
  },
  data() {
    return {
      tradingPlace: this.report.reportData.tradingPlaces,
      stkCodeRules:[],
      stkSpNameRules:[],
      form:{
        stkAndTps:[{
          stkCode: '', // 证券代码
          stkSpName:'',
          tpCode:'',
          tpName: ''
        }] || stkAndTps
      }

    }
  },
  computed: {
    formClass () {
      return {
        'my-new-message': this.type === 'newMessage',
        'my-project-message': this.type === 'projectMessage',
        'my-report-message': this.type === 'reportMessage'
      }
    },
    'form.stkAndTps'() {
      return this.stkAndTps
    }
  },
  watch: {
     stkAndTps:{
        handler(val, oldVal){
            this.form.stkAndTps = val
        },
        deep:true
    }
    // itemType
  },
  created() {
    this.form.stkAndTps = this.stkAndTps
  },
  mounted() {
  },
  methods: {
    /*增加 最多30个*/
    addDomain () {
      if(this.stkAndTps.length == 30) return
      this.stkAndTps.push({
        stkCode: '', // 证券代码
        stkSpName:'',
        tpCode:'',
        tpName: ''});
    },

    /*删除*/
    removeDomain (item, ind) {
      this.stkAndTps.indexOf(item) !== -1 && this.stkAndTps.splice(ind, 1)
    },

    // 交易场所切换
    tradingOption (item, index){
      item.tpName = ''
      if (item.tpCode === '2007') return
      item.tpName =  item.tpCode ? this.tradingPlace.find(v => v.id === item.tpCode).label : ''
    }
  }
}
</script>

<style scoped lang="scss">
.form-dynamic{
  display: inline-block;
  width: 100%;
}
.my-new-message, .my-project-message,.my-report-message{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  align-items: center;
  width: 100%;
}

.form-border-sold{
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  padding-top: 5px;
  border-radius: 8px;
  flex: 1 1;
  align-items: center;
}
.form-border-solid{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px dashed #c0c4cc;
  text-align: left;
  padding-top: 5px;
  border-radius: 8px;
  flex: 1 1;
}
.my-new-message .form-border-sold{
  display: flex;
  width: 100% !important;
  .el-input {
    min-width: 217px;
  }
}
.my-project-message{
  display: flex;
  max-width: 890px;
}
.my-report-message{
  display: flex;
  margin-left: 43px;
  max-width: 68%;
}
.my-report-message .form-border-sold{
  display: flex;
  justify-content: space-between;
  width: 990px;
  .el-form-item{
    width: 45%;
  }
  .el-input {
    min-width: 220px;
  }
  .ml-12{
    text-align: right;
  }
}
/deep/ {
  .el-form{
    min-width: 97%;
  }
   .el-form-item .is-success .el-input__inner{
    border-color: #0061A9 !important;
  }
  .my-project-message .form-border-sold{
    width: 900px;
    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item__label{
      color: #333333;
    }
  }
  .my-report-message .form-border-solid{
    .el-form-item__content{
      margin-left: 0px !important;
    }
    .el-form-item__label{
      padding-right: 10px;
    }
  }
}
.clear-success {
    /deep/ {
      .el-form-item.is-success .el-input__inner,
      .el-form-item.is-success .el-input__inner:focus,
      .el-form-item.is-success .el-textarea__inner,
      .el-form-item.is-success .el-textarea__inner:focus,
      .el-message-box__input input.invalid,
      .el-message-box__input input.invalid:focus {
          border-color:#DCDFE6;
      }
    }
}
.my-project-message .form-border-solid{
  display: flex;
  justify-content: space-between;
  width: 830px;
  .el-input,.el-select {
    min-width: 240px;
    margin-left: 10px;
  }
}
.remove-btn{
  margin: 0 10px;
  flex: 0 1;
  .btn-icon{
    font-size: 18px;
    cursor: pointer;
    margin-bottom: 12px;
  }
  .btn-icon:hover{
    color: #0061a9;
  }
  .el-icon-circle-plus-outline{
    color: #0061a9;
  }
}
.ml-12{
  margin-left: 14px;
}

</style>

