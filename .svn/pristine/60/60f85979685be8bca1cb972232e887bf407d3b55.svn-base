<template>
  <div class="remark">
    <el-dialog
      :title="Approvaltitle"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      width="780px"
      style="height: calc(100vh);"
      @close="close"
    >
      <p class="docName" v-if="ApprovaldocData.length == 1">
        <span>文件名：</span>
        {{ApprovaldocData[0].docName}}
      </p>
      <div class="Reply">
        <!-- 一级 -->
        <ul v-for="i in 10">
          <li class="Replyone">
            <span class="Replyonetwo">张三</span>
            <span class="Replyonethree">2020-02-28 00:00</span>
          </li>
          <li class="Replytwo">
            <p class="Replytwop">
              【
              <span style="color:#0061a9">V1</span> 版本-通过】格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误
              版本-通过】格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误
            </p>
            <p class="Replytwotowp">
              <el-input
                style="width: 100%;margin-top: 10px;visibility: hidden;"
                size="medium"
                v-model="Reply"
                placeholder="请输入内容"
              ></el-input>
              <el-button
                type="text"
                style="visibility: hidden;"
                @click="Clickreply($event,false,i)"
              >取消回复</el-button>
              <el-button type="text" @click="Clickreply($event,true,i)">回复</el-button>
            </p>
          </li>
          <li>
            <!-- 二级 -->
            <ul class="second">
              <li class="secondoneli">
                <span class="secondone">
                  <span class>陈三</span> &nbsp;回复&nbsp;
                  <span>王五</span>
                </span>
                <span class="secondonetime">2020-02-28 00:00</span>
              </li>
              <li>
                <p class="Replytwop">
                  【
                  <span style="color:#0061a9">V1</span> 版本-通过】格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误
                  版本-通过】格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误格式有误
                </p>
                <p class="Replytwotowp">
                  <el-input
                    style="width:100%;margin-top: 10px;visibility: hidden;"
                    size="medium"
                    v-model="Reply"
                    placeholder="请输入内容"
                  ></el-input>
                  <el-button
                    type="text"
                    style="visibility: hidden;"
                    @click="Clickreply($event,false,1)"
                  >取消回复</el-button>
                  <el-button type="text" @click="Clickreply($event,true,1)">回复</el-button>
                </p>
              </li>
            </ul>
            <p class="secondonelip">查看全部88调回复</p>
          </li>
        </ul>
      </div>
      <p class="selected-total" v-if="ApprovaldocData.length != 1">
        当前已选中：
        <span>{{selectedDocTotal}}个文件</span>
      </p>
      <el-input
        :class="[{'is-active': noRemarkText}]"
        type="textarea"
        style="margin-top: 5px;"
        :rows="3"
        resize="none"
        placeholder="请输入审批意见，最多输入1000字"
        v-model="remarkText"
      ></el-input>
      <div class="checkboxinfo">
        <div>
          <i style="color:red">*</i>
          <span>
            审批结果：
            <span></span>
            <template>
              <el-radio v-model="radio" label="1">待审批</el-radio>
              <el-radio v-model="radio" label="2">通过</el-radio>
              <el-radio v-model="radio" label="2">驳回</el-radio>
            </template>
          </span>
        </div>
        <div style="margin-top: 13px;">
          消息通知:
          <el-checkbox v-model="checked">通过站内信通知发起人查看审批意见</el-checkbox>
        </div>
      </div>
      <div slot="footer" style="margin-top: -26px;" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="saveBtn">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "remark",
  props: ["Approvalreply", "Approvaltitle", "ApprovaldocData"],
  data() {
    return {
      showDialog: true,
      checked: false,
      radio: 1,
      Reply: "",
      indexI: "",
      cheinput: false,
      selectedDocTotal: 0,
      reply: 1,
      remarkText: "", //用户输入的备注内容
      noRemarkText: false, //保存时备注内容是否为空
      tableData: [
        {
          text: "备注内容，这是备注内容",
          versionNum: "版本1",
          time: "2020-02-02 00:00:00"
        }
      ]
    };
  },
  created() {},
  methods: {
    // 第一级回复
    Clickreply(el, state, i) {
      if (el.path[2].innerText.trim() == "回复") {
        if (this.Reply != "") {
          this.$message.error("请先发布");
          return;
        }
      }
      console.log(i);
      console.log(this.indexI);
      console.log(this.reply)
      if (this.indexI != "") {
        if (this.reply >= 2 && this.indexI != i)
          return this.$message.error("请您输入");
      }
      let path;
      if (
        el.path[2].innerText.trim() == "发布" ||
        el.path[2].innerText.trim() == "回复" ||
        el.path[2].innerText.trim() == "取消回复 发布"
      ) {
        path = el.path[2].children;
      } else {
        path = el.path[1].children;
      }
      this.indexI = i;
      this.reply++;
      if (state) {
        path[0].style.visibility = "";
        path[1].style.visibility = "";
        path[2].innerText = "发布";
      } else {
        path[0].style.visibility = "hidden";
        path[1].style.visibility = "hidden";
        path[2].innerText = "回复";
      }
    },
    saveBtn() {
      //保存
      if (this.remarkText == "") {
        this.noRemarkText = true;
        this.$message.warning("请新增备注内容");
        return;
      }
      this.noRemarkText = false;
      this.$emit("colseModule");
    },
    close() {
      //关闭，取消
      this.$emit("colseModule");
    }
  },
  watch: {
    Approvalreply(val) {
      this.showDialog = val;
    }
  }
};
</script>

<style scoped lang="scss">
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
.selected-total {
  padding-top: 30px;
  font-size: 16px;
  font-weight: 400;
}
.docName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding-top: 16px;
  span {
    font-size: 15px;
    font-weight: 500;
  }
}
.sub-Approvaltitle {
  padding: 10px 0;
  font-size: 14px;
}
.remark-list {
  margin-top: 16px;
}
</style>
<style lang="scss"  scope>
.remark {
  .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-textarea.is-active .el-textarea__inner {
    border: 1px solid #0061a9;
  }
  .el-table th > .cell {
    font-size: 14px;
    font-weight: 400;
  }
  .el-table td {
    border-bottom: 1px solid #dedede;
  }
  .el-table th.is-leaf {
    border-bottom: 1px solid #dedede;
  }
  .el-table__body-wrapper.is-scrolling-none {
    width: calc(100% - 6px);
  }
}
.Reply {
  height: calc(100vh - 500px);
  overflow: auto;
  padding: 25px;
  li {
    width: 100%;
  }
}
.Replyone {
  height: 17px;
  padding-bottom: 7px;
  span {
    display: inline-block;
    overflow: hidden;
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .Replyonetwo {
    text-align: left;
  }
  .Replyonethree {
    text-align: right;
    width: 69%;
  }
}
.Replytwo {
  text-align: left;
}
.Replytwop {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //需要控制的文本行数
  overflow: hidden;
  text-align: left;
  letter-spacing: 0.3px;
}
.Replytwotowp {
  width: 100%;
  text-align: right;
  margin-top: -3px;
}
.second {
  width: 94%;
  margin: 0 auto;
}
.secondoneli {
  text-align: left;
  padding-bottom: 7px;
}
.secondonetime {
  display: inline-block;
  text-align: right;
  width: 82%;
}
.secondonelip {
  text-align: left;
  margin-left: 25px;
  margin-top: 3x;
  color: #909399;
  padding-bottom: 7px;
}
.checkboxinfo {
  text-align: left;
  margin-top: 13px;
}
</style>


