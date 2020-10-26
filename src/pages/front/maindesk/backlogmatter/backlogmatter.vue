<template>
  <div class="backlogmatterparents">
    <div class="backlogmetter">
      <div class="maindeskindex_contenti_headers">
        <el-breadcrumb separator="/"
                       style="margin-top:20px;">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>待办事项</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="headers_clearFix">
          <span class="headers_clearFix_title"
                style="color:#333;">待办事项</span>
        </h3>
      </div>
      <div class="container">
        <el-card class="box-card no-padding">
          <div class="container_box query-box"
               v-on:keyup.enter="onSearch">
            <el-form :inline="true"
                     :model="formInline"
                     class="demo-form-inline">
              <el-form-item label="名称：">
                <el-input v-model="formInline.itemName"
                          placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="所属项目：">
                <el-input v-model="formInline.projectName"
                          placeholder="请输入所属项目"></el-input>
              </el-form-item>
              <el-form-item label="类型：">
                <el-select v-model="formInline.region"
                           placeholder="请选择类型">
                  <el-option :key="0"
                             :value="0"
                             label="全部"></el-option>
                  <el-option v-if="$utils.m('project_task')"
                             :key="1"
                             label="任务"
                             :value="1"></el-option>
                  <el-option v-if="$utils.m('project_meeting')"
                             :key="2"
                             label="会议"
                             :value="2"></el-option>
                  <el-option v-if="$utils.m('project_vote')"
                             :key="3"
                             label="投票"
                             :value="3"></el-option>
                  <el-option v-for="item in typeMatter"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="截止时间：">
                <date-range :date-start.sync="formInline.startTime"
                            :date-end.sync="formInline.endTime"
                            format="yyyy-MM-dd HH:mm:ss"></date-range>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="onSearch"
                           icon="el-icon-search">查询</el-button>
                <el-button @click="resetBtn"
                           icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="tableData"
                      style="width: 100%"
                      fit
                      show-header
                      :header-cell-style="{background:'#FAFAFA',color:'#000'}">
              <el-table-column fixed
                               prop="itemName"
                               label="事件名称"
                               align="center"
                               min-width="140">
                <template slot-scope="scope">
                  <el-button @click="matterDetail(scope.row)"
                             type="text"
                             class="ellipsis1"
                             style="padding:0;width:100%"
                             :title="scope.row.itemName">{{ scope.row.itemName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="itemTypeName"
                               label="事件类型"
                               align="center"
                               min-width="80">
                <template slot-scope="scope">
                  <p :title="scope.row.itemTypeName"
                     class="ellipsis1">{{scope.row.itemTypeName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="projectName"
                               label="所属项目"
                               align="center"
                               min-width="100">
                <template slot-scope="scope">
                  <p :title="scope.row.projectName"
                     class="ellipsis1">{{scope.row.projectName}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="createDate"
                               label="创建时间"
                               align="center"
                               min-width="100">
                <template slot-scope="scope">
                  <p :title="timeFilter(scope.row.createDate)"
                     class="ellipsis1">{{timeFilter(scope.row.createDate)}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="startDate"
                               label="开始时间"
                               align="center"
                               min-width="100">
                <template slot-scope="scope">
                  <p :title="timeFilter(scope.row.startDate)"
                     class="ellipsis1">{{timeFilter(scope.row.startDate)}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="endDate"
                               label="截止时间"
                               align="center"
                               min-width="100">
                <template slot-scope="scope">
                  <p :title="timeFilter(scope.row.endDate)"
                     class="ellipsis1">{{timeFilter(scope.row.endDate)}}</p>
                </template>
              </el-table-column>
              <el-table-column fixed="right"
                               label="操作"
                               align="center"
                               min-width="180">
                <template slot-scope="scope">
                  <div>
                    <template v-if="scope.row.itemTypeName == '审批'">
                      <el-button type="text"
                                 @click="instruction(scope.$index,scope.row,0)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont shenpi"
                                 title="审批"></el-button>
                      <el-button type="text"
                                 @click="instruction(scope.$index,scope.row,9)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont jilu"
                                 title="审批记录"></el-button>
                      <el-button type="text"
                                 @click="guanlianshenpi(scope.row)" v-if="scope.row.approvalVo.relatedApprove"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont guanlianshenpi"
                                 title="关联审批"></el-button>
                      <el-button type="text"
                                 @click="quxiaoguanlianshenpi(scope.row)" v-if="scope.row.approvalVo.relatedApprove"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont quxiaoguanlian"
                                 title="取消关联审批"></el-button>
                      <el-button type="text"
                                 v-if="$utils.m('project_meeting') && scope.row.approvalVo.relatedMeeting == true"
                                 @click="instruction(scope.$index,scope.row,1)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont guanlianhuiyi"
                                 title="关联会议"></el-button>
                      <el-button type="text"
                                 v-if="$utils.m('project_meeting') && scope.row.approvalVo.relatedMeeting == true"
                                 @click="instruction(scope.$index,scope.row,2)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont quxiaoguanlian"
                                 title="取消关联"></el-button>
                      <el-button type="text"
                                 v-if="$utils.m('project_vote') && scope.row.approvalVo.relatedVote == true"
                                 @click="instruction(scope.$index,scope.row,3)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont guanliantoupiao"
                                 title="关联投票"></el-button>
                      <el-button type="text"
                                 v-if="$utils.m('project_vote') &&scope.row.approvalVo.relatedVote == true"
                                 @click="instruction(scope.$index,scope.row,4)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont quxiaoguanlian"
                                 title="取消关联"></el-button>
                      <span @click="Filepages(scope.row.approvalVo)"
                            v-if="scope.row.approvalVo.categoryName == '文件审批' || scope.row.approvalVo.categoryName == '文件修订审批' || scope.row.approvalVo.categoryName == '目录审批' || scope.row.approvalVo.categoryName == '底稿目录修订审批'"
                            class="iconfont icon-operate-btn"
                            style="cursor: pointer;"
                            :title="(scope.row.approvalVo.categoryName == '文件审批' || scope.row.approvalVo.categoryName == '文件修订审批')?'去审文件':'去审目录'">&#xe712;</span>
                    </template>
                    <template v-if="scope.row.itemTypeName == '投票'">
                      <el-button type="text"
                                 @click="voteDecide(scope.row)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont juece"
                                 title="投票决策"></el-button>
                    </template>
                    <template v-if="scope.row.itemTypeName != '审批'">
                      <el-button type="text"
                                 @click="matterDetail(scope.row)"
                                 style="line-height: 3px;"
                                 class="icon-operate-btn iconfont wenzhang"
                                 title="详情"></el-button>
                    </template>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="dataTotal"
                         :pageSize="pageSize"
                         :page-sizes="pageSizes"
                         :current-page="currentPage"
                         @current-change="onPageChange"
                         @size-change="handleSizeChange"></el-pagination>
        </el-card>
      </div>
      <el-dialog title="详情"
                 :close-on-click-modal="false"
                 :visible.sync="detailldiog"
                 width="660px">
        <el-form :label-position="labelPosition"
                 label-width="80px"
                 :model="msgobj">
          <el-form-item label="事件名称">
            <el-input v-model="msgobj.itemName"
                      :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="事件类型">
            <el-input v-model="msgobj.itemTypeName"
                      :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="所属项目">
            <el-input v-model="msgobj.projectName"
                      :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="msgobj.createDate"
                      :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="msgobj.startDate"
                      :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-input v-model="msgobj.endDate"
                      :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button size="medium"
                     @click="detailldiog = false">取 消</el-button>
          <el-button size="medium"
                     type="primary"
                     @click="detailldiog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <test :itemState="itemState"
          :nameinfo="nameinfo"
          @updatas="updatas" />
    <!-- 投票决策 -->
    <vote-decide v-if="voteDecideVisible"
                 :voteDecideVisible.sync="voteDecideVisible"
                 :handleVote="handleVote"
                 @sendValueToParent="voteDecideFinish"
                 @editSucess="matterlist">
    </vote-decide>
    <!-- 任务详情页 -->
    <tasks-detail :flagdetail="flagdetail"
                  :status='tasksStatus'
                  :flagdetaildatas="flagdetaildatas"
                  :ids="flagdetailIds"
                  @gxbox="tasksClose"></tasks-detail>
    <!-- 会议详情和编辑 -->
    <meeting-details v-if="meetingDetaVisible"
                     :meetingDetaVisible.sync="meetingDetaVisible"
                     :handleType="1"
                     :handleMeeting="handleMeeting"
                     @sendValueToParent="meetingDetaVisible = false"></meeting-details>
    <!-- 投票新增、详情、编辑 -->
    <vote-details v-if="voteDetaVisible"
                  :voteDetaVisible.sync="voteDetaVisible"
                  :handleType="1"
                  :title="'投票详情'"
                  :handleVote="voteData"
                  @sendValueToParent="voteDetaVisible = false"
                  @editSucess="matterlist">
    </vote-details>
    <!-- 我的日程弹框 -->
    <my-schedule :visible.sync="isdetail"
                 :formedit="formedit"
                 :disabledsedit="userId != formedit.userId"
                 :projectList="projectList"
                 :scheduleIds="{id:formedit.id,pro_id:formedit.projectId}"
                 @deletCallback="matterlist"
                 @editCallback="myScheduleEdit"
                 @closeCallback="closeSchedule">
    </my-schedule>
    <!-- 编辑日程弹框 -->
    <edit-schedule :visible.sync="isedit"
                   :formedit="editScheduleData"
                   :projectList="projectList"
                   :deployObj="editDefaultData"
                   :deplayFormObj="editFormUserData"
                   :scheduleIds="{id:editScheduleData.id,pro_id:editScheduleData.projectId}"
									 :dateClicks="dateClicks"
                   @defineCallback="defineSchedule">
    </edit-schedule>
    <related-approval @queryData = "matterlist" :examObj="examObj" v-if="relatedExamVisible" :relatedExamVisible.sync="relatedExamVisible"></related-approval>
    <cancel-related-approval @queryData = "matterlist" :examObj="examObj" v-if="cancelRelatedExamVisible" :queryList="queryList" :noData="noData"
                   :cancelRelatedExamVisible.sync="cancelRelatedExamVisible"></cancel-related-approval>
  </div>
</template>

<script>
import test from "../../Lotus/apppen"
import voteDecide from "@/components/file/voteDecide"
import tasksDetail from '@/pages/front/projecttasks/tasks/tasksDetail.vue'
import meetingDetails from "@/components/file/meetingDetails"
import voteDetails from "@/components/file/voteDetails"
import mySchedule from '@/components/select_box/mySchedule'
import editSchedule from '@/components/select_box/editSchedule'
import relatedApproval from "@/components/select_box/relatedApproval";
import cancelRelatedApproval from "@/components/select_box/cancelRelatedApproval";
const moment = require("moment");
export default {
  components: {
    test,
    voteDecide,
    tasksDetail,
    meetingDetails,
    voteDetails,
    mySchedule,
    editSchedule,
    relatedApproval,
    cancelRelatedApproval
  },
  data () {
    return {
      nameinfo: '待办事项',
      itemState: [],
      //1.23修改后的代码
      detailldiog: false,
      formInline: {
        itemName: "",
        projectName: "",
        region: 0,
        startTime: '',
        endTime: ''
      },
      labelPosition: "right",
      msgobj: {
        itemName: "",
        itemTypeName: "",
        projectName: "",
        createDate: "",
        startDate: "",
        endDate: ""
      },
      disabled: true,
      tableData: [],
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      // 客户类型
      typeMatter: [
        // {
        //     value: 0,
        //     label: '全部'
        // },
        // {
        //     value: 1,
        //     label: '任务'
        // },
        // {
        //     value: 2,
        //     label: '会议'
        // },
        // {
        //     value: 3,
        //     label: '投票'
        // },
        {
          value: 4,
          label: "审批"
        },
        {
          value: 5,
          label: "日程"
        }
      ],
      token: "",
      userId: "",
      success_code: "",
      projectList: [],
      voteDecideVisible: false, // 投票决策是否显示
      handleVote: {}, // 投票决策数据
      endsearchTimezero: "",
      flagdetail: false, // 任务详情弹框显示
      tasksStatus: '', // 任务详情status
      flagdetaildatas: {}, // 任务详情数据
      flagdetailIds: null, // 任务详情数据
      meetingDetaVisible: false, // 会议详情弹框显示
      handleMeeting: {}, // 会议详情数据
      voteDetaVisible: false, // 投票详情弹框
      voteData: {}, // 投票详情数据
      isdetail: false, // 日程详情弹框
      formedit: {}, // 日程详情数据
      isedit: false, // 日程编辑弹框
			editScheduleData: {}, // 日程编辑数据
			dateClicks:{},
      editFormUserData: [], // 日程选择人员数据
      editDefaultData: [], // 日程抄送默认数据
      examObj:{},//关联审批，取消关联审批当前数据
      relatedExamVisible: false,//关联审批
      cancelRelatedExamVisible: false,//取消关联审批
      queryList: {},//取消关联审批弹窗展示的数据
      noData: false//是否有关联
    };
  },
  mounted () {
    this.matterlist();
  },
  created () {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
  },
  methods: {
    guanlianshenpi(obj){//关联审批
      this.examObj = obj.approvalVo
      this.relatedExamVisible = true;
    },
    quxiaoguanlianshenpi(obj){//取消关联审批
        this.examObj = obj.approvalVo
        var sendData = {
            token: this.token,
            userId: this.userId,
            data:{
              approvalId: obj.approvalVo.id,//当前审批id
              taskDefKey: obj.approvalVo.taskDefKey//审批节点id
            }
        }
        this.$post("/info/audit/relevancy/getApproval",sendData).then(res => {
            if (this.code.codeNum.SUCCESS == res.code) {
                this.queryList = res.data || {};
                this.noData = res.data == undefined;
                 this.cancelRelatedExamVisible = true
            }
        })
        .catch(err => {
        });
    },
    voteDecideFinish(){
      this.voteDecideVisible = false;
      this.matterlist()
    },
    matterDetail (item) {
      console.log(item)
      const obj = {
        '会议': this.meetingDetail,
        '任务': this.taskDetail,
        '审批': this.instruction,
        '投票': this.voteDetail,
        '日程': this.scheduleDetail
      }
      item.itemTypeName == '审批' ? obj[item.itemTypeName](0, item, 0) : obj[item.itemTypeName](item)
    },
    // 我的日程关闭
    closeSchedule () {
      this.isdetail = false
      this.formedit = {}
      this.editScheduleData = {}
      this.editDefaultData.length = 0
      this.editFormUserData.length = 0
    },
    // 我的日程编辑成功
    defineSchedule () {
      this.isdetail = false
      this.isedit = false
      this.matterlist();
    },
    // 我的日程编辑按钮
    myScheduleEdit () {
      (!this.projectList || !this.projectList.length) && this.getProjectList()
      // this.isdetail = false
      this.isedit = true
    },
    // 日程详情
    scheduleDetail (item) {
      this.$post('/sys/schedule/select_schedule', {
        data: {
          id: item.id
        }
      }).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message(res.msg);
          return
        }
        const data = res.data
        let userNameList = data.personnelName.split(',')
        let userIdList = data.personnel.split(',')
        this.editFormUserData = userNameList.map((name, i) => ({ name, id: userIdList[i], userId: userIdList[i], label: name, uniqueKey: 'user' + userIdList[i] }))
        this.editDefaultData = data.scheduleUserlist
        this.formedit = {
          name: data.name,
          progress: data.projectName,
          date1: data.startDate,
          date2: data.endDate,
          desc: data.content,
          projectId: data.projectId,
          userId: data.userId,
          id: data.id,
          region: data.remindType,
          letter: data.sendType.split(',').map(Number),
          repeat: data.repeatType,
          principal: userNameList.join('、')
        }
				this.editScheduleData = this.$utils.copyObj(this.formedit)
				this.dateClicks = {
					allDay: data.isDay === 1,
					start: {
						_i:data.startDate
					}
				}
        this.isdetail = true
      }).catch(err => { console.log(err) })
    },
    // 投票编辑回调
    voteCallback () {
      this.matterlist();
    },
    // 投票详情
    voteDetail (item) {
      this.voteData = item
      this.voteDetaVisible = true
    },
    // 会议详情
    meetingDetail (item) {
      this.handleMeeting = item
      this.meetingDetaVisible = true
    },
    // 任务详情
    taskDetail (item) {
      console.log(item)
      this.tasksStatus = item.status
      this.$post('/info/task/getTaskDetailsByid', {
        data: { id: item.id }
      }).then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg)
          return
        }
        const data = res.data
        this.flagdetaildatas = data
        this.flagdetailIds = {
          implementStageId: data.implementStageId,
          parentId: item.id
        }
        this.flagdetail = true
      }).catch(err => { console.log(err) })
    },
    // 获取所有项目
    getProjectList () {
      this.$post('/info/project/getSimpleProjectList').then(res => {
        if (res.code != this.success_code) {
          this.$message.error(res.msg)
          return
        }
        this.projectList = res.data
      }).catch(err => { console.log(err) })
    },
    // 任务详情弹框关闭回调
    tasksClose (val) {
      this.matterlist();
      this.flagdetail = false
    },
    // 处理时间
    timeFilter (time) {
      return time ? time.substr(0, time.lastIndexOf(':')) : '- -'
    },
    // 投票决策
    voteDecide (item) {
      item.typeId = item.id
      this.handleVote = item
      this.voteDecideVisible = true
    },
    instruction (index, item, state) {
      this.itemState = [state, item.approvalVo, index];
    },
    updatas (val) {
      if (val) {
        this.currentPage = 1;
      }
      this.matterlist();
    },
    handleClick (row) {
      this.msgobj.itemName = row.itemName;
      this.msgobj.itemTypeName = row.itemTypeName;
      this.msgobj.projectName = row.projectName;
      this.msgobj.createDate = this.timeFilter(row.createDate)
      this.msgobj.startDate = this.timeFilter(row.startDate)
      this.msgobj.endDate = this.timeFilter(row.endDate)
      this.detailldiog = true;
    },
    Filepages (item) {
      this.$router.push({
        path: "/Filepage",
        query: { item: JSON.stringify(item), path: this.$route.path, 'name': this.nameinfo }
      });
    },
    //分页
    onPageChange (currentPage) {
      this.currentPage = currentPage;
      this.matterlist();
      //console.log(this.currentPage)  //点击第几页
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange (val) {
      //console.log(val)
      this.pageSize = val;
      this.matterlist();
    },
    // 搜索查询
    onSearch () {
      this.currentPage = 1;
      this.matterlist();
    },
    // 重置
    resetBtn () {
      this.formInline = {
        itemName: "",
        projectName: "",
        region: 0,
        startTime: '',
        endTime: ''
      };
      // this.matterlist()
    },
    matterlist () {
      this.$post("/sys/pendingItem/pending_item_list", {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          projectName: this.formInline.projectName,
          itemName: this.formInline.itemName,
          itemType: this.formInline.region,
          endStartDate: this.formInline.startTime,
          endEndDate: this.formInline.endTime ? `${ this.formInline.endTime.substr(0, this.formInline.endTime.lastIndexOf(' ')) } 23:59:59` : ''
        }
      })
        .then(response => {
          if (response.code != this.success_code) {
            this.$message(response.msg);
            return
          }
          if (this.currentPage > response.pages) {
						this.currentPage = response.pages
						this.matterlist()
          }
          this.tableData = response.data.list;
          this.tableData.forEach((item)=>{
            if(item.itemName == '普通审批' && item.approvalVo == null){
              item.approvalVo = {}
            }
          })
          this.dataTotal = response.data.total;
        })
        .catch(err => { console.log(err) });
    }
  }
};
</script>
<style lang="scss">
.backlogmatterparents .backlogmetter .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
}
// 移入表格行样式
.backlogmatterparents {
  .el-table tr.hover-row > td {
    background: #f5f7fa;
  }
}
</style>

