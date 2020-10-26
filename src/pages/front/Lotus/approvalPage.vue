<template>
  <div class="manuscriptindex" id="manuscriptindex">
    <div class="manuscriptindex_header">
      <p class="header_break">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>我的审批</el-breadcrumb-item>
          <el-breadcrumb-item>文件审批</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <div>
        <h3 class="header_clearFix">
          <i class="iconfont icon-leftarrow"></i>
          <span class="files">文件审批</span>
        </h3>
      </div>
      <div class="headerinfo">
        <el-button type="primary" @click="Nodeapproval(1,1)" size="small">节点审批</el-button>
        <el-button size="small" v-if="Catalog" @click="Nodeapproval(true,2)" type="primary">切换列表视图</el-button>
        <el-button size="small" v-else @click="Nodeapproval(false,2)" type="primary">切换目录视图</el-button>
      </div>
    </div>
    <div class="manuscriptindex_section">
      <pageComponent :Nodeapprova="Nodeapprova"/>
    </div>
  </div>
</template>
<script>
// import "../../../assets/font_zxbdoitfin/iconfont.css";
import pageComponent from "./pageComponent";
export default {
  components: {
    pageComponent
  },
  data() {
    return {
      Nodeapprova: "",
      Catalog:true,
    };
  },
  methods: {
    getViewPortHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    Nodeapproval(state,te) {
      this.Catalog = !this.Catalog
      this.Nodeapprova = {s:state,e:te}
    }
  }
};
</script>
<style lang="scss" scoped>
.headerinfo {
  float: right;
  margin-top: -41px;
  margin-right: 23px;
}
.files {
  margin-left: 15px;
}
.manuscriptindex {
  width: 100%;
  display: flex;
  flex-direction: column;
  .manuscriptindex_header {
    width: 100%;
    height: 90px;
    margin: auto;
    overflow: hidden;
    background-color: #ffffff;
    text-align: left;
    .header_break {
      height: 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 1%;
      margin-left: 10px;
    }
    div {
      display: flex;
      align-items: center;
      .back_btn {
        margin-left: 5px;
      }
      .header_clearFix {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        margin-top: 16px;
        margin-bottom: 10px;
        font-weight: 600;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .manuscriptindex_section {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
