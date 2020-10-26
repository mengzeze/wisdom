<template>
  <div id="project-catalog">
    <el-dialog title="选择目录"
               center
               :close-on-click-modal="false"
               :visible="catalogShow"
               @close="clickEvent">
      <div class="project-content">
        <div class="left_tree">
          <nav>选择目录</nav>
          <section>
            <el-input class="project-search"
                      placeholder="输入关键字进行搜索"
                      @keyup.enter.native="query(1)"
                      clearable
                      v-model="filterText">
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="query(1)"></el-button>
            </el-input>

            <div style="height:482px"
                 v-loading.lock="isShowLoading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading">
              <el-scrollbar style="height:100%">
                <el-tree class="filter-tree"
                         :data="treeData"
                         :props="defaultProps"
                         show-checkbox
                         node-key="id"
                         check-on-click-node
                         default-expand-all
                         @check="handleCheck"
                         @node-click="handleNodeClick"
                         ref="tree2">
                  <span class="custom-tree-node"
                        slot-scope="{ node, data }">
                    <span class="custom-tree-node-span">
                      <span class="elipet1">
                        <!-- close_icon -->
                        <img v-if="data.chiled && data.chiled.length > 0"
                             src="@/assets/manuscript_icon/open_icon.png">
                        <img v-else
                             src="@/assets/manuscript_icon/close_icon.png">
                        <i :class="node.icon"></i>
                        <span :title="data.docName">{{ data.docName}} {{ isShowDocNum ? `(${data.docNum})` : '' }}</span>
                      </span>
                    </span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </div>
          </section>
        </div>

        <div class="right_tree">
          <nav>已选目录</nav>
          <section>
            <el-scrollbar style="height:100%">
              <ul>
                <li v-for="(item, ind) in optionCatalog"
                    class="user_list"
                    :key="ind">
                  <span class="userImg-box1">
                    <img src="@/assets/manuscript_icon/open_icon.png">
                  </span>
                  <span class="opt_name" :title="item.docName">{{ item.docName}} {{ isShowDocNum ? `(${item.docNum})` : '' }}</span>
                  <i @click="delect(item)"
                     class="el-icon-delete fr"
                     style="cursor:pointer;"></i>
                </li>
                <li v-if="!optionCatalog.length"
                    class="pop_no_select_item_tips">暂无选中项</li>
              </ul>
            </el-scrollbar>
          </section>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="medium"
                   @click="clickEvent">取 消</el-button>
        <el-button size="medium"
                   type="primary"
                   @click="surnBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'projectCatalog',
  props: ['catalogShow', 'catalogData', 'calaLogObj', 'isShowDocNum'],
  components: {
  },
  computed: {
    searchSite () {
      return this.filterText;
    }
  },
  data () {
    const data = [{
      id: 1,
      docName: "宋雪融资项目asdasdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      docNum: 11,
      parentId: 148,
      chiled: [{
        id: 4240,
        docName: "会议0",
        docNum: 12,
        parentId: 148,
        chiled: [{
          id: 4241,
          docName: "会议初1",
          docNum: 1,
          parentId: 148,
          chiled: [{
            id: 4242,
            docName: "会议初始2",
            docNum: 33,
            parentId: 148,
            chiled: null
                            },
            {
              id: 42421,
              docName: "会议初始2-1",
              docNum: 33,
              parentId: 148,
              chiled: null
                            }]
        }]
      },
        {
          id: 4251,
          docName: "会议44",
          docNum: 12,
          parentId: 148,
          chiled: [{
            id: 4252,
            docName: "会议初451",
            docNum: 1,
            parentId: 148,
            chiled: [{
              id: 4253,
              docName: "会议初始452",
              docNum: 33,
              parentId: 148,
              chiled: [{
                id: 42566,
                docName: "会议初始452",
                docNum: 33,
                parentId: 148,
                chiled: null
                                },
                {
                  id: 6765678,
                  docName: "会议初始4556",
                  docNum: 33,
                  parentId: 148,
                  chiled: null
                                }]
            },
              {
                id: 466,
                docName: "会议初始4556",
                docNum: 33,
                parentId: 148,
                chiled: null
                            },
              {
                id: 462,
                docName: "会议初始4556",
                docNum: 33,
                parentId: 148,
                chiled: null
                            },
              {
                id: 461,
                docName: "会议初始4556",
                docNum: 33,
                parentId: 148,
                chiled: null
                            }]
          }]
        }]
    }
    ]
    return {
      token: '',
      userId: '',
      projectId: '',
      isShowLoading: false,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: "chiled",
        label: "docName"
      },
      optionCatalog: [],
      checkDisable: false,
      getDocName: [],
      getChildId: []
    }
  },
  created () {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.projectId = this.catalogData.projectId
    this.success_code = this.code.codeNum.SUCCESS;
  },
  mounted () {
    // this.query()
  },
  methods: {
    // 过滤
    filterNode (value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 取消
    clickEvent () {
      this.$emit('update:catalogShow', false);
    },
    // 查询
    query (val) {

      let obj = {
        data: {
          fileList: this.catalogData.data.fileList,
          docSource: this.catalogData.data.docSource,
          projectId: this.catalogData.projectId,
          docName: val ? this.filterText : '',
          isTile: false
        },
        token: this.token,
        userId: this.userId,
        projectId: this.catalogData.projectId
      }
      this.isShowLoading = true;
      this.$post('/info/audit/getDirHieraForFileRecord', obj).then(res => {
        this.isShowLoading = false;
        if (!res.data || !res.data.length) {
          this.data = []
          return
        };
        this.treeData = res.data
        console.log(this.calaLogObj, 111, this.optionCatalog)
        if (this.optionCatalog.length && val) {
          setTimeout(() => {
            this.getHandleCheck(this.optionCatalog)
          }, 300)
        }
      })
    },
    getHandleCheck (data) {
      data.forEach(v => {
        this.$refs.tree2.setChecked(v.id, true)
        if (v.chiled && v.chiled.length) {
          this.getHandleCheck(v.chiled)
        }
      })
    },
    handleCheck (currentObj, treeStatus) {
      console.log('handleCheck', currentObj, this.optionCatalog, this.optionCatalog.findIndex(v => v.id === currentObj.id))
      // 没有则添加
      if (this.optionCatalog.findIndex(v => v.id === currentObj.id) < 0) {
        this.optionCatalog.push(currentObj)
        this.$refs.tree2.setChecked(currentObj.id, true)
        return
      }
      this.optionCatalog.forEach((v, i) => { if (v.id === currentObj.id) { this.optionCatalog.splice(i, 1) } })
      this.optionCatalog.forEach(v => { this.$refs.tree2.setChecked(v.id, true) })
    },
    // 节点的点击
    handleNodeClick (data, val) {
      console.log(data, 232, val)
    },
    setDelData (item) {
      if (item.chiled && item.chiled.length > 0) {
        item.chiled.map(v => {
          if (v.chiled && v.chiled.length) {
            v.chiled.forEach(m => {
              this.$refs.tree2.setChecked(m.id, false)
              this.setDelData(m)
            })
          }
          this.$refs.tree2.setChecked(v.id, false)
        })
      }
    },
    // 删除
    delect (item) {
      console.log(item, this.optionCatalog)
      let index = this.optionCatalog.findIndex(text => text.id === item.id);
      this.optionCatalog.splice(index, 1);
      // 删除需要删除它的子集
      if (item.chiled && item.chiled.length) {
        this.setDelData(item)
      }
      this.$refs.tree2.setChecked(item.id, false)
      this.checkDisable = true
      if (this.optionCatalog.length) {
        this.optionCatalog.map(v => { this.$refs.tree2.setChecked(v.id, true) })
      }
    },
    // 确定时将所有的选中的child中的id和docName取出来
    getChildHandle (data) {
      data.forEach(v => {
        if (v.chiled && v.chiled.length) {
          this.getChildId.push(v.id)
          this.getDocName.push(v.docName)
          this.getChildHandle(v.chiled, 0)
        }
        this.getChildId.push(v.id)
        this.getDocName.push(v.docName)
      })
    },
    surnBtn () {
      console.log(this.optionCatalog, '选择的值')
      if (this.optionCatalog.length >= 1) {
        this.getChildId = []
        this.getDocName = []
        this.getChildHandle(this.optionCatalog)
      }
      if (!this.optionCatalog.length) {
        this.getChildId = []
        this.getDocName = []
      }

      this.getDocName = [...new Set(this.getDocName)]
      this.getChildId = [...new Set(this.getChildId)]
      let docNamelist = ''
      this.getDocName.forEach(v => {
        docNamelist += v + '、'
      })
      let docName = ''
      this.optionCatalog.map(v => { docName += v.docName + '、' })
      let data = {
        ids: this.getChildId,
        idsName: docName,
        docNameList: docNamelist
      }
      this.$emit('catalogFun', data);
      this.$emit('update:catalogShow', false);
      this.filterText = ''
    }
  },
  watch: {
    catalogShow (val) {
      if (val) {
        if (this.calaLogObj && this.calaLogObj.length) {
          console.log(this.calaLogObj, 2365, this.optionCatalog)
          // this.$refs.tree2.setCheckedKeys(this.calaLogObj)
          this.query(1)
          return
        }
        this.optionCatalog = []
        this.query()
      }
    },
    searchSite (newValue, oldValue) {
      if (newValue == "" || newValue == undefined || newValue == null) {
        this.query(1);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.project-content {
  display: flex;
  justify-content: space-between;
  height: 550px;
  /deep/ .el-scrollbar__view {
    white-space: nowrap;
    .el-tree > .el-tree-node {
      min-width: 100%;
      display: inline-block;
    }
  }
}
.left_tree,
.right_tree {
  width: 49%;
}
.left_tree section,
.right_tree section {
  height: 100%;
  border: 1px solid #cccccc;
  margin-top: 5px;
}
.dialog-footer {
  text-align: right;
}
.project-search {
  padding: 10px;
  width: 95%;
}
.elipet1 {
  font-size: 14px;
}
.elipet1 img,
.userImg-box1 img {
  width: 18px;
  height: 14px;
}
.right_tree ul {
  padding: 10px 0;
}
.user_list {
  height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.opt_name {
  width: 85%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}
</style>