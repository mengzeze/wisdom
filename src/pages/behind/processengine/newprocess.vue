<template>
  <div class="newprocess">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>流程引擎管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/processengine' }"
        >流程引擎</el-breadcrumb-item
      >
      <el-breadcrumb-item>新建流程</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="finance_tit">
      <el-button
        icon="el-icon-back"
        circle
        @click="backProce"
        class="back_btn"
      ></el-button>
      <!--        <el-button circle @click="testclick" class="back_btn">测试修改iframe</el-button>-->
      <span>新建流程</span>
    </el-row>
    <el-tabs @tab-click="tabClick" type="border-card">
      <el-tab-pane label="新建流程">
        <iframe
          :src="idNum"
          id="iframe"
          name="iframeProcess"
          width="100%"
          frameborder="0"
          scrolling="auto"
        ></iframe>
      </el-tab-pane>
      <el-tab-pane label="版本管理" class="versions_tab">
        <el-table
          ref="multipleTable"
          :data="tableData"
          class="multiple_table"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="procName"
            label="流程名称"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.procName"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.procName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="procDescr"
            label="流程描述"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.procDescr"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.procDescr }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" min-width="50">
            <template slot-scope="scope">
              <span
                v-if="scope.row.actStatus == 0"
                style="color:#999;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                :title="scope.row.actStatusName"
                >{{ scope.row.actStatusName }}</span
              >
              <span
                v-if="scope.row.actStatus == 1"
                style="color:#27A700;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                :title="scope.row.actStatusName"
                >{{ scope.row.actStatusName }}</span
              >
              <span
                v-if="scope.row.actStatus == 2"
                style="color:#F5982A;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                :title="scope.row.actStatusName"
                >{{ scope.row.actStatusName }}</span
              >
              <span
                v-if="scope.row.actStatus == 3"
                style="color:#DC341D;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                :title="scope.row.actStatusName"
                >{{ scope.row.actStatusName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="procVersionNum" label="版本" align="center">
            <template slot-scope="scope">
              <p
                :title="scope.row.procVersionNum"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.procVersionNum }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="procChangeReason"
            label="变更理由"
            align="center"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.procChangeReason"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.procChangeReason }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="是否为主版本" align="center" min-width="50">
            <template slot-scope="scope">
              <span
                v-if="scope.row.procMainVersion == 0"
                title="否"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >否</span
              >
              <span
                v-if="scope.row.procMainVersion == 1"
                title="主版本"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >主版本</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="tab_operation">
                <span
                  type="text"
                  @click="handleSet(scope.$index, scope.row)"
                  title="设置主版本"
                  v-show="scope.row.procMainVersion == 0"
                  class="icon-operate-btn iconfont banbengengxin mr-5"
                ></span>
                <span
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)"
                  title="删除"
                  class="icon-operate-btn delete iconfont shanchu"
                ></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataTotal"
          :pageSize="pageSize"
          :page-sizes="pageSizes"
          :current-page="currentPage"
          @current-change="onPageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="人员配置"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="750px"
      :before-close="dialogVisibleFn"
    >
      <div class="deploy_box">
        <!-- style="height:365px" -->
        <div class="deploy_opt deplay_top">
          <label style="font-weight: bold">
            <i style="color:#f56c6c;margin-right:6px;">*</i>审批人员：
          </label>
          <!-- <el-radio-group v-model="userRadio" @change="optUserFn">
            <el-radio :label="1">发起人</el-radio>
            <el-radio :label="2">上一步执行人</el-radio>
            <el-radio :label="3">指定用户</el-radio>
            <el-radio :label="4">指定角色</el-radio>
            <el-radio :label="5">部门主管</el-radio>
          </el-radio-group> -->
          <el-checkbox-group
            v-model="shencheckList"
            @change="shencheckListchange(true)"
          >
            <div class="boxinof">
              <el-checkbox label="1">发起人</el-checkbox>
            </div>
            <div class="boxinof">
              <el-checkbox label="2">上一步执行人</el-checkbox>
            </div>
            <div class="boxinof">
              <el-checkbox label="3">指定用户</el-checkbox>
              <div class="deploy_opt1 infs" style="width: 85%;">
                <label>指定用户：</label>
                <div class="deplay_tag">
                  <el-button
                    size="small"
                    type="primary"
                    :disabled="deployObjtn"
                    @click="optUser(1)"
                    >选择用户</el-button
                  >
                  <el-tag
                    style="vertical-align: bottom;"
                    @close="handleClose(1, index)"
                    closable
                    v-for="(item, index) in deployObj"
                    :key="item.id"
                    class="mr-5"
                    >{{ item.name }}
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="boxinof">
              <el-checkbox label="4">指定角色</el-checkbox>

              <div class="deploy_opt1 infs">
                <label>指定角色：</label>
                <div class="deplay_tag">
                  <el-button
                    size="small"
                    type="primary"
                    :disabled="appRoleObjtn"
                    @click="optRole(1)"
                    >选择角色</el-button
                  >
                  <el-tag
                    v-for="(item, index) in appRoleObj"
                    @close="handleClose(2, index)"
                    closable
                    :key="index"
                    :title="
                      `${item.roleName} | ${
                        item.front == 'front' ? '前台' : '后台'
                      }`
                    "
                    class="mr-5"
                    ><span class="ellipsis1"
                      >{{ item.roleName }} |
                      {{ item.front == "front" ? "前台" : "后台" }}</span
                    ></el-tag
                  >
                </div>
              </div>
            </div>
            <div class="boxinof1">
              <el-checkbox label="5">部门主管</el-checkbox>
              <div class="deploy_opt1" id="dys" style="width: 86%;">
                <div class="managerBox">
                  <div class="boxL">
                    <span class="promptTit">发起人的：</span>
                    <el-select
                      v-model="managerSelVal"
                      :disabled="managerSelValbn"
                    >
                      <el-option
                        v-for="item in managerSelList"
                        :key="item.val"
                        :label="item.label"
                        :value="item.val"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="boxR">
                    <div class="imgBox">
                      <img
                        @mouseover="showPromptImg(1)"
                        @mouseout="showPromptImg(1)"
                        style="width: 22px; height: 22px"
                        :src="
                          require('../../../assets/newprocess/searchIcon.png')
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="promptBox">
                  <label style="margin-left:85px;"></label>
                  <el-checkbox :disabled="managerSelValbn" label="6"
                    >无主管时，可由上级主管代批</el-checkbox
                  >
                </div>
                <div class="promptBox2">
                  <span class="promptTit" style="margin-left: 21px;"
                    >注：审批人为空时自动转交给管理员。</span
                  >
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="deploy_opt" id="dye">
          <label style="margin-top: 20px;font-weight: bold">
            抄送人员：
          </label>
          <!-- <el-radio-group v-model="ccRadio" @change="optRoleFn">
            <el-radio :label="1">发起人</el-radio>
            <el-radio :label="2">上一步执行人</el-radio>
            <el-radio :label="3">指定用户</el-radio>
            <el-radio :label="4">指定角色</el-radio>
            <el-radio :label="5">部门主管</el-radio>
          </el-radio-group> -->
          <el-checkbox-group
            v-model="coypcheckList"
            @change="shencheckListchange(false)"
          >
            <div class="boxinof">
              <el-checkbox label="1">发起人</el-checkbox>
            </div>
            <div class="boxinof">
              <el-checkbox label="2">上一步执行人</el-checkbox>
            </div>
            <div class="boxinof">
              <el-checkbox label="3">指定用户</el-checkbox>
              <div class="deploy_opt1  infs" id="dys">
                <label>指定用户：</label>
                <div class="deplay_tag">
                  <el-button
                    size="small"
                    :disabled="deployObjtnc"
                    type="primary"
                    @click="optUser(2)"
                    >选择用户</el-button
                  >
                  <el-tag
                    v-for="(item, index) in appointObj"
                    @close="handleClose(3, index)"
                    closable
                    :key="index"
                    class="mr-5"
                    >{{ item.name }}</el-tag
                  >
                </div>
              </div>
            </div>
            <div class="boxinof">
              <el-checkbox label="4">指定角色</el-checkbox>
              <div class="deploy_opt1  infs">
                <label>指定角色：</label>
                <div class="deplay_tag">
                  <el-button
                    size="small"
                    :disabled="appRoleObjtnc"
                    type="primary"
                    @click="optRole(2)"
                    >选择角色</el-button
                  >
                  <el-tag
                    v-for="(item, index) in roleObj"
                    @close="handleClose(4, index)"
                    closable
                    :key="index"
                    :title="
                      `${item.roleName} | ${
                        item.front == 'front' ? '前台' : '后台'
                      }`
                    "
                    class="mr-5"
                  >
                    <span class="ellipsis1"
                      >{{ item.roleName }} |
                      {{ item.front == "front" ? "前台" : "后台" }}</span
                    >
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="boxinof">
              <el-checkbox label="5">部门主管</el-checkbox>
              <div class="deploy_opt1" id="dys" style="width: 86%;">
                <div class="managerBox">
                  <div class="boxL">
                    <span class="promptTit">发起人的：</span>
                    <el-select
                      v-model="copyManagerSelVal"
                      :disabled="managerSelValbnc"
                    >
                      <el-option
                        v-for="item in managerSelList"
                        :key="item.val"
                        :label="item.label"
                        :value="item.val"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="boxR">
                    <div class="imgBox">
                      <img
                        @mouseover.stop="showPromptImg(2)"
                        @mouseout.stop="showPromptImg(2)"
                        style="width: 22px; height: 22px"
                        :src="
                          require('../../../assets/newprocess/searchIcon.png')
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="personSet()">确定</el-button>
      </span>
      <div v-show="isShowManagerImg" :style="imgStyle">
        <img src="../../../../static/newprocess/promptmsg.png" alt />
      </div>
    </el-dialog>
    <!--选择人员-->
    <!--:findUserObj="user_num === 1 ? findUserObj : findUserObjM"-->
    <findall-deptuser
      :findFlagShow.sync="findFlag"
      v-on:findAllUser="findAllUser"
      :findUserObj="checkedUser"
      :process="true"
      :checkedData="checkedUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
    <!--选择角色-->
    <select-boxs
      v-if="flags"
      v-on:statesbox="state"
      :Role="Role"
      :roledata="roledata"
      :checkedData="checkedRole"
      :process="true"
    ></select-boxs>
  </div>
