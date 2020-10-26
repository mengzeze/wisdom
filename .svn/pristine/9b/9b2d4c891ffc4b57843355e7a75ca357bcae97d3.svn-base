<template>
  <div class="projectmember" v-loading.fullscreen.lock="isShowLoading">
    <div class="header-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目成员</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="flex a-center j-spaceBetween">
        <div class="flex a-center company-wrap">
          <i class="project-company iconfont jianzhu color-primary"></i>
          <span class="company-name ellipsis1 ml-3">{{projectName}}</span>
        </div>
        <div class="flex a-center header-btn-wrap">
          <el-button class="mr-10" type="primary" @click="handleExport">导出</el-button>
          <el-button @click="newProFn" icon="el-icon-circle-plus-outline" type="primary" v-if="$utils.checkProjectPermission('project_add_user')">添加人员</el-button>
        </div>
      </div>
    </div>


    <!-- <el-row class="finance_tit" style="position: relative;">
      <span>项目成员</span>
      <el-button @click="newProFn" style="position: absolute;top: -5px;right: 7px;" icon="el-icon-circle-plus-outline" type="primary" v-if="$utils.checkProjectPermission('project_add_user')">添加人员</el-button>
    </el-row> -->

    <div style="height:10px;background: #f0f2f5"></div>
    <div v-on:keyup.enter="searchBtn">
    <el-form ref="form" label-width="100px" class="form_box clearfix">
      <el-form-item label="姓名：">
        <el-input v-model="usName" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="部门：">
        <el-input v-model="deptName" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-input v-model="roleName" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-button class="query-btn" type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
      <el-button class="query-btn" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
    </el-form>
    </div>
    <div class="table_box">
      <el-table :data="tableData" fit show-header style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#000'}" class="pro_table" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="usName" label="员工名称" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.usName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.usName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.deptName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.deptName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="职位" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.job" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.job}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色" width="200px" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.roleName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.roleName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间" width="150px" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.createTime.substring(0,10)" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createTime.substring(0,10)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="outTime" label="离开时间" width="150px" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.outTime.substring(0,10)" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.outTime.substring(0,10)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人" align="center" min-width="100">
          <template slot-scope="scope">
            <p :title="scope.row.createName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.createName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button 
            class="pv-0"
            type="text"
            @click="handleEdit(scope.$index, scope.row)" 
            title="编辑" 
            :disabled="scope.row.outTime != ''"><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
            <el-button class="pv-0" type="text" @click="handleDelete(scope.$index, scope.row)" 
           title="离开" 
            :disabled="scope.row.outTime != ''"><i class="icon-operate-btn iconfont likai"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-footer">
      <!-- <el-button type="primary" @click="handleExport">导出</el-button> -->
      <div></div>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange"></el-pagination>
      <!-- <el-button @click="handleAllDelete">删除</el-button> -->
    </div>
    <!--修改信息-->
    <el-dialog title="修改用户" :close-on-click-modal="false" :visible.sync="makeVisible" width="500px" @close="closeMakeFn">
      <div class="make_box">
        <div class="make_list">
          <label>
            <em>*</em>登录账号：
          </label>
          <el-input v-model="makeObj.account" disabled></el-input>
        </div>
        <div class="make_list">
          <label>
            <em>*</em>姓名：
          </label>
          <el-input v-model="makeObj.name" disabled></el-input>
        </div>
        <div class="make_list">
          <label>
            <em>*</em>性别：
          </label>
          <el-radio-group v-model="makeObj.sex" disabled>
            <el-radio :label="0" disabled>男</el-radio>
            <el-radio :label="1" disabled>女</el-radio>
          </el-radio-group>
        </div>
        <div class="make_list">
          <label>手机：</label>
          <el-input v-model="makeObj.phone" disabled></el-input>
        </div>
        <div class="make_list">
          <label>邮箱：</label>
          <el-input v-model="makeObj.email" disabled></el-input>
        </div>
        <div class="make_list">
          <label>部门：</label>
          <el-input v-model="makeObj.depart" disabled></el-input>
        </div>
        <div class="make_list">
          <label>职位：</label>
          <el-input v-model="makeObj.job" disabled></el-input>
        </div>
        <div class="make_list">
          <label>角色：</label>
          <el-input v-model="makeObj.role" disabled></el-input>
          <el-button type="primary" size="small" @click="optRole">选择角色</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeMakeFn">取 消</el-button>
        <el-button size="medium" type="primary" @click="makeOpt">修改</el-button>
      </span>
    </el-dialog>
    <!--选择人员-->
    <!--无需要回显-->
    <findall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser" :findState="findState" :checkState="checkState"></findall-deptuser>
    <!--选择角色-->
    <select-boxs :flagsinfo="flagsinfo"  v-on:statesbox='state' :findObj="findObj" :Role="Role" :roledata="roledata"></select-boxs>
  </div>
