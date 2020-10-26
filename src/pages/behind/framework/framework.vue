<template>
  <div id="contenti" class="contenti">
    <div class="contenti_header">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item>组织架构</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 style="font-weight: bold;">组织架构</h3>
    </div>
    <div class="contenti_content">
      <div class="contenti_left">
        <div class="contenti_left_tree">
          <el-scrollbar style="height:100%">
            <el-tree :data="tree" :props="defaultProps" default-expand-all @node-expand="check" @node-click="handleNodeClick($event)"></el-tree>
          </el-scrollbar>
        </div>
      </div>
      <div class="contenti_right">
        <div class="contenti_rights">
          <h3 class="contenti_rightsh" v-if="compiletz">
            <span class="content-tit">{{mrsnames}}</span>
            <span v-if="$utils.checkSystemPermission('bask_up_sondept')"  class="content-btn">
              <el-button @click="compiles" icon="el-icon-edit-outline">编辑</el-button>
            </span>
          </h3>
          <div class="framework_rightbj" v-if="compile">
            <input type="text" v-model="designations" name id>
            <div class="framework_rightbjbtn1">
              <el-button icon="el-icon-error" size="medium" @click="compileqx">取消</el-button>
              <el-button type="primary" icon="el-icon-tickets" size="medium" @click="compilebc">保存</el-button>
            </div>
          </div>
          <div class="contenti_rightboxs">
            <div class="contenti_righttitle">
              <i class="el-icon-location"></i>
              &nbsp;{{mrsnames}}&nbsp;&nbsp;{{designation}}
            </div>
            <div class="contenti_rightboxss">
              <div class="contenti_rightboxss1">
                <img src="../../../assets/my_pproval/矢量智能对象@2x.png" alt>
              </div>
              <div class="contenti_rightboxss2">下级部门</div>
              <div id="contenti_rightboxss3">
                <div v-if="$utils.checkSystemPermission('bask_add_sondept')">
                  <el-button type="primary" icon="el-icon-plus" @click="addsection">
                    增加子部门
                  </el-button>
                </div>

                <div v-if="$utils.checkSystemPermission('bask_del_sondept')">
                  <el-button type="primary" icon="el-icon-delete" @click="addsectionde">
                    删除
                  </el-button>
                </div>
              </div>
            </div>
            <div class="table1 bm-table">
              <el-table @select="selects" :data="tableData" @select-all="handleSelectionChange" :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}" highlight-current-row height="270" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="name" label="部门名称"></el-table-column>
                <el-table-column property="names" label="操作" align="center" width="230%">
                  <template slot-scope="scope">
                    <ul id="columns" style="clear:both">
                      <span class="icon-operate-btn iconfont shangjiantou" title="上移" @click="tops(scope, tableData)">
                        <!-- <i class="el-icon-back"></i> -->
                      </span>
                      <span class="icon-operate-btn iconfont xiajiantou" title="下移" @click="below(scope, tableData)">
                        <!-- <i class="el-icon-back"></i> -->
                      </span>
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="contenti_rightboxss">
              <div class="contenti_rightboxss1">
                <img src="../../../assets/my_pproval/部门成员@2x.png" alt>
              </div>
              <div class="contenti_rightboxss2">部门成员</div>
              <div id="contenti_rightboxss3">
                <div v-if="$utils.checkSystemPermission('bask_add_user_dept')">
                  <el-button type="primary" @click="addpeo" icon="el-icon-plus" id="framework_rightlsitspadd">增加人员</el-button>
                </div>
                <div v-if="$utils.checkSystemPermission('bask_update_user')">
                  <el-button type="primary" @click="departmenttz">
                    <img style="width: 14px;float: left;" src="../../../assets/my_pproval/select_bm.png" alt>&nbsp;调整部门
                  </el-button>
                </div>
                <div v-if="$utils.checkSystemPermission('bask_del_user')">
                  <el-button icon="el-icon-delete" @click="delepeo" type="primary">
                    &nbsp;删除
                  </el-button>
                </div>
              </div>
            </div>
            <div class="table1">
              <el-table :data="tableDatas" highlight-current-row height="300" @select="selectspeo" @select-all="handleSelectionChangepeo" :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="userName" label="名称"></el-table-column>
                <el-table-column property="mobile" label="手机"></el-table-column>
                <el-table-column property="email" label="邮箱"></el-table-column>
                <el-table-column label="是否部门主管">
                  <template slot-scope="scope">
                    <!-- 是否部门主管选择 -->
                    <el-select @change="managerSel(scope.row,tableDatas)" v-model="scope.row.managerFlag" placeholder="请选择" class="selectCol">
                      <el-option v-for="(item,index) in selectColList" :key="index" :label="item.label" :value="item.val">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <select_box v-if="flag" :peodatas='peodatas' :peostate='peostate' :clearpeo='clearpeo' v-on:statesbox='statesboxs' /> -->
    <findAllDeptUser v-on:findAllUser="findAllUsers" :findState="findState" :checkState="checkState"  :findFlagShow.sync="flag" />
    <select_boxs v-if="flags" :clearstate="clearstate" v-on:states="state" :treestate="treestate" :tree="tree" />
  </div>
