<template>
    <div class="shareschangeparents">
        <div class="visitnote">


        <!-- <el-button @click="addSharesFn" size="small"  type="text" class="add_shares">变更记录</el-button> -->
        <div v-on:keyup.enter="searchBtn">
        <el-form ref="search_form" :model="search_form"   :inline="true"  class="form_box clearfix">
            <el-form-item label="股东名称：">
                <el-input v-model="search_form.name" placeholder="请输入股东名称" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="股东类型：">
                <!-- <el-select v-model="search_form.type" placeholder="请选择股东类型" clearable>
                    <el-option v-for="item in selectRoleList" :key="item.id" :lable="item.id" :value="item.name"></el-option>
                </el-select> -->
                <el-select v-model="search_form.type" placeholder="请选择股东类型" clearable>
                    <el-option
                    v-for="item in selectRoleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
            <el-button size="medium" type="primary" icon="el-icon-search" @click="searchBtn">查询</el-button>
            <el-button size="medium" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
            <el-form-item>
            <el-button @click="newAddFn" size="medium" icon="el-icon-plus" type="primary" v-if="$utils.checkSystemPermission('crm_financing_partner_add')" style="float:right;margin-right:10px;">新增股东信息</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div class="table_box">
            <el-table :data="tableData" fit show-header :header-cell-style="{background:'#FAFAFA',color:'#000'}" style="width: 100%" class="pro_table" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="股东名称" align="center" min-width="100">
                     <template slot-scope="scope">
                        <p :title="scope.row.name" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="股东类型" align="center" min-width="100">
                     <template slot-scope="scope">
                        <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="quantity" label="持股数" align="center" min-width="100">
                     <template slot-scope="scope">
                        <p :title="scope.row.quantity" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.quantity}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="rate" label="持股比例" align="center" min-width="100">
                     <template slot-scope="scope">
                        <p :title="scope.row.rate" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.rate}}</p>
                    </template>
                </el-table-column>
                 <el-table-column prop="identityCard" label="身份证号/信用代码" align="center" min-width="100">
                     <template slot-scope="scope">
                        <p :title="scope.row.identityCard" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.identityCard}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注" align="center" min-width="100">
                    <template slot-scope="scope">
                        <p :title="scope.row.remarks" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.remarks}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button class="pv-0" type="text"
                        @click="editTable(scope.$index, scope.row)"
                        v-if="$utils.checkSystemPermission('crm_financing_partner_edit')"
                        title="编辑"><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize" :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
        </el-pagination>
        <div class="func_btn">
            <!-- <el-button size="medium" type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_partner_export')">导出</el-button>
            <el-button size="medium" @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_partner_del')">删除</el-button> -->
        </div>
        <!--新增股东信息-->
        <el-dialog title="新增股东信息" :visible.sync="dialogVisibleadd"  width="578px" :close-on-click-modal="false" :before-close="handleClose">
            <div class="shar_msg">
                <el-form ref="form" :model="newObject" label-width="100px" class="form_box clearfix">
                    <el-form-item label="股东类型：" :rules="[{required:true}]">
                        <!-- <el-input v-model.trim="newObject.type" placeholder="请输入股东类型"></el-input> -->
                        <el-select v-model="newObject.type" placeholder="请选择股东类型" clearable style="width:385px;" @change="chageperson()">
                             <el-option
                                v-for="item in selectRoleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="股东姓名：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.name" placeholder="请输入股东姓名" maxlength="100" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="持股数量：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.quantity" placeholder="请输入持股数" maxlength="10" style="width:385px;"></el-input>
                    </el-form-item>
                     <el-form-item label="身份证号：" :rules="[{required:true}]" v-if="card">
                        <el-input v-model.trim="newObject.identityCard" placeholder="请输入身份证号" maxlength="18" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="信用代码：" :rules="[{required:true}]" v-if="creditdao">
                        <el-input v-model.trim="newObject.identityCard" placeholder="请输入统一社会信用代码" maxlength="18" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="持股比例：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.rate" placeholder="请输入持股比例" maxlength="10" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" :rows="3"  v-model.trim="newObject.remarks" placeholder="请输入备注" maxlength="500" style="width:385px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="closemediumDialog">取 消</el-button>
                    <el-button size="medium" type="primary" @click="saveMsgadd">确 定</el-button>
                </span>
        </el-dialog>
        <!--编辑股东信息-->
        <el-dialog  title="编辑股东信息" :close-on-click-modal="false" :visible.sync="dialogVisibleedit"  width="578px">
            <div class="shar_msg">
                <el-form ref="form" :model="newObject" label-width="100px" class="form_box clearfix">
                    <el-form-item label="股东类型：" :rules="[{required:true}]">
                        <!-- <el-input v-model.trim="newObject.type" placeholder="请输入股东类型"></el-input> -->
                        <el-select v-model="newObject.type" placeholder="请选择股东类型" clearable style="width:385px;" @change="chageperson()">
                            <!-- <el-option v-for="item in selectRoleList" :key="item.id" :lable="item.id" :value="item.name"></el-option> -->
                            <el-option
                                v-for="item in selectRoleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="股东姓名：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.name" placeholder="请输入股东姓名" maxlength="100" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="持股数量：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.quantity" placeholder="请输入持股数" maxlength="10" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" :rules="[{required:true}]" v-if="card">
                        <el-input v-model.trim="newObject.identityCard" placeholder="请输入身份证号" maxlength="18" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="信用代码：" :rules="[{required:true}]" v-if="creditdao">
                        <el-input v-model.trim="newObject.identityCard" placeholder="请输入统一社会信用代码" maxlength="18" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="持股比例：" :rules="[{required:true}]">
                        <el-input v-model.trim="newObject.rate" placeholder="请输入持股比例" maxlength="10" style="width:385px;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" :rows="3"  v-model.trim="newObject.remarks" placeholder="请输入备注" maxlength="500" style="width:385px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisibleedit = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="saveMsgedit">确定</el-button>
                </span>
        </el-dialog>
        <!--变更记录-->
        <el-dialog  title="变更记录" :close-on-click-modal="false" :visible.sync="dialogVisibleFlag"  width="600px">
            <div class="shar_box">
                <ul>
                    <li>
                        <span>序号</span><span>股东</span><span>变更前股权比例</span><span>变更后股权比例</span><span>股权变更日期</span>
                    </li>
                    <div class="shar_list">
                        <li v-for="item in noteObj">
                            <span>{{item.id + 1}}</span><span>{{item.shares}}</span><span>{{item.before}}</span><span>{{item.after}}</span><span>{{item.time}}</span>
                        </li>
                    </div>

                </ul>
            </div>
        </el-dialog>
        </div>
        <!-- 删除弹框 -->
        <div class="shanchutankuang">


        <el-dialog
            title="提示"
            :close-on-click-modal="false"
            :visible.sync="deletes"
            width="22%">
            <div class="clearfix">
                <img class="fl" src="../../../../../assets/image/shan1.png" alt="" style="width:24px;height:24px;position: relative;top: -3px;margin-right: 10px">
                <span class="fl">确定删除这条信息吗</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="deletes = false">取 消</el-button>
                <el-button size="medium" type="primary" @click="deletessure">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>

    export default{
        name: 'visitnote',
        props:['custData'],
        data () {
            return {
                search_form:{
                    name: '',
                    type: '',
                },
                deletes:false,
                selectRoleList:[
                    {
                        value: 1016,
                        label: '自然人'
                    },
                    {
                        value: 1017,
                        label: '法人'
                    }
                ],
                tableData: [],
                multipleSelection: [],
                pageSize:10,
                pageSizes: [10,20,50,100],    //每页显示数量
                currentPage: 1,  //当前页
                dataTotal: 0,    //总量

                dialogVisibleadd: false, //弹框
                dialogVisibleedit: false, //弹框
                // dialogTitle: "新增股东信息",
                newObject:{
                    id: '',
                    name: '',
                    type: '',
                    quantity: '',
                    rate: '',
                    remarks: '',
                    identityCard:''
                },
                dialogVisibleFlag: false,
                noteObj:[
                    {
                        id:0,
                        shares:'张三',
                        before: '10%',
                        after:'10%',
                        time:'2018-12-12',
                    }, {
                        id:1,
                        shares:'张三',
                        before: '10%',
                        after:'-',
                        time:'2018-12-12',
                    }, {
                        id:2,
                        shares:'张三',
                        before: '10%',
                        after:'10%',
                        time:'2018-12-12',
                    },
                ],
                globalId:'',
                token:'',
                userId:'',
                success_code:'',
                idsdelete:'',
                nameexport:'',
                typeNames:'',
                newProjectDialogTimer:null,
                labelname:{
                    card:'身份证号：',
                    creditdao:'信用代码：'
                },
                card:true,
                creditdao:false
            }
        },
        mounted(){

        },
        created () {

            this.token = this.$store.state.loginObject.userToken;
            this.userId = this.$store.state.loginObject.userId;
            this.success_code = this.code.codeNum.SUCCESS;
            // this.shareList();
        },
        methods:{
            chageperson(){
                console.log(this.newObject.type)
                if(this.newObject.type == 1016){
                    this.card = true;
                    this.creditdao = false;
                }else{
                    this.card = false;
                    this.creditdao = true;
                }
            },
        //点击关闭
        handleClose(done) {
            //console.log(this.msgObj.name)
            var _this = this
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.closemediumDialog()
                })
                .catch(_ => {});
        },
        //新建
            newAddFn(){
                // this.file_flag = false;
                this.dialogVisibleadd = true;
                // this.dialogTitle = "新增股东信息";
                 this.handleNewProData();
                // 取出保存的草稿
                let draft = this.$utils.getDraft('sharechange', false)
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
                    this.newObject = {...this.newObject, ...draft}
                    this.setTimer()
                }).catch(() => {
                    //closeOnClickModal = false;
                    this.setTimer()
                })
            },
                /**
     * 设置定时器：每5秒保存一次表单数据
     */
        setTimer() {
        // 启动定时器，每5000ms保存一次草稿
            this.newProjectDialogTimer = setInterval(()=>{
                this.handleDraftData()
            }, 5000)
        },
        handleDraftData(){
             let data = {
                    name: this.newObject.name, //股东名称
                    quantity: this.newObject.quantity, //持股数
                    remarks:this.newObject.remarks, //备注
                    rate:this.newObject.rate, //持股比率
                    identityCard:this.newObject.identityCard //身份证号
            }
            this.$utils.saveDraft('sharechange', data, false)
        },
        closemediumDialog(){
            this.handleDraftData()
            this.dialogVisibleadd = false;
            clearInterval(this.newProjectDialogTimer)
        },

        handleNewProData(){
            this.newObject = {
                    id: '',
                    name: '',
                    type: '',
                    quantity: '',
                    rate: '',
                    remarks: '',
                    identityCard:''
            };
        },

            //变更记录
            addSharesFn(){
                this.dialogVisibleFlag = true;
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
                var kk= [];
                for(var i=0; i< this.multipleSelection.length; i++){
                    console.log(this.multipleSelection[i].uid);
                    console.log(this.multipleSelection[i])
                    kk.push(this.multipleSelection[i].id)
                    console.log()
                }
                this.idsdelete = kk;
            },
             // 确定删除
        deletessure(){
            var datas = {
                data:{
                    ids:this.idsdelete
                },
                token:this.token,
                userId:this.userId

            }
            var _this = this;
            this.$post('/info/crm/shareholder/delete', datas).then((response)=> {
                // _this.deletes = false;
                // _this.shareList();
                // _this.$message({
                //     message: '删除成功',
                //     type: 'success'
                // });
                if(response.code == _this.success_code){
                    _this.deletes = false;
                    _this.shareList();
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        // 是否选择一条数据
         handleAllDelete() {
            if(this.tableData == undefined || this.tableData == null || this.tableData == ""){
                this.$message({
                    message: '暂无数据',
                    type: 'warning'
                });
             }else if(this.multipleSelection.length > 0) {
                    this.deletes = true;
            } else {
                  this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
            }

        },
            // 查询
            searchBtn(){
                // var data = this.search_form;
                // this.shareList(this.search_form.name,this.search_form.type)
                this.currentPage = 1;
                this.shareList()
            },
            // 重置
            resetBtn(){
                this.search_form = {
                    name: '',
                    type: '',
                };
                //this.shareList();
            },
            //编辑
            editTable(index,row){
                this.file_flag = true;
                this.dialogVisibleedit = true;
                console.log(row)
                if(row.typeName == "法人"){
                    this.creditdao = true
                    this.card = false
                }else{
                   this.creditdao = false
                   this.card = true
                }
                // this.dialogTitle = "编辑股东信息";
                // let [...delectTags] = [row]
                // this.newObject = delectTags[0];
                let delectTags = {...row}
                this.newObject = delectTags
                this.ind = index;
                this.globalId  = row.id;
            },
            // 分页
            onPageChange(currentPage) {
                this.currentPage = currentPage;
                this.shareList()
                console.log(this.currentPage)  //点击第几页
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange(val) {
                this.pageSize = val;
                console.log(val)
                this.shareList()
            },
            // 列表数据
            shareList(){
                // if(currentPage==undefined || currentPage == ""){
                //     currentPage=0
                // }
                // if(currentPageval==undefined || currentPageval == ""){
                //     currentPageval=10
                // }
                var data={
                    data: {
                        name: this.search_form.name,
                        companyId: this.custData.id,
                        type: this.search_form.type
                    },
                    token:this.token,
                    userId:this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize
                }
                this.$post('/info/crm/shareholder', data).then((response)=> {
                   // console.log(response.data)
                    if(response.code != this.success_code) {
                        this.$message.error(response.msg)
                        return
                    }
                    if(response.data.pageNum > response.data.pages) {
                        this.currentPage = response.data.pages;
                        this.shareList();
                        return
                    }
                    this.tableData = response.data.list;
                    this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });

            },
            //保存
            saveMsgadd(){
                if(this.newObject.type == ""){
                    this.$message.error('股东类型内容不能为空');
                    return;
                }
                if(this.newObject.name == ""){
                    this.$message.error('股东姓名内容不能为空');
                    return;
                }
                if(this.newObject.quantity == ""){
                    this.$message.error('持股数量内容不能为空');
                    return;
                }
                // if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
                //     this.$message.error('身份证号/统一社会信用代码不能为空');
                //     return;
                // }else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.newObject.identityCard))){
                //     this.$message.error("证件号身份证号/统一社会信用代码错误");
                //     return false;
                // }
                if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
                    this.$message.error('身份证号/统一社会信用代码不能为空');
                    return;
                }else{
                    if(this.card){
                        var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                        if(!idcardReg.test(this.newObject.identityCard)) {
                            this.$message.error('身份证号错误');
                            return;
                        }else{
                             this.newObject.identityCard = this.newObject.identityCard
                        }
                    }else{
                        this.newObject.identityCard = this.newObject.identityCard
                    }
                }
                if(this.newObject.rate == ""){
                    this.$message.error('持股比例内容不能为空');
                    return;
                }
                var addObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    //id: this.tableData.length + 1,
                    name: this.newObject.name, //客户名称
                    type: this.newObject.type, //客户类型
                    quantity: this.newObject.quantity, //持股数
                    identityCard:this.newObject.identityCard, //身份证号/统一社会信用代码
                    remarks:this.newObject.remarks, //备注
                    rate:this.newObject.rate, //持股比率
                    companyId:this.custData.id
                }
            };
            var _this = this;
            this.$post('/info/crm/shareholder/add', addObj).then((response)=> {
                if(response.code == _this.success_code){
                    _this.dialogVisibleadd = false;
                     // 保存成功，关闭弹窗，关闭定时器
                    _this.closemediumDialog()
                    // 保存成功，清空草稿数据
                    _this.$utils.removeDraft('sharechange', false)
                    _this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    _this.shareList();
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });
                // if(this.dialogTitle == "编辑股东信息"){
                //     this.tableData[this.ind] = this.newObject;
                // }else{
                //     this.newObject.id =  this.tableData.length;
                //     this.tableData.push(this.newObject);
                // }
            },
                //编辑保存
            saveMsgedit(){
                if(this.newObject.type == ""){
                    this.$message.error('股东类型内容不能为空');
                    return;
                }
                if(this.newObject.name == ""){
                    this.$message.error('股东姓名内容不能为空');
                    return;
                }
                if(this.newObject.quantity == ""){
                    this.$message.error('持股数量内容不能为空');
                    return;
                }
                // if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
                //     this.$message.error('身份证号/统一社会信用代码不能为空');
                //     return;
                // }else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.newObject.identityCard))){
                //     this.$message.error("证件号身份证号/统一社会信用代码错误");
                //     return false;
                // }
                if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
                    this.$message.error('身份证号/统一社会信用代码不能为空');
                    return;
                }else{
                    if(this.card){
                        var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                        if(!idcardReg.test(this.newObject.identityCard)) {
                            this.$message.error('身份证号错误');
                            return;
                        }else{
                             this.newObject.identityCard = this.newObject.identityCard
                        }
                    }else{
                        this.newObject.identityCard = this.newObject.identityCard
                    }
                }



                if(this.newObject.rate == ""){
                    this.$message.error('持股比例内容不能为空');
                    return;
                }
                var editObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    id: this.globalId,
                    name: this.newObject.name, //股东姓名
                    type: this.newObject.type, //股东类型
                    quantity: this.newObject.quantity, //持股数
                    identityCard:this.newObject.identityCard, //身份证号/统一社会信用代码
                    remarks:this.newObject.remarks, //备注
                    rate:this.newObject.rate, //持股比率
                    companyId:this.custData.id
                }
            };
            var _this = this;
            this.$post('/info/crm/shareholder/update', editObj).then((response)=> {
                if(response.code == _this.success_code){
                    _this.dialogVisibleedit = false;
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    _this.shareList();
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });
            },

            handleExport(){//导出表格
                console.log(this.multipleSelection)
                if(this.multipleSelection.length > 0) {
                    //  if(this.$route.query.id == 1){
                       // this.typeIds = this.custData.id;
                        this.nameexport = this.custData.name
                        this.typeNames = "融资客户"
                    // }else if(this.$route.query.id == 2){
                    //   //  this.typeIds = this.naturalData.id;
                    //     this.nameexport = this.naturalData.name
                    //     this.typeNames = "自然人"
                    // }else if(this.$route.query.id == 3){
                    //    // this.typeIds = this.finacnData.id;
                    //     this.nameexport = this.finacnData.name
                    //     this.typeNames = "中介机构"
                    // }
                    var exportdata = [];
                    for(var i =0; i<this.multipleSelection.length; i++){
                        console.log(this.multipleSelection[i].id)
                        exportdata.push({
                            customType:this.typeNames,
                            customName:this.custData.name,
                            id: this.multipleSelection[i].id,
                            typeName: this.multipleSelection[i].typeName,
                            name: this.multipleSelection[i].name,
                            quantity: this.multipleSelection[i].quantity,
                            rate: this.multipleSelection[i].rate,
                            identityCard:this.multipleSelection[i].identityCard,
                            remarks: this.multipleSelection[i].remarks
                        })
                    }
                    console.log(exportdata)
                    var params = {// 参数
                        token:this.token,
                        userId:this.userId,
                        data: exportdata
                    };
                    this.$store.commit("export", { url: "/info/crm/exportShareholder", data: exportdata });
                }else{
                    this.$message({
                        message: '请选择一条数据',
                        type: 'warning'
                    });
                }
            },
        }
    }

