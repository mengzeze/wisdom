<template>
  <div>
    <el-dialog title="修改日程"
               :close-on-click-modal="false"
               :visible.sync="innerVisible"
               width="660px"
               class="addcander">
      <span>
        <el-form ref="formedit"
                 :model="formedit"
                 label-width="80px">
          <!-- <el-form-item label="日程名称" :rules="[{required:true}]"> -->
          <el-input v-model="formeditCopy.name"
                    style="width:100%;margin-bottom:18px;"
                    type="textarea"
                    placeholder="请输入日程名称"
                    maxlength="200"></el-input>
          <!-- </el-form-item> -->
          <el-form-item label="所属项目"
                        :rules="[{required:true}]">
            <el-col :span="24">
              <select-lazy 
                  v-model="formeditCopy.projectId"
                  filterable 
                  placeholder="请选择" 
                  @change="handleSelectedit"
                  :list='projectList'></select-lazy> 
              <!-- <el-select :value="formedit.progress"
                         placeholder="请选择"
                         filterable
                         @change="handleSelectedit"
                         style="z-inidex:-1;width:88%;">
                <el-option v-for="item in projectList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select> -->
            </el-col>
          </el-form-item>
          <el-form-item label="人员"
                        :rules="[{required:true}]">
            <div class="choose-input">
              <el-input v-model="formeditCopy.principal"
                        class="fl"
                        style="width:317px"
                        placeholder="请选择人员"
                        disabled="disabled"></el-input>
              <div><el-button type="primary"
                         size="small"
                         @click="optUser"
                         class="fl">选择人员</el-button></div>
            </div>

          </el-form-item>
          <el-form-item label="时间"
                        :rules="[{required:true}]">
            <el-col :span="11">
              <el-date-picker @focus="$utils.handleTimeFocus"
                              type="datetime"
                              placeholder="开始日期"
                              v-model="formeditCopy.date1"
                              style="width:94%;"
                              format="yyyy-MM-dd HH:mm"
                              value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            </el-col>
            <el-col :span="11">
              <el-date-picker @focus="$utils.handleTimeFocus"
                              type="datetime"
                              placeholder="结束日期"
                              v-model="formeditCopy.date2"
                              style="width: 94%;"
                              format="yyyy-MM-dd HH:mm"
                              value-format="yyyy-MM-dd HH:mm"
                              default-time="23:59:59"
                              @change="quantianshifouchose"></el-date-picker>
            </el-col>
            <el-col :span="2">
              <el-checkbox v-model="checked"
                           @change="changeCheckbosedit"
                           style="margin-left:-7px;">全天</el-checkbox>
            </el-col>
          </el-form-item>
          <el-form-item label="提醒"
                        :rules="[{required:true}]">
            <el-col :span="11">
              <el-select v-model="formeditCopy.region"
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
              <el-select v-model="formeditCopy.letter"
                         multiple
                         placeholder="站内信"
                         style="width:235px;"
                         v-if="formeditCopy.region!==0">
                <el-option v-for="item in letterData"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="重复"
                        :rules="[{required:true}]">
              <el-select v-model="formeditCopy.repeat"
                         placeholder="请选择"
                         style="width:89%">
                <el-option v-for="item in repeatData"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="内容"
                        :rules="[{required:true}]">
              <el-input type="textarea"
                        v-model="formeditCopy.desc"
                        style="width:89%;margin-bottom:18px;"
                        maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="抄送人">
            <el-col :span="12">
              <el-tag v-for="(item,index) in editdefaultCopy"
                      :key="'info2-'+index"
                      class="userbtn">
                {{item.name}}
              </el-tag>
              <el-tag v-for="(item,index) in editccCopy"
                      :key="index"
                      class="userbtn"
                      @close="handle_Close(index)"
                      :closable="!chack_bule">
                {{item.name}}
              </el-tag>
              <span v-if="editdefaultCopy.length>0">&nbsp;&nbsp;</span>
              <el-button type="text"
                         class="color-primary"
                         @click="optUserserch">
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
        <!--cancelcander  -->
        <el-button size="medium"
                   @click="cancel">取 消</el-button>
        <!-- editSchedule -->
        <el-button size="medium"
                   type="primary"
                   @click="define">确 定</el-button>
      </span>
    </el-dialog>
    <fintall-deptuser :findFlagShow.sync="findFlag"
                      :findUserObj="findUserObj"
                      v-on:findAllUser="findAllUser"
                      :findState="findState"
                      :checkState="checkState"></fintall-deptuser>
    <fintall-deptuserserch :findFlagShow.sync="findFlagserch"
                           v-on:findAllUser="findAllUserserch"
                           :findUserObj="findUserObjSearch"
                           :findState="findStateserch"
                           :checkState="checkStateserch"></fintall-deptuserserch>
  </div>
