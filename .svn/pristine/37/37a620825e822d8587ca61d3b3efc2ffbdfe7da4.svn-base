<template>
<div class="financparentsclass">
    <div class="financdetail">
        <div class="cont_box">
            <span>基本信息</span>
            <div class="clearfix func_btn">
                <el-button size="medium" type="primary" @click="editNote" v-if="btn_flag == false" style="margin-right: 3px;" >编辑</el-button>
                <el-button size="medium" type="" @click="cancelNote" v-if="btn_flag == true" style="margin-right: 3px;" >取消</el-button>
                <el-button size="medium" type="primary" @click="saveNote" v-if="btn_flag == true"  >保存</el-button>
            </div>
            <el-form ref="msgObj" :model="msgObj" label-width="120px" class="form_box clearfix">
                <el-row>
                    <el-col :span="10">
                <el-form-item label="机构名称：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_name" placeholder="请输入机构名称" :disabled="disabled" maxlength="100"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="机构简称：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.abb_name" placeholder="请输入机构简称" :disabled="disabled" maxlength="50"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="机构类型：" :rules="[{required:true}]">

                    <!-- <el-select v-model="msgObj.pro_type" placeholder="请选择机构类型" clearable  @change="selectRoleChange" :disabled="disabled">
                        <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                    </el-select> -->
                     <el-select v-model="msgObj.type" placeholder="请选择机构类型" clearable  :disabled="disabled" >
                        <!-- <el-option v-for="item in selectStateList" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
                        <el-option v-for="item in selectStateListState1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <!-- <el-form-item label="客户状态：" :rules="[{required:true}]">
                        <el-select v-model="msgObj.status" placeholder="请选择客户状态" clearable  @change="selectRoleChange"  :disabled="disabled">
                            <el-option v-for="item in selectStateListState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                </el-form-item> -->
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="机构联系人：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_fper" placeholder="请输入机构联系人" :disabled="disabled" maxlength="20"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="14">
                <el-form-item label="客户负责人：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :customer="customer"></el-input>
                    <el-button type="primary" size="small" @click="optUser" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;" :disabled="disabled">选择用户</el-button>
                    <!-- <el-input v-model="msgObj.pro_cper" placeholder="请输入关键词" :disabled="disabled"></el-input> -->
                    <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;">
                        <span v-for="item in  deployObj" class="role_btn">{{item.name}}</span>
                    </div>
                    <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:3px;">选择用户</el-button> -->
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="联系电话：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_phone" placeholder="请输入联系电话" :disabled="disabled" maxlength="200"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="邮箱：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_email" placeholder="请输入邮箱" :disabled="disabled" maxlength="50"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="传真：">
                    <el-input v-model="msgObj.pro_fax" placeholder="请输入传真"  :disabled="disabled" maxlength="15"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="邮编：">
                    <el-input v-model="msgObj.zip_code" placeholder="请输入邮编" @input="msgObj.zip_code=msgObj.zip_code.replace(/[^\d\.]/g,'')" :disabled="disabled" maxlength="6"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="办公地址：">
                    <el-input v-model="msgObj.pro_place" placeholder="请输入办公地址" :disabled="disabled" maxlength="100"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="机构网址：">
                    <el-input v-model="msgObj.pro_http" placeholder="请输入机构网址" :disabled="disabled" maxlength="100"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                <el-form-item label="机构简介：" style="margin-top:10px;">
                    <el-input type="textarea" :rows="2"  v-model.trim="msgObj.pro_brief" placeholder="请输入机构简介" :disabled="disabled" maxlength="2000"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                <el-form-item label="备注：" style="margin-top:10px;">
                    <el-input type="textarea" :rows="2"  v-model.trim="msgObj.pro_range" placeholder="请输入备注" :disabled="disabled" maxlength="100"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work> -->
      <!--:findUserObj="findUserObj"-->
      <fintall-deptuser :findFlagShow.sync="findFlag"
                        v-on:findAllUser="findAllUser"
                        :findUserObj="findUserObj"
                        :findState="findState" :checkState="checkState"></fintall-deptuser>
    </div>
