<template>
  <div class="contactpersonparents">
    <div class="query-box" v-on:keyup.enter="searchBtn">
      <el-form ref="form" :model="search_form" :inline="true"  class="flex flex-wrap">
        <el-form-item label="部门：">
          <el-input v-model="search_form.department" placeholder="请输入部门" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名：">
          <el-input v-model="search_form.contactName" placeholder="请输入联系人姓名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="人员属性">
          <el-select v-model="search_form.personAttribute" placeholder="请选择人员属性" clearable>
            <el-option v-for="item in isSenior" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-form-item>
          <el-button size="medium" type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
          <el-button size="medium" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
        <!-- </el-form-item> -->
        <!-- <el-form-item> -->
        <el-form-item>
          <el-button size="medium" type="primary" @click="newAddFn" icon="el-icon-plus" v-if="$utils.checkSystemPermission('crm_financing_contacts_add')" style="float:right;margin-right:10px;margin-left:7px;">新增客户联系人</el-button>
        </el-form-item>
        <!-- </el-form-item> -->
        <!-- <el-button @click="newAddFn" size="small" icon="el-icon-plus" type="primary" class="add_per" id="crm_financing_contacts_add">
       新建客户联系人
     </el-button> -->

      </el-form>
    </div>
    <el-table :data="tableData" fit show-header
              :header-cell-style="{background:'#FAFAFA',color:'#000'}"
              style="width: 100%" class="pro_table"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="contactName" label="联系人姓名" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.contactName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.contactName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.department" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.department}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="duty" label="职务" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.duty" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.duty}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号码" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.phoneNumber" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.phoneNumber}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="固话" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.telephone" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.telephone}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.email" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.email}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="identityCard" label="身份证号" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.identityCard" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.identityCard}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="isSenior" label="是否为董监高" align="center" min-width="100">
        <template slot-scope="scope">
          <p :title="scope.row.isSenior" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.isSenior}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="办公地址" align="center" min-width="150">
        <template slot-scope="scope">
          <p :title="scope.row.address" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.address}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
          <el-button
          class="pv-0"
          type="text"
          @click="editTable(scope.$index, scope.row)"
          title="编辑"
          v-if="$utils.checkSystemPermission('crm_financing_contacts_edit')"><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="flex j-spaceBetween align-center table-footer">
      <div class="func_btn">
        <!-- <el-button size="medium" type="primary" @click="handleExport" v-if="$utils.checkSystemPermission('crm_financing_contacts_export')">导出</el-button>
        <el-button size="medium" @click="handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_contacts_add')">删除</el-button> -->
      </div>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" :pageSize="pageSize"
                     :page-sizes="pageSizes" :current-page="currentPage" @current-change="onPageChange"
                     @size-change="handleSizeChange">
      </el-pagination>
    </div>

    <el-dialog title="新建联系人" :visible.sync="dialogVisibleadd" width="750px" :close-on-click-modal="false" :before-close="handleClose">
      <span class="dialog_tit">联系人信息</span>
      <div>
        <el-form ref="newObject" :model="newObject" label-width="123px" class="form_box clearfix">
          <el-form-item label="联系人姓名：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.contactName" placeholder="请输入联系人姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="部门：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.department" placeholder="请输入部门" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="固话：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.telephone" placeholder="请输入固话" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="职务：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.duty" placeholder="请输入职务" maxlength="10"></el-input>
          </el-form-item>
           <el-form-item label="是否为董监高：" :rules="[{required:true}]">
                <el-radio-group v-model="newObject.isSenior" style="width:217px;margin-left:-470px">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
          </el-form-item>
           <el-form-item label="证件号码：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.identityCard" placeholder="请输入证件号码" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.phoneNumber" placeholder="请输入手机号码" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.email" placeholder="请输入邮箱" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="办公地址：">
            <el-input type="textarea" :rows="3" v-model.trim="newObject.address" maxlength="100" placeholder="请输入办公地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="closemediumDialog">取 消</el-button>
            <el-button size="medium" type="primary" @click="saveMsgadd">保 存</el-button>
        </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑客户联系人" :close-on-click-modal="false" :visible.sync="dialogVisibleedit" width="750px">
      <span class="dialog_tit">联系人信息</span>
      <div>
        <el-form ref="newObject" :model="newObject" label-width="123px" class="form_box clearfix">
          <el-form-item label="联系人姓名：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.contactName" placeholder="请输入联系人姓名" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="部门：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.department" placeholder="请输入部门" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="固话：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.telephone" placeholder="请输入固话" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="职务：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.duty" placeholder="请输入职务" maxlength="10"></el-input>
          </el-form-item>
            <el-form-item label="是否为董监高：" :rules="[{required:true}]">
                <el-radio-group v-model="newObject.isSenior" style='width:217px;'>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
          </el-form-item>
           <el-form-item label="证件号码：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.identityCard" placeholder="请输入证件号码" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.phoneNumber" placeholder="请输入手机号码" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" :rules="[{required:true}]">
            <el-input v-model.trim="newObject.email" placeholder="请输入邮箱" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="办公地址：">
            <el-input type="textarea" :rows="3" maxlength="100" v-model.trim="newObject.address" placeholder="请输入办公地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="dialogVisibleedit = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="saveMsgedit">保 存</el-button>
        </span>
    </el-dialog>

          <!-- 删除弹框 -->
    <div class="shanchutankuang">
    <el-dialog
        title="提示"
        :close-on-click-modal="false"
        :visible.sync="deletes"
        width="22%">
        <div class="clearfix">
            <img class="fl" src="../../../../../assets/image/shan1.png" alt="" style="width:24px;height:24px;position: relative;top: -3px;margin-right: 10px">
            <span class="fl">确定删除该联系人</span>
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

  export default {
    name: 'contactperson',
    props:[
        'custData',
        'naturalData',
        'finacnData',
        'urlBread'
    ],
    data() {
      return {
        token: "",
        userId: "",
        search_form: {
          department: '',
          contactName: '',
          personAttribute:''
        },
        deletes:false,
        tableData: [],
        ind: '',
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],    //每页显示数量
        currentPage: 1,  //当前页
        dataTotal: 0,    //总量

        dialogVisibleadd: false, //弹框
        dialogVisibleedit: false, //弹框
        // dialogTitle: "新建客户联系人",
        newObject: {
          id:'',
          contactName: '',
          department: '',
          telephone: '',
          duty: '',
          isSenior:'',
          identityCard:'',
          phoneNumber: '',
          email: '',
          address: '',
        },
        globalid:'',
        idsdelete:[],
        //客户类型id
        typeIds:'',
        //客户类型
        typeNames:'',
         multipleSelection: [],
         nameexport:'',
         newProjectDialogTimer:null,
               // 人员属性
        isSenior: [
            {
                value: 0,
                label: '全部人员'
            },
            {
                value: 1,
                label: '董监高'
            }
        ],
      }
    },
    mounted() {

    },
    created () {

        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;
        //this.contactList();
        this.route_id = this.$store.state.customObj.id;
        console.log(this.route_id)

    },
    methods: {
        // 关闭按钮
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
      newAddFn() {
        this.dialogVisibleadd= true;
        // this.dialogTitle = "新建客户联系人";
        this.handleNewProData();
            // 取出保存的草稿
            let draft = this.$utils.getDraft(this.route_id, false)
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
                    contactName: this.newObject.contactName, //联系人姓名
                    department: this.newObject.department, //部门
                    telephone: this.newObject.telephone, //固话
                    duty: this.newObject.duty, //职务
                    phoneNumber:this.newObject.phoneNumber, //手机号码
                    email:this.newObject.email,  //邮箱
                    address: this.newObject.address, //办公地址
                    identityCard:this.newObject.identityCard  //证件号码

            }
            this.$utils.saveDraft(this.route_id, data, false)
        },
        closemediumDialog(){
            this.handleDraftData()
            this.dialogVisibleadd = false;
            clearInterval(this.newProjectDialogTimer)
        },
       handleNewProData(){
            this.newObject = {
            id:'',
          contactName: '',
          department: '',
          telephone: '',
          duty: '',
          isSenior:'',
          identityCard:'',
          phoneNumber: '',
          email: '',
          address: '',
            };
       },
      //选中项
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //取消选择，清空
        if(!val.length) {
          this.idsdelete = []
          return
        }
        this.idsdelete = this.multipleSelection.map(v=>v.id)
        // for(var i=0; i< this.multipleSelection.length; i++){
        //     this.idsdelete.push(this.multipleSelection[i].id)
        // }
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
            this.$post('/info/crm/contact/delete', datas).then((response)=> {
                // _this.deletes = false;
                // _this.contactList();
                // _this.$message({
                //     message: '删除成功',
                //     type: 'success'
                // });
                if(response.code == _this.success_code){
                    _this.deletes = false;
                    _this.contactList();
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
        handleExport(){//导出表格
            console.log(this.multipleSelection)
            if(this.multipleSelection.length > 0) {
                if(this.$store.state.customObj.id == 1){
                    this.typeIds = this.custData.id;
                    this.nameexport = this.custData.name
                    this.typeNames = "融资客户"
                }else if(this.$store.state.customObj.id == 2){
                    this.typeIds = this.naturalData.id;
                    this.nameexport = this.naturalData.name
                    this.typeNames = "自然人"
                }else if(this.$store.state.customObj.id == 3){
                    this.typeIds = this.finacnData.id;
                    this.nameexport = this.finacnData.name
                    this.typeNames = "中介机构"
                }
                console.log(this.custData.name)
                console.log(this.typeNames)
                var exportdata = [];
                for(var i =0; i<this.multipleSelection.length; i++){
                    console.log(this.multipleSelection[i].id)
                    exportdata.push({
                        id: this.multipleSelection[i].id,
                        customType: this.typeNames,
                        name: this.nameexport,
                        department: this.multipleSelection[i].department,
                        duty: this.multipleSelection[i].duty,
                        isSenior: this.multipleSelection[i].isSenior === '是'? 1: 0,
                        identityCard: this.multipleSelection[i].identityCard,
                        contactName: this.multipleSelection[i].contactName,
                        phoneNumber: this.multipleSelection[i].phoneNumber,
                        telephone: this.multipleSelection[i].telephone,
                        email: this.multipleSelection[i].email,
                        address: this.multipleSelection[i].address,
                    })
                }
                console.log('导出66666666666666666',exportdata)
                var params = {// 参数
                    token:this.token,
                    userId:this.userId,
                    data: exportdata
                };
                this.$store.commit("export", { url: "/info/crm/exportContact", data: exportdata });
            }else{
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
            }
        },
      // 查询
      searchBtn() {
        // var data = this.search_form;
        // this.contactList(this.search_form.duty,this.search_form.contactName)
        this.currentPage = 1;
        this.contactList()

      },
      // 重置
      resetBtn() {
        this.search_form = {
          department: '',
          contactName: '',
          personAttribute:''
        };
        //this.contactList();
      },
      // 列表数据
      contactList(){
        //   区分融资客户,自然人客户,中介机构
            if(this.$store.state.customObj.id == 1){
                //alert(1)
                //this.typeIds = this.custData.id;
                var data={
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    data: {
                        department: this.search_form.department,//职务
                        contactName: this.search_form.contactName,//联系人
                        isSenior:this.search_form.personAttribute, //人员属性
                        companyId:this.custData.id//机构id
                    }
                }
                this.$post('/info/crm/getCompanyContact', data).then((response)=> {
                   console.log(response.data)
                    if(response.code != this.success_code) {
                      this.$message.error(response.msg);
                      return
                    }
                    if(response.data.pageNum > response.data.pages) {
                      this.currentPage = response.data.pages;
                      this.contactList();
                      return
                    }
                    for(var i=0; i<response.data.list.length; i++){
                        if(response.data.list[i].isSenior == 1){
                            response.data.list[i].isSenior = "是"
                        }else{
                            response.data.list[i].isSenior = "否"
                        }
                    }
                    this.tableData = response.data.list;
                    this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });
            }else if(this.$store.state.customObj.id == 2){
                //alert(2)
                this.typeIds = this.naturalData.id;
                this.typeNames = 2
                var data={
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    data: {
                        department: this.search_form.department,//职务
                        contactName: this.search_form.contactName,//联系人
                        isSenior:this.search_form.personAttribute, //人员属性
                        //companyId:this.custData.id,//机构id
                        individualId:this.naturalData.id//自然人
                        // individualId: this.finacnData.id,//自然人
                    }
                }
                this.$post('/info/crm/getIndividualContact', data).then((response)=> {
                   // console.log(response.data)
                   if(response.code != this.success_code) {
                      this.$message.error(response.msg);
                      return
                    }
                    if(response.data.pageNum > response.data.pages) {
                      this.currentPage = response.data.pages;
                      this.contactList();
                      return
                    }
                   for(var i=0; i<response.data.list.length; i++){
                        if(response.data.list[i].isSenior == 1){
                            response.data.list[i].isSenior = "是"
                        }else{
                            response.data.list[i].isSenior = "否"
                        }
                    }
                    this.tableData = response.data.list;
                    this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });
            }else if(this.$store.state.customObj.id == 3){
                //alert(3)
                    this.typeIds = this.finacnData.id;
                    this.typeNames = 3
                var data={
                    token: this.token,
                    userId: this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    data: {
                        department: this.search_form.department,//职务
                        contactName: this.search_form.contactName,//联系人
                        isSenior:this.search_form.personAttribute, //人员属性
                        //companyId:this.custData.id,//机构id
                        intermediaryId:this.finacnData.id//中介机构
                        //individualId: this.finacnData.id,//自然人
                    }
                }
                this.$post('/info/crm/getIntermediaryContact', data).then((response)=> {
                    //console.log(response.data)
                    if(response.code != this.success_code) {
                      this.$message.error(response.msg);
                      return
                    }
                    if(response.data.pageNum > response.data.pages) {
                      this.currentPage = response.data.pages;
                      this.contactList();
                      return
                    }
                    for(var i=0; i<response.data.list.length; i++){
                        if(response.data.list[i].isSenior == 1){
                            response.data.list[i].isSenior = "是"
                        }else{
                            response.data.list[i].isSenior = "否"
                        }
                    }
                    this.tableData = response.data.list;
                    this.dataTotal = response.data.total;
                }).catch(function(error) {
                    console.log(error);
                });
            }


      },
      //编辑
      editTable(index, row) {
       console.log(row)
        this.dialogVisibleedit= true;
        this.newObject.contactName = row.contactName;
        this.newObject.department = row.department;
        this.newObject.telephone = row.telephone;
        this.newObject.duty = row.duty;
        if(row.isSenior == "否"){
            this.newObject.isSenior = 0
        }else{
            this.newObject.isSenior = 1
        }

        // this.newObject.isSenior = row.isSenior;
        this.newObject.identityCard = row.identityCard;
        this.newObject.phoneNumber = row.phoneNumber;
        this.newObject.email = row.email;
        this.newObject.address = row.address
        this.globalid = row.id;


      },
      // 分页
      onPageChange(currentPage) {
          this.currentPage = currentPage;
         this.contactList()
      },
      handleSizeChange(val) {
          this.pageSize = val;
        //console.log(`每页 ${val} 条`);
        this.contactList()
      },
      //保存
      saveMsgadd() {
        if (this.newObject.contactName == "" || this.newObject.contactName == undefined || this.newObject.contactName == null) {
          this.$message.error('联系人名称内容不能为空');
          return;
        }
        if (this.newObject.department == "" || this.newObject.department == undefined || this.newObject.department == null) {
          this.$message.error('部门内容不能为空');
          return;
        }
        if (this.newObject.telephone == "" || this.newObject.telephone == undefined || this.newObject.telephone == null) {
          this.$message.error('固定电话内容不能为空');
          return;
        }
        // if (this.newObject.telephone == "" || this.newObject.telephone == undefined || this.newObject.telephone == null) {
        //     this.$message.error('固定电话不能为空');
        //     return;
        // } else if (!(/^[0-9]+.?[0-9]*$/.test(this.newObject.telephone))) {
        //     this.$message.error('固定电话有误，请重填');
        //     return;
        // }
        // if (this.newObject.telephone == "" || this.newObject.telephone == undefined || this.newObject.telephone == null) {
        //     this.$message.error('固定电话不能为空');
        //     return;
        // } else if (!(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.newObject.telephone))) {
        //     this.$message.error('固定电话有误，请重填');
        //     return;
        // }
        if(this.newObject.isSenior+"" == "" || this.newObject.isSenior == undefined || this.newObject.isSenior == null){
            this.$message.error('是否为董监高为必选');
            return;
        }
        if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
            this.$message.error('证件号码内容不能为空');
            return;
        }else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.newObject.identityCard))){
            this.$message.error("证件号码格式不正确,请重新输入");
            return false;
        }
        if (this.newObject.duty == "" || this.newObject.duty == undefined || this.newObject.duty == null) {
          this.$message.error('职务内容不能为空');
          return;
        }
        if (this.newObject.phoneNumber == "" || this.newObject.phoneNumber == undefined || this.newObject.phoneNumber == null) {
            this.$message.error('手机号码内容不能为空');
            return;
        } else if (!(/^1[34578]\d{9}$/.test(this.newObject.phoneNumber))) {
            this.$message.error('手机号格式不正确,请重新输入');
            return;
        }
        if (this.newObject.email == "" || this.newObject.email == undefined || this.newObject.email == null) {
          this.$message.error('邮箱内容不能为空');
          return;
        } else if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.newObject.email)) {
          this.$message.error('邮箱格式不正确,请重新输入');
          return;
        }

        if(this.$store.state.customObj.id == 1){
           // alert(1)
            this.typeIds = this.custData.id;
            this.typeNames = 1
        }else if(this.$store.state.customObj.id == 2){
            //alert(2)
            this.typeIds = this.naturalData.id;
            this.typeNames = 2
        }else if(this.$store.state.customObj.id == 3){
           // alert(3)
                this.typeIds = this.finacnData.id;
                this.typeNames = 3
        }

        var addObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    contactName: this.newObject.contactName, //联系人姓名
                    department: this.newObject.department, //部门
                    telephone: this.newObject.telephone, //固话
                    duty: this.newObject.duty, //职务
                    phoneNumber:this.newObject.phoneNumber, //手机号码
                    email:this.newObject.email,  //邮箱
                    address: this.newObject.address, //办公地址
                    typeId:this.typeIds,  //客户类型id
                    type:this.typeNames,  //客户类型
                    isSenior:this.newObject.isSenior, //是否为董监高
                    identityCard:this.newObject.identityCard //证件号码
                    // companyId:1,//机构id
                    // individualId:1,//自然人（个人）id
                    // intermediaryId:1,//中介机构id
                }
            };
            var _this = this;
            this.$post('/info/crm/Contact/add', addObj).then((response)=> {
                if(response.code == _this.success_code){
                    _this.dialogVisibleadd = false;
                    // 保存成功，关闭弹窗，关闭定时器
                    _this.closemediumDialog()
                    // 保存成功，清空草稿数据
                    _this.$utils.removeDraft(this.route_id, false)
                    _this.handleNewProData()
                    _this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    _this.contactList();
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });

        // if (this.dialogTitle == "编辑客户联系人") {
        //   this.tableData[this.ind] = this.newObject;
        //     alert(44)
        // } else {
        //   this.newObject.id = this.tableData.length;
        //   this.tableData.push(this.newObject);
        //   alert(66)
        // }
        // this.dialogVisible = false;
      },
      //保存
      saveMsgedit() {
        if (this.newObject.contactName == "" || this.newObject.contactName == undefined || this.newObject.contactName == null) {
          this.$message.error('联系人名称内容不能为空');
          return;
        }
        if (this.newObject.department == "" || this.newObject.department == undefined || this.newObject.department == null) {
          this.$message.error('部门内容不能为空');
          return;
        }
        if (this.newObject.telephone == "" || this.newObject.telephone == undefined || this.newObject.telephone == null) {
          this.$message.error('固定电话不能为空');
          return;
        }
        // if (this.newObject.telephone == "" || this.newObject.telephone == undefined || this.newObject.telephone == null) {
        //     this.$message.error('固定电话不能为空');
        //     return;
        // } else if (!(/^[0-9]+.?[0-9]*$/.test(this.newObject.telephone))) {
        //     this.$message.error('固定电话有误，请重填');
        //     return;
        // }
        if (this.newObject.duty == "" || this.newObject.duty == undefined || this.newObject.duty == null) {
          this.$message.error('职务内容不能为空');
          return;
        }
        if(this.newObject.isSenior+"" == "" || this.newObject.isSenior == undefined || this.newObject.isSenior == null){
            this.$message.error('是否为董监高为必选');
            return;
        }
        if (this.newObject.identityCard == "" || this.newObject.identityCard == undefined || this.newObject.identityCard == null) {
            this.$message.error('证件号码不能为空');
            return;
        }else if(!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.newObject.identityCard))){
            this.$message.error("证件号码错误");
            return false;
        }
        if (this.newObject.phoneNumber == "" || this.newObject.phoneNumber == undefined || this.newObject.phoneNumber == null) {
            this.$message.error('手机号码不能为空');
            return;
        } else if (!(/^1[34578]\d{9}$/.test(this.newObject.phoneNumber))) {
            this.$message.error('手机号码有误，请重填');
            return;
        }
        if (this.newObject.email == "" || this.newObject.email == undefined || this.newObject.email == null) {
          this.$message.error('邮箱内容不能为空');
          return;
        } else if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.newObject.email)) {
          this.$message.error('邮箱格式错误');
          return;
        }
        var editObj = {
                token:this.token,
                userId:this.userId,
                data:{
                    id: this.globalid,
                    contactName: this.newObject.contactName, //联系人姓名
                    department: this.newObject.department, //部门
                    telephone: this.newObject.telephone, //固话
                    duty: this.newObject.duty, //职务
                    phoneNumber:this.newObject.phoneNumber, //手机号码
                    email:this.newObject.email,  //邮箱
                    address: this.newObject.address, //办公地址
                    isSenior:this.newObject.isSenior, //是否为董监高
                    identityCard:this.newObject.identityCard //证件号码
                }
            };
            var _this = this;
            this.$post('/info/crm/contact/update', editObj).then((response)=> {
                if(response.code == _this.success_code){
                    _this.dialogVisibleedit = false;
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    _this.contactList();
                }else{
                    _this.$message(response.msg);
                }
            }).catch(function(error) {
                console.log(error);
            });

        // if (this.dialogTitle == "编辑客户联系人") {
        //   this.tableData[this.ind] = this.newObject;
        //     alert(44)
        // } else {
        //   this.newObject.id = this.tableData.length;
        //   this.tableData.push(this.newObject);
        //   alert(66)
        // }
        // this.dialogVisible = false;
      }

    }
  }

