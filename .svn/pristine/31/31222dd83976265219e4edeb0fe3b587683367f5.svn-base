<template>
  <div class="viewswitches">
    <div style="text-align: left;padding: 1%;">
      <el-button size="medium" @click="addrw">添加任务</el-button>
    </div>
    <div class="viewinfo">
      <el-button size="small"  @click="batch(4)" style="margin-right: 5px" type="primary">
       <i class="iconfont tongyi"></i> 标记完成</el-button>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button size="small"  type="primary">
            <i class="iconfont xinzengHCshenqing"></i>
            批量操作</el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="batch(3)" >
           <i class="iconfont bianji2-copy"></i> 编辑任务</el-dropdown-item>
            <el-dropdown-item
            v-if="$utils.checkProjectPermission('project_task_del')"
            @click="delect"
            size="medium"
            @click.native="batch(1)"
          ><i class="iconfont shanchu"></i>删除任务</el-dropdown-item>
          <el-dropdown-item
            v-if="$utils.checkProjectPermission('project_task_close')"
            @click.native="batch(2)"
          ><i class="iconfont jujue"></i> 关闭任务</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="viewsClass">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @select-all="handleSelectionChanges"
        :header-cell-style="{background:'#FAFAFA',color:'#333333'}"
        @select="selects"
        @row-click="rowclick"
        tooltip-effect="dark"
        style="width: 100%"
        height="600"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="hoverChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="任务名称" width="230">
          <template slot-scope="scope">
            <div class="jins">
              <img
                style="width: 12px;margin-left: 7px;"
                :title="namest"
                @mouseover.stop="cxnames(scope.row,$event)"
                v-if="scope.row.parentId > 0"
                src="../../../../assets/login/qizi@2x.png"
                alt
              />
              <span style="background: #919191" id="tabss" v-if="scope.row.priority == 0"></span>
              <span style="background: #ffc53d" id="tabss" v-if="scope.row.priority == 1"></span>
              <span style="background:#ff4d4f" id="tabss" v-if="scope.row.priority == 2"></span>
              <span
                :title="scope.row.name"
                style="padding-left: 7px;width: 82%;cursor: pointer"
              >{{scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阶段">
          <template slot-scope="scope">
            <div class="jins">
              <span :title="scope.row.implementStageName">{{scope.row.implementStageName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="执行人">
          <template slot-scope="scope">
            <div class="jins">
              <span v-if="scope.row.taskExecutors.length == 1" :title="scope.row.taskExecutors[0].name" >{{scope.row.taskExecutors[0].name}}</span>
              <span v-else :title="title_hover" v-for="item in scope.row.taskExecutors">{{item.name}}...</span>
            </div>
          </template>
        </el-table-column>;;
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            <div class="jins">
              <span :title="scope.row.startTime | filtertime">{{scope.row.startTime | filtertime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="截止时间">
          <template slot-scope="scope">
            <div class="jins">
              <span :title="scope.row.endTime  | filtertime">{{scope.row.endTime | filtertime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.priority == 0">普通</span>
              <span v-else-if="scope.row.priority == 1">紧急</span>
              <span v-else="scope.row.priority == 2">非常紧急</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="closeFlag" label="关闭状态">
          <template slot-scope="scope">
            <span v-if="scope.row.closeFlag == 1">已关闭</span>
            <span v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdue" label="逾期状态">
          <template slot-scope="scope">
            <span class="closeStateok" v-if="scope.row.overdue == 1">已逾期</span>
            <span v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态">
          <template slot-scope="scope">
            <span class="StateAssigned" v-if="scope.row.status == 0">待分配</span>
            <span class="StateAssigned" v-else-if="scope.row.status == 1">待认领</span>
            <span class="StateAssigned" v-else-if="scope.row.status == 2">待进行</span>
            <span class="Stateloing" v-else-if="scope.row.status == 3">正在进行</span>
            <span class="Stateok" v-else-if="scope.row.status == 4">已完成</span>
            <!-- <span v-else-if="scope.row.status == 5">已完成</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotals"
        :pageSize.sync="pageSize"
        :page-sizes="pageSizes"
        :current-page.sync="currentPages"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <tasksDetail
      :flagdetail="flagdetail"
      :flagdetaildatas="flagdetaildatas"
      :ids="ids"
      v-on:gxbox="gxbox"
      :isTaskUser="isTaskUser"
      :isTaskEdit="isTaskEdit"
    />
    <editcomponent
      @seteditcomponent="editcomponent = false"
      :editcomponentdata="editcomponentdata"
      :flagadd="editcomponent"
      @settask="settask"
    />
    <tasksAdd :flagadd="flagadd" :addnew="addnew" @addgxbox="addgxbox" />
  </div>
</template>
<script>
import tasksDetail from "../tasks/tasksDetail";
import tasksAdd from "../tasks/addtasksDetail";
import "./taskcom.css";
import setchebox from "./setchebox"
import { constants } from "fs";
import axios from 'axios';
export default {
  components: {
    tasksAdd,
    tasksDetail
  },
  data() {
    return {
      editcomponent: false,
      projectId: "",
      namest: "",
      rowar: [],
      dalistL: "",
      editcomponentdata: [],
      // ls:rowar.length,
      flagdetail: false,
      checked: true,
      tableData: [],
      currentPages: 1,
      multipleSelection: [],
      addnew: "",
      flagadd: false,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      dataTotals: 1,
      title_hover: "",
      pageSize: 1,
      flagdetaildatas: "",
      pageye: 10,
      projectMsg: [],
      ids: "",
      isTaskUser: true, //当前用户对某个项目是否有编辑权限
      isTaskEdit: true,
    };
  },
  computed: {
    changeMemberTabs() {
      return this.$store.state.projectMsgs.topdata;
    },
    changeMemberTab() {
      return this.$store.state.projectMsg.pro_id;
    },
    Task_exportis() {
      return this.$store.state.projectstat.Task_exports;
    }
  },
  watch: {
    changeMemberTabs: function(newV, oldV) {
      if (newV == 1) {
        // this.pageSize = 10
        // this.listTablse();
      } else {
        this.currentPages = 1;
        this.tableData = newV.list;
        this.dataTotals = newV.total;
        this.dalist = newV.dalist;
      }
    },
    // 导出功能
    Task_exportis(newV, oldV) {
      if (newV.state == 1) {
        var arr = this.tableData;
        //  console.log(arr)
      }
    },
    changeMemberTab: function(newV, oldV) {
      console.log(newV);
      this.projectId = newV;
      this.listTablse();
    }
  },
  // /info/project/getImplementStageList
  mounted() {
    if (this.projectId == "") {
      this.projectId = this.$store.state.projectMsg.pro_id;
      this.listTablse();
    }
    this.$store.commit("states", 1);
  },
  created() {},
  methods: {
    batch(index) {
       this.delect(index);
    },
    cxnames(items, el) {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.projectId,
        data: {
          parentId: items.parentId
        }
      };
      var _this = this;
      this.$post("/info/task/getParentTask", data)
        .then(response => {
          // console.log(response.data)
          if (response.data == undefined) {
            _this.namest = "";
          } else {
            _this.namest = "所属父任务:" + response.data.name;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    hoverChange(row, column, cell, event) {
      var regS = new RegExp("\\...","g");
      this.title_hover = event.toElement.innerText.replace(regS,",")
    },
    addrw() {
       // 判断项目是否是已终止状态 
      if(this.$store.state.projectMsg.projectMsg.endFlag && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      } 
      this.flagadd = true;
      this.addnew = { implementStageIdins: "" };
    },
    addgxbox(val) {
      this.$refs.multipleTable.clearSelection();
      this.rowar = []
      if (val.name == 3) {
        this.flagadd = false;
        this.listTablse();
      }
    },
    onResultChangeadd(val) {
      // console.log(val);
      this.flagadd = val;
      if (val == false) {
        // alert(1)
        this.listTablse();
      }
    },
    selects(row) {
      this.rowar = row;
    },
    handleSelectionChanges(row) {
      this.rowar = row;
    },
    delect(index) {
      if (this.rowar == "") {
        this.$message.error('请选择任务')
        return;
      }
      if(index == 3){
        this.editcomponentdata = this.rowar;
        this.editcomponent = true;
        return
      }
      this.$confirm(`是否要${index == 1?'删除':index == 4?'标记完成':'关闭'}所有选中的任务 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        let url , data
        data = {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
        }
        if(this.rowar.length == 1 && index == 4){
          url = index == 1?"/info/task/delTasks":index == 4?"/info/task/completeTask":"/info/task/closeTasks"
          data.data = {
             id: this.rowar.map(v=>v.id)[0]
          }
        }else{
          url = index == 1?"/info/task/delTasks":index == 4?"/info/task/completeTasks":"/info/task/closeTasks"
          data.data = {
            idSet: this.rowar.map(v=>v.id)
          }
        }
        this.$post(url,data).then(response => {
          if(response.code == 0 || response.code == -3517 || response.code == -3021) {
            var msg , str = index == 1?'删除':index == 4?'标记':index == 2?'关闭':'编辑'
            if(index == 1){
               msg = response.code == 0?response.msg: `${response.data.successNum}个任务${str}成功，${response.data.failNum}个任务${str}失败`
            }else{
              if(index == 4 && this.rowar.length == 1){
                msg = response.msg
              }else{
                if(response.data.failNum == null && this.rowar.length != 1){
                  msg = '全部'+str+'成功'
                }else{
                  if(this.rowar.length == 1){
                   msg ="成功"
                  }else{
                    msg = `${response.data.successNum}个任务${str}成功，${response.data.failNum}个任务${str}失败`
                  }
                }
              }
            }
            this.$message.success(msg)
            if(this.rowar.length != 1 && index == 4){
              this.listTablse(this.pageye, this.currentPages, [...this.rowar.map(v=>v.id)],response.data.idSet,index);
            }else{
              this.listTablse(this.pageye, this.currentPages);
            }
            this.rowar = [];
            if(index == 1){
              this.$store.commit("isref", { state: 5 });
            }
          }else if(response.code == -3515){
            this.$message.error(response.msg)
          }else {
            this.$message.error(response.msg)
          }
        }).catch(function(error) {});
        }).catch(() => {});
    },
    settask(val){
      this.editcomponent = false
      this.$refs.multipleTable.clearSelection();
      this.rowar = []
      this.listTablse(this.pageye, this.currentPages);
    },
    gxbox(val) {
      this.$refs.multipleTable.clearSelection();
      this.rowar = []
      if (val.name == 2) {
        this.listTablse(this.pageye, this.currentPages);
      } else if (val.name == 3) {
        this.listTablse(this.pageye, this.currentPages);
        return;
      }
      this.flagdetail = false;
    },
    rowclick(items){
      axios.all([this.queryIsTaskUser(items),this.queryIsTaskEdit(items)]).then(axios.spread((res1,res2) => {
        this.isTaskUser = res1.data;
        this.isTaskEdit = res2.data;
        this.flagdetails(items)
      }))
    },
    flagdetails(row) {
      var data = {
        token: this.token,
        userId: this.userId,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          id: row.id
        }
      };
      var _this = this;
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          _this.flagdetaildatas = response.data;
          _this.flagdetail = true;
          var ids = {
            implementStageId: row.implementStageId,
            parentId: row.id
          };
          _this.ids = ids;
        })
        .catch(function(error) {
          console.log(error);
        });
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
    onPageChange(currentPage) {
      console.log(currentPage);
      this.currentPages = currentPage;
      this.listTablse(this.pageye, currentPage);
    },
    handleSizeChange(val) {
      this.pageye = val;
      this.currentPages = 1;
      this.$store.commit("isCurrentPages", val);
      // this.$store.state.projectstat.isCurrentPages = val
      this.listTablse(val, this.currentPages);
    },
    handleClick(row) {
      // console.log();
    },
    onResultChangeadd(val) {
      this.flagadd = val;
      if (val == false) {
        this.listTablse();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    renderHeader(h, { column }) {
      // h即为cerateElement的简写
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-plus",
          style:
            "color:#409eff;margin-left:5px;cursor:pointer;position:relative;top:4px;",
          on: {
            click: () => {
              this.flagadd = true;
            }
          }
        })
      ]);
    },
    listTablse(val, currentPage,arr,arr2,index) {
      var pageSize;
      if (val != undefined && val != "") {
        pageSize = val;
      } else {
        pageSize = 10;
      }
      var currentPages;
      if (currentPage != undefined && currentPage != "") {
        currentPage = currentPage;
      } else {
        currentPage = 1;
      }
      var data = {
        data: {
          projectId: this.projectId
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        pageNo: currentPage,
        pageSize: pageSize
      };
      if (this.dalist != "" && this.dalist != undefined) {
        data = this.dalist;
        data.pageNo = currentPage;
        data.pageSize = pageSize;
      }
      this.$post("/info/task/getTaskByProject", data)
        .then(response => {
          if (response.code != 0) {
            this.$message.error(response.msg);
            return;
          }
          if (
            response.data.pageNum > response.data.pages &&
            response.data.pages != 0
          ) {
            this.listTablse(this.pageye, response.data.pages);
            return;
          }
          this.tableData = response.data.list;
          this.$store.commit("isref",{state:3});
          this.dataTotals = response.data.total;
          let vm = this
          setchebox(arr,arr2,index,response,vm,1)
      }).catch(function(error) {});
    }
  }
};
</script>
<style >
/* .viewinfo .el-button span{
  margin-left: 6px;
} */
</style>
<style scoped lang="scss">
.viewinfo {
  float: right;
  margin-top: -31px;
  padding-bottom: 13px;
  margin-right: 17px;
}
.viewswitches {
  background: #fff;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 1%;
}

.viewswitches .viewsClass {
  margin-bottom: 10px;
}
.viewswitches .practitioners {
  width: 16px;
  height: 16px;
  position: relative;
  top: 3px;
  margin-right: 10px;
}

.viewswitches .pages {
  margin-top: 10px;
}
.pagination {
  width: 60%;
  height: 37px;
  margin-top: 13px;
  float: right;
  text-align: right;
  margin-right: 25px;
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
    // float: left;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
