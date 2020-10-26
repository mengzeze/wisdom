<template>
  <div class="findallparents">
    <div class="findalledptuser">
      <el-dialog title="选择人员" :close-on-click-modal="false" :visible.sync="findFlag_boxchose" width="730px" class="find_box">
        <p class="title-note">勾选后以下人员必须将日程抄送给我</p>
        <div class="clearfix find_cont">

          <div class="left_tree">
            <div style="line-height: 30px;text-align:left;margin-top:-10px;">选择人员</div>
            <div style="border:1px solid #ddd;padding:12px;">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText" v-if="filtertextshow" style="margin-bottom:4px;"></el-input>
              <el-input placeholder="输入关键字进行搜索" @keyup.enter.native="searchUser()" v-model.trim="myUaData.inputsearch" v-if="inputseachshow" clearable style="margin-bottom:4px;">
                <el-button slot="append" icon="el-icon-search" @click="searchuser"></el-button>
              </el-input>
              <div style="height:336px">
                <el-scrollbar style="height:100%">
                  <el-tree
                    :show-checkbox ="true"
                    class="filter-tree"
                    :data="data"
                    :props="defaultProps"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree2"
                    node-key="id"
                    @check-change="handleNodeClick"
                    v-if="isSearchShow"
                  ></el-tree>
                  <div v-else class="borrowList">
                    <p v-if="borrowSearchFileList.length === 0" class="borrowList_title"  style="text-align:center;">暂无数据</p>
                    <p v-for="(item,idx) in borrowSearchFileList" :key="idx" class="borrowList_item" @click="handleClickSearch(item)" v-else>
                      <span class="borrowList_item_fileIcon"></span>
                      <span class="borrowList_item_title">{{item.name}}</span>
                    </p>

                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
          <div class="right_tree">
            <div style="line-height: 30px;box-sizing: border-box;text-align:left;margin-top:-10px;">已选人员</div>
            <div style="border:1px solid #ddd;padding:12px;">


              <ul style="height:380px;">
                <el-scrollbar style="height:100%">
                  <li v-for="item in optionUser" class="user_list">
                    <span class="opt_name" v-if="chartA">{{item.label}}</span>
                    <span class="opt_name" v-if="chartB">{{item.name}}</span>
                    <i @click="delect(item)" class="el-icon-delete fr" style="cursor:pointer;"></i>
                  </li>
                  <li v-if="!optionUser.length" class="pop_no_select_item_tips">暂无选中项</li>
                </el-scrollbar>
              </ul>
            </div>
          </div>
        </div>
        <span slot="footer" class="dept-footer">
      <div class="all-box">
        <el-checkbox v-model="all" @change="toggleSelectAll">全选</el-checkbox>
        <p class="note-text">注：全选后新加入部门的人员自动抄送</p>
      </div>

      <div>
        <el-button size="medium" @click="findFlag_boxchose = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="findFlagUserFn">确 定</el-button>
      </div>

    </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        setedId: [],
        all: false,
        deptId: '',
        findFlag_boxchose: true,
        optionUser: [],
        filterText: "",
        defaultProps: {
          children: "children",
          label: "name"
        },
        token: "",
        userId: "",
        projectId: "",
        data: [],
        null_opt: true,
        finsUserState: 0,
        checkedRadio: "",
        voteprojId: "",
        chartA:true,  //全员组织架构
        chartB:false, //项目组成员
        requestCode: {}, //所有请求的状态码
        filtertextshow:false,
        inputseachshow:true, //全员组织架构的搜索
        //inputsearch:'',
        isSearchShow: true, //是否搜索显示结果
        borrowSearchFileList:[],
        myUaData:{
          inputsearch:''
        },
        deployObjchose:'',
        //showCheckbox:true
      };
    },
    props: ["chosefindState", "chosecheckState", 'seted'],
    computed:{
      searchSite() {
        return this.myUaData.inputsearch;
      }
    },
    watch: {
      setedId: {
        handler (val, oldVal) {
          console.log('setedId', val)
        },
        deep: true
      },
      filterText(val) {
        //console.log(val)
        this.$refs.tree2.filter(val);
      },
      chosefindState: function(newV, oldV) {
        //区分引用来源
        this.finsUserState = newV.state;
        this.findFlag_boxchose = true;
        // this.optionUser = [];
      },
      chosecheckState: function(newV, oldV) {
        //console.log(newV);
        this.checkedRadio = newV;
      },
      searchSite(newValue, oldValue) {

        if (newValue == "" || newValue == undefined ||newValue == null) {
          this.isSearchShow = true;
          this.alloraginzPerson();
        }
      },
      findFlag_boxchose(val){
        if(!val) return
        // console.log('tanchuang dakai', val, this.setedId)
        this.filterText = ""
        this.finsUserState = 0
        this.checkedRadio = ""
        this.voteprojId = ""
        this.chartA = true  //全员组织架构
        this.chartB = false //项目组成员
        this.filtertextshow=false
        this.inputseachshow=true //全员组织架构的搜索
        //inputsearch:'',
        this.isSearchShow= true //是否搜索显示结果
        this.borrowSearchFileList=[]
        this.myUaData={
          inputsearch:''
        }
        this.deployObjchose=''
        setTimeout(()=>{
          // this.$refs.tree2 && this.$refs.tree2.setCheckedKeys(this.setedId)
          // console.log('open', this.all, this.deptId)
          this.all
            ? this.$refs.tree2.setCheckedKeys([this.deptId])
            : this.$refs.tree2.setCheckedKeys(this.seted)
        },500)
      }
    },
    created() {
      this.finsUserState = this.chosefindState.state;
      this.voteprojId = this.$store.state.voteprojId;

      // var lett = this;
      // document.onkeydown = function(e) {
      //   var key = window.event.keyCode;
      //   if (key == 13) {
      //     lett.searchuser();
      //   }
      // }
      //console.log(this.finsUserState)
      //this.getTree()
      console.log('tanchuang created')
    },
    mounted() {
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.requestCode = this.code.codeNum;
      if (this.voteprojId !== "") {
        this.projectId = this.voteprojId;
      } else {
        this.projectId = this.$store.state.projectMsg.pro_id;
      }

      this.alloraginzPerson();
    },
    methods: {
      toggleSelectAll(val){
        val ? this.$refs.tree2.setCheckedKeys([this.deptId]): this.$refs.tree2.setCheckedKeys([])
      },
      aaa(val){
        console.log(val)
        //   console.log(val)
        //   alert(333)
        //   //this.showCheckbox = true;
        //   this.optionUser = []
      },
      alloraginzPerson(){
        this.optionUser = [];
        let url = "";
        let obj = {};
        if (this.finsUserState == 0) {
          //console.log(this.finsUserStat)
          //全局组织架构人员
          obj = {
            token: this.token,
            userId: this.userId,
            data: {}
          };
          url = "/sys/schedule/getUserByDept";
        } else if (this.finsUserState == 1) {
          //console.log(this.finsUserStat)
          //所有用户(排除已加入部门的人)
          obj = {
            token: this.token,
            userId: this.userId
          };
          url = "/sys/getOptionalMember";
        } else if (this.finsUserState == 2) {
          //console.log(this.finsUserStat)
          //项目组成员
          obj = {
            token: this.token,
            userId: this.userId,
            data: {
              projectId: this.projectId
            }
          };
          url = "/info/project/getMemberAll";
        }
        var that = this;
        this.$post(url, obj).then(response => {

          if (response.code == that.code.codeNum.SUCCESS) {
            let data = response.data
            this.all = response.data[0].chekedAll
            if(!data || !data.length) return
            if (this.finsUserState == 0) {
              // console.log(data)
              that.defaultProps.label = "name"
              that.updateTree(data[0])
              //console.log(that.updateTree(data))
              that.chartA = true;
              that.chartB= false;
              that.inputseachshow = true;
              that.filtertextshow = false;
              that.data = data;
              that.deptId = data[0].id

            } else if (this.finsUserState == 1) {
              for (var i = 0; i < data.length; i++) {
                that.$set(data[i], 'sex', 0)
                data[i].userId = data[i].id;
              }
              that.chartA = false;
              that.chartB= true;
              that.filtertextshow = true;
              that.inputseachshow = false;
              that.data = data;
            } else if (this.finsUserState == 2) {
              for (var i = 0; i < data.length; i++) {
                that.$set(data[i], 'sex', 0)
                //console.log(data)
                data[i].name = data[i].usName;
              }
              that.chartA = false;
              that.chartB= true;
              that.filtertextshow = true;
              that.inputseachshow = false;
              that.data = data;
              //console.log(data);
            }

            // 首次回显
            // console.log('sted', this.seted)
            // console.log('all', this.all, this.deptId)
            setTimeout(()=>{
              this.all
                ? this.$refs.tree2.setCheckedKeys([this.deptId])
                : this.$refs.tree2.setCheckedKeys(this.seted)
            },500)

          } else {
            this.$message.error(response.msg);
          }
        })
          .catch(error => {
            console.log(error);
          });
      },
      //递归就是在方法里调用这个方法本身
      updateTree (node) {
        var list = node.userList;
        //如果 children 为空，初始化为空数组
        if (!node.children) {
          node.children = [];
        }
        var children = node.children;
        //如果 lists 不为空，将 lists 中的元素添加到 children 中
        if (list && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            children.push(list[i]);
          }
        }
        //如果 children 有下级节点，递归
        if (children.length > 0) {
          for (var i = 0; i < children.length; i++) {
            //console.log(children[i])
            this.updateTree(children[i]);
          }
        }
      },

      //全局组织架构的搜索
      searchuser(){
        this.isSearchShow = false;
        var typeObj = {
          token: this.token,
          userId: this.userId,
          data: {
            name:this.myUaData.inputsearch,
            deptId:this.deptId
          }
        };
        this.$post('/sys/schedule/queryUserByCopy',typeObj)
          .then((res) => {
            if(this.requestCode.SUCCESS == res.code) {
              //console.log(res.data)
              for(var value in res.data){
                var name = res.data[value].name;
                res.data[value].label = name;
                //delete res.data[value].name;
              }
              //console.log(res.data)
              this.borrowSearchFileList = res.data
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      //确定
      findFlagUserFn() {
        var arr = [];
        if(this.all){
          arr.push({
            userId:this.userId,
            deptId:this.deptId,
            type: 1 // 全选
          })
        } else {
          for(var i=0;i<this.optionUser.length;i++){
            var a = {
              userId:this.userId,
              copierId:this.optionUser[i].id,
              type: 0 // 非全选
            }
            arr.push(a);
          }
        }
        var data = {
          token: this.token,
          userId: this.userId,
          data: arr

        };
        this.$post("/sys/schedule/addScheduleUser", data)
          .then((response)=> {
            // console.log(response)
            if (response.code == 0) {
              this.setedId = this.all ? [this.deptId] : arr.map(v=> v.copierId)
              console.log('seted',this.setedId)
              this.$emit('update-seted', this.optionUser)
            } else {
              this.$message({
                type: "error",
                message: response.msg
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        this.findFlag_boxchose = false;
      },
      //查询
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleClickSearch(data){
        var num = 0;
        for (var i = 0; i < this.optionUser.length; i++) {
          //console.log(this.optionUser[0].label)
          if (data.id == this.optionUser[i].id) {
            num = 1;
          }
        }

        if (num == 0) {
          if (this.chosecheckState.state == 1) {
            //单选
            this.optionUser = [];
            this.optionUser.push(data);
          } else if (this.chosecheckState.state == 2) {
            //多选
            // console.log(data)

            this.optionUser.push(data);
            // console.log(this.optionUser)
          }
        }
      },
      //    tree点击
      handleNodeClick(data,val,is) {
        //console.log(data[0].length)
        //console.log(data)
        //console.log(data.sex)
        // console.log('change', data, val, is)

        if(data.sex != 1 && data.sex != 0){
          return
        }else{
          var num = 0;
          for (var i = 0; i < this.optionUser.length; i++) {
            //console.log(this.optionUser[0].label)
            if (data.id == this.optionUser[i].id) {
              num = 1;
            }
          }
        }

        if (num == 0) {
          if (this.chosecheckState.state == 1) {
            //单选
            this.optionUser = [];
            this.optionUser.push(data);
          } else if (this.chosecheckState.state == 2) {
            //多选
            // console.log(data)

            this.optionUser.push(data);
            // console.log(this.optionUser)
          }
        }

        if(val == false){
          for(var i =0; i<this.optionUser.length;i++){
            if(this.optionUser[i].id == data.id){
              this.optionUser.splice(i,1)
            }
          }
          // console.log(this.optionUser)
        }
        // console.log(this.optionUser)
      },
      // searchNodeClick(data){
      //      if(data.sex != 1 && data.sex != 0){
      //        return
      //     }else{
      //         var num = 0;
      //         for (var i = 0; i < this.optionUser.length; i++) {
      //             console.log(this.optionUser[0].name)
      //             if (data.id == this.optionUser[i].id) {
      //                 num = 1;
      //             }
      //         }
      //     }

      //   if (num == 0) {
      //     if (this.checkState.state == 1) {
      //       //单选
      //       this.optionUser = [];
      //       this.optionUser.push(data);
      //     } else if (this.checkState.state == 2) {
      //       //多选
      //       this.optionUser.push(data);
      //     }
      //   }
      // },
      //    删除
      delect(item) {
        var num = 0;
        for (var i = 0; i < this.optionUser.length; i++) {
          if (item.id == this.optionUser[i].id) {
            num = i;
          }
        }
        this.optionUser.splice(num, 1);
        this.$refs.tree2.setChecked(item.id,false)
        this.all = false
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
        .borrowList_item{
          text-align: left;
          margin-left: 10px;
          font-size: 16px;
          line-height: 30px;
        }
        .borrowList_title{
          text-align: center
        }
        .borrowList_item:hover{
          background-color:#f5f7fa
        }
      }
      .right_tree {
        float: right;
        width: 49%;
        //   border:1px solid #ddd;
      }
    }
  }
</style>
<style>
  .findallparents .findalledptuser .find_cont .el-tree-node__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .findallparents .findalledptuser .opt_name {
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
    display: inline-block;
    text-align: left;
  }
  .findallparents .findalledptuser .user_list {
    line-height: 30px;
    text-align: left;


  }
  .findallparents .findalledptuser .user_list .fr {
    position: relative;
    top: 8px;
    right: 10px;
  }
  .findallparents .findalledptuser .el-dialog__header{
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }

  .findallparents .findalledptuser .el-dialog__footer{
    margin-top: -13px;;
  }
  .findallparents .findalledptuser .el-dialog__body{
    margin-top: 0px;
  }
  .dept-footer{
    display: flex;
    justify-content: space-between;
  }
  .all-box{
    text-align: left;
  }
  .note-text {
    color: #606266;
  }
  .title-note{
    text-align: left;
    padding-bottom: 10px;
  }
</style>
