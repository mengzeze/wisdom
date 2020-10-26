<template>
  <div class="calendarparents">
    <div class="calendarvue">
      <div class="maindeskindex_contenti_headers"
           v-show="Toexamine">
        <el-breadcrumb separator="/"
                       style="margin-top:20px;">
          <el-breadcrumb-item :to="{path:'/maindeskindex'}">主工作台</el-breadcrumb-item>
          <el-breadcrumb-item>日历表</el-breadcrumb-item>
        </el-breadcrumb>
        <h3 class="headers_clearFix"
            style="position: relative;">
          <span class="headers_clearFix_title">日历表</span>
          <el-button v-if="$utils.checkSystemPermission('schedule_config')"
                     style="position: absolute;top: -6px;right: 6px;"
                     type="primary"
                     icon="el-icon-setting"
                     class="fr"
                     @click="choseoptUser">日程抄送设置</el-button>
        </h3>
      </div>
      <div class="container"
           v-show="Toexamine">
        <el-tabs v-model="tabValue"
                 type="border-card"
                 @tab-click="tabClick">
          <el-tab-pane name="my"
                       label="我的日程">
            <el-card class="box-card">
              <el-date-picker size='small'
                              v-model="selectDate"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                              :clearable="false"
                              @focus="$utils.handleTimeFocus">
              </el-date-picker>
              <el-button size='small'
                         @click='changeDate'
                         style="margin-top:-2px;">确定</el-button>
              <full-calendar :config="config"
                             :events="events"
                             ref="calendar"
                             @event-selected='eventClick'
                             @day-click="dayClick"
                             id='mycancalder'>
              </full-calendar>
            </el-card>
          </el-tab-pane>
          <el-tab-pane name="copy"
                       label="抄送我的">
            <el-card class="box-card">
              <el-date-picker @focus="$utils.handleTimeFocus"
                              size='small'
                              v-model="selectDate2"
                              :clearable="false"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-button size='small'
                         @click='changeDate'
                         style="margin-top:-2px;">确定</el-button>
              <el-select v-model="form.copyme"
                         placeholder="请选择抄送人"
                         filterable
                         clearable
                         size='small'
                         @change="handleSelectChange">
                <el-option v-for="item in copyOptions"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
              <full-calendar :config="configccme"
                             :events="eventscctome"
                             @event-selected='eventClickccme'
                             ref="calendar2"
                             id="ccgivemecalendar">
              </full-calendar>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog title="新建日程"
                 :visible.sync="isAdd"
                 width="660px"
                 class="addcander"
                 :close-on-click-modal="false"
                 :before-close="handleClose">
        <span>
          <el-form ref="form"
                   :model="form"
                   label-width="80px">
            <!-- <el-form-item label="" :rules="[{required:true}]"> -->
            <!-- <el-input v-model="form.name" style="width:400px;"></el-input> -->
            <el-input v-model="form.name"
                      style="width:100%;margin-bottom:18px;"
                      type="textarea"
                      placeholder="请输入日程名称"
                      maxlength="200"></el-input>
            <!-- </el-form-item> -->
            <el-form-item label="所属项目"
                          :rules="[{required:true}]">
              <el-col :span="24">
                <select-lazy
                    v-model="form['projectId']"
                    filterable
                    placeholder="请选择"
                    @change="handleSelect"
                    :list='orijectOptions'></select-lazy>
                <!-- <el-select v-model="form.progress"
                           placeholder="请选择"
                           filterable
                           @change="handleSelect"
                           style="z-inidex:-1;width:88%;">
                  <el-option v-for="item in orijectOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select> -->

                <!-- <el-autocomplete
                          v-model="form.progress"
                          :fetch-suggestions="querySearchAsync"
                          @select="handleSelect"
                          placeholder="请选择项目名称" style="width:88%" :editable="false">
                      </el-autocomplete> -->
              </el-col>
            </el-form-item>
            <el-form-item label="人员"
                          :rules="[{required:true}]">
              <!-- <img src="../../../assets/image/addtask.png" style="width:24px;height:24px;"> -->
              <!-- <span>待添加</span> -->
              <el-col :span="24">
                <el-input v-model="form.principal"
                          class="fl"
                          placeholder="请选择人员"
                          disabled="disabled"
                          :principalCust="principalCust"></el-input>
                <el-button type="primary"
                           size="small"
                           @click="optUser(1)"
                           class="fl">选择人员</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="时间"
                          :rules="[{required:true}]">
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="开始日期"
                                v-model="form.date1"
                                style="width:94%;"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"></el-date-picker>
              </el-col>
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="结束日期"
                                v-model="form.date2"
                                style="width: 94%;"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                default-time="23:59:59"></el-date-picker>
              </el-col>
              <el-col :span="2">
                <el-checkbox v-model="checked"
                             @change="changeCheckbos"
                             style="margin-left:-7px;">全天</el-checkbox>
              </el-col>

            </el-form-item>
            <el-form-item label="提醒"
                          :rules="[{required:true}]">
              <el-col :span="11">
                <el-select v-model="form.region"
                           placeholder="请选择"
                           style="width:232px;">
                  <el-option v-for="item in regionData"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11"
                      style="margin-left:-2px;">
                <el-select v-model="letter"
                           multiple
                           placeholder="站内信"
                           v-if="!drg"
                           style="width:235px;">
                  <el-option v-for="item in letterData"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="重复"
                          :rules="[{required:true}]">
              <el-col :span="12" style="overflow-y:hidden;">
                <el-select v-model="form.repeat"
                           placeholder="请选择"
                           style="width:89%">
                  <el-option v-for="item in repeatData"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="内容"
                          :rules="[{required:true}]">
              <el-col :span="12">
                <el-input type="textarea"
                          style="width:89%;"
                          v-model="form.desc"
                          maxlength="500"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="抄送人">
              <el-col :span="12">
                <el-tag v-for="(item,index) in defaultcopy"
                        :key="'info2-'+index"
                        class="userbtn">
                  {{item.name}}
                </el-tag>
                <el-tag v-for="(item,index) in deployObjcopy"
                        :key="index"
                        class="userbtn"
                        @close="handle_Close(index)"
                        :closable="!chack_bule">
                  {{item.name}}
                </el-tag>
                <span v-if="deployObjcopy.length>0">&nbsp;&nbsp;</span>
                <el-button type="text"
                           class="color-primary"
                           @click="optUserserch(1)">
                  <i class="iconfont webicon308"></i><span>添加抄送人</span>
                  <!-- <span class="addimg" type="text"></span>&nbsp;<span style="position: relative;top: -4px;color:#0061A9;">
                                <img src="../../../assets/image/addtask.png" alt="" class="shekterAdd" style="width: 15px;height: 15px;position: relative;top: 2px;">
                                添加抄送人
                            </span> -->
                </el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="12">
                <span class="el-upload__tip"
                      style="color:#f56c6c">默认通过站内信通知发送给对方，点击x删除</span>
              </el-col>
            </el-form-item>

          </el-form>
        </span>
        <span slot="footer"
              class="dialog-footer">
          <el-button size="medium"
                     @click="closemediumDialog">取 消</el-button>
          <el-button size="medium"
                     type="primary"
                     @click="addSchedule">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 抄送我的日程的详情 -->
      <el-dialog title="抄送我的日程"
                 :close-on-click-modal="false"
                 :visible.sync="isdetailCc"
                 width="660px"
                 class="clearfix addcander">
        <span>
          <el-form ref="formedit"
                   :model="formedit"
                   label-width="80px">
            <el-form-item label="日程名称">
              <el-input v-model="formedit.name"
                        disabled
                        type="textarea"
                        style="width:94%"></el-input>
            </el-form-item>
            <el-form-item label="所属项目"
                          :rules="[{required:true}]">
              <el-col :span="24">
                <select-lazy
                    v-model="formedit['progress']"
                    disabled
                    placeholder="请选择"
                    :list='orijectOptions'></select-lazy>
                <!-- <el-select v-model="formedit.progress"
                           disabled
                           placeholder="请选择"
                           filterable
                           style="z-inidex:-1;width:94%;">
                  <el-option v-for="item in orijectOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"> -->
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="开始日期"
                                v-model="formedit.date1"
                                style="width:100%;"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                disabled></el-date-picker>
              </el-col>
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="结束日期"
                                v-model="formedit.date2"
                                style="width: 100%;margin-left:11px;"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                disabled></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea"
                        v-model="formedit.desc"
                        disabled
                        style="width:94%"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer"
              class="dialog-footer">
          <!--            <el-button disabled="disabled">编 辑</el-button>-->
          <!--            <el-button type="primary" disabled="disabled">删 除</el-button>-->
        </span>
      </el-dialog>

      <frame-work v-if="flag"
                  :peodatas='peodatas'
                  v-on:statesbox='statesboxs'></frame-work>
      <fintall-deptuser :findFlagShow.sync="findFlag"
                        :findUserObj="user_num == 1 ? findUserObj : findUserObj2"
                        v-on:findAllUser="findAllUser"
                        :findState="findState"
                        :checkState="checkState"></fintall-deptuser>
      <fintall-deptuserserch :findFlagShow.sync="findFlagserch"
                             v-on:findAllUser="findAllUserserch"
                             :findUserObj="userNums == 1 ? findUserObjSearch : findUserObjSearch1"
                             :findState="findStateserch"
                             :checkState="checkStateserch"></fintall-deptuserserch>
      <chose-deptuser v-if="chosefindFlag"
                      :seted="setedId"
                      @update-seted="handleUpdateSeted"
                      :chosefindState="chosefindState"
                      :chosecheckState="chosecheckState"></chose-deptuser>
      <my-schedule :visible.sync="isdetail"
                   :formedit="$utils.copyObj(this.myFormedit)"
                   :disabledsedit="disabledsedit"
                   :projectList="orijectOptions"
                   :scheduleIds="{id:this.eventsId,pro_id:this.dateClicks.projectId}"
                   @editCallback="myScheduleEdit"
                   @deletCallback="listcalendar"
                   @closeCallback="myScheduleClose">
      </my-schedule>
      <edit-schedule :visible.sync="isedit"
                     :formedit="formedit"
                     :projectList="orijectOptions"
                     :deployObj="editDefaultData"
                     :deplayFormObj="editFormUserData"
                     :dateClicks="dateClicks"
                     :scheduleIds="{id:this.eventsId,pro_id:this.dateClicks.projectId}"
                     @defineCallback="defineSchedule"
                     @cancelCallback="editCancel">
      </edit-schedule>
    </div>
  </div>