</template>

<script>
var proConst;
import $ from "jquery";
import selectBoxs from "@/components/select_box/technological";
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";

export default {
  name: "newprocess",
  components: {
    selectBoxs,
    findallDeptuser
  },
  data() {
    return {
      setuser: {},
      coypuser: {},
      shencheckList: ["6"],
      coypcheckList: [],
      deployObjtn: true,
      appRoleObjtn: true,
      managerSelValbn: true,
      deployObjtnc: true,
      appRoleObjtnc: true,
      managerSelValbnc: true,
      // ....
      checkedUser: {},
      checkedRole: {},
      idNum: "",
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      tabs: "",
      tableData: [
        {
          id: "1",
          name: "流程名称",
          address: "流程描述",
          state: "已发布",
          version: "1",
          reason: "变更理由",
          main: "是"
        },
        {
          id: "2",
          name: "流程名称",
          address: "流程描述",
          state: "已发布",
          version: "1",
          reason: "变更理由",
          main: "是"
        },
        {
          id: "3",
          name: "流程名称",
          address: "流程描述",
          state: "已发布",
          version: "1",
          reason: "变更理由",
          main: "是"
        }
      ],
      multipleSelection: [],
      //    人员配置
      dialogVisible: false,
      userRadio: "",
      ccRadio: "",
      applyFlag: 0,
      getFlag: 0,
      deployObj: [],
      appRoleObj: [],
      appointObj: [],
      roleObj: [],
      token: "",
      userId: "",

      //添加人员
      findFlag: false,
      findState: {},
      checkState: {},
      //    选择角色
      flags: false,
      Role: "",
      RoleId: "",
      roledata: "",
      user_num: "",
      role_num: "",
      appRoleObjcopye: {},
      roleObjcopye: {},
      rowData: {},
      // 部门主管选择框
      managerSelList: [
        { label: "直接主管（1级主管）", val: 1 },
        { label: "2级主管", val: 2 },
        { label: "3级主管", val: 3 },
        { label: "4级主管", val: 4 },
        { label: "5级主管", val: 5 }
      ],
      managerSelVal: 1, // 审核部门主管选中值
      isShowManagerImg: false, // 审核是否显示部门提示图
      isManagerInstead: true, // 审核是否可以由上级主管代批
      copyManagerSelVal: 1, // 抄送部门主管选中值
      imgStyle: {
        width: "447px",
        height: "339px",
        position: "absolute",
        right: "-340px",
        top: "215px"
      }, // 提示图的style
      findUserObj: [],
      findUserObjM: []
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        setTimeout(() => {
          this.setuser = {};
          this.coypuser = {};
          this.isManagerInstead = true;
          this.shencheckList = ["6"];
          this.coypcheckList = [];
          this.appointObj = []; //抄送人员-指定用户
          this.roleObj = []; //抄送人员-指定角色
          this.appRoleObj = []; //审核人员-指定角色
          this.deployObj = []; //审核人员-指定用户
          this.deployObjtn = true;
          this.appRoleObjtn = true;
          this.managerSelValbn = true;
          this.deployObjtnc = true;
          this.appRoleObjtnc = true;
          this.managerSelValbnc = true;
          this.copyManagerSelVal = 1;
          this.managerSelVal = 1;
        });
      }
    }
  },
  mounted() {
    proConst = this;
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    document.getElementById("iframe").style.height =
      this.getViewPortHeight() - 200 + "px";
    this.idNum =
      "../../static/iframe/modeler.html?modelId=" + this.$route.params.id;
  },
  methods: {
    // 关闭dialog
    closeDialog() {
      closePerson();
    },
    // 提示图片
    showPromptImg(type) {
      this.isShowManagerImg = !this.isShowManagerImg;
      if (type == 1) {
        this.imgStyle.top = "75px";
        return;
      }
      switch (this.applyFlag) {
        case 3:
          this.imgStyle.top = "155px";
          break;
        case 4:
        case 5:
          this.imgStyle.top = "215px";
          break;
        default:
          this.imgStyle.top = "115px";
      }
    },
    testclick() {
      let items = $(
        window.frames["iframeProcess"].document.querySelectorAll(
          ".selected-item-body>div>div"
        )
      ).eq(1);
      console.log(2222, items);
      // items[0].style.color='red'
      items[0].style.display = "none";
      // items.eq(7).style.display='none'
    },
    getViewPortHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    },
    //返回
    backProce() {
      this.$router.push({ path: "/processengine" });
    },
    loadCatalog() {
      var string = this.$route.params.id;
      string = string.split("&");
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        data: {
          actModelId: string[0]
        }
      };
      var that = this;
      this.$post("/info/service/getProcessListByVersion", dataObj)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            console.log(data.list);
            if (response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.loadCatalog();
              return;
            }
            that.tableData = data.list;
            that.dataTotal = data.total;
            that.currentPage = data.pageNum;
            that.pageSize = data.pageSize;
          } else if (response.code == that.code.codeNum.RESULT_EMPTY) {
            that.tableData = [];
          } else if (response.code == that.code.codeNum.SYSTEM_ERROR) {
            that.$message(response.msg);
          }
        })
        .catch(error => {});
    },
    // tab切换
    tabClick(tab, e) {
      this.tabs = tab.index;
      switch (e.target.innerText) {
        case "新建流程":
          // this.loadCatalog(this.$route.query.project_id, '1');
          break;
        case "版本管理":
          this.loadCatalog();
          break;
      }
    },
    // 分页
    // 分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.loadCatalog();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadCatalog();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //设为主版本
    handleSet(index, row) {
      var deleteObj = {
        data: {
          id: row.id
        },
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/service/setProcessMain", deleteObj)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.$message.success("设置成功！");
            that.loadCatalog();
          } else if (response.code == that.code.codeNum.RESULT_EMPTY) {
            that.tableData = [];
          } else {
            that.$message(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    deleteVisibleFn() {
      var deleteObj = {
        data: {
          id: this.rowData.id
        },
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/service/updaProcessByVersion", deleteObj)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.$message.success("删除成功！");
            that.loadCatalog();
          } else if (response.code == that.code.codeNum.RESULT_EMPTY) {
            that.tableData = [];
          } else {
            that.$message(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      if (row.procMainVersion == 1) {
        this.$message("主版本不可删除！");
        return;
      } else {
        this.rowData = row;
        this.$confirm("此操作将永久删除该流程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteVisibleFn();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //    人员配置-确定
    personSet() {
      if (
        (this.shencheckList.find(v => v == "6") == "6" &&
          this.shencheckList.length == 1) ||
        this.shencheckList == ""
      ) {
        this.$message.error("请选择人员配置");
        return;
      }
      if (this.shencheckList.find(v => v == "3") == "3") {
        if (this.deployObj == "") {
          this.$message.error("请选择指定用户");
          return;
        }
      }
      if (this.shencheckList.find(v => v == "4") == "4") {
        if (this.appRoleObj == "") {
          this.$message.error("请选择指定角色");
          return;
        }
      }
      if (this.coypcheckList.find(v => v == "3") == "3") {
        if (this.appointObj == "") {
          this.$message.error("请选择指定用户");
          return;
        }
      }
      if (this.coypcheckList.find(v => v == "4") == "4") {
        if (this.roleObj == "") {
          this.$message.error("请选择指定角色");
          return;
        }
      }
      var user;
      this.shencheckList.forEach(item => {
        this.getuser(item, true);
      });
      this.coypcheckList.forEach(item => {
        this.getuser(item, false);
      });
      this.setuser.isManagerInstead =
        this.shencheckList.find(v => v == "6") == "6" ? true : false;
      var obj = {
        setuser: this.setuser,
        coypuser: this.coypuser
      };
      console.log(111, obj);
      window.personSet(obj);
    },
    handleClose(item, index) {
      switch (Number(item)) {
        case 1:
          this.deployObj.splice(index, 1);
          break;
        case 2:
          this.appRoleObj.splice(index, 1);
          break;
        case 3:
          this.appointObj.splice(index, 1);
          break;
        case 4:
          this.roleObj.splice(index, 1);
          break;
      }
    },
    getuser(item, state) {
      let obj = state ? this.setuser : this.coypuser;
      switch (Number(item)) {
        case 1:
          obj.Approvaluser = 1;
          break;
        case 2:
          obj.Approverlast = 2;
          break;
        case 3:
          obj.consumer = 3;
          obj.consumerarr = state ? this.deployObj : this.appointObj;
          break;
        case 4:
          obj.role = 4;
          obj.rolearr = state ? this.appRoleObj : this.roleObj;
          break;
        case 5:
          obj.Supervisor = 5;
          obj.Supervisorstate = state
            ? this.managerSelVal
            : this.copyManagerSelVal;
          break;
      }
    },
    shencheckListchange(state) {
      if (state) {
        this.deployObjtn =
          this.shencheckList.find(v => v == "3") == "3" ? false : true;
        this.appRoleObjtn =
          this.shencheckList.find(v => v == "4") == "4" ? false : true;
        this.managerSelValbn =
          this.shencheckList.find(v => v == "5") == "5" ? false : true;
      } else {
        this.deployObjtnc =
          this.coypcheckList.find(v => v == "3") == "3" ? false : true;
        this.appRoleObjtnc =
          this.coypcheckList.find(v => v == "4") == "4" ? false : true;
        this.managerSelValbnc =
          this.coypcheckList.find(v => v == "5") == "5" ? false : true;
      }
    },
    //    选择用户
    optUser(num) {
      this.user_num = num;
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.checkedUser = num === 1 ? [...this.deployObj] : [...this.appointObj];
      if (!this.deployObj.length) {
        this.findUserObj = [];
      }
      if (!this.appointObj.length) {
        this.findUserObjM = [];
      }
      console.log(111, this.checkedUser, this.deployObj, this.appointObj);
    },
    //添加人员
    findAllUser(data) {
      console.log(data, 222);
      if (data !== "close") {
        if (this.user_num == 1) {
          this.deployObj = data;
          this.findUserObj = data;
        } else {
          this.appointObj = data;
          this.findUserObjM = data;
        }
      }
      this.findFlag = false;
      this.findState = {};
      this.checkState = {};
    },
    //    选择角色
    optRole(val) {
      this.role_num = val;
      this.appRoleObjcopye = this.appRoleObj;
      this.roleObjcopye = this.roleObj;
      this.checkedRole = val === 1 ? this.appRoleObjcopye : this.roleObjcopye;
      var elefront = [],
        elebackstage = [];
      this.checkedRole.filter(x => {
        x.front == "front" ? elefront.push(x) : elebackstage.push(x);
      });
      this.checkedRole = {
        elefront: elefront,
        elebackstage: elebackstage
      };
      console.log(this.checkedRole);
      var dataObj = {
        data: {},
        pageNo: 0,
        pageSize: 0,
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/sys/getRoleSysAndProj", dataObj)
        .then(response => {
          if (response.code == that.code.codeNum.SUCCESS) {
            that.flags = true;
            that.roledata = {
              front: response.data.projRole.filter(x => (x.front = "front")),
              backstage: response.data.sysRole.filter(
                x => (x.front = "backstage")
              )
            };
            that.Role = { state: 2 };
          } else {
            this.$message(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    state(data) {
      let elefront = [];
      let elebackstage = [];
      if (data.elefront == undefined) {
        elefront = [];
      } else {
        elefront = data.elefront;
        elefront = elefront.filter(x => (x.front = "front"));
      }
      if (data.elebackstage == undefined) {
        elebackstage == [];
      } else {
        elebackstage = data.elebackstage;
        elebackstage = elebackstage.filter(x => (x.front = "backstage"));
      }
      if (this.role_num == 1) {
        this.appRoleObj = elefront.concat(elebackstage);
        this.appRoleObjcopye = data;
      } else {
        this.roleObj = elefront.concat(elebackstage);
        this.roleObjcopye = data;
      }
    },
    dialogVisibleFn() {
      closePerson();
    },
    //    人员配置
    optUserFn(num) {
      //审核人员
      switch (num) {
        case 3: //指定用户
          this.applyFlag = 3;
          this.appRoleObj = [];
          this.managerSelVal = 1;
          this.isManagerInstead = true;
          break;
        case 4: //指定角色
          this.applyFlag = 4;
          this.deployObj = [];
          this.managerSelVal = 1;
          this.isManagerInstead = true;
          break;
        case 5: //部门主管
          this.applyFlag = 5;
          this.appRoleObj = [];
          this.deployObj = [];
          break;
        default:
          this.applyFlag = 0;
          this.appRoleObj = [];
          this.deployObj = [];
          this.managerSelVal = 1;
          this.isManagerInstead = true;
          break;
      }
    },
    optRoleFn(val) {
      //抄送人员
      switch (val) {
        case 3: //指定用户
          this.getFlag = 3;
          this.roleObj = [];
          this.copyManagerSelVal = 1;
          break;
        case 4: //指定角色
          this.getFlag = 4;
          this.appointObj = [];
          this.copyManagerSelVal = 1;
          break;
        case 5: //部门主管
          this.getFlag = 5;
          this.appointObj = [];
          this.roleObj = [];
          break;
        default:
          this.getFlag = 0;
          this.appointObj = [];
          this.roleObj = [];
          this.copyManagerSelVal = 1;
          break;
      }
    }
  }
};

//人员配置弹框数据初始化
window.parentTestes = function(item, st) {
  proConst.shencheckList = [];
  if (st) {
    proConst.shencheckList = item;
    proConst.dialogVisible = true;
    return;
  }
  if (item.returnAuditAssignee == undefined) {
    proConst.shencheckList = [item.nodeAuditorType];
    proConst.coypcheckList = [item.carboncopyType];
    if (Number(item.nodeAuditorType) == 3) {
      proConst.deployObjtn = false;
      proConst.deployObj = item.nodeAuditorList;
    }
    if (Number(item.nodeAuditorType) == 4) {
      proConst.appRoleObjtn = false;
      proConst.appRoleObj = item.nodeAuditorRoleMapList;
    }
    if (Number(item.nodeAuditorType) == 5) {
      proConst.managerSelValbn = false;
      proConst.managerSelVal = +item.auditManagetLevel;
      if (item.auditIsCheck == "1") {
        proConst.shencheckList.push("6");
      }
    }
    if (Number(item.carboncopyType) == 3) {
      proConst.appointObj = item.carboncopyList;
      proConst.deployObjtnc = false;
    }
    if (Number(item.carboncopyType) == 4) {
      proConst.roleObj = item.carboncopyRoleMapList;
      proConst.appRoleObjtnc = false;
    }
    if (Number(item.carboncopyType) == 5) {
      proConst.copyManagerSelVal = +item.copyManagetLevel;
      proConst.managerSelValbnc = false;
    }
    proConst.dialogVisible = true;
    return;
  }
  if (item.returnAuditAssignee.initiator) {
    proConst.shencheckList.push("1");
  }
  if (item.returnAuditAssignee.lastStep) {
    proConst.shencheckList.push("2");
  }
  if (item.returnAuditAssignee.usersName != null) {
    proConst.shencheckList.push("3");
    proConst.deployObjtn = false;
    proConst.deployObj =
      item.returnAuditAssignee.usersName == null
        ? []
        : item.returnAuditAssignee.usersName;
  }
  if (
    item.returnAuditAssignee.projectRoleName != null ||
    item.returnAuditAssignee.sysRoleName != null
  ) {
    proConst.shencheckList.push("4");
    proConst.appRoleObjtn = false;
    let prosys =
      item.returnAuditAssignee.projectRoleName == null
        ? []
        : item.returnAuditAssignee.projectRoleName;
    let sys =
      item.returnAuditAssignee.sysRoleName == null
        ? []
        : item.returnAuditAssignee.sysRoleName;
    proConst.appRoleObj = sys.concat(prosys);
  }
  if (item.returnAuditAssignee.supervisor) {
    proConst.shencheckList.push("5");
    proConst.managerSelValbn = false;
    proConst.managerSelVal = item.returnAuditAssignee.supervisorNum;
    if (item.returnAuditAssignee.lastSupervisor) {
      proConst.shencheckList.push("6");
    }
  }
  if (item.returnCopyAssignee.initiator) {
    proConst.coypcheckList.push("1");
  }
  if (item.returnCopyAssignee.lastStep) {
    proConst.coypcheckList.push("2");
  }
  if (item.returnCopyAssignee.usersName != null) {
    proConst.coypcheckList.push("3");
    proConst.deployObjtnc = false;
    proConst.appointObj =
      item.returnCopyAssignee.usersName == null
        ? []
        : item.returnCopyAssignee.usersName;
  }
  if (
    item.returnCopyAssignee.projectRoleName != null ||
    item.returnCopyAssignee.sysRoleName != null
  ) {
    proConst.coypcheckList.push("4");
    proConst.appRoleObjtnc = false;
    let prosys =
      item.returnCopyAssignee.projectRoleName == null
        ? []
        : item.returnCopyAssignee.projectRoleName;
    let sys =
      item.returnCopyAssignee.sysRoleName == null
        ? []
        : item.returnCopyAssignee.sysRoleName;
    proConst.roleObj = sys.concat(prosys);
  }
  if (item.returnCopyAssignee.supervisor) {
    proConst.coypcheckList.push("5");
    proConst.managerSelValbnc = false;
    proConst.copyManagerSelVal = item.returnCopyAssignee.supervisorNum;
  }
  proConst.dialogVisible = true;
};
//人员配置数据传递
window.personSet = obj => {
  proConst.dialogVisible = false;
  sessionStorage.removeItem("actObj");
  sessionStorage.setItem("actObj", JSON.stringify(obj));
  var iframe = document.getElementById("iframe");
  var iframeWindow = iframe.contentWindow || iframe.contentDocument;
  // console.log(2223333, iframe, iframeWindow)
  iframeWindow.personSet();
};
//关闭弹框
window.closePerson = () => {
  proConst.dialogVisible = false;
  proConst.managerSelVal = 1;
  proConst.isManagerInstead = true;
  proConst.copyManagerSelVal = 1;
  document.getElementById("iframe").contentWindow.closePerson();
};
//token失效跳转登录页
window.locationLogin = function() {
  window.location.href = "/";
};
</script>

<style scoped lang="scss" type="text/css">
.checkimfo {
  font-size: 14px;
  color: white;
  max-width: 75px;
  vertical-align: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.newprocess {
  position: relative;
  .el-breadcrumb {
    line-height: 46px;
    padding-left: 10px;
    background: #ffffff;
  }
  .finance_tit {
    padding: 10px 0;
    background: #ffffff;
    .back_btn {
      border: none;
      float: left;
      margin-left: 10px;
    }
    span {
      float: left;
      color: #333;
      font-size: 20px;
      line-height: 32px;
      margin-left: 10px;
      font-weight: 500;
    }
  }
  .tab_operation {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-pagination {
    text-align: right;
    margin: 20px 40px 10px 0;
  }
  .managerBox {
    display: flex;
    // line-height: 40px;
    margin-bottom: 7px;
    height: 40px;
    .boxR {
      box-sizing: border-box;
      .imgBox {
        padding: 6px 0 0 11px;
      }
    }
  }
  .promptImg1 {
    width: 447px;
    height: 339px;
    position: absolute;
    right: -340px;
    top: 75px;
  }
  .promptImg2 {
    width: 447px;
    height: 339px;
    position: absolute;
    right: -340px;
    top: 215px;
  }
  .deploy_opt {
    .promptTit {
      margin-left: 11px;
      font-size: 12px;
    }
    .promptBox {
      height: 29px;
      margin-left: 80px;
      margin-top: 12px;
    }
    .promptBox2 {
      height: 34px;
      margin-left: -9px;
      margin-top: 15px;
      color: red;
    }
  }
}
</style>

<style lang="scss">
.newprocess .el-dialog__header {
  border-bottom: 1px solid rgba(221, 221, 221, 0.35);
  text-align: center;
}

.newprocess .deploy_opt .el-checkbox .el-checkbox__label {
  font-size: 12px;
}
.newprocess .deploy_opt .el-checkbox__label {
  color: #606266;
}
.newprocess .el-dialog {
  text-align: left;
}
.deploy_opt .el-select .el-input__inner {
  width: 400px;
}
.newprocess .deploy_opt {
  width: 94%;
  line-height: 40px;
  text-align: left;
  // padding-bottom: 65px;
}
.newprocess .deploy_opt label {
  display: table;
  text-align: right;
}
.newprocess .deploy_opt .role_btn {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  color: #fff;
  background: #409eff;
  margin-right: 10px;
  border-radius: 4px;
}
.newprocess .el-radio {
  margin-right: 20px;
}
.newprocess .el-tabs {
  margin: 14px 0;
}
.newprocess .el-tabs .el-tabs__content {
  padding: 0;
}
#dys {
  line-height: 0px;
  float: right;
  width: 85%;
  margin-top: -43px;
  .el-tag {
    vertical-align: bottom;
    margin: 2px;
  }
}
.boxinof1 {
  min-height: 120px;
}
.deplay_top {
  border-bottom: 1px dashed #ebeef5;
}
.deplay_tag {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  .el-tag {
    vertical-align: bottom;
    // margin: 2px;
    max-width: 210px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > span {
      max-width: 200px;
    }
  }
}

#dys {
  line-height: 0px;
  width: 85%;
  margin-top: -43px;
  .el-tag {
    vertical-align: bottom;
    margin: 2px;
  }
}
.boxinof {
  min-height: 50px;
}
#dye {
  margin-bottom: 41px;
}
.infs {
  overflow: auto;
  max-height: 100px;
  border-radius: 5px;
  margin-left: 15%;
  margin-top: -36px;
  line-height: 0px !important;
  margin-bottom: 15px;
  .el-tag {
    vertical-align: bottom;
    margin: 2px;
  }
}
.deploy_box {
  height: 623px;
  overflow: auto;
}
</style>
