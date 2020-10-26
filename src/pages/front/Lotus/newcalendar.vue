<template>
  <div class="calendarparents">
    <div class="calendarvue">
      <el-dialog
        title="新建日程"
        :visible.sync="isAdd"
        width="660px"
        class="addcander"
        :close-on-click-modal="false"
      >
        <span>
          <el-form ref="form" :model="form" label-width="80px">
            <el-input
              v-model="form.name"
              style="width:100%;margin-bottom:18px;"
              type="textarea"
              resize="none"
              placeholder="请输入日程名称"
              maxlength="200"
            ></el-input>
            <el-form-item label="所属项目" :rules="[{required:true}]">
              <el-col :span="24">
                <select-lazy 
                    v-model="form['progress']" 
                    filterable 
                    placeholder="请选择" 
                    @change="handleSelectedit" 
                    :list='orijectOptions'></select-lazy>               
                <!-- <el-select
                  v-model="form.progress"
                  placeholder="请选择"
                  filterable
                  @change="handleSelectedit"
                  style="z-inidex:-1;width:88%;"
                >
                  <el-option
                    v-for="item in orijectOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option> -->
                <!-- </el-select> -->
              </el-col>
            </el-form-item>
            <el-form-item label="人员" :rules="[{required:true}]">
              <el-col :span="24">
                <el-input
                  v-model="form.principal"
                  class="fl"
                  placeholder="请选择人员"
                  disabled="disabled"
                  :principalCust="principalCust"
                ></el-input>
                <el-button type="primary" size="small" @click="optUser" class="fl">选择人员</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="时间" :rules="[{required:true}]">
              <el-col :span="11">
                <el-date-picker
                  @focus="$utils.handleTimeFocus"
                  type="datetime"
                  placeholder="开始日期"
                  v-model="form.date1"
                  style="width:94%;"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                ></el-date-picker>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                  @focus="$utils.handleTimeFocus"
                  type="datetime"
                  placeholder="结束日期"
                  v-model="form.date2"
                  style="width: 94%;"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  default-time="23:59:59"
                ></el-date-picker>
              </el-col>
              <el-col :span="2">
                <el-checkbox v-model="checked" @change="changeCheckbos" style="margin-left:-7px;">全天</el-checkbox>
              </el-col>
            </el-form-item>
            <el-form-item label="提醒" :rules="[{required:true}]">
              <el-col :span="11">
                <el-select v-model="form.region" placeholder="请选择" style="width:232px;">
                  <el-option
                    v-for="item in regionData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="11" style="margin-left:-2px;">
                <el-select
                  v-model="letter"
                  multiple
                  placeholder="站内信"
                  v-if="!drg"
                  style="width:235px;"
                >
                  <el-option
                    v-for="item in letterData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="重复" :rules="[{required:true}]">
              <el-col :span="12">
                <el-select v-model="form.repeat" placeholder="请选择" style="width:89%">
                  <el-option
                    v-for="item in repeatData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="内容" :rules="[{required:true}]">
              <el-col :span="12">
                <el-input
                  type="textarea"
                  resize="none"
                  style="width: 511px;"
                  v-model="form.desc"
                  maxlength="500"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="抄送人">
              <el-col style="width: 100%;text-align: left;" :span="12">
                <el-tag
                  v-for="(item,index) in defaultcopy"
                  :key="'info2-'+index"
                  class="userbtn"
                >{{item.name}}</el-tag>
                <el-tag
                  v-for="(item,index) in deployObjcopy"
                  :key="index"
                  class="userbtn"
                  @close="handle_Close(index,0)"
                  :closable="!chack_bule"
                >{{item.name}}</el-tag>
                <span v-if="deployObjcopy.length>0">&nbsp;&nbsp;</span>
                <el-button type="text" class="color-primary" @click="optUserserch">
                  <i class="iconfont webicon308"></i>
                  <span>添加抄送人</span>
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col style="text-align: left;" :span="12">
                <span class="el-upload__tip" style="color:#f56c6c">默认通过站内信通知发送给对方，点击x删除</span>
              </el-col>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="closemediumDialog">取 消</el-button>
          <el-button size="medium" type="primary" @click="addSchedule">确 定</el-button>
        </span>
      </el-dialog>

      <frame-work v-if="flag" :peodatas="peodatas" v-on:statesbox="statesboxs"></frame-work>
      <fintall-deptuser
        :findFlagShow.sync="findFlag"
        :findUserObj="findUserObj"
        v-on:findAllUser="findAllUser"
        :findState="findState"
        :checkState="checkState"
      ></fintall-deptuser>
      <fintall-deptuserserch
        :findFlagShow.sync="findFlagserch"
        v-on:findAllUser="findAllUserserch"
        :findUserObj="findUserObjSearch "
        :findState="findStateserch"
        :checkState="checkStateserch"
      ></fintall-deptuserserch>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
