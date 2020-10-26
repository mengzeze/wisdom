<template>
  <div class="mymeeting">
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
        <el-breadcrumb-item>我的会议</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="finance_tit">
        <span>我的会议</span>
        <el-button
          size="small"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="new_Meet"
        >新增会议</el-button>
      </el-row>
    </div>
    <!-- 页面公共组件 -->
    <mymetting-comment  :mymettingType="1"  ref="mymettingchild"></mymetting-comment>
    <!-- 新增会议 -->
    <el-dialog title="新增会议"  :visible.sync="dialogVisible" @close="closeDialog" :close-on-click-modal="false" :before-close ="cancelAddMeeting" width="660px">
      <div style=""  :class="{autoHeight:autoHeight}">
        <el-scrollbar style="height:100%">
          <el-form
            ref="form"
            :model="msgObj"
            label-width="140px"
            class="form_box clearfix"
            style="padding-top:3px"
          >
            <el-form-item required label="所属项目：" style="margin-bottom: 6px;">
              <!-- {{myvoteyproj}} -->
              <select-lazy
                v-model="myvoteyproj"
                filterable
                placeholder="请选择项目"
                @change="changeProject"
                :list='myvoteproj'></select-lazy>
              <!-- <el-select v-model="myvoteyproj" placeholder="请选择项目" @change="changeProject" filterable>
                <el-option
                  v-for="item in myvoteproj"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select> -->
              <!-- {{setr_id}} -->
            </el-form-item>
            <el-col :span="22">
              <ul align="left" class="riwjn_we">
                <li class="usernanmestlt"><i style="color:#f56c6c;position:relative;right:4px;">*</i>参会人员：</li>
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
                  <el-button type="primary" @click="optPrinFn(1)" size="mini" :class="{'no-has-user': !usName.length}">选择人员</el-button>
                </li>
                <!-- <li style="padding-left:2px; ">
                  <el-button type="primary" @click="optPrinFn(1)" size="mini">选择人员</el-button>
                </li>-->
              </ul>
            </el-col>
            <el-col :span="22">
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
                  <el-button type="primary" @click="optPrinFn(2)" size="mini" :class="{'no-has-user': !appointObj.length}">选择人员</el-button>
                </li>
              </ul>
            </el-col>
            <el-form-item required label="会议主题：" style="margin-top:9px" label-width="140px">
              <el-input v-model="msgObj.name" placeholder="请输入会议主题" maxlength="50"></el-input>
            </el-form-item>

            <el-form-item required label="会议类型：">
              <!-- {{msgObj.typeName}} -->
              <el-select v-model="msgObj.typeName" placeholder="请选择会议类型">
                <el-option
                  v-for="item in selectStateList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议地点：" required>
              <el-input v-model="msgObj.meetingSite" placeholder="请输入会议地点" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item required label="会议时间：">
              <el-date-picker
                v-model="pro_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议开始时间"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
              <el-date-picker
                v-model="list_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="会议结束时间"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="提醒：">
              <!-- {{msgObj.remindType}} -->
              <el-select v-model="msgObj.remindType" placeholder="无提醒">
                <el-option
                  v-for="item in selectremind"
                  :key="item.key"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <el-select v-model="msgObj.pro_mode" v-if="!drg" multiple placeholder="请选择" class="warn-box">
                <el-option
                  :disabled="drg"
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
                maxlength="2000"
                style="width:450px;text-align: left;"
                resize="none"
              ></el-input>
            </el-form-item>
            <el-col :span="22">
              <ul align="left" class="riwjn_wec">
                <li class="usernanmestlt2">抄送人：</li>
                <li class="usernanmes">
                  <span
                    class="userbtn"
                    style="padding-left:6px;padding-right:20px;"
                    v-for="(item,index) in copyperson"
                    :key="index"
                  >
                    {{item.name}}
                    <button class="deletro delusebtn" @click="deletchao(index)"></button>
                  </span>
                  <el-button type="primary" @click="optPrinFn(7)" size="mini" :class="{'no-has-user': !copyperson.length}">抄送人员</el-button>
                </li>
              </ul>
            </el-col>
            <el-col :span="22">
              <el-form-item label="附件：" label-width="134px" style="line-height: 40px;" align="left">
