<template>
  <div class="selectothers">
    <div class="selecttwo">
      <el-dialog
        title="选择角色"
        align="left"
        :close-on-click-modal="false"
        :visible.sync="state_box"
        @close="ensure(true)"
        width="60%"
      >
        <span>
          <div class="auditorType clearfix">
            <div class="typeLeft fl">
              <span class="alerdy">待选角色</span>
              <div style="border:1px solid #ddd;padding:10px;">
                <el-input
                  v-model="filterText"
                  placeholder="输入关键字搜索"
                  @input="searchWord"
                  clearable
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <div class="wanc" style="height:336px;">
                  <el-scrollbar style="height:100%">
                    <ul class="ul-tree">
                        <li v-for="item in dataObj" :key="item.id">
                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checked']" :disabled="item['disabled']" @change="handleRoleCheck(item)"></el-checkbox>
                            <span :title="item.roleName" class="ellipsis1 alerdy_ellipsis1">{{item.roleName}}</span>
                        </li>
                    </ul>
                    <div class="typeRight fr" style="width: 91%;" v-show="cxrolses3">
                      <ul class="choTypes">
                        <li class="clearfix">
                          <span class="fl">暂无数据</span>
                        </li>
                      </ul>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="typeRight fr">
              <span class="alerdy">已选角色</span>
              <div style="border:1px solid #ddd;height:380px;padding:10px;">
                <el-scrollbar style="height:100%">
                  <ul class="choTypes" v-if="olarr != ''">
                    <li class="flex j-spaceBetween" v-for="(item,index) in olarr" :key="item.roleId">
                      <div class="ellipsis1 mright">{{item.roleName}}</div>
                      <i @click="delect(item, index)" class="el-icon-delete flex-shrink0"></i>
                    </li>
                  </ul>
                  <ul v-else class="pop_no_select_item_tips">暂无选中项</ul>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </span>
        <span slot="footer" class="dialog-footers" style="text-align:right">
          <el-button size="medium" @click="ensure(true)">取 消</el-button>
          <el-button size="medium" type="primary" @click="ensure()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state_box: this.flagsinfo,
      seen: false,
      seen2: true,
      seen3: false,
      cxrolse: true,
      cxrolses: false,
      cxrolses3: false,
      roledatas: "",
      dataObj: [],
      filterText: "",
      olarr: [],
      checkList: [],
      optRoleinfo:[]
    };
  },
  props: [
    "Role",
    "roledata",
    "stateRole",
    "checkedData",
    "process",
    "findObj",
    "flagsinfo",
  ],
  computed: {
    optRoleinfos() {
      return this.$store.state.projectstat.projectmember;
    }
  },
  watch: {
    flagsinfo(val) {
      this.state_box = this.flagsinfo;
    },
    roledata() {
      this.roledata.forEach(element => {
        this.$set(element, "roleId", element.id);
      });

      this.olarr = this.$store.state.projectstat.projectmember;
      this.roledata.map((e, i)=>{
        this.olarr.map((o, p)=> {
          if (e.roleId == o.roleId) {
            this.$set(e, 'checked', true)
            this.$set(e, 'disabled', true)
          }
        })
      })
      this.dataObj = this.roledata;
    },
    optRoleinfos() {
      console.log(this.$store.state.projectstat.projectmember);
      this.optRoleinfo = this.$store.state.projectstat.projectmember;
      this.olarr = this.optRoleinfo;
    }
  },
  methods: {
    handleRoleCheck (item) {
      item.disabled = true
      this.olarr.push(item);
      this.unique(this.olarr);
    },
    searchWord() {
      if (this.filterText == "") {
        this.dataObj = this.roledata;
      } else {
        this.querySearch(this.filterText);
      }
    },
    querySearch(queryString) {
      this.dataObj = this.dataObj.filter(
        x => x.roleName.indexOf(queryString) != -1
      );
    },
    ensure(item) {
      this.filterText = ''
      this.$store.state.projectstat.projectmember = [];
      if (item) {
        this.$emit("statesbox", {
          f:[],
          k:2
        });
      } else {
          s:
        this.$emit("statesbox", {
          f:this.olarr,
          k:1
        });
      }
      this.olarr = [];
      this.checkList = [];
      this.dataObj = []
    },
    checkChange(item) {
      this.olarr.push(item);
      this.unique(this.olarr);
    },
    delect(item, index) {
      this.olarr.forEach((element, index) => {
        if (element.roleId == item.roleId) {
          this.olarr.splice(index, 1);
        }
      });
      this.dataObj.forEach((e, i)=>{
        if (e.roleId == item.roleId) {
          this.$nextTick(()=>{
            e.disabled = false
            e.checked = false
          })
        }
      })
    },
    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].roleId == arr[j].roleId) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    }
  }
};
</script>
<style>
.selectothers .selecttwo .el-dialog__header {
  border-bottom: 1px solid #ddd;
  text-align: center;
}
</style>