</template>

<script>
import selectBoxs from "@/components/select_box/projectmember";
import findallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'

export default {
  name: "projectmember",
  components: {
    selectBoxs,
    findallDeptuser,
  },
  data () {
    return {
      flagsinfo:false,
      optRoleinfold:[],
      table_title: this.common.commonObjFn(),
      tableData: [],
      memberRoleList:[],
      multipleSelection: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      pro_name: "第一项目",
      login_pass: "",
      dialogVisible: false,
      //添加人员
      findFlag: false,
      findState: {},
      checkState: {},
      //    修改信息
      makeVisible: false,
      makeObj: {
        account: "",
        name: "",
        sex: "",
        phone: "",
        email: "",
        depart: "",
        job: "",
        role: ""
      },
      //    选择角色
      flags: false,
      Role: {},
      roledata: [],
      tree: "",
      ind: "",
      token: "",
      userId: '',
      usName: '',
      deptName: '',
      roleName: '',
      projectId: '',
      row: '',
      arr: [],
      roleId: '',
      roleList: [],
      editId: '',
      isShowLoading: false, // 是否显示加载遮罩
      findObj: [],
      projectName: ''
    };
  },
  mounted () {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectName = this.$store.state.projectMsg.projectMsg.name;
    this.memberList();
  },
  methods: {
    //  列表查询
    memberList () {
      var listObj = {
        "token": this.token,
        "userId": this.userId,
        "pageNo": this.currentPage,
        "pageSize": this.pageSize,
        "data": {
          "usName": this.usName,
          "deptName": this.deptName,
          "roleName": this.roleName,
          "projectId": this.projectId
        }
      };
      this.$post("/info/project/getProjectMemberAll", listObj).then((response => {
        var data = response.data;
        if (response.code == this.code.codeNum.SUCCESS) {
          if(response.data.pageNum > response.data.pages && response.data.pages != 0) {
            this.currentPage = response.data.pages;
            this.memberList();
            return
          }
          this.tableData = data.list;
          this.dataTotal = data.total
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].outTime = this.tableData[i].outTime == null ? '' : this.tableData[i].outTime;
          }
        } else {
          this.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    //  删除
    deleteFn () {
      // var listObj = {
      //     "token": this.token,
      //     "userId": this.userId,
      //     "data": {
      //         "userIds":this.arr,
      //         "projectId": this.projectId
      //     }
      // };
      var listObj = {
        "token": this.token,
        "userId": this.userId,
        "data": this.arr
      };
      var that = this;
      this.$post("/info/project/delMember", listObj).then((response => {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.$message({
            type: "success",
            message: "离开成功!"
          });
          that.memberList();
        } else {
          that.$message(response.msg);
        }
      })).catch(error => {
        console.log(error);
      });
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 查询
    searchBtn () {
      this.currentPage = 1;
      this.memberList();
    },
    // 重置
    resetBtn () {
      this.usName = "";
      this.deptName = "";
      this.roleName = "";
    },
    // 退出
    handleBack (index, row) {
      this.dialogVisible = true;
      this.row = row;
    },
    dialogVisibleFn () {
      if (this.login_pass == "") {
        this.$message.error("密码不能为空");
        return;
      } else if (this.login_pass != this.$store.state.loginObject.passWord) {
        this.$message.error("密码错误");
        this.login_pass = "";
        return;
      }
      var backObj = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.row.projectId,
          "password": this.login_pass,
          "projectName": this.row.projectName
        }
      };
      var that = this;
      this.$post("/info/project/outProject", backObj).then((response => {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.dialogVisible = false;
          that.$message({
            type: "success",
            message: "退出成功!"
          });
          that.memberList();
        } else {
          that.$message(response.msg);
        }
      })).catch(error => {

      });

    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('该操作将该成员移出项目组，确定继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {};
        obj.userId = row.userId;
        obj.id = row.id;
        obj.roleName = row.roleName;
        obj.projectId = row.projectId;
        this.arr = [];
        this.arr.push(obj);
        this.deleteFn();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离开'
        });
      });
    },
    //添加人员
    newProFn () {
      // 判断项目是否是已终止状态 
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
    },
    // 分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.memberList();
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.memberList();
    },
    // 导出
    handleExport () {
      if (this.multipleSelection.length == 0) {
        return this.$message({
          message: "请先选择数据文件",
          type: "error"
        });
      }
      var arr = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        arr.push({
          createName: this.multipleSelection[i]["createName"],
          usName: this.multipleSelection[i]["usName"],
          job: this.multipleSelection[i]["job"],
          roleName: this.multipleSelection[i]["roleName"],
          createTime: this.multipleSelection[i]["createTime"],
          deptName: this.multipleSelection[i]["deptName"],
          outTime: this.multipleSelection[i]["outTime"]
        });
      }
      this.$store.commit("export", { url: "/info/project/exportMember", data: arr });
    },
    // 删除选中项
    handleAllDelete () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将删除选中成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.arr = [];
          var that = this;
          this.multipleSelection.forEach(function (ind) {
            that.arr.push(ind.userId);
          });
          this.deleteFn();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message.error("请先选择删除项！");
      }
    },
    //添加人员
    findAllUser (data) {
      this.findFlag = false
      if(!data.length){
        return
      }
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push(data[i].userId);
      }
      var addObj = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.projectId,
          "userIds": arr
        }
      };
      var that = this;
      this.$post('/info/project/addMember', addObj).then((response) => {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.$message.success(response.msg);

          that.memberList();
        } else {
          that.$message.error(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    //    编辑-选择角色
    optRole () {
      var dataObj = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.projectId
        }
      };
      var that = this;
      this.isShowLoading = true;
      this.$post('/info/project/getRoleExclude ', dataObj).then((response) => {
        this.isShowLoading = false;
        if (response.code == that.code.codeNum.SUCCESS) {
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            // data[i].roleName = data[i].name;
            this.$set(data[i], "roleName", data[i].name);
          }
          that.flagsinfo = true;
          this.optRoleinfold.forEach((ele,index)=>{
            if(ele.roleName == '创建人'){
              this.optRoleinfold.splice(index,1)
            }
          })
          this.$store.state.projectstat.projectmember = [...this.optRoleinfold]
          that.roledata = data;
          console.log(that.roledata)
          that.Role = { state: 3 }
        } else {
          that.$message(response.msg);
        }
      }).catch(function (error) {
        this.isShowLoading = false;
        console.log(error);
      });
    },
    closeMakeFn () {
      this.optRoleinfo = []
      this.makeVisible = false;
      this.flags = false;
    },
    //修改
    makeOpt () {
      this.makeVisible = false;
      var dataObj = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.projectId,
          "roleList": this.roleList,
          "userId": this.editId
        }
      };
      var that = this;
      this.$post('/info/project/updateProjectMemberRole', dataObj).then((response) => {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.$message.success("修改成功");
          that.memberList();
        } else {
          that.$message(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    state (data) {
      var k = data.k
      var data = data.f
      this.flagsinfo = false
      if(data == '' && k == 2){
        return
      }
      this.makeVisible = true;
      this.roleList = [];
      var string = "";
      if(this.makeObj.role.indexOf('创建人') != -1){
        this.makeObj.role = '创建人'
      } else {
        this.makeObj.role = ''
      }
      if(data == ''){
        this.findObj = []
        this.optRoleinfold = []
        this.makeObj.role = this.makeObj.role
        return
      }
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var obj = {};
          obj.id = data[i].roleId;
          obj.name = data[i].roleName;
          this.roleList.push(obj);
          string = string + data[i].roleName + "、";
        }
        if(this.makeObj.role == ''){
          this.makeObj.role = string;
        } else {
          this.makeObj.role = this.makeObj.role + '、' + string;
        }
      }
      this.findObj = data
      this.optRoleinfold = data
      
    },
    //    编辑
    handleEdit (index, row) {
      console.log(row.memberRoleList)
      this.optRoleinfold = row.memberRoleList
      this.makeVisible = true;
      this.makeObj.account = row.username;
      this.makeObj.name = row.usName;
      this.makeObj.sex = row.sex;
      this.makeObj.phone = row.mobile
      this.makeObj.email = row.email;
      this.makeObj.depart = row.deptName;
      this.makeObj.job = row.job;
      this.makeObj.role = row.roleName;
      this.editId = row.userId;
      this.flags = false;
      this.Role = {};
    }
  }
};
</script>

