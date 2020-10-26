<template>
  <div class="mytasks">
    <div class="fl mytasksDiv" id="cssid" style="margin-left: 10px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我创建/分配的" name="first">
          <!-- <my-create></my-create> -->
        </el-tab-pane>
        <el-tab-pane label="我执行的" name="second">
          <!-- <my-perform></my-perform> -->
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="third">
          <!-- <my-cc></my-cc> -->
        </el-tab-pane>
        <el-tab-pane label="未完成的" name="fourth">
          <!-- <my-unfinished></my-unfinished> -->
        </el-tab-pane>
        <el-tab-pane label="已完成的" name="five">
          <!-- <my-completed></my-completed> -->
        </el-tab-pane>
        <el-tab-pane label="已逾期的" name="sex">
          <!-- <my-overdue></my-overdue> -->
        </el-tab-pane>
      </el-tabs>
      <div class="myoverdue">
        <!-- <div style="padding-top: 16px;"></div>     -->
        <el-table
          ref="multipleTable"
          @row-click="rowclick"
          :data="tableData"
          tooltip-effect="dark"
          @select="selects"
          @select-all="selects"
          :header-cell-style="{background:'#FAFAFA',color:'#333333'}"
          height="600"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="任务名称" width="230">
            <template slot-scope="scope">
              <!-- <span style="background: #919191" class="tabss" v-if="scope.row.priority == 0"></span>
              <span style="background: #ffc53d" class="tabss" v-if="scope.row.priority == 1"></span>
              <span style="background:#ff4d4f" class="tabss" v-if="scope.row.priority == 2"></span>
              <span style="padding-left: 7px;">{{scope.row.name }}</span>-->
              <div class="jins">
                <span style="background: #919191" id="tabss" v-if="scope.row.priority == 0"></span>
                <span style="background: #ffc53d" id="tabss" v-if="scope.row.priority == 1"></span>
                <span style="background:#ff4d4f" id="tabss" v-if="scope.row.priority == 2"></span>
                <img
                  style="width: 12px;margin-left: 7px;float: left;margin-top: 3px;"
                  :title="namest"
                  @mouseover.stop="cxnames(scope.row,$event)"
                  v-if="scope.row.parentId > 0"
                  src="../../../../assets/login/qizi@2x.png"
                  alt
                />
                <span :title="scope.row.name" style="padding-left: 7px;cursor: pointer">{{scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="任务状态">
            <template slot-scope="scope">
              <div class="jins">
                <span
                  title="待分配"
                  v-if="scope.row.status == 0"
                  class="recalls_state StateAssigned"
                >待分配</span>
                <span
                  title="待认领"
                  v-else-if="scope.row.status == 1"
                  class="recalls_state StateAssigned"
                >待认领</span>
                <span
                  title="待进行"
                  v-else-if="scope.row.status == 2"
                  class="recalls_state StateAssigned"
                >待进行</span>
                <span
                  title="正在进行"
                  v-else-if="scope.row.status == 3"
                  class="recalls_state Stateloing"
                >正在进行</span>
                <span
                  title="已完成"
                  v-else-if="scope.row.status == 4"
                  class="recalls_state Stateok"
                >已完成</span>
              </div>
              <!-- <span v-else-if="scope.row.status == 5"  class="recalls_state">已完成</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="closeFlag" label="关闭状态">
            <template slot-scope="scope">
              <div class="jins">
                <span title="已关闭" v-if="scope.row.closeFlag == 1">已关闭</span>
                <span title="正常" v-else>正常</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="overdue" label="逾期状态">
            <template slot-scope="scope">
              <div class="jins">
                <span title="已逾期" class="closeStateok" v-if="scope.row.overdue == 1">已逾期</span>
                <span title="正常" v-else>正常</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="截止时间" sortable>
            <template slot-scope="scope">
              <div class="jins">
                <span :title="scope.row.endTime  | filtertime">{{scope.row.endTime | filtertime}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" sortable>
            <template slot-scope="scope">
              <div class="jins">
                <span
                  :title="scope.row.createTime  | filtertime"
                >{{scope.row.createTime | filtertime}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="fr annotation">
      <el-button
        size="small"
        @click="batch"
        style="margin-top: -7px;float: right;margin-left: 12px;"
        type="primary"
      ><i class="iconfont tongyi"></i> 标记完成</el-button>
      <span>注：任务配置完时间后配置未分配执行人员默认为待认领任务</span>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotals"
        :pageSize="pageSize"
        :page-sizes="pageSizes"
        :current-page="currentPage"
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
  </div>
</template>
<script>
import tasksDetail from "../tasks/tasksDetail";
import "../viewswitches/taskcom.css";
import setchebox from "../viewswitches/setchebox"
import axios from 'axios';
export default {
  name: "mytasks",
  components: {
    tasksDetail,
  },
  data() {
    return {
      namest: "",
      activeName: "first",
      tableData: [],
      gettask: [],
      index: 0,
      currentPages: 1,
      input: "",
      pageye: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      dataTotals: 1,
      pageSize: 1,
      projectId: "",
      flagdetail: false,
      flagdetaildatas: "",
      ids: "",
      isTaskUser: true, //当前用户对某个项目是否有编辑权限
      isTaskEdit: true,
    };
  },
  computed: {
    changeMemberTab() {
      return this.$store.state.projectMsg.pro_id;
    }
  },
  watch: {
    changeMemberTab: function(newV, oldV) {
      console.log(newV);
      this.projectId = newV;
      this.getdata();
    }
  },
  mounted() {
    if (this.projectId == "") {
      this.projectId = this.$store.state.projectMsg.pro_id;
      this.getdata();
    }
    this.$store.commit("states", 2);
  },
  methods: {
    selects(row) {
      this.gettask = row;
    },
    batch() {
      if (this.gettask.length == 0) {
        this.$message.error("请选择任务");
        return;
      }
      this.$confirm(`是否要标记完成所有选中的任务 是否继续?`, "提示", {
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
        if(this.gettask.length == 1){
          url = "/info/task/completeTask"
          data.data = {
             id: this.gettask.map(v=>v.id)[0]
          }
        }else{
          url = "/info/task/completeTasks"
          data.data = {
            idSet:this.gettask.map(v=>v.id)
          }
        }
        this.$post(url,data).then(response => {
          if(response.code == 0 || response.code == -3517 || response.code == -3021) {
            if(this.gettask.length == 1){
              this.$message.success(response.msg)
              this.getdata(this.pageye, this.currentPages);
            }else{
               var m
                if(response.data.failNum == null){
                  m = '全部标记成功'
                }else{
                  m = `${response.data.successNum}个任务标记成功，${response.data.failNum}个任务标记失败`
                }
              this.$message.success(m)
              this.getdata(this.pageye, this.currentPages,[...this.gettask.map(v=>v.id)],response.data.idSet,4);
            }
            this.gettask = []
          }else if(response.code == -3515){
            this.$message.error(response.msg)
          }else {
            this.$message.error(response.msg)
          }
        }).catch(function(error) {});
        }).catch(() => {});
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
    gxbox(val) {
      this.$refs.multipleTable.clearSelection();
      this.gettask = []
      if (val.name == 2) {
        this.getdata(this.pageye, this.currentPages);
      } else if (val.name == 3) {
        this.getdata(this.pageye, this.currentPages);
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
      console.log(row);
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
      this.currentPages = currentPage;
      this.getdata(this.pageye, currentPage);
    },
    handleSizeChange(val) {
      this.pageye = val;
      this.getdata(val, this.currentPages);
    },
    handleClick(tab, event) {
      this.index = tab.index;
      this.getdata();
    },
    getdata(val, currentPage,arr,arr2,index) {
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
      var url;
      if (this.index == 0) {
        url = "/info/task/getTaskByCreateUserOrAssigner";
      } else if (this.index == 1) {
        url = "/info/task/getExecutorTask";
      } else if (this.index == 2) {
        url = "/info/task/getCopyerTask";
      } else if (this.index == 3) {
        url = "/info/task/getNotCompleteTask";
      } else if (this.index == 4) {
        url = "/info/task/getIsCompleteTask";
      } else if (this.index == 5) {
        url = "/info/task/getOverdueTask";
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
      var _this = this;
      var status = "";
      this.$post(url, data)
        .then(response => {
          _this.tableData = response.data.list;
          _this.dataTotals = response.data.total;
          this.$store.commit("isref",{state:3});
          let vm = this
          setchebox(arr,arr2,index,response,vm,3)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style   lang="scss"  scoped>
.mytasks {
  height: 300px;
  background: #fff;
  margin-top: 73px;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 1%;
  .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
  .el-tabs__nav-wrap {
    overflow: hidden;
    margin-bottom: -3px;
    position: relative;
  }
  .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0;
    box-shadow: 0;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: #f5f7fa;
    border-bottom: none;
    margin: 0;
  }
}

.mytasks .mytasksDiv {
  width: 100%;
}
.mytasks .annotation {
  position: absolute;
  right: 30px;
  top: 10px;
}

.el-tabs__nav-scroll {
  padding-left: 20px;
}
.pagination {
  width: 100%;
  height: 37px;
  margin-top: 22px;
  float: right;
  // margin-right: -800px;
  text-align: right;
  margin-right: 25px;
}
.mytasks .mytasksDiv[data-v-0bebf236] {
  width: 100%;
  margin-left: 7px;
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
.StateAssigned{
  color: #409EFF;
}
.Stateloing{
  color: #E6A23C;
}
.Stateok{
  color:#67C23A;
}
.closeStateok{
  color: #FF4D4F;
}
</style>
