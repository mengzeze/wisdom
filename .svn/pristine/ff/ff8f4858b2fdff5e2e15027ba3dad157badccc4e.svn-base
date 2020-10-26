<template>
  <div class="projecjournal">
    <div class="header-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目日志</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="flex a-center j-spaceBetween">
        <div class="flex a-center company-wrap">
          <i class="project-company iconfont jianzhu color-primary"></i>
          <span class="company-name ellipsis1 ml-3">{{projectMsg.name}}</span>
        </div>
        <div class="flex a-center header-btn-wrap">
          <el-button
            v-if="$utils.checkProjectPermission('project_add_log')"
            icon="el-icon-circle-plus-outline"
            type="primary"
            @click="mengbx"
          >新建日志</el-button>
        </div>
      </div>
    </div>
      <!-- 页面组件 -->
      <mydiary-comment :mydiaryType="2" ref="mychild"></mydiary-comment>
      <!-- 新建日志的组件 -->
     <new-log-message
        :logType="2"
        :dialogVisible.sync="dialogVisible"
        @newLogMessageReturn="searchFn"
    ></new-log-message>

  </div>
</template>

<script>

// 新建日志组件
import newLogMessage from "@/components/select_box/newLogMessage";
// 公用模块组件
import mydiaryComment from "@/pages/front/maindesk/mydiary/mydiaryComment";
export default {
  name: "projecjournal",
  components: {
    newLogMessage,
    mydiaryComment
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
    this.voteprojId = this.$store.state.voteprojId;
  },
  data() {
    return {
      token: "",
      userId: "",
      projectId: "", //项目id"
      dialogVisible: false // 新建日志弹框
    };
  },
  computed: {},
  mounted() {
    this.searchFn()
  },
  beforeDestroy() {
  },
  methods: {
    searchFn () {
      this.$refs.mychild.parentHandleclick()
    },
    //新建日志
    mengbx() {
      // 项目状态判断 已终止状态不可操作
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      this.dialogVisible = true;
    },
  }
};
</script>

<style scoped lang="scss" type="text/css">
.projecjournal {
  padding: 0px 0px;
  width: 100%;
  clear: both;
  overflow: hidden;
 .el-breadcrumb{
   line-height: 26px;
 }
}
</style>

