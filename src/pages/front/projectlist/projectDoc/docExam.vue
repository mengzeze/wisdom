<template>
  <div class="project-doc-exam">
    <el-dialog :title="dialogTitle"
               center
               top="60px"
               :close-on-click-modal="false"
               :visible.sync="isdocExamIsShow"
               @close="clickEvent"
               width="800px">
      <el-scrollbar style="height: 550px">
        <div class="project-doc-exam pr-20">
          <p class="sub-title">项目信息</p>
          <div class="project1">
            <div class="bellong-project">
              所属项目：
              <span :title="projectData.projectName">{{projectData.projectName}}</span>
            </div>
            <div class="bellong-project"
                 :title="financingName">
              业务类型：
              <span>{{financingName}}</span>
            </div>
            <div class="bellong-project"
                 :title="proStageName">
              当前阶段：
              <span>{{proStageName}}</span>
            </div>
            <div class="bellong-project1">
              提审{{examType==2 || examType==10 ?'文件':'目录'}}信息：
              <span>共计提审<span class="color-primary"> {{mySelectedDoc.length}} </span>个{{examType==2 || examType==10 ?'文件':'目录'}}</span>
            </div>
            <ul>
              <li v-for="(item,index) in inputdata.form"
                  :key="index">
                <p style="border: none;">
                  <i>{{item.name}}：</i><span>
                    <el-input size="mini"
                              v-model="docExamSelect"
                              placeholder="请输入选择"></el-input>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <p class="sub-title">审批信息</p>
          <div v-show="initDocExamRoleinfo.key"
               style="padding-left: 24px;">
            <i class="bitians">*</i>发起人所属部门：
            <el-select size="small"
                       v-model="value"
                       filterable
                       @change="initDocExamRole(true)"
                       placeholder="请选择部门">
              <el-option v-for="item in isMultiDeptdata.deptList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="proend">
            <p style="margin-top:20px;">申请内容：</p>
            <textarea class="input-remarks"
                      placeholder="请输入申请内容，最多输入400字"
                      v-model="textares"
                      cols="60"
                      rows="6"
                      maxlength="400"></textarea>
          </div>
          <div class="project3">
            <div class="align-left clearfix">
              <span class="fl">审批环节:</span>
              <span v-show="isMultiDept"
                    class="fl">请填完必填项，会默认展示审批流程图。</span>
              <span v-show="!isMultiDept"
                    class="fl initiate_title">发起人：</span>
            </div>
            <div v-show="!isMultiDept">
              <div class="initiate_box">
                <!-- <div class="initiate_title">发起人：</div> -->
                <div class="initiate_people">{{$store.state.loginObject.userName}}</div>
              </div>

              <p style="text-align:left;margin-left:68px;">审批人：<i class="mode-remarks">（审批方式，{{examWay}}）</i></p>
              <ul style="margin-top:10px;margin-left:68px;"
                  class="clearfix">
                <li class="fl"
                    v-for="(item, index) in examPersonList"
                    :key="index">
                  <span class="fl"
                        style="margin-top: 6px;margin-right:6px;">
                    {{item}}
                  </span>
                  <span class="pro5 fl"
                        style="margin-top: 16px;margin-right:6px;"
                        v-if="index != (examPersonList.length -1)"></span>
                </li>
              </ul>
              <p class="tips"
                 v-if="noAudit">注：审批流程涉及项目角色，需要选择项目后显示审批人。</p>
              <div style="margin-top:16px;margin-left:68px;"
                   class="align-left">抄送人：<i class="mode-remarks">（抄送方式，审批通过后通知）</i></div>
              <div class="copy-person-box clearfix">
                <ul class="fl clearfix">
                  <li class="fl"
                      v-for="(item, index) in copyPostPersonList"
                      :key="index">
                    <span class="copy-person-name fl">
                      {{item.copyName}}
                      <i class="delete-copy-person"
                         @click="deletePerFn(index)"
                         v-if="item.isDelete"></i>
                    </span>
                  </li>
                </ul>
                <el-button type="primary"
                           size="medium"
                           @click="addPerFn"
                           class="fl">选择人员</el-button>
              </div>
              <p class="tips"
                 v-if="noCopyUser">注：审批流程涉及项目角色，需要选择项目后显示抄送人。</p>
            </div>
            <div class="annex-box">
              <div class="clearfix">
                <div class="all-check-box fl">
                  <el-checkbox :indeterminate="isIndeterminate"
                               v-model="checkAllNnex"
                               @change="handleCheckAllChange"
                               :disabled="!selectedFileList.length">附件：</el-checkbox>
                </div>
                <div class="fl">
                  <add-attachment ref="attachment"
                                  :showDisabled="false"
                                  :projectId="projectData.projectId"
                                  @select="$utils.handleSelect(arguments, selectedFileList)"></add-attachment>
                </div>
                <el-button size="medium"
                           type="text"
                           class="fr"
                           v-if="selectedFileList.length"
                           @click="selectDocLot">删除</el-button>
              </div>
              <ul class="attachemnt-list-box">
                <li v-for="(item, index) in selectedFileList"
                    class="attachemnt-list-item"
                    :key="index">
                  <el-checkbox :label="item"
                               v-model="item['checked']"
                               class="select-box"
                               @change="handleCheckedDocChange(item, index)">
                    <p class="attachemnt-list-doc">
                      <span class="doc-name"
                            @click="$utils.handleUploadFilePreview(item, {projectId:projectData.projectId,sourceName:'发起审批',projectName:projectData.projectName})"
                            :title="item.docName">{{item.docName}}</span>
                      <span class="attachemnt-list-btns">
                        <el-button v-if="item.addSource!==1"
                                   type="text"
                                   class="color-primary-hover"
                                   @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                        <!-- <el-button type="text" class="color-primary-hover" @click="$utils.handleDeleteSelected(selectedFileList, item)">删除</el-button> -->
                        <el-button type="text"
                                   class="color-primary-hover"
                                   @click="oneDelete(item)">删除</el-button>
                      </span>
                    </p>
                  </el-checkbox>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <span slot="footer"
            class="dialog-footer">
        <el-checkbox v-model="isSetRamindchecked">是否设置提醒</el-checkbox>
        <el-button size="medium"
                   @click="clickEvent">取 消</el-button>
        <el-button size="medium"
                   type="primary"
                   @click="submitApprove">提交审批</el-button>
      </span>
    </el-dialog>
    <relation-Add-Doc v-if="selectProjectDocIsShow"
                      @clearstates="projectClears"
                      @elationUp="selectProjectDocSure"></relation-Add-Doc>
    <manuscript-Add-Doc v-if="relafagmanus"
                        @clearstate="clears"
                        :manscProjectId="projectId"
                        :filterDocStatus="true"
                        @elationUpmansc="elationUpmanscFn"></manuscript-Add-Doc>
    <findall-deptuser :findFlagShow.sync="findFlag"
                      v-on:findAllUser="findAllUser"
                      :findUserObj="findUserObj"
                      :findState="findState"
                      :checkState="checkState"></findall-deptuser>
    <upload-add-doc ref="uploadVersion"
                    v-if="addDoc"
                    :uploadDocAddIsShow="uploadDocAddIsShow"
                    :uploadParamData="uploadParamData"
                    @sendValueToParent="uploadAddDocClose"
                    @docUpload="docUpload"
                    @docUploadAllsucess="docUploadAllsucess">
    </upload-add-doc>
    <!-- 是否设置提醒弹框 -->
    <el-dialog title="审批提醒"
               :visible.sync="approveRemind"
               width="720px"
               :before-close="handleClose">
      <div style="height: calc(100vh - 400px);">
        <el-scrollbar style="height: 100%">
          <el-form :model="formInline"
                   class="demo-form-inline"
                   label-width="100px"
                   style="text-align:left">
            <el-form-item label="提醒方式："
                          class="remindRight">
              <el-checkbox-group v-model="remindWay" :min="1">
                <el-checkbox v-for="way in remindWayGrounp"
                             :label="way.label"
                             :key="way.value">{{way.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="接收人员："
                          class="remindRight">
              <el-tag v-for="(item,index) in approverData.approvalName"
                      :key="index"
                      class="userbtn"
                      @close="deletePerFnexam(index)"
                      :closable="!chack_bule">
                {{item}}
              </el-tag>
            </el-form-item>
            <el-form-item label="提醒内容："
                          class="remindRight">
              <el-input type="textarea"
                        cols="40"
                        rows="5"
                        resize="none"
                        v-model.trim="formInline.contentMessage"
                        maxlength="100"></el-input>
              <!-- <el-input type="textarea"
                        cols="40"
                        rows="5"
                        resize="none"
                        v-model.trim="formInline.contentEmial"
                        maxlength="100"
                        class="remindContent"
                        v-if="contentEmial" disabled="disabled"></el-input>
              <el-input type="textarea"
                        cols="40"
                        rows="5"
                        resize="none"
                        v-model.trim="formInline.contentNote"
                        maxlength="100"
                        class="remindContent"
                        v-if="contentNote" disabled="disabled"></el-input> -->
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="approveRemindclose">取 消</el-button>
        <el-button type="primary"
                   @click="approveRemindSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import uploadAddDoc from '@/components/file/uploadAddDoc';
import relationAddDoc from "@/components/relation/projectDocRelation";
// 从底稿选择附件
import manuscriptAddDoc from "@/components/relation/manuscript";
export default {
  name: "docExam",
  components: {
    uploadAddDoc,
    findallDeptuser,
    relationAddDoc,
    manuscriptAddDoc
  },
  props: [
    'projectData',
    'examType',//审批类型，文件审批2 目录审批3 文件修订审批10 目录修订审批11
    'docSource',//项目文档1，底稿管理2
    'activeSource', // 发起审批页1 项目审批2
    'approvalData', // 发起审批页使用时，项目数据使用这个，不使用接口数据
    'openAudit' // 修订审批流程是否启用 只有发起审批页/项目审批页
  ],
  watch: {
    isdocExamIsShow (val) {
      if (val) {
        this.initDetail()
        this.querysShenp()
        this.isSetRamindchecked = false
        this.msgAlert(200)
      } else {
        // this.apprList.length = 0
        // this.reviseFileArray.length = 0
        this.value = ''
        this.textares = ''
        this.initDocExamRoleinfo.key = false
        this.isActive = false
        this.selectedFileList.splice(0)
        this.checkedFiles.splice(0)
        this.isIndeterminate = false
        this.checkAllNnex = false
      }
    },
    selectedFileList: {
      handler () {
        if (this.selectedFileList.length == 0) {
          this.isIndeterminate = false;
          this.checkAllNnex = false
        }
        this.selectedFileList.map(item => {
          item.checked = item.checked == true;
        })
        let checkedCount = this.checkedFiles.length;
        let allLen = this.selectedFileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
        this.checkAllNnex = checkedCount == allLen && checkedCount != 0
      },
      deep: true
    },
    'approverData.approverId': {
      handler (newName, oldName) {
        console.log(newName.length)
        if (newName != null) {
          if (newName.length <= 1) {
            this.chack_bule = true;
          } else {
            this.chack_bule = false;
          }
        }

      },
      deep: true
    }
  },
  mounted () {
    this.getPromptType()
  },
  computed: {
    dialogTitle () {
      const obj = {
        2: '文件审批',
        3: '目录审批',
        10: '文件修订审批',
        11: '底稿目录修订审批'
      }
      return obj[this.examType]
    }
  },
  data () {
    return {
      value: '',
      initDocExamRoleinfo: {},
      isdocExamIsShow: false,
      isMultiDept: false,
      isMultiDeptdata: {},
      docFlowChartData: {},
      selectedFileList: [],
      token: "",
      userId: '',
      success_code: "",
      projectId: '',//项目ID
      examPersonList: [],//审核人列表
      copyPostPersonList: [],//抄送人列表
      examWay: '',
      mySelectedDoc: [],
      inputdata: '',
      docExamSelect: '',
      textares: '',//备注信息
      addDoc: false,
      uploadDocAddIsShow: false,
      uploadParamData: {
        docSource: 0,//固定为0
        projId: '',
        parentId: '',
        auditProjectId: null
      },
      selectedDocLocal: [],//本地上传文件ID集合
      //选择人员
      findFlag: false,
      findState: {},
      checkState: {},
      // 项目文档
      selectProjectDocIsShow: false,
      selectedDocList: [],//选中的项目文档
      selectedDocListId: [],//选中的项目文档ID
      relafagmanus: false, //从底稿选择文件
      findUserObj: [],
      //选中附件相关
      isIndeterminate: false,
      checkAllNnex: false,
      checkedFiles: [],
      checkedFilesList: [],
      financingName: '',//融资类型
      proStageName: '',//项目阶段名称
      noAudit: false,
      noCopyUser: false,
      isSetRamindchecked: false,  //是否设置提醒勾选
      approveRemind: false, //设置提醒弹框出现
      remindWay: ['站内信'],
      remindWayGrounp: [{
        label: "站内信",
        value: 0
      }],
      formInline: {
        content: '',
        contentMessage: '',
        contentNote: '',
        contentEmial: ''
      },
      chack_bule: false,
      //   contentZhan:true,
      //   contentNote: false,
      //   contentEmial: false,
      projectSelect: [], // 项目文档已选
      manuSelect: [], // 底稿管理已选
      apprList: [],  // 要进行审批的数据
      reviseFileArray: [], // 过滤后的修订审批数据
      isActive: false, // 组件的激活状态
      isInitateAppr: false, // 是否从发起审批页/项目审批调用
      shenpiId: "",
      approverData: {},//审批催办的数据
      approverDataCopy:{},  //审批催办的复制数据
      loadingInstance: {},
      messagefailed:"",
        errorMsg:""
    }
  },
  methods: {
    /**
     * msg提示统一处理
     * @param {Number} delayTime 延迟出现时间
     */
    msgAlert (delayTime = 0) {
      // isInitateAppr为true时才做提示
      if (this.isInitateAppr) {
        if (this.docSourceCom === 2 && (this.examType === 3 || this.examType === 11)) {
          setTimeout(() => { this.$message.warning('将会对底稿管理中选中目录发起审批') }, delayTime)
          return
        }
        setTimeout(() => { this.$message.warning(this.docSourceCom === 1 ? '将会对项目文档中选中文件发起审批' : '将会对底稿管理中选中文件发起审批') }, delayTime)
      }
    },
    // 激活组件
    activeComp () {
      if (this.isActive) return
      this.$nextTick(() => {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.projectData.projectId;
        this.financingName = this.projectData.financingName || this.$store.state.projectMsg.projectMsg.financingName;
        this.success_code = this.code.codeNum.SUCCESS;
        this.uploadParamData.projId = this.projectData.projectId;
        this.uploadParamData.parentId = this.projectData.docParentId;
        this.uploadParamData.auditProjectId = this.projectData.processId;
        this.proStageName = this.projectData.proCurProcessName || this.projectData.processName;
        this.docSourceCom = this.docSource
        this.isInitateAppr = !!this.activeSource // 是否为发起审批页/项目审批页调用
        // 更新数据
        // this.$select.updateStatus(1, this.projectId, this.projectId)
        // this.$select.updateStatus(2, this.projectId, this.projectId)
        this.projectSelect = this.$select.getSelectedData(1, this.projectId)
        this.manuSelect = this.$select.getSelectedData(2, this.projectId)
        setTimeout(() => { this.initData() }, 500)
      })
    },
    // loading激活
    loadingActive () {
      this.loadingInstance = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading'
      })
    },
    // 初始化处理数据
    async initData () {
      this.isActive = true
      this.loadingActive()
      // 文件审批为2 文件修订审批为10 目录审批为3 目录修订审批为11
      // 方便后期扩展
      // 审批
      const appr = [2, 3]
      // 修订审批
      const xdAppr = [10, 11]
      // 先判断逻辑不同的(发起审批页判断不同)
      if (this.isInitateAppr) {
        // 文件审批在项目文档需要判断权限
        if(this.examType == 2 && !this.$utils.checkProjectPermission('project_file_approve')) {
          this.$message.warning('您暂无项目权限，不可发起审批')
          this.isActive = false
          this.loadingInstance.close()
          return
        }
        if (this.examType == 3 || this.examType == 11) { // 目录审批
          if (this.manuSelect.dir.length == 0) {
            this.$message.warning('请到底稿管理选择目录后发起审批')
            this.isActive = false
            this.loadingInstance.close()
            return
          }
          // TODO：发起目录审批 目录修订审批
          // 获取子目录
          await this.getDirList(this.manuSelect.dir).then(res => {
            this.apprList = this.$utils.uniqBy([...res, ...this.manuSelect.dir], 'id')
          })
          await this.labelList(this.apprList)
          // this.apprList = this.manuSelect.dir
          this.docSourceCom = 2
        } else if (this.examType == 2 || this.examType == 10) { // 文件审批
          if (this.projectSelect.file.length == 0 && this.manuSelect.file.length == 0) {
            this.$message.warning('请到项目文档/底稿管理选择文件后发起审批')
            this.isActive = false
            this.loadingInstance.close()
            return
          } else if (this.projectSelect.file.length != 0 && this.manuSelect.file.length == 0) {
            // setTimeout(() => { this.$message.warning('将会对项目文档中选中文件发起审批') }, 800)
            this.docSourceCom = 1
            this.apprList = this.projectSelect.file
          } else if (this.manuSelect.file.length != 0) {
            // setTimeout(() => { this.$message.warning('将会对底稿管理中选中文件发起审批') }, 800)
            this.docSourceCom = 2
            this.apprList = this.manuSelect.file
          }
          // TODO: 文件审批 文件修订审批
        }
      } else {
        // 审批
        if (appr.includes(this.examType)) {
          this.apprList = this[this.docSource === 1 ? 'projectSelect' : 'manuSelect'][this.examType === 2 ? 'file' : 'dir']
          const msg = this.examType === 2 ? '文件' : '目录'
          if (this.apprList.length == 0) {
            this.$message.warning(`当前无选中${ msg }`);
            this.isActive = false
            this.loadingInstance.close()
            return
          }
        } else if (xdAppr.includes(this.examType)) {// 修订审批
          const msg = this.examType === 10 ? '文件' : '目录'
          this.apprList = this[this.docSource === 1 ? 'projectSelect' : 'manuSelect'][this.examType === 10 ? 'file' : 'dir']
          if (this.apprList.length == 0) {
            this.$message.warning(`当前无选中${ msg }`)
            this.isActive = false
            this.loadingInstance.close()
            return
          }
        }
        // 获取子目录
        if (this.examType === 11 || this.examType === 3) {
          await this.getDirList(this.manuSelect.dir).then(res => {
            this.apprList = this.$utils.uniqBy([...res, ...this.manuSelect.dir], 'id')
          })
          await this.labelList(this.apprList)
        }
      }
      // 审批
      appr.includes(this.examType) && this.fileApprove(this.examType)
      // 修订审批
      xdAppr.includes(this.examType) && this.reviseApprove(this.examType)
      this.loadingInstance.close()
    },
    // 修订审批不走审批
    reviseApproveNo () {
      this.msgAlert()
      const url = this.examType == 11 ? '/info/audit/updateDirStatusForRevise' : '/info/audit/updateFileStatusForRevise'
      this.$post(url, {
        data: {
          fileList: this.reviseFileArray.map(v => { return { docId: this.examType == 11 ? v.id : v.docId, parentId: v.parentId } })
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.warning(res.msg);
          this.isActive = false
          return;
        }
        this.$message.success('成功')
        this.isActive = false
        this.$emit('sendToParentQueryDoc');
        // TODO: 清空选中
        // 成功之后需要取消相对应的值
        this.clearSelection()
      })
    },
    clearSelection () {
      // 成功之后需要取消相对应的值--docSourceCom  1:项目文档  2：底稿
      console.log(this.docSourceCom, this.projectId, '3333')
      this.$select.clearSelection(this.docSourceCom, this.projectId)
    },
    // 文件审批/目录审批
    async fileApprove () {
      const msg = this.examType === 2 ? '文件' : '目录'
      let fileApproveArr = []
      let isAlert = false
      // 只有文件判断
      if (this.examType == 2) {
        // 过滤出非归档文件
        fileApproveArr = this.apprList.filter(v => v.auditStatus !== 8)
        // 全部为归档文件
        if (fileApproveArr.length === 0) {
          this.$message.warning('归档文件无法发起审批')
          this.isActive = false
          return
        }
        // 过滤到文件后 发起审批的时候提示
        this.apprList.length != fileApproveArr.length && (isAlert = true)
        // if (this.apprList.length != fileApproveArr.length) {
        //   isAlert = true
        // }
        // 判断锁定文件
        let flag = false;
        await this.judgeLock(this.apprList).then(res => { flag = res })
        if (flag) {
          this.$message.warning('手动锁定的文件不可发起审批')
          this.isActive = false
          return
        }
      }
      // 过滤到归档文件后 使用过滤后的数据
      let originArr = isAlert ? fileApproveArr : this.apprList
      // 排除审批通过、审批中、修订审批中
      let filterArr = originArr.filter(v => { return v.auditStatus == 0 || v.auditStatus == 1 || v.auditStatus == 6 })
      if (filterArr.length == originArr.length) {
        this.$message.warning(`请先选择可审批的${ msg }`)
        this.isActive = false
        return
      }
      this.apprList = originArr
      this.mySelectedDoc = this.$utils.cloneDeepArray(this.apprList)
      await this.judgeApprove(this.examType).then(res => {
        if (!res) return
        // 文件/目录审批
        // 文件审批过滤掉文件后进行提示
        if (isAlert) {
          this.$confirm('归档文件不能再进行审批，发起审批时将自动过滤', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(_ => {
            this.isdocExamIsShow = true;
          }).catch(_ => {
            this.isActive = false
          })
          return
        }
        this.isdocExamIsShow = true;
      }).catch(err => {
        console.log(err);
      });
    },
    // 文件/目录修订审批
    reviseApprove () {
      const msg = this.examType === 10 ? '文件' : '目录'
      this.reviseFileArray = this.apprList.filter(item => item.auditStatus == 1);
      console.log(this.reviseFileArray, 'this.reviseFileArray')
      if (this.reviseFileArray.length == 0) {
        this.$message.warning(`仅审批通过的${ msg }可发起修订审批`);
        this.isActive = false
        return
      }
      this.mySelectedDoc = this.$utils.cloneDeepArray(this.reviseFileArray)
      this.judgeApprove(this.examType).then(resData => {
        if (!resData) return
        // 不需要走审批
        if (resData.code == -5041 || (this.isInitateAppr && !this.openAudit)) {
          if (this.apprList.length != this.reviseFileArray.length) {
            this.$confirm(`仅审批通过的${ msg }可发起审批，其他${ msg }将自动过滤`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.reviseApproveNo();
            }).catch((err) => { this.isActive = false });
          } else {
            this.reviseApproveNo();
          }
          return
        }
        if (this.apprList.length != this.reviseFileArray.length) {
          this.$confirm(`仅审批通过的${ msg }可发起审批，其他${ msg }将自动过滤`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.isdocExamIsShow = true;
          }).catch(() => { this.isActive = false })
        } else {
          this.isdocExamIsShow = true;
        }
      })
    },
    /**
    * @param {Array,Object} val
    * @param {Array} 指定数组数据
    * 查文件审批状态，小图标状态，底稿关联文件，自定义标签
    */
    async labelList (val, arr = this.apprList) {
      return await this.$post('/doc/paper/docStatusAll', {
        data: {
          idSet: Array.isArray(val) ? val.map(v => v.id) : [val.id],
          projectId: this.projectId
        }
      }).then(response => {
        if (response.code == -503) {
          return
        }
        if (response.code != 0) {
          this.$message.error(response.msg);
          return;
        }
        Object.keys(response.data).forEach(id => {
          arr.forEach(item => {
            if (id == item.id) {
              let resItem = response.data[id];
              this.$set(item, 'auditStatus', resItem.auditStatus);
              // this.$set(item, 'icon', resItem.paperLabelList);
              // this.$set(item, 'indexPaper', resItem.linkList);
              // 0:待审核/1:审批通过/2:驳回未修改/3:节点审批通过/4:待审批/5:驳回已修改/6:修订审批中/7:修订中/8:已归档
              // this.$set(item, 'notes', resItem.notes); // 是否有备注信息
              // this.$set(item, 'reminder', resItem.reminder); // 是否有文件提醒
              // this.$set(item, 'lockState', resItem.lockState); // 是否有锁
              // this.$set(item, 'record', resItem.record); // 是否有审批意见
              // this.$set(item, 'isShowIcon', true); // 防止图标闪烁
            }
          })
        })
        return
      })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取目录下子目录
     * @param {Array} 目录
     */
    async getDirList (arr) {
      const resData = await this.$post('/doc/paper/queryDirForDir', {
        data: {
          proFileDirIds: arr.map(v => v.id)
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.warning(res.msg);
          this.isActive = false
          return
        }
        return res.data.content
      }).catch(err => { console.log(err) })
      return resData
    },
    /**
      * 判断文件是否锁定(后端判断)
      * @param {Array} 需要判断的文件docId
      */
    async judgeLock (arr) {
      const resData = await this.$post('/info/audit/judeFileHaveLock', {
        data: {
          docIdList: arr.map(v => v.docId)
        }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.warning(res.msg);
          this.isActive = false
          return true
        }
        return res.data
      }).catch(err => { console.log(err) })
      return resData
    },
    // 判断是否可以发起审批
    async judgeApprove (procTypeId) {
      let resData = await this.$post('/info/service/getProcessInfoByProjId', {
        data: {
          projId: this.projectId,
          procTypeId //文件审批为2，文件修订审批为10 目录审批为3,11为目录修订审批
        }
      }).then(res => {
        if (!this.isInitateAppr && res.code == -3520) {
          console.log('存在多个要去发起审批页')
          res.dialogTitle = this.dialogTitle
          res.procTypeId = procTypeId
          this.$emit('multipleCallback', res)
          this.isActive = false
          return
        } else if (res.code != this.success_code && res.code != -5041 && res.code != -3520) {
          this.$message.warning(res.msg);
          this.isActive = false
          return false
        }
        // 如果是发起审批页 数据使用props数据
        if (this.isInitateAppr) {
          this.docFlowChartData = this.approvalData
          // 不需要走审批
          if (!this.openAudit) {
            return true
          }
          return res
        }
        const data = res.data
        this.docFlowChartData = {
          modelId: data.actModelId,
          deploymentId: data.procDeployId,
          versionId: data.procVersionNum,
          financingTypeId: data.finaTypeId,
          categoryId: data.procTypeId,
          docExamProcessName: data.procName,
          catalogExamProcessName: data.procName
        }
        return res
      })
      return resData
    },
   // checkboxChose (value) {
     // console.log(value)
    //   if (value.indexOf("邮件") != -1) {
    //     console.log(111)
    //     console.log(value)
    //     this.contentEmial = true;
    //     this.contentNote = false;
    //     this.contentZhan = true;
    //   }
    //   if (value.indexOf("短信") != -1) {
    //     console.log(222)
    //     console.log(value)
    //     this.contentEmial = false;
    //     this.contentNote = true;
    //     this.contentZhan = true;
    //   }
    //   if (value.indexOf("短信") != -1 && value.indexOf("邮件") != -1) {
    //     this.contentEmial = false;
    //     this.contentNote = true;
    //     this.contentZhan = true;
    //   }
    //    if (value.indexOf("短信") != -1 && value.indexOf("邮件") != -1  && value.indexOf("") != -1) {
    //     this.contentEmial = false;
    //     this.contentNote = true;
    //     this.contentZhan = true;
    //   }
    //   if (value == "站内信") {
    //       console.log(value)
    //       console.log(444)
    //     this.contentEmial = false;
    //     this.contentNote = false;
    //   }
    //   if (value == "邮件") {
    //       console.log(value)
    //       console.log(444)
    //       this.contentZhan = false;
    //     this.contentEmial = true;
    //     this.contentNote = false;
    //   }
    //   if (value == "短信") {
    //       console.log(value)
    //       console.log(444)
    //       this.contentZhan = false;
    //     this.contentEmial = false;
    //     this.contentNote = true;
    //   }
    //   if (value == []) {
    //       console.log(value)
    //       console.log(9999)
    //     this.contentEmial = false;
    //     this.contentNote = false;
    //     this.contentZhan = false;
    //   }
    // },
    //关闭提醒方法弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.remindWay = ["站内信"]
        })
        .catch(_ => { });

    },
    // 获取提醒方式
    getPromptType () {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.success_code == res.code) {
            res.data.email == 1 && this.remindWayGrounp.push({ label: "邮件", value: 1 });
            res.data.sms == 1 && this.remindWayGrounp.push({ label: "短信", value: 2 });;
            return;
          }
          this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckAllChange (val) {//复选框    
      if (val) {
        this.selectedFileList.map(item => {
          item.checked = true;
        })
      } else {
        this.selectedFileList.map(item => {
          item.checked = false;
        })
      }
      this.checkedFiles = val ? this.$utils.cloneDeepArray(this.selectedFileList) : [];
    },
    handleCheckedDocChange (item, index) {//单个选中或取消选中
      // let ind = this.checkedFiles.findIndex(v=>v.id == item.id && v.addSource == item.addSource)
      let ind = item.addSource == 1 ? this.checkedFiles.findIndex(v => v.docId == item.docId && v.addSource == item.addSource) :
        this.checkedFiles.findIndex(v => v.id == item.id && v.addSource == item.addSource)
      console.log('单个选中', item.checked)
      if (item.addSource == 1 && item.checked) {
        let ind2 = this.selectedFileList.findIndex(v => v.docId == item.docId && v.addSource == item.addSource)
        this.selectedFileList[ind2].checked = true;
      } else if (item.addSource == 1 && !item.checked) {
        let ind2 = this.selectedFileList.findIndex(v => v.docId == item.docId && v.addSource == item.addSource)
        this.selectedFileList[ind2].checked = false;
      }

      item.checked ? this.checkedFiles.push(item) : this.checkedFiles.splice(ind, 1);
      let checkedCount = this.checkedFiles.length;
      let allLen = this.selectedFileList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
      this.checkAllNnex = checkedCount == allLen && checkedCount != 0
    },
    oneDelete (item) {
      console.log('文件信息', item)
      // this.checkedFiles.forEach((it, index) => {
      //     if (it.id == item.id && it.addSource == item.addSource && it.rfsId == item.rfsId) {
      //         this.checkedFiles.splice(index, 1);
      //     }
      // });
      this.checkedFiles.forEach((it, index) => {
        if (it.addSource == 1) {
          if (it.docId == item.docId && it.addSource == item.addSource) {
            this.checkedFiles.splice(index, 1);
          }
        } else {
          if (it.id == item.id && it.addSource == item.addSource) {
            this.checkedFiles.splice(index, 1);
          }
        }
      });
      this.checkedFilesList.forEach((it, index) => {
        // if (it.id == item.id && it.addSource == item.addSource && it.rfsId == item.rfsId) {
        //     this.checkedFilesList.splice(index, 1);
        // }
        if (it.addSource == 1) {
          if (it.docId == item.docId && it.addSource == item.addSource) {
            this.checkedFilesList.splice(index, 1);
          }
        } else {
          if (it.id == item.id && it.addSource == item.addSource) {
            this.checkedFilesList.splice(index, 1);
          }
        }
      });
      this.$utils.handleDeleteSelected(this.selectedFileList, item)
      let checkedCount = this.checkedFiles.length;
      let allLen = this.selectedFileList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
      this.checkAllNnex = checkedCount == allLen && checkedCount != 0
    },
    selectDocLot () {
      if (this.checkedFiles.length == 0) {
        this.$message.warning('请勾选想要删除的附件')
        return;
      }
      this.checkedFiles.forEach(item => {
        this.selectedFileList.forEach((it, index) => {
          // if (it.id == item.id && it.addSource == item.addSource  && it.rfsId == item.rfsId) {
          //     this.selectedFileList.splice(index, 1);
          // }
          if (it.addSource == 1) {
            if (it.docId == item.docId && it.addSource == item.addSource) {
              this.selectedFileList.splice(index, 1);
            }
          } else {
            if (it.id == item.id && it.addSource == item.addSource) {
              this.selectedFileList.splice(index, 1);
            }
          }
        });
      });
      this.checkedFiles = [];
      let checkedCount = this.checkedFiles.length;
      let allLen = this.selectedFileList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < allLen;
      this.checkAllNnex = checkedCount == allLen && checkedCount != 0
    },
    //关闭从项目文档选择
    projectClears () {
      this.selectProjectDocIsShow = false;
    },
    //关闭从底稿选择
    clears (varyt) {
      this.relafagmanus = false;
    },
    //判断用户是否有权限进行某一操作
    async canOperating (param, flag) {
      if (this.projectData.projectCreatBy == this.userId) {
        return true;
      } else {
        if (!param) {
          return;
        }
        var _this = this;
        var send_data = {
          token: this.token,
          userId: this.userId,
          data: {
            ids: param.docId,
            key: flag,
            docSource: 0
          }
        };
        var data = await _this
          .$post("/doc/paper/validateFilePermByUserId", send_data)
          .then((response) => {
            if (_this.success_code == response.code) {
              if (!response.data) {
                _this.$message({
                  message: "您没有权限进行该操作",
                  type: "error"
                });
                return false;
              } else {
                return true;
              }
            } else {
              _this.$message({
                message: "您没有权限进行该操作",
                type: "error"
              });
              return false;
            }
          })
          .catch(function (error) {
          });
      }
      return data;
    },
    downDocBtn (item) {
      var download_arr = [];
      download_arr.push({
        name: item.docName,
        id: item.docId
      });
      this.canOperating(
        {
          docId: item.id,
          download: true
        },
        "download"
      ).then(res => {
        if (res) {
          this.$store.commit("download", download_arr);
        }
      });
    },
    docView (item) {
      var proViewData = {
        projectId: this.projectId,
        rfsId: item.rfsId,
        docId: item.docId,
        photoType: item.type
      }
      this.$store.commit('previewAllFn', proViewData)
    },
    selectDocClose () {
      this.selectProjectDocIsShow = false;
    },
    addProjectDoc () {
      if (!this.$utils.checkProjectPermission('project_file')) {
        this.$message.error('无查看项目文档的权限');
        return;
      }
      this.selectProjectDocIsShow = true;
    },
    addDraftDoc () {
      if (!this.$utils.checkProjectPermission('project_file')) {
        this.$message.error('无查看项目文档的权限');
        return;
      }
      this.relafagmanus = true;
    },
    leftTreeLoadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ docName: '项目文档', id: '0', disabled: true }])
      } else {
        this.treeQueryDoc(node.data.id, resolve);
      }
    },
    //选择项目文档
    selectChange (data) {
      this.selectedDocList = data;
      this.selectedDocList = this.$refs.leftTree.getCheckedNodes();
      this.selectedDocListId = [];
      for (var i = 0; i < this.selectedDocList.length; i++) {
        this.selectedDocListId.push(this.selectedDocList[i].id);
      }
    },
    //查询项目文档
    treeQueryDoc (id, resolve) {
      let vm = this;
      let data = {
        "token": this.token,
        "userId": this.userId,
        "pageNo": 0,
        "pageSize": 5000,
        "data": {
          "projectId": this.projectData.projectId,
          "docContent": '',
          "auditProjectId": '',//项目阶段ID
          "parentId": id,//所在目录ID 0 为顶级目录
          "docName": '',
          "beginTime": '',//文件创建开始时间
          "endTime": '',//文件创建结束时间
          "suffix": ''//文件类型（后缀名）
        }
      }
      this.$post('/doc/project/query', data).then((response) => {
        if (vm.success_code == response.code) {
          vm.docInitList = response.data.content;
          for (let i = 0; i < vm.docInitList.length; i++) {
            if (vm.docInitList[i].docType == 0) {
              if (vm.docInitList[i].auditStatus == 0) {
                vm.docInitList[i].disabled = true;
              } else {
                vm.docInitList[i].disabled = false;
              }
            } else {
              vm.docInitList[i].disabled = true;
            }
          }
          resolve(vm.docInitList)
        }
      }).catch(function (error) {

      });
    },
    selectProjectDocSure (selectList) {
      let docStr = [];//重复的文件名集合  
      for (var i = 0; i < selectList.length; i++) {
        let docId = selectList[i].docId;
        let hasThisDoc = false;//当前列表中是否有选择的文件
        for (var j = 0; j < this.mySelectedDoc.length; j++) {
          if (docId === this.mySelectedDoc[j].docId) {
            hasThisDoc = true;
            docStr.push(d.docName);
          }
        }
        if (!hasThisDoc) {
          this.mySelectedDoc.push(selectList[i]);
        } else {
          this.$message.warning({
            message: docStr.join('，') + "文件已存在",
          });
        }
      }
      selectList = [];
      this.selectProjectDocIsShow = false;
    },
    // 底稿返回值
    elationUpmanscFn (uploadData) {
      let _this = this;
      let docStr = [];//重复的文件名集合  
      uploadData.forEach(function (c) {
        if (c.id) {
          let docId = c.docId;
          let hasThisDoc = false;//当前列表中是否有选择的文件
          _this.mySelectedDoc.forEach(function (d) {
            if (docId === d.docId) {
              hasThisDoc = true;
              docStr.push(d.docName);
            }
          });
          if (!hasThisDoc) {
            _this.mySelectedDoc.push({
              docId: c.docId,
              id: c.id,
              docName: c.docName,
              rfsId: c.rfsId,
              delFlag: c.delFlag,//是否已删除
              type: c.type,
              hasDownBtn: true
            });
          } else {
            _this.$message.warning({
              message: docStr.join('，') + "文件已存在",
            });
          }
        }
      });
      this.relafagmanus = false;
    },
    addDocFn () {
      this.addDoc = true;
      this.uploadDocAddIsShow = true;
    },
    //文件上传 
    docUpload (uploadData) {
      // uploadData.isShow = true;
      var obj = {};
      obj.docName = uploadData.docName;
      obj.docId = uploadData.docId;
      obj.hasDownBtn = false;
      obj.rfsId = uploadData.fileData.rfsId;
      var docType = uploadData.fileData.type;
      var index = docType.indexOf("/");
      var imgtype = docType.slice(index + 1);
      obj.type = imgtype;
      // this.selectedDoc.push(uploadData);
      this.mySelectedDoc.push(obj);
      this.selectedDocLocal.push(uploadData.docId);
      this.$refs.uploadVersion.uploadComplete();
    },
    docUploadAllsucess () {
      this.uploadAddDocClose();
    },
    uploadAddDocClose () {
      this.uploadDocAddIsShow = false;
      this.addDoc = false;
      this.$refs.uploadVersion.destroy();
    },
    deleteBtn (index) {
      // this.$emit('deleDocToParent',index);
      this.mySelectedDoc.splice(index, 1);
    },
    addPerFn () {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.copyPostPersonList.forEach(v => {
        v.label = v.copyName
        v.name = v.copyName
        v.uniqueKey = 'user' + v.copyCode
      })
      this.findUserObj = this.$utils.cloneDeepArray(this.copyPostPersonList)
      if (!this.copyPostPersonList) {
        this.findUserObj = []
      }
    },
    findAllUser (data) {
      if (!data || !data.length) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.copyPostPersonList = []
        return
      }
      this.copyPostPersonList = data
      if (this.copyPostPersonList !== "") {
        this.copyPostPersonList = Array.from(new Set(this.copyPostPersonList));
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};

        var chgArr = [];
        for (var i = 0; i < this.copyPostPersonList.length; i++) {
          var flag = true;
          for (var j = 0; j < chgArr.length; j++) {
            if (this.copyPostPersonList[i].userId == chgArr[j].userId) {
              flag = false;
            };
          };
          if (flag) {
            chgArr.push(this.copyPostPersonList[i]);
          };
        };
        chgArr.forEach(v => {
          if (!v.originData) {
            v.isDelete = true
          } else {
            v.isDelete = false
          }
          v.copyName = v.name;
          v.copyCode = v.userId;
          v.canDelete = true;
          v.name = v.name
          v.label = v.name
          v.uniqueKey = 'user' + v.userId
        })
        this.copyPostPersonList = chgArr
        this.findUserObj = this.copyPostPersonList
      }
    },
    deletePerFn (index) {
      this.copyPostPersonList.splice(index, 1);
    },
    deletePerFnexam (index) {
      // this.examPersonList.splice(index, 1);
      this.approverData.approvalName.splice(index, 1)
      this.approverData.approverId.splice(index, 1)
    },

    //判断是否勾选设置提醒
    submitApprove () {
      if (this.isSetRamindchecked) {
        this.approveRemind = true
        let projectInfo = this.projectData.projectName ? `${this.projectData.projectName}项目的`:''
        // 站内信模板
        var insideLetter = "【智慧投行】 " + this.$store.state.loginObject.userName + "：" + "提醒您尽快审批关于" + projectInfo + this.dialogTitle + "，可在'我的审批-待我审批中'进行查看，该审批提交时间为 " + this.$moment().format("YYYY-MM-DD HH:mm:ss")
        this.formInline.contentMessage = insideLetter
        if (this.approverData.approverId.length <= 1) {
          this.chack_bule = true;
        } else {
          this.chack_bule = false;
        }

      } else {
        this.submitExam();
      }
    },
    //提醒弹框的确定按钮
    approveRemindSave () {
      if (this.formInline.contentMessage == "") {
        this.$message.error("请填写提醒模版");
        return
      }
      this.submitExam();
      //this.approveRemind = false;
      this.isdocExamIsShow = false;
      
    },
    submitExam () {
      console.log(this.remindWay)
      console.log(this.initDocExamRoleinfo.key)
      if (this.initDocExamRoleinfo.key) {
        if (this.value == "") {
          this.$message.error('请选部门')
          return
        }
      }
      let vm = this;
      let copyPerId = [];
      let selectedDocId = [];
      let allAnnexDocIds = [];//所有附件的id集合（本地上传+从项目文档和底稿上传）
      for (var i = 0; i < this.copyPostPersonList.length; i++) {
        copyPerId.push(this.copyPostPersonList[i].copyCode);
      }
      for (var i = 0; i < this.mySelectedDoc.length; i++) {
        selectedDocId.push(this.mySelectedDoc[i].docId);
      }
      let onlySelectedDocId = [...new Set(selectedDocId)]

      if (this.$store.state.isUpload) {
        this.$message.error('有文件正在上传，请稍后操作')
        return;
      }
      let localAttach = []
      let projectRelev = []
      console.log('666', this.selectedFileList)
      this.selectedFileList.forEach(v => {
        // v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
        v.addSource === 1 && localAttach.push(v.docId)
        allAnnexDocIds.push(v.docId)
        // localAttach.push(v.docId)
      })
      this.mySelectedDoc.map(item => {
        let obj = {};
        obj.docId = this.examType == 3 || this.examType == 11 ? item.id : item.docId;
        obj.parentId = item.parentId;
        projectRelev.push(obj);
      })
      const sourceMsg = this.isInitateAppr ? (this.activeSource == 1 ? '我的审批-发起审批' : '项目审批') : (this.docSource == 1 ? '项目文档' : '底稿管理')
      let data = {
        "token": this.token,
        "userId": this.userId,
        "sourceName": sourceMsg,
        "projectName": this.$store.state.projectMsg.projectMsg.name,
        "paperFlag": this.docSourceCom == 2,
        "data": {
          "docSource": this.docSourceCom,//项目文档1/底稿管理2 
          "modelId": this.docFlowChartData.modelId,
          "deploymentId": this.docFlowChartData.deploymentId,
          "versionId": this.docFlowChartData.versionId,
          "financingTypeId": this.docFlowChartData.financingTypeId,
          "categoryId": this.docFlowChartData.categoryId,
          "projectName": this.projectData.projectName,
          "projectId": this.projectId,
          "procName": this.docFlowChartData.docExamProcessName,//流程名称
          "approvalType": this.examType,//审核类型1:普通审核,2:项目文件审核,3:目录审核,4:底稿文件审批10:文件修订审批11
          "remarks": this.textares,
          "extCopy": copyPerId,//添加的抄送人用户ID
          "fileList": projectRelev,//附件集合
          "localFile": localAttach,//本地上传的文件docId集合
          "annex": allAnnexDocIds,
          "formData": ""//传空
        }
      }
      if (this.initDocExamRoleinfo.key) {
        data.data.userDept = this.value
      }
      this.loadingActive()
      this.$post('/info/audit/start_process_instance', data).then((response) => {
        this.loadingInstance.close()
        if (this.success_code == response.code) {
          console.log(response.data)
          this.shenpiId = response.data
          this.$message.success('提交审批成功')

          console.log(this.remindWay)
          console.log(this.isSetRamindchecked)
          if (this.isSetRamindchecked) {
            this.setRemaid(); //审批催办的方法、
          }
          this.$emit('sendValueToParent', false);
          vm.$emit('sendToParentQueryDoc');
          // 更新数据
          // this.$select.updateStatus(1, this.projectId, this.projectId)
          // this.$select.updateStatus(2, this.projectId, this.projectId)
          this.isdocExamIsShow = false
          this.clearSelection()
        } else if (response.code == -5022) {
          vm.$confirm(response.msg, '提示', {
            type: 'warning',
            confirmButtonText: '我知道了',
            showCancelButton: false
          }).then(() => {
          }).catch(() => {
          });
          return
        } else {
          vm.$message({
            type: "error",
            message: response.msg
          });
          this.isActive = false
        }
      }).catch(function (error) {

      });
    },
    approveRemindclose () {
      this.approveRemind = false;
      this.remindWay = ["站内信"]
      let copyObj = this.$utils.copyObj(this.approverDataCopy)
      this.approverData = copyObj
    },
    //查询审批人员的id
    querysShenp () {
      console.log(this.value)
      let data = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.projectData.projectId,
          "modelId": this.docFlowChartData.modelId,
          "deploymentId": this.docFlowChartData.deploymentId,
          "versionId": this.docFlowChartData.versionId,
          "approvalType": this.examType//文件审批2，目录3,文件修订审批10
        }
      }
      data.data.userDept = this.value
      var url = "/info/audit/getApprover";
      var _this = this;
      this.$post(url, data)
        .then((response) => {
          this.approverData = response.data
          this.approverDataCopy = this.$utils.copyObj(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async remindSetMessage(){
        let data = {
            "token": this.token,
            "userId": this.userId,
            data:this.approverData.approverId// 要提醒的人员id
        }
        var url = "/sys/getUserList";
        var _this = this;
        return await this.$post(url, data).then((response) => {
            _this.messagefailed = response.data;
            _this.errorMsg = "";
            let checkedRemindNames = _this.remindWay;
            console.log(checkedRemindNames,'checkedRemindNames')
            for(var i=0; i<_this.messagefailed.length; i++){
                let name = _this.messagefailed[i].name;
                if (!_this.messagefailed[i].email && checkedRemindNames.indexOf("邮件") !=-1) {
                    _this.errorMsg += name + "的邮箱发送失败；";
                }
                if (!_this.messagefailed[i].mobile && checkedRemindNames.indexOf("短信") !=-1) {
                    _this.errorMsg += name + "的短信发送失败；";
                }
            }
            if (_this.errorMsg) {
                let errorMsg = _this.errorMsg + "请在个人信息中完善！其余均发送成功";
                // _this.$message.error(errorMsg);
                return errorMsg;
            }
            return null;

        })
        .catch(function (error) {
        console.log(error);
        });
    },
    //设置提醒的方法（相当于审批催办）
    setRemaid () {
        this.remindSetMessage().then(res=>{
        var arr = this.remindWay;
        console.log(this.remindWay)
        console.log(arr)
        var ges,
            arrs = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == "站内信") {
            ges = 0;
            } else if (arr[i] == "邮件") {
            ges = 1;
            } else {
            ges = 2;
            }
            arrs.push(ges)
        }
        this.$post("/info/audit/urge_approval", {
            token: this.$store.state.loginObject.userToken,
            userId: this.$store.state.loginObject.userId,
            data: {
            id: this.shenpiId, //提交审批成功后的返回的id
            userIds: this.approverData.approverId, //审批人员的id
            urgeText: this.formInline.contentMessage,
            remindWay: arrs.join(",")
            }
        }).then((response) => {
            this.remindWay = ["站内信"]
            if (response.code != 0) {
                this.$message.warning(response.msg)
                return
            }
            // this.$message.success(response.msg == null ? response.msg : response.msg + " " + res);
            this.$message({
                    type: "success",
                    message: res == null ? response.msg : response.msg + " " + res
                    });
            this.isSetRamindchecked = false;
        })
            .catch(function (error) {
            console.log(error);
            });
        })
    },
    initDetail () {
      this.copyPostPersonList = [];
      let that = this;
      let data = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "modelId": this.docFlowChartData.modelId,
          "deploymentId": this.docFlowChartData.deploymentId,
          "versionId": this.docFlowChartData.versionId,
          "approvalType": this.examType//文件审批2，目录3,修订审批10
        }
      }
      this.$post('/info/audit/form_detail', data).then((response) => {
        console.log(response.data, 2222)
        if (that.success_code == response.code) {
          console.log()
          that.examPersonList = response.data.approvalName;
          that.examWay = response.data.approveType;
          // that.copyPostPersonList = response.data.copyCode;
          for (var i = 0; i < response.data.copyCode.length; i++) {
            let obj = {};
            obj.copyName = response.data.copyName[i];
            obj.copyCode = response.data.copyCode[i];
            obj.originData = true;
            obj.isDelete = false;
            obj.name = response.data.copyName[i];
            obj.label = response.data.copyName[i];
            obj.userId = response.data.copyCode[i]
            obj.uniqueKey = 'user' + response.data.copyCode[i];
            that.copyPostPersonList.push(obj);
          }
          this.initDocExamRoleinfo = { ...{ key: response.data.isMultiDept } }
          console.log(1.5, that.copyPostPersonList)
          this.isMultiDept = response.data.isMultiDept
          this.isMultiDeptdata = response.data
          this.noAudit = response.data.noAudit;//有没有审批人
          this.noCopyUser = response.data.noCopyUser;//有没有抄送人
          // if(response.data.needAgainQuery){
          //     this.initDocExamRole(false);
          // }


          if (!this.isMultiDeptdata.isMultiDept) {
            // needAgainQuery为true重新查询审批人、抄送人
            if (response.data.needAgainQuery) {
              this.initDocExamRole(false)
            }
          }
        }
      }).catch(function (error) {

      });
    },
    initDocExamRole (state) {
      this.copyPostPersonList = [];
      let that = this;
      let data = {
        "token": this.token,
        "userId": this.userId,
        "data": {
          "projectId": this.projectData.projectId,
          "modelId": this.docFlowChartData.modelId,
          "deploymentId": this.docFlowChartData.deploymentId,
          "versionId": this.docFlowChartData.versionId,
          "approvalType": this.examType,//文件审批2，目录3,文件修订审批10
          userDept: this.value
        }
      }
      if (state) {
        this.initDocExamRoleinfo = { key: state }
        data.data.userDept = this.value
        this.querysShenp()
      }
      this.$post('/info/audit/formDetailNew', data).then((response) => {
        if (that.success_code == response.code) {
          that.examPersonList = response.data.approvalName;
          // that.examWay = response.data.approveType;
          for (var i = 0; i < response.data.copyCode.length; i++) {
            let obj = {};

            obj.copyName = response.data.copyName[i];
            obj.copyCode = response.data.copyCode[i];
            obj.originData = true;
            obj.isDelete = false;
            obj.name = response.data.copyName[i];
            obj.label = response.data.copyName[i];
            obj.userId = response.data.copyCode[i]
            obj.uniqueKey = 'user' + response.data.copyCode[i];


            //     obj.copyName = response.data.copyName[i];
            //     obj.copyCode = response.data.copyCode[i];
            //   obj.originData = true;
            //   obj.isDelete = false;
            that.copyPostPersonList.push(obj);
          }
          if (that.isMultiDept) {
            that.isMultiDept = false
          }
        }
        console.log(123, that.copyPostPersonList)
      }).catch(function (error) {

      });
    },
    cancelBtn () {
      this.$emit('cancelBtn');
    },
    // 手动取消
    clickEvent (type) {
      this.$refs['attachment'] && this.$refs['attachment'].close()
      // this.olarr = [];
      this.isdocExamIsShow = false
      this.approveRemind = false;
      //this.remindWay = ["站内信"]
      this.$emit('sendValueToParent', false);
    }
  },

}