</template>
<script>
// import select_box from '@/components/select_box/frameworkpeo'
import select_boxs from "@/components/select_box/frameworkpeos";
import findAllDeptUser from "@/components/select_box/findAllDeptUserMultiple";
import { constants } from "fs";

export default {
  components: {
    // select_box,
    findAllDeptUser,
    select_boxs
  },
  data () {
    return {
      // 是否部门主管选择数组
      selectColList: [
        { label: '是', val: 1 },
        { label: '否', val: 0 }
      ],
      mrsnames: "",
      findState: "",
      checkState: "",
      seen1: false,
      flag: false,
      flags: false,
      mrsid: "",
      tree: "",
      _designation: "",
      get designation () {
        return this._designation;
      },
      set designation (value) {
        this._designation = value;
      },
      designations: "",
      designationsCopy: "",
      peodatas: "",
      rowar: [],
      rowarrs: [],
      dat: "",
      text: "投资银行部",
      tableData: [],
      tableDatas: [],
      mrsname: "",
      treeId: "",
      arrsatet: 1,
      nodejie: "",
      nodejies: "",
      peodata: "",
      clearpeo: "",
      peostate: "",
      peoId: "",
      sepeo: [],
      sepeoall: [],
      treestate: "",
      tree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      compile: false,
      compiletz: true
    };
  },
  mounted () {
    $(".contenti_left").css("height", $(".contenti_right").height());
    this.organization();
  },
  watch: {},
  methods: {
    // 是否为部门主管选项改变
    managerSel (item, tabData) {
      // managerFlag：1 为主管 0 非主管
      if (item.managerFlag === 0) {
        this.cancelManager(item);
        return
      }
      // 遍历数据找到主管设为非主管
      // tabData.forEach(val => {
      //   if (item.userId !== val.userId && val.managerFlag === 1) {
      //     val.managerFlag = 0;
      //     // this.cancelManager(val,false);
      //     return
      //   }
      // })
      // forEach循环return不能跳出循环 考虑性能使用some方法
      tabData.some(val => {
        if (item.userId !== val.userId && val.managerFlag === 1) {
          val.managerFlag = 0;
          return true
        }
      })
      this.$post('sys/setManager',{
        data: {
          deptId: item.deptId,
          userId: item.userId
        }
      }).then(res => {
        if(res.code !== 0) {
          this.$message({
            type: 'warning',
            message:`${res.msg}`
          })
          item.managerFlag = 0;
          return
        }
        // this.$message({
        //   type: 'success',
        //   message: `设置部门主管成功`
        // })
      }).catch(err=> {
        console.log(err)
      })
    },
    // 取消主管请求
    // arguments  数据对象 是否显示取消成功提示
    cancelManager (items,isMsg=true) {
      this.$post('sys/cancelManager', {
        data: {
          deptId: items.deptId,
          userId: items.userId
        }
      }).then(res => {
        if (res.code !== 0) {
          this.$message({
            type: 'warning',
            message: `${res.msg}`
          })
          items.managerFlag = 1;
          return
        }
        items.managerFlag = 0;
      }).catch(err => {
        console.log(err)
      })
    },
    findAllUsers (data) {
      console.log(data, 22)
      if(!data || !data.length){
        this.flag = false;
        this.findState = {};
        this.checkState = {};
        return
      }
      this.flag = false;
      this.findState = {};
      this.checkState = {};
      console.log(data);
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].userId);
      }
      var str;
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      var str = str.substring(9);
      var data = {
        data: {
          deptId: this.nodejie.id,
          userIds: str
        }
      };
      var url = "/sys/addOrganMember";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.tableDatas = response.data;
            _this.clearpeo = { clear: 1 };
            _this.flag = false;
          } else {
            _this.$message(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新增加人员
    addpeo () {
      console.log(this.nodejie.id);
      if (this.nodejie.id == undefined) {
        this.$message({
          message: "请选择部门",
          type: "warning"
        });
        return;
      }
      this.findState = { state: 1 };
      this.checkState = { state: 2 };
      this.flag = true;
    },
    //新增加人员选择
    selectspeo (rows) {
      console.log(rows);
      this.sepeo = rows;
    },
    handleSelectionChangepeo (rows) {
      this.sepeo = rows;
    },
    //调整部门
    departmenttz () {
      if (this.sepeo.length == 0) {
        this.$message({
          message: "请选择成员",
          type: "warning"
        });
        return;
      }
      var _this = this;
      this.$post("/sys/getOrganization")
        .then((response) => {
          _this.tree = response.data;
          console.log(response.data);
          _this.flags = true;
          _this.treestate = { state: 1 };
          _this.clearstate = { state: 3 };
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    state (data) {
      console.log(data);
      if (data == "") {
        return;
      }
      var rarr;
      if (this.sepeoall == "") {
        rarr = this.sepeo;
        console.log(this.sepeo);
      } else {
        rarr = this.sepeoall;
      }
      console.log(rarr);
      let arr = Array.from(new Set(rarr));
      var str;
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }

      var arrs = [];
      var array = this.sepeo;
      for (let i = 0; i < array.length; i++) {
        arrs.push(array[i].userId);
      }
      str = str.substring(9);
      console.log(str);
      var data = {
        data: {
          deptId: data[0].id,
          userIds: arrs.join(","),
          oldDeptId: this.treeId,
          parentId: this.nodejies.id
        }
      };
      var _this = this;
      this.$post("/sys/editMember", data)
        .then((response) => {
          _this.tableDatas = response.data;
          _this.sxlist();
          str = "";
          this.sepeo.length = 0;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新增加人员删除
    delepeo () {
      console.log(this.sepeo);
      if (this.sepeo == "") {
        this.$message({
          message: "请选择人员",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("确定删除该人员吗?", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var rarr;
            if (this.sepeoall == "") {
              rarr = this.sepeo;
              console.log(this.sepeo);
            } else {
              rarr = this.sepeoall;
            }
            var arrs = [];
            var array = this.sepeo;
            for (let i = 0; i < array.length; i++) {
              arrs.push(array[i].userId);
            }

            var data = {
              data: {
                deptId: this.nodejie.id,
                memberIds: arrs.join(",")
              }
            };
            var _this = this;
            this.$post("/sys/deleteMember", data)
              .then((response) => {
                if (response.code == _this.code.codeNum.SUCCESS) {
                  _this.$message({
                    message: response.msg,
                    type: "success"
                  });
                  _this.tableDatas = response.data;
                  this.sepeo=[]
                } else {
                  _this.$message.error(response.msg);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //上移
    tops (row, tableData) {
      if (row.$index == 0) {
        this.$message({
          message: "已经是第一条了",
          type: "warning"
        });
        return;
      }
      var arr = this.nodejie.children;
      for (let i = 0; i < arr.length; i++) {
        if (row.$index - 1 == i) {
          var arrdat = arr[i];
        }
      }
      var data = {
        data: {
          fromDeptId: row.row.id,
          toDeptId: arrdat.id
        }
      };
      var url = "/sys/mobileOrganization";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          _this.sxlist();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //   下移
    below (row, tableData) {
      console.log(tableData.length, row.$index);
      if (row.$index == tableData.length - 1) {
        this.$message({
          message: "已经是最后一条",
          type: "warning"
        });
        return;
      }
      var arr = tableData;
      for (let i = 0; i < arr.length; i++) {
        if (row.$index + 1 == i) {
          var arrdat = arr[i];
        }
      }
      var data = {
        data: {
          fromDeptId: row.row.id,
          toDeptId: arrdat.id
        }
      };
      var url = "/sys/mobileOrganization";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          _this.sxlist();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //第一次加载
    organization (data, url) {
      var data = {
        data: {}
      };
      var url = "/sys/getOrganization";
      let _this = this;
      this.$post(url, data)
        .then((response) => {
          // console.log(response.data)
          _this.mrsid = response.data[0].id;
          _this.mrsnames = response.data[0].label;
          _this.designations = response.data[0].label;
          _this.designationsCopy = response.data[0].label;
          _this.tableData = response.data[0].children;
          _this.nodejie = response.data[0];
          // console.log(response.data[0])
          _this.treeId = response.data[0].id;
          console.log('organization', _this.treeId)
          _this.toprow();
          _this.organizations(response);
          // _this.handleNodeClick()
          _this.mrsname = response.data[0].name;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //组织机构回调
    organizations (data) {
      this.tree = data.data;
    },
    //获取树形ID
    handleNodeClick (Node, data) {
      // designations
      this.names = Node.name;
      if (Node == undefined) {
        this.treeId = this.mrsid;
      } else {
        this.nodejie = Node;
        // this.designation=Node.name
        this.designations = Node.label;
        this.designationsCopy =  Node.label;
        this.treeId = Node.id;
        this.tableData = Node.children;
      }
      console.log('handleNodeClick', this.treeId)
      if (this.mrsid == this.treeId) {
        this.designation = "";
      } else {
        this.designation = ">" + this.nodejie.label;
      }
      this.toprow();
      this.sxlist()
    },
    toprow () {
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          deptId: this.treeId
        }
      };
      var _this = this;
      this.$post("/sys/getMemberByOrg ", data)
        .then((response) => {
          _this.tableDatas = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    compiles () {
      // this.designations = "";
      this.compiletz = false;
      this.compile = true;
      console.log(this.designations)
    },
    compileqx () {
      this.compiletz = true;
      this.compile = false;
      this.designations = this.designationsCopy;
      setTimeout(function () {
        $("#app #bask_up_sondept").show();
      }, 10);
    },
    //编辑
    compilebc () {
      if (this.designations == "") {
        this.$message({
          type: "info",
          message: "名称不能为空"
        });
        return;
      }
      var data = {
        data: {
          name: this.designations,
          id: this.treeId,
          updateBy: "123"
        }
      };
      var _this = this;
      this.$post("/sys/editOrganization", data)
        .then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message({
              message: response.msg,
              type: "success"
            });

            _this.nodejie.label = _this.designations;
            _this.designation = ">" + _this.designations;
            if (_this.mrsid == _this.treeId) {
              _this.mrsnames = _this.designations;
            }
          } else {
            _this.$message(response.msg);
          }
          _this.compiletz = true;
          _this.compile = false;
          this.designationsCopy = this.designations;
          setTimeout(function () {
            $("#app #bask_up_sondept").show();
          }, 10);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取选中id
    check (node) {
      console.log(node);
      this.nodejies = node;
    },
    //添加部门
    addsection () {
      this.$prompt("请输入部门名称", "增加子部门", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: '请填写完整'
      })
        .then(({ value }) => {
          if (value == null || value == "") {
            this.$message({
              type: "error",
              message: "请填写完整"
            });
            debugger
            return;
          }
          var data = {
            data: {
              name: value,
              updateBy: this.$store.state.loginObject.userId,
              createBy: this.$store.state.loginObject.userId,
              parentId: this.treeId
            }
          };
          var _this = this;
          this.$post("/sys/addOrganization", data)
            .then((response) => {
              if (response.code == _this.code.codeNum.SUCCESS) {
                _this.sxlist();
              } else {
                _this.$message(response.msg);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => { });
    },
    sxlist () {
      console.log('sxlist', this.treeId)
      var data = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        data: {
          parentId: this.treeId
        }
      };
      var url = "/sys/getDeptForparent";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          // console.log(response);
          let data = response.data
          // 按照 ‘orderBy’字段排序
          _this.$utils.sortBy(data, 'orderBy')
          _this.nodejie.children = data;
          _this.tableData = data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取部门id
    selects (row) {
      this.rowar = row;
      console.log(row);
    },
    //部门删除
    addsectionde () {
      if (this.rowar == "") {
        this.$message({
          type: "info",
          message: "请选择部门"
        });
      } else {
        this.$confirm(
          "删除部门会删除部门下的所有子部门以及人员, 确定删除吗?",
          "删除提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //    alert(1)
            var arrs = [];
            var array = this.rowar;
            for (let i = 0; i < array.length; i++) {
              arrs.push(array[i].id);
            }
            var data = {
              token: this.$store.state.loginObject.userToken,
              userId: this.$store.state.loginObject.userId,
              data: {
                deptIds: arrs.join(",")
              }
            };
            var _this = this;
            this.$post("/sys/deleteOrganization ", data)
              .then((response) => {
                if (response.code == _this.code.codeNum.SUCCESS) {
                  _this.sxlist();
                } else {
                  _this.$message(response.msg);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    handleSelectionChange (rows) {
      console.log(rows);
      this.rowar = rows;
    },
    open4 () {
      this.seen1 = true;
      this.dat = this.data;
    },
    sat (data) {
      if (data == 1) {
        this.seen1 = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contenti .el-table::before {
  background-color: rgba(0, 0, 0, 0) !important;
}

/*.contenti .el-button {*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*  padding: 0 15px;*/
/*  outline: none;*/
/*}*/

/*.contenti .info_btn {*/
/*  background: #f2f3f5;*/
/*  color: #000;*/
/*}*/

/*.contenti .info_btn:hover {*/
/*  background: #ecf5ff !important;*/
/*  color: #3a8ee6;*/
/*  border: solid 1px #e2f0ff;*/
/*}*/

/*.contenti .param_btn {*/
/*  background: #1a5fa4 !important;*/
/*  color: #fff;*/
/*}*/


.contenti_left_tree {
  .el-icon-caret-right:before {
    /* display: none; */
    width: 20px;
    height: 20px;
    background: url("../../../assets/my_pproval/矢量智能对象@2x.png") !important;
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
  height: 100%;
  overflow: hidden;
}

.contenti_header {
  height: 96px;
  text-align: left;
  background: white;
  padding-left: 10px;
  overflow: hidden;
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 5px 0 19px;
  }
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
    // width:17%;
    //  float: left;
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

  .contenti_right {
    width: 82%;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    // margin-left: 12px;
    .contenti_rights {
      width: 100%;
      height: 100%;

      ul {
        // float: left;
        // margin-top: 3%;
        // margin-left: 2%;
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

      p {
        // width: 52px;
        // line-height: 27px;
        // float: left;
        // background:rgba(242,243,245,1);
        // border:1px solid rgba(231,231,231,1);
        // border-radius:4px;
        // line-height: 28px;
        // margin-left:5%;
        // margin-top: 70px;
        // padding-left: 5px;;
        // padding-right: 5px;
        // font-size: 11px;
        // background: rgba(242,243,245,1);
        // margin-left: 21px;
      }

      .contenti_rightsh {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        padding-bottom: 12px;
        height: 38px;
        line-height: 38px;
        border-bottom: solid 1px #dddddd;
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

      li {
        //  float: left;
        //  margin-left: 5%;
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
  // background: #EEEEEE;
  h3 {
    width: 100%;
    height: 6%;
    background: #ffffff;
    line-height: 50px;

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

.content-btn {
  margin-right: 1%;
}
.content-tit {
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
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
  float: left;
  margin-top: 22px;
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

#columns {
  margin: auto;
  width: 88px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

#columns span {
  width: 30px;
  padding: 0;
  //   margin-left: 17%;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  height: 30px;
  //   border: 1px solid #cccccc;
  display: inline-block;
  background: #f2f3f5;
}

#columns li:first-child {
  margin-left: 0;
}

#columns li i {
  margin-left: 0;
}

.framework_rightbj {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding-top: 9px;
  border-bottom: solid 1px #ddd;
}

.framework_rightbj input {
  width: 25%;
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
  margin-left: 50px;
  margin-top: 3px;
}

/*.framework_rightbjbtn1 button:first-child {*/
/*  background: #f2f3f5;*/
/*}*/

/*.framework_rightbjbtn1 button:last-child {*/
/*  background: #005bac;*/
/*  color: white;*/
/*}*/

/*#framework_rightlsitspadd {*/
/*  background: #005bac;*/
/*  color: white;*/
/*}*/

/*.el-button {*/
/*  border-radius: 3px !important;*/
/*}*/
</style>
<style>
.table1 .el-table thead {
  color: #333;
}
.table1 .el-select .el-input input {
  width: 108px;
  height: 36px;
}
.table1 .el-select .el-input i {
  line-height: 36px;
}
#app .contenti .el-scrollbar__wrap {
  overflow-x: scroll;
}
.contenti .el-tree-node > .el-tree-node__children {
  overflow: visible;
}
</style>
<style lang="scss">
//    .el-tabs--border-card {
//     background: #fff;
//     border: 1px solid #dcdfe6;
//     -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
//     box-shadow: none ;
//     border:none;
// }
//     .contenti{
//         width: 99%;
//         height:90%;
//         // background:#E7F2FF;
//     }
//     .contenti_headers{
//         width: 98%;
//         height: 9%;
//         text-align: left;
//         background: white;
//         padding-left: 10px;
//         margin-left: 14px;
//         overflow: hidden;
//         p{
//             // width:56px;
//             height:3%;
//             font-size:14px;
//             font-family:MicrosoftYaHei;
//             font-weight:400;
//             color:rgba(51,51,51,1);
//             margin-top: 0.5%;
//             // line-height:0.5%;
//         }
//         h3{
//             // width:82px;
//             height:5%;
//             font-size:20px;
//             font-family:MicrosoftYaHei;
//             font-weight:bold;
//             color:rgba(51,51,51,1);
//             // line-height:94px;
//             margin-top: 30px;
//         }
//     }
//     .contenti_content{
//         width: 100%;
//         height: 100%;
//         margin-top: 12px;
//         // background: #E7F2FF;
//         // padding: 12px;
//     }
//     .contenti_content{
//         width: 100%;
//         height:90%;
//         .contenti_left{
//             width:17%;
//             height:98.5%;
//              float: left;
//             background:rgba(255,255,255,1);
//             border-radius:3px;
//             margin-left: 12px;
//             li{
//                 width: 52px;
//                 line-height: 27px;
//                 float: left;
//                 background:rgba(242,243,245,1);
//                 border:1px solid rgba(231,231,231,1);
//                 border-radius:4px;
//                 line-height: 28px;
//                 margin-left:5%;
//                 margin-top: 5%;
//                 padding-left: 5px;;
//                 padding-right: 5px;
//                 font-size: 11px;
//                 background: rgba(242,243,245,1)
//             }
//             .contenti_left_img{
//                 margin-left: 17px;
//                 clear: both;
//                 padding-top: 15px;
//                 p{
//                     width:80px;
//                     height:22px;
//                     img{
//                         width: 100%;
//                     }
//                 }
//             }
//             .contenti_left_tree{
//                 margin-left: 8%;
//                 padding-top: 10px;
//             }
//         }
//         .contenti_right{
//             width:80%;
//             height:98.5%;
//              float: left;
//             // background:rgba(255,255,255,1);
//             border:1px solid rgba(216,220,228,1);
//             border-radius:3px;
//             margin-left: 12px;
//             .el-col-12{
//                 width: 50%;
//             }
//             .rightTop{
//                 .rightTitle{
//                     height: 60px;
//                     line-height: 60px;
//                     background-color: #fff;
//                     span:nth-child(1){
//                         font-size: 16px;
//                         color: #333;
//                         margin-left: 20px;

//                     }
//                     span:nth-child(2){
//                         width: 89px;
//                         height: 34px;
//                         background-color:#1A5FA4;
//                         line-height: 34px;
//                         color: #fff;
//                         font-size: 14px;
//                         margin-right: 15px;
//                         margin-top: 14px;
//                         cursor: pointer;

//                         img{
//                             width: 14px;
//                             height: 14px;
//                             position: relative;
//                             top: 2px;
//                             left: -6px;
//                         }
//                     }
//                 }
//             }
//             .rightLeftBottem{
//                 // width:450px;
//                 height:500px;
//                 background:rgba(255,255,255,1);
//                 border-radius:3px;
//                 margin-top: 10px;
//                 // float: left;

//                 p{
//                     height: 60px;
//                     line-height: 60px;
//                     span:nth-child(1){
//                         font-size: 16px;
//                         color: #333;
//                         margin-left: 20px;
//                     }
//                     span:nth-child(2){
//                         width: 89px;
//                         height: 34px;
//                         background-color:#1A5FA4;
//                         line-height: 34px;
//                         color: #fff;
//                         font-size: 14px;
//                         margin-right: 15px;
//                         margin-top: 14px;
//                         cursor: pointer;

//                         img{
//                             width: 14px;
//                             height: 14px;
//                             position: relative;
//                             top: 2px;
//                             left: -6px;
//                         }
//                     }
//                 }
//                  .proTypes{
//                     text-align: left;
//                     margin-left: 22px;
//                     .typeDelete{
//                         position: relative;
//                         top: 15px;
//                         right: 100px;

//                     }
//                     .othersType{
//                         margin-left: 69px;
//                     }
//                 }

//             }
//             .rightRightBottm{
//                 // width:450px;
//                 height:500px;
//                 background:rgba(255,255,255,1);
//                 border-radius:3px;
//                 margin-top: 10px;
//                 // float: left;
//                 margin-left: 10px;
//                 p{
//                     height: 60px;
//                     line-height: 60px;
//                     span:nth-child(1){
//                         font-size: 16px;
//                         color: #333;
//                         margin-left: 20px;
//                     }
//                     span:nth-child(2),
//                     span:nth-child(3){
//                         width: 89px;
//                         height: 34px;
//                         background-color:#1A5FA4;
//                         line-height: 34px;
//                         color: #fff;
//                         font-size: 14px;
//                         margin-right: 15px;
//                         margin-top: 14px;

//                         img{
//                             width: 14px;
//                             height: 14px;
//                                 position: relative;
//                                 top: 2px;
//                                 left: 1px;
//                         }
//                     }
//                 }
//                 .proTypes{
//                     text-align: left;
//                     margin-left: 22px;
//                     .typeDelete{
//                         position: relative;
//                         top: 15px;
//                         right: 100px;
//                         margin-left: 6px;

//                     }
//                     .othersType{
//                         margin-left: 69px;
//                     }
//                 }
//             }
//         }
//     }

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
// .choseAuditor .auditorType{
//     text-align: left;
// }
// .choseAuditor .auditorType .typeLeft,
// .choseAuditor .auditorType .typeRight{
//     width: 45%;
//     padding-right: 10px;
//     border-right: 1px solid #e8e8e8;
// }

// .choseAuditor .auditorType .typeRight{
//     border-right: 0px;
// }
// .choseAuditor .auditorType .typeLeft .alerdy,
// .choseAuditor .auditorType .typeRight .alerdy{
//     font-size: 14px;
//     color:#333;
//     margin-top: 5px;
//     margin-bottom: 5px;
//     display: block;
// }
// .choseAuditor .auditorType .typeLeft p{
//     margin-top: 10px;
//     margin-bottom: 8px;
// }

// .choseAuditor .auditorType .typeRight .choTypes li{
//      height: 34px;
//     line-height: 34px;
// }
// .choseAuditor .auditorType .typeRight .choTypes li:hover{
//     background-color: #F7F7F7;
// }
// .choseAuditor .auditorType .typeRight .choTypes li span{
//     font-size: 14px;
//     color: #333;
//     margin-left: 5px;
// }
// .choseAuditor .auditorType .typeRight .choTypes li i{
//     margin-right: 5px;
//     position: relative;
//     top: 11px;

// }
// .choseAuditor  .el-dialog__footer{
//     border-top: 1px solid #e8e8e8;
//     text-align: center;
// }


// // 项目阶段类型
// .choseAuditor .auditorType .prophaseType{
//     width: 100%;
// }
// .choseAuditor .auditorType .prophaseType .el-select{
//     width: 85%;
// }
// //项目阶段关联
// .choseAuditor .auditorType .progressassociated{
//     width: 100%;
// }
// .choseAuditor .auditorType .progressassociated p{
//     margin-bottom: 10px;
// }
// .choseAuditor .auditorType .progressassociated .el-select{
//     width: 77%;
// }

// .choseAuditor .auditorType .progressassociated span{
//     display: inline-block;
//     width: 105px;
// }
</style>