</template>

<script>
import fintallDeptuser from '@/components/select_box/findAllDeptUserMultipleNew'
import fintallDeptuserserch from '@/components/select_box/findAllDeptUserMultipleNew'
export default {
  name: 'editSchedule',
  components: {
    fintallDeptuser,
    fintallDeptuserserch
  },
  props: {
    visible: { // 显示隐藏控制
      type: Boolean,
      default: false
    },
    formedit: { // 数据
      type: Object,
      default: () => { }
    },
    projectList: { // 项目数据
      type: Array,
      default: () => []
    },
    deployObj: { // 人员数据
      type: Array,
      default: () => []
    },
    deplayFormObj: {// form表单中的人员数据
      type: Array,
      default: () => []
    },
    scheduleIds: { // 此条数据的id和pro_id
      type: Object,
      default: () => { }
    },
    dateClicks: { // 此条数据的id和pro_id
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      innerVisible: false,
      findFlag: false,
      findUserObj: [],
      findState: {},
      checkState: {},
      checked: false,
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
        //  {
        //   value: 1,
        //   label: '邮件'
        // },
        //         {
        //   value: 2,
        //   label: '短信'
        // }
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
      chack_bule: false,
      client: window.client,
      editdefaultCopy: [],
      editccCopy: [],
      findUserObjSearch: [],
      userNums: '',
      findFlagserch: false,
      findStateserch: {},
      checkStateserch: {},
      isChanges: 0,
      deployObjCom: [],
      deplayFormObjCom: [],
      scheduleIdsCom: {},
      formeditCopy: {}
    }
  },
  watch: {
    visible (val, oldVal) {
      if (val === oldVal) return
      this.innerVisible = val
    },
    innerVisible (val, oldVal) {
      if (val === oldVal) return
      this.$emit('update:visible', val)
      if (!val) {
        this.findUserObjSearch.length = 0
        this.deployObjCom.length = 0
        this.deplayFormObjCom.length = 0
      }
      this.editdefaultCopy.length = 0
      this.editccCopy.length = 0
      this.deployObjCom = this.$utils.cloneDeepArray(this.deployObj)
      this.deplayFormObjCom = this.$utils.cloneDeepArray(this.deplayFormObj)
      this.deployObjCom.forEach(v => {
        if (v.originData) {
          this.editdefaultCopy.push(v)
        } else {
          this.editccCopy.push(v)
        }
      })
      this.scheduleIdsCom = this.$utils.copyObj(this.scheduleIds)
      this.checked = this.dateClicks.allDay
      this.formeditCopy = this.$utils.copyObj(this.formedit)
    }
  },
  mounted(){
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
    cancel () {
      this.innerVisible = false
      // this.editdefaultCopy.length = 0
      // this.editccCopy.length = 0
      this.$emit('cancelCallback')
    },
    define () {
      if (this.formeditCopy.name == "") {
        this.$message.error('日程名称内容不能为空');
        return;
      }
      if (this.formeditCopy.progress == "") {
        this.$message.error('所属项目不能为空');
        return;
      }
      if (this.formeditCopy.principal == "") {
        this.$message.error('人员不能为空');
        return;
      }
      if (this.formeditCopy.date1 == "" || this.formeditCopy.date1 == null) {
        this.$message.error('开始日期不能为空');
        return;
      }
      if (this.formeditCopy.date2 == "" || this.formeditCopy.date2 == null) {
        this.$message.error('结束日期不能为空');
        return;
      }
      if (new Date(this.formeditCopy.date2) < new Date(this.formeditCopy.date1)) {
        this.$message.error('结束日期不能大于开始日期');
        return;
      }
      if (this.formeditCopy.repeat == "") {
        this.$message.error('日期重复方式不能为空');
        return;
      }
      if (this.formeditCopy.desc == "") {
        this.$message.error('日程内容不能为空');
        return;
      }

      if (this.formeditCopy.date1 == this.formeditCopy.date1) {
        this.isChanges = 0
      } else {
        this.isChanges = 1
      }

      if (this.formeditCopy.date2 == this.formeditCopy.date2) {
        this.isChanges = 0
      } else {
        this.isChanges = 1
      }
      // 处理抄送人列表
      let defaultList = this.editdefaultCopy.map(v => { return { userId: v.userId, defaultUser: 1 } })
      let selList = this.editccCopy.map(v => { return { userId: v.userId, defaultUser: 0 } })
      let peopleCc = defaultList.concat(selList)
      let hash = {};
      peopleCc = peopleCc.reduce((item, next) => {
        !hash[next.userId] && (hash[next.userId] = true && item.push(next))
        return item
      }, []);
      this.$post("/sys/schedule/edit_schedule", {
        data: {
          id: this.scheduleIdsCom.id,  //修改的日程id
          name: this.formeditCopy.name, //日程名称
          projectId: this.scheduleIdsCom.pro_id, //项目id
          projectName: this.formeditCopy.progress,  //项目名称
          personnel: this.deplayFormObjCom.map(v => v.id).join(","), //人员id
          startDate: this.formeditCopy.date1.length == 16 ? this.formeditCopy.date1 + ':00' : this.formeditCopy.date1, //开始时间
          endDate: this.formeditCopy.date2.length == 16 ? this.formeditCopy.date2 + ':00' : this.formeditCopy.date2, //截止时间
          isDay: this.checked ? 1 : 0, //是否全天
          remindType: this.formeditCopy.region,  //提醒类型
          sendType: this.formeditCopy.letter.join(","),  //发送类型
          repeatType: this.formeditCopy.repeat, //重复方式
          content: this.formeditCopy.desc, //内容
          isChange: this.isChanges, //配置人员和时间有没有改动
          scheduleUserlist: peopleCc  //默认的抄送人和自己添加的抄送人
        }
      }).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.error(res.msg);
          return
        }
        this.innerVisible = false;
        this.$emit('defineCallback')
        this.$message.success('修改成功');
        if (this.isDay == 1) {
          this.checked = true;
        } else {
          this.checked = false;
        }
        this.findUserObjSearch = []
        this.findUserObj = []
        this.deployObjCom = []
        this.editccCopy = []
      }).catch(err => { console.log(err) });
    },
    //抄送人的选择人员
    findAllUserserch (data) {
      console.log(data, 222)
      if (!data || !data.length) {
        this.editccCopy = []
        return
      }
      this.editdefaultCopy.length = 0
      this.editccCopy.length = 0
      let hash = {};
      data = data.reduce((item, next) => {
        !hash[next.id] && (hash[next.id] = true && item.push(next));
        return item
      }, []);
      //  返回的数据分为默认的和其他的选择的，
      data.forEach(v => {
        if (v.originData || v.defaultUser == 1) {
          this.editdefaultCopy.push(v)
        } else {
          this.editccCopy.push(v)
        }
      })
      this.findUserObjSearch = this.editdefaultCopy.concat(this.editccCopy)
    },
    //全局组织架构的选择人员
    findAllUser (data) {
      if (!data || !data.length) {
        this.formeditCopy.principal = ''
        this.deplayFormObjCom = []
        return
      }
      let hash = {}
      data = data.reduce((item, next) => {
        !hash[next.userId] && (hash[next.userId] = true && item.push(next))
        return item
      }, [])
      console.log(data, '这是选择人员~~~~~~~')
      // 处理展示的数据以、隔开
      var string = "";
      for (var i = 0; i < data.length; i++) {
        var objname = {};
        objname.name = data[i].name;
        string = string + data[i].name + "、";
      }
      this.formeditCopy.principal = string;
      this.deplayFormObjCom = data
    },
    // 选择人员
    optUser () {
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 2 };
      if (!this.formeditCopy.principal) {
        this.findUserObj = []
        return
      }
      this.findUserObj = this.deplayFormObjCom
    },
    // 选择抄送人
    optUserserch () {
      this.findFlagserch = true;
      this.findStateserch = { state: 0 };
      this.checkStateserch = { state: 2 };
      this.findUserObjSearch = this.editdefaultCopy.concat(this.editccCopy)
    },
    handleSelectedit (val) {
      let projectData = this.projectList.find(v=>v.id===val)
      if(!projectData) return
      this.scheduleIdsCom.pro_id = projectData.id;
      this.formeditCopy.progress = projectData.name;
    },
    quantianshifouchose () {
      this.checked = false
    },
    changeCheckbosedit () {
      if (this.checked) {
        console.log(this.dateClicks)
        this.formeditCopy.date1 = this.dateClicks.start._i;
        this.formeditCopy.date2 = this.$moment(this.dateClicks.start._i).format('YYYY-MM-DD 23:59:59');
      } else {
        this.formeditCopy.date1 = '';
        this.formeditCopy.date2 = '';
      }
    },
    // 点击抄送人的关闭事件
    handle_Close (index) {
      this.editccCopy.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.addcander {
  /deep/ .el-textarea {
    width: 100%;
  }
  /deep/ .el-button {
    height: 40px;
  }
  /deep/ .el-form-item__content {
    text-align: left;
  }
  .userbtn {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>