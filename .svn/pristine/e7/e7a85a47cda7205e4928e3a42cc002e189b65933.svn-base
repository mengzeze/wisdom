<template>
  <div class="customfile" id="cus_file">
    <div v-if="!isShowRecovery">
      <div class="el-breadcrumb-box el-breadcrumb-ul">
        <path-bar :paths="bread_crumbs" field="title" @toggle="backDir"></path-bar>
      </div>
      <div class="pro-doc-operation">
        <ul class="clearfix">
          <li class="new-built bgcolor-primary-hover" @click="newProFn" v-if="$utils.checkSystemPermission('crm_financing__file_dir')">
            <a href="javascript:;">
              <i></i>
              新建文件夹
            </a>
          </li>
          <li class="upload bgcolor-primary-hover" v-if="$utils.checkSystemPermission('crm_financing__file_upload')" @click="uploadFile('docUploadLimit')">
            <a href="javascript:;">
              <i></i>
              上传
            </a>
          </li>
          <li style="display:none"><el-input type="file" id="fileBtn" style="display:none;"></el-input></li>
          <li class="download bgcolor-primary-hover" @click="downloadFile" v-if="$utils.checkSystemPermission('crm_financing__file_down')">
            <a href="javascript:;">
              <i></i>
              下载
            </a>
          </li>
          <li class="delete bgcolor-primary-hover" @click="deleteFile('')" v-if="$utils.checkSystemPermission('crm_financing__file_del')">
            <a href="javascript:;">
              <i></i>
              删除
            </a>
          </li>
          <li class="Edition bgcolor-primary-hover" @click="versionFile" v-if="$utils.checkSystemPermission('crm_financing__file_dition')">
            <a href="javascript:;">
              <i></i>
              版本
            </a>
          </li>
          <li class="recycle" >
            <el-button @click="recoverFile" size="medium" type="danger" icon="el-icon-delete" >回收站</el-button>
            <!-- <a href="javascript:;">
              <i></i>
              回收站
            </a>-->
          </li>
          <el-input
            class="search_input"
            v-model="search_name"
            placeholder="请输入内容"
            clearable
            suffix-icon="el-icon-search"
            @keydown.native.native="enterEvent"
          ></el-input>
        </ul>
      </div>

      <div  @contextmenu.prevent="rightEvent(null)">
        <el-table
          id="multipleTable"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          @row-contextmenu="rightEventRow"
          @row-dblclick="dblclickRow">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="文件名" sortable="custom">
              <template slot-scope="scope">
                  <p v-if="scope.row.isAdd || scope.row.isEdit" class="flex a-center" style="max-width:500px" @dblclick.stop="() => {}">
                    <el-input v-if="scope.row.isAdd" placeholder="请输入文件夹名称" maxlength="250" v-model="add_dir_name" @keyup.enter.native ="handleNameSave(scope.row.isAdd, scope.row.docName,scope.row)"></el-input>
                    <el-input v-if="scope.row.isEdit" placeholder="请输入文件夹名称" maxlength="250" v-model="editName_input" @keyup.enter.native ="handleNameSave(scope.row.isAdd, scope.row.docName,scope.row)"></el-input>

                    <i class="el-icon-error icon_btn" title="取消" @click="closeAddDirFn(scope.row.isAdd, scope.row.id)"></i>
                    <i class="el-icon-success icon_btn" title="确定" @click="handleNameSave(scope.row.isAdd, scope.row.docName,scope.row)"></i>
                  </p>

                  <div class="flex" v-else :title="scope.row.docName">
                    <p>
                       <img :src="scope.row.fileIcon">
                    </p>
                    <div>
                      <span class="ellipsis1">{{scope.row.docName}}</span>
                      <br>
                      <p class="lock" v-if="scope.row.lockState != -1">
                        <img v-if="scope.row.lockState != -1" src="../../../../../assets/project_doc/projectDocLock.png" style="width:9px;height:10px">
                      </p>
                    </div>
                  </div>

              </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" sortable="custom">
              <template slot-scope="scope" >
                  <p v-if="scope.row.docType == 0">{{scope.row.updateTime}}</p>
                  <p v-if="scope.row.docType == 0">
                      <span style="font-weight:bold">{{scope.row.createUserName}}</span>
                      生成
                      <span class="color-primary version-style" style="font-weight:bold;">V{{scope.row.docVersionNumber}}</span>
                  </p>
              </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="pages">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="onPageChange"></el-pagination>
      </div>
      <right-menu
        class="rightMenu"
        :rightmenuIsShow="flag"
        :fileData="right_click_data"
        id="rightM"
        v-on:rightMenuClick="rightMenuClickFn"
        :hasDocAndFolder = hasDocAndFolder></right-menu>

      <el-dialog title="文件属性" :close-on-click-modal="false" :visible.sync="isShowNature" class="nature_box" width="500px">
        <div class="box">
          <el-row>
            <el-col :span="5">名称：</el-col>
            <el-col :span="19">{{select_nature_data.docName}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">大小：</el-col>
            <el-col :span="19">{{select_nature_data.docSize}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">版本：</el-col>
            <el-col :span="19">{{select_nature_data.docVersion}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">创建：</el-col>
            <el-col :span="19">{{select_nature_data.docCreateInto}}</el-col>
          </el-row>
          <!-- <el-row>
          <el-col :span="5">锁定：</el-col>
          <el-col :span="19">{{select_nature_data.docName}}</el-col>
          </el-row>-->
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isShowNature = false">关 闭</el-button>
        </span>
      </el-dialog>

      <el-dialog title="重名提示" :close-on-click-modal="false" :visible.sync="double_name_bol" class="nature_box" width="400px">
        {{double_name}}
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cancleDoubleModule">取 消</el-button>
          <el-button type="primary" @click="okDoubleModule">确 定</el-button>
        </span>
      </el-dialog>

<!--      <upload-add-doc-->
<!--        v-if="addDoc"-->
<!--        :limit="addDocNumber"-->
<!--        :uploadDocAddIsShow="uploadDocAddIsShow"-->
<!--        :uploadOtherData="uploadData"-->
<!--        :isUploadSuccess="isUploadSuccess"-->
<!--        @sendValueToParent="uploadAddDocClose"-->
<!--        @docUpload="docUpload"-->
<!--        :accpet="accpet"-->
<!--        ref="uploadref"-->
<!--        v-on:docUploadAllsucess="docUploadAllsucess"-->
<!--      ></upload-add-doc>-->

      <rd-uploader ref="RdUploader" :transfer="true" @uploaded="docUpload" @version="newuploadFn"></rd-uploader>

      <file-version :versionIsShow="vers"
                    :docVersionlist="docVersionlist"
                    :parentdata="selectedData[0]"
                    flag="crm"
                    @new-version="rightMenuUploadFn"
                    @colseModule="colseModuleFn"
                    @queryDoc="getTableData"></file-version>

    </div>
    <recovery-file v-if="isShowRecovery" :custData="custData" :naturalData="naturalData" :finacnData="finacnData" v-on:backToCustom="backToCustom"></recovery-file>
  </div>
</template>
<script>
  import recoveryFile from "./recoveryfile";  //回收站
  import rightMenu from "@/components/file/rightmenu_swh";  //右击事件
  import verSion from "@/components/file/version_swh";
  import { setTimeout } from "timers";
  import uploadAddDoc from "@/components/file/uploadAddDoc_zdy";
  export default {
    name: "customfile",
    components: {
      rightMenu,
      verSion,
      recoveryFile,
      uploadAddDoc
    },
    props: ["custData", "naturalData", "finacnData"],
    data() {
      return {
        crmType: '',
        selectedData: [], //选中的数据
        token: "",
        userId: "",
        pro_id: '',
        success_code: "",
        search_name: "", // 搜索目录名字
        allchecked: false, //全选全不选
        isIndeterminate: false,
        tableData: [], // 表格数据
        total: 0, // 总条数
        pageNum: 0, // 第几页
        pageSize: 10, // 每页显示的数量
        currentPage: 1,
        flag: false, //右击菜单显示
        vers: false, // 是否显示版本弹框
        add_dir_name: "", // 新建目录名称
        editName_input: "", // 编辑目录或文件名称
        is_show_add_bol: false, //  是否显示新增目录行
        isShowEditBol: false, // 是否显示编辑目录行
        file_list: [], //  文件列表数据
        right_click_data: {}, //右键右击对象
        right_click_datas: {},
        copyorcutdata: null, //复制粘贴操作
        now_index: 0, //右击选取的当前行索引
        copyOrCut: "", //判断用户进行了复制还是剪切
        isShowNature: false, //是否显示文件属性弹框
        select_nature_data: {}, //文件属性数据
        docVersionlist: [], // 文件版本列表

        uploadDocAddIsShow: false,
        addDoc: false,
        uploadData: {},
        uploadOrverupload: "", //判断用户是进行上传还是新版本上传
        addDocNumber:'',//上传新版本时允许添加的文件数量
        double_name: "", // 重名提示文字
        double_name_bol: false, //是否显示重名提示框
        companyid: "",
        parentId: 0,
        bread_crumbs: [{ title: "根目录", parentId: 0 }],
        isShowRecovery: false,
        isUploadSuccess: false,
        // hhghhghh:[],

        //选中的值
        checkboxval:[],
        //双击获得的值
        dbclickValue:'',
        hasDocAndFolder:false,
        doctypeyaru:'',
        cheId:'',
        accpet: '',//允许上传的文件类型
        verAccpet: '',//版本管理中允许上传的文件类型
        canSave: false // 是否可以点击确定 处理多次点击确定
      };
    },

    created(){
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.pro_id = this.$store.state.projectMsg.pro_id;
      this.success_code = this.code.codeNum.SUCCESS;
      this.initData()
    },
    mounted() {
      var _this = this;
      $(".el-main").on("click", function() {
        _this.flag = false;
      });
    },
    computed:{
      sourceName() {
        let obj = {
          1:'我的客户-融资客户-客户文档',
          2:'我的客户-自然人客户-客户文档',
          3:'我的客户-中介机构-客户文档'
        }
        return obj[this.$store.state.customObj.id]
      },
      versionMsg() {
          return this.$store.state.versionMsg;
      },
    },
    methods: {
        // 获取融资客户,自然人,中介机构的区分数据
      initData(){
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
          this.crmType = this.custData.crmType
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
          this.crmType = this.naturalData.crmType
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
          this.crmType = this.finacnData.crmType
        }

      },

      handleUpdateList(uploadData){
        if(uploadData.fileData.data.parentId !== this.parentId){
          return
        }
        this.getTableData()
      },

      handleUploadNewVersion({options, data}) {
        data.parentId = this.parentId // 记录当前目录，上传完成刷新判断时用
        this.$refs['RdUploader'].openSelect(options, data, true)
      },

      handleSelectionChange(selection){
        this.selectedData = selection
      },


      //  全选全不选
      checkallChangeFn() {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.allchecked) {
            this.tableData[i]["checked"] = true;
          } else {
            this.tableData[i]["checked"] = false;
          }
        }
      },
      chekcsChange(item) {
        this.checkboxval.push(item)
        this.$forceUpdate();
        let checkArr = []
        for (var i = 0; i < this.tableData.length; i++) {
          if (!this.tableData[i]["checked"]) {
            this.allchecked = false;
            $('.check_col').eq(i).parent().css({"background-color": "#ffffff"})
          } else {
            $('.check_col').eq(i).parent().css({"background-color": "rgba(244,246,249,1)"})
          }
        }
      },
      //  获取表格数据
      getTableData(queryType = 2) {
        var send_data = {
          token: this.token,
          userId: this.userId,
          pageSize: this.pageSize,
          pageNo: this.pageNum,
          data: {
            crmId: this.companyid,
            crmType: this.$route.query.ctype,
            parentId: this.parentId,
            docPaperContent:this.search_name
          }
        };
        send_data.data.docPaperContent = queryType == 1 ? '' : this.search_name
        this.$post("/doc/crm/query", send_data)
          .then((response)=> {

            if (this.success_code != response.code) {
              this.$message.error(response.msg)
              return
            }
            if(response.data.number > response.data.totalPages) {
              if(response.data.totalPages<1){
                this.tableData = [];
                return
              }
              this.pageNum = response.data.totalPages - 1;
              this.getTableData();
              return
            }

            // this.getTableData()

            this.add_dir_name = ''
            this.is_show_add_bol = false
            this.isShowEditBol = false
            this.tableData = response.data.content;
            this.canSave = false
            this.tableData.forEach(v=>{
              this.$set(v, 'checked', false)
              if (v.docType == 1) {
                v["fileIcon"] = require("../../../../common/fileIcon/FolderType1.png");
              } else {
                v["fileIcon"] = this.$utils.iconFilter(v.docName)
                v.docSize = this.handleFileSize(v.docSize);
              }
            })

            this.total = response.data.totalElements;

          })
          .catch(error=> {
            this.$message.error('网络异常')
          });
      },
      //  双击行进入目录
      dblclickRow(data, event, column) {
        console.log(data, event, column)
        if(column && column.type==="selection") return
        this.dbclickValue = data;
        if (data.docType == 0) {
          var proId = this.pro_id
          var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_preview')
          if(jurisdiction) {
            var previewData = {
              rfsId: data.rfsId,
              docId : data.docId,
              photoType: data.type,
              sourceType: 'customfile',
              docName: data.docName,
              sourceName: this.sourceName//记录日志用
            }
            this.$store.commit('previewAllFn',previewData )
          } else {
            this.$message({
              message: '当前无权限',
              type: "warning"
            });
          }
          return;
        }
        if(data.id){
          this.currentPage = 1;
          this.pageNum = 0;
          this.tableData = [];
          this.parentId = data.id;
          this.getTableData(1);
          for (var i = 0; i < this.bread_crumbs.length; i++) {
            if (data.id == this.bread_crumbs[i].parentId) {
              return;
            }
          }
          this.bread_crumbs.push({
            title: data.docName,
            parentId: data.id
          });
          console.log(this.bread_crumbs)
          this.is_show_add_bol = false;
          this.add_dir_name = ''
        }
          // this.is_show_add_bol = false;
          // this.add_dir_name = ''
          this.getTableData();
      },
      //  点击面包屑返回目录
      backDir(item) {
        this.flag = false;
        let index = this.bread_crumbs.findIndex(v=>v.parentId===item.parentId)
        this.currentPage = 1;
        this.pageNum = 0;
        this.tableData = [];
        this.parentId = item.parentId;
        this.getTableData();
        if (index == this.bread_crumbs.length - 1) {
          return;
        } else {
          this.bread_crumbs.splice(index + 1);
        }
      },
      //  新建文件夹
      newProFn() {
        if (this.is_show_add_bol) {
          return;
        }
        // 在头部添加空数据
        this.tableData.unshift({isAdd: true})
        this.noDataBol = false;
        this.is_show_add_bol = true;
        this.doctypeyaru = '1';
        this.add_dir_name = "";
      },
      //  关闭新建文件夹行
      closeAddDirFn(isAdd, id) {
        if (this.tableData.length == 0) {
          this.noDataBol = true;
        }
        if(isAdd) {
          let index = this.tableData.findIndex(v=>v.isAdd)
          this.tableData.splice(index,1)
          this.add_dir_name = "";
        } else {
          let row = this.tableData.find(v=>v.id==id)
          if(!row) return
          row.isEdit = false
          // this.tableData.splice(idx, 1)
        }
        this.canSave = false
        this.isShowEditBol = false;
        this.is_show_add_bol = false;
      },
      handleNameSave(isAdd, docName,row){
        if(this.canSave){ return }
        this.canSave = true
        if(isAdd) {
          this.jyAddDirFn()
        } else {
          if(this.editName_input === docName) {
            row.isEdit = false //当前编辑框值未修改 点击确定 编辑框取消展示 不调取接口
            this.is_show_add_bol = false;
            this.isShowEditBol = false;
            this.canSave = false
            return
          }

          if(/[\\/:*?"<>|]/g.test(this.editName_input)){
            this.$message.warning('不能包含特殊字符\/:*?"<>|');
            return
          }
          this.jyRenameDirFn(this.editName_input,row)
        }
      },
      //  验证新建文件夹行数据
      jyAddDirFn() {
          var _this = this;
          if (this.add_dir_name == "") {
            this.$message.warning("请输入文件夹名称");
            return;
          }
          let reg = /[\\/:*?"<>|]/g;
          if(reg.test(this.add_dir_name)){
              _this.$message.warning('不能包含特殊字符\/:*?"<>|');
              return;
          }
          var jy_data = {
            token: this.token,
            userId: this.userId,
            data: {
              // docSource: 2,
              parentId: this.parentId,
              crmId: this.companyid,
              docType:this.doctypeyaru,
              docName: this.add_dir_name,
              crmType: this.crmType,
              id: ''
            }
          };
          this.$post("/doc/crm/validate/docName", jy_data)
            .then((response)=> {
              if (_this.success_code == response.code) {
                if (_this.add_dir_name != response.data.docName) {
                  _this
                    .$confirm(
                      "已有相同名称的文件夹，是否以 " +
                      response.data.docName +
                      " 命名文件夹",
                      "重名提示",
                      {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                        closeOnClickModal: false
                      }
                    )
                    .then(() => {
                      this.canSave = false
                      _this.saveAddDirFn()
                    })
                    .catch(() => {
                      this.canSave = false
                    });
                } else {
                  _this.add_dir_name = response.data.docName;
                  _this.saveAddDirFn();
                  _this.$message({
                    message: '成功',
                    type: "success"
                  });
                }
              } else {
                _this.$message({
                  message: response.msg,
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error, 111);
            });
        
      },
      //  重命名提示框确认
      okDoubleModule() {
        this.double_name_bol = false;
        this.saveAddDirFn();
      },
      //  关闭重名提示框
      cancleDoubleModule() {
        this.double_name_bol = false;
        this.double_name = "";
        return;
      },
      //  提交新建文件夹行数据
      saveAddDirFn() {
        let _this = this
        var send_data = {
          token: _this.token,
          userId: _this.userId,
          sourceName:this.sourceName,
          data: {
            crmId: this.companyid,
            docId: "",
            docType: "1",
            parentId: this.parentId,
            docName: _this.add_dir_name,
            crmType: this.crmType
          }
        };
        this.$post("/doc/crm/insert", send_data)
          .then((response)=> {
            if (this.success_code == response.code) {
              this.is_show_add_bol = false;
              this.canSave = true
              this.getTableData();
            } else {
              this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  下载
      downloadFile() {
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
          //this.companyNames = this.custData.name;
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
          //this.companyNames = this.naturalData.name;
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
          //this.companyNames = this.finacnData.name;
        }
        var _this = this;
        var select_data = this.selectedData;
        if (select_data.length == 0) {
          this.$message({
            message: "请选择要下载的文件",
            type: "warning"
          });
          return;
        }
        var download_arr = [];
        var log_arr = [];
        for (var i = 0; i < select_data.length; i++) {
          if (select_data[i]["docType"] != "0") {
            this.$message({
              message: "文件夹不支持下载，请选择下载文件",
              type: "warning"
            });
            return;
          } else {
            log_arr.push({
              crmId: this.companyid,
              docName: select_data[i].docName
            });
            download_arr.push({
              name: select_data[i].docName,
              id: select_data[i].docId,
              ids: select_data[i].id
            });
          }
        }
        this.downLoadDoc(log_arr, download_arr)
        // var index = 0;
        // var fn = function() {
        //   if (index <= log_arr.length - 1) {
        //     var crmId = log_arr[index].crmId;
        //     var docName = log_arr[index].docName;
        //     index++;
        //     if (!docName) {
        //       return;
        //     } else {
        //       var send_data = {
        //         token: _this.token,
        //         userId: _this.userId,
        //         data: {
        //           crmId: crmId,
        //           docName: docName
        //         }
        //       };
        //       _this
        //         .$post("/doc/crm/log/addDownload", send_data)
        //         .then((response)=> {
        //           fn();
        //         })
        //         .catch(function(error) {
        //           console.log(error);
        //         });
        //     }
        //   } else {
        //     return;
        //   }
        // };
        // fn();
        // this.$store.commit("download", download_arr);
      },

      downLoadDoc(log_arr, download_arr) {
        if(this.$store.state.isPC) {
          let arr_pc = this.selectedData.map(item => {
            return {
              docId: item.docId,
              docType: item.docType,
              id: item.id,
              docName: item.docName,
              source: 2, // 文件源： 1底稿 0项目文档 2客户文档
              parentId: item.parentId,
              projectId: 0,
              parentName: 0,
              sourceName:this.sourceName
            }
          })
          this.$store.commit("download", arr_pc);
          return
        }

        // var index = 0;
        // var fn = ()=> {
        //   if (index <= log_arr.length - 1) {
        //     var crmId = log_arr[index].crmId;
        //     var docName = log_arr[index].docName;
        //     var id = log_arr[index]
        //     console.log(id,'id')
        //     index++;
        //     if (!docName) {
        //       return;
        //     } else {
        //       var send_data = {
        //         token: this.token,
        //         userId: this.userId,
        //         sourceName:this.sourceName,
        //         data: {
        //           crmId: crmId,
        //           docName: docName,
        //           id
        //         }
        //       };
        //       this.$post("/doc/crm/log/addDownload", send_data).then((response)=> {
        //           fn();
        //         })
        //         .catch(function(error) {
        //           console.log(error);
        //         });
        //     }
        //   } else {
        //     return;
        //   }
        // };
        // fn();

        download_arr.forEach(item => {
          this.addLog(item)
        })
        this.$store.commit("download", download_arr);
      },
      // 下载记录日志
      addLog(item) {
        console.log(item,'item')
        this.$post('/doc/crm/log/addDownload',{
          sourceName:this.sourceName,
          data: {
            crmId: this.companyid,
            docName: item.name,
            id: item.ids
          }
        }).then(res => {
          if(res.code != 0) {
            this.$message.warning(res.msg)
            return
          }

        }).catch(err => {console.log(err)})
      },
      //  上传弹框
      uploadFile() {
        this.uploadData = {
          crmId: this.companyid,
          parentId: this.parentId,
          docSource: 2,//客户文档固定为2
        };

        let options={
          multiple: true,
          accept: ''
        }

        this.$refs['RdUploader'].openSelect(options, this.uploadData)

      },

      //文件上传
      docUpload(uploadData) {
        // console.log(12, uploadData)
        let data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            crmId: this.companyid,
            docId: uploadData.docId,
            docType: 0,
            parentId: uploadData.fileData.data.parentId,
            docName: uploadData.docName,
            rfsId: uploadData.fileData.rfsId,
            crmType: this.crmType,
            docSize: uploadData.fileData.size
          }
        };

        this.$post("/doc/crm/insert", data)
          .then((response)=> {
            if(response.code != this.success_code) {
              this.$message.error(response.msg || '网络异常')
              return
            }
            this.$refs['RdUploader'].handleUploadSuccess(uploadData.tId)
            //this.handleUpdateList(uploadData)
            this.insertUploadedFileCustomDoc(response.data)

          })
          .catch((error)=> {
            console.log(error)
          });

      },
      insertUploadedFileCustomDoc(data) {
          let fileCrmId = ''
          let fileParentId =  ''
          let crmId = this.companyid
          let curDirId = this.parentId
          if(data.uploadDirYes) {
              // 判断是否有文件夹信息
              if(!data.parentInfo) return
              // 判断是否在当前页面
              fileCrmId = data.parentInfo.projectId
              fileParentId = data.parentInfo.parentId
          } else {
              fileCrmId = data.crmId
              fileParentId = data.parentId
          }
          // 判断是否在当前目录下，如果再则更新列表，否则不更新
          if(fileCrmId !== data.crmId || curDirId!== fileParentId) return

          // 处理文件夹上传：
          let fileData  =  data.uploadDirYes ? data.parentInfo : data

          // 处理图标
          fileData.fileIcon = this.$utils.iconFilter(fileData.docName)
          fileData.docSize = this.handleFileSize(fileData.docSize)

          this.tableData.unshift(fileData)
      },

      //  删除
      deleteFile(id) {
        var _this = this;
        var arr = this.selectedData;
        console.log('客户文档22',this.selectedData)
        if (id == "") {
          if (arr.length == 0) {
            _this.$message({
              type: "warning",
              message: "请选择文件"
            });
            return;
          }
          var arrids = []
          for (var i = 0; i < arr.length; i++) {
            if (arr[i]["lockState"] != -1) {
              return this.$message({
                message: "文件已锁定，您不可以进行该操作",
                type: "warning"
              });
            }
            arrids.push(arr[i].id)
          }
        }
        console.log(arrids)
        let docIds = ''
        if (id != "") {
          if (this.right_click_datas["lockState"] != -1) {
            return this.$message({
              message: "文件已锁定，您不可以进行该操作",
              type: "warning"
            });
          }
          docIds = id;
        } else {
          docIds = arrids.join(",");
        }
        this.$confirm(
          "确认要把文件放入回收站吗?删除的文件可随时通过回收站还原",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
             var send_data = {
              token: this.token,
              userId: this.userId,
              sourceName:this.sourceName,
              data: {
                docIds: docIds
              }
            };
            this.$post("/doc/crm/deleteCrmDoc", send_data).then((response)=> {
            if (this.success_code == response.code) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.right_click_data = {};
              this.getTableData();
              console.log(this.tableData)
              this.allchecked = false;
            } else {
              this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
          })
          .catch(() => {});
      },
      // deleteFile (ids) {
      //   var send_data = {
      //     token: this.token,
      //     userId: this.userId,
      //     data: {
      //       docIds: ids
      //     }
      //   };
      //   this.$post("/doc/crm/deleteCrmDoc", send_data).then((response)=> {
      //       if (this.success_code == response.code) {
      //         this.$message({
      //           message: "删除成功",
      //           type: "success"
      //         });
      //         this.right_click_data = {};
      //         this.currentPage = 1;
      //         this.pageNum = 0;
      //         this.getTableData();
      //         this.allchecked = false;
      //       } else {
      //         this.$message({
      //           message: response.msg,
      //           type: "error"
      //         });
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // },
      //  版本
      versionFile() {
        var _this = this;

        if (this.selectedData.length != 1) {
          this.$message({
            type: "warning",
            message: "请选择至少一条数据"
          });
        } else {
          if (this.selectedData[0].docType != 0) {
            this.$message({
              type: "warning",
              message: "文件夹不支持版本查看"
            });
            return;
          }
          var send_data = {
            token: this.token,
            userId: this.userId,
            sourceName:this.sourceName,
            pageNo: 1,
            data: {
              docId: this.selectedData[0].docId,
              docName:this.selectedData[0].docName,
              parentId: this.bread_crumbs[this.bread_crumbs.length-1].parentId
            }
          };
          this.$post("/doc/crm/getDocVersionList", send_data)
            .then((response)=> {
              if (this.success_code == response.code) {
                this.docVersionlist = response.data;
                this.vers = true;
                this.verAccpet = this.selectedData[0].type;
              } else {
                this.$message({
                  message: response.msg,
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      },
      //  版本弹框点上传新版本触发的方法
      newuploadFn(uploadData) {
        //文件上传
          let data = {
            token: this.token,
            userId: this.userId,
            sourceName:this.sourceName,
            data: {
              // projId: uploadData.fileData.data.projId,
              docId: uploadData.fileData.data.docId, // 注意，不是本次文件上传的docId，是文件之前的docId
              //   docType: 0,
              //   parentId: 0,
              docName: uploadData.docName,
              docRfs: uploadData.fileData.rfsId,
              docSize: uploadData.fileData.size,
              updateBy: this.userId
            }
          };
          this.$post("/doc/crm/addDocVersion", data)
            .then((response)=> {
              if (response.code != this.success_code) {
                this.$message.error(response.msg)
                return
              }
              // 查询列表
              // this.handleUpdateList(uploadData)
              this.$refs['RdUploader'].handleUploadSuccess(uploadData.tId)
              this.getTableData()
            })
            .catch(function(error) {
              console.log(error);
            });
      },

      //  关闭版本模态框
      colseModuleFn() {
        this.vers = false;
        // this.getTableData();
      },
      //  回收站
      recoverFile() {
        this.isShowRecovery = true;
        this.$utils.getSysPermissionFn();
      },
      //  搜索
      enterEvent(e) {
        var e = window.event || e;
        switch (e.keyCode || e.which) {
          case 13: //回车
            this.searchFn();
            break;
        }
      },
      searchFn() {
        this.currentPage = 1;
        this.getTableData();
      },
      //  分页
      exchangeCurrentPage() {
        this.allchecked = false;
        this.tableData = [];
        this.getTableData();
      },
      onPageChange(currentPage) {
        this.currentPage = currentPage;
        this.getTableData()
        console.log(this.currentPage)  //点击第几页
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData();
      },
      // row右键事件
      rightEventRow(row, column, $event){
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.doctypeyaru = row.docType
        this.cheId = row.id
        this.right_click_datas = row;
        this.right_click_data = row;

      },
      //  table右键事件
      rightEvent() {
        var e = event;
        e.preventDefault();
        // let custdri = false;
        // let custdoc = false;
        // console.log(111,  this.selectedData)
        // for(var k=0;k<this.selectedData.length;k++){
        //   if(this.selectedData[k].docType == 1){
        //     custdri = true;
        //   } else if(this.selectedData[k].docType == 0){
        //     custdoc = true;
        //   }
        // }
        // if(custdri  && custdoc){
        //   this.hasDocAndFolder = true
        // }else{
        //   this.hasDocAndFolder = false;
        // }


        this.hasDocAndFolder = this.selectedData.findIndex(v=>v.docType==1)>-1 && this.selectedData.findIndex(v=>v.docType==0)>-1
        this.flag = true;
        this.$nextTick(() => {
          this.flag = true;
        });
        var e = event;
        $("#rightM").css({ display: "none" });
        setTimeout(() => {
          $("#rightM").css({
            top: e.clientY + 10,
            left: e.clientX + 10,
            display: "block"
          });
          if (e.clientY + 10 >= $(window).height() - $("#rightM").height()) {
            $("#rightM").css({
              top: $(window).height() - $("#rightM").height() - 20
            });
          } else if (e.clientX + 10 >= $(window).width() - $("#rightM").width()) {
            $("#rightM").css({
              left: $(window).width() - $("#rightM").width() - 20
            });
          }
        }, 10);
      },
      //  右键监听事件
      rightMenuClickFn(data) {
        if (!data) return;
        switch (data) {
          case "open":
            this.dblclickRow(this.right_click_datas);
            break;
          case "preview":
            this.rightMenuViewFn();
            break;
          case "download":
            this.rightMenuDowFn();
            break;
          case "upload":
            this.rightMenuUploadFn();
            break;
          case "delete":
            this.rightMenuDeleteFn();
            break;
          case "rename":
            this.docReNameFn();
            break;
          case "copy":
            this.docCopyFn();
            break;
          case "cut":
            this.docCutFn();
            break;
          case "paste":
            this.docPasteFn();
            break;
          case "lock":
            this.docLockFn();
            break;
          case "attributes":
            this.rightMenuNatureFn();
            break;
        }
      },
      //  右键预览
      rightMenuViewFn() {
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
          //this.companyNames = this.custData.name;
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
          //this.companyNames = this.naturalData.name;
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
          //this.companyNames = this.finacnData.name;
        }
        console.log(this.right_click_data,'___')
        var proId = this.pro_id
        var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_preview')
        if(jurisdiction ) {
          var _this = this;
          if (this.judgeOperating()) {
            this.$store.commit('previewAllFn',{
                  rfsId: _this.right_click_datas.rfsId,
                  docId: _this.right_click_datas.docId,
                  photoType:_this.right_click_datas.type,
                  sourceType: 'customfile',
                  docName: _this.right_click_datas.docName,
                  sourceName: this.sourceName//记录日志用
            })
                /**
                var send = {
                  token: this.token,
                  userId: this.userId,
                  data: {
                    crmId:this.companyid,
                    docName: this.right_click_datas.docName
                  }
                };
                this.$post("/doc/crm/log/addPreview", send)
                  .then((response)=> {

                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              */
          }
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }
      },
      //  右键下载
      rightMenuDowFn() {
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
          //this.companyNames = this.custData.name;
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
          //this.companyNames = this.naturalData.name;
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
          //this.companyNames = this.finacnData.name;
        }
        var proId = this.pro_id
        var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_down')
        if(jurisdiction ) {
          if (this.judgeOperating()) {
            let download_arr = [];
            let log_arr = [];
            let unavailable = []
            for (let i = 0; i < this.selectedData.length; i++) {
              if (this.selectedData[i]["docType"] != "0") {
                unavailable.push(this.selectedData[i].docName)
              } else {
                log_arr.push({
                  crmId: this.companyid,
                  docName: this.selectedData[i].docName
                });
                download_arr.push({
                  name: this.selectedData[i].docName,
                  id: this.selectedData[i].docId,
                  ids: this.selectedData[i].id
                });
              }
            }

            if(unavailable.length){
              this.$message.error('文件夹不支持下载，请选择下载文件')
              return
            }

            this.downLoadDoc(log_arr, download_arr)

            // var send_data = {
            //   token: this.token,
            //   userId: this.userId,
            //   data: {
            //     crmId:this.companyid,
            //     docName: this.right_click_data.docName
            //   }
            // };
            // this.$post("/doc/crm/log/addDownload", send_data)
            //   .then((response)=> {})
            //   .catch(function(error) {
            //     console.log(error);
            //   });
            // this.$store.commit("download", [
            //   {
            //     name: this.right_click_data.docName,
            //     id: this.right_click_data.docId
            //   }
            // ]);
          }
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }
      },
      //  右键上传新版本
      rightMenuUploadFn() {
        if (this.selectedData.length > 1 || this.selectedData.length == 0) {
          this.$message.warning("只能对一个文件上传新版本");
          return;
        }
        let docObj = this.selectedData[0]

        if (docObj["docType"] != "0") {
          this.$message.warning("文件夹不支持上传新版本，请选择文件");
          return;
        }
        if (docObj.lockState != '-1') {
          this.$message.warning('文件已锁定，不允许上传新版本');
          return;
        }

        let hasPower = this.$utils.checkSystemtPermissionAjax('crm_financing__file_dition')

        console.log('hasPower', hasPower)

        if(!hasPower.data) {
          this.$message.error(hasPower.msg)
          return
        }

        let accept = ''
        let type = docObj.type
        if(type == 'doc' || type == 'docx'){
          accept = "doc,docx";
        } else if(type == 'xls' || type == 'xlsx') {
          accept = "xls,xlsx";
        } else if(type == 'rtf'){
          accept = "doc,docx,rtf";
        } else {
          accept = type;
        }

        let data = {
          crmId: this.companyid,
          parentId: this.parentId,
          docSource: 2,//客户文档固定为2
          docId: docObj.docId,
          projId: docObj.crmId
        };

        let options={
          multiple: false,
          accept: accept
        }

        this.$refs['RdUploader'].openSelect(options, data, true)

      },
      //  提交上传新版本数据
      uploadSaveFn() {
        this.$refs.rightmenu_upload.submit();
      },
      //  右键删除--1.2.1修改为右键可删除多条
      rightMenuDeleteFn() {
        let ids = this.selectedData.map(v=>v.id)
        if(!ids.length) {
          this.$message.warning('请选择要删除的数据')
          return
        }
        var jurisdiction = rightSysPermissionFn(this.pro_id,'crm_financing__file_del')
        if(jurisdiction ) {
          this.deleteFile (ids.toString())
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }
      },
      //  右键重命名
      docReNameFn() {
        var proId = this.pro_id
        let access = this.$utils.checkSystemPermission('crm_financing__file_rename')
        if(!access){
          this.$message.warning('没有权限')
          return
        }
        // 说明有正在重命名的不可重命名
        if (this.isShowEditBol) {
          this.$message.warning('请先关闭另外一个文件的重命名输入')
          return
        }
        this.isUnlock().then(res => {
          if (!res) return;
          let row = this.tableData.find(v=>v.id == this.right_click_data.id)
          // console.log('row',row)
          if(!row) return
          // 回显文件名
          this.editName_input = row.docType==1 ? row.docName : row.docName.substr(0, row.docName.lastIndexOf("."))
          // 设置可编辑状态
          this.$set(row, 'isEdit', true)
          this.isShowEditBol = true
        });

      },
      //  验证右键重命名数据
      jyRenameDirFn(name,row) {
        console.log(name)
        let crmType = ''
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
          crmType = this.custData.crmType
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
          crmType = this.naturalData.crmType
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
          crmType = this.finacnData.crmType
        }
        var _this = this;
        if (name == "") {
          this.$message({
            message: "请输入文件名称",
            type: "warning"
          });
          return;
        }
        // console.log(name)
         let reg = /[\\/:*?"<>|]/g;
        if(reg.test(name)){
            _this.$message.warning('不能包含特殊字符\/:*?"<>|');
            return;
        }
        var jy_data = {
          token: this.token,
          userId: this.userId,
          data: {
            parentId: this.parentId,
            crmId: this.companyid,
            docName: name,
            docType:this.doctypeyaru,
            id:this.cheId,
            crmType: crmType
          }
        };
        this.$post("/doc/crm/validate/docName", jy_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              if (name != response.data.docName) {
                name = response.data.docName;
                _this
                  .$confirm(
                    "已有相同名称的文件夹，是否以 " +
                    response.data.docName +
                    " 命名文件夹",
                    "重名提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }
                  )
                  .then(() => {
                    let autoName = response.data.docName
                    // console.log(autoName)
                    // $(".rename_input").val(autoName);
                    _this.saveRenameDirFn(autoName,row);
                  })
                  .catch(() => {});
              } else {
                _this.saveRenameDirFn(name,row);
              }
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  提交右键重命名数据
      saveRenameDirFn(name,row) {
        console.log(name, 'autoName')
        let crmType = ''
        if (this.$store.state.customObj.id == 1) {
          crmType = this.custData.crmType
          //this.companyNames = this.custData.name;
        } else if (this.$store.state.customObj.id == 2) {
          crmType = this.naturalData.crmType
          //this.companyNames = this.naturalData.name;
        } else if (this.$store.state.customObj.id == 3) {
          crmType = this.finacnData.crmType
          //this.companyNames = this.finacnData.name;
        }
        // var originname = $(".rename_input").val();
        //   console.log(name)
        if (row.docType == 1) {
          var type = '';
          var originname = name // this.add_dir_name;
        } else {
          var type = row.type;
          var originname = name + "." + type // this.add_dir_name + "." + type;
        }
        //name = name.replace(/[\,\|\/\'\*\:\;\"\L\<\>\?\\]/g, "");

       // console.log(name)
        //$(".rename_input").val(name);
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            id: row.id,
            docName: originname,
            originaName: row.docName,
            crmType: crmType
          }
        };
        _this
          .$post("/doc/crm/reName", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              // $(".rename_box").remove();
              _this.getTableData();
              let item = this.tableData.find(v=>v.id===row.id)
              if(!item) return
              item.isEdit = false
              this.add_dir_name = ''
              this.is_show_add_bol = false;
              this.isShowEditBol = false;

              // for (var i = 0; i < _this.tableData.length; i++) {
              //   if (_this.right_click_data.id == _this.tableData[i].id) {
              //     $(".name_col")
              //       .eq(i)
              //       .children()
              //       .css("display", "block");
              //   }
              // }
              _this.right_click_data = {};
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  右键复制
      docCopyFn() {
        var proId = this.pro_id
        var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_copy')
        if(jurisdiction ) {
          this.copyOrCut = "copy";
          // console.log(this.copyOrCut)
          var arr = this.selectedData;
          // console.log(this.copyorcutdata)
          // console.log(arr.length)
          this.copyorcutdata = null
          if (this.copyorcutdata == null && arr.length == 0) {
            // console.log(this.copyorcutdata)
            this.copyorcutdata = [this.right_click_datas];
          } else if (this.copyorcutdata == null && arr.length != 0) {

            this.copyorcutdata = arr;
            // console.log(this.copyorcutdata)
            this.$message({
              message: '复制成功',
              type: "success"
            });
          }
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }
      },
      //  右键剪切
      docCutFn() {
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
        }
        var proId = this.pro_id
        var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_shear')
        if(jurisdiction ) {
          this.isUnlock().then(res => {
            if (!res) {
              return;
            } else {
              this.copyOrCut = "cut";
              console.log(this.copyOrCut)
              var arr = this.selectedData;
              console.log(arr)
              var doc = []; //文件
              var dir = [];  //文件夹
              var docstr = '';
              var dirstr = '';
              for(var i=0; i<arr.length; i++){
                if(arr[i].docType == 1){
                  doc.push(arr[i].id)
                  docstr = doc.join(",")

                }else{
                  dir.push(arr[i].id)
                  dirstr = dir.join(",")
                }
              }
              //console.log(docstr)
              //console.log(dirstr)
              console.log(this.copyorcutdata)
              console.log(arr)
              //return
              var url = this.copyOrCut = "/doc/crm/docCrmIsCut"
              var _this = this;
              var send_data = {
                token: this.token,
                userId: this.userId,
                sourceName:this.sourceName,
                data: {
                  doc: dirstr,
                  dir: docstr,
                  crmId: this.companyid
                }
              };
              _this.$post(url, send_data).then((response)=> {
                if (_this.success_code == response.code) {
                  console.log(_this.copyorcutdata)
                  console.log(arr.length)
                  _this.copyorcutdata = null
                  if (_this.copyorcutdata == null && arr.length == 0) {
                    console.log(555)
                    _this.copyorcutdata = [_this.right_click_datas];
                  } else if (_this.copyorcutdata == null && arr.length != 0) {
                    _this.copyorcutdata = arr;
                    console.log(666)
                    console.log(_this.copyorcutdata)
                    _this.$message({
                      message: '剪切成功',
                      type: "success"
                    });

                  }
                } else {
                  _this.$message({
                    message: response.msg,
                    type: "error"
                  });
                }
              })
                .catch(function(error) {
                  console.log(error);
                });
            }
          });
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }

      },
      //  右键粘贴
      docPasteFn(that) {
        console.log(that)
        console.log(this.copyOrCut)

        if (this.copyOrCut == "") {
          this.$message({
            type: "warning",
            message: "请先复制或剪切"
          });
          return;
        }
        let crmType = ''
        if (this.$store.state.customObj.id == 1) {
          crmType = this.custData.crmType
          //this.companyNames = this.custData.name;
        } else if (this.$store.state.customObj.id == 2) {
          crmType = this.naturalData.crmType
          //this.companyNames = this.naturalData.name;
        } else if (this.$store.state.customObj.id == 3) {
          crmType = this.finacnData.crmType
          //this.companyNames = this.finacnData.name;
        }
        //console.log(this.copyorcutdata)  //剪切的数据
        //console.log(this.dbclickValue)  //双击进去的数组
        //console.log(this.dbclickValue.length)
        var copuValue = [];
        var doc = [];
        var dir = [];
        var docstr = '';
        var dirstr = '';
        var arryaru = [];
        var opop = '';
        console.log(this.copyorcutdata)
        for(var i =0;i < this.copyorcutdata.length; i++){
          copuValue.push(this.copyorcutdata[i].id)
          console.log(this.copyorcutdata[i].docType)
          arryaru.push(this.copyorcutdata[i].id)
          console.log(arryaru)
          opop = arryaru.join(",")
          if(this.copyorcutdata[i].docType == 1){
            doc.push(this.copyorcutdata[i].id)
            docstr = doc.join(",")
          }else{
            dir.push(this.copyorcutdata[i].id)
            dirstr = dir.join(",")
          }
        }
        console.log(opop)
        // if(this.copyOrCut == 'copy'){
        //     var arrs = [];
        //     arrs.push(this.dbclickValue)
        //     for (var k = 0; k < arrs.length; k++) {
        //         var item = arrs[k].id;
        //         if (copuValue.indexOf(item) > -1) {
        //             this.$message({
        //                 message: '当前文件夹不可粘贴',
        //                 type: "warning"
        //             });
        //             return
        //         }
        //     }
        // }

        var url =
          this.copyOrCut == "copy"
            ? "/doc/crm/copyCrmDocs"
            : "/doc/crm/cutCrmDocs";
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            ids: opop,
            doc:dirstr,
            dir:docstr,
            parentId: this.parentId,
            crmType: crmType
          }
        };
        //   let arr = this.copyorcutdata;
        //   console.log(arr)
        //   for (var i = 0; i < arr.length; i++) {
        //     arr[i] = arr[i].id;

        //   }
        //   console.log(arr)
        //   console.log(arr.join(","))
        //   send_data.data.ids = arr.join(",");
        //   console.log(send_data.data.ids);
        _this
          .$post(url, send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              //_this.right_click_data = {};
              //_this.copyorcutdata = null;
              //_this.copyOrCut = "";
              _this.getTableData();
              console.log(_this.copyorcutdata)
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  右键锁定
      docLockFn() {
        var proId = this.pro_id
        var jurisdiction = rightSysPermissionFn(proId,'crm_financing__file_lock')
        if(jurisdiction ) {
          var _this = this;
          if (this.judgeOperating()) {
            if (this.right_click_data.lockState != -1) {
              this.$confirm("该文件已锁定，是否解锁", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                _this.unlockFn();
              });
            } else {
              this.$confirm("是否锁定该文件", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  _this.lockingFn();
                })
                .catch(() => {
                });
            }
          }
        } else {
          this.$message({
            message: '当前无权限',
            type: "warning"
          });
        }
      },
      //  解锁
      unlockFn() {
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            docId: this.right_click_data.docId,
            dirName:this.bread_crumbs[this.bread_crumbs.length-1].parentId == 0 ? '' : this.bread_crumbs[this.bread_crumbs.length-1].title
          }
        };
        this
          .$post("/doc/crm/setDocUnLock", send_data)
          .then((response)=> {
            if (this.success_code == response.code) {
              this.$message({
                message: "该文件已解锁",
                type: "success"
              });
              this.right_click_data = {};
              this.getTableData();
            } else {
              this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  锁定
      lockingFn() {
        if (this.$store.state.customObj.id == 1) {
          this.companyid = this.custData.id;
        } else if (this.$store.state.customObj.id == 2) {
          this.companyid = this.naturalData.id;
        } else if (this.$store.state.customObj.id == 3) {
          this.companyid = this.finacnData.id;
        }
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          sourceName:this.sourceName,
          data: {
            docId: this.right_click_data.docId,
            crmId:this.companyid,
            dirName:this.bread_crumbs[this.bread_crumbs.length-1].parentId == 0 ? '' : this.bread_crumbs[this.bread_crumbs.length-1].title
          }
        };
        _this
          .$post("/doc/crm/setDocLock", send_data)
          .then((response)=> {
            if (_this.success_code == response.code) {
              _this.$message({
                message: "该文件已加锁",
                type: "success"
              });
              _this.right_click_data = {};
              _this.getTableData();
            } else {
              _this.$message({
                message: response.msg,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //  右键文件属性
      rightMenuNatureFn() {
        if (this.judgeOperating()) {
          this.isShowNature = true;
          var _this = this;
          var send_data = {
            token: this.token,
            userId: this.userId,
            sourceName: this.sourceName,
            data: {
              docId: this.right_click_data.docId
            }
          };
          _this
            .$post("/doc/crm/getDocAttributeInfo", send_data)
            .then((response)=> {
              if (_this.success_code == response.code) {
                _this.select_nature_data = response.data;
                _this.select_nature_data["docSize"] = _this.handleFileSize(
                  parseInt(_this.select_nature_data["docSize"])
                );
                _this.right_click_data = {};
              } else {
                _this.$message({
                  message: response.msg,
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      },
      //  获取表格选取的条数
      getCheckLength() {
        var arr = [];
        console.log(this.tableData)
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i]["checked"]) {
            arr.push(this.tableData[i]);
          }
        }
        return arr;
      },
      //  右击判断文件及文件夹的操作
      judgeOperating() {
        if (this.right_click_data.docType != 0) {
          this.$message({
            message: "文件夹不支持该功能，请选择文件",
            type: "warning"
          });
          return false;
        } else {
          return true;
        }
      },
      //  回收站返回至客户文档
      backToCustom() {
        this.isShowRecovery = false;
        this.currentPage = 1;
        this.pageNum = 0;
        this.getTableData();
        this.$utils.getSysPermissionFn();
      },
      //  关闭上传弹框
      uploadAddDocClose() {
        this.uploadDocAddIsShow = false;
        this.addDoc = false;
        this.$refs.uploadref.destroy();
        this.right_click_data = {};
        this.uploadData = {};
        this.getTableData();
      },
      //  处理文件大小
      handleFileSize(limit) {
        var size = "";
        if (limit < 0.1 * 1024) {
          //小于0.1KB，则转化成B
          size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
          //小于0.1MB，则转化成KB
          size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
          //小于0.1GB，则转化成MB
          size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
          //其他转化成GB
          size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        if (dou == "00") {
          //判断后两位是否为00，如果是则删除00
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
      },
      //  文件是否锁定能否进行某种操作
      async isUnlock(value) {
        var _this = this;
        if (!value) {
          value = this.right_click_datas;
        }
        if (typeof Array.isArray === "function") {
          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              if (value[i].lockState != -1) {
                _this.$message({
                  message: "文件已锁定，您不可以进行该操作",
                  type: "warning"
                });
                return false;
              } else {
                return true;
              }
            }
          } else {
            if (value.lockState != -1) {
              _this.$message({
                message: "文件已锁定，您不可以进行该操作",
                type: "warning"
              });
              return false;
            } else {
              return true;
            }
          }
        } else {
          if (Object.prototype.toString.call(value) === "[object Array]") {
            for (var i = 0; i < value.length; i++) {
              if (value[i].lockState != -1) {
                _this.$message({
                  message: "文件已锁定，您不可以进行该操作",
                  type: "warning"
                });
                return false;
              } else {
                return true;
              }
            }
          } else {
            if (value.lockState != -1) {
              _this.$message({
                message: "文件已锁定，您不可以进行该操作",
                type: "warning"
              });
              return false;
            } else {
              return true;
            }
          }
        }

        // function isarr() {
        //   for (var i = 0; i < value.length; i++) {
        //     if (value[i].lockState != -1) {
        //       _this.$message({
        //         message: "文件已锁定，您不可以进行该操作",
        //         type: "warning"
        //       });
        //       return false;
        //     }
        //   }
        // }

        // function isobj() {
        //   if (value.lockState != -1) {
        //     _this.$message({
        //       message: "文件已锁定，您不可以进行该操作",
        //       type: "warning"
        //     });
        //     return false;
        //   }
        // }
      },
      // 整体上传成功之后的回调
      docUploadAllsucess(){
        var _this = this;
        _this.addDoc = false;
        _this.uploadDocAddIsShow = false;
        _this.right_click_data = {};
        // _this.uploadAddDocClose();
        _this.uploadData = {};
        _this.getTableData();
      },
      //  rowClass ({row, rowIndex}) {
      //    console.log(this.checkboxval)
      //     if (!this.checkboxval) return
      //     if (this.checkboxval.includes(row)) {
      //         return {"background-color": "rgba(244,246,249,1)"}
      //     }
      // },
      // 选中文件的
      // handleSelectionChange(val) {
      //   console.log(val, 232)
      //     this.checkboxval = val;
      //     console.log(this.checkboxval, 23, this.checkboxval)
      // },
    },

    watch: {
      versionMsg(val) {
        // docSource 为0是项目文档， 1是底稿管理，2是客户文档
        if(val.docSource!=2) return

        let idx = this.tableData.findIndex(v=>v.docId == val.docId)
        // 当前无数据，return
        if(idx<0) return

        // 需要更新的数据
        let updatedObj = {
          userName: val.userName,
          docSize: val.docSize,
          updateBy: val.updateBy,
          updateTime: val.updateTime,
          docVersionNumber: val.docVersionNumber,
          docRfs: val.docRfs,
          rfsId: val.docRfs
        }

        Object.assign(this.tableData[idx], updatedObj)

        // 版本号放大样式处理
        let el = $('#multipleTable tr').eq(idx+1).find('.version-style')
        el.addClass('rdpulse')
        setTimeout(()=>{
          el.removeClass('rdpulse')
        },3000)
      },
      currentPage(newV, oldV) {
        this.pageNum = newV - 1;
        // this.exchangeCurrentPage();
      },
      isShowNature() {
        if (!this.isShowNature) {
          this.right_click_data = {};
        }
      },
      // vers() {
      //   if (!this.vers) {
      //     this.getTableData();
      //   }
      // }
    }
  };
</script>
<style scoped lang="scss" type="text/css">
  .version-style{
    display: inline-block;
  }
  .customfile {
    position: relative;
  .el-breadcrumb-ul {
    overflow-x:auto;

    overflow-y:hidden;
  // margin: 8px 0;
    display: flex;
    align-items: center;
    min-height: 28px;
    border: 1px solid #D7D7D7;
    margin-left: 5px;
    padding-left: 7px;
    background: #F7F8FA;
    border-radius: 1px;
    width:80%;
    flex-wrap:nowrap;
    white-space: nowrap;
    line-height:28px;

  }
  .el-breadcrumb-item-li {
    cursor: pointer;
    float: left;
    flex-wrap:nowrap;
  // width:100%;
  // overflow:hidden;
    padding: 0 5px;
  // overflow-x:auto;
  // margin-right:10px;

  }

  .func_box {
    position: relative;
  .el-button {
    float: left;
    margin-left: 10px;
  }
  .el-input {
    width: 217px;
    float: right;
    height: 32px;
    line-height: 32px;
  }
  .recov_btn {
    float: right;
  }
  .load_inp {
    position: absolute;
    width: 73px;
    height: 32px;
    left: 130px;
    opacity: 0;
  }
  }
  .file_box {
    width: 100%;
    padding: 20px 10px 10px;
    box-sizing: border-box;
  .file_tit {
    width: 100%;
    height: 42px;
  .el-checkbox {
    float: left;
    width: 65%;
    height: 100%;
    margin: 0;
    margin-right: 5%;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .time_tit {
    float: right;
    width: 30%;
    height: 100%;
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
    text-align: right;
  }
  }
  .file_list {
    width: 100%;
  .el-checkbox-group {
  .el-checkbox {
    width: 100%;
    margin: 0;
    border-bottom: 1px solid #e7e7e7;
    padding: 10px 0;
  &:hover {
     background: skyblue;
   }
  .file_icon {
    float: left;
    width: 5%;
    height: 38px;
  }
  .cont_left {
    float: left;
    width: 55%;
    height: 100%;
    margin-right: 4%;
    text-align: left;
  .file_name {
    vertical-align: middle;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .edit_name {
    vertical-align: middle;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
    box-sizing: border-box;
  .el-input {
    width: 50%;
    height: 100%;
  }
  .el-button {
    height: 20px;
    width: 20px;
    padding: 3px;
  }
  }
  .power_box {
  span {
    display: inline-block;
    margin-left: 10px;
    line-height: 20px;
    font-size: 12px;
  }
  }
  }
  .cont_right {
    float: right;
    width: 30%;
    height: 100%;
    text-align: right;
  .cont_time {
    color: #ccc;
    font-size: 12px;
    line-height: 20px;
  }
  .cont_version {
  span:nth-child(1) {
    font-size: 14px;
    font-weight: 500;
    display: inline-block;
    margin-right: 10px;
  }
  span:nth-child(3) {
    font-size: 14px;
    color: blue;
    display: inline-block;
    margin: 0 10px;
  }
  }
  }
  }
  }
  }
  }
  .rightMenu {
    position: fixed;
    z-index: 12;
  }
  .nodata_box {
    text-align: center;
    height: 57px;
    line-height: 57px;
    color: #909399;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
  }
  }
  .customfile {
  .table_thead {
  // margin-top: 10px;
    height: 46px;
    line-height: 46px;
    text-align: left;
  // background-color: #fafafa;
  // font-weight: bold;
  .el-col {
    padding-left: 25px;
  }
  }
  .tb_row {
  // margin-top: 5px;
    text-align: left;
    padding-left: 25px;
    height: 64px;
    line-height: 64px;
  // border-bottom: 1px solid #ebeef5;
  .name_col {
    display: flex;
  .name_col_left {
    width: 30px;
  img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 15px 0;
  }
  }
  .name_col_right {
    position: relative;
    margin-left: 3px;
    width: 75%;
  .name_cell{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lock {
    position: absolute;
    line-height: 1;
    font-size: 12px;
    bottom: 5px;
  }
  }
  }
  }
  .tb_row:hover {
    background-color: #f5f7fa;
  }
  .ver_box {
    text-align: left;
    padding-left: 25px;
    color: #999;
    line-height: 1;
  .ver_box_two {
    line-height: 60px;
  }
  .ver_box_one {
  .p_one {
    margin: 12px 0 8px 0;
  }
  }
  }
  .pages {
    text-align: right;
    margin-top: 25px;
  }
  }
  .customfile .add_dir_row {
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 25px;

  .el-input {
    width: 300px;
  }


  }
  .customfile .pro-doc-operation {
    padding: 20px 0 20px 10px;
    border-bottom: 1px solid #e7e7e7;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  li {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
    padding: 0 16px;
    border: 1px solid #e7e7e7;
    background: rgba(242, 243, 245, 1);
  i {
    float: left;
    margin-top: 6px;
    margin-right: 6px;
  }
  a {
    float: left;
  }
  }
  li:hover a {
    color: #fff;
  }
  li:hover {
    background: #1a5fa4;
  }
  .new-built i {
    width: 16px;
    height: 14px;
    background: url("../../../../../assets/project_doc/xinjian2.png") no-repeat 0 0;
  }
  .new-built:hover i {
    background: url("../../../../../assets/project_doc/xinjian.png") no-repeat 0 0;
  }
  .upload i {
    width: 15px;
    height: 15px;
    background: url("../../../../../assets/project_doc/shangchuan2.png") no-repeat 0 0;
  }
  .upload:hover i {
    background: url("../../../../../assets/project_doc/shangchuan.png") no-repeat 0 0;
  }
  .download i {
    width: 16px;
    height: 15px;
    background: url("../../../../../assets/project_doc/xiazai2.png") no-repeat 0 0;
  }
  .download:hover i {
    background: url("../../../../../assets/project_doc/xiazai.png") no-repeat 0 0;
  }
  .delete i {
    width: 15px;
    height: 16px;
    background: url("../../../../../assets/project_doc/shanchu2.png") no-repeat 0 0;
  }
  .delete:hover i {
    background: url("../../../../../assets/project_doc/shanchu.png") no-repeat 0 0;
  }
  .Edition i {
    width: 13px;
    height: 16px;
    background: url("../../../../../assets/project_doc/banben2.png") no-repeat 0 0;
  }
  .Edition:hover i {
    background: url("../../../../../assets/project_doc/banben.png") no-repeat 0 0;
  }
  .recycle,
  .search_input {
    float: right;
  }
  .recycle {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .recycle:hover {
    background-color: rgba(0, 0, 0, 0);
  }
  .search_input {
    width: 300px;
  }
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
</style>
<style lang="scss">
  .customfile .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .customfile .file_list .el-checkbox__input {
    width: 5%;
    height: 40px;
    float: left;
    position: relative;
    top: 10px;
  }
  .customfile .el-checkbox__label {
    width: 95%;
    padding-left: 0;
  }
  .customfile .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333;
  }
  .customfile .file_tit .el-checkbox__label {
    width: 5%;
    box-sizing: border-box;
  }
  .customfile .file_tit .el-checkbox__input {
    margin: 0 20px;
  }
  .customfile .nature_box {
    .el-dialog__header {
      background-color: #5ca8fc;
      .el-dialog__title,
      .el-icon-close {
        color: #fff;
      }
    }
    .el-dialog__body {
      background-color: #fafafa;
      border-bottom: solid 1px #ccc;
      .box {
        padding: 10px 0;
        background: #fff;
        border: solid 1px #ccc;
        font-size: 16px;
        line-height: 2.5;
        .el-row .el-col-5 {
          text-align: right;
          padding-right: 10px;
        }
      }
    }
  }
  .el-input__icon {
    line-height: 1;
  }
  /*谷歌、safari、qq浏览器、360浏览器滚动条样式*/
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #bdbdbd;
  }
  /*滑块效果*/
  ::-webkit-scrollbar-thumb:hover
  {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.4);
  }
  /*IE滚动条颜色*/
  html {
    scrollbar-face-color:#bfbfbf;/*滚动条颜色*/
    scrollbar-highlight-color:#000;
    scrollbar-3dlight-color:#000;
    scrollbar-darkshadow-color:#000;
    scrollbar-Shadow-color:#adadad;/*滑块边色*/
    scrollbar-arrow-color:rgba(0,0,0,0.4);/*箭头颜色*/
    scrollbar-track-color:#eeeeee;/*背景颜色*/
  }
</style>
