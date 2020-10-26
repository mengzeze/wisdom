<template>
  <div class="taskconfigparents">
    <div class="selecttaskson">
      <el-dialog title="选择业务类型" :close-on-click-modal="false" :visible.sync="state_boxs" width="69%" class @close="chnages" @open="handleOpen">
        <span>
          <div class="auditorType clearfix">
            <div class="typeLeft fl">
              <span class="alerdy">待选类型</span>
              <div style="border:1px solid #ddd;padding:10px;">
                <el-input placeholder="输入关键字进行搜索" v-model="filterText" clearable>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <div class="wanc" style="height:336px;">
                  <el-scrollbar style="height:100%">
                    <el-tree
                      class="filter-tree"
                      :data="selectTree"
                      :props="defaultProps"
                      default-expand-all
                      :filter-node-method="filterNode"
                      @node-click="handleNodeClick"
                      ref="tree2"
                    ></el-tree>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="typeRight fr">
              <span class="alerdy">已选类型</span>
              <ul class="choTypes" style="border:1px solid #ddd;height:380px;padding: 10px;" v-if="seen">
                <li class="clearfix" v-for="(item, index) in olarr"  :key="index">
                  <span class="fl">{{item.name}}</span>
                  <i @click="delect" class="el-icon-delete fr mr-17"></i>
                </li>
                <!-- <li v-if="seen2" class="clearfix">
                  <span class="fl">暂未选择类型</span>
                </li> -->
              </ul>
              <p v-if="seen2" class="pop_no_select_item_tips">暂无选中项</p>
            </div>
          </div>
        </span>
        <span slot="footer" class="dialog-footers" style="text-align:right">
          <el-button size="medium" @click="dialogVisibles">取 消</el-button>
          <el-button size="medium" type="primary" @click="ensure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state_boxs: true,
      seen: false,
      seen2: true,
      seen3: false,
      filterText: "",
      olarr: [],
      defaultProps: {
        children: "children"
        //   label: 'name',
      }
    };
  },
  props: ["flagstate", "selectTree", "typeTit"],
  watch: {
    flagstate: function(newV, oldV) {
      console.log(newV.states);
      if (newV.states == 3) {
        this.state_boxs = true;
      }
    },
    filterText(val) {
      this.$refs.tree2.filter(val);
      //  console.log(this.$refs.tree2.filter())
    },
  },
  mounted() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    // this.$watch('dat', function(newVal, oldVal){
    //     if(newVal[1].label == '一级 2' == true){
    //         this.seen3=true
    //     }else{
    //         this.seen4=true
    //     }
    // });
    // if(this.olarr == ""){
    //     this.seen=false
    //     this.seen2=true

    // }
  },
  methods: {
    handleOpen(){
      this.filterText = ''
    },
    chnages() {
      this.$emit("states", this.olarr);
    },
    handleNodeClick(data) {
      //  console.log(data.fields.data.financeTopId)
      console.log(data);
      if (data.disabled == true) {
        this.$message({
          type: "warning",
          message: "当前该业务类型不可选"
        });
        return;
      }
      this.olarr = [
        {
          name: data.label,
          id: data.id,
          financingId: data.pid,
          financeTopId: data.fields.data.financeTopId
        }
      ];
      this.seen = true;
      this.seen2 = false;
    },
    delect() {
      this.seen = false;
      this.seen2 = true;
      this.olarr = "";
    },
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    dialogVisibles() {
      this.state_boxs = false;
    },
    ensure() {
      this.$emit("states", this.olarr);
      console.log(this.olarr);
      // this.state_boxs=false;
      this.olarr = "";
      this.seen = false;
      this.seen2 = true;
    }
    // searchWord(){
    //    // if(this.typeTit == "融资类型"){
    //    //     var dataObj={
    //    //         token:this.token,
    //    //         userId:this.userId,
    //    //     };
    //    //     var that = this;
    //    //     this.$post('/info/project/getUsableFinanceType', dataObj).then((response)=> {
    //    //         that.selectTree = response.data;
    //    //     }).catch(function(error) {
    //    //         console.log(error);
    //    //     });
    //    // }else if(this.typeTit == "审核类型"){
    //    //     var proceObj ={
    //    //         "token":this.token,
    //    //         "userId":this.userId,
    //    //     };
    //    //     var that = this;
    //    //     this.$post("/service/selectProcessTypeAll",proceObj).then((response => {
    //    //         console.log(response);
    //    //         console.log(response.data);
    //    //         if(response.code == 0){
    //    //             that.selectTree = response.data;
    //    //         }
    //    //     })).catch(error => {
    //    //
    //    //     });
    //    // }
    // },
  }
};
</script>
<style>
.taskconfigparents .selecttaskson .el-dialog__header {
  border-bottom: 1px solid #ddd;
}
.taskconfigparents .selecttaskson .el-dialog__footer {
  padding-top: 0px;
}
</style>