<style scoped lang="scss" type="text/css">
.projectmember {
  position: relative;
  background: #fff;
  .el-breadcrumb {
    line-height: 26px;
  }
  .finance_tit {
    padding: 10px 0;
    .el-button {
      float: right;
      margin-right: 20px;
    }
    span {
      float: left;
      color: #333;
      line-height: 32px;
      margin-left: 10px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .form_box {
    background: #fff;
    padding: 20px 0 10px 10px;
  display:flex;
  flex-wrap: wrap;

    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 10px;
      height: 40px;
      .el-input {
        width: 217px;
      }
      .inline-input {
        width: 217px;
      }
      .el-select {
        width: 217px;
      }
    }
    .el-button {
      float: left;
      margin-left: 20px;
      // margin-top: 2px;
    }
  }
  .el-pagination {
    /*margin-top: 20px;*/
    /*  text-align: right;*/
    /*  margin-right: 40px;*/
  }
  .func_btn {
    width: 200px;
    position: relative;
    top: -40px;
    left: -54px;
  }
}

.company-wrap{
  width: calc(100% - 210px);
}
.company-name{
  width: calc(100% - 26px);
  text-align: left;
}
.headersL-img{
  padding-top: 4px;
}
  .query-btn{
    height: 40px;
  }
</style>
<style>
.projectmember .headersBox .el-button+.el-button {
    margin-left: 5px;
}
.projectmember .table_box {
  /* padding: 0 10px; */
  box-sizing: border-box;
}
.projectmember .el-dialog {
  text-align: left;
}
.projectmember .hint_msg {
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  margin-bottom: 10px;
}
.projectmember .inp_pass {
  width: 230px;
}
.projectmember .make_list .el-input {
  width: 340px;
}
.projectmember .make_list {
  margin-bottom: 20px;
  position: relative;
}
.projectmember .make_list label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.projectmember .make_list label em {
  color: red;
}
.projectmember .make_list .el-button {
  position: absolute;
  height: 40px;
  right: 16px;
  top: 0px;
}
.projectmember .delet_btn {
  display: inline-block;
  width: 28px;
  height: 28px;
  padding: 0;
  margin-left: 0;
  border: none;
  border-radius: 14px;
  background-image: url("../../../../assets/image/usermanage/leave_0.png");
}
.projectmember .delet_btn:hover {
  background-image: url("../../../../assets/image/usermanage/leave_1.png");
}
.projectmember .el-table .cell {
  line-height: normal;
}
</style>
