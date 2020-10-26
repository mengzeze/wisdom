<template>
  <div class="version">
    <el-dialog  title="文件版本" :close-on-click-modal="false" :visible.sync="versionIsShow" width="500px"  class="versions_dialog" @close="close">
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
                            <li v-for="(item, index) in docVersionlist" :key="index" class="clearfix version_content_item">
                                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                                <span class="span_sec">{{item.userName}}</span>
                                <span class="span_sec">{{$utils.handleFileSize(item.docSize)}}</span>
                                <span class="span_sec">
                                    <span class="span_sec_return" @click="backEvent(item)">还原</span>
                                    <span class="span_sec_down" @click="loadEvent(item)">下载</span>
                                </span>
                            </li>
                        </el-scrollbar>
                    </div>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="close">取 消</el-button>
                    <el-button size="medium" class="version_upload" @click="openModel">上传新版本</el-button>
            </span>
            <!-- <upload-add-doc :uploadDocAddIsShow="uploadDocAddIsShow" :uploadParamData="uploadParamData" @sendValueToParent="sendValueToParentFn" @docUpload="docUploadFn"></upload-add-doc> -->
            <input type="file" id="fileBtn" style="display:none">
        </el-dialog>
    <!-- <el-input type="file" id="fileBtns" style="display:none;"></el-input> -->
    <upload-add-doc
      :limit="1"
      v-if="addDocs"
      ref="uploadVersion"
      :uploadDocAddIsShow="uploadDocAddIsShows"
      :accpet="accpet"
      :uploadOtherData="uploadDatas"
      :uploadParamData="uploadParamData"
      @sendValueToParent="uploadAddDocCloses"
      @docUpload="docUploads" @docUploadAllsucess="docUploadAllsucess"
    ></upload-add-doc>
  </div>
</template>

