<template>
  <div>
    <div class="associatedContent">
      <p class="addContent" style="width: 460px;margin-top: 3px;">
        <el-button type="text" disabled>
          <i class="el-icon-plus"></i>
          <span>添加关联内容</span>
        </el-button>
      </p>
      <div>
        <ul class="associatedDetail" style="height:91px;width: 458px">
          <el-scrollbar style="height:100%">
            <h3 style="font-weight: bold;padding:3px;">关联的审核</h3>
            <li
              class="clearfix"
              style="    padding-left: 12px;height: 24px;overflow: hidden;
                    margin-top: 3px;"
              v-for="item in taskProcesss"
            >
              <span class="iclas">
                <el-button style="color:#333333" class="cssls" type="text">{{item.name}}</el-button>
              </span>
              <div class="clss" style="margin-top: -7px;">
                <span style="  clear: both;" v-if="item.relyOn == 1">
                  <el-button type="text">配置(已依赖)</el-button>
                </span>
                <span style="  clear: both;" v-if="item.relyOn == 0">
                  <el-button type="text">配置(未依赖)</el-button>
                </span>
                <span>
                  <el-button style="clear: both;padding-right: 11px;padding-right: 10px;" type="text">取消关联</el-button>
                </span>
              </div>
            </li>
          </el-scrollbar>
        </ul>
        <ul class="associatedDetail" style="height:91px;width: 458px">
          <el-scrollbar style="height:100%">
            <h3 style="font-weight: bold;padding:3px;">关联的会议</h3>
            <li
              class="clearfix"
              style="    padding-left: 12px;height: 24px;overflow: hidden;
                    margin-top: 3px;"
              v-for="item in taskMeetings"
            >
              <!-- <router-link to="/projecmeeting"><span class="fl" >{{item.name}}</span></router-link> -->
              <span class="iclas">
                <el-button style="color:#333333" class="cssls" type="text">{{item.name}}</el-button>
              </span>
              <div class="clss" style="margin-top: -7px;padding-right: 10px;">
                <span>
                  <el-button
                    style="clear: both;padding-right: 11px;"
                    type="text"
                  >取消关联</el-button>
                </span>
              </div>
            </li>
          </el-scrollbar>
        </ul>
        <ul class="associatedDetail" style="height:91px;width: 458px">
          <el-scrollbar style="height:100%">
            <h3 style="font-weight: bold;padding:3px;">关联的文件</h3>
            <li
              class="clearfix"
              style="    padding-left: 12px;height: 24px;overflow: hidden;
                    margin-top: 3px;"
              v-for="item in taskProjectFiles"
            >
              <span @click="yulan(item)" class="iclas">
                <el-button style="color:#333333" class="cssls" type="text">{{item.name}}</el-button>
              </span>
              <div class="clss" style="margin-top: -7px;">
                <span>
                  <el-button style="clear: both;" type="text">取消关联</el-button>
                </span>
                <span style="padding-right: 10px;">
                  <el-button
                    style="clear: both;padding-right: 11px;"
                    type="text"
                  >下载</el-button>
                </span>
              </div>
            </li>
          </el-scrollbar>
        </ul>
        <ul class="associatedDetail" style="height:91px;width: 458px">
          <el-scrollbar style="height:100%">
            <h3 style="font-weight: bold;padding:3px;">关联的底稿</h3>
            <li
              class="clearfix"
              style="padding-left: 12px;height: 24px;overflow: hidden;
                    margin-top: 3px;"
              v-for="item in taskPaperFiles"
            >
              <span class="iclas"  @click="digao(item)">
                <el-button style="color:#333333" class="cssls" type="text">{{item.name}}</el-button>
              </span>
              <div class="clss" style="margin-top: -7px;">
                <span>
                  <el-button style="clear: both;" type="text">取消关联</el-button>
                </span>
                <sapn style="padding-right: 10px;">
                  <el-button
                    style="clear: both;padding-right: 11px;"
                    type="text"
                  >下载</el-button>
                </sapn>
              </div>
            </li>
          </el-scrollbar>
        </ul>
          <ul class="associatedDetail" style="height:91px;width: 458px">
          <el-scrollbar style="height:100%">
            <h3 style="font-weight: bold;padding: 3px;">关联的任务</h3>
            <li
              class="clearfix"
              style="padding-left: 12px;height: 24px;overflow: hidden;
                    margin-top: 3px;"
              v-for="item in taskVo"
            >
              <span  class="iclas">
                <el-button
                  style="color:#333333;width: 287px;"
                  class="cssls"
                  type="text"
                >{{item.name}}</el-button>
                <el-button
                  style="color:#333333;width: 62px;"
                  class="cssls"
                  type="text"
                >{{item.implementStageName}}</el-button>
              </span>
              <div class="clss" style="margin-top: -7px;">
                <span>
                  <el-button
                    style="clear: both;padding-right: 9px;"
                    type="text"
                  >取消关联</el-button>
                </span>
              </div>
            </li>
          </el-scrollbar>
        </ul>
      </div>
    </div>
    <el-dialog
      title="关联内容"
      :visible.sync="addcont"
      :close-on-click-modal="false"
      width="50%"
      @close="closes"
      :append-to-body="true"
    >
      <span>
        <!-- <div style="margin-top: 15px;width:320px;margin-bottom:16px;">
                    <el-input placeholder="请输入内容" size="mini" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
        </div>-->
        <div class="contentTab">
          <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: auto;">
            <el-tab-pane label="文件">
              <div class="fileTask">
                <div class="spans">
                  <el-tree
                    :props="props"
                    :load="loadNode1"
                    lazy
                    node-key="id"
                    ref="tree"
                    @check="tree1s"
                    show-checkbox
                  ></el-tree>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="底稿">
              <div class="fileTask">
                <div class="spans">
                  <el-tree
                    :props="props"
                    :load="loadNode2"
                    lazy
                    ref="trees"
                    node-key="id"
                    @check="tree2s"
                    show-checkbox
                  ></el-tree>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="会议">
              <div class="fileTask">
                <div class="spans">
                  <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    style="display:-webkit-box"
                  >全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <div>
                    <div>
                      <span class="taskNames">会议</span>
                      <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange($event)"
                      >
                        <el-checkbox
                          v-for="item in lists"
                          v-model="item.id"
                          :label="item.id"
                          :key="item.id"
                          style="width:90%;text-align:left;"
                        >
                          <span class="huyiclass">{{item.name}}</span>
                          <span style="margin-left:10px;">{{item.endTime}}</span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="审核">
              <div class="fileTask">
                <div class="spans">
                  <el-checkbox
                    :indeterminate="isIndeterminate2"
                    v-model="checkAll2"
                    @change="handleCheckAllChange2"
                    style="display:-webkit-box"
                  >全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <div>
                    <div>
                      <span class="taskNames">审核</span>
                      <el-checkbox-group
                        v-model="checkedCities2"
                        @change="handleCheckedCitiesChange2"
                      >
                        <el-checkbox
                          v-for="item in lists2"
                          :label="item.id"
                          :key="item.id"
                          style="width:90%;text-align:left;"
                        >
                          <span class="huyiclass">{{item.procName}}</span>
                          <span style="margin-left:10px;">{{item.createDate}}</span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcontqx">取 消</el-button>
        <el-button type="primary" @click="addconts">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { type } from "os";
