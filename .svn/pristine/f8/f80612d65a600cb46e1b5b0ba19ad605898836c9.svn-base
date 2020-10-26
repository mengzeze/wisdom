<template>
  <!--多选-->
  <div class="findallparents" id="deptuser">
    <div class="findalledptuser">
      <el-dialog
        :title=typeName
        :close-on-click-modal="false"
        :visible="findFlagShow"
        width="730px"
        @close="cancelBtn"
        class="find_box">
        <div class="clearfix find_cont">
          <div class="left_tree">
            <div style="line-height: 30px;text-align:left;margin-top:-10px;">选择人员</div>
            <div style="border:1px solid #ddd;padding:12px;">
              <el-input
                placeholder="输入关键字进行搜索"
                v-model="filterText"
                style="margin-bottom:4px;"
              ></el-input>
              <div style="height:336px"
                   v-loading.lock="isShowLoading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading">
                <el-scrollbar style="height:100%">
                  <div class="list-warper" v-show="!isSearchShow">
                    <div v-if="limitType">
                      <div>
                        <el-checkbox
                        style="font-weight:bold"
                        :value="checkAll"
                        :indeterminate="isIndeterminate"
                        @change="rolePermCheckAll">全选</el-checkbox>
                        {{getSelect}}
                      </div>
                      <div v-for="item in data" :key="item.id" class="flex a-center mb-3 limit">
                        <el-checkbox v-model="item['checked']" @change="checkChange(arguments,item)"></el-checkbox>
                        <span class="ml-5 flex a-center" @click="handleItemClick(item)">
                          <img class="user-img" :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                          <span class="ml-5 ellipsis1 ell-name limitWidth" :title="item.usName">{{item.usName}}</span>
                          <span  class="ml-5 ellipsis1 ell-name opt_name_others" :title="item.roleName">{{item.roleName}}</span>
                        </span>
                      </div>
                    </div>
                    <div v-else>
                      <div v-for="item in data" :key="item.id" class="flex a-center mb-3">
                        <el-checkbox v-model="item['checked']" @change="checkChange(arguments,item)"></el-checkbox>
                        <span class="ml-5 flex a-center" @click="handleItemClick(item)">
                          <img class="user-img" :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                          <span class="ml-5 ellipsis1 ell-name" :title="item.name">{{item.name}}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="list-warper" v-show="isSearchShow">
                    <p
                      v-if="borrowSearchFileList.length === 0"
                      class="borrowList_title"
                      style="text-align:center;"
                    >暂无数据</p>
                    <div v-else>
                      <div v-for="item in borrowSearchFileList" :key="item.id" class="flex a-center mb-3">
                        <el-checkbox v-model="item['checked']" @change="checkChange(arguments,item,'search')"></el-checkbox>
                        <span class="ml-5 flex a-center" @click="handleItemClick(item,'search')">
                          <img class="user-img" :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                          <span v-if="!limitType" class="ml-5 ellipsis1 ell-name" :title="item.name">{{item.name}}</span>
                          <span v-else class="ml-5 ellipsis1 ell-name" :title="item.usName">{{item.usName}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <div class="right_tree">
            <div
              style="line-height: 30px;box-sizing: border-box;text-align:left;margin-top:-10px;"
            >已选人员</div>
            <div style="border:1px solid #ddd;padding:12px;">
              <ul style="height:380px;">
                <el-scrollbar style="height:100%">
                  <div v-if="limitType">
                    <li v-for="(item, ind) in optionUser" class="user_list" :key="ind">
                    <span class="userImg-box">
                      <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                    </span>
                    <span class="opt_name_other" :title="item.usName">{{item.usName}}</span>
                    <span class="opt_name_others" :title="item.roleName">{{item.roleName}}</span>
                    <i @click="delect(item)" class="el-icon-delete fr" style="cursor:pointer;"></i>
                  </li>
                  </div>
                  <div v-else-if="!limitType">
                    <li v-for="(item, ind) in optionUser" class="user_list" :key="ind">
                    <span class="userImg-box">
                      <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                    </span>
                    <span v-if="!limitType" class="opt_name_other" :title="item.name">{{item.name}}</span>
                    <i @click="delect(item)" class="el-icon-delete fr" style="cursor:pointer;"></i>
                  </li>
                  </div>
                  <li v-show="!optionUser.length" class="pop_no_select_item_tips">暂无选中项</li>
                </el-scrollbar>
              </ul>
            </div>
          </div>
        </div>
        <div class="notes">
          {{limitTypeNotes}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="cancelBtn">取 消</el-button>
          <el-button size="medium" type="primary" @click="findFlagUserFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        optionUser: [], //已选人员
        filterText: "",
        // token: "",
        // userId: "",
        projectId: "",
        data: [],  //全部人员
        // voteprojId: "",
        requestCode: {}, //所有请求的状态码
        //inputsearch:'',
        isSearchShow: false, //是否搜索显示结果
        borrowSearchFileList: [], // 搜索结果
        isShowLoading: false, // 是否显示加载遮罩
        checkAll: false, //全选
        isIndeterminate: false,  //半选
      };
    },
    props: ["findState", "checkState",'findFlagShow','limitType','reportListType','displayPeople','reportPerson'],
    // props: {
    //   'findFlagShow':Boolean,
    //   'limitType' : Number,
    //   'reportListType': String,
    //   'displayPeople': Array,
    // },
    computed: {
      // 选择人员提示
      limitTypeNotes(){
        if(this.limitType == '2'){
          return '注：保荐代表人只可选择2人'
        }else if(this.limitType == '10'){
          return '注：项目负责人最多选择10人'
        }else if(this.limitType == '30'){
          return '注：项目组成员最多选择30人'
        }
      },
      getSelect(){
        return this.optionUser.length + '/' + this.data.length
      },
      typeName(){
        if (this.limitType) {
          return '选择项目人员'
        }else if (this.reportListType) {
          return '选择报送人员'
        }else{
          return '选择人员'
        }
      }

    },
    watch: {
      // 弹窗显示与隐藏
      findFlagShow (val) {
        console.log(val, this.findState)
        if (val) {
          this.data = []
          this.optionUser = []
          this.filterText = ''
          this.queryMember()
        }
      },
      // 查询条件检索
      filterText(val) {
        if(!val){
          this.isSearchShow = false
          this.borrowSearchFileList = []
          return
        }
        console.log('filterText', val)
        this.$utils.debounce(this.filterByName(val), 500)
      }
    },
    created() {
      // this.finsUserState = this.findState.state;
      // this.voteprojId = this.$store.state.voteprojId;
    },
    mounted() {
      // this.token = this.$store.state.loginObject.userToken;
      // this.userId = this.$store.state.loginObject.userId;
      this.requestCode = this.code.codeNum;
      this.projectId = this.$store.state.projectMsg.pro_id;
      // if (this.voteprojId !== "") {
      //   this.projectId = this.voteprojId;
      // } else {
      //   this.projectId = this.$store.state.projectMsg.pro_id;
      // }
    },
    methods: {
      // 查询列表的数据
      queryMember () {
        // 选择项目人员
        if(this.limitType){
          var obj = {
            data:{
              projectId:this.projectId
            }
          };
          var url = '/info/project/getMemberAndRole'
        }else{
          // 选择报送人员
          if (this.reportListType) {
            var url = '/doc/project/reportList'
            console.log(this.reportPerson)   
          }else{
            var url = "/sys/getOptionalMember";
          }
          var obj = {
            data:{}
          };          
        }
        this.isShowLoading = true;
        this.$post(url, obj).then(response => {
          this.isShowLoading = false;
          if(response && response.data){
            let arr = []
            // 选择报送人员
            if (this.reportListType) {
              this.data = response.data.users
            }else{
              response.data.forEach(v => {
              this.$set(v, "sex", 0);
              v.userId = v.userId ? v.userId : v.id;
              arr.push(v.userId)
            });
              this.data = response.data;
            }
            if (this.reportListType || this.limitType) {
              // 回显
              this.reDisplay()
           
            }
            this.updateRolePermList()
            // 查询相关的的图片的id
            this.getUserImg(arr, this.data)
            return
          }
          this.$message.error(response.msg)
        })
      },
      // 检索
      filterByName(val){
        if(this.limitType){
          this.borrowSearchFileList = this.data.filter(v=>v.usName.indexOf(val)>-1)
          this.isSearchShow = true
        }else{
          this.borrowSearchFileList = this.data.filter(v=>v.name.indexOf(val)>-1)
          this.isSearchShow = true
        }
      },
      // 人员全选
      rolePermCheckAll (val) {
        this.data.forEach(v => v.checked = val)
        this.updateRolePermList()
      },
      // 更新人员选择列表
      updateRolePermList () {
        setTimeout(() => {
          this.optionUser = this.data.filter(v => v.checked)
          this.allCheckStatus()
        })
      },
      // 回显
      reDisplay(){
        const optionUser = [];
        const dataSource = this.data.map(item => {
          if (this.reportListType) {
            if(this.reportPerson.includes(item.id)) {
              item.checked = true
              optionUser.push(item)
            }else {
              item.checked = false
            }
            return item;
          }else if (this.limitType) {
            if(this.displayPeople.includes(item.userId)) {
              item.checked = true
              optionUser.push(item)
            }else {
              item.checked = false
            }
            return item;
          }
        })    
        
        console.log(dataSource)
        this.optionUser = optionUser;
        this.data = JSON.parse(JSON.stringify(dataSource));
        // console.log('===', this.displayPeople, this.optionUser, this.data);
      },
      // 全选按钮半选状态更新
      allCheckStatus () {
        this.checkAll = this.optionUser.length === this.data.length;          
        this.isIndeterminate = this.optionUser.length > 0 && this.optionUser.length < this.data.length;
      },
      // 确定
      findFlagUserFn() {
        if (this.limitType == '2') {
          if (this.optionUser.length > 2 || this.optionUser.length == 1) {
            return this.$message.error('保荐代表人只可选择2人');         
          }else if (this.optionUser.length == 0) {
            return this.$message.error('保荐代表人不能为空');
          }
        }else if (this.limitType == '10') {
          if (this.optionUser.length > 10) {
            return this.$message.error('项目负责人最多可选择10人');         
          }else if (this.optionUser.length == 0) {
            return this.$message.error('项目负责人不能为空');
          }
        }else if (this.limitType == '30') {
          if (this.optionUser.length > 30) {
            return this.$message.error('项目组成员最多可选择30人');         
          }else if (this.optionUser.length == 0) {
            return this.$message.error('项目组成员不能为空');
          }
        }
        this.$emit('findAllUser', this.optionUser);
      },
      //取消
      cancelBtn() {
        this.$emit('update:findFlagShow', false);
      },
      // checkbox选择
      checkChange(arg, item){
        let checked = Array.from(arg)[0]
        checked
          ? this.optionUser.push(item)
          : this.optionUser = this.optionUser.filter(v=>v.id!==item.id)
        this.allCheckStatus()
      },
      // 列表人员选择
      handleItemClick(item){        
        if (item.checked) {
          this.delect(item)
        }else{
          this.optionUser.findIndex(v=>v.id===item.id)<0 && this.optionUser.push(item)
          item.checked = true
          this.updateRolePermList()
        }      
      },
      // 删除
      delect(item) {
        this.optionUser=this.optionUser.filter(v=>v.id!==item.id)
        // 取消选中
        let obj=this.data.find(v=>v.id===item.id)
        obj.checked =  false
        this.updateRolePermList()
      },
      // 获取图片的路径
      getImgUrl(item){
        return this.$utils.getDownloadUrl(item.userImg)
      },
      // 默认的抄送人有头像的需要获取头像的值
      getUserImg (list, setData) {
        let dataObj = {
          "data":{
              "idSet":list
          }
        }
        this.$post("/sys/queryuserImg",dataObj).then(res =>{
          if (res.data) {
            let data = res.data
            setData.forEach(v => {
              if (v.userId) {
                this.$set(v, 'userImg', data[v.userId])
              }
            })
          }
        })
      }
    }
  };
