<template>
    <div class="financcustomdetail">
        <div class="cont_box">
            <span class="leftspan border-primary">基本信息</span>
            <div class="clearfix func_btn">
                <el-button size="medium" type="primary" @click="editCutomInfo" v-show="!isEdit" style="margin-right: 3px;" >编辑</el-button>
                <el-button size="medium" type="" @click="cancelEdit" v-show="isEdit"  style="margin-right: 3px;">取消</el-button>
                <el-button size="medium" type="primary" @click="saveCutomInfo" v-show="isEdit"  >保存</el-button>
            </div>
            <el-form ref="formData" :model="formData" label-width="120px" class="form_box clearfix">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="客户名称：" :rules="[{required:true}]">
                        <el-input v-model="formData.name" placeholder="请输入关键词" :disabled="!isEdit" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-if="cusTypeIsShowFill['客户简称']" :span="10">
                    <el-form-item label="客户简称：" :rules="[{required:cusTypeIsMumstFill['客户简称']}]">
                        <el-input v-model="formData.abbreviation" placeholder="请输入关键词" :disabled="!isEdit" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
         
                <el-col v-if="cusTypeIsShowFill['客户类型']" :span="10">
                    <el-form-item label="客户类型：" :rules="[{required:cusTypeIsMumstFill['客户类型']}]">
                        <el-select v-model="formData.type" placeholder="请选择客户类型" clearable :disabled="!isEdit">
                            <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col v-if="cusTypeIsShowFill['客户状态']" :span="10">
                    <el-form-item label="客户状态：" :rules="[{required:cusTypeIsMumstFill['客户状态']}]">
                        <el-select v-model="formData.status" placeholder="请选择客户状态" clearable :disabled="!isEdit">
                            <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
          
                <el-col v-if="cusTypeIsShowFill['成立时间']" :span="10">
                    <el-form-item label="成立时间：" :rules="[{required:cusTypeIsMumstFill['成立时间']}]">
                        <el-date-picker  v-model="formData.foundingTime"
                                         type="date"
                                         format="yyyy-MM-dd"
                                         value-format="yyyy-MM-dd"
                                         placeholder="选择日期"
                                         :disabled="!isEdit"
                                         @focus="$utils.handleTimeFocus"></el-date-picker>
                    </el-form-item>
                </el-col>
         
                <!-- <el-col :span="10">
                <el-form-item label="上市时间：" :rules="[{required:cusTypeIsMumstFill['上市时间']}]">
                    <el-date-picker  v-model="formData.ipoTime"
                                     type="date"
                                     format="yyyy-MM-dd"
                                     value-format="yyyy-MM-dd"
                                     placeholder="选择日期"
                                     :disabled="!isEdit"
                                     @focus="$utils.handleTimeFocus"></el-date-picker>
                </el-form-item>
                </el-col> -->
                <el-col v-if="cusTypeIsShowFill['法人代表']" :span="10">
                    <el-form-item label="法人代表：" :rules="[{required:cusTypeIsMumstFill['法人代表']}]">
                    <el-input v-model="formData.legalPerson" placeholder="请输入法人代表" :disabled="!isEdit"   maxlength="20"></el-input>
                </el-form-item>
                </el-col>
            
                <el-col v-if="cusTypeIsShowFill['注册资本']" :span="10">
                    <el-form-item label="注册资本：" :rules="[{required:cusTypeIsMumstFill['注册资本']}]">
                    <el-input v-model="formData.registeredCapital" placeholder="请输入注册资本" :disabled="!isEdit"   maxlength="50"></el-input>
                </el-form-item>
                </el-col>
                <el-col v-if="cusTypeIsShowFill['联系电话']" :span="10">
                    <el-form-item label="联系电话：" :rules="[{required:cusTypeIsMumstFill['联系电话']}]">
                    <el-input v-model="formData.telephone" placeholder="请输入联系电话" :disabled="!isEdit"   maxlength="200"></el-input>
                </el-form-item>
                </el-col>
         
                <el-col v-if="cusTypeIsShowFill['邮箱']" :span="10">
                    <el-form-item label="邮箱：" :rules="[{required:cusTypeIsMumstFill['邮箱']}]">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" :disabled="!isEdit"  maxlength="50"></el-input>
                </el-form-item>
                </el-col>
                <el-col v-if="cusTypeIsShowFill['传真']" :span="10">
                    <el-form-item label="传真：" :rules="[{required:cusTypeIsMumstFill['传真']}]">
                    <el-input v-model="formData.fax" placeholder="请输入传真" :disabled="!isEdit"  maxlength="15"></el-input>
                </el-form-item>
                </el-col>
          
                <el-col v-if="cusTypeIsShowFill['邮编']" :span="10">
                    <el-form-item label="邮编：" :rules="[{required:cusTypeIsMumstFill['邮编']}]">
                    <el-input v-model="formData.postcode" placeholder="请输入邮编" @input="formData.postcode=formData.postcode.replace(/[^\d\.]/g,'')" :disabled="!isEdit"  maxlength="6"></el-input>
                </el-form-item>
                </el-col>
                <el-col v-if="cusTypeIsShowFill['地址']" :span="10">
                         <el-form-item label="地址：" :rules="[{required:cusTypeIsMumstFill['地址']}]">
                    <el-input v-model="formData.address" placeholder="请输入地址" :disabled="!isEdit"  maxlength="100"></el-input>
                </el-form-item>
                </el-col>
          
                <el-col v-if="cusTypeIsShowFill['公司网址']" :span="10">
                        <el-form-item label="公司网址：" :rules="[{required:cusTypeIsMumstFill['公司网址']}]">
                    <el-input v-model="formData.website" placeholder="请输入公司网址" :disabled="!isEdit"  maxlength="100"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-if="cusTypeIsShowFill['客户简介']" :span="22">
                    <el-form-item label="公司简介：" style="margin-top:10px;" :rules="[{required:cusTypeIsMumstFill['客户简介']}]">
                        <el-input type="textarea"   v-model.trim="formData.introduction" placeholder="请输入公司简介" :disabled="!isEdit"  maxlength="2000"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-if="cusTypeIsShowFill['备注']" :span="24">
                    <el-form-item label="备注：" style="margin-top:10px;" :rules="[{required:cusTypeIsMumstFill['备注']}]">
                        <el-input type="textarea"   v-model.trim="formData.remarks" placeholder="请输入备注" :disabled="!isEdit"  maxlength="2000"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </div>
        <div class="cont_box" v-if="cusTypeIsShowFill['信息跟踪人'] || cusTypeIsShowFill['客户负责人']">
            <span class="leftspan border-primary">服务团队</span>
            <el-form ref="form" :model="teamObj" label-width="120px" class="form_box clearfix servertearm">
                 <el-row>
                    <el-col v-if="cusTypeIsShowFill['']" :span="10">
                        <el-form-item label="客户负责人：" :rules="[{required:cusTypeIsMumstFill['客户负责人']}]">
                        <el-input v-model="principalName" class="fl" placeholder="请输入客户负责人" disabled></el-input>
                        <el-button type="primary" size="small" @click="optUser(1)" class="fl"   :disabled="!isEdit" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                    </el-form-item>
                </el-col>
                 <el-col v-if="cusTypeIsShowFill['信息跟踪人']" :span="10">
                     <el-form-item label="信息跟踪人：" :rules="[{required:cusTypeIsMumstFill['信息跟踪人']}]">
                    <el-input v-model="infoTraceName" class="fl" placeholder="请输入信息跟踪人" disabled></el-input>
                    <el-button type="primary" size="small" @click="optUser(2)" class="fl"   :disabled="!isEdit" style="margin-left: 0px;height: 40px;margin-top: 0px;">选择人员</el-button>
                </el-form-item>
                </el-col>
            </el-row>

            </el-form>
        </div>
        <!-- 选择人员 -->
        <fintall-deptuser :findFlagShow.sync="findFlag" 
                        :findUserObj="customType == 1 ? findUserObj : findUserObjM"
                        :findState="findState" 
                        :checkState="checkState"
                        @findAllUser="findAllUser"></fintall-deptuser>
    </div>
