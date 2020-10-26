<template>
  <div class="projecjournal">
    <div class="surveyTool" style="width: 463px;    margin-top: 3px;">
      <p class="addHref">
        <add-attachment ref="attachment"
                        :onlyLocal="true"
                        @select="handleUploadComplete"
        ></add-attachment>
      </p>
      <ul class="surveyDetail" style="height:390px">
        <el-scrollbar style="height:100%">
          <div style="width: 100%;margin-top: 1%;" v-for="item in listdatasss">
            <span
              v-if="item.delFlag == 1"
              style="text-decoration:line-through;float: left;padding-left: 11px;cursor:pointer;width: 200px;
              height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap"
            >{{item.docName}}</span>
            <span
              style="float: left;padding-top: 2%;padding-left: 11px;cursor:pointer;width: 200px;
              height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap"
              @click="Flags(item)"
              v-else
            >
              <a src="javascript:void(0);" :title="item.docName">{{item.docName}}</a>
            </span>
            <div style="float: right;padding-right: 16px;" v-if="item.delFlag != 1">
              <span @click="delects(item)">
                <el-button type="text">删除</el-button>
              </span>
              <span @click="updata(item)">
                <el-button type="text">下载</el-button>
              </span>
            </div>
            <div style="clear: both;"></div>
          </div>
        </el-scrollbar>
      </ul>
    </div>
    <add_boxs class="listrytd" v-if="flag" :peodatas="peodatas" v-on:statesbox="statesbox_list"></add_boxs>
    <upload-add-doc
      v-if="addDoc"
      ref="uploadRef"
      :uploadDocAddIsShow="uploadDocAddIsShow"
      @sendValueToParent="sendValueToParentFn"
      @docUpload="docUploadFn"
      @docUploadAllsucess="docUploadAllsucess"
      :uploadParamData="uploadParamData"
    ></upload-add-doc>
    <relation-Add-Doc v-if="relafag" @clearstate="clears" @elationUp="elationUpFn"></relation-Add-Doc>
    <input type="file" id="fileBtn" style="display:none" />
  </div>
</template>

