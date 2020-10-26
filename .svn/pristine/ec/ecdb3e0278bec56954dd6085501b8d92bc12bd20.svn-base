<template>
  <div id="Audit_component">
    <el-dialog :title="fileDate.data.row.procName+'审批'"
               :visible.sync="dialogVisible"
               center
               @close="closeinfo"
               @open="opens"
               top="80px"
               width="70%"
               height="500px"
               :close-on-click-modal="false">
      <div class="flexing"
           style="height: calc(100vh - 300px);">
        <div class="Audit_component" style="text-align: left;">
          <h3>项目信息</h3>
          <div>
            <ul>
              <li>
                <span>项目名称：</span>
                <span class="boldtext"
                      :title="fileDate.data.row.projectName">{{fileDate.data.row.projectName}}</span>
              </li>
              <li>
                <span>项目编码：</span>
                <span class="boldtext"
                      :title="fileDate.data.row.code">{{fileDate.data.row.code}}</span>
              </li>
              <li>
                <span>业务类型：</span>
                <span class="boldtext"
                      :title="fileDate.data.row.categoryName =='普通审批'?'无':fileDate.data.row.finanNameParent"> {{fileDate.data.row.categoryName =="普通审批"?'无':fileDate.data.row.finanNameParent?fileDate.data.row.finanNameParent.substring(fileDate.data.row.finanNameParent.lastIndexOf('>') + 1):'--'}}</span>
              </li>
              <li>
                <span>当前阶段：</span>
                <span class="boldtext"
                      :title="fileDate.Typesoffinancing">{{fileDate.Typesoffinancing}}</span>
              </li>
              <li>
                <span>&nbsp;&nbsp;&nbsp;提交人：</span>
                <span class="boldtext"
                      :title="fileDate.chemsg">{{fileDate.chemsg}}</span>
              </li>
              <li>
                <span>提交时间：</span>
                <span class="boldtext"
                      :title="fileDate.data.row.createDate">{{fileDate.data.row.createDate}}</span>
              </li>
              <li :title="textareas">
                <p>申请内容：</p>
                <el-input style="padding-top: 7px;"
                          type="textarea"
                          :rows="3"
                          disabled
                          resize="none"
                          v-model="textareas"></el-input>
              </li>
              <li>
                <span>相关信息：</span>
                <span style="display: inline-block;width: 55%;vertical-align: middle">
                  共计
                  <span>{{setnume.total}}</span>个{{(fileDate.data.row.categoryId == 2 || fileDate.data.row.categoryId == 10)?'文件':'目录'}}，已审
                  <span>{{setnume.review}}</span>个，待审
                  <span>{{setnume.pending}}</span>个
                </span>
                <el-button @click="Filepages"
                           v-if="this.$route.query.path != '/myapproval' && this.$route.query.path != '/backlogmatter' && this.$route.query.path !='/messagecenter'"
                           style="float: right;"
                           type="primary"
                           size="mini">去审{{(fileDate.data.row.categoryId == 2 || fileDate.data.row.categoryId == 10)?'文件':'目录'}}</el-button>
              </li>
              <li>
                <p style="padding-bottom: 7px;">
                  <el-checkbox :indeterminate="isIndeterminate"
                               v-model="checkAll"
                               :disabled="annex !=''?false:true"
                               @change="handleCheckAllChange">附件</el-checkbox>
                  <span>（{{annex.length}}）个</span>
                  <span v-if="annex !=''"
                        style="float: right;">
                    <el-button type="text"
                               @click="downclick"
                               size="mini">下载</el-button>
                  </span>
                </p>
                <el-checkbox-group v-model="checkedCities"
                                   @change="handleCheckedCitiesChange">
                  <p class="checkboxinfo">
                    <el-checkbox v-for="city in annex"
                                 :label="city.fileId"
                                 :key="city.fileId">
                      <span :title="city.fileName"
                            @click.prevent="$utils.handleUploadFilePreview(city, {projectId:queryDocProjectId,sourceName:'节点审批',projectName:fileDate.data.row.projectName})"
                            class="boldtextinfos">{{city.fileName}}</span>
                    </el-checkbox>
                  </p>
                </el-checkbox-group>
              </li>
            </ul>
          </div>
        </div>
        <i class="info"></i>
        <div id="Audit_compone"
             class="Audit_component"
             style="height: calc(100vh - 300px);width: 50%;text-align: left;">
          <div>
            <ul>
              <p class="gnq">
                <el-button size="mini"
                           @click="filejl"
                           type="primary">审批记录</el-button>
                <el-button size="mini"
                           @click="approvalComment"
                           v-if="fileDate.data.row.categoryId == 2 "
                           type="primary">文件审批意见</el-button>
                <el-button size="mini"
                           @click="approvalComment"
                           v-else-if="fileDate.data.row.categoryId == 10 "
                           type="primary">文件修订审批意见</el-button>
                 <el-button size="mini"
                           @click="approvalComment"
                           v-if="fileDate.data.row.categoryId == 3"
                           type="primary">目录审批意见</el-button>
                <el-button size="mini"
                           @click="approvalComment"
                           v-else-if="fileDate.data.row.categoryId == 11"
                           type="primary">目录修订审批意见</el-button>
                <el-button size="mini"
                           @click="cares"
                           v-if="isCareOf == 1"
                           type="primary">转交</el-button>
              </p>
              <h3 style="padding-bottom: 15px;margin-top: -28px;margin-left: -4px;">审批</h3>
              <li style="margin-left:-9px">
                <i style="color:red">*</i>
                <span>
                  审批结果：
                  <span></span>
                  <template>
                    <el-radio-group v-model="radio">
                      <el-radio :label="item.value"
                                :key="item.index"
                                v-for="(item,index) in fileDateradioId">{{item.name}}</el-radio>
                    </el-radio-group>
                  </template>
                </span>
              </li>
              <li>
                <p style="padding-bottom: 7px;">审批意见：</p>
                <el-input type="textarea"
                          :rows="2"
                          maxlength="1000"
                          resize="none"
                          placeholder="请输入审批意见，最多输入1000字"
                          v-model="textarea"></el-input>
              </li>
                <li style="max-height: 136px;overflow-y: auto;">
                <p style="padding-bottom: 7px;">抄送人(抄送方式:整体审批完成后抄送)</p>
                    <span v-if="deployObj.length>0">&nbsp;&nbsp;</span>
                    <el-button type="primary" @click="optPrinFn(1)" size="small" style="margin-top:-1px;">选择人员</el-button>
                     <el-tag v-for="(item,index) in colyObj" :key="'info2'+index" class="userbtn" style="margin-left:10px;margin-bottom:10px;">
                        {{item.name}}
                    </el-tag>
                    <el-tag v-for="(item,index) in deployObj" :key="index" class="userbtn" style="margin-left:10px;margin-bottom:10px;" @close="handle_Close(index,0)" :closable="!chack_bule">
                        {{item.name}}
                    </el-tag>
              </li>
                <!-- <li class="usernanmestlt"><i style="color:#f56c6c;position:relative;right:4px;">*</i>投票人员：</li> -->
                <!-- <li class="usernanmes">

                </li> -->
              <li style="margin-top: 7px;">
                <p style="padding-bottom: 8px;">
                  <el-checkbox :indeterminate="isIndeterminate2"
                               v-model="checkAll2"
                               :disabled="selectedFileList != ''?false:true"
                               @change="handleCheckAllChange2">上传附件</el-checkbox>
                  <span style="margin-left: 6px;vertical-align: middle;">
                    <add-attachment ref="attachmentVote"
                                    :projectRequired="true"
                                    :projectId="queryDocProjectId"
                                    @select="$utils.handleSelect(arguments,selectedFileList)"></add-attachment>
                  </span>
                  <span style="float: right;"
                        v-if="selectedFileList != ''">
                    <el-button type="text"
                               @click="delectclick"
                               size="mini">删除</el-button>
                  </span>
                </p>
                <el-checkbox-group v-model="checkedCities2"
                                   @change="handleCheckedCitiesChange2">
                  <p class="checkboxinfo">
                    <el-checkbox v-for="city in selectedFileList"
                                 :label="city.docId"
                                 :key="city.docId">
                      <span class="boldtextinfos"
                            @click.prevent="$utils.handleUploadFilePreview(city, {projectId:queryDocProjectId,sourceName:'节点审批',projectName:fileDate.data.row.projectName})"
                            :title="city.docName">{{city.docName}}</span>
                    </el-checkbox>
                  </p>
                </el-checkbox-group>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-checkbox style="margin-right: 46px"
                     v-model="checked">新建日程提醒</el-checkbox>
        <el-button @click="closeinfo">取 消</el-button>
        <el-button type="primary" :disabled="completetask"
                   @click="dialogVi">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 选择人员 -->
    <findall-deptuser  :findFlagShow.sync="findFlag" @findAllUser="findAllUser"
            :findUserObj="findUserObj "
            :findState="{ state: 0 }" :checkState="{ state: 2 }"></findall-deptuser>
    <approval-transfer 
      @update-filepage="updateFilepage"
      :visible.sync="showTransfer"
      :taskId="fileDate.data.row.taskId" 
      :catItem="fileDate.data.row"></approval-transfer>
  </div>
