<template>
  <div class="projecjournal">
    <div class="surveyTool" style="width: 463px;    margin-top: 3px;">
      <p class="addHref">
        <add-attachment
          ref="attachment"
          :class="[forbiddenis == 4?'notclick':'']"
          :projectId="projectId"
          :taskId="mbids"
          @select="handleUploadComplete"
        ></add-attachment>
      </p>
      <ul class="surveyDetail" style="height:427px;padding: 10px;">
        <!-- <el-scrollbar style="height:100%"> -->
        <!-- <div
            style="width: 100%;margin-top: 1%;"
            v-if="listdatasss.ParaValueIsNull !='字段值为空:taskId'"
            v-for="item in listdatasss"
        >-->
        <!-- <span v-if="item.delFlag == 1" @click="ValueIsNull">
              <el-button
                style="color:#999999;float: left;width: 300px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                type="text"
              >
                <span
                  style="text-decoration:line-through;float: left;padding-left: 5px;"
                >{{item.name}}</span>
              </el-button>
        </span>-->
        <!-- <span
              style="float: left;padding-top: 0%;margin-top: -3px;padding-left: 5px;"
              @click="Flags(item)"
              v-else
            >
              <a src="javascript:void(0);" :title="item.name">
                <el-button
                  style="color:#999999;float: left;text-align: left;width: 300px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                  type="text"
                >{{item.name}}</el-button>
              </a>
            </span>
            <div style="float: right;padding-right: 16px;" :class="[forbiddenis == 4?'notclick':'']">
              <span @click="delects(item)" v-if="item.delFlag == 0 || item.delFlag == null">
                <el-button type="text">删除</el-button>
              </span>
              <span v-if="item.delFlag == 0 || item.delFlag == null" @click="updata(item)" style="padding-right: 5px;">
                <el-button type="text">下载</el-button>
        </span>-->
        <!-- </div> -->
        <!-- <div style="clear: both;"></div> -->

        <!-- <div :style="forbiddenis == 4?'pointer-events: none;':''"> -->
        <el-checkbox
          :style="forbiddenis == 4?'pointer-events: none;':''"
          v-if="listdatasss.ParaValueIsNull !='字段值为空:taskId'"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          :disabled="listdatasss != ''?false:true"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div
          class="rightstyle"
          :style="forbiddenis == 4?'pointer-events: none;':''"
          v-show="listdatasss.length != 0"
        >
          <el-button @click="updata" type="text">下载</el-button>
          <el-button @click="delectclick" type="text">删除</el-button>
        </div>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <p class="checkboxinfo">
            <el-scrollbar style="height:100%">
              <el-checkbox
                v-for="city in listdatasss"
                :disabled="city.delFlag == 1"
                :label="city.docId"
                :key="city.docId"
              >
                <span
                  v-if="city.delFlag == 1"
                  class="boldtextinfos"
                  @click.prevent="$message.error('该附件被删除')"
                  style="text-decoration:line-through;"
                  :style="forbiddenis == 4?'pointer-events: none;':''"
                >{{city.name}}</span>
                <span
                  v-else
                  @click.prevent="$utils.handleUploadFilePreview(city, {projectId:projectId,sourceName:'项目任务',projectName: projectName})"
                  class="boldtextinfos"
                  :style="forbiddenis == 4?'pointer-events: none;':''"
                >{{city.name}}</span>
              </el-checkbox>
            </el-scrollbar>
          </p>
        </el-checkbox-group>
        <!-- </div> -->
      </ul>
    </div>
    <diloadAddDoc v-if="relafagmanus" @clearstate="clearis" @elationUpmansc="elationUpmanscFn" />
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
import add_boxs from "@/components/select_box/frameworkpeo";
import uploadAddDoc from "@/components/file/uploadAddDoc";
import diloadAddDoc from "@/components/relation/manuscript";
import relationAddDoc from "@/components/relation/relation";
import { wisdom_doc } from "@/pages/common/js/doc.main";
import { createDiffieHellman } from "crypto";
import { type } from "os";
export default {
  props: ["mbids", "qkr", "forbiddenis","flagdetaildatas"],
  name: "projecjournal",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      selectedFileList: [],
      token: "",
      userId: "",
      type: "",
      arrsss: [],
      shagreatlist: [],
      relafagmanus: false,
      listdatasss: [],
      projectId: this.$store.state.projectMsg.pro_id, //项目id"
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
      desc: "",
      //上传控制
      uploadDocAddIsShow: false,
      addDoc: false,
      uploadParamData: {
        docSource: 6,
        projId: 11,
        parentId: null,
        auditProjectId: null
      },
      success_code: "",
      shagchaun: [],
      shagchaunlist: [],
      shagreatlist: [],
      shagreatl: [],

      tableData: [],
      // 关联附件
      relafag: false,
      projectName: this.$store.state.projectMsg.projectMsg.name, //项目name"
    };
  },
  mounted() {
    // this.query_all();
    // this.listdata()
  },
  watch: {
    forbiddenis(val) {},
    mbids(val) {
      this.mbids = val;
      console.log(val)
      // this.listdata()
    },
    qkr(val) {
      console.log(val)
      if (val.state == 1) {
        this.shagreatlis = [];
        this.shagchaunlist = [];
        this.selectedFileList = [];
        this.isIndeterminate = false;
        this.checkAll = false;
        this.checkedCities = [];
        this.listdatasss = []
      }
    },
    listdatasss: {
      handler() {
        if (this.listdatasss.length == 0) {
          this.isIndeterminate = false;
          this.checkAll = false;
          return
        }
        let checkedCount = this.checkedCities.length;
        let allLen = this.listdatasss.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
        this.checkAll = checkedCount == allLen;
      },
      deep: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.listdatasss.map(v => v.docId) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.listdatasss.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.listdatasss.length;
    },
    ValueIsNull() {
      this.$message.error("该附件已被删除");
    },
    Flags(item) {
      console.log(item);
      var previewData = {
        projectId: this.projectId,
        docId: item.docId,
        rfsId: item.docVersionRfs,
        photoType: item.docType,
        docName: item.name
      };
      this.$store.commit("previewAllFn", previewData);
    },
    diupreat() {
      if (!this.$utils.checkProjectPermission("project_file")) {
        this.$message.error("无查看项目文档的权限");
        return;
      }
      this.relafagmanus = true;
    },
    clearis(val) {
      this.relafagmanus = val;
    },
    elationUpmanscFn(uploadData) {
      alert(1)
      var _this = this;
      var shagreatlist = [];
      uploadData.forEach(function(c) {
        if (c.id) {
          shagreatlist.push({
            id: c.docId,
            name: c.docName,
            rfsId: c.rfsId
          });
        }
      });
      console.log(shagreatlist);
      this.relafagmanus = false;
      this.xgbc(shagreatlist);
    },
    updata() {
      console.log('updata', this.flagdetaildatas)
      if (this.checkedCities == "") {
        this.$message.error("请勾选想要下载的附件");
        return;
      }
      let arr = [];
      this.checkedCities.forEach(item => {
        this.listdatasss.forEach(it => {
          if (item == it.docId && it.delFlag != 1) {
            if (this.$store.state.isPC) {
              arr.push({
                docId: it.docId,
                docName: it.name
              });
            } else {
              arr.push({
                id: it.docId,
                name: it.name
              });
            }
          }
        });
      });
      if(arr.length == 1 ){
        if (this.$store.state.isPC) {
          // this.$store.commit("pcOtherDownload", arr);
           this.$store.commit("pcOtherDownload", {
            docName : arr[0].docName,
            docId :arr[0].docId});
        } else {
          this.$store.commit("download", arr);
        }
      }else{
       var data={
            "random":Math.random(),
            "docIdStr":arr.map(v=>v.id).join(','),
            "zipName": this.flagdetaildatas.substring(0,10)+'-相关附件.zip'
          }
        this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
      }
    },
    query_all(num) {
      this.joumaltype = num;
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: 1,
        pageSize: 10,
        data: {
          type: this.joumaltype,
          projectId: this.projectId // "项目id"
        }
      };
      var _this = this;
      this.$post("/info/project/getProjectLogAll", dataObj)
        .then(response => {
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
    // 上传
    uploadingFn() {
      //上传
      this.type = 0;
      this.addDoc = true;
      this.uploadDocAddIsShow = true;
    },
    // 关联附件
    upreat() {
      if (!this.$utils.checkProjectPermission("project_file")) {
        this.$message.error("无查看项目文档的权限");
        return;
      }
      this.type = 1;
      this.relafag = true;
    },
    clears(varyt) {
      //上传的关闭弹框
      this.relafag = false;
    },
    //关联附件的回调
    elationUpFn(uploadData) {
      console.log(uploadData);
      var _this = this;
      uploadData.forEach(function(c) {
        if (c.id) {
          _this.shagreatlist.push({
            id: c.docId,
            name: c.docName,
            rfsId: c.rfsId
          });
        }
        console.log(_this.shagreatlist);
      });
      this.relafag = false;
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
      this.$store.commit("previewAllFn", { rfsId: v });
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
      this.shagchaunlist.push({
        id: uploadData.docId,
        rfsId: uploadData.fileData.rfsId,
        name: uploadData.docName
      });
      this.$refs.uploadRef.uploadComplete();
    },
    docUploadAllsucess() {
      this.xgbc(this.shagchaunlist);
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    // todo 全部上传完成，保存文件
    handleUploadComplete(data) {
      this.xgbc(data.data, data.taskId);
    },
    xgbc(item, taskId) {
      var arr = item;
      console.log(item);
      if (item == "") {
        this.$message({
          type: "info",
          message: "成功"
        });
        return;
      }
      var type = item[0].fileData == undefined ? 1 : 0;
      var arrsss = [];
      console.log(123, taskId, this.mbids);
      for (let i = 0; i < arr.length; i++) {
        arrsss.push({
          taskId: taskId || this.mbids,
          docId: arr[i].docId,
          name: arr[i].docName,
          type: type
        });
      }
      // console.log(this.arrsss)
      var dataObj = {
        data: arrsss,
        token: this.token,
        userId: this.userId
      };
      console.log(dataObj);
      var that = this;
      this.$post("/info/task/saveTaskFile", dataObj)
        .then(response => {
          if (response.code == 0) {
            that.$message({
              message: response.msg,
              type: "success"
            });
            that.shagchaunlist = [];
            that.shagreatlist = [];
            this.selectedFileList = [];
            that.listdata();
            // console.log(that.shagchaunlist);
          } else {
            that.$message({
              type: "error",
              message: response.msg
            });
            that.shagchaunlist = [];
            that.shagreatlist = [];
            this.selectedFileList = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delectclick() {
      if (this.checkedCities == "") {
        this.$message.error("请勾选想要删除的附件");
        return;
      }
      this.$confirm("是否删除勾选附件", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = [];
          this.checkedCities.forEach(item => {
            this.listdatasss.forEach(it => {
              if (item == it.docId && it.delFlag != 1) {
                this.getdelectclick(it);
              }
            });
          })
        })
        .catch(() => {});
    },
    getdelectclick(item) {
      this.$post("/info/task/delTaskFile", {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id,
          name: item.name,
          taskId: this.mbids
        }
      })
        .then(response => {
          if (response.code == 0) {
            this.$message.success(response.msg);
            this.listdata();
            this.checkedCities = []
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {});
    },
    listdata(id) {
      if (id != undefined) {
        this.mbids = id;
      }
      var dataObj = {
        data: {
          taskId: this.mbids
        },
        token: this.token,
        userId: this.userId
      };
      this.$post("/info/task/getTaskFileByTaskid", dataObj)
        .then(response => {
          response.data.forEach(item => {
            item.docName = item.name;
            item.rfsId = item.docVersionRfs;
          });
          this.listdatasss = response.data;
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
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },
  components: {
    add_boxs,
    uploadAddDoc,
    relationAddDoc,
    diloadAddDoc
  }
};
</script>
<style lang="" scoped>
.boldtextinfos {
  font-weight: 400;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px;
  vertical-align: middle;
  word-break: break-all;
  margin-top: 4px;
  vertical-align: bottom;
}
.checkboxinfo .el-checkbox {
  display: block;
  padding-bottom: 3px;
}
.rightstyle {
  float: right;
  margin-top: -12px;
}
.checkboxinfo {
  height: 386px;
  overflow: auto;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style scoped lang="scss" type="text/css">
.notclick {
  pointer-events: none;
}
.projecjournal {
  padding: 0px 0px;

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
}
</style>
<style scoped>
.el-dialog {
  text-align: left;
}
.el-dialog__header {
  height: 20px;
  text-align: center;
}
.el-upload {
  width: 40px;
}
.el-upload__tip {
  font-size: 10px;
}
.projecjournal .riheader .finance_tit .el-button[data-v-5b97edf6] {
  padding-bottom: 11px;
  position: absolute;
  right: 15px;
  bottom: -10px;
  z-index: 10;
}
.projecjournal .riheader .finance_tit .el-button[data-v-5b97edf6] {
  padding-bottom: 11px;
  position: absolute;
  right: -41px;
  bottom: 13px;
  /* z-index: 10; */
}
.clss {
  float: right;
}
.iclas {
  float: left;
}
.cssls {
  display: inline-block;
  width: 300px;
  height: 6px;
  line-height: 1px;
  text-align: left;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
.associatedContent {
}
/* 右边的样式 */
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
.rightShelter .surveyTool .addHref i,
.rightShelter .surveyTool .addHref span,
.rightShelter .associatedContent .addContent i,
.rightShelter .associatedContent .addContent span {
  position: relative;
  top: -2px;
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
.spans {
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
}
.attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 3px;
}
</style>
