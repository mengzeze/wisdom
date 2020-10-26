<template>
  <div class="mytaskbox">
    <div class="messagecenter_contenti_headers">
      <!-- <p class="headers_break">
        <span>主工作台</span>/
        <span>我的任务</span>
      </p> -->
      <el-breadcrumb separator="/" class="page-breadcrumb">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>我的任务</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="headers_clearFix">
        <span class="headers_clearFix_title">我的任务</span>
      </h3>
      <div class="right_search" v-on:keyup.enter="search">
        <el-input v-model="search_name" maxlength="20" placeholder="请输入任务名称关键字进行搜索"></el-input>
      </div>
      <div style="float:left">
        <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
        <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
      </div>
    </div>
    <div class="mytask">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我创建的" name="first"></el-tab-pane>
        <el-tab-pane label="我执行的" name="second"></el-tab-pane>
        <el-tab-pane label="抄送我的" name="third"></el-tab-pane>
        <el-tab-pane label="未完成的" name="fourth"></el-tab-pane>
        <el-tab-pane label="已完成的" name="fivth"></el-tab-pane>
        <el-tab-pane label="已逾期的" name="sixth"></el-tab-pane>

        <el-row class="tbheader_row">
          <el-col :span="5">任务名称</el-col>
          <el-col :span="4">项目名称</el-col>
          <el-col :span="3">任务状态</el-col>
          <el-col :span="3">关闭状态</el-col>
          <el-col :span="3">逾期状态</el-col>
          <el-col :span="3">截至时间</el-col>
          <el-col :span="3">创建时间</el-col>
        </el-row>
        <el-row class="rows" v-for="(item,index) in tableData" :key="index">
          <el-col
            :span="5"
            class="content_col"
            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            :title="item.name"
          >{{item.name}}</el-col>
          <el-col
            :span="4"
            class="endtime_col"
            style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            :title="item.projectName"
          >{{item.projectName}}</el-col>
          <el-col :span="3" class="com_col">
            <p v-if="item.status == 0">待分配</p>
            <p v-if="item.status == 1">待认领</p>
            <p v-if="item.status == 2">待进行</p>
            <p v-if="item.status == 3">正在进行</p>
            <p v-if="item.status == 4">已完成</p>
          </el-col>
          <el-col :span="3" class="com_col">
            <p v-if="item.closeFlag  == 0" style="color: #52C41A">正常</p>
            <p v-if="item.closeFlag == 1" style="color: #999999">已关闭</p>
          </el-col>
          <el-col :span="3" class="com_col">
            <p v-if="item.overdue == 0" style="color: #52C41A">正常</p>
            <p v-if="item.overdue == 1" style="color: #FA541C">已逾期</p>
          </el-col>
          <el-col :span="3" class="close_col" :title="item.endTime | filtertime">{{item.endTime | filtertime}}</el-col>
          <el-col :span="3" class="starttime_col" :title="item.createTime | filtertime">{{item.createTime | filtertime}}</el-col>
        </el-row>

        <div class="nodata_box" v-if="tableData.length == 0">暂无数据</div>

        <div class="pages">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
            :page-sizes="[10, 20, 50, 100]"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      userId: "",
      success_code: "",
      projectId: "",
      activeName: "first",
      search_name: "",
      tableData: [],
      total: 0, // 总条数
      pageNum: 1, // 第几页
      pageSize: 10, // 每页显示的数量
      currentPage: 1
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.pageNum = 1;
      this.currentPage = 1;
      this.search_name = "";
      this.getTableData();
    },
    exchangeCurrentPage() {
      this.tableData = [];
      this.getTableData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(val)
      setTimeout(()=>{
         this.getTableData();
      },500)
    },
    getTableData() {
      var _this = this;
      var url = "";
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        data: {
          // projectId: this.projectId
          queryType: 0
        }
      };
      if (this.activeName == "first") {
        // url = "/info/task/getTaskByCreateUserOrAssigner";
        send_data.data["queryType"] = 0;
      } else if (this.activeName == "second") {
        // url = "/info/task/getExecutorTask";
        send_data.data["queryType"] = 1;
      } else if (this.activeName == "third") {
        // url = "/info/task/getCopyerTask";
        send_data.data["queryType"] = 2;
      } else if (this.activeName == "fourth") {
        // url = "/info/task/getNotCompleteTask";
        send_data.data["queryType"] = 3;
      } else if (this.activeName == "fivth") {
        // url = "/info/task/getIsCompleteTask";
        send_data.data["queryType"] = 4;
      } else if (this.activeName == "sixth") {
        // url = "/info/task/getOverdueTask";
        send_data.data["queryType"] = 5;
      }
      if (this.search_name != "") {
        send_data.data["taskName"] = this.search_name;
      }
      this.$post("/info/task/getMyTask", send_data)
        .then((response)=> {
          if (_this.success_code == response.code) {
            _this.tableData = response.data.list;
            _this.total = response.data.total;
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
    search() {
      this.getTableData();
      this.currentPage = 1
    },
    reset() {
      this.search_name = "";
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.getTableData();
  },
  watch: {
    currentPage(newV, oldV) {
      this.pageNum = newV;
      this.exchangeCurrentPage();
    }
  }
};
</script>
<style lang="">
.close_col {
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.starttime_col {
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.mytaskbox .messagecenter_contenti_headers {
  padding: 0 20px;
  margin: auto;
  height: 150px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;

  .headers_break {
    height: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.5%;
  }

  .headers_clearFix {
    height: 40px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    // margin-top: 15px;
    margin-bottom: 10px;

    .headers_clearFix_title {
      font-size: 20px;
      line-height: 40px;
      color: #333;
    }
  }
  .right_search {
    // position: absolute;
    // right: 20px;
    // top: 15px;
    width: 300px;
    display: flex;
    height: 35px;
    float: left;
    margin-right: 10px;
  }
}
.mytask {
  margin-top: 14px;
  position: relative;
  // padding: 15px;
  background-color: #fff;

  .rows {
    height: 50px;
    line-height: 50px;
    border-collapse: separate;
    border-bottom: solid 1px #ebeef5;
    .el-col {
      height: 50px;
    }
    .content_col {
      p {
        line-height: 30px;
      }
      p:last-child() {
        color: #999;
      }
    }
    .starttime_col {
      // color: #999;
    }
  }
  .rows:hover {
    background-color: #f5f7fa;
  }
  .nodata_box {
    text-align: center;
    height: 57px;
    line-height: 57px;
    color: #909399;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
  }
  .pages {
    padding: 30px 0;
    text-align: right;
    padding-right: 20px;
  }
  .tbheader_row {
    background: rgb(250, 250, 250);
    color: rgb(0, 0, 0);
    font-weight: 500;
    padding: 12px;
    min-width: 0;
    border-bottom: solid 1px #ebeef5;
  }
}
</style>

<style lang="scss">
.mytaskbox .right_search {
  .el-input {
    margin-right: 10px;
  }
  .el-input__inner {
    height: 39px !important;
    line-height: 39px !important;
  }
  .el-button {
    padding: 0 20px;
    height: 39px;
    line-height: 39px;
  }
}
</style>


