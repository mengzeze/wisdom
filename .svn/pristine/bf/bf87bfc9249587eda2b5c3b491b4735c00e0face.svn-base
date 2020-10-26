<template>
        <div class="newproject" id="chosezhongjie">
            <el-dialog
                :close-on-click-modal="false"
                :title="titleNameTit"
                :visible.sync="choseProject"
                @close="choseProjectBtn"
                width="60%">
                <span>
                    <div class="chose_types clearfix">
                        <div class="fl choseLeft">
                            <h4>{{titleName}}</h4>
                            <div style="border:1px solid #ddd;padding:10px;">
                                <el-input v-model="filterText" @keyup.enter.native="searchUser()" placeholder="输入关键字进行搜索" class="choseInput" clearable>
                                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                                </el-input>
                                <div style="height:330px;">
                                    <el-scrollbar style="height:100%">
                                        <el-tree
                                          v-show="isSearchShow"
                                          :data="finanObj"
                                            :props="defaultProps"
                                            :filter-node-method="filterNode"
                                            ref="tree2"
                                            show-checkbox
                                            :expand-on-click-node="false"
                                            :default-expanded-keys="dataId"
                                            node-key="uniqueKey"
                                            @check="handleCheck"
                                        >
                                         <span class="custom-tree-node" slot-scope="{ node, data }">
                                             <span  v-if="data.mebsize || data.mebsize === 0" class="custom-tree-node-span">
                                               <span class="elipet" :title="node.label + '(' + data.mebsize + ')'">
                                                  <span>{{ node.label}}({{data.mebsize}})</span>
                                              </span>
                                            </span>
                                            <span  v-else class="custom-tree-node-span">
                                                <span class="userImg-box">
                                                <img :src="data.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(data)">
                                                </span>
                                              <span class="elipet">
                                                 <span class="elipet" :title="node.label">
                                                  <span>{{ node.label}}</span>
                                                </span>
                                              </span>
                                            </span>
                                         </span>
                                        </el-tree>
                                      <div v-show="!isSearchShow" class="borrowList">
                                        <p
                                          v-if="borrowSearchFileList.length === 0"
                                          class="borrowList_title"
                                          style="text-align:center;"
                                        >暂无数据</p>
                                          <!--@click="handleNodeClick(item)"-->
                                        <p
                                          v-for="(item,idx) in borrowSearchFileList"
                                          :key="idx"
                                          class="borrowList_item"
                                          v-else>
                                          <span><el-checkbox v-model="item.checked" @change="checkChange(item)" class="chooseA"></el-checkbox></span>
                                          <span class="borrowList_item_fileIcon userImg-box">
                                            <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                                          </span>
                                          <span class="borrowList_item_title">{{item.name}}</span>
                                        </p>
                                      </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                        <div class="fr choseRight">
                            <h4>{{selectedTitle}}</h4>
                            <div style="height:380px;border:1px solid #ddd;padding:12px;">
                                <el-scrollbar style="height:100%;">
                                    <p class="clearfix" v-for="(item,index) in optArr" style="line-height: 40px;" :key="index">
                                        <span class="fl opted_type" :title="item.label">
                                          <span class="userImg-box">
                                            <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                                          </span>
                                          <span class="content ellipsis1">{{item.label}}</span>
                                          </span>
                                        <!--<span class="fl opted_type" v-if="stateFin == 1" :title="item.labelType">{{item.labelType}}</span>-->
                                        <span class="fl">
                                            <el-select v-model="valueObj[index].value" placeholder="请选择内容" style="width:150px;margin-left:12px;" @change="roleOption(index,valueObj[index].value)">
                                            <el-option
                                                v-for="obj in typeObj"
                                                :key="obj.value"
                                                :label="obj.label"
                                                :value="obj.value">
                                            </el-option>
                                        </el-select>
                                        </span>
                                        <i class="el-icon-delete fr" style="cursor: pointer;position: relative;top:10px;"  @click="deleteOpt(item)"></i>
                                    </p>
                                    <h3 v-if="null_flag" class="pop_no_select_item_tips">暂无选中项</h3>
                                </el-scrollbar>
                            </div>

                        </div>

                    </div>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="choseProjectBtn">取 消</el-button>
                    <el-button type="primary" @click="sureType">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</template>

