<template>
  <div class="backstage" style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <head-top></head-top>
      </el-header>
      <el-container style="height: calc(100% - 70px);">
        <el-aside width="240px" id="el_aside">
          <el-scrollbar style="height:100%;background: #fff">
            <aside-left></aside-left>
          </el-scrollbar>
        </el-aside>
        <el-main id="el_main">
          <el-scrollbar style="height:100%;overflow-x: hidden">
            <router-view id="main_view"></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
      <!-- <select_box v-if="settate" > -->
    </el-container>
    <all-message></all-message>
    <!-- <el-dialog
      fullscreen
      custom-class="previewDialog"
      :visible="getpreview"
      :before-close="handleClosePreview"
    >
      <div slot="title" class="dialog-footer">
        <div class="preview-title" :title="headTitle">{{headTitle}}</div>
      </div>
      <div class="preview-container">
        <iframe
          :src="pIframeSrc"
          id="frameId"
          scrolling="no"
          width="100%"
          height="100%"
          class="iframe-style"
        ></iframe>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClosePreview">关 闭</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import select_box from "@/components/select_box/select_box";
import headTop from "@/components/backstageheader/backstageheader";
import asideLeft from "@/components/backstageaside/backstageaside";
import allMessage from "@/components/message/allMessage";
const previewBaseUrl = "../../../../static/preview/preview.html?rfsId=";
export default {
  name: "backstage",
  components: {
    headTop,
    asideLeft,
    select_box,
    allMessage
  },
  computed: {
    getUserIcons() {
      return this.$store.state.Management.state;
    },
    getpreview() {
      if (this.$store.state.showPreview) {
        let p = this.$store.state.previewData; // 预览的数据
        let u = this.$store.state.loginObject; // 登录信息
        console.log(1, p);
        this.pIframeSrc =
          previewBaseUrl +
          p.rfsId +
          "&docId=" +
          p.docId +
          "&token=" +
          u.userToken +
          "&userId=" +
          u.userId;
        sessionStorage.sourceType =
          this.$store.state.previewData.sourceType || "";
        this.savePreviewHistory();
      }
      return this.$store.state.showPreview;
    }
  },
  watch: {
    getUserIcons(val) {
      console.log(val);
      if (val == 1) {
        this.settate = true;
      }
    },
    "$store.state.previewData.headTitle": function() {
      this.headTitle = this.$store.state.previewData.headTitle;
    }
  },
  data() {
    return {
      title: "",
      settate: false,
      flag: "false",
      flags: "true",
      token: "",
      pIframeSrc:"",
      userId: "",
      projectId: "",
      headTitle: "预览",
      pIframeSrc: ''
    };
  },
  created() {
    this.headTitle = this.$store.state.previewData.headTitle;
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
  },
  mounted() {
    if (this.$store.state.Management.state == 0) {
      this.settate = false;
    }

    this.title = this.common.commonObjFn();
    // document.getElementById("el_aside").style.height = (this.getViewPortHeight() - 70) + "px";
    // document.getElementById("el_main").style.height = (this.getViewPortHeight() - 70) + "px";
  },
  methods: {
    getViewPortHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    handleClosePreview() {
      this.$store.commit("closePreview");
    },
    savePreviewHistory() {
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          docId: this.$store.state.previewData.docId
          // docVersionRfs:
        }
      };
      this.$post("/doc/paper/previewDocLogRecord", data)
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.el-header {
  padding: 0px;
}
.previewDialog .preview-title {
  width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.previewDialog .el-dialog__body {
  height: calc(100% - 170px);
}
.preview-container {
  height: 100%;
}
.iframe-style {
  border: 1px solid #cccccc;
}
#el_aside,
#el_main {
  overflow: auto;
  overflow-x: hidden;
  -webkit-box-sizing: border-box;
}
</style>
<style>
/* .el-scrollbar__wrap {
        overflow-x: hidden;
    } */
.el_aside {
  background: #fff;
}
</style>
