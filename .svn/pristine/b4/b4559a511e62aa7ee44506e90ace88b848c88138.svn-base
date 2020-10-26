<template>
  <div class="projecexamine">
    <div class="header-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目审批</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex a-center j-spaceBetween">
        <div class="flex a-center company-wrap">
          <i class="project-company iconfont jianzhu color-primary"></i>
          <span class="company-name ellipsis1 ml-3">{{projectMsg.name}}</span>
        </div>
      </div>
    </div>
    <!-- 页面组件 -->
    <div class="projecexamine-content">
        <business-process path="projectexamine" @operate="handleOperate" :abc="abc"></business-process>
    </div>
    <business-approve ></business-approve>
  </div>
</template>  

<script>
import businessApprove from "@/components/approve/approve";


export default {
  name: "projecexamine",
  created(){
    // this.token = this.$store.state.loginObject.userToken;
    // this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
    // this.projectMsg = this.$store.state.projectMsg.projectMsg;
    // this.voteprojId = this.$store.state.voteprojId;
    this.$Business.processStore({
        finaTypeName:this.projectMsg.financingName || '',
        finaTypeId:this.projectMsg.financingId || '',
        procTypeId:this.projectMsg.procTypeId || '',
        progStageId:this.projectMsg.currentStageId || '',
        projectName:this.projectMsg.name || '',
        projectId:this.projectMsg.id || '',
        code:this.projectMsg.code || ''
    })
  },
  components:{
      businessApprove
  },
  data() {
    return {
        token: "",
        userId: "",
        projectId: "", //项目id"
        dialogVisible: false, // 新建日志弹框
        projectMsg:{},
        project:{},
         abc:{
                name:"项目审批"
            }
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
      handleOperate(res){
          this.$Mit.approve.params = res
      }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.projecexamine{
    padding: 0px 0px;
    width: 100%;
    clear: both;
    overflow: hidden;
    .project-company{
        // width: 32px !important;
        // height: 32px !important;
        // font-size:32px !important;
    }
    .j-spaceBetween{
        margin-top:10px;
    }
    .company-name{
        font-size:14px;
        // margin-left:21px;
    }
    .el-breadcrumb{
        line-height: 26px;
    }
    &-content{
        height: calc(100vh - 164px);
        margin-top:10px;
    }
}
</style>

