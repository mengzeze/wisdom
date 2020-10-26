<template>
  <div id="contenti" class="contenti myContenti">
    <div class="contenti_header" style="height:96px;">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>审批类型配置</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 style="width: 132px;font-weight: 600;">审批类型配置</h3>
    </div>
    <div
      class="contenti_content clearfix"
      style="overflow: hidden;height: 872px;"
    >
      <div class="contenti_left_tree">
        <el-tree
          ref="tress"
          :data="tree"
          :props="defaultProps"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
          node-key="id"
          :render-content="renderContent"
        ></el-tree>
      </div>
      <div class="contenti_right">
        <div class="contenti_rights">
          <div
            class="contenti_rightboxs"
            style="height: 863px;clear: both;margin-top: -12px;"
          >
            <!-- <div class="contenti_righttitle">{{treename3}}&nbsp;&nbsp;</div> -->
            <div class="contenti_rightboxss clearfix">
              <div style="margin-top:40px;" class="fl">
                <i style="color: red;" class="el-icon-location"></i>
                &nbsp;{{ labelName }}
              </div>
              <!-- <p style="clear: both;"></p> -->
              <h4
                class="contenti_rightsh fr"
                v-show="compiletz"
                style="margin-top:20px;"
              >
                <div class="fr" v-show="tjlx" style="margin-left:15px;">
                  <div v-if="$utils.checkSystemPermission('process_type_add')">
                    <el-button
                      type="primary"
                      @click="addsection"
                      :disabled="disabled"
                      style="font-size: 14px;margin-right: 5px;"
                      class="framework_rightlsitspadd"
                    >
                      <span>+</span>&nbsp;添加
                    </el-button>
                  </div>
                </div>
                <div v-if="seen13" class="fr">
                  <el-button
                    @click="compiles"
                    type="primary"
                    :disabled="disabled"
                    class="el-icon-edit"
                    v-if="$utils.checkSystemPermission('process_type_edit')"
                    >编辑</el-button
                  >
                </div>
                <div
                  class="framework_rightbj fr"
                  style=""
                  v-show="compile"
                  v-on:keyup.enter="compilebc"
                >
                  <input
                    type="text"
                    maxlength="50"
                    v-model="designations"
                    name
                    id
                  />
                  <div class="framework_rightbjbtn1">
                    <i
                      @click="compileqx"
                      class="el-icon-error icon_btn"
                      title="取消"
                    ></i>
                    <i
                      @click="compilebc"
                      class="el-icon-success icon_btn"
                      title="保存"
                    >
                    </i>
                  </div>
                </div>
              </h4>
            </div>
            <!-- <div class="clearfix">
               <div class="contenti_rightboxss2 fl">业务类型</div>
            </div> -->
            <div class="table1" style="margin-top: 30px;margin-left: 0px;">
              <el-table
                :data="tableData"
                :header-cell-style="{
                  background: '#FAFAFA',
                  color: 'black',
                  fontWeight: 'bold'
                }"
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  property="procTypeName"
                  show-overflow-tooltip
                  label="审批类型名称"
                ></el-table-column>
                <el-table-column
                  property="procTypeName"
                  label="操作"
                  align="center"
                  width="230%"
                >
                  <template slot-scope="scope">
                    <ul id="columns" class="btn-gruop">
                      <el-button
                        type="text"
                        v-if="$utils.checkSystemPermission('process_type_edit')"
                        :disabled="disabled"
                        @click="addsections(scope, tableData)"
                        title="编辑"
                        ><i class="icon-operate-btn iconfont bianji2-copy"></i
                      ></el-button>
                      <el-button
                        type="text"
                        v-if="scope.row.isStart == 1"
                        :disabled="disabled"
                        @click="Enabled(scope, tableData)"
                        title="禁用"
                        ><i class="icon-operate-btn iconfont jinyong"></i
                      ></el-button>
                      <el-button
                        type="text"
                        v-else
                        :disabled="disabled"
                        @click="Enabled(scope, tableData)"
                        title="启用"
                        ><i class="icon-operate-btn iconfont qiyong-copy"></i
                      ></el-button>
                      <el-button
                        type="text"
                        v-if="
                          $utils.checkSystemPermission('process_type_remove')
                        "
                        :disabled="disabled"
                        @click="deleType(scope, tableData)"
                        title="删除"
                        ><i class="icon-operate-btn delete iconfont shanchu"></i
                      ></el-button>
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="审批类型"
      :close-on-click-modal="false"
      :visible.sync="prophase"
      @close="closes"
      width="500px"
      class="choseAuditor"
    >
      <span>
        <div
          style="width: 108%;height: 1px;background: rgb(204, 204, 204);margin-top: -21px;margin-bottom: 21px;
                margin-left: -19px;"
        ></div>
        <div class="auditorType clearfix" style="margin-left: 27px;">
          <div
            class="prophaseType fl"
            @keyup.enter="seen3 ? prophases() : prophases4()"
          >
            <p style="width: 390px;">
              <span>类型名称：</span>
              <span>
                <el-input
                  v-model="name"
                  maxlength="50"
                  placeholder="请输入内容"
                  style="width:80%"
                ></el-input>
              </span>
            </p>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="prophase = false">取 消</el-button>
        <el-button size="medium" type="primary" v-if="seen3" @click="prophases"
          >确 定</el-button
        >
        <el-button size="medium" type="primary" v-if="seen4" @click="prophases4"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { constants, fstat } from "fs";