<script>
import uploadAddDoc from "@/components/file/uploadAddDoc";
import relationAddDoc from "@/components/relation/relation";
import { wisdom_doc } from "@/pages/common/js/doc.main";
import { createDiffieHellman } from "crypto";
import { constants } from "fs";
export default {
  name: "projecjournal",
  props: ["mbid"],
  data() {
    return {
      token: "",
      userId: "",
      listdatasss: [],
      projectId: 1, //项目id"
      joumaltype: "",
      activeName: "first",
      dialogVisible: false, //弹框
      peodatas: [], //联系人
      deployObj: [], //添加抄送人员
      flag: false, //插件控制
      ri_data: {
        type: "", //日志类型（1:日报/2:周报/3:月报）
        content: "", //日志内容",
        userIds: [], //抄送人员id集合
        docIds: [] //附件id集
      },

      // 默认头像
      hea_img: "user.png",
      options: [
        {
          value: "1",
          label: "日报"
        },
        {
          value: "2",
          label: "周报"
        },
        {
          value: "3",
          label: "月报"
        }
      ],
      desc: "",
      //上传控制
      uploadDocAddIsShow: false,
      addDoc: false,
      uploadParamData: {
        docSource: 6,
        projId: -1,
        parentId: null,
        auditProjectId: null
      },
      success_code: "",
      shagchaun: [],
      shagchaunlist: [],
      shagchaunlists: [],
      shagreatlist: [],
      shagreatlists: [],
      arrsss: [],
      shagreatl: [],
      tableData: [],
      // 关联附件
      relafag: false
    };
  },
  watch: {
    mbid(val) {
      this.mbid = val;
      this.listdata();
    }
  },
  mounted() {
    this.query_all();
    this.listdata();
  },
  methods: {
    // selectedFileList: {},
    Flags(item) {
      console.log(item);
      // this.$router.push({
      //         path: '/preview',
      //         query: {
      //             rfsId: item.docVersionRfs
      //         }
      //     })
      var previewData = {
        projectId: this.$store.state.projectMsg.pro_id,
        rfsId: item.docVersionRfs,
        docId: item.docId,
        photoType: item.docType,
        docName: item.docName
      };
      this.$store.commit("previewAllFn", previewData);
    },
    updata(item) {
      if(this.$store.state.isPC) {
          this.$store.commit("pcOtherDownload",{
            docId: item.docId,
            docName: item.docName
          });
      }else {
        this.$store.commit("download", [
          {
            id: item.docId,
            name: item.docName
          }
        ]);
      }
    },
    delects(item) {
      console.log(item);
      this.$confirm("是否删除" + item.docName, "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              id: item.id,
              docName: item.docName,
              taskId: this.mbid
            }
          };
          var _this = this;
          this.$post("/info/taskTpl/delTplTaskFile", data)
            .then((response)=> {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.listdata();
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭"
          });
        });
    },
    // 查询所有日志
    query_all(num) {
      this.joumaltype = num;
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: 1,
        pageSize: 10,
        data: {
          type: this.joumaltype, //（1:日报/2:周报/3:月报/4:我发出的/5:抄送我的）
          projectId: this.projectId // "项目id"
        }
      };
      var _this = this;
      this.$post("/info/project/getProjectLogAll", dataObj)
        .then((response)=> {
          _this.tableData = response.data.list;
          // console.log(response.data.list);
          _this.tableData.forEach(function(c) {
            if (c.id) {
              // _this.editobj_rankUserIds1.push(c.id);
              c.overbul = false;
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //tab切换筛选
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.joumaltype = "";
        this.query_all();
      } else if (tab.name == "second") {
        this.joumaltype = 4;
        this.query_all(4);
      } else if (tab.name == "third") {
        this.joumaltype = 5;
        this.query_all(5);
      } else if (tab.name == "fourth") {
        this.joumaltype = 1;
        this.query_all(1);
      } else if (tab.name == "fifth") {
        this.joumaltype = 2;
        this.query_all(2);
      } else {
        this.joumaltype = 3;
        this.query_all(3);
      }
    },
    //新建日志
    mengbx() {
      this.dialogVisible = true;
    },

    // 上传
    uploadingFn() {
      //上传
      this.$emit("bodys", false);
      this.addDoc = true;
      this.uploadDocAddIsShow = true;
    },
    // 关联附件
    upreat() {
      this.relafag = true;
    },
    clears(varyt) {
      //上传的关闭弹框
      this.relafag = false;
    },
    //关联附件的回调
    elationUpFn(uploadData) {
      var _this = this;
      uploadData.forEach(function(c) {
        if (c.id) {
          _this.shagreatlist.push({
            id: c.docId,
            name: c.docName
          });
        }
        console.log(_this.shagreatlist);
      });
      this.relafag = false;
      // this.shagreatlists=this.shagreatlists.concat(this.shagreatlist)
      this.xgbc(_this.shagreatlist);
    },
    sendValueToParent(data) {
      //版本子组件取消弹框的回
      this.versionsVisible = data;
    },
    sendValueToParentFn() {
      //上传的关闭弹框
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    // 查看附件
    seeFj(v) {
      this.$store.commit("previewAllFn", {rfsId: v});
      // this.$router.push({
      //   path: "/preview",
      //   query: {
      //     rfsId: v
      //   }
      // });
    },

    //下载附件
    dowanFs(itmm) {
      var download_arr = [];
      download_arr.push({
        name: itmm.fileName,
        id: itmm.docId
      });
      this.$store.commit("download", download_arr);
    },

    //上传成功后的回调
    docUploadFn(uploadData) {
      // var shagchaunlist=[]
      console.log(uploadData);
      this.shagchaunlist.push({
        id: uploadData.docId,
        name: uploadData.docName
      });
      this.$refs.uploadRef.uploadComplete();
      // this.shagchaunlists=this.shagchaunlists.concat(shagchaunlist)
      // console.log(this.shagchaunlists)
      // this.xgbc(this.shagchaunlist)
      // this.addDoc = false;
      // this.$refs.uploadRef.destroy()
      // this.uploadDocAddIsShow = false;
    },
    docUploadAllsucess() {
      this.xgbc(this.shagchaunlist);
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    handleUploadComplete(data){
      this.xgbc(data.data);
    },
    xgbc(item) {
      // console.log(item)
      var arr = item,
        arrsss = [];
      for (let i = 0; i < arr.length; i++) {
        arrsss.push({
          taskId: this.mbid,
          docId: arr[i].docId,
          docName: arr[i].docName
        });
      }
      var dataObj = {
        data: arrsss,
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/taskTpl/addTplTaskFile", dataObj)
        .then((response)=> {
          if(response.code !== 0) {
            this.$message.error(response.msg)
            return
          }
          that.listdata();
          that.shagchaunlist = [];
          that.shagreatlist = [];
          // this.selectedFileList = [];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listdata() {
      var dataObj = {
        data: {
          id: this.mbid
        },
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/taskTpl/getTaskTplFileList", dataObj)
        .then((response)=> {
          console.log(response);
          if (response.code == 0) {
            that.listdatasss = response.data;
          } else {
            that.listdatasss = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //删除
    deletetDoc(num, val) {
      var that = this;
      this.$confirm("确认要把文件放入回删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (num == 1) {
            that.shagchaunlist.splice(val, 1);
          } else {
            that.shagreatlist.splice(val, 1);
          }
          that.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    overbulchancg(v) {
      this.tableData[v].overbul = !this.tableData[v].overbul;
      this.$forceUpdate();
    },

    //选择用户查询数据
    addrelist() {
      var dataObj = {
        data: {},
        pageNo: 0,
        pageSize: 0,
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/sys/getAllUser", dataObj)
        .then((response)=> {
          that.flag = true;
          that.peodatas = response.data.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //添加会议联系人；联系人组件传值
    statesbox_list(val) {
      // console.log("子组件传过来的是", val);
      //抄送人员
      this.deployObj = val;
      var _this = this;
      this.flag = false;
    },
    //添加新增日志
    addjoumal() {
      var _this = this;
      if (this.ri_data.type == "") {
        this.$message.error("日志类型状态内容不能为空");
        return;
      }
      if (this.ri_data.content == "") {
        this.$message.error("日志内容不能为空");
        return;
      }
      this.deployObj.forEach(function(c) {
        if (c.id) {
          _this.ri_data.userIds.push(c.id);
        }
      });
      this.shagchaunlist.forEach(function(c) {
        if (c.id) {
          _this.shagchaun.push(c.id);
        }
      });
      this.shagreatlist.forEach(function(c) {
        if (c.id) {
          _this.shagreatl.push(c.id);
        }
      });
      // shagreatl
      if (this.ri_data.userIds == "") {
        this.$message.error("抄送人不能为空");
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          projectId: this.projectId, // "项目id"
          type: this.ri_data.type, //"日志类型（1:日报/2:周报/3:月报）"
          content: this.ri_data.content, //"日志内容"
          userIds: this.ri_data.userIds, // "抄送人员id集合", "1", "2"
          docIds: this.shagchaun, // "附件id集合"
          projectDocIds: this.shagreatl
        }
      };

      this.$post("/info/project/addProjectLog", data)
        .then((response)=> {
          if (response.code == 0) {
            _this.query_all();
            _this.dialogVisible = false;
            // _this.projectId='',
            _this.ri_data.type = "";
            _this.ri_data.content = "";
            _this.ri_data.userIds = "";
            _this.deployObj = [];
            _this.shagchaunlist = [];
            _this.shagchaun = [];
            _this.shagreatlist = [];
            _this.shagreatl = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },
  components: {
    // add_boxs,
    uploadAddDoc,
    relationAddDoc
  }
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../../common/css/sheltersright.css";
.projecjournal {
  padding: 0;
  .riheader {
    width: 100%;
    // height: 100px;
    padding: 0 5px;
    padding-bottom: 5px;
    background: rgba(255, 255, 255, 1);

    .el-breadcrumb {
      line-height: 40px;
    }
    .finance_tit {
      position: relative;
      padding: 15px 5px;
      span {
        color: #333;
        font-size: 16px;
        line-height: 32px;
        position: absolute;
        left: 0px;
        bottom: 4px;
      }

      .el-button {
        padding-bottom: 10px;
        position: absolute;
        right: 15px;
        bottom: 4px;
        z-index: 10;
      }
    }
  }

  .ri_content {
    margin-top: 8px;
    width: 98%;
    padding: 8px;
    padding-bottom: 18px;
    // height: 400px;
    background: rgba(255, 255, 255, 1);
    padding-top: 2px;
    .el-tab-pane {
      padding: 0px 2px;
    }
    .ri_list {
      width: 96%;
      // height: 160px;
      // background-color: aqua;
      background: rgba(255, 255, 255, 1);
      padding: 5px 5px;
      border-bottom: 2px solid #eceef1;
      .ri_list_title {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ri_list_tit {
          display: flex;
          align-items: center;
          .ri_list_titleimg {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .ri_list_titleimg .img {
            width: 100%;
            height: 100%;
          }
          .ri_list_titlename {
            margin-left: 5px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 50px;
          }
        }
        .ri_list_rijht {
          width: 20px;
          height: 15px;
          float: right;
          margin-right: 8px;
        }
      }
      .ri_list_content {
        width: 100%;
        // height: 200px;
        padding: 5px 5px;
        // background: yellow;
        text-align: left;

        .ri_content_t {
          display: flex;
          line-height: 24px;
          .ri_content_title {
            width: 70px;
            height: 18px;
            display: inline-block;
            // background: red;
            font-size: 10px;
          }
          .ri_content_cont {
            width: 90%;
          }
        }
      }
    }
  }
  .ellipsis_d {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #c1c1c1;
    border-radius: 50%;
  }

  .new_rizi {
    .form_box {
      margin-top: 15px;
    }
  }
  .ovetext {
    text-indent: 2em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .enclosure {
    margin-top: 15px;
    .enclosure_ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .enclosure_ul li {
      width: 45%;
    }
  }
  .over_chancg {
    margin-left: 10%;
  }
  .spans {
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
<style>
.el-dialog {
  text-align: left;
}
/* .el-textarea {
  width: 580px;
} */
/* .el-dialog__footer {
  text-align: center;
} */
.projecjournal .el-dialog__header {
  height: 20px;
  text-align: center;
}
.el-upload {
  width: 40px;
}
.el-upload__tip {
  font-size: 10px;
}
/* .dialog_tit {
  font-size: 16px;
  font-weight: 600; */
/* } */
/* .el-scrollbar__wrap {
  overflow-x: hidden;
} */

/* .projectlist .form_box .add_finan .el-button {
  float: none;
  margin-right: 30px;
} */
/* .skip_btn {
  float: right;
  margin-right: 30px;
} */
.projecjournal .riheader .finance_tit .el-button[data-v-5b97edf6] {
  padding-bottom: 11px;
  position: absolute;
  right: 15px;
  bottom: -10px;
  z-index: 10;
}
.rightShelter {
  margin-left: 20px;
}
.rightShelter .attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 30px;
}

.rightShelter .attentionMatters .addMatt,
.rightShelter .relatedFile .addRelate,
.rightShelter .surveyTool .addHref,
.rightShelter .associatedContent .addContent {
  border: 1px solid #d9d9d9;
  width: 460px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
}
.rightShelter .attentionMatters .addMatt i,
.rightShelter .attentionMatters .addMatt span,
.rightShelter .relatedFile .addRelate i,
.rightShelter .relatedFile .addRelate span,
.rightShelter .associatedContent .addContent i,
.rightShelter .associatedContent .addContent span {

  position: relative;
}
.rightShelter .attentionMatters .mattersDetail,
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  margin-top: 20px;
}
.rightShelter .attentionMatters .mattersDetail li {
  border-radius: 3px;
  width: 460px;
  line-height: 20px;
  border: 1px solid #d9d9d9;
  height: auto;
  text-align: left !important;
  padding-bottom: 10px;
}

/* 相关文件和调查工具和关联内容的一部分样式 */
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  border: 1px solid #d9d9d9;
}
.rightShelter .relatedFile .relateDetail h3,
.rightShelter .surveyTool .surveyDetail h3,
.rightShelter .associatedContent .associatedDetail h3 {
  color: #333;
  font-size: 14px;
  text-align: left !important;
}
.rightShelter .relatedFile .relateDetail .relateLi,
.rightShelter .surveyTool .surveyDetail .surveyLi,
.rightShelter .associatedContent .associatedDetail .associatedLi {
  margin-top: 3px;
  margin-left: 15px;
  margin-bottom: -19px;
}
.rightShelter .surveyTool .surveyDetail .surveyLi {
  text-align: left;
}
.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(1) {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(2) {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: lef;
}
.rightShelter .relatedFile .relateDetail .relateLi em,
.rightShelter .surveyTool .surveyDetail .surveyLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 关联内容 */
.rightShelter .associatedContent .associatedDetail .associatedLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 任务动态 */
.rightShelter .dynamicTask {
  height: 560px;
  overflow-y: auto;
  border-bottom: 1px solid #d9d9d9;
}
.rightShelter .dynamicTask h4 {
  color: #333333;
  font-size: 14px;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask h5 {
  color: #999999;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li {
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li p {
  margin-bottom: 10px;
}
.rightShelter .dynamicTask .dynamicUl li p span,
.rightShelter .dynamicTask .dynamicUl li p em {
  color: #999;
}
.rightShelter .dynamicTask .dynamicUl li p span .downFiles {
  color: #0061a9 !important;
  margin-left: 5px;
}

/* 底下发布 */
.dialogOthers {
}
.dialogOthers textarea {
  width: 98%;
  height: 100px;
  border: 0px;
  padding-top: 10px;
}
.dialogOthers .release {
}
.dialogOthers .release img {
  width: 24px;
  height: 24px;
}
.dialogOthers .release span {
  color: #0061a9;
}

/* 关联内容弹框中的样式 */
/* .el-checkbox:last-child{
    margin-right: 30px!important;
} */

.contentTab .taskNames {
  text-align: left;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 5px;
}
.contentTab .el-checkbox__label img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 3px;
}
</style>
