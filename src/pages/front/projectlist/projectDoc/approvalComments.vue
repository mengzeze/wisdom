<template>
  <div id="approval-comments"
       :visible="getApprovalIsShow">
    <div class="approval-header">
      <nav>{{msg}}审批意见</nav>
      <!-- 1.2.4版本添加 -->
      <!-- <el-button type="primary" style="margin-right: 28px;" @click="exportComment">导出</el-button> -->
    </div>
    <div class='approval-content'>
      <header>
        <div v-on:keyup.enter="handleClickQuery">
          <el-form ref="form"
                   label-width="100px"
                   class="clearfix">
            <el-form-item :label="`${msg}名称:`">
              <el-input class="q-246"
                        v-model="queryObj.docName"
                        :placeholder="`请输入${msg}名称`"
                        :maxlength="160"></el-input>
            </el-form-item>
            <el-form-item label="审批时间:">
              <date-range :date-start.sync="queryObj.startTime"
                          :date-end.sync="queryObj.endTime"
                          format="yyyy-MM-dd HH:mm:ss"></date-range>
            </el-form-item>
            <el-form-item label="提交人:">
              <el-input v-model="subName"
                        :title="subName"
                        class="fl q-170"
                        placeholder="请选择提交人"
                        disabled="disabled"></el-input>
              <el-button type="primary"
                         size="small"
                         class="fl"
                         @click="optUser(0)"
                         style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
            </el-form-item>
            <el-form-item label="审批人:">
              <el-input v-model="userName"
                        :title="userName"
                        class="fl q-170"
                        placeholder="请选择审批人"
                        disabled="disabled"></el-input>
              <el-button type="primary"
                         size="small"
                         class="fl"
                         @click="optUser(1)"
                         style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
            </el-form-item>
            <el-form-item label="审批部门:">
              <el-input v-model="approvalDept"
                        :title="approvalDept"
                        class="fl q-170"
                        placeholder="请选择审批部门"
                        disabled="disabled"></el-input>
              <el-button type="primary"
                         size="small"
                         class="fl"
                         @click="optAndo"
                         style="margin-left: 0px;height: 40px;margin-top: 0px;">选择部门</el-button>
            </el-form-item>
            <el-form-item label="目录:">
              <el-input v-model="dirIdName"
                        :title="dirIdName"
                        class="fl q-170"
                        placeholder="请选择目录"
                        disabled="disabled"></el-input>
              <el-button type="primary"
                         size="small"
                         class="fl"
                         @click="openCalalog"
                         style="margin-left: 0px;height: 40px;margin-top: 0px;">选择目录</el-button>
            </el-form-item>
            <el-form-item label="审批意见:">
              <el-input class="q-246"
                        :title="queryObj.approvalComment"
                        v-model="queryObj.approvalComment"
                        placeholder="请输入审批意见关键字"
                        :maxlength="160"></el-input>
            </el-form-item>
            <el-form-item :label="`${msg}审批结果：`"
                          label-width="130px">
              <el-select class="q-308"
                         v-model="queryObj.state"
                         placeholder="全部"
                         clearable>
                <el-option v-for="(item, index) in proStageList"
                           :key="index"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点审批结果："
                          label-width="130px">
              <el-select class="q-308"
                         v-model="queryObj.nodeApprovaResult "
                         placeholder="全部"
                         clearable>
                <el-option v-for="(item, index) in proStageListNode"
                           :key="index"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <div>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click="handleClickQuery">查询</el-button>
              <el-button icon="el-icon-refresh"
                         @click="reset">重置</el-button>
            </div>
          </el-form>
        </div>
      </header>
      <section class="section2">
        <el-table ref="table"
                  :data="tableData"
                  :height="tableHeight"
                  @selection-change="handleSelectionChange"
                  :row-key="getRowKeys"
                  tooltip-effect="dark">
          <el-table-column type="selection"
                           :reserve-selection="true"
                           width="55">
          </el-table-column>
          <el-table-column prop='fileName'
                           :label="`${msg}名称`"
                           width="auto">
            <template slot-scope="scope">
              <p class="fille-name color-primary-hover"
                  v-if="isDir"
                 :title="scope.row.fileName"
                 >{{scope.row.fileName}}</p>
              <p class="fille-name color-primary-hover"
                  v-else
                 :title="scope.row.fileName"
                 @click="handleUploadFilePreview(scope.row, projectId)">{{scope.row.fileName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="parentName"
                           :label="isDir?'所在位置':'所在目录'"
                           width="auto">
            <template slot-scope="scope">
              <!--  :title='`${scope.row.fullPath} / ${scope.row.fileName}`' -->
              <div class="sltitle"
                   @mouseover="getfullPath(scope.row)"
                   :title='`${scope.row.fullPath} / ${scope.row.fileName}`'>
                {{scope.row.parentName}}
              </div>
            </template></el-table-column>
          <el-table-column prop="submitName"
                           label="提交人"
                           align="center"
                           max-width="120">
            <template slot-scope="scope">
              <div class="sltitle"
                   :title="scope.row.submitName">{{scope.row.submitName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="userName"
                           label="审批人"
                           align="center"
                           max-width="120">
            <template slot-scope="scope">
              <div class="sltitle"
                   :title="scope.row.userName">{{scope.row.userName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createDate"
                           label="审批时间"
                           min-width="100"
                           align="center">
            <template slot-scope="scope">
              <div class="sltitle"
                   :title="scope.row.createDate">{{scope.row.createDate}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="deptName"
                           label="审批人部门"
                           align="center"
                           min-width="120">
            <template slot-scope="scope">
              <div class="sltitle"
                   :title="scope.row.deptName">{{scope.row.deptName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="fileApprovalCommen"
                           label="审批意见"
                           align="center"
                           min-width="150"
                           width="auto">
            <template slot-scope="scope">
              <!-- <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.fileApprovalCommen}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span class='fileapproval'>{{ scope.row.fileApprovalCommen }}</span>
                                </div>
                            </el-popover> -->
              <p class='fille-name fileapproval color-primary-hover'
                 :title="scope.row.fileApprovalCommen"
                 @click="showApprovalContent(scope.row.fileApprovalCommen)">{{scope.row.fileApprovalCommen}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="stateName"
                           :label="`${msg}审批结果`"
                           max-width="150"
                           align="center">
            <template slot-scope="scope">
              <div :class="{'statewait': scope.row.stateName === '待审批', 'stateSuccess': scope.row.stateName === '已通过', 'stateNo': scope.row.stateName === '已驳回'}">{{scope.row.stateName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="nodeApprovaResultName"
                           label="节点审批结果"
                           max-width="150"
                           align="center">
            <template slot-scope="scope">
              <div :class="{'stateSuccess': scope.row.nodeApprovaResultName === '已通过', 'stateNo': scope.row.nodeApprovaResultName === '已驳回'}">{{scope.row.nodeApprovaResultName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           width="100">
            <template slot-scope="scope">
              <el-button type="text"
                         title="回复"
                         @click="Approver(scope.row)">
                <i class="icon-operate-btn iconfont reply"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style='height: 50px;'></div>
      </section>
    </div>
    <footer>
      <aside>已选中{{selectIndex}}个</aside>
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totals"
                     :pageSize="pageSize"
                     :page-sizes="pageSizes"
                     :current-page="currentPage"
                     @current-change="onPageChange"
                     @size-change="handleSizeChange">
      </el-pagination>
    </footer>
    <el-dialog title="审批意见"
               :close-on-click-modal="false"
               :visible.sync="prophase"
               width="720px"
               class="choseAuditor">
      <div>
        <div>{{approvalConment}}</div>
      </div>
    </el-dialog>
    <!-- 选择索引创建人组件 -->
    <fintall-deptuser :findFlagShow.sync="findFlag"
                      v-on:findAllUser="findAllUser"
                      :findUserObj="user_num === 0 ? findUserObj : findUserObjM"
                      :findState="findState"
                      :checkState="checkState">
    </fintall-deptuser>
    <!--选择部门-->
    <frame-peos v-if="flags"
                :clearstate="clearstate"
                v-on:states="stateDepart"
                :treestate='treestate'
                :tree="tree"></frame-peos>
    <!-- 目录弹框 -->
    <project-catalog :catalogShow.sync="catalogShow"
                     :calaLogObj='calaLogObj'
                     :catalogData="catalogData"
                     :isShowDocNum="!isDir"
                     @catalogFun="catalogFun"></project-catalog>
    <!-- 文件审批记录-没有回复 -->
    <approval-comment :approvalShow.sync="approvalShow"
                      :approvalData="approvalData"
                      @approvalSuccess='queryFn' @queryComents="replay"></approval-comment>
  </div>
</template>
<script>
import fintallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'
import framePeos from '@/components/select_box/frameworkpeos'
import projectCatalog from '@/components/select_box/projectCatalog'
// 审批弹框
import approvalComment from "@/components/select_box/approvalComment";
export default {
  name: 'approvalComments',
  components: {
    fintallDeptuser,
    framePeos,
    projectCatalog,
    approvalComment,
  },
  data () {
    return {
      isQueryLoading: false, 
      token: '',
      userId: '',
      subName: '',
      projectId: '', // 项目id
      approvalDept: '', // 部门名称
      dirIdName: '', // 目录展示
      userName: '',
      prophase: false,
      approvalConment: '',
      queryObj: {
        fileList: [],
        docName: '', // 文件名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        submitId: [], // 提交人id-[]
        approvalUserId: [], // 审批人id-[]
        approvaluserDept: [],// 审批人部门--id-[]
        dirId: [], // 目录id
        approvalComment: '', // 审批意见
        state: '', // 文件审批结果 0待审批，1通过，2驳回
        nodeApprovaResult: '', // 节点审批结果 1-通过，2-驳回
        docSource: '', // "文件来源 1 项目文档/2 底稿管理"
        isSearch: false,// "是否搜索"
      },
      getcategoryId:'', //是否为文件或者目录
      tableHeight: '900px',
      tableData: [],
      selectionData: [], // 选中的数据
      selectIndex: 0, // 记录选中数量
      proStage1: '',
      proStage: '',
      // 提交人
      user_num: "", //选择人员标识
      findFlag: false,
      findState: {},
      checkState: {},
      deployObj: [],
      ccObj: [],
      findUserObj: [],
      findUserObjM: [],
      proStageList: [
        { id: '0', name: '待审批' },
        { id: '1', name: '已通过' },
        { id: '2', name: '已驳回' }
      ],
      proStageListNode: [
        { id: '1', name: '已通过' },
        { id: '2', name: '已驳回' }
      ],
      pageNo: 0, //当前页码,
      totals: 0, // 总量
      pageSize: 100,
      pageSizes: [10, 20, 50, 100],  //每页显示数量
      currentPage: 1, //当前页
      // 部门
      flags: false,
      clearstate: '',
      treestate: '',
      tree: '',
      // 目录
      checkDisable: false,
      catalogShow: false,
      catalogData: {},
      dirIdObj: {},
      isShow: false,
      calaLogObj: [],
      reqApi: '',
      isLimit: 0,
      projectCreatBy: '',
      isPC: false,
      isDir: false, // 是否为目录审批 

      approvalShow: false, //审批弹框展示
      approvalData: {}, //审批弹框传值
      approvalinfo: "",
      showDialog: true,
      closeDialog: false,
      Approvers: true,
      Approversclose: false,
      sourceName: '',
      projectName: ''

    }
  },
  beforeCreate () { },
  created () {
    this.init()
    console.log(3)
    this.queryFn(true)
  },
  mounted () {
    window.addEventListener('scroll', this.getTableHeight, true);
  },
  computed: {
    getApprovalIsShow () {
      // console.log(123, this.$store.state.approvalIsShow)
      // this.isShow = this.$store.state.approvalIsShow
      // if(this.$store.state.approvalIsShow){
      //     let p = this.$store.state.approvalData // 选择文件的数据
      //     this.token = this.$store.state.loginObject.userToken;
      //     this.userId = this.$store.state.loginObject.userId;
      //     this.projectId = this.$route.query.projectId
      //     this.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
      //     this.queryObj.fileList = JSON.parse(this.$route.query.attach)
      //     this.queryObj.docSource = this.$route.query.docSource
      //     this.isLimit = this.$route.query.isLimit
      //     this.reqApi = global.baseUrl
      //     this.isPC = this.$store.state.isPC;
      //     console.log(1, p, this.$route, '2', this.$route.query.attach, this.isLimit)
      // }
      return this.$store.state.approvalIsShow
    },
    msg () {
      return this.isDir ? '目录' : '文件'
    }
  },
  methods: {
    init () {
      let p = this.$store.state.approvalData // 选择文件的数据
      this.queryObj.fileList = JSON.parse(this.$route.query.attach)
      this.isDir = JSON.parse(this.$route.query.isDir)
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.projectId = this.$route.query.projectId
      this.projectName = this.$route.query.projectName
      this.projectCreatBy = this.$store.state.projectMsg.projectMsg.createBy;
      this.queryObj.docSource = this.$route.query.docSource
      this.sourceName = this.$route.query.sourceName
      this.isLimit = this.$route.query.isLimit
      this.reqApi = global.baseUrl
      this.isPC = this.$store.state.isPC;
      console.log(JSON.parse(this.$route.query.isDir))
      console.log(1, p, this.$route, '2', this.$route.query.attach, this.isLimit)
    },
    getTableHeight () {
      this.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 85 - 50
    },
    handleCloseApproval () {
      this.$store.state.approvalIsShow = false
    },
    /**
     * 获取目录下子目录
     * @param {Array} 目录
     */
    async getDirList (arr) {
      const resData = await this.$post('/doc/paper/queryDirForDir', {
        data: {
          proFileDirIds: arr.map(v => v.docId)
        }
      }).then(res => {
        if (res.code != 0) {
          this.$message.warning(res.msg);
          return
        }
        return res.data.content
      }).catch(err => { console.log(err) })
      return resData
    },
    reset () {
      this.queryObj.docName = ''
      this.queryObj.approvalComment = ''
      this.queryObj.endTime = ''
      this.queryObj.startTime = ''
      this.dirIdName = ''
      this.approvalDept = ''
      this.subName = ''
      this.queryObj.state = ''
      this.queryObj.nodeApprovaResult = ''
      this.queryObj.submitId = []
      this.queryObj.approvalUserId = []
      this.queryObj.approvaluserDept = []
      this.queryObj.dirId = []
      this.userName = ''
    },
    /**
     * 回复按钮
     * @param {Object} item 当前行数据
     */
    // 当前人是否可以审批
    Approver (item) {
      var data = {
        token: this.token,
        userId: this.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data: {
          approvalId: item.approvalId
        }
      };
      this.$post("/info/audit/judeApprovaerByUserId ", data)
        .then(res => {
          console.log(res.data)
          this.Approvers = res.data;
          this.replay(item);
        })
        .catch(error => {
          console.log(error);
        });
    },
    replay(item){
        console.log(item)
      var aa = [];
        aa.push(item.fileId)
         console.log(item.userId)
        console.log(this.$store.state.loginObject.userId)

      if (this.isDir) {
        let fileList = [];
        let obj = {};
        obj.docId = item.fileId
        obj.docName = item.fileName;
        obj.parentId = item.parentId;
        obj.docVersionNumber = item.docVersionNumber;
        fileList.push(obj);
        this.approvalData = {
          title: "目录审批",
          docName: item.fileName,
          fileList: fileList,
          Approvers: this.Approvers,
          approvalId: item.approvalId,
          taskId: item.taskId,
          taskDefKey: item.taskDefKey,
          getcategoryId:3

        }
      } else {
        let fileList = [];
        let obj = {};
        obj.docId = item.fileId
        obj.docName = item.fileName;
        obj.parentId = item.parentId;
        obj.docVersionNumber = item.docVersionNumber;
        fileList.push(obj);
        this.approvalData = {
          title: "文件审批",
          docName: item.fileName,
          fileList: fileList,
          Approvers: this.Approvers,
          approvalId: item.approvalId,
          fileApprovalCommen: item.fileApprovalCommen,
          taskDefKey: item.taskDefKey,
          taskId: item.taskId,
          getcategoryId:2

        }
      }


      let obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data: {
          docIdList: aa,//文件id的集合
          approvalId: item.approvalId
        }
      }
        this.$post(this.isDir?'/info/audit/findApprovalRecordByDirids':'/info/audit/findApprovalRecordByFileids', obj).then(res => {
        if (!res) {
            this.$message.error(res.msg)
            return
        }
        if (res.code !== 0) {
          this.$message.error(res.msg)
          return
        }
        if (res.data) {
          this.findComment = res.data.findComment
          if (res.data.findComment) {
            res.data.list.forEach(m => {
              m.state == 0 ? m.stateName = '待审批' : ( m.state == 1 ? m.stateName = '通过' : m.stateName = '驳回')
            }) 
          }
          console.log(res.data.findComment)
          this.approvalData.findComment = res.data.findComment
         this.approvalData.tableData = res.data
         console.log(this.approvalData.tableData)
      
         this.approvalShow = true;
        }
      })
    },
    reply2 (item) {
      console.log('条目',item)
      console.log(this.isDir)
      this.Approver(item)

        var aa = [];
        aa.push(item.fileId)
         console.log(item.userId)
        console.log(this.$store.state.loginObject.userId)

      if (this.isDir) {
        let fileList = [];
        let obj = {};
        obj.docId = item.fileId
        obj.docName = item.fileName;
        obj.parentId = item.parentId;
        obj.docVersionNumber = item.docVersionNumber;
        fileList.push(obj);
        this.approvalData = {
          title: "目录审批",
          docName: item.fileName,
          fileList: fileList,
          Approvers: this.Approvers,
          approvalId: item.approvalId,
          taskId: item.taskId,
          taskDefKey: item.taskDefKey,
          getcategoryId:10

        }
      } else {
        let fileList = [];
        let obj = {};
        obj.docId = item.fileId
        obj.docName = item.fileName;
        obj.parentId = item.parentId;
        obj.docVersionNumber = item.docVersionNumber;
        fileList.push(obj);
        this.approvalData = {
          title: "文件审批",
          docName: item.fileName,
          fileList: fileList,
          Approvers: this.Approvers,
          approvalId: item.approvalId,
          fileApprovalCommen: item.fileApprovalCommen,
          taskDefKey: item.taskDefKey,
          taskId: item.taskId,
          getcategoryId:2

        }
      }


      let obj = {
        token: this.$store.state.loginObject.userToken,
        userId: this.$store.state.loginObject.userId,
        projectId: this.$store.state.projectMsg.pro_id,
        data: {
          docIdList: aa,//文件id的集合
          approvalId: item.approvalId
        }
      }
        this.$post(this.isDir?'/info/audit/findApprovalRecordByDirids':'/info/audit/findApprovalRecordByFileids', obj).then(res => {
        if (!res) {
            this.$message.error(res.msg)
            return
        }
        if (res.code !== 0) {
          this.$message.error(res.msg)
          return
        }
        if (res.data) {
          this.findComment = res.data.findComment
          if (res.data.findComment) {
            res.data.list.forEach(m => {
              m.state == 0 ? m.stateName = '待审批' : ( m.state == 1 ? m.stateName = '通过' : m.stateName = '驳回')
            }) 
          }
          console.log(res.data.findComment)
          this.approvalData.findComment = res.data.findComment
         this.approvalData.tableData = res.data
         console.log(this.approvalData.tableData)
      
         this.approvalShow = true;
        }
      })

    },

    handleClickQuery(){
      this.currentPage = 1
      console.log(4)
      this.queryFn()
    },


    /**
     * 请求列表接口
     * @param {Boolean} isFirst 是否首次加载
     */
    async queryFn (isFirst) {
      // if(this.isQueryLoading) return
      // this.isQueryLoading = true
      console.log('查询', this.queryObj, this.sourceName)
      // 如果上面查询条件中有数据，isSearch为true
      if (this.queryObj.docName !== '' || this.queryObj.approvalComment !== '' ||
        this.queryObj.endTime !== '' || this.queryObj.startTime !== '' ||
        this.subName !== '' || this.userName !== '' || this.approvalDept !== '' || this.dirIdName !== '' ||
        this.queryObj.state !== '' || this.queryObj.nodeApprovaResult !== '') {
        this.queryObj.isSearch = true
      } else {
        this.queryObj.isSearch = false
      }
      this.queryObj.endTime = this.queryObj.endTime ? this.queryObj.endTime.substr(0, 11) + '23:59:59' : ''
      // 目录审批意见页需要查子目录
      if (this.isDir && !!isFirst) {
        await this.getDirList(this.queryObj.fileList).then(res => {
          let mergeArr = [...res, ...this.queryObj.fileList].map(item => {
            item.id != null && (item.docId = item.id)
            return item
          })
          this.queryObj.fileList = this.$utils.uniqBy(mergeArr, 'docId').map(item => {
            return {
              docId: item.docId,
              parentId: item.parentId
            }
          })
        })
      }
      var data = {
        token: this.token,
        userId: this.userId,
        sourceName: this.sourceName,
        projectName: this.$store.state.projectMsg.projectMsg.name,
        data: this.queryObj,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
      }
      // 底稿管理-文件审批意见页需要加ture, 有查询条件才会传true   docSource为2,会有目录审批意见页的情况
      if ((this.queryObj.docSource == 2 && this.queryObj.isSearch) || this.sourceName == '底稿管理-文件审批意见页') { data.paperFlag = true }
      this.$post(this.isDir ? '/info/audit/findDirApprovalRecordList' : '/info/audit/findFileApprovalRecordList', data).then((response) => {
        // this.isQueryLoading = false
        if (!response) {
          this.$message.error(response.msg)
          return
        }
        if (response.code !== 0) {
          this.$message.error(response.msg)
          this.tableData = []
          this.totals = 0
          return
        }
        // 处理请求页面大于最大页码的问题
        if(response.data.pages<response.data.pageNum) {
          this.pageNum = response.data.pages
          this.queryFn()
          return
        }
        this.tableData = response.data.list || []
        this.tableData.forEach((v, i) => {        v.docName = v.fileName
          v.index = i        })
        this.totals = response.data.total
      }).catch((error) => {
        // this.isQueryLoading = false
        this.$message.error(error)
      });
    },
    // 展示全部路径
    getfullPath (val) {
      let files = []
      let obj = {
        docId: val.fileId,
        parentId: val.parentId
      }
      files.push(obj)
      let getFullData = {
        data: {
          fileList: files,
          docSource: this.$route.query.docSource, // 0项目文档，1底稿管理
          projectId: this.projectId,
          isTile: true
        },
        token: this.token,
        userId: this.userId
      }
      this.$post('/info/audit/getDirHieraForFileRecord', getFullData).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        let fullPath = res.data[0].dirName
        this.$set(val, 'fullPath', res.data[0].dirName.join(' / '))
      }).catch(err => { console.log(err) })
    },
    handleUploadFilePreview (row, project) {
      console.log(this.isLimit, row, '是否有权限')
      var previewData = {
        rfsId: row.rfsId,
        docId: row.docId ? row.docId : row.fileId,
        photoType: row.fileType,
        sourceType: '',
        docName: row.docName,
        projectName: this.projectName
      }
      // isLimit = 1/项目文档， 2底稿，没有则不判断
      if (this.isLimit == 1) {
        previewData.sourceType = 'projectDoc'
        this.canOperating(
          { docId: row.id, view: false }, 'view').then(res => {
            if (res) {
              sessionStorage.setItem("proDocViewDownId", row.id);
              row.source = '0';
              // this.isPC
              // ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
              this.$store.commit('previewAllFn', previewData); // web端预览
            }
          })
        return
      }
      if (this.isLimit == 2) {
        if (!rightSysPermissionFn(this.projectId, 'paper_file_file_preview')) {
          this.$message.warning('当前无权限');
          return
        }
        previewData.sourceType = 'manuscriptmanage'
        row.source = '1';
        // this.isPC
        // ? window.ChromeMain.CS_Main_OpenFile(JSON.stringify(row)) // PC端双击在线编辑
        this.$store.commit('previewAllFn', previewData); // web端预览
        return
      }
      this.$store.commit('previewAllFn', previewData);
    },
    //  判断用户是否有权限进行某一操作
    async canOperating (param, flag) {
      if (this.projectCreatBy == this.userId) {
        return true;
      } else {
        if (!param) {
          return;
        }
        // this.queryPersonPower();
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
              // var data = JSON.parse(response.data.permsType);
              if (!response.data) {
                _this.$message({
                  message: "您没有该操作权限，请联系项目管理人员配置权限",
                  type: "error"
                });
                return false;
              } else {
                return true;
              }
            } else {
              _this.$message({
                message: "您没有该操作权限，请联系项目管理人员配置权限",
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
    showApprovalContent (row) {
      console.log(row)
      if (row) {
        this.prophase = true
        this.approvalConment = row
      }
    },
    // 选择人员 0-提交人，1-审批人
    optUser (num) {
      this.user_num = num;
      this.findFlag = true
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (num == 0) {
        this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
      } else {
        this.findUserObjM = this.$utils.cloneDeepArray(this.ccObj)
      }
      if (!this.subName) {
        this.findUserObj = []
      }
      if (!this.userName) {
        this.findUserObjM = []
      }
    },
    // 人员弹框返回
    findAllUser (data) {
      if (data.length == 0) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        if (this.user_num == 0) {
          this.deployObj = []
          this.subName = ''

        }
        if (this.user_num == 1) {
          this.ccObj = []
          this.userName = ''
        }
        return
      }
      if (this.user_num == 0) {
        this.deployObj = data;
        var string = "", userIds = [];
        for (var i = 0; i < this.deployObj.length; i++) {
          var objname = {};
          objname.name = this.deployObj[i].name;
          string = string + data[i].name + "、";
          userIds.push(data[i].userId)
        }
        this.subName = string;
        this.queryObj.submitId = userIds;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.findUserObj = data
      } else {
        this.ccObj = data;
        var string = "", userIds = [];
        for (var i = 0; i < this.ccObj.length; i++) {
          var objname = {};
          objname.name = this.ccObj[i].name;
          string = string + data[i].name + "、";
          userIds.push(data[i].userId)
        }
        this.userName = string;
        this.queryObj.approvalUserId = userIds;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.findUserObjM = data
      }

    },
    // 选择部门
    optAndo () {
      console.log('部门')
      var data = {
        token: this.token,
        userId: this.userId,
      }
      var that = this;
      this.$post('/sys/getOrganization', data).then((response) => {
        if (response.code == that.code.codeNum.SUCCESS) {
          that.tree = response.data;
          that.flags = true;
          that.treestate = { state: 1 };
          that.clearstate = { state: 3 };
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 部门返回
    stateDepart (data) {
      if (data.length > 0) {
        let arr = []
        arr.push(data[0].id)
        this.queryObj.approvaluserDept = arr
        this.approvalDept = data[0].name;
      } else {
        this.queryObj.approvaluserDept = [];
        this.approvalDept = "";
      }
    },
    // 选择目录
    openCalalog () {
      console.log(this.$route.query.docSource, 33)
      this.catalogShow = true
      this.calaLogObj = this.queryObj.dirId
      this.catalogData = {
        projectId: this.$route.query.projectId,
        token: this.token,
        userId: this.userId,
        data: {
          fileList: this.queryObj.fileList,
          docSource: this.$route.query.docSource
        }
      }
    },
    // 目录返回
    catalogFun (data) {
      console.log(data, 6333)
      console.log(data, 2)
      this.dirIdObj = data
      this.dirIdName = data.idsName
      this.queryObj.dirId = data.ids
      this.calaLogObj = data.ids
    },
    getRowKeys (row) {
      return row.index
    },
    // 复选框点击
    handleSelectionChange (val) {
      if (val) {
        this.selectionData = val
        this.selectIndex = this.selectionData.length
      }
    },
    // 导出
    exportComment () {
      if (!this.selectionData.length) {
        this.$message.info('当前无选中文件，请选择您要导出的文件')
        return
      }

      let fileId = [], dirs = []
      this.selectionData.forEach(v => {
        fileId.push(v.fileId)
        dirs.push(v.dirId)
      })

      let arr = [...new Set(fileId)]
      console.log(arr)
      let obj = {
        token: this.token,
        userId: this.userId,
        "data": {
          "fileName": this.$store.state.projectMsg.projectMsg.name, // 项目名称
          "files": arr.join(','), // 文件id
          "dirs": '', // 目录id
          "projectId": this.projectId,
          "source": this.$route.query.docSource,  // 0 项目文档 、1 底稿、2项目文档-检索页
        }
      }
      if (this.$store.state.isPC) {
        this.$store.commit('export', {
          url: '/doc/paper/ViewExport',
          data: obj.data
        });
        return;
      }
      this.export('/doc/paper/ViewExport', obj);
    },
    export (url, data) {
      //导出模拟form表单
      var allUrl = this.reqApi + url;
      var form = $('<form></form>');
      form.attr('method', 'post');
      form.attr('action', allUrl);
      form.attr('Content-Type', 'application/json;charset=UTF-8');
      form.attr('dataType', 'json');
      form.attr("target", "stop");

      var input1 = $('<input name="token" style="opacity:0"/>');
      input1.val(data.token);
      var input2 = $('<input name="userId" style="opacity:0"/>');
      input2.val(data.userId);
      form.append(input1);
      form.append(input2);
      if (data.data) {
        var input3 = $('<input name="data" style="opacity:0"/>');
        input3.val(JSON.stringify(data.data));
        form.append(input3);
      }
      $('body').append(form);
      form.submit().remove();
    },
    //分页
    onPageChange (currentPage) {
      console.log(2)
      this.currentPage = currentPage
      this.queryFn()
    },
    handleSizeChange (val) {
      console.log(1)
      this.currentPage = 1
      this.pageSize = val;
      this.queryFn()
    }
  },
  watch: {
    tableData (val) {
      val.forEach(v => {
        this.selectionData.forEach(m => {
          if (v.id == m.id) {
            this.$refs.table.toggleSelection(m)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
#app {
  overflow: auto;
  background: #ffffff;
}
#approval-comments {
  width: 100%;
  position: relative;
  background: #ffffff;
  height: 100%;
  /* overflow: auto; */
}
.approval-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 0px 0px rgba(220, 223, 230, 1);
  position: fixed;
  z-index: 2;
  top: 0px;
  left: 0;
  right: 30px;
}
nav {
  /* width: 100%; */
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-left: 30px;
  /* position: fixed; 
      z-index: 2;
      top: 0px;
      left: 0;  */
}
.approval-content {
  margin-top: 70px;
  background: #ffffff;
  padding: 20px;
}
header {
  width: 100%;
  /* padding: 25px; */
}
section {
  width: 100%;
  margin-top: 20px;
  /* margin-bottom: 50px; */
}
footer {
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0;
  text-align: right;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  border-top: 1px solid rgba(235, 238, 245, 1);
}
aside {
  width: 100px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
}
.clearfix {
  display: flex;
  flex-wrap: wrap;
}
.q-246 {
  width: 250px;
}
.q-170 {
  width: 170px;
}
.el-form .el-button {
  float: left;
  margin-left: 20px;
  width: 90px;
  height: 40px;
  line-height: 1;
}
.cell .el-button {
  padding: 0;
}
.pagination {
  background-color: #fff;
  position: absolute;
  bottom: 20px;
  right: 10px;
  padding-right: 20px !important;
}
.fille-name {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.statewait {
  color: #fbbb50;
}
.stateNo {
  color: red;
}
.stateSuccess {
  color: rgba(103, 194, 58, 1);
}
.replay {
  color: rgba(0, 97, 169, 1);
}
.fileapproval {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.choseAuditor div {
  text-align: left;
  height: 380px;
}
.sltitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style>
/* .el-popover{
    max-width: 300px;
  } */
</style>