<template>
  <!--多选-->
  <div class="findall-parent">
      <el-dialog title="选择人员" :close-on-click-modal="false" :visible="findFlagShowputong" width="963px" @close="cancelBtn" class="find_box">
        <div class="clearfix find_cont">
          <!-- 左侧的tabs -->
          <div class="left_tree">
            <div class="left-title">选择人员</div>
            <div class="left-box">
               <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="组织架构" name="first"></el-tab-pane>
                  <el-tab-pane label="系统角色" name="second"></el-tab-pane>
                  <el-tab-pane label="项目" name="third"></el-tab-pane>
              </el-tabs>

              <!-- 组织架构---------------------->
              <div class="tree-box" :class="tabsPage == 0?'show':'hide'">
                <el-input
                  placeholder="输入关键字进行搜索"
                  @keyup.enter.native="searchUser()"
                  v-model.trim="inputSearch"
                  clearable
                  style="margin-bottom:4px;">
                  <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <div  style="height:400px"
                  v-loading.lock="isShowLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
                  <el-scrollbar style="height:100%">
                    <!-- 全部的展示    isSearch == false -->
                    <!-- 组织架构 -->
                      <el-tree
                          v-show="!isSearch"
                          :props="defaultProps"
                          :data="structureData"
                          show-checkbox
                          node-key="uniqueKey"
                          :load="loadNode"
                          lazy
                          ref="tree"
                          @node-expand='expandClick'
                          @check-change='proCheck'
                          @node-click="handleNodeClick"
                          @check="handleCheck">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span v-if="data.mebsize || data.mebsize === 0" class="custom-tree-node-span" >
                                <span class="elipet">
                                  <span class="elipet" :title="data.label + '(' + data.mebsize + ')'">
                                    <span>{{ data.label}}({{data.mebsize}})</span>
                                  </span>
                                </span>
                            </span>
                            <span  v-else class="custom-tree-node-span">
                              <span class="userImg-box">
                                <img :src="data.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(data)">
                              </span>
                                <span class="elipet">
                                  <span class="elipet" :title="data.label">
                                    <span>{{ data.label}}</span>
                                  </span>
                                </span>
                            </span>
                        </span>
                      </el-tree>
                      <!-- 检索的展示控制 isSearch == true -->
                      <div v-show="isSearch && tabsPage == 0" class="borrowList">
                          <p
                            v-if="structureSearchData.length === 0"
                            class="borrowList_title"
                            style="text-align:center;"
                          >暂无数据</p>
                          <p
                            v-for="(item,idx) in structureSearchData"
                            :key="idx"
                            class="borrowList_item"
                            v-else>
                            <span><el-checkbox v-model="item.checked" :disabled="item.disabled" @change="handleCheck(item)" class="chooseA"></el-checkbox></span>
                            <span class="borrowList_item_fileIcon userImg-box">
                              <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                            </span>
                            <span class="borrowList_item_title">{{item.name}}</span>
                          </p>
                        </div>
                  </el-scrollbar>
                </div>
              </div>


              <!-- 角色---------------------- -->
              <div class="tree-box" :class="tabsPage == 1?'show':'hide'">
                <el-input
                  placeholder="输入关键字进行搜索"
                  @keyup.enter.native="searchUser()"
                  v-model.trim="inputSearchRole"
                  clearable
                  style="margin-bottom:4px;">
                  <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <div  style="height:400px"
                      v-loading.lock="isShowLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                  <el-scrollbar style="height:100%">

                      <ul class="ul-tree" v-show="tabsPage == 1">
                        <li class="li-tree" v-for="item in roleData" :key="item.id" v-show="roleData.length">
                          <div class="flex a-center">
                            <i class="el-tree-node__expand-icon el-icon-caret-right p6" :class="{'expanded': item.isExpand}" @click="loadNodeRole(item)"></i> 
                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checked']" @change="handleRoleCheck(item)"></el-checkbox> 
                            <i v-if="item['isLoading']" class="el-icon-loading ml-8"></i>
                            <span class="ellipsis1 ell-name" :title="item.label" @click="loadNodeRole(item)">{{item.label}}</span> 
                          </div>
                          <ul class="ul-child" v-show="item.isExpand">
                            <li class="li-child" v-for="child in item.children" :key="child.id">
                              <el-checkbox :disabled="child['disabled']" v-model="child['checked']" @change="handleRoleMemberCheck(child, item)"></el-checkbox>
                              <span class="userImg-box">
                                <img :src="child.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(child)">
                              </span>
                              <span class="ellipsis1 ell-name" :title="child.label">{{child.label}}</span>
                            </li>
                          </ul>
                        </li>
                        <li v-show="!roleData.length" class="borrowList_title">暂无数据</li>
                      </ul>

                  </el-scrollbar>
                </div>
              </div>


              <!-- 项目---------------------- -->
              <div class="tree-box" :class="tabsPage == 2?'show':'hide'">
                <el-input
                  v-show="tabsPage == 2"
                  placeholder="输入关键字进行搜索"
                  @keyup.enter.native="searchUser()"
                  v-model.trim="inputSearchPro"
                  clearable
                  style="margin-bottom:4px;">
                  <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <div  style="height:400px"
                  v-show="tabsPage == 2"
                      v-loading.lock="isShowLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                  <el-scrollbar style="height:100%">

                      <ul class="ul-tree">
                        <li class="li-tree" v-for="item in projectData" :key="item.id" v-show="projectData.length">
                          <div class="flex a-center">
                            <i class="el-tree-node__expand-icon el-icon-caret-right p6" :class="{'expanded': item.isExpand}" @click="loadNodeRole(item, 'project')"></i> 
                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checked']" @change="handleRoleCheck(item, 2)"></el-checkbox> 
                            <i v-if="item['isLoading']" class="el-icon-loading ml-8"></i>
                            <span @click="loadNodeRole(item, 'project')" class="ellipsis1 ell-name" :title="item.name">{{item.name}}</span> 
                          </div>
                          <ul class="ul-child" v-show="item.isExpand">
                            <li class="li-child" v-for="child in item.children" :key="child.id">
                              <el-checkbox :disabled="child['disabled']" v-model="child['checked']" @change="handleRoleMemberCheck(child, item)"></el-checkbox>
                              <span class="userImg-box">
                                <img :src="child.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(child)">
                              </span>
                              <span class="ellipsis1 ell-name" :title="child.name">{{child.name}}</span>
                            </li>
                          </ul>
                        </li>
                        <li v-show="!projectData.length" class="borrowList_title">暂无数据</li>
                      </ul>
                  </el-scrollbar>
                </div>
              </div>

            </div>
          </div>


          <!-- 已选区域 -->
          <div class="right_tree">
            <div class="right-title">已选人员</div>
            <div class="right-box">
              <ul>
                <el-scrollbar style="height:500px;">
                  <li v-for="(item, index) in optionUser" :key="index" class="user_list">
                      <div class="userleft">
                        <span class="userImg-box">
                          <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                        </span>
                        <span class="opt_name ellipsis1" :class="{'has-role':roleSelect}">{{item.label ? item.label : item.name}}</span>
                        <el-select v-if="roleSelect" v-model="item.roleId" placeholder="请选择内容" style="width:150px;margin-left:12px;" @change="roleOption(item)">
                          <el-option
                              v-for="obj in roleSelect"
                              :key="obj.value"
                              :label="obj.label"
                              :value="obj.value">
                          </el-option>
                        </el-select>

                      </div>
                      <i @click="delect(item, index)" class="el-icon-delete fr" style="cursor:pointer; margin-right:10px;"></i>
                  </li>

                  <li v-if="!optionUser.length" class="pop_no_select_item_tips">暂无选中项</li>
                </el-scrollbar>
              </ul>
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="cancelBtn">取 消</el-button>
          <el-button size="medium" type="primary" @click="confirmBtn">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        valueObj:[],
        defaultProps: {
          children: "children",
          label: 'label',
          isLeaf: 'leaf'
        },
        roleDefaultProps: {
          children: "children",
          label: 'label',
          isLeaf: 'leaf'
        },
        proDefaultProps: {
          children: "children",
          label: 'name',
          isLeaf: 'leaf'
        },
        arrOpen: [],
        token: "",
        userId: "",
        projectId: "",
        finsUserState: 0, // 0/1/2
        voteprojId: "",
        isShowLoading: false, // 是否显示加载遮罩
        activeName: 'first',
        tabsPage: 0,
        nodeData: [], //第一级下的人员
        list: [], //没有children/lists
        optionUser: [], //已选择的数据
        structureData: [], // 组织架构的data
        roleData: [], // 系统角色的data
        projectData: [], //项目data
        proAllData: [], // 项目添加过的子节点
        roleAllData: [], // 角色添加过的节点
        isSearch: false,
        isSearch1: false,
        inputSearch: '', // 组织架构检索的内容
        inputSearchRole: '', //角色的检索内容
        inputSearchPro: '', // 项目的检索内容
        structureSearchData: [], // 组织架构检索data
        roleSearchData: [], // 角色检索的data
        projectSearchData: [], // 项目检索的data
        children: []
      };
    },
    props: ['findFlagShowputong', 'findStateputong', 'checkStateputong', 'findUserObjputong', 'roleSelect', 'isSelectMember'],
    components: {
    },
    computed: {
      searchSite() {
        let searchContent = this.tabsPage == 0 ? this.inputSearch : (this.tabsPage == 1 ? this.inputSearchRole : this.inputSearchPro)
        return searchContent;
      }
    },
    created() {
    },
    mounted() {
      this.token = this.$store.state.loginObject.userToken;
      this.userId = this.$store.state.loginObject.userId;
      this.projectId = (this.voteprojId !== "") ? this.voteprojId : this.$store.state.projectMsg.pro_id
      this.isSearch = false
      this.isSearch1 = false
    },
    methods: {
      roleOption(item){
        item.roleName = this.roleSelect.find(v=>v.value === item.roleId).label
        console.log(222, item)
      },
      handleCheckAllChange(){},
      handleCheckedCitiesChange(){},
      // 只是为了监听选中的值并且为默认的人为禁用状态
      proCheck(data) {
        this.optionUser.forEach (o => {
          if (o.uniqueKey === data.uniqueKey && o.originData) {
            this.$set(data, 'disabled', true)
          }
        })
      },
      // 选中复选框
      handleCheck (currentObj, treeStatus) {
      //  console.log('handleCheck', currentObj, treeStatus, this.tabsPage, this.optionUser, currentObj.children)
       if (this.isSearch && this.tabsPage == 0) {
        !this.optionUser.length ? this.nodeData = [] : this.nodeData = this.optionUser
         currentObj.checked ? this.selectionData(currentObj) : this.deselectData(currentObj)
         return
       }
        !this.optionUser.length ? this.nodeData = [] : this.nodeData = this.optionUser
        // 是否为选中。。。选中则走取消，否则走选中
        let selected = treeStatus.checkedKeys.indexOf(currentObj.uniqueKey)
        selected !== -1 ? this.selectionData(currentObj) : this.deselectData(currentObj)
      },
      // 需要选中
      selectionData(currentObj) {
        // console.log('需要选中', currentObj)
        // 有mebsize值说明不是最后一级、点击角色或者项目当前的子集
        if ((currentObj.mebsize || currentObj.mebsize == 0) || currentObj.children) {
          this.getChildList(currentObj, 1)
          return
        }
        let arr = []
        this.nodeData.forEach(v => {
          if (v.userId === currentObj.userId) {
            arr.push(v)
          }
        })
        if (arr.length) return
        this.optionUser.push(currentObj)
      },
      // 需要取消
      deselectData (currentObj) {
        // console.log('需要取消', currentObj)
        // 有mebsize值说明不是最后一级
        if ((currentObj.mebsize || currentObj.mebsize == 0) || currentObj.children) {
          this.getChildList(currentObj, 0)
          return
        }
        this.optionUser.forEach((v, i) => {if (v.userId === currentObj.userId) {this.optionUser.splice(i, 1)}})
      },
      // 获取值，type = 0--false选中 1--true取消
      getChildList (data, type) {
        // console.log(data, type, 'children处理', this.tabsPage)
        // type -0 取消， type-1选择
        if (this.tabsPage == 0) {
          // 组织架构的选择处理
          if (data.children && data.children.length) {
            data.children.forEach(v => {
              this.$set(v, 'disabled', false)
              this.getChildList(v, type)
            })
          }
          var arr = []
          if (data.lists && data.lists.length) {
            data.lists.forEach(v => {
              if (!v.disabled) {
                v.userId ? v.uniqueKey = 'user' + v.userId : v.uniqueKey = 'user' + v.id
                this.nodeData.push(v)
                arr.push(v)
              }
            })
          }
        }
        // 看是选择的是子集还是多个子集的----多个子集需要去重
        let noRepeat = this.uniq(this.nodeData)
        let arr1 = this.uniq(arr)
        type == 0 ? this.addUser(arr1, type) : this.addUser(noRepeat, type)
      },
      // 子集的提取 type = 0--false选中 1--true取消
      addUser (data, type) {
        type == 0 ?  this.optionUser =  this.setChildrenHandle(this.optionUser, data) : this.optionUser = data
      },
      // 选中节点的处理---删除相对应的值
      setChildrenHandle(arr1, arr2){
        let arr = [];
        for(let item of arr1){
            if(arr2.find(v => v.userId === item.userId)) {
                continue;
            }
            arr.push(item);
        }
        return arr;
      },
      // 选择完的数据去重
      uniq(array){
        let hash = {}; 
        const data2 = array.reduce((preVal, curVal) => {
            hash[curVal.userId] ? '' : hash[curVal.userId] = true && preVal.push(curVal); 
            return preVal 
        }, [])
        return data2
      },
      // 组织架构的查询
      structureQuery() {
        let obj = {
          token: this.token,
          userId: this.userId
        }
        let url = ""
        // finsUserState == 0---/sys/getUserAll ---全局组织架构人员
        // finsUserState == 1----/sys/getOptionalMember ---所有用户(排除已加入部门的人)
        // finsUserState == 2----/info/project/getMemberAll --- 项目组成员
        if (this.finsUserState == 0) {
          url = '/sys/getUserAll'
          obj.data = {}
        } else if (this.finsUserState == 1) {
          url = '/sys/getOptionalMember'
        } else {
          url = '/info/project/getMemberAll'
          obj.data.projectId = this.projectId
        }
        this.isShowLoading = true
        this.$post(url, obj).then(res => {
          this.isShowLoading = false
          if(!res.data || !res.data.length) return;
          this.structureData = res.data
          if (this.finsUserState == 1) {
            this.structureData.forEach(v => {
              v.userId = v.id
              v.label = v.name
              v.uniqueKey = 'user' + v.userId
              v.uniqueFlag = 'user'+v.userId
            })
          }
        }).catch(error => {
            console.log(error);
          });
      },
      // 小三角的点击
      expandClick (data) {
        console.log('叶子节点', data)
        this.handleNodeClick(data)
      },
      // 树节点的点击
      handleNodeClick (data) {
        console.log(data, '节点点击')
        if (!data.children && !data.lists) {
          this.optionUser.forEach(v => {
            if (v.originData && (v.uniqueKey === data.uniqueKey)) {
              this.$set(data, 'disabled', true)
            }
          })
        }
        if (!this.optionUser.length) {
          setTimeout(() => {
            this.$refs.tree.setCheckedKeys([])
          }, 200);
        }
        this.defaultChecked()
      },
      // 组织架构的树级渲染
      loadNode (node, resolve) {
        console.log('loadnode',node)
        // 将后台返回的禁用值改为false
        node.data.disabled = false
        // 一级节点的展示
        if (node.level === 1 && node.data.children && node.data.lists) {
          node.data.uniqueKey = (node.data.mebsize || node.data.mebsize===0) ? 'dept'+node.data.id : 'user'+node.data.userId
          node.data.children.forEach(o => {
           o.uniqueKey =  (o.mebsize || o.mebsize === 0) ? 'dept' + o.id : 'user' + o.id
          })
          node.data.lists.forEach(v => {
            v.leaf = true
            v.userId ?  v.uniqueKey = 'user' + node.data.id + v.userId :  v.uniqueKey = 'user' + node.data.id + v.id
            v.label = v.name
            this.optionUser.forEach (o => {
              if (o.uniqueKey === v.uniqueKey && o.originData) {
                this.$set(v, 'disabled', true)
              }
            })
            node.data.children.push(v)
          })
          return resolve(node.data.children)
        }else if (node.level > 1 && !node.data.children && node.data.lists) {
          // 没有children,但是有子集
          node.data.uniqueKey = (node.data.mebsize || node.data.mebsize===0) ? 'dept'+node.data.id : 'user'+node.data.userId
          // this.setUniqueKey(node.data.lists)
          node.data.lists.forEach(v => {
            v.leaf = true
            v.userId ?  v.uniqueKey = 'user' + node.data.id + v.userId :  v.uniqueKey = 'user' + node.data.id + v.id
            v.label = v.name
            this.optionUser.forEach (o => {
              if (o.uniqueKey === v.uniqueKey && o.originData) {
                this.$set(v, 'disabled', true)
              }
            })
          })
          return resolve(node.data.lists)
        }else if (node.level > 1 && node.data.children && node.data.lists) {
          // 有children，也有lists
          node.data.uniqueKey = (node.data.mebsize || node.data.mebsize===0) ? 'dept'+node.data.id : 'user'+node.data.userId
          node.data.children.forEach(o => {
           o.uniqueKey =  (o.mebsize || o.mebsize === 0) ? 'dept' + o.id : 'user' + o.id
          })
          node.data.lists.forEach(v => {
            v.leaf = true
            v.userId ?  v.uniqueKey = 'user' + node.data.id + v.userId :  v.uniqueKey = 'user' + node.data.id + v.id
            v.label = v.name
            this.optionUser.forEach (o => {
              if (o.uniqueKey === v.uniqueKey && o.originData) {
                this.$set(v, 'disabled', true)
              }
            })
            node.data.children.push(v)
          })
          return resolve(node.data.children)
        }else if (!node.data.children && !node.data.lists) {
          if (this.optionUser.length && node.data) {
            this.optionUser.forEach(v => {
              if (v.uniqueKey === v.uniqueKey && v.originData) {
                this.$set(v, 'disabled', true)                
              }
            })
          }
          return resolve([])
        }
      },

      // 系统角色的查询
      roleQuery() {
        let obj = {
          token: this.token,
          userId: this.userId
        }
        this.isShowLoading = true
        this.$post('/sys/getQueryRole', obj).then(res => {
          this.isShowLoading = false
          if(!res.data) return;
          // 第一层的数据直接渲染
          res.data.forEach(v => {
            v.uniqueKey = 'rol' + v.id
            v.roleIds = v.id
            v.label = v.roleName
            v.children = []
            this.$set(v, 'isExpand', false)
            this.$set(v, 'isChecked', false)
            this.$set(v, 'isIndeterminate', false)
            this.$set(v, 'isLoading', false)
          })
          let data = res.data
          this.roleData = data.splice(0,100)
          if(data.length) {
            let timer = setInterval(()=>{
              if(!data.length) {
                clearInterval(timer)
              }
              let chunk = data.splice(0,1000)
              this.roleData = [...this.roleData, ...chunk]
            },1000)

          }
          this.roleDataCopy = res.data
        }).catch(error => {
            console.log(error);
          });
      },
      // 角色的树级渲染---接口待修改
      loadNodeRole (node) {
        // console.log(123, node.isExpand, node)
        // 判断是展开还是收起
        if(node.isExpand) {
          node.isExpand = false
          return
        }
        node.isExpand = true
        // console.log(this.optionUser, 36, node.children)
        // 展开后回显已选数据
        if(node.children.length){
          if (!this.optionUser.length) {
            node.isIndeterminate = false
            node.children.forEach(v => {this.$set(v, 'checked', false)})
            return
          }
          // 回显选中数据
          this.optionUser.length && this.displayChecked(node)
          return
        }
        this.tabsPage==1 ? this.roleNodeQuery(node) : this.proNodeQuery(node)
      },
      roleNodeQuery(node, type) {
        node.isLoading = true
        let obj = {
          token:this.token,
          userId: this.userId,
          data: {
            id: node.id
          }
        }
        this.$post('/sys/listUserByRoleId', obj).then(res => {
          node.isLoading = false
          if (!res) return
          if (res.code !== 0) {
            this.$message.error(res.msg)
            return
          }
          let checkedLen = this.optionUser.length
          res.data.forEach(v=>{
            v.uniqueKey =  node.id + 'r'+ v.userId
            v.uniqueFlag = 'user' + v.userId
            v.roleIds = node.id 
            this.$set(v, 'checked', false)
            // 设置禁用状态
            // let isDisabled = checkedLen && this.optionUser.findIndex(o=>o.userId === v.userId && o.originData)>-1
            // this.$set(v, 'disabled', isDisabled)
          })
          let data = res.data
          node.children = data.splice(0,100)
          if(data.length) {
            let timer = setInterval(()=>{
              if(!data.length) {
                clearInterval(timer)
              }
              let chunk = data.splice(0,1000)
              node.children = [...node.children, ...chunk]
            },1000)
          }
          if (type && node.children.length) {
            this.handleRoleCheck(node)
          }

          // 回显已选人员
          if (this.optionUser.length) {
            this.displayChecked(node)
          }
        }).catch(()=>{
          node.isLoading = false
        })
      },
      // 角色中有重复的数据需要直接选中
      roleCheck(v, checkType, tabsPage) {
        let data =  this.tabsPage == 1 ? this.roleData : this.projectData
        console.log(v, checkType, tabsPage, data, '33336')
        if (v.children && v.children.length) {
          this.setChildeCheck(v.children, checkType, tabsPage, data)
        } else {
          this.setNoChindCheck(v, checkType, tabsPage, data)
        }
      },
      // 系统角色，项目回显已选人员
      displayChecked(item){
        console.log('childrenList', this.optionUser, item, '1-2')
        let key = this.tabsPage
        if(item==='all'){
          let data = key=='1'? this.roleData : this.projectData
          console.log(data, 222222)
          data.forEach(v=>{
            v.isExpand && v.children.length && this.displayChecked(v)
          })
          return
        }

        let childrenList = item.children
        childrenList.forEach(v=>{
          let o = this.optionUser.find(o=>o.userId==v.userId)
          // 选中状态
          v.checked = Boolean(o)
          // 禁用状态
          v.disabled = o && o.originData
        })
        console.log(childrenList, 99999)

        // 处理父节点的选中状态
        let checked = childrenList.filter(v=>v.checked)
        let checkedLen = checked.length
        let childrenLen = childrenList.length
        if(checkedLen === childrenLen){
          item.isIndeterminate = false
          item.checked = true
        } else if(checkedLen>0 && checkedLen<childrenLen){
          item.isIndeterminate = true
        } else if(checkedLen===0){
          item.isIndeterminate = false
          item.checked = false
        }


      },
      // 选择的有子集时child--需要选中的， type-true选中， data--当前的数据
      setChildeCheck (child, checkType, tabsPage, data) {
        console.log(child)
        let findChildData = []
        data.map(v => {
          if (v.children && v.children.length) {
            v.children.map(o => {
              child.map(m => {
                if (m.userId === o.userId) {
                  findChildData.push(o)
                }
              })
            })
          }
        })
        findChildData.map(p => {
          tabsPage == 1 ? this.$set(p, 'uniqueKey', p.roleIds + 'r' + p.userId) : this.$set(p, 'uniqueKey', p.projectId + 'r' + p.userId)
          this.$nextTick(() => {
            (checkType && tabsPage == 1) ? this.$refs.roleTree.setChecked(p.uniqueKey, true) : this.$refs.roleTree.setChecked(p.uniqueKey, false)
          })  
          this.$nextTick(() => {
            (checkType && tabsPage == 2) ? this.$refs.projectTree.setChecked(p.uniqueKey, true) : this.$refs.projectTree.setChecked(p.uniqueKey, false)
          }) 
        })
      },
      setNoChindCheck(child, checkType, tabsPage, data){
        data.forEach(m => {
          if (m.children && m.children.length) {
            m.children.forEach(o => {
              if (o.userId === child.userId) {
                tabsPage == 1 ? this.$set(o, 'uniqueKey', o.roleIds + 'r' + o.userId) : this.$set(o, 'uniqueKey', o.projectId + 'r' + o.userId)
                this.$nextTick(() => {
                  (checkType && tabsPage == 1) ? this.$refs.roleTree.setChecked(o.uniqueKey, true) : this.$refs.roleTree.setChecked(o.uniqueKey, false)
                })  
                this.$nextTick(() => {
                  (checkType && tabsPage == 2) ? this.$refs.projectTree.setChecked(o.uniqueKey, true) : this.$refs.projectTree.setChecked(o.uniqueKey, false)
                })                                          
              }
            })
          }
        })
      },
      // 勾选角色复选框
      handleRoleCheck(node, type){
        // console.log(node, 2222, node.children)
        if (!node.children.length) {
          type == 2 ? this.proNodeQuery(node, 'pro') : this.roleNodeQuery(node, 'role')
          return
        }
        node.isIndeterminate = false
        node.children.forEach(v=>{
          v.checked = node.checked
        })

        // 更新已选人员数据
        if(node.checked) {
          this.optionUser = this.$utils.uniqBy([...this.optionUser,...node.children], 'userId')
        } else {

          this.optionUser = this.tabsPage ==1 
          ? this.optionUser.filter(v=>v.roleIds!==node.id) 
          : this.optionUser.filter(v=>v.projectId!==node.id)
        }

      },
      // 勾选角色下人员复选框
      handleRoleMemberCheck(node, item){
        console.log(node, 336, this.optionUser, item, this.tabsPage)
        // 更新已选人员数据
        if(node.checked) {
          this.optionUser.push(node)
        } else {
          // 右侧删除
          let idx = this.optionUser.findIndex(v=>v.userId === node.userId)
          this.optionUser.splice(idx, 1)
        }

        // 判断角色复选框的选中状态
        let checked = item.children.filter(v=>v.checked)
        let checkedLen = checked.length
        let childrenLen = item.children.length
        if(checkedLen === childrenLen){
          item.isIndeterminate = false
          item.checked = true
        } else if(checkedLen>0 && checkedLen<childrenLen){
          item.isIndeterminate = true
        } else if (checkedLen == 0){
          item.isIndeterminate = false
          item.checked = false
        }
      },

      // 项目的查询---接口待修改
      projectQuery() {
        let obj = {
          token: this.token,
          userId: this.userId,
          data: {}
        }
        this.isShowLoading = true
        this.$post('/info/project/getSimpleProjectList', obj).then(res => {
          this.isShowLoading = false
          if(!res.data) return;
          let data = res.data

          // 节流加载

          let chunk1 = data.splice(0,100)
          chunk1.forEach(v => {
            v.uniqueKey = 'pro' + v.id
            v.projectId = v.id
            v.isProjectNode = true
            v.children = []
            this.$set(v, 'isIndeterminate', false)
            this.$set(v, 'checked', false)
            this.$set(v, 'isExpand', false)
            this.$set(v, 'isLoading', false)
            
          })

          this.projectData = chunk1

          if(data.length) {
            let timer = setInterval(()=>{
              if(!data.length) {
                clearInterval(timer)
              }
              let chunk = data.splice(0,1000)
              chunk.forEach(v => {
              v.uniqueKey = 'pro' + v.id
              v.projectId = v.id
              v.isProjectNode = true
              v.children = []
              this.$set(v, 'isIndeterminate', false)
              this.$set(v, 'checked', false)
              this.$set(v, 'isExpand', false)
              this.$set(v, 'isLoading', false)
            })
            this.projectData = [...this.projectData, ...chunk]
            },1000)

          }


          this.projectDataCopy = this.projectData
        }).catch(error => {
            console.log(error);
          });
      },
      // 项目树级渲染--等待后台参数----别忘记设置默认值需要禁用
      loadNodeProject (node, resolve) {
        console.log(124, node.isExpand, node)
        // 判断是展开还是收起
        if(node.isExpand) {
          node.isExpand = false
          return
        }
        node.isExpand = true
        if(node.children.length){
          // 选中处理
          if (this.optionUser.length) {
            this.optionUser.forEach(v => {
              if (v.uniqueKey === v.uniqueKey && v.originData) {
                this.$set(v, 'disabled', true)                
              }
            })
          }else {
            node.children.forEach(v => {v.checked = false})
          }
          return
        }
        this.proNodeQuery(node)
      },
      proNodeQuery(node, type) {
        // console.log(node)
        node.isLoading = true
        let obj = {
          token:this.token,
          userId: this.userId,
          data: {
            id: node.id
          }
        }
        this.$post('/info/project/listUserByProjectId', obj).then(res => {
          node.isLoading = false
          if (!res) return
          if (res.code !== 0) {
            this.$message.error(res.msg)
            return
          }
          // 项目点击节点返回的当前的数据处理----
          res.data.forEach(v=>{
            v.uniqueKey =  node.id + 'r'+ v.userId
            v.uniqueFlag = 'user' + v.userId
            v.projectId = node.id
            this.$set(v, 'checked', false)
            this.$set(v, 'disabled', false)
          })
          
          // 数据懒加载
          let data = res.data
          node.children = data.splice(0,100)
          if(data.length) {
            let timer = setInterval(()=>{
              if(!data.length) {
                clearInterval(timer)
              }
              let chunk = data.splice(0,1000)
              node.children = [...node.children, ...chunk]
            },1000)
          }

          // node.isExpand = true
          // 点击的复选框的项目级需要走一次
          if (type && node.children.length) {
            this.handleRoleCheck(node)
          }
          // 回显选中人员
          if (this.optionUser.length) {
            this.displayChecked(node)
          }
        }).catch(()=>{
          node.isLoading = false
        })
      },
      // tab切换------切换列中有值则不需要进行接口调用
      handleClick(tab, event) {
        this.tabsPage = tab.index
        console.log(tab, this.tabsPage, '9999999', this.isSearch)
        if (tab.index == 0 && !this.structureData.length && !this.isSearch) {
          this.structureQuery()
        } else if (tab.index == 1 && !this.roleData.length && !this.isSearch1) {
          this.roleQuery()
        } else if (tab.index == 2 && !this.projectData.length){
          this.projectQuery()
        }
        if (tab.index == 0 && !this.structureSearchData.length && this.isSearch) {
          this.searchUser()
        } else if (tab.index == 1 && !this.roleSearchData.length && this.isSearch1) {
          this.searchUser()
        }
         else if (tab.index == 2 && !this.projectSearchData.length){
          this.searchUser()
        }
        this.defaultChecked()
      },
      // 默认选中
      defaultChecked () {
        console.log('默认选中', this.tabsPage)
        if (this.tabsPage == 0) {
          if (this.isSearch) {
            if (this.optionUser.length) {
              this.setCheckedHandle(this.structureSearchData, this.optionUser)
            }
            this.structureSearchData.forEach(v => {
              v.checked = false
            })
          }else {
            this.$refs.tree.setCheckedKeys([])
             let selectedId = this.optionUser.map(v=> Number(v.userId || v.userId))
            let originData = this.optionUser.filter(v=> v.userId && v.originData)
            this.selectById(selectedId, true, originData.length > 0 && originData)
          }
          return
        }
        this.displayChecked('all')
      },
      setCheckedHandle(arr1, arr2){
        arr1.forEach(v=>{
          let o = arr2.find(o=>o.userId==v.userId)
          // 选中状态
          v.checked = Boolean(o)
          // 禁用状态
          v.disabled = o && o.originData
          // v.checked = arr2.findIndex(a=>a.userId==v.userId)>-1
          // v.disabled = arr2.findIndex(a=>a.userId==v.userId)>-1
        })
      },
      setCheckedHandle1 (arr1, arr2) {
        let arr = [];
        for(let item of arr1){
            if(arr2.find(v => v.userId !== item.userId)) {
                continue;
            }
            if (item.originData) {
              arr.push(item);
            }
        }
        return arr;
      },
      // 搜索按钮的搜索,查看tabs/ 
      searchUser() {
        if (this.tabsPage == 0) {
          this.isSearch = true
          this.structureSearchQuery()
          return
        }
        if (this.tabsPage == 1) {
          if (!this.inputSearchRole) return
          // this.isSearch1 = true
          this.roleSearchQuery()
          return
        }
        if (this.tabsPage == 2) {
          if (!this.inputSearchPro) return
          this.proSearchQuery()
        }
      },
      // 组织架构检索的接口
      structureSearchQuery () {
        // 清空上次的搜索结果
        this.structureSearchData = []
         // 接口调用
        let searchObj = {
          token: this.token,
          userId: this.userId,
          data: {
            name: this.inputSearch
          }
        }
        this.isShowLoading = true
        this.$post("/sys/searchUser", searchObj).then(res => {
          this.isShowLoading = false
          if(!res.data) return;
          this.isSearch = true
          res.data.forEach(v => {v.uniqueKey = 'user' + v.userId
            v.label = v.name})
            this.structureSearchData = res.data
          if (this.optionUser.length) {
            this.setCheckedHandle(this.structureSearchData, this.optionUser)
          } 
        }).catch(error => {
          console.log(error);
        });
      },
      // 角色检索的查询处理
      roleSearchQuery(){

        let arr = []
        this.roleData.forEach(v => {
          if (v.roleName.indexOf(this.inputSearchRole) !== -1) {
            arr.push(v)
          }
        })
        this.roleData = arr

        // this.roleSearchData = []
        // let searchObj = {
        //   token: this.token,
        //   userId: this.userId,
        //   data: {
        //     roleName: this.inputSearchRole
        //   }
        // }
        // this.isShowLoading = true
        // this.$post("/sys/searchRoleUser", searchObj).then(res => {
        //   this.isShowLoading = false           
        //     if(!res) return
        //     // this.isSearch1 = true
        //     res.data.forEach(v => {
        //       v.label = v.roleName
        //       v.children = []
        //       this.$set(v, 'isExpand', false)
        //       this.$set(v, 'isChecked', false)
        //       this.$set(v, 'isIndeterminate', false)
        //     })
        //     this.roleData = res.data
        // }).catch(error => {
        //   console.log(error);
        // });
      },
      // 项目检索的查询处理
      proSearchQuery(){
        console.log(this.inputSearchPro, this.projectData, '项目查询')
        let arr = []
        this.projectData.forEach(v => {
          if (v.name.indexOf(this.inputSearchPro) !== -1) {
            v.isProjectNode = true
            v.children = []
            arr.push(v)
          }
        })
        this.projectData = arr
      },
      // 删除
      delect (item, index) {
        if(item.originData){
          this.$message.warning('默认的人员不能删除');
          return;
        }
        this.optionUser.splice(index, 1);
        // 系统角色和项目的左侧列也需要删除
        if (this.tabsPage != 0) {
          this.displayChecked('all')
          return
        }
        
        // 处理组织架构（tabsPage为0）
        // (!this.isSearch && this.tabsPage == 0) && this.$refs.tree.setChecked(item.uniqueKey, false)
        (!this.isSearch && this.tabsPage == 0) && this.selectById([item.userId], false)

        this.structureSearchData.forEach(v=> {
          if (v.userId === item.userId) {
            v.checked = false
          }
        })


      },
      selectById(userArr, flag, disab){

        let fn= (arr)=>{
          
          arr.forEach(v=>{
            if(v.lists){
              v.lists.forEach(l=>{
                userArr.indexOf(l.userId)>-1 && this.$refs.tree.setChecked('user'+v.id+l.userId, flag)
                disab && disab.filter(p=> p.userId == l.userId).length > 0 && this.$set(l, 'disabled', true)
              })
            }

            v.children && v.children.length && fn(v.children)
          })
          
        }
        // console.log(this.structureData, userId)
        fn(this.structureData)

      },




      // 确定按钮
      confirmBtn() {
        console.log(12345, this.optionUser)
        if(this.roleSelect) {
          let all = this.optionUser.findIndex(v=>!v.roleId)<0
          if(!all){
            this.$message.warning('关联角色不能为空！')
            return
          }
        }
        this.$emit('findAllUserputong', this.optionUser)
        this.cancelBtn()
      },
      // 取消按钮
      cancelBtn() {
        console.log('cancelBtn', this.findFlagShowputong)
        this.$emit('update:findFlagShowputong', false); 
        this.initData()
      },
      initData () {
        console.log('initData')
        // 将数据初始化
        this.optionUser = []
        this.structureData = []
        this.roleData = []
        this.projectData = []
        this.projectDataCopy = [] // 项目检索时覆盖的数据
        this.roleDataCopy = [] // 系统角色检索
        this.inputSearch = ''
        this.inputSearchRole = ''
        this.inputSearchPro = ''
      },
      // 获取图片的路径
      getImgUrl(item){
        return this.$utils.getDownloadUrl(item.userImg)
      },
      // 默认的抄送人有头像的需要获取头像的值
      getUserImg (list) {
        let dataObj = {
          "token":this.token,
          "userId":this.userId,
          "data":{
              "idSet":list
          }
        }
        this.$post("/sys/queryuserImg",dataObj).then(res =>{
          if (res.data) {
            console.log(res.data, 2222)
            let data = res.data
            this.optionUser.forEach(v => {
              if (v.userId) {
                this.$set(v, 'userImg', data[v.userId])
              }
            })
          }
        })
      }
    },
    watch:{
      findFlagShowputong (val) {
        if (val) {
          this.voteprojId = this.$store.state.voteprojId;
          this.finsUserState = this.findStateputong.state;
          this.projectId = !this.$store.state.voteprojId ? this.$store.state.voteprojId : this.$store.state.projectMsg.pro_id
          // this.projectId = (this.voteprojId !== "") ? this.voteprojId : this.$store.state.projectMsg.pro_id
          console.log(this.p, '接收到的人员值',  this.roleSelect)
          this.optionUser = this.findUserObjputong ? this.findUserObjputong.slice() :  []
          console.log(this.optionUser,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqttttttt')
         let arr =  this.optionUser.map(m => {
           m.userId =  m.userId ? m.userId : m.id
           return m.userId
          })
         console.log(arr, 2)
         if (arr.length) {
          this.getUserImg(arr)
         }
          // 打开进行查询组织架构的人员
           this.activeName = 'first'
          this.tabsPage = 0
          this.isSearch = false
          this.isSearch1 = false
          this.structureQuery()
        }
      },
      // 搜索框关闭时的监听
      searchSite(newValue, oldValue) {
        if (newValue == "" || newValue == undefined || newValue == null) {
          if (this.tabsPage == 0) {
            this.isSearch = false
          } else if (this.tabsPage == 1) {
            // this.isSearch1 = false
            this.roleData = this.roleDataCopy
          }
          if (this.tabsPage == 2) {
            this.projectData = this.projectDataCopy
          }
          this.defaultChecked()        
        }
      }
    }
  }
