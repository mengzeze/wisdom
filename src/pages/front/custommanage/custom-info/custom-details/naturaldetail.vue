<template>
    <div class="ziranrenparents">
    <div class="naturaldetail">
        <div class="cont_box">
            <span>基本信息</span>
            <div class="clearfix func_btn">
                <el-button size="medium" type="primary" @click="editNote" v-if="btn_flag == false" style="margin-right: 3px;">编辑</el-button>
                <el-button size="medium" type="" @click="cancelNote" v-if="btn_flag == true" style="margin-right: 3px;" >取消</el-button>
                <el-button size="medium" type="primary" @click="saveNote" v-if="btn_flag == true" >保存</el-button>
            </div>
            <el-form ref="form" :model="msgObj" label-width="120px" class="form_box clearfix">
                 <el-row>
                    <el-col :span="10">
                            <el-form-item label="客户中文名：" :rules="[{required:true}]">

                                <el-input v-model="msgObj.pro_name" placeholder="请输入关键词" :disabled="disabled" maxlength="10"></el-input>
                            </el-form-item>
                    </el-col>
                    <el-col :span="10">
                    <el-form-item label="客户英文名：">
                        <el-input v-model="msgObj.abb_name" placeholder="请输入关键词" :disabled="disabled" maxlength="10"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="客户国籍：">
                    <el-select v-model="msgObj.pro_type" placeholder="请选择客户国籍" clearable  :disabled="disabled">
                        <el-option v-for="item in selectStateListcountrt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="客户学历：">
                    <el-select v-model="msgObj.pro_state" placeholder="请选择客户学历" clearable   :disabled="disabled">
                        <el-option v-for="item in selectStateListcollecg" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="客户性别：" :rules="[{required:true}]">
                    <el-radio-group v-model="msgObj.radioList" :disabled="disabled">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="出生日期：" :rules="[{required:true}]">
                    <el-date-picker  @focus="$utils.handleTimeFocus" v-model="msgObj.list_time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  placeholder="选择日期" :disabled="disabled"></el-date-picker>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="身份证号码：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_legal" placeholder="请输入身份证号" :disabled="disabled" maxlength="20"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="客户类型：" :rules="[{required:cusTypeIsMumstFill}]">
                    <!-- <el-input v-model="msgObj.pro_register" placeholder="请输入关键词" disabled></el-input>
                    <el-button type="primary" @click="changeFn" class="opt_btn">选择</el-button> -->
                     <el-select v-model="msgObj.pro_register" placeholder="请选择客户类型" clearable  :disabled="disabled" >
                        <el-option v-for="item in selectStateListType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                <el-form-item label="联系电话：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.pro_phone" placeholder="请输入联系电话" :disabled="disabled" maxlength="50"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="邮箱：" :rules="[{required:true}]">
                        <el-input v-model="msgObj.pro_email" placeholder="请输入邮箱" :disabled="disabled" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <!-- <el-form-item label="所属行业：">
                    <el-input v-model="msgObj.pro_fax" placeholder="请输入关键词" disabled></el-input>
                    <el-button type="primary" @click="changeFn" class="opt_btn">选择</el-button>
                </el-form-item> -->
                <el-row>
                    <el-col :span="10">
                <el-form-item label="邮编：">
                    <el-input v-model="msgObj.zip_code" @input="msgObj.zip_code=msgObj.zip_code.replace(/[^\d\.]/g,'')" placeholder="请输入邮编" :disabled="disabled" maxlength="6"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="10">
                <el-form-item label="客户状态：" :rules="[{required:cusTypeIsMumstFill}]">
                    <!-- <el-input v-model="msgObj.pro_place" placeholder="请输入关键词" disabled></el-input>
                    <el-button type="primary" @click="changeFn" class="opt_btn">选择</el-button> -->
                        <el-select v-model="msgObj.pro_place" placeholder="请选择客户状态" clearable  :disabled="disabled"  >
                            <!-- <el-option v-for="item in selectStateListState" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
                            <el-option
                            v-for="item in selectStateListState"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                <el-form-item label="客户负责人：" :rules="[{required:true}]">
                    <el-input v-model="msgObj.principal" class="fl" placeholder="请输入客户负责人" disabled="disabled" :customer="customer"></el-input>
                    <el-button type="primary" size="small" @click="optUser" class="fl" style="margin-left: 0px;height: 40px;margin-top: 0px;" :disabled="disabled">选择用户</el-button>
                    <!-- <el-input v-model="msgObj.pro_http" placeholder="请输入关键词" disabled></el-input>
                    <el-button type="primary" @click="changeFn" class="opt_btn">选择</el-button> -->
                        <!-- <div style="width:300px;border:1px solid #3333;display:inline-block;border-radius:5px;">
                            <span v-for="item in  deployObj" class="role_btn">{{item.name}}</span>
                        </div>
                        <el-button size="small" type="primary" @click="optUser" class="opt_btn" style="margin-left:0px;margin-right:3px;">选择用户</el-button> -->
                </el-form-item>

                </el-col>
                </el-row>
                <el-row>
                <el-col :span="24">
                <el-form-item label="地址：" style="margin-top:10px;">
                    <el-input type="textarea" :rows="2"  v-model.trim="msgObj.pro_brief" placeholder="请输入地址" :disabled="disabled" style="100%;" maxlength="100"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="24">
                <el-form-item label="备注：" style="margin-top:10px;">
                    <el-input type="textarea" :rows="2"  v-model.trim="msgObj.pro_range" placeholder="请输入备注" :disabled="disabled" maxlength="2000"></el-input>
                </el-form-item>
                </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- <frame-work v-if="flag" :peodatas='peodatas'  v-on:statesbox='statesboxs' :radioUser="1"></frame-work> -->
      <!--:findUserObj="findUserObj"-->
      <fintall-deptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                        :findUserObj="findUserObj"
                        :findState="findState" :checkState="checkState"></fintall-deptuser>
    </div>
    </div>
