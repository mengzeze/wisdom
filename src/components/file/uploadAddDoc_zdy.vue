<template>
  <div class="upload-doc">
    <el-dialog title="文件上传" :close-on-click-modal="false" :visible.sync="uploadDoc" @close="clickEvent" width="40%" class="upload_dialog">
      <el-table :data="tableData" style="width: 100%" max-height="300" border>
        <el-table-column prop="name" label="文件名称" width="220">
            <template slot-scope="scope">
                <div class="upload_fileName">
                    <img :src="scope.row.fileIcon"></img>
                    <div>{{scope.row.name}}</div>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="size" label="大小" width="100"></el-table-column>
        <el-table-column prop="state" label="状态" width="160"></el-table-column>
        <el-table-column prop="progress" label="进度条" width="150">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.progress" :status="scope.row.uploadIsSuccess"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope" v-if="scope.row.state !== '上传成功'">
            <el-button @click="deleteDoc(scope.$index, tableData)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-input type="file" id="fileBtn" style="display:none;position:absolute;left:0;top:0;width:300px;margin-top:100px;"></el-input>                  -->
      <p class="upload-speed fl">上传速度：{{uploadSpeed}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="uploadDocAddBtn">添加文件</el-button>
        <el-button type="primary" @click="startUploadBtn" id="startUploadBtn" :disabled="docInitIsFinish">开始上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*!
 * 参数说明(uploadOtherData，accpet，limit可不传)
 * uploadOtherData  上传附带的其他参数，Object
 * accpet  允许用户上传的文件类型  是逗号拼接的字符串  如".doc,.xls"   不传则允许上传任意类型
 * limit   允许用户上传的最大数量  Number   不传则不限制上传数量
 * isUploadSuccess   Blooen   是否上传成功
 */
import { wisdom_doc } from "@/pages/common/js/doc.main";
// import { threadId } from 'worker_threads';
export default {
  name: "uploadDocAdd",
  props: ["uploadDocAddIsShow", "uploadOtherData", "isUploadSuccess", "accpet", "limit" ],
  data() {
    return {
      tableData: [],
      uploadSpeed: "",
      uploadData: {},
      uploadDoc: true,
      docInitIsFinish:true,
      accept_list: [], //允许上传的文件类型
      token:'',
      userId:''
    };
  },
  watch: {
    uploadDocAddIsShow: function(newV) {
      this.uploadDoc = true;
    }
  },
  created() {
    if (this.accpet) {
      this.accept_list = this.accpet.split(",");
    }
    this.tableData = [];
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },
  mounted() {
    this.onloadInit();
  },
  methods: {
    uploadComplete() {
       this.doc.uploadComplete();
    },
    startUploadBtn() {
      // $(".del_btn").addClass("is-disabled");
      this.doc.upload();
    },
    uploadDocAddBtn() {
      $("#fileBtn").eq(0).click();
    },
    destroy() {
        try {
            this.doc.destroy()
        } catch (e) {

        }
    },
    clickEvent() {
      this.destroy();
      this.$emit("sendValueToParent", false);
    },
    onloadInit() {
      let that = this;
      let param = {
        browse_button: "fileBtn",
        docSource: 2,
        token:this.token,
        userId:this.userId,
        callBack: (uploader,length) => {
          // $(".del_btn").removeClass("is-disabled");
          //整体成功时回调
          //console.dir("main.callBack");

            if(length > 0) {
                try {
                    uploader.destroy();
                } catch (e) {

                }
                this.$emit("docUploadAllsucess");
            } else {
                that.uploadSpeed = "";
            }
        },
        error: error => {
          // $(".del_btn").removeClass("is-disabled");
          //整体失败时回调
          //console.dir("main.error---");
          //console.dir(error);
        },
        fileAdd: file => {
          this.$utils.iconFilter(file.name)
            // this.iconFilter(file)
          //添加文件时触发
          if (that.limit && that.tableData.length >= that.limit) {
            that.$message({
              message: "最大允许上传" + that.limit + "条数据",
              type: "warning"
            });
            this.doc.removeFile(file.id);
            return;
          }
          if (that.accpet) {
            if (this.canUpload(file.name)) {
              that.tableData.push({
                name: file.name,
                // size: file.size / 1024 + "KB",
                size: that.handleFileSize(file.size),
                state: "初始化中",
                progress: file.percent,
                id: file.id,
                fileIcon: this.$utils.iconFilter(file.name)
              });
            } else {
              var str = "允许上传的文件类型为：";
              for (var i = 0; i < this.accept_list.length; i++) {
                str += "'" + this.accept_list[i] + "'";
              }
              this.doc.removeFile(file.id);
              that.$message({
                message: str,
                type: "warning"
              });
              return;
            }
          } else {

            that.tableData.push({
              name: file.name,
              // size: file.size / 1024 + "KB",
              size: that.handleFileSize(file.size),
              state: "初始化中",
              progress: file.percent,
              id: file.id,
              fileIcon: file.fileIcon
            });
          }
        },
        FileUploaded: (file, docId, docName) => {
          //单个文件上传成功
          for (let i = 0; i < that.tableData.length; i++) {
            if (that.tableData[i].id === file.id) {
              that.tableData[i].state = "上传成功";
              that.tableData[i].progress = 100;
            }
          }
          //这里向父组件派发事件，把数据传过去
          that.uploadData.docId = docId;
          that.uploadData.docName = docName;
          that.uploadData.fileData = file;
          that.$emit("docUpload", {uploadData:that.uploadData,uploadList:this.tableData});
        },
        FileUploadedError: file => {
          //单个文件上传失败
          for (let i = 0; i < that.tableData.length; i++) {
            if (that.tableData[i].id === file.id) {
              that.tableData[i].state = "上传失败";
            }
          }
        },
        fileInitComplete: file => {
          //文件初始化完成
          for (let i = 0; i < that.tableData.length; i++) {
            if (that.tableData[i].id === file.id) {
              that.tableData[i].state = "初始化完成，等待上传";
              that.tableData[i].fileIcon = file.fileIcon;
              //that.tableData[i].type = file.type;
            }
          }
          this.docInitIsFinish = false;
        },
        //上传过程中不断触发
        UploadProgress: (up, file) => {
          //lifengru
          for (let i = 0; i < that.tableData.length; i++) {
            if (that.tableData[i].id === file.id) {
              that.tableData[i].progress = up.total.percent;
              that.tableData[i].state = "上传中";
            }
          }
          if (up.files.length !== 0) {
            // $("#percent").text(up.total.percent + "%");
          }
          var size = "";
          var myBytesPerSec = up.total.bytesPerSec;
          if (myBytesPerSec < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = myBytesPerSec.toFixed(2) + "B";
          } else if (myBytesPerSec < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (myBytesPerSec / 1024).toFixed(2) + "KB";
          } else if (myBytesPerSec < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (myBytesPerSec / (1024 * 1024)).toFixed(2) + "MB";
          } else {
            //其他转化成GB
            size = (myBytesPerSec / (1024 * 1024 * 1024)).toFixed(2) + "GB";
          }

          var sizeStr = size + ""; //转成字符串
          var index = sizeStr.indexOf("."); //获取小数点处的索引
          var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
          if (dou == "00") {
            //判断后两位是否为00，如果是则删除00
            size = sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
          }
          that.uploadSpeed = size;
        },
        totalPercent: percent => {
          //TODO 总上传百分比
          // $("#percent").text(percent + "%");
        },
        filters: {
          // mime_types : [ //只允许上传图片和zip文件
          //   { title : "Image files", extensions : "jpg,gif,png" },
          //   { title : "Zip files", extensions : "zip" }
          // ],
          // max_file_size : '400kb', //最大只能上传400kb的文件
          prevent_duplicates: true, //不允许选取重复文件
          prevent_empty: false //是否过滤空文件
        }
      };
      if (this.uploadOtherData) {
        param = $.extend({}, this.uploadOtherData, param);
      }
      this.doc = new wisdom_doc(param);
    },
    deleteDoc(index, rows) {
      this.$message({
        type: "success",
        message: '删除成功'
      });
      this.doc.removeFile(rows[index].id);
      rows.splice(index, 1);
    },
    //  判断用户允许上传的文件格式
    canUpload(fileName) {
      String.prototype.endWith = function(endStr) {
        var d = this.length - endStr.length;
        return d >= 0 && this.lastIndexOf(endStr) == d;
      };
      for (var i = 0; i < this.accept_list.length; i++) {
        var flag = this.accept_list[i];
        if (fileName.endWith(flag)) {
          return true;
        }
      }
    },
    iconFilter(itemValue) { //过滤重命名的icon
        var reg = /(\.)/g;
        var matches = reg.exec(itemValue.name).index;
        var renameSuffix = itemValue.name.substring(matches + 1, itemValue.name.length)
        var hz_name = renameSuffix;
        if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/DocType.png");
        } else if (
            hz_name == "xls" ||
            hz_name == "xlsx" ||
            hz_name == "excel"
            ) {
            itemValue.fileIcon = require("../../pages/common/fileIcon/XlsType.png");
        } else if (
            hz_name == "ppt" ||
            hz_name == "pptx" ||
            hz_name == "pps" ||
            hz_name == "ppsx" ||
            hz_name == "ppsm"
            ) {
                itemValue.fileIcon = require("../../pages/common/fileIcon/PptType.png");
        } else if (
            hz_name == "jpg" ||
            hz_name == "jpeg" ||
            hz_name == "gif" ||
            hz_name == "bmp" ||
            hz_name == "png"
            ) {
            itemValue.fileIcon = require("../../pages/common/fileIcon/ImgType.png");
        } else if (
            hz_name == "wmv" ||
            hz_name == "avi" ||
            hz_name == "dat" ||
            hz_name == "asf" ||
            hz_name == "rm" ||
            hz_name == "rmvb" ||
            hz_name == "mpg"
            ) {
            itemValue.fileIcon = require("../../pages/common/fileIcon/VideoType.png");
        } else if (
            hz_name == "mpeg" ||
            hz_name == "mkv" ||
            hz_name == "dvix" ||
            hz_name == "dv" ||
            hz_name == "flv" ||
            hz_name == "mov" ||
            hz_name == "mp4" ||
            hz_name == "qt" ||
            hz_name == "smil" ||
            hz_name == "swf" ||
            hz_name == "wmv" ||
            hz_name == "3gp"
            ) {
            itemValue.fileIcon = require("../../pages/common/fileIcon/VideoType.png");
        } else if (
            hz_name == "mp3" ||
            hz_name == "wav" ||
            hz_name == "wma" ||
            hz_name == "mid"
            ) {
            itemValue.fileIcon = require("../../pages/common/fileIcon/MusicType.png");
        } else if (hz_name == "pdf") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/PdfType.png");
        } else if (hz_name == "indd") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/indd.png");
        } else if (hz_name == "ai") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/ai.png");
        } else if (hz_name == "psd") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/ps.png");
        } else if (hz_name == "tif") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/tiff.png");
        } else if (hz_name == "zip" || hz_name == "rar") {
            itemValue.fileIcon = require("../../pages/common/fileIcon/RarType.png");
        } else {
            itemValue.fileIcon = require("../../pages/common/fileIcon/other.png");
        }

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
  //   isUploadSuccess(){
  //     if(this.uploadDocAddIsShow && this.doc){
  //       this.doc.destroy()
  //     }
  //   }
  }
};
</script>

<style scoped lang="scss" type="text/css">
// .upload-speed {
//   position: absolute;
//   left: 60px;
//   bottom: 34px;
// }
    .upload_dialog {
        .el-dialog__header{
            border-bottom:1px solid #DDDDDD;
            text-align: center;
        }
        .el-dialog__body{
            padding: 20px 20px;

        }
        .el-table th{
            background: #F0F0F0;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(51,51,51,1);
            padding: 0 0;
        }
        .el-table tr{
            height: 44px;
        }
        .el-table td{
            padding: 0 0;
        }
        .el-table tbody tr .el-table__row{
            height: 44px;
        }
        .el-table__header-wrapper .el-table__header{
             background: red;
        }
        .el-table__body-wrapper .el-table__row td{
            height: 44px;
        }
        .upload_fileName{
            display: flex;
            align-items: center;
            img{
                display: inline-block;
                width: 23px;
                height: 27px;
            }
            div{
                width: 180px;
                margin-left: 5px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
        }
    }
</style>