</script>
<style lang="scss"  scoped>
.el-tree{
  background: none;
}
.show{
  width: calc(100% - 20px);
  z-index: 100;
}
.hide{
  width: calc(100% - 20px);
  z-index: -1;
}
.tree-box{
  position: absolute;
}
.ul-tree{
  text-align: left;
}
.li-tree{
  padding: 5px 0 5px 6px;
}
.li-child{
  padding: 5px 0 1px 24px;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
}
.userImg{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.opt_name{
  display: inline-block;
  width: 100%;
  margin-right: 10px;
  text-align: left;
}
.has-role{
  width: 120px;
}

  .findall-parent .el-dialog {
    .find_cont {
      .left_tree {
        float: left;
        width: 49%;
        height: 500px;
        box-sizing: border-box;
        padding-right: 10px;
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
          margin-top: 10px;
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
        height: 500px;
      }
      .left-title, .right-title{
        line-height: 30px;
        text-align:left;
        margin-top:-10px;
      }
      .right-title{
        box-sizing: border-box;
      }
    }
  }
  .right-box, .left-box {
    border:1px solid #ddd;padding:12px;
    height: 500px;
    position: relative;
  }
  .custom-tree-node-span {
      display: flex;
      align-items: center;
    }
    .elipet {
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
    .userImg-box{
      display: inline-block;
      width: 35px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 7px;
      img{
        width: 100%;
        height: 100%;
      }
    }
   .pop_no_select_item_tips{
     line-height: 40px;
   }
  
  .user_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0 15px 5px 5px;
  }
  .userleft{
    flex-grow: 1;
    display: flex;
    align-items: center;
    width: 50%;
  }
  .ell-name{
    margin-left:8px;
    cursor:pointer;
  }
  .p6{
    padding: 6px;
  }
  .ml-8{
    margin-left: 8px;
  }
  
</style>