<style lang="scss"  scoped>
.taskconfigparents .selecttaskson .el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: none;
  border: none;
}
.taskconfigparents .selecttaskson .wanc {
  width: 100%;
  height: 230px;
  // background: red;
  margin-top: 4px;
  overflow: hidden;
  overflow: auto;
}
.taskconfigparents .selecttaskson .contenti {
  // width: 99%;
  // height:90%;
  // background:#E7F2FF;
}
.taskconfigparents .selecttaskson .contenti_headers {
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
.taskconfigparents .selecttaskson .contenti_content {
  width: 100%;
  height: 100%;
  margin-top: 12px;
  // background: #E7F2FF;
  // padding: 12px;
}
.taskconfigparents .selecttaskson .contenti_content {
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

// .choseAuditor .el-dialog .el-dialog__header{
//     background-color: #1A5FA4;
//     text-align: left;

// }
// .choseAuditor .el-dialog .el-dialog__header span{
//     color: #fff;
// }
// .choseAuditor .el-dialog__headerbtn .el-dialog__close{
//     color:#fff;
// }
.taskconfigparents .selecttaskson .auditorType {
  text-align: left;
}
.taskconfigparents .selecttaskson .auditorType .typeLeft,
.taskconfigparents .selecttaskson .auditorType .typeRight {
  width: 49%;
  // padding-right: 10px;
  // border-right: 1px solid #e8e8e8;
}

.taskconfigparents .selecttaskson .auditorType .typeRight {
  border-right: 0px;
}
.taskconfigparents .selecttaskson .auditorType .typeLeft .alerdy,
.taskconfigparents .selecttaskson .auditorType .typeRight .alerdy {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
}
.taskconfigparents .selecttaskson .auditorType .typeLeft p {
  margin-top: 10px;
  margin-bottom: 8px;
}

.taskconfigparents .selecttaskson .auditorType .typeRight .choTypes li {
  height: 34px;
  line-height: 34px;
}
.taskconfigparents .selecttaskson .auditorType .typeRight .choTypes li:hover {
  background-color: #f7f7f7;
}
.taskconfigparents .selecttaskson .auditorType .typeRight .choTypes li span {
  font-size: 14px;
  color: #333;
  // margin-left: 5px;
}
.taskconfigparents .selecttaskson .auditorType .typeRight .choTypes li i {
  margin-right: 5px;
  position: relative;
  top: 11px;
}
.taskconfigparents .selecttaskson .el-dialog__footer {
  border-top: 1px solid #e8e8e8;
  // text-align: center;
}

// 项目阶段类型
.taskconfigparents .selecttaskson .auditorType .prophaseType {
  width: 100%;
}
.taskconfigparents .selecttaskson .auditorType .prophaseType .el-select {
  width: 85%;
}
//项目阶段关联
.taskconfigparents .selecttaskson .auditorType .progressassociated {
  width: 100%;
}
.taskconfigparents .selecttaskson .auditorType .progressassociated p {
  margin-bottom: 10px;
}
.taskconfigparents .selecttaskson .auditorType .progressassociated .el-select {
  width: 77%;
}

.taskconfigparents .selecttaskson .auditorType .progressassociated span {
  display: inline-block;
  width: 105px;
}
.taskconfigparents .selecttaskson .wanc {
  width: 100%;
  height: 230px;
  margin-top: 4px;
  overflow: hidden;
  /* overflow: auto; */
  overflow-y: auto;
}
.taskconfigparents{
  .pop_no_select_item_tips{
    height: 380px;
    padding: 10px;
    border: 1px solid #ddd;
  }
}
</style>
