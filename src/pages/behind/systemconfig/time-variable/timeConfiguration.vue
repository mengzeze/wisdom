<template>
  <div class="timeconfiguration">
    <!-- 分类 -->
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>时间变量配置</el-breadcrumb-item>
      </el-breadcrumb>
      <header>
        <div class="content_title">时间变量配置</div>
        <el-button type="primary" v-if="$utils.checkSystemPermission('time_variable_add')" icon="el-icon-plus" @click="addVariable">添加</el-button>
      </header>
    </div>
    <!--内容-->
    <div class="class_content">
      <div class="query-content" v-on:keyup.enter="queryDetail">
        <div class="query-list">
          <div class="query-items">
            <div class="query-text">时间变量名称:</div>
            <div class="query-center">
              <el-input  v-model="queryObj.name" placeholder="请输入类型名称"></el-input>
            </div>
          </div>
        </div>
        <el-button  type="primary" @click="queryDetail" icon="el-icon-search">查询</el-button>
        <el-button @click="resetBtn" icon="el-icon-refresh" style="margin-left: 15px">重置</el-button>
      </div>
      <el-table
        :data="tableData"
        tooltip-effect="dark">
        <el-table-column label="序号" type="index" width="auto"></el-table-column>
        <el-table-column prop="name" label="时间变量名称" width="auto" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createName" label="创建人" width="auto"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="auto"></el-table-column>
        <el-table-column prop="date" label="操作" width="130" align="center" v-if="$utils.checkSystemPermission('time_variable_edit')
        || $utils.checkSystemPermission('time_variable_remove') || $utils.checkSystemPermission('time_variable_enable')">
          <template slot-scope="scope">
            <div class="oper_box">
              <div title="编辑">
                <div v-if="$utils.checkSystemPermission('time_variable_edit')"
                @click="update(scope.row)"
                class="icon-operate-btn iconfont bianji2-copy"></div>
              </div>
              <div>
                <!--0--禁用；  1启用-->
                <div title="启用" @click="resets(scope.row)"
                v-if="scope.row.status === 0 && $utils.checkSystemPermission('time_variable_enable')"
                class="icon-operate-btn iconfont qiyong-copy"></div>
                <div title="禁用" @click="resets(scope.row)"
                v-if="scope.row.status === 1 && $utils.checkSystemPermission('time_variable_enable')"
                class="icon-operate-btn iconfont jinyong"></div>
              </div>
              <div title="删除">
                <div v-if="$utils.checkSystemPermission('time_variable_remove')"
                @click="delect(scope.row)" class="icon-operate-btn delete iconfont shanchu"></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="80"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="totals"
                       :pageSize.sync="pageSize" :page-sizes.sync="pageSizes" :current-page.sync="currentPages"
                       @current-change="onPageChange" @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="titles"
      :close-on-click-modal="false"
      :visible.sync="prophase"
      width="500px"
      class="choseAuditor">
      <span>
        <div
          style="width: 108%;height: 1px;background: rgb(204, 204, 204);margin-top: -21px;margin-bottom: 21px;
                margin-left: -19px;"
        ></div>
        <div class="auditorType clearfix" style="margin-left: 27px;">
          <div>
            <p class="dialog_content">
              <span>时间变量名称：</span>
              <span  style="width:70%">
                <el-input v-model="valueName" maxlength="30" placeholder="请输入时间变量名称"></el-input>
              </span>
            </p>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="prophase = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="sureBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script  >
