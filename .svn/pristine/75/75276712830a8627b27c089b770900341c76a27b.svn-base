<template>
  <div class="distributed clearfix">
    <div class="fl distrDiv">
      <el-tabs>
        <div style="margin-bottom: 24px;">
          <ul style="width: 74%;margin-top: -10px;margin-left: 10px;">
            <el-tabs v-model="tabsDataid" @tab-click="handleClick">
              <el-tab-pane
                v-for="(item,index) in tabsData"
                :label="item.name"
                :name="JSON.stringify(item.id)"
                :key="index"
              ></el-tab-pane>
            </el-tabs>
          </ul>
        </div>
        <el-table
          style="cursor:pointer;"
          :header-cell-style="{background:'#FAFAFA',color:'#999999',}"
          height="600"
          ref="multipleTable"
          v-if="frist1"
          @select="selects"
          @select-all="selects"
          :data="tabledatas"
          @row-click="rowclick"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="任务名称">
            <!-- <template slot-scope="scope">
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
                <p style="padding-left: 7px;" :title="scope.row.name">{{scope.row.name }}</p>
              </div>
            </template> -->
            <template slot-scope="scope">
              <img style="width: 12px;margin-left: 7px;" :title="namest"
                   @mouseover.stop="cxnames(scope.row,$event)"
                   v-if="scope.row.parentId > 0"
                   src="../../../../assets/login/qizi@2x.png" alt>
              <span style="background: #919191" class="tabss" v-if="scope.row.priority == 0"></span>
              <span style="background: #ffc53d" class="tabss" v-if="scope.row.priority == 1"></span>
              <span style="background:#ff4d4f" class="tabss" v-if="scope.row.priority == 2"></span>
              <span style="cursor: pointer" :title="scope.row.name">{{scope.row.name }}</span>
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
    <div class="fr annotation" style="width: 24%;">
      <el-dropdown style="margin-right: 5px;float: right;margin-left: 5px;">
        <span class="el-dropdown-link">
          <el-button size="small"  type="primary">
            <i class="iconfont xinzengHCshenqing"></i>
            批量操作</el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="batch2"
          > <i class="iconfont tongyi"></i> 标记完成</el-dropdown-item>
          <el-dropdown-item @click.native="batch" >
           <i class="iconfont bianji2-copy"></i> 编辑任务</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="font-size: 14px;color: #999999;padding-right: 24px;">注：任务配置完时间后配置未分配执行人员默认为待认领任务</span>
    </div>
    <editcomponent
      @seteditcomponent="editcomponent = false"
      :editcomponentdata="editcomponentdata"
      :flagadd="editcomponent"
      @settask="settask"
    />
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
import setchebox from "../viewswitches/setchebox"
import axios from 'axios';
export default {
  name: "distributed",
  components: {
    tasksDetail
  },
  data() {
    return {
      gettask: [],
      editcomponentdata: [],
      editcomponent: false,
      projectId: "",
      namest: "",
      tabsData: [],
      staer: 1,
      tabledatas: [],
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      ids: "",
      flagdetaildatas: "",
      flagdetail: false,
      cflagdetail: false,
      frist1: true,
      frist2: false,
      frist3: false,
      currentPages: 1,
      flag: false,
      flagshelter: false,
      pagey: 10,
      aabb: "",
      tabsDataid: "",
      tabsDataids: "",
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      dataTotals: 1,
      pageSize: 1,
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
      this.ajax();
    }
  },
  mounted() {
    if (this.projectId == "") {
      this.projectId = this.$store.state.projectMsg.pro_id;
      this.ajax();
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
      this.editcomponentdata = this.gettask
      this.editcomponent = true;
    },
    batch2(){
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
              this.ajaxs(this.pageye, this.currentPages);
            }else{
               var m
                if(response.data.failNum == null){
                  m = '全部标记成功'
                }else{
                  m = `${response.data.successNum}个任务标记成功，${response.data.failNum}个任务标记失败`
                }
              this.$message.success(m)
              this.ajaxs(this.pageye, this.currentPages,[...this.gettask.map(v=>v.id)],response.data.idSet,4);
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
    settask(){
      this.$refs.multipleTable.clearSelection();
      this.editcomponent = false
      this.gettask = []
      this.ajaxs(this.pageye, this.currentPages);
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
    handleClick(tab, event) {
      console.log(tab.index);
      var arr = this.tabsData;
      for (let i = 0; i < arr.length; i++) {
        if (tab.index == i) {
          this.tabsDataid = JSON.stringify(arr[i].id);
          this.ajaxs();
        }
      }
    },
    gxbox(val) {
      this.gettask = []
      this.$refs.multipleTable.clearSelection();
      if (val.name == 2) {
        //  this.ajaxs()
        this.ajaxs(this.pageye, this.currentPages);
      } else if (val.name == 3) {
        //  this.ajaxs()
        this.ajaxs(this.pageye, this.currentPages);
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
        data: {
          id: row.id
        }
      };
      var _this = this;
      this.$post("/info/task/getTaskDetailsByid", data)
        .then(response => {
          _this.flagdetaildatas = response.data;
          console.log(response.data);
          _this.flagdetail = true;
          var ids = {
            // implementStageId:_this.tabsDataid,
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
    handleEdit(row) {
      // alert(1)
      this.flagshelter = true;
      this.aabb = row;
      console.log(row);
    },
    onResultChange(val) {
      console.log("子组件传过来的是", val);
      this.flagshelter = val;
    },
    onPageChange(currentPage) {
      this.currentPages = currentPage;
      this.ajaxs(this.pageye, currentPage);
    },
    handleSizeChange(val) {
      this.pageye = val;
      this.ajaxs(val, this.currentPages);
    },
    ajax() {
      var data = {
        data: {
          projectId: this.projectId
        },
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId
      };
      var _this = this;

      var proId = "";
      this.$post("/info/project/getImplementStageList", data)
        .then(response => {
          _this.tabsData = response.data;
          _this.tabsDataid = JSON.stringify(response.data[0].id);
          _this.tabsDataids = response.data[0].id;
          _this.ajaxs();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ajaxs(val, currentPage,arr,arr2,index) {
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
          implementStageId: this.tabsDataid
        },
        pageNo: currentPage,
        pageSize: pageSize,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId
      };
      var _this = this;
      var proId = "";
      this.$post("/info/task/getTaskByStage", data)
        .then(response => {
          _this.tabledatas = response.data.list;
          _this.dataTotals = response.data.total;

          this.$store.commit("isref",{state:3});
          let vm = this
          setchebox(arr,arr2,index,response,vm,3)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    content_xzs(index, item) {
      this.staer = 2;
      // var arr = this.$refs.outsideComponentRef
      // for (let i = 0; i < arr.length; i++) {
      //     if(index == i){
      //        arr[i].style.borderBottom='2px solid #0061A9'
      //        arr[i].style.color='#0061A9'
      //     }else{
      //        arr[i].style.borderBottom='none'
      //        arr[i].style.color='rgba(0,0,0,0.65)'
      //     }
      // }
      // var arrs=this.$refs.outsideComponentRefs
      // for (let i = 0;  i< arrs.length; j++) {
      //    console.log(arrs[i])
      //    if(index == i){
      //     //    console.log( arrs[i])
      //     //    arrs[i].style.color='#0061A9'
      //     }else{
      //         // console.log(arrs[i])
      //     //    arrs[i].style.color='rgba(0,0,0,0.65)'
      //     }
      // }

      this.tabsDataid = item.id;
      this.ajaxs();
    }
  }
};
</script>
<style  lang="scss" scoped>
.content_xz {
  height: 29px;
  background: #fff;
  width: 100%;
  border-bottom: none;
}
.distributed {
  background: #fff;
  margin-top: 73px;
  position: relative;
  margin-top: 1%;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 1%;
}

.distributed .distrDiv {
  width: 100%;
}
.distributed .annotation {
  position: absolute;
  right: 10px;
  top: 10px;
}

.el-tabs__nav-scroll {
  padding-left: 20px;
}
.content_xz {
  height: 29px;
  background: white;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  li {
    height: 25px;
    float: left;
    margin-top: 0;
    margin-left: 2%;
    width: 63px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #000000;
    text-align: left;
  }
}
.content_xz li:first-child {
  margin-left: 12px;
}
.pagination {
  width: 100%;
  height: 37px;
  margin-top: 22px;
  float: right;
  // margin-right: -326px;
  text-align: right;
  margin-right: 25px;
}
.tabs[data-v-bc94c532][data-v-bc94c532] {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #0061a9;
  line-height: 32px;
  float: left;
  margin-top: -17px;
  margin-left: 10px;
}
.tabss {
  width: 3px;
  height: 22px;
  float: left;
}
.content_xz[data-v-bc94c532] {
  height: 29px;
  background: white;
  width: 100%;
  border-bottom: none;
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
  display: flex;
  span {
    // float: left;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>