</script>

<style scoped lang="scss" type="text/css">
.contactpersonparents .contactperson {
    position: relative;
    background: #fff;

  .form_box {
    background: #fff;
    padding-top: 5px;
    padding-left: 10px;
    // padding-bottom: 20px;

  .el-form-item {
    float: left;
    margin-right: 10px;
    margin-bottom: 15px;
    height: 40px;

  .el-input {
    width: 217px;
  }

  .inline-input {
    width: 217px;
  }

  .el-select {
    width: 217px;
  }
  .el-textarea {
    width: 565px;
  }

  }
  .el-button {
    float: left;
    margin-left: 20px;
    margin-top: 0px;
  }

  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
    margin-right: 40px;
  }
    .func_btn{
    width:200px;
    position: relative;
    top: -40px;
  }

  }
</style>
<style>
.contactpersonparents .contactperson  .el-dialog__header{
      text-align: center!important;
      color:#333!important;
      border-bottom:1px solid #e6e6e6;
  }
.contactpersonparents .el-textarea .el-textarea__inner{
  resize: none;
}
.contactpersonparents .contactperson .table_box {
    padding: 0 10px;
    box-sizing: border_box;
  }

.contactpersonparents .contactperson .add_per {
    position: absolute;
    right: 20px;
    top: -10px;
  }

