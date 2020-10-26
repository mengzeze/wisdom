<template>
  <div>
    <div class="dynamicTask">
      <h4>所有动态</h4>
      <div class="infinite-list-wrapper">
        <ul
          style="height: 390px;width: 467px;margin-top: 7px;"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <li v-if="obj == ''" style="text-align: center;color: #ccc;">暂无数据</li>
          <el-scrollbar style="height:100%">
            <li class="clearfix" v-for="item in obj" style="margin-top: 16px;">
              <span class="fl" style="width: 100%;">
                <div style="float: left;width: 300px; margin-top: -3px;">
                  <span  :title="suspensionTitle"  @mouseover="suspension(item,$event)" v-html="item.operationDetail"></span>
                </div>
                <div style="float:left;margin-left: 29px;">
                  <span style="color:#999999">{{item.createTime}}</span>
                  <br />
                </div>
              </span>
            </li>
          </el-scrollbar>
        </ul>
        <p v-if="loading">加载中...</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { all } from "q";
import { join } from "path";
import { constants } from "fs";
import { request } from "http";
export default {
  name: "dynamic-task",
  props: ["mbids", "Empty"],
  data() {
    return {
      messages: "",
      obj: [],
      totals: "",
      maxobj: [],
      suspensionTitle:"",
      count: 1,
      mrid: "",
      loading: false,
      objhtml: "",
      textarea: "",
      SelectPersonnel: [],
      Close_personnel: false,
      Spell_array: [],
      on_off: false,
      oldname: [],
      inptextold: "",
      htm: "",
      SelectPer: [],
      alls: ""
    };
  },
  watch: {
    Empty(val) {
      if (val.Empty == 1) {
        this.obj = [];
        this.count = 1;
        this.isajax();
      }
    }
  },
  computed: {
    noMore() {
      return this.count >= this.totals;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    suspension(item, el, state) {
        // el.path[2].children[0].setAttribute("title", el.path[2].innerText);
        // if(el.path[2].children[0].children[1] != undefined){
        //    el.path[2].children[0].children[1].setAttribute("title", el.path[2].innerText);
        // }
        el.toElement.setAttribute("title", el.toElement.innerText)
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 1;
        this.isajax();
        this.loading = false;
      }, 1000);
    },
    activelist(item) {
      this.mrid = item;
    },
    isajax() {
      var datas = {
        data: {
          taskId: this.mrid
        },
        token: this.token,
        userId: this.userId,
        pageNo: this.count,
        pageSize: 10
      };
      var _this = this;
      this.$post("/info/taskTpl/getTaskTplLogInfo", datas)
        .then((response)=> {
          _this.obj = _this.obj.concat(response.data.list);
          if (_this.obj == "") {
            _this.obj = [];
          }
          _this.totals = Math.ceil(response.data.total / 10);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="">
.maxboxtop {
  width: 300px !important;
  display: flow-root !important;
  height: 18px !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  word-break: normal !important;
}
</style>
<style lang="scss" scoped>
#inner {
  .el-textarea__inner {
    height: 85px;
  }
}
</style>
<style scoped lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.dynamicTask {
  position: relative;
}
.rightShelter .dynamicTask {
  height: 453px;
  overflow-y: auto;
  border-bottom: none;
  overflow: hidden;
}
.lsits {
  height: 122px;
  position: absolute;
  width: 89px;
  top: 337px;
  overflow: hidden;
  box-shadow: 0px 1px 5px #ccc;
  left: 3px;
  border-radius: 7px;
  cursor: pointer;
  ul {
    height: 122px;
    li {
      text-align: center;
      height: 30px;
      line-height: 30px;
      width: 89px;
      font-size: 14px;
      background: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:hover {
      background: #f5f7fa;
    }
  }
}
.test {
  width: 97%;
  height: 82px;
  border: 1px solid#d9d9d9;
  padding-left: 9px;
  padding: 6px;
  overflow: auto;
}
.test:empty::after {
  content: attr(placeholder);
  padding-left: 9px;
  padding: 6px;
  color: #999999;
}
</style>
