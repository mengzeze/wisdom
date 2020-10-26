<template>
  <div class="versionsh" id="versionsh">
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
                <!-- <el-checkbox v-model="item.checked" @change="changeEvent(item)"></el-checkbox> -->
                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                <span class="span_sec">{{item.userName}}</span>
                <span class="span_sec">{{$utls.handleFileSize(item.docSize)}}</span>
                <span class="span_sec">
                  <span class="el-icon-back icon_btn" title="还原" @click="backEvent(item)"></span>
                  <span class="el-icon-download icon_btn" title="下载" @click="loadEvent(item)"></span>
                </span>
              </li>
            </el-scrollbar>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="openModel">上传新版本</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "version",
    props: ["versionIsShow", "docVersionlist", "parentdata", "otherdata","verAccpet"],
    data() {
      return {
        addDoc_Version: false,
        uploadDocAddIsShow_Version: false,
        uploadDatas: {},
        success_code: "",
        isUploadSuccess: false,
        addDocNumber: 1,
        pro_id: '',
        showDialog: false,
        versionlist: []
      };
    },
    created() {
      this.success_code = this.code.codeNum.SUCCESS;
      this.pro_id = this.$store.state.projectMsg.pro_id;
    },
    computed: {
      sourceName() {
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
        if(this.parentdata.lockState !=-1){
          this.$message.warning('文件已锁定，您不可以进行该操作')
          return
        }
        var _this = this;
        var send_data = {
          token: this.otherdata.token,
          userId: this.otherdata.userId,
          sourceName:this.sourceName,
          data: {
            docId: item.docId,
            id: item.id,
            updateBy: this.otherdata.userId,
            docSize:item.docSize
          }
        };
        this.$post("/doc/crm/reBackDocVersion", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                message: "还原成功",
                type: "success"
              });
              _this.getTableData();
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //下载
      loadEvent(item) {
        this.$utils.checkSystemPermissionAsync('crm_financing__file_down').then(res=>{
          this.$store.commit("download",  [{ name: item.docName, id: item.docId }]);
        }, err=>{
          this.$message.error('当前无权限');
        })
      },
      getTableData() {
        var _this = this;
        var send_data = {
          token: this.otherdata.token,
          userId: this.otherdata.userId,
          pageNo: 1,
          data: {
            docId: this.parentdata.docId
          }
        };
        this.$post("/doc/crm/getDocVersionList", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.versionlist = response.data;
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //选中状态
      changeEvent(item) {
        console.log(item);
      },
      //  上传弹框
      openModel() {
        if(this.parentdata.lockState != -1){
          this.$message.warning('文件已锁定，您不可以进行该操作')
          return
        }

        this.uploadDatas = {
          projId: this.parentdata.crmId,
          // crmId: this.custData.id,
          parentId: 0,
          docSource: 2,
          docId: this.parentdata.docId
        };
        let options = {
          multiple: false,
          accept: this.verAccpet
        }
        this.$emit('upload', {options: options, data: this.uploadDatas})
        this.showDialog = false

      },
      // 关闭窗口
      close() {
        this.$emit("colseModule");
      },
      //  处理文件大小
      handleFileSize(limit) {
        var size = "";
        if (limit < 0.1 * 1024) {
          //小于0.1KB，则转化成B
          size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
          //小于0.1MB，则转化成KB
          size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
          //小于0.1GB，则转化成MB
          size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
          //其他转化成GB
          size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        if (dou == "00") {
          //判断后两位是否为00，如果是则删除00
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
      }
    },
    watch: {
      versionIsShow(val){
        this.showDialog = val
        if(val){
          this.versionlist = this.docVersionlist
        }
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