<style lang="scss" >
.selecttwo .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background: #0061A9;
  border-color: #0061A9;
}
.ul-tree{
  margin-left: 10px;
  li{
    padding: 8px 0;
    >span{
      margin-left: 10px;
    }
  }
}
.selectothers .selecttwo .el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: none;
  border: none;
}
.selectothers .selecttwo .wanc {
  width: 100%;
  height: 230px;
  // background: red;
  margin-top: 4px;
  overflow: hidden;
  overflow: auto;
}
.selectothers .selecttwo .contenti {
  width: 99%;
  height: 90%;
  // background:#E7F2FF;
}
.selectothers .selecttwo .contenti_headers {
  width: 98%;
  height: 9%;
  text-align: left;
  background: white;
  padding-left: 10px;
  margin-left: 14px;
  overflow: hidden;
  p {
    // width:56px;
    height: 3%;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.5%;
    // line-height:0.5%;
  }
  h3 {
    // width:82px;
    height: 5%;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    // line-height:94px;
    margin-top: 30px;
  }
}
.selectothers .selecttwo .contenti_content {
  width: 100%;
  height: 100%;
  margin-top: 12px;
  // background: #E7F2FF;
  // padding: 12px;
}
.selectothers .selecttwo .contenti_content {
  width: 100%;
  height: 90%;
  .contenti_left {
    width: 17%;
    height: 98.5%;
    float: left;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    margin-left: 12px;
    li {
      width: 52px;
      line-height: 27px;
      float: left;
      background: rgba(242, 243, 245, 1);
      border: 1px solid rgba(231, 231, 231, 1);
      border-radius: 4px;
      line-height: 28px;
      margin-left: 5%;
      margin-top: 5%;
      padding-left: 5px;
      padding-right: 5px;
      font-size: 11px;
      background: rgba(242, 243, 245, 1);
    }
    .contenti_left_img {
      margin-left: 17px;
      clear: both;
      padding-top: 15px;
      p {
        width: 80px;
        height: 22px;
        img {
          width: 100%;
        }
      }
    }
    .contenti_left_tree {
      margin-left: 8%;
      padding-top: 10px;
    }
  }
  .contenti_right {
    width: 80%;
    height: 98.5%;
    float: left;
    // background:rgba(255,255,255,1);
    border: 1px solid rgba(216, 220, 228, 1);
    border-radius: 3px;
    margin-left: 12px;
    .el-col-12 {
      width: 50%;
    }
    .rightTop {
      .rightTitle {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        span:nth-child(1) {
          font-size: 16px;
          color: #333;
          margin-left: 20px;
        }
        span:nth-child(2) {
          width: 89px;
          height: 34px;
          background-color: #1a5fa4;
          line-height: 34px;
          color: #fff;
          font-size: 14px;
          margin-right: 15px;
          margin-top: 14px;
          cursor: pointer;

          img {
            width: 14px;
            height: 14px;
            position: relative;
            top: 2px;
            left: -6px;
          }
        }
      }
    }
    .rightLeftBottem {
      // width:450px;
      height: 500px;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      margin-top: 10px;
      // float: left;

      p {
        height: 60px;
        line-height: 60px;
        span:nth-child(1) {
          font-size: 16px;
          color: #333;
          margin-left: 20px;
        }
        span:nth-child(2) {
          width: 89px;
          height: 34px;
          background-color: #1a5fa4;
          line-height: 34px;
          color: #fff;
          font-size: 14px;
          margin-right: 15px;
          margin-top: 14px;
          cursor: pointer;

          img {
            width: 14px;
            height: 14px;
            position: relative;
            top: 2px;
            left: -6px;
          }
        }
      }
      .proTypes {
        text-align: left;
        margin-left: 22px;
        .typeDelete {
          position: relative;
          top: 15px;
          right: 100px;
        }
        .othersType {
          margin-left: 69px;
        }
      }
    }
    .rightRightBottm {
      // width:450px;
      height: 500px;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      margin-top: 10px;
      // float: left;
      margin-left: 10px;
      p {
        height: 60px;
        line-height: 60px;
        span:nth-child(1) {
          font-size: 16px;
          color: #333;
          margin-left: 20px;
        }
        span:nth-child(2),
        span:nth-child(3) {
          width: 89px;
          height: 34px;
          background-color: #1a5fa4;
          line-height: 34px;
          color: #fff;
          font-size: 14px;
          margin-right: 15px;
          margin-top: 14px;

          img {
            width: 14px;
            height: 14px;
            position: relative;
            top: 2px;
            left: 1px;
          }
        }
      }
      .proTypes {
        text-align: left;
        margin-left: 22px;
        .typeDelete {
          position: relative;
          top: 15px;
          right: 100px;
          margin-left: 6px;
        }
        .othersType {
          margin-left: 69px;
        }
      }
    }
  }
}
.selectothers .selecttwo .auditorType {
  text-align: left;
}
.selectothers .selecttwo .auditorType .typeLeft,
.selectothers .selecttwo .auditorType .typeRight {
  width: 47%;
  padding-right: 10px;
  margin-top: -10px;
}