<!--                <el-dropdown>-->
<!--                  <span class="el-dropdown-link" ref="echarType" style="color:#336CB4">-->
<!--                    <img style="width:15px;height:15px;" src="../../../assets/image/shanc.png" alt>-->
<!--                    添加附件-->
<!--                  </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                    <el-dropdown-item @click.native="uploadingFn">本地上传</el-dropdown-item>-->
<!--                    <el-dropdown-item @click.native="upreat(1)">项目文档选择</el-dropdown-item>-->
<!--                    <el-dropdown-item v-if="$utils.m('paper_manage')" @click.native="upreatdigao(1)">底稿选择</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--                </el-dropdown>-->

                <add-attachment ref="attachment"
                                :projectRequired="true"
                                :projectId="myvoteyproj"
                                @select="$utils.handleSelect(arguments,selectedFileList)"></add-attachment>

                <ul style="text-align: left;" class="fujllistul">
                    <li v-for="(item, index) in selectedFileList" class="attachemnt-list-item" :key="index">
                      <p class="attachemnt-list-doc">
                        <span class="doc-name" @click="$utils.handleUploadFilePreview(item, {projectId:myvoteyproj,sourceName:'新增会议',projectName:projectName})" :title="item.docName">{{item.docName}}</span>
                        <span>
                      <el-button class="mr-10" v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                      <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList,item)">删除</el-button>
                        </span>
                      </p>
                    </li>
                </ul>
              </el-form-item>
            </el-col>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="">
        <el-button @click="cancelAddMeeting">取 消</el-button>
        <el-button type="primary" @click="saveEditor">保存</el-button>
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
// 公用模块组件
import mymettingComment from "@/pages/front/maindesk/mymeeting/mymettingComment";
export default {
  name: "",
  data() {
    return {
      client: window.client, // 区分客户
      selectedFileList: [],
      token: "",
      userId: "",
      peruId: 1, //项目id

      projectId: "", //会议id
      user_num: "",
      usName: [], //添加参会人员
      userIds: [], //添加参会人员id集
      userIdsnew: [],
      appointObj: [], //列席联系人
      rankUserIds: [], //列会人员id集

      meetingIds: [], //删除会议id集合

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
        },
        // {
        //   id: "1",
        //   name: "邮件"
        // },
        // {
        //   id: "2",
        //   name: "短信"
        // }
      ],

      selectStateList: [],

      msgObj: {
        id: "",
        name: "",
        typeName: "",
        pro_job1: "",
        pro_job2: "",
        pro_mode:[],
        meetingSite: "",
        remindType: 0, //会议提醒
        remindVay: [], //提醒方式
        pro_remark: ""
      },
      pro_time: "",
      list_time: "",
      met_typeName: "",
      met_addre: "", //会议地址id
      remindType: "0", //提醒id
      dialogVisible: false, //新建
      //单个删除会议 数组中传入要删除的（id)
      met_ar: "",
      met_arname: "", //单个删除会议name
      mulid: [], //获取要删除的id的
      mulid_id: [], //获取要删除的id的
      success_code: "",
      //查看所属项目
      myvoteproj: [],
      myvoteyproj: "",
      projectName: "", //"项目名称"
      projectStage: "", // "项目阶段名称"
      stageId: "", // "项目阶段id"
      copyperson: [], //抄送人
      copypersons: [],
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
      loadAllMeet: "",
      loadAllProj: "",
      meetTypeId: "",
      meetProjectId: "",
      meetProjectIdnoic: "",
      newMyMeetingTimer: null,//草稿定时器
      queryDocProjectId: '',//项目id
    //   meetingDetaVisible: false,
    //   handleType: 1,//1详情按钮2编辑按钮
    //   handleMeeting: {}
    autoHeight:false //附件的高度自适应
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
    }
  },
