<template>
  <div class="submitInformation">
    <div class="submitInformation_contenti_headers">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/manuscriptmanage'}">底稿管理</el-breadcrumb-item>
        <el-breadcrumb-item>报送</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="headers_clearFix">
        <router-link :to="{path:'/manuscriptmanage'}">
          <i class="iconfont leftarrow back"></i>
          <span class="headers_clearFix_title">报送信息</span>
        </router-link>
        <el-button
          type="primary"
          @click="submitForm('sendForm')"
          v-loading.fullscreen.lock="fullscreenLoading"
          :disabled="btnControl">提交</el-button>
      </h3>
    </div>
    <div class="content" id="content">
      <el-form
        :model="sendForm"
        :rules="rules"
        ref="sendForm"
        :inline="true"
        label-width="145px"
        class="send-form">
        <div class="declare">
          <div class="declare_title">
            <i></i>
            <span>申报信息</span>
          </div>
          <div class="declare_body">
            <ul class="row">
              <li class="col">
                <el-form-item
                  label="项目阶段："
                  prop="itemStage"
                  class="el-form-item">
                  <el-select
                    v-model="sendForm.itemStage"
                    placeholder="请选择项目阶段">
                    <el-option label="请选择项目阶段" value=""></el-option>
                    <el-option label="申报阶段" value="1"></el-option>
                    <el-option label="发行完成/终止阶段" value="2"></el-option>
                    <el-option label="其他阶段" value="3"></el-option>
                  </el-select>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">为证监会要求：<br/>当项目阶段为申报阶段或发行完成/终止阶段时，目录全部报送。<br/>为其他阶段时，目录不报送。</div>
                    <i class="el-icon-warning-outline hide-message"></i>
                  </el-tooltip>
                </el-form-item>
              </li>
              <li class="col">
                <el-form-item
                  v-show="itemStageControl"
                  label="报送信息："
                  class="el-form-item">
                  【{{ sendForm.itemName }}】 目录 {{ floderNum }}个
                </el-form-item>
                <el-form-item
                  v-show="stateNameControl"
                  prop="stageName"
                  label="阶段名称："
                  class="el-form-item">
                  <el-input v-model="sendForm.stageName"></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <el-form-item label="项目类型：" prop="itemType" class="el-form-item">
                  <el-select v-model="sendForm.itemType" placeholder="请选择项目类型">
                    <el-option label="请选择项目类型" value=""></el-option>
                    <el-option-group
                      v-for="group in groups"
                      :key="group.id"
                      :label="group.label">
                      <el-option
                        v-for="item in group.option"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                  <el-tooltip class="item" effect="dark" content="为证监会提供的项目类型" placement="top">
                    <i class="el-icon-warning-outline hide-message"></i>
                  </el-tooltip>
                </el-form-item>
              </li>
              <li class="col">
                <el-form-item
                v-show="itemTyNameControl"
                prop="itemTyName"
                label="项目类型名称："
                class="el-form-item">
                <el-input v-model="sendForm.itemTyName"></el-input>
              </el-form-item>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-show="projectInfoControl"
          class="declare">
          <div class="declare_title">
            <i></i>
            <span>项目信息</span>
          </div>
          <div class="declare_body">
            <ul class="row">
              <li class="col">
                <el-form-item
                  prop="code"
                  label="项目编码："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.code"
                    disabled></el-input>
                </el-form-item>
              </li>
              <li class="col">
                <el-form-item
                  prop="itemName"
                  label="项目名称："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.itemName"
                    disabled></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <el-form-item
                prop="ipoMarket"
                label="上市/挂牌板块："
                class="el-form-item">
                <!-- <el-select
                  v-model="sendForm.ipoMarket"
                  disabled
                  placeholder="">
                  <el-option label="sendForm.ipoMarketLabel" value="sendForm.ipoMarket"></el-option>
                </el-select> -->
                <el-select
                  v-model="sendForm.ipoMarket"
                  disabled
                  placeholder="">
                  <el-option
                    v-for="trad in sendForm.ipoMarketLabel"
                    :key="trad.label"
                    :label="trad.label"
                    :value="trad.id">
                  </el-option>
                </el-select>
              </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <el-form-item
                prop="itemArea"
                label="项目区域："
                class="el-form-item">
                <el-select
                  v-model="sendForm.itemArea"
                  disabled
                  placeholder="">
                  <el-option
                    v-for="item in sendForm.itemAreaLabel"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              </li>
              <li class="col">
                <el-form-item
                  prop="areaName"
                  label="区域名称："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.areaName"
                    disabled></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <el-form-item
                prop="reportTime"
                label="申报时间："
                class="el-form-item">
                <el-date-picker
                  v-model="sendForm.reportTime"
                  type="date"
                  disabled
                  placeholder="请选择申报时间"></el-date-picker>
                  <el-tooltip class="item" placement="top" effect="dark">
                    <div slot="content">项目的申报受理日期，项目信息报送以后，<br/>报送过申报时间后不可更改。</div>
                    <i class="el-icon-warning-outline hide-message"></i>
                  </el-tooltip>
                </el-form-item>
              </li>
              <li class="col">
                <el-form-item
                prop="issueTime"
                label="发行时间："
                class="el-form-item">
                <el-date-picker
                  v-model="sendForm.issueTime"
                  type="date"
                  disabled
                  placeholder="请选择发行时间"></el-date-picker>
                  <el-tooltip class="item" placement="top" effect="dark">
                    <div slot="content">适用上市/挂牌时间的，填写上市/挂牌时间；<br/>不适用上市/挂牌时间的，填写“缴款截止日。项目信息<br/>报送以后，报送过申报时间后不可更改</div>
                    <i class="el-icon-warning-outline hide-message"></i>
                  </el-tooltip>
                </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <securityMessage
                  :type="'reportMessage'"
                  :itemStage="sendForm.itemStage"
                  :itemType="sendForm.itemType.slice(0, 1)"
                  ref="securt"
                  :stkAndTps="sendForm.stkAndTpsShow"></securityMessage>
              </li>
            </ul>
            <ul class="row"
              v-show="itemPreiodControl">
              <li class="col">
                <el-form-item
                  prop="itemPeriod"
                  label="项目期次："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.itemPeriod"
                    placeholder="请输入项目期次"
                    :maxlength="2"
                  ></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul class="row">
              <li class="col">
                <el-form-item
                  v-show="sponsorControl"
                  prop="sponsorsName"
                  label="保荐代表人："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.sponsorsName"
                    disabled
                    class="select_input"></el-input>
                  <el-button
                    type="primary"
                    size="small"
                    @click="addpeo(2)"
                    class="select_btn">选择</el-button>
                </el-form-item>
                <el-form-item
                  v-show="projectLeaderControl"
                  prop="leadersName"
                  label="项目负责人："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.leadersName"
                    disabled
                    class="select_input"></el-input>
                  <el-button
                    type="primary"
                    size="small"
                    @click="addpeo(10)"
                    class="select_btn">选择</el-button>
                </el-form-item>
              </li>
              <li class="col" v-show="projectTeamControl">
                <el-form-item
                  prop="membersName"
                  label="项目组成员："
                  class="el-form-item">
                  <el-input
                    v-model="sendForm.membersName"
                    disabled
                    class="select_input"></el-input>
                  <el-button
                    type="primary"
                    size="small"
                    @click="addpeo(30)"
                    class="select_btn">选择</el-button>
                </el-form-item>
              </li>
            </ul>
            <findAllDeptUserMultiple :findFlagShow.sync="findFlagShow" :limitType="limitType" @findAllUser="findAllUser" :displayPeople="displayPeople"></findAllDeptUserMultiple>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import reportData from "@/pages/common/js/reportData";
