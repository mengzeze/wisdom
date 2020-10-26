<template>
  <div class="systemlog">
    <div class="systemlog_contenti_headers">
      <p class="headers_break">
        <span>系统日志</span>
      </p>
      <h3 class="headers_clearFix">
        <span class="headers_clearFix_title">系统日志</span>
      </h3>
    </div>
    <div class="systemlog_container">
      <div @keyup.enter="searchFn">
        <el-form
          ref="form"
          :model="search_form"
          :inline="true"
          class="form_box clearfix"
        >
          <div class="search_left">
            <el-form-item
              label="选择时间："
              @click="initTimeFn"
              style="margin-bottom:20px;"
            >
              <!--            <div v-if="browserType==='IE'">-->
              <!--              <el-date-picker-->
              <!--                @change="handleStartChange"-->
              <!--                value-format="yyyy-MM-dd HH:mm:ss"-->
              <!--                v-model="search_form.startTime"-->
              <!--                type="date"-->
              <!--                placeholder="开始日期">-->
              <!--              </el-date-picker>-->
              <!--              <span class="query-date-mid">至</span>-->
              <!--              <el-date-picker-->
              <!--                @change="handleEndChange"-->
              <!--                value-format="yyyy-MM-dd HH:mm:ss"-->
              <!--                v-model="search_form.endTime"-->
              <!--                type="date"-->
              <!--                placeholder="结束日期">-->
              <!--              </el-date-picker>-->
              <!--            </div>-->
              <date-range
                :date-start.sync="search_form.startTime"
                :date-end.sync="search_form.endTime"
                format="yyyy-MM-dd HH:mm:ss"
              ></date-range>
            </el-form-item>
            <el-form-item label="日志分类：">
              <el-select
                v-model="search_form.logType"
                clearable
                placeholder="请选日志分类"
              >
                <el-option
                  v-if="$utils.m('project_meeting')"
                  key="1001"
                  value="1001"
                  label="会议"
                ></el-option>
                <el-option
                  v-if="$utils.m('project_vote')"
                  key="1002"
                  value="1002"
                  label="投票"
                ></el-option>
                <el-option
                  v-if="$utils.m('customer_manage')"
                  key="1005"
                  value="1005"
                  label="客户"
                ></el-option>
                <el-option
                  v-if="$utils.m('paper_manage')"
                  key="1008"
                  value="1008"
                  label="底稿"
                ></el-option>
                <el-option
                  v-if="$utils.checkSystemPermission('project_report')"
                  key="1015"
                  value="1015"
                  label="底稿报送"
                ></el-option>
                <el-option
                  v-for="(item, index) in type_data"
                  :key="index"
                  :label="item.lable"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="事件内容："
              title="包含以下全部关键词（以空格区分）"
              style="margin-left: 23px;"
            >
              <el-input
                v-model="inputsleset"
                title="包含以下全部关键词（以空格区分）"
                placeholder="包含以下全部关键词（以空格区分"
              ></el-input>
            </el-form-item>
            <el-form-item label="操作用户：" style="margin-left: 23px;">
              <span :title="inputuser"
                ><el-input
                  style="pointer-events: none;width: 59%;vertical-align: top;"
                  v-model="inputuser"
                  placeholder="请选择用户"
                ></el-input></span
              ><el-button @click="selectpeopel" type="primary"
                >选择人员</el-button
              >
            </el-form-item>
            <el-form-item style="margin-left:10px;">
              <!-- <div class="search_right"> -->
              <el-button class="param_btn" type="primary" @click="searchFn">
                <i class="el-icon-search"></i>
                <span>查询</span>
              </el-button>
              <el-button @click="resetFn">
                <i class="el-icon-refresh"></i>
                <span>重置</span>
              </el-button>
              <el-button
                type="primary"
                class="param_btn"
                v-if="$utils.checkSystemPermission('bask_sys_log_export')"
                @click="exportFn"
                style="display:inline-block"
              >
                <i class="el-icon-upload2"></i>
                <span>导出</span>
              </el-button>
              <el-button
                type="primary"
                class="param_btn"
                v-if="$utils.checkSystemPermission('bask_sys_log_export')"
                @click="historyExportFn"
                style="display:inline-block"
              >
                <i class="el-icon-upload2"></i>
                <span>历史年度数据导出</span>
              </el-button>
              <!-- </div> -->
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="systemlog_container_box">
        <el-table
          :data="data"
          :header-cell-style="{ background: '#FAFAFA', color: '#000' }"
        >
          <el-table-column width="40"></el-table-column>
          <el-table-column prop="createTime" label="时间" width="280">
            <template slot-scope="scope">
              <p
                :title="scope.row.createTime"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.createTime }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="200">
            <template slot-scope="scope">
              <p
                :title="scope.row.userName"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.userName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="事件">
            <template slot-scope="scope">
              <p
                :title="scope.row.content"
                v-html="scope.row.contentHight"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              ></p>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <div class="pages">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>

    </div>
    <el-dialog
      title="选择导出年度"
      :close-on-click-modal="false"
      :visible.sync="yearExportVisible"
      width="500px"
      class="select-export-date"
    >
      <div style="height:60px;">
        <el-button type="primary" @click="exportCurrentYear">
          <i class="el-icon-upload2"></i>
          导出当年
        </el-button>
        <el-button
          type="primary"
          @click="exportLastYear"
          class="export_last_year"
        >
          <i class="el-icon-upload2"></i>
          上一年
        </el-button>
      </div>
      <div>
        <el-date-picker
          @focus="$utils.handleTimeFocus"
          v-model="selectedYear"
          type="year"
          placeholder="选择年"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button
          type="primary"
          class="select-year-export"
          @click="selectedYearFn"
        >
          <i class="el-icon-upload2"></i>
          导出
        </el-button>
      </div>
    </el-dialog>
    <findall-deptuser
      :findFlagShow.sync="findFlag"
      :findUserObj="findUserObj"
      v-on:findAllUser="findAllUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
  </div>
