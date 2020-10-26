<template>
  <div class="projecmeeting">
    <div class="header-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目会议</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="headersBox finance_tit">
      <div class="headersL">
        <toggle-project permission="project_meet" @change-project="handleChangeProject"></toggle-project>
      </div>
      <div class="headersR">
        <el-button type="primary" @click="toggleSelection()">导出</el-button>
        <el-button
          v-if="$utils.checkProjectPermission('project_add_mett')"
          icon="el-icon-plus"
          type="primary"
          @click="new_Meet"
        >新增会议</el-button>
      </div>
    </div>
    </div>
    <!-- 页面公共组件 -->
    <mymetting-comment :mymettingType="2" ref="mymettingchild" @transferChannel="handleSelectionChange"></mymetting-comment>

    <!-- 新增会议 -->
    <el-dialog title="新增会议"
               :visible.sync="dialogVisible"
               @close="addqux"
               :close-on-click-modal="false" width="660px"
               class="new-add-meeting">
      <div style="" :class="{autoHeight:autoHeight}">
        <el-scrollbar style="height:100%">
          <el-form
            ref="form"
            :model="msgObj"
            label-width="140px"
            style="margin-bottom: 6px;"
            class="form_boxadd clearfix"
          >
            <el-col :span="22">
              <ul align="left" class="riwjn_we">
                <li class="usernanmestlt" required>
                 <i style="color:#f56c6c;position:relative;right:4px;">*</i>参会人员：</li>
                <li class="usernanmes">
                  <span
                    class="userbtn"
                    style="padding-left:9px;padding-right:20px;"
                    v-for="(item,index) in usName"
                    :key="index"
                  >
                    {{item.name}}
                    <button class="deletro delusebtn" @click="deletx(index)"></button>
                  </span>
                  <span v-if="usName.length>0">&nbsp;&nbsp;</span>
                  <el-button type="primary" @click="optPrinFn(1)" size="mini">选择人员</el-button>
                </li>
              </ul>
            </el-col>

            <el-col :span="22">
              <!-- <el-form-item label="列席人员:"> -->
              <ul align="left" class="riwjn_we">
                <li class="usernanmestlt">列席人员：</li>
                <li class="usernanmes">
                  <span
                    class="userbtn"
                    style="padding-left:9px;padding-right:20px;"
                    v-for="(item,index) in appointObj"
                    :key="index"
                  >
                    {{item.name}}
                    <button class="deletro delusebtn" @click="deletl(index)"></button>
                  </span>
                  <span v-if="appointObj.length>0">&nbsp;&nbsp;</span>
                  <el-button type="primary" @click="optPrinFn(2)" size="mini">选择人员</el-button>
                </li>
              </ul>
            </el-col>
            <el-form-item required label="会议主题：" style="margin-top:12px">
              <el-input v-model="msgObj.name" placeholder="请输入会议主题" :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item required label="会议类型：">
              <!-- {{msgObj.typeName}} -->
              <el-select v-model="msgObj.typeName" placeholder="请选择会议类型" class="select-meeting-type">
                <el-option
                  v-for="item in selectStateList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="会议地点：">
              <el-input v-model="msgObj.meetingSite" placeholder="请输入会议地点" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item required label="会议时间：">
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="pro_time"
                type="datetime"
                @change="stratinfo"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议开始时间"
              ></el-date-picker>
              <el-date-picker
                @focus="$utils.handleTimeFocus"
                v-model="list_time"
                type="datetime"
                @change="endinfo"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议结束时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="提醒：">
              <!-- {{msgObj.remindType}} -->
              <el-select v-model="msgObj.remindType" placeholder="无提醒">
                <el-option
                  v-for="item in selectremind"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <el-select v-model="msgObj.pro_mode" v-if="!drg" multiple placeholder="请选择">
                <el-option
                  v-for="item in modelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="会议内容：" style="margin-top:10px;">
              <el-input
                type="textarea"
                :rows="2"
                v-model.trim="msgObj.pro_remark"
                placeholder="请输入会议内容"
                :maxlength="2000"
                style="width:450px;text-align: left;"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-col :span="22">
              <!-- <el-form-item label="列席人员:"> -->
              <ul align="left" class="riwjn_wec">
                <li class="usernanmestlt2">抄送人：</li>
                <li class="usernanmes">
                  <span
                    class="userbtn"
                    style="padding-left:9px;padding-right:20px;"
                    v-for="(item,index) in copyperson"
                    :key="index"
                  >
                    {{item.name}}
                    <button class="deletro delusebtn" @click="deletchao(index)"></button>
                  </span>
                  <span v-if="copyperson.length>0">&nbsp;&nbsp;</span>
                  <el-button type="primary" @click="optPrinFn(7)" size="mini">抄送人员</el-button>
                </li>
              </ul>
            </el-col>

            <!-- <el-col :span="22"> -->
            <el-form-item label="附件：" label-width="140px" style="line-height: 40px;" align="left" class="add-meeting-doc w-100">
              <add-attachment ref="attachment"
                              :projectId="projectId"
                              @select="$utils.handleSelect(arguments, selectedFileList)"></add-attachment>

              <ul style="text-align: left;" class="attachment-wrap">
                <li v-for="(item, index) in selectedFileList" class="attachemnt-list-item" :key="index">
                  <p class="attachemnt-list-doc">
                    <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:projectId,sourceName:'新增会议',projectName:projectMsg.name})" :title="item.docName">{{item.docName}}</span>
                    <span>
                      <el-button class="mr-10" v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList,item)">删除</el-button>
                    </span>
                  </p>
                </li>
              </ul>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-form-item>
            <!-- </el-col> -->
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top:6px;">
        <el-button size="medium" @click.stop="addqux">取 消</el-button>
        <el-button size="medium" type="primary" @click="saveEditor">保存</el-button>
      </span>
    </el-dialog>
    <input type="file" id="fileBtn" style="display:none">
    <!--选择人员 -->
    <findall-deptuser
     :findFlagShow.sync="findFlag"
      :findUserObj="findUserObj"
      v-on:findAllUser="findAllUser"
      :findState="findState"
      :checkState="checkState"
    ></findall-deptuser>
  </div>
