<template>
  <div id="contenti"
       class="contenti myContenti">
    <div class="contenti_header"
         style="height:96px;">
      <el-breadcrumb separator="/"
                     class="page-breadcrumb">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>业务类型配置</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 style="width: 132px;font-weight: 600;" class="fl">业务类型配置</h3>
      <h4 class="fr">
            <el-button type="primary" style="display:inline" @click="importFnBtn" :disabled="disabledsimport">导入</el-button>
            <el-button type="primary" style="display:inline"  @click="exportFn" :disabled="disabledexport">导出</el-button>

      </h4>

    </div>
    <div class="contenti_content clearfix"
         style="overflow: hidden;height: 872px;">
      <div class="contenti_left_tree"
           style="margin-bottom: 9px;padding: 5px;height: 860px;background: white;">
           <business-tree @method="handleNodeClick"  @load="handleNodeClick" :search="true" :general="general" ref="data" :shadeShow="shadeShow"></business-tree>
        <!-- <el-scrollbar style="height:100%;width:100%"> -->
          <!-- <div style="width: min-content;"> -->
            <!-- <el-tree ref="tress"
                     :data="tree"
                     :props="defaultProps"
                     default-expand-all
                     @node-click="handleNodeClick"
                     node-key="id"></el-tree> -->
                <!-- <div>

                </div> -->
          <!-- </div> -->
        <!-- </el-scrollbar> -->
      </div>
      <div class="contenti_right">
        <div class="contenti_rights">
          <h3 class="contenti_rightsh"
              v-if="compiletz">
            <div style="clear: both;height: 2px;"></div>
            <span v-if="seen13">
              <el-button @click="compiles"
                         type="primary"
                         :disabled="disabled"
                         v-if="$utils.checkSystemPermission('bask_business_update')"
                         class="el-icon-edit mt-5">编辑</el-button>
            </span>
          </h3>
          <div class="framework_rightbj"
               style="margin-bottom: 21px;"
               v-if="compile" v-on:keyup.enter="compilebc">
            <input type="text"
                   maxlength="100"
                   v-model.lazy="designations"
                   name
                   id />
            <div class="framework_rightbjbtn1">
              <el-button @click="compileqx"
                         size="medium"
                         class="el-icon-close">&nbsp;取消</el-button>
              <el-button @click="compilebc"
                         size="medium"
                         type="primary">
                <i class="el-icon-tickets"></i>&nbsp;保存
              </el-button>
            </div>
          </div>
          <div class="contenti_rightboxs"
               style="height: 863px;clear: both;margin-top: -12px;">
            <div class="contenti_righttitle">{{treename3}}&nbsp;&nbsp;</div>
            <div class="contenti_rightboxss">
              <div>
                <i style="color: red;"
                   class="el-icon-location"></i>
                &nbsp;{{labelName}}
              </div>
              <p style="clear: both;"></p>
              <div class="contenti_rightboxss2"
                   style>业务类型</div>
              <div id="contenti_rightboxss3"
                   v-if="tjlx">
                <div v-if="$utils.checkSystemPermission('bask_business_add')">
                  <el-button type="primary"
                             @click="addsection"
                             :disabled="disabled"
                             style="font-size: 14px;margin-top: -5px;margin-right: 5px;"
                             class="framework_rightlsitspadd">
                    <span>+</span>&nbsp;添加
                  </el-button>
                </div>
              </div>
            </div>
            <div class="table1"
                 style="margin-top: 47px;margin-left: 0px;">
              <el-table :data="tableData"

                        :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
                        highlight-current-row :class="{tableAutoHeight:tableAutoHeight,elTableStyle:elTableStyle}" style="overflow-y:auto">
                <el-table-column property="name"
                                 show-overflow-tooltip
                                 label="业务类型名称"></el-table-column>
                <el-table-column property="names"
                                 label="操作"
                                 align="center"
                                 width="230%">
                  <template slot-scope="scope">
                    <ul id="columns"
                        class="btn-gruop">
                      <el-button type="text"
                                 v-if="$utils.checkSystemPermission('bask_business_update')"
                                 :disabled="disabled"
                                 @click="addsections(scope, tableData)"
                                 title="编辑"><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
                      <el-button type="text"
                                 v-if="scope.row.isStart == 0"
                                 :disabled="disabled"
                                 @click="Enabled(scope, tableData)"
                                 title="禁用"><i class="icon-operate-btn iconfont jinyong"></i></el-button>
                      <el-button type="text"
                                 v-else
                                 :disabled="disabled"
                                 @click="Enabled(scope, tableData)"
                                 title="启用"><i class="icon-operate-btn iconfont qiyong-copy"></i></el-button>
                      <el-button type="text"
                                 @click="deleType(scope, tableData)"
                                 title="删除"><i class="icon-operate-btn delete iconfont shanchu"></i></el-button>
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="projectBox">
              <div class="projectTit">项目阶段</div>
              <div v-if="xmjd"
                   class="projectBtnGroup">
                <template v-if="isEditStatus">
                  <el-button type="primary"
                             class="downloadBtn"
                             @click="quitEdit">退出编辑</el-button>
                </template>
                <template v-else>
                  <el-button type="primary"
                             class="downloadBtn"
                             @click="downLoadTemplate">下载模版</el-button>
                  <el-button type="primary"
                             :disabled="disabled"
                             @click="importProjectBtn">
                    导入
                    <input type="file"
                           accept=".xls,.xlsx"
                           ref="importFile"
                           @change="importProjectVal"
                           name="importFile"
                           style="display:none">
                  </el-button>
                  <el-button type="primary"
                             @click="exportTableVal">导出</el-button>
                  <el-button class="el-icon-delete"
                             type="primary"
                             @click="deleProject">删除</el-button>
                  <el-button class="el-icon-edit"
                             type="primary"
                             :disabled="disabled"
                             @click="projectEdit">编辑</el-button>
                  <el-button v-if="$utils.checkSystemPermission('bask_project_stage_add')"
                             type="primary"
                             class="el-icon-plus"
                             :disabled="disabled"
                             @click="addProject">添加</el-button>
                </template>
              </div>
            </div>
            <div style="margin-left: 0px;">
              <el-table :class="['projectTable',{'min-list': elTableStyle}]"
                        ref="projectTable"
                        :data="tableDatas"
                        :row-style="{'max-height':'51px','height':'50px'}"
                        header-row-class-name="header-style"
                        @selection-change="projectTableSel"
                        :header-cell-style="tableHeaderStyle"
                        height="510"
                        highlight-current-row
                        style="width: 99%">
                <el-table-column type="selection"
                                 width="42">
                </el-table-column>
                <el-table-column type="index"
                                 width="80"
                                 label="序号"
                                 align="center">
                </el-table-column>
                <el-table-column label="项目阶段名称"
                                 show-overflow-tooltip>
                  <template slot-scope="scope">
                    <template>
                      <span v-if="!scope.row.isEdit && !scope.row.isAdd"
                            @dblclick="againEdit(scope.row)">{{scope.row.name}}</span>
                    </template>
                    <template v-if="scope.row.isEdit">
                      <el-input v-model="scope.row.name"
                                :maxlength="20"
                                @blur="saveProjectName(scope.row,'edit')"
                                class="projectNameIpt"></el-input>
                    </template>
                    <template v-if="scope.row.isAdd">
                      <el-input v-model="scope.row.name"
                                :maxlength="20"
                                placeholder="请输入"
                                class="projectNameIpt"></el-input>
                      <div class="addBtn">
                        <i class="el-icon-error errBtn"
                           @click="quitAdd(scope.row)"></i>
                        <i class="el-icon-success succBtn"
                           @click="saveProjectName(scope.row,'add')"></i>
                      </div>
                    </template>
                  </template>

                </el-table-column>
                <el-table-column property="names"
                                 label="操作"
                                 align="center"
                                 width="230%">
                  <template slot-scope="scope"
                            v-if="scope.row.isShowBtn">
                    <ul id="columns"
                        class="btn-gruop">
                      <el-button type="text"
                                 :disabled="disabled"
                                 @click="tops(scope.row)"
                                 title="上移"><i class="icon-operate-btn iconfont shangjiantou"></i></el-button>
                      <el-button type="text"
                                 :disabled="disabled"
                                 @click="below(scope.row)"
                                 title="下移"><i class="icon-operate-btn iconfont xiajiantou"></i></el-button>
                      <!-- <el-button class="iconfont icon7" @click="deleType(scope, tableData)" type="primary" title="删除" size="mini" circle></el-button> -->
                    </ul>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="业务类型"
               :close-on-click-modal="false"
               :visible.sync="prophase"
               @close="closes"
               width="500px"
               class="choseAuditor">
      <span>
        <div style="width: 108%;height: 1px;background: rgb(204, 204, 204);margin-top: -21px;margin-bottom: 21px;
                margin-left: -19px;"></div>
        <div class="auditorType clearfix"
             style="margin-left: 27px;">
          <div class="prophaseType fl" @keyup.enter="() => {seen3?prophases():prophases4()}">
            <p style="width: 390px;">
              <span>类型名称：</span>
              <span>
                <el-input v-model="name"
                          maxlength="50"
                          placeholder="请输入类型名称（50字以内）"
                          style="width:80%"></el-input>
              </span>
            </p>
          </div>
        </div>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="medium"
                   @click="prophase = false">取 消</el-button>
        <el-button size="medium"
                   type="primary"
                   v-if="seen3"
                   @click="prophases">确 定</el-button>
        <el-button size="medium"
                   type="primary"
                   v-if="seen4"
                   @click="prophases4">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="confirmbox"
        width="30%"
        :before-close="handleClose">
        <span>确定要导入业务类型吗?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmbox = false">取 消</el-button>
            <el-button type="primary" @click="sureConfig">确定 <input type="file" accept=".xls,.xlsx" ref="importFnval" @change="importFn" name="importFnval" style="display:none"></el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { constants, fstat } from "fs";
