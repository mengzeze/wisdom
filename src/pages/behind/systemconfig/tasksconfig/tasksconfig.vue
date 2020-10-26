<template>
  <div class="tasksConfig" style="overflow: hidden;">
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>任务配置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :class="['finance_tit', { finance_tit_search: isResult }]">
        <span v-show="!isResult" class="sub-title">任务配置</span>
        <div class="clearfix" v-show="isResult">
          <el-button
            circle
            @click="backBtn"
            class="iconfont leftarrow back_btn fl"
          ></el-button>
          <span class="fl">任务配置搜索结果</span>
        </div>
        <el-button
          v-if="
            $utils.checkSystemPermission('bask_task_model_add') && !isResult
          "
          class="add-module-btn"
          icon="el-icon-plus"
          type="primary"
          @click="addModuleBtn"
          >新增任务模板</el-button
        >
      </el-row>
    </div>
    <el-container class="content_cont">
      <el-aside width="260px;" id="aside" v-if="!isResult">
        <div style="height:100%">
          <!-- <business-tree @method="handleMethods" :width="'260px'" :height="'auto'" :default="true" :general="false"></business-tree> -->
          <business-tree
            @method="handleMethods"
            :width="'260px'"
            :height="'auto'"
            :general="false"
            :prot="['project']"
            :shadeShow="false"
            @load="treeLoad"
            ref="businessTree"
          ></business-tree>
        </div>
      </el-aside>
      <el-main>
        <div v-on:keyup.enter="searchBtn" style="width: 100%">
          <el-form class="search-box clearfix">
            <el-form-item label="模板名称：" class="fl">
              <el-input
                clearable
                v-model="searchItem.mouleName"
                class="inline-input"
                placeholder="包含以下全部关键字（以空格区分）"
                maxlength="100"
              ></el-input>
            </el-form-item>
            <el-form-item label="创建人：" class="business-select fl">
              <el-input
                v-model="searchItem.creater"
                placeholder="请选择创建人"
                disabled
                :title="searchItem.creater"
              ></el-input>
              <el-button @click="seleCreater(1)" type="primary">选择</el-button>
            </el-form-item>
            <el-form-item label="创建时间：" class="select-time fl">
              <date-range
                :date-start.sync="searchItem.starTime"
                :date-end.sync="searchItem.endTime"
                format="yyyy-MM-dd HH:mm:ss"
              ></date-range>
            </el-form-item>
            <el-form-item label="业务类型：" class="business-select fl">
              <el-input
                v-model="searchItem.financingName"
                placeholder="请选择业务类型"
                class="fin_inp"
                disabled
                :title="searchItem.financingName"
              ></el-input>
              <el-button @click="businessTypeSele(1)" type="primary"
                >选择</el-button
              >
            </el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchBtn"
              class="search-btn fl"
              >查询</el-button
            >
            <el-button
              @click="resetBtn"
              icon="el-icon-refresh"
              class="reset-btn fl"
              >重置</el-button
            >
          </el-form>
        </div>
        <el-table
          style="margin-left: -10px;width: 100%"
          ref="multipleTable"
          :data="tasksconfiglist"
          tooltip-effect="dark"
          :header-cell-style="{
            background: '#FAFAFA',
            color: 'black',
            fontWeight: 'bold'
          }"
        >
          <el-table-column
            prop="name"
            label="模板名称"
            align="center"
            min-width="50"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.name"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor:pointer;"
                v-if="!isResult"
                @click="newCreateTask(scope.row, 1, 1)"
              >
                {{ scope.row.name }}
              </p>
              <p
                :title="scope.row.name"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor:pointer;"
                v-if="isResult"
                v-html="scope.row.highLightName"
                @click="newCreateTask(scope.row, 2, 1)"
              ></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createByName"
            label="创建人"
            align="center"
            min-width="50"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.createByName"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.createByName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            min-width="50"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.createTime"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.createTime }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="financeTypeName"
            label="业务类型"
            align="center"
            min-width="50"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.financeTypeName"
                style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              >
                {{ scope.row.financeTypeName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <div class="tab_operation">
                <span
                  @click="deletes(scope.row)"
                  class="icon-operate-btn delete iconfont shanchu"
                  title="删除"
                ></span>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            暂无数据
          </div>
          <!-- <div class="nodata_box" v-if="noDataBol">暂无数据</div> -->
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
      </el-main>
    </el-container>
    <!-- 新增任务模板 -->
    <el-dialog
      title="新建任务模板"
      :close-on-click-modal="false"
      :visible.sync="prophase"
      width="500px"
      class="choseAuditor"
    >
      <p
        style="width: 108.5%;background: #ccc;height: 1px;margin-top: -21px;margin-bottom: 32px;margin-left: -20px;"
      ></p>
      <span>
        <div class="auditorType clearfix">
          <div class="prophaseType fl">
            <p>
              <span><i style="color: red;">*</i>任务模板名称：</span>
              <el-input
                v-model="newtext"
                maxlength="100"
                placeholder="请输入内容"
                style="width:70%"
              ></el-input>
            </p>
            <p t @click="selects">
              <span><i style="color: red;">*</i>选择业务类型：</span>
              <el-input
                disabled
                v-model="newadd"
                placeholder="选择业务类型"
                style="width:55%"
              ></el-input>
              <el-button style="margin-left: -5px;" type="primary"
                >选择</el-button
              >
            </p>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="prophase = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="addModuleSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑任务模板 -->
    <el-dialog
      title="项目阶段类型"
      :close-on-click-modal="false"
      :visible.sync="prophaseEdit"
      width="500px"
      class="choseAuditor"
    >
      <span>
        <div class="auditorType clearfix">
          <div class="prophaseType fl">
            <p>
              <span><i style="color: red;">*</i> 任务模板名称：</span>
              <el-input
                v-model="names"
                maxlength="100"
                placeholder="请输入内容"
                style="width:70%"
              ></el-input>
            </p>
            <p>
              <span><i style="color: red;">*</i>选择业务类型：</span>
              <el-input
                v-model="value"
                style="width:55%"
                disabled
                placeholder="请选择"
              ></el-input>
              <!-- <el-button style="margin-left: -5px;" type="primary">选择</el-button> -->
            </p>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="prophaseEdit = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="prophaseEdits"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <select_box v-if="flag" v-on:states="sat" :selectTree="selectTree" />
    <project-type
      v-if="selectBusinessVisible"
      :singleSele="2"
      :isProcessengineClick="false"
      :typeObj="BusinessTypeList"
      :state="state"
      v-on:typeProject="typeProject(2, arguments)"
      @sendValueToParent="projectTypeClose"
      :optState="optState"
      :hasSelect="searchItem.financingList"
    ></project-type>
    <findall-deptuser
      :findFlagShow.sync="findFlag"
      :findUserObj="searchItem.createrList"
      v-on:findAllUser="findAllUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
  </div>
</template>

<script>
import select_box from "@/components/select_box/tasksconfig";
import projectType from "@/components/dialogcommon/projecttype";
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
export default {
  components: {
    select_box,
    findallDeptuser,
    projectType
  },
  data() {
    return {
      flag: false,
      prophase: false,
      prophaseEdit: false,
      financeTopId: "",
      options: [],
      // token:"String",
      // userId:"123",
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      value: "",
      names: "",
      items: "",
      selectTree: [],
      newadd: "",
      newaddId: "",
      newtext: "",
      financingId: "",
      isResult: false, // true为搜索结果
      treeClickObj: { id: "" }, //左侧树对象
      searchItem: {
        //搜索条件
        starTime: "",
        endTime: "",
        creater: "", //在创建人搜索条件中做展示
        createByIds: [], //搜索条件中创建人id集合
        createrList: [],
        copypeople: [],
        financingName: "", //业务类型名称
        financingList: [],
        mouleName: "" //模板名称
      },
      pageSize: 100,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量-页数
      isProcessengineClick: true, // 是否在融资类型中对项目阶段限制
      selectBusinessVisible: false, //查询条件中的选择业务类型弹窗
      BusinessTypeList: [],
      state: 1,
      optState: { value: 2 },
      tasksconfiglist: [],
      findFlag: false, //选择人员
      findState: {},
      checkState: {},
      findUserObj: [],
      searchPerson: [],
      isFromTaskModulePage: false
    };
  },
  created() {
    // this.isResult = this.$route.query.isSearchState || false;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const searchState = to.query.isSearchState === "2";
      vm.isResult = searchState;
      if (from.path == "/tasksmodule" && !searchState) {
        vm.$nextTick(() => {
          console.log("选中");
          vm.searchItem = vm.$utils.copyObj(vm.$store.state.behindTaskSearch);
          if (vm.$route.query.businessType != undefined) {
            vm.$refs.businessTree.activeSelNode(vm.$route.query.businessType);
            vm.isFromTaskModulePage = false;
          } else {
            vm.isFromTaskModulePage = true;
          }
        });
      } else if (from.path == "/tasksmodule" && searchState) {
        vm.isFromTaskModulePage = false;
        vm.searchItem = vm.$utils.copyObj(vm.$store.state.behindTaskSearch);
        vm.tasksconfig();
      } else {
        vm.isFromTaskModulePage = false;
        vm.tasksconfig();
      }
    });
  },
  methods: {
    backBtn() {
      this.isResult = false;
      this.tasksconfig();
    },
    addModuleBtn() {
      this.prophase = true;
      console.log("左", this.treeClickObj);
      if (this.treeClickObj.id != "" && !this.treeClickObj.disabled) {
        this.newadd = this.treeClickObj.label;
        this.newaddId = this.treeClickObj.id;
        this.financingId = this.treeClickObj.pid;
        this.financeTopId = this.treeClickObj.fields.data.financeTopId;
      } else {
        this.newadd = "";
        this.newaddId = "";
        this.financingId = "";
        this.financeTopId = "";
      }
    },
    // 搜索
    searchBtn() {
      this.currentPage = 1;
      this.isResult = true;
      // this.treeClickObj = {id: ''};
      this.tasksconfig(2);
    },
    resetBtn() {
      this.searchItem = {
        //搜索条件
        starTime: "",
        endTime: "",
        creater: "", //在创建人搜索条件中做展示
        createByIds: [], //搜索条件中创建人id集合
        createrList: [], //选择人员列表
        copypeople: [],
        financingName: "", //业务类型名称
        financingList: [],
        mouleName: "" //模板名称
      };
    },
    // 分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.tasksconfig();
      //查询数据
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.tasksconfig();
    },
    treeLoad(data) {
      this.treeClickObj = data;
      if (this.isFromTaskModulePage) {
        this.$refs.businessTree.activeSelNode(this.treeClickObj.id);
      }
    },
    handleMethods(data) {
      //点击左侧树
      console.log("点击左侧树");
      this.treeClickObj = data;
      this.tasksconfig();
    },
    businessTypeSele(val) {
      //选择业务类型
      this.isProcessengineClick = false;
      this.tupeNum = val;
      var sendData = { token: this.token, userId: this.userId, data: {} };
      var that = this;
      var url = "";
      if (this.tupeNum == 1) {
        url = "/info/project/getAllFinanceType";
      } else if (this.tupeNum == 2) {
        url = "/info/project/getUsableFinanceType";
      }
      this.$post(url, sendData)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            that.selectBusinessVisible = true;
            that.state = 2;
            that.BusinessTypeList = data;
            that.optState = { value: val };
          } else {
            this.$message(response.msg);
          }
        })
        .catch(error => {});
    },
    //业务类型返回值
    typeProject() {
      let data = arguments[1][0];
      var finaTypeId;
      this.searchItem.financingList = this.$utils.cloneDeepArray(data);
      let arr = [];
      data.forEach(obj => {
        arr.push(obj.label);
      });
      if (arr.length == 1) {
        this.searchItem.financingName = arr[0]; //选择单个业务类型不加、
      } else {
        this.searchItem.financingName = arr.join("、");
      }
      if (this.searchItem.financingList.length == 1) {
        finaTypeId = data[0].id;
      } else {
        return; //选择多个业务类型时不调接口获取阶段列表
      }
      var satData = {
        data: {
          financingId: finaTypeId
        },
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/getProjectStageList", satData)
        .then(response => {
          var data = response.data;
          if (response.code == that.code.codeNum.SUCCESS) {
            if (arguments[0] == 1) {
              // that.add_form.progStage = ''
              // that.add_form.stageOption = response.data;
              that.$forceUpdate(); // 手动更新
            }
          } else {
            that.$message(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    projectTypeClose() {
      this.selectBusinessVisible = false;
    },
    sat(data) {
      this.flag = false;
      this.newadd = data[0].name;
      this.newaddId = data[0].id;
      this.financingId = data[0].financingId;
      this.financeTopId = data[0].financeTopId;
      console.log(this.financeTopId);
    },
    addModuleSubmit() {
      if (this.newtext == "") {
        this.$message.warning("请输入任务模板名称");
        return;
      }
      this.isSameName().then(
        res => {
          if (res != "") {
            this.$confirm("存在同名模板是否确定继续保存", "提示", {
              confirmButtonText: "自动重命名",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                console.log("用返回");
                this.prophases(res);
              })
              .catch(() => {});
          } else {
            console.log("没有");
            this.prophases(this.newtext);
          }
        },
        err => {}
      );
    },
    prophases(newName) {
      console.log("新建", this.newadd, this.newaddId);
      if (this.newtext == "" || this.newadd == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          financingBusinessId: this.financingId,
          financingTopId: this.financeTopId,
          financingId: this.newaddId,
          name: newName
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/info/taskTpl/addTaskTplType", data)
        .then(response => {
          if (response.code == 0) {
            let data = response.data;
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.prophaseEdit = false;
            // _this.tasksconfig();
            _this.newtext = "";
            _this.newadd = "";
            _this.financeTopId = "";
            _this.prophase = false;
            this.newCreateTask(data, 1, 2);
          } else {
            _this.$message({
              message: response.msg,
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async isSameName() {
      //新建时较验模板名称是否重名
      var obj = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.newtext
        }
      };
      return await this.$post("/info/taskTpl/isDuplicateTaskTplName", obj).then(
        response => {
          if (response.code !== this.code.codeNum.SUCCESS) {
            return;
          }

          return response.data;
        },
        err => {
          Message.error(err.message || "网络异常，请刷新重试");
        }
      );
    },
    selects() {
      this.flag = true;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      var _this = this;
      this.$post("/info/project/getUsableFinanceType", data)
        .then(response => {
          _this.selectTree = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tasksconfig(searchType = 1) {
      //查询列表searchType = 2为点击查询按钮
      let finaTypeIds = [];
      // this.searchItem = this.$utils.copyObj(this.$store.state.behindTaskSearch);
      let endDate =
        this.searchItem.endTime == ""
          ? ""
          : this.searchItem.endTime.substr(0, 11) + "23:59:59";
      console.log("搜索", this.treeClickObj);
      if (
        this.treeClickObj.id == "" ||
        this.treeClickObj.id == null ||
        searchType == 2 ||
        this.isResult
      ) {
        //不是点击左侧目录树
        console.log("搜索2", this.treeClickObj);
        this.searchItem.financingList.forEach(obj => {
          finaTypeIds.push(obj.id);
        });
      } else {
        finaTypeIds.push(this.treeClickObj.id);
      }
      var data = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        data: {
          financingIds: finaTypeIds,
          taskTplKeyWords: this.searchItem.mouleName,
          createStartTime: this.searchItem.starTime,
          createEndTime: endDate,
          createBys: this.searchItem.createByIds
        }
      };
      // if(this.treeClickObj.id != '' && this.treeClickObj.id != null && searchType != 2){
      //   console.log('返回查询',this.treeClickObj)
      //   data.data.taskTplKeyWords = ''
      //   data.data.createStartTime = ''
      //   data.data.createEndTime = ''
      //   data.data.createBys = []
      // }
      console.log("是否是结果页", this.isResult);
      if (!this.isResult) {
        console.log("返回查询", this.treeClickObj);
        data.data.taskTplKeyWords = "";
        data.data.createStartTime = "";
        data.data.createEndTime = "";
        data.data.createBys = [];
      }
      var _this = this;
      this.$post("/info/taskTpl/getTaskTplTypeList", data)
        .then(response => {
          _this.tasksconfiglist = response.data.list;
          _this.dataTotal = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    newCreateTask(item, potition, isEdit) {
      console.log("00012", isEdit);
      let handleTitle = isEdit == 1 ? "编辑任务模板" : "新建任务模板";
      this.$store.commit("behindTaskSearchFn", this.searchItem);
      console.log("9999999", this.$store.state.behindTaskSearch);
      this.$router.push({
        path: "/tasksmodule",
        query: {
          financingId: item.financingId,
          financingName: item.financeTypeName, //业务类型名称
          id: item.id,
          name: item.name,
          backPosition: potition,
          handleTitle: handleTitle, //跳转到配置页面做区分
          treeObjId: this.treeClickObj.id //选中的左侧树id
        }
      });
    },

    prophaseEdits() {
      if (this.names == "") {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.items.id,
          name: this.names
        }
      };
      var _this = this;
      this.$post("/info/taskTpl/updateTaskTplType", data)
        .then(response => {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.prophaseEdit = false;
            _this.tasksconfig();
            _this.value = "";
            _this.names = "";
          } else {
            _this.$message({
              message: response.msg,
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletes(items) {
      this.$confirm("此操作将永久删除该模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              name: items.name,
              id: items.id
            }
          };
          var _this = this;
          this.$post("/info/taskTpl/delTaskTplType", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.tasksconfig();
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //选择创建人
    seleCreater() {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.searchItem.createrList = [...this.searchItem.copypeople];
    },
    findAllUser(data) {
      this.searchItem.createByIds = [];
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
      this.searchItem.creater = peon.map(v => v.name).join(",");
      this.searchItem.copypeople = peon;
      person.forEach(v => {
        this.searchItem.createByIds.push(v.id);
      });
    }
  },
  watch: {
    isResult(val) {
      if (!val && this.treeClickObj.id != "" && this.treeClickObj.id != null) {
        this.$nextTick(() => {
          this.$refs.businessTree.activeSelNode(this.treeClickObj.id);
        });
      }
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.fin_inp {
  width: 202px;
}
.inline-input {
  width: 264px;
}
.tasksConfig {
  width: 100%;
  overflow: hidden;
}
.tit {
  float: left;
  color: #333;
  font-size: 20px;
  line-height: 40px;
  margin-left: 10px;
  font-weight: 600;
}
.riheader {
  width: 100%;
  height: 96px;
  padding: 0 8px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .el-breadcrumb {
    line-height: 46px;
  }
  .finance_tit {
    position: relative;
    padding: 15px 5px;
    margin-top: 10px;
    .sub-title {
      position: absolute;
      left: 0px;
      bottom: 6px;
    }
    span {
      margin-top: 4px;
      color: #333;
      font-size: 20px;
      font-weight: 600;
    }
    .add-module-btn {
      // padding-bottom: 10px;
      position: absolute;
      right: 30px;
      bottom: 8px;
      z-index: 10;
    }
  }
  .finance_tit_search {
    padding: 0;
    margin-top: 0;
  }
}

.content_cont {
  height: calc(100vh - 70px);
  margin-top: 14px;
  // padding: 10px 10px 10px 20px;
  background: #ffffff;
  // overflow: hidden;

  .eqContent .hoverclass:hover {
    text-decoration: underline;
  }
}
.equityBusiness {
  text-align: left;
  padding: 10px 20px;
}
.equityBusiness .eqTitle {
  margin-top: 5px;
  margin-bottom: 13px;
}
.equityBusiness .eqTitle img {
  width: 15px;
  height: 16px;
  margin-right: 4px;
  position: relative;
  top: 3px;
}
.equityBusiness .eqTitle span {
  font-size: 16px;
  color: #333;
}

.equityBusiness .eqContent {
}
.equityBusiness .eqContent li {
  width: 330px;
  height: 167px;
  background: #ffffff;
  // background: rgba(255, 255, 255, 1);
  // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid #eeeeee;
  border-radius: 3px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.equityBusiness .eqContent li:hover {
  width: 330px;
  height: 167px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px 20px 10px 20px;
  margin-bottom: 10px;
  margin-right: 20px;
}

.equityBusiness .eqContent li p {
  margin-bottom: 48px;
  margin-top: 20px;
}
.equityBusiness .eqContent li p span:nth-child(1) {
  font-size: 18px;
  color: #333;
  cursor: pointer;
}

.equityBusiness .eqContent li p span:nth-child(2) {
  font-size: 14px;
  color: #4c4c4c;
  margin-left: 5px;
  cursor: pointer;
}
.equityBusiness .eqContent li p span:nth-child(3) {
  font-size: 14px;
  color: #4c4c4c;
  cursor: pointer;
}
.equityBusiness .eqContent li p span:nth-child(2):hover {
  font-size: 14px;
  color: #d22c2c;
  margin-left: 5px;
  cursor: pointer;
}
.equityBusiness .eqContent li p span:nth-child(3):hover {
  font-size: 14px;
  cursor: pointer;
}

// .equityBusiness .eqContent li p span[data-v-a4b8dfd8]:nth-child(3) {
//     font-size: 14px;
//     color: #1561a4;
//     cursor: pointer;
// }
.equityBusiness .eqContent li h5 {
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
}
.equityBusiness .eqContent li h5 span:nth-child(1),
.equityBusiness .eqContent li h5 span:nth-child(2) {
  margin-right: 10px;
}

/* 新增任务模板 */

.choseAuditor .el-dialog .el-dialog__header {
  background-color: #1a5fa4;
  text-align: left;
}
.choseAuditor .el-dialog .el-dialog__header span {
  color: #fff;
}
.choseAuditor .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.choseAuditor .auditorType {
  text-align: left;
}
/* // 项目阶段类型 */
.choseAuditor .auditorType .prophaseType {
  width: 100%;
}
.choseAuditor .auditorType .prophaseType p {
  margin-bottom: 10px;
}
.choseAuditor .auditorType .prophaseType span {
  width: 113px;
  display: inline-block;
}
.choseAuditor .auditorType .prophaseType .el-select {
  width: 80%;
}
.choseAuditor .el-dialog__footer {
  border-top: 1px solid #e8e8e8;
  text-align: center;
}
.business-select {
  input {
    width: 202px;
  }
  .el-button {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.search-btn,
.reset-btn {
  margin-bottom: 22px;
  // margin-left: 14px;
}
.back_btn {
  margin-right: 10px;
  // margin-left: 10px;
  border: none;
}
.search-box .el-form-item {
  margin-right: 22px;
}
.search-box .el-form-item.select-time {
  margin-right: 12px;
}
</style>
<style lang="scss" type="text/css">
.tasksConfig {
  .el-dialog__header {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .el-breadcrumb {
    padding-top: 0;
  }
  .search-box {
    padding-top: 20px;
    .el-form-item__label {
      width: 82px;
    }
    .moudule-name .el-form-item__label {
      // width: 110px;
    }
    .business-select .el-form-item__label {
      // width: 100px;
    }
  }
  .el-pagination {
    margin: 20px 40px 0 0;
    text-align: right;
  }
}
.equityBusiness .eqContent li p span {
  font-size: 18px;
  color: #333;
  cursor: pointer;
  width: 227px;
  height: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tasksConfig .search-box .el-form-item__content {
  float: left;
  // width: 200px;
}
</style>