</script>
<style lang="scss"  scoped>
  .findallparents .findalledptuser .el-dialog {
    .find_cont {
      .left_tree {
        float: left;
        width: 49%;
        //   border-right: 1px solid #ddd;
        box-sizing: border-box;
        padding-right: 10px;
        //   border:1px solid #ddd;
        .borrowList_item {
          display: flex;
          justify-content: flex-start;
          text-align: left;
          padding-left: 10px;
          font-size: 14px;
          line-height: 35px;
          align-items: center;
        }
        .borrowList_title {
          text-align: center;
        }
        .borrowList_item:hover {
          background-color: #f5f7fa;
        }
        .userImg-box{
          margin: 0 10px;
        }
      }
      .right_tree {
        float: right;
        width: 49%;
        //   border:1px solid #ddd;
      }
    }
    .custom-tree-node-span {
      display: flex;
      align-items: center;
    }
    .elipet {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
    .userImg-box{
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 7px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .user-img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .list-warper {
    overflow-x: hidden;
  }
  .ell-name{
    display: inline-block;
    max-width: 230px;
  }
  .mb-3{
    margin-bottom: 3px;
    margin-top: 4px;
  }
  .notes{
    margin-top: 10px;
    color: red;
    font-size: 14px;
    line-height: 20px;
  }
  .limitWidth{
    margin: 12px 0;
    width: 100px;
  }
</style>
<style>
  #deptuser .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .findallparents .findalledptuser .find_cont .el-tree-node__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .findallparents .findalledptuser .opt_name {
    /* padding-left: 10px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
    display: inline-block;
    text-align: left;
  }
  .findallparents .findalledptuser .opt_name_other {
    /* padding-left: 10px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90px;
    display: inline-block;
    text-align: left;
  }
  .findallparents .findalledptuser .opt_name_others {
    /* padding-left: 10px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
    display: inline-block;
    text-align: left;
  }
  .findallparents .findalledptuser .user_list {
    line-height: 30px;
    height: 32px;
    padding-bottom: 4px;
    text-align: left;
    margin-right: 2%;
  }
  .findallparents .findalledptuser .user_list .fr {
    position: relative;
    top: 8px;
    right: 10px;
  }
  .findallparents .findalledptuser .el-dialog__header {
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }

  .findallparents .findalledptuser .el-dialog__footer {
    margin-top: -13px;
  }
  .findallparents .findalledptuser .el-dialog__body {
    margin-top: 0px;
  }
  .findallparents .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 25px;
    padding: 5px 0 5px 36px;
    margin-bottom: 1px;
  }
</style>