export default {
  components: {},
  data () {
    return {
        confirmbox:false,
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
      designations1:'',
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
        elTableStyle:false,
      tableAutoHeight:false, //高度自适应
      general:false,
      shadeShow:false,
      disabledsimport:true,
      disabledexport:false,

      emptyText:"暂无数据"
    };
  },
  mounted () {
   //this.organization();
    // 解决下面表格选择框出现省略号
    this.$nextTick(() => {
      $('.projectTable .header-style .el-table-column--selection .cell').css('text-overflow', 'clip')
    })
    console.log(this.$Business.type)
    //this.righttop(this.Nodeid)
    this.aaa()


  },

  watch:{
      aaa(){
        setTimeout(() => {
            console.log(this.$refs.data.data)
            if(this.$refs.data.data.length >0){
                this.disabledexport = false;
            }else{
                this.disabledsimport = false;
                    this.disabledexport = true
            }
          }, 1000);
    },

  },

  methods: {
      aaa(){
        setTimeout(() => {
            console.log(this.$refs.data.data)
            if(this.$refs.data.data.length >0){
                this.disabledsimport = true;
                this.disabledexport = false;
            }else{
                this.disabledsimport = false;
                    this.disabledexport = true
            }
          }, 1000);
    },

       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //融资类型的导出
        exportFn(){
            this.$message({
            message: "正在导出",
                type: "success"
                });
        var sendData = {
            data:{}
        };
        this.$store.commit("export", { url: "/info/project/exportFinaning", data: sendData});
        },
        // 融资类型的导入按钮
        importFnBtn () {
            this.confirmbox = true;
           // this.isAddStatus && this.quitAdd();
        },
        sureConfig(){
            this.$refs.importFnval.click();
             this.confirmbox = false;
        },
        //融资类型的导入
        importFn(){
            let file = this.$refs.importFnval.files[0];
                // console.log(file)
                let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
                // console.log(fileName)
                if (fileName == 'xls' || fileName == 'xlsx') {
                    let formData = new FormData();
                    // console.log(formData)
                    formData.append('token', this.token)
                    formData.append("userId", this.userId);
                    formData.append("data", JSON.stringify({}));
                    formData.append('file', file);
                    // console.log(formData)
                    this.$post('/info/project/importFinancings', formData, {headers: { "Content-Type": "multipart/form-data" }}).then(res => {
                    this.$refs.importFnval.value = '';
                    // console.log(res)
                    // console.log(this.$refs.data.data)
                    if (res.code != this.code.codeNum.SUCCESS) {
                        this.$Mit.tree.data = true
                        this.$message.error(res.msg);
                        return
                    }
                    this.organization();
                    this.$Business.structure()
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message.warning('只能导入xls、xlsx格式文件')
                    return
                }
        },
      //左侧树点击事件
       handleMethods(res){
          console.log(res)
        },
    // 项目阶段导入
    importProjectVal () {
      let file = this.$refs.importFile.files[0];
      // console.log(file)
      let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
      // console.log(fileName)
      if (fileName == 'xls' || fileName == 'xlsx') {
        let formData = new FormData();
        // console.log(formData)
        formData.append('token', this.token)
        formData.append("userId", this.userId);
        formData.append("data", JSON.stringify({ financingId: this.Nodeid }));
        formData.append('file', file);
        // console.log(formData)
        this.$post('/info/project/importProjectPhase', formData, {
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          this.$refs.importFile.value = '';
          if (res.code != this.code.codeNum.SUCCESS) {
            this.$message.error(res.msg);
            return
          }
          if (res.data.length == 0) {
            this.$message.success('导入成功！')
            this.rightbottom();
            return
          }
          if (res.data.length > 0) {
            let sameArr = res.data.map(item => { return `"${ item }"` });
            let sameStr = sameArr.join('、');
            this.$message.warning(`${ sameStr }阶段已存在，未执行导入！`)
            this.rightbottom();
            return
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.warning('只能导入xls、xlsx格式文件')
        return
      }
    },
    // 项目阶段导入按钮
    importProjectBtn () {
      this.isAddStatus && this.quitAdd();
      this.$refs.importFile.click();
    },
    // 导出表格数据
    exportTableVal () {
      this.isAddStatus && this.quitAdd();
      this.$store.commit('export', {
        url: '/info/project/exportProjectPhases',
        data: { financingId: this.Nodeid }
      });
    },
    // 下载模版
    downLoadTemplate () {
      this.isAddStatus && this.quitAdd();
      this.$store.commit('export', {
        url: '/info/project/downloadFinancingTypeTemplate',
        data: { financingId: this.Nodeid }
      });
    },
    // 在编辑状态下双击项目阶段名称再次可编辑
    againEdit (val) {
      if (!this.isEditStatus) { return }
      val.isEdit = true;
    },
    // 添加项目阶段
    addProject () {
      if (this.isAddStatus) {
        return
      }
      this.isAddStatus = true;
      this.tableDatas.push({
        name: '',
        oldName: '',
        isEdit: false,
        isAdd: true,
        isShowBtn: false,
        financingId: ''
      });
      // 隐藏多选按钮
      this.setHideCheckbox('hidden');
      // 页面滚动到底部
      this.$nextTick(() => {
        $(".el-table__body-wrapper:last").animate({ scrollTop: $('.el-table .el-table__body tbody .el-table__row:last').prop("offsetTop") + 53 }, 300);
      })
    },
    // 删除项目阶段
    deleProject () {
      this.isAddStatus && this.quitAdd();
      if (this.projectTableSelVal.length == 0) {
        this.$message.warning('请至少选择一条数据')
        return
      }
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delArr = [];
        delArr = this.projectTableSelVal.map(item => item.id);
        this.$post('/info/project/delProjectStage', {
          data: {
            ids: delArr
          }
        }).then(res => {
          if (res.code == -3512) {
            this.$message.warning(res.msg)
            return
          } else if (res.code != 0) {
            this.$message.error(res.msg)
            return
          }
          // 批量splice 需要倒序遍历数组 索引会改变
          for (let i = this.tableDatas.length - 1; i >= 0; i--) {
            if (delArr.indexOf(this.tableDatas[i].id) != -1) {
              this.tableDatas.splice(i, 1);
            }
          }
          this.tjlx = this.tableDatas.length == 0;

          // this.setHideCheckbox('visible');
          // this.setHideCheckbox('hidden');

          this.$message.success(res.msg)
        }).catch(err => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 设置表格最后一行是否显示选择框
    setHideCheckbox (visibilityVal) { // visibilityVal: string
      this.$nextTick(() => {
        $('.el-table .el-table__body tbody .el-table__row:last td:first-child .cell').css('visibility', visibilityVal)
      })
    },
    // 项目阶段添加退出
    quitAdd (val) {
      this.tableDatas.pop();
      this.isAddStatus = false;
      this.setHideCheckbox('visible')
    },
    /**
     * 项目阶段输入框失焦保存
     * @params val 保存行的数据
     * @params type edit/add
    */
    saveProjectName (val, type) {
      if (val.name == '') {
        this.$message.warning('请填写阶段名称')
        return
      }
      if (val.name == val.oldName) { // 值没改变不触发保存
        return
      }
      let url = type == 'edit' ? '/info/project/updateProjectStage' : '/info/project/addProjectStage';
      let data = { name: val.name };
      if (type == 'edit') {
        data.id = val.id;
      } else {
        data.financingId = this.Nodeid;
      }
      this.$post(url, { data }).then(res => {
        if (res.code != 0) {
          this.$message.warning(res.msg);
          return
        }
        if (type == 'edit') {
          val.isEdit = false;
        } else {
          this.isAddStatus = false;
          val.isAdd = false;
          this.setHideCheckbox('visible')
          this.rightbottom();
        }
        this.$message.success('保存成功')
      }).catch(err => {
        console.log(err)
      })
    },
    // 项目阶段退出编辑状态
    quitEdit () {
      this.isEditStatus = false;
      // this.tableDatas.some(item => { item.isEdit = false; item.isShowBtn = true; })
      this.rightbottom();
    },
    // 项目阶段编辑
    projectEdit () {
      this.isAddStatus && this.quitAdd()

      if (this.tableDatas.length == 0) {
        this.$message.warning('暂无数据可编辑')
        return
      }
      if (this.projectTableSelVal.length == 0) {
        this.$message.warning('请至少选择一条数据')
        return
      }
      this.isEditStatus = true;
      this.projectTableSelVal.some(item => { item.isEdit = true; })
      this.tableDatas.some(item => { item.isShowBtn = false; })
      this.$refs.projectTable.clearSelection();
    },
    // 项目阶段表格选中项改变
    projectTableSel (val) {
      this.projectTableSelVal = val;
    },
    // 项目阶段表格样式
    tableHeaderStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && rowIndex == 0) {
        return 'paddingLeft:4px;boxSizing:border-box;background:#F9F9F9;'
      } else if (rowIndex == 0) {
        return 'fontWeight:bold;background:#F9F9F9;color:#333333;'
      }
    },
    // 融资业务类型名称删除
    deleType (val, data) {
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/info/project/delFinanceType', {
          data: {
            id: val.row.id
          }
        }).then((response) => {
          if (response.code !== 0) {
            this.$message({
              type: 'warning',
              message: `${ response.msg }`
            });
            return
          }
          data.splice(val.$index, 1); // 删除表格条目
          this.$Mit.removeNode.content = val.row.id
          // this.$refs.tree.remove(val.row.id); // 在tree中删除指定id条目
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.xmjd = data.length == 0;
        }).catch((err) => {
          console.log(err)
        })

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    //修改的弹窗
    addsections (scope) {
      this.prophase = true;
      this.seen3 = false;
      this.seen4 = true;
      this.name = scope.row.name;
      this.updatalist = scope.row;
      console.log(this.updatalist);
    },
    // 修改的请求
    prophases4 () {
      if (this.name == "") {
        this.$message({
          type: "error",
          message: "名称不能为空"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.name,
          id: this.updatalist.id
        }
      };
      var url = "/info/project/updateFinanceType";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            _this.righttop();
            _this.prophase = false;
           _this.recursion(_this.$refs.data.data, _this.updatalist.id, _this, 2);
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 递归方法
    recursion (data, id, _this, istate) {
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
    closes () {
      this.name = "";
      this.updatalist = [];
    },
    list () {
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.Nodeid
        }
      };
      var _this = this;
      this.$post("/info/project/getChildrenFinanceTypeListByFinanceId", data)
        .then((response) => {
          // _this.nodejie.data.children = response.data;
          this.$Mit.addNode.content = response.data // 将当前选中节点的所有数据传给组件，便于更新树
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    tops (val) {
      for (let i = 0, len = this.tableDatas.length; i < len; i++) {
        if (val.id == this.tableDatas[i].id) {
          if (i == 0) {
            this.$message.warning('已经是第一条');
            return;
          }
          this.uploads(val.id, this.tableDatas[i - 1].id, i, i - 1);
        }
      }
    },
    below (val) {
      for (let i = 0, len = this.tableDatas.length; i < len; i++) {
        if (val.id == this.tableDatas[i].id) {
          if (i == len || i + 1 == len || this.tableDatas[i + 1].isAdd) {
            this.$message.warning("已经最后第一条");
            return
          }
          this.uploads(val.id, this.tableDatas[i + 1].id, i, i + 1)
          return
        }
      }
    },
    uploads (id1, id2, index, toggleIndex) {
      this.$post("/info/project/moveStage", {
        data: {
          sourceStageId: id1,
          targetStageId: id2
        }
      }).then((response) => {
        if (response.code != 0) {
          this.$message.warning(response.msg);
          return
        }
        this.$message.success(response.msg);
        // 切换元素位置
        this.tableDatas[index] = this.tableDatas.splice(toggleIndex, 1, this.tableDatas[index])[0];
      }).catch(function (error) {
        console.log(error);
      });
    },
    prophases () {
      if (this.name == "") {
        this.$message({
          type: "info",
          message: "请填写完整"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.name,
          parentId: this.Nodeid,
          financeTopId: this.Nodefields
        }
      };
      this.$post("/info/project/addFinanceType", data)
        .then((response) => {
          if (response.code == 0) {
            this.$message.success(response.msg);
            this.prophase = false;
            this.name = "";
            this.righttop(this.Nodeid); // 获取当前节点下的 业务类型 展示在右侧table中
            this.list(); // 获取当前选中节点下的子节点 展示在左侧tree中
            this.xmjd = false;
          } else {
            this.$message(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addsection () {
      this.prophase = true;
      this.seen3 = true;
      this.seen4 = false;
    },
    compiles () {
      var djin = window.localStorage.getItem("djin");
      // console.log(this.Nodeids, djin);
      this.designations1 = this.designations
      if (this.Nodeids == "" || this.Nodeids == djin) {
        this.seen13 = false;
      } else {
        this.seen13 = true;
      }
      this.compile = true;
      this.compiletz = false;
    },
    // handleName (e) {
    //   this.designations = e.target.value
    // },
    compileqx () {
      this.compile = false;
      this.compiletz = true;
      console.log(this.designations1+'___________'+this.designations)
      if(this.designations1 != this.designations){
        this.designations = this.designations1
      }
    },
    compilebc () {
      if (this.designations == "") {
        this.$message({
          type: "info",
          message: "名称不能为空"
        });
        return;
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.designations,
          id: this.Nodeid
        }
      };
      var _this = this;
      this.$post("/info/project/updateFinanceType", data)
        .then((response) => {
          if (response.code == 0) {
            _this.$message.success('成功修改');
            // console.log(_this.nodejie);
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
        .catch(function (error) {
          console.log(error);
        });
    },
    handleNodeClick(data, Node, vuecomponent) {
        // console.log(data,"_____111")
        // console.log(Node)
        if(data  == undefined && Node == undefined){
            //this.emptyText ="加载中"
              this.tableData = []
              this.tableDatas = []
              // console.log(this.tableData.length)
              if(this.tableData.length == 0){
                  this.tableAutoHeight = true;
              }
        }else{


      // 切换业务类型时清空状态
      this.isAddStatus && this.quitAdd()
      this.isEditStatus && this.quitEdit()

      this.compile = false
      this.compiletz = true
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
      this.labelName = labelName;
    //   this.Nodeids = Node.id;
    this.Nodeids = Node.data.id;
      // console.log(this.Nodeids)
      var djin = window.localStorage.getItem("djin");
      if (this.Nodeids == "" || this.Nodeids == djin) {
        this.seen13 = false;
      } else {
        this.seen13 = true;
      }
      this.Nodeid = Node.data.id;
      // console.log(Node.data)
      // console.log(Node.data.fields.data.financeTopId)
      this.Nodefields = Node.data.fields.data.financeTopId;
      this.Nodepid = Node.pid;
      this.treenames = ">" + Node.label;
      this.designations = Node.label;
      this.nodejie = Node;
     this.righttop();
      this.rightbottom();
      this.isEditStatus = false;
      this.isAddStatus = false;
      // var _this = this;
      function nodes (node, th) {
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
      function code (data, _this) {
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
      if (_this.Nodeid == _this.Nodeidsss) {
        _this.treenames = "";
        return;
      }
      }
    },
    fieldslist (data) {
      var _this = this;
      var fieldsdata = [_this.nodejie.data.fields].concat(_this.fieldsdata);
      // console.log(fieldsdata);
      var Isstate = [],
        Isstates = [];
      if (fieldsdata != "") {
        for (let index = 0; index < fieldsdata.length; index++) {
          if (fieldsdata[index].data.isStart == 0) {
            // console.log(fieldsdata[index].data);
            Isstate.push(fieldsdata[index].data);
          } else {
            Isstates.push(fieldsdata[index].data);
          }
        }
        // console.log(Isstate);
        // console.log(Isstates);
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
    Enabled (scope, data) {
      // console.log(scope.row);
      var name, code;
      if (scope.row.isStart == 0) {
        name = "禁用";
        code = 1;
      } else {
        name = "启用";
        code = 0;
      }
      this.$confirm(
        name +
        "该业务类型，将同步" +
        name +
        "该业务类型下的所有流程和模板, 是否继续?",
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
              id: scope.row.id,
              isStart: code
            }
          };
          var _this = this;
          this.$post("/info/project/isStartFinancing", data)
            .then((response) => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.righttop();
                _this.recursion(_this.$refs.data.data, scope.row.id, _this, code);
              } else {
                _this.$message({
                  type: "info",
                  message: response.msg
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => { });
    },
    organization () {
       // console.log(this.$refs.data.data)
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      // console.log(data)
      var _this = this;

      this.$post("/info/project/getAllFinanceType", data)
        .then((response) => {
            if(response.data != null){
                 _this.tree = response.data;
                 this.$refs.data.data = response.data;
                // console.log(_this.tree)
                // console.log(_this.tree.length)
                // console.log(response.data)

                if(_this.tree.length  == 0){
                    this.disabledsimport = false;
                    this.disabledexport = true
                }else{
                    this.disabledsimport = true;
                    this.disabledexport = false;
                }
                // _this.nodejie = response.data[0];
                // _this.treename = response.data[0].label;
                // _this.treename3 = response.data[0].label;
                // _this.labelName = response.data[0].label;
                // _this.Nodeid = response.data[0].id;
                // _this.Nodeidsss = response.data[0].id;
                // _this.Nodeids = " ";
                // console.log(_this.Nodeid)
                // window.localStorage.setItem("djin", _this.Nodeid);
                // _this.Nodefields = response.data[0].fields.data.financeTopId;

            }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    righttop (id) {
        // console.log(id)
      var ids;
      if (id == undefined) {
        ids = this.Nodeid;
        // console.log(id)
      } else {
        ids = id;
        // console.log(id)
      }

      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          parentId: this.Nodeid
        }
      };
      var _this = this;
      this.$post("/info/project/getSubFinanceTypeList", data)
        .then((response) => {
           console.log(response)
          if (id == undefined) {
            _this.tableData = response.data;
          } else {
            _this.tableData = response.data;
          }
          _this.tableData = response.data;
          // console.log(_this.tableData.length)
          if(_this.tableData.length == 0){
              _this.tableAutoHeight = true;
              _this.elTableStyle = false;
          }else{
               _this.tableAutoHeight = false;
              _this.elTableStyle = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    rightbottom () {
      this.$post("/info/project/getProjectStageList", {
        data: {
          financingId: this.Nodeid
        }
      }).then((response) => {
        if (response.code != 0) {
          this.$message.error(response.msg)
          return
        }
        this.tjlx = response.data == '';
        this.tableDatas = response.data.map(item => {
          item.isEdit = false;
          item.isShowBtn = true;
          item.isAdd = false;
          item.oldName = item.name;
          return item
        });
      })
        .catch(function (error) {
          console.log(error);
        });
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
  height: 500px;
  /deep/ .el-table__row td {
    padding: 0;
  }
}
.projectTable.min-list{
  height: 160px;
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
.el-scrollbar__wrap {
  overflow-x: auto;
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
    .contenti_left_tree {
      margin-left: 8%;
      padding-top: 10px;
    }
  }
  .contenti_right {
    width: 85%;
    height: 98.5%;
    float: left;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    margin-left: 12px;
    .contenti_rights {
      width: 100%;
      height: 100%;
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
  float: right;
  margin-right: 1%;
  bottom {
    font-size: 12px;
  }
}
.el-scrollbar__wrap {
  overflow-x: auto;
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
.contenti_rightboxss div {
  float: left;
  margin-top: 15px;
}
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
  width: 100%;
  height: 41px;
  background: #ffffff;
  padding-top: 9px;
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

.contenti_rightboxss div {
  float: left;
  margin-top: 15px;
  margin-left: 1%;
}
.contenti_rightboxs .contenti_righttitle {
  font-size: 13px;
  text-align: left;
  margin-top: 3px;
  margin-left: 1%;
}
.contenti_content .contenti_left .contenti_left_tree[data-v-2a54cc72] {
  margin-left: 0;
  padding-top: 7px;
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
  margin-left: 9px;
}

.contenti_content .contenti_right .contenti_rights ul {
  margin-left: -4%;
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
  float: right;
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
.framework_rightbj {
  width: 100%;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding-top: 9px;
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

.tab_operation_edit {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: url('../../../../assets/common_icon/edit_icon.png') no-repeat;
  background-size: 28px 28px;
  margin-left: 10px;
}
.tab_operation_edit:focus {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url('../../../../assets/common_icon/edit_hover_icon.png')
    no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
.tab_operation_edit:hover {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url('../../../../assets/common_icon/edit_hover_icon.png')
    no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}

.fa-delete {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: url('../../../../assets/image/usermanage/shanchu_0.png') no-repeat;
  background-size: 28px 28px;
  margin-left: 10px;
}
.fa-delete:focus {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url('../../../../assets/image/usermanage/shanchu_0.png') no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
.fa-delete:hover {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url('../../../../assets/image/usermanage/shanchu_1.png') no-repeat !important;
  background-size: 28px 28px !important;
  margin-left: 10px;
}
</style>
<style>
.el-table tr.header-style {
  background: #f9f9f9 !important;
  color: #333333;
}
.table1 .el-table thead {
  color: #333;
}
#app .contenti .el-scrollbar__wrap {
  overflow-x: scroll;
}
.contenti .el-tree-node > .el-tree-node__children {
  overflow: visible;
}
.elTableStyle{
    width:100%;
    height:500px;
    overflow-y: auto;
}
.tableAutoHeight{
    width:100%;
    height:120px;
}
</style>
