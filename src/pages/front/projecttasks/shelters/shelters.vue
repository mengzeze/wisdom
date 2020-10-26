<template>
  <div class="shelters">
    <div class="contents clearfix">
      <div class="fl distrDiv">
        <div class="inos">
          <el-button size="small" @click="clickselectsr"  style="margin-right: 5px" type="primary">
          <i class="iconfont tongyi" ></i> 标记完成</el-button>
        </div>
        <el-tabs @tab-click="handleClick">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{background:'#FAFAFA',color:'#333333'}"
            @row-click="rowclick"
            height="600"
            @select="selects"
            @select-all="selects"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="任务名称" width="330">
              <!-- <template slot-scope="scope">
                <div class="jins">
                  <span style="background: #919191" id="tabss" v-if="scope.row.priority == 0"></span>
                  <span style="background: #ffc53d" id="tabss" v-if="scope.row.priority == 1"></span>
                  <span style="background:#ff4d4f" id="tabss" v-if="scope.row.priority == 2"></span>
                  <span :title="scope.row.name"  @click="handleEdit(scope.row)" style="padding-left: 7px;">{{scope.row.name }}</span>
                </div>
              </template> -->
              <template slot-scope="scope">
              <img style="width: 12px;margin-left: 7px;" :title="namest" @mouseover.stop="cxnames(scope.row,$event)" v-if="scope.row.parentId > 0" src="../../../../assets/login/qizi@2x.png" alt>
              <span style="background: #919191" class="tabss" v-if="scope.row.priority == 0"></span>
              <span style="background: #ffc53d" class="tabss" v-if="scope.row.priority == 1"></span>
              <span style="background:#ff4d4f" class="tabss" v-if="scope.row.priority == 2"></span>
              <span class="nameinfo" style="cursor: pointer" :title="scope.row.name">{{scope.row.name }}</span>
            </template>
            </el-table-column>
            <el-table-column label="阶段" sortable>
              <template slot-scope="scope">
                <span :title="scope.row.implementStageName">{{scope.row.implementStageName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="closeFlag" label="关闭状态">
              <template slot-scope="scope">
                <span title="已关闭" v-if="scope.row.closeFlag == 1">已关闭</span>
                <span title="关闭" v-else>正常</span>
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="截止时间" sortable>
              <template slot-scope="scope">
                <div class="jins">
                  <span :title="scope.row.endTime | filtertime">{{scope.row.endTime | filtertime}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="分配时间" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                <div class="jins">
                  <span :title="scope.row.createTime | filtertime">{{scope.row.createTime | filtertime}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tabs>
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
      </div>
    </div>
    <tasksDetail  :flagdetail="flagdetail3" @gxboxs="gxboxs" :ids="ids" :flagdetaildatas="flagdetaildatas" />
  </div>
</template>
<script>
import tasksDetail from '../tasks/tasksDetail3';
import setchebox from "../viewswitches/setchebox"
export default {
  components: {
    // shelterPers,
    tasksDetail
  },
  data() {
    return {
      //是否显示弹框
      namest:"",

      projectId: "",
      flagdetail: false,
      flagshelter: false,
      tites: "认领任务",
      flagdetail3: false,
      currentPages:1,
      tableData: [],
      multipleSelection: [],
      aabb: "",
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      dataTotals: 1,
      pageSize: 1,
      flagdetaildatas: "",
      pageye:10,
      ids: "",
      selectsrow:[]
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
      this.listTablse();
    }
  },
  mounted() {
    if (this.projectId == "") {
      this.projectId = this.$store.state.projectMsg.pro_id;
      this.listTablse();
    }
    this.$store.commit("states", 2);
  },
  methods: {
    selects(row){
      this.selectsrow = row
    },
    clickselectsr(){
       if (this.selectsrow.length == 0) {
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
        if(this.selectsrow.length == 1){
          url = "/info/task/completeTask"
          data.data = {
             id: this.selectsrow.map(v=>v.id)[0]
          }
        }else{
          url = "/info/task/completeTasks"
          data.data = {
            idSet:this.selectsrow.map(v=>v.id)
          }
        }
        this.$post(url,data).then(response => {
          if(response.code == 0 || response.code == -3517 || response.code == -3021) {
            if(this.selectsrow.length == 1){
              this.$message.success(response.msg)
              this.listTablse(this.pageye, this.currentPages);
            }else{
                var m
                if(response.data.failNum == null){
                  m = '全部标记成功'
                }else{
                  m = `${response.data.successNum}个任务标记成功，${response.data.failNum}个任务标记失败`
                }
              this.$message.success(m)
              this.listTablse(this.pageye, this.currentPages,[...this.selectsrow.map(v=>v.id)],response.data.idSet,4);
            }
            this.selectsrow = []
          }else if(response.code == -3515){
            this.$message.error(response.msg)
          }else {
            this.$message.error(response.msg)
          }
        }).catch(function(error) {});
        }).catch(() => {});
    },
    gxboxs(val) {
      this.flagdetail = val;
      this.selectsrow = []
      this.flagshelter = false;
      // if(val == false){
      //     this.listTablse()
      // }
      this.$refs.multipleTable.clearSelection();
      if (val.name == 2) {
        // this.cxlist()
        // this.listTablse();
        this.listTablse(this.pageye, this.currentPages);
        this.flagdetail3 = false;
      } else if (val.name == 3) {
        // this.cxlist()
        // this.listTablse();
        this.listTablse(this.pageye, this.currentPages);
      } else if (val.name == 1) {
        // this.cxlist()
        // this.listTablse();
        this.listTablse(this.pageye, this.currentPages);
        this.flagdetail3 = false;
      }
    },
     cxnames(items,el) {
      var data = {
        token: this.token,
        userId: this.userId,
        "projectId": this.projectId,
        data: {
          "parentId": items.parentId
        }
      };
      var _this = this;
      this.$post("/info/task/getParentTask", data)
        .then((response)=> {
          // console.log(response.data)
          if(response.data== undefined){
            _this.namest=''
          }else{
            _this.namest='所属父任务:'+response.data.name
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rowclick(row) {
      //  console.log(this.flagdetail3)
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
        .then((response)=> {
          _this.flagdetaildatas = response.data;
          _this.flagdetail3 = true;
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
    handleEdit(row) {
      // this.flagshelter = true;
      this.flagdetail3 = true;
      console.log(row);
      this.aabb = row;
      console.log(this.aabb);
    },
    onPageChange(currentPage) {
      this.currentPages= currentPage
      this.listTablse(this.pageye, currentPage);
    },
    handleSizeChange(val) {
      this.pageye=val
      this.listTablse(val,this.currentPages);

    },
    handleClick(tab, event) {
      console.log(tab, event);
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
    onResultChange(val) {
      console.log("子组件传过来的是", val);
      this.flagshelter = val;
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
      var _this = this;
      var status = "";
      this.$post("/info/task/getUnclaimedTask", data)
        .then((response)=> {
          _this.tableData = response.data.list;
          _this.dataTotals = response.data.total;
           this.$store.commit("isref",{state:3});
           let vm = this
           setchebox(arr,arr2,index,response,vm,2)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.nameinfo{
  padding-left: 10px;
    float: left;
    width: 204px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tabss {
  width: 3px;
  height: 22px;
  float: left;
}
.el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
.shelters {
  background: #fff;
  margin-top: 73px;
  position: relative;
  margin-top: 1%;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 1%;
}
.el-form {
  text-align: left;
}

.shelters .distrDiv {
  width: 100%;
}
.shelters .annotation {
  position: absolute;
  right: 10px;
  top: 10px;
}

.el-tabs__nav-scroll {
  padding-left: 20px;
}
.block {
  background-color: #fff;
}
.el-form-item__content {
  text-align: left;
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
.jins{
    width: 100%;
    height: 20px;
    overflow: hidden;
    span{
        float: left;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.inos{
    text-align: right;
    margin-right: 5px;
    margin-top: 5px;
}
</style>


