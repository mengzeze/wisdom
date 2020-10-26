<template>
  <div>
    <el-dialog
      title="底稿变动记录"
      :visible.sync="citeCatalogDialogFnreS"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="1100px"
    >
      <div>
        <div class="records" v-on:keyup.enter="serValue">
          <li>
            <span>时间选择：</span>
            <el-date-picker
              size="mini"
              v-model="picker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @focus="$utils.handleTimeFocus"
            ></el-date-picker>
          </li>
          <li>
            <span>操作人：</span>
            <el-input v-model="inputPeople" style size="mini" placeholder="请输入操作人"></el-input>
          </li>
          <li>
            <span>操作类型：</span>
            <el-select v-model="SelecValue" size="mini" placeholder="请选择操作类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
          <li>
            <el-button class="el-icon-search" type="primary" size="medium" @click="serValue">查询</el-button>
          </li>
          <li>
            <el-button class="el-icon-refresh-left" @click="rest" size="medium" plain>重置</el-button>
          </li>
          <li>
            <el-button type="primary" size="medium" @click="expro" class="el-icon-upload2">导出</el-button>
          </li>
        </div>
        <el-table
          :data="tableData"
          height="480px"
          v-loading="loading"
          :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
          style="width: 100%"
        >
          <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
          <el-table-column prop="userName" label="操作人" width="150"></el-table-column>
          <el-table-column prop="description" label="操作类型" width="150"></el-table-column>
          <el-table-column prop label="事件">
            <template slot-scope="scope">
              <div :title="scope.row.content" class="list_time">{{scope.row.content}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["citeCatalogDialogFnre", "newProjId","projectName"],
  data() {
    return {
      dialogVisible: true,
      loading: false,
      tableData: [],
      options: [
        {
          value: "0",
          label: "增加目录"  // 02
        },
        {
          value: "1",
          label: "删除目录"  //04
        },
        {
          value: "4",
          label: "重命名目录"  //03
        },
        {
          value: "6",
          label: "下载文件"  //13
        },
        {
          value: "7",
          label: "锁定文件"  //14
        },
        {
          value: "8",
          label: "解锁文件"  //15
        },
        {
          value: "9",
          label: "重命名文件"   //08
        },
        {
          value: "10",
          label: "删除文件"  //06
        },
        {
          value: "11",
          label: "预览文件"  //09
        },
        {
          value: "12",
          label: "更新文件版本" //10
        },
        {
          value: "13",
          label: "版本还原"  //07
        },
        {
          value: "20",
          label: "引用目录"         // 01
        },
        {
          value: "22",
          label: "下载全局查看文件"   //18
        },
        {
          value: "23",
          label: "导出全局查看记录" //19
        },
        {
          value: "29",
          label: "增加文件批注"   //16
        },
        {
          value: "35",
          label: "添加标签"   //11
        },
        {
          value: "64",
          label: "编辑标签"  //12
        },
        {
          value: "36",
          label: "取消标签"  //12
        },
        {
          value: "37",
          label: "底稿变动记录"  //17
        },
        {
          value: "39",
          label: "添加索引"   //11
        },
        {
          value: "40",
          label: "取消索引"  //12
        },
        {
          value: "38",
          label: "设为底稿"  //17
        },
         {
          value: "30",
          label: "增加目录批注"   //16
        },
        // {
        //    value:"添加索引",   //20
        //    laber:"39"
        // },
        //  {
        //    value:"取消索引",  //21
        //    laber:"40"
        // },
        //  {
        //    value:"设为底稿",  // 05
        //    laber:"38"
        // }
      ],
      SelecValue: "",
      picker: [],
      inputPeople: "",
      currentPage: 1,
      total: 1,
      pagesizes: "",
      citeCatalogDialogFnreS: false
    };
  },
  mounted() {
    this.citeCatalogDialogFnreS = this.citeCatalogDialogFnre;
    this.recordTable();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("citeCatalogs", false);
          this.picker = "";
          this.inputPeople = "";
          this.SelecValue = "";
          this.currentPage = "";
          this.pagesizes = "";
        })
        .catch(_ => {});
    },
    recordTable(
      picker,
      pickers,
      inputPeople,
      SelecValue,
      currentPage,
      pagesizes,
      state
    ) {
      var newProjId ,proName 
      if (this.newProjId == "" || this.newProjId == undefined ) {
        newProjId = this.$store.state.projectMsg.pro_id;
        proName = this.$store.state.projectMsg.projectMsg.name
      } else {
        newProjId = this.newProjId;
        newProjId = this.projectName
      }
      console.log(newProjId)
      if (pagesizes == "") {
        pagesizes = 10;
      }
      if (currentPage == "") {
        pagesizes = 1;
      }
      let data = {
        data: {
          projectId: newProjId,
          projectName:proName,
          type: SelecValue,
          typeName: !!SelecValue?this.options.filter(v => v.value == SelecValue)[0].label:'',
          userName: inputPeople,
          startTime: picker,
          endTime: pickers
        },
        pageNo: currentPage,
        pageSize: pagesizes,
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        sourceName:'底稿管理',
        projectName:this.$store.state.projectMsg.projectMsg.name
      };
      console.log(data)
      if (state == 1) {
        this.$store.commit("export", {
          url: "/sys/exportPaperChangeLog",
          data: data,
          state: state
        });
        return;
      }
      this.loading = true;
      this.$post("/sys/getPaperChangeLog", data)
        .then(response => {
          if (response.code == 0) {
            this.tableData = response.data.list;
            this.loading = false;
            this.total = response.data.total;
          } else {
            this.$message({ message: response.msg, type: "error" });
          }
        })
        .catch(function(error) {});
    },
    gettime(ts, hss) {
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
        if (hss == 24) {
          hs = 24;
        } else {
          hs = "00";
        }
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
      return (times = y + "-" + ms + "-" + ds + " " + hs + ":" + fs + ":" + ss);
    },
    serValue() {
      this.currentPage = 1
      if (this.picker == "" || this.picker == null) {
        this.recordTable("", "", this.inputPeople, this.SelecValue);
        return;
      }
      this.recordTable(
        this.gettime(this.picker[0], 0),
        this.gettime(this.picker[1], 24),
        this.inputPeople,
        this.SelecValue
      );
    },
    rest() {
      this.picker = "";
      this.inputPeople = "";
      this.SelecValue = "";
    },
    expro() {
      if (this.picker == "" || this.picker == null) {
        this.recordTable("", "", this.inputPeople, this.SelecValue, "", "", 1);
        return;
      }
      this.recordTable(
        this.gettime(this.picker[0], 0),
        this.gettime(this.picker[1], 24),
        this.inputPeople,
        this.SelecValue,
        "",
        "",
        1
      );
    },
    handleSizeChange(val) {
      this.pagesizes = val;
      if (this.picker == "" || this.picker == null) {
         this.recordTable("", "", this.inputPeople, this.SelecValue,this.currentPage, this.pagesizes);
         return
      }
      this.recordTable(
        this.gettime(this.picker[0], 0),
        this.gettime(this.picker[1], 24),
        this.inputPeople,
        this.SelecValue,
        this.currentPage, 
        this.pagesizes
      );
      // this.recordTable("", "", "", "", this.currentPage, this.pagesizes);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.picker == "" || this.picker == null) {
         this.recordTable("", "", this.inputPeople, this.SelecValue,this.currentPage, this.pagesizes);
         return
      }
      this.recordTable(
        this.gettime(this.picker[0], 0),
        this.gettime(this.picker[1], 24),
        this.inputPeople,
        this.SelecValue,
        this.currentPage, 
        this.pagesizes
      );
      // this.recordTable("", "", "", "", this.currentPage, this.pagesizes);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  text-align: right;
  margin-top: 13px;
}
.records {
  width: 100%;
  >li {
    float: left;
    margin-left: 9px;
    text-align: left;
  }
  .el-range-editor--mini.el-input__inner {
    width: 240px;
  }
  .el-input {
    width: 72%;
  }
}
.list_time {
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