export default {
  name: "timeConfiguration",
  data() {
    return {
      token: "",
      userId: "",
      queryObj: {
        name: ""
      },
      tableData: [],
      titles: '',
      totals: 0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],    //每页显示数量
      currentPages: 1,  //当前页
      vals: 10,
      prophase: false,
      valueName: '',
      ids: '',
      nameRepeat: ''
    };
  },
  created () {},
  components: {},
  computed: {},
  mounted() {
    this.queryData();
  },
  methods: {
    // 查询
    queryDetail () {
      // this.currentPage = 1
      this.currentPages = 1
      this.queryData()
    },
    queryData () {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.queryObj.name
        },
        pageNo: this.currentPages,
        pageSize: this.vals,
      }
      this.$post('/info/timeVar/selectTimeVarList', data).then((response) => {
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if(response.code == -504 && response.msg == '查询结果为空') {
          if(this.currentPages ===1){ // 如果当前已经是第一页了，不在往前查询了
            this.tableData = []
            this.totals = 0
            return
          }
          this.currentPages --;
          this.queryData();
          return
        }
        if (response.code !== 0) {
          // this.$message.error(response.msg)
          this.tableData = []
          this.totals = 0
          return
        }
        this.tableData = response.data.list
        this.totals = response.data.total
        this.loading = false
      }).catch((error) => {
        this.$message.error(error)
      });
    },
    // 添加
    addVariable () {
      this.titles = '添加时间变量'
      this.valueName = ''
      this.prophase = true
      this.ids = ""
      this.nameRepeat = ""
    },
    // 确定
    sureBtn () {
      if (this.valueName == "") {
        this.$message({
          type: "info",
          message: "请输入时间变量名称"
        });
        return;
      }
      if (this.valueName == this.nameRepeat) {
        this.prophase = false;
        return
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.valueName
        }
      };
      if (this.ids) {
        var url = "/info/timeVar/editVariableName"
        data.data.id = this.ids
      } else {
        var url = "/info/timeVar/addTimeVar";
      }
      var _this = this;
      this.$post(url, data)
        .then((response)=> {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.valueName = "";
            _this.prophase = false;
            this.ids = ''
            this.queryData();
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          this.$message.error(error)
        });
    },
    // 重置
    resetBtn () {
      this.queryObj.name = ''
      // this.queryData()
    },
    update (row) {
      this.titles = '编辑时间变量'
      this.valueName = row.name;
      this.nameRepeat = row.name
      this.ids = row.id
      this.prophase = true
    },
    delect (row) {
      if (row.status === 1) {
        this.$message.warning('请先将时间规则禁用后删除')
        return
      }
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          data: {
            name: row.name,
            id: row.id
          },
          token: this.token,
          userId: this.userId,
        }
        var _this = this
        this.$post('/info/timeVar/removeTimeVariable', data).then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message({
              message: response.msg,
              type: 'success'
            });
            _this.queryData()
          } else {
            _this.$message.error(response.msg);
          }
        }).catch(function (error) {
          this.$message.error(error)
        });
      }).catch(() => {
        this.$message.info('已取消');
      });
    },
    resets (row) {
    //  0禁用，1启用
      var startObj = {
        token:this.token,
        userId:this.userId,
        data:{
          id:row.id
        }
      };
      var url = "";
      if(row.status == 0){
        url = "/info/timeVar/enableTimeVar";
      }else{
        url = "/info/timeVar/disableTimeVar";
      }
      var that = this;
      this.$post(url,startObj).then((response => {
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if (response.code !== 0) {
          this.$message.error(response.msg)
          return
        }
        if(row.status == 0){
          that.$message.success("启用成功！");
        }else if(row.status == 1){
          that.$message.success("禁用成功！");
        }
        this.queryData()
      })).catch(error => {
        this.$message.error(error)
      });
    },
    //分页
    onPageChange (currentPage) {
      console.log(currentPage)
      this.currentPages = currentPage
      this.queryData()
    },
    handleSizeChange (val) {
      this.vals = val;
      setTimeout(() => {
        this.queryData()
      }, 500)
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },

  watch: {}
};
</script>

<style lang="scss" scoped>
.timeconfiguration {
  width: 99.7%;
  padding: 0px 0px;
  overflow: hidden;
  background: #f0f2f5;
  .riheader {
    width: 100%;
    // padding: 0 15px;
    height: 96px;
    padding: 0 8px;
    background: rgba(255, 255, 255, 1);
    // position: relative;
    .el-breadcrumb {
      line-height: 46px;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
  }
  .content_title {
    font-size:20px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .class_content {
    width: 100%;
    margin: 14px auto;
    background: #ffffff;
    padding: 18px;
  }
  .query-content{
    display: flex;
    justify-content: flex-start;
    padding-bottom: 15px;
  }
  .query-list{
    /*width: 80%;*/
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 60px;
  }
  .query-items {
    display: flex;
    align-items: center;
  }
  .query-text{
    margin-right: 20px;
  }
  .pagination {
    padding: 20px 0;
    background-color: #fff;
    text-align: right;
    padding-right: 40px;
    margin-top: 0;
  }
  .oper_box {
    display: flex;
    justify-content: space-around;
    div {
      flex: 0.25;
    }

    .op_one {
      background-image: url("../../../../assets/image/usermanage/suoding_0.png");
    }
    .op_one:hover {
      background-image: url("../../../../assets/image/usermanage/suoding_1.png");
    }
    .op_tow {
      background-image: url("../../../../assets/image/usermanage/group_0.png");
    }
    .op_tow:hover {
      background-image: url("../../../../assets/image/usermanage/group_1.png");
    }
    .op_towq {
      background-image: url("../../../../assets/common_icon/disableOpen_icon.png");
    }
    .op_towq:hover {
      background-image: url("../../../../assets/common_icon/disableOpen_hover_icon.png");
    }
    .op_four {
      background-image: url("../../../../assets/image/usermanage/shanchu_0.png");
    }
    .op_four:hover {
      background-image: url("../../../../assets/image/usermanage/shanchu_1.png");
    }
  };
  .dialog_content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
<style>
  .timeconfiguration .el-table__header-wrapper .el-table__header .has-gutter tr th{
    background-color: #FAFAFA !important;
    color: #2c2c2c;
    font-weight: 500;
  }
</style>