</template>
<script>
// import frameWork from '@/components/select_box/frameworkpeo'
import fintallDeptuser from '@/components/select_box/findAllDeptUserSingleNew'
    export default {
        name: 'naturaldetail',
        props: ['naturalData'],
        components: {
            fintallDeptuser
        },
        data(){
            return {
                findUserObj: [],
                findFlag:false,
                findState:{},
                checkState:{},
                customer:'',
                btn_flag: false,
                disabled: true,
                msgObj:{
                    pro_name: '',
                    abb_name: '',
                    pro_type: '',
                    pro_state: '',
                    radioList: '0',
                    list_time: '',
                    pro_legal: '',
                    pro_register: '',
                    pro_phone: '',
                    pro_email: '',
                    pro_fax: '',
                    zip_code: '',
                    pro_place: '',
                    principal: '',
                    pro_brief: '',
                    pro_range: '',
                },
                // radioList:'0',
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
                        value: 1006,
                        label: '潜在客户'
                    },
                    {
                        value: 1007,
                        label: '已投客户'
                    }
                ],
                //客户学历
                selectStateListcollecg:[
                    {
                        value: 1019,
                        label: '本科'
                    },
                    {
                        value: 1020,
                        label: '硕士'
                    },
                    {
                        value: 1021,
                        label: '博士'
                    },
                    {
                        value: 1022,
                        label: '其他'
                    }
                ],
                //客户国籍
                selectStateListcountrt:[
                    {
                        value: 1024,
                        label: '埃及'
                    },
                    {
                        value: 1025,
                        label: '爱尔兰'
                    },
                    {
                        value: 1026,
                        label: '奥地利'
                    },
                    {
                        value: 1027,
                        label: '澳大利亚'
                    },
                                {
                        value: 1028,
                        label: '巴西'
                    },
                    {
                        value: 1029,
                        label: '波兰'
                    },
                    {
                        value: 1030,
                        label: '德国'
                    },
                    {
                        value: 1031,
                        label: '俄国'
                    },
                                {
                        value: 1032,
                        label: '法国'
                    },
                    {
                        value: 1033,
                        label: '芬兰'
                    },
                    {
                        value: 1034,
                        label: '韩国'
                    },
                    {
                        value: 1035,
                        label: '荷兰'
                    },
                    {
                        value: 1036,
                        label: '加拿大'
                    },
                                {
                        value: 1037,
                        label: '美国'
                    },
                    {
                        value: 1038,
                        label: '尼日利亚'
                    },
                    {
                        value: 1039,
                        label: '挪威'
                    },
                    {
                        value: 1040,
                        label: '葡萄牙'
                    },
                    {
                        value: 1041,
                        label: '日本'
                    },
                                {
                        value: 1042,
                        label: '瑞国'
                    },
                    {
                        value: 1043,
                        label: '瑞士'
                    },
                    {
                        value: 1044,
                        label: '苏格兰'
                    },
                    {
                        value: 1045,
                        label: '泰国'
                    },
                    {
                        value: 1046,
                        label: '威尔士'
                    },
                    {
                        value: 1047,
                        label: '西班牙'
                    },
                    {
                        value: 1048,
                        label: '希腊'
                    },
                    {
                        value: 1049,
                        label: '新西兰'
                    },
                    {
                        value: 1050,
                        label: '以色列'
                    },
                                {
                        value: 1051,
                        label: '意大利'
                    },
                    {
                        value: 1052,
                        label: '印度'
                    },
                    {
                        value: 1053,
                        label: '英国'
                    },
                    {
                        value: 1054,
                        label: '中国'
                    }
                ],
                deployObj:[
                    {name:''},
                ],
                //添加人员
                flag:false,
                peodatas:'',
                token:'',
                userId:'',
                success_code:'',
                cusTypeIsMumstFill: true//编辑客户信息时客户类型是否为必填项
            }
        },
        mounted(){
        },
        created () {
            //console.log(this.naturalData);
            this.surveyEdit();
            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
            this.getIsMustFill();
        },
        methods:{
                         //添加人员
             findAllUser(data){
               console.log(data, 22)
                 if(data.length == 0){
                   this.findFlag = false;
                   this.msgObj.principal = '';
                   this.customer = '';
                     return
                 }
                this.deployObj = data;
                this.msgObj.principal = this.deployObj[0].name;
                this.customer = this.deployObj[0].id;
                this.findFlag = false;
                this.findState = {};
                this.checkState = {};
                this.findUserObj = data
             },
            // 选择用户
            optUser(){
                //this.user_num = num;
                this.findFlag = true;
                this.findUserObj = []
                this.findState = {state:0};
                this.checkState = {state:1};
            },
            //编辑
            editNote(){
                this.btn_flag = true;
                this.disabled = false;
            },
            //回显数据
            surveyEdit(){
                //console.log(this.naturalData);
                var sexpro = this.naturalData.sex;
                //console.log(sexpro)
                // if(sexpro == "女"){
                //     this.naturalData.sex = 0
                // }else{
                //     this.naturalData.sex = 1
                // }
                this.msgObj.pro_name = this.naturalData.name;//客户中文名：
                this.msgObj.abb_name = this.naturalData.englishName;//客户英文名：
                this.msgObj.pro_type = this.naturalData.nationality;//客户国籍：
                this.msgObj.pro_state = this.naturalData.education;//客户学历：
                this.msgObj.radioList = this.naturalData.sex;//客户性别：
                this.msgObj.list_time = this.naturalData.birthdate;//出生日期：
                this.msgObj.pro_legal = this.naturalData.identityCard;//身份证号码：
                this.msgObj.pro_register = this.naturalData.type;//客户类型：
                this.msgObj.pro_phone = this.naturalData.telephone;//联系电话：
                this.msgObj.pro_email = this.naturalData.email;//邮箱：
                this.msgObj.pro_fax = this.naturalData.industryOne;//所属行业
                this.msgObj.zip_code = this.naturalData.postcode;//邮编：
                this.msgObj.pro_place = this.naturalData.status;//客户状态
                this.msgObj.principal = this.naturalData.principalName;//客户负责人
                this.customer = this.naturalData.principal;
                this.findUserObj = [{name: this.naturalData.principalName,label: this.naturalData.principalName, id: this.naturalData.principal, uniqueKey: 'user' + this.naturalData.principal}]
                this.msgObj.pro_brief = this.naturalData.address;//地址：
                this.msgObj.pro_range = this.naturalData.remarks;//备注：
            },
            getIsMustFill() {//获取新增自然人客户时客户类型是否为必填项
                let data = {
                    token: this.token,
                    userId: this.userId,
                    data: {
                        tableId: 3//固定为3
                    }
                }
                this.$post('/sys/interface/enableState', data).then((response)=> {
                    if(this.code.codeNum.SUCCESS == response.code) {
                        let data =  response.data;
                        this.cusTypeIsMumstFill = data[0].enableState == 1 ? true : false;
                    }
                }).catch(function(error) {

                });
            },
            //保存
            saveNote(){
                if(this.msgObj.pro_name == "" || this.msgObj.pro_name == undefined || this.msgObj.pro_name == null){
                    this.$message.error('客户中文名内容不能为空');
                    return;
                }
                // if(this.msgObj.radioList+"" == "" || this.msgObj.radioList == undefined || this.msgObj.radioList == null){
                //     this.$message.error('客户性别为必选');
                //     return;
                // }
                if(this.msgObj.list_time == ""  || this.msgObj.list_time == undefined || this.msgObj.list_time == null){
                    this.$message.error('客户出生日期内容不能为空');
                    return;
                }
                //console.log(this.msgObj.radioList)
                // if(this.msgObj.radioList == ""  || this.msgObj.radioList == undefined || this.msgObj.radioList == null){
                //     this.$message.error('客户性别为必填');
                //     return;
                // }
                if (this.msgObj.pro_legal == "" || this.msgObj.pro_legal == undefined || this.msgObj.pro_legal == null) {
                    this.$message.error('客户身份证号不能为空');
                    return;
                } else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.msgObj.pro_legal))){
                    this.$message.error("客户身份证号错误");
                    return false;
                }
                if(this.cusTypeIsMumstFill){
                    if(this.msgObj.pro_register == "" || this.msgObj.pro_register == undefined || this.msgObj.pro_register == null){
                        this.$message.error('客户类型内容不能为空');
                        return;
                    }
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
                if(this.msgObj.pro_place == "" || this.msgObj.pro_place == undefined || this.msgObj.pro_place == null){
                    this.$message.error('客户状态内容不能为空');
                    return;
                }
                if(this.msgObj.principal == "" || this.msgObj.principal == undefined || this.msgObj.principal == null){
                    this.$message.error('客户负责人内容不能为空');
                    return;
                }

                // 邮编验证
                // if (this.msgObj.zip_code != "") {
                //     if(!(/^[1-9][0-9]{5}$/.test(this.msgObj.zip_code))){
                //         this.$message.error("邮编有误，请重填");
                //         return false;
                //     }
                // }

                var dataList={
                        data:{
                            id: this.naturalData.id,//id
                            name:this.msgObj.pro_name,//客户中文名：
                            englishName:this.msgObj.abb_name, //客户英文名：
                            nationality:this.msgObj.pro_type,//客户国籍：
                            education:this.msgObj.pro_state,//客户学历：
                            sex:this.msgObj.radioList,//客户性别：
                            birthdate:this.msgObj.list_time,//出生日期：
                            identityCard:this.msgObj.pro_legal,//身份证号码：
                            type:this.msgObj.pro_register,//客户类型：
                            telephone:this.msgObj.pro_phone,//联系电话：
                            email:this.msgObj.pro_email,//邮箱：
                            industryOne:this.msgObj.pro_fax,//所属行业
                            postcode:this.msgObj.zip_code,//邮编：
                            status:this.msgObj.pro_place,//客户状态
                            principal:this.customer,//客户负责人
                            address:this.msgObj.pro_brief,//地址：
                            remarks:this.msgObj.pro_range//备注：
                        },
                        token:this.token,
                        userId:this.userId
                    }
                    console.log(dataList, this.customer, 55)
                    this.$post('/info/crm/Individual/update', dataList).then((response)=> {
                        // _this.$message({
                        //     message: '修改成功',
                        //     type: 'success'
                        // });
                        //
                        if(response.code != this.success_code){
                            this.$message.error(response.msg);
                            return
                        }
                        this.$message.success('修改成功');
                        this.btn_flag = false;
                        this.disabled = true;

                        let originData = JSON.parse(this.$store.state.customObj.row);
                        originData.name = this.msgObj.pro_name;
                        originData.englishName = this.msgObj.abb_name;
                        originData.nationality = this.msgObj.pro_type;
                        originData.education = this.msgObj.pro_state;
                        originData.sex = this.msgObj.radioList;
                        originData.birthdate = this.msgObj.list_time;
                        originData.identityCard = this.msgObj.pro_legal;
                        originData.type = this.msgObj.pro_register;
                        originData.telephone = this.msgObj.pro_phone;
                        originData.email = this.msgObj.pro_email;
                        originData.industryOne = this.msgObj.pro_fax;
                        originData.postcode = this.msgObj.zip_code;
                        originData.status = this.msgObj.pro_place;
                        originData.principalName = this.msgObj.principal;
                        originData.principal = this.customer;
                        originData.address = this.msgObj.pro_brief;
                        originData.remarks = this.msgObj.pro_range;

                        let obj = {
                            id: this.$store.state.customObj.id,
                            row: JSON.stringify(originData)
                        }
                        this.$store.commit('customObj',obj)
                        this.$emit('changeData',{
                            dataName: 'naturalData'
                        })
                        // console.log(JSON.parse(this.$store.state.customObj.row))
                    }).catch(function(error) {
                        console.log(error);
                    });
            },
            //取消
            cancelNote(){
                this.btn_flag = false;
                this.disabled = true;
                //console.log(this.naturalData);
                var sexpro = this.naturalData.sex;
                //console.log(sexpro)
                // if(sexpro == "女"){
                //     this.naturalData.sex = 0
                // }else{
                //     this.naturalData.sex = 1
                // }
                this.msgObj.pro_name = this.naturalData.name;//客户中文名：
                this.msgObj.abb_name = this.naturalData.englishName;//客户英文名：
                this.msgObj.pro_type = this.naturalData.nationality;//客户国籍：
                this.msgObj.pro_state = this.naturalData.education;//客户学历：
                this.msgObj.radioList = this.naturalData.sex;//客户性别：
                this.msgObj.list_time = this.naturalData.birthdate;//出生日期：
                this.msgObj.pro_legal = this.naturalData.identityCard;//身份证号码：
                this.msgObj.pro_register = this.naturalData.type;//客户类型：
                this.msgObj.pro_phone = this.naturalData.telephone;//联系电话：
                this.msgObj.pro_email = this.naturalData.email;//邮箱：
                this.msgObj.pro_fax = this.naturalData.industryOne;//所属行业
                this.msgObj.zip_code = this.naturalData.postcode;//邮编：
                this.msgObj.pro_place = this.naturalData.status;//客户状态
                this.msgObj.principal = this.naturalData.principalName;//客户负责人
                this.customer = this.naturalData.principal;
                this.msgObj.pro_brief = this.naturalData.address;//地址：
                this.msgObj.pro_range = this.naturalData.remarks;//备注：
            },

            //选择
            changeFn(){

            },
        }
    }
</script>
<style scoped lang="scss" type="text/css">
  .ziranrenparents .naturaldetail{
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
            .el-textarea__inner{
                width: 357px;
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
                    .el-radio-group{
                        width:217px;
                    }
                    .el-textarea{
                        width:935px;
                        height: 88px;

                    }
                    .opt_btn{
                        position: absolute;
                        top: -2px;
                        right: 0;
                        /*height: 38px;*/
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
.ziranrenparents .naturaldetail .el-textarea .el-textarea__inner{
  resize: none;
}
</style>