</script>

<style scoped lang="scss" type="text/css">
//文件审核弹层
.pro5 {
  width: 45px;
  height: 2px;
  background: rgba(26, 95, 164, 1);
}
.project-doc-exam {
  .delete-copy-person {
    position: absolute;
    right: 0;
    top: -6px;
    width: 18px;
    height: 18px;
    background: url('../../../../assets/project_doc/deletePerson.png') no-repeat
      0 0;
  }
  .bellong-project,
  .bellong-project1 {
    line-height: 38px;
    text-align: left;
    span {
      color: #000;
    }
  }
  .bellong-project {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .align-left {
    text-align: left;
  }
  .tips {
    margin-top: 16px;
    margin-left: 68px;
    color: red;
  }
}
.copy-person-name {
  position: relative;
  margin-top: 6px;
  margin-right: 6px;
  padding-right: 16px;
}
.add-copy-person {
  padding-top: 6px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(20, 98, 163, 1);
  i {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    background: url('../../../../assets/project_doc/addIcon.png') no-repeat 0 0;
  }
}
.copy-person-box {
  margin-top: 10px;
  margin-left: 68px;
  li {
    height: 26px;
  }
}
.project2span,
.delete-copy-person,
.add-copy-person {
  cursor: pointer;
}
.select-exam-doc {
  text-align: left;
}
// 以下为选择人员相关
.wanc {
  width: 100%;
  height: 230px;
  // background: red;
  margin-top: 4px;
  overflow: hidden;
  overflow: auto;
}
.choseAuditor .auditorType {
  text-align: left;
}
.choseAuditor .auditorType .typeLeft,
.choseAuditor .auditorType .typeRight {
  width: 45%;
  padding-right: 10px;
  border-right: 1px solid #e8e8e8;
}
.choseAuditor .auditorType .typeRight {
  border-right: 0px;
}
.choseAuditor .auditorType .typeLeft .alerdy,
.choseAuditor .auditorType .typeRight .alerdy {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
}
.choseAuditor .auditorType .typeLeft p {
  margin-top: 10px;
  margin-bottom: 8px;
}
.choseAuditor .auditorType .typeRight .choTypes li {
  height: 34px;
  line-height: 34px;
}
.choseAuditor .auditorType .typeRight .choTypes li:hover {
  background-color: #f7f7f7;
}
.choseAuditor .auditorType .typeRight .choTypes li span {
  font-size: 14px;
  color: #333;
  margin-left: 5px;
}
.choseAuditor .auditorType .typeRight .choTypes li i {
  margin-right: 5px;
  position: relative;
  top: 11px;
}
.project-doc-exam {
  .initiate_box {
    margin-left: 68px;
    // .initiate_title {
    //     margin-top: -19px;
    //     text-align:left;
    // }
    .initiate_people {
      padding: 18px 0 20px 0;
      // font-size: 13px;
      text-align: left;
    }
  }
  .initiate_title {
    padding-left: 8px;
  }
  .upload-icon {
    width: 14px;
    height: 14px;
    background: url('../../../../assets/project_doc/projectDocExamUploadIcon.png')
      no-repeat 0 0;
  }
  .doc-list li:hover {
    background: #f7f9fb;
  }
  .local-doc-delete.project2span {
    margin-right: 62px;
  }
  .project2span {
    margin-right: 10px;
  }
  .mode-remarks {
    font-size: 12px;
    color: #9a9a9a;
  }

  .el-dialog__footer {
    padding-top: 0;
  }
  .input-remarks {
    border: 1px solid #dddddd;
    padding: 10px;
    width: calc(100% - 30px);
    margin-top: 10px;
    border-radius: 4px;
    resize: none;
  }
  .tree-box {
    height: 300px;
    overflow-y: auto;
  }
  .add-person {
    vertical-align: super;
  }
  .sub-title {
    padding-top: 8px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(48, 49, 51, 1);
  }
  .project1,
  .project3,
  .proend,
  .annex-box {
    padding-left: 28px;
  }
  .annex-box {
    padding-top: 8px;
  }
  .project1 {
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(220, 223, 230, 1);
  }
  .proend {
    margin-bottom: 20px;
  }
  .project3 {
    margin-bottom: 20px;
  }
  .all-check-box {
    padding-right: 8px;
    margin-top: 2px;
  }
  .select-box {
    display: flex;
    width: 100%;
    .el-checkbox__label {
      flex: 1;
    }
  }
}
.el-popper .pop-list {
  width: 100%;
  p {
    padding: 0 12px;
    line-height: 36px;
  }
  p:hover {
    background: #ecf5ff;
    color: #66b1ff;
    cursor: pointer;
  }
}
.attachemnt-list-box {
  min-height: 60px;
}
p.attachemnt-list-doc {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
p.attachemnt-list-doc .attachemnt-list-btns {
  // width: 80px;
}
.attachemnt-list-btns {
  .el-button--text {
    color: #606266;
  }
}
p.attachemnt-list-doc .doc-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 100px);
  cursor: pointer;
}
.el-dialog {
  margin-bottom: 20px;
}
</style>
<style lang="scss" type="text/css">
.project-doc-exam {
  .el-popper {
    padding: 12px 0;
  }
  .el-dialog__title {
    // font-weight:bold;
  }
  .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  .el-dialog--center .el-dialog__footer {
    text-align: right;
    padding-right: 30px;
  }
  .el-dialog--center .el-dialog__body {
    padding-top: 2px;
  }
  // .tree-box{
  //     padding-left:10px;
  //     .el-tree-node__expand-icon.expanded{
  //         width: 18px;
  //         height:14px;
  //         margin-top:10px;
  //         background: url("../../../../assets/project_doc/treeopen.png") no-repeat 0 0;

  //     }
  //     .el-tree-node__expand-icon{
  //         width: 21px;
  //         height:21px;
  //         margin-top:10px;
  //         background: url("../../../../assets/project_doc/treenoopen.png") no-repeat 0 0;
  //     }
  //     .el-tree-node__expand-icon.is-leaf{
  //         background:none;
  //     }
  //     .el-tree-node__expand-icon.expanded{
  //         transform:none;
  //     }
  //     .tree-node{
  //         width:100%;
  //     }

  //     .el-icon-caret-right:before{
  //         color:#fff;
  //         opacity: 0;
  //     }
  //     .el-tree-node__content .tree-node span{
  //         width:60%;
  //     }
  // }
  .select-doc-name {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
}
.project-doc-exam .select-box {
  .el-checkbox__label {
    width: calc(100% - 22px);
  }
  .el-checkbox__input {
    width: 14px;
    height: 14px;
    margin-top: 12px;
  }
}
.bitians {
  color: red;
  margin-left: 5px;
  margin-right: 3px;
}
.remindRight {
  margin-right: 20px;
}
.remindRight .userbtn {
  margin-right: 10px;
  margin-bottom: 10px;
}
.remindContent {
  margin-top: 10px;
}
</style>