.contactpersonparents .contactperson .el-dialog {
    text-align: left;
  }
.contactpersonparents .cell .el-button--text {
    padding: 0;
}

.contactpersonparents .contactperson .el-textarea {
    width: 550px;
  }

 .contactpersonparents .contactperson .el-dialog__footer {
    text-align: right;
    margin-right: 15px;
    margin-top:0px!important;
  }

  .contactpersonparents .contactperson .dialog_tit {
    font-size: 16px;
    font-weight: 600;
  }
.contactpersonparents .contactperson .el-button--medium{
    padding: 12px 20px!important;
}
.edit-ishigh{
  display: flex;
  justify-content: left;
}
/* .el-input__inner{
    height: 34px!important;
} */
 .contactpersonparents .contactperson .shanchutankuang .el-dialog .el-dialog__header{
      border-bottom:1px solid #fff!important;
      text-align: left!important;
      font-size: 18px;
      color: #303133;
  }
.contactpersonparents .contactperson  .shanchutankuang .el-dialog .el-dialog__footer{
      margin-right: 0px;
  }
.contactpersonparents .contactperson  .shanchutankuang .el-dialog__body{
      text-align: left;
  }

.contactpersonparents .contactperson  .shanchutankuang .el-dialog .el-dialog__footer .dialog-footer .el-button{
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

</style>