<script>
import uploadAddDoc from "@/components/file/uploadAddDoc";
import { wisdom_doc } from "@/pages/common/js/doc.main";
export default {
  name: "version",
  props: [
    "versionIsShow",
    "parentdata",
    "uploadParamData", //上传版本相关数据
    "docVersionlist",
    "stageIsAll"//是否为全部阶段
  ],
  data() {
    return {
      accpet: '',//允许用户上传的文件类型
      otherdata: {
        token: "",
        userId: ""
      },
      // docVersionlist:[],//版本列表
      uploadDocAddIsShows: false,
      addDocs: false,
      projectId: '',
      uploadDatas: {
        parentId: 0
      },
      success_code: "",
      curProData: {
        projectCreatBy: ''//项目创建人
      }//当前项目相关数据
    };
  },
  components: {
    uploadAddDoc
  },
  created() {
  },
  mounted() {
    this.success_code = this.code.codeNum.SUCCESS;
    this.otherdata.token = this.$store.state.loginObject.userToken;
    this.otherdata.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.curProData.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
    this.getTableData()
  },
  methods: {
    //版本返回
    backEvent(item) {
      var _this = this;
      var send_data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        data: {
          docId: item.docId,
          id: item.id,
          updateBy: this.otherdata.userId,
          docSize: item.docSize,
        }
      };
      this.$parent
        .canOperating(
          {
            docId: this.$parent.selectedDoc[0]["id"],
            recovery: this.$parent.permsType["recovery"]
          },
          "recovery"
        )
        .then(res => {
          if (res) {
            this.$post("/doc/project/reBackDocVersion", send_data)
              .then((response)=> {
                if (_this.success_code == response.code) {
                  _this.$message({
                    message: "还原成功",
                    type: "success"
                  });
                  _this.addDocs = false;
                  _this.$emit("queryDoc");
                  _this.$emit("colseModule");
                  _this.$emit("queryDoc");
                  _this.getTableData();
                } else {
                  _this.$message({
                    message: response.msg,
                    type: "error"
                  });
                }
              })
              .catch(function(error) {

              });
          }
        });
    },
    //下载
    loadEvent(item) {
      this.canOperating(
          {
              docId: this.parentdata[0].id
          },
          "download"
      ).then(res => {
          if (res) {
              this.$store.commit("downloadRfs", [
                { name: item.docName, id: item.docRfs,docId: item.docId}
              ]);
          }
      });
    },
    //  判断用户是否有权限进行某一操作
    async canOperating(param, flag) {
        if (this.curProData.projectCreatBy == this.userId) {
            return true;
        } else {
            if (!param) {
                return;
            }
            // this.queryPersonPower();
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
                .then( (response)=> {
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
                .catch(function (error) {

                });
        }
        return data;
    },
    //获取版本列表
    getTableData() {
      var _this = this;
      var send_data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        pageNo: 0,
        pageSize: 10,
        data: {
          docId: this.parentdata[0].docId
          // docId: 238
        }
      };
      this.$post("/doc/project/getDocVersionList", send_data)
        .then((response)=> {
          if (_this.success_code == response.code) {
            _this.docVersionlist = response.data;
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {

        });
    },
    //  上传弹框
    openModel() {
      if(this.stageIsAll){
        this.$message({
            message: "全部阶段下的文件不允许上传新版本",
            type: "warning"
        });
      } else if(this.parentdata[0].lockState != '-1'){
        this.$message({
            message: '文件已锁定，不允许上传新版本',
            type: "warning"
        });
      } else {
         if(rightProPermissionFn(this.projectId,'project_file_upload')){
            if(this.parentdata[0].type == 'doc' || this.parentdata[0].type == 'docx' || this.parentdata[0].type == 'rtf'){
                this.accpet = "doc,docx,rtf";
            } else if(this.parentdata[0].type == 'xls' || this.parentdata[0].type == 'xlsx' || this.parentdata[0].type == 'excel'){
                this.accpet = "xls,xlsx,excel";
            } else {
                this.accpet = this.parentdata[0].type;
            }
            this.$emit("colseModule");
            this.addDocs = true;
            this.uploadDocAddIsShows = true;
            this.uploadDatas.parentId = 0;
          } else {
            this.$message({
                message: '您没有该权限',
                type: "warning"
            });
            return;
          }
      }
    },
    //文件上传
    docUploads(uploadData) {
      let _this = this;
      let data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        data: {
          projId: this.uploadParamData.projId,
          docId: this.parentdata[0].docId,
          //   docType: 0,
          //   parentId: 0,
          docName: uploadData.docName,
          docRfs: uploadData.fileData.rfsId,
          docSize: uploadData.fileData.size,
          updateBy: this.otherdata.userId
        }
      };
      this.$post("/doc/project/addDocVersion", data)
        .then((response)=> {
          if (response.code == _this.success_code) {
            _this.$message({
              type: "success",
              message: response.msg
            });
            // _this.$refs.uploadVersion.uploadComplete();
            _this.addDocs = false;
            // _this.uploadDocAddIsShows = false;
            // _this.$refs.uploadVersion.destroy();
            _this.$emit("queryDoc");
          } else {
            _this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {

        });
    },
    docUploadAllsucess(){
      // this.$message({
      //   type: "success",
      //   message: '上传成功'
      // });
      this.addDocs = false;
      this.uploadDocAddIsShows = false;
      this.$emit("queryDoc");
    },
    // 关闭窗口
    close() {
      this.$emit("colseModule");
    },
    //  关闭上传弹框
    uploadAddDocCloses() {
      this.addDocs = false;
      this.uploadDocAddIsShow = false;
      window.location.reload();
    },
  },
  watch: {}
};
</script>

<style scoped>
/* 版本弹框样式 */
.versions_dialog .el-dialog__header{
    border-bottom:1px solid #DDDDDD;
    text-align: center;
}
.versions_dialog .el-dialog__body{
    padding: 20px 0;
}
.versions_dialog li{
    width:100%;
    line-height: 40px;
    border-bottom:1px solid #e7e7e7;
}
.versions_dialog .span_two{
    float: left;
    width:80px;
}
.versions_dialog .span_first{
    float: left;
    width:190px;
    text-align: left;
    margin-left: 30px;
}
.versions_dialog .el-checkbox{
    width:20px;
    text-align: left;
    float: left;
    margin-right:0
}
.versions_dialog ul li div{
    height:350px;
}
.versions_dialog .span_sec{
    float: left;
    width:85px;
    margin-left: 5px;
}
.span_sec .span_sec_return{
    color: #1A5FA4;
}
.span_sec .span_sec_down{
    color: #1A5FA4;
}
.version_content_item:hover{
    background: #FAFAFA;
}
.versions_dialog .version_upload{
    background: #1A5FA4;
    color: #FFFFFF;
    font-size: 14px;
}
.versions_dialog  .span_check{
    margin-left: 30px;
}
.versions_dialog  .span_btn{
    float: left;
    width:180px;
    text-align: left;
    margin-left: 30px;
}
.span_sec_return:hover{
    text-decoration: underline;
    cursor: pointer;
}
.span_sec_down:hover{
    text-decoration: underline;
    cursor: pointer;
}
/* .version li {
  width: 100%;
  line-height: 40px;
  font-weight: 600;
  border-bottom: 1px solid #e7e7e7;
}
.version .span_two {
  float: left;
  width: 85px;
}
.version .span_first {
  float: left;
  width: 200px;
  text-align: left;
}
.version .el-checkbox {
  width: 20px;
  text-align: left;
  float: left;
  margin-right: 0;
}
.version ul li div {
  height: 350px;
}
.version ul li div li {
  font-weight: 400;
}
.version .span_sec {
  float: left;
  width: 85px;
  height: 40px;
}
.version .span_btn {
  float: left;
  width: 180px;
  text-align: left;
}
.icon_btn {
  cursor: pointer;
} */
</style>
<style lang="scss" type="text/css">
.version {
  .el-dialog__body{
    padding:30px 0;
    .el-dialog__header{
        border-bottom:1px solid #dedede;
    }
  }

}
</style>