.selectothers .selecttwo .auditorType .typeRight {
  border-right: 0px;
}
.selectothers .selecttwo .auditorType .typeLeft .alerdy,
.selectothers .selecttwo .auditorType .typeRight .alerdy {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
}
.selectothers .selecttwo .auditorType .typeLeft p {
  margin-top: 10px;
  margin-bottom: 8px;
}
.choTypes{
  padding-right: 5px;
}

.selectothers .selecttwo .auditorType .typeRight .choTypes li {
  height: 34px;
  line-height: 34px;
}
.selectothers .selecttwo .auditorType .typeRight .choTypes li:hover {
  background-color: #f5f7fa;
}
.selectothers .selecttwo .auditorType .typeRight .choTypes li span {
  font-size: 14px;
  color: #333;
  margin-left: 5px;
  /*width: 155px;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: text-top;
}
.selectothers .selecttwo .auditorType .typeRight .choTypes li i {
  margin-right: 5px;
  position: relative;
  top: 11px;
}
// 项目阶段类型
.selectothers .selecttwo .auditorType .prophaseType {
  width: 100%;
}
.selectothers .selecttwo .auditorType .prophaseType .el-select {
  width: 85%;
}
//项目阶段关联
.selectothers .selecttwo .auditorType .progressassociated {
  width: 100%;
}
.selectothers .selecttwo .auditorType .progressassociated p {
  margin-bottom: 10px;
}
.selectothers .selecttwo .auditorType .progressassociated .el-select {
  width: 77%;
}

.selectothers .selecttwo .auditorType .progressassociated span {
  display: inline-block;
  width: 105px;
}
.mright{
  margin-right: 20px;
}
.alerdy_ellipsis1{
  display: inline-block;
  max-width: calc(100% - 50px);
}
</style>
<style>
.selectothers .selecttwo .el-dialog__header {
  border-bottom: 1px solid #ddd;
}

.selectothers .selecttwo .el-dialog__footer {
  padding-top: 0px;
}
</style>

