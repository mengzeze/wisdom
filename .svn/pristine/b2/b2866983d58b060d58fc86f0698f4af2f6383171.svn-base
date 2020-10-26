<template>
  <div class="financcustomdetail">
    <!-- <el-button type="text" @click="changeNote" class="add_shares">变更记录</el-button> -->
    <div class="cont_box">
      <span class="leftspan border-primary">基本信息</span>
      <div class="clearfix func_btn">
        <el-button
          size="medium"
          type="primary"
          @click="editNote"
          v-if="btn_flag == false"
          style="margin-right: 3px"
          >编辑</el-button
        >
        <el-button
          size="medium"
          type=""
          @click="cancelNote"
          v-if="btn_flag == true"
          style="margin-right: 3px"
          >取消</el-button
        >
        <el-button
          size="medium"
          type="primary"
          @click="saveNote"
          v-if="btn_flag == true"
          >保存</el-button
        >
      </div>
      <el-form
        ref="msgObj"
        :model="msgObj"
        label-width="120px"
        class="form_box clearfix"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="客户名称：" :rules="[{ required: true }]">
              <el-input
                v-model="msgObj.pro_name"
                placeholder="请输入关键词"
                :disabled="disabled"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户简称：" :rules="[{ required: true }]">
              <el-input
                v-model="msgObj.abb_name"
                placeholder="请输入关键词"
                :disabled="disabled"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="客户类型："
              :rules="[{ required: cusTypeIsMumstFill }]"
            >
              <el-select
                v-model="msgObj.pro_type"
                placeholder="请选择客户类型"
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="item in selectStateListType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户状态：" :rules="[{ required: true }]">
              <el-select
                v-model="msgObj.pro_state"
                placeholder="请选择客户状态"
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="item in selectStateListState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="行业（1级）：" :rules="[{ required: true }]">
              <el-select
                name="province"
                id="province"
                class="classify"
                v-on:change="indexSelect01"
                v-model="indexId"
                placeholder="请选择一级行业"
                :disabled="disabled"
              >
                <el-option
                  :value="item.name"
                  v-for="(item, index) in select01"
                  :key="item.index"
                  >{{ item.name }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="行业（2级）：" :rules="[{ required: true }]">
              <!--二级菜单-->
              <el-select
                name="city"
                id="city"
                class="classify mt10"
                v-model="indexId2"
                placeholder="请选择二级行业"
                :disabled="disabled"
              >
                <el-option
                  :value="k.name"
                  v-for="k in select02"
                  :key="k.name"
                  >{{ k.name }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="成立时间：">
              <el-date-picker
                v-model="msgObj.pro_time"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="disabled"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="上市板块：">
              <el-select
                v-model="msgObj.radioList"
                placeholder="选择上市板块"
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="item in selectStateListipo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="上市时间：">
              <el-date-picker
                v-model="msgObj.list_time"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="disabled"
                @focus="$utils.handleTimeFocus"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="法人代表：">
              <el-input
                v-model="msgObj.pro_legal"
                placeholder="请输入法人代表"
                :disabled="disabled"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="注册资本：">
              <el-input
                v-model="msgObj.pro_register"
                placeholder="请输入注册资本"
                :disabled="disabled"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系电话：">
              <el-input
                v-model="msgObj.pro_phone"
                placeholder="请输入联系电话"
                :disabled="disabled"                
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="邮箱：">
              <el-input
                v-model="msgObj.pro_email"
                placeholder="请输入邮箱"
                :disabled="disabled"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="传真：">
              <el-input
                v-model="msgObj.pro_fax"
                placeholder="请输入传真"
                :disabled="disabled"
                maxlength="15"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="邮编：">
              <el-input
                v-model="msgObj.zip_code"
                placeholder="请输入邮编"
                @input="
                  msgObj.zip_code = msgObj.zip_code.replace(/[^\d\.]/g, '')
                "
                :disabled="disabled"
                maxlength="6"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="地址：">
              <el-input
                v-model="msgObj.pro_place"
                placeholder="请输入地址"
                :disabled="disabled"
                maxlength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司网址：">
              <el-input
                v-model="msgObj.pro_http"
                placeholder="请输入公司网址"
                :disabled="disabled"
                maxlength="100"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="公司简介：" style="margin-top: 10px">
              <el-input
                type="textarea"
                v-model.trim="msgObj.pro_brief"
                placeholder="请输入公司简介"
                :disabled="disabled"
                maxlength="2000"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item
              label="经营范围："
              style="margin-top: 10px"
              :rules="[{ required: true }]"
            >
              <el-input
                type="textarea"
                v-model.trim="msgObj.pro_range"
                placeholder="请输入经营范围"
                :disabled="disabled"
                maxlength="2000"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" style="margin-top: 10px">
              <el-input
                type="textarea"
                v-model.trim="msgObj.pro_remark"
                placeholder="请输入备注"
                :disabled="disabled"
                maxlength="2000"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="cont_box">
      <span class="leftspan border-primary">服务团队</span>
      <el-form
        ref="form"
        :model="teamObj"
        label-width="120px"
        class="form_box clearfix servertearm"
      >
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="客户负责人：">
              <el-input
                v-model="teamObj.pro_person"
                class="fl"
                placeholder="请输入客户负责人"
                disabled="disabled"
                :properson="properson"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUser(1)"
                class="fl"
                :disabled="disabled"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                >选择人员</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="信息跟踪人：">
              <el-input
                v-model="teamObj.pro_msg"
                class="fl"
                placeholder="请输入信息跟踪人"
                disabled="disabled"
                :messageper="messageper"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                @click="optUser(2)"
                class="fl"
                :disabled="disabled"
                style="margin-left: 0px; height: 40px; margin-top: 0px"
                >选择人员</el-button
              >
              <!-- <el-select v-model="teamObj.pro_msg" placeholder="请选择客户状态" clearable  @change="selectRoleChange" :disabled="disabled">
                    <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                </el-select> -->
              <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;height:36px;">
                    <span v-for="item in  deployObj" class="role_btn" :disabled="disabled">{{item.name}}</span>
                </div>
                <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:1px;">选择信息跟踪人</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="业务部门："> -->
        <!-- <el-input v-model="department" class="fl" placeholder="请选择部门" disabled="disabled"></el-input>
                <el-button type="primary" size="small" @click="userbcs" class="fl"   :disabled="disabled">选择部门</el-button> -->
        <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;height:36px; ">
                    <span>  {{department}}</span>
                </div>
                <el-button size="small" type="primary" @click="userbcs" class="opt_btn" style="margin-left:0px;margin-right:1px;">选择部门</el-button> -->
        <!-- </el-form-item> -->
      </el-form>
    </div>
    <!--变更记录-->
    <!-- <el-dialog  title="变更记录" :visible.sync="dialogVisibleFlag"  width="700px">
          <el-select v-model="noteValue" @change="selectSharChange">
              <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value">
              </el-option>
          </el-select>
          <div class="shar_box">
              <ul>
                  <li>
                      <span>序号</span><span>变更日期</span><span>变更类型</span><span>变更前</span><span>变更后</span>
                  </li>
                  <div class="shar_list">
                      <li v-for="item in noteObj">
                          <span>{{item.id + 1}}</span><span>{{item.shares}}</span><span>{{item.before}}</span><span>{{item.after}}</span><span>{{item.time}}</span>
                      </li>
                  </div>
              </ul>
          </div>
      </el-dialog> -->
    <!--选择人员-->
    <frame-work
      v-if="flag"
      :peodatas="peodatas"
      v-on:statesbox="statesboxs"
      :radioUser="1"
    ></frame-work>
    <!--:findUserObj="user_num == 1 ? findUserObj : findUserObjM"-->
    <fintall-deptuser
      :findFlagShow.sync="findFlag"
      v-on:findAllUser="findAllUser"
      :findUserObj="user_num == 1 ? findUserObj : findUserObjM"
      :findState="findState"
      :checkState="checkState"
    ></fintall-deptuser>
    <!-- 选择部门 -->
    <select_box
      v-if="flags"
      v-on:states="sat"
      :flagstate="flagstate"
      :selectTree="selectTree"
    />
  </div>
</template>
<script>
import frameWork from "@/components/select_box/frameworkpeo";
import fintallDeptuser from "@/components/select_box/findAllDeptUserSingleNew";
import select_box from "@/components/select_box/select_box";
export default {
  name: "financcustomdetail",
  props: ["custData"],
  components: {
    frameWork,
    select_box,
    fintallDeptuser,
  },
  data() {
    return {
      findUserObj: [],
      findUserObjM: [],
      findFlag: false,
      findState: {},
      checkState: {},
      //department:'',
      //添加人员
      flag: false,
      flags: false,
      flagstate: "",
      selectTree: "",
      peodatas: "",
      deployObj: [{ name: "" }],
      select01: [], //获取的一级数组数据
      select02: [], //获取的二级数组数据
      indexId: "", //定义分类一的默认值
      indexId2: "",
      indexNum: 0, //定义一级菜单的下标
      btn_flag: false,
      disabled: true,
      msgObj: {
        pro_name: "",
        abb_name: "",
        pro_type: "",
        pro_state: "",
        // pro_job1: '',
        // pro_job2: '',
        pro_time: "",
        radioList: "",
        list_time: "",
        pro_legal: "",
        pro_register: "",
        pro_phone: "",
        pro_email: "",
        pro_fax: "",
        zip_code: "",
        pro_place: "",
        pro_http: "",
        pro_brief: "",
        pro_range: "",
        pro_remark: "",
      },
      teamObj: {
        pro_person: "",
        pro_msg: "",
        pro_depart: "",
      },
      // 客户状态
      selectStateListState: [
        {
          value: 1002,
          label: "初步洽谈",
        },
        {
          value: 1003,
          label: "达成合作",
        },
        {
          value: 1004,
          label: "协议签署",
        },
      ],
      // 客户类型
      selectStateListType: [
        {
          value: 1006,
          label: "潜在客户",
        },
        {
          value: 1007,
          label: "已投客户",
        },
      ],
      // 上市板块
      selectStateListipo: [
        {
          value: 1009,
          label: "未上市",
        },
        {
          value: 1010,
          label: "主板",
        },
        {
          value: 1011,
          label: "中小板",
        },
        {
          value: 1012,
          label: "创业板",
        },
        {
          value: 1013,
          label: "新三板",
        },
        {
          value: 1065,
          label: "科创板",
        },
        {
          value: 1014,
          label: "其他",
        },
      ],
      radioList: "1",
      //    变更记录弹框
      dialogVisibleFlag: false,
      options: [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "经营范围",
        },
        {
          value: "3",
          label: "地址",
        },
        {
          value: "4",
          label: "资本注册",
        },
      ],
      noteValue: "",
      // 变更记录的假数据
      noteObj: [
        {
          id: 0,
          shares: "张三",
          before: "10%",
          after: "10%",
          time: "2018-12-12",
        },
        {
          id: 1,
          shares: "张三",
          before: "10%",
          after: "-",
          time: "2018-12-12",
        },
        {
          id: 2,
          shares: "张三",
          before: "10%",
          after: "10%",
          time: "2018-12-12",
        },
      ],
      user_num: "",
      deparmentId: "",
      properson: "",
      messageper: "",
      cusTypeIsMumstFill: true, //编辑客户信息时客户类型是否为必填项
    };
  },
  mounted() {
    this.indusytryData();
  },
  created() {
    //console.log(this.custData);
    this.surveyEdit();
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.success_code = this.code.codeNum.SUCCESS;
    this.getIsMustFill();
  },
  methods: {
    //选择部门的输入框的数据回显
    sat(data) {
      //console.log(data)
      this.department = data[0].name;
      this.deparmentId = data[0].id;
    },
    //选择部门
    userbcs() {
      this.$store.state.Management.state = 1;
      var data = {
        token: this.token,
        userId: this.userId,
      };
      var _this = this;
      this.$post("/sys/getOrganization", data)
        .then((response) => {
          // _this.$store.commit('increment',response.data);
          //console.log(response.data)
          _this.flagstate = { states: 3 };
          _this.selectTree = response.data;
          _this.flags = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    statesboxsdepart(data) {
      //console.log(data)
      var arr = data;
      var str, strs;
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].id + ",";
        strs += arr[i].roleName + "/";
      }
      this.strs = strs.substring(9);
      this.RoleId = str.substring(9);
    },
    //添加人员
    findAllUser(data) {
      console.log(data, 66);
      if (data.length == 0) {
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        if (this.user_num == 1) {
          this.teamObj.pro_person = "";
          this.properson = "";
          this.findUserObj = [];
        } else {
          this.teamObj.pro_msg = "";
          this.messageper = "";
          this.findUserObjM = [];
        }
        return;
      }
      if (this.user_num == 1) {
        this.deployObj = data;
        this.teamObj.pro_person = this.deployObj[0].name;
        this.properson = this.deployObj[0].id;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.deployObj.forEach((v) => {
          v.uniqueKey = "user" + v.id;
        });
        this.findUserObj = this.deployObj;
      } else {
        this.deployObj = data;
        this.teamObj.pro_msg = this.deployObj[0].name;
        this.messageper = this.deployObj[0].id;
        this.findFlag = false;
        this.findState = {};
        this.checkState = {};
        this.deployObj.forEach((v) => {
          v.uniqueKey = "user" + v.id;
        });
        this.findUserObjM = this.deployObj;
      }
      console.log(this.properson, this.messageper);
    },
    // 选择用户
    optUser(num) {
      this.user_num = num;
      console.log(
        this.user_num,
        this.findUserObj,
        this.findUserObjM,
        this.deployObj
      );
      if (num == 1 && !this.teamObj.pro_person) {
        this.findUserObj = [];
      }
      if (num == 2 && !this.teamObj.pro_msg) {
        this.findUserObjM = [];
      }
      this.findFlag = true;
      this.findState = { state: 0 };
      this.checkState = { state: 1 };
      //   if (this.user_num == 1) {
      //     this.findUserObj = this.deployObj
      //   }
      //   if (this.user_num == 2) {
      //     this.findUserObjM = this.deployObj
      //   }
    },
    indexSelect(event) {
      this.A = event.target.value;
      // console.log(this.A);
    },
    //点击行业出现数据
    indexSelect01() {
      let i = 0;
      for (i = 0; i < this.select01.length; i++) {
        if (this.select01[i].name == this.indexId) {
          //console.log(this.select01[i].id)
          this.indexNum = i;
          this.indexId = this.select01[i].name;
          //console.log(this.indexNum)
          break;
        }
      }
      this.select02 = this.select01[this.indexNum].childrens;
      this.indexId2 = "";
    },
    indusytryData() {
      var datas = {
        data: {},
      };
      var _this = this;
      this.$post("/sys/Industry", datas)
        .then((response) => {
          //console.log(response.data)
          //let mes = response.data;
          //console.log(response.data)
          _this.select01 = response.data;
          // _this.indexSelect01();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    indexSelect0() {
      let i = 0;
      for (i = 0; i < this.select01.length; i++) {
        if (this.select01[i].name == this.indexId) {
          //console.log(this.select01[i].id)
          this.indexNum = i;
          this.indexId = this.select01[i].name;
          //console.log(this.indexNum)
          break;
        }
      }
      this.select02 = this.select01[this.indexNum].childrens;
    },
    //编辑
    editNote() {
      this.btn_flag = true;
      this.disabled = false;
      this.indexId2 = this.indexId2 ? this.indexId2 : this.custData.industryTwo;
      this.indusytryData();
      this.indexSelect0();
      // console.log(this.select02, 222, this.select01, this.indexId, this.custData.industryTwo, this.indexId2)
    },

    //回显数据
    surveyEdit() {
      console.log(this.custData, "回显数据");
      this.msgObj.pro_name = this.custData.name; //客户名称
      this.msgObj.abb_name = this.custData.abbreviation; //客户简称
      this.msgObj.pro_type = this.custData.type; //客户类型：
      this.msgObj.pro_state = this.custData.status; //客户状态
      this.indexId = this.custData.industryOne; //行业（1级）：
      this.indexId2 = this.custData.industryTwo; //行业（2级）：
      this.msgObj.pro_time = this.custData.foundingTime; //成立时间：
      this.msgObj.radioList = this.custData.ipo; //上市板块
      this.msgObj.list_time = this.custData.ipoTime; //上市时间：
      this.msgObj.pro_legal = this.custData.legalPerson; //法人代表：
      this.msgObj.pro_register = this.custData.registeredCapital; //注册资本：
      this.msgObj.pro_phone = this.custData.telephone; //联系电话：
      this.msgObj.pro_email = this.custData.email; //邮箱：
      this.msgObj.pro_fax = this.custData.fax; //传真：
      this.msgObj.zip_code = this.custData.postcode; //邮编：
      this.msgObj.pro_place = this.custData.address; //地址：
      this.msgObj.pro_http = this.custData.website; //公司网址：
      this.msgObj.pro_brief = this.custData.introduction; //公司简介：
      this.msgObj.pro_range = this.custData.business; //经营范围：
      this.msgObj.pro_remark = this.custData.remarks; //备注：

      // 服务团队
      this.teamObj.pro_person = this.custData.principalName; //客户负责人：
      this.properson = this.custData.principal; //客户负责人id
      this.findUserObj = [
        {
          name: this.teamObj.pro_person,
          label: this.teamObj.pro_person,
          id: this.properson,
          uniqueKey: "user" + this.custData.principal,
        },
      ];
      this.teamObj.pro_msg = this.custData.infoTraceName; //信息跟踪人：
      this.messageper = this.custData.infoTrace; //信息跟踪人id
      this.findUserObjM = [
        {
          name: this.teamObj.pro_msg,
          label: this.teamObj.pro_msg,
          id: this.messageper,
          uniqueKey: "user" + this.custData.infoTrace,
        },
      ];
      this.department = this.custData.deptIdName; //业务部门：
      this.deparmentId = this.custData.deptId; //业务部门id
    },
    getIsMustFill() {
      //获取新增融资客户时客户类型是否为必填项
      let data = {
        token: this.token,
        userId: this.userId,
        data: {
          tableId: 2, //固定为2
        },
      };
      this.$post("/sys/interface/enableState", data)
        .then((response) => {
          if (this.code.codeNum.SUCCESS == response.code) {
            let data = response.data;
            this.cusTypeIsMumstFill = data[0].enableState == 1 ? true : false;
          }
        })
        .catch(function (error) {});
    },
    //保存
    saveNote() {
      if (
        this.msgObj.pro_name == "" ||
        this.msgObj.pro_name == undefined ||
        this.msgObj.pro_name == null
      ) {
        this.$message.error("客户名称内容不能为空");
        return;
      }
      if (
        this.msgObj.abb_name == "" ||
        this.msgObj.abb_name == undefined ||
        this.msgObj.abb_name == null
      ) {
        this.$message.error("客户简称内容不能为空");
        return;
      }
      if (this.cusTypeIsMumstFill) {
        if (
          this.msgObj.pro_type == "" ||
          this.msgObj.pro_type == undefined ||
          this.msgObj.pro_type == null
        ) {
          this.$message.error("客户类型内容不能为空");
          return;
        }
      }
      if (
        this.msgObj.pro_state == "" ||
        this.msgObj.pro_state == undefined ||
        this.msgObj.pro_state == null
      ) {
        this.$message.error("客户状态内容不能为空");
        return;
      }
      if (this.indexId1 == "") {
        this.$message.error("行业（1级）不能为空");
        return;
      }
      if (this.indexId2 == "") {
        this.$message.error("行业（2级）不能为空");
        return;
      }
      if (
        this.msgObj.pro_range == "" ||
        this.msgObj.pro_range == undefined ||
        this.msgObj.pro_range == null
      ) {
        this.$message.error("经营范围不能为空");
        return;
      }
      // 邮箱
      if (this.msgObj.pro_email != "") {
        if (!this.$utils.testEmail(this.msgObj.pro_email)) {
          this.$message.error("请输入正确格式");
          return;
        }
      }
      // 联系电话验证
      const regularEx= /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
      const mobileEx = /^1[34578][0-9]{9}$/
      if(this.msgObj.pro_phone && !(regularEx.test(this.msgObj.pro_phone) || mobileEx.test(this.msgObj.pro_phone)) ){
        this.$message.error("联系电话格式错误，请重填");
        return false;
      }
      // 邮编验证
      // if (this.msgObj.zip_code != "") {
      //     if(!(/^[1-9][0-9]{5}$/.test(this.msgObj.zip_code))){
      //         this.$message.error("请输入正确格式");
      //         return false;
      //     }
      // }
      //传真
      if (this.msgObj.pro_fax != "") {
        if (
          !/^((([+]?\d{2}-)?0\d{2,3}-\d{7,8})|(([+]?\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/.test(
            this.msgObj.pro_fax
          )
        ) {
          this.$message.error("传真有误，请重填");
          return false;
        }
      }
      // if(this.teamObj.pro_depart == ""){
      //     this.$message.error('所属部门内容不能为空');
      //     return;
      // }
      // var statuscus = this.msgObj.pro_state;
      // console.log(statuscus)
      // if( statuscus == "初步洽谈"){
      //     alert(66)
      //     this.msgObj.pro_state = 1002
      // }else if(statuscus == "达成合作"){
      //     this.msgObj.pro_state = 1003
      //     alert(77)
      // }else if(statuscus == "协议签署"){
      //     alert(33)
      //     this.msgObj.pro_state = 1004
      //     console.log(this.msgObj.pro_state)
      // }

      var dataList = {
        data: {
          id: this.custData.id, //id
          name: this.msgObj.pro_name, //客户名称
          abbreviation: this.msgObj.abb_name, //客户简称
          type: this.msgObj.pro_type, //客户类型：
          status: this.msgObj.pro_state, //客户状态
          industryOne: this.indexId, //行业（1级）：
          industryTwo: this.indexId2, //行业（2级）：
          foundingTime: this.msgObj.pro_time, //成立时间：
          ipo: this.msgObj.radioList, //是否上市：
          ipoTime: this.msgObj.list_time, //上市时间：
          legalPerson: this.msgObj.pro_legal, //法人代表：
          registeredCapital: this.msgObj.pro_register, //注册资本：
          telephone: this.msgObj.pro_phone, //联系电话：
          email: this.msgObj.pro_email, //邮箱：
          fax: this.msgObj.pro_fax, //传真：
          postcode: this.msgObj.zip_code, //邮编：
          address: this.msgObj.pro_place, //地址：
          website: this.msgObj.pro_http, //公司网址：
          introduction: this.msgObj.pro_brief, //公司简介：
          business: this.msgObj.pro_range, //经营范围：
          remarks: this.msgObj.pro_remark, //备注：

          // 服务团队
          principal: this.properson, //客户负责人：
          infoTrace: this.messageper, //信息跟踪人：
          deptId: this.deparmentId, //业务部门：
        },
        token: this.token,
        userId: this.userId,
      };
      console.log(dataList, 11, this.properson, this.messageper);
      this.$post("/info/crm/company/update", dataList)
        .then((response) => {
          // _this.$message({
          //     message: '修改成功',
          //     type: 'success'
          // });
          // _this.btn_flag = false;
          // _this.disabled = true;
          if (response.code != this.success_code) {
            this.$message(response.msg);
            return;
          }
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.btn_flag = false;
          this.disabled = true;

          let originData = JSON.parse(this.$store.state.customObj.row);
          originData.name = this.msgObj.pro_name;
          originData.abbreviation = this.msgObj.abb_name;
          originData.type = this.msgObj.pro_type;
          originData.status = this.msgObj.pro_state;
          originData.industryOne = this.indexId;
          originData.industryTwo = this.indexId2;
          originData.foundingTime = this.msgObj.pro_time;
          originData.ipo = this.msgObj.radioList;
          originData.ipoTime = this.msgObj.list_time;
          originData.legalPerson = this.msgObj.pro_legal;
          originData.registeredCapital = this.msgObj.pro_register;
          originData.telephone = this.msgObj.pro_phone;
          originData.email = this.msgObj.pro_email;
          originData.fax = this.msgObj.pro_fax;
          originData.postcode = this.msgObj.zip_code;
          originData.address = this.msgObj.pro_place;
          originData.website = this.msgObj.pro_http;
          originData.introduction = this.msgObj.pro_brief;
          originData.business = this.msgObj.pro_range;
          originData.remarks = this.msgObj.pro_remark;
          originData.principalName = this.teamObj.pro_person;
          originData.principal = this.properson;
          originData.infoTrace = this.messageper;
          originData.infoTraceName = this.teamObj.pro_msg;
          originData.deptId = this.deparmentId;

          let obj = {
            id: this.$store.state.customObj.id,
            row: JSON.stringify(originData),
          };
          this.$store.commit("customObj", obj);
          this.$emit("changeData", {
            dataName: "custData",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //取消
    cancelNote() {
      this.btn_flag = false;
      this.disabled = true;
      // console.log(this.custData);
      var kkk = $.trim(this.custData.statusName);
      //console.log(kkk)
      this.msgObj.pro_name = this.custData.name; //客户名称
      this.msgObj.abb_name = this.custData.abbreviation; //客户简称
      this.msgObj.pro_type = this.custData.type; //客户类型：
      this.msgObj.pro_state = this.custData.status; //客户状态
      this.indexId = this.custData.industryOne; //行业（1级）：
      this.indexId2 = this.custData.industryTwo; //行业（2级）：
      this.msgObj.pro_time = this.custData.foundingTime; //成立时间：
      this.msgObj.radioList = this.custData.ipo; //上市板块
      this.msgObj.list_time = this.custData.ipoTime; //上市时间：
      this.msgObj.pro_legal = this.custData.legalPerson; //法人代表：
      this.msgObj.pro_register = this.custData.registeredCapital; //注册资本：
      this.msgObj.pro_phone = this.custData.telephone; //联系电话：
      this.msgObj.pro_email = this.custData.email; //邮箱：
      this.msgObj.pro_fax = this.custData.fax; //传真：
      this.msgObj.zip_code = this.custData.postcode; //邮编：
      this.msgObj.pro_place = this.custData.address; //地址：
      this.msgObj.pro_http = this.custData.website; //公司网址：
      this.msgObj.pro_brief = this.custData.introduction; //公司简介：
      this.msgObj.pro_range = this.custData.business; //经营范围：
      this.msgObj.pro_remark = this.custData.remarks; //备注：

      // 服务团队
      this.teamObj.pro_person = this.custData.principalName; //客户负责人：
      this.properson = this.custData.principal; //客户负责人id
      this.teamObj.pro_msg = this.custData.infoTraceName; //信息跟踪人：
      this.messageper = this.custData.infoTrace; //信息跟踪人id
      this.department = this.custData.deptIdName; //业务部门：
      this.deparmentId = this.custData.deptId; //业务部门id
    },
    //变更记录
    changeNote() {
      this.dialogVisibleFlag = true;
    },
  },
};
</script>
<style scoped lang="scss" type="text/css">
.financcustomdetail {
  position: relative;
  background: #fff;
  .cont_box {
    text-align: left;
    position: relative;
    background: #fff;
    .func_btn {
      position: absolute;
      width: 166px;
      height: 34px;
      right: 0;
      top: -10px;
      .el-button {
        float: right;
        margin-left: 10px;
      }
    }
    .leftspan {
      border-left: 4px solid #0061a9;
      padding-left: 8px;
    }
    .form_box {
      background: #fff;
      padding-top: 20px;
      padding-left: 10px;
      padding-bottom: 20px;
      .el-col-12 {
        width: 44%;
      }
      // width: 60%;
      .el-form-item {
        float: left;
        margin-right: 20px;
        margin-bottom: 15px;
        height: 40px;
        .el-input {
          width: 272px;
          height: 32px;
        }
        .inline-input {
          width: 217px;
        }
        .el-select {
          width: 272px;
        }
        .el-radio-group {
          width: 217px;
        }
        .el-textarea {
          width: 940px;
          height: 88px;
        }
      }
      .el-button {
        float: left;
        margin-left: 20px;
        margin-top: 2px;
      }
    }
    .servertearm {
      .el-input {
        width: 190px !important;
        height: 32px;
      }
      // .el-input:nth-child(2){

      // }
    }
  }
  .el-dialog {
    .shar_box {
      ul {
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        li {
          width: 100%;
          text-align: center;
          line-height: 30px;
          span:nth-child(1) {
            display: inline-block;
            width: 8%;
          }
          span:nth-child(2) {
            display: inline-block;
            width: 20%;
          }
          span:nth-child(3) {
            display: inline-block;
            width: 24%;
          }
          span:nth-child(4) {
            display: inline-block;
            width: 24%;
          }
          span:nth-child(5) {
            display: inline-block;
            width: 24%;
          }
          div {
            max-height: 300px;
            li {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.financcustomdetail .add_shares {
  position: fixed;
  right: 20px;
  top: 112px;
}

.financcustomdetail .el-textarea .el-textarea__inner {
  resize: none;
}
/* .financcustomdetail .el-select .el-input__inner{
    padding-right: 0px;
}
.financcustomdetail .el-input--suffix .el-input__inner{
    padding-right: 0px;
} */
</style>