</template>

<script>
import approvalComment from "@/components/select_box/approvalComment";
import setTypeso from './setTypeso'
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import ApprovalTransfer from "../maindesk/myapproval/components/ApprovalTransfer"
export default {
  props: ["fileDate", "Auditco", "approvalRecordObj", 'page'],
  data () {
    return {
        approvalItem: {}, //我的审批中选中当前条数据
        showTransfer: false,
        isPC: this.$store.state.isPC,
        annex: [],
        selectedFileList: [],
        setnume: "",
        queryDocProjectId: "",
        checkedCities: [],
        textareas: "",
        textarea: "",
        isCareOf: "",
        completetask:false,
        fileDateradioId:[],
        isIndeterminate: false,
        checkAll: false,
        isIndeterminate2: false,
        checkAll2: false,
        checkedCities2: [],
        radio: "",
        checked: false,
        dialogVisible: false,
        deployObj: [], //抄送人员
        colyObj:[],//默认抄送人
        chack_bule:false,
        findFlag:false,
        findUserObj: [],
    };
  },
  components: {
    approvalComment,
    findallDeptuser,
    ApprovalTransfer
  },
  watch: {
    selectedFileList: {
      handler () {
        if (this.selectedFileList.length == 0) {
          this.isIndeterminate = false;
          this.checkAll2 = false
        }
        let checkedCount = this.checkedCities2.length;
        let allLen = this.selectedFileList.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < allLen;
        this.checkAll2 = allLen > 0 && checkedCount== allLen
      },
      deep: true
    },
    radio(val){
      this.completetask = false
    },
    dialogVisible (val) {
      if (!val) {
        this.textareas = "";
        this.annex = [];
        this.checkedCities = [];
        this.textarea = "";
        this.selectedFileList = [];
        this.checkedCities2 = [];
        this.checkAll = false;
        this.checkAll2 = false;
        this.isIndeterminate = false;
        this.isIndeterminate2 = false;
        this.fileDateradioId = []
        this.completetask = false
      }
    },
    Auditco (val) {
      console.log('Auditco', this.fileDate)
      this.dialogVisible = val;
      if(val){
        this.shenhe(this.fileDate.data.row.taskId);
        this.queryDocProjectId = this.fileDate.data.row.projectId;
        this.getnumfile();
      }
    }
  },
  filters: {
    msg (val) {
      var dom = document.createElement("div");
      dom.innerHTML = val;
      return (val = dom.innerText);
    }
  },
  created() {
    console.log(this.fileDate, 333)
  },
  methods: {
    updateFilepage(){
      this.$emit('updatainfo')
    },
    findAllUser (data) {
        console.log(data, '2566')
        if(!data || !data.length){
            this.findFlag = false;
            this.deployObj = []
        }
        //  返回的数据分为默认的和其他的选择的，
        let defaultArr = []
        let copyData = []
        console.log(data)
        data.forEach(v => {
          if (v.originData || v.defaultUser == 1) {
            defaultArr.push(v)
          } else {
            copyData.push(v)
          }
        })
        this.deployObj = copyData
        this.colyObj = defaultArr
        console.log(this.deployObj, 1);
          // if (this.deployObj !== "") {
          //     this.deployObj = this.$utils.uniqBy(this.deployObj, 'id')
          //     console.log(this.deployObj, 2);
          //     this.findFlag = false;
          //     // var chgArr = [];
          //     // for (var i = 0; i < this.deployObj.length; i++) {
          //     //     var flag = true;
          //     //     for (var j = 0; j < chgArr.length; j++) {
          //     //     if (this.deployObj[i].userId == chgArr[j].userId) {
          //     //         flag = false;
          //     //     };
          //     //     };
          //     //     if (flag) {
          //     //     chgArr.push(this.deployObj[i]);
          //     //     };
          //     // };
          //     // this.deployObj = chgArr
          //     console.log(this.deployObj);
          // }
          // this.findUserObj = this.deployObj
    },
    //  选择抄送人
    optPrinFn () {
        this.findFlag = true;
        this.findUserObj = this.$utils.cloneDeepArray([...this.colyObj,...this.deployObj])

    },
    handle_Close (num, ind) {
        this.$refs['attachmentEdit'] && this.$refs['attachmentEdit'].close()
        if (ind == 0) {
            this.deployObj.splice(num, 1);
        } else {
            this.ccObj.splice(num, 1);
        }
    },
    approvalComment () {
      let attach = [];
      if(this.fileDate.data.row.categoryId == 2 || this.fileDate.data.row.categoryId == 10){
          this.approvalRecordObj.attach.map(v => {
          let obj = {};
          obj.docId = v.docId;
          obj.parentId = v.parentId;
          attach.push(obj);
        });
      }else{
          this.approvalRecordObj.attach.map(v => {
            let obj = {};
            obj.docId = v.docId;
            obj.parentId = v.parentId;
            attach.push(obj);
          });
      }
      console.log(123, this.approvalRecordObj, attach);
      let commentData = {
        docSource: this.approvalRecordObj.docSource, // 来源
        attach: JSON.stringify(attach), //审核的文件id
        projectId: this.$store.state.projectMsg.pro_id,
        isDir:(this.fileDate.data.row.categoryId == 2 || this.fileDate.data.row.categoryId == 10)?false:true,
        sourceName:`我的审批-${this.fileDate.data.row.categoryId == 2 || this.fileDate.data.row.categoryId == 10? '文件' : '目录'}审批-节点审批-${this.fileDate.data.row.categoryId == 2 || this.fileDate.data.row.categoryId == 10? '文件' : '目录'}审批意见页`
      };
      this.$store.commit("approvalCommentsFn", commentData);
    },
    getnumfile () {
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.fileDate.data.row.projectId,
        data: {
          approvalId: this.fileDate.data.row.id,
          taskDefKey: this.fileDate.data.row.taskDefKey
        }
      };
      this.$post("/info/audit/getFileNumByType", data)
        .then(response => {
          this.setnume = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    closeinfo () {
      this.$emit("ogVisible", { s: false, d: false, data: 1 });
      this.deployObj =[];
    },
    opens () {
      this.checked = false;
      this.radio = "";
    },
    // 转交功能
    cares () {
      this.page!=='filepage' ? this.$emit("caresinfo", true) : this.showTransfer = true
    },
    Filepages () {
      this.$router.push({
        path: "/Filepage",
        query: {
          item: JSON.stringify(this.fileDate.data.row),
          path: this.$route.path,
          name: this.nameinfo
        }
      });
    },
    filejl () {
      // this.approvalRecordShow = true
      this.$emit("filejl", this.fileDate.data.row);
    },
    shenhe (taskId) {
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: taskId
        }
      };
      var url = "/info/audit/approval_btn_list ";
      this.$post(url, data)
        .then(response => {
          this.fileDate.radioId = response.data;
          // this.fileDateradioId = response.data;
          let vm = this
          this.fileDateradioId = setTypeso(vm, response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      var datas = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: taskId
        }
      };
      var urls = "/info/audit/form_attachment";
      this.$post(urls, datas)
        .then(response => {
          // if(response.code != 0){
          //   this.$message.error(response.msg)
          // }
          var dom = document.createElement("div");
          dom.innerHTML = response.data.remarks;
          this.textareas = dom.innerText;
          response.data.annex.forEach(
            item => (item.docName = item.fileName,
              item.docId = item.fileId
            )
          );
          this.annex = response.data.annex;
          this.isCareOf = response.data.isCareOf;
          this.fileDate.html2 = response.data;
          this.colyObj = response.data.carbonCopy.map(v => {
            return {
              ...v,
              originData:true
            }
          });
          //this.colyObjIds = response.data.carbonCopy
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dialogVi () {
      // setTimeout(() => {
      //   this.$emit("ogVisible", {
      //     s: false,
      //     d: this.checked,
      //     data: this.fileDate.data.row
      //   });
      // }, 200);
      // this.$emit("updatalist", {
      //   'isden':'isden',
      //    d: this.checked
      // });
      // this.dialogVisible = false;
      // return;
      if (this.radio == "") {
        this.$message.error("请勾选审批结果");
        return;
      }
      // var arr = [];
      // this.selectedFileList.forEach(item => {
      //   arr.push(item.docId);
      // });
      let localAttach = []
      let projectRelev = []

      this.selectedFileList.forEach(v => {
        v.addSource === 1 && localAttach.push(v.docId)
        projectRelev.push(v.docId)
      })

      console.log(this.findUserObj)
      console.log(this.colyObj)
      let colyObjIds = [];
      let findUserObjIds = []
      for(var i=0; i<this.findUserObj.length; i++){
          findUserObjIds.push(this.findUserObj[i].id)
      }
      for(var i=0; i<this.colyObj.length; i++){
          colyObjIds.push(this.colyObj[i].id)
      }
      let extCopy = [];
      extCopy = colyObjIds.concat(findUserObjIds);
      console.log(extCopy)
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          taskId: this.fileDate.data.row.taskId,
          outcome: this.radio,
          remarks: this.textarea,
          attach: projectRelev, // 附件（项目文档选择、底稿选择、本地上传）
          localFile: localAttach, // 本地上传
          projectId: this.fileDate.data.row.projectId,
          extCopy: extCopy
        }
      };
      this.completetask = true
      var url = "/info/audit/complete_task";
      this.$post(url, data)
        .then(response => {
          if (response.code == 0) {
            this.$message.success(response.msg);
            this.dialogVisible = false;
            this.deployObj = [];
            this.$emit("fileinfo", true);
            this.$emit("updatalist",  {
            'isden':'isden',
            d: this.checked});
            setTimeout(() => {
              this.$emit("ogVisible", {
                s: false,
                d: this.checked,
                data: this.fileDate.data.row
              });
            }, 200);
            this.$select.updateStatus(this.fileDate.data.row.docSource, this.fileDate.data.row.projectId, this.fileDate.data.row.projectId)
          } else {
            this.completetask = true
            this.$message.error(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    downclick () {
      if (this.checkedCities == "") {
        this.$message.error("请选择要下载的数据");
        return;
      }
    let uploadData = []
        this.checkedCities.forEach(item => {
            this.annex.forEach(it => {
                if (item == it.fileId && it.delFlag != 1) {
                    if (this.$store.state.isPC) {
                        uploadData.push({
                        docId: it.fileId,
                        docName: it.fileName
                    });
                    } else {
                        uploadData.push({
                        docId: it.fileId,
                        docName: it.fileName
                    });
                    }
                }
            });
        });
        if(uploadData.length == 1 ){
            if (this.$store.state.isPC) {
                this.$store.commit("pcOtherDownload", {
                    docName : uploadData[0].docName,
                    docId :uploadData[0].docId
                });
            } else {
                this.$store.commit("download", [{
                    docName : uploadData[0].docName,
                    id :uploadData[0].docId
                }]);
            }
        }else{
            var data={
              "random":Math.random(),
              "docIdStr":uploadData.map(v=>v.docId).join(','),
              "zipName": this.fileDate.data.row.projectName.substring(0,10)+'-审批附件.zip'
            }
            this.$store.commit("export", {url: "/rfs/downloadDocsZip",data: data});
        }
    },
    delectclick () {
      if (this.checkedCities2 == "") {
        this.$message.error("请勾选想要删除的附件");
        return;
      }
      this.checkedCities2.forEach(item => {
        this.selectedFileList.forEach((it, index) => {
          if (it.docId == item) {
            this.selectedFileList.splice(index, 1);
            this.checkedCities2 = []
          }
        });
      });
    },
    handleCheckAllChange (val) {
      //var arr = [];
    //   this.fileDate.html2.annex.forEach(item => {
    //     arr.push(item.id);
    //   });
    //   this.checkedCities = val ? arr : [];
    //   this.isIndeterminate = false;
        this.checkedCities = val ? this.annex.map(v => v.fileId) : [];
        this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.annex.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.annex.length;
    },
    handleCheckAllChange2 (val) {
      var arr = [];
      this.selectedFileList.forEach(item => {
        arr.push(item.docId);
      });
      this.checkedCities2 = val ? arr : [];
      console.log(this.checkedCities2);
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2 (value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.selectedFileList.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.selectedFileList.length;
    }
  }
};
</script>
<style lang="scss" scoped>
.gnq {
  text-align: right;
  margin-top: -15px;
}
.flexing {
  display: flex;
}
.info {
  display: inline-block;
  width: 1px;
  background: #dcdfe6;
}
.Audit_component {
  padding-left: 10px;
  margin-top: 0px;
  height: 100%;
  width: 50%;
  overflow: auto;
  h3 {
    font-weight: bold;
  }
  ul {
    padding-top: 15px;
    padding-left: 15px;
    li {
      padding-bottom: 12px;
      width: 97%;
    }
  }
}
.boldtext {
  font-weight: bold;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
  vertical-align: middle;
  word-break: break-all;
}
.boldtextinfo {
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 113px;
  word-break: break-all;
}
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
}
</style>
<style lang="scss">
#Audit_component .el-dialog__footer {
  text-align: right !important;
}
.checkboxinfo .el-checkbox {
  display: block;
  padding-bottom: 3px;
}
#Audit_component .el-checkbox-group {
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
}
#Audit_compone .el-checkbox-group {
  max-height: 360px;
  overflow-y: auto;
  width: 100%;
}
#Audit_component .el-textarea.is-disabled .el-textarea__inner {
  min-height: 90px !important;
}
#Audit_component .el-textarea__inner {
  min-height: 90px !important;
}
</style>