</template>
<script>
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
    export default {
        name: 'investcustomdetail',
        props: ['customData'],
        components: {
            fintallDeptuser
        },
        data(){
            return {
                isEdit: false, // 是否是编辑状态
                formData: {
                    id:'',
                    name:'', //客户名称
                    abbreviation: '', //客户简称
                    type: '', //客户类型
                    status: '', //客户状态
                    foundingTime: '', //成立时间
                    // ipo: '', //上市板块
                    // ipoTime: '', //上市时间
                    legalPerson: '', //法人代表
                    registeredCapital: '', //注册资本
                    telephone: '', //联系电话
                    email: '', //邮箱
                    fax: '', //传真
                    postcode: '', //邮编
                    address: '', //地址
                    website: '', //公司网址
                    introduction: '', //公司简介
                    business: '', //经营范围
                    remarks: '', //备注
                    principal: '',
                    infoTrace: ''
                },
                customType:'', // 客户类型：1 客户负责人；2：信息跟踪人
                findUserObj: [], // 已选客户负责人数据
                findUserObjM: [], // 已选信息跟踪人数据
                findFlag:false, // 是否展示选择人员弹窗
                findState:{},
                checkState:{},

                // 客户状态
                selectStateListState:[
                    {
                        value: 1002,
                        label: '初步洽谈'
                    },
                    {
                        value: 1003,
                        label: '达成合作'
                    },
                    {
                        value: 1004,
                        label: '协议签署'
                    }
                ],
                // 客户类型
                selectStateListType: [
                    {
                        value: 1066,
                        label: '银行'
                    },
                    {
                        value: 1067,
                        label: '非银行机构'
                    }
                ],
                // 上市板块
                selectStateListipo:[
                    {
                        value: 1009,
                        label: '未上市'
                    },
                    {
                        value: 1010,
                        label: '主板'
                    },
                    {
                        value: 1011,
                        label:'中小板'
                    },
                    {
                        value: 1012,
                        label:'创业板'
                    },
                    {
                        value: 1013,
                        label:'新三板'
                    },
                    {
                        value: 1065,
                        label:'科创板'
                    },
                    {
                        value: 1014,
                        label:'其他'
                    }
                ],

                options: [{
                    value: '1',
                    label: '全部'
                }, {
                    value: '2',
                    label: '经营范围'
                }, {
                    value: '3',
                    label: '地址'
                }, {
                    value: '4',
                    label: '资本注册'
                }],

                cusTypeIsMumstFill: {
                    '客户简称': true,
                    '客户状态': true,
                    '客户类型': false,
                    '成立时间': false,
                    '法人代表': false,
                    '注册资本': false,
                    '联系电话': false,
                    '传真': false,
                    '邮编': false,
                    '地址': false,
                    '公司网址': false,
                    '公司简介': false,
                    '备注': false,
                    '客户负责人': false,
                    '信息跟踪人': false
  
                },//编辑客户信息时客户类型是否为必填项
                cusTypeIsShowFill: {
                    '客户简称': true,
                    '客户状态': true,
                    '客户类型': true,
                    '成立时间': true,
                    '法人代表': true,
                    '注册资本': true,
                    '联系电话': true,
                    '传真': true,
                    '邮编': true,
                    '地址': true,
                    '公司网址': true,
                    '公司简介': true,
                    '备注': true,
                    '客户负责人': true,
                    '信息跟踪人': true
  
                },//编辑客户信息时客户类型是否为必填项
                principalName: '', // 客户负责人姓名展示
                infoTraceName: '', // 信息追踪人姓名展示
                // deparmentId:'',
                // properson:'',
                // messageper:'',

                teamObj:{
                    pro_person: '',
                    pro_msg: '',
                    pro_depart: '',
                },
            }

        },
        created () {
            //console.log(this.customData);
            this.initCustomData();
            this.success_code = this.code.codeNum.SUCCESS;
            this.getIsMustFill();
        },
        mounted(){
        },
        methods:{
            initSelectOptions(){
                
            },

            // 处理选中的人员数据
            findAllUser(data){
                this.findFlag = false;
                this.findState = {};
                this.checkState = {};

                // 未选中数据、清空选中的数据
                if(data.length ==0){
                  if(this.customType == 1){
                    this.formData.principal = '';
                    this.principalName = '';
                    this.findUserObj = []
                  }else{
                    this.formData.infoTrace = '';
                    this.infoTraceName = '';
                    this.findUserObjM = []
                  }
                  return
                }
                // 处理选中的数据
                let selectedData = data.map(v => {
                        v.uniqueKey= 'user' + v.id
                        return v
                    })

                if(this.customType == 1){
                    this.formData.principal = data[0].id;
                    this.principalName = data[0].name;
                 
                    this.findUserObj = selectedData
                }else{
                    this.formData.infoTrace = data[0].id;
                    this.infoTraceName = data[0].name;
                  
                    this.findUserObjM = selectedData
                }

            },
            // 打开选择用户弹窗
            optUser(num){
              this.customType = num;
              if (num == 1 && !this.principalName) {
                this.findUserObj = []
              }
              if (num == 2 && !this.infoTraceName) {
                this.findUserObjM = []
              }
              this.findFlag = true;
              this.findState = {state:0};
              this.checkState = {state:1};
            },


            // 进入编辑状态
            editCutomInfo(){
                this.isEdit = true
            },
            // 回显数据
            initCustomData(){
                console.log(this.customData,'回显数据');
                if(!this.customData) return

                // this.formData = {...this.customData}
                for(let k in this.formData) { // 避免多余字段
                    this.formData[k] = this.customData[k]
                }

               

                // 服务团队
                this.principalName = this.customData.principalName;//客户负责人
                this.infoTraceName = this.customData.infoTraceName;//信息跟踪人
                // this.properson = this.customData.principal; //客户负责人id
                // this.messageper = this.customData.infoTrace  //信息跟踪人id
                // this.department = this.customData.deptIdName;//业务部门
                // this.deparmentId = this.customData.deptId //业务部门id
                // 客户负责人
                this.findUserObj = [
                    {
                        name:this.customData.principalName,
                        label:this.customData.principalName, 
                        id:this.customData.principal, 
                        uniqueKey: 'user' + this.customData.principal
                    }
                ];
                // 信息追踪人
                this.findUserObjM = [
                    {
                        name:this.customData.infoTraceName,
                        label:this.customData.infoTraceName, 
                        id:this.customData.infoTrace, 
                        uniqueKey: 'user' + this.customData.infoTrace
                    }
                ]

            },
            // 获取新增融资客户时客户类型是否为必填项
            getIsMustFill() {
                let data = {
                    data: {
                        tableId: 4//投资人
                    }
                }
                this.$post('/sys/interface/enableState', data).then((response)=> {
                    if(this.code.codeNum.SUCCESS == response.code) {                    
                        let data =  response.data;
                        data.forEach(v=>{
                            this.cusTypeIsMumstFill[v.name] = v.enableState === 1
                            this.cusTypeIsShowFill[v.name] = v.enableShow === 1
                            // this.$set(this.cusTypeIsMumstFill, v.name, v.enableState === 1)
                        })
                        // todo 处理设置的必填项
                        // this.cusTypeIsMumstFill = data[0].enableState == 1 ? true : false;         
                    }                      
                }).catch((error)=> {
                    console.log(error)
                });
            },
            // 数据验证
            checkDataBeforeSave(){
                let checked = true
                if(!this.formData.name){
                    this.$message.error('客户名称内容不能为空');
                    checked = false
                    return;
                }
                if(this.cusTypeIsMumstFill['客户简称'] && !this.formData.abbreviation){
                    this.$message.error('客户简称内容不能为空');
                    checked = false
                    return;
                }
                if(this.cusTypeIsMumstFill['客户类型'] && !this.formData.type){
                    this.$message.error('客户类型内容不能为空');
                    checked = false
                    return;
                }               
                if(this.cusTypeIsMumstFill['客户状态'] && !this.formData.status){
                    this.$message.error('客户状态不能为空');
                    checked = false
                    return;
                }

                if(this.cusTypeIsMumstFill['成立时间'] && !this.formData.foundingTime){
                    this.$message.error('成立时间不能为空');
                    checked = false
                    return;
                }

                if(this.cusTypeIsMumstFill['法人代表'] && !this.formData.legalPerson){
                    this.$message.error('法人代表不能为空');
                    checked = false
                    return;
                }

                if(this.cusTypeIsMumstFill['注册资本'] && !this.formData.registeredCapital){
                    this.$message.error('注册资本不能为空');
                    checked = false
                    return;
                }

                if(this.cusTypeIsMumstFill['联系电话'] && !this.formData.telephone){
                    this.$message.error('联系电话不能为空');
                    checked = false
                    return;
                }

                // 邮箱
                if (this.cusTypeIsMumstFill['邮箱'] && !this.formData.email) {
                    this.$message.error('邮箱不能为空');
                    checked = false
                    return;
                }

                if(this.formData.email && !this.$utils.testEmail(this.formData.email)){
                    this.$message.error('邮箱格式不正确');
                    checked = false
                    return;
                }

                // 传真
                if (this.cusTypeIsMumstFill['传真'] && !this.formData.fax) {
                    this.$message.error('传真不能为空');
                    checked = false
                    return;
                }

                if(this.formData.fax && !this.$utils.testFax(this.formData.fax)){
                    this.$message.error('传真格式不正确');
                    checked = false
                    return;
                }



                if(this.cusTypeIsMumstFill['地址'] && !this.formData.address){
                    this.$message.error('地址不能为空');
                    checked = false
                    return;
                }


                if(this.cusTypeIsMumstFill['公司网址'] && !this.formData.website){
                    this.$message.error('公司网址不能为空');
                    checked = false
                    return;
                }


                if(this.cusTypeIsMumstFill['公司简介'] && !this.formData.introduction){
                    this.$message.error('公司简介不能为空');
                    checked = false
                    return;
                }

                if(this.cusTypeIsMumstFill['备注'] && !this.formData.remarks){
                    this.$message.error('备注不能为空');
                    checked = false
                    return;
                }


                if(this.cusTypeIsMumstFill['客户负责人'] && !this.formData.principal){
                    this.$message.error('客户负责人不能为空');
                    checked = false
                    return;
                }


                if(this.cusTypeIsMumstFill['信息跟踪人'] && !this.formData.infoTrace){
                    this.$message.error('信息跟踪人不能为空');
                    checked = false
                    return;
                }

                return checked

            },
            // 保存修改的客户信息
            saveCutomInfo(){
                if(!this.checkDataBeforeSave()) return
                    this.$post('/info/crm/investor/update', {data: this.formData}).then((response)=> {
                        if(response.code != this.success_code){
                            this.$message.error(response.msg);
                            return
                        }
                        this.$message.success('修改成功');
                        this.isEdit = false;


                        // originData.principalName = this.teamObj.pro_person
                        // originData.principal = this.properson;
                        // originData.infoTrace = this.messageper;
                        // originData.infoTraceName = this.teamObj.pro_msg;
                        // originData.deptId = this.deparmentId;
                        let customObj = {
                            id: this.formData.id,
                            principalName: this.principalName,
                            infoTraceName: this.infoTraceName,
                            principal: this.formData.principal,
                            infoTrace: this.formData.infoTrace
                        }

                        let obj = {
                            id: this.$store.state.customObj.id,
                            row: JSON.stringify(customObj)
                        }
                        this.$store.commit('customObj',obj)
                        this.$emit('changeData',{dataName: 'investmentData'})

                    }).catch((error)=> {
                        console.log(error);
                    });
            },
            //取消编辑，恢复初始数据
            cancelEdit(){
                this.isEdit = false;
                this.initCustomData()
            },
        }
    }