export default {
  components: {},
  data() {
    return {
      Nodeidsss: "",
      seen13: false,
      xmjd: false,
      treename3: "",
      Nodeids: "",
      updatalist: [],
      tjlx: true,
      name: "",
      isStart: "",
      arrisdata: [],
      sts: "",
      isstate: "",
      disabled: false,
      Nodepid: "",
      labelName: "",
      textares: "",
      prophase: false,
      seen1: false,
      flag: false,
      seen3: "",
      seen4: "",
      flags: false,
      tree: "",
      designation: "荣大科技",
      designations: "",
      peodatas: "",
      rowar: [],
      arrdata: [],
      rowarrs: [],
      dat: "",
      text: "投资银行部",
      tableData: [],
      tableDatas: [],
      treeId: "",
      Nodefields: "",
      arrsatet: 1,
      nodejie: "",
      nodejies: "",
      peodata: "",
      clearpeo: "",
      peostate: "",
      peoId: "",
      Nodeid: "",
      sepeo: [],
      sepeoall: [],
      treename: "",
      jdid: "",
      fieldsdata: [],
      treenames: "",
      treestate: "",
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      tree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      compile: false,
      compiletz: true,
      projectTableSelVal: [], // 项目阶段表格选中项
      isEditStatus: false, // 是否为编辑状态
      isAddStatus: false, // 是否为添加状态

      designationsStorage: "",
      currentTreeKey: "", // 选中树key
      currentTreeNode: "", // 选中树node 含叶子节点等
      currentTreeData: "" //  选中树当前data

      //djnodeid:""
    };
  },
  mounted() {
    this.organization();
    // 解决下面表格选择框出现省略号
    this.$nextTick(() => {
      $(".projectTable .header-style .el-table-column--selection .cell").css(
        "text-overflow",
        "clip"
      );
    });
  },
  watch: {},
  methods: {
    // 设置表格最后一行是否显示选择框
    setHideCheckbox(visibilityVal) {
      // visibilityVal: string
      this.$nextTick(() => {
        $(
          ".el-table .el-table__body tbody .el-table__row:last td:first-child .cell"
        ).css("visibility", visibilityVal);
      });
    },

    // 审批类型名称删除
    deleType(val, data) {
      this.$confirm("是否确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/info/service/deleteProcessType", {
            data: {
              typeId: val.row.typeId
            }
          })
            .then(response => {
              if (response.code !== 0) {
                this.$message({
                  type: "warning",
                  message: `${response.msg}`
                });
                return;
              }
              data.splice(val.$index, 1); // 删除表格条目
              this.$refs.tress.remove(val.row.typeId); // 在tree中删除指定id条目
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.xmjd = data.length == 0;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    //修改的弹窗
    addsections(scope) {
      this.prophase = true;
      this.seen3 = false;
      this.seen4 = true;
      this.name = scope.row.procTypeName;
      this.updatalist = scope.row;
      console.log(this.updatalist);
    },
    // 修改的请求
    prophases4() {
      if (this.name == "") {
        this.$message({
          type: "error",
          message: "名称不能为空"
        });
        return;
      }
      console.log(this.updatalist.procTypeName);
      console.log(this.name);
      if (this.updatalist.procTypeName == this.name) {
        this.$message({
          message: "成功",
          type: "success"
        });
        this.prophase = false;
      } else {
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            procTypeName: this.name,
            typeId: this.updatalist.typeId
          }
        };
        var url = "/info/service/editProcessType";
        var _this = this;
        this.$post(url, data)
          .then(response => {
            if (response.code == 0) {
              _this.$message({
                message: response.msg,
                type: "success"
              });
              _this.righttop();
              //_this.organization();
              _this.prophase = false;
              _this.recursion(_this.tree, _this.updatalist.typeId, _this, 2);
            } else {
              _this.$message({
                type: "warning",
                message: response.msg
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 递归方法
    recursion(data, id, _this, istate) {
      console.log(data);
      console.log(id);
      console.log(_this);
      console.log(istate);
      let result;
      if (!data) {
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var item = data[i].children;
        if (item != null) {
          for (let j = 0; j < item.length; j++) {
            if (item[j].id == id) {
              if (istate == 2) {
                item[j].label = _this.name;
              } else {
                item[j].fields.data.isStart = istate;
              }
            }
          }
          this.recursion(item, id, _this, istate);
        }
      }
    },
    closes() {
      this.name = "";
      this.updatalist = [];
    },
    // list () {
    //   var data = {
    //     token: this.token,
    //     userId: this.userId,
    //     data: {
    //       typeId: this.Nodeid
    //     }
    //   };
    //   var _this = this;
    //   this.$post("/info/service/getSubProcessTypeList", data)
    //     .then((response) => {
    //       _this.nodejie.data.children = response.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    tops(val) {
      for (let i = 0, len = this.tableDatas.length; i < len; i++) {
        if (val.id == this.tableDatas[i].id) {
          if (i == 0) {
            this.$message.warning("已经是第一条");
            return;
          }
          this.uploads(val.id, this.tableDatas[i - 1].id, i, i - 1);
        }
      }
    },
    below(val) {
      for (let i = 0, len = this.tableDatas.length; i < len; i++) {
        if (val.id == this.tableDatas[i].id) {
          if (i == len || i + 1 == len || this.tableDatas[i + 1].isAdd) {
            this.$message.warning("已经最后第一条");
            return;
          }
          this.uploads(val.id, this.tableDatas[i + 1].id, i, i + 1);
          return;
        }
      }
    },
    uploads(id1, id2, index, toggleIndex) {
      this.$post("/info/project/moveStage", {
        data: {
          sourceStageId: id1,
          targetStageId: id2
        }
      })
        .then(response => {
          if (response.code != 0) {
            this.$message.warning(response.msg);
            return;
          }
          this.$message.success(response.msg);
          // 切换元素位置
          this.tableDatas[index] = this.tableDatas.splice(
            toggleIndex,
            1,
            this.tableDatas[index]
          )[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    prophases() {
      if (this.name == "") {
        this.$message({
          type: "info",
          message: "请填写审批类型名称"
        });
        return;
      }
      console.log(this.Nodeid);
      console.log(this.Nodefields);
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          procTypeName: this.name,
          procTypeParent: this.Nodeid, ///普通/项目审批的直属类型typeId
          procTypeTopId: this.Nodefields ////新增到了哪个审批类型下就取其typeId
        }
      };
      this.$post("/info/service/addProcessType", data)
        .then(response => {
          if (response.code == 0) {
            this.currentTreeKey = this.Nodeid;
            this.$message.success(response.msg);
            this.prophase = false;
            this.name = "";
            this.righttop(this.Nodeid);
            this.organization();
            // this.list();
            this.xmjd = false;
          } else {
            // 将当前选中节点信息清空
            this.currentTreeNode = "";
            this.currentTreeData = "";
            this.$message(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addsection() {
      this.prophase = true;
      this.seen3 = true;
      this.seen4 = false;
    },
    compiles() {
      var djin = window.localStorage.getItem("djin");
      this.designationsStorage = window.localStorage.getItem("designations");
      this.designations = this.designationsStorage;
      console.log(this.Nodeids, djin);
      if (this.Nodeids == "" || this.Nodeids == djin) {
        this.seen13 = false;
      } else {
        this.seen13 = true;
      }
      this.compile = true;
      this.compiletz = true;
      this.seen13 = false;
    },
    compileqx() {
      this.compile = false;
      this.compiletz = true;
      this.designations = "";
      this.seen13 = true;
    },
    compilebc() {
      if (this.designations == "") {
        this.$message({
          type: "info",
          message: "名称不能为空"
        });
        return;
      }
      if (this.designationsStorage == this.designations) {
        this.$message({
          message: "成功",
          type: "success"
        });
        // 无需调取接口时（当前值和修改值一致） 保证编辑成功后将最新的值存入localStorage 确保下次编辑取值时获取最新值
        window.localStorage.setItem("designations", this.designations);
        this.compile = false;
        this.seen13 = true;
      } else {
        var data = {
          token: this.token,
          userId: this.userId,
          data: {
            procTypeName: this.designations,
            typeId: this.Nodeid
          }
        };
        var _this = this;
        this.$post("/info/service/editProcessType", data)
          .then(response => {
            if (response.code == 0) {
              _this.$message({
                message: response.msg,
                type: "success"
              });
              // 需要调取接口（当前和修改值不一致） 保证编辑成功后将最新的值存入localStorage 确保下次编辑取值时获取最新值
              window.localStorage.setItem("designations", _this.designations);
              _this.seen13 = true;
              console.log(_this.nodejie);
              _this.nodejie.data.label = _this.designations;
              _this.treename = _this.designations;
              _this.treenames = _this.designations;
              var Node = _this.nodejie;
              var labelName = "";
              if (Node != undefined) {
                var p = Node;
                while (true) {
                  if (p == null) {
                    break;
                  }
                  if (p.label != undefined) {
                    if (labelName === "") {
                      labelName = p.label;
                    } else {
                      labelName = p.label + ">" + labelName;
                    }
                  }
                  p = p.parent;
                }
              }
              _this.labelName = labelName;
              _this.compile = false;
              _this.compiletz = true;
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
      }
    },
    handleNodeClick(data, Node, vuecomponent) {
      // data 数组中该节点所对应的对象
      // Node 节点对应的 Node
      console.log(data, Node);

      // 切换审批类型时清空状态
      this.isAddStatus && this.quitAdd();
      this.isEditStatus && this.quitEdit();

      this.compile = false;
      this.compiletz = true;
      var labelName = "";
      this.currentTreeNode = Node;
      this.currentTreeData = data;
      if (Node != undefined) {
        var p = Node;
        while (true) {
          if (p == null) {
            break;
          }
          if (p.label != undefined) {
            if (labelName === "") {
              labelName = p.label;
            } else {
              labelName = p.label + ">" + labelName;
            }
          }
          p = p.parent;
        }
      }

      this.labelName = labelName;
      console.log(Node);
      this.Nodeid = Node.data.id;
      // console.log(Node)
      // console.log(this.Nodeid)
      this.Nodeids = Node.data.id;
      var djin = window.localStorage.getItem("djin");
      // console.log(this.Nodeids)
      // console.log(djin)
      if (this.Nodeids == "" || this.Nodeids == djin) {
        // console.log(11)
        this.seen13 = false;
      } else {
        // console.log(22)
        this.seen13 = true;
      }
      // console.log(Node.data)
      this.Nodefields = Node.data.fields.data.procTypeTopId;
      console.log(this.Nodefields);
      this.Nodepid = Node.pid;
      this.treenames = ">" + Node.label;
      this.designations = Node.label;
      // console.log(this.designations)
      window.localStorage.setItem("designations", this.designations);
      this.nodejie = Node;
      this.righttop();
      this.isEditStatus = false;
      this.isAddStatus = false;
      // var _this = this;
      function nodes(node, th) {
        console.log(node);
        var arr = [];
        arr.push(Node.data);
        for (let i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (arr[i].children == null || arr[i].children.length == 0) {
            th.xmjd = true;
          } else {
            th.xmjd = false;
          }
        }
      }

      nodes(Node, this);
      var _this = this;
      var isarr = [Node];
      function code(data, _this) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == null) {
            continue;
          }
          var item = data[i].parent;
          if (item != null) {
            if (item.data.fields != undefined) {
              _this.fieldsdata.push(item.data.fields);
            }
          }
          code([item], _this);
        }
      }
      code(isarr, _this);
      _this.fieldslist();
      if (data.fields.data.id > 1) {
        //项目审批

        // console.log(data.fields.data.id)
        this.compiletz = false;
        this.disabled = true;
        // console.log(this.disabled )
      }
      if (_this.Nodeid == _this.Nodeidsss) {
        _this.treenames = "";
        return;
      }
    },
    fieldslist(data) {
      // console.log(data)
      var _this = this;
      // console.log(_this.nodejie.data.fields)
      // console.log(_this.fieldsdata)
      var fieldsdata = [_this.nodejie.data.fields].concat(_this.fieldsdata);
      // console.log(fieldsdata);
      var Isstate = [],
        Isstates = [];
      if (fieldsdata != "") {
        for (let index = 0; index < fieldsdata.length; index++) {
          // console.log(fieldsdata[index].data.isStart)
          // console.log(fieldsdata[index].data)
          if (fieldsdata[index].data.isStart == 1) {
            // console.log(fieldsdata[index].data);
            Isstate.push(fieldsdata[index].data);
          } else {
            Isstates.push(fieldsdata[index].data);
          }
        }
        // console.log(Isstate);
        // console.log(Isstates);
        // console.log(Isstate.length)
        // console.log(Isstates.length)
        // console.log(fieldsdata.length)

        if (Isstate.length == fieldsdata.length) {
          _this.disabled = false;
          _this.fieldsdata = [];
        } else {
          _this.disabled = true;
          _this.fieldsdata = [];
        }
        if (Isstates.length == fieldsdata.length) {
          _this.disabled = true;
          _this.fieldsdata = [];
        }
      } else {
        _this.disabled = false;
      }
      // console.log(_this.disabled);
    },
    //启用禁用
    Enabled(scope, data) {
      console.log(scope.row);
      var name, code;
      if (scope.row.isStart == 1) {
        name = "禁用";
        code = 0;
      } else {
        name = "启用";
        code = 1;
      }
      this.$confirm(
        name +
          "该审批类型，将同步" +
          name +
          "该审批类型下的所有流程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              typeId: scope.row.typeId,
              isStart: code
            }
          };
          var _this = this;
          this.$post("/info/service/updateProcessAvailability", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.righttop();
                _this.recursion(_this.tree, scope.row.typeId, _this, code);
              } else {
                _this.$message({
                  type: "warning",
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
    organization() {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      // console.log(data)
      var _this = this;

      this.$post("/info/service/getAllProcessType", data)
        .then(response => {
          _this.tree = response.data;
          // 初始化tree选中 若首次取接口返回的第一个  若点击即取当前选中节点
          _this.$nextTick(() => {
            let key = this.currentTreeKey
              ? this.currentTreeKey
              : response.data[0].id;
            _this.$refs.tress.setCurrentKey(key);
          });
          if (!_this.currentTreeKey) {
            // 初始化默认第一个
            _this.nodejie = response.data[0];
            _this.treename = response.data[0].label;
            _this.treename3 = response.data[0].label;
            _this.labelName = response.data[0].label; // 一级标题
            _this.Nodeid = response.data[0].id; // 筛选当前选中树下的审批类型
            _this.djnodeid = response.data[1].id;
            _this.Nodeidsss = response.data[0].id;
            _this.Nodeids = " ";
            window.localStorage.setItem("djin", _this.Nodeid);
            // // window.localStorage.setItem("djnodeid", _this.djnodeid);
            _this.Nodefields = response.data[0].fields.data.typeId;
            // 更新右侧table数据
            _this.righttop();
          } else {
            // 说明不是初始化
            _this.nodejie = response.data[0];
            _this.treename = response.data[0].label;
            _this.treename3 = response.data[0].label;
            _this.labelName = response.data[0].label; // 一级标题
            _this.Nodeid = _this.currentTreeKey; // 筛选当前选中树下的审批类型
            _this.djnodeid = response.data[1].id;
            _this.Nodeidsss = response.data[0].id;
            _this.Nodeids = " ";
            _this.handleNodeClick(_this.currentTreeData, _this.currentTreeNode);
            window.localStorage.setItem("djin", _this.currentTreeKey);
            // // window.localStorage.setItem("djnodeid", _this.djnodeid);
            _this.Nodefields = response.data[0].fields.data.typeId;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    righttop(id) {
      var ids;
      if (!id) {
        ids = this.Nodeid;
      } else {
        ids = id;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          typeId: ids
        }
      };
      var _this = this;
      this.$post("/info/service/getSubProcessTypeList", data)
        .then(response => {
          if (id == undefined) {
            _this.tableData = response.data;
          } else {
            _this.tableData = response.data;
          }
          _this.tableData = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    renderContent(h, { node, data, store }) {
      // 鼠标移入展示全部名称
      return (
        <span class="custom-tree-node">
          <span title={node.label}>{node.label}</span>
        </span>
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.projectBox {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  .projectTit {
    font-weight: bold;
    padding-left: 13px;
  }
  .projectBtnGroup {
    padding: 0 11px 3px 0;
    /deep/ .downloadBtn {
      span {
        margin-left: -7px;
      }
    }
  }
  .el-button + .el-button {
    margin-left: 5px;
  }
  .el-button {
    width: 84px;
    height: 40px;
  }
}
.table1 {
  /deep/ .el-table__row td {
    padding: 0;
  }
}
.projectTable {
  /deep/ .el-table__row td {
    padding: 0;
  }
}
.projectNameIpt {
  display: inline-block;
  width: 240px;
  /deep/ .el-input__inner {
    height: 28px;
    width: 240px;
  }
}
.addBtn {
  display: inline-block;
  position: relative;
  top: 2px;
  left: 2px;
  .succBtn {
    font-size: 20px;
    cursor: pointer;
    color: #add7a0;
  }
  .errBtn {
    font-size: 20px;
    cursor: pointer;
    color: #efb87f;
  }
}
#contenti {
  width: 100%;
  height: 100%;
}
.myContenti {
  .el-dialog__footer {
    margin-right: 0;
    border-top: none;
  }
  .el-select {
    margin-left: 0;
  }
  .el-breadcrumb {
    padding-top: 0;
  }
}
.contenti_rightboxs .contenti_righttitle {
  font-size: 13px;
  text-align: left;
  margin-top: 3px;
  margin-left: 7%;
}
.contenti {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.contenti_header {
  text-align: left;
  background: white;
  padding-left: 10px;
  overflow: hidden;
  p {
    width: 56px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 46px;
  }
  h3 {
    width: 82px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 46px;
  }
}
.contenti_content {
  width: 100%;
  height: 100%;
  margin-top: 12px;
}
.contenti_content {
  width: 100%;
  display: flex;
  .contenti_left {
    li {
      width: 52px;
      line-height: 27px;
      float: left;
      background: rgba(242, 243, 245, 1);
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
  }
  .contenti_right {
    width: 85%;
    height: 98.5%;
    float: left;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    margin-left: 10px;
    .contenti_rights {
      width: 100%;
      height: 93%;
      overflow-y: auto;
      ul {
        margin-left: -15%;
        li {
          margin-top: 10%;
        }
        span {
          font-size: 13px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          font-weight: 400;
        }
        input {
          width: 310px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(231, 231, 231, 1);
          border-radius: 2px;
        }
      }
    }
    .contnet_operation {
      width: 100%;
      height: 600px;
      overflow: hidden;
      h4 {
        width: 100%;
        height: 40px;
        background: #f4f4f4;
        text-align: left;
        line-height: 40px;
        padding-left: 5px;
        span {
          color: #3d8dc0;
          font-weight: bold;
          vertical-align: middle;
          font-family: MicrosoftYaHei-Bold;
        }
      }
      .contnet_operation1 {
        width: 100%;
        height: 195px;
        background: #f4f4f4;
        margin-top: 5px;
        text-align: left;
        padding-left: 5px;
        overflow: hidden;
        .contnet_operationp {
          margin-top: 9px;
        }
        span {
          color: #3d8dc0;
          font-weight: bold;
          vertical-align: middle;
          font-family: MicrosoftYaHei-Bold;
        }
      }
      div {
        margin-top: 10px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
        }
      }
    }
  }
}
#contnet_operationpys {
  color: #333333;
  vertical-align: middle;
  font-family: MicrosoftYaHei-Bold;
}
.contenti_rights {
  width: 100%;
  height: 100%;
  h3 {
    width: 100%;
    height: 3%;
    background: #ffffff;
    line-height: 43px;
    span {
      display: inline-block;
    }
  }
}
.contenti_rightsh1 {
  float: left;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  float: left;
}
.contenti_rightsh span:last-child {
  //   float: right;
  margin-right: 1%;
  bottom {
    font-size: 12px;
  }
}
.contenti_rightboxs {
  width: 100%;
  background: #ffffff;
  .contenti_righttitle {
    font-size: 13px;
    text-align: left;
    margin-top: 3px;
    i {
      color: red;
      font-size: 17px;
      margin-top: 9px;
      margin-left: 9px;
      vertical-align: bottom;
    }
  }
}
// .contenti_rightboxss div {
//   float: left;
//   margin-top: 15px;
// }
.contenti_rightboxss1 {
  width: 16px;
  height: 16px;
  margin-left: 31px;
  margin-right: 16px;
  vertical-align: baseline;
  img {
    width: 100%;
    height: 100%;
  }
}
.contenti_rightboxss2 {
  font-size: 14px;
  font-weight: bold;
  line-height: 40px;
}
#contenti_rightboxss3 {
  float: right;
  padding-right: 11px;
  margin-right: 5px;
  margin: 0;
  div {
    margin-left: 10px;
    margin-top: 6px;
  }
}
.table1 {
  width: 99%;
  overflow: hidden;
  margin-top: 60px;
  margin-left: 1%;
  padding-bottom: 15px;
}
#columns {
  text-align: center;
}

#columns li:first-child {
  margin-left: 0;
}
#columns li i {
  margin-left: 0;
}
.framework_rightbj {
  //   width: 100%;
  height: 41px;
  background: #ffffff;
  //   padding-top: 9px;
}
.framework_rightbj input {
  width: 50%;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  outline: none;
  float: left;
  margin-left: 7px;
  padding-left: 14px;
}
.framework_rightbjbtn1 {
  float: left;
  margin-left: 10px;
  margin-top: 3px;
}

.contenti_rightboxss div {
  //   float: left;
  // //   margin-top: 15px;
  //   margin-left: 1%;
}
.contenti_rightboxs .contenti_righttitle {
  font-size: 13px;
  text-align: left;
  margin-top: 3px;
  margin-left: 1%;
}
.contenti {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.contenti_content .contenti_right {
  width: 100%;
  height: 98.5%;
  float: left;
  background: white;
  border-radius: 3px;
}

.contenti_content .contenti_right .contenti_rights ul {
  margin-left: -4%;
}
.framework_rightbj input {
  width: 50%;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  outline: none;
  float: left;
  margin-left: 7px;
  padding-left: 14px;
  margin-top: 7px;
}
</style>

<style lang="scss" scoped>
.btn-gruop .iconfont {
  font-size: 18px;
}
.el-button--mini.is-circle.iconfont {
  padding: 5px;
}

.contenti .el-table::before {
  background-color: rgba(0, 0, 0, 0) !important;
}

.contenti_left_tree {
  padding-top: 5px;
  box-sizing: border-box;
  height: 860px;
  width: 265px;
  background: white;
  overflow-x: auto;
  .el-icon-caret-right:before {
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
  }
}

.el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: none;
  border: none;
}

#contenti {
  width: 100%;
  height: 100%;
}

#contenti {
  .contenti_header {
    p {
      height: 46px;
      line-height: 46px;
    }
  }
}
.contenti {
  // margin: 0 4px;
  height: 103%;
  overflow: hidden;
}
.contenti_content {
  display: flex;
  padding-right: 14px;
  width: 100%;
  height: 100%;
  margin-top: 12px;
  .contenti_left {
    margin-right: 10px;
    width: 18%;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    .contenti_left_tree {
      width: 100%;
      height: 100%;
      .el-tree {
        width: 100%;
        height: 100%;
      }
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
  }
}

#contnet_operationpys {
  color: #333333;
  vertical-align: middle;
  font-family: MicrosoftYaHei-Bold;
}

.contenti_rights {
  width: 100%;
  height: 100%;
  h3 {
    width: 100%;
    background: #ffffff;

    span {
      display: inline-block;
    }
  }
}

.contenti_rightsh1 {
  float: left;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  float: left;
}

.contenti_rightsh span:last-child {
  //   float: right;
  margin-right: 1%;

  bottom {
    font-size: 12px;
  }
}

.contenti_rightboxs {
  width: 100%;
  height: 737px;
  margin-top: 3px;
  background: #ffffff;

  .contenti_righttitle {
    font-size: 13px;
    text-align: left;
    margin-top: 3px;

    i {
      color: red;
      font-size: 17px;
      margin-top: 9px;
      margin-left: 9px;
      vertical-align: bottom;
    }
  }
}

.contenti_rightboxss div {
  //   float: left;
  //   margin-top: 22px;
}

.contenti_rightboxss1 {
  width: 20px;
  height: 18px;
  margin-left: 31px;
  margin-right: 5px;
  vertical-align: baseline;

  img {
    width: 100%;
    height: 100%;
  }
}

.contenti_rightboxss2 {
  font-size: 14px;
  font-weight: bold;
}

#contenti_rightboxss3 {
  float: right;
  padding-right: 11px;
  margin-right: 5px;
  margin: 0;

  div {
    margin-left: 10px;
    margin-top: 6px;
  }
}
.table1 {
  overflow: hidden;
  margin-top: 60px;
  padding-bottom: 15px;
}
.framework_rightbj {
  //   width: 100%;
  display: flex;
  align-items: center;
  background: #ffffff;
  //   padding-top: 9px;
}

.framework_rightbj input {
  width: 50%;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  outline: none;
  float: left;
  margin-left: 7px;
  padding-left: 14px;
}

.framework_rightbjbtn1 {
  float: left;
  margin-left: 10px;
  margin-top: 3px;
}

.tab_operation_edit {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: url("../../../../assets/common_icon/edit_icon.png") no-repeat;
  background-size: 28px 28px;
  margin-left: 10px;
}
.tab_operation_edit:focus {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/common_icon/edit_hover_icon.png")
    no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
.tab_operation_edit:hover {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/common_icon/edit_hover_icon.png")
    no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}

.fa-delete {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: url("../../../../assets/image/usermanage/shanchu_0.png") no-repeat;
  background-size: 28px 28px;
  margin-left: 10px;
}
.fa-delete:focus {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/image/usermanage/shanchu_0.png") no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
.fa-delete:hover {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("../../../../assets/image/usermanage/shanchu_1.png") no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
</style>
<style>
.contenti .el-tree > .el-tree-node {
  display: inline-block !important;
  min-width: 100%;
}
.el-table tr.header-style {
  background: #f9f9f9 !important;
  color: #333333;
}
.table1 .el-table thead {
  color: #333;
}
.contenti .el-tree-node > .el-tree-node__children {
  overflow: visible;
}
.icon_btn {
  font-size: 20px;
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}
.el-icon-error {
  color: #efb87f;
}
.el-icon-success {
  color: #add7a0;
}
/* .el-scrollbar__wrap{
  margin-right: 3px !important;
} */
</style>
