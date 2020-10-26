<template>
    <div class="toggle-project-container">
      <i class="iconfont jianzhu project-company-select color-primary"></i>
      <el-select
        size="medium"
        v-model="currentProjectId"
        filterable
        :clearable="type==='sponsor'"
        @change="toggleProject"
        @visible-change="updateProject"
        :filter-method="filterList"
        placeholder="请选择项目" 
        v-el-select-loadmore="loadmore" 
        popper-class="title_select_dropdown">
        <el-option 
        v-for="item in renderList" 
        :key="item.id" 
        :label="item.name" 
        :value="item.id" 
        :title="item.name"></el-option>
      </el-select>
    </div>
</template>

<script>
let projectListAll = []
let projectTemp = []
let projectTempSearch = []
    export default {
      name: "ToggleProject",

      directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight + 1;
                    // console.log('condition', condition, this.scrollHeight - this.scrollTop, this.clientHeight)
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
      },

      data (){
          return {
            currentProjectId: '', // 当前项目id
            oldProjectId: '', // 用来保存上一次选中项
            projectList: [],
            renderList: [],
            searchList: [],
            isSearch: false,
            oldList:[]
          }
      },
      props:[
        'permission', // 权限编码
        'type', // 页面标识
        'reset', // 是否回显项目管理的项目
        'projectId' // 要回显的项目id
      ],
      created () {
        this.getProjectList()
      },
      methods: {
        filterList(query = "") {
          // console.log(12, query)
            this.isSearch = true
            projectTempSearch = projectListAll.filter(item => {
              return item.name.indexOf(query)>-1
            });
            this.renderList = projectTempSearch.splice(0, 10);

        },

        loadmore() {
          if(this.isSearch) {
             this.renderList = [...this.renderList, ...projectTempSearch.splice(0, 10)]
             return
          }
           this.renderList = [...this.renderList, ...projectTemp.splice(0, 10)]
        },

        /**
         * 打开下拉框，更新项目
         * @param val
         */
        updateProject(val){
          !val && this.handleRenderList()

          this.isSearch = false
          if(!val) return
          this.oldProjectId = this.currentProjectId;
          
        },
        /**
         * 获取项目列表
         */
        getProjectList(){
          var data = {
            token: this.token,
            userId: this.userId,
            data: {}
          };
          // 发起审批--> 选择项目 更换接口 为 info/project/listSimpleProjectListByAudit 出入参不变 为了不查询终止项目
          let url = this.type==='sponsor' ? 'info/project/listSimpleProjectListByAudit' : '/info/project/getSimpleProjectList'
          this.$post(url, data)
            .then((response)=> {
              if (response.code !== this.code.codeNum.SUCCESS) {
                this.$message.error(response.message)
                return
              }
              if(!response.data || !response.data.length){
                this.$message.error('没有权限')
                return
              }
              projectTemp = response.data
              projectListAll = this.$utils.cloneDeepArray(response.data)
              // 设置当前项目
              if(this.projectId) {
                this.currentProjectId = projectTemp.find(v => v.id == this.$store.state.projectMsg.pro_id) ? +this.projectId : ''
              } else if(!this.reset){
                this.currentProjectId = projectTemp.find(v => v.id == this.$store.state.projectMsg.pro_id) ? +this.$store.state.projectMsg.pro_id : ''
              }

              this.handleRenderList()

            }, err=>{
              this.$message.error(err.message)
            })
        },

        handleRenderList(){

          projectTemp = this.$utils.cloneDeepArray(projectListAll)
          let idx = projectTemp.findIndex(v=>v.id == this.currentProjectId)
          this.renderList = projectTemp.splice(idx, 1)
             
          this.renderList = [...this.renderList, ...projectTemp.splice(0, 9)]

        },


        /**
         * 选择、切换项目
         */
        toggleProject(){
          
          // 发起审批页单独处理
          if(this.type==='sponsor'){
            let obj = projectListAll.find(v=>v.id===this.currentProjectId)
            this.$emit('change-project', obj)
            return
          }
          // 处理项目权限，更新项目信息
          this.updateProjectMsg()

        },
        // 更新项目权限及项目信息
        updateProjectMsg() {
          var editObj = {
            token: this.token,
            userId: this.userId,
            projectId: this.currentProjectId,
            data: {
              projectId: this.currentProjectId
            }
          };
          this.$post("/info/project/getProjectPerm", editObj)
            .then((response)=> {
              if (response.code == this.code.codeNum.SUCCESS) {
                let accessList = response.data
                this.$store.commit('setProjectPerm', accessList)

                // 根据code判断相应的权限
                if(this.permission) {
                  let hasAccess = accessList.indexOf(this.permission)>-1
                  if(!hasAccess){
                    [this.currentProjectId,this.oldProjectId] = [this.oldProjectId,this.currentProjectId]
                    this.$message.error("没有权限")
                    return
                  }
                }

                // 获取当前项目信息
                let curProject = projectListAll.find(v=>v.id===this.currentProjectId)
                if(!curProject) {
                  this.$message.error('项目不存在')
                  return
                }
                this.$store.commit("projectId",this.currentProjectId);
                this.$store.commit("projectMsg",curProject);
                this.$store.commit("projectMsgname",curProject.name);
                this.$utils.saveProjectId(this.currentProjectId);
                this.$emit('change-project', curProject);
                this.$utils.queryProChatNum(this.currentProjectId);
                this.$utils.queryProExamNum(this.currentProjectId);
              } else {
                this.$message.error(response.msg);
              }
            }, err=>{
              this.$message.error(err.message)
            })
        }
      },
      computed:{
        curProjcetId() {
            return this.$store.state.projectMsg.pro_id;
        }
      },
      watch: {
        curProjcetId(){
            this.handleRenderList()
            this.currentProjectId = +this.$store.state.projectMsg.pro_id || '';
        }
      },
      beforeDestroy(){
        this.renderList = []
      }
    }
</script>

<style lang="scss">
.toggle-project-container .title_select_dropdown {
  width: 200px;
}
</style>

<style scoped>
  .toggle-project-container {
    display: flex;
    align-items: center;
    text-align: left;
    padding-bottom: 10px;
    background: #ffffff;
  }
  .project-company-select{
    width: 26px;
    height: 26px;
    font-size: 26px;
    margin-right: 5px;
  }

</style>