</script>

<style scoped lang="scss" type="text/css">
 .shareschangeparents .visitnote{
        position:relative;
        background:#fff;
        .form_box{
            background:#fff;
            padding-top: 5px;
            padding-left:10px;
            // padding-bottom:20px;
            .el-form-item{
                float:left;
                margin-right:20px;
                margin-bottom: 15px;
                height:40px;
                .el-input{
                    width:217px;
                }
                .inline-input{
                    width:217px;
                }
                .el-select{
                    width:217px;
                }
             }
            .el-button{
                float:left;
                margin-left:20px;
                margin-top:0px;
            }
        }
        .el-pagination{
            margin-top:20px;
            text-align: right;
            margin-right: 40px;
        }
        .func_btn{
            width:200px;
            position: relative;
            top: -20px;
        }
        .el-dialog{
            .shar_msg{
                .el-form{
                    .el-form-item{
                        .el-textarea{
                            width:217px;
                        }
                    }
                }
            }
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
    .shareschangeparents .visitnote .table_box{
        padding:0 10px;
        box-sizing:border_box;
    }
    .shareschangeparents .visitnote .add_per{
        position:fixed;
        right:20px;
        top: -10px;
    }
    .shareschangeparents .visitnote .add_shares{
        position:fixed;
        right:20px;
        top:120px;
    }
    .shareschangeparents .visitnote .el-dialog{
        text-align: left;
    }
    .shareschangeparents .visitnote .el-dialog__footer{
        text-align: right;
        margin-right: 40px;
    }
    .shareschangeparents .visitnote  .pro_table td{
    /* height: 20px!important; */
    /* padding: 2px 0px!important; */
    }
 .shareschangeparents .visitnote .crm_financing_e{
        width:28px;
        height:28px;
        background: url("../../../../../assets/prolist/edit01.png") no-repeat 100% 100%/ 100% 100%;
    }
    .shareschangeparents .visitnote .crm_financing_e:hover{
        background: url("../../../../../assets/prolist/edit1.png") no-repeat 100% 100%/ 100% 100%;
    }
    .shareschangeparents .visitnote  .el-dialog__header{
      text-align: center!important;
      color:#333!important;
      border-bottom:1px solid #e6e6e6;
  }


.shareschangeparents .visitnote .el-button--medium{
    padding: 12px 20px!important;
}
.shareschangeparents .visitnote .shanchutankuang .el-dialog .el-dialog__header{
      border-bottom:1px solid #fff!important;
      text-align: left!important;
      font-size: 18px;
      color: #303133;
  }
.shareschangeparents .visitnote .shanchutankuang .el-dialog .el-dialog__footer{
      margin-right: 0px;
  }
.shareschangeparents .visitnote .shanchutankuang .el-dialog__body{
      text-align: left;
  }

.shareschangeparents .visitnote .shanchutankuang .el-dialog .el-dialog__footer .dialog-footer .el-button{
      padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

.shareschangeparents .visitnote .el-textarea .el-textarea__inner{
  resize: none;
}
</style>