components: {
    findallDeptuser,
    mymettingComment
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.$store.state.projectMsg.pro_id;
    this.projectMsg = this.$store.state.projectMsg.projectMsg;
    this.teyproj();
  },
  mounted() {
    //this.listTablse();
    this.$refs.mymettingchild.listTablse()
    this.success_code = this.code.codeNum.SUCCESS;
    this.meetTypeList();
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
    closeDialog(){
      this.$refs['attachment'] && this.$refs['attachment'].close()
      this.dialogVisible = false
    },
    handleDialogEdit(){
      this.$refs['attachmentEdit'] && this.$refs['attachmentEdit'].close()
      this.dialogVisible1 = false
    },
    getCursor(event) {
      // 判断是不是IE浏览器
      if (window.ActiveXObject || 'ActiveXObject' in window) {
    　　　　// 把光标移动input默认值的最后
        event.target.setSelectionRange(this.position.length, this.position.length)
      }
    },

    meetTypeList() {
      var dataObj = {
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/info/project/getMeetingConfigsCopy", dataObj)
        .then((response)=> {
          // console.log(response.data);
          if (response.code == that.code.codeNum.SUCCESS) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
              data[i].value = data[i].name;
            }
            that.loadAllMeet = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleSelectMeet(item) {
      // console.log(item);
      this.meetTypeId = item.id;
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString) != -1;
      };
    },
    //  查询条件-项目名称
    querySearchProj(queryString, cb) {
      this.meetProjectId = "";
      var restaurants = this.loadAllProj;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectProj(item) {
      console.log(item);
      this.meetProjectId = item;
    },
    //打开新增会
    new_Meet() {
      this.copyperson = [];
      this.copypersons = [];
      this.newMeet();
      this.dialogVisible = true;
      this.selectedFileList = [];
      this.myvoteyproj = "";
      this.usName = [];
      this.appointObj = [];
      this.userIds = []  //添加参会人员id集
      this.userIdsnew = []
      this.rankUserIds = [] //列会人员id集
      this.msgObj.pro_remark = "";
      this.msgObj.meetingSite = "";
      this.msgObj.name = "";
      this.msgObj.remindType = 0;
      this.msgObj.remindVay.splice(0)
      this.userIds.splice(0)
      this.pro_time = ""
      this.list_time = ""
      this.msgObj.typeName = ""
      this.findUserObj.splice(0)
      this.findUserObj1.splice(0)
      this.findUserObj2.splice(0)
      this.findUserObj7.splice(0)
      this.findUserObj3.splice(0)
      this.findUserObj4.splice(0)

      // 取出保存的草稿
      let draft = this.$utils.getDraft('myMeeting', false)
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
      this.newMyMeetingTimer = setInterval(()=>{
        this.handleDraftData();
      }, 5000)
    },
    handleDraftData(){
      let data = {
        name: this.msgObj.name,//会议主题
        meetingSite: this.msgObj.meetingSite,//会议地点
        pro_remark: this.msgObj.pro_remark // 新建时会议内容
      }
      this.$utils.saveDraft('myMeeting', data, false)
    },
    //查询所属项目
    teyproj() {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      var that = this;
      this.$post("info/project/getSimpleProjectList", dataObj)
        .then((response)=> {
          // console.log(response.data);
          this.myvoteproj = response.data

        })
        .catch(function(error) {
          console.log(error);
        });
    },
     stratinfo(){
      this.msgObj.pro_time1 = this.msgObj.pro_time1+':00'
    },
    endinfo(){
      this.msgObj.pro_time2 = this.msgObj.pro_time2+':00'
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
          if (response.code == 0) {
            _this.selectStateList = response.data.list;
          } else {
            _this.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deletx(v) {
      this.usName.splice(v, 1);
    },
    deletl(v) {
      console.log('deletl')
      this.appointObj.splice(v, 1);
    },
    //添加保存会议新增
    saveEditor() {
      var _this = this;
      this.met_typeName = this.msgObj.typeName;
      this.met_addre = this.msgObj.meetingSite;
      let projectData = this.myvoteproj.find(v=>v.id===this.myvoteyproj)
      if(!projectData) {
        this.$message.warning('请选择所属项目')
        return
      }
      this.projectName = projectData.name;
      this.projectStage = projectData.currentImplementStageName;
      this.stageId = projectData.currentImplementStageId;


      if(this.msgObj.remindType == 0 || this.msgObj.remindType == ""){
        this.msgObj.pro_mode = [];
      }
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
      this.usName.forEach(function(c) {
        if (c.userId) {
          _this.userIds.push(c.userId);
        }
      });
      this.appointObj.forEach(function(c) {
        if (c.userId) {
          _this.rankUserIds.push(c.userId);
        }
      });
      if (this.userIds.length === 0) {
        this.$message.error("参会人员不能为空");
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
      if (this.pro_time == "") {
        this.$message.error("会议开始时间不能为空");
        return;
      }
      if (this.list_time == "") {
        this.$message.error("会议结束时间不能为空");
        return;
      }
      var oDate1 = new Date(this.pro_time);
      var oDate2 = new Date(this.list_time);
      var myDate = new Date();
      if (oDate1.getTime() < myDate.getTime()) {
        this.$message.error("开始时间不能小于当前时间");
        return;
      }
      if (oDate1.getTime() > oDate2.getTime()) {
        this.$message.error("开始时间不能大于结束时间");
        return;
      }
      if (oDate1.getTime() == oDate2.getTime()) {
        this.$message.error("开始时间不能等于结束时间");
        return;
      }
       if (oDate2.getTime() < this.$moment().add(1, "hours")) {
            this.$message.error("结束时间需大于当前时间1小时");
            return;
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
      if(this.msgObj.remindType !== 0 && this.msgObj.remindType !== ""){
          if(this.msgObj.pro_mode.length == 0){
            this.$message.error("请选择提醒方式");
            return;
          }
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
        private: true,
        data: {
          projectId: this.myvoteyproj,
          name: this.msgObj.name, // "会议主题",
          typeId: this.met_typeName,
          site: this.met_addre, // "会议地点（数据字典表code)",
          remindType: this.msgObj.remindType, //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
          remindVay: this.remindVayss, //"站内信,邮件,短信"
          projectName: this.projectName, //"项目名称"
          projectStage: this.projectStage, // "项目阶段名称"
          stageId: this.stageId, //"项目阶段id"
          startTime: this.pro_time+":00", //开始时间
          endTime: this.list_time+':00', //结束时间
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
          if (response.code == _this.code.codeNum.SUCCESS) {
              _this.$message.success("新增成功！");
            _this.dialogVisible = false;
            clearInterval(_this.newMyMeetingTimer);
            // 保存成功，清空草稿数据
            _this.$utils.removeDraft('myMeeting', false);
            //_this.listTablse();
            _this.$refs.mymettingchild.listTablse()
            (_this.myvoteyproj = ""),
            (_this.msgObj.name = ""), // "会议主题",
            (_this.msgObj.typeName = ""),
            (_this.msgObj.meetingSite = ""), // "会议地点（数据字典表code)",
            (_this.msgObj.remindType = 0), //提醒类型（0:不提醒/1:截止前15分钟/2截止前1小时/3:截止前3小时/4:截止前1天)"
            (_this.pro_time = ""), //开始时间
            (_this.list_time = ""), //结束时间
            (_this.userIds = []), //"参会人员id集合",
            (_this.rankUserIds = []); //"列会人员id集合"
            // _this.shagreatl = []; //"列会人员id集合"
            _this.msgObj.pro_remark = "";
            _this.usName = [];
            _this.appointObj = [];
          } else {
            _this.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelAddMeeting(){
      this.$refs['attachment'] && this.$refs['attachment'].close()
      this.handleDraftData();
      this.dialogVisible = false;
      clearInterval(this.newMyMeetingTimer);
      this.closeDialog()
    },

    // 查看附件
    seeFj(v, num, id, type, projectId,item) {
      if (num == 1) {
        this.$message({
          type: "warning",
          message: "该附件已被删除"
        });
        return
      }
        var proViewData = {
          projectId: projectId,
          rfsId: v,
          docId: id,
          photoType: type,
          docName: item.fileName
        }
        this.$store.commit('previewAllFn',proViewData)

    },
    changeProject(){
        this.shagreatlist = [];
        this.queryDocProjectId = this.myvoteyproj;
    },

    //下载附件
    dowanFs(num, item) {
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
      console.log(num, this.findUserObj3)
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (num == 1) {
        this.findUserObj = this.$utils.cloneDeepArray(this.usName)
      } else if (num == 2) {
        this.findUserObj = this.$utils.cloneDeepArray(this.appointObj)
      } else if (num == 7) {
        this.findUserObj = this.$utils.cloneDeepArray(this.copyperson)
      }
      this.findUserObj.forEach(v => {v.uniqueKey = 'user' + v.id})
    },
    //renyun
    findAllUser(data) {
      console.log(data, 22)
      this.findFlag = false
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
      //  返回的数据分为默认的和其他的选择的，
      let defaultArr = []
      let copyData = []
      data.forEach(v=> {
        if (v.originData || v.defaultUser == 1) {
          defaultArr.push(v)
        } else {
          copyData.push(v)
        }
      })
      console.log(defaultArr, copyData, 665455, this.user_num)
      if (this.user_num == 1) {
        this.usName = data
      } else if (this.user_num == 2) {
        this.appointObj = data
      } else if (this.user_num == 7) {
        this.copyperson = data
      }
    }
  },

  watch: {
    // list_time: function(vale) {
    //   var oDate1 = new Date(this.pro_time);
    //   var oDate2 = new Date(vale);
    //   if (oDate1.getTime() > oDate2.getTime()) {
    //     this.$message.error("开始时间不能大于结束时间");
    //   } else {
    //     // console.log("第二个大");
    //   }
    // },
    'selectedFileList':{
        handler(newName, oldName) {
            console.log(newName)
            if(newName.length>0){
                this.autoHeight = true;
            }
        },
        deep: true
    }
  },

};
</script>

<style scoped lang="scss" type="text/css">
.mymeeting {
  width: 99.7%;
  padding: 0px 0px;
  position: relative;
  background: #f0f2f5;
  overflow: hidden;
  .riheader {
    width: 100%;
    padding: 0 15px;
    height: 96px;
    padding: 0 8px;
    // padding-bottom: 5px;
    background: rgba(255, 255, 255, 1);
    .el-breadcrumb {
      line-height: 46px;
    }
    .finance_tit {
      position: relative;
      padding: 15px 5px;
      span {
        color: #333;
        // line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        position: absolute;
        left: 0px;
        bottom: 2px;
      }

      .el-button {
        padding-bottom: 10px;
        position: absolute;
        right: 33px;
        bottom: 4px;
        z-index: 10;
      }
    }
  }

  .form_box {
    background: #fff;
    padding-top: 20px;
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
      margin-left: 20px;
      margin-top: 2px;
    }
    .el-button.no-has-user{
      margin-left: 4px;
    }
  }
  .form_boxb {
    background: #fff;
    padding-top: 20px;
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
      margin-left: 20px;
      margin-top: 2px;
    }
  }
  .meet_content {
    width: 100%;
    margin: 14px auto;
    background-color: #ffffff;
    .el-pagination {
      margin-top: 10px;
      padding-right: 40px;
    }
  }
  .table_foot {
    margin-top: 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .tan_dialog {
    position: relative;

  }

  .dialog-footer {
    // position: absolute;
    right: 20px;
    bottom: 14px;
  }
  .cvote_button {
    margin-left: -6px;
  }
  .riwjn_we {
    margin-left: 58px;
    // margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
  }
  .riwjn_we li {
    margin-top: 6px;
    line-height: 30px;
  }
  .riwjn_wec {
    margin-left: 72px;
    // margin-top: 6px;
    display: flex;
    flex-wrap: nowrap;
  }
  .riwjn_wec li {
    margin-top: 6px;
    line-height: 30px;
  }

  .usernanmestlt {
    width: 16%;
  }
  .usernanmestlt2 {
    width: 13%;
  }
  .usernanmes {
    width: 84%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-height: 113px;
    overflow-y: auto;
  }
  .deleth {
    text-decoration: line-through;
  }
  // .el-table-column:hover {
  //   background: red;
  // }
  // .meetbutton:hover {
  //   background: #1a5fa4;
  //   color: #ffffff;
  // }
  // .handbutton:hover {
  //   background: #dd5353;
  //   color: #ffffff;
  // }
  .table_box {
    padding-bottom: 16px;
  }

  .content_x {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .deletro {
    width: 15px;
    height: 15px;
    background: url("../../../../assets/image/sanc.png") no-repeat;
    background-size: 100% 100%;
  }
  .fujllistul {
    width: 400px;
    overflow-y: auto;
    max-height: 113px;
  }
  .fujlliltitle {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .userbtn {
    position: relative;
  }
  .delusebtn {
    position: absolute;
    right: 0px;
    top: 0px;
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
  .file-name {
    float:left;
    display:inline-block;
    width:80%;
    cursor:pointer;
    white-space: nowrap;
    text-overflow : ellipsis;
    overflow:hidden;
  }
  .del-file{
   text-decoration: line-through;
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

.attachemnt-list-item .attachemnt-progress{
  width: 200px;
}

</style>
<style>
.tan_dialog .el-form-item .overFlowScroll .el-form-item__content{
      overflow-y:auto;
      max-height:113px;
  }
.editMetting .el-form-item .el-form-item__content, .editMetting .riwjn_we{
      overflow-y:auto;
      max-height:113px;
  }

.mymeeting .el-table__row {
  height: 56px;
}
.mymeeting .el-dialog__body {
  padding: 14px 20px 20px 30px;
  color: #606266;
  font-size: 14px;
}
.mymeeting.el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e8e8e8;
}
.mymeeting .form_box .el-button[data-v-08f9443e] {
  float: left;
  margin-left: 5px;
  margin-top: 2px;
}
.warn-box .el-input--suffix .el-input__inner{
  padding:0;
  padding-left:4px;
}
.autoHeight{
    height:550px;
}
</style>


