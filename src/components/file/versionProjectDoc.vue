<template>
  <div class="version">
    <el-dialog title="版本" :close-on-click-modal="false" :visible.sync="versionIsShow" width="500px" @close="close">
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
              <li v-for="(item,index) in docVersionlist" :key="index" class="clearfix">
                <!-- <el-checkbox v-model="item.checked" @change="changeEvent(item)"></el-checkbox> -->
                <span class="span_btn">V{{item.docVersionNumber}} {{item.updateTime}}</span>
                <span class="span_sec">{{item.userName}}</span>
                <span class="span_sec">{{$utils.handleFileSize(item.docSize)}}</span>
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
        <el-button size="medium" @click="close">取 消</el-button>
        <el-button size="medium" @click="openModel">上传新版本</el-button>
      </span>
    </el-dialog>
    <!-- <el-input type="file" id="fileBtns" style="display:none;"></el-input> -->
    <upload-add-doc
      v-if="addDocs"
      :uploadDocAddIsShow="uploadDocAddIsShows"
      :uploadOtherData="uploadDatas"
      :uploadParamData="uploadParamData"
      :accpet="accpet"
      ref="uploadComplete"
      @sendValueToParent="uploadAddDocCloses"
      @docUpload="docUploads"
    ></upload-add-doc>
  </div>
</template>

<script>
import uploadAddDoc from "@/components/file/uploadAddDoc";
import {wisdom_doc} from "@/pages/common/js/doc.main";
export default {
  name: "version",
  props: [
    "versionIsShow",
    "parentdata",
    'uploadParamData',//上传版本相关数据
    'accpet'

  ],
  data() {
    return { 
      accpet: '',//允许用户上传的文件类型    
      otherdata: {
        token:"",
        userId:'',
      }, 
      docVersionlist:[],//版本列表
      uploadDocAddIsShows: false,
      addDocs: false,
      uploadDatas: {
        parentId: 0
      },
      success_code: ""
    };
  },
  components: {
    uploadAddDoc
  },
  created() {
    this.success_code = this.code.codeNum.SUCCESS;
  },
  mounted() {
      this.otherdata.token = this.$store.state.loginObject.userToken;
      this.otherdata.userId = this.$store.state.loginObject.userId;
  },
  methods: {
    //版本返回
    backEvent(item) {
      if(this.parentdata.lockState!==-1){
        this.$message.warning('文件已锁定，您不可以进行该操作')
        return
      }
      var _this = this;
      var send_data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        data: {
          docId: item.docId,
          id: item.id,
          updateBy: this.otherdata.userId,
          docSize: item.docSize
        }
      };
      this.$post("/doc/project/reBackDocVersion", send_data)
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
      this.$store.commit("download", [{ name: item.docName, id: item.docId }]);
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
          docId: this.parentdata.docId
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
          console.log(error);
        });
    },
    //  上传弹框
    openModel() {
      if(this.parentdata.lockState!==-1){
        this.$message.warning('文件已锁定，您不可以进行该操作')
        return
      }
      this.$emit("colseModule");
      this.addDocs = true;
      this.uploadDocAddIsShows = true;
      this.uploadDatas.parentId = 0;
    },
    //文件上传
    docUploads(uploadData) {
      console.log('版本文件',this.parentdata[0].type)
      console.log('上传版本类型',uploadData);
      let _this = this;
      let data = {
        token: this.otherdata.token,
        userId: this.otherdata.userId,
        data: {
          projId: this.parentdata.crmId,
          docId: this.parentdata.docId,
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
              _this.$refs.uploadComplete.uploadComplete();
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
    // 关闭窗口
    close() {
      this.$emit("colseModule");
    },
    //  关闭上传弹框
    uploadAddDocCloses() {
      this.uploadDocAddIsShow = false;
      this.addDocs = false;
      // this.uploadDatas = {};
      // _this.getTableData();
      window.location.reload()
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
  watch: {}
};
</script>

<style>
.version li {
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
}
</style>