</template>

<script  >
import { wisdom_doc } from "@/pages/common/js/doc.main";
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
// import meetingDetails from "@/components/file/meetingDetails";
// 公用模块组件
import mymettingComment from "@/pages/front/maindesk/mymeeting/mymettingComment";
export default {
  name: "",
  data() {
    return {
      client: window.client,
      selectedFileList: [],
      token: "",
      userId: "",
      projectMsg: {},
    //   search_form: {
    //     pro_name: "",
    //     startTime: "",
    //     endTime: "",
    //     usName: ""
    //   },
    //   startTime:'',
    //   endTime:'',
      projectId: "", //会议id
      user_num: "",
      usName: [], //添加参会人员
      userIds: [], //添加参会人员id集
      userIdsnew: [],
      appointObj: [], //列席联系人
      rankUserIds: [], //列会人员id集
      tableData: [],
      meetingIds: [], //删除会议id集合
      //分页
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      //提醒
      selectremind: [
        {
          id: 0,
          name: "无提醒"
        },
        {
          id: 1,
          name: "提前15分钟"
        },
        {
          id: 2,
          name: "提前1小时"
        },
        {
          id: 3,
          name: "提前3小时"
        },
        {
          id: 4,
          name: "提前1天"
        }
      ],
      //提醒方式
      modelist: [
        {
          id: "0",
          name: "站内信"
        // {
        //   id: "1",
        //   name: "邮件"
        // },
        // {
        //   id: "2",
        //   name: "短信"
        }
      ],
      selectStateList: [],//会议类型列表
      msgObj: {
        id: "",
        name: "",
        typeName: "",
        pro_job1: "",
        pro_job2: "",
        pro_mode: [],
        meetingSite: "",
        remindType: 0, //会议提醒
        remindVay: "", //提醒方式
        pro_remark: ""
      },
      pro_time: "",
      list_time: "",
      met_typeName: "",
      met_addre: "", //会议地址id
      remindType: "0", //提醒id
      dialogVisible: false, //新建
      multipleSelection: [],
      copyperson: [], //抄送人
      copypersons: [],
      //单个删除会议 数组中传入要删除的（id)
      met_ar: "",
      met_arname: "", //单个删除会议name
      mulid: [], //获取要删除的id的
      mulid_id: [], //获取要删除的id的
      exportlis: [], //导出数据集合
      success_code: "",
      //新增选择人员
      findFlag: false,
      findUserObj: [],
      findUserObj1: [],
      findUserObj2: [],
      findUserObj7: [],
      findUserObj3: [],
      findUserObj4: [],
      findState: {},
      checkState: {},
      newProjectMeetingTimer: null,
      autoHeight:false
    };
  },
  computed: {
    // 计算属性的 getter
    remindVayss: function() {
      if(this.msgObj.remindType == 0){
        return "";
      }
      return this.msgObj.pro_mode.join(",");
    },
    drg: function() {
      var srr = false;
      if (this.msgObj.remindType > 0) {
        srr = false;
      } else {
        srr = true;
        this.msgObj.pro_mode = [];
      }
      return srr;
    },
  },
  mounted() {
    //this.listTablse();
    this.$refs.mymettingchild.listTablse()
    this.success_code = this.code.codeNum.SUCCESS;
    this.getPromptType();
  },
  methods: {
        // 获取提醒方式
    getPromptType() {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
              console.log(res.data.email)
              if(res.data.email == 1){
                  this.modelist.push(
                       {
                          id: "1",
                          name: "邮件"
                        }
                  )
              }
              if(res.data.sms == 1){
                  this.modelist.push(
                        {
                            id:"2",
                            name:'短信'
                        },
                  )
              }
            return;
          }
          this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },

    stratinfo(){
      this.pro_time = this.pro_time+':00'
    },
    endinfo(){
      this.list_time = this.list_time+':00'
    },
    handleChangeProject(data) {
      // 更新项目信息
      this.projectId = data.id;
      this.projectMsg = data;
      // 重置筛选条件
      this.resetBtn()
      // 查询
    //   this.listTablse()
    this.$refs.mymettingchild.listTablse()
    },

    //打开新增会
    new_Meet() {
      // 项目状态判断
      if(this.$store.state.projectMsg.projectMsg.endFlag  && this.$store.state.projectMsg.projectMsg.endFlag === 1){
        this.$store.commit('projectStatusTips');
        return;
      }
      this.copyperson = [];
      this.copypersons = [];
      this.usName = [];
      this.appointObj = [];
      this.userIdsnew = []
      this.userIds = []
      this.rankUserIds = []
      this.msgObj.name = "";
      this.msgObj.typeName = "";
      this.msgObj.meetingSite = "";
      this.pro_time = "";
      this.list_time = "";
      this.msgObj.remindType = "";
      this.msgObj.pro_mode = [];
      this.msgObj.pro_remark = "";
      this.msgObj.meetingSite = "";
      this.msgObj.name = "";

      this.selectedFileList = [];
      this.newMeet();
      this.dialogVisible = true;
      // 取出保存的草稿
      let draft = this.$utils.getDraft('projectMeeting', true)
      // 如果没有草稿，设置定时器，返回
      if(!draft){
        this.setTimer()
        return
      }
      // 有草稿，展示提示弹窗
      this.$confirm('是否载入上次保存的草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
     }).then(() => {
        // 回显草稿数据
        this.msgObj = {...this.msgObj, ...draft};
        this.setTimer()
      }).catch(() => {
        this.setTimer()
      });
    },
    /**
     * 设置定时器：每5秒保存一次表单数据
     */
    setTimer() {
      // 启动定时器，每5000ms保存一次草稿
      this.newProjectMeetingTimer = setInterval(()=>{
        this.handleDraftData();
      }, 5000)
    },
    handleDraftData(){
      let data = {
        name: this.msgObj.name,//会议主题
        meetingSite: this.msgObj.meetingSite,//会议地点
        pro_remark: this.msgObj.pro_remark // 新建时会议内容
      }
      this.$utils.saveDraft('projectMeeting', data, true)
    },
    //新增会议查询配置
    newMeet() {
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: 0,
        pageSize: 100,
        data: {}
      };
      var _this = this;
      this.$post("/info/project/getMeetingConfigAll", data)
        .then((response)=> {
          _this.selectStateList = response.data.list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletx(v) {
        console.log(v);
      this.usName.splice(v, 1);
    },
    deletl(v) {
      this.appointObj.splice(v, 1);
    },

    //添加保存会议新增
    saveEditor() {
      var myDate = new Date();
      this.met_typeName = this.msgObj.typeName;
      this.met_addre = this.msgObj.meetingSite;
      this.remindType = this.msgObj.remindType;
      if(this.msgObj.remindType == 0 || this.msgObj.remindType == ""){
        this.msgObj.pro_mode = [];
      }
      var _this = this;
      var repeatPerson = [];
      for(let i=0;i<this.usName.length;i++){
        for(let j=0;j<this.appointObj.length;j++){
            if(this.usName[i].userId == this.appointObj[j].userId){
              repeatPerson.push(this.usName[i].name);
            }
        }
      }
      if(repeatPerson.length != 0){
        var repeatList = repeatPerson.join('、')  + "不能同时为参会和列席人员";
        this.$message.error(repeatList);
        return;
      }
      // appointObj
      this.usName.forEach(function(c) {
        if (c.userId) {
          _this.userIds.push(c.userId);
        }
      });

      if (this.appointObj !== "") {
        var appObj = [];
        this.appointObj.forEach(function(c) {
          if (c.userId) {
            appObj.push(c.userId);
          }
        });
        this.rankUserIds = Array.from(new Set(appObj));
      }
      if (this.userIds == "") {
        // this.$message.error("参会人员不能为空");
        this.$message.error("请选择人员");
        return;
      }
      if (this.msgObj.name == "") {
        this.$message.error("会议主题内容不能为空");
        return;
      }
      if (this.met_typeName == "") {
        this.$message.error("会议类型内容不能为空");
        return;
      }
      if (this.met_addre == "") {
        this.$message.error("会议地点不能为空");
        return;
      }
      if (this.pro_time == "" || this.pro_time == null) {
        this.$message.error("会议开始时间不能为空");
        return;
      }
      if (this.list_time == "" || this.list_time == null) {
        this.$message.error("会议结束时间不能为空");
        return;
      }
      var oDate1 = new Date(this.pro_time);
      var oDate2 = new Date(this.list_time);
      if (oDate1.getTime() < myDate.getTime()) {
        this.$message.error("开始时间不能小于当前时间");
        return;
      }
      if (oDate1.getTime() > oDate2.getTime()) {
        this.$message.error("开始时间不能大于结束时间");
        return;
      }
      if (oDate1.getTime() === oDate2.getTime()) {
        this.$message.error("开始时间不能等于结束时间");
        return;
      }
      if (oDate2.getTime() < this.$moment().add(1, "hours")) {
            this.$message.error("结束时间需大于当前时间1小时");
            return;
        }


      if(this.msgObj.remindType !== 0 && this.msgObj.remindType !== ""){
          if(this.msgObj.pro_mode.length == 0){
            this.$message.error("请选择提醒方式");
            return;
          }
        }
      this.userIdsnew = Array.from(new Set(this.userIds));
      if (this.copyperson !== "") {
        var copy_rson = [];
        this.copyperson.forEach(function(c) {
          if (c.userId) {
            copy_rson.push(c.userId);
          }
        });
        this.copypersons = Array.from(new Set(copy_rson));
      }

      if(this.$store.state.isUpload) {
        this.$message.warning('有文件正在上传，请稍后操作')
        return;
      }

      let localAttach = []
      let projectRelev = []

      this.selectedFileList.forEach(v=>{
        v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
      })



      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          projectId: this.projectId,
          name: this.msgObj.name, // "会议主题",
          typeId: this.met_typeName,
          site: this.met_addre, // "会议地点（数据字典表code)",
          remindType: this.msgObj.remindType, //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
          remindVay: this.remindVayss, //"站内信,邮件,短信"
          projectName: this.projectMsg.name, //"项目名称"this.projectMsg.name
          projectStage: this.projectMsg.currentImplementStageName, // "项目阶段名称"
          stageId: this.projectMsg.currentImplementStageId, //"项目阶段id"
          startTime: this.pro_time, //开始时间
          endTime: this.list_time, //结束时间
          userIds: this.userIdsnew, //"参会人员id集合",
          rankUserIds: this.rankUserIds, //"列会人员id集合",
          docIds: localAttach, //"附件id集合"
          projectDocIds: projectRelev,
          content: this.msgObj.pro_remark,
          copyerUserIds: this.copypersons
        }
      };

      this.$post("/info/project/addMeeting", data)
        .then((response)=> {
          console.log(response);
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.dialogVisible = false;
            _this.$message.success("会议发起成功");
            clearInterval(_this.newProjectMeetingTimer);
            // 保存成功，清空草稿数据
            _this.$utils.removeDraft('projectMeeting', true);
            //_this.listTablse();
            _this.$refs.mymettingchild.listTablse()
            (_this.msgObj.name = ""), // "会议主题",
              (_this.msgObj.typeName = ""),
              (_this.msgObj.meetingSite = ""), // "会议地点（数据字典表code)",
              (_this.msgObj.remindType = ""), //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
              (_this.pro_time = ""), //开始时间
              (_this.list_time = ""), //结束时间
              (_this.userIds = []), //"参会人员id集合",
              (_this.rankUserIds = []); //"列会人员id集合"

            // _this.shagreatl = []; //"列会人员id集合"
            _this.copyperson = [];
            _this.copypersons = [];
            _this.msgObj.pro_remark = "";
            this.findUserObj=[]
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //会议导出列表
    toggleSelection() {
        //console.log(this.$refs.mymettingchild.handleSelectionChange(val))
        if(!this.$utils.checkProjectPermission('project_meet')){
          this.$message.error('无对应权限，请联系对应项目组负责人处理')
          return
        }
      var exortsList = [];
      exortsList = JSON.stringify(this.exportlis);
      if (this.exportlis.length <= 0) {
        this.$message({
          type: "info",
          message: "选择导出项"
        });
      } else {
        this.$store.commit("export", {
          url: "/info/project/exportMeeting",
          data: this.exportlis
        });
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      var arrids = [];
      var exorts = [];
      if (val.length > 0) {
        this.multipleSelection.forEach(function(c) {
          if (c.id) {
            arrids.push(c.id);
          }
          exorts.push({
            name: c.name,
            typeName: c.typeName,
            // date: c.startTime",
            date: c.date,
            usName: c.usName,
            rankName: c.rankName,
            site: c.site
          });
        });
      } else {
        arrids = [];
        exorts = [];
      }
      var hash = [];
      for (var i = 0; i < arrids.length; i++) {
        if (hash.indexOf(arrids[i]) == -1) {
          hash.push(arrids[i]);
        }
      }
      this.mulid_id = hash;
      this.exportlis = exorts;
      // console.log(this.exportlis);
    },

    // 查询
    searchBtn() {
      this.currentPage = 1;
      // this.pageSize = 10;
      var data = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          projectId: this.projectId,
          name: this.search_form.pro_name,
          startTime: this.startTime,
          endTime: this.endTime,
          usName: this.search_form.usName
        }
      };
      var _this = this;
      this.$post("/info/project/getMeetingAll", data)
        .then((response)=> {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.tableData = response.data.list;
            _this.dataTotal = response.data.total;
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 重置
    resetBtn() {
     this.search_form = {
        pro_name: "",
        startTime: "",
        endTime: "",
        usName: ""
      }
      this.startTime=''
      this.endTime=''
    },
    addqux() {
      this.$refs['attachment'] && this.$refs['attachment'].close()
      console.log('取消11111')
      // this.handleDraftData();
      this.dialogVisible = false;
      clearInterval(this.newProjectMeetingTimer);


    },

    // 查看附件
    seeFj(v, num, id, type, item) {
      if (num == 1) {
        this.$message({
          type: "warning",
          message: "该附件已被删除"
        });
      } else {
        // this.$router.push({
        //   path: "/preview",
        //   query: {
        //     rfsId: v,
        //     docId: id
        //   }
        // });
        var proViewData = {
          projectId:this.projectId,
          rfsId: v,
          docId: id,
          photoType: type,
          docName: item.fileName
        }
        this.$store.commit('previewAllFn',proViewData)
      }
    },

    //下载附件
    dowanFs(num,item) {
      let download_arr = [];
      if(this.$store.state.isPC) {
        this.$store.commit("pcOtherDownload",{
          docId: num == 1?item.id:item.docId,
          docName: num == 1?item.name:item.fileName
        });
      }else {
        download_arr.push({
          name: num == 1?item.name:item.fileName,
          id: num == 1?item.id:item.docId
        });
      }

      this.$store.commit("download", download_arr);
    },
    //删除抄送人员
    deletchao(v) {
      this.copyperson.splice(v, 1);
    },
    //  新增中介机构
    optPrinFn(num) {
      this.findFlag = true;
      this.user_num = num;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (num == 1) {
        this.findUserObj = this.$utils.cloneDeepArray(this.usName)
      } else if (num == 2) {
        this.findUserObj = this.$utils.cloneDeepArray(this.appointObj)
      } else if (num == 7) {
        this.findUserObj = this.$utils.cloneDeepArray(this.copyperson)
      }
    },
    //renyun
    findAllUser(data) {
      this.findFlag = false;
      this.findState = {};
      this.checkState = {};
      if(!data || !data.length){
        if (this.user_num == 1) {
          this.usName = []
        } else if (this.user_num == 2) {
          this.appointObj = []
        } else if (this.user_num == 7) {
          this.copyperson = []
        }
        return
      }
      data.forEach(v => {
        v.uniqueKey = 'user' + v.id
      })
        //参会人员
      if (this.user_num == 1) {
        this.usName = data
      } else if (this.user_num == 2) {
        this.appointObj = data
      } else if (this.user_num == 7) {
        this.copyperson = data
      }
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
  },
  watch: {
           'selectedFileList': {
            handler(newName, oldName) {
                console.log(newName)
                if(newName.length>0){
                    this.autoHeight = true;
                }
            },
            deep: true
        },
  },
  components: {
    findallDeptuser,
    mymettingComment
  }
};
</script>

<style scoped lang="scss" type="text/css">
.file-name {
  display:inline-block;
  float:left;
  width:80%;
  cursor:pointer;
  white-space: nowrap;
  text-overflow : ellipsis;
  overflow:hidden;
}
.del-file{
  text-decoration: line-through;
}
  .w-100{
    width: 100%;
  }
.projecmeeting {
  width: 100%;
  padding: 0px 0px;
  position: relative;
  background: #f0f2f5;
  overflow: hidden;
  // .riheader {
  //   width: 100%;
  //   // height: 96px;
  //   padding: 0 10px;
  //   // padding-bottom: 5px;
  //   background: rgba(255, 255, 255, 1);
  //   .el-breadcrumb {
  //     line-height: 46px;
  //   }
  //     .finance_tit{
  //   // padding:10px 0;
  //   padding-bottom: 10px;
  //   font-size: 20px;
  //   font-weight: bold;
  //   // padding-left: 10px;
  //   /*// margin:5px 0 19px;*/
  // span{
  //   float:left;
  //   color:#333;
  //   font-size:20px;
  //   // line-height:32px;
  //   // margin-left:10px;
  // }
  // }
  // }
  .form_boxadd {
    background: #fff;
    // padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 12px;
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
      margin-top: 2px;
    }
  }
  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
  display:flex;
  flex-wrap:wrap;
    .el-form-item {
      float: left;
      // margin-right: 20px;
      margin-bottom: 12px;
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
      // margin-top: 2px;
    }
  }
  .form_boxb {
    background: #fff;
    // padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 12px;
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
    .edit_meeting .el-button{
      margin-left: -10px;
    }
    .el-button {
      float: left;
      margin-left: 20px;
      margin-top: 2px;
    }
  }
  .meet_content {
    width: 100%;
    margin: 14px auto;
    background-color: #ffffff;
    .el-pagination {
        text-align: right;
        margin-top: 10px;
        padding-right: 40px;
        float: right;
    }
  }
  .table_foot {
    margin-top: 20px;
    margin-left: 10px;
    text-align: left;
  }

  .tan_dialog {
    position: relative;
    .el-form-item{
      margin-bottom:16px;
    }
  }
  .dialog-footer {
    /*// position: absolute;*/
    /*// right: 20px;*/
    /*// bottom: 14px;*/
  }
  .cvote_button {
    margin-left: -6px;
  }
  .el-breadcrumb {
        line-height: 40px;
    }
     .headersBox {
    overflow: hidden;
    zoom: 1;
    .headers_clearFix_title {
      text-align: left;
      font-size: 20px;
      font-weight: bold;
    }
    .headersL {
      float: left;
    }
    .headersR {
      float: right;
      box-sizing: border-box;
      padding-right: 10px;
    }
  }
}

.riwjn_we {
  margin-left: 58px;
  margin-top: 3px;
  display: flex;
  flex-wrap: nowrap;
}
.riwjn_we li {
  margin-top: 6px;
  line-height: 30px;
}
.riwjn_wec {
  margin-left: 72px;
  margin-top: 7px;
  display: flex;
  flex-wrap: nowrap;
}
.riwjn_wec li {
  margin-top: 6px;
  line-height: 30px;
}
.deleth {
  text-decoration: line-through;
}
.usernanmestlt {
  width: 16%;
}
.usernanmestlt2 {
  width: 14%;
}
.usernanmes {
  width: 84%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  max-height:113px;
}

.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 26px;
}
.el-table td,
.el-table th {
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.table_box {
  padding-bottom: 16px;
}
.deletbutton {
  border: none;
  width: 30px;
  height: 30px;
  background: url("../../../../assets/manuscript_icon/shanchu-81.png") no-repeat;
  background-size: 100% 100%;
}


.deletbutton:hover {
  /*// background-color: #de5252;*/
  /*// color: #ffffff;*/
  border: none;
  width: 30px;
  height: 30px;
  background: url("../../../../assets/manuscript_icon/shanchu.png") no-repeat;
  background-size: 100% 100%;
}

.content_x {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.deletro {
  padding: 0;
  padding-left: 6px;
  width: 15px;
  height: 15px;
  background: url("../../../../assets/image/sanc.png") no-repeat;
  background-size: 100% 100%;
}
.fujllistul {
  width: 400px;
}
.fujllistul li {
  width: 100%;
  display: flex;
  padding-right: 15px;
  line-height: 26px;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.fujllistul.add-meeting-fujllistul li{
  display: block;
}
.fujlliltitle {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fujllistul li:hover {
  background: #f7f9fb;
}


.userbtn {
  position: relative;
}
.delusebtn {
  position: absolute;
  right: 0px;
  top: 0px;
}
.projecmeeting .form_boxb .edit_meeting .el-button.edit-meeting-button{
  margin-left:20px;
}
/deep/ .form_self_deep{
  .cell{
      text-overflow: ellipsis;
      overflow: hidden;
  }
}
/deep/ .clip-self-deep{
    &:after{
      display:block;
      content:' ';
      width:1px;
      height: 1px;
      clear:both;
      zoom:0;
      visibility:hidden;
    }
  }
.projecmeeting{
  .toggle-project-container{
    margin-top: 14px;
    padding-left:0;
  }
}


p.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

p.attachemnt-list-doc .doc-name{
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

p.attachemnt-list-doc .doc-delete{
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
  .query-btn{
    height:40px;
  }

</style>
<style lang="scss" type="text/css">
.new-add-meeting .attachment-wrap{
  margin-right: 20px;
  max-height: 113px;
  overflow-y: auto;
}
.tan_dialog .el-form-item .el-form-item__content{
    //   overflow-y:auto;
    //   max-height:113px;
  }
.editMetting .el-form-item .el-form-item__content, .editMetting .riwjn_we{
      overflow-y:auto;
      max-height:113px;
  }

.projecmeeting .headersBox .el-button+.el-button {
    margin-left: 5px;
}
.projecmeeting .el-table__row {
  height: 53px;
}
.projecmeeting .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e8e8e8;
}
.projecmeeting .el-dialog__body {
  padding: 14px 20px 20px 30px;
  color: #606266;
  font-size: 14px;
}
.projecmeeting .new-add-meeting .el-dialog__body {
  padding: 14px 6px 20px 0;
}
.projecmeeting .new-add-meeting .select-meeting-type .el-input--suffix .el-input__inner{
  padding-left:15px;
}
.projecmeeting .form_boxadd .el-button {
  float: left;
  margin-left: 0px;
  margin-top: 2px;
}
.projecmeeting .form_boxb .el-button {
  float: left;
  margin-left: 0px;
  margin-top: 2px;
}
.projecmeeting .riwjn_we li {
  margin-top: 6px;
  line-height: 30px;
  padding-left: 2px;
}
.project-from-item{
  margin-right:10px;
  .el-form-item__label{
    text-align: left;
  }
  .el-form-item__content{
    margin-left: 82px;
  }
}
.autoHeight{
    height:550px;
}
</style>


