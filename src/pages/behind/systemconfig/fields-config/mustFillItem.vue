<template>
  <div class="must-fill-item">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>字段管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page-title">
        <span>字段管理</span>
    </div>
    <div class="page-cen"></div>
    <div class="content-cont" :style="`height:${boxHeight}px`">
      <p class="content-cont-text">注：关闭后，该字段在表单中将取消必填。</p>
      <div class="content-item" v-for="(item, index) in fieldList" :key="index">
        <div v-if="(item[0].tableId == 2 || item[0].tableId == 3) && $utils.checkSystemPermission('crm_manage') || (item[0].tableId != 2 && item[0].tableId != 3)">
          <p class="item-title stripTag">{{item[0].tableName}}</p>
          <el-switch 
          v-for="(obj, idx) in item" :key="idx" 
          v-model="obj.value"
          :inactive-text="obj.name" 
          @change="updateState(obj)"></el-switch>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
          success_code: "",
          boxHeight: 500,
          fieldList: [],//字段列表
          // idCard: true,
          // jobAddress: true,
          // financeCusType: true,
          // naturalCusType: true,
        }
    },
    created(){
      this.boxHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 190;
    },
    mounted(){
      this.success_code = this.code.codeNum.SUCCESS; 
      this.initData();
    },
    methods: {
      initData() {//初始化数据
          let data = {};
          this.$post('/sys/allField', data).then((response)=> {
              if(this.success_code == response.code) {                    
                  this.fieldList =  response.data;
                  this.fieldList.map((item, index)=>{
                      item.map((obj)=>{
                          obj.value = obj.enableState == 1 ? true : false;
                      })
                  })  
                  console.log('222',this.fieldList)                      
              }                      
          }).catch(function(error) {
              
          });
      },
      updateState(obj) {
          let state = obj.value ? 1 : 0;
          let data = {
              data:{
                  fieldId: obj.fieldId,
                  enableState: state
              }
          }
          this.$post('/sys/updateEnableState', data).then((response)=> {
              if(this.success_code == response.code) {                    
                  this.$message.success(response.msg)   
                  this.initData();                           
              } else {
                  this.$message.error(response.msg)
              }                    
          }).catch(function(error) {
              
          });
      }
    }
}
</script>
<style lang="scss" scoped>
.must-fill-item{
    background: #fff
}
.page-cen{
    height:10px;
    background: #f0f2f5;
}
.el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
}
.page-title{
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin:5px 0 19px;
    padding-left: 10px;
}
.content-cont{
    text-align: left;
    margin-top: 14px;
    // padding-left: 10px;
    // padding-bottom:200px;
    background: #ffffff;
    overflow: hidden;
    .el-switch{
        // margin-right: 8px;
        padding-left: 42px;
    }
}
.content-cont-text{
    padding-left: 10px;
    color: #FF4444;
}
.item-title{
    margin-bottom: 24px;
    padding-left: 22px;
    border-left: 4px solid #0061a9;
    font-size:18px;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.content-item{
    padding-top: 32px;
}
</style>
<style lang="scss">

</style>