<script>
export default {
    data (){
        return {
            // 选择中介机构
            titleName:'中介机构',
            titleNameTit:'选择中介机构',
          selectedTitle:'已选机构',
            choseProject:true,
            filterText:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            null_flag: true,
            value: '',
            optArr:[],
            typeObj:[{
                value: '1056',
                label: '会计师事务所'
            }, {
                value: '1057',
                label: '律师事务所'
            }, {
                value: '1058',
                label: '资产评估机构'
            }, {
                value: '1059',
                label: '信用评级机构'
            }, {
                value: '1060',
                label: '券商机构'
            }],
            valueObj:[],
            roleOpt:[],
            dataId: [],
            multeData: [],
          isSearchShow: true,
          borrowSearchFileList: [],
          requestCode: {} //所有请求的状态码
        }
    },
    props:['finanObj',"stateFin","roleSelect","selectAgenOrMem","teamMemSelecRoleList"],
    created () {
      // if (this.stateFin === 2) {
        this.initDisableStatus(this.finanObj)

      // }
    },
    computed: {
      searchSite() {
        return this.filterText;
      }
    },
    watch:{
        finanObj: function(newV, oldV) {
            this.choseProject=true;
            this.initDisableStatus(newV)
            this.data = newV;
            this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
            this.valueObj = this.$utils.cloneDeepArray(this.teamMemSelecRoleList);
          console.log(this.valueObj, 'this.valueObj', this.teamMemSelecRoleList)
          this.findFlagBox(this.selectAgenOrMem)
        },
        stateFin: function(newV, oldV) {
                this.choseProject=true;
                this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
                // this.optArr = [];
                this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
                this.valueObj = this.$utils.cloneDeepArray(this.teamMemSelecRoleList);
          console.log(this.valueObj, 'this.valueObj', this.teamMemSelecRoleList)
          this.titleNameTit = "选择团队成员";
                this.titleName = "团队成员"
          this.selectedTitle = '已选成员'
        },
        filterText(val) {
            // this.$refs.tree2.filter(val);
        },
        optArr:function(newV,oldV){
            if(newV.length == 0){
                this.null_flag = true;
            }else{
                this.null_flag = false;
            }
        },
        roleSelect:function(newV){
            this.typeObj = newV;
        },
      searchSite(newValue, oldValue) {
        if (newValue == "" || newValue == undefined || newValue == null) {
          this.isSearchShow = true;
          this.initDisableStatus(this.finanObj)
        }
      }
    },
    mounted(){
      this.requestCode = this.code.codeNum;
      this.choseProject=true;
        this.optArr = this.$utils.cloneDeepArray(this.selectAgenOrMem);
        this.titleNameTit = "选择团队成员";
        this.titleName = "团队成员"
      this.selectedTitle='已选成员'
    },
    methods:{
      searchUser () {
        console.log("查询", this.filterText)
        this.isSearchShow = false
        var typeObj = {
          token: this.token,
          userId: this.userId,
          data: {
            name: this.filterText
          }
        };
        this.$post("/sys/searchUser", typeObj)
          .then(res => {
            if (this.requestCode.SUCCESS == res.code) {
              for (var value in res.data) {
                var name = res.data[value].name;
                res.data[value].label = name;
                res.data[value].checked = false
                //delete res.data[value].name;
              }
              this.borrowSearchFileList = res.data
              console.log('s', this.borrowSearchFileList, this.optArr)
              //  查询右侧是否有选中的值
              if (this.optArr.length && !this.isSearchShow) {
                this.borrowSearchFileList.forEach(val=>{
                  val.uniqueKey = 'user'+val.id
                  this.optArr.findIndex(m=>val.userId===m.userId)>-1
                    ? this.$set(val, 'checked', true)
                    : this.$set(val, 'checked', false)

                })

                // this.borrowSearchFileList.forEach(val => {
                //   this.optArr.forEach(v => {
                //     v.userId === val.userId ? this.$set(val, 'checked', true) : this.$set(val, 'checked', false)
                //     // if (v.userId === val.userId) {
                //     //   this.$set(val, 'checked', true)
                //     // }
                //   })
                // })
              }
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      checkChange (data, node, self) {
        console.log(data, 5666, this.optArr, this.isSearchShow)
        if (data) {
          if (!this.isSearchShow) {
            if (this.optArr.length) {
              this.optArr.forEach(v => {
                if (v.userId === data.userId) {
                  this.$set(data, 'checked', true)
                  this.$set(data, 'disabled', true)
                }
              })
            }
            if (data.disabled) {
              this.$set(data, 'checked', true)
              return
            }
            this.$set(data, 'checked', true)
            this.$set(data, 'disabled', true)
            var obj = {
              value:"",
              name:"",
            };
            this.valueObj.push(obj);
            this.optArr.push(data)
          }
        }
      },
        // stateFin === 2 -团员信息
        initDisableStatus(list) {
            list.forEach((m, index) =>{
                (m.mebsize === 0 || m.mebsize) ?  this.$set(m, 'disabled', true) : this.$set(m, 'disabled', false)
                if (m.fields) {
                  // m.uniqueKey = m.fields.data.uniqueKey
                  this.dataId.push(m.uniqueKey)
                }
                if(m.lists && m.lists.length){
                    m.lists.forEach(v =>{
                        this.$set(v, 'disabled', false)
                      if (this.optArr.length > 0) {
                        this.optArr.forEach(o => {
                          if (o.name === v.name) {
                            this.$set(v, 'disabled', true)
                            this.$set(o, 'disabled', true)
                            this.$set(o, 'uniqueKey', v.uniqueKey)
                          }
                        })
                      }
                    })
                }
                if(m.children && m.children.length){
                    m.children.forEach((v, i) =>{
                      this.$set(v, 'disabled', false)
                      if (v.fields && v.fields.data) {
                        // v.uniqueKey = v.fields.data.uniqueKey
                      }
                    })
                    this.initDisableStatus(m.children)
                }
            })
          if (this.optArr.length > 0) {
            let arr = []
            this.optArr.forEach(v => {
              arr.push(v.uniqueKey)
            })
            this.$refs.tree2.setCheckedKeys(arr)
          }
        },
        filterNode(value,data){
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // handleNodeClick(data){
        //     if(data.sex != 1 && data.sex != 0){
        //         return
        //     }
        //     var num = 0;
        //     for(var i=0;i<this.optArr.length;i++){
        //         if(data.name == this.optArr[i].name && data.userId == this.optArr[i].userId){
        //             num = 1;
        //         }
        //     }
        //     if(num == 0){
        //         this.optArr.push(data);
        //         var obj = {
        //             value:"",
        //             name:"",
        //         };
        //         this.valueObj.push(obj);
        //     }
        // },
        setDataValue (data) {
            if(data.sex != 1 && data.sex != 0){
                return
            }
            var num = 0;
            for(var i=0;i<this.optArr.length;i++){
                if(data.name == this.optArr[i].name && data.userId == this.optArr[i].userId){
                    num = 1;
                }
            }
            if(num == 0){
                this.optArr.push(data);
                var obj = {
                    value:"",
                    name:"",
                };
                this.valueObj.push(obj);
            }
        },
        findFlagBox (val) {
        console.log('findFlagBox', val)
          if (val.length) {
            // 默认上一个选中的值
            let arr = []
            let array = []
            val.forEach(v => {
              v.uniqueKey = 'user' + v.userId
              arr.push(v.uniqueKey)
              array.push(v)
            })
            this.arrKeys = arr
            this.multeData = val // 将字节点放在一个数组中-便于后期删除
            console.log(this.arrKeys, this.multeData)
            this.$refs.tree2.setCheckedKeys(arr)
            return
          }
          this.arrKeys = []
          this.$refs.tree2.setCheckedKeys(this.arrKeys)
        },
        handleCheck (currentObj, treeStatus) {
          let arr = []
          this.optArr.forEach(v => {
            if (v.uniqueKey === currentObj.uniqueKey) {
              arr.push(currentObj)
            }
          })
          if (arr.length) return
          let selected = treeStatus.checkedKeys.indexOf(currentObj.uniqueKey)
          this.selectedata = this.$refs.tree2.getCheckedNodes() // 选中的所有节点
          if (selected !== -1) {
              this.multeData.push(currentObj) // 将字节点放在一个数组中-便于后期删除
              currentObj.disabled = true // 选中的禁用
              this.setDataValue(currentObj)
              this.$forceUpdate()
          }
        },
        sureType(){
          var num = 0;
          for(var i=0;i<this.valueObj.length;i++){
              if(this.valueObj[i].value == ""){
                  this.$message.error("关联角色不能为空！");
                  num = 1;
              }
          }
          if(num == 0){
              for(var i=0;i<this.valueObj.length;i++){
                  for(var j=0;j<this.typeObj.length;j++){
                      if(this.valueObj[i].value == this.typeObj[j].value){
                          this.valueObj[i].name = this.typeObj[j].label;
                      }
                  }
              }
              var arrAry = [];
              for(var i=0;i<this.optArr.length;i++){
                  var obj = {};
                  obj.name = this.valueObj[i].name;
                  obj.value = this.optArr[i].name;
                  arrAry.push(obj);
              }
              this.$emit('finanProjects',this.$utils.cloneDeepArray(this.optArr),this.$utils.cloneDeepArray(this.valueObj),this.$utils.cloneDeepArray(arrAry));
              this.choseProject=false;
              this.filterText = '';
          }
        },
        choseProjectBtn(){
        // console.log(this.$utils.cloneDeepArray(this.optArr), this.$utils.cloneDeepArray(this.valueObj), this.borrowSearchFileList)
          this.borrowSearchFileList.forEach(v => {
            this.optArr.forEach(val => {
              if (val.userId === v.userId) {
                this.$set(v, 'checked', false)
              }
            })
          })
            this.choseProject = false;
            this.filterText = '';
        },
        deleteOpt(item){
        console.log('item',item, this.optArr)
          var num = 0;
          num = this.optArr.findIndex(v=>v.id===item.id)
          this.optArr.splice(num,1);
          this.valueObj.splice(num,1);
          let array = {}
          array = this.multeData[num]
          this.multeData.splice(num, 1)
          let arrId = []
          this.multeData.forEach(v => {
            arrId.push(v.uniqueKey)
          })
          if(!this.isSearchShow){ // 如果是搜索结果列表
            this.borrowSearchFileList.find(v=>v.id===item.id).checked= false
            return
          }
            // for (var i = 0; i < this.optArr.length; i++) {
            //     if (item.uniqueKey == this.optArr[i].uniqueKey) {
            //         num = i;
            //     }
            // }



            // 删除重新设置节点及展开取消禁用
            this.$refs.tree2.setCheckedKeys(arrId)
            // 检查选中的节点中是都有父节点
            this.selectedata.forEach(v => {
                (v.mebsize === 0 || v.mebsize) ?  this.$set(v, 'disabled', true) : this.$set(v, 'disabled', false)
            })
            this.$refs.tree2.store.nodesMap[item.uniqueKey].expanded = true

console.log(this.selectedata)
        },
        roleOption(ind,val){
            for(var i=0;i<this.typeObj.length;i++){
                if(val == this.typeObj[i].name){
                    this.roleOpt.push(this.typeObj[i]);
                }
            }
        },
        getImgUrl(item){
            return this.$utils.getDownloadUrl(item.userImg)
        }
    }
}
</script>

<style>
#chosezhongjie .chose_types .choseLeft{
    width: 49%;
    padding-right: 10px;
}
#chosezhongjie .el-dialog__header{
    border-bottom: 1px solid #ddd;
}
#chosezhongjie .el-dialog__footer{
    padding-top:0px;
    margin-top:-10px;
}
#chosezhongjie .chose_types .choseLeft h4,
#chosezhongjie .chose_types .choseRight h4{
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    text-align: left;
}

#chosezhongjie .chose_types .choseLeft .choseInput{
    margin-bottom: 10px;
}
#chosezhongjie .chose_types .choseRight{
    width: 48%;
}
#chosezhongjie .chose_types .choseRight p{
    margin-bottom: 5px;
    margin-right: 16px;
    text-align: left;
}

#chosezhongjie .chose_types .choseRight span:nth-child(2) .names{
    margin-left: 20px;

   }
#chosezhongjie .chose_types .choseRight .el-select{
    width: 80%;
}
#chosezhongjie .opted_type{
        display: inline-block;
        width:160px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        display: flex;
        justify-content: flex-start;
    }
#chosezhongjie .opted_type .content {
    width: 120px;
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
  }
.userImg-box img{
      width: 100%;
      height: 100%;
    }
#chosezhongjie .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 25px;
  padding: 5px 0 5px 36px;
  margin-bottom: 1px;
}
#chosezhongjie .borrowList_item {
  display: flex;
  justify-content: flex-start;
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
  line-height: 35px;
  align-items: center;
}
#chosezhongjie .borrowList_title {
  text-align: center;
}
#chosezhongjie .borrowList_item:hover {
  background-color: #f5f7fa;
}
#chosezhongjie .userImg-box{
  margin: 0 10px;
}
</style>
