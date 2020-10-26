<template>
  <!--单选-->
  <div class="findall-parent ">
      <el-dialog title="选择人员" append-to-body :close-on-click-modal="false" :visible="findFlagShow" width="963px" @close="cancelBtn" class="find_box findall-parent">
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
                <div  style="height:390px"
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
                      <!-- 组织架构---检索 -->
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
                            <span>
                              <el-checkbox 
                              v-model="item.checked" 
                              :disabled="item.disabled" 
                              @change="handleCheck(item)" 
                              class="chooseA">
                              </el-checkbox>
                            </span>
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
                <div  style="height:390px"
                    v-loading.lock="isShowLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                  <el-scrollbar style="height:100%">
                    <!-- 全部的展示    isSearch == false -->
                      <ul class="ul-tree" v-show="!isSearch1 && tabsPage == 1">
                        <li class="li-tree" v-for="item in roleData" :key="item.id" v-show="roleData.length">
                          <div class="flex a-center">
                            <i class="el-tree-node__expand-icon el-icon-caret-right" :class="{'expanded': item.isExpand}" @click="loadNodeRole(item)"></i> 
                            <el-checkbox 
                            :indeterminate="item['isIndeterminate']" 
                            v-model="item['checked']" 
                            @change="handleRoleCheck(item)" 
                            disabled></el-checkbox> 
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
                        
                        <ul class="ul-tree"  v-show="tabsPage == 1 && inputSearchRole">
                        <li class="li-tree" v-for="item in roleSearchData" :key="item.id" v-show="roleSearchData.length">
                          <div>
                            <i class="el-tree-node__expand-icon el-icon-caret-right" :class="{'expanded': item.isExpand}" @click="loadNodeRole(item, 'role')"></i> 
                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checked']" @change="handleRoleCheck(item)" disabled></el-checkbox> 
                            <span class="ellipsis1 ell-name" :title="item.label" @click="loadNodeRole(item, 'role')">{{item.label}}</span> 
                          </div>
                          <ul class="ul-child" v-show="item.isExpand">
                            <li class="li-child" v-for="child in item.children" :key="child.id">
                              <!-- :disabled="child['disabled']"  -->
                              <el-checkbox :disabled="child['disabled']" v-model="child['checked']" @change="handleRoleMemberCheck(child, item)"></el-checkbox>
                              <span class="userImg-box">
                                <img :src="child.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(child)">
                              </span>
                              <span class="ellipsis1 ell-name" :title="child.label">{{child.label}}</span>
                            </li>
                          </ul>
                        </li>
                        <li v-show="!roleSearchData.length" class="borrowList_title">暂无数据</li>
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
                <div  style="height:390px"
                    v-show="tabsPage == 2"
                    v-loading.lock="isShowLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                  <el-scrollbar style="height:100%">

                    <ul class="ul-tree">
                        <li class="li-tree" v-for="item in projectData" :key="item.id" v-show="projectData.length">
                          <div class="flex a-center">
                            <i class="el-tree-node__expand-icon el-icon-caret-right" :class="{'expanded': item.isExpand}" @click="loadNodeRole(item, 'project')"></i> 
                            <el-checkbox :indeterminate="item['isIndeterminate']" v-model="item['checked']" @change="handleRoleCheck(item)" disabled></el-checkbox> 
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
                      <span class="userleft">
                        <span class="userImg-box">
                          <img :src="item.userImg == null ? require('@/assets/user_img/projectLogUser.png') : getImgUrl(item)">
                        </span>
                        <span class="opt_name">{{item.label ? item.label : item.name}}</span>
                      </span>
                      <i @click="delect(item, index)" class="el-icon-delete fr" style="cursor:pointer;"></i>
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
        defaultProps: {
          children: "children",
          label: 'label',
          isLeaf: 'leaf'
        },
        // roleDefaultProps: {
        //   children: "children",
        //   label: 'label',
        //   isLeaf: 'leaf'
        // },
        // proDefaultProps: {
        //   children: "children",
        //   label: 'name',
        //   isLeaf: 'leaf'
        // },
        arrOpen: [],
        token: "",
        userId: "",
        projectId: "",
        finsUserState: 0, // 0/1/2
        voteprojId: "",
        editCheckId: '', // 单选控制的值
        isShowLoading: false, // 是否显示加载遮罩
        activeName: 'first',
        tabsPage: 0,
        nodeData: [], //第一级下的人员
        list: [], //没有children/lists
        optionUser: [], //已选择的数据
        structureData: [], // 组织架构的data
        roleData: [], // 系统角色的data
        projectData: [], //项目data
        projectDataCopy: [],
        isSearch: false,
        isSearch1: false,
        inputSearch: '', // 组织架构检索的内容
        inputSearchRole: '', //角色的检索内容
        inputSearchPro: '', // 项目的检索内容
        structureSearchData: [], // 组织架构检索data
        roleSearchData: [], // 角色检索的data
        projectSearchData: [], // 项目检索的data
        canDefine: true
      };
    },
    props: ['findFlagShow', 'findState', 'checkState', 'findUserObj'],
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
      // 只是为了监听选中的值并且为默认的人为禁用状态
      proCheck(data) {
        this.optionUser.forEach (o => {
          if (o.uniqueKey === data.uniqueKey && o.originData) {
            this.$set(data, 'disabled', true)
          }
        })
      },
      // 选中复选框----只可以单选
      handleCheck (currentObj, treeStatus) {
        if (this.isSearch && this.tabsPage == 0) {
        !this.optionUser.length ? this.nodeData = [] : this.nodeData = this.optionUser
         currentObj.checked ? this.selectionData(currentObj) : this.deselectData(currentObj)
         return
       }
        // 是否为选中。。。选中则走取消，否则走选中
        let selected = treeStatus.checkedKeys.indexOf(currentObj.uniqueKey)
        selected !== -1 ? this.selectionData(currentObj) : this.deselectData(currentObj)
      },
      // 需要选中
      selectionData(currentObj) {    
         this.editCheckId = currentObj.uniqueKey
         if (this.tabsPage == 0) {
           if (this.isSearch) {
             this.structureSearchData.forEach(v => {
               if(v.userId === currentObj.userId) {
                 v.checked = true
               } else {
                 v.checked = false
               }
             })
           }
           this.$refs.tree.setCheckedKeys([currentObj.uniqueKey])
         }else if (this.tabsPage == 1) {
           if (this.isSearch1) {
              this.$refs.roleTreeSearch.setCheckedKeys([currentObj.uniqueKey])
           }
           this.$refs.roleTree.setCheckedKeys([currentObj.uniqueKey])
         } else {
           this.$refs.projectTree.setCheckedKeys([currentObj.uniqueKey])    
         }
        let arr = []
        arr.push(currentObj)
        this.optionUser = arr
      },
      // 需要取消
      deselectData (currentObj) {
        this.optionUser.forEach((v, i) => {if (v.userId === currentObj.userId) {this.optionUser.splice(i, 1)}})
      },
      // 组织架构的查询
      // finsUserState == 0---/sys/getUserAll ---全局组织架构人员
      // finsUserState == 1----/sys/getOptionalMember ---所有用户(排除已加入部门的人)
      // finsUserState == 2----/info/project/getMemberAll --- 项目组成员
      structureQuery() {
        let obj = {
          token: this.token,
          userId: this.userId
        }
        let url = ""
        if (this.finsUserState == 0) {
          url = '/sys/getUserAll'
          obj.data = {}
        } else if (this.finsUserState == 1) {
          url = '/sys/getOptionalMember'
        } else {
          url = '/info/project/getMemberAll'
          obj.data.projectId = this.projectId
        }
        var that = this;
        this.isShowLoading = true
        this.$post(url, obj).then(res => {
          this.isShowLoading = false
          if(!res.data || !res.data.length) return;
          res.data[0].disabled = true
          that.structureData = res.data
        }).catch(error => {
            console.log(error);
          });
      },
      // 小三角的点击
      expandClick (data) {
        this.handleNodeClick(data)
      },
      handleNodeClick (data) {
        if (!data.children && !data.lists) {
          this.optionUser.forEach(v => {
            if (v.originData && (v.uniqueKey === data.uniqueKey)) {
              this.$set(data, 'disabled', true)
            }
          })
        }
        this.defaultChecked()
      },
      // 组织架构的树级渲染
      loadNode (node, resolve) {
        // 一级节点的展示
        if (node.level === 1 && node.data.children && node.data.lists) {
          node.data.uniqueKey = (node.data.mebsize || node.data.mebsize===0) ? 'dept'+node.data.id : 'user'+node.data.userId
          node.data.disabled = (node.data.mebsize || node.data.mebsize===0) ? true : false
          // 处理children中由部门的都要禁用-----单选
          this.nodeChildrenDis(node.data.children)
          node.data.lists.forEach(v => {
            v.leaf = true
            v.uniqueKey = 'user' + v.userId
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
          node.data.disabled = (node.data.mebsize || node.data.mebsize===0) ? true : false
          node.data.lists.forEach(v => {
            v.leaf = true
            v.uniqueKey = 'user' + v.userId
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
          node.data.disabled = (node.data.mebsize || node.data.mebsize===0) ? true : false
          this.nodeChildrenDis(node.data.children)         
          node.data.lists.forEach(v => {
            v.leaf = true
            v.uniqueKey = 'user' + v.userId
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
      // 处理children中由部门的都要禁用-----单选
      nodeChildrenDis(data){
        data.forEach(v => {
          if (v.mebsize || v.mebsize == 0) {
            this.$set(v, 'disabled', true)
          }
        })
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
          res.data.forEach(v => {
            v.uniqueKey = 'rol' + v.id
            v.roleId = v.id
            v.label = v.roleName
            v.children = []
            this.$set(v, 'isExpand', false)
            this.$set(v, 'isChecked', false)
            this.$set(v, 'isIndeterminate', false)
          })
          this.roleData = res.data
        }).catch(error => {
            console.log(error);
          });
      },
      // 角色的树级渲染
      loadNodeRole (node) {
        // 判断是展开还是收起
        if(node.isExpand) {
          node.isExpand = false
          return
        }
        node.isExpand = true
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
      // 角色节点的查询及渲染
      roleNodeQuery(node) {
        let obj = {
          token:this.token,
          userId: this.userId,
          data: {
            id: node.id
          }
        }
        this.$post('/sys/listUserByRoleId', obj).then(res => {
          if (!res) return
          if (res.code !== 0) {
            this.$message.error(res.msg)
            return
          }
          let checkedLen = this.optionUser.length
          res.data.forEach(v=>{
            v.uniqueKey =  node.id + 'r'+ v.userId
            v.uniqueFlag = 'user' + v.userId
            v.roleId = node.id 
            this.$set(v, 'checked', false)
          })
          node.children = res.data
          // 如果右侧有值需要添加上
          // 回显已选人员
          if (this.optionUser.length) {
            this.displayChecked(node)
          }
        })
      },
      displayChecked (item) {
        console.log('displayChecked', this.optionUser, item)
        let key = this.tabsPage
        if(item==='all'){
          let data = key=='1'? this.roleData : this.projectData
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
      // 角色与项目前的复选框的点击处理
      handleRoleMemberCheck (node, item) {
        this.optionUser = []
        // 更新已选人员数据
        node.checked ? this.optionUser.push(node) : this.optionUser = []
        let data = this.tabsPage == 1 ? (this.isSearch1 ? this.roleSearchData : this.roleData) : this.projectData
        data.map(v => {
          v.children.map(o => {
            if (o.userId !== node.userId) {
              o.checked = false
            }
          })
        })
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
           res.data.forEach(v => {
            v.uniqueKey = 'pro' + v.id
            v.projectId = v.id
            v.isProjectNode = true
            v.children = []
            this.$set(v, 'checked', false)
            this.$set(v, 'isExpand', false)
          })
          this.projectData = res.data
          this.projectDataCopy = this.projectData
        }).catch(error => {
            console.log(error);
          });
      },
      // 项目节点的查询
      proNodeQuery(node) {
        let obj = {
          token:this.token,
          userId: this.userId,
          data: {
            id: node.id
          }
        }
        this.$post('/info/project/listUserByProjectId', obj).then(res => {
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
          node.children = res.data
          node.isExpand = true
          this.defaultChecked()
          this.displayChecked(node)
        })
      },
      // tab切换------切换列中有值则不需要进行接口调用
      handleClick(tab, event) {
        this.tabsPage = tab.index
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
        } else if (tab.index == 2 && !this.projectData.length){
          this.searchUser()
        }
        this.defaultChecked()
      },
      // 默认选中
      defaultChecked () {
        if (this.tabsPage == 0) {
          if (this.isSearch) {
            this.structureSearchData.forEach(v => {v.checked = false})
            if (this.optionUser.length) {
              this.structureSearchHandle()
            }
          } else {
            this.$refs.tree.setCheckedKeys([])
            if (this.optionUser.length) {
              this.structureSearchHandle()
            }
          }
          return
        }
        this.optionUser.length && this.displayChecked('all')
      },
      // 组织架构数据与检索数据的处理
      structureSearchHandle(){
        this.optionUser.forEach(v => {
          v.uniqueKey = 'user' + v.userId
          if (this.isSearch) {
            this.structureSearchData.forEach(v => {
               if(v.userId === currentObj.userId) {
                 v.checked = false
               }
             })
            return
          }
          this.$refs.tree.setChecked(v.uniqueKey, true)
        })
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
          this.isSearch1 = true
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
            let arr = this.setCheckedHandle(this.structureSearchData, this.optionUser)
            arr.forEach(v=> {
              v.checked = true
            })
          }
        }).catch(error => {
          console.log(error);
        });
      },
      setCheckedHandle(arr1, arr2){
        let arr = [];
        for(let item of arr1){
            if(arr2.find(v => v.userId !== item.userId)) {
                continue;
            }
            arr.push(item);
        }
        return arr;
      },
      // 角色检索的查询处理
      roleSearchQuery(){
        this.roleSearchData = []
        let searchObj = {
          token: this.token,
          userId: this.userId,
          data: {
            roleName: this.inputSearchRole
          }
        }
        this.isShowLoading = true
        this.$post("/sys/searchRoleUser", searchObj).then(res => {
          this.isShowLoading = false           
            if(!res) return
            this.isSearch1 = true
            res.data.forEach(v => {
              v.label = v.roleName
              v.children = []
              v.disabled = true
              this.$set(v, 'isExpand', false)
              this.$set(v, 'isChecked', false)
              this.$set(v, 'isIndeterminate', false)
            })
            console.log(res.data, '检索查询')
            this.roleSearchData = res.data
        }).catch(error => {
          console.log(error);
        });
      },
      // 项目检索的查询处理
      proSearchQuery(){
        console.log(123, this.inputSearchPro, this.projectData)
        let arr = []
        this.projectData.map(v => {
          if (v.name.indexOf(this.inputSearchPro) !== -1) {
            v.isProjectNode = true
            v.children = []
            arr.push(v)
          }
        })
        // arr.forEach(v => {
        //   v.isProjectNode = true
        //   v.children = []})
        this.projectData = arr
      },
      // 删除
      delect (item, index) {
        if(item.originData){
          this.$message.warning('默认抄送人员不能删除');
          return;
        }
        this.optionUser.splice(index, 1);
        // 系统角色和项目的左侧列也需要删除
        if (this.tabsPage != 0) {
          this.displayChecked('all')
          return
        }
        (!this.isSearch && this.tabsPage == 0) && this.$refs.tree.setChecked(item.uniqueKey, false)
        this.structureSearchData.forEach(v=> {
          if (v.userId === item.userId) {
            v.checked = false
          }
        })
      },
      // 确定按钮
      confirmBtn() {
        if(this.canDefine){
          this.$emit('findAllUser', this.optionUser)
        }
        this.canDefine = false;
        this.cancelBtn()
      },
      // 取消按钮
      cancelBtn() {
        this.$emit('update:findFlagShow', false); 
        this.initData()
      },
      initData () {
        // 将数据初始化
        this.optionUser = []
        this.structureData = []
        this.roleData = []
        this.projectData = []
        this.projectDataCopy = [] // 项目检索时覆盖的数据
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
      findFlagShow (val) {
        if (val) {
          this.canDefine = true;
          this.voteprojId = this.$store.state.voteprojId;
          this.finsUserState = this.findState.state;
          this.projectId = (this.voteprojId !== "") ? this.voteprojId : this.$store.state.projectMsg.pro_id
           console.log(this.findUserObj, '接收到的人员值')
          this.findUserObj && this.findUserObj.length ? this.optionUser = this.findUserObj : this.optionUser = []
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
            this.isSearch1 = false
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
<style lang="scss">
  .findall-parent {
    .el-dialog__header {
      text-align: center;
      border-bottom: 1px solid #dedede!important;
      border-radius: 4px 4px 0 0;
    }
  }

</style>
<style lang="scss"  scoped>


  .findall-parent .el-dialog {
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

      .right-box, .left-box {
    border:1px solid #ddd;padding:12px;
    height: 480px;
    position: relative;
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
      width: 35px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 7px;
      flex-shrink: 0;
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
    display: flex;
    align-items: center;
    width: 50%;
  }
  .ell-name{
    margin-left:5px;
    cursor:pointer;
  }

  }
  

</style>
