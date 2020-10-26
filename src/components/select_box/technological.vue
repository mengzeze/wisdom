<template>
  <div class="selectothersss">
    <div class="selecttwo">
      <el-dialog
        title="选择角色"
        align="left"
        :close-on-click-modal="false"
        :visible.sync="state_box"
        @close="closes"
        @open="handleOpen"
        width="60%"
        class
      >
        <span>
          <div class="auditorType clearfix">
            <div class="typeLeft fl">
              <span class="alerdy">待选角色</span>
              <div style="border:1px solid #ddd;padding:10px;position: relative;">
                <i style="position: absolute;z-index: 9999;left: 12px;top: 24px;font-size: 13px;" class="el-icon-search"></i>
                <el-input
                  v-model="filterText"
                  placeholder="请输入关键字"
                  @input="searchWord"
                  clearable
                >
                </el-input>
                <div class="wanc" style="height:336px;">
                  <el-scrollbar style="height:100%">
                    <div
                      class="typeRight fr"
                      style="width: 96%;padding-top: 10px;box-sizing: border-box"
                      v-show="dataObjfront.length || dataObjbackstage.length"
                    >
                      <span
                        style="margin-bottom: 5px;"
                        @click="iconchlic(1)"
                        ref="front"
                        class="el-icon-caret-bottom"
                      >前台</span>
                      <ul class="choTypes">
                        <div v-if="front">
                          <li
                            class="clearfix flex a-center for-select-list"
                            v-for="item in dataObjfront"
                            :key="item.id"
                            style="cursor: pointer">

                            <el-checkbox-group
                              v-model="checkList"
                              @change="handleCheckedCitiesChange">
                              <el-checkbox :label="item.id">
                                <span class="ellipsis1" style="display: inline-block; max-width: calc(100% - 50px);line-height:40px;" :title="item.roleName">{{item.roleName}}</span>
                              </el-checkbox>
                            </el-checkbox-group>
                          </li>
                        </div>
                        <span
                          style="margin-bottom: 5px;"
                          @click="iconchlic(2)"
                          ref="backstage"
                          class="el-icon-caret-bottom"
                        >后台</span>
                        <div v-if="backstage">
                          <li

                            class="clearfix flex a-center for-select-list"
                            v-for="item in dataObjbackstage"
                            :key="item.id"
                            style="cursor: pointer"
                          >
                            <el-checkbox-group
                              v-model="checkListbackstage"
                              @change="handleCheckedCitiesbackstage"
                            >
                              <el-checkbox :label="item.id">
                                <span class="ellipsis1" style="display: inline-block; max-width: calc(100% - 50px);line-height:40px;" :title="item.roleName">{{item.roleName}}</span>
                              </el-checkbox>
                            </el-checkbox-group>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div class="no-data" v-show="!dataObjfront.length && !dataObjbackstage.length">
                      <span>暂无数据</span>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="typeRight fr">
              <span class="alerdy">已选角色</span>
              <div style="border:1px solid #ddd;height:380px;padding:10px;">
                <el-scrollbar style="height:100%">
                  <ul class="choTypes pr-20">
                    <li class="clearfix flex j-spaceBetween" v-for="(item) in elefront" :key="item.id">
                      <p class="flex1 checkimfo-box">
                        <span class="fl checkimfo" :title="item.roleName+' | 前台'">{{item.roleName}}</span>
                        <span>&nbsp;|&nbsp;前台</span>
                      </p>
                      <el-button type="text" @click="efront(item,1)" class="el-icon-delete" style="color: #606266;"></el-button>
                    </li>

                    <li class="clearfix flex j-spaceBetween" v-for="(item) in elebackstage" :key="item.roleName">
                       <p class="flex1 checkimfo-box">
                        <span class="fl checkimfo" :title="item.roleName+' | 后台'">{{item.roleName}}</span>
                        <span>&nbsp;|&nbsp;后台</span>
                      </p>
                      <el-button type="text" @click="efront(item,2)" class="el-icon-delete fr" style="color: #606266;"></el-button>
                    </li>
                  </ul>
                  <p
                    v-if="elefront == '' && elebackstage == ''"
                    class="pop_no_select_item_tips"
                  >暂无选中项</p>
                </el-scrollbar>
              </div>
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
      state_box: true,
      seen: false,
      seen2: true,
      seen3: false,
      cxrolse: true,
      cxrolses: false,
      cxrolses3: false,
      roledatas: "",
      dataObj: [],
      backstage: true,
      front: true,
      checkList: [],
      checkListbackstage: [],
      checkArr: [],
      checkArrbackstage: [],
      elefront: [],
      elebackstage: [],
      dataObjfront: [],
      dataObjbackstage: [],
      filterText: '',
      olarr: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  props: ["Role", "roledata", "stateRole", "checkedData", "process"],
  watch: {
    Role: function(newV, oldV) {
      if (newV.state == 2) {
        this.state_box = true;
        this.dataObj = this.roledata;
      }
    },
    Role: function(newV, oldV) {
      this.state_box = true;
      this.dataObj = this.roledata;
    }
  },
  mounted() {
    this.dataObj = this.roledata;
    this.dataObjfront = this.dataObj.front;
    this.dataObjbackstage = this.dataObj.backstage;
    console.log(this.dataObj)
    this.filterText = "";
    this.handleOpen();
  },
  methods: {
    handleSelectChange(v){
      console.log(v)
    },
    iconchlic(index) {
      if (index == 1) {
        if (this.$refs.front.getAttribute("class") == "el-icon-caret-bottom") {
          this.$refs.front.setAttribute("class", "el-icon-caret-right");
          this.front = false;
        } else {
          this.$refs.front.setAttribute("class", "el-icon-caret-bottom");
          this.front = true;
        }
      } else {
        if (
          this.$refs.backstage.getAttribute("class") == "el-icon-caret-bottom"
        ) {
          this.$refs.backstage.setAttribute("class", "el-icon-caret-right");
          this.backstage = false;
        } else {
          this.$refs.backstage.setAttribute("class", "el-icon-caret-bottom");
          this.backstage = true;
        }
      }
    },
    handleCheckedCitiesChange(val) {
      this.checkArr = val;
      this.elefront = [];
      this.dataObj.front.forEach(element => {
        val.forEach(ele => {
          if (element.id == ele) {
            this.elefront.push(element);
          }
        });
      });
    },
    handleCheckedCitiesbackstage(val) {
      this.checkArrbackstage = val;
      this.elebackstage = [];
      this.dataObj.backstage.forEach(element => {
        val.forEach(ele => {
          if (element.id == ele) {
            this.elebackstage.push(element);
          }
        });
      });
      console.log( this.elebackstage)
    },
    efront(item, index) {
      if (index == 1) {
        this.elefront.forEach((ele, idx) => {
          if (ele.id == item.id) {
            this.elefront.splice(idx, 1);
          }
        });
         this.checkList.forEach((ele, idx) => {
          if (ele == item.id) {
            this.checkList.splice(idx, 1);
          }
        });
      } else {
        this.elebackstage.forEach((ele, idx) => {
          if (ele.id == item.id) {
            this.elebackstage.splice(idx, 1);
          }
        });
        this.checkListbackstage.forEach((ele, idx) => {
          if (ele == item.id) {
            this.checkListbackstage.splice(idx, 1);
          }
        });
      }
    },
    handleClose() {
      this.$emit("close");
    },
    handleOpen() {
      this.dataObjfront = [];
      this.dataObjbackstage = [];
      this.filterText = '';
      // console.log(this.checkedData)
      this.elefront = this.checkedData.elefront;
      this.elebackstage = this.checkedData.elebackstage;
      var elefront = [] , elebackstage =[]
      this.elefront.forEach((ele)=>{
        elefront.push(ele.id)
      })
      this.checkList = elefront
      this.elebackstage.forEach((ele)=>{
        elebackstage.push(ele.id)
      })
      this.checkListbackstage = elebackstage
      if (this.filterText == "") {
        this.dataObjfront = this.dataObj.front;
        this.dataObjbackstage = this.dataObj.backstage;
      }
    },
    searchWord() {
      if (this.filterText == "") {
        this.dataObjfront = this.dataObj.front;
        this.dataObjbackstage = this.dataObj.backstage;
      } else {
        this.querySearch(this.filterText);
      }
    },
    querySearch(queryString) {
      this.dataObjfront = this.dataObjfront.filter(
        x => x.roleName.indexOf(queryString) != -1
      );
      this.dataObjbackstage = this.dataObjbackstage.filter(
        x => x.roleName.indexOf(queryString) != -1
      );
    },
    closes() {
      this.olarr = [];
      this.handleClose();
    },
    dialogVisibles() {
      this.state_box = false;
      this.$refs.front.setAttribute("class", "el-icon-caret-bottom");
      this.$refs.backstage.setAttribute("class", "el-icon-caret-bottom");
      this.olarr = [];
      this.filterText = "";
    },
    ensure() {
      this.checkList = [];
      this.checkListbackstage = [];
      this.checkedData.elefront = []
      this.checkedData.elebackstage = []
      this.$refs.front.setAttribute("class", "el-icon-caret-bottom");
      this.$refs.backstage.setAttribute("class", "el-icon-caret-bottom");
      this.state_box = false;
      this.filterText = "";
      this.$emit("statesbox", {
        elefront: this.elefront,
        elebackstage: this.elebackstage
      });
    }
  }
};
</script>
<style>
.selecttwo .el-scrollbar .is-horizontal {
    display: none;
  }
  .for-select-list>.el-checkbox-group{
    width: 100%;
  }
  .for-select-list>.el-checkbox-group>.el-checkbox{
    display: flex;
    align-items: center;
    width: 100%;
  }
  .for-select-list>.el-checkbox-group>.el-checkbox>.el-checkbox__label{
    display: inline-block;
    width: 100%;
    line-height: 1;
  }