</template>

<script>

const moment = require("moment")
import { FullCalendar } from 'vue-full-calendar'
import 'vue-full-calendar/node_modules/fullcalendar/dist/fullcalendar.css'
import $ from 'jquery'
import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'
import fintallDeptuserserch from '@/components/select_box/findAllDeptUserMultipleNew'
import choseDeptuser from '@/components/select_box/choseDeptuser2'  //选择除了自己以外的部门
import mySchedule from '@/components/select_box/mySchedule'
import editSchedule from '@/components/select_box/editSchedule'
export default {
  props: ['calend'],
  data () {
    return {
      client: window.client,
      Toexamine: '',
      copyUserId: '', // 抄送人员（插叙条件）
      selectDate2: '',
      tabValue: 'my',
      setedId: [], //已设置抄送的人员id集合
      deployObj: [],//全员组织架构的人
      deployObjcopy: [], //添加抄送人员

      deployObjcopymoren: [],//默认的抄送人员

      alldecopyme: [],//传值的默认值
      editalldecopyme: [],  //修改的到时候的默认值
      ccObj: [],
      defaultcopy: [],
      editdefaultCopy: [], //编辑的时候的默认回显去重
      editccCopy: [],//编辑的时候添加的抄送人的去重

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
      peodatas: '',
      isAdd: false,//新增日程弹框
      isedit: false,//编辑日程弹框
      isdetail: false,//日程详情
      checked: false,
      allifshow: true,
      selectDate: '',//日期选择器选中的月份
      config: {
        firstDay: '1',//以周日为每周的第一天
        weekends: true,//是否在日历中显示周末
        locale: 'zh-cn',//语言
        defaultView: 'month',//默认按月显示
        height: 'auto',//高度
        fixedWeekCount: false,//是否固定显示六周
        weekMode: "liquid",//周数不定，每周的高度可变，整个日历高度不变
        // allDaySlot:this.allifshow, //是否显示全天
        allDayText: '全天',
        // allDayDefault:false,
        allDay: false,
        // slotEventOverlap:false,
        header: {//表头信息
          left: '',
          center: 'prev,title,next',
          right: 'month,agendaWeek'
        },
        editable: false,
        eventLimit: true,
        eventLimitText: '更多',
        views: {
          agenda: {
            eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
          }
        },
        eventClick: this.eventClick, //点击事件
      },
      configccme: {
        firstDay: '1',//以周日为每周的第一天
        weekends: true,//是否在日历中显示周末
        locale: 'zh-cn',//语言
        defaultView: 'month',//默认按月显示
        height: 'auto',//高度
        fixedWeekCount: false,//是否固定显示六周
        weekMode: "liquid",//周数不定，每周的高度可变，整个日历高度不变
        // allDaySlot:this.allifshow, //是否显示全天
        allDayText: '全天',
        // allDayDefault:false,
        allDay: false,
        // slotEventOverlap:false,
        header: {//表头信息
          left: '',
          center: 'prev,title,next',
          right: 'month,agendaWeek'
        },
        editable: false,
        eventLimit: true,
        eventLimitText: '更多',
        views: {
          agenda: {
            eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
          }
        },
        eventClick: this.eventClickccme
      },
      events: [],
      eventscctome: [],//抄送给我的日程
      eventsId: '', // 日程的id
      calendarEvents: '',//点击单个日程的事件
      newItem: {},
      editItem: {},
      form: {
        projectId: '',
        name: '',
        progress: '',
        principal: '',
        date1: '',
        date2: '',
        region: 0,
        repeat: '',
        desc: '',
        copyme: '',
        userIds: [], //抄送人员id集合
      },
      formedit: {
        projectId:'',
        name: '',
        progress: '',
        principal: '',
        date1: '',
        date2: '',
        region: '',
        repeat: '',
        desc: '',
        letter: [],
        userIds: [], //抄送人员id集合
      },
      projectData: [],
      regionData: [
        {
          value: 0,
          label: '不提醒'
        },
        {
          value: 1,
          label: '提前15分钟'
        },
        {
          value: 2,
          label: '提前1小时'
        },
        {
          value: 3,
          label: '提前3小时'
        },
        {
          value: 4,
          label: '提前1天'
        }
      ],
      letterData: [
        {
          value: 0,
          label: '站内信'
        },
        // {
        //     value:1,
        //     label:'邮件'
        // },
        // {
        //     value:2,
        //     label:'短信'
        // },
      ],
      repeatData: [
        {
          value: 1,
          label: '不重复'
        },
        {
          value: 2,
          label: '每天'
        },
        {
          value: 3,
          label: '每周'
        },
        {
          value: 4,
          label: '每年'
        },
        {
          value: 5,
          label: '工作日'
        }
      ],
      currentdate: [],
      curenttoday: [], //获取当前系统日期的00：00：00
      currentendtoday: [],  //获取当前系统日期的23：59：00
      //第一天的日期
      firstData: '',
      //最后一天的日期
      lastdate: '',
      token: '',
      userId: '',
      success_code: '',
      customer: '',
      principalCust: '',

      canderArray: [],
      letter: [],


      evecleartype: [],

      aaabb: [],
      choseselect: true,

      firstDate: '',
      lastDates: '',
      firstDate2: '',
      lastDates2: '',
      //点击日期获取点击的日期
      clicktimedates: '',

      // 全天的日期
      currentstarttime: '',
      currentendtime: '',

      isChanges: '',

      i: 1,

      //点击日程头部显示月份
      titlefrist: '',
      titleends: '',


      // 查询的开始日期和结束日期
      liststarttime: '',
      listendtime: '',
      dateType: 'month',
      dateType2: 'month',
      orijectOptions: [],


      copyOptions: [],
      userIdsnew: [],//抄送人员的id集合
      // moren:false,
      projectids: '',
      projectnames: '',
      alldaymowei: '',
      newProjectDialogTimer: null,
      chack_bule: false,
      isdetailCc: false,
      findUserObj: [],
      findUserObj2: [],
      findUserObjSearch: [],
      findUserObjSearch1: [],
      userNums: '',
      user_num: '',
      editDefaultData: [], // 编辑中抄送人的数据
      editFormUserData: [], // 编辑中人员的数据
      dateClicks: {},
      myFormedit: {}

      // chosedeployObj:
    };
  },
  computed: {
    drg: function () {
      var srr = false;
      if (this.form.region > 0) {
        //console.log(this.form.region)
        srr = false;
        this.letter = [0]
        //this.remindstyle = true;
      } else {
        srr = true;
        this.letter = []

      }
      return srr;
    },

    drgedit: function () {
      var srr = false;
      if (this.formedit.region > 0) {
        //console.log(this.formedit.region)
        srr = false;
        this.remindstyleedit = true;
      } else {
        srr = true;
        this.formedit.letter = []

      }
      return srr;
    },
  },
  components: {
    //  'full-calendar': require('vue-fullcalendar')
    FullCalendar,
    frameWork,
    fintallDeptuser,
    choseDeptuser,
    fintallDeptuserserch,
    mySchedule,
    editSchedule
  },
  created () {
    this.Toexamine = this.$route.path == '/calendar' ? true : false
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.copyMefiltrate();
  },
  watch: {
    calend: function (val) {
      console.log(val)
      this.isAdd = val
    },
    isAdd: function (val) {
      console.log(val)
      this.$emit('calende', { s: val })
    }
  },
  mounted () {

    this.getNowFormatDate();
    //获取当前月的第一天
    this.firstDates = this.getCurrentMonthFirst();
    //获取当前月份的最后一天
    this.lastDates = this.getCurrentMonthLast();

    //获取当前月的第一天
    this.firstDates2 = this.getCurrentMonthFirst();
    //获取当前月份的最后一天
    this.lastDates2 = this.getCurrentMonthLast();

    this.listcalendar();

    $('#mycancalder .fc-prev-button').click(() => {
      this.filterDate()
    });
    $('#mycancalder .fc-next-button ').click(() => {
      console.log('fc-next-button')
      this.filterDate()
    });

    $('#mycancalder .fc-month-button').click(() => {
      this.dateType = 'month'
      this.filterDate()
    });
    $('#mycancalder .fc-agendaWeek-button').click(() => {
      this.dateType = 'week'
      this.filterDate()
      // this.form.copyme ='';
    });


    $('#ccgivemecalendar .fc-prev-button').click(() => {
      this.filterDate2()
    });
    $('#ccgivemecalendar .fc-next-button ').click(() => {
      this.filterDate2()
    });

    $('#ccgivemecalendar .fc-month-button').click(() => {
      this.dateType2 = 'month'
      this.filterDate2()

    });


    $('#ccgivemecalendar .fc-agendaWeek-button').click(() => {
      this.dateType2 = 'week';
      this.filterDate2()
    });
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
    //   我的日程弹框关闭回调
    myScheduleClose () {
      this.canderArray.length = 0
      this.deployObjcopy.length = 0
      this.defaultcopy.length = 0
      this.deployObj.length = 0
      this.findUserObj.length = 0
      this.findUserObj2.length = 0
    },
    handle_Close (ind) {
      this.deployObjcopy.splice(ind, 1);
      this.ccObj.splice(ind, 1);
      this.editccCopy.splice(ind, 1)
    },
    defineSchedule () {
      this.isdetail = false
      this.isedit = false
      this.listcalendar()
    },
    //   编辑日程弹框关闭
    editCancel () {
      this.isedit = false
      // this.isdetail = false
      // this.formedit = {}
      // this.editDefaultData.length = 0
      // this.editFormUserData.length = 0
    },
    //   我的日程编辑回调
    myScheduleEdit () {
      this.isedit = true
    },
    // 获取当月抄送我的人员列表
    getCopyUserByMonth () {
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          // startDate: this.firstDates2.replace(new RegExp(/-/gm) ,"/"),
          // endDate: this.lastDates2.replace(new RegExp(/-/gm) ,"/"),
          startDate: this.firstDates2,
          endDate: this.lastDates2,
        }
      };

      this.$post("/sys/schedule/queryUserByCopySc", datas).then((response) => {
        if (response.code !== this.code.codeNum.SUCCESS) {
          this.$message.error(response.msg)
          return
        }
        this.copyOptions = response.data

      })
    },
    handleUpdateSeted (data) {
      // this.setedId = data.map(v=>v.id);
      this.setedId = data;
    },

    tabClick (tab, e) {
      this.tabs = tab.index;
      this.tabValue = tab.name
      this.form.copyme = '';
      // 切换tab时，重置时间
      if (this.tabValue === 'my') {
        this.searchcal = false;
        this.selectDate = new Date()
      } else {
        this.selectDate2 = new Date()
        // this.form.copyme ='';
        this.searchcal = true;
        this.copyMefiltrate();
      }
      this.changeDate()
    },

    //点击关闭
    handleClose (done) {
      //console.log(this.msgObj.name)
      var _this = this
      this.$confirm('确认关闭？')
        .then(_ => {
          this.closemediumDialog()

        })
        .catch(_ => { });
    },
    filterDate () {
      // var title = $('.fc-next-button').siblings("h2").text();
      let el = $('.fc-next-button').siblings("h2");
      let title
      if (this.tabValue === 'my') {
        title = $(el[0]).text()
      } else {
        title = $(el[1]).text()
      }
      if (this.dateType == 'month') {
        //console.log(333+"]]]]]")
        var one = title.slice(title.length - 4, title.length); // 从长度是3开始截取  2019
        var three = title.indexOf('月')  //月出现的索引 是1
        var two = this.zhuan(title.slice(0, three)) //从0开始截取到1
        var titleDate = one + '-' + two
        this.firstDates = this.$moment(titleDate).startOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.lastDates = this.$moment(titleDate).endOf('month').format("YYYY-MM-DD HH:mm:ss")

        this.listcalendar();
      } else if (this.dateType == 'week') {
        var startYear = title.indexOf('年')
        var endYear = title.lastIndexOf('年')
        var startMonth = title.indexOf('月')
        var endMonth = title.lastIndexOf('月')
        var startDay = title.indexOf('日')
        var endDay = title.lastIndexOf('日')
        var startHeng = title.indexOf(' – ')
        var endHeng = title.lastIndexOf(' ')
        if (startYear == endYear && startMonth == endMonth) {
          var titleStartYear = title.slice(0, startYear);
          // console.log(title)
          // console.log(titleStartYear)
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          //console.log(titleStartMonth)
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          console.log(titleStartDay)
          var titleEndDay = title.slice(startHeng + 3, endDay);
          //console.log(titleEndDay)
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay + ' 00:00:00'
          var titleEndDate = titleStartYear + '-' + titleStartMonth + '-' + titleEndDay + ' 00:00:00'
          //console.log(titleStartDate)
          //console.log(titleEndDate)
          // this.firstDates = this.$moment(titleStartDate).format("YYYY-MM-DD HH:mm:ss")
          // this.lastDates = this.$moment(titleEndDate).format("YYYY-MM-DD HH:mm:ss")
          this.firstDates = titleStartDate
          this.lastDates = titleEndDate

        } else if (startYear == endYear && startMonth != endMonth) {
          var titleStartYear = title.slice(0, startYear);
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          var titleEndMonth = title.slice(endHeng + 1, endMonth);
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          var titleEndDay = title.slice(endMonth + 1, endDay);
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay + ' 00:00:00'
          var titleEndDate = titleStartYear + '-' + titleEndMonth + '-' + titleEndDay + ' 00:00:00'
          this.firstDates = titleStartDate
          this.lastDates = titleEndDate
        } else if (startYear != endYear) {
          var titleStartYear = title.slice(0, startYear);
          var titleEndYear = title.slice(endHeng + 1, endYear);
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          var titleEndMonth = title.slice(endYear + 1, endMonth);
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          var titleEndDay = title.slice(endMonth + 1, endDay);
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay + ' 00:00:00'
          var titleEndDate = titleEndYear + '-' + titleEndMonth + '-' + titleEndDay + ' 00:00:00'
          this.firstDates = titleStartDate
          this.lastDates = titleEndDate
        }

        this.listcalendar();
      }

    },
    filterDate2 () {
      // var title = $('.fc-next-button').siblings("h2").text();
      let el = $('.fc-next-button').siblings("h2");
      let title = $(el[1]).text()
      // if(this.tabValue === 'my'){
      //   title = $(el[0]).text()
      // } else{
      //   title = $(el[1]).text()
      // }
      if (this.dateType2 == 'month') {
        //console.log(333+"]]]]]")
        var one = title.slice(title.length - 4, title.length); // 从长度是3开始截取  2019
        var three = title.indexOf('月')  //月出现的索引 是1
        var two = this.zhuan(title.slice(0, three)) //从0开始截取到1
        var titleDate = one + '-' + two
        this.firstDates2 = this.$moment(titleDate).startOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.lastDates2 = this.$moment(titleDate).endOf('month').format("YYYY-MM-DD HH:mm:ss")

        this.listcalendar2();
      } else if (this.dateType2 == 'week') {
        //console.log(4444444+"]]]]]")
        var startYear = title.indexOf('年')
        var endYear = title.lastIndexOf('年')
        var startMonth = title.indexOf('月')
        var endMonth = title.lastIndexOf('月')
        var startDay = title.indexOf('日')
        var endDay = title.lastIndexOf('日')
        var startHeng = title.indexOf(' – ')
        var endHeng = title.lastIndexOf(' ')
        if (startYear == endYear && startMonth == endMonth) {
          var titleStartYear = title.slice(0, startYear);
          // console.log(title)
          // console.log(titleStartYear)
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          //console.log(titleStartMonth)
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          console.log(titleStartDay)
          var titleEndDay = title.slice(startHeng + 3, endDay);
          //console.log(titleEndDay)
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay
          var titleEndDate = titleStartYear + '-' + titleStartMonth + '-' + titleEndDay
          //console.log(titleStartDate)
          //console.log(titleEndDate)
          this.firstDates2 = titleStartDate + ' 00:00:00'
          this.lastDates2 = titleEndDate + ' 00:00:00'
          //console.log(this.firstDates)
          //console.log(this.lastDates)

        } else if (startYear == endYear && startMonth != endMonth) {
          var titleStartYear = title.slice(0, startYear);
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          var titleEndMonth = title.slice(endHeng + 1, endMonth);
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          var titleEndDay = title.slice(endMonth + 1, endDay);
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay
          var titleEndDate = titleStartYear + '-' + titleEndMonth + '-' + titleEndDay
          this.firstDates2 = titleStartDate + ' 00:00:00'
          this.lastDates2 = titleEndDate + ' 00:00:00'
          // console.log(this.firstDates)
          //console.log(this.lastDates)


        } else if (startYear != endYear) {
          var titleStartYear = title.slice(0, startYear);
          var titleEndYear = title.slice(endHeng + 1, endYear);
          var titleStartMonth = title.slice(startYear + 1, startMonth);
          var titleEndMonth = title.slice(endYear + 1, endMonth);
          var titleStartDay = title.slice(startMonth + 1, startHeng);
          var titleEndDay = title.slice(endMonth + 1, endDay);
          var titleStartDate = titleStartYear + '-' + titleStartMonth + '-' + titleStartDay
          var titleEndDate = titleEndYear + '-' + titleEndMonth + '-' + titleEndDay
          this.firstDates2 = titleStartDate + ' 00:00:00'
          this.lastDates2 = titleEndDate + ' 00:00:00'
          //console.log(this.firstDates)
          //console.log(this.lastDates)
        }

        this.listcalendar2();
      }

    },
    //全局组织架构的选择人员
    findAllUser (data) {
      if (!data || !data.length) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        if (this.user_num == 1) {
          this.form.principal = ''
          this.deployObj = []
        }
        if (this.user_num == 2) {
          this.formedit.principal = ''
          this.deployObj = []
          this.findUserObj2 = []
        }
        return
      }
      let hash = {}
      data = data.reduce((item, next) => {
        !hash[next.userId] && (hash[next.userId] = true && item.push(next))
        return item
      }, [])
      this.deployObj = data;
      this.persoArray = [];
      if (this.user_num == 1) {
        var string = "";
        for (var i = 0; i < this.deployObj.length; i++) {
          var objname = {};
          objname.name = this.deployObj[i].name;
          this.canderArray.push(objname);
          this.persoArray.push(this.deployObj[i].id);
          string = string + data[i].name + "、";
        }
        this.form.principal = string;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.findUserObj = this.deployObj
      } else {
        var string = "";
        for (var i = 0; i < this.deployObj.length; i++) {
          var objname = {};
          objname.name = this.deployObj[i].name;
          this.canderArray.push(objname);
          this.persoArray.push(this.deployObj[i].id);
          string = string + data[i].name + "、";
        }
        this.formedit.principal = string;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
      }
      console.log(this.deployObj)
      this.findUserObj2 = this.deployObj
    },
    // 选择用户
    optUser (num) {
      this.user_num = num;
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (this.user_num == 1 && this.formedit.principal) {
        this.findUserObj = this.$utils.cloneDeepArray(this.deployObj)
      }
      if (this.user_num == 2 && this.form.principal) {
        this.findUserObj2 = this.$utils.cloneDeepArray(this.deployObj)
      }
    },

    // 选择用户
    choseoptUser () {
      this.chosefindFlag = true;
      this.chosefindState = { state: 0 };
      this.chosecheckState = { state: 2 };
    },
    //抄送人的选择人员
    findAllUserserch (data) {
      console.log(data, 222)
      if (!data || !data.length) {
        this.findFlagserch = false;
        this.findStateserch = {};
        this.checkStateserch = {};
        if (this.userNums == 1) {
          this.deployObjcopy = []
        }
        if (this.userNums == 2) {
          this.editccCopy = []
        }
        return
      }
      let hash = {}
      data = data.reduce((item, next) => {
        !hash[next.userId] && (hash[next.userId] = true && item.push(next))
        return item
      }, [])
      //  返回的数据分为默认的和其他的选择的，
      let defaultArr = []
      let copyData = []
      data.forEach(v => {
        if (v.originData || v.defaultUser == 1) {
          defaultArr.push(v)
        } else {
          copyData.push(v)
        }
      })
      console.log(defaultArr, copyData, 665455, this.userNums)
      if (this.userNums == 1) {
        this.defaultcopy = defaultArr
        this.deployObjcopy = copyData
        console.log(this.deployObjcopy);
        if (this.deployObjcopy !== "") {
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
              };
            };
            if (flag) {
              chgArr.push(this.deployObjcopy[i]);
            };
          };
          this.deployObjcopy = chgArr
          //this.chack_bule = false
          console.log(this.deployObjcopy);
        }
        this.findUserObjSearch = this.defaultcopy.concat(this.deployObjcopy)
      } else {
        console.log(this.editdefaultCopy, this.editccCopy, 2222)
        this.editdefaultCopy = defaultArr
        this.ccObj = copyData
        if (this.ccObj !== "") {
          this.ccObj = Array.from(new Set(this.ccObj));
          this.findFlagserch = false;
          this.findStateserch = {};
          this.checkStateserch = {};
          var chgArr = [];
          for (var i = 0; i < this.ccObj.length; i++) {
            var flag = true;
            for (var j = 0; j < chgArr.length; j++) {
              if (this.ccObj[i].userId == chgArr[j].userId) {
                flag = false;
              };
            };
            if (flag) {
              chgArr.push(this.ccObj[i]);
            };
          };
          this.ccObj = chgArr
          console.log(this.ccObj)
          this.editccCopy = this.ccObj
        }
      }
      this.findUserObjSearch1 = this.editdefaultCopy.concat(this.editccCopy)
    },
    // 选择多个用户
    optUserserch (num) {
      this.userNums = num;
      this.findFlagserch = true;
      this.findStateserch = { state: 0 };
      this.checkStateserch = { state: 2 };
      console.log(num)
      if (this.userNums == 1) {
        let copyData = this.defaultcopy.concat(this.deployObjcopy)
        copyData.forEach(v => {
          v.label = v.name
          v.uniqueKey = 'user' + v.userId
        })
        this.findUserObjSearch = copyData
        // this.findUserObjSearch = this.defaultcopy.concat(this.deployObjcopy)
        console.log(this.findUserObjSearch, this.defaultcopy, this.deployObjcopy)
      } else {
        let findUserObjSearchA = this.editdefaultCopy.concat(this.editccCopy)
        findUserObjSearchA.forEach(v => {
          v.label = v.name
          v.uniqueKey = 'user' + v.userId
        })
        this.findUserObjSearch1 = findUserObjSearchA
        console.log(this.findUserObjSearch1, this.editdefaultCopy, this.editccCopy)

      }
    },

    handleSelect (val) {
      let projectData = this.orijectOptions.find(v=>v.id===val)
      if(!projectData) return
      this.projectids = projectData.id;
      this.projectnames = projectData.name;
      this.form.progress = projectData.name
    },
    //抄送我的筛选的展示
    cchandleSelect (val) {
      // console.log(val)
      // console.log(this.copyOptions)
      // console.log(this.copyOptions[0].id)
      this.copyUserId = val
      this.eventscctome = []
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          // startDate: this.firstDates2.replace(new RegExp(/-/gm) ,"/"),
          // endDate: this.lastDates2.replace(new RegExp(/-/gm) ,"/"),
          startDate: this.firstDates2,
          endDate: this.lastDates2,
          userId: val
        }
      };
      var _this = this;
      this.$post("/sys/schedule/queryScheduleByCopy", datas).then((response) => {
        console.log(response.data)
        //var dataseries = [];
        for (var value in response.data) {
          //console.log(response.data[value])
          //var name = response.data[value].name;
          var nameaddCreate = response.data[value].createName + "-" + response.data[value].name;
          response.data[value].title = nameaddCreate;
          delete response.data[value].nameaddCreate;
          var startDate = response.data[value].startDate;
          response.data[value].start = startDate;
          delete response.data[value].startDate;
          var endDate = response.data[value].endDate;
          response.data[value].end = endDate;
          delete response.data[value].endDate;
          var isDayshow = response.data[value].isDay;
          if (isDayshow == 0) {
            response.data[value].isDay = false;
          } else {
            response.data[value].isDay = true;
          }
          var isDay = response.data[value].isDay;
          response.data[value].allDay = isDay;
          delete response.data[value].isDay;
        }
        _this.eventscctome = response.data;

      }).catch(function (error) {
        console.log(error);
      });

    },

    // 获取当前系统日期
    getNowFormatDate () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 1 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      //this.currentdate = year + seperator1 + month + seperator1 + strDate;
      this.currentdate = year + seperator1 + month + seperator1 + strDate + " " + hours + ":" + minutes + ":" + seconds;
      this.curenttoday = year + seperator1 + month + seperator1 + strDate + " " + "00" + ":" + "00" + ":" + "00";
      this.currentendtoday = year + seperator1 + month + seperator1 + strDate + " " + "23" + ":" + "59" + ":" + "59";
      this.selectDate = this.currentdate;
      return this.currentdate
    },
    changeDate () {
      if (this.tabValue === 'my') {
        this.$refs.calendar.fireMethod('gotoDate', this.selectDate)
        this.firstDates = this.$moment(this.selectDate).startOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.lastDates = this.$moment(this.selectDate).endOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.listcalendar()
      } else {
        this.$refs.calendar2.fireMethod('gotoDate', this.selectDate2)
        this.firstDates2 = this.$moment(this.selectDate2).startOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.lastDates2 = this.$moment(this.selectDate2).endOf('month').format("YYYY-MM-DD HH:mm:ss")
        this.listcalendar2()
      }
    },
    eventClickccme (event) {
      let item = this.eventscctome.filter(v => v.id == event.id)[0]
      console.log('eventClickccme',item)
      this.isdetailCc = true
      this.formedit.name = item.title;  //日程名称
      this.formedit.progress = item.projectName;  //项目名称
      this.formedit.projectId = item.projectId;  //项目名称
      this.formedit.date1 = item.start //开始日期
      this.formedit.desc = item.content  //内容
      this.formedit.date2 = item.end//截止日期
    },
    eventClick (event) { //events的点击事件 日程详情

      this.dateClicks = event
      if (event.allDay == true) {
        this.checked = true
      } else {
        this.checked = false;
      }
      !this.orijectOptions.length && this.getProjectList()
      var dataObj = {
        "token": this.token,
        "userId": this.userId,
        data: {
          id: event.id
        }
      };
      var that = this;
      this.$post('/sys/schedule/select_schedule', dataObj).then((response) => {
        console.log(response);
        var datas = response.data;
        console.log(datas.scheduleUserlist)
        if (response.code == that.code.codeNum.SUCCESS) {
          this.editDefaultData = datas.scheduleUserlist
          this.dateClicks.allDay = datas.isDay === 1
          let arr = datas.personnelName.split(',')
          let arr1 = datas.personnel.split(',')
          let result = arr.map((name, i) => ({ name, id: arr1[i], userId: arr1[i], label: name, uniqueKey: 'user' + arr1[i] }));
          this.editFormUserData = result
          this.deployObj = result
          this.editccCopy.length = 0;
          this.ccObj.length = 0; // 先初始化查询抄送人数组
          for (var i = 0; i < datas.scheduleUserlist.length; i++) {
            //debugger;
            console.log(datas.scheduleUserlist.length)
            console.log(datas.scheduleUserlist[i])
            //console.log(data.scheduleUserlist[i].defaultUser)
            //console.log(data.scheduleUserlist[i].name)
            if (datas.scheduleUserlist[i].defaultUser == 1) {
              datas.scheduleUserlist[i].originData = true
              that.formeditdefaultcopy.push(datas.scheduleUserlist[i])
              var resultcopy = [];
              var objdeco = {};
              for (var k = 0; k < that.formeditdefaultcopy.length; k++) {
                if (!objdeco[that.formeditdefaultcopy[k].userId]) {
                  resultcopy.push(that.formeditdefaultcopy[k]);
                  objdeco[that.formeditdefaultcopy[k].userId] = true;
                }
              }
              //console.log(resultcopy);
              that.editdefaultCopy = resultcopy;
            } else {
              that.ccObj.push(datas.scheduleUserlist[i])
              var resultcopyCc = [];
              var objdecoCc = {};
              for (var j = 0; j < that.ccObj.length; j++) {
                if (!objdecoCc[that.ccObj[j].userId]) {
                  resultcopyCc.push(that.ccObj[j]);
                  objdecoCc[that.ccObj[j].userId] = true;
                }
              }
              console.log(resultcopyCc, 'tttttttttttttttttttt');
              that.editccCopy = resultcopyCc;
            }
          }
          this.findUserObjSearch1 = this.editdefaultCopy.concat(this.editccCopy)
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.eventcancel = event;
      if (this.userId == event.userId) {
        this.disabledsedit = false;
      } else {
        this.disabledsedit = true;
      }
      this.calendarEvents = event;
      this.eventsId = event.id;
      // 提醒方式
      var eventRemtype = event.remindType
      //console.log(eventRemtype)
      if (eventRemtype == '不提醒') {
        event.remindType = [0]
      } else if (eventRemtype == '开始前15分钟') {
        event.remindType = [1]
      } else if (eventRemtype == '开始前1小时') {
        event.remindType = [2]
      } else if (eventRemtype == '开始前3小时') {
        event.remindType = [3]
      } else if (eventRemtype == '开始前1天') {
        event.remindType = [4]
      }
      // 发送方式
      var evenSendtype = event.sendType.split(",");
      // 重复方式
      var eventRepeat = event.repeatType
      if (eventRepeat == '不重复') {
        event.repeatType = [1]
      } else if (eventRepeat == '每天') {
        event.repeatType = [2]
      } else if (eventRepeat == '每周') {
        event.repeatType = [3]
      } else if (eventRepeat == '每年') {
        event.repeatType = [4]
      } else if (eventRepeat == '工作日') {
        event.repeatType = [5]
      }
      var checkbox = event.allDay;
      if (checkbox == true) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.alldaymowei = this.$moment(event.start._i).format('YYYY-MM-DD 23:59:59');
      console.log(this.alldaymowei)
      if (event.end == null || event.end == undefined || event.end == "") {
        event.end = this.alldaymowei;
      } else {
        event.end = event.end._i;
      }
      //console.log(event.end)

      this.isdetail = true
      this.formedit.name = event.title;  //日程名称
      this.projectids = event.projectId;
      this.projectnames = '';
      this.formedit.progress = event.projectName;  //项目名称
      this.formedit.projectId = event.projectId;  //项目名称
      this.formedit.principal = event.personnelName  //选择人员
      this.chosePerson = event.personnel
      this.formedit.date1 = event.start._i  //开始日期
      this.formedit.date2 = event.end//截止日期
      //this.checked = event.isDay //是否全天
      this.formedit.region = event.remindType //提醒方式
      this.formedit.letter = evenSendtype.map(Number)//发送方式
      this.formedit.repeat = event.repeatType //重复方式
      this.formedit.desc = event.content  //内容
      this.myFormedit = this.$utils.copyObj(this.formedit)

    },


    //抄送我的日程的筛选
    copyMefiltrate () {
      this.$post('/sys/schedule/queryUserByCopy', { data: {} }).then((res) => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.error(res.msg);
          return
        }
        if (!res.data) {
          return
        }
        console.log(res.data,'res.datares.data')
        // 回显接口数据处理
        this.setedId = res.data.map(item => {
          // 部门selfId： dep11
          // 人员selfId： user11
          item.selfId = item.id == null ?
            `dep${ item.deptId }` : ``
          return item
        })

      }).catch((err) => {
        console.log(err);
      });
    },
    // 点击修改日程
    editSchedule () {
      // console.log(this.userId)
      if (this.formedit.name == "") {
        this.$message.error('日程名称内容不能为空');
        return;
      }
      if (this.formedit.progress == "") {
        this.$message.error('所属项目不能为空');
        return;
      }
      if (this.formedit.principal == "") {
        this.$message.error('人员不能为空');
        return;
      }
      if (this.formedit.date1 == "" || this.formedit.date1 == null) {
        this.$message.error('开始日期不能为空');
        return;
      }
      if (this.formedit.date2 == "" || this.formedit.date2 == null) {
        this.$message.error('结束日期不能为空');
        return;
      }

      if (new Date(this.formedit.date2) < new Date(this.formedit.date1)) {
        this.$message.error('结束日期不能小于于开始日期');
        return;
      }

      if (this.formedit.repeat == "") {
        this.$message.error('日期重复方式不能为空');
        return;
      }
      if (this.formedit.desc == "") {
        this.$message.error('日程内容不能为空');
        return;
      }

      console.log(this.ccObj)
      console.log(this.formeditdefaultcopy)
      var decopyarr = [];
      this.formeditdefaultcopy.forEach(function (c) {
        // if (c.userId) {
        //     _this.formedit.userIds.push(c.userId);
        // }
        var a = {
          userId: c.userId,
          defaultUser: 1
        }
        decopyarr.push(a);
      });

      console.log(decopyarr)
      var decopyme = [];
      this.ccObj.forEach(function (c) {
        // if (c.userId) {
        //     _this.formedit.userIds.push(c.userId);
        // }
        var a = {
          userId: c.userId,
          defaultUser: 0
        }
        decopyme.push(a);
      });

      console.log(decopyme)
      this.editalldecopyme = decopyarr.concat(decopyme)
      console.log(this.editalldecopyme)
      //return;
      //  if(this.formedit.userIds == ""){
      //     this.$message.error('日程抄送人不能为空');
      //     return;
      // }
      var regioms = this.formedit.region
      if (regioms == "不提醒") {
        this.formedit.region = 0
      } else if (regioms == "开始前15分钟") {
        this.formedit.region = 1
      } else if (regioms == "开始前1小时") {
        this.formedit.region = 2
      } else if (regioms == "开始前3小时") {
        this.formedit.region = 3
      } else if (regioms == "开始前1天") {
        this.formedit.region = 4
      }
      var repeats = this.formedit.repeat;
      if (repeats == "不重复") {
        this.formedit.repeat = 1
      } else if (repeats == "每天") {
        this.formedit.repeat = 2
      } else if (repeats == "每周") {
        this.formedit.repeat = 3
      } else if (repeats == "每年") {
        this.formedit.repeat = 4
      } else if (repeats == "工作日") {
        this.formedit.repeat = 5
      }
      // 是否全天
      var checkboxs = this.checked;
      // console.log(checkboxs)
      if (checkboxs == true) {
        this.checked = 1
      } else {
        this.checked = 0
      }

      if (this.chosePerson == this.persoArray.join(",") || this.chosePerson == "" || this.persoArray.join(",") == "") {
        this.isChanges = 0
      } else {
        this.isChanges = 1
      }

      if (this.persoArray.join(",") != null && this.persoArray.join(",") != undefined && this.persoArray.join(",") != "") {
        this.chosePerson = this.persoArray.join(",")
      }
      if (this.eventcancel.start._i == this.formedit.date1) {
        this.isChanges = 0
      } else {
        this.isChanges = 1
      }

      if (this.eventcancel.end == this.formedit.date2) {
        this.isChanges = 0
      } else {
        this.isChanges = 1
      }
      console.log(this.editalldecopyme)
      var arrs = [...this.editalldecopyme]
      let obj = {};
      let peon = arrs.reduce((cur, next) => {
        obj[next.userId] ? "" : obj[next.userId] = true && cur.push(next);
        return cur;
      }, []) //设置cur默认类型为数组，并且初始值为空的数组
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.eventsId,  //修改的日程id
          name: this.formedit.name, //日程名称
          projectId: this.projectids, //项目id
          projectName: this.formedit.progress,  //项目名称
          personnel: this.chosePerson, //人员id
          startDate: this.formedit.date1.length == 16 ? this.formedit.date1 + ':00' : this.formedit.date1, //开始时间
          endDate: this.formedit.date2.length == 16 ? this.formedit.date2 + ':00' : this.formedit.date2, //截止时间
          isDay: this.checked, //是否全天
          remindType: this.formedit.region,  //提醒类型
          sendType: this.formedit.letter.join(","),  //发送类型
          repeatType: this.formedit.repeat, //重复方式
          content: this.formedit.desc, //内容
          isChange: this.isChanges, //配置人员和时间有没有改动
          scheduleUserlist: peon  //默认的抄送人和自己添加的抄送人
        }
      };
      var _this = this;
      this.$post("/sys/schedule/edit_schedule", datas).then((response) => {
        if (response.code == _this.success_code) {
          _this.isedit = false;
          _this.isdetail = false;
          _this.listcalendar();
          _this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.findUserObjSearch = []
          this.findUserObjSearch1 = []
          this.findUserObjSearchA = []
          this.findUserObj = []
          this.findUserObj2 = []
          this.deployObj = []
          this.editccCopy = []

        } else {
          _this.$message.error(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },

    // 点击全天的时间
    changeCheckbos () {
      if (this.checked == true) {
        this.form.date1 = this.currentstarttime;
        this.form.date2 = this.currentendtime;
      } else {
        this.form.date1 = '';
        this.form.date2 = '';
      }
    },
    changeCheckbosedit () {
      if (this.checked == true) {
        this.formedit.date1 = this.currentstarttime;
        this.formedit.date2 = this.currentendtime;
      } else {
        this.formedit.date1 = '';
        this.formedit.date2 = '';
      }
    },
    quantianshifouchose () {
      this.checked = false;
    },

    dayClick (date, jsEvent, allDay, view) { //日期的点击事件
      this.deployObjcopy = [];
      !this.orijectOptions.length && this.getProjectList()
      //console.log(date)
      //console.log(allDay)
      //console.log(jsEvent)
      //console.log(view)
      // console.log(date._i)
      //var ooo = date._i;
      // 获取点击的日期
      var clickdate = this.$moment(date._i).format('YYYY-MM-DD');
      //console.log(clickdate)
      this.currentstarttime = this.$moment(date._i).format('YYYY-MM-DD 00:00:00');
      //console.log(this.currentstarttime)
      this.currentendtime = this.$moment(date._i).format('YYYY-MM-DD 23:59:59');
      //console.log(this.currentendtime)
      // 获取当前系统的时间
      var clicktime = this.$moment().locale('zh-cn').format('HH:mm:ss');
      //console.log(clickdate + ' ' +clicktime)
      this.clicktimedates = clickdate + ' ' + clicktime
      var time = new Date(date._i);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours() - 8;
      var min = time.getMinutes();
      var second = time.getSeconds();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      if (h >= 1 && h <= 9) {
        h = "0" + h;
      }
      if (min >= 0 && min <= 9) {
        min = "0" + min;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currenttime = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + second;


      //moment().format('MMMM Do YYYY, h:mm:ss a')
      //console.log(currenttime)
      this.form.date1 = this.clicktimedates;
      this.isAdd = true;
      this.findUserObj = []


      var datas = {
        "token": this.token,
        "userId": this.userId,
        data: {}
      };
      var that = this;
      //新增的时候调添加抄送人的接口接口
      this.$post('/sys/schedule/queryScheduleUser', datas).then((response) => {
        //console.log(response);
        var data = response.data;
        if (response.code == that.code.codeNum.SUCCESS) {
          console.log(data)
          //if(data.length>0){
          //    that.moren = true;
          for (var j = 0; j < data.length; j++) {
            var obj = {};
            obj.name = data[j].name;
            obj.userId = data[j].userId;
            obj.id = data[j].userId;
            obj.uniqueKey = 'user' + data[j].userId;
            obj.originData = true
            console.log(obj)
            that.deployObjcopymoren.push(obj);
            console.log(that.deployObjcopymoren)
            // that.chack_bule = true;
            var resultcopy = [];
            var objdeco = {};
            for (var i = 0; i < that.deployObjcopymoren.length; i++) {
              if (!objdeco[that.deployObjcopymoren[i].userId]) {
                resultcopy.push(that.deployObjcopymoren[i]);
                objdeco[that.deployObjcopymoren[i].userId] = true;
              }
            }
            console.log(resultcopy);
            that.defaultcopy = resultcopy;
          }
          //}

        }
      }).catch(function (error) {
        console.log(error);
      });

      this.handleNewProData();
      // 取出保存的草稿
      let draft = this.$utils.getDraft('calendar', false)
      // 如果没有草稿，设置定时器，返回
      if (!draft) {
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
        this.form = { ...this.form, ...draft }
        this.setTimer()
      }).catch(() => {
        //closeOnClickModal = false;
        this.setTimer()
      })
    },
    getProjectList(){
      var dataObj = {
        "token": this.token,
        "userId": this.userId,
        data: {}
      };

      //项目信息信息回显的查询接口
      this.$post('/info/project/getSimpleProjectList', dataObj).then((response) => {
        //console.log(response);
        if (response.code == this.code.codeNum.SUCCESS) {

          this.orijectOptions = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    /**
     * 设置定时器：每5秒保存一次表单数据
     */
    setTimer () {
      // 启动定时器，每5000ms保存一次草稿
      this.newProjectDialogTimer = setInterval(() => {
        this.handleDraftData()

      }, 5000)
    },
    //处理草稿数据
    handleDraftData () {
      let data = {
        name: this.form.name,
        desc: this.form.desc
      }
      this.$utils.saveDraft('calendar', data, false)
    },
    closemediumDialog () {
      this.handleDraftData()
      this.canderArray.length = 0
      this.deployObjcopy.length = 0
      this.defaultcopy.length = 0
      this.deployObj.length = 0
      this.findUserObj.length = 0
      this.findUserObj2.length = 0
      this.isAdd = false;
      clearInterval(this.newProjectDialogTimer)
    },
    handleNewProData () {
      // if(this.isadd = true){
      this.form.projectId = "";
      this.form.name = '';
      this.form.progress = '';
      this.form.principal = '';
      this.form.data1 = '';
      this.form.date2 = '';
      this.checked = false;
      this.form.region = 0;
      this.letter = [];
      this.form.repeat = '';
      this.form.desc = '';
      // }
    },

    // getLocalTime() {
    //     //将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式
    //     // d.cTime = 1539083829787
    //     let date = new Date(1539083829787);
    //     let year = date.getFullYear();
    //     let month = date.getMonth()+1;
    //     let day = date.getDate();
    //     let h = date.getHours();
    //     let min = date.getMinutes();
    //     let second = date.getSeconds();
    //     month = month < 10 ? "0"+month:month;
    //     day = day < 10 ? "0"+day:day;
    //     // if (m >= 1 && m <= 9) {
    //     //     m = "0" + m;
    //     // }
    //     // if (d >= 0 && d <= 9) {
    //     //     d = "0" + d;
    //     // }
    //     // if (h >= 1 && h <= 9) {
    //     //     h = "0" + h;
    //     // }
    //     // if (min >= 0 && min <= 9) {
    //     //     min = "0" + min;
    //     // }
    //     // if (second >= 0 && second <= 9) {
    //     //     second = "0" + second;
    //     // }
    //     date = year+'-'+month+'-'+day+' '+h+':'+min+':'+second;
    //     console.log(date); // 2018-10-09
    //     return date;
    // },




    // 新增的方法
    addSchedule () {
      var _this = this;
      if (this.form.name == "") {
        this.$message.error('日程名称内容不能为空');
        return;
      }
      if (this.form.progress == "") {
        this.$message.error('所属项目不能为空');
        return;
      }
      if (this.form.principal == "") {
        this.$message.error('人员不能为空');
        return;
      }
      if (this.form.date1 == "" || this.form.date1 == null) {
        this.$message.error('开始日期不能为空');
        return;
      }
      if (this.form.date2 == "" || this.form.date2 == null) {
        this.$message.error('结束日期不能为空');
        return;
      }
      if (new Date(this.form.date2) < new Date(this.form.date1)) {
        this.$message.error('开始时间不能大于结束时间');
        return;
      }

      if (this.form.repeat == "") {
        this.$message.error('日期重复方式不能为空');
        return;
      }
      if (this.form.desc == "") {
        this.$message.error('内容不能为空');
        return;
      }
      console.log(this.deployObjcopy)
      console.log(this.deployObjcopymoren)
      var decopyarr = [];
      this.defaultcopy.forEach(function (c) {
        if (c.userId) {
          _this.form.userIds.push(c.userId);
        }
        var a = {
          userId: c.userId,
          defaultUser: 1
        }
        decopyarr.push(a);
      });


      console.log(decopyarr)
      var decopyme = [];
      this.deployObjcopy.forEach(function (c) {
        if (c.userId) {
          _this.form.userIds.push(c.userId);
        }
        var a = {
          userId: c.userId,
          defaultUser: 0
        }
        decopyme.push(a);
      });

      console.log(decopyme)
      this.alldecopyme = decopyarr.concat(decopyme)
      console.log(this.alldecopyme)
      //return;
      //  if(this.form.userIds == ""){
      //     this.$message.error('日程抄送人不能为空');
      //     return;
      // }

      var regioms = this.form.region
      if (regioms == "不提醒") {
        this.form.region = 0
      } else if (regioms == "开始前15分钟") {
        this.form.region = 1
      } else if (regioms == "开始前1小时") {
        this.form.region = 2
      } else if (regioms == "开始前3小时") {
        this.form.region = 3
      } else if (regioms == "开始前1天") {
        this.form.region = 4
      }
      // var letters = this.form.letter;
      // console.log(letters)
      // if(letters == "站内信"){
      //     this.form.letter = 1
      // }else if(letters == "邮件"){
      //     this.form.letter = 2
      // }else if(letters == "短信"){
      //     this.form.letter = 3
      // }
      var repeats = this.form.repeat;
      if (repeats == "不重复") {
        this.form.repeat = 1
      } else if (repeats == "每天") {
        this.form.repeat = 2
      } else if (repeats == "每周") {
        this.form.repeat = 3
      } else if (repeats == "每年") {
        this.form.repeat = 4
      } else if (repeats == "工作日") {
        this.form.repeat = 5
      }
      // 是否全天
      var checkboxs = this.checked;
      if (checkboxs == true) {
        this.checked = 1
      } else {
        this.checked = 0
      }

      //console.log(this.form.date2)
      var endtime = this.form.date2;

      //console.log(endtime)
      var shifenmiao = this.$moment(endtime).format("HH:mm:ss");
      //console.log(shifenmiao)
      if (shifenmiao == "00:00:00") {
        // console.log(111+"]]]]]")

        //console.log(this.form.date2)
        var opo = this.$moment(this.form.date2).subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
        // console.log(opo)
        this.form.date2 = opo;
      } else {
        //console.log(2222+"]]]]]")
        // console.log(this.form.date2)
      }
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.form.name,
          projectId: this.projectids,
          projectName: this.projectnames,
          personnel: this.persoArray.join(","),
          startDate: this.form.date1 + ':00',
          endDate: this.form.date2 + ':00',
          isDay: this.checked, //是否全天
          remindType: this.form.region,
          sendType: this.letter.join(","),  //提醒方式
          repeatType: this.form.repeat,
          content: this.form.desc,
          scheduleUserlist: this.alldecopyme //  默认和自己添加的抄送人
        }
      };
      var _this = this;
      this.$post("/sys/schedule/add_schedule", datas).then((response) => {
        // _this.isAdd = false;
        // _this.$message({
        //     type: 'success',
        //     message: '新增成功!'
        // });
        // _this.listcalendar();

        if (response.code == _this.success_code) {
          _this.isAdd = false;
          _this.listcalendar();
          // 保存成功，关闭弹窗，关闭定时器
          _this.closemediumDialog()
          // 保存成功，清空草稿数据
          _this.$utils.removeDraft('calendar', false)
          _this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.findUserObj2 = []
          this.findUserObjSearch = []
          this.findUserObj = []
          this.findUserObjSearch1 = []
          this.findUserObjSearchA = []
          this.deployObj = []
          this.deployObjcopy = []
        } else {
          _this.$message(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取当前月的第一天
    getCurrentMonthFirst () {
      var date = new Date();
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      // var hours = date.getHours();
      // console.log(hours)
      // var min = date.getMinutes();
      // console.log(min)
      // var second = date.getSeconds();
      // console.log(second)

      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.firstData = date.getFullYear() + '-' + month + '-' + day + ' ' + '00' + ':' + '00' + ':' + '00';
      //console.log(this.firstData)
      return this.firstData
      //return date.getFullYear() + '-' + month + '-' + day;
    },
    // 获取当前月的最后一天
    getCurrentMonthLast () {
      var date = new Date();
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      var lastTime = new Date(nextMonthFirstDay - oneDay);
      var month = parseInt(lastTime.getMonth() + 1);
      var day = lastTime.getDate();
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var lastmouth = new Date(date.getFullYear() + '-' + month + '-' + day)
      var y = lastmouth.getFullYear();
      var m = lastmouth.getMonth() + 1;
      var d = lastmouth.getDate();
      // var h = lastmouth.getHours();
      // console.log(h)
      // var min = lastmouth.getMinutes();
      // var second = lastmouth.getSeconds();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      // if (h >= 1 && h <= 9) {
      //     h = "0" + h;
      // }
      // if (min >= 0 && min <= 9) {
      //     min = "0" + min;
      // }
      // if (second >= 0 && second <= 9) {
      //     second = "0" + second;
      // }
      this.lastdate = y + "-" + m + "-" + d + " " + "23" + ":" + "59" + ":" + "59";
      //console.log(this.lastdate)
      return this.lastdate
      //return new Date(date.getFullYear() + '-' + month + '-' + day );
    },

    //我的日程的查询
    listcalendar () {
      this.events = []
      var liststarttime = this.firstDates
      var listendtime = this.lastDates

      console.log(1111, liststarttime)

      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          // startDate: liststarttime.replace(new RegExp(/-/gm) ,"/"),
          // endDate: listendtime.replace(new RegExp(/-/gm) ,"/")
          startDate: liststarttime,
          endDate: listendtime
        }
      };
      var _this = this;
      this.$post("/sys/schedule/schedule_list", datas).then((response) => {
        //var dataseries = [];
        for (var value in response.data) {
          //console.log(response.data[value])

          var name = response.data[value].name;
          response.data[value].title = name;
          delete response.data[value].name;
          var startDate = response.data[value].startDate;
          response.data[value].start = startDate;
          delete response.data[value].startDate;
          var endDate = response.data[value].endDate;
          response.data[value].end = endDate;
          delete response.data[value].endDate;
          var isDayshow = response.data[value].isDay;
          if (isDayshow == 0) {
            response.data[value].isDay = false;
          } else {
            response.data[value].isDay = true;
          }
          var isDay = response.data[value].isDay;
          response.data[value].allDay = isDay;
          delete response.data[value].isDay;
        }
        _this.events = response.data;

      }).catch(function (error) {
        console.log(error);
      });
    },
    listcalendar2 () {
      // console.log(val)
      // console.log(this.copyOptions)
      // console.log(this.copyOptions[0].id)

      this.eventscctome = []
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          // startDate: this.firstDates2.replace(new RegExp(/-/gm) ,"/"),
          // endDate: this.lastDates2.replace(new RegExp(/-/gm) ,"/"),
          startDate: this.firstDates2,
          endDate: this.lastDates2,
          userId: this.copyUserId
        }
      };
      var _this = this;
      this.$post("/sys/schedule/queryScheduleByCopy", datas).then((response) => {
        console.log(response.data)
        //var dataseries = [];
        for (var value in response.data) {
          //console.log(response.data[value])
          //var name = response.data[value].name;
          var nameaddCreate = response.data[value].createName + "-" + response.data[value].name;
          response.data[value].title = nameaddCreate;
          delete response.data[value].nameaddCreate;
          var startDate = response.data[value].startDate;
          response.data[value].start = startDate;
          delete response.data[value].startDate;
          var endDate = response.data[value].endDate;
          response.data[value].end = endDate;
          delete response.data[value].endDate;
          var isDayshow = response.data[value].isDay;
          if (isDayshow == 0) {
            response.data[value].isDay = false;
          } else {
            response.data[value].isDay = true;
          }
          var isDay = response.data[value].isDay;
          response.data[value].allDay = isDay;
          delete response.data[value].isDay;
        }
        _this.eventscctome = response.data;

      }).catch(function (error) {
        console.log(error);
      });
      // 获取当月抄送人数据
      this.getCopyUserByMonth()

    },
    handleSelectChange (val) {
      this.copyUserId = val
      this.listcalendar2()
    },
    //抄送给我的展示
    geimelistcalendar () {
      this.eventscctome = []
      var liststarttime = this.firstDates
      var listendtime = this.lastDates
      var datas = {
        token: this.token,
        userId: this.userId,
        data: {
          // startDate: liststarttime.replace(new RegExp(/-/gm) ,"/"),
          // endDate: listendtime.replace(new RegExp(/-/gm) ,"/")
          startDate: liststarttime,
          endDate: listendtime
        }
      };
      var _this = this;
      this.$post("/sys/schedule/queryScheduleByCopy", datas).then((response) => {
        // console.log(response.data)
        //var dataseries = [];
        for (var value in response.data) {
          //console.log(response.data[value])
          // console.log(response.data[value].name)
          // console.log(response.data[value].createName)
          var nameaddCreate = response.data[value].createName + "-" + response.data[value].name;
          // console.log(nameaddCreate)
          //var name = response.data[value].name;
          response.data[value].title = nameaddCreate;
          delete response.data[value].nameaddCreate;
          var startDate = response.data[value].startDate;
          response.data[value].start = startDate;
          delete response.data[value].startDate;
          var endDate = response.data[value].endDate;
          response.data[value].end = endDate;
          delete response.data[value].endDate;
          var isDayshow = response.data[value].isDay;
          if (isDayshow == 0) {
            response.data[value].isDay = false;
          } else {
            response.data[value].isDay = true;
          }
          var isDay = response.data[value].isDay;
          response.data[value].allDay = isDay;
          delete response.data[value].isDay;
        }
        _this.eventscctome = response.data;

      }).catch(function (error) {
        console.log(error);
      });
    },
    //筛选抄送给我的查询
    //  screenlistcalendar(){
    //     this.eventscctome = []
    //     var liststarttime = this.firstDates
    //     var listendtime = this.lastDates
    //     var datas = {
    //         token:this.token,
    //         userId:this.userId,
    //         data: {
    //             startDate: liststarttime,
    //             endDate: listendtime
    //         }
    //     };
    //     var _this = this;
    //     this.$post("/sys/schedule/queryScheduleByCopy", datas).then((response)=> {
    //         console.log(response.data)
    //         //var dataseries = [];
    //         for (var value in response.data) {
    //             //console.log(response.data[value])
    //             console.log(response.data[value].name)
    //             var name = response.data[value].name;
    //             response.data[value].title = name;
    //             delete response.data[value].name;
    //             var startDate = response.data[value].startDate;
    //             response.data[value].start  = startDate;
    //             delete response.data[value].startDate;
    //             var endDate = response.data[value].endDate;
    //             response.data[value].end  = endDate;
    //             delete response.data[value].endDate;
    //             var isDayshow = response.data[value].isDay;
    //             if(isDayshow == 0){
    //                 response.data[value].isDay = false;
    //             }else{
    //                 response.data[value].isDay = true;
    //             }
    //             var isDay = response.data[value].isDay;
    //             response.data[value].allDay  = isDay;
    //             delete response.data[value].isDay;
    //         }
    //         _this.eventscctome = response.data;

    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    // },
    // addItem(detail){
    //     this.newItem = JSON.parse(detail)
    //     if(this.editItem.id){//如果是编辑，就删掉该条
    //         this.events.forEach( (el,ind)=>{
    //         if(el.id == this.editItem.id){
    //             this.events.splice(ind,1)
    //         }
    //         })
    //     }
    //     this.events.push({
    //         id : this.editItem.id?this.editItem.id:this.setUuid(),
    //         title : this.newItem.title,
    //         start : this.newItem.period[0],
    //         end : this.newItem.period[1],
    //     })
    // },
    setUuid () {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23];
      var uuid = s.join("");
      return uuid;
    },
    cancelcander () {
      this.isedit = false;
      // console.log(this.eventcancel)
      if (this.userId == this.eventcancel.userId) {
        this.disabledsedit = false;
      } else {
        this.disabledsedit = true;
      }



      this.calendarEvents = this.eventcancel;
      this.eventsId = this.eventcancel.id;
      // 提醒方式
      var eventRemtype = this.eventcancel.remindType
      if (eventRemtype == 0) {
        this.eventcancel.remindType = '不提醒'
      } else if (eventRemtype == 1) {
        this.eventcancel.remindType = '开始前15分钟'
      } else if (eventRemtype == 2) {
        this.eventcancel.remindType = '开始前1小时'
      } else if (eventRemtype == 3) {
        this.eventcancel.remindType = '开始前3小时'
      } else if (eventRemtype == 4) {
        this.eventcancel.remindType = '开始前1天'
      }
      // 发送方式
      var evenSendtype = this.eventcancel.sendType.split(",");
      //console.log(evenSendtype)
      //console.log(evenSendtype.map(Number))
      // var evenSendtype = this.eventcancel.sendType
      // evenSendtype = evenSendtype.replace(/\b(1|2|3)\b/g, function($0, $1) {
      // return {

      //     "1": "站内信"

      //     , "2": "邮件"

      //     , "3": "短信"

      // }[$1];
      // });
      // 重复方式
      var eventRepeat = this.eventcancel.repeatType
      if (eventRepeat == 1) {
        this.eventcancel.repeatType = '不重复'
      } else if (eventRepeat == 2) {
        this.eventcancel.repeatType = '每天'
      } else if (eventRepeat == 3) {
        this.eventcancel.repeatType = '每周'
      } else if (eventRepeat == 4) {
        this.eventcancel.repeatType = '每年'
      } else if (eventRepeat == 5) {
        this.eventcancel.repeatType = '工作日'
      }

      var checkbox = this.eventcancel.isDay;
      //console.log(checkbox)
      if (checkbox == 0) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      //console.log(event.personnel)
      //console.log(event.start._i)
      //console.log(event.end._i)
      // if(event.start._i == undefined || event.start._i == "" || event.start._i == null){

      // }
      this.isdetail = true
      this.formedit.name = this.eventcancel.title;  //日程名称
      this.formedit.progress = this.eventcancel.projectName;  //项目名称
      this.formedit.projectId = this.eventcancel.projectId;  //项目ID
      this.formedit.principal = this.eventcancel.personnelName  //选择人员
      this.chosePerson = this.eventcancel.personnel
      this.formedit.date1 = this.eventcancel.start._i  //开始日期
      this.formedit.date2 = this.eventcancel.end //截止日期
      this.checked = this.eventcancel.isDay //是否全天
      this.formedit.region = this.eventcancel.remindType //提醒方式
      this.formedit.letter = evenSendtype.map(Number); //发送方式
      this.formedit.repeat = this.eventcancel.repeatType //重复方式
      this.formedit.desc = this.eventcancel.content  //内容
    },
    //大写转小写
    zhuan (value) {
      var data = ''
      switch (value) {
        case '一':
          data = '01'
          break;
        case '二':
          data = '02'
          break;
        case '三':
          data = '03'
          break;
        case '四':
          data = '04'
          break;
        case '五':
          data = '05'
          break;
        case '六':
          data = '06'
          break;
        case '七':
          data = '07'
          break;
        case '八':
          data = '08'
          break;
        case '九':
          data = '09'
          break;
        case '十':
          data = '10'
          break;
        case '十一':
          data = '11'
          break;
        case '十二':
          data = '12'
          break;
        default:
          break;

      }
      return data;
    }
    //初始化日程视图
    // initFullCalendar(){
    //     $('#calendar').fullCalendar({
    //         header: {
    //             left: 'prev,next today',
    //             center: 'title',
    //             right: 'month,agendaWeek'
    //         },
    //         editable: true,//可以拖动
    //         firstDay:1,
    //         timeFormat: 'H:mm',
    //         axisFormat: 'H:mm',
    //         defaultDate: '2019-04-12',
    //         events: [
    //             {
    //             title: 'rrule event',
    //             rrule: {
    //                 dtstart: '2019-04-09T13:00:00',
    //                 // until: '2019-04-01',
    //                 freq: 'weekly'
    //             },
    //             duration: '02:00'
    //             }
    //         ],
    //         //events:urlRootContext + '/demo/getDataList.do',//
    //         dayClick: function(date, allDay, jsEvent, view) { //当单击日历中的某一天时，触发callback
    //             /*var views = $('#calendar').fullCalendar('getView'); */
    //             console.log(date);
    //             openLayer(date);
    //             /*alert("The view's title is " + view.title);
    //             console.log(this);
    //             alert('a day has been clicked!');  */
    //         },
    //         eventClick:function(event, jsEvent, view){//当点击日历中的某一日程（事件）时，触发此操作
    //             openEditLayer(event);
    //             console.log(this);
    //         },
    //         eventMouseover:function (event, jsEvent, view){//鼠标划过的事件
    //             console.log(event);
    //         },eventMouseout:function( event, jsEvent, view ) { //鼠标离开的事件
    //             console.log(event);
    //         }
    //     });
    // },
    // //进入下一个月视图
    // next(){
    //     $('#calendar').fullCalendar('next');
    // }

  }

}
</script>
<style>
/* .calendarparents .calendarvue .addcander .el-form-item__content {
    overflow-y: auto;
    max-height: 130px;
  } */

.calendarparents .calendarvue .container .box-card .fc-event,
.fc-event-dot {
  background-color: #e6f7ff !important;
  color: #002666;
  border: #e6f7ff !important;
  min-height:15px;
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