<style lang="scss" scoped>
.backlogmatterparents .backlogmetter .el-pagination {
  text-align: right;
  margin-top: 20px;
  padding-right: 20px;
}
.backlogmatterparents .backlogmetter .maindeskindex_contenti_headers {
  padding: 0 20px;
  padding-left: 10px;
  margin: auto;
  height: 90px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;
  margin-bottom: 14px;

  .headers_break {
    height: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.5%;
  }

  .headers_clearFix {
    height: 40px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 8px;
    margin-bottom: 10px;

    .headers_clearFix_title {
      font-size: 20px;
      line-height: 40px;
      color: #333;
    }
  }
}

.backlogmatterparents .backlogmetter .container {
  margin-top: 10px;
  //   padding: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  .messagebox {
    width: 60% !important;
  }
  .rightWidth {
    width: 39% !important;
  }
  .box-card {
    width: 100%;
    height: auto;
    text-align: left;
    overflow: auto;
    margin-bottom: 20px;

    .tb_rows {
      height: 35px;
      line-height: 35px;
    }
    .tb_rows:nth-child(odd) {
      background-color: #f2f2f2;
    }
    .text-overflow {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.oper_shenhe {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-image: url('../../../../assets/image/myshenpi/shenhe_0.png');
}
.oper_shenhe:hover {
  width: 28px;
  height: 28px;
  background-size: 100% 100%;
  background-repeat: space;
  background-image: url('../../../../assets/image/myshenpi/shenhe_1.png');
}
.oper_guanlianhuiyi {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-image: url('../../../../assets/image/myshenpi/guanlanhuiyi_0.png');
}
.oper_guanlianhuiyi:hover {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-repeat: space;
  background-image: url('../../../../assets/image/myshenpi/guanlanhuiyi_1.png');
}
.oper_quxiaoguanlian {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-image: url('../../../../assets/image/myshenpi/quxiaoguanlian_0.png');
}
.oper_quxiaoguanlian:hover {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-repeat: space;
  background-image: url('../../../../assets/image/myshenpi/quxiaoguanlian_1.png');
}
.oper_guanliantoupiao {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-image: url('../../../../assets/image/myshenpi/guanlantoupiao_0.png');
}
.oper_guanliantoupiao:hover {
  width: 28px;
  height: 28px;
  background-size: cover;
  background-repeat: space;
  background-image: url('../../../../assets/image/myshenpi/guanlantoupiao_1.png');
}
</style>

