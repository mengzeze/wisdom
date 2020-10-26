<template>
  <div class="top_nav" id="taskinfosssssss">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="sear_tab clearfix">
      <div class="fl clearfix companyDiv">
        <span class="fl">
          <toggle-project
            type="project_task"
            @change-project="handleChangeProject"
          ></toggle-project>
        </span>
      </div>
      <div v-if="stqh">
        <el-button
          v-if="drwrmb"
          class="el-icon-bottom"
          @click="primary"
          size="small"
          style="float: left;margin-top: 20px;"
          type="primary"
          >&nbsp;导入任务模板</el-button
        >
        <el-button
          v-if="educe && $utils.checkProjectPermission('project_task_export')"
          class="el-icon-upload2"
          @click="Task_export"
          size="small"
          style="float: left;margin-top: 20px; margin-left: 10px;"
          type="primary"
          >&nbsp;任务导出</el-button
        >
      </div>
      <div class="fr" id="fs" style="position: relative;">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item @click="taskss" index="1" @select="handleSelect">
            <el-dropdown @visible-change="tasksDisplay">
              <span class="el-dropdown-link"> 任务<i :class="icon"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="text"
                    style="color:#333333"
                    @click.stop="wdrw"
                  >
                    <img
                      src="../../../assets/image/3054520F-C0ED-4b3d-B7BD-254037FDBF0C.png"
                      alt
                      style="float:left;margin-top:-2px"
                    />
                    &nbsp;&nbsp;&nbsp;我的任务
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    type="text"
                    style="color:#333333"
                    @click="dialogVisibles"
                  >
                    <img
                      src="../../../assets/image/E997DB17-C3E3-40c7-AD0F-06CC6693EB1A.png"
                      alt
                      style="float:left;margin-top:-6px"
                    />
                    &nbsp;&nbsp;&nbsp;今天的任务
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item
                  v-show="
                    stqh &&
                      $utils.checkProjectPermission('project_task_queryAll')
                  "
                >
                  <el-button type="text" style="color:#333333" @click="ober">
                    <img
                      src="../../../assets/image/C0F61D58-06CA-40fa-BEB2-D286F4023BD5.png"
                      alt
                      style="float:left;margin-top:-6px"
                    />
                    &nbsp;&nbsp;&nbsp;项目组成员任务
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <div @mouseenter="overTasks" @mouseleave="outTasksTimer" >
              <p style="float: left;margin-right: 3px;">
                
                任务
              </p>
              <i style="font-size: 13px;"  :class="icon"></i>
            </div> -->
            <!-- <div
              v-if="seen13"
              @mouseenter="overTasksContinue"
              @mouseleave="outTasksContinue"              
              style="position: absolute;right: -27px;top: 63px;z-index: 9999;width: 136px;height:100%;background:white;;"
            >
              <ul class="lsit">
                <li @click.stop="wdrw">
                  <img
                    src="../../../assets/image/3054520F-C0ED-4b3d-B7BD-254037FDBF0C.png"
                    alt
                    style="width:19px;height:19px;margin-top: 3px;margin-right: 4px;    margin-left: 10px;"
                  />
                  <el-button type="text" style="color:#333333;">我的任务</el-button>
                </li>
                <li @click="dialogVisibles">
                  <el-button type="text" style="color:#333333;">
                    <img
                      src="../../../assets/image/E997DB17-C3E3-40c7-AD0F-06CC6693EB1A.png"
                      alt
                      style="width: 19px;height: 23px;float: left;margin-top: -4px;margin-left: 7px;padding-right: 3px;"
                    />
                    今天的任务
                  </el-button>
                </li>
                <li
                  v-show="stqh && $utils.checkProjectPermission('project_task_queryAll')"
                  @click="ober"
                >
                  <el-button type="text" style="color:#333333;">
                    <img
                      src="../../../assets/image/C0F61D58-06CA-40fa-BEB2-D286F4023BD5.png"
                      alt
                      style="width: 19px;height: 18px;float: left;margin-top: 0px;margin-left: 6px;padding-right: 5px;"
                    />
                    项目组成员任务
                  </el-button>
                </li>
              </ul>
            </div> -->
            <div
              v-if="seen10"
              @mouseleave="lebv"
              style="width: 158px;background: white;padding: 1%;overflow: hidden;border-radius: 7px;height: 300px;position: absolute;z-index: 9990;right: -36px;top: 72px;"
            >
              <div style="width:90%;margin: 0 auto;">
                <el-input
                  size="small"
                  style="margin-top: 7px;"
                  v-model="filterText"
                  placeholder="请搜索"
                ></el-input>
              </div>
              <div class="menus member-task" style="margin-top: 3px;">
                <el-scrollbar style="height：100%">
                  <el-dropdown-item
                    v-if="
                      !querySearch(filterText) ||
                        querySearch(filterText).length === 0
                    "
                  >
                    <el-button type="text" style="color:#999999;"
                      >暂无数据</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-else
                    :key="item.id"
                    v-for="item in querySearch(filterText)"
                  >
                    <el-button
                      type="text"
                      @click.stop="selectxzr(item)"
                      style="color:#999999;"
                      >{{ item.usName }}</el-button
                    >
                  </el-dropdown-item>
                </el-scrollbar>
              </div>
            </div>
          </el-menu-item>
          <el-menu-item
            v-if="$utils.checkProjectPermission('project_task_distribution')"
            @click="distributed"
            index="2"
          >
            <el-badge :value="toBeAssigne" class="item">
              <span>待分配的任务</span>
            </el-badge>
          </el-menu-item>
          <!-- <el-menu-item @click="distributed" index="/project_tasks/distributed"  id="project_task_distribution" class="all_proje_enum">
                         <el-badge :value="toBeAssigne" class="item">
                         <span>待分配的任务</span>
                        </el-badge>
          </el-menu-item>-->
          <el-menu-item
            v-if="$utils.checkProjectPermission('project_task_claim')"
            @click="shelters"
            index="3"
          >
            <el-badge :value="getUnc" class="item">
              <span>待认领的任务</span>
            </el-badge>
          </el-menu-item>
          <span
            style="float: right;margin-top: 12px;width: 69px;height: 10px;"
            v-if="stqh"
            @click.stop="viewtabss"
          >
            <el-button
              style="margin-top: -2px;"
              type="text"
              class="color-default color-primary-hover"
              >视图切换</el-button
            >
          </span>
          <span
            style="float: right;margin-top: 19px;width: 69px;height: 10px;"
            v-if="stqhok"
          ></span>
          <div id="ids" style="display:inline;" v-if="stqh">
            <div class="viewTaba" v-show="viewtabs">
              <div class="viewTabaTitle">
                <span>视图</span>
                <el-button
                  type="text"
                  @click="viewtabs = false"
                  style="float: right;margin-top: -13px;"
                >
                  <i class="el-icon-close"></i>
                </el-button>
              </div>
              <div class="viewTabaReadio" v-if="seenx">
                <span>
                  <el-menu-item index="1">
                    <el-radio v-model="radios" label="1">看板视图</el-radio>
                  </el-menu-item>
                </span>
                <span>
                  <el-menu-item index="1" @click="dalist()">
                    <el-radio v-model="radios" label="2">任务列表</el-radio>
                  </el-menu-item>
                </span>
              </div>
              <div class="viewTabaReadio" v-if="seenxs">
                <span>
                  <el-menu-item index="1" @click="dalists()">
                    <el-radio v-model="radioss" label="1">看板视图</el-radio>
                  </el-menu-item>
                </span>
                <span>
                  <el-menu-item index="1">
                    <el-radio v-model="radioss" label="2">任务列表</el-radio>
                  </el-menu-item>
                </span>
              </div>
              <div class="screening">
                <span>任务筛选</span>
                <el-input
                  size="mini"
                  placeholder="查找任务"
                  v-model="inputFind"
                  @keydown.enter.native="seek"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <div class="practitioners" v-if="valuesta">
                <span style="padding-right: 10px;">排序&nbsp;：</span>
                <el-select
                  v-model="values"
                  size="mini"
                  placeholder="请选择排序"
                >
                  <el-option
                    v-for="item in optionss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="practitioners">
                <span style="float: left;">执行人：</span>
                <div style="float: left;">
                  <select-lazy
                    ref="executor"
                    placeholder="请选择执行人"
                    v-model="valuezxr"
                    multiple
                    :getUserId="true"
                    :options="{
                      label: 'name',
                      value: 'userId'
                    }"
                    :list="optionszxz2s"
                  ></select-lazy>
                  <!-- <el-select multiple size="mini" v-model="valuezxr" placeholder="请选择执行人">
                    <el-option
                      v-for="item in optionszxz2s"
                      :key="item.value"
                      :label="item.label"
                      :value="item.name"
                    ></el-option>
                  </el-select> -->
                </div>
                <i style="clear: both;"></i>
              </div>
              <div class="practitioners">
                <span style="float: left;">抄送人：</span>
                <div style="float: left;">
                  <select-lazy
                    ref="copy"
                    placeholder="请选择抄送人"
                    v-model="valuezxr2"
                    multiple
                    :options="{
                      label: 'name',
                      value: 'userId'
                    }"
                    :list="optionszxz2s"
                  ></select-lazy>
                  <!-- <el-select multiple size="mini" v-model="valuezxr2" placeholder="请选择参与人">
                    <el-option
                      v-for="item in optionszxz2s"
                      :key="item.value"
                      :label="item.label"
                      :value="item.name"
                    ></el-option>
                  </el-select> -->
                </div>
              </div>
              <div class="endTimes" style="clear: both;">
                <span>开始时间：</span>
                <div class="block" id="ids">
                  <el-date-picker
                    @focus="$utils.handleTimeFocus"
                    v-model="endtime"
                    size="mini"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </div>
              <div class="endTimes" id="times">
                <span>截止时间：</span>
                <div class="block" id="ids">
                  <el-date-picker
                    @focus="$utils.handleTimeFocus"
                    v-model="satrttime"
                    type="daterange"
                    range-separator="至"
                    size="mini"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </div>
              <div class="ids">
                <el-button
                  @click="seek"
                  size="medium"
                  type="primary"
                  style="margin-top: 30px;width: 320px;margin-left: 0px;"
                  >搜索</el-button
                >
                <el-button
                  @click="Empty"
                  size="medium"
                  style="margin-top: 20px;width: 320px;margin-left: 0px;"
                  >清空条件搜索</el-button
                >
              </div>
            </div>
          </div>
        </el-menu>
      </div>
    </div>
    <el-dialog
      title="今天的任务"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <div>
        <template>
          <div
            @click="batch"
            style="text-align: left;margin-top: -35px;margin-bottom: 5px;"
          >
            <el-button size="mini" type="primary"
              ><i class="iconfont tongyi"></i> 标记完成</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            @row-click="rowclick"
            tooltip-effect="dark"
            @select="selectsinfo1"
            @select-all="selectsinfo2"
            style="width: 100%"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="name" label="任务名称">
              <template slot-scope="scope">
                <div class="jins">
                  <span
                    style="background: #919191"
                    id="tabss"
                    v-if="scope.row.priority == 0"
                  ></span>
                  <span
                    style="background: #ffc53d"
                    id="tabss"
                    v-if="scope.row.priority == 1"
                  ></span>
                  <span
                    style="background:#ff4d4f"
                    id="tabss"
                    v-if="scope.row.priority == 2"
                  ></span>
                  <span
                    :title="scope.row.name"
                    style="padding-left: 7px;cursor: pointer"
                    >{{ scope.row.name }}</span
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column property label="创建时间">
              <template slot-scope="scope">
                <div class="jins">
                  <span :title="scope.row.createTime | filtertime">{{
                    scope.row.startTime | filtertime
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="endTime" label="结束时间">
              <template slot-scope="scope">
                <div class="jins">
                  <span :title="scope.row.endTime | filtertime">{{
                    scope.row.endTime | filtertime
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="priority" label="优先级">
              <template slot-scope="scope">
                <div class="jins">
                  <span title="普通" v-if="scope.row.priority == 0">普通</span>
                  <span title="紧急" v-else-if="scope.row.priority == 1"
                    >紧急</span
                  >
                  <span title="非常紧急" v-else>非常紧急</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button size="medium" type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <tasksDetail
      :dayj="dayj"
      :flagdetail="flagdetail"
      @gxbox="gxbox"
      :ids="ids"
      :flagdetaildatas="flagdetaildatas"
      :isTaskUser="isTaskUser"
      :isTaskEdit="isTaskEdit"
    />
  </div>
</template>
<script>
import tasksDetail from "./tasks/tasksDetail";
import { all } from "q";
import axios from "axios";
export default {
  data() {
    return {
      selectionProps: {
        label: "label",
        value: "name"
      },
      dayj: {},
      radios: "1",
      radioss: "2",
      flagdetail: false,
      flagdetaildatas: "",
      ids: "",
      stqhok: false,
      multipleSelection: [],
      filterText: "",
      icon: "el-icon-arrow-down",
      seenx: false,
      seen10: false,
      optionszxzarr: [],
      optionszxzarr2: [],
      seenxs: false,
      drwrmb: true,
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      tableData: [],
      infoClass: false,
      warninClass: false,
      dangerClass: false,
      viewtabs: false,
      inputsearch: "",
      //看板视图的单选
      radio: "1",
      inputFind: "",
      valuesta: false,
      stqh3: false,
      stqh: false,
      value: "",
      stqhs: false,
      activeIndex: "1",
      //今天的任务的弹框
      dialogVisible: false,
      checked: true,
      visible: false,
      listData: [],
      //搜索公司名称
      cxlis: "",
      placeholders1: "",
      projectId: "",
      toBeAssigne: "",
      getUnc: "",
      selectsinfodata: [],
      inputFind: "",
      valuezxr: [],
      valuezxr2: [],
      educe: true,
      optionszxz: "",
      optionszxz2s: [],
      seen13: false,
      seen14: false,
      satrttime: "",
      endtime: "",
      tjstate: "",
      // token:"String",
      // userId:"0",
      optionss: [
        {
          label: "开始时间降序",
          value: 0
        },
        {
          label: "开始时间升序",
          value: 1,
          disabled: true
        },
        {
          label: "结束时间降序",
          value: 2
        },
        {
          label: "结束时间升序",
          value: 3
        },
        {
          label: "创建时间降序",
          value: 4
        },
        {
          label: "创建时间升序",
          value: 5
        }
      ],
      values: "",
      isTaskUser: true, //当前用户对某个项目是否有编辑权限
      isTaskEdit: true
    };
  },
  components: {
    tasksDetail
  },
  computed: {
    changeMemberTab() {
      return this.$store.state.projectstat.states;
    },
    isrefs() {
      return this.$store.state.projectstat.isref;
    },
    Memberpzhi() {
      return this.$store.state.projectstat.pzhistates;
    }
  },
  watch: {
    querySearch: {
      handler: (newVal, oldVal) => {
        console.log(newVal, "---newVal");
      },
      deep: true
    },
    dialogVisible(val) {
      if (!val) {
        this.$store.state.setupdata = { state: true, num: Math.random() };
      }
    },
    isrefs(val) {
      if (val.state != 0) {
        this.todus();
        this.todurl();
      }
    },
    changeMemberTab: function(newV, oldV) {
      this.stqh = newV == 1;
    },
    Memberpzhi: function(newV, oldV) {
      this.drwrmb = newV.state != 1;
    },
    $route(to, from) {
      if (to.path == "/project_tasks/tasks") {
        this.radios = "1";
        this.radioss = "2";
        this.seenxs = false;
        this.seenx = true;
        this.valuesta = false;
        this.stqhok = false;
        this.educe = true;
        this.drwrmb = true;
      } else if (to.path == "/project_tasks/viewswitches") {
        this.radios = "1";
        this.radioss = "2";
        this.seenxs = true;
        this.seenx = false;
        this.valuesta = true;
        this.stqhok = false;
        this.educe = false;
        this.drwrmb = false;
      } else {
        this.drwrmb = false;
        this.stqhok = true;
        this.stqh = false;
        this.educe = false;
      }
    }
  },
  created() {
    this.projectId = this.$store.state.projectMsg.pro_id;
  },
  mounted() {
    if (this.$route.path == "/project_tasks/tasks") {
      this.stqhs = true;
      this.seenx = true;
      this.seenxs = false;
      this.valuesta = false;
    } else {
      this.stqhs = false;
      this.seenx = false;
      this.seenxs = true;
      this.valuesta = true;
      this.educe = false;
      this.drwrmb = false;
    }
    if (this.$store.state.projectstat.states == 1) {
      this.stqh = true;
    }

    if (this.$route.path == "/project_tasks/tasks") {
      this.seenxs = false;
      this.seenx = true;
    } else if (this.$route.path == "/project_tasks/viewswitches") {
      this.seenxs = true;
      this.seenx = false;
    }
    this.saveProjectmsg(); //新增任务弹窗草稿中要用到项目阶段
  },
  methods: {
    //根据项目ID获取项目信息
    saveProjectmsg() {
      var obj = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.projectId
        }
      };
      this.$post("/info/project/getProjectInfo", obj)
        .then(response => {
          var data = response.data;
          if (response.code == this.code.codeNum.SUCCESS) {
            this.$store.commit("projectMsg", response.data);
          } else {
            console.log(response.msg);
          }
        })
        .catch(error => {
          console.log(response.msg);
        });
    },
    rowclick(items) {
      axios
        .all([this.queryIsTaskUser(items), this.queryIsTaskEdit(items)])
        .then(
          axios.spread((res1, res2) => {
            this.isTaskUser = res1.data;
            this.isTaskEdit = res2.data;
            this.flagdetails(items);
          })
        );
    },
    flagdetails(row) {
      // this.flagdetail = true
      var data = {
        token: this.token,
        userId: this.userId,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          id: row.id
        }
      };
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          this.flagdetaildatas = response.data;
          this.flagdetail = true;
          this.ids = {
            implementStageId: row.implementStageId,
            parentId: row.id
          };
          this.dayj = true;
        })
        .catch(function(error) {});
    },
    // 查询对当前编辑的任务是否有权限
    async queryIsTaskUser(item) {
      var data = {
        userId: this.userId,
        projectId: this.$store.state.projectMsg.projectMsg.id,
        data: {
          id: item.id //任务id
        }
      };
      console.log("查询权限2");
      return await this.$post("/info/task/isTaskUser", data)
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            return res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询对当前编辑的任务是否是创建人和是否有分配权限
    async queryIsTaskEdit(item) {
      var data = {
        userId: this.userId,
        projectId: this.$store.state.projectMsg.projectMsg.id,
        data: {
          id: item.id //任务id
        }
      };
      return await this.$post("/info/task/isTaskEdit", data)
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            return res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gxbox() {
      this.flagdetail = false;
      this.dialogVisibles();
    },
    batch() {
      if (this.selectsinfodata.length == 0) {
        this.$message.error("请选择任务");
        return;
      }
      this.$confirm(`是否要标记完成所有选中的任务 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url, data;
          data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId
          };
          if (this.selectsinfodata.length == 1) {
            url = "/info/task/completeTask";
            data.data = {
              id: this.selectsinfodata.map(v => v.id)[0]
            };
          } else {
            url = "/info/task/completeTasks";
            data.data = {
              idSet: this.selectsinfodata.map(v => v.id)
            };
          }
          this.$post(url, data)
            .then(response => {
              if (
                response.code == 0 ||
                response.code == -3517 ||
                response.code == -3021
              ) {
                if (this.selectsinfodata.length == 1) {
                  this.$message.success(response.msg);
                } else {
                  var m;
                  if (response.data.failNum == null) {
                    m = "全部标记成功";
                  } else {
                    m = `${response.data.successNum}个任务标记成功，${response.data.failNum}个任务标记失败`;
                  }
                  this.$message.success(m);
                }
                this.selectsinfodata = [];
                this.dialogVisibles();
              } else if (response.code == -3515) {
                this.$message.error(response.msg);
              } else {
                this.$message.error(response.msg);
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },
    selectsinfo1(selection, row) {
      if (row.status == 4) {
        this.selects([row]);
      }
      console.log(selection);
      this.selectsinfodata = selection;
    },
    selectsinfo2(row) {
      if (row == "") {
        var data = [];
        this.tableData.forEach(e => {
          if (e.status == 4) {
            data.push(e);
          }
        });
        if (data != "") {
          this.selects(data);
        }
      }
      this.selectsinfodata = row;
    },
    selects(item) {
      this.$confirm("是否要取消标记完成该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          item.forEach(element => {
            this.toUnderway(element);
          });
        })
        .catch(() => {
          this.dialogVisibles();
        });
    },
    toUnderway(item) {
      this.$post("/info/task/toUnderway", {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      })
        .then(response => {
          if (response.code == 0) {
            this.$message.success(response.msg);
            this.dialogVisibles();
          } else if (response.code == -3021) {
            this.$message.success(response.msg);
            this.dialogVisibles();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(function(error) {});
    },
    handleChangeProject(val) {
      this.projectId = val.id;
    },
    Empty() {
      this.inputFind = "";
      this.values = [];
      this.valuezxr = [];
      this.valuezxr2 = [];
      this.endtime = [];
      this.satrttime = [];
    },
    Task_export() {
      this.$store.commit("Task_exports", { state: "1" });
      //  console.log(this.$store.state.projectstat.Task_exports)
    },
    primary() {
      // 判断项目是否是已终止状态
      if (
        this.$store.state.projectMsg.projectMsg.endFlag &&
        this.$store.state.projectMsg.projectMsg.endFlag === 1
      ) {
        this.$store.commit("projectStatusTips");
        return;
      }
      this.$store.commit("pzhistate", { state: "1" });
    },
    ober() {
      this.seen10 = true;
      this.seen13 = true;
      this.filterText = "";
      !this.optionszxzarr.length && this.zxz();
    },
    taskss() {
      this.seen13 = false;
      this.$router.push({ path: "/project_tasks/tasks" });
      this.$store.state.projectMsgs.topdata = 1;
    },
    viewtabss() {
      this.seen13 = false;
      this.viewtabs = true;
      this.$store.state.projectMsgs.topdata = 1;
      // 查询数据：
      // 查询抄送人
      !this.optionszxz2s.length && this.copy();
      // 查询执行人
      !this.optionszxzarr.length && this.zxz();
    },
    distributed() {
      this.seen13 = false;
      this.$router.push({ path: "/project_tasks/distributed" });
      this.$store.state.projectMsgs.topdata = 1;
      // 查询待分配的任务
      this.todus();
    },
    shelters() {
      this.seen13 = false;
      this.$router.push({ path: "/project_tasks/shelters" });
      this.$store.state.projectMsgs.topdata = 1;
      // 查询待认领的任务
      this.todurl();
    },
    lebvs() {
      this.seen13 = false;
    },
    lebv() {
      this.seen10 = false;
      this.seen13 = false;
    },
    tasksDisplay(flag) {
      console.log(flag, "flagg");
      this.icon = flag ? "el-icon-arrow-up" : "el-icon-arrow-down";
      if (!this.stqh) return;

      // 判断项目权
      if (this.$utils.checkProjectPermission("project_task_queryAll")) {
        $("#app #project_task_queryAll").show();
      } else {
        $("#app #project_task_queryAll").hide();
      }
    },
    // overTasks() {
    //   this.seen13 = true;
    //   this.icon = "el-icon-arrow-up";

    //   if(!this.stqh) return
    //   // 判断项目权
    //   if (this.$utils.checkProjectPermission('project_task_queryAll')) {
    //     $("#app #project_task_queryAll").show();
    //   } else {
    //     $("#app #project_task_queryAll").hide();
    //   }
    // },
    // outTasksTimer(){
    //   setTimeout(()=>{
    //     this.outTasks()
    //   },300)
    // },
    // outTasks(){
    //   if (this.tasksDisplay) {
    //     this.seen13 = true
    //   }else{
    //     this.seen13 = false;
    //   }

    // },
    // overTasksContinue() {
    //   this.seen13 = true;
    //   this.tasksDisplay = true
    //   this.icon = "el-icon-arrow-up";
    // },
    // outTasksContinue() {
    //   this.seen13 = false;
    //   this.tasksDisplay = false
    //   this.icon = "el-icon-arrow-down";
    // },
    rwmouslw() {
      this.seen13 = false;
    },
    querySearch(queryString) {
      return this.optionszxzarr.filter(item => {
        if (item.usName.includes(queryString)) {
          return item;
        }
      });
    },
    //待分配
    todus() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.projectId
        }
      };
      var _this = this;
      this.$post("/info/task/toBeAssignedCount ", data)
        .then(response => {
          if (response.data < 100) {
            _this.toBeAssigne = response.data;
          } else {
            _this.toBeAssigne = "99" + "+";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 待认领
    todurl() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.projectId
        }
      };
      var _this = this;
      this.$post("/info/task/getUnclaimedTaskCount", data)
        .then(response => {
          if (response.data < 100) {
            _this.getUnc = response.data;
          } else {
            _this.getUnc = "99" + "+";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    wdrw() {
      this.$store.state.projectMsgs.topdata = 1;
      this.$router.push({ path: "/project_tasks/mytasks" });
      this.seen13 = false;
    },
    dalists() {
      this.viewtabs = false;
      this.$router.push({ path: "/project_tasks/tasks" });
    },
    dalist() {
      this.viewtabs = false;
      this.$router.push({ path: "/project_tasks/viewswitches" });
    },
    dialogVisibles() {
      this.seen13 = false;
      this.dialogVisible = true;
      this.$store.state.projectMsgs.topdata = 1;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.projectId
        }
      };
      var _this = this;
      this.$post("/info/task/getTodayTask", data)
        .then(response => {
          _this.tableData = response.data;
          this.$nextTick(() => {
            response.data.forEach(element => {
              if (element.status == 4) {
                this.$refs.multipleTable.toggleRowSelection(element);
              }
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    selectxzr(item) {
      var arr = [item.userId];
      if (this.valuesta == true) {
        var data = {
          data: {
            projectId: this.projectId,
            executorUserIds: arr
          },
          token: this.token,
          userId: this.userId
        };
        var url = "/info/task/getTaskByProject ";
      } else {
        var data = {
          data: {
            projectId: this.projectId,
            executorUserIds: arr
          },
          token: this.token,
          userId: this.userId
        };
        var url = "/info/task/getTaskByProjectView";
      }
      var loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading"
      });
      var _this = this;
      this.$post(url, data)
        .then(response => {
          if (_this.valuesta == true) {
            _this.$store.state.projectMsgs.topdata = response.data.list;
            loading.close();
          } else {
            _this.$store.state.projectMsgs.topdata = response.data;
            loading.close();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 执行人
    zxz() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.projectId
        }
      };
      var _this = this;
      this.$post("/info/project/getMemberAll", data)
        .then(response => {
          _this.optionszxz = response.data;
          _this.optionszxzarr = response.data;
          _this.optionszxzarr2 = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 抄送人
    copy() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: ""
        }
      };
      var _this = this;
      this.$post("/sys/getDeptUserAll", data)
        .then(response => {
          _this.optionszxz2s = response.data || [];
          // console.log(123, this.optionszxz2s )
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gettime(ts, ser) {
      var date = new Date(ts).getTime();
      var time = new Date(date);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var f = time.getMinutes();
      var s = time.getSeconds();
      var ms;
      if (m < 10) {
        ms = "0" + m;
      } else {
        ms = m;
      }
      var ds;
      if (d < 10) {
        ds = "0" + d;
      } else {
        ds = d;
      }
      var hs;
      if (h < 10) {
        hs = "0" + h;
      } else {
        hs = h;
      }
      var fs;
      if (f < 10) {
        fs = "0" + f;
      } else {
        fs = f;
      }
      var ss;
      if (s < 10) {
        ss = "0" + s;
      } else {
        ss = s;
      }
      var times;
      if (ser == 2) {
        return (times =
          y + "-" + ms + "-" + ds + " " + "23" + ":" + "59" + ":" + "59");
      } else {
        return (times =
          y + "-" + ms + "-" + ds + " " + hs + ":" + fs + ":" + ss);
      }
    },
    seek() {
      var startStartDate, endStartDate, startEndDate, endEndDate;
      if (this.endtime == "") {
        startStartDate = "";
        endStartDate = "";
        //  startEndDate=''
        //  endEndDate=''
      } else {
        startStartDate = this.gettime(this.endtime[0]);
        endStartDate = this.gettime(this.endtime[1], 2);
        //  startEndDate=this.gettime(this.satrttime[0])
        //  endEndDate=this.gettime(this.satrttime[1])
      }
      //  console.log(startStartDate)
      //  console.log(endStartDate)
      // return
      //  || this.satrttime == ''
      if (this.satrttime == "") {
        //  startStartDate=''
        //  endStartDate=''
        startEndDate = "";
        endEndDate = "";
      } else {
        //  startStartDate=this.gettime(this.endtime[0])
        //  endStartDate=this.gettime(this.endtime[1])
        startEndDate = this.gettime(this.satrttime[0]);
        endEndDate = this.gettime(this.satrttime[1], 2);
      }
      //  console.log(startEndDate)
      //  console.log(endEndDate)
      //  return;
      var tjsdataarr = [];
      var arry2 = this.optionszxz2s;
      var arry1 = this.valuezxr;
      console.log("valuezxr", this.valuezxr);
      tjsdataarr = [...this.valuezxr];

      // for (var i = 0; i < arry1.length; i++) {
      //   for (var k = 0; k < arry2.length; k++) {
      //     if (arry1[i] == arry2[k].name) {
      //       tjsdataarr.push(arry2[k].userId);
      //     }
      //   }
      // }
      // console.log(this.optionszxz)
      // console.log(tjsdataarr)
      var tjsdataarr2 = [];
      var arry4 = this.optionszxz2s;
      var arry3 = this.valuezxr2;
      tjsdataarr2 = [...this.valuezxr2];
      // for (var i = 0; i < arry3.length; i++) {
      //   for (var k = 0; k < arry4.length; k++) {
      //     if (arry3[i] == arry4[k].name) {
      //       tjsdataarr2.push(arry4[k].userId);
      //     }
      //   }
      // }
      // console.log(tjsdataarr2);
      // return
      if (this.valuesta == true) {
        var arr = this.optionss;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value == this.values) {
            // console.log(arr[i]);
            var px = arr[i].value;
          }
        }
        var data = {
          data: {
            startStartDate: startStartDate,
            endStartDate: endStartDate,
            startEndDate: startEndDate,
            endEndDate: endEndDate,
            orderType: px,
            projectId: this.projectId,
            taskName: this.inputFind,
            copyerUserIds: tjsdataarr2,
            executorUserIds: tjsdataarr
          },
          token: this.token,
          userId: this.userId,
          pageNo: 1,
          pageSize: this.$store.state.projectstat.isCurrentPages
        };
        var url = "/info/task/getTaskByProject";
      } else {
        var data = {
          data: {
            startStartDate: startStartDate,
            endStartDate: endStartDate,
            startEndDate: startEndDate,
            endEndDate: endEndDate,
            projectId: this.projectId,
            taskName: this.inputFind,
            copyerUserIds: tjsdataarr2,
            executorUserIds: tjsdataarr
          },
          token: this.token,
          userId: this.userId
        };
        var url = "/info/task/getTaskByProjectView";
      }
      // console.log(data);

      var _this = this;
      this.$post(url, data)
        .then(response => {
          if (_this.valuesta == true) {
            _this.viewtabs = false;
            response.data.dalist = data;
            // _this.$store.commit("isCurrentPages", 10);
            _this.$store.state.projectMsgs.topdata = response.data;
          } else {
            _this.viewtabs = false;
            _this.$store.state.projectMsgs.topdata = response.data;
          }
          // console.log(_this.$store.state.projectMsgs.topdata)
          _this.endtime = [];
          _this.satrttime = [];
          _this.inputFind = "";
          _this.valuezxr2 = [];
          _this.valuezxr = [];
          _this.values = "";
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    onSubmit() {
      this.$router.push("/project_tasks/taskssearch");
    },
    clickhoverdiv() {
      this.hoverShowDivsdiv = true;
    },
    closeHoverinfo() {
      this.hoverShowDivsdiv = false;
      this.infoClass = true;
      this.warninClass = false;
      this.dangerClass = false;
    },
    closeHoverwarning() {
      this.hoverShowDivsdiv = false;
      this.warninClass = true;
      this.dangerClass = false;
      this.infoClass = false;
    },
    closeHoverdanger() {
      this.hoverShowDivsdiv = false;
      this.dangerClass = true;
      this.warninClass = false;
      this.infoClass = false;
    }
  }
};
</script>
<style lang="scss">
#taskinfosssssss .el-dialog__header {
  border: none !important;
}
#fs {
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    outline: 0;
    background-color: white;
  }
  .el-badge__content.is-fixed {
    position: absolute;
    top: 14px;
    right: 10px;
    -webkit-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
  }
}
.member-task {
  overflow-x: hidden;
}
.member-task .el-scrollbar {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.menus {
  height: 238px;
}
.color-default.el-button {
  color: #999;
}
.top_nav {
  .el-breadcrumb[data-v-aed299a4] {
    padding-top: 24px;
  }
}
.fl {
  .el-select {
    display: inline-block;
    position: relative;
    width: 256px;
    /*margin-left: 10px;*/
  }
  .el-menu-item,
  .el-submenu__title {
    height: 54px;
    line-height: 56px;
    position: relative;
    white-space: nowrap;
    list-style: none;
  }
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    outline: 0;
    background-color: #ffffff;
  }
}
#ids {
  .el-range-editor.el-input__inner {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 3px 10px;
    width: 337px;
  }
  .el-range-editor--mini .el-range-separator {
    line-height: 29px;
    font-size: 12px;
  }
}

.el-input--suffix .el-input__inner {
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-icon-arrow-down:before {
  content: "\E603";
  vertical-align: sub !important;
}
.infoClass {
  background: #919191 !important;
}
.warninClass {
  background: #ffc53d !important;
}
.dangerClass {
  background: #ff4d4f !important;
}
.top_nav {
  height: 120px;
  background-color: #fff;
  padding: 24px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.companyDiv {
  top: 17px;
  position: relative;
  /* width: 50%; */
}
.companyDiv span {
  margin-right: 10px;
}
.companyDiv span:nth-child(2) {
  margin-left: 10px;
}
.companyDiv img {
  top: 6px;
  position: relative;
}

.companyDiv .allSearch input {
  padding-left: 40px;
}

.companySearch .el-input input {
  border: 0px;
  width: 250px;
  color: #275aa6;
  font-size: 16px;
  font-weight: bold;
}

.searchInput input {
  margin-left: 19px;
  width: 86%;
  margin-top: 10px;
}

.allProjects {
  display: inline-block;
  margin-top: 10px;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
  padding-left: 20px;
  padding-bottom: 10px;
}
.el-header {
  padding: 0px;
}
.el-breadcrumb {
  padding-top: 24px;
}

.el-dropdown-link {
  cursor: pointer;
  // color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.task_click {
  position: relative;
}

.el-submenu__title:hover {
  background-color: #fff;
}
.el-submenu__title {
  color: #909399;
}

.menu_task {
  position: absolute;
  top: 5px;
  left: 47px;
}
.menu_task div {
  height: 50px;
}
.el-menu--popup-bottom-start {
  position: absolute;
  left: -110px;
}

.taskTitle {
  margin-top: 10px;
  margin-left: 13px;
  color: #000000;
}
.progress {
  width: 90%;
  border-radius: 10px;
  height: 10px;
  margin: 5px;
}
.progress span {
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}
.progress span:nth-child(1) {
  width: 30%;
  background: #a0d911;
}
.progress span:nth-child(2) {
  width: 40%;
  background: #ffc53d;
  margin-left: -7px;
}
.progress span:nth-child(3) {
  width: 30%;
  background: #ff4d4f;
  margin-left: -7px;
}
/* 今天的任务 */
.todyTask {
  text-align: left;
  position: relative;
  margin-bottom: 10px;
}
.todyTask .hoverAside {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff4d4f;
  left: -20px;
  top: 3px;
  cursor: pointer;
}
.hoverAside:hover {
  width: 10px;
}

.ifstatus {
  width: 200px;
  height: 160px;
  padding: 10px;
}
.ifstatus .tagEvery {
  display: block;
  margin-top: 10px;
}

.todyTask .todyCheckbox em {
  position: absolute;
  right: 0px;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
}

/*
视图切换 */
.viewTaba {
  position: absolute;
  right: 0px;
  width: 360px;
  height: 978px;
  background: rgba(255, 255, 255, 1);
  box-shadow: -4px 0px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  z-index: 2;
  background: #fff;
  top: -2px;
  overflow: auto;
}

.viewTaba .viewTabaTitle {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
}
.viewTaba .viewTabaTitle span {
  line-height: 70px;
  color: #333;
  font-size: 20px;
}
.viewTaba .viewTabaTitle i {
  float: right;
  margin-right: 5px;
  line-height: 70px;
}
.viewTaba .viewTabaReadio span li {
  display: inline-block;
}
.viewTaba .viewTabaReadio span .el-menu-item:focus,
.el-menu-item:hover {
  background-color: #fff;
}

.viewTaba .screening {
  padding: 10px;
  text-align: left;
}
.viewTaba .screening span {
  display: block;
  margin-bottom: 10px;
}

.viewTaba .custom,
.viewTaba .taskType {
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
}
.viewTaba .custom .el-select,
.viewTaba .taskType .el-select {
  width: 100%;
  font-weight: bold;
}

.viewTaba .custom .el-select .el-input__inner,
.viewTaba .taskType .el-select .el-input__inner {
  border: 0px;
}

.viewTaba .practitioners {
  text-align: left;
  padding: 10px;
  clear: both;
}
.viewTaba .practitioners span {
  font-size: 14px;
  text-align: left;
  color: #333;
  display: inline-block;
  margin-bottom: 10px;
}
.viewTaba .practitioners p img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  position: relative;
  top: 4px;
}
.viewTaba .practitioners p span {
  margin-left: 7px;
}
.viewTaba .endTimes {
  padding: 10px;
  text-align: left;
}
.viewTaba .endTimes span {
  font-size: 14px;
  color: #333;
  display: inline-block;
  margin-bottom: 10px;
}
.viewTaba .endTimes p span {
  color: #999;
  font-size: 14px;
}
.viewTaba .endTimes p i {
  float: right;
}
.viewTaba .addscreening {
  padding: 10px;
  position: relative;
}
.viewTaba .addscreening .filter {
  width: 240px;
  height: 375px;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.viewTaba .addscreening .filter .addScreenTitle {
  height: 54px;
  border-bottom: 1px solid #e8e8e8;
}
.viewTaba .addscreening .filter .addScreenTitle span {
  line-height: 55px;
}
.viewTaba .addscreening .filter .addScreenTitle i {
  float: right;
  margin-right: 5px;
  margin-top: 10px;
}

.viewTaba .addscreening .filter .screenType p {
  padding: 10px;
  text-align: left;
}
.viewTaba .addscreening .filter .screenType p span {
  text-align: left;
}
.viewTaba .addscreening .filter .screenType p i {
  float: right;
  margin-right: 5px;
}
.viewTaba .viewTabaTitle[data-v-aed299a4] {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
  padding-left: 24px;
}
.viewTaba .viewTabaTitle i[data-v-aed299a4] {
  float: right;
  margin-right: 16px;
  line-height: 70px;
}
.lsit li {
  height: 35px;
  line-height: 24px;
  width: 100%;
  text-align: left;
  background: white;
}
.lsit li:hover {
  background: #ecf5ff;
}
#tabss {
  width: 3px;
  height: 22px;
  float: left;
}
.jins {
  width: 100%;
  height: 20px;
  overflow: hidden;
  span {
    float: left;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.el-icon-arrow-down {
  margin: -5px -5px 0 5px;
}
.el-icon-arrow-up {
  margin: -5px -5px 0 5px;
}
</style>