.selectothersss .selecttwo .el-dialog__header {
  border-bottom: 1px solid #ddd;
  text-align: center;
}
/* .choTypes{
  margin-left: 11px;
  margin-top: 3px;
} */
</style>

<style lang="scss" scoped>
  .checkimfo-box {
    width: calc(100% - 20px);
  }
  .checkimfo {
    font-size: 14px;
    color: #333;
    display: inline-block;
    // max-width: 355px;
    max-width:calc(100% - 60px);
    // vertical-align: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .no-data{
    text-align: center;
    padding-top: 20px;
  }
.selectothersss .selecttwo .el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: none;
  border: none;
}
.selectothersss .selecttwo .wanc {
  width: 100%;
  height: 230px;
  // background: red;
  margin-top: 4px;
  overflow: hidden;
  overflow: auto;
}
.selectothersss .selecttwo .contenti {
  width: 99%;
  height: 90%;
  // background:#E7F2FF;
}
.selectothersss .selecttwo .contenti_headers {
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
.selectothersss .selecttwo .contenti_content {
  width: 100%;
  height: 100%;
  margin-top: 12px;
  // background: #E7F2FF;
  // padding: 12px;
}
.selectothersss .selecttwo .contenti_content {
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
      height: 500px;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      margin-top: 10px;
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
.selectothersss .selecttwo .auditorType {
  text-align: left;
}
.selectothersss .selecttwo .auditorType .typeLeft,
.selectothersss .selecttwo .auditorType .typeRight {
  width: 47%;
  padding-right: 10px;
  margin-top: -10px;
}

.selectothersss .selecttwo .auditorType .typeRight {
  border-right: 0px;
}
.selectothersss .selecttwo .auditorType .typeLeft .alerdy,
.selectothersss .selecttwo .auditorType .typeRight .alerdy {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
}
.selectothersss .selecttwo .auditorType .typeLeft p {
  margin-top: 10px;
  margin-bottom: 8px;
}

.selectothersss .selecttwo .auditorType .typeRight .choTypes li {
  height: 34px;
  line-height: 40px;
  margin-left: 15px;
}
.selectothersss .selecttwo .auditorType .typeRight .choTypes li:hover {
  background-color: #f5f7fa;
}
.selectothersss .selecttwo .auditorType .typeRight .choTypes li span {
  /*font-size: 14px;*/
  /*color: #333;*/
  /*// margin-left: 16px;*/
  /*vertical-align: inherit;*/
  /*// width: 155px;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
}
.selectothersss .selecttwo .auditorType .typeRight .choTypes li i {
  margin-right: 5px;
  position: relative;
  top: 11px;
}
.selectothersss .selecttwo .el-dialog__footer {
  // border-top: 1px solid #e8e8e8;
  // text-align: center;
}

// 项目阶段类型
.selectothersss .selecttwo .auditorType .prophaseType {
  width: 100%;
}
.selectothersss .selecttwo .auditorType .prophaseType .el-select {
  width: 85%;
}
//项目阶段关联
.selectothersss .selecttwo .auditorType .progressassociated {
  width: 100%;
}
.selectothersss .selecttwo .auditorType .progressassociated p {
  margin-bottom: 10px;
}
.selectothersss .selecttwo .auditorType .progressassociated .el-select {
  width: 77%;
}

.selectothersss .selecttwo .auditorType .progressassociated span {
  display: inline-block;
  width: 105px;
}
</style>
<style>
.selectothersss .selecttwo .el-dialog__header {
  border-bottom: 1px solid #ddd;
}

.selectothersss .selecttwo .el-dialog__footer {
  padding-top: 0px;
}
</style>