import { types } from "util";
import { setTimeout } from "timers";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "associated-content",
  props: ["", "associatData", "mbids"],
  data() {
    return {
      token: "String",
      userId: "0",
      lists: "",
      huiarr: [],
      typeId: "",
      huiarr2: [],
      dataId1: [],
      dataId3: [],
      dataId4: [],
      arrayobj: [],
      dataId5: [],
      taskMeetings: [],
      taskPaperFiles: [],
      taskProcesss: [],
      nodeid: "",
      nodeid2: "",
      tree1Id: [],
      tree2Id: [],
      arrs: [],
      taskVo:[],
      lists2: [],
      array: [],
      taskProjectFiles: [],
      tree1: [],
      nodeid: "",
      addcont: false,
      tabPosition: "left",
      tabPos: "left",
      checkAll: true,
      checkAll2: true,
      dataId: "",
      type: 2,
      checkedCities: [],
      checkedCities2: [],
      cities: cityOptions,
      isIndeterminate: false,
      isIndeterminate2: false,
      data2: [],
      defaultProps: {
        children: "children",
        label: "docName"
      },
      props: {
        label: "docName",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  mounted() {},
  watch: {
    mbids(val) {
      this.mbids = val;
      // isLockProjectMeeting

      // this.ajax()
    }
  },
  methods: {
    huiyipd(item) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.meetingId
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/info/project/isLockProjectMeeting", data)
        .then((response)=> {
          if (response.data == false) {
            _this.$message({
              type: "info",
              message: "无权限此会议"
            });
            return;
          } else {
            _this.$router.push({
              path: "/projecmeeting",
              query: {
                rfsId: item.docVersionRfs
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     yulan(item){
            console.log(item)
            // this.$router.push({
            //     path: '/preview',
            //     query: {
            //         docId:item.docId,
            //         rfsId: item.docVersionRfs
            //     }
            // })
            var previewData = {
              projectId: this.$store.state.projectMsg.pro_id,
                 docId:item.docId,
                rfsId: item.docVersionRfs,
                photoType: item.docType
            };
            this.$store.commit("previewAllFn", previewData);
        },
    sheh(item) {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: "0",
        pageSize: "10",
        data: {
          id: item.processId
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/info/audit/judge_approval_userId", data)
        .then((response)=> {
          if (response.data == false) {
            _this.$message({
              type: "info",
              message: "无权限此审核"
            });
            return;
          } else {
            _this.$router.push({
              path: "/myapproval",
              query: {
                rfsId: item.docVersionRfs
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updown(item) {
      console.log(item);
      this.$store.commit("download", [
        {
          id: item.docId,
          name: item.name
        }
      ]);
    },
    digao(item){
            // this.$router.push({
            //     path: '/preview',
            //     query: {
            //           docId:item.docId,
            //         rfsId: item.docVersionRfs
            //     }
            // })
             var previewData = {
               projectId: this.$store.state.projectMsg.pro_id,
                docId:item.docId,
                rfsId: item.docVersionRfs,
                photoType: item.docType
            };
            this.$store.commit("previewAllFn", previewData);
        },
    updowns(item) {
      console.log(item);
      this.$store.commit("download", [
        {
          id: item.docId,
          name: item.name
        }
      ]);
    },
    handleClick(tab, event) {
      var data, type;
      if (tab.index == 0) {
        // data=this.tree1Id
        type = 2;
        // this.dataId=[]
        this.dataId = [];
      } else if (tab.index == 1) {
        // data=this.tree2Id
        this.dataId = [];
        type = 3;
      } else if (tab.index == 2) {
        this.dataId = [];
        // data=this.huiarr
        type = 0;
        this.huiarr = [];
        this.huiyi();
      } else if (tab.index == 3) {
        // data=this.huiarr2
        this.dataId = [];
        this.huiarr2 = [];
        this.shenh();
        // 审核
        type = 4;
      }
      // this.dataId=data
      this.type = type;
    },
    jiequ2(arr, arrs) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arrs.length; j++) {
          if (arr[i] == arrs[j].meetingId) {
            arr.splice(i, 1);
          }
        }
      }

      // console.log(arr)
      return arr;
    },
    jiequ3(arr, arrs) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arrs.length; j++) {
          // console.log(arr[i].id)
          // console.log(arrs[j].processId)
          if (arr[i] == arrs[j].processId) {
            arr.splice(j, 1);
          }
        }
      }
      return arr;
    },
    // jiequ1(arr,arrs){
    //     for (let i = 0; i < arr.length; i++) {
    //         for (let j = 0; j < arrs.length; j++) {
    //             if(arr[i].id == arrs[j].projectFileId){
    //                 arr.splice(j,1)
    //             }
    //         }
    //     }
    //     return arr
    // },
    jiequ4(arr, arrs) {
      console.log(arr);
      console.log(arrs);
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arrs.length; j++) {
          if (arr[i].id == arrs[j].paperId) {
            arr.splice(i, 1);
            // console.log(arr[i].id)
            // console.log(arrs[j].paperId)
          }
        }
      }
      // console.log(arr)
      return arr;
    },
    addconts() {
      //   _this.taskMeetings  //会议
      //   _this.taskPaperFiles // 底稿
      //   _this.taskProcesss //审核
      //   _this.taskProjectFiles //文件
      if (this.typeId == 1) {
        //   this.dataId=this.jiequ1(this.dataId1,this.taskProjectFiles)
        // console.log(this.dataId1)
        //  for (let i = 0; i < this.dataId1.length; i++) {
        //       console.log(this.dataId1[i]+"====")
        //  }
        // console.log(this.taskProjectFiles)
        var arr = this.dataId1,
          arrs = this.taskProjectFiles;
        for (let j = 0; j < arrs.length; j++) {
          if (arrs != "") {
            for (let i = 0; i < this.dataId1.length; i++) {
              // console.log(this.dataId1[i])
              // console.log(arrs[j].projectFileId)
              if (this.dataId1[i].id == arrs[j].projectFileId) {
                this.dataId1.splice(i, 1);
                // console.log(arr[i])
              }
            }
          }
        }
        console.log(this.dataId1);
        this.dataId = this.dataId1;
      } else if (this.typeId == 3) {
        //会议
        //   this.dataId=this.jiequ2(this.dataId3,this.taskMeetings)
        var isarr = this.lists;
        var ids = this.jiequ2(this.dataId3, this.taskMeetings);
        var newarr = [];
        for (let i = 0; i < isarr.length; i++) {
          for (let j = 0; j < ids.length; j++) {
            if (ids[j] == isarr[i].id) {
              newarr.push(isarr[i]);
            }
          }
        }
        this.dataId = newarr;
      } else if (this.typeId == 4) {
        //this.dataId4 id 已选择的数据
        //this.taskProcesss  总数据
        //审核
        //   this.dataId=this.jiequ3(this.dataId4,this.taskProcesss)
        var isarr = this.lists2;
        var ids = this.jiequ3(this.dataId4, this.taskProcesss);
        var newarr = [];
        for (let i = 0; i < isarr.length; i++) {
          for (let j = 0; j < ids.length; j++) {
            if (ids[j] == isarr[i].id) {
              newarr.push(isarr[i]);
            }
          }
        }
        this.dataId = newarr;
      } else if (this.typeId == 2) {
        //   this.dataId=this.jiequ4(this.dataId5,this.taskPaperFiles)
        var arr = this.dataId5,
          arrs = this.taskPaperFiles;
        for (let j = 0; j < arrs.length; j++) {
          if (arrs != "") {
            for (let i = 0; i < this.dataId5.length; i++) {
              if (this.dataId5[i].id == arrs[j].paperId) {
                this.dataId5.splice(i, 1);
              }
            }
          }
        }
        // console.log(this.dataId5)
        this.dataId = this.dataId5;
      }
      console.log(this.dataId);
      var arr = this.dataId,
        obj,
        arrs = [],
        url;
      if (this.type == 0) {
        for (let i = 0; i < arr.length; i++) {
          obj = {
            taskId: this.mbids,
            relevanceId: arr[i].id,
            name: arr[i].name,
            type: this.type
          };
          arrs.push(obj);
        }
        url = "/info/task/saveTaskRelevance";
      } else if (this.type == 4) {
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          //   console.log(arr[i].procName)
          obj = {
            taskId: this.mbids,
            processId: arr[i].id,
            name: arr[i].procName,
            type: this.type
          };
          arrs.push(obj);
        }
        url = "/info/task/saveTaskProcess";
      } else {
        for (let i = 0; i < arr.length; i++) {
          obj = {
            taskId: this.mbids,
            relevanceId: arr[i].id,
            name: arr[i].docName,
            type: this.type
          };
          arrs.push(obj);
        }
        url = "/info/task/saveTaskRelevance";
      }
      //   return;
      //  console.log(arrs)
      if (arrs == "") {
        this.addcont = false;
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: arrs
      };
      var _this = this;
      this.$post(url, data)
        .then((response)=> {
          if (response.code == 0) {
            _this.addcont = false;
            _this.$message({
              type: "success",
              message: response.msg
            });
            _this.ajax();
            _this.dataId = [];
            _this.huiarr = [];
            _this.huiarr2 = [];
            _this.huiyi();
            _this.shenh();
          } else {
            _this.$message({
              type: "info",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tree1s(Node, val) {
      //文件
      // console.log(val.checkedNodes)
      // var old=this.taskProjectFiles
      // var news=val.checkedNodes
      // this.jiequ2(old)
      console.log(val);
      this.dataId1 = val.checkedNodes;
      this.typeId = 1;
      console.log(this.dataId1);
    },
    tree2s(Node, val) {
      //底稿
      // this.tree2Id.push(Node)
      // console.log(val.checkedNodes)
      // this.dataId5=val.checkedNodes
      this.dataId5 = val.checkedNodes;
      this.typeId = 2;
    },
    // 会议请求
    huiyi() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          //   "projectId":this.$store.state.projectMsg.pro_id
          projectId: this.$store.state.projectMsg.pro_id
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/info/project/getRelevanceMeeting", data)
        .then((response)=> {
          console.log(response);
          _this.lists = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //审核请求
    shenh() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      console.log(data);
      var _this = this;
      this.$post("/info/audit/select_list_project_user", data)
        .then((response)=> {
          console.log(response);
          _this.lists2 = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //文件请求
    loadNode1(node, resolve) {
      if (node.data != undefined) {
        console.log(node.data.id);
        this.nodeid = node.data.id;
      }
      // if (node.level > 1) return resolve([]);
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 1000,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          parentId: this.nodeid
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/doc/project/query", data)
        .then((response)=> {
          resolve(response.data.content);
          setTimeout(() => {
            _this.$refs.tree.setCheckedNodes(_this.array);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //底稿请求
    loadNode2(node, resolve) {
      if (node.data != undefined) {
        console.log(node.data.id);
        this.nodeid2 = node.data.id;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 1000,
        data: {
          projectId: this.$store.state.projectMsg.pro_id,
          parentId: this.nodeid2
        }
      };
      console.log(data);
      var _this = this;
      this.$post("/doc/paper/query ", data)
        .then((response)=> {
          resolve(response.data.content);
          setTimeout(() => {
            _this.$refs.trees.setCheckedNodes(_this.arrayobj);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    audit() {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 1000,
        data: {}
      };
      console.log(data);
      var _this = this;
      this.$post("/info/project/getRelevanceMeeting", data)
        .then((response)=> {
          _this.tree1 = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelAssocsh1(item) {
      this.$confirm(
        "当前任[" + item.name + "], 是否取消依赖审核结果?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //审核
          var data = {
            id: item.id,
            name: item.name,
            relyOn: 0
          };
          this.relyOn(data);
        })
        .catch(() => {});
    },
    cancelAssocsh2(item) {
      this.$confirm("当前任[" + item.name + "], 是否依赖审核结果?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //审核
          var data = {
            id: item.id,
            name: item.name,
            relyOn: 1
          };
          this.relyOn(data);
        })
        .catch(() => {});
    },
    relyOn(data) {
      var data = {
        token: this.token,
        userId: this.userId,
        data: data
      };
      console.log(data);
      var _this = this;
      this.$post("/info/task/updateTaskProcess", data)
        .then((response)=> {
          _this.$message({
            type: "success",
            message: response.msg
          });
          _this.ajax();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelAssoc1(item) {
      this.$confirm("取消关联" + item.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //审核
          var url = "/info/task/delTaskProcess";
          this.cancelAssoc(item, type, url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关联"
          });
        });
    },
    cancelAssoc2(item) {
      this.$confirm("取消关联" + item.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var type = 0; //会议
          var url = "/info/task/delTaskRelevance";
          this.cancelAssoc(item, type, url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关联"
          });
        });
    },
    cancelAssoc3(item) {
      this.$confirm("取消关联" + item.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var type = 2; // 文件
          var url = "/info/task/delTaskRelevance";
          this.cancelAssoc(item, type, url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关联"
          });
        });
    },
    cancelAssoc4(item) {
      this.$confirm("取消关联" + item.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var type = 3; // 底稿
          var url = "/info/task/delTaskRelevance";
          this.cancelAssoc(item, type, url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关联"
          });
        });
    },
    cancelAssoc(item, type, url) {
      console.log(item);
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id,
          processId: item.processId,
          name: item.name,
          taskId: this.mbids,
          type: type
        }
      };
      var _this = this;
      this.$post(url, data)
        .then((response)=> {
          _this.ajax();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ajax(id) {
      if (id != undefined) {
        this.mbids = id;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          taskId: this.mbids
        },
        pageNo: 0,
        pageSize: 10
      };
      console.log(data);
      var _this = this;
      this.$post("/info/task/getTaskContentByTaskid", data)
        .then((response)=> {
           if (response.data.taskVo != null) {
            _this.taskVo = [response.data.taskVo];
          } else {
            _this.taskVo = [];
          }
          _this.taskMeetings = response.data.taskMeetings; //会议
          // _this.checkedCities=response.data.taskMeetings
          var arr = response.data.taskMeetings;
          _this.checkedCities = [];
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].meetingId);
            _this.checkedCities.push(arr[i].meetingId);
          }
          _this.taskPaperFiles = response.data.taskPaperFiles; // 底稿
          var objs,
            arrays = response.data.taskPaperFiles;
          for (let i = 0; i < arrays.length; i++) {
            _this.arrayobj.push({
              id: arrays[i].paperId
            });
          }

          _this.taskProcesss = response.data.taskProcesss; //审核
          var arrs = response.data.taskProcesss;
          _this.checkedCities2 = [];
          for (let i = 0; i < arrs.length; i++) {
            _this.checkedCities2.push(arrs[i].processId);
          }
          _this.taskProjectFiles = response.data.taskProjectFiles; //文件
          var array = response.data.taskProjectFiles;
          var obj;
          for (let i = 0; i < array.length; i++) {
            _this.array.push({
              id: array[i].projectFileId
            });
          }
          console.log(_this.array);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCheckAllChange(val) {
      // this.checkedCities = val ? this.lists : [];
      // console.log(val)
      var arr = this.lists;
      if (val == true) {
        for (let i = 0; i < arr.length; i++) {
          this.huiarr.push(arr[i].id);
          this.checkedCities.push(arr[i].id);
        }
        this.isIndeterminate = false;
      } else {
        this.checkedCities = [];
        this.huiarr = [];
        this.isIndeterminate = true;
      }
      this.dataId3 = this.huiarr;
      this.typeId = 3;
      console.log(this.dataId3);
      // console.log(this.checkedCities)
    },
    handleCheckedCitiesChange(val, el) {
      console.log(val);
      this.checkedCities = Array.from(new Set(val));
      var arr = val;
      var huiarr = [];
      for (let i = 0; i < arr.length; i++) {
        huiarr.push(arr[i]);
      }
      this.huiarr = huiarr;
      this.dataId3 = this.huiarr;
      this.typeId = 3;
      //   console.log(this.dataId3)
      // console.log(this.huiarr)
    },

    //审核
    handleCheckAllChange2(val) {
      var arr = this.lists2;
      console.log(val);
      if (val == true) {
        for (let i = 0; i < arr.length; i++) {
          this.huiarr2.push(arr[i].id);
          this.checkedCities2.push(arr[i].id);
        }
        this.isIndeterminate2 = false;
      } else {
        this.huiarr2 = [];
        this.checkedCities2 = [];
        this.isIndeterminate2 = true;
      }
      this.dataId4 = this.huiarr2;
      console.log(this.dataId4);
      this.typeId = 4;
    },
    handleCheckedCitiesChange2(val, value) {
      var arr = val;
      var huiarr = [];
      //    console.log(this.checkedCities2)
      //    this.checkedCities2=[]

      for (let i = 0; i < arr.length; i++) {
        huiarr.push(arr[i]);
      }
      this.huiarr2 = huiarr;
      this.dataId4 = this.huiarr2;
      this.typeId = 4;
    },
    associalist() {
      console.log(this.associatData);
    },
    addcontlx() {
      this.addcont = true;
      this.ajax();
    },
    addcontqx() {
      this.addcont = false;
      this.ajax();
    },
    closes() {
      this.addcont = false;
      this.ajax();
      this.loadNode1();
      this.loadNode2();
    }
  }
};
</script>

<style lang="scss" scoped>
.clss {
  float: right;
}
.iclas {
  float: left;
}
.cssls {
  display: inline-block;
  width: 300px;
  height: 6px;
  line-height: 1px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

/* 右边的样式 */
.rightShelter {
  margin-left: 20px;
}
.rightShelter .attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 30px;
}

.rightShelter .attentionMatters .addMatt,
.rightShelter .relatedFile .addRelate,
.rightShelter .surveyTool .addHref,
.rightShelter .associatedContent .addContent {
  border: 1px solid #d9d9d9;
  width: 460px;
  height: 32px;
  border-radius: 3px;
  text-align: center;
  line-height: 32px;
}
.rightShelter .attentionMatters .addMatt i,
.rightShelter .attentionMatters .addMatt span,
.rightShelter .relatedFile .addRelate i,
.rightShelter .relatedFile .addRelate span,
.rightShelter .surveyTool .addHref i,
.rightShelter .surveyTool .addHref span,
.rightShelter .associatedContent .addContent i,
.rightShelter .associatedContent .addContent span {
  position: relative;
  top: -2px;
}
.rightShelter .attentionMatters .mattersDetail,
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  margin-top: 20px;
}
.rightShelter .attentionMatters .mattersDetail li {
  border-radius: 3px;
  width: 460px;
  line-height: 20px;
  border: 1px solid #d9d9d9;
  height: auto;
  text-align: left !important;
  padding-bottom: 10px;
}

/* 相关文件和调查工具和关联内容的一部分样式 */
.rightShelter .relatedFile .relateDetail,
.rightShelter .surveyTool .surveyDetail,
.rightShelter .associatedContent .associatedDetail {
  border: 1px solid #d9d9d9;
}
.rightShelter .relatedFile .relateDetail h3,
.rightShelter .surveyTool .surveyDetail h3,
.rightShelter .associatedContent .associatedDetail h3 {
  color: #333;
  font-size: 14px;
  text-align: left !important;
}
.rightShelter .relatedFile .relateDetail .relateLi,
.rightShelter .surveyTool .surveyDetail .surveyLi,
.rightShelter .associatedContent .associatedDetail .associatedLi {
  margin-top: 3px;
  margin-left: 15px;
  margin-bottom: -19px;
}
.rightShelter .surveyTool .surveyDetail .surveyLi {
  text-align: left;
}
.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(1) {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rightShelter .surveyTool .surveyDetail .surveyLi span:nth-child(2) {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: lef;
}
.rightShelter .relatedFile .relateDetail .relateLi em,
.rightShelter .surveyTool .surveyDetail .surveyLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 关联内容 */
.rightShelter .associatedContent .associatedDetail .associatedLi em {
  margin-right: 10px;
  color: #0061a9;
}

/* 任务动态 */
.rightShelter .dynamicTask {
  height: 560px;
  overflow-y: auto;
  border-bottom: 1px solid #d9d9d9;
}
.rightShelter .dynamicTask h4 {
  color: #333333;
  font-size: 14px;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask h5 {
  color: #999999;
  text-align: left !important;
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li {
  margin-bottom: 15px;
}
.rightShelter .dynamicTask .dynamicUl li p {
  margin-bottom: 10px;
}
.rightShelter .dynamicTask .dynamicUl li p span,
.rightShelter .dynamicTask .dynamicUl li p em {
  color: #999;
}
.rightShelter .dynamicTask .dynamicUl li p span .downFiles {
  color: #0061a9 !important;
  margin-left: 5px;
}

/* 底下发布 */
.dialogOthers {
}
.dialogOthers textarea {
  width: 98%;
  height: 100px;
  border: 0px;
  padding-top: 10px;
}
.dialogOthers .release {
}
.dialogOthers .release img {
  width: 24px;
  height: 24px;
}
.dialogOthers .release span {
  color: #0061a9;
}

/* 关联内容弹框中的样式 */
/* .el-checkbox:last-child{
    margin-right: 30px!important;
} */

.contentTab .taskNames {
  text-align: left;
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 5px;
}
.contentTab .el-checkbox__label img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.spans {
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
}
.attentionMatters,
.rightShelter .relatedFile,
.rightShelter .surveyTool,
.rightShelter .associatedContent {
  margin-top: 3px;
}
.huyiclass{
    float: left;
    width: 71%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