import securityMessage from '@/components/select_box/securityMessage'
import findAllDeptUserMultiple from '@/components/select_box/findAllDeptUserMultiple'
import { handleValue } from '@/utils/utils'
export default {
  name: "submitInformation",
  components: {
    securityMessage,
    findAllDeptUserMultiple
  },
  computed: {
    // 项目类型
    groups() {
      return reportData.reportData.projectType;
    },

    itemStage() {
      return this.sendForm.itemStage
    },
    itemType() {
      return this.sendForm.itemType
    },
    correlation() {
      const { itemStage, itemType } = this;
      return {
        itemStage,
        itemType
      }
    },
  },
  data() {
    // disable && 必填 && 空值 => 前端拦截跳转到项目信息页面
    const validator = (rule, value, callback) => {
      if (rule.required && (!value || value === "null" || value === "underfind")) {
        this.goReplenish();
      } else {
        callback();
      }
    }
    return {
      fullscreenLoading: false, // 全屏loading加载状态
      floderNum: '',  // 目录数量
      sendForm: {
        itemStage: '',  // 项目阶段
        itemType: '', // 项目类型
        stageName: '',  // 阶段名称
        itemTyName: '', // 类型名称

        code: '', // 项目编码
        itemName: '', // 项目名称
        ipoMarket: '', // 上市/挂牌
        ipoMarketLabel: this.report.reportData.projectPlat, // 上市/挂牌数组
        itemArea: '', // 项目区域
        itemAreaLabel: this.report.reportData.projectArea, // 项目区域数组
        areaName: '', // 区域名称
        reportTime: '', // 申报时间
        issueTime: '', // 发行时间
        stkAndTps: [], // 证券类数组--传后端
        stkAndTpsShow: [
          {
            stkCode: '',
            stkSpName:'',
            tpCode:'',
            tpName: ''
          }
        ], // 证券类数组--展示
        itemPeriod: '', // 项目期次

        sponsors: [], // 保荐代表人id
        sponsorsName: '', // 保荐代表人
        members: [], // 项目组成员id
        membersName: '', // 项目组成员
        leaders: [], // 项目负责人id
        leadersName: '', // 项目负责人
      },
      rules: {
        itemStage: [{ required: true, message: '项目阶段不能为空', trigger: 'blur' }],
        itemType: [{ required: true, message: '项目类型不能为空', trigger: 'blur' }],
        stageName: [{ required: true, message: '阶段名称不能为空', trigger: 'blur' },],
        itemTyName:[{ required: true, message: '项目类型名称不能为空', trigger: 'blur' }],
        code:[{ required: true, validator: validator, message: '项目编码不能为空', trigger: 'blur' }],
        itemName:[{ required: true, validator: validator, message: '项目名称不能为空', trigger: 'blur' }],
        itemArea:[{ required: true, validator: validator, message: '项目区域不能为空', trigger: 'blur' }],
        areaName:[{ required: false,  validator: validator, message: '区域名称不能为空', trigger: 'blur' }],
        ipoMarket:[{ required: false, validator: validator, message: '上市/挂牌板块不能为空', trigger: 'blur' }],
        reportTime:[{ required: false, validator: validator, message: '申报时间不能为空', trigger: 'blur' }],
        issueTime:[{ required: false, validator: validator, message: '发行时间不能为空', trigger: 'blur' }],
        itemPeriod:[
          { required: false, message: '项目期次为2位数字'},
          { pattern: /^(0[0-9]|[1-9][0-9])$/, message: '项目期次格式应为:01-99' }
        ],
        sponsorsName: [{ required: true, message: '保荐代表人不能为空', trigger: 'change' },],
        membersName: [{ required: true, message: '项目组成员不能为空', trigger: 'change' },],
        leadersName: [{ required: true, message: '项目负责人不能为空', trigger: 'change' },],
      },
      itemStageControl: false,  // 报送信息控制
      stateNameControl: false,  // 阶段名称控制
      itemTyNameControl: false,  // 项目类型名称控制

      projectInfoControl: false,  // 项目信息控制
      itemPreiodControl: false,  // 项目期次控制

      limitType: '',  // 选择人员组件-传参类型(2-保荐代表人,30-项目组成员,10-项目负责人)
      displayPeople: [],  // 选择人员组件-传参数组
      findFlagShow: false,  // 选择人员组件-弹窗控制
      sponsorControl: false,  // 保荐代表人控制
      projectLeaderControl: false,  // 项目负责人控制
      projectTeamControl: false,  // 项目组成员控制

      btnControl: true,  // 提交按钮点击状态控制
    }
  },
  watch: {
    // 项目阶段和项目类型级联
    correlation(val) {
      let itemStage = val.itemStage;  // 项目阶段
      let itemType = val.itemType;  // 项目类型
      // 报送信息
      if (itemStage != '' && itemStage != 3) {
        this.itemStageControl = true;
      } else {
        this.itemStageControl = false;
      }
      // 阶段名称
      if (itemStage == 3) {
        this.stateNameControl = true;
        this.rules.stageName[0].required = true;
      } else {
        this.stateNameControl = false;
        this.rules.stageName[0].required = false;
      }
      // 项目类型名称
      if (itemType == 1009 || itemType == 2010 || itemType == 3007) {
        this.rules.itemTyName[0].required = true;
        this.itemTyNameControl = true;
      } else {
        this.rules.itemTyName[0].required = false;
        this.itemTyNameControl = false;
      }
      // 项目信息模块 && 提交按钮
      if (itemStage != '' && itemType !== '') {
        this.projectInfoControl = true;
        this.btnControl = false;
      } else {
        this.projectInfoControl = false;
        this.btnControl = true;
      }
      // 项目阶段为非空
      if (itemStage != '') {
        // 上市/挂牌(保荐类&&权益类) + 证券类数组显示长度
        let stkAndTps = this.sendForm.stkAndTps
        if (itemType > 1000 && itemType < 3000) {
          this.rules.ipoMarket[0].required = true;
          stkAndTps && stkAndTps.length > 0 && (this.sendForm.stkAndTpsShow = stkAndTps.slice(0, 1));
        } else {
          this.rules.ipoMarket[0].required = false;
          stkAndTps && stkAndTps.length > 0 && (this.sendForm.stkAndTpsShow = stkAndTps);
        }
        // 申报时间(申报阶段)
        if (itemStage == 1) {
          this.rules.reportTime[0].required = true;
        } else {
          this.rules.reportTime[0].required = false;
        }
        // 发行时间(发行阶段)
        if (itemStage == 2) {
          this.rules.issueTime[0].required = true;
        } else {
          this.rules.issueTime[0].required = false;
        }
        // 项目期次(债权类)
        if (itemType > 3000 && itemType < 4000) {
          this.itemPreiodControl = true
        } else {
          this.itemPreiodControl = false
        }
        /*
          保荐类(1000-2000)、权益类(2000-3000)、债权类(3000-4000)
          是否显示: 保荐代表人-sponsorControl、项目组成员-projectTeamControl、项目负责人-projectLeaderControl
          必填验证: 保荐代表人-sponsorsName、项目组成员-membersName、项目负责人-leadersName
        */
        if (itemType > 1000 && itemType < 2000) {
          this.sponsorControl = true;
          this.projectTeamControl = true;
          this.projectLeaderControl = false;
          this.rules.sponsorsName[0].required = true;
          this.rules.membersName[0].required = true;
          this.rules.leadersName[0].required = false;
        } else if (itemType > 2000 && itemType < 3000) {
          this.sponsorControl = false;
          this.projectTeamControl = false;
          this.projectLeaderControl = true;
          this.rules.sponsorsName[0].required = false;
          this.rules.membersName[0].required = false;
          this.rules.leadersName[0].required = true;
        } else if (itemType > 3000 && itemType < 4000) {
          this.sponsorControl = false;
          this.projectTeamControl = true;
          this.projectLeaderControl = true;
          this.rules.sponsorsName[0].required = false;
          this.rules.membersName[0].required = true;
          this.rules.leadersName[0].required = true;
        }
        this.$refs.securt.$refs['form'].clearValidate()
      }
    },
  },
  mounted() {
    this.getFloderNum();  // 获取目录数量
    this.getData(); // 获取初始数据
  },
  methods: {
    // 获取初始数据
    getData() {
      let obj = {
        token: JSON.parse(sessionStorage.getItem("userToken")),
        userId: JSON.parse(sessionStorage.getItem("userId")),
        data: {
          id: this.$store.state.projectMsg.pro_id
        }
      };
      this.$post("/info/project/getProjectById", obj).then(res => {
        if (res.code === 0) {
          let data = res.data;
          this.sendForm.code = handleValue(data.code); // 项目编码
          this.sendForm.itemName = handleValue(data.name); // 项目名称
          this.sendForm.ipoMarket = handleValue(data.ipoMarket) + ''; // 上市/挂牌
          this.sendForm.itemArea =  handleValue(data.itemArea) + ''; // 项目区域
          this.sendForm.areaName = handleValue(data.areaName); // 区域名称
          if (data.itemArea == 900000) {
            this.rules.areaName[0].required = true;
          } else {
            this.rules.areaName[0].required = false;
          }
          this.sendForm.reportTime = handleValue(data.reportTime); // 申报时间
          this.sendForm.issueTime = handleValue(data.issueTime); // 发行时间
          if (Array.isArray(data.stkAndTps) && data.stkAndTps.length > 0) {
            data.stkAndTps.forEach(v => {
              v.tpCode = typeof v.tpCode == 'number' ? v.tpCode + '' : v.tpCode
            });
          }
          this.sendForm.stkAndTps = handleValue(data.stkAndTps); // 证券类数组
        } else {
          this.$message.error(res.msg);
        }
      }).catch(error => {});
    },
    // 获取目录数量
    getFloderNum() {
      let obj = {
        data: {
          id: this.$store.state.projectMsg.pro_id
        }
      }
      this.$post("/doc/paper/queryPaperNum", obj).then(res => {
        if (res.code === 0) {
          this.floderNum = res.data.floderNum;
        } else {
          this.$message.error('该项目非抽查文件，无法报送！');
        }
      }).catch(error => {});

    },
    // 调用选择人员组件(2-保健代表,30-项目组成员,10-项目负责人)
    addpeo(data) {
      if (data == 2) {
        this.limitType = 2;
        this.displayPeople = this.sendForm.sponsors;
      } else if (data == 30) {
        this.limitType = 30
        this.displayPeople = this.sendForm.members;
      } else if (data == 10) {
        this.limitType = 10
        this.displayPeople = this.sendForm.leaders;
      }
      this.findFlagShow = true;
    },
    // 选择人员组件-回显赋值
    findAllUser (val) {
      if (val.length > 0) {
        this.findFlagShow = false;
        if (this.limitType === 2) {
          this.sendForm.sponsorsName = [];
          this.sendForm.sponsors = [];
          let arr = [];
          val.map(item => {
            arr.push(item.usName);
            this.sendForm.sponsors.push(item.userId);
          })
          this.sendForm.sponsorsName = arr.join(',');
        } else if (this.limitType === 30) {
          this.sendForm.membersName = [];
          this.sendForm.members = [];
          let arr = [];
          val.map(item => {
            arr.push(item.usName);
            this.sendForm.members.push(item.userId);
          })
          this.sendForm.membersName = arr.join(',');
        } else if (this.limitType === 10) {
          this.sendForm.leadersName = [];
          this.sendForm.leaders = [];
          let arr = [];
          val.map(item => {
            arr.push(item.usName);
            this.sendForm.leaders.push(item.userId);
          })
          this.sendForm.leadersName = arr.join(',');
        }
      }
    },
    // 提交
    submitForm(formName) {
      const p1 = new Promise((resolve,reject)=>{
          this.$refs.securt.$refs['form'].validate(valid=>{
            if(valid) {
              resolve()
            } else {
              this.goReplenish();
            }
          })
      })
      const p2 = new Promise((resolve,reject)=>{
          this.$refs[formName].validate((valid) => {
            if(valid) resolve()
          })
      })
      Promise.all([p1, p2]).then(()=>{
        this.fullscreenLoading = true;
        let obj = {
          data: this.sendForm
        }
        obj.data.projectId = this.$store.state.projectMsg.pro_id;
        obj.data.reportType = 0;
        obj.data.reportCatalogs = `【${ this.sendForm.itemName }】 目录 ${ this.floderNum }个`;
        delete obj.data.ipoMarketLabel;
        delete obj.data.itemAreaLabel;
        delete obj.data.stkAndTpsShow;
        delete obj.data.sponsorsName;
        delete obj.data.membersName;
        delete obj.data.leadersName;
        for (let key in obj.data) {
          if (obj.data[key] === '' || (Array.isArray(obj.data[key]) && obj.data[key].length === 0)) {
            delete obj.data[key]
          }
        }
        this.$post("/doc/project/report", obj).then(res => {
          if (res.code === 0) {
            this.$message.success('请求成功！');
          } else {
            this.$message.error(res.msg);
          }
          this.fullscreenLoading = false;
        }).catch(error => {
          this.fullscreenLoading = false;
        });
      })
    },
    // 补全项目信息
    goReplenish () {
      this.$confirm('信息不完整无法报送, 是否去补全项目信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({path: "/projectmessage"})
      }).catch(() => {
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .submitInformation {
    text-align: left;
    .submitInformation_contenti_headers {
      padding: 10px;
      padding-right: 20px;
      background: #fff;
      .headers_clearFix {
        display: flex;
        justify-content: space-between;
        margin-top: 17px;
        text-align: left;
        .back {
          font-size: 23px;
          color: #606266;
        }
        .headers_clearFix_title {
          margin-left: 5px;
          font-size: 20px;
          font-weight: bold;
          color: #303133;
        }
      }
    }
    .content {
      margin-top: 10px;
      background: #fff;
      .send-form {
        padding: 20px 0;
        .declare {
          &_title {
            display: flex;
            align-items: center;
            i {
              margin-right: 16px;
              height: 16px;
              width: 4px;
              background: #0061A9;
            }
            span {
              color: #303133;
              font-size: 16px;
            }
          }
          &_body {
            .row {
              &:first-child {
                margin-top: 20px;
              }
              .col {
                display: inline-block;
                &:nth-child(2n) {
                  margin-left: 200px;
                }
                .el-form-item {
                  position: relative;
                  .item {
                    position: absolute;
                    right: -20px;
                    top: 12px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .hide-message {
    color: #C0C4CC;
  }

  .select_input {
    width: 164px!important;
  }
  .el-input {
    width: 220px;
  }
  .el-select {
    width: 220px;
   }
  .select_btn {
    margin-left: -4px;
    height: 40px;
    width: 56px;
  }
</style>
