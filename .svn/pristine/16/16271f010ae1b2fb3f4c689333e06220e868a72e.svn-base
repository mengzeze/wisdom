<template>
  <div class="recoveryfile">
    <el-row class="finance_tit">
      <span>文件回收站</span>
    </el-row>
    <el-row class="clearfix func_box">
      <ul>
        <li class="back" @click="back">
          <a href="javascript:;">
            <i></i>
            返回
          </a>
        </li>
        <li class="backFile" @click="backFile" v-if="$utils.checkSystemPermission('crm_financing__recye_retore')">
          <a href="javascript:;">
            <i></i>
            还原
          </a>
        </li>
        <li class="deleteFile" @click="deleteFile" v-if="$utils.checkSystemPermission('crm_financing__recye_del')">
          <a href="javascript:;">
            <i></i>
            删除
          </a>
        </li>
        <li class="recoverFile" @click="recoverFile" v-if="$utils.checkSystemPermission('crm_financing__recye_clean')">
          <a href="javascript:;">
            <i></i>
            清空回收站
          </a>
        </li>
      </ul>
      <!-- <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="back">返回</el-button>
      <el-button type="primary" size="small" icon="el-icon-back" @click="backFile">还原</el-button>
      <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteFile">删除</el-button>
      <el-button
        type="primary"
        size="small"
        @click="recoverFile"
        icon="el-icon-circle-close-outline"
      >清空回收站</el-button>-->
    </el-row>

    <el-table
      :data="tableData"
      ref="multipleTable"
      :stripe="true"
      select-on-indeterminate
      style="width: 100%"
      tooltip-effect="dark"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#FAFAFA',color:'#000'}"
      :default-sort="{prop: 'name', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="docName" label="文件名" sortable>
          <template slot-scope="scope">
              <p :title="scope.row.docName">{{scope.row.docName}}</p>
          </template>
      </el-table-column>
      <el-table-column prop="userName" label="删除人"></el-table-column>
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
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "recoveryfile",
  props: ["custData", "naturalData", "finacnData"],
  data() {
    return {
      token: "",
      userId: "",
      success_code: "",
      tableData: [],
      total: 0, // 总条数
      pageNum: 1, // 第几页
      pageSize: 10, // 每页显示的数量
      loading: true, // 加载表格
      multipleSelection: [] //表格选取的数据
    };
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
    // 获取表格数据
    getTableDataFn() {
         if (this.$store.state.customObj.id == 1) {
                this.companyid = this.custData.id;
            //this.companyNames = this.custData.name;
            } else if (this.$store.state.customObj.id == 2) {
                this.companyid = this.naturalData.id;
                //this.companyNames = this.naturalData.name;
            } else if (this.$store.state.customObj.id == 3) {
                this.companyid = this.finacnData.id;
                //this.companyNames = this.finacnData.name;
            }
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        data: {
          // crmid: 1,
          //   parentId: 0
          sourceType: 2,
          crmType: this.custData.crmType,
          projId: this.companyid
        }
      };
      this.$post("/doc/crm/recycled/queryRecycleds", send_data)
        .then((response)=> {
            this.loading = false;
            if (this.success_code != response.code) {
                this.$message.error(response.msg);
                return
            }
            if(response.data.pageNum > response.data.pages) {
              this.pageNum = response.data.pages;
              this.getTableDataFn();
              return
            }
            this.tableData = response.data.list;
            this.tableData.map(item => {
            if (item.size) {
                item.size = this.handleFileSize(item.size);
            }
            });
            console.log(this.tableData);
            this.total = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 分页请求数据
    currentChange(val) {
      this.pageNum = val
      this.getTableDataFn();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableDataFn();
    },
    // 返回
    back() {
      this.$emit("backToCustom");
    },
    // 还原
    backFile() {
      var _this = this;
      var arr = this.handleSelectData();
      if (arr.length == 0) {
        this.$message({
          message: "请选择要还原的文件",
          type: "warning"
        });
        return;
      }
      this.$confirm("您确定要还原文件？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            recycleIds: arr.join(",")
          }
        };
        this.$post("/doc/crm/recycled/reductionProjectFile", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                type: "success",
                message: response.data
              });
              _this.pageNum = 1;
              _this.getTableDataFn();
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
      });
    },
    // 删除
    deleteFile() {
      var _this = this;
      var arr = this.handleSelectData();
      if (arr.length == 0) {
        this.$message({
          message: "请选取至少一条数据",
          type: "warning"
        });
        return;
      }
      this.$confirm("您确定要彻底删除文件？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            recycleIds: arr.join(","),
            sourceType: 2
          }
        };
        this.$post("/doc/crm/recycled/deleteDocRecycled", send_data)
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
            console.log(error);
          });
      });
    },
    // 清空回收站
    recoverFile() {
            if (this.$store.state.customObj.id == 1) {
                this.companyid = this.custData.id;
            //this.companyNames = this.custData.name;
            } else if (this.$store.state.customObj.id == 2) {
                this.companyid = this.naturalData.id;
                //this.companyNames = this.naturalData.name;
            } else if (this.$store.state.customObj.id == 3) {
                this.companyid = this.finacnData.id;
                //this.companyNames = this.finacnData.name;
            }
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
            crmType: this.custData.crmType,
            sourceType: 2,
            projId: this.companyid
          }
        };
        this.$post("/doc/crm/recycled/clearRecycled", send_data)
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
            console.log(error);
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
    handleSelectData() {
      var arr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].id);
      }
      return arr;
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
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    console.log('走着，111')
    this.getTableDataFn();
  },
};
</script>
<style scoped lang="scss" type="text/css">
.recoveryfile {
  position: relative;
  background: #fff;
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
    padding-left: 10px;
    margin-bottom: 15px;
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
      background: url("../../../../../assets/image/customfile/fanhui.png") no-repeat 0
        0;
    }
    .back:hover i {
      background: url("../../../../../assets/image/customfile/fanhuis.png") no-repeat
        0 0;
    }
    .backFile i {
      width: 16px;
      height: 14px;
      background: url("../../../../../assets/image/customfile/fanhui2.png") no-repeat
        0 0;
    }
    .backFile:hover i {
      background: url("../../../../../assets/image/customfile/fanhui2s.png") no-repeat
        0 0;
    }
    .deleteFile i {
      width: 16px;
      height: 16px;
      background: url("../../../../../assets/image/customfile/shanchu.png") no-repeat
        0 0;
    }
    .deleteFile:hover i {
      background: url("../../../../../assets/image/customfile/shanchu1s.png")
        no-repeat 0 0;
    }
    .recoverFile {
      // background-color: #F7D8D7;
      // border: solid 1px #E27470;
      i {
        width: 16px;
        height: 16px;
        background: url("../../../../../assets/image/customfile/qingkong.png")
          no-repeat 0 0;
      }
      a {
        // color: #E27470;
      }
    }
    .recoverFile:hover {
      // background-color: #E27470;
      i {
        background: url("../../../../../assets/image/customfile/qingkongs.png")
          no-repeat 0 0;
      }
      a {
        color: #fff;
      }
    }
  }
  .pages {
    margin-top: 35px;
    text-align: right;
  }
}
</style>
<style>
.recoveryfile .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.recoveryfile .file_list .el-checkbox__input {
  width: 5%;
  height: 40px;
  float: left;
  position: relative;
  top: 10px;
}
.recoveryfile .el-checkbox__label {
  width: 95%;
  padding-left: 0;
}
.recoveryfile .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
}
.recoveryfile .file_tit .el-checkbox__label {
  width: 5%;
  box-sizing: border-box;
}
.recoveryfile .file_tit .el-checkbox__input {
  margin: 0 20px;
}
.recoveryfile .el-table th{
  height: 47px;
  padding: 0;
  line-height: 47px;
}

.recoveryfile .el-table .cell{
    width: 93%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
</style>
