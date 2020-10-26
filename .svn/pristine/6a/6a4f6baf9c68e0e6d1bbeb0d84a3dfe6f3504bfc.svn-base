
<template>
  <div class="versionsh">
    <el-dialog title="版本" :close-on-click-modal="false" :visible.sync="showDialog" width="500px" @close="close">
      <div>
        <ul>
          <li class="clearfix">
            <span class="span_first">当前版本</span>
            <span class="span_two">生成人</span>
            <span class="span_two">大小</span>
            <span class="span_two">操作</span>
          </li>
          <div style="height:250px;">
            <el-scrollbar style="height:100%">
              <li v-for="(item,idx) in versionlist" :key="idx" class="clearfix">
                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                <span class="span_sec" :title="item.userName">{{item.userName}}</span>
                <span class="span_sec" :title="$utils.handleFileSize(item.docSize)">{{$utils.handleFileSize(item.docSize)}}</span>
                <span class="span_sec">
                  <el-button type="text" v-if="!uploadDisable" class="el-icon-back icon_btn" title="还原" @click="backEvent(item)"></el-button>
                  <el-button type="text" class="el-icon-download icon_btn" title="下载" @click="loadEvent(item)"></el-button>
                </span>
              </li>
            </el-scrollbar>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button v-if="!uploadDisable" @click="handleUploadClick">上传新版本</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "FileVersion",
    props: {
      versionIsShow: Boolean,
      docVersionlist: Array,
      parentdata: Object,
      flag: String,
      uploadDisable: { // 禁用上传新版本功能
        type: Boolean,
        default: false
      }
    }, 
    data() {
      return {
        uploadDatas: {},
        success_code: "",
        showDialog: false,
        versionlist: [],
        userId: '',
        projectName: ''//项目名称
      };
    },
    created() {
      this.success_code = this.code.codeNum.SUCCESS;
      this.userId = this.$store.state.loginObject.userId;
      this.projectName = this.$store.state.projectMsg.projectMsg.name;
    },
    computed: {
      sourceNameCrm() {
        let obj = {
          1:'我的客户-融资客户-客户文档',
          2:'我的客户-自然人客户-客户文档',
          3:'我的客户-中介机构-客户文档'
        }
        return obj[this.$store.state.customObj.id]
      }
    },
    methods: {
      //版本返回
      backEvent(item) {
        switch (this.flag) {
          case 'project':
            this.versionBackProject(item);
            break
          case 'crm':
            this.versionBackCustom(item);
            break
          case 'paper':
            this.versionBackPaper(item)
            break
        }

      },
      versionBackCustom(item){
        console.log(123, item)
        if(this.parentdata.lockState !=-1){
          this.$message.warning('文件已锁定，您不可以进行该操作')
          return
        }
        this.$utils.checkSystemPermissionAsync('crm_financing__vesion_retore').then(res=>{
          if(!res){
            this.$message.warning('当前无权限')
            return
          }

          var send_data = {
            sourceName:this.sourceNameCrm,
            data: {
              docId: item.docId,
              id: item.id,
              updateBy: this.userId,
              docSize:item.docSize
            }
          };
          this.$post("/doc/crm/reBackDocVersion", send_data)
            .then((response)=> {
              if (this.success_code !== response.code) {
                this.$message.error(response.msg);
                return
              }
              this.$message.success( "还原成功");
              this.$emit("colseModule");
              this.$emit("queryDoc"); 
              // this.getTableData();

            })
            .catch(function(error) {
              console.log(error);
            });

        }, err=>{
          this.$message.error('当前无权限');
        })

      },
      versionBackProject(item){
        // 判断项目状态 已终止禁止操作
        if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
            this.$store.commit('projectStatusTips');
            return;
        }
        var send_data = {
          sourceName:'项目文档',//页面位置，记录日志用
          projectName: this.projectName,//项目名称，记录日志用
          data: {
            docId: item.docId,
            id: item.id,
            updateBy: this.userId,
            docSize: item.docSize,
            fileId: this.parentdata.id
          }
        };
        if (this.parentdata.auditStatus == 8) {
          this.$message.warning('归档文件不可进行此操作');
          return;
        }
        if (this.parentdata.lockState) {
          this.$message.warning('文件已锁定，不允许回退版本');
          return;
        }
        this.$parent.canOperating(
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
                  if (this.success_code != response.code) {
                    this.$message.error(response.msg);
                    return
                  }
                  this.$message.success( "还原成功");
                  this.$emit("colseModule");
                  this.$emit("queryDoc");                 
                  // this.getTableData();

                })
                .catch(function(error) {

                });
            }
          });
      },

      versionBackPaper(item){
        //文件版本还原
        if (this.parentdata.auditStatus == 1 || this.parentdata.auditStatus == 0 || this.parentdata.auditStatus == 6 || this.parentdata.auditStatus == 8) {
          this.$message.warning('审批通过/审批中/修订审批中不允许还原版本');
          return;
        }
        this.$post('/doc/paper/reBackDocVersion', {
          pageNo: 0,
          pageSize: 10,
          data: {
            docId: item.docId,
            id: item.id,
            updateBy: item.updateBy,
            docSize: item.docSize
          }
        })
        .then(res => {
          if (this.success_code != response.code) {
            this.$message.error(response.msg);
            return
          }
          this.$message.success( "还原成功");
          this.$emit("colseModule");
          this.$emit("queryDoc");                 
          // this.getTableData();
        })
        .catch(error => {
          console.log(error);
        });
      },

      //下载
      loadEvent(item) {
          console.log(item)
          console.log(this.flag)
        switch (this.flag) {
          case 'project':
            this.downloadProject(item);
            break
          case 'crm':
            this.downloadCustom(item);
            break
          case 'paper':
            this.downloadPaper(item);
            break
        }
      },
      downloadCustom(item){
          console.log(item)
        this.$utils.checkSystemPermissionAsync('crm_financing__file_down').then(res=>{
          if(!res){
            this.$message.warning('当前无权限')
            return
          }
          this.$store.commit("downloadRfs",  [{ name: item.docName, id: item.docRfs, docId:  item.docId}]);
        }, err=>{
          this.$message.error('当前无权限');
        })
      },
      downloadProject(item){
        this.canOperating(
          {
            docId: this.parentdata.id
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

      downloadPaper(item){
        //文件版本下载
        var proId = this.parentdata.projectId;
        var jurisdiction = rightSysPermissionFn(proId, 'paper_file_file_down');
        if (jurisdiction) {
          this.$store.commit('downloadRfs', [
            {
              name: item.docName,
              id: item.docRfs,
              docId: item.docId
            }
          ]);
        } else {
          this.$message({
            message: '当前无权限',
            type: 'warning'
          });
        }
      },

      getTableData(){
        let send_data = {
          token: this.token,
          userId: this.userId,
          pageNo: 0,
          pageSize: 10,
          data: {
            docId: this.parentdata.docId
          }
        };
        this.$post(`/doc/${this.flag}/getDocVersionList`, send_data)
        .then((response)=> {
          if (this.success_code !== response.code) {
            this.$message(response.msg);
            return
          }
          this.versionlist = response.data;
        })
      },


      //  上传弹框
      handleUploadClick() {
        // 判断项目状态 已终止禁止操作
        if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
            this.$store.commit('projectStatusTips');
            return;
        }
        this.close()
        this.$emit('new-version')
      },


      // 关闭窗口
      close() {
        this.$emit("colseModule");
      },


      //  判断用户是否有权限进行某一操作
      async canOperating(param, flag) {
        if (this.parentdata.createBy == this.userId) {
          return true;
        } else {
          if (!param) {
            return;
          }
          // this.queryPersonPower();
          var send_data = {
            token: this.token,
            userId: this.userId,
            data: {
              ids: param.docId,
              key: flag,
              docSource: 0
            }
          };
          var data = await this
            .$post("/doc/paper/validateFilePermByUserId", send_data)
            .then( (response)=> {
              if (this.success_code == response.code) {
                if (!response.data) {
                  this.$message({
                    message: "您没有该操作权限，请联系项目管理人员配置权限",
                    type: "error"
                  });
                  return false;
                } else {
                  return true;
                }
              } else {
                this.$message({
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
    },
    watch: {
      versionIsShow(val){
        this.showDialog = val
        this.versionlist = val ? this.docVersionlist : []
      }
    }
  };
</script>

<style>
  .versionsh .el-dialog__body{
    padding:30px 15px;
  }
  .versionsh li {
    width: 100%;
    line-height: 40px;
    font-weight: 600;
    border-bottom: 1px solid #e7e7e7;
  }
  .versionsh .span_two {
    float: left;
    width: 85px;
    text-align: center;
  }
  .versionsh .span_first {
    float: left;
    width: 200px;
    text-align: center;
  }
  .versionsh .el-checkbox {
    width: 20px;
    text-align: left;
    float: left;
    margin-right: 0;
  }
  .versionsh ul li div {
    height: 350px;
  }
  .versionsh ul li div li {
    font-weight: 400;
  }
  .versionsh .span_sec {
    float: left;
    width: 89px;
    height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .versionsh .span_btn {
    float: left;
    width: 193px;
    text-align: center;
  }
  .versionsh .el-dialog__footer{
    margin-right: 0px;
  }
  .icon_btn {
    cursor: pointer;
  }
</style>