</div>
</template>
<script>
// import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
    export default {
        name: 'financdetail',
        props: ['finacnData'],
            components: {
                fintallDeptuser
            // frameWork
        },
        data(){
            return {
                findUserObj: [],
                btn_flag: false,
                disabled: true,
                msgObj:{
                    pro_name: '',
                    abb_name: '',
                    type: '',
                    status: '',
                    pro_fper:'',
                    principal:"",
                    pro_phone: '',
                    pro_email: '',
                    pro_fax: '',
                    zip_code: '',
                    pro_place: '',
                    pro_http: '',
                    pro_brief: '',
                    pro_range: '',
                },
                selectStateListState1:[
                    {
                        value: 1056,
                        label: '会计师事务所'
                    },
                    {
                        value: 1057,
                        label: '律师事务所'
                    },
                    {
                        value: 1058,
                        label: '资产评估机构'
                    },
                    {
                        value: 1059,
                        label: '信用评级机构'
                    },
                     {
                        value: 1060,
                        label: '券商机构'
                        }
                    ],
                     // 客户状态
                    // selectStateListState:[
                    //     {
                    //         value: 1002,
                    //         label: '初步洽谈'
                    //     },
                    //     {
                    //         value: 1003,
                    //         label: '达成合作'
                    //     },
                    //     {
                    //         value: 1004,
                    //         label: '协议签署'
                    //     }
                    // ],
                    deployObj:[
                    {name:''},
                ],
                //添加人员
                flag:false,
                peodatas:'',
                token:'',
                userId:'',
                success_code:'',
                findFlag:false,
                findState:{},
                checkState:{},
                customer:''
            }
        },
        mounted(){
        },
        created () {

            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
             //console.log(this.finacnData)
            this.financEdit();
        },
        methods:{
        //添加人员
        findAllUser(data){
          if(!data || !data.length){
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            this.msgObj.principal = '';
            this.customer = '';
            return
          }
            this.deployObj = data;
            this.msgObj.principal = this.deployObj[0].name;
            this.customer = this.deployObj[0].userId;
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            this.findUserObj = data
         },
        // 选择用户
        optUser(){
            this.findFlag = true;
            this.findState = {state:0};
            this.checkState = {state:1};
            this.findUserObj = []
            // if (!this.msgObj.principal) {
            //   this.findUserObj = []
            // }
        },
            //编辑
            editNote(){
                this.btn_flag = true;
                this.disabled = false;
            },

            //回显数据
            financEdit(){
                //console.log(this.finacnData);
                this.msgObj.pro_name = this.finacnData.name;//机构名称：
                this.msgObj.abb_name = this.finacnData.abbreviation;//机构简称：
                this.msgObj.type = this.finacnData.type;//机构类型：
                // this.msgObj.status = this.finacnData.statusName;//合作状态：
                this.msgObj.pro_fper = this.finacnData.contact;//机构联系人：
                this.msgObj.principal = this.finacnData.principalName;//客户负责人
                this.customer = this.finacnData.principal;
                this.msgObj.pro_phone = this.finacnData.telephone;//联系电话：
                this.msgObj.pro_email = this.finacnData.email;//邮箱：
                this.msgObj.pro_fax = this.finacnData.fax;//传真：
                this.msgObj.zip_code = this.finacnData.postcode;//邮编：
                this.msgObj.pro_place = this.finacnData.address;//办公地址：
                this.msgObj.pro_http = this.finacnData.website;//机构网址：
                this.msgObj.pro_brief = this.finacnData.introduction;//机构简介：
                this.msgObj.pro_range = this.finacnData.remarks;//备注：
                // 初始化选择用户的值
                this.findUserObj = [{name: this.finacnData.principalName, label: this.finacnData.principalName, id: this.finacnData.principal,uniqueKey: 'user' + this.finacnData.principal}]
            },
            //保存
            saveNote(){
                if(this.msgObj.pro_name == "" || this.msgObj.pro_name == undefined || this.msgObj.pro_name == null){
                this.$message.error('机构名称内容不能为空');
                return;
                }
                if(this.msgObj.abb_name == "" || this.msgObj.abb_name == undefined || this.msgObj.abb_name == null){
                    this.$message.error('机构简称内容不能为空');
                    return;
                }
                if(this.msgObj.type == "" || this.msgObj.type == undefined || this.msgObj.type == null){
                    this.$message.error('机构类型内容不能为空');
                    return;
                }
                // if(this.msgObj.status == "" || this.msgObj.status == undefined || this.msgObj.status == null){
                //     this.$message.error('客户状态内容不能为空');
                //     return;
                // }
                if(this.msgObj.pro_fper == "" || this.msgObj.pro_fper == undefined || this.msgObj.pro_fper == null){
                    this.$message.error('机构联系人内容不能为空');
                    return;
                }
                if(this.msgObj.principal == "" || this.msgObj.principal == undefined || this.msgObj.principal == null){
                    this.$message.error('客户负责人内容不能为空');
                    return;
                }
                  if(this.msgObj.pro_phone == "" || this.msgObj.pro_phone == undefined || this.msgObj.pro_phone == null){
                    this.$message.error('联系电话不能为空');
                    return;
                }
                // if (this.msgObj.pro_phone == "" || this.msgObj.pro_phone == undefined || this.msgObj.pro_phone == null) {
                //     this.$message.error('联系电话不能为空');
                //     return;
                // } else if (!(/^[0-9]+.?[0-9]*$/.test(this.msgObj.pro_phone))) {
                //     this.$message.error('联系电话有误，请重填');
                //     return;
                // }
                if (this.msgObj.pro_email == "") {
                    this.$message.error('邮箱内容不能为空');
                    return;
                } else if (!this.$utils.testEmail(this.msgObj.pro_email)) {
                    this.$message.error('邮箱格式错误');
                    return;
                }

                // if(!(/^1[34578]\d{9}$/.test(this.msgObj.pro_phone))){
                //     this.$message.error("联系电话有误，请重填");
                //     return false;
                // }else{
                //     this.$message.error("联系电话不能为空");
                // }

                // 邮编验证
                // if (this.msgObj.zip_code != "") {
                //     if(!(/^[1-9][0-9]{5}$/.test(this.msgObj.zip_code))){
                //         this.$message.error("邮编有误，请重填");
                //         return false;
                //     }
                // }
                //传真
                if (this.msgObj.pro_fax != "") {
                    if(!(/^((([+]?\d{2}-)?0\d{2,3}-\d{7,8})|(([+]?\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/.test(this.msgObj.pro_fax))){
                        this.$message.error("传真有误，请重填");
                        return false;
                    }
                }
                // var prostate = this.msgObj.status;
                // if( prostate == "初步洽谈"){
                //     this.msgObj.status = 1002
                //     console.log(this.msgObj.status)
                // }else if(prostate == "达成合作"){
                //     this.msgObj.status = 1003
                // }else if(prostate == "协议签署"){
                //     this.msgObj.status = 1004
                // }

                    var dataList={
                        data:{
                            id: this.finacnData.id,//id
                            name:this.msgObj.pro_name,//机构名称：
                            abbreviation:this.msgObj.abb_name, //机构简称：
                            type:this.msgObj.type,//机构类型：
                            // status:this.msgObj.status,//合作状态：
                            contact:this.msgObj.pro_fper,//机构联系人：
                            principal:this.customer,//客户负责人
                            telephone:this.msgObj.pro_phone,//联系电话：
                            email:this.msgObj.pro_email,//邮箱：
                            fax:this.msgObj.pro_fax,//传真：
                            postcode:this.msgObj.zip_code,//邮编：
                            address:this.msgObj.pro_place,//办公地址：
                            website:this.msgObj.pro_http,//机构网址：
                            introduction:this.msgObj.pro_brief,//机构简介：
                            remarks:this.msgObj.pro_range//备注：
                        },
                        token:this.token,
                        userId:this.userId
                    }
                    this.$post('/info/crm/Intermediary/update', dataList).then((response)=> {
                        if(response.code != this.success_code){
                            this.$message(response.msg);
                            return
                        }
                        this.$message.success('修改成功');
                        this.btn_flag = false;
                        this.disabled = true;

                        let originData = JSON.parse(this.$store.state.customObj.row);
                        originData.name = this.msgObj.pro_name;
                        originData.abbreviation = this.msgObj.abb_name;
                        originData.type = this.msgObj.type;
                        // originData.statusName = this.msgObj.status;
                        originData.contact = this.msgObj.pro_fper;
                        originData.principalName = this.msgObj.principal;
                        originData.principal = this.customer;
                        originData.telephone = this.msgObj.pro_phone;
                        originData.email = this.msgObj.pro_email;
                        originData.fax = this.msgObj.pro_fax;
                        originData.postcode = this.msgObj.zip_code;
                        originData.address = this.msgObj.pro_place;
                        originData.website = this.msgObj.pro_http;
                        originData.introduction = this.msgObj.pro_brief;
                        originData.remarks = this.msgObj.pro_range;

                        let obj = {
                            id: this.$store.state.customObj.id,
                            row: JSON.stringify(originData)
                        }
                        this.$store.commit('customObj',obj)
                        this.$emit('changeData',{
                            dataName: 'finacnData'
                        })
                    }).catch(function(error) {
                        console.log(error);
                    });
            },
            //取消
            cancelNote(){
                this.btn_flag = false;
                this.disabled = true;
                this.msgObj.pro_name = this.finacnData.name;//机构名称：
                this.msgObj.abb_name = this.finacnData.abbreviation;//机构简称：
                this.msgObj.type = this.finacnData.type;//机构类型：
                // this.msgObj.status = this.finacnData.statusName;//合作状态：
                this.msgObj.pro_fper = this.finacnData.contact;//机构联系人：
                this.msgObj.principal = this.finacnData.principalName;//客户负责人
                this.msgObj.pro_phone = this.finacnData.telephone;//联系电话：
                this.msgObj.pro_email = this.finacnData.email;//邮箱：
                this.msgObj.pro_fax = this.finacnData.fax;//传真：
                this.msgObj.zip_code = this.finacnData.postcode;//邮编：
                this.msgObj.pro_place = this.finacnData.address;//办公地址：
                this.msgObj.pro_http = this.finacnData.website;//机构网址：
                this.msgObj.pro_brief = this.finacnData.introduction;//机构简介：
                this.msgObj.pro_range = this.finacnData.remarks;//备注：
            },
        }
    }
</script>
<style scoped lang="scss" type="text/css">
   .financparentsclass .financdetail{
        position:relative;
        background: #fff;
    .cont_box{
        text-align: left;
        position:relative;
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
    .form_box{
        background:#fff;
        padding-top: 20px;
        padding-left:10px;
        padding-bottom:20px;
    .el-form-item{
        float:left;
        margin-right:20px;
        margin-bottom: 15px;
        height:40px;
    .el-input{
        width:272px;
    }
    .inline-input{
        width:217px;
    }
    .el-select{
        width:272px;
    }
    .el-textarea{
        width:933px;
        height: 88px;

    }

    }
    .el-button{
        float:left;
        margin-left:20px;
        margin-top:2px;
    }
    }
    }
    }
</style>
<style>
.financparentsclass .el-textarea .el-textarea__inner{
  resize: none;
}
</style>

