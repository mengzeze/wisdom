 <template>
  <div class="contentment">
    <div style="color:#999;font-size:20px;font-weight:600;text-align:center;margin-top: 100px;display: none;">暂无权限</div>
    <div>
      <div class="content_top" style="position:relative;">
        <el-breadcrumb separator="/" style="height:46px;line-height:46px">
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content_title">人员管理</div>
        <!--<p @click="sponsor">新增账户</p>-->
        <el-button v-if="$utils.checkSystemPermission('bask_account_add')" style="position:absolute;right:25px;top:40px;" type="primary" @click="sponsor" icon="el-icon-plus">新增人员</el-button>
        <!--<div @click="sponsor">>新增账户</div>-->
      </div>
      <div class="content_zj" style="clear: both;">
      </div>
      <div class="content_tag">
        <ul>
          <li v-on:keyup.enter="search">
            <div class="search_box"><span>姓名：</span>
              <el-input size="mini" v-model="name" placeholder="请输入姓名"></el-input>
            </div>
            <div class="search_box"><span>手机：</span>
              <el-input size="mini" v-model="mobiles" placeholder="请输入手机号"></el-input>
            </div>
            <div class="search_box"><span>登录账户：&nbsp;</span>
              <el-input size="mini" v-model="usernames" placeholder="请输入登录账号"></el-input>
            </div>
            <div class="search_box"><span>角色：</span>
              <el-select v-model="userRolesId" filterable placeholder="请输入角色">
                <el-option v-for="item in userRolesList" :key="item.id" :label="item.roleName" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="search_box" :title="search_department"><span>部门：</span>
              <el-input disabled size="mini" v-model="search_department" placeholder="请选择部门" class="selInp"></el-input>
              <el-button type="primary" size="small" class="selBtn" @click="selDepartment(1)">选择</el-button>
            </div>
            <div class="search_box"><span>职位：</span>
              <el-input size="mini" v-model="search_positi" placeholder="请输入职位"></el-input>
            </div>
            <div id="search_btn_box">
              <el-button size="medium" style="height:40px;" type="primary" @click="search" icon="el-icon-search">查询</el-button>
              <el-button size="medium" style="height:40px;" @click="reset" icon="el-icon-refresh">重置</el-button>
            </div>
            <!-- </div> -->
          </li>
          <li style="width: 100%;height: 4px;padding:0px;text-align: left;margin-top: 4px; margin-left: 12px;">
            <h2>用户数量：{{totals}}</h2>
          </li>
          <li>
            <el-table :data="tableDataS" v-loading="loading" class="user_table" :header-cell-style="{background:'#FAFAFA',color:'black','text-align':'center'}" style="width: 100%">
              <el-table-column prop="name" label="姓名" :title="name" width="120" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.name" class="user_table_item">{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="role_name" label="角色" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.role_name" class="user_table_item">{{scope.row.role_name}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="username" label="登录账户" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.username" class="user_table_item">{{scope.row.username}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="60" align="center">
              </el-table-column>
              <el-table-column prop="dept_name" label="部门" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.dept_name" class="user_table_item">{{scope.row.dept_name}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="job" label="职位" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.job" class="user_table_item">{{scope.row.job}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="officeSpace" label="工作地点" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.officeSpace" class="user_table_item">{{scope.row.officeSpace}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="identityCard" label="证件号码" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.identityCard" class="user_table_item">{{scope.row.identityCard}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.mobile" class="user_table_item">{{scope.row.mobile}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="telephone" label="固定电话" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.telephone" class="user_table_item">{{scope.row.telephone}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="email" label="邮箱" align="center">
                <template slot-scope="scope">
                  <div :title="scope.row.email" class="user_table_item">{{scope.row.email}}</div>
                </template>
              </el-table-column>
              <el-table-column width="150" prop="login_time" label="最近登录" align="center">
              </el-table-column>
              <el-table-column prop="account_flag" align="center" label="账号状态">
              </el-table-column>
              <el-table-column width="200" label="操作">
                <template slot-scope="scope">
                  <div class="oper_box">
                    <!-- if(row.account_flag == '激活'){
                                        name='冻结'
                                    }else{
                                        name='激活'
                                    } -->
                    <!-- <el-tooltip content="冻结" placement="top">
                                 <div @click="frost(scope.row)" class="recallss1 op_one"></div>
                                </el-tooltip> -->

                    <div v-if="scope.row.account_flag == '激活' && $utils.checkSystemPermission('bask_account_frozen')" title="冻结">
                      <div @click="frost(scope.row)" class="icon-operate-btn iconfont suoding1"></div>
                    </div>
                    <div v-if="scope.row.account_flag != '激活' && $utils.checkSystemPermission('bask_account_frozen')" title="激活">
                      <div @click="frost(scope.row)" class="icon-operate-btn iconfont suoding1"></div>
                    </div>

                    <div title="重置" v-if="$utils.checkSystemPermission('bask_reset_pwd')">
                      <div @click="resets(scope.row)" class="icon-operate-btn iconfont jinyong"></div>
                    </div>
                    <div title="编辑" v-if="$utils.checkSystemPermission('bask_account_update')">
                      <div @click="update(scope.row)" class="icon-operate-btn iconfont bianji2-copy"></div>
                    </div>
                    <div title="删除" v-if="$utils.checkSystemPermission('bask_account_del')">
                      <div @click="delect(scope.row)" class="icon-operate-btn delete iconfont shanchu"></div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="totals" :pageSize.sync="pageSize" :page-sizes.sync="pageSizes" :current-page.sync="currentPage" @current-change="onPageChange" @size-change="handleSizeChange">
              </el-pagination>
            </div>
          </li>
        </ul>
      </div>
      <el-dialog title="修改密码" :close-on-click-modal="false" align="left" :visible.sync="changePassword" ref="dialog__wrapper" width="400px">
        <div id="user">
          <ul>
            <li><i>*</i><span>原密码：</span><span style="margin-left: 12px;">
                <el-input v-model="oldpassword" size="mini" placeholder="请输入内容"></el-input>
              </span></li>
            <li><i>*</i><span>新密码：</span><span style="margin-left: 12px;">
                <el-input v-model="newpassword" size="mini" placeholder="请输入内容"></el-input>
              </span></li>
            <li><i>*</i><span>确认密码：</span><span>
                <el-input size="mini" v-model="password" placeholder="请输入内容"></el-input>
              </span></li>
          </ul>
        </div>
        <div id="dialog-footer">
          <el-button size="medium" @click="changePassword = false">取 消</el-button>
          <el-button size="medium" style=" background: #0061a9;color:white" @click="change_password">确 定</el-button>
        </div>
      </el-dialog>
      <div>
        <el-dialog :title='uptitle'  align="left" :visible.sync="addPerson" :close-on-click-modal="false" @close="closes" center width="550px">
          <div id="user">
            <ul style="width:100%">
              <li>
                <div class="user_left">
                  <i>*</i><span>登录账号：</span>
                </div>
                <div class="user_right">
                  <el-input size="mini" :disabled="deabel" maxlength="18" v-model="username" placeholder="请输入登录账号"></el-input>
                </div>
              </li>
              <li v-if="satetpass">
                <div class="user_left"><i>*</i><span>初始密码：</span></div>
                <div class="user_right">
                  <el-input size="mini" type="password" v-model="password" placeholder="请输入初始密码"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i>*</i><span>姓名：</span></div>
                <div class="user_right">
                  <el-input size="mini" v-model="names" placeholder="请输入姓名"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i>*</i><span>性别：</span></div>
                <div class="user_right">
                  <el-radio v-model="radio" label="0">男</el-radio>
                  <el-radio v-model="radio" label="1">女</el-radio>
                </div>
              </li>
              <li>
                <div class="user_left"><i></i><span>手机：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="11" v-model="mobile" placeholder="请输入手机"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i>*</i><span>证件类型：</span></div>
                <div class="user_right">
                  <el-select v-model="idTypes" placeholder="请选择证件类型" @change="idTypeShow" style="width:400px">
                    <el-option
                      v-for="item in idType"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li v-if="idNameShow">
                <div class="user_left"><i>*</i><span>证件名称：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="30" v-model="idName" placeholder="请输入证件名称" ></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i>*</i><span>证件号码：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="18" minlength="1" v-model="idNum" placeholder="请输入证件号码"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i v-if="jobAddress">*</i><span>工作地点：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="100" v-model="mobiledd" placeholder="请输入工作地点"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i></i><span>固定电话：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="50" v-model="mobilegd" placeholder="请输入固定电话"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i></i><span>邮箱：</span></div>
                <div class="user_right">
                  <el-input size="mini" type="email" maxlength="50" v-model="email" placeholder="请输入邮箱"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left"><i>*</i><span>部门：</span></div>
                <div class="user_right">
                  <div class="userbc" :title="department" @click="selDepartment(2)">
                     <span class="usercinfo">{{department}}</span>
                    <div><img style="width: 15%;" src="../../../assets/my_pproval/矢量智能对象@2x.png" alt="">&nbsp;选择部门</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="user_left"><i></i><span>职位：</span></div>
                <div class="user_right">
                  <el-input size="mini" maxlength="20" v-model="job" placeholder="请输入职位"></el-input>
                </div>
              </li>
              <li>
                <div class="user_left">
                  <i>*</i><span>角色：</span>
                </div>
                <div class="user_right">
                  <div @click="roles" class="userbc clearfix">
                    <span style="float: left;overflow: hidden;width: 73%;height: 30px;text-overflow: ellipsis;white-space: nowrap;">
                      <a href="javascript:void(0)" :title="strs">{{strs}}</a>
                    </span>
                    <div class="fl" style="max-width:100px;"><img style="width: 13%;" src="../../../assets/my_pproval/部门成员@2x.png" alt="">&nbsp;选择角色</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div id="dialog-footer" style="text-align:right;padding-right: 10px;padding-top: 100px">
            <el-button size="medium" @click="newqux">取 消</el-button>
            <el-button size="medium" v-if="satetpas" @click="personEdit" type="primary">确 定</el-button>
            <el-button size="medium" v-if="satetpass" @click="personAdd" type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <select_box  :flag="flag" :setdatainfo="setdatainfo" v-on:states="sat" :flagstate="flagstate" :selectTree="selectTree" />
      <select_boxs :setdatas="setdatas" :rights="rights" v-if="flags" @statesbox='statesboxs' :Role="Role" :roledata="roledata" />
    </div>
  </div>
</template>
<script>
import select_box from '@/components/select_box/selectManagement' // 选择部门
import select_boxs from '@/components/select_box/select_boxs3' // 选择角色
import { stat, copyFileSync } from 'fs';
import { setInterval, clearInterval } from 'timers';
export default {
  components: {
    select_box,
    select_boxs
  },
  data () {
    return {
      deabel: "",
      setdatainfo:[],
      setdatainfo2:{
        s:[],
        d:[]
      },
      newmanagement: null,
      aaxstat: "",
      i: 0,
      idNum: "",
      mobiledd: "",
      setdata: [],
      mobilegd: '',
      setdatas: [],
      selectTree: '',
      rights: '',
      rowjh: [],
      rows: '',
      stateli: '激活',
      roledata: '',
      oldpassword: '',
      satetpas: false,
      newpassword: '',
      upassword: '',
      password: '',
      uptitle: '',
      satetpass: true,
      flag: false,
      flags: false,
      flagstate: '',
      totals: 0,
      loading: true,
      audit: true,
      names: '',
      text: '请输入',
      changePassword: false,
      addPerson: false,

      username: '',
      password: '',
      name: '',
      mobile: '',
      idName:'',
      idNum:'',
      email: '',
      job: '',
      mobiles: '',
      usernames: '', // 登录账户

      userRolesList: [], // 当前账号角色
      userRolesId: '', // 角色Id
      search_department: '', // 查询选择部门
      search_department_id: '', // 查询部门id
      search_positi: '', // 查询职位
      activeDialogType: 1, // 1为页面激活  2为表格编辑激活
      dept_name: '',
      currentPages: 1,
      vals: 10,
      role_name: '',
      radio: '1',
      // textares: '最多输入400字',
      // textaress: 'xx(发起人)  提醒您审批他的xx(审批类型)审批',
      checked: true,
      Role: '',
      RoleId: '',
      value: '',
      tableDataS: [],
      multipleSelection: [],
      pageSize: 0,
      pageSizes: [10, 20, 50, 100],    //每页显示数量
      currentPage: 1,  //当前页
      dataTotal: 0,    //总量
      token: this.$store.state.loginObject.userToken,
      userId: this.$store.state.loginObject.userId,
      department: '请选择部门',
      strs: '请选择角色',
      // mustFillItem: {//身份证和工作地点是否必填
      //   idCard: true,
      // },
      jobAddress: true,
      idType:this.report.reportData.idType,
      idNameShow: false,
      idTypes:'',
    };
  },
  computed:{
  },
  watch:{
    addPerson(val){
      if(!val){
        this.setdatainfo2.s = []
      }
    }
  },
  created () {
    this.idTypes = this.idType[0].id
  },
  mounted () {
    this.Search_listings();
    this.postUserRole();
    this.getIsMustFill();
  },
  methods: {
    // 获取新增人员时身份证和工作地点是否为必填项
    getIsMustFill() {
        let data = {
            data: {
                tableId: 1
            }
        }
        this.$post('/sys/interface/enableState', data).then((response)=> {
            if(this.code.codeNum.SUCCESS == response.code) {                    
              let data =  response.data;
              data.map((item)=>{
                if(item.name == '工作地点'){
                  this.jobAddress = item.enableState == 1 ? true : false;
                }
              //  if(item.name == '身份证'){
              //    this.mustFillItem.idCard = item.enableState == 1 ? true : false;
              //  } else if(item.name == '工作地点'){
              //    this.mustFillItem.jobAddress = item.enableState == 1 ? true : false;
              //  }
              })            
            }                      
        }).catch(function(error) {});
    },
    // 请求当前账户角色
    postUserRole () {
      this.$post('/sys/getQueryRole').then((response) => {
        if (response.code == this.code.codeNum.SUCCESS) {
          this.userRolesList = response.data;
        } else {
          this.$message(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 选择部门的按钮
    selDepartment (type) {
      this.activeDialogType = type;
      this.userbcs();
      if(type == 2){
        this.setdatainfo = {
          data:this.setdatainfo2.s,
          max:Math.random()          
        }
      }else{
        this.setdatainfo = {
          data:this.setdatainfo2.d,
          max:Math.random()
        }
      }
      console.log(this.setdatainfo2.s)
      console.log(this.setdatainfo2.d)
    },
    idTypeShow(){
      if(this.idTypes === '1007'){
        this.idNameShow = true
      }else{
        this.idNameShow = false
      }

      console.log(this.idTypes)

      for(let i = 0; i < this.idType.length; i++){
        if(this.idTypes === this.idType[i].id){
          return this.idTypes = this.idType[i].id
        }
      }
    },
    // 选择部门返回的函数
    sat (data) {
      this.flag = false
      if (this.activeDialogType === 2) {
        this.department = data.map(v=>v.name).join(',');
        this.dept_name =  data.map(v=>v.id).join(',');
        this.setdatainfo2.s= data
        console.log(this.setdatainfo2.s)
      } else {
        this.search_department = data.map(v=>v.name).join(',');
        this.search_department_id = data.map(v=>v.id).join(',');
        this.setdatainfo2.d= data
        console.log(this.setdatainfo2.d)
      }
    },

    // 弹框关闭
    closes () {
      this.username = ""
      this.password = ""
      this.names = ""
      this.radio = ""
      this.mobile = ""
      this.mobiledd = ""
      this.idNum = ""
      this.email = ""
      this.strs = "请选择角色"
      this.job = ""
      this.department = "请选择部门"
      this.setdata = []
      this.mobilegd = ""
      clearInterval(this.newmanagement)
    },

    // 获取部门中左侧的树的 数据
    userbcs () {
      this.$store.state.Management.state = 1
      var data = {
        token: this.token,
        userId: this.userId,
      }
      var _this = this
      this.$post('/sys/getOrganization', data).then((response) => {
        _this.flagstate = { states: 3 }
        _this.selectTree = response.data
        _this.flag = true
      }).catch(function (error) {
        console.log(error);
      });
    },

    // 查询-选择角色的方法
    statesboxs (data) {
      this.setdata = data
      var arr = this.setdata
      // const arr = data
      const arrs = []
      if(arr.length){
        for (let i = 0; i < arr.length; i++) {
          arrs.push(arr[i].roleName)
        }
        console.log(arr,arrs)
        this.strs = arrs.join(',')
      } else {
        this.strs = '请选择角色'
      }
      this.flags = false
    },

    // 重置方法
    reset () {
      this.name = ''
      this.mobiles = ''
      this.usernames = ''
      this.userRolesId = ''
      this.search_department = ''
      this.search_department_id = ''
      this.search_positi = ''
      this.setdatainfo2.d = []
    },
    // 查询
    search () {
      this.aaxstat = 1
      this.currentPage = 1
      this.currentPages = 1
      this.Search_listings()
    },

    // 新增人员中的角色点击
    roles () {
      var data = {
        pageNo: 0,
        pageSize: 20,
        token: this.token,
        userId: this.userId,
        data: {}
      }
      var _this = this
      this.$post('/sys/getQueryRole', data).then((response) => {
        _this.roledata = response.data
        _this.Role = { state: 2 }
        _this.$store.commit("setdatas", _this.setdata);
        _this.flags = true
      }).catch(function (error) {
        console.log(error);
      });
    },

    // 查询的调用方法
    Search_listings () {
      var data = {
        data: {
          name: this.name,
          mobile: this.mobiles,
          username: this.usernames,
          roleId: this.userRolesId,
          deptIdSet:this.setdatainfo2.d.map(v=>v.id),
          job: this.search_positi
        },
        pageNo: this.currentPages,
        pageSize: this.vals,
      }
      this.$post('/sys/getAllUser', data).then((response) => {
        if(response.code != this.code.codeNum.SUCCESS) {
          this.$message.error(response.msg);
          this.loading = false
          return
        }
        this.totals = response.data.total;
        // 最后一页没数据请求上一页
        if(this.currentPages > response.data.pages) {
          this.currentPages = response.data.pages;
          this.Search_listings();
          return
        }
        this.tableDataS = response.data.list;
        this.loading = false
      }).catch(function (error) {
        console.log(error);
      });
    },

    // 修改密码的确定按钮
    change_password () {
      if (this.newpassword != this.password) {
        this.$message({
          message: '请保持新密码一致',
          type: 'warning'
        });
        return;
      }
      var data = {
        data: {
          "id": this.upassword,
          "password": this.oldpassword,
          "newPassword": this.password        },
        token: this.token,
        userId: this.userId,
      }
      var _this = this
      this.$post('/sys/updatePassword', data).then((response) => {
        if (response.code == _this.code.codeNum.SUCCESS) {
          _this.$message({
            message: response.msg,
            type: 'success'
          });
          _this.Search_listings()
          _this.changePassword = false
        } else {
          _this.$message(response.msg)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 小雪：隐藏掉--页面没有用
    // Roles (el) {
    //   var RoleId = this.Role.find((item) => {
    //     return item.roleName === el
    //   });
    //   this.RoleId = RoleId.id
    // },

    // 新增人员的函数
    sponsor () {
      this.deabel = false
      this.uptitle = "新增人员"
      this.addPerson = true
      this.satetpas = false
      this.satetpass = true
      let draft = this.$utils.getDraft('newmanagement', false)
      if (!draft) {
        this.setTimeoutr()
        return      
      }
      if (draft.idTypes === '1007') {
        this.idNameShow = true
      }
      this.$confirm('是否载入上次保存的草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 回显草稿数据
        console.log(draft)
        this.username = draft.username
        this.password = draft.password
        this.names = draft.name
        this.radio = draft.sex
        this.mobile = draft.mobile
        this.email = draft.email
        this.job = draft.job
        this.mobilegd = draft.telephone
        this.idNum = draft.identityCard
        this.mobiledd = draft.officeSpace
        this.idTypes = draft.idTypes
        this.idName = draft.idName
        this.setTimeoutr()
      }).catch(() => {
        this.setTimeoutr()
      });
      this.clear_data()
    },

    // 保存草稿的计时器
    setTimeoutr () {
      this.newmanagement = setInterval(() => {
        var data = {
          username: this.username,
          password: this.password,
          name: this.names,
          sex: this.radio,
          mobile: this.mobile,
          email: this.email,
          job: this.job,
          telephone: this.mobilegd,
          identityCard: this.idNum,
          officeSpace: this.mobiledd,
          // idTypes: this.idTypes,
          idTypes: this.idTypes,
          idName: this.idName,
        }
        // console.log('___________'+ this.idType)
        this.$utils.saveDraft('newmanagement', data, false)
      }, 1000)
    },

    // 新增人员及编辑人员的取消按钮
    newqux () {
      this.addPerson = false
      this.username = ""
      this.password = ""
      this.names = ""
      this.radio = ""
      this.mobiledd = ""
      this.idNum = ""
      this.mobile = ""
      this.email = ""
      this.strs = ""
      this.job = ""
      this.department = ""
      this.mobilegd = ""
      // this.idTypes = ''
      this.idName = ''
      this.idNameShow = false
    },
    // 清空
    clear_data () {
      this.username = ""
      this.password = ""
      this.names = ""
      this.radio = ""
      this.mobiledd = ""
      this.idNum = ""
      this.mobile = ""
      this.email = ""
      this.strs = "请选择角色"
      this.job = ""
      this.department = "请选择部门"
      this.mobilegd = ""
      this.idTypes = '1001'
      this.idName = ''
    },
    // 格式校验
    formTest(){
      if (!this.username
        || !this.names
        || !this.radio
        || !this.idTypes
        || !this.idNum
        || (this.jobAddress && !this.mobiledd)
        || !this.department
        || this.department === "请选择部门" || this.department === ''
        || this.strs === "请选择角色"
        ) {
        this.$message.warning('请填写完整资料');
        return
      }
      // 用户名验证
      if (this.username.length < 2 || this.username.length > 20) {
        this.$message.warning('用户名长度2~20位');
        return;
      }
      const userNameTest = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (!userNameTest.test(this.username)) {
        this.$message.warning('用户名不能输入特殊字符和空格');
        return;
      }
      // 姓名验证
      if(this.names.length > 20){
        this.$message.warning('姓名长度不能超过20');
        return;
      }
      //手机验证
      const mobileTest = /^[1][3456789][0-9]{9}$/
      if (this.mobile && !mobileTest.test(this.mobile)) {
        this.$message.warning('手机号格式错误，请重试');
        return;
      }
      // 证件类型为身份证校验
      if(this.idTypes === '1001' && this.idNum){
        const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!idcardReg.test(this.idNum)) {
          this.$message.warning('身份证号码格式错误');
          return;
        }
      }
      // 证件类型为其他，证件名称校验
      if(this.idTypes == '1007' && !this.idName){
        this.$message.warning('请填写证件名称');
        return
      }
      // 工作地点验证
      if(this.jobAddress && !this.mobiledd){
        this.$message.warning('请输入工作地点');
        return
      }
      //邮箱验证
        if (this.email && !this.$utils.testEmail(this.email)) {
          this.$message.warning('邮箱格式错误');
          return;
        }
      //职位验证
      const jobTest = /^[\u4E00-\u9FA5A-Za-z]+$/;
        if (this.jib && !jobTest.test(this.job)) {
          this.$message.warning('职位输入有误，职位名由汉字或字母组成');
          return;
        }    
      return true
    },
    // 新增人员方法
    personAdd () {
      this.addPerson = true
      if (!this.formTest()) {
        return
      }
      if (!this.password) {
        this.$message.warning('请填写完整资料');
        return
      }
      // 密码验证
      const regTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
      if (!regTest.test(this.password)) {
        this.$message.warning('密码格式错误,请输入6-18位数字与字母的组合');
        return;
      }
      
      // if(this.mustFillItem.idCard && !this.idNum){
      //   this.$message.warning('请输入身份证信息');
      //   return
      // }
      // if (!this.deptIdSet) {
      //   console.log(this.deptIdSet)
      //   this.$message.warning('请选择部门');
      //   return
      // }
      // if(!this.setdata || !this.setdata.length) {
      //   this.$message.warning('请填写完整资料');
      //   return
      // }
      const arr = this.setdata
      const arrs = []
      for (let i = 0; i < arr.length; i++) {
        arrs.push(Number(arr[i].id))
        console.log(arrs,arr)
      }
      var data = {
        data: {
          username: this.username,
          password:this.password,
          name: this.names,
          sex: this.radio,
          mobile: this.mobile,
          idType:this.idTypes,
          idName:this.idName,
          identityCard: this.idNum,
          officeSpace: this.mobiledd,
          telephone: this.mobilegd,
          email: this.email,      
          // 'deptId': this.dept_name,
          deptIdSet:this.setdatainfo2.s.map(v=>v.id),
          job: this.job,
          roleId: arrs.join(','),           
        }        
      }
      var _this = this
      this.$post('/sys/addUser', data).then((response) => {
        console.log(response.code)
        if (response.code == 0) {
          _this.$message({
            message: response.msg,
            type: 'success'
          })
          _this.addPerson = false
          _this.username = ""
          _this.password = ""
          _this.names = ""
          _this.radio = ""
          _this.mobiledd = ""
          _this.idNum = ""
          _this.mobile = ""
          _this.email = ""
          _this.strs = ""
          _this.job = ""
          _this.mobilegd = ""
          _this.department = ""
          _this.$utils.removeDraft('newmanagement', false)
          clearInterval(_this.newmanagement)
          //  console.log(_this.currentPage,_this.vals)
          _this.Search_listings()
        } else if (response.code == -2003) {
          _this.$message({
            message: response.msg,
            type: 'warning'
          })
        } else {
          _this.$message.error(response.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });  
    },

    // 编辑人员的方法
    update (row) {
      this.setdatainfo2.s = row.deptInfo
      this.activeDialogType = 2;
      this.deabel = true
      this.rowjh = row
      this.uptitle = "修改人员"
      this.addPerson = true
      this.satetpass = false
      this.satetpas = true
      this.rows = row
      this.username = row.username
      this.names = row.name
      if (row.sex == '女') {
        this.radio = '1'
      } else {
        this.radio = '0'
      }
      this.mobile = row.mobile
      this.email = row.email
      this.department = row.dept_name
      this.job = row.job
      this.mobilegd = row.telephone
      this.strs = row.role_name
      this.RoleId = row.roleId
      this.idNum = row.identityCard
      this.mobiledd = row.officeSpace
      this.dept_name = row.deptId
      this.idTypes = row.id_type + ''
      this.idName = row.id_name
      if(this.idTypes === '1007'){
        this.idNameShow = true
      }else{
        this.idNameShow = false
      }
      
      var rid = this.rowjh.roleId.split(',')
      var rname = this.rowjh.role_name.split(',')
      for (let i = 0; i < rid.length; i++) {
        this.setdata.push({ id: rid[i], roleName: rname[i] })
      }
    },

    // 编辑人员信息及校验
    personEdit () {
      if (!this.formTest()) {
        return
      }
      var arr = this.setdata
      var arrs = []
      for (let i = 0; i < arr.length; i++) {
        arrs.push(Number(arr[i].id))
      }
      var row = this.rows
      var data = {
        data: {
          id: row.id,
          username: this.username,
          name: this.names,
          sex: this.radio,
          mobile: this.mobile,
          idType:this.idTypes,
          idName:this.idName,
          identityCard: this.idNum,
          officeSpace: this.mobiledd,
          telephone: this.mobilegd,
          email: this.email,      
          // 'deptId': this.dept_name,
          deptIdSet:this.setdatainfo2.s.map(v=>v.id),
          job: this.job,
          roleId: arrs.join(','),       
        }
      }

      var _this = this
      this.$post('/sys/updateUserInfo ', data).then((response) => {
        if (response.code == 0) {
          _this.$message({
            message: response.msg,
            type: 'success'
          });
          _this.addPerson = false
          _this.Search_listings()
          // 如果修改了当前登录用户，更新当前用户信息
          row.id === this.userId && this.updateUserInfo()
        } else {
          _this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 更新当前登录人信息
    updateUserInfo(){
      this.$store.commit('userName', this.names)
    },
    // 操作列-删除
    delect (row) {
      this.$confirm('确定要删除' + row.name + '吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          data: {
            name: row.name,
            "id": row.id          
          },
          token: this.token,
          userId: this.userId,
        }
        var _this = this
        this.$post('/sys/deleteUser', data).then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message({
              message: response.msg,
              type: 'success'
            });
            _this.Search_listings()
          } else {
            _this.$message(response.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 操作列-重置 
    resets (row) {
      this.$confirm("确定将" + row.name + "的密码重置吗", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          data: {
            "id": row.id          },
          token: this.token,
          userId: this.userId,
        }
        var _this = this
        this.$post('/sys/resetPassword', data).then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message.success(response.msg)
            _this.Search_listings()
          } else {
            _this.$message(response.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(() => {
        this.$message.info('已取消')
      });
    },
    // 操作列-冻结/解冻
    frost (row) {
      var name
      if (row.account_flag == '激活') {
        name = '冻结'
      } else {
        name = '激活'
      }
      this.$confirm('确定要' + name + row.name + '吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var stat
        if (row.account_flag == "激活") {
          stat = 1
        } else {
          stat = 0
        }
        var data = {
          data: {
            'accountFlag': stat,
            name: row.name,
            "id": row.id          
          },
          token: this.token,
          userId: this.userId,
        }
        var _this = this
        this.$post('/sys/frozenUser', data).then((response) => {
          if (response.code == _this.code.codeNum.SUCCESS) {
            _this.$message.success(response.msg)
            _this.Search_listings()
          } else {
            _this.$message(response.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(() => {
        this.$message.info('已取消');
      });
    },
    //分页
    onPageChange (currentPage) {
      this.currentPages = currentPage
      this.Search_listings()
    },
    handleSizeChange (val) {
      this.vals = val;
      setTimeout(() => {
        this.Search_listings()
      }, 500)
    },
  }
}
</script>
<style lang="scss" scoped>
.contentment {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content_p {
  height: 46px;
  line-height: 46px;
}
.content_top {
  padding: 0 10px;
  margin: auto;
  height: 96px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;
}
.content_zj {
  width: 100%;
  height: 14px;
  background: #eef0f4;
}
.content_title {
  margin: 5px 0 19px;
  font-size: 20px;
  font-weight: 600;
}

.content_tag {
  width: 100%;
  // padding: 1%;
  height: 100%;
  background: white;
  margin-top: -18px;
  ul {
    li {
      width: 100%;
      padding: 10px 0;
      .user_table_item {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    li:nth-child(1) {
      padding-top: 0px;
    }
  }
}
.content_tag li:first-child {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .search_box {
    height: 40px;
    margin-left: 5px;
    float: left;
    display: flex;
    margin-right: 10px;
    margin-top: 15px;
    span {
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: right;
      color: rgba(51, 51, 51, 1);
    }
    .el-input {
      width: 220px;
      height: 40px !important;
      line-height: 40px !important;
    }
    .el-select {
        width: 220px;
    }
    h2 {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
}

.pagination {
  padding: 20px 0;
  background-color: #fff;
  text-align: right;
  padding-right: 40px;
  margin-top: 0;
}

.dialog_filess,
li,
.dialog_filesss {
  margin-top: 1%;
  font-size: 13px;
}

.userbc {
  height: 40px;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 231, 231, 1);
  border-radius: 2px;
  padding-left: 7px;
  width: 390px;
  div {
    width: 100px;
    height: 40px;
    float: right;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    background: rgba(242, 243, 245, 1);
    border-left: 1px solid rgba(231, 231, 231, 1);
    display: flex;
    align-items: center;

    img {
      margin-left: 15px;
    }
  }
}
#search_btn_box {
  margin-left: 5px;
  margin-top: 15px;
}

.dialos i,
.dialog_filess span {
  color: yellow;
}

#user {
  width: 100%;
  height: 627px;
  li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    // display: flex;
    display: inline-flex;
    .user_left {
      width: 80px;
      text-align: right;
      padding-right: 8px;
    }
    .user_right {
      flex: 1;
      padding-right: 12px;
      text-align: left;
      .el-input {
        .el-input__inner {
          width: 400px;
        }
      }
    }
  }
  i {
    color: #dd3535;
    line-height: 40px;
    margin-right: 3px;
  }
}

.add_user_btn {
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
}
.search_box {
  height: 40px;
  line-height: 40px;
  span {
    line-height: 40px;
  }
  input {
    height: 40px;
  }
  .selBtn {
    width: 66px;
    margin-left: 0px;
    height: 40px;
    margin-top: 0px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.oper_box {
  display: flex;
  div {
    flex: 1;
  }
}
.usercinfo{
    display: inline-block;
    width: 283px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.contentment #user li .user_right .el-input .el-input__inner {
  width: 400px;
}
</style>
<style lang="scss">
.selInp input{
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}
.contentment 
  .el-table td {
    height: 53px;
}
.contentment  .el-table .cell {
  line-height: 24px;
}
.contentment .search_box .el-input__inner,
.contentment #user .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}
</style>
