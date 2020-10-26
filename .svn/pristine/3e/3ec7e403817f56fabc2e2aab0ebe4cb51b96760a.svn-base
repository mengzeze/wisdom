<template>
  <div class="projecjournal">
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
        <el-breadcrumb-item>我的日志</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="finance_tit">
        <span>我的日志</span>
        <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="mengbx">新建日志</el-button>
      </el-row>
    </div>
      <!-- 页面组件 -->
      <mydiary-comment :mydiaryType="1" ref="mychild"></mydiary-comment>
      <!-- 新建日志的组件 -->
     <new-log-message
        :logType="1"
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
  name: "mydiary",
  components: {
    newLogMessage,
    mydiaryComment
  },
  data () {
    return {
      token: "",
      userId: "",
      projectId: "", //项目id"
      dialogVisible: false
    };
  },
  created () {},
  mounted () {},
  methods: {
    // 查询所有日志
    searchFn () {
      this.$refs.mychild.parentHandleclick()
    },
    //新建日志
    mengbx () {
      this.dialogVisible = true;
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss" type="text/css">
.projecjournal {
  padding: 0px 0px;
  width: 100%;
  clear: both;
  overflow: hidden;
}
.riheader {
  width: 100%;
  padding: 0 15px;
  padding-bottom: 5px;
  background: rgba(255, 255, 255, 1);
}
.el-breadcrumb {
  line-height: 40px;
}
.finance_tit {
  position: relative;
  padding: 15px 5px;
  span {
    color: #333;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    left: 0px;
    bottom: 4px;
    font-weight: bold;
  }
  .el-button {
    padding-bottom: 10px;
    position: absolute;
    right: 25px;
    bottom: 4px;
    z-index: 10;
  }
}
</style>

