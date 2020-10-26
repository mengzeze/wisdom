<template>
  <div @click.stop="the_alls" v-if="changeWindoweditor" class="backstage-task-module-edit">
    <el-dialog
      title="任务模板编辑" class="main-content"
      :close-on-click-modal="false"
      :visible.sync="changeWindoweditor"
      width="1200px"
      @close="change"
      :modal-append-to-body="false"
    >
      <p class="fr" style="position: absolute;right: 65px;top: 10px;">
        <i>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="taskUser el-icon-more" style="padding-top: 11px;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="tasksDelete">
                <span v-if="$utils.checkSystemPermission('bask_model_task_del')">
                  <i class="el-icon-delete" style="margin-right:5px"></i>删除任务
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </i>
      </p>
      <div class="clearfix" style="height:645px;">
        <div class="TaskID" v-if="spans != ''">
          <div class="top">
            <h3>所属任务：</h3>
            <p>
              <span
                v-for="item in spans"
                class="ispans"
                @click.stop="the_all(item)"
                :title="item.name"
              >
                {{item.isname}}
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>
          </div>
          <div class="iscenetr" v-if="iscenetrs">
            <ul style="height: 93px;">
              <el-scrollbar style="height:100%">
                <li
                  v-for="item in TaskIDarr"
                  :title="item.name"
                  @click.stop="the_all(item)"
                >{{item.name}}</li>
              </el-scrollbar>
            </ul>
          </div>
        </div>
        <div
          class="left-content fl"
          style=""
        >
          <el-scrollbar style="height:100%;">
            <el-form :model="form" :ref="form">
              <el-form-item label="任务名称" :label-width="formLabelWidth" class="task-content">
                <el-input
                  type="textarea"
                  resize="none"
                  maxlength="500"
                  v-model="name"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <!-- 开始 -->
              <div class="earthquake">
                <div class="block">
                  <span class="demonstration" style="margin-left: 53px;padding-right: 5px;"></span>
                  <el-checkbox @change="Customdisable" v-model="checked">自定义时间</el-checkbox>
                  <!-- <el-date-picker
                  size="small"
                  @change="startpicker(1)"
                  :disabled="isCustomdisableis"
                  style="width: 182px;"
                  v-model="startTimeinfo"
                  type="datetime"
                  placeholder="选择开始时间"
                  ></el-date-picker>-->
                </div>
                <!-- <div class="block"> -->
                <!-- <span class="demonstration">至</span> -->
                <!-- <el-date-picker
                  size="small"
                  :disabled="isCustomdisableis"
                  style="width: 184px;"
                  v-model="endTimeinfo"
                  type="datetime"
                  placeholder="选择结束时间"
                ></el-date-picker>-->
                <!-- </div> -->
                <div class="custom"></div>
              </div>
              <div class="Customtime" v-if="Customdisableis">
                <div>
                  <span class="demonstration" style="margin-left: 53px;padding-right: 5px;">自定义时间</span>
                  <el-select v-model="definedtimealue" filterable placeholder="请选择时间变量">
                    <el-option
                      v-for="(item,index) in definedtime"
                      :key="item.value"
                      :label="item.name"
                      :value="index"
                    ></el-option>
                  </el-select>
                </div>
                <div>
                  <div class="seletime">
                    <div style="float: left;">
                      <el-select
                        v-model="plusstartTimeinfovalue"
                        style="width: 57px;"
                        placeholder="请选择时间变量"
                      >
                        <el-option
                          v-for="item in plusstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        @input="calculate(1)"
                        v-model="plusstartinput"
                        style="width: 48px"
                        placeholder
                      ></el-input>
                      <el-select
                        v-model="naturalstartTimevalue"
                        style="width: 87px;"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in naturalstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                    <span style="line-height: 39px; margin-left: 7px;">至</span>
                    <div style="float: right;margin-right: 75px;">
                      <el-select
                        v-model="naturalendTimevalue"
                        style="width: 57px;"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in plusendTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        @input="calculate(2)"
                        v-model="plusendinput"
                        style="width: 48px"
                        placeholder
                      ></el-input>
                      <el-select
                        v-model="naturalstartTimevalue"
                        style="width: 87px;"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in naturalstartTimeinfo"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="custom"></div>
              </div>
              <el-form-item
                label="重复周期"
                :label-width="formLabelWidth"
                style="margin-bottom: 15px;margin-top: 9px;"
              >
                <el-select v-model="repetitionvalue" @change="selerepetition()" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in repetition"
                    :key="index"
                    :label="item.label"
                    :value="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 截止 -->
              <el-form-item label="任务提醒" :label-width="formLabelWidth">
                <div>
                  <el-select v-model="form.remindType" @change="rwtx" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in remindoption"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="提醒方式" v-if="isShowRemind" :label-width="formLabelWidth">
                <el-checkbox-group v-model="checkedCities" :min="1">
                  <el-checkbox
                    v-for="city in cities"
                    :label="city.id"
                    :value="city.id"
                    :key="city.id"
                  >{{city.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="优先级" :label-width="formLabelWidth" style="margin-top:10px">
                <el-select v-model="value" @change="Priority" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务内容" :label-width="formLabelWidth" class="left-task-content">
                <Editor2 :changes="changes" @htmls2="htmls2" :html2="html2" />
              </el-form-item>
              <el-form-item label="子任务" :label-width="formLabelWidth">
                <div class="sonShelters clearfix" style="width: 480px;height: 110px;">
                  <!-- <div
                  class="addSonShelter"
                  @click="addsonTasks"
                  style="text-align: left;"
                  v-if="$utils.checkSystemPermission('bask_model_task_add')"
                  >-->
                  <div class="addSonShelter color-primary" @click="addsonTasks" style="text-align: left;">
                    <i class="el-icon-plus"></i>
                    <span style="cursor:pointer">添加</span>
                  </div>
                  <div style="width: 493px;height: 75px;">
                    <el-scrollbar style="height:100%;padding-right:20px;">
                      <div class="ggg" v-for="item in sonTasklist">
                        <div
                          class="fl"
                          style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 304px;"
                        >
                          <span style="cursor:pointer" @click="wxlh(item)">{{item.name}}</span>
                        </div>
                        <div class="fr sonRightDiv" style="margin-right: 10px;">
                          <span>
                            <i>
                              <el-dropdown>
                                <span class="el-dropdown-link">
                                  <i class="taskUser el-icon-more"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item @click.native="delects(item)">
                                    <span
                                      v-if="$utils.checkSystemPermission('bask_model_task_del')"
                                    >
                                      <i class="el-icon-delete"></i>删除任务
                                    </span>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </i>
                          </span>
                        </div>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <!-- <div class="dialog-footer" style="text-align: center;">
              <el-button size="medium" @click="change">取消</el-button>
              <el-button size="medium" type="primary" @click="saveTasks1">保存</el-button>
            </div> -->
          </el-scrollbar>
        </div>
        <div class="fl">
          <div class="rightShelter">
            <el-tabs v-model="rightName" @tab-click="rightClick">
              <el-tab-pane label="注意事项" name="one">
                <div class="attentionMatters" style="margin-top: 0px;width: 463px;">
                  <Editor :changes="changes" :msg="msg" @htmls="htmls" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关文件" name="two">
                <related-file
                  :relatedData="relatedData"
                  :mbid="mbid"
                  @bodys="bodys"
                  ref="relateChild"
                ></related-file>
              </el-tab-pane>
              <el-tab-pane label="调查工具" name="three">
                <survey-tool :Editthe="Editthe" :mbid="mbid" ref="surveyChild"></survey-tool>
              </el-tab-pane>
              <el-tab-pane label="任务动态" name="frou">
                <dynamicTask :mbid="mbid" :Empty="Empty" ref="dynamicTask"></dynamicTask>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="dialog-footer" style="text-align: rigth;" slot="footer">
        <el-button size="medium" @click="change">取消</el-button>
        <el-button size="medium" type="primary" @click="saveTasks1">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="自定义周期"
      :close-on-click-modal="false"
      :visible.sync="drepetitionvalue"
      width="500px"
      @close="petitionvalueclose"
      append-to-body
    >
      <div>
        <div>
          <div class="drept">
            <span style="color: black;">重复频率</span>
            <el-input-number
              size="medium"
              style="width: 105px;margin-left: 3px;"
              v-model="addnum"
              :min="1"
              @blur="calculate(3)"
              :max="10000000000"
              controls-position="right"
            ></el-input-number>
            <el-select
              size="medium"
              @change="frequen"
              style="width: 91px;"
              v-model="frequencyvalue"
            >
              <el-option v-for="item in  frequency" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px;">
            <p v-if="frequencopti" style="margin-bottom: 10px;color: black;">重复时间</p>
            <ul v-show="frequenge">
              <li
                class="weektime"
                @click="weektimeclick(index)"
                ref="weektimeclick"
                v-for="(item,index) in infoweek"
                :key="item"
              >{{item}}</li>
            </ul>
            <el-select
              v-if="frequenz"
              v-model="frequencoptionsvalue"
              size="medium"
              style="width: 180px;"
            >
              <el-option
                v-for="item in  frequencoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="dreptto">
          <p style="color: black;">结束时间</p>
          <ul style="margin-top: 17px;margin-left: 6px;">
            <li>
              <el-radio v-model="radio" @change="finishtime" label="1">无限重复</el-radio>
            </li>
            <li>
              <el-radio v-model="radio" @change="finishtime" label="2">终止于某天</el-radio>
              <el-date-picker
                size="medium"
                v-model="copti"
                style="width: 195px;"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                :disabled="Wirelessrepeat"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
            </li>
            <li>
              <el-radio v-model="radio" @change="finishtime" label="3">限定重复次数</el-radio>
              <!-- <el-input
                size="medium"
                style="width: 100px;margin-left: -12px;"
                v-model="inputcopti"
                @input="calculate(4)"
                :disabled="someday"
                onchange="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入内容"
              ></el-input>-->
              <el-input-number
                size="medium"
                style="width: 105px;margin-left: 3px;"
                v-model="inputcopti"
                @blur="calculate(4)"
                :min="1"
                :disabled="someday"
                :max="10000000000"
                controls-position="right"
              ></el-input-number>
              <span style="margin-left: 3px;">次后</span>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="drepetitionvalue = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="drepetitionvalues">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import relatedFile from "./relatedFile";
import surveyTool from "./surveyTool";
import dynamicTask from "./dynamicTask";
// import associatedContent from './associatedContent'
import Editor from "@/components/select_box/Editor6";
import Editor2 from "@/components/select_box/Editor7";
export default {
  props: ["flageditor", "states", "Editthe"],
  components: {
    relatedFile,
    surveyTool,
    Editor,
    Editor2,
    dynamicTask
  },
  data() {
    return {
      //开始
      oldItem:[],
      Accessval:"",
      taskTplRepeId: "",
      startTimeinfo: "",
      endTimeinfo: "",
      cstomizedWeek: "",
      startTimeinfos: "",
      endTimeinfos: "",
      weekNumis: "",
      weekNums: "",
      addinfo:true,
      variableId: "",
      weekday: "",
      checked: false,
      definedtime: [],
      taksTplRepetitionPeriodinfo: "",
      definedtimealue: "",
      taksTplRepetitionPeriod: {
        repetitionPeriod: null
      },
      plusstartTimeinfo: [
        {
          value: "-",
          label: "-"
        },
        {
          value: "+",
          label: "+"
        }
      ],
      naturalstartTimeinfo: [
        {
          value: "自然日",
          label: "自然日"
        },
        {
          value: "工作日",
          label: "工作日"
        }
      ],
      filtersweek: [
        {
          value: "1",
          label: "一"
        },
        {
          value: "2",
          label: "二"
        },
        {
          value: "3",
          label: "三"
        },
        {
          value: "4",
          label: "四"
        },
        {
          value: "5",
          label: "五"
        },
        {
          value: "6",
          label: "六"
        },
        {
          value: "0",
          label: "日"
        }
      ],
      naturalstartTimevalue: "工作日",
      plusstartTimeinfovalue: "-",
      plusstartinput: 5,
      plusendTimeinfo: [
        {
          value: "+",
          label: "+"
        },
        {
          value: "-",
          label: "-"
        }
      ],
      naturalendTimeinfo: [
        {
          value: "自然日",
          label: "自然日"
        },
        {
          value: "工作日",
          label: "工作日"
        }
      ],
      labelinfo: "",
      naturalendTimevalue: "+",
      plusstendinfovalue: "自然日",
      plusendinput: 5,
      repetition: [],
      repetitionvalue: "不重复",
      drepetitionvalue: false,
      infoweek: ["一", "二", "三", "四", "五", "六", "日"],
      addnum: 0,
      frequency: ["天", "周", "个月", "年"],
      frequencyvalue: "天",
      frequencoptions: [],
      frequencoptionsvalue: "",
      frequenge: false,
      frequenz: false,
      frequencopti: false,
      radio: "1",
      copti: "",
      inputcopti: 1,
      Customdisableis: false,
      isCustomdisableis: false,
      Wirelessrepeat: true,
      someday: true,
      repetition: false,
      repetitioncs: "",
      // 截止
      flag: false,
      flags: false,
      addsonrenwu: false,
      inputadd: "",
      TaskIDarr: [],
      spans: [],
      name: "",
      Empty: {},
      content: "",
      html2: "",
      sonTasklist: "",
      typeshow: "info",
      msg: "",
      msgs: "",
      iscenetrs: false,
      showSontasks: false,
      zirenwushow: false,
      addSontasks: true,
      inputson: "",
      showInput: true,
      //showSpan:false,
      savetasks: true,
      changeWindoweditor: this.changeWindoweditor,
      dialogTableVisible: false,
      dialogFormVisible: true,
      formLabelWidth: "120px",
      //注意事项的给子组件传值
      attionData: "",
      //相关文件的给子组件传值
      relatedData: "",
      //关联内容的给子组件传值
      associatData: "",
      //调查工具的给子组件传值
      surveyData: "",
      //任务动态的给子组件传值
      dynamicData: "",
      form: {
        name: "",
        content: "",
        startTime: "", //开始时间
        endTime: "", //结束时间
        remindType: 0, //任务提醒
        remindVay: [], //提醒方式
        priority: "普通", //优先级
        executorName: "", //执行人名称
        ccpeopleName: "", //抄送人名称
        sonTasks: "", //子任务
        valueTimes: ""
      },
      executor: [
        {
          name: ""
        }
      ], //执行人
      ccpeople: [
        {
          name: ""
        }
      ], //抄送人
      options: [
        {
          value: "0",
          label: "普通"
        },
        {
          value: "1",
          label: "紧急"
        },
        {
          value: "2",
          label: "非常紧急"
        }
      ],
      value: "普通",
      label: 0,
      rightName: "one",
      dyc: "",
      inputshow: [],
      changes: { state: 0 },
      con2: true,
      mbid: "",
      con1: false,
      contents: "",
      con3: true,
      con4: false,
      // token:"String",
      // userId:"123",
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userName,
      //提醒方式
      remindoption: [
        {
          value: 0,
          label: "不提醒"
        },
        {
          value: 1,
          label: "截止前15分钟"
        },
        {
          value: 2,
          label: "截止前1小时"
        },
        {
          value: 3,
          label: "截止前3小时"
        },
        {
          value: 4,
          label: "截止前1天"
        },
        {
          value: 5,
          label: "开始前一天"
        },
        {
          value: 6,
          label: "开始时"
        },
        {
          value: 7,
          label: "完成时"
        }
      ],
      checkedCities: [0],
      cities: [
        {
          name: "站内信",
          id: 0
        }
      ],
      isShowRemind: false
    };
  },
  watch: {
    states(val) {
      this.changeWindoweditor = val;
    },
    Editthe(val) {
      this.comonm(val);
      this.secxtime();
      var ids = val.id;
      if (val.parents != undefined) {
        this.the_alllist(val.parents);
      }
      this.mbid = ids;
      this.name = val.name;
      if (val.content != null || val.content != "") {
        this.html2 = val.content;
        this.contents = val.content;
      } else {
        this.html2 = "";
        this.contents = "";
      }

      if (val.priority == 0) {
        this.label = 0;
        this.value = "普通";
      } else if (val.priority == 1) {
        this.label = 1;
        this.value = "紧急";
      } else {
        this.label = 2;
        this.value = "非常紧急";
      }
      if (val.notice != null || val.notice != "") {
        this.msg = val.notice;
        this.msgs = val.notice;
      } else {
        this.msg = "";
        this.msgs = "";
      }
      // 取交集处理：当前后台配置+站内信 与 新建时配置
      let arr = val.remindVay.split(",").map(Number);
      let citiesArr = this.cities.map(item => {
        return item.id;
      });
      this.checkedCities = Array.from(
        new Set(citiesArr.filter(x => new Set(arr).has(x)))
      );
      this.form.remindType = val.remindType;
      // this.isShowRemind = val.remindType != 0;
      if(val.remindType == 0 && val.taskTplRepetitionPeriod == null){
        this.isShowRemind = false
      }else{
         this.isShowRemind = true
      }

      this.sonTasklist = val.childTaskList;
    },
    startTimeinfo(val) {
      val == null || val == "" ? this.selemrer() : this.startpicker();
      // if (val.length == 19) {
      //   this.repetitionvalue = "不重复";
      //   this.taksTplRepetitionPeriod = {
      //     repetitionPeriod: null
      //   };
      // }
    }
  },
  mounted() {
    this.$watch("mbid", function(newValue, oldValue) {
      this.mbid = newValue;
    });
    //开始
    var myDate = new Date();
    // this.startTimeinfo = this.gettime("1");
    // this.endTimeinfo = this.gettime("2");
    // this.getrepetition(new Date()); //默认重复周期开始时间
    this.selemrer();
    this.copti = this.gettime("3").substring(0,10);
    // 截止
    this.getPromptType();
  },
  methods: {
    // 获取通知方式
    getPromptType() {
      this.$post("/sys/getNoticeWayConfig")
        .then(res => {
          if (this.code.codeNum.SUCCESS == res.code) {
            res.data.email == 1 && this.cities.push({ name: "邮件", id: 1 });
            res.data.sms == 1 && this.cities.push({ name: "短信", id: 2 });
            return;
          }
          this.$message.error("通知方式获取失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
    rwtx() {
      // this.isShowRemind = this.form.remindType != 0;
      if(this.form.remindType == 0 && (this.repetitionvalue == 0 || this.repetitionvalue == '不重复')){
         this.isShowRemind = false
       }else{
         this.isShowRemind = true
       }
      if (this.form.remindType == 0) {
        this.checkedCities = [0];
      }
    },
    // 开始
    selemrer() {
      this.repetition = [
        {
          value: "6",
          label: "不重复"
        },
        {
          value: "0",
          label: "每天"
        },
        {
          value: "4",
          label: "自定义"
        }
      ];
    },
    secxtime() {
      //时间变量接口
      var data = {
        token: this.token,
        userId: this.userId,
        data: {}
      };
      this.$post("/info/timeVar/findUsingList", data)
        .then(response => {
          this.definedtime = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    startpicker(item) {
      // 选择开始时间 重复周期时间变动
      if (item == 1) {
        this.repetitionvalue = "不重复";
      }
      this.getrepetition(new Date(this.startTimeinfo));
      this.taksTplRepetitionPeriod = {
        repetitionPeriod: null
      };
    },
    getrepetition(myDate) {
      // 重复周期下拉处理
      var day;
      this.filtersweek.filter(x => {
        if (Number(x.value) == myDate.getDay()) {
          day = x.label;
        }
      });
      this.weekday = myDate.getDay();
      this.repetition = [
        {
          value: "6",
          label: "不重复"
        },
        {
          value: "0",
          label: "每天"
        },
        {
          value: "1",
          label: "每周星期" + day
        },
        {
          value: "2",
          label: "每月第" + Math.ceil(myDate.getDate() / 7) + "个星期" + day
        },
        {
          value: "3",
          label:
            "每年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日"
        },
        {
          value: "4",
          label: "自定义"
        }
      ];
    },
    Customdisable() {
      // 自定义时间 时间、重复周期处理
      if (this.checked) {
        this.plusstartTimeinfovalue = "-";
        this.plusstartinput = 5;
        this.naturalstartTimevalue = "工作日";
        this.naturalendTimevalue = "+";
        // this.naturalstartTimevalue = "自然日";
        this.plusendinput = 5;
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
        this.secxtime();
      } else {
        this.definedtimealue = "";
        this.plusstartTimeinfovalue = "";
        this.plusstartinput = "";
        this.naturalstartTimevalue = "";
        this.naturalendTimevalue = "";
        this.naturalstartTimevalue = "";
        this.plusendinput = "";
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      }
      this.selemrer();
      this.addnum = 1;
      this.frequencyvalue = "天";
      this.radio = "1";
      this.frequencopti = false;
      this.frequenge = false;
      this.frequenz = false;
      this.checked
        ? (this.isCustomdisableis = true)
        : (this.isCustomdisableis = false);
      this.checked
        ? (this.Customdisableis = true)
        : (this.Customdisableis = false);
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      // this.checked
      //   ? (this.startTimeinfo = "")
      //   : (this.startTimeinfo = this.gettime("1"));
      // this.checked
      //   ? (this.endTimeinfo = "")
      //   : (this.endTimeinfo = this.gettime("2"));
      // this.checked
      //   ? (this.repetition = [
      //       {
      //         value: "6",
      //         label: "不重复"
      //       },
      //       {
      //         value: "0",
      //         label: "每天"
      //       },
      //       {
      //         value: "4",
      //         label: "自定义"
      //       }
      //     ])
      //   : this.startpicker();
    },
    gettime(ts) {
      //公共时间处理方法
      var ms, ds, hs, fs, ss, times, date;
      ts.length == 1
        ? (date = new Date().getTime())
        : (date = new Date(ts).getTime());
      var time = new Date(date);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var f = time.getMinutes();
      var s = time.getSeconds();
      m < 10 ? (ms = "0" + m) : (ms = m);
      d < 10 ? (ds = "0" + d) : (ds = d);
      h < 10 ? (hs = "0" + h) : (hs = h);
      f < 10 ? (fs = "0" + f) : (fs = f);
      s < 10 ? (ss = "0" + s) : (ss = s);
      if (ts == 1) {
        hs = h + 1;
      }
      if (ts == 2) {
        hs = h + 2;
      }
      ts == 1 || 2 ? (fs = "00") : f < 10 ? (fs = "0" + f) : (fs = f);
      ts == 1 || 2 ? (ss = "00") : s < 10 ? (ss = "0" + s) : (ss = s);
      return (times = y + "-" + ms + "-" + ds + " " + hs + ":" + fs + ":" + ss);
    },
    selerepetition(item) {
      var item = this.repetition[this.repetitionvalue];
      if(item.value != "4"){
          item.index = this.repetitionvalue
          this.oldItem = [...[item]]
      }
      if (item.value == "0") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "1"
        };
      } else if (item.value == "1") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "2",
          week: this.weekday == 0 ? 7 : this.weekday
        };
      } else if (item.value == "2") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "3",
          weekNum: item.label.substring(3, 4),
          week: this.weekday == 0 ? 7 : this.weekday
        };
      } else if (item.value == "3") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: "4"
        };
      } else if (item.value == "4") {
        this.drepetitionvalue = true;
      } else if (item.value == "6") {
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      } else {
        if (item.value == "ok") {
          this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriodinfo;
        } else {
          this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriod;
        }
      }
      this.taksTplRepetitionPeriod = this.taksTplRepetitionPeriod;
       if(this.form.remindType == 0 && (this.repetitionvalue == 0 || this.repetitionvalue == '不重复')){
         this.isShowRemind = false
       }else{
         this.isShowRemind = true
       }
       if(this.addinfo){
         var val= this.Accessval
          this.Access(val)
          this.addinfo = false
       }else{
         var val ={
            taskTplRepetitionPeriod:this.taksTplRepetitionPeriod
         }
         this.Access(val)
       }
       setTimeout(()=>{
              var weekdemo = this.$refs.weektimeclick;
              for (let i = 0; i < weekdemo.length; i++) {
                weekdemo[i].style.background = "";
                weekdemo[i].style.color = "black";
              }
              this.comonmval.forEach((ele,index)=>{
                weekdemo.forEach((el,idx)=>{
                  if(Number(ele -1) == idx){
                    console.log(el)
                    el.style.background = "#3396fa"
                    el.style.color = "white";
                  }
                })
              })
          })
    },
    finishtime() {
      if (this.radio == 1) {
        this.Wirelessrepeat = true;
        this.someday = true;
      } else if (this.radio == 2) {
        this.Wirelessrepeat = false;
        this.someday = true;
      } else {
        this.Wirelessrepeat = true;
        this.someday = false;
      }
    },
    isopen() {},
    frequen() {
      var myDate = new Date(this.startTimeinfo);
      if (this.frequencyvalue == "天") {
        this.frequenge = false;
        this.frequenz = false;
        this.frequencopti = false;
      } else if (this.frequencyvalue == "周") {
        this.frequenge = true;
        this.frequenz = false;
        this.frequencopti = true;
        var weekdemo = this.$refs.weektimeclick;
        for (let i = 0; i < weekdemo.length; i++) {
          weekdemo[i].style.background = "";
          weekdemo[i].style.color = "black";
        }
        this.$refs.weektimeclick[0].style.background = "#3396fa";
        this.$refs.weektimeclick[0].style.color = "white";
        this.$forceUpdate();
      } else if (this.frequencyvalue == "个月") {
        this.frequenge = false;
        this.frequenz = true;
        this.frequencopti = true;
      } else {
        this.repetitioncs = 5;
        this.frequenge = false;
        this.frequenz = false;
        this.frequencopti = false;
      }

      var day;
      this.filtersweek.filter(x => {
        if (Number(x.value) == myDate.getDay()) {
          day = x.label;
        }
      });
      day = this.startTimeinfo == "" || this.startTimeinfo == null ? "x" : day;
      var mode =
        this.startTimeinfo == "" || this.startTimeinfo == null
          ? "x"
          : Math.ceil(myDate.getDate() / 7);
      var date =
        this.startTimeinfo == "" || this.startTimeinfo == null
          ? "x"
          : myDate.getDate();
      this.frequencoptions = [
        {
          value: "0",
          label: "每月第" + date + "天"
        },
        {
          value: "1",
          label: "每月第" + mode + "个星期" + day
        }
      ];
    },
    weektimeclick(index) {
      if (
        this.$refs.weektimeclick[index].style.background ==
          "rgb(245, 245, 245)" ||
        this.$refs.weektimeclick[index].style.background == ""
      ) {
        this.$refs.weektimeclick[index].style.background = "#3396fa";
        this.$refs.weektimeclick[index].style.color = "white";
      } else {
        if (this.weekciclk()) {
          return;
        }
        this.$refs.weektimeclick[index].style.background = "#f5f5f5";
        this.$refs.weektimeclick[index].style.color = "black";
      }
    },
    weekciclk() {
      var weekdemo = this.$refs.weektimeclick;
      var weekarr = [];
      for (let i = 0; i < weekdemo.length; i++) {
        if (weekdemo[i].style.color == "white") {
          weekarr.push(weekdemo[i]);
        }
      }
      if (weekarr.length == 1) {
        this.$message.error("请选择重复时间");
        return weekarr.length;
      }
    },
    drepetitionvalues() {
      var addnum = this.addnum == 1 ? "" : this.addnum;
      var label;
      var taksTplRepetitionPeriod;
      var repetitioncs;
      if (this.frequencyvalue == "天") {
        // 天
        repetitioncs = 1;
        if (this.radio == 1) {
          label = "每" + addnum + "天";
        } else if (this.radio == 2) {
          label = "每" + addnum + "天到" + this.copti + "结束";
        } else {
          label = "每" + addnum + "天，重复" + this.inputcopti + "次";
        }
      } else if (this.frequencyvalue == "周") {
        // 周
        repetitioncs = 2;
        var week = "",
          cstomizedWeek = "";
        for (let index = 0; index < this.$refs.weektimeclick.length; index++) {
          if (this.$refs.weektimeclick[index].style.background != "" && this.$refs.weektimeclick[index].style.background != "rgb(245, 245, 245)") {
            week += "星期" + this.$refs.weektimeclick[index].innerText + ",";
            cstomizedWeek += index + 1 + ",";
          }
        }
        cstomizedWeek = cstomizedWeek.substring(
          0,
          cstomizedWeek.lastIndexOf(",")
        );
        if (this.radio == 1) {
          label =
            "每" + addnum + "周的" + week.substring(0, week.lastIndexOf(","));
        } else if (this.radio == 2) {
          label =
            "每" +
            addnum +
            "周的" +
            week.substring(0, week.lastIndexOf(",")) +
            this.copti +
            "结束";
        } else {
          label =
            "每" +
            addnum +
            "周的" +
            week.substring(0, week.lastIndexOf(",")) +
            "，重复" +
            this.inputcopti +
            "次";
        }
      } else if (this.frequencyvalue == "个月") {
        // 个月
        var item = this.frequencoptions[this.frequencoptionsvalue];
        if (item == undefined) {
          this.$message.error("请选择重复时间");
          return;
        }
        if (this.frequencoptionsvalue == 0) {
          repetitioncs = 3;
          var days;
          if (new RegExp("[0-9]").test(item.label)) {
            days = item.label.replace(/[^0-9]/gi, "");
          } else {
            days = item.label.substring(3, 5);
          }
          repetitioncs = 3;
          if (this.radio == 1) {
            label = "每" + addnum + "月的第" + days;
          } else if (this.radio == 2) {
            label = "每" + addnum + "月的第" + days+"到" + this.copti + "结束";
          } else {
            label = "每" + addnum + "月的第" + days+",重复" + this.inputcopti + "次";
          }
          console.log(label);
        } else {
          repetitioncs = 4;
          if (this.radio == 1) {
            if(this.addnum == 1){
              label = item.label;
            }else{
              label="每" + addnum +"月"+item.label.substring(2,8)
            }
          } else if (this.radio == 2) {
            label = "每" + addnum +"月"+item.label.substring(2,8)+"到" + this.copti + "结束";
          } else {
            label ="每" + addnum +"月"+item.label.substring(2,8)+",重复" + this.inputcopti + "次";
          }
          var weekNums, weekNumis;
          weekNums = item.label.substring(3, 4);
          var day;
          var myDate = new Date();
          weekNumis =
            item.label.substring(7) == 0 ? 7 : item.label.substring(7);
          this.filtersweek.filter(x => {
            if (x.label == weekNumis) {
              weekNumis = x.value;
            }
          });
          weekNumis = weekNumis == 0 ? 7 : weekNumis;
        }
      } else {
        //年
        repetitioncs = 5;
        if (this.radio == 1) {
          label = "每" + addnum + "年";
        } else if (this.radio == 2) {
          label = "每" + addnum + "年" + "到" + this.copti + "结束";
        } else {
          label = "每" + addnum + "年,重复" + this.inputcopti + "次";
        }
      }
      if (
        this.repetition.length ==
        (this.startTimeinfo == "" || this.startTimeinfo == null ? 3 : 6)
      ) {
        this.repetition.push({
          value: "5",
          label: label
        });
      } else {
        this.repetition[
          this.startTimeinfo == "" || this.startTimeinfo == null ? 3 : 6
        ].label = label;
      }
      var repetitionEndTypeisi = this.copti,
        isrepetitionEndType = this.inputcopti;
      if (this.radio == "1") {
        repetitionEndTypeisi = "";
        isrepetitionEndType = "";
      } else if (this.radio == "2") {
        isrepetitionEndType = "";
      } else {
        repetitionEndTypeisi = "";
      }
      var taksTplRepetitionPeriod;
      taksTplRepetitionPeriod = {
        repetitionPeriod: 5, // 重复周期(1:每天,2:每周几,3:每月第几周,4:每年,5:自定义)",
        weekNum: weekNums == "x" ? "" : weekNums,
        week: weekNumis == "x" ? "" : weekNumis,
        customized: repetitioncs, //"自定义重复周期(0:默认,1:天,2:周,3:每月第几天,4:每月第几周,5每年)"
        repetitionFrequency: this.addnum,
        repetitionEndType: this.radio - 1, //"结束类型（0:无限重复,1:终止于某天,2:重复次数）",
        repetitionEndTime:repetitionEndTypeisi == ''?'': repetitionEndTypeisi+' '+'00:00:00',
        repetitionNum: isrepetitionEndType, //"重复次数",
        customizedWeek: cstomizedWeek // "自定义周几（1,2。1到7“逗号”拼接）",
      };
      this.taksTplRepetitionPeriod = taksTplRepetitionPeriod;
      this.drepetitionvalue = false;
      this.labelinfo = label;
      this.oldItem = [...[{
        value:5,
        label:label,
      }]]
      this.repetitionvalue = label;
    },
    inputcheck(index) {
      if (index == 1) {
      } else if (index == 2) {
      }
    },
    petitionvalueclose() {
      // this.labelinfo == this.repetitionvalue
      //   ? (this.repetitionvalue = this.labelinfo)
      //   : (this.repetitionvalue = "不重复");
      var val = this.oldItem
      if(val == ''){
        this.repetitionvalue = "不重复"
        this.taksTplRepetitionPeriod = {
          repetitionPeriod: null
        };
      }else{
          this.repetitionvalue = val[0].label
      }
      if(this.addinfo){
        this.addnum = 1;
        this.frequencyvalue = "天";
        this.radio = "1";
        this.frequencopti = false;
        this.frequenge = false;
        this.frequenz = false;
        this.someday = true;
      }

    },
    calculate(index) {
      var plusstartinput, plusendinput, addnum, inputcopti;
      switch (index) {
        case 1:
          this.plusstartinput = /[^\d]/g.test(this.plusstartinput)
            ? 1
            : this.plusstartinput;
          break;
        case 2:
          this.plusendinput = /[^\d]/g.test(this.plusendinput)
            ? 1
            : this.plusendinput;
          break;
        case 3:
          if (!/^[0-9]*[1-9][0-9]*$/.test(this.addnum)) {
            this.addnum = 1;
          }
          break;
        case 4:
          if (!/^[0-9]*[1-9][0-9]*$/.test(this.inputcopti)) {
            this.inputcopti = 1;
          }
          break;
        case 5:
          break;
      }
    },
    Access(val){
      var val= val
      console.log(val)
      if(val.taskTplRepetitionPeriod != null){
        if(val.taskTplRepetitionPeriod.repetitionPeriod == 5){
          this.addnum = val.taskTplRepetitionPeriod.repetitionFrequency
          this.copti = val.taskTplRepetitionPeriod.repetitionEndTime == ''||val.taskTplRepetitionPeriod.repetitionEndTime == null ?this.gettime("3").substring(0,10):val.taskTplRepetitionPeriod.repetitionEndTime.substring(0,10)
          this.inputcopti = val.taskTplRepetitionPeriod.repetitionNum
          var day , getmode , getday
          var time = new Date(val.startTime)
          if(val.startTime == ''|| val.startTime == null){
            day = 'x',getmode = 'x',getday = 'x'
          }else{
            getday = time.getDate() ,getmode = Math.ceil(time.getDate()/7) ,day = time.getDay()
          }
            if(day != 'x'){
              this.filtersweek.filter(x => {
                if (Number(x.value) == day ) {
                  day = x.label;
                }
            });
            }
          if(val.taskTplRepetitionPeriod.customized == 1){
            this.frequencyvalue = '天'
            this.frequencopti = false
            this.frequenge = false
            this.frequenz = false
          }else if(val.taskTplRepetitionPeriod.customized == 2){
            this.frequencyvalue = '周'
            this.frequencopti = true
            this.frequenge = true
            this.frequenz = false
            this.comonmval =(val.taskTplRepetitionPeriod.customizedWeek).split(',')
          }else if(val.taskTplRepetitionPeriod.customized == 3){
            this.frequencyvalue = '个月'
            this.frequencopti = true
            this.frequenge = false
            this.frequenz = true
            this.frequencoptionsvalue='0'
          }else if(val.taskTplRepetitionPeriod.customized == 4){
            this.frequencyvalue = '个月'
            this.frequencopti = true
            this.frequenge = false
            this.frequenz = true
            this.frequencoptionsvalue='1'
          }else if(val.taskTplRepetitionPeriod.customized == 5){
            this.frequencyvalue = '年'
            this.frequencopti = false
            this.frequenge = false
            this.frequenz = false
          }
          this.addnum = val.taskTplRepetitionPeriod.repetitionFrequency
          this.radio = (val.taskTplRepetitionPeriod.repetitionEndType + 1).toString()
          if(val.taskTplRepetitionPeriod.repetitionEndType == 0){
            this.someday = true
            this.Wirelessrepeat = true
          }else if(val.taskTplRepetitionPeriod.repetitionEndType == 1){
            this.someday = true
            this.Wirelessrepeat = false
          }else if(val.taskTplRepetitionPeriod.repetitionEndType == 2){
            this.someday = false
            this.Wirelessrepeat = true
          }
          this.frequencoptions = [
              {
                value: "0",
                label: "每月第" + getday + "天"
              },
              {
                value: "1",
                label: "每月第" + getmode + "个星期" + day
              }
            ];
        }else{
          this.addnum = 1;
          this.frequencyvalue = "天";
          this.radio = "1";
          this.frequencopti = false;
          this.frequenge = false;
          this.frequenz = false;
          this.Wirelessrepeat = true;
          this.someday = true;
        }
      }else{
          this.addnum = 1;
          this.frequencyvalue = "天";
          this.radio = "1";
          this.frequencopti = false;
          this.frequenge = false;
          this.frequenz = false;
          this.Wirelessrepeat = true;
          this.someday = true;
      }
    },
    comonm(val) {
      // 判断是否有自定义时间
      this.Accessval = val
      if (val.customized == 1) {
        this.checked = true;
        this.Customdisableis = true;
        if (val.startDayNum < 0) {
          this.plusstartTimeinfovalue = "-";
          this.plusstartinput = Math.abs(val.startDayNum);
        } else {
          this.plusstartTimeinfovalue = "+";
          this.plusstartinput = val.startDayNum;
        }
        this.naturalstartTimevalue =
          val.startDayType == 0 ? "自然日" : "工作日";
        if (val.endDayNum < 0) {
          this.naturalendTimevalue = "-";
          this.plusendinput = Math.abs(val.endDayNum);
        } else {
          this.naturalendTimevalue = "+";
          this.plusendinput = val.endDayNum;
        }
        this.naturalstartTimevalue =
          val.startDayType == 0 ? "自然日" : "工作日";
        this.isCustomdisableis = true;
      } else {
        this.isCustomdisableis = false;
        this.checked = false;
        this.Customdisableis = false;
        this.definedtime = "";
      }
      this.definedtimealue = val.variableName;
      this.variableId = val.variableId;
      //开始回显
      this.taksTplRepetitionPeriod = "";
      if (val.taskTplRepetitionPeriod == null) {
        this.repetitionvalue = "不重复";
        this.taksTplRepetitionPeriod = null;
        this.startTimeinfo = "";
      } else {
        this.taskTplRepeId = val.taskTplRepetitionPeriod.id;
        console.log(this.taskTplRepeId);
        if (val.taskTplRepetitionPeriod.repetitionPeriod == 1) {
          this.repetitionvalue = "每天";
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 2) {
          var day;
          this.filtersweek.filter(x => {
            if (Number(x.value) == val.taskTplRepetitionPeriod.week) {
              day = x.label;
              return day;
            }
          });
          this.repetitionvalue = "每周星期" + day;
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 3) {
          var day;
          this.filtersweek.filter(x => {
            if (Number(x.value) == val.taskTplRepetitionPeriod.week) {
              day = x.label;
              return day;
            }
          });
          this.repetitionvalue =
            "每月第" + val.taskTplRepetitionPeriod.weekNum + "星期" + day;
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 4) {
          this.repetitionvalue =
            "每年" +
            val.taskTplRepetitionPeriod.repetitionDate.substring(5, 10) +
            "日";
        } else if (val.taskTplRepetitionPeriod.repetitionPeriod == 5) {
          // 自定义时间的情况

          if (val.taskTplRepetitionPeriod.customized == 1) {
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每天";
            } else {
              this.repetitionvalue =
                "每" + val.taskTplRepetitionPeriod.repetitionFrequency + "天";
            }
          } else if (val.taskTplRepetitionPeriod.customized == 2) {
            var arrweek = val.taskTplRepetitionPeriod.customizedWeek.split(",");
            var days = "";
            arrweek.forEach((ele, index) => {
              if (ele == 7) {
                arrweek[index] = 0;
              }
            });
            for (let i = 0; i < arrweek.length; i++) {
              this.filtersweek.filter(x => {
                if (Number(x.value) == Number(arrweek[i])) {
                  days += "星期" + x.label + ",";
                }
              });
            }
            // this.repetitionvalue = days;
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每周" + days;
            } else {
              this.repetitionvalue =
                "每" +
                val.taskTplRepetitionPeriod.repetitionFrequency +
                "周" +
                days;
            }
          } else if (val.taskTplRepetitionPeriod.customized == 3) {
               if(val.taskTplRepetitionPeriod.repetitionFrequency == 1){
               this.repetitionvalue = "每月第x天";
              }else{
                this.repetitionvalue =
                "每"+val.taskTplRepetitionPeriod.repetitionFrequency+"月第x天";
              }
          } else if (val.taskTplRepetitionPeriod.customized == 4) {

              if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
                 this.repetitionvalue = "每月第x个星期第x天";
            } else {
               this.repetitionvalue =
                "每"+val.taskTplRepetitionPeriod.repetitionFrequency+"月第x个星期第x天"
            }
          } else if (val.taskTplRepetitionPeriod.customized == 5) {
            if (val.taskTplRepetitionPeriod.repetitionFrequency == 1) {
              this.repetitionvalue = "每年";
            } else {
              this.repetitionvalue =
                "每" + val.taskTplRepetitionPeriod.repetitionFrequency + "年";
            }
          }
          if (val.taskTplRepetitionPeriod.repetitionEndType == 1) {
            this.repetitionvalue =
              this.repetitionvalue +
              "到" +
              val.taskTplRepetitionPeriod.repetitionEndTime.substring(0,10);
          } else if (val.taskTplRepetitionPeriod.repetitionEndType == 2) {
            this.repetitionvalue =
              this.repetitionvalue +
              ",重复" +
              val.taskTplRepetitionPeriod.repetitionNum +
              "次";
          }
          this.taksTplRepetitionPeriodinfo = val.taskTplRepetitionPeriod;
          val.taskTplRepetitionPeriod.repetitionDate != null
            ? this.startpicker()
            : this.selemrer();
          setTimeout(() => {
            this.repetition.push({
              value: "ok",
              label: this.repetitionvalue
            });
          });
        }
        setTimeout(() => {
          if (val.taskTplRepetitionPeriod.repetitionPeriod != 5) {
            if (this.repetition[this.repetition.length - 1].value == "ok") {
              this.repetition.splice(this.repetition.length, 1);
            }
          }
        }, 10);
        this.oldItem = [
          {
            label:this.repetitionvalue
          }
        ]
        this.taksTplRepetitionPeriod = val.taskTplRepetitionPeriod;
        //回显时间
        if (val.taskTplRepetitionPeriod.repetitionDate != null) {
          this.startTimeinfo = val.taskTplRepetitionPeriod.repetitionDate;
        }
      }
    },
    // 截止
    the_alllist(parents) {
      this.TaskIDarr = parents;
      var TaskID = parents.reverse();

      var spans = [];
      for (let i = 0; i < TaskID.length; i++) {
        if (TaskID[i].name.length >= 9) {
          TaskID[i].isname = TaskID[i].name.substring(0, 9) + "...";
        } else {
          TaskID[i].isname = TaskID[i].name;
        }
        spans.push(TaskID[i]);
      }
      if (spans.length > 3) {
        var isarr = [
          {
            isname: "...",
            id: "999999999"
          }
        ];
        this.spans = isarr.concat(
          spans
            .reverse()
            .slice(0, 3)
            .reverse()
        );
        var oldArr = parents;
        this.TaskIDarr = oldArr.splice(0, oldArr.length - 3);
      } else {
        this.spans = spans;
      }
      console.log(this.TaskIDarr);
    },
    the_all(item) {
      window.closeUploadDialog && window.closeUploadDialog()
      if (item.id == "999999999") {
        this.iscenetrs = true;
      } else {
        this.iscenetrs = false;
        this.gx(item);
      }
    },
    the_alls() {
      this.iscenetrs = false;
    },
    htmls(val) {
      this.msgs = val;
    },
    htmls2(val) {
      this.contents = val;
    },
    bodys(val) {
      console.log(val);
    },
    wxlh(item) {
      window.closeUploadDialog && window.closeUploadDialog()
      this.rightName = "one";
      this.bc(item);
    },
    bc(item) {
      var variableId;
      var startOperator,
        startDayNum,
        startDayType,
        endOperator,
        endDayNum,
        endDayType;
      if (!this.checked) {
        startOperator = "";
        startDayNum = "";
        startDayType = "";
        endOperator = "";
        endDayNum = "";
        endDayType = "";
      } else {
        if (typeof this.definedtimealue != "number" && this.variableId == "") {
          this.$message({
            type: "error",
            message: "请选择时间变量"
          });
          return;
        }
        if (this.plusstartinput == "" || this.plusendinput == "") {
          this.$message.error("请输入数字");
          return;
        }
        if (typeof this.definedtimealue != "string") {
          variableId = this.definedtime[this.definedtimealue].id;
        } else {
          variableId = this.variableId == "" ? variableId : this.variableId;
        }
        variableId = this.variableId == "" ? variableId : this.variableId;
        (startDayNum = this.plusstartTimeinfovalue + this.plusstartinput),
          (startDayType = this.naturalstartTimevalue == "工作日" ? 1 : 0);
        (endDayNum = this.naturalendTimevalue + this.plusendinput),
          (endDayType = this.plusstendinfovalue == "自然日" ? 0 : 1);
        // if (Number(endDayNum) < Number(startDayNum)) {
        //   this.$message({
        //     type: "error",
        //     message: "结束时间不能小于开始时间"
        //   });
        //   return;
        // }
      }
      var _this = this;
      let contents;
      if (_this.contents == "") {
        contents = null;
      } else {
        contents = _this.contents;
      }
      let notice;
      if (_this.msgs == "") {
        notice = null;
      } else {
        notice = _this.msgs;
      }
      console.log(this.startTimeinfo);
      if (this.taksTplRepetitionPeriod != null) {
        // this.taksTplRepetitionPeriod.repetitionDate =
        //   this.startTimeinfo == "" || this.startTimeinfo == null
        //     ? ""
        //     : this.gettime(this.startTimeinfo);
        this.taksTplRepetitionPeriod.id = this.taskTplRepeId;
        if (this.taksTplRepetitionPeriod.repetitionPeriod == null) {
          this.taksTplRepetitionPeriod = null;
        }
      }
      if (
        this.Editthe.taskTplRepetitionPeriod != null &&
        this.variableId == ""
      ) {
        this.taksTplRepetitionPeriod.id = this.Editthe.taskTplRepetitionPeriod.id;
        this.taksTplRepetitionPeriod.taskId = this.Editthe.taskTplRepetitionPeriod.taskId;
      }
      var data = {
        token: _this.token,
        userId: _this.userId,
        data: {
          id: item.parentId, //"任务id",
          name: this.name, //"任务名称"
          priority: this.label, //"优先级(0:普通、1:紧急、2:非常紧急，默认为0)",
          content: contents, //"任务内容",
          notice: notice, //"注意事项",
          customized: this.checked ? 1 : 0,
          variableId: variableId,
          remindIssuer: 0,
          remindVay: this.checkedCities.join(","), // 提醒方式
          remindType: this.form.remindType,
          // this.definedtimealue == ""
          //   ? ""
          //   : this.definedtime[this.definedtimealue].id, //"时间变量表id",,
          startDayNum: startDayNum, //"开始天数（正/负数）",
          startDayType: startDayType, //"开始时间的类型（0/1：自然日/工作日）",
          endDayNum: endDayNum, //"结束天数（正/负数）",
          endDayType: startDayType, // "结束时间的类型（0/1：自然日/工作日）"
          taskTplRepetitionPeriod: this.taksTplRepetitionPeriod
        }
      };
      this.$post("/info/taskTpl/updateTplTask", data)
        .then(response => {
          console.log(item);
          _this.gx(item);
          this.variableId == "";
          _this.changes = { state: 1 };
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gx(item) {
      this.Editthe.id = item.id;
      this.Editthe = item;
      this.form.remindType = 0;
      var str = {
        zhi: item.id
      };
      this.dyc = str;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          id: item.id
        }
      };
      this.mbid = item.id;
      var _this = this;
      this.$post("/info/taskTpl/getTplTaskDetail", data)
        .then(response => {
          // console.log(response.data.parents);
          _this.the_alllist(response.data.parents);
          _this.name = response.data.name;
          _this.sonTasklist = response.data.childTaskList;
          if (response.data.priority == 0) {
            _this.label = 0;
            _this.value = "普通";
          } else if (response.data.priority == 1) {
            _this.label = 1;
            _this.value = "紧急";
          } else {
            _this.label = 2;
            _this.value = "非常紧急";
          }
          if (response.data.notice != null) {
            _this.msg = response.data.notice;
            _this.msgs = response.data.notice;
          } else {
            _this.msg = "";
            _this.msgs = "";
          }
          if (response.data.content == null) {
            _this.html2 = "";
            _this.contents = "";
          } else {
            _this.html2 = response.data.content;
            _this.contents = response.data.content;
          }
          if(response.data.remindType == 0 && response.data.taskTplRepetitionPeriod == null){
            this.isShowRemind = false
          }else{
            this.isShowRemind = true
          }

          this.seldata(response);
          //开始回显
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seldatas() {
      this.variableId = "";
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.checked = false;
      this.repetitionvalue = "不重复";
      this.taksTplRepetitionPeriod = {
        repetitionPeriod: null
      };
      this.plusstartTimeinfovalue = "-";
      this.plusstartinput = "0";
      this.naturalstartTimevalue = "工作日";
      this.naturalendTimevalue = "+";
      this.naturalstartTimevalue = "自然日";
      this.plusendinput = "0";
      this.Customdisableis = false;
      this.isCustomdisableis = false;
    },
    seldata(response) {
      this.startTimeinfo = "";
      this.endTimeinfo = "";
      this.checked = false;
      this.repetitionvalue = "不重复";
      this.taksTplRepetitionPeriod = {
        repetitionPeriod: null
      };
      this.plusstartTimeinfovalue = "-";
      this.plusstartinput = "0";
      this.naturalstartTimevalue = "工作日";
      this.naturalendTimevalue = "+";
      this.naturalstartTimevalue = "自然日";
      this.plusendinput = "0";
      this.Customdisableis = false;
      this.comonm(response.data);
    },
    delects(item) {
      this.$confirm("是否删除" + item.name + "子任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              id: item.id,
              name: item.name
            }
          };
          var _this = this;
          this.$post("/info/taskTpl/delTplTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                var data = {
                  token: _this.token,
                  userId: _this.userId,
                  data: {
                    id: _this.mbid
                  }
                };
                _this
                  .$post("/info/taskTpl/getSubTplTask", data)
                  .then(response => {
                    _this.sonTasklist = response.data;
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    saveTasks1() {
      var variableId;
      var startOperator,
        startDayNum,
        startDayType,
        endOperator,
        endDayNum,
        endDayType;
      if (!this.checked) {
        startOperator = "";
        startDayNum = "";
        startDayType = "";
        endOperator = "";
        endDayNum = "";
        endDayType = "";
      } else {
        if (typeof this.definedtimealue != "number" && this.variableId == "") {
          this.$message({
            type: "error",
            message: "请选择时间变量"
          });
          return;
        }
        if (this.plusstartinput == "" || this.plusendinput == "") {
          this.$message.error("请输入数字");
          return;
        }
        if (typeof this.definedtimealue != "string") {
          variableId = this.definedtime[this.definedtimealue].id;
        } else {
          variableId = this.variableId == "" ? variableId : this.variableId;
        }
        (startDayNum = this.plusstartTimeinfovalue + this.plusstartinput),
          (startDayType = this.naturalstartTimevalue == "工作日" ? 1 : 0);
        (endDayNum = this.naturalendTimevalue + this.plusendinput),
          (endDayType = this.plusstendinfovalue == "自然日" ? 0 : 1);
        // if (Number(endDayNum) < Number(startDayNum)) {
        //   this.$message({
        //     type: "error",
        //     message: "结束时间不能小于开始时间"
        //   });
        //   return;
        // }
      }
      if (this.name == "") {
        this.$message({
          type: "error",
          message: "请输入任务名称"
        });
        return;
      }
      var _this = this;
      let contents;
      if (_this.contents == "") {
        contents = null;
      } else {
        contents = _this.contents;
      }
      let notice;
      if (_this.msgs == "") {
        notice = null;
      } else {
        notice = _this.msgs;
      }
      if (
        this.Editthe.taskTplRepetitionPeriod != null &&
        this.variableId == ""
      ) {
        this.taksTplRepetitionPeriod.id = this.Editthe.taskTplRepetitionPeriod.id;
        this.taksTplRepetitionPeriod.taskId = this.Editthe.taskTplRepetitionPeriod.taskId;
      }
      if (this.taksTplRepetitionPeriod != null) {
        // this.taksTplRepetitionPeriod.repetitionDate =
        //   this.startTimeinfo == "" || this.startTimeinfo == null
        //     ? ""
        //     : this.gettime(this.startTimeinfo);
        this.taksTplRepetitionPeriod.id = this.taskTplRepeId;
        if (this.taksTplRepetitionPeriod.repetitionPeriod == null) {
          this.taksTplRepetitionPeriod = null;
        }
      }
      console.log(this.checkedCities)
      var data = {
        token: _this.token,
        userId: _this.userId,
        data: {
          id: this.mbid, //"任务id",
          stageId: this.Editthe.stageId,
          typeId: this.Editthe.typeId,
          name: this.name, //"任务名称",
          parentId: this.Editthe.parentId,
          priority: this.label, //"优先级(0:普通、1:紧急、2:非常紧急，默认为0)",
          content: contents, //"任务内容",
          notice: notice, //"注意事项",
          remindIssuer: 0,
          customized: this.checked ? 1 : 0,
          variableId: variableId,
          remindType: this.form.remindType,
          remindVay: this.checkedCities.join(","), // 提醒方式
          // this.definedtimealue == ""
          //   ? ""
          //   : this.definedtime[this.definedtimealue].id, //"时间变量表id",,
          startDayNum: startDayNum, //"开始天数（正/负数）",
          startDayType: startDayType, //"开始时间的类型（0/1：自然日/工作日）",
          endDayNum: endDayNum, //"结束天数（正/负数）",
          endDayType: startDayType, // "结束时间的类型（0/1：自然日/工作日）"
          taskTplRepetitionPeriod: this.taksTplRepetitionPeriod
        }
      };
      this.$post("/info/taskTpl/updateTplTask", data)
        .then(response => {
          if (response.code == 0) {
            _this.$message({
              message: response.msg,
              type: "success"
            });
            this.variableId == "";
            _this.changeWindoweditor = false;
            _this.msgs = "";
            _this.contents = "";
            _this.$emit("changeWindoweditor", false);
          } else {
            _this.$message({
              message: response.msg,
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    Priority() {
      this.label = this.value;
    },
    rightClick(tab, event) {
      // console.log(this.$refs);
      if (tab.index == 0) {
        //返回的是一个vue对象，所以可以直接调用其方法
        // this.$refs.attionChild.attionlist();
        this.Empty = { Empty: 0 };
      } else if (tab.index == 1) {
        this.$refs.relateChild.listdata(this.mbid);
        this.Empty = { Empty: 0 };
      } else if (tab.index == 2) {
        this.$refs.surveyChild.surveylist(this.mbid);
        this.Empty = { Empty: 0 };
      } else {
        this.$refs.dynamicTask.activelist(this.mbid);
        this.Empty = { Empty: 1 };
      }
    },
    change(value) {
      window.closeUploadDialog && window.closeUploadDialog()
      this.changeWindoweditor = false;
      this.$emit("changeWindoweditor", 1);
      this.msg = "";
      this.changes = { state: 1 };
      this.rightName = "one";
      this.spans = [];
      this.iscenetrs = false;
      this.TaskIDarr = [];
      this.html2 = "";
      this.seldatas();
      this.addnum = 1;
      this.frequencyvalue = "天";
      this.radio = "1";
      this.frequencopti = false;
      this.frequenge = false;
      this.frequenz = false;
      this.someday = true;
      this.addinfo = true
      this.repetition.forEach((ele, index) => {
        if (ele.value == "ok") {
          this.repetition.splice(index, 1);
        }
      });
    },
    dialogFormVisibleqx() {
      this.changeWindoweditor = false;
      this.$emit("changeWindoweditor", false);
    },
    dialogFormVisibleqx1() {
      this.con1 = false;
      this.con2 = true;
      this.con3 = true;
      this.con4 = false;
      this.changeWindoweditor = false;
      this.$emit("changeWindoweditor", 1);
    },
    addsonTasks() {
      this.$prompt("请输入子任务名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,500}$/,
        inputErrorMessage: "最大长度为500字"
      })
        .then(({ value }) => {
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              parentId: this.mbid,
              name: value,
              stageId: this.Editthe.stageId,
              typeId: this.Editthe.typeId
            }
          };
          var _this = this;
          this.$post("/info/taskTpl/addTplTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                var data = {
                  token: _this.token,
                  userId: _this.userId,
                  data: {
                    id: _this.mbid
                  }
                };
                _this
                  .$post("/info/taskTpl/getSubTplTask", data)
                  .then(response => {
                    _this.sonTasklist = response.data;
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    tasksDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.closeUploadDialog && window.closeUploadDialog()
          var data = {
            token: this.token,
            userId: this.userId,
            data: {
              id: this.Editthe.id,
              name: this.name
            }
          };
          var _this = this;
          this.$post("/info/taskTpl/delTplTask", data)
            .then(response => {
              if (response.code == 0) {
                _this.$message({
                  message: response.msg,
                  type: "success"
                });
                _this.financingIds();
              } else {
                _this.$message({
                  message: response.msg,
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
              _this.changeWindoweditor = false;
              _this.$emit("changeWindoweditor", false);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edittask(row) {},
    saveTasks() {
      this.con1 = true;
      this.con2 = false;
      this.con3 = false;
      this.con4 = true;
    }
  }
};
</script>
<style scoped lang="scss">
.clearfix::before,.clearfix::after {
  display: none;
}
.left-content{
  width:54%;
  border-right: 1px solid #e8e8e8;
  padding-right:20px;
  margin-left: -34px;
  margin-top: 6px;
  height: 600px;
  overflow: hidden;
  .el-form-item{
    margin-bottom: 16px;
  }
}
//开始
.earthquake {
  width: 600px;
  margin-left: 2px;
  .block {
    width: 300px;
    float: left;
  }
}
.Customtime {
  margin-top: 9px;
  margin-left: -13px;
}
.custom {
  clear: both;
}
.seletime {
  margin-left: 131px;
  margin-top: 9px;
  margin-bottom: 10px;
}
.drept {
  margin-top: -8px;
}
.dreptto {
  margin-top: 53px;
  li {
    height: 46px;
    left: left;
    margin-left: 3px;
  }
}
.weektime {
  width: 29px;
  height: 29px;
  overflow: hidden;
  background: #f5f5f5;
  text-align: center;
  line-height: 25px;
  border-radius: 16px;
  cursor: pointer;
  float: left;
  margin-left: 7px;
  color: black;
}
.weektime:hover {
  background: #ebeef5;
}
@import "../../../../common/css/sheltersright.css";
.el-form-item__content .shelterPers,
.el-form-item__content .shekterAdd {
  position: relative;
  top: 7px;
  margin-right: 10px;
  cursor: pointer;
}
.el-form-item__label {
  text-align: left;
}

.baseMessage {
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
}
.sonShelters {
  width: 463px;
  height: auto;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
}
.sonShelters .el-checkbox__label {
  width: 94%;
}
.sonShelters .sonShelDiv {
  position: relative;
  top: 8px;
  width: 47%;
}
.sonShelters .sonShelDiv img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.sonShelters .sonShelDiv span:nth-child(2) {
  width: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sonShelters .sonShelDiv i {
}
.sonShelters .sonShelDiv span:nth-child(4) {
  margin-right: 12px;
}

.sonShelters .sonRightDiv .el-date-editor.el-input {
  width: 135px;
}
.sonShelters .sonRightDiv .el-date-editor.el-input .el-input__inner {
  border: 0px;
}

.addSonShelter {
  font-size: 14px;
}
/* 右边的样式 */
.rightShelter[data-v-b9351e26] {
  margin-left: 20px;
  width: 466px;
}
.TaskID {
  width: 100%;
  position: relative;
  margin-bottom: 3px;
  padding-left: 25px;
  .top {
    width: 100%;
    text-align: left;
    h3 {
      display: inline-block;
      font-size: 14px;
      margin-left: -7px;
    }
    p {
      display: inline-block;
      width: 90%;
      span {
        display: inline-block;
        cursor: pointer;
      }
      span:hover {
        color: #409eff;
      }
    }
  }
  .iscenetr {
    position: absolute;
    text-align: left;
    width: 299px;
    height: 93px;
    box-shadow: 1px 1px 3px #888888;
    padding: 4px;
    z-index: 9999999;
    background: white;
    border-radius: 3px;
    top: 25px;
    li {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgba(231, 231, 231, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .el-button--text {
        color: #333333;
      }
      .el-button {
        display: inline-block;
        line-height: 0;
      }
    }
    li:hover {
      background: rgba(243, 243, 243, 1);
    }
  }
}

</style>
<style lang="scss">
.backstage-task-module-edit .attentionMatters .text{
  height: 492px;
}
.backstage-task-module-edit{
  .el-dialog__header{
    border-bottom: 1px solid #e8e8e8!important;
  }
  .main-content .el-dialog__body{
    padding: 30px 20px 0px
  }
  .w-e-text{
    overflow-y: auto;
  }
  .el-scrollbar{
    padding-right: 0
  }
  .task-content .el-textarea__inner{
    width: 490px;
  }
  .left-task-content .edit_container{
    width: 490px;
    .text{
      height: 140px;
    }
  }
  .rightShelter .edit_container{
    height: 540px;
  }
  .el-tabs__nav-wrap::after{
    width: 462px;
  }
}
</style>