</template>

<script>
import { valid } from "semver";
import { URL } from "url";
import Vue from "vue";
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
export default {
  components: {
    findallDeptuser
  },
  data() {
    return {
      inputsleset: "",
      inputuser: "",
      findFlag: false,
      findUserObj: [],
      findState: {},
      checkState: {},
      copypeople: [],
      browserType: this.$utils.checkBrowser(),
      token: "",
      userId: "",
      projectId: "",
      success_code: "",
      search_form: {
        startTime: "",
        endTime: "",
        logType: ""
      },
      type_data: [
        {
          value: "1000",
          lable: "登录"
        },
        // {
        //   value: "1001",
        //   lable: "会议"
        // },
        // {
        //   value: "1002",
        //   lable: "投票"
        // },
        {
          value: "1003",
          lable: "工作"
        },
        {
          value: "1004",
          lable: "日程"
        },
        // {
        //   value: "1005",
        //   lable: "客户"
        // },
        {
          value: "1006",
          lable: "项目"
        },
        {
          value: "1007",
          lable: "审批"
        },
        // {
        //   value: "1008",
        //   lable: "底稿"
        // },
        {
          value: "1009",
          lable: "组织架构"
        },
        {
          value: "1010",
          lable: "用户"
        },
        {
          value: "1011",
          lable: "角色权限"
        },
        {
          value: "1012",
          lable: "流程引擎"
        },
        {
          value: "1013",
          lable: "系统配置"
        },
        {
          value: "1014",
          lable: "检索日志"
        }
      ],
      data: [],
      total: 0, // 项目消息总条数
      pageSize: 10, // 每页显示的数量
      currentPage: 1,
      yearExportVisible: false, //年度导出弹窗
      selectedYear: "", //导出时选择的年
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.success_code = this.code.codeNum.SUCCESS;
    console.log('created', this.currentPage);
    this.getDataFn();
  },
  methods: {
    handleCurrentChange(val) {
      console.log('handleCurrentChange', val);
      this.currentPage = val;
      this.getDataFn();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // this.currentPage = console.log(this.currentPage, "--currentPage");
      //this.currentPage = 1;
      this.getDataFn();
      console.log('handleSizeChange',val);
    },
    selectpeopel() {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.findUserObj = [...this.copypeople];
    },
    findAllUser(data) {
      if (!data || !data.length) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
      }
      console.log(data);
      let person = data;
      let obj = {};
      let peon = person.reduce((cur, next) => {
        obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      this.inputuser = peon.map(v => v.name).join(",");
      this.copypeople = peon;
      console.log(this.copypeople);
    },
    handleStartChange(val) {
      let time = val;

      let endDateVal = this.search_form.endTime.substr(0, 10) + " 00:00:00";
      if (new Date(time).getTime() > new Date(endDateVal).getTime()) {
        this.search_form.startTime = "";
        this.$message.warning("开始时间不能晚于结束时间");
      }
    },
    handleEndChange(val) {
      let time = val;
      let beginDateVal = this.search_form.startTime.substr(0, 10) + " 00:00:00";
      console.log(
        new Date(time).getTime() + 1,
        new Date(beginDateVal).getTime()
      );
      if (!(new Date(time).getTime() + 1 > new Date(beginDateVal).getTime())) {
        this.search_form.endTime = "";
        this.$message.warning("结束时间不能早于开始时间");
      }
    },
    //  重置搜索条件
    resetFn() {
      this.search_form = {
        startTime: "",
        endTime: "",
        type: ""
      };
      this.inputsleset = "";
      this.inputuser = "";
      this.findUserObj = [];
      this.copypeople = [];
    },
    //  获取表格数据
    getDataFn() {
      var _this = this;
      var send_data = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {}
      };
      send_data.data = $.extend({}, this.search_form, send_data.data);
      send_data.data.endTime = this.search_form.endTime
        ? this.search_form.endTime.substr(0, 11) + "23:59:59"
        : "";
      console.log(send_data);
      send_data.data.userIds = this.copypeople.map(v => v.userId);
      send_data.data.contents = this.inputsleset;
      this.$post("/sys/getSysLogAll", send_data)
        .then(response => {
          if (_this.success_code == response.code) {
            _this.data = response.data.list;
            _this.total = response.data.total;
            console.log(_this.data, "---_this.data");
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
    //  初始化搜索时间
    initTimeFn() {
      var now = new Date();
      if (this.search_form.startTime == "" && this.search_form.endTime == "") {
        this.search_form.endTime = now.valueOf();
        this.search_form.startTime = now.setMonth(now.getMonth() - 1);
      }
    },
    //  搜索
    searchFn() {
      if (this.search_form.startTime == null) {
        this.search_form.startTime = "";
      }
      if (this.search_form.endTime == null) {
        this.search_form.endTime = "";
      }
      if (this.search_form.startTime == "" && this.search_form.endTime == "") {
      } else if (
        this.search_form.endTime != "" &&
        this.search_form.startTime == ""
      ) {
        return this.$message({
          message: "请输入开始日期",
          type: "warning"
        });
      } else if (
        this.search_form.startTime != "" &&
        this.search_form.endTime == ""
      ) {
        return this.$message({
          message: "请输入结束日期",
          type: "warning"
        });
      }

      this.currentPage = 1;
      console.log(2, this.currentPage);
      this.getDataFn();
    },
    //  结束日期判断
    startimeChange(val) {
      if (val == null) {
        this.search_form.startTime = "";
      }
      var start = new Date(val).getTime();
      var end = new Date(this.search_form.endTime).getTime();
      if (this.searchFn.endTime && this.search_form.endTime != "") {
        if (end < start) {
          this.$message({
            message: "开始日期不能大于当前日期",
            type: "warning"
          });
          this.search_form.startTime = "";
        }
      }
    },
    endtimeChange(val) {
      if (val == null) {
        this.search_form.endTime = "";
      }
      var start = new Date(this.search_form.startTime).getTime();
      var end = new Date(val).getTime();
      if (this.search_form.startTime && this.search_form.startTime != "") {
        if (end < start) {
          this.$message({
            message: "结束日期不能小于当前日期",
            type: "warning"
          });
          this.search_form.endTime = "";
        }
      }
    },
    //  导出
    exportFn() {
      // if (this.data.length == 0) {
      //   return this.$message({
      //     message: "数据为空无法导出",
      //     type: "warning"
      //   });
      // }
      this.$message({
        message: "正在导出",
        type: "success"
      });
      var arr = [];
      // for (var i = 0; i < this.data.length; i++) {
      //   arr.push({
      //     createTime: this.data[i]["createTime"],
      //     userName: this.data[i]["userName"],
      //     content: this.data[i]["content"],
      //     description: this.data[i]["description"]
      //   });
      // }

      var sendData = {
        data: {
          logType: this.search_form.logType,
          startTime: this.search_form.startTime,
          userIds: this.copypeople.map(v => v.userId),
          contents: this.inputsleset,
          endTime: this.search_form.endTime
            ? this.search_form.endTime.substr(0, 11) + "23:59:59"
            : ""
        }
      };
      this.$store.commit("export", {
        url: "/sys/exportSysLog",
        data: sendData
      });
    },
    //历史年度数据导出
    historyExportFn() {
      this.yearExportVisible = true;
    },
    // 导出当年数据
    exportCurrentYear() {
      let startTime = new Date().getFullYear() + "-01-01 00:00:00";
      let endTime = new Date().getFullYear() + "-12-31 24:00:00";
      this.exportYearFn(startTime, endTime);
    },
    // 导出上一年数据
    exportLastYear() {
      let startTime = new Date().getFullYear() - 1 + "-01-01 00:00:00";
      let endTime = new Date().getFullYear() - 1 + "-12-31 24:00:00";
      this.exportYearFn(startTime, endTime);
    },
    // 选择年份导出
    selectedYearFn() {
      if (this.selectedYear === "") {
        this.$message({
          message: "请选择时间",
          type: "warning"
        });
        return;
      }
      // let startTime = this.formatDateTime(new Date(this.selectedYear));
      // let endTime = this.formatDateTime(new Date(this.selectedYear.getFullYear() + '/12/31 24:00:00'));
      let startTime = this.formatDateTime(new Date(this.selectedYear));
      let endTime = this.selectedYear.getFullYear() + "-12-31 24:00:00";
      this.exportYearFn(startTime, endTime);
    },
    // 按年导出
    exportYearFn(startTime, endTime) {
      this.$message({
        message: "正在导出",
        type: "success"
      });
      let arr = [];
      let sendData = {
        data: {
          logType: "", //日志类型
          startTime: startTime,
          endTime: endTime,
          userIds: this.copypeople.map(v => v.userId),
          contents: this.inputsleset
        }
      };
      this.$store.commit("export", {
        url: "/sys/exportSysLog",
        data: sendData
      });
    },
    // 时间格式转换
    formatDateTime(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  },
};
</script>

<style lang="scss" scoped>
.systemlog .systemlog_contenti_headers {
  padding: 0 10px;
  margin: auto;
  height: 96px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;

  .headers_break {
    height: 46px;
    line-height: 46px;
  }

  .headers_clearFix {
    margin: 5px 0 19px;

    .headers_clearFix_title {
      font-size: 20px;
      font-weight: 600;
      // line-height: 40px;
      // color: #333;
    }
  }
}
.systemlog_container {
  margin: 10px 0;
  padding: 20px 0;
  background-color: #fff;

  .form_box {
    display: flex;

    .search_right {
      flex: 1;
      margin-left: 30px;
      text-align: left;

      .el-button {
        height: 40px;
        line-height: 1;
      }
    }
  }

  .systemlog_container_box {
    margin-top: 10px;

    .box {
      border-radius: 4px;
      border: solid 1px #e8eaef;

      .box-header {
        text-align: left;
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        background-color: #f6f7fa;
        border-bottom: solid 1px #e8eaef;
        span {
          margin-left: 8px;
          font-weight: bold;
        }
      }
      table {
        margin-top: -2px;
        width: 100%;
        font-size: small;
        border-collapse: collapse;
        border: 1px solid #ebeef5;

        td {
          min-width: 150px;
          padding: 8px 10px;
          text-align: left;
          height: 32px;
          line-height: 32px;
        }

        tbody tr:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .pages {
    padding: 30px;
    padding-right: 40px;
    text-align: right;
  }
}
.el-form-item {
  float: left;
}
.el-form-item:first-child {
  width: 570px;
}
.el-form-item:nth-child(2) {
  width: 320px;
}
</style>

<style lang="scss">
.systemlog .el-table__body .el-table__row {
  height: 53px;
  line-height: 53px;
}
.systemlog {
  .select-export-date {
    .el-dialog__header {
      border-bottom: 1px solid #dddddd;
      text-align: center;
    }
    .select-year-export {
      vertical-align: top;
    }
    .el-date-editor.el-input {
      width: 146px;
    }
    .export_last_year {
      margin-left: 14px;
    }

    .el-dialog {
      text-align: center;
    }
  }
}
</style>
