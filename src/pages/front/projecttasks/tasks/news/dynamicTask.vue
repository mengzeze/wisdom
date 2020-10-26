<template>
  <div>
    <div class="dynamicTask">
      <h4 id="sdy">所有动态 </h4>
      <div class="infinite-list-wrapper">
        <ul
          id="observer2"
          style="height:400px;width: 492px;margin-top: 7px;overflow: auto;"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <!-- <el-scrollbar style="height:100%"> -->
          <div ref="reference" id="observers_list2">
            <li
              class="clearfix"
              v-for="(item,index) in obj"
              style="margin-top: 16px;position: relative;"
              :key="item.id"
            >
              <span class="fl" ref="fl" @mouseleave="levesuspension(item,$event,index)">
                <div
                  ref="heightSel"
                  style="float: left;width: 312px; margin-top: -3px;word-break: break-all;"
                >
                  <!-- 0 文件 1 调查工具  2 任务  -->
                  <span
                    :title="suspensionTitle"
                    class="clearFixspan"
                    @mouseover="suspension(item,$event,0)"
                    v-if="item.operatedType == 0"
                  >
                    <!-- <i class="fa fa-paperclip"></i> -->
                    <img style="width: 13px" class src="../../../../../assets/image/@2x.png" alt />
                    <span class="spans" style="color:#999999" v-html="item.operationDetail"></span>
                  </span>
                  <span
                    :title="suspensionTitle"
                    class="clearFixspan"
                    @mouseover="suspension(item,$event)"
                    v-else-if="item.operatedType == 1"
                  >
                    <!-- <i class="fa fa-wrench"></i> -->
                    <img style="width: 13px" src="../../../../../assets/image/gongju@2x.png" alt />
                    <span class="spans" style="color:#999999" v-html="item.operationDetail"></span>
                  </span>
                  <span
                    :title="suspensionTitle"
                    class="clearFixspan"
                    @mouseover="suspension(item,$event)"
                    v-else-if="item.operatedType == 2"
                  >
                    <!-- <i class="fa fa-user-o" style="font-size: 9px;"></i> -->
                    <img style="width: 13px" src="../../../../../assets/image/geren-4@2x.png" alt />
                    <span class="spans" style="color:#999999；" v-html="item.operationDetail"></span>
                  </span>
                  <span
                    :title="suspensionTitle"
                    @mouseover="suspension(item,$event,index)"
                    class="clearFixspan"
                    v-else-if="item.operatedType == 9"
                  >
                    <img style="width: 13px" src="../../../../../assets/image/geren-4@2x.png" alt />
                    <span class="spans laner" style="color:#999999;" v-html="item.operationDetail"></span>
                    <!-- <img
                      @click="pointer_sc(item)"
                      @mouseover="suspensions(item,$event,index)"
                      style="width: 9px;margin-top: 7px;visibility: hidden;position: absolute;bottom: 0px;cursor:pointer"
                      src="../../../../assets/image/gx.png"
                    /> -->
                  </span>
                  <span
                    class="clearFixspan"
                    :title="suspensionTitle"
                    @mouseover="suspension(item,$event)"
                    v-else
                  >
                    <img style="width: 13px" src="../../../../../assets/image/renwu-4@2x.png" alt />
                    <span class="spans" style="color:#999999" v-html="item.operationDetail"></span>
                  </span>
                </div>
                <div
                  v-if="item.operatedType == 9"
                  style="float:left;text-align: center;margin-top: -2px;"
                >
                  <span style="color:#999999">{{item.createTime}}</span>
                  <br />
                  <span @click="pointer_sc(item)" class="color-primary" style="cursor: pointer;">
                    <!-- 删除 -->
                    <!-- <img style="width: 9px" src="../../../../assets/image/gx.png" alt /> -->
                  </span>
                </div>
                <div v-else style="float:left;text-align: center;margin-top: -2px;">
                  <span style="color:#999999">{{item.createTime}}</span>
                  <br />
                </div>
              </span>
            </li>
            <!-- <div ref="rollback" style="height: 10px;width: 100%;background: red;"></div> -->
            <li v-if="obj == ''" style="text-align: center;color: #ccc;">暂无数据</li>
            <p v-if="loading">加载中...</p>
          </div>
          <!-- </el-scrollbar> -->
        </ul>
      </div>
      <div class="lsits" v-if="Close_personnel">
        <ul>
          <el-scrollbar style="height:100%">
            <li
              @click="personnel(item)"
              :title="item.usName"
              v-for="item in SelectPersonnel"
            >{{item.usName}}</li>
          </el-scrollbar>
        </ul>
      </div>
      <div style="margin-top: 18px;position: relative;" id="inner">
        <div
          :contenteditable="false"
          style="-webkit-user-select: auto"
          @input="inputchanges"
          @keydown="enterEvent"
          @mouseover="compatibility"
          @keyup.ctrl="winHandleKeyup($event)"
          @propertychange="propertychanges"
          @focus="Access_to_personnel"
          ref="inptext"
          v-html="htm"
          class="test"
          @click="positioning"
        >
          <el-scrollbar style="height:100%"></el-scrollbar>
        </div>
        <span
          ref="inputs"
          @click="locations"
          style="position: absolute;top: 8px;left: 10px;color: #ccc;"
        >请输入内容，可@任务成员，Shift+Enter换行，上限400字</span>
      </div>
      <div class="dialog-footer" style="text-align:right;padding-top: 13px;">
        <el-button size="medium" disabled @click="empty()">清空</el-button>
        <el-button size="medium" disabled type="primary" @click="send()">发送</el-button>
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
import { setTimeout } from "timers";
export default {
  name: "dynamic-task",
  props: ["dynamicData", "mbids", "Empty", "name"],
  data() {
    return {
      messages: "",
      obj: [],
      count: 1,
      totals: "",
      state: false,
      loading: false,
      objhtml: "",
      plaintext: "",
      sel: "", //光标
      savedRange: {}, //光标的片段
      textarea: "",
      suspensionTitle: "",
      SelectPersonnel: [],
      Close_personnel: false,
      Spell_array: [],
      on_off: false,
      oldname: [],
      inptextold: "",
      htm: "",
      SelectPer: [],
      alls: "",
      spans: "",
      spanhtm: ""
    };
  },
  watch: {
    mbids(val) {
      this.mbids = val;
      this.Close_personnel = false;
    },
    spanhtm(val) {
      console.log(val);
    },
    Empty(val) {
      if (val.Empty == 1) {
        this.obj = [];
        this.spans = "";
        this.count = 1;
        this.isajax();
        this.$refs.inptext.innerHTML = "";
        this.$refs.inptext.focus();
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
  mounted() {
    this.spanhtm = this.$refs.inptext.innerText;
    document.addEventListener("selectionchange", this.selectHandler);
    window.addEventListener(
      "click",
      () => {
        // console.log(this)
        this.Close_personnel=false
        // var scrollTop = this.$el.querySelector("observer");
        // console.log(scrollTop.scrollHeight)
        // console.log(scrollTop.scrollTop); // 查看打印的值是否有变化 如果有 则说明滚滚动条在这个标签中
        // scrollTop.scrollTop = scrollTop.scrollHeight // 可以尝试下 滚动滚动条。一直在底部则可以设置成功
      },
      true
    );
  },
  updated() {
    // let spanhtm=this.$refs.inptext.innerText
    // console.log(spanhtm)
      this.$nextTick(() => {
        setTimeout(() => {
          var observer = document.getElementById("observer2");
          var observers_list = document.getElementById("observers_list2");
          // console.log(observers_list.lastElementChild.offsetTop);
          // console.log(observer);
          observer.scrollTop = observers_list.lastElementChild.offsetTop;
          // console.log(observer.scrollTop =1000);
        });
      });
      // console.log((parent.scrollTop = child1.lastElementChild.offsetTop));
  },
  methods: {
    locations() {
      this.$refs.inptext.focus();
    },
    selectHandler() {
      // 监听选定文本的变动
      this.sel = window.getSelection();
      let rang = this.sel.rangeCount > 0 ? this.sel.getRangeAt(0) : null; //节点和文本节点的部分的文档的片段。
      this.savedRange = rang;
    },
    winHandleKeyup(e) {
      //windos 是ctrl + v
      if (e.keyCode == 86) {
        if (e.target.innerHTML.length >= 400) {
          this.$refs.inptext.innerHTML = e.target.innerHTML.substr(0, 399);
          this.sel.selectAllChildren(this.$refs.inptext); //取消之前的文本区域 设置新的区域
          this.sel.collapseToEnd(); //把光标定位到文本最后
        }
      }
    },
    suspensions(item, el) {
      //  console.log(el.toElement.getAttribute("title", '1111'))
    },
    suspension(item, el, index) {
      el.toElement.setAttribute("title", el.toElement.innerText);
      var arr = this.$refs.reference.children;
      if (item.operatedType == 9) {
        if (item.createBy == item.createById) {
          for (let i = 0; i < arr.length; i++) {
            if (i == index) {
              arr[
                i
              ].children[0].children[0].children[0].children[2].style.visibility =
                "visible";
              arr[
                i
              ].children[0].children[0].children[0].children[2].setAttribute(
                "title",
                "删除"
              );
            }
          }
        }
      }
    },
    compatibility() {
      var str = this.$refs.inptext;
      if (this.$refs.inptext.innerText == "") {
        this.$refs.inputs.style.display = "block";
      } else {
        this.$refs.inputs.style.display = "none";
      }
    },
    levesuspension(item, el, index) {
      if (el.fromElement.children[0].children[0].children[2] != undefined) {
        el.fromElement.children[0].children[0].children[2].style.visibility =
          "hidden";
      }
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 1;
        this.isajax();
        this.loading = false;
      }, 2000);
    },
    isajax() {
      var datas = {
        data: {
          taskId: this.mbids
        },
        token: this.token,
        userId: this.userId,
        pageNo: this.count,
        pageSize: 10
      };
      var _this = this;
      this.$post("/info/task/getTaskLogInfoByTaskId", datas)
        .then((response)=> {
          var arr = response.data.list;
          for (let j = 0; j < arr.length; j++) {
            arr[j].operationDetail = arr[j].operationDetail.replace(/”/g, '"');
          }
          _this.obj = _this.obj.concat(response.data.list);
          _this.obj.sort(function(a, b) {
            a.createTime.substring(0, 19);
            b.createTime.substring(0, 19);
            return (
              new Date(a.createTime.replace(/-/g, "/")).getTime() -
              new Date(b.createTime.replace(/-/g, "/")).getTime()
            );
          });
          if (_this.obj == "") {
            _this.obj = [];
          }
          _this.obj.map(function(x) {
            x.createById = _this.$store.state.loginObject.userId;
          });
          _this.totals = Math.ceil(response.data.total / 10);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    propertychanges() {
      console.log(this.htm);
    },
    inputchanges() {
      var str = this.$refs.inptext;
      if (this.$refs.inptext.innerText == "") {
        this.$refs.inputs.style.display = "block";
      } else {
        this.$refs.inputs.style.display = "none";
      }
      if (str.innerText.length >= 400) {
        str.innerHTML = str.innerText.substring(0, 399);
        this.$message({
          message: "超出400字输入限制",
          type: "warning"
        });
        return;
      }
      // this.Close_personnel = false;
      this.cursor_positioning();
    },
    positioning() {
      this.cursor_positioning();
    },
    cursor_positioning() {
      // var obj = this.$refs.inptext;
      // if (window.getSelection) {
      //   obj.focus(); //解决ff不获取焦点无法定位问题
      //   // console.log(obj.focus);
      //   var range = window.getSelection(); //创建range
      //   range.selectAllChildren(obj); //range 选择obj下所有子内容
      //   range.collapseToEnd(); //光标移至最后
      // } else if (document.selection) {
      //   var range = document.selection.createRange(); //创建选择对象
      //   //var range = document.body.createTextRange();
      //   range.moveToElementText(obj); //range定位到obj
      //   range.collapse(false); //光标移至最后
      //   range.select();
      // }
    },
    getCursor(that) {},
    enterEvent() {
      var e = window.event || e;
      console.log(e);
      if (e.keyCode == 50 && e.shiftKey) {
        console.log("@");
        this.Close_personnel = true;
        // event.returnValue = false;
        // e.preventDefault();
      } else if (e.code == "Digit2" && e.shiftKey) {
        this.Close_personnel = true;
        // event.returnValue = false;
        // e.preventDefault();
      } else if (e.keyCode == 13 && e.shiftKey == false) {
        console.log("enetr");
        this.send();
      } else if (e.keyCode == 8) {
        console.log("删除");
        if (this.on_off) {
          console.log("删除@");
        } else {
          console.log("我只是评论");
        }
      }
    },
    activelist(item) {
      if (item != undefined) {
        this.mbids = item;
      }
      this.selectPelpeo();
    },
    selectPelpeo() {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data: {
          id: this.mbids
        }
      };
      var _this = this;
      this.$post("/info/task/getTaskUser", data)
        .then((response)=> {
          _this.SelectPer = response.data;
          _this.SelectPersonnel = [
            { usName: "所有人", userId: "11111111111111111111" }
          ].concat(response.data);
          var arr = response.data;
          for (let i = 0; i < arr.length; i++) {
            arr[i].usName = arr[i].name;
            arr[i].userId = arr[i].id;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Access_to_personnel() {
      // this.$refs.inptext.style.display="none"
      // console.log(this.$refs.inptext.innerText);
      // console.log(this.$refs.inputs);
      if (this.$refs.inptext.innerText == "") {
        this.$refs.inputs.style.display = "block";
      } else {
        this.$refs.inputs.style.display = "none";
      }
      this.Close_personnel = false;
      function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          return true;
        } else {
          return false;
        }
      }
      if (isIE()) {
        this.plaintext = "true";
      } else {
        this.plaintext = "plaintext-only";
      }
    },
    empty() {
      this.$refs.inptext.innerHTML = "";
      this.spans = "";
    },
    send() {
      // console.log(this.$refs.inptext.innerText.trim() ==)
      if (this.$refs.inptext.innerText.trim() == "") {
        this.$message({
          type: "error",
          message: "请输入内容"
        });
        return;
      }
      var sendlx =
        '<span class="nameuser" style="color: #333333;font-weight: bold;">' +
        this.$store.getters.userName +
        "</span>";
      if (this.on_off) {
        var temp = document.createElement("div");
        temp.innerHTML = this.$refs.inptext.innerHTML;
        var arr = temp.children;
        var usarr = [];
        if (this.alls) {
          var array = this.SelectPer;
          for (let j = 0; j < array.length; j++) {
            usarr.push(array[j].userId);
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            usarr.push(arr[i].getAttribute("data-id")); // usid
          }
        }
        sendlx = sendlx + "：";
        console.log(usarr);
      } else {
        console.log("我只是评论");
        sendlx =
          '<span  class="nameuser" style="color: #333333;font-weight: bold;">' +
          this.$store.getters.userName +
          "：" +
          "</span>";
      }
      this.send_comments(usarr, sendlx);
    },
    send_comments(usarr, sendlx) {
      if (this.$refs.inptext.innerText.length > 400) {
        this.$message({
          message: "超出400字输入限制",
          type: "error"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          taskId: this.mbids,
          operationDetail:
            sendlx +
            '<span  class="texttite">' +
            this.$refs.inptext.innerHTML +
            "</span>",
          flag: this.on_off,
          taskName: this.name,
          userIds: usarr
        }
      };
      var _this = this;
      this.$post("/info/task/addTaskComment", data)
        .then((response)=> {
          console.log(response);
          if (response.code == 0) {
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.on_off = false;
            _this.alls = false;
            _this.$refs.inptext.innerHTML = "";
            _this.obj = [];
            _this.count = 1;
            _this.isajax();
            _this.spans = "";
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pointer_sc(item) {
      this.$confirm("此操作将永久删除消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            projectId: this.$store.state.projectMsg.pro_id,
            data: {
              id: item.id
            }
          };
          var _this = this;
          this.$post("/info/task/delTaskComment", data)
            .then((response)=> {
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: response.msg
                });
                _this.obj = [];
                _this.count = 1;
                _this.isajax();
              } else {
                _this.$message({
                  type: "error",
                  message: response.msg
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    personnel(item) {
      // if (!this.state) {
      //   this.$refs.inptext.innerHTML = "  ";
      // }
      // this.state = true;
      // console.log(item)
      this.Close_personnel = false;
      var obj = {
        name: item.usName,
        id: item.userId
      };
      if (item.userId == 11111111111111111111) {
        this.alls = true;
      }
      this.on_off = true;
      this.Spell_array.push(obj);
      var arr = this.Spell_array;
      var span = "";
      var htm = this.$refs.inptext.innerHTML;
      for (let i = 0; i < arr.length; i++) {
        span =
          "" +
          '<button class="color-primary" style="border: none;background: white;" disabled  contenteditable="false" data-id="' +
          arr[i].id +
          '" >' +
          "@" +
          arr[i].name +
          "</button>" +
          "&nbsp;";
      }
      this.spans = this.spans + span;
      this.$refs.inptext.innerHTML =
        this.$refs.inptext.innerHTML.slice(
          0,
          this.$refs.inptext.innerHTML.length - 1
        ) + span;
    }
  }
};
</script>
<style lang="" >
.maxboxtop {
  width: 300px !important;
  display: flow-root !important;
  height: 18px !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  word-break: normal !important;
}
.texttite {
  width: 77%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* ! autoprefixer:off  */
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* ! autoprefixer:on  */
  word-break: break-all;
  white-space: pre-line
}
.nameuser {
  color: #333333;
  font-weight: bold;
  display: inline-block;
  max-width: 63px;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  word-break: normal !important;
}
</style>
<style lang="scss" scoped>
.maxname {
  color: black;
}

#inner {
  .el-textarea__inner {
    height: 85px;
  }
}
.clearFixspan {
  i {
    display: inline-block;
  }
  .spans {
    display: inline-flex;
    width: 279px;
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
  height: 600px;
  /* overflow-y: auto; */
  border-bottom: none;
  overflow: hidden;
}
.lsits {
  height: 122px;
  position: absolute;
  width: 89px;
  top: 320px;
  overflow: hidden;
  box-shadow: 0px 1px 5px #ccc;
  left: 3px;
  border-radius: 7px;
  cursor: pointer;
  background: white;
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
  word-wrap:break-word;
}
.test:empty::after {
  content: attr(placeholder);
  padding-left: 9px;
  padding: 6px;
  color: #999999;
}
</style>
