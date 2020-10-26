<template>
  <div class="doc-recoveryfile">
    <div class="doc-recoveryfile-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目文档</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="head">项目文档</p>
    </div>
    
    <div class="doc-recoveryfile-content">
        <!-- <el-row class="finance_tit">
        <span>文件回收站</span>
      </el-row> -->
      <el-row class="clearfix func_box">
        <!-- <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="back">返回</el-button>
        <el-button type="primary" size="small" icon="el-icon-back" @click="backFile" id="project_recye_retore">还原</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteFile">删除</el-button>
        <el-button
          type="primary"
          size="small"
          @click="recoverFile"
          icon="el-icon-circle-close-outline"
        >清空回收站</el-button> -->
        <ul>
          <li class="back" @click="back">
            <a href="javascript:;">
              <i></i>
              返回
            </a>
          </li>
          <li class="backFile" @click="backFile" v-if="$utils.checkProjectPermission('project_recye_retore')">
            <a href="javascript:;">
              <i></i>
              还原
            </a>
          </li>
          <li class="deleteFile" @click="deleteFile" v-if="$utils.checkProjectPermission('project_recye_del')">
            <a href="javascript:;">
              <i></i>
              删除
            </a>
          </li>
          <li class="recoverFile" @click="recoverFile" v-if="$utils.checkProjectPermission('project_recye_clean')">
            <a href="javascript:;">
              <i></i>
              清空回收站
            </a>
          </li>
        </ul>
      </el-row>

      <el-table
        :data="tableData"
        ref="multipleTable"
        select-on-indeterminate
        style="width: 100%"
        tooltip-effect="dark"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'name', order: 'descending'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="文件名" sortable>
          <template slot-scope="scope">
            <p :title="scope.row.docName">{{scope.row.subName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="删除人" width="220"></el-table-column>
        <el-table-column prop="delTime" label="删除时间" width="220"></el-table-column>
        <el-table-column prop="size" label="大小" width="120"></el-table-column>
      </el-table>

      <div class="pages">
        <el-pagination
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="getTableDataFn"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "recoveryfile",
  props: [],
  data() {
    return {
      token: "",
      userId: "",
      projectId: 0,
      projectName: '',//项目名称
      success_code: "",
      tableData: [],
      total: 0, // 总条数
      pageNum: 0, // 第几页
      pageSize: 10, // 每页显示的数量
      currentPage: 1,
      loading: true, // 加载表格
      multipleSelection: [],  //表格选取的数据
    };
  },
  mounted(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.$store.state.projectMsg.pro_id;
  },
  methods: {
    // 获取表格数据
    getTableDataFn() {
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        data: {
          sourceType: 0,
          projId: this.projectId
        }
      };
      this.$post("/doc/project/recycled/queryRecycleds", send_data)
        .then((response)=> {
          if (this.success_code == response.code) {
            if(response.data.pageNum > response.data.pages && response.data.pages != 0) {
              this.pageNum = response.data.pages;
              this.getTableDataFn();
              return
            }
            this.loading = false;
            this.tableData = response.data.list;
            this.total = response.data.total;
            for (let i = 0; i < this.tableData.length; i++) {
                if(this.tableData[i].docName.length > 20){
                  this.tableData[i].subName = (this.tableData[i].docName).substring(0,20) + '……';
                } else {
                  this.tableData[i].subName = this.tableData[i].docName;
                }  
                this.tableData[i].size = this.handleFileSize(this.tableData[i].size);          
            }
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
    handleSizeChange(val){
      this.pageSize = val;
      this.getTableDataFn();
    },
    // 返回
    back(){
      // this.$emit("backToCustom")
      this.$router.push({path:'/projectDoc'});
    },
    // 还原
    backFile() {
      var _this = this;
      // 判断项目状态 已终止禁止操作
      if(_this.$store.state.projectMsg.projectMsg.endFlag  && _this.$store.state.projectMsg.projectMsg.endFlag === 1){
        _this.$store.commit('projectStatusTips');
        return;
      }
      var arr = this.handleSelectData();
      if(arr.length == 0){
        this.$message({
          message: "请选取至少一条数据",
          type:"warning"
        });
        return
      }
      this.$confirm("您确定要还原文件？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:'项目文档-回收站',//页面位置，记录日志用
          projectName: this.projectName,//项目名称，记录日志用
          data: {
            recycleIds: arr.join(","),
            projectId: this.projectId,
          }
        };
        this.$post("/doc/project/recycled/reductionProjectFile", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                type: "success",
                message: response.data
              });
              _this.getTableDataFn();
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
          });
      });
    },
    // 删除
    deleteFile() {
      var _this = this;
      var arr = this.handleSelectData();
      if(arr.length == 0){
        this.$message({
          message: "请选取至少一条数据",
          type:"warning"
        });
        return
      }
      this.$confirm("您确定要彻底删除文件？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:'项目文档-回收站',//页面位置，记录日志用
          projectName: this.projectName,//项目名称，记录日志用
          data: {
            recycleIds: arr.join(","),
            projectId: this.projectId,
            sourceType: 0,
          }
        };
        this.$post("/doc/project/recycled/deleteDocRecycled", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                type: "success",
                message: "删除成功！"
              });
              _this.getTableDataFn();
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
          });
      });
    },
    // 清空回收站
    recoverFile() {
      var _this = this;
      this.$confirm("您确定要清空回收站？清空后文件将无法恢复", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var send_data = {
          token: this.token,
          userId: this.userId,
          data: {
            sourceType: 0,
            projectId: this.projectId
          }
        };
        this.$post("/doc/project/recycled/clearRecycled", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                type: "success",
                message: "清空回收站成功！"
              });
              _this.getTableDataFn();
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
          });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 处理表格选取的数据
    handleSelectData(){
      var arr = [];
      for(var i=0;i<this.multipleSelection.length;i++){
        arr.push(this.multipleSelection[i].id)
      }
      return arr;
    },
    //  处理文件大小
    handleFileSize(limit) {
      if(limit == null){
        return;
      } else {
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
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.projectId = this.$route.query.projectId;
    this.projectName = this.$store.state.projectMsg.projectMsg.name;
    this.getTableDataFn();
  }
};
</script>
<style scoped lang="scss" type="text/css">
.doc-recoveryfile {
  .doc-recoveryfile-top{
    background: #fff;
  }
  .doc-recoveryfile-content {
    margin-top: 14px;
    // padding-top:20px;
    // padding-bottom:16px;
    padding:20px 10px 16px 10px;
    background: #fff;
  }
  position: relative;
  .finance_tit {
    padding: 10px 0;
    span {
      float: left;
      color: #333;
      font-size: 16px;
      line-height: 32px;
      margin-left: 10px;
    }
  }
  .func_box {
    text-align:left;
    padding-left: 10px;
    box-sizing: border-box;
    // .el-button {
    //   float: left;
    // }

    li {
      float: left;
      height: 30px;
      line-height: 30px;
      margin-right: 12px;
      padding: 0 16px;
      border: 1px solid #e7e7e7;
      background: rgba(242, 243, 245, 1);
      i {
        float: left;
        margin-top: 8px;
        margin-right: 6px;
      }
      a {
        float: left;
      }
    }
    li:hover a {
      color: #fff;
    }
    li:hover {
      background: #1a5fa4;
    }
    .back i {
      width: 16px;
      height: 14px;
      background: url("../../../../assets/image/customfile/fanhui.png") no-repeat 0
        0;
    }
    .back:hover i {
      background: url("../../../../assets/image/customfile/fanhuis.png") no-repeat
        0 0;
    }
    .backFile i {
      width: 16px;
      height: 14px;
      background: url("../../../../assets/image/customfile/fanhui2.png") no-repeat
        0 0;
    }
    .backFile:hover i {
      background: url("../../../../assets/image/customfile/fanhui2s.png") no-repeat
        0 0;
    }
    .deleteFile i {
      width: 14px;
      height: 14px;
      background: url("../../../../assets/project_doc/projectDocRecoveryDelete.png") no-repeat
        0 0;
    }
    .deleteFile:hover i {
      background: url("../../../../assets/project_doc/projectDocRecoveryDeleteActive.png")
        no-repeat 0 0;
    }
    .recoverFile {
      // background-color: #F7D8D7;
      // border: solid 1px #E27470;
      i {
        width: 16px;
        height: 16px;
        background: url("../../../../assets/image/customfile/qingkong.png")
          no-repeat 0 0;
      }
      a {
        // color: #E27470;
      }
    }
    .recoverFile:hover {
      // background-color: #E27470;
      i {
        background: url("../../../../assets/image/customfile/qingkongs.png")
          no-repeat 0 0;
      }
      a {
        color: #fff;
      }
    }
  }
  .pages {
    margin-top: 35px;
  }
  .head{
    text-align: left;     
    color:#333333;
    font-size: 20px;
    font-weight: 500;
    padding:5px 0 20px 10px;
  }
  .el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
  }
  // 以下为分页
  .el-pagination{
    // margin-top:20px;
    margin:0px 16px 16px 0;
    text-align: right;
  }
  
}
</style>
<style lang="scss" type="text/css">
.doc-recoveryfile .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.doc-recoveryfile .file_list .el-checkbox__input {
  width: 5%;
  height: 40px;
  float: left;
  position: relative;
  top: 10px;
}
.doc-recoveryfile .el-checkbox__label {
  width: 95%;
  padding-left: 0;
}
.doc-recoveryfile .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
}
.doc-recoveryfile .file_tit .el-checkbox__label {
  width: 5%;
  box-sizing: border-box;
}
.doc-recoveryfile .file_tit .el-checkbox__input {
  margin: 0 20px;
}
.doc-recoveryfile {
  .el-table{
    margin-top:20px;
  }
  .el-table .cell{
      line-height: 28px;
  }
  .el-table thead{
    color:#909399;
    font-weight: 500;
  }
  .el-table thead th{
    height: 48px;
    padding:0;
    background:rgb(250, 250, 250)
  }
  .el-table td, .el-table th.is-leaf{
    color:rgb(0, 0, 0);
  }
}

</style>
