<template>

  <el-select
    size="medium"
    v-model="currentVal"
    :filterable="filterable"
    :clearable="clearable"
    :multiple="multiple"
    @change="handleSelectionChange"
    @visible-change="updateProject"
    :filter-method="filterList"
    :placeholder="placeholder" 
    v-el-select-loadmore="loadmore" 
    popper-class="title_select_dropdown">
      <el-option 
      v-for="item in renderList" 
      :key="item.id" 
      :label="item.name" 
      :value="item.id" 
      :title="item.name"></el-option>
  </el-select>

</template>

<script>
let listAll = []
let listTemp = []
let listTempSearch = []
    export default {
      name: "SelectLayLoad",
      props: {
        filterable: {
          default: true,
          type: Boolean
        },
        clearable: {
          default: true,
          type: Boolean
        },
        placeholder: {
          default: '请选择',
          type: String
        },
        multiple: {
          default: false,
          type: Boolean

        },
        val: {
          default: '',
          type: String
        },
        list: {
          default: [],
          type: Array
        }
      }
      ,

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
            currentVal: '', // 当前选中值
            preVal: '', // 用来保存上一次选中项
            renderList: [], // 渲染的数据列表
            searchList: [], // 查询结果列表
            oldList:[], // 查询之前的渲染的列表
            isSearch: false // 是否是搜索状态
          }
      },
      created () {},
      methods: {
        init(){
          listAll = this.$utils.cloneDeepArray(this.list)
          // 处理初次渲染的数据
          this.handleRenderList()
          // 回显数据
          if(this.val) {
            this.preVal = this.currentVal = this.val 
          }

        },

        filterList(query = "") {
          
            this.isSearch = true
            listTempSearch = listAll.filter(item => {
              return item.name.indexOf(query)>-1
            });
            this.renderList = listTempSearch.splice(0, 10);

        },

        loadmore() {
          if(this.isSearch) {
             this.renderList = [...this.renderList, ...listTempSearch.splice(0, 10)]
             return
          }
           this.renderList = [...this.renderList, ...listTemp.splice(0, 10)]
        },

        /**
         * 打开下拉框，更新项目
         * @param val
         */
        updateProject(val){
          !val && this.handleRenderList()

          this.isSearch = false
          if(!val) return
          this.preVal = this.currentVal;
          
        },

        handleRenderList(){
          listTemp = this.$utils.cloneDeepArray(listAll)
          let idx = listTemp.findIndex(v=>v.id == this.currentVal)
          this.renderList = listTemp.splice(idx, 1)
             
          this.renderList = [...this.renderList, ...listTemp.splice(0, 9)]
          // console.log(1233, this.renderList)

        },


        /**
         * 选择
         */
        handleSelectionChange(val){
          // 项目任务，单独处理

        }
      },
      computed:{

      },
      watch: {
        list(val){
          // console.log('list-watch', val)
          this.init()
        },

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