</script>
<style scoped lang="scss" type="text/css">
    .financcustomdetail{
        position:relative;
        background: #fff;
        .cont_box{
            text-align: left;
            position:relative;
            background:#fff;
            .func_btn{
                position:absolute;
                width:166px;
                height:34px;
                right:0;
                top:-10px;
                .el-button{
                    float: right;
                    margin-left: 10px;
                }
            }
            .leftspan{
                border-left: 4px solid #0061A9;
                padding-left: 8px;

            }
            .form_box{
                background:#fff;
                padding-top: 20px;
                padding-left:10px;
                padding-bottom:20px;
                .el-col-12{
                    width: 44%;
                }
                // width: 60%;
                .el-form-item{
                    float:left;
                    margin-right:20px;
                    margin-bottom: 15px;
                    height:40px;
                    .el-input{
                        width:272px;
                        height: 32px;;
                    }
                    .inline-input{
                        width:217px;
                    }
                    .el-select{
                        width:272px;
                    }
                    .el-radio-group{
                        width:217px;
                    }
                    .el-textarea{
                        width:940px;
                        height: 88px;

                    }
                }
                .el-button{
                    float:left;
                    margin-left:20px;
                    margin-top:2px;
                }
             }
             .servertearm{
                .el-input{
                        width:190px!important;
                        height: 32px;;
                    }
                // .el-input:nth-child(2){

                // }
             }
        }
        .el-dialog{
            .shar_box{
                ul{
                    width:100%;
                    padding:10px 20px;
                    box-sizing: border-box;
                     li{
                        width:100%;
                        text-align:center;
                        line-height:30px;
                        span:nth-child(1){
                            display: inline-block;
                            width:8%;
                        }
                        span:nth-child(2){
                            display: inline-block;
                            width:20%;
                        }
                        span:nth-child(3){
                            display: inline-block;
                            width:24%;
                        }
                        span:nth-child(4){
                            display: inline-block;
                            width:24%;
                        }
                        span:nth-child(5){
                            display: inline-block;
                            width:24%;
                        }
                        div{
                            max-height: 300px;
                            li{
                                width:100%;
                            }
                        }
                     }
                 }
            }
         }
    }
</style>
<style>
    .financcustomdetail .add_shares{
        position:fixed;
        right:20px;
        top:112px;
    }

.financcustomdetail .el-textarea .el-textarea__inner{
  resize: none;
}


</style>
