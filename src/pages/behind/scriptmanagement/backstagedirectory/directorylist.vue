<template>
  <div class="directorylist">
    <div class="directorylist_contenti_headers">
      <el-breadcrumb separator="/" style="height:46px;line-height:46px">
        <el-breadcrumb-item>底稿管理</el-breadcrumb-item>
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
        <el-breadcrumb-item>目录列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex j-spaceBetween">
        <div class="headers_clearFix_title">目录列表</div>
        <div class="headers_clearFix_cont">
          <el-input
            placeholder="搜索目录名称"
            clearable
            v-model="search_form.name"
            @keyup.enter.native="searchFn"
          >
            <el-button slot="append" icon="el-icon-search" @click.stop="searchFn"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="directorylist_container" ref="containerBox">
      <div class="systemlog_container_tree" ref="treeBox">
        <business-tree
          @method="treeNodeClick"
          @load="treeNodeClick"
          :search="true"
          :general="false"
          :shadeShow="false"
          :prot="['project']"
          ref="businessTree"
        ></business-tree>
      </div>
      <div class="systemlog_container_box">
        <div class="box_header">
          <div class="flex j-spaceBetween a-center">
            <div class="path ellipsis1" :title="businessPathStr">
              <i class="el-icon-location path-icon"></i>
              {{businessPathStr}}
            </div>
            <div class="btn_group">
              <el-button type="primary" @click="templatePaste">粘贴</el-button>
              <el-button type="primary" @click="templateCopy">复制</el-button>
              <el-button type="primary" @click="templateDel">删除</el-button>
              <el-button
                type="primary"
                v-if="$utils.checkSystemPermission('bask_template_upload')"
                @click="downTempFn"
              >下载目录模板</el-button>
              <el-button
                type="primary"
                v-if="$utils.checkSystemPermission('bask_add_atalog')"
                @click="addFn"
              >新增目录</el-button>
            </div>
          </div>
        </div>
        <el-table
          class="dirTables"
          :data="tableData"
          :height="tableHeight"
          :header-cell-style="{background:'#f9f9f9',color:'#333'}"
          @selection-change="(list) => { this.selectData = list }"
          ref="dirTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" type="index" label="序号" width="55"></el-table-column>
          <el-table-column align="center" label="目录名称" prop="docName" min-width="255">
            <template slot-scope="scope">
              <div
                class="ellipsis1"
                @dblclick="godirectionEdit(scope.row)"
                :title="scope.row.docName"
              >{{scope.row.docName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="业务类型" prop="financingName" min-width="255">
            <template slot-scope="scope">
              <div
                class="ellipsis1"
                @dblclick="godirectionEdit(scope.row)"
                :title="scope.row.financingName"
              >{{scope.row.financingName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="remarks" min-width="80">
            <template slot-scope="scope">
              <div
                class="ellipsis1"
                @dblclick="godirectionEdit(scope.row)"
                :title="scope.row.remarks"
              >{{scope.row.remarks || '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间" prop="updateTime" min-width="165">
            <template slot-scope="scope">
              <div class="ellipsis1" :title="scope.row.updateTime">{{scope.row.updateTime}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" prop="updateTime" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="copyFn(scope.row.id)" title="复制">
                <i class="icon-operate-btn iconfont fuzhi1"></i>
              </el-button>
              <el-button
                type="text"
                @click="godirectionEdit(scope.row)"
                title="编辑"
              >
                <i class="icon-operate-btn iconfont bianji2-copy"></i>
              </el-button>
              <el-button type="text" @click="openDelDirectoryFn(scope.row.id)" title="删除">
                <i class="icon-operate-btn iconfont shanchu delete"></i>
              </el-button>
              <el-button type="text" @click="downloadFn(scope.row)" title="下载">
                <i class="icon-operate-btn iconfont Shapecopy"></i>
              </el-button>
              <el-button
                type="text"
                @click="powerSetFn(scope.row)"
                title="权限设置"
                v-if="isCansetPower"
              >
                <i class="icon-operate-btn iconfont setting-permissions"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages_box">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
            :page-sizes="[10, 20, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="currentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="权限配置"
      :visible.sync="powerSetVisible"
      width="500px"
      class="power-set"
    >
      <div class="power-set-con">
        <span class="power-set-sub-title">权限配置：</span>
        <el-checkbox v-model="renameCatalog">重命名目录</el-checkbox>
        <el-checkbox v-model="deleteCatalog">删除目录</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="clickEvent">取消</el-button>
        <el-button size="medium" type="primary" @click="savePowerSet">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      class="add_box"
      title="新增目录"
      @close="handleDialogClose"
      :visible.sync="dialogVisible"
      width="720px"
    >
      <div>
        <el-scrollbar style="height:100%">
          <el-form :model="add_form" label-width="125px" label-position="right">
            <el-form-item label="目录名称：">
              <div class="content-box">
                <el-input v-model="add_form.name" placeholder="请输入目录名称" maxlength="1000"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="所属业务类型：" :rules="{required:true}">
              <div class="choose-input content-box">
                <el-input
                  class="business-input"
                  :value="businessData.label"
                  placeholder="请选择业务类型"
                  disabled
                ></el-input>
                <div><el-button @click="businessTypeClick" type="primary">选择</el-button></div>
              </div>
            </el-form-item>
            <el-form-item label="备注信息：">
              <div class="content-box">
                <el-input
                  v-model="add_form.mark"
                  type="textarea"
                  placeholder="请输入备注信息"
                  resize="none"
                  :rows="3"
                  maxlength="400"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item align label="目录文件：">
              <div class="content-box">
                <el-button size="small" type="primary" @click="uploadModel">上传</el-button>
                <p class="upload-title">请上传纯目录的word文件或符合要求的excel文件,上传目录文件后,系统将自动解析并生成目录</p>
              </div>
            </el-form-item>
            <el-form-item label=" " class="filelistitem">
              <ul class="filelist-ul" v-if="isHaveFile">
                <li>
                  <img v-if="analysisDocType == '1'" src="../../../common/fileIcon/DocType.png" alt />
                  <img v-if="analysisDocType == '2'" src="../../../common/fileIcon/XlsType.png" alt />
                  <span>{{uploadFileName}}</span>
                </li>
              </ul>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleDialogClose">取 消</el-button>
        <el-button size="medium" type="primary" @click="saveMsg">保存</el-button>
      </span>
    </el-dialog>
    <el-input type="file" id="fileBtn" style="display:none;"></el-input>
    <!--本地上传-->
    <rd-uploader ref="RdUploader" @uploaded="docUpload"></rd-uploader>
    <!-- 业务类型选择 -->
    <project-type
      v-if="isShowProjectType"
      :singleSele="1"
      :isProcessengineClick="false"
      :typeObj="businessTypeData"
      :state="1"
      @typeProject="projectTypeCallback"
      @sendValueToParent="isShowProjectType=false"
      :optState="{ value: 2 }"
      :hasSelect="businessData.id == ''?[]:[businessData]"
    ></project-type>
  </div>
</template>

<script>
import { wisdom_doc } from "@/pages/common/js/doc.main"
import { valid } from "semver"
import { setTimeout } from "timers"
import projectType from "@/components/dialogcommon/projecttype"
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      pro_id: this.$store.state.projectMsg.pro_id,
      success_code: this.code.codeNum.SUCCESS,
      DOC_FIlE_TYPE_MISMATCH: this.code.codeNum.DOC_FIlE_TYPE_MISMATCH,
      search_form: {
        name: ""
      },
      tableData: [],
      total: 0, // 总条数
      pageSize: 10, // 每页显示的数量
      currentPage: 1,
      add_form: {
        name: "",
        mark: ""
      },
      dialogVisible: false,
      isCanCopy: true, //判断用户是否可以下载
      uploadDocAddIsShow: false,
      uploadData: {},
      saveFlag: true,
      isUploadSuccess: false, // 是否上传成功
      analysisDocType: "", // 上传文件类型
      uploadFileName: "", //上传文件名称
      isHaveFile: false, // 是否有文件
      saveMsgData: null, //有文件的提交数据
      powerSetVisible: false, //权限设置弹窗是否显示
      renameCatalog: false, //权限配置重命名目录
      deleteCatalog: false, //权限配置删除目录
      isCansetPower: false, //是否显示设置权限按钮
      catalogRowData: "", //设置权限时用到的当前行（目录）数据
      tableHeight: 300, //表格高度
      selectData: [], // 表格选中数据
      isShowProjectType: false, // 业务类型弹框显示控制
      businessData: {
        label: "",
        id: ""
      }, // 业务类型数据
      businessTypeData: {},
      treeData: {}, // 左侧树节点选中数据
      treeNode: {},
      businessPathList: [], // 存储业务类型路径数组
      isLastNode: false, // 当先选中业务类型是否最末级
      uploadFile:{}
    }
  },
  components: {
    projectType
  },
  created() {
    this.getDataFn()
    this.getPowerList()
  },
  mounted() {
    let ref = this.$refs
    const pageHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    ref.containerBox.style.height = `${pageHeight - 176}px`
    this.$nextTick(() => {
      this.tableHeight = `${ref.containerBox.clientHeight - 124}`
    })
  },
  computed: {
    businessPathStr() {
      return this.businessPathList.join(">")
    }
  },
  methods: {
    ...mapMutations(["setDirTemplate", "export"]),
    // 目录批量删除
    templateDel() {
      if (this.selectData.length === 0) {
        this.$message.warning("请先选择数据")
        return
      }
      this.openDelDirectoryFn(this.selectData.map(v => v.id))
    },
    // 目录复制
    templateCopy() {
      if(!this.$utils.checkSystemPermission('bask_copy_atalog')) {
        this.$message.warning('无对应权限，请联系系统管理员处理')
        return
      }
      if (this.selectData.length === 0) {
        this.$message.warning("请先选择数据")
        return
      }
      this.setDirTemplate(
        this.selectData.map(item => {
          return item.id
        })
      )
      this.$refs.dirTable.clearSelection()
      this.$message.success("复制成功")
    },
    // 目录粘贴
    templatePaste() {
      if (this.$store.state.behindDirTemplate.length === 0) {
        this.$message.warning("请先复制目录")
        return
      }
      if (!this.isLastNode) {
        // 仅包含项目阶段的最末级业务类型可进行粘贴
        this.$message.warning("仅含项目阶段的业务类型可进行粘贴")
        return
      }
      // TODO:调用粘贴接口 粘贴成功刷新列表
      this.$post("/doc/paper/batchPasteRootCatalogData", {
        data: {
          financingId: this.treeData.id,
          ids: this.$store.state.behindDirTemplate.join(",")
        }
      })
        .then(res => {
          if (res.code != this.success_code) {
            this.$message.warning(res.msg)
            return
          }
          this.getDataFn()
          this.$message.success("粘贴成功")
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 业务类型选择点击 上传目录弹框
    businessTypeClick() {
      this.$post("/info/project/getUsableFinanceType")
        .then(res => {
          if (res.code != this.success_code) {
            this.$message.warning(res.msg)
            return
          }
          this.isShowProjectType = true
          this.businessTypeData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 选择业务类型弹框
    projectTypeCallback(data) {
      if(data.length === 0) {
        this.businessData = {
          label: '',
          id: ''
        }
        return
      }
      this.businessData = {
        label: data[0].label,
        id: data[0].id
      }
    },
    // 业务树点击事件
    treeNodeClick(data, node) {
      // console.log(data, node)
      this.treeData = data
      this.currentPage = 1
      if(!data) {
        this.tableData = []
        this.selectData = []
        this.total = 0
        this.isLastNode = false
        return
      }

      this.getDataFn()
      // 是否为最末级
      // this.isLastNode = data.children == null || data.children.length == 0
      this.isLastNode = !data.disabled
      // this.treeNode = node
      // 业务类型路径展示处理
      this.businessPathList.length = 0
      this.businessPath(node)
    },
    // 业务类型路径递归
    businessPath(node) {
      if (node.parent === null) return
      this.businessPathList.unshift(node.label)
      this.businessPath(node.parent)
    },
    handleDialogClose() {
      this.$refs["RdUploader"].handleClose()
      this.dialogVisible = false
      this.saveFlag = true
    },
    //  搜索
    searchFn() {
      this.currentPage = 1
      this.$refs.businessTree.activeSelNode(this.$Business.type[0].id)
    },
    //  下载excel模板
    downTempFn() {
      this.export({ url: "/doc/paper/downloadCatalogTemplate" })
    },
    //  获取目录数据,
    getDataFn() {
      var send_data = {
        token: this.token,
        userId: this.userId,
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        data: {
          financingId:this.treeData.id
        }
      }
      if (this.search_form.name != "") {
        send_data.data["docName"] = this.search_form.name
      } else {
        if (send_data.data["docName"]) {
          delete send_data.data["docName"]
        }
      }
      this.$post("/doc/paper/getRootSysCatalogsByLikeDocName", send_data)
        .then(response => {
          if (this.success_code != response.code) {
            this.$message.error(response.msg)
            return
          }
          this.tableData = response.data.list
          this.total = response.data.total
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //  打开上传模板 (docSource 不确定)
    uploadModel() {
      this.uploadData = {
        parentId: 0,
        docSource: 1
      }
      let options = {
        multiple: false,
        accept: "doc,docx,xls,xlsx"
      }
      this.$refs["RdUploader"].openSelect(options, this.uploadData)
    },
    //文件上传
    docUpload(uploadData) {
      this.$refs["RdUploader"].handleUploadSuccess(uploadData.tId)
      this.uploadFileName = uploadData.docName
      this.uploadFile = uploadData
      this.isHaveFile = true
      let _this = this
      this.add_form.name = this.replceDocName(this.add_form.name)
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          // docId: uploadData.docId,
          docName: this.add_form.name,
          remarks: this.add_form.mark,
          docRfs: uploadData.fileData.rfsId,
          analysisDocType: ""
        }
      }
      if (this.add_form.name == "") {
        data.data.docName = uploadData.docName.substring(
          0,
          uploadData.docName.lastIndexOf(".")
        )
      }
      var hz_name = uploadData.fileData.name
        .substring(uploadData.fileData.name.lastIndexOf("."))
        .toLowerCase()
      if (hz_name == ".xls" || hz_name == ".xlsx") {
        data["data"]["analysisDocType"] = "2"
        this.analysisDocType = "2"
      } else {
        data["data"]["analysisDocType"] = "1"
        this.analysisDocType = "1"
      }
      this.saveMsgData = data

      // if(this.add_form.name == ""){
      //   return this.$message({
      //     message: "请输入目录名称",
      //     type: "warning"
      //   })
      // }
    },
    //  分页
    exchangeCurrentPage() {
      this.getDataFn()
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.getDataFn()
    },
    currentChange(size) {
      this.currentPage = size
      this.tableData = []
      this.getDataFn()
    },
    //  复制根目录数据
    copyFn(id) {
      if (!this.isCanCopy) {
        return
      }
      this.isCanCopy = false
      this.$post("/doc/paper/copyRootCatalogData", {
        data: {
          id:id
        }
      })
        .then(response => {
          if (this.success_code != response.code) {
            this.$message.error(response.msg)
            return
          }
          this.$message.success("复制成功")
          this.getDataFn()
          this.isCanCopy = true
        }).catch(err => { console.log(err) })
    },
    //  打开新增目录弹框
    addFn() {
      this.dialogVisible = true
      this.isHaveFile = false
      this.saveMsgData = null
      this.analysisDocType = ""
      this.uploadFileName = ""
      this.uploadFile = {}
      const copyObj = this.$utils.copyObj(this.treeData)
      this.businessData = {
        id: this.isLastNode ? copyObj.id : "",
        label: this.isLastNode ? copyObj.label : ""
      }
    },
    //  新增目录
    saveMsg() {
      if (this.add_form.name == "" && !this.isHaveFile) {
        return this.$message.warning("请输入目录名称")
      }
      let reg = /[\\/:*?"<>|]/g
      if (reg.test(this.add_form.name)) {
        this.$message.warning('不能包含特殊字符/:*?"<>|')
        return
      }
      if (this.businessData.label == "") {
        this.$message.warning("请选择业务类型")
        return
      }
      if (!this.isHaveFile) {
        this.noFileSave()
      } else {
        if(!['doc','docx','xls','xlsx'].includes(this.uploadFile.fileData.docType)) {
          this.$message.warning('目录支持上传以下格式的文件：DOC、DOCX、XLS、XLSX，请重新上传正确格式的文件后重试')
          return
        }
        if (this.saveFlag) {
          this.saveFlag = false
          if (this.add_form.name != "") {
            this.saveMsgData.data.docName = this.add_form.name
          }
          this.saveMsgData.data.financingId = this.businessData.id
          this.saveMsgData.data.remarks = this.add_form.mark
          this.$post("/doc/paper/addRootCatalogByDoc", this.saveMsgData)
            .then(response => {
              if (response.code == this.success_code) {
                this.dialogVisible = false
                this.uploadData = {}
                this.add_form = {
                  name: "",
                  mark: ""
                }
                this.$message.success("添加成功")
                this.getDataFn()
                this.handleDialogClose()
              } else if (response.code == this.DOC_FIlE_TYPE_MISMATCH) {
                this.$message.error("该文件中未检测到目录信息")
              } else {
                this.$message.error(response.msg)
              }
              this.saveFlag = true
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.warning("操作过于频繁")
        }
      }
    },
    //  没有文件的新增目录
    noFileSave() {
      if (this.saveFlag) {
        this.saveFlag = false
        this.add_form.name = this.replceDocName(this.add_form.name)
        var send_data = {
          token: this.token,
          userId: this.userId,
          data: {
            remarks: this.add_form.mark,
            docName: this.add_form.name,
            financingId: this.businessData.id
          }
        }
        this.$post("/doc/paper/addRootCatalog", send_data)
          .then(response => {
            if (this.success_code == response.code) {
              this.$message.success("添加成功")
              this.add_form = {
                name: "",
                mark: ""
              }
              $(".el-upload-list")
                .children()
                .remove()
              this.dialogVisible = false
              this.getDataFn()
            } else {
              this.$message.error(response.msg)
            }
            this.saveFlag = true
          })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        this.$message.warning("操作过于频繁")
      }
    },
    //  有文件的新增目录
    havaFileSave() {
      var fileName = $(".el-upload-list__item-name").text()
      fileName = fileName.replace(/\s/g, "")
      String.prototype.endWith = function(endStr) {
        var d = this.length - endStr.length
        return d >= 0 && this.lastIndexOf(endStr) == d
      }
      // var send_data = {

      // }
      if (fileName.endWith(".doc") || fileName.endWith(".xls")) {
      } else {
        this.$message({
          message: "请上传纯目录的word文件或符合要求的excel文件",
          type: "warning"
        })
        return
      }
    },
    // 删除目录
    openDelDirectoryFn(val) {
      let delArr = Array.isArray(val) ? val : [val]
      this.$confirm(
        "删除后，将删除该目录下的所有子目录,是否确认删除？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$post("/doc/paper/deleteRootCatalog", {
            data: {
              ids: delArr.join(",")
            }
          })
            .then(response => {
              if (this.success_code != response.code) {
                this.$message.error(response.msg)
                return
              }
              this.$message.success("删除成功")
              this.getDataFn()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {})
    },
    // 下载目录
    downloadFn(data) {
      var proId = this.pro_id
      if (!rightSysPermissionFn(proId, "bask_template_upload")) {
        this.$message.warning("当前无权限")
        return
      }
      this.export({
        url: "/doc/paper/catatoexcel",
        data: { catalogId: data.id, catalogName: data.docName }
      })
    },
    //  前往编辑目录路由
    godirectionEdit(item) {
      const {id, docName, remarks,financingId,financingName} = item
      console.log(item)
      this.$router.push({
        path: "/backstagedirectory",
        query: { id, docName, remarks,financingId,financingName }
      })
    },
    //  格式化文件名
    replceDocName(str) {
      return str.replace(/[\,\|\/\'\*\:\;\"\L\<\>\?\\]/g, "")
    },
    // 获取是否有需要显示设置权限按钮
    getPowerList() {
      this.$post("/sys/getUserPerm")
        .then(response => {
          var data = response.data
          if (response.code == this.success_code) {
            for (var i = 0; i < data.length; i++) {
              if (data[i] == "config_per") {
                this.isCansetPower = true
              }
            }
          } else {
            this.$message(response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //打开权限设置弹窗
    powerSetFn(item) {
      this.getPower(item)
      this.powerSetVisible = true
      this.catalogRowData = item
    },
    // 取消权限设置
    clickEvent() {
      this.powerSetVisible = false
      this.renameCatalog = false
      this.deleteCatalog = false
    },
    savePowerSet() {
      this.setPower()
    },
    // 设置权限
    setPower() {
      var hasRename = this.renameCatalog === true ? 1 : 0
      var hasDelete = this.deleteCatalog === true ? 1 : 0
      var listObj = {
        token: this.token,
        userId: this.userId,
        data: {
          editPermission: hasRename,
          delPermission: hasDelete,
          id: this.catalogRowData.id
        }
      }
      this.$post("/doc/paper/editCatalogPer", listObj)
        .then(response => {
          if (response.code == this.success_code) {
            this.$message.success(response.msg)
            this.powerSetVisible = false
            this.renameCatalog = false
            this.deleteCatalog = false
          } else {
            this.$message.error(response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取当前目录权限
    getPower(item) {
      var listObj = {
        token: this.token,
        userId: this.userId,
        projectId: this.pro_id,
        data: {
          id: item.id
        }
      }
      this.$post("/doc/paper/tempPermission", listObj)
        .then(response => {
          if (response.code == this.success_code) {
            let data = response.data
            this.renameCatalog = data.editPermission === 1 ? true : false
            this.deleteCatalog = data.delPermission === 1 ? true : false
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    dialogVisible() {
      if (!this.dialogVisible) {
        this.add_form = {
          name: "",
          mark: ""
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dirTables {
  /deep/ .cell .el-button--text {
    padding: 0;
  }
  /deep/ .el-table__row td:nth-child(3),
  /deep/ .el-table__row td:nth-child(4),
  /deep/ .el-table__row td:nth-child(5) {
    cursor: pointer;
  }
}

.directorylist .directorylist_contenti_headers {
  padding: 0 10px;
  margin: auto;
  height: 96px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;
  .headers_clearFix_title {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 600;
  }
  .headers_clearFix_cont {
    padding-right: 5px;
  }
}

.directorylist_container {
  margin-top: 10px;
  padding: 5px 0;
  box-sizing: border-box;
  display: flex;
  .systemlog_container_tree {
    padding: 0 5px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .systemlog_container_box {
    width: calc(100% - 280px);
    height: 100%;
    margin-left: 10px;
    background-color: #fff;
    .box_header {
      padding: 7px 0;
    }
    .btn_group {
      padding-right: 10px;
      width: 500px;
      text-align: right;
      flex-shrink: 1;
      .el-button + .el-button {
        margin-left: 5px;
      }
    }
    .path {
      padding: 5px;
      max-width: 50%;
      max-width: calc(100% - 530px);
      text-align: left;
      flex-shrink: 1;
      .path-icon {
        color: #ff0400;
      }
    }
  }
  .right_header_third {
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: solid 1px #f4f7f9;
    background-color: #fafafa;
  }
  .tb_row {
    height: 53px;
    line-height: 53px;
    border-bottom: solid 1px #ebeef5;

    .el-col {
      text-align: center;
      height: 53px;
    }
    .rename_sapn {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 5px 0 5px;
    }
    .remark_span {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .operating_box {
    .oper_btn_box {
      height: 53px;
      margin: auto;
      width: 210px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .pages_box {
    height: 60px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.filelist-ul {
  li {
    height: 36px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: #f7f9fb;
    font-size: 12px;
    color: #333333;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.filelistitem {
  margin-top: -18px;
}
</style>

<style lang="scss">
.directorylist .add_box {
  .el-input {
    width: 60%;
  }
  .el-textarea {
    width: 90%;
  }
  .business-input {
    width: calc(60% - 70px);
  }
  .content-box {
    text-align: left;
    margin-left: 0;
  }
  .el-dialog__header {
    text-align: center;
    border-bottom: solid 1px #ccc;
  }

  .el-dialog__body {
    padding: 20px 40px 10px 20px;
    color: #606266;
    font-size: 14px;
  }
  .upload-title {
    font-size: 10px;
    color: red;
  }
}
.directorylist {
  .power-set {
    .el-dialog {
      margin-top: 39vh !important;
    }
    .el-dialog__header {
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .power-set-con {
      height: 40px;
      padding-top: 10px;
    }
    .power-set-sub-title {
      font-weight: 400;
    }
  }
}
</style>
