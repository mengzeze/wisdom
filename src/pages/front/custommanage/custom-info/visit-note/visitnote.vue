<template>
  <div class="baifangjiliparents">
    <div class="visitnote">
      <div v-on:keyup.enter="searchBtn">
        <el-form
          ref="form"
          :model="search_form"
          :inline="true"
          class="form_box clearfix"
        >
          <el-form-item label="拜访人员：">
            <el-input
              v-model="search_form.visit_personnel"
              class="fl"
              placeholder="请输入拜访人员"
              disabled="disabled"
              :searchForm="searchForm"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              @click="optUser(1)"
              class="fl"
              style="margin-left: 0px; height: 40px; margin-top: 0px"
              >选择人员</el-button
            >
          </el-form-item>
          <el-form-item label="拜访日期：">
            <el-date-picker
              @focus="$utils.handleTimeFocus"
              v-model="search_form.startDate"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="开始日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              @click="searchBtn"
              >查询</el-button
            >
            <el-button size="medium" @click="resetBtn" icon="el-icon-refresh"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              @click="newAddFn"
              size="medium"
              icon="el-icon-plus"
              type="primary"
              v-if="$utils.checkSystemPermission('crm_financing_visit_add')"
              style="float: right; margin-right: 10px"
              >新增拜访记录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="table_box">
        <el-table
          :data="tableData"
          fit
          show-header
          :header-cell-style="{ background: '#FAFAFA', color: '#000' }"
          style="width: 100%"
          class="pro_table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="name"
            label="客户名称"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.name"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="拜访日期"
            align="center"
            min-width="120"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.date"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.date }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="place"
            label="拜访地点"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.place"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.place }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="visitPersonnelName"
            label="拜访人员"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.visitPersonnelName"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.visitPersonnelName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="form"
            label="拜访形式"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.form"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.form }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="result"
            label="主要成果"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.result"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.result }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="创建人"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.creatorName"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.creatorName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            min-width="130"
          >
            <template slot-scope="scope">
              <p
                :title="scope.row.createTime"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ scope.row.createTime }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                class="pv-0"
                type="text"
                @click="editTable(scope.$index, scope.row)"
                title="编辑"
                v-if="$utils.checkSystemPermission('crm_financing_visit_edit')"
                ><i class="icon-operate-btn iconfont bianji2-copy"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
        :pageSize="pageSize"
        :page-sizes="pageSizes"
        :current-page="currentPage"
        @current-change="onPageChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
      <el-dialog
        title="新建拜访记录"
        :visible.sync="dialogVisibleadd"
        width="750px"
        @close="closemediumDialog"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <span class="dialog_tit">拜访记录信息</span>
        <div>
          <el-form
            ref="newObject"
            :model="newObjectadd"
            label-width="110px"
            class="form_box clearfix"
          >
            <el-form-item label="客户名称：" :rules="[{ required: true }]">
              <el-input
                v-model="newObjectadd.name"
                placeholder="请输入客户名称"
                disabled="disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="拜访创建人：" :rules="[{ required: true }]">
              <el-input
                v-model="newObjectadd.creator"
                class="fl"
                placeholder="选择人员"
                disabled="disabled"
                :creatorForm="creatorForm"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUser(2)"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                class="fl"
                >选择人员</el-button
              >
            </el-form-item>
            <el-form-item label="拜访形式：">
              <el-input
                v-model.trim="newObjectadd.form"
                placeholder="请输入拜访形式"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="拜访人员：" :rules="[{ required: true }]">
              <el-input
                v-model="newObjectadd.visit_personnel"
                class="fl"
                placeholder="选择人员"
                disabled="disabled"
                :persoArray="persoArray"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUserserch(2)"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                class="fl"
                >选择人员</el-button
              >
            </el-form-item>
            <el-form-item label="拜访日期：" :rules="[{ required: true }]">
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="newObjectadd.startDate"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始日期"
              ></el-date-picker>
              <!-- <span class="space-block"></span> -->
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="newObjectadd.endDate"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="拜访地点：" :rules="[{ required: true }]">
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="newObjectadd.place"
                placeholder="请输入拜访地点"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="主要成果："
              style="margin-top: 10px"
              :rules="[{ required: true }]"
            >
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="newObjectadd.result"
                placeholder="请输入主要成果"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="upload_box">
            <label>附件：</label>
            <add-attachment
              ref="attachment"
              :onlyLocal="true"
              :uploadParamData="uploadParamData"
              :docSource="16"
              @select="handleSelectUploadFile(arguments, selectedFileList)"
            ></add-attachment>
          </div>
          <ul class="attachment-wrap">
            <li v-for="(item,index) in selectedFileList" :key='index' class="attachemnt-list-item">
              <p class="attachemnt-list-doc">
                <span
                  class="doc-name"
                  @click="$utils.handleUploadFilePreview(item, projectId)"
                  :title="item.docName"
                  >{{ item.docName }}</span
                >
                <span>
                  <el-button
                    class="mr-10"
                    type="text"
                    @click="$utils.handleDownLoadSelected(item)"
                    >下载</el-button
                  >
                  <el-button
                    type="text"
                    @click="$utils.handleDeleteSelected(selectedFileList, item)"
                    >删除</el-button
                  >
                </span>
              </p>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="closemediumDialog">取 消</el-button>
          <el-button size="medium" type="primary" @click="saveMsgadd"
            >保 存</el-button
          >
        </span>
      </el-dialog>
      <!-- //编辑拜访记录 -->
      <el-dialog
        title="编辑拜访记录"
        :close-on-click-modal="false"
        :visible.sync="dialogVisibleedit"
        @close="handleNoteEditClose"
        width="730px"
      >
        <span class="dialog_tit">拜访记录信息</span>
        <div>
          <el-form
            ref="form"
            :model="newObject"
            label-width="110px"
            class="form_box clearfix"
          >
            <el-form-item label="客户名称：" :rules="[{ required: true }]">
              <el-input
                v-model.trim="newObject.name"
                placeholder="请输入客户名称"
                disabled="disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="拜访创建人：" :rules="[{ required: true }]">
              <el-input
                v-model="newObject.creator"
                class="fl"
                placeholder="选择人员"
                disabled="disabled"
                :creatorForm="creatorForm"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUser(3)"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                class="fl"
                :disabled="disabled"
                >选择人员</el-button
              >
            </el-form-item>
            <el-form-item label="拜访形式：">
              <el-input
                v-model.trim="newObject.form"
                placeholder="请输入拜访形式"
                :disabled="disabled"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item label="拜访人员：" :rules="[{ required: true }]">
              <el-input
                v-model="newObject.visit_personnel"
                class="fl"
                placeholder="选择人员"
                disabled="disabled"
                :persoArrayedit="persoArrayedit"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUserserch(1)"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                class="fl"
                :disabled="disabled"
                >选择人员</el-button
              >
            </el-form-item>
            <el-form-item label="拜访日期：" :rules="[{ required: true }]">
              <el-date-picker
                v-model="newObject.startDate"
                type="datetime"
                placeholder="开始日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="disabled"
                @focus="$utils.handleTimeFocus"
              >
              </el-date-picker>
              <el-date-picker
                v-model="newObject.endDate"
                type="datetime"
                placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="disabled"
                @focus="$utils.handleTimeFocus"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="拜访地点：" :rules="[{ required: true }]">
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="newObject.place"
                placeholder="请输入拜访地点"
                maxlength="50"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="主要成果："
              style="margin-top: 10px"
              :rules="[{ required: true }]"
            >
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="newObject.result"
                placeholder="请输入主要成果"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="upload_box">
            <label>附件：</label>
            <add-attachment
              ref="attachmentEdit"
              :onlyLocal="true"
              :disabled="btn_flagedit"
              @select="handleSelectUploadFile(arguments, selectedFileListEdit)"
            ></add-attachment>
          </div>
          <div style="overflow-y: auto; max-height: 113px">
            <ul class="attachment-wrap mt-10">
              <li v-for="(item,index) in getFileListEdit" :key="index" class="attachemnt-list-item">
                <p class="attachemnt-list-doc">
                  <span
                    class="doc-name"
                    @click="$utils.handleUploadFilePreview(item)"
                    :title="item.docName"
                    >{{ item.docName }}</span
                  >
                  <span>
                    <el-button
                      :disabled="btn_flagedit"
                      class="mr-10"
                      type="text"
                      @click="$utils.handleDownLoadSelected(item)"
                      >下载</el-button
                    >
                    <el-button
                      :disabled="btn_flagedit"
                      type="text"
                      @click="
                        $utils.handleDeleteSelected(getFileListEdit, item)
                      "
                      >删除</el-button
                    >
                  </span>
                </p>
              </li>
            </ul>
            <ul class="attachment-wrap">
              <li
                v-for="(item,index) in selectedFileListEdit"
                :key="index"
                class="attachemnt-list-item"
              >
                <p class="attachemnt-list-doc">
                  <span
                    class="doc-name"
                    @click="$utils.handleUploadFilePreview(item)"
                    :title="item.docName"
                    >{{ item.docName }}</span
                  >
                  <span>
                    <el-button
                      class="mr-10"
                      type="text"
                      @click="$utils.handleDownLoadSelected(item)"
                      >下载</el-button
                    >
                    <el-button
                      type="text"
                      @click="
                        $utils.handleDeleteSelected(selectedFileListEdit, item)
                      "
                      >删除</el-button
                    >
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="handleNoteEditClose"
            >取 消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="saveMsgesave"
            v-if="btn_flagedit"
            >编 辑</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="saveMsgedit"
            v-if="btn_flagesave"
            >保 存</el-button
          >
        </span>
      </el-dialog>
      <!-- 删除弹框 -->
      <div class="shanchutankuang">
        <el-dialog
          title="提示"
          :visible.sync="deletes"
          :close-on-click-modal="false"
          width="22%"
        >
          <div class="clearfix">
            <img
              class="fl"
              src="../../../../../assets/image/shan1.png"
              alt=""
              style="
                width: 24px;
                height: 24px;
                position: relative;
                top: -3px;
                margin-right: 10px;
              "
            />
            <span class="fl">确定删除该拜访记录吗</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="deletes = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="deletessure"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!--选择人员-->
      <fintall-deptuser
        :findFlagShow.sync="findFlag"
        v-on:findAllUser="findAllUser"
        :findUserObj="findUserObj"
        :findState="findState"
        :checkState="checkState"
      ></fintall-deptuser>

      <fintall-deptuserserch
        :findFlagShow.sync="findFlagserch"
        v-on:findAllUser="findAllUserserch"
        :findUserObj="findUserObjs"
        :findState="findStateserch"
        :checkState="checkStateserch"
      ></fintall-deptuserserch>

      <upload-add-doc
        v-if="addDoc"
        ref="uploadfiles"
        :uploadDocAddIsShow="uploadDocAddIsShow"
        @sendValueToParent="sendValueToParentFn"
        @docUpload="docUploadFn"
        :uploadParamData="uploadParamData"
        @docUploadAllsucess="docUploadAllsucess"
      ></upload-add-doc>
    </div>
  </div>
