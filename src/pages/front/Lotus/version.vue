<template>
  <div class="version">
    <el-dialog
      title="文件版本"
      :close-on-click-modal="false"
      :visible.sync="versionIsShowindo"
      width="500px"
      class="versions_dialog"
    >
      <div>
        <ul>
          <li class="clearfix" style="background:#FAFAFA;">
            <span class="span_first">当前版本</span>
            <span class="span_two">生成人</span>
            <span class="span_two">大小</span>
            <span class="span_two">操作</span>
          </li>
          <div style="height:250px;">
            <el-scrollbar style="height:100%">
              <li
                v-for="(item, index) in versionsData"
                :key="index"
                class="clearfix version_content_item"
              >
                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                <span class="span_sec clinc">{{item.userName}}</span>
                <span class="span_sec">{{renderSize(item.docSize)}}</span>
                <span class="span_sec">
                  <span class="el-icon-download color-primary-hover" style="cursor: pointer;"  @click="loadEvent(item)"></span>
                </span>
              </li>
            </el-scrollbar>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="versionIsShowindo = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "version",
  props: ["versionIsShow", "versionsData"],
  data() {
    return {
      versionIsShowindo:false,
      otherdata: {
        token: "",
        userId: ""
      },
      docVersionlist: [],
      uploadDocAddIsShows: false,
      addDocs: false,
      projectId: "",
      uploadDatas: {
        parentId: 0
      },
      success_code: ""
    };
  },
  watch: {
    versionIsShow(val) {
      this.versionIsShowindo = val
    },
    versionIsShowindo(val){
       this.$emit("versionIs", val);
    }
  },
  mounted() {
    this.otherdata.token = this.$store.state.loginObject.userToken;
    this.otherdata.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.getTableData();
  },
  methods: {
    //下载
    renderSize(value) {
      //过滤处理文件大小
      return this.$utils.handleFileSize(value);
    },
    loadEvent(item) {
      this.$store.commit("downloadRfs", [
        { name: item.docName, id: item.docRfs, docId: item.docId }
      ]);
    },
    //  判断用户是否有权限进行某一操作
    async canOperating(param, flag) {
      if (this.curProData.projectCreatBy == this.userId) {
        return true;
      } else {
        if (!param) {
          return;
        }
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          data: {
            ids: param.docId,
            key: flag,
            docSource: 0
          }
        };
        var data = await _this
          .$post("/doc/paper/validateFilePermByUserId", send_data)
          .then(response => {
            if (_this.success_code == response.code) {
              if (!response.data) {
                _this.$message({
                  message: "您没有该操作权限，请联系项目管理人员配置权限",
                  type: "error"
                });
                return false;
              } else {
                return true;
              }
            } else {
              _this.$message({
                message: "您没有该操作权限，请联系项目管理人员配置权限",
                type: "error"
              });
              return false;
            }
          })
          .catch(function(error) {});
      }
      return data;
    },
    //获取版本列表
    getTableData() {
      return;
      var _this = this;
      var send_data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        pageNo: 0,
        pageSize: 10,
        data: {
          //   docId: this.parentdata[0].docId
        }
      };
      this.$post("/doc/project/getDocVersionList", send_data)
        .then(response => {
          if (_this.success_code == response.code) {
            _this.docVersionlist = response.data;
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped>
/* 版本弹框样式 */
.clinc{
    display: inline-block;
    width:200px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.versions_dialog .el-dialog__header {
  border-bottom: 1px solid #dddddd;
  text-align: center;
}
.versions_dialog .el-dialog__body {
  padding: 20px 0;
}
.versions_dialog li {
  width: 100%;
  line-height: 40px;
  border-bottom: 1px solid #e7e7e7;
}
.versions_dialog .span_two {
  float: left;
  width: 80px;
}
.versions_dialog .span_first {
  float: left;
  width: 190px;
  text-align: left;
  margin-left: 30px;
}
.versions_dialog .el-checkbox {
  width: 20px;
  text-align: left;
  float: left;
  margin-right: 0;
}
.versions_dialog ul li div {
  height: 350px;
}
.versions_dialog .span_sec {
  float: left;
  width: 85px;
  margin-left: 5px;
}
.span_sec .span_sec_return {
  color: #1a5fa4;
}
.span_sec .span_sec_down {
  color: #1a5fa4;
}
.version_content_item:hover {
  background: #fafafa;
}
.versions_dialog .version_upload {
  background: #1a5fa4;
  color: #ffffff;
  font-size: 14px;
}
.versions_dialog .span_check {
  margin-left: 30px;
}
.versions_dialog .span_btn {
  float: left;
  width: 180px;
  text-align: left;
  margin-left: 30px;
}
.span_sec_return:hover {
  text-decoration: underline;
  cursor: pointer;
}
.span_sec_down:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
<style lang="scss" type="text/css">
.version {
  .el-dialog__body {
    padding: 30px 0;
    .el-dialog__header {
      border-bottom: 1px solid #dedede;
    }
  }
}
</style>