import frameWork from "@/components/select_box/frameworkpeo";
import fintallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
import fintallDeptuserserch from "@/components/select_box/findAllDeptUserMultipleNew";
import choseDeptuser from "@/components/select_box/choseDeptuser2"; //选择除了自己以外的部门
export default {
  props: ["calend", "calendardata","beforeUrl"],
  data() {
    return {
      copyUserId: "", // 抄送人员（插叙条件）
      selectDate2: "",
      tabValue: "my",
      setedId: [], //已设置抄送的人员id集合
      deployObj: [], //全员组织架构的人
      deployObjcopy: [], //添加抄送人员

      deployObjcopymoren: [], //默认的抄送人员

      alldecopyme: [], //传值的默认值
      editalldecopyme: [], //修改的到时候的默认值
      ccObj: [],
      defaultcopy: [],
      editdefaultCopy: [], //编辑的时候的默认回显去重
      editccCopy: [], //编辑的时候添加的抄送人的去重

      formeditdefaultcopy: [],
      selectedOptions: [],
      searchcal: false,
      remindstyle: false,
      remindstyleedit: false,
      findFlag: false,
      chosefindFlag: false,
      findState: {},
      chosefindState: {},
      checkState: {},
      chosecheckState: {},

      findFlagserch: false,
      findStateserch: {},
      checkStateserch: {},
      disabledsedit: false,
      //添加人员
      flag: false,
      peodatas: "",
      isAdd: false, //新增日程弹框
      isedit: false, //编辑日程弹框
      isdetail: false, //日程详情
      checked: false,
      allifshow: true,
      selectDate: "", //日期选择器选中的月份
      events: [],
      eventscctome: [], //抄送给我的日程
      eventsId: "", // 日程的id
      calendarEvents: "", //点击单个日程的事件
      newItem: {},
      editItem: {},
      form: {
        name: "",
        progress: "",
        principal: "",
        date1: "",
        date2: "",
        region: 0,
        repeat: "",
        desc: "",
        copyme: "",
        userIds: [] //抄送人员id集合
      },
      projectData: [],
      regionData: [
        {
          value: 0,
          label: "不提醒"
        },
        {
          value: 1,
          label: "提前15分钟"
        },
        {
          value: 2,
          label: "提前1小时"
        },
        {
          value: 3,
          label: "提前3小时"
        },
        {
          value: 4,
          label: "提前1天"
        }
      ],
      letterData: [
        {
          value: 0,
          label: "站内信"
        }
      ],
      repeatData: [
        {
          value: 1,
          label: "不重复"
        },
        {
          value: 2,
          label: "每天"
        },
        {
          value: 3,
          label: "每周"
        },
        {
          value: 4,
          label: "每年"
        },
        {
          value: 5,
          label: "工作日"
        }
      ],
      currentdate: [],
      curenttoday: [], //获取当前系统日期的00：00：00
      currentendtoday: [], //获取当前系统日期的23：59：00
      //第一天的日期
      firstData: "",
      //最后一天的日期
      lastdate: "",
      token: "",
      userId: "",
      success_code: "",
      customer: "",
      principalCust: "",
      persoArray: [],
      canderArray: [],
      letter: [],
      chosePerson: "",
      eventcancel: "",
      evecleartype: [],

      aaabb: [],
      choseselect: true,

      firstDate: "",
      lastDates: "",
      firstDate2: "",
      lastDates2: "",
      //点击日期获取点击的日期
      clicktimedates: "",

      // 全天的日期
      currentstarttime: "",
      currentendtime: "",
      index: 0,
      isChanges: "",
      // 查询的开始日期和结束日期
      liststarttime: "",
      listendtime: "",
      dateType: "month",
      dateType2: "month",
      orijectOptions: [],
      proname: "",
      copyOptions: [],
      userIdsnew: [], //抄送人员的id集合
      projectids: "",
      projectnames: "",
      alldaymowei: "",
      newProjectDialogTimer: null,
      chack_bule: false,
      findUserObj: [],
      findUserObjSearch: [],
    };
  },
  computed: {
    // 监听提醒
    drg: function() {
      var srr = false;
      if (this.form.region > 0) {
        srr = false;
        this.letter = [0];
      } else {
        srr = true;
        this.letter = [];
      }
      return srr;
    }
  },
  components: {
    frameWork,
    fintallDeptuser,
    choseDeptuser,
    fintallDeptuserserch
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.getProjectList()
  },
  watch: {
    calend: function(val) {
      this.isAdd = val;
    },
    isAdd: function(val) {
      this.$emit("calende", { s: val });
      this.form.name = "";
      this.form.projectId = '';
      this.projectids = "";
      this.proname = "";
      this.persoArray = [];
      this.form.date1 = "";
      this.form.date2 = "";
      this.checked = false;
      this.form.region = 0;
      this.letter = [];
      this.form.repeat = "";
      this.alldecopyme = [];
      this.form.progress = "";
      this.form.principal = "";
      this.form.desc = "";
      this.defaultcopy = [];
      this.deployObjcopy = [];
      this.index = 0;
    },
    calendardata: {
      deep: true, //深度监听设置为 true
      handler: function(val) {
        setTimeout(() => {
          this.index++;
          if (this.index == 1) {
            this.deployObj = this.calendardata.u;
            this.findAllUser(this.calendardata.u);
            this.getcl();
            this.getNowFormatDate();
            console.log(this.calendardata);
          }
        }, 200);
      }
    }
  },
  mounted() {
      this.getPromptType();
  },
  methods: {
    getProjectList(){
      this.$post("/info/project/getSimpleProjectList").then(response => {
        this.orijectOptions = response.data;
        this.form.progress = this.calendardata.p.n;
        this.proname = this.calendardata.p.n;
        this.projectids = this.calendardata.p.p;
      });

    },
           // 日程获取提醒方式
    getPromptType() {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
              console.log(res.data.email)
              if(res.data.email == 1){
                  this.letterData.push(
                    {
                        value:1,
                        label:'邮件'
                    },
                  )
              }
              if(res.data.sms == 1){
                  this.letterData.push(
                    {
                        value:2,
                        label:'短信'
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
    getcl() {
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      this.$post("/sys/schedule/queryScheduleUser", datas)
        .then(response => {
          if (response.code == 0) {
            response.data.forEach(item => {
              this.$set(item, "originData", true);
              this.$set(item, "uniqueKey", "user" + item.userId);
            });
            var person= response.data.concat(this.calendardata.c)
            let obj = {};
            let peon = person.reduce((cur, next) => {
              obj[next.userId] ? "" : (obj[next.userId] = true && cur.push(next));
              return cur;
            }, []);
            this.findAllUserserch(peon)
            return
          }
          this.$message.error(response.msg);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取项目信息
    getNowFormatDate() {
        this.form.progress = this.calendardata.p.n;
        this.proname = this.calendardata.p.n;
        this.projectids = this.calendardata.p.p;
    },
    // 选择用户
    optUser(num) {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      this.findUserObj = this.$utils.cloneDeepArray(this.deployObj);
    },
    //全局组织架构的选择人员  选择用户回调
    findAllUser(data) {
      console.log(data);
      if (!data || !data.length) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.form.principal = "";
        this.deployObj = [];
        return;
      }
      this.deployObj = data;
      this.persoArray = [];
      var string = "";
      for (var i = 0; i < this.deployObj.length; i++) {
        var objname = {};
        objname.name = this.deployObj[i].name;
        this.canderArray.push(objname);
        this.persoArray.push(this.deployObj[i].userId);
        string = string + data[i].name + "、";
      }
      this.form.principal = string;
      this.findFlag = false;
      this.findState = {};
      this.checkState = {};
      this.findUserObj = this.deployObj;
    },
    // 选择抄送人
    optUserserch() {
      this.findFlagserch = true;
      this.findStateserch = { state: 0 };
      this.checkStateserch = { state: 2 };
      let copyData = this.defaultcopy.concat(this.deployObjcopy);
      copyData.forEach(v => {
        v.label = v.name;
        v.uniqueKey = "user" + v.userId;
      });
      this.findUserObjSearch = copyData;
    },
    //抄送人的选择人员
    findAllUserserch(data) {
      console.log(data, 222);
      if (!data || !data.length) {
        this.findFlagserch = false;
        this.findStateserch = {};
        this.checkStateserch = {};

        this.deployObjcopy = [];
        return;
      }
      //  返回的数据分为默认的和其他的选择的，
      let defaultArr = [];
      let copyData = [];
      data.forEach(v => {
        if (v.originData || v.defaultUser == 1) {
          defaultArr.push(v);
        } else {
          copyData.push(v);
        }
      });
      this.defaultcopy = defaultArr;
      this.deployObjcopy = copyData;
      this.deployObjcopy = Array.from(new Set(this.deployObjcopy));
      this.findFlagserch = false;
      this.findStateserch = {};
      this.checkStateserch = {};
      var chgArr = [];
      for (var i = 0; i < this.deployObjcopy.length; i++) {
        var flag = true;
        for (var j = 0; j < chgArr.length; j++) {
          if (this.deployObjcopy[i].userId == chgArr[j].userId) {
            flag = false;
          }
        }
        if (flag) {
          chgArr.push(this.deployObjcopy[i]);
        }
      }
      this.deployObjcopy = chgArr;
      this.findUserObjSearch = this.defaultcopy.concat(this.deployObjcopy);
    },
    //删除抄送人
    handle_Close(num, ind) {
      if (ind == 0) {
        this.deployObjcopy.splice(num, 1);
        this.ccObj.splice(num, 1);
        this.editccCopy.splice(num, 1);
      } else {
        this.ccObj.splice(num, 1);
      }
    },
    // 点击全天的时间
    changeCheckbos() {
      if (this.checked == true) {
        this.form.date1 = this.$moment(new Date()).format("YYYY-MM-DD 00:00");
        this.form.date2 = this.$moment(new Date()).format("YYYY-MM-DD 23:59");
      } else {
        this.form.date1 = "";
        this.form.date2 = "";
      }
    },
    // 关闭弹窗
    closemediumDialog() {
      this.isAdd = false;
    },
    handleSelectedit(val) {
      let projectData = this.orijectOptions.find(v=>v.id===val)
      if(!projectData) return
      this.projectids = projectData.id;
      this.proname = projectData.name;
      this.form.progress = projectData.name
    },
    // 新增的方法
    addSchedule() {
      var _this = this;
      if (this.form.name == "") {
        this.$message.error("日程名称内容不能为空");
        return;
      }
      if (this.form.progress == "") {
        this.$message.error("所属项目不能为空");
        return;
      }
      if (this.form.principal == "") {
        this.$message.error("人员不能为空");
        return;
      }
      if (this.form.date1 == "" || this.form.date1 == null) {
        this.$message.error("开始日期不能为空");
        return;
      }
      if (this.form.date2 == "" || this.form.date2 == null) {
        this.$message.error("结束日期不能为空");
        return;
      }
      if (new Date(this.form.date2) < new Date(this.form.date1)) {
        this.$message.error("结束日期不能大于开始日期");
        return;
      }
      if (this.form.repeat == "") {
        this.$message.error("日期重复方式不能为空");
        return;
      }
      if (this.form.desc == "") {
        this.$message.error("日程内容不能为空");
        return;
      }
      var decopyarr = [];
      this.defaultcopy.forEach(function(c) {
        if (c.userId) {
          _this.form.userIds.push(c.userId);
        }
        var a = {
          userId: c.userId,
          defaultUser: 1
        };
        decopyarr.push(a);
      });
      var decopyme = [];
      this.deployObjcopy.forEach(function(c) {
        if (c.userId) {
          _this.form.userIds.push(c.userId);
        }
        var a = {
          userId: c.userId,
          defaultUser: 0
        };
        decopyme.push(a);
      });
      this.alldecopyme = decopyarr.concat(decopyme);
      var regioms = this.form.region;
      if (regioms == "不提醒") {
        this.form.region = 0;
      } else if (regioms == "开始前15分钟") {
        this.form.region = 1;
      } else if (regioms == "开始前1小时") {
        this.form.region = 2;
      } else if (regioms == "开始前3小时") {
        this.form.region = 3;
      } else if (regioms == "开始前1天") {
        this.form.region = 4;
      }
      var repeats = this.form.repeat;
      if (repeats == "不重复") {
        this.form.repeat = 1;
      } else if (repeats == "每天") {
        this.form.repeat = 2;
      } else if (repeats == "每周") {
        this.form.repeat = 3;
      } else if (repeats == "每年") {
        this.form.repeat = 4;
      } else if (repeats == "工作日") {
        this.form.repeat = 5;
      }
      // 是否全天
      var checkboxs = this.checked;
      if (checkboxs == true) {
        this.checked = 1;
      } else {
        this.checked = 0;
      }
      var endtime = this.form.date2;
      var shifenmiao = this.$moment(endtime).format("HH:mm:ss");
      if (shifenmiao == "00:00:00") {
        var opo = this.$moment(this.form.date2)
          .subtract(1, "days")
          .format("YYYY-MM-DD 23:59:59");
        this.form.date2 = opo;
      } else {
      }
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.form.name,
          projectId: this.projectids,
          projectName: this.proname,
          personnel: this.persoArray.join(","), // 选择人员
          startDate: this.form.date1 + ":00",
          endDate: this.form.date2 + ":00",
          isDay: this.checked, //是否全天
          remindType: this.form.region,
          sendType: this.letter.join(","), //提醒方式
          repeatType: this.form.repeat,
          content: this.form.desc,
          scheduleUserlist: this.alldecopyme //  默认和自己添加的抄送人
        }
      };
      this.$post("/sys/schedule/add_schedule", data)
        .then(response => {
          if (response.code == this.success_code) {
            this.isAdd = false;
            this.$message({
              message: "新增成功",
              type: "success"
            });
            console.log()
            if(this.$route.path == '/Filepage'){
              if(this.beforeUrl == '/Searchpage'){
                  this.$router.push(this.$route.query.path)
                }else{
                  this.$router.go(-1) 
              }
            }
          } else {
            this.$message(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.calendarparents .calendarvue .container .box-card .fc-event,
.fc-event-dot {
  background-color: #e6f7ff !important;
  color: #002666;
  border: #e6f7ff !important;
}
.calendarparents .calendarvue .container .el-card {
  border: 0px;
}
.calendarparents .calendarvue .el-dialog__header {
  border-bottom: 1px solid #ddd;
}
.calendarparents .calendarvue .el-dialog__footer {
  margin-top: -30px;
}
.calendarparents .calendarvue .fc-event {
  background-color: #e6f7ff !important;
  color: #002666 !important;
  border: #e6f7ff !important;
}
.fc-unthemed td.fc-today {
  background-color: #f6fbff;
}
/* .fc-state-default{
      background-color:#fff;
  } */
.calendarparents .calendarvue .el-textarea .el-textarea__inner {
  resize: none;
}
.calendarparents .calendarvue .fc-toolbar h2 {
  display: inline;
  font-size: 100%;
}

.calendarparents .calendarvue .el-card__header {
  border-bottom: 1px solid #fff;
}
.calendarparents .calendarvue .fc-state-default {
  background-color: #fff;
}
.calendarparents .calendarvue #calendar {
  margin-top: -33px;
}

.calendarparents .calendarvue .fc-view-container {
  margin-top: 0px;
}
.calendarparents .calendarvue .container .fc-toolbar.fc-header-toolbar {
  margin-bottom: 10px;
}

.calendarparents .calendarvue .container .fc-state-default {
  border: 1px solid #fff;
  background-image: linear-gradient(to bottom, #fff, #fff);
  -webkit-box-shadow: 0 0px 0 rgba(255, 255, 255, 0.2),
    0 0px 0px rgba(0, 0, 0, 0);
  box-shadow: 0 0px 0 rgba(255, 255, 255, 0.2), 0 0px 0px rgba(0, 0, 0, 0);
  /* background-color: #0061a9!important;
    border:1px solid #eee!important; */
}
.calendarparents .calendarvue .fc-state-default {
  border: 1px solid #fff;
  /* background-image:linear-gradient(to bottom, #ffffff, #fff);
    -webkit-box-shadow: 0 0px 0 rgba(255, 255, 255, 0.2), 0 0px 0px rgba(0, 0, 0, 0);
    box-shadow: 0 0px 0 rgba(255, 255, 255, 0.2), 0 0px 0px rgba(0, 0, 0, 0)  */
}

.calendarparents .calendarvue .el-col-12 {
  width: 100%;
}

.calendarparents .calendarvue .fc-toolbar .fc-center {
  margin-left: 100px;
}

.calendarparents
  .calendarvue
  .container
  .box-card
  .fc-event-container
  .fc-day-grid-event
  .fc-content {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendarparents
  .calendarvue
  .container
  .box-card
  .fc-more-popover
  .fc-widget-content
  .fc-event-container
  .fc-day-grid-event
  .fc-content {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style lang="scss" scoped>
.calendarparents .calendarvue .el-form {
  text-align: left;
}

.calendarparents .calendarvue .maindeskindex_contenti_headers {
  padding: 0 20px;
  padding-left: 10px;
  margin: auto;
  height: 90px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;

  .headers_break {
    height: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 13px;
  }

  .headers_clearFix {
    height: 40px;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 7px;
    margin-bottom: 10px;

    .headers_clearFix_title {
      font-size: 20px;
      line-height: 40px;
      color: #333;
    }
  }
  .el-checkbox:last-child {
    text-align: left;
  }
}

.calendarparents .calendarvue .container {
  margin-top: 14px;
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
    .el-textarea {
      width: 445px;
    }
    .el-dialog__body label {
      text-align: left;
    }
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

.calendarparents .calendarvue .red {
  background: red;
}
.calendarparents .calendarvue .blue {
  background: blue;
}
.calendarparents .calendarvue .addcander .el-input {
  width: 317px;
}
.calendarparents .calendarvue .addcander .el-textarea {
  width: 100%;
}
.calendarparents .calendarvue .addcander .el-button {
  height: 40px;
}
.calendarparents .calendarvue .addcander .userbtn {
  margin-right: 10px;
  margin-bottom: 10px;
}

.calendarparents .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
}

.calendarparents .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px;
}
</style>