</template>

<script>
// import frameWork from '@/components/select_box/frameworkpeo'
// import frameWorkserch from '@/components/select_box/frameworkpeosearch'
import fintallDeptuser from "@/components/select_box/findAllDeptUserSingleNew";
import fintallDeptuserserch from "@/components/select_box/findAllDeptUserMultipleNew";
import uploadAddDoc from "@/components/file/uploadAddDoc";
import { wisdom_doc } from "@/pages/common/js/doc.main";
export default {
  name: "visitnote",
  props: ["custData", "naturalData", "finacnData"],
  components: {
    // frameWork,
    uploadAddDoc,
    fintallDeptuser,
    fintallDeptuserserch,
    // frameWorkserch
  },
  data() {
    return {
      selectedFileList: [],
      selectedFileListEdit: [],
      getFileListEdit: [],
      findUserVal: "",
      findUserValM: "",
      findUserObj: [],
      findUserObj1: [],
      findUserObj2: [],
      findUserObj3: [],
      findUserObjs: [],
      findUserObjM: [],
      findUserObjMth: [],
      findFlag: false,
      findState: {},
      checkState: {},

      findFlagserch: false,
      findStateserch: {},
      checkStateserch: {},
      isdown: false,
      deledDoc: true,
      disabled: true,
      aaaa: true,
      btn_flagedit: true,
      btn_flagesave: false,
      uploadParamData: {
        docSource: 2,
        projId: this.pro_id,
        parentId: "",
        auditProjectId: "",
      },
      uploadDocAddIsShow: false,
      addDoc: false,
      deployObj: [{ name: "" }],
      //添加人员
      // flag:false,
      // peodatas:'',
      deletes: false,
      //添加一个人员
      //   flagsearch:false,
      //   peodatassearch:'',
      search_form: {
        name: "",
        startDate: "",
        visit_personnel: "",
      },
      tableData: [],
      multipleSelection: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量

      dialogVisibleadd: false, //弹框
      dialogVisibleedit: false, //弹框
      dialogTitle: "新建客户联系人",
      newObjectadd: {
        id: "",
        creator: "",
        form: "",
        visit_personnel: "",
        startDate: "",
        endDate: "",
        place: "",
        result: "",
      },
      newObject: {
        id: "",
        name: "",
        creator: "",
        form: "",
        visit_personnel: "",
        startDate: "",
        endDate: "",
        place: "",
        result: "",
      },
      globalId: "",
      //   附件
      fileList: [],
      // file_flag: true,
      success_code: "",
      fileDatahhh: "",
      idsdelete: [],
      companyid: "",
      individualId: "",
      intermediaryId: "",
      companyNames: "",
      user_num: "",
      principalCust: "",
      customer: [],
      vistperson: "",
      searchForm: "",
      persoArray: [],
      canderArray: [],
      canderedit: [],
      persoArrayedit: [],
      creatorForm: "",
      user_numForm: "",
      personList: [],
      typeNames: "", //客户类型
      nameexport: "", //客户名称
      pro_id: "", //项目id
      newProjectDialogTimer: null,
    };
  },
  mounted() {},
  created() {
    this.success_code = this.code.codeNum.SUCCESS;
    this.pro_id = this.$store.state.projectMsg.pro_id;
  },
  methods: {
    handleSelectUploadFile(arg, list) {
      let data = Array.from(arg)[0].data[0];
      list.push({
        docName: data.docName,
        docId: data.docId,
        fileName: data.docName,
        fileId: data.docId,
        rfsId: data.fileData.rfsId,
        filetype: data.fileData.docType,
      });
    },
    handleNoteEditClose() {
      this.$refs["attachmentEdit"] && this.$refs["attachmentEdit"].close();
      this.dialogVisibleedit = false;
    },
    //点击关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.closemediumDialog();
        })
        .catch((_) => {});
    },
    // 预览
    yulan(item) {
      this.$store.commit("previewAllFn", { rfsId: item.rfsId });
    },
    uploadingFn() {
      //上传
      if (this.aaaa == true) {
        this.addDoc = true;
        this.uploadDocAddIsShow = true;
      }
    },
    docUploadFn(fileData) {
      this.fileList.push({
        fileName: fileData.docName,
        fileId: fileData.docId,
        rfsId: fileData.fileData.rfsId,
        filetype: fileData.fileData.type,
      });
      this.$refs.uploadfiles.uploadComplete();
    },
    // 删除
    deletefile(index) {
      this.fileList.splice(index, 1);
    },
    //下载附件
    downDoc(item) {
      var download_arr = [];
      download_arr.push({
        name: item.fileName,
        id: item.fileId,
      });
      this.$store.commit("download", download_arr);
    },
    seeFj(item, docid, type, projectId) {
      var idx = type.indexOf("/");
      var imgtype = type.slice(idx + 1);
      //console.log(imgtype)
      var previewData = {
        projectId: projectId,
        rfsId: item,
        docId: docid,
        photoType: imgtype,
      };
      this.$store.commit("previewAllFn", previewData);
    },
    docUploadAllsucess() {
      this.$message({
        type: "success",
        message: "上传成功",
      });
      this.sendValueToParentFn();
    },
    sendValueToParentFn() {
      //上传的关闭弹框
      this.addDoc = false;
      this.uploadDocAddIsShow = false;
    },
    //添加人员
    findAllUserserch(data) {
      if (data.length == 0) {
        this.findFlagserch = false;
        this.findStateserch = {};
        this.checkStateserch = {};
        if (this.user_num == 1) {
          this.newObject.visit_personnel = "";
          this.findUserObjM = [];
        } else {
          this.newObjectadd.visit_personnel = "";
          this.findUserObjMth = [];
        }
        return;
      }
      this.deployObj = data;
      this.persoArrayedit = [];
      this.persoArray = [];
      if (this.user_num == 1) {
        var string = "";
        for (var i = 0; i < this.deployObj.length; i++) {
          console.log(this.deployObj[i].userId);
          var objname = {};
          objname.name = this.deployObj[i].name;
          this.canderedit.push(objname);
          this.persoArrayedit.push(
            this.deployObj[i].userId
              ? this.deployObj[i].userId
              : this.deployObj[i].id
          );
          string = string + data[i].name + "、";
        }
        this.newObject.visit_personnel = string;
        this.findFlagserch = false;
        this.findStateserch = {};
        this.checkStateserch = {};
        this.findUserObjM = data;
      } else {
        var string = "";
        for (var i = 0; i < this.deployObj.length; i++) {
          var objname = {};
          objname.name = this.deployObj[i].name;
          this.canderArray.push(objname);
          this.persoArray.push(this.deployObj[i].userId);
          string = string + data[i].name + "、";
        }
        this.newObjectadd.visit_personnel = string;
        this.findFlagserch = false;
        this.findStateserch = {};
        this.checkStateserch = {};
        this.findUserObjMth = data;
      }
    },
    // 选择多个用户
    optUserserch(num) {
      this.user_num = num;
      this.findFlagserch = true;
      this.findStateserch = { state: 0 };
      this.checkStateserch = { state: 2 };

      if (this.user_num == 1 && !this.newObject.visit_personnel) {
        this.findUserObjM = [];
      }
      if (this.user_num == 2 && !this.newObjectadd.visit_personnel) {
        this.findUserObjMth = [];
      }
      if (this.user_num == 1) {
        // this.findUserObjs = this.findUserObjM
        this.findUserObjs = this.$utils.cloneDeepArray(this.findUserObjM);
      }
      if (this.user_num == 2) {
        this.findUserObjs = this.$utils.cloneDeepArray(this.findUserObjMth);
        // this.findUserObjs = this.findUserObjMth
      }
      console.log(
        this.user_num,
        this.findUserObjM,
        this.findUserObjMth,
        this.findUserObjs
      );
    },
    //添加1个人员
    findAllUser(data) {
      console.log(data, "单");
      if (data.length == 0) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        // 1-查询，2-新增，3-编辑
        if (this.user_numForm == 1) {
          this.search_form.visit_personnel = "";
          this.findUserObj1 = [];
        } else if (this.user_numForm == 2) {
          this.newObjectadd.creator = "";
          this.findUserObj2 = [];
        } else {
          this.newObject.creator = "";
          this.findUserObj3 = [];
        }
        return;
      } else {
        this.deployObj = data;
        data.forEach((v) => {
          v.uniqueKey = "user" + v.id;
        });
        if (this.user_numForm == 1) {
          this.search_form.visit_personnel = this.deployObj[0].name;
          this.searchForm = this.deployObj[0].userId;
          this.newObjectadd.creator = this.deployObj[0].name;
          this.findFlag = false;
          this.findUserObj1 = data;
        } else if (this.user_numForm == 2) {
          this.newObjectadd.creator = this.deployObj[0].name;
          this.creatorForm = this.deployObj[0].userId;
          this.findFlag = false;
          this.findUserObj2 = data;
        } else {
          this.newObject.creator = this.deployObj[0].name;
          this.creatorForm = this.deployObj[0].userId;
          this.findUserObj3 = data;
        }
      }
    },
    // 选择1个用户
    optUser(num) {
      console.log(num, 222111, this.newObject.creator, this.creatorForm);
      this.user_numForm = num;
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 1 };
      if (this.user_numForm == 1 && this.search_form.visit_personnel) {
        this.findUserObj = this.findUserObj1;
      }
      if (this.user_numForm == 2) {
        this.findUserObj = [];
      }
      if (this.user_numForm == 3) {
        this.findUserObj = this.findUserObj3;
      }
    },
    indexSelect(event) {
      this.A = event.target.value;
    },
    //新建
    newAddFn() {
      this.aaaa = true;
      this.dialogVisibleadd = true;
      this.selectedFileList = [];
      this.handleNewProData();
      // 取出保存的草稿
      let draft = this.$utils.getDraft("visitnote", false);
      // 如果没有草稿，设置定时器，返回
      if (!draft) {
        this.setTimer();
        return;
      }
      // 有草稿，展示提示弹窗
      this.$confirm("是否载入上次保存的草稿?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 回显草稿数据
          this.newObjectadd = { ...this.newObjectadd, ...draft };
          this.setTimer();
        })
        .catch(() => {
          this.setTimer();
        });
    },
    /**
     * 设置定时器：每5秒保存一次表单数据
     */
    setTimer() {
      // 启动定时器，每5000ms保存一次草稿
      this.newProjectDialogTimer = setInterval(() => {
        this.handleDraftData();
      }, 5000);
    },
    handleDraftData() {
      let data = {
        form: this.newObjectadd.form, //拜访形式
        //endDate:this.newObjectadd.endDate,//拜访结束日期
        place: this.newObjectadd.place, //拜访地点
        result: this.newObjectadd.result, //主要成果
      };
      this.$utils.saveDraft("visitnote", data, false);
    },
    closemediumDialog() {
      this.$refs["attachment"] && this.$refs["attachment"].close();
      clearInterval(this.newProjectDialogTimer);
      this.handleDraftData();
      this.dialogVisibleadd = false;
    },

    handleNewProData() {
      this.newObjectadd = {
        id: "",
        name: this.companyNames,
        creator: "",
        form: "",
        visit_personnel: "",
        startDate: "",
        endDate: "",
        place: "",
        result: "",
      };
      this.fileList = [];
    },

    //  全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var kk = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        kk.push(this.multipleSelection[i].id);
      }
      this.idsdelete = kk;
    },
    // 确定删除
    deletessure() {
      var datas = {
        data: {
          ids: this.idsdelete,
        },
      };
      var _this = this;
      this.$post("/info/crm/visit/delete", datas)
        .then((response) => {
          if (response.code == _this.success_code) {
            _this.deletes = false;
            _this.custvustList();
            _this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            _this.$message(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 是否选择一条数据
    handleAllDelete() {
      if (
        this.tableData == undefined ||
        this.tableData == null ||
        this.tableData == ""
      ) {
        this.$message({
          message: "暂无数据",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 0) {
        this.deletes = true;
      } else {
        this.$message({
          message: "请选择一条数据",
          type: "warning",
        });
      }
    },
    // 查询
    searchBtn() {
      this.currentPage = 1;
      this.custvustList();
    },
    // 重置
    resetBtn() {
      this.search_form = {
        visit_personnel: "",
        name: "",
        startDate: "",
      };
      this.searchForm = "";
    },
    //编辑
    editTable(index, row) {
      this.selectedFileListEdit = [];
      this.getFileListEdit = [];
      this.aaaa = false;
      this.dialogVisibleedit = true;
      this.disabled = true;
      this.btn_flagedit = true;
      this.btn_flagesave = false;

      this.deledDoc = false;
      this.isdown = true;
      this.globalId = row.id;
      var data = {
        data: {
          id: this.globalId,
        },
      };
      var _this = this;
      this.$post("/info/crm/getCompanyVisit", data)
        .then((response) => {
          _this.newObject.name = row.name;
          _this.newObject.creator = response.data.creatorName;
          _this.creatorForm = response.data.creator;
          _this.newObject.form = response.data.form;
          _this.personList = response.data.personnelList.map(function (item) {
            return {
              userId: item.userId,
              usName: item.usName,
              rfsId: item.rfsId,
            };
          });
          // console.log(123, _this.creatorForm);
          this.findUserObj3 = [
            {
              name: _this.newObject.creator,
              label: _this.newObject.creator,
              id: _this.creatorForm,
              uniqueKey: "user" + _this.creatorForm,
            },
          ];
          var personNames = [];
          var personId = [];
          _this.findUserObjM = [];
          _this.persoArrayedit = [];
          for (var i = 0; i < _this.personList.length; i++) {
            let obj = {
              name: _this.personList[i].usName,
              label: _this.personList[i].usName,
              id: _this.personList[i].userId,
              uniqueKey: "user" + _this.personList[i].userId,
            };
            personNames.push(_this.personList[i].usName);
            personId.push(_this.personList[i].userId);
            _this.findUserObjM.push(obj);
          }
          _this.newObject.visit_personnel = personNames.join(",");
          _this.persoArrayedit = personId;
          _this.newObject.startDate = response.data.startDate;
          _this.newObject.endDate = response.data.endDate;
          _this.newObject.place = response.data.place;
          _this.newObject.result = response.data.result;
          _this.getFileListEdit = response.data.fileList || [];
          if (response.data.fileList && response.data.fileList.length) {
            this.getFileListEdit.forEach((v) => {
              v.docId = v.fileId;
              v.docName = v.fileName;
            });

            _this.fileList = response.data.fileList.map(function (item) {
              return {
                fileName: item.fileName,
                fileId: item.fileId,
                rfsId: item.rfsId,
                filetype: item.fileType,
              };
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 导出
    handleExport() {
      //导出表格
      if (this.multipleSelection.length > 0) {
        if (this.$store.state.customObj.id == 1) {
          this.nameexport = this.custData.name;
          this.typeNames = "融资客户";
        } else if (this.$store.state.customObj.id == 2) {
          this.nameexport = this.naturalData.name;
          this.typeNames = "自然人";
        } else if (this.$store.state.customObj.id == 3) {
          this.nameexport = this.finacnData.name;
          this.typeNames = "中介机构";
        }
        var exportdata = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          exportdata.push({
            id: this.multipleSelection[i].id,
            customType: this.typeNames, //客户类型
            name: this.nameexport, //客户名称
            date: this.multipleSelection[i].date,
            place: this.multipleSelection[i].place,
            visitPersonnelName: this.multipleSelection[i].visitPersonnelName,
            form: this.multipleSelection[i].form,
            result: this.multipleSelection[i].result,
            creatorName: this.multipleSelection[i].creatorName,
            createTime: this.multipleSelection[i].createTime,
          });
        }
        var params = {
          // 参数
          data: exportdata,
        };
        this.$store.commit("export", {
          url: "/info/crm/exportVisit",
          data: exportdata,
        });
      } else {
        this.$message({
          message: "请选择一条数据",
          type: "warning",
        });
      }
    },
    // 列表数据
    custvustList() {
      console.log(this.$store.state.customObj.id);
      if (this.$store.state.customObj.id == 1) {
        this.companyid = this.custData.id;
        this.companyNames = this.custData.name;
        var data = {
          data: {
            userId: this.searchForm, //拜访人员id
            companyId: this.custData.id,
            date: this.search_form.startDate, //日期
          },
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        this.$post("/info/crm/companyVisit", data)
          .then((response) => {
            if (response.code != this.success_code) {
              this.$message.error(response.msg);
              return;
            }
            if (response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.custvustList();
              return;
            }
            for (var i = 0; i < response.data.list.length; i++) {
              response.data.list[i].date =
                response.data.list[i].startDate +
                "--" +
                response.data.list[i].endDate;
            }
            this.tableData = response.data.list;
            this.dataTotal = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (this.$store.state.customObj.id == 2) {
        this.companyNames = this.naturalData.name;
        var data = {
          data: {
            userId: this.searchForm, //拜访人员id
            // date:this.startDate, //日期,
            date: this.search_form.startDate, //日期
            individualId: this.naturalData.id,
          },
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        this.$post("/info/crm/individualVisit", data)
          .then((response) => {
            if (response.code != this.success_code) {
              this.$message.error(response.msg);
              return;
            }
            if (response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.custvustList();
              return;
            }
            for (var i = 0; i < response.data.list.length; i++) {
              response.data.list[i].date =
                response.data.list[i].startDate +
                "--" +
                response.data.list[i].endDate;
            }
            this.tableData = response.data.list;
            this.dataTotal = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (this.$store.state.customObj.id == 3) {
        this.companyNames = this.finacnData.name;
        var data = {
          data: {
            userId: this.searchForm, //拜访人员id
            // date:this.startDate,  //日期
            date: this.search_form.startDate, //日期
            intermediaryId: this.finacnData.id,
          },
          pageNo: this.currentPage,
          pageSize: this.pageSize,
        };
        this.$post("/info/crm/intermediaryVisit", data)
          .then((response) => {
            //console.log(response.data)
            if (response.code != this.success_code) {
              this.$message.error(response.msg);
              return;
            }
            if (response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.custvustList();
              return;
            }
            for (var i = 0; i < response.data.list.length; i++) {
              response.data.list[i].date =
                response.data.list[i].startDate +
                "--" +
                response.data.list[i].endDate;
            }
            this.tableData = response.data.list;
            this.dataTotal = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      this.custvustList();
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(val) {
      this.pageSize = val;
      this.custvustList();
    },
    //新增保存
    saveMsgadd() {
      if (this.newObjectadd.creator == "") {
        this.$message.error("拜访创建人内容不能为空");
        return;
      }
      if (this.newObjectadd.startDate == "" || this.newObjectadd.startDate == null) {
        this.$message.error("拜访开始日期内容不能为空");
        return;
      }
      if (this.newObjectadd.endDate == "" || this.newObjectadd.endDate == null) {
        this.$message.error("拜访结束日期内容不能为空");
        return;
      }
      if (this.newObjectadd.visit_personnel == "") {
        this.$message.error("拜访人员内容不能为空");
        return;
      }
      if (this.newObjectadd.place == "") {
        this.$message.error("拜访地点内容不能为空");
        return;
      }
      if (this.newObjectadd.result == "") {
        this.$message.error("主要成果内容不能为空");
        return;
      }
      if (
        new Date(this.newObjectadd.endDate) <
        new Date(this.newObjectadd.startDate)
      ) {
        this.$message.error("结束时间不能小于开始时间");
        return;
      }
      var arrayFileiD = [];
      for (var i = 0; i < this.fileList.length; i++) {
        arrayFileiD.push(this.fileList[i].id);
      }
      var arrayFileName = [];
      for (var i = 0; i < this.fileList.length; i++) {
        arrayFileName.push(this.fileList[i].name);
      }
      if (this.$store.state.customObj.id == 1) {
        this.typeIds = this.custData.id;
        this.typeNames = 1;
      } else if (this.$store.state.customObj.id == 2) {
        this.typeIds = this.naturalData.id;
        this.typeNames = 2;
      } else if (this.$store.state.customObj.id == 3) {
        this.typeIds = this.finacnData.id;
        this.typeNames = 3;
      }

      var addObj = {
        data: {
          name: this.companyid, //客户名称
          creator: this.creatorForm, //拜访创建人
          form: this.newObjectadd.form, //拜访形式
          visitPersonnels: this.persoArray, //拜访人员
          startDate: this.newObjectadd.startDate, //拜访开始日期
          endDate: this.newObjectadd.endDate, //拜访结束日期
          place: this.newObjectadd.place, //拜访地点
          result: this.newObjectadd.result, //主要成果
          type: this.typeNames, //客户类型
          typeId: this.typeIds, //客户类型id
          //companyId:this.custData.id,//机构(公司)id
          // individualId:this.naturalData.id,//自然人(个人)id
          // intermediaryId:this.finacnData.id,//中介机构（中介机构表）id
          // fileNames:arrayFileName,//附件名称
          // fileIds:arrayFileiD///附件（关联附件）id
          fileList: this.selectedFileList,
        },
      };
      var _this = this;
      this.$post("/info/crm/visit/add", addObj)
        .then((response) => {
          if (response.code == _this.success_code) {
            // 保存成功，关闭弹窗，关闭定时器
            _this.closemediumDialog();
            // 保存成功，清空草稿数据
            _this.$utils.removeDraft("visitnote", false);
            this.handleNewProData();
            _this.dialogVisibleadd = false;
            _this.custvustList();
            _this.$message({
              message: "新增成功",
              type: "success",
            });
          } else {
            _this.$message(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //详情的编辑
    saveMsgesave() {
      this.disabled = false;
      this.aaaa = true;
      this.btn_flagedit = false;
      this.btn_flagesave = true;
      this.deledDoc = true;
      this.isdown = false;
    },
    //编辑
    saveMsgedit() {
      if (this.newObject.creator == "") {
        this.$message.error("拜访创建人内容不能为空");
        return;
      }
      if (this.newObject.startDate == null) {
        this.$message.error("拜访开始日期内容不能为空");
        return;
      }
      if (this.newObject.endDate == null) {
        this.$message.error("拜访结束日期内容不能为空");
        return;
      }
      if (this.newObject.visit_personnel == "") {
        this.$message.error("拜访人员内容不能为空");
        return;
      }
      if (this.newObject.place == "") {
        this.$message.error("拜访地点内容不能为空");
        return;
      }
      if (this.newObject.result == "") {
        this.$message.error("主要成果内容不能为空");
        return;
      }
      if (
        new Date(this.newObject.endDate) < new Date(this.newObject.startDate)
      ) {
        this.$message.error("结束时间不能小于开始时间");
        return;
      }
      var arrayFileiD = [];
      for (var i = 0; i < this.fileList.length; i++) {
        arrayFileiD.push(this.fileList[i].id);
      }
      var arrayFileName = [];
      for (var i = 0; i < this.fileList.length; i++) {
        arrayFileName.push(this.fileList[i].name);
      }
      let fileListAll = this.getFileListEdit.concat(this.selectedFileListEdit);
      console.log(11, fileListAll);
      var addObj = {
        data: {
          id: this.globalId, //id
          // name: this.companyid, //客户名称
          creator: this.creatorForm, //拜访创建人(1个id)
          form: this.newObject.form, //拜访形式
          visitPersonnels: this.persoArrayedit, //拜访人员(多个id，数组形式)
          startDate: this.newObject.startDate, //拜访开始日期
          endDate: this.newObject.endDate, //拜访结束日期
          place: this.newObject.place, //拜访地点
          result: this.newObject.result, //主要成果
          companyId: this.custData.id, //机构(公司)id
          individualId: this.naturalData.id, //自然人(个人)id
          intermediaryId: this.finacnData.id, //中介机构（中介机构表）id
          // fileNames:arrayFileName,//附件名称
          // fileIds:arrayFileiD ///附件（关联附件）id
          // fileNames:["xx.cod"],
          // fileIds:[1]
          fileList: fileListAll,
        },
      };
      var _this = this;
      this.$post("/info/crm/visit/update", addObj)
        .then((response) => {
          if (response.code == _this.success_code) {
            //console.log(response.data);
            _this.dialogVisibleedit = false;
            _this.$message({
              message: "修改成功",
              type: "success",
            });
            _this.custvustList();
          } else {
            _this.$message(response.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss" type="text/css">
.baifangjiliparents .visitnote {
  position: relative;
  background: #fff;
  .form_box {
    background: #fff;
    padding-top: 5px;
    padding-left: 10px;
    // padding-bottom:20px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 15px;
      height: 40px;
      .el-input {
        width: 217px;
      }
      .inline-input {
        width: 217px;
      }
      .el-select {
        width: 217px;
      }
    }
    .el-button {
      float: left;
      margin-left: 20px;
      margin-top: 0px;
    }
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    margin-right: 40px;
  }
  .func_btn {
    width: 200px;
    position: relative;
    top: -40px;
  }
  .el-dialog {
    .upload_box {
      position: relative;
      max-width: 200px;
      display: inline-block;
      margin-top: 15px;
      label {
        width: 100px;
        text-align: right;
        display: inline-block;
        margin-right: 8px;
      }

      input {
        width: 80px;
        height: 32px;
        opacity: 0;
        position: absolute;
        left: 110px;
        top: 0;
      }
    }
  }
}

.attachment-wrap {
  margin: 0 30px 0 110px;
  //    overflow-y: auto;
  //    max-height:130px;
}

.mt-10 {
  margin-top: 10px;
}
p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc .doc-name {
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p.attachemnt-list-doc .doc-delete {
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
</style>
<style>
.baifangjiliparents .visitnote .table_box {
  padding: 0 10px;
  box-sizing: border_box;
}
.baifangjiliparents .visitnote .add_per {
  position: absolute;
  right: 20px;
  top: -10px;
}
.baifangjiliparents .visitnote .el-dialog {
  text-align: left;
}
.baifangjiliparents .visitnote .el-textarea {
  width: 550px;
}
.baifangjiliparents .visitnote .el-dialog__footer {
  text-align: right;
  margin-right: 40px;
}
.baifangjiliparents .visitnote .el-dialog__header {
  text-align: center !important;
  color: #333 !important;
  border-bottom: 1px solid #e6e6e6;
}
.baifangjiliparents .cell .el-button--text {
  padding: 0;
}
/* .visitnote .el-dialog__body{
      padding:24px!important;
  } */
.baifangjiliparents .visitnote .dialog_tit {
  font-size: 16px;
  font-weight: 600;
}
.baifangjiliparents .visitnote .opt_btn {
  position: absolute;
  top: -2px;
  right: 0;
  height: 38px;
}

.baifangjiliparents .visitnote .el-button--medium {
  padding: 12px 20px !important;
}
.baifangjiliparents .visitnote .shanchutankuang .el-dialog .el-dialog__header {
  border-bottom: 1px solid #fff !important;
  text-align: left !important;
  font-size: 18px;
  color: #303133;
}
.baifangjiliparents .visitnote .shanchutankuang .el-dialog .el-dialog__footer {
  margin-right: 0px;
}
.baifangjiliparents .visitnote .shanchutankuang .el-dialog__body {
  text-align: left;
}

.baifangjiliparents
  .visitnote
  .shanchutankuang
  .el-dialog
  .el-dialog__footer
  .dialog-footer
  .el-button {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}

.baifangjiliparents .visitnote .el-textarea .el-textarea__inner {
  resize: none;
}
</style>
