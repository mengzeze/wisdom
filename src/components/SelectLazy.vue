<template>
  <el-select
    v-model="currentVal"
    v-el-select-loadmore="loadmore"
    :size="size"
    :filterable="filterable"
    :clearable="clearable"
    :multiple="multiple"
    :disabled="(disabled || isDisabled)"
    :filter-method="filterList"
    :placeholder="placeholder"
    :popper-class="popperClass"
    @change="handleSelectionChange"
    @visible-change="updateRenderList"
    @clear="handleClear"
  >
    <el-option
      v-for="item in renderList"
      :key="item[options.value]"
      :value="item[options.value]"
      :label="item[options.label]"
      :title="item[options.label]"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectLazy',

  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          /**
          * scrollHeight 获取元素内容高度(只读)
          * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
          * clientHeight 读取元素的可见高度(只读)
          * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
          * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
          */

          //  加1是为了避免计算误差
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight + 1;
          condition && binding.value();

        });
      }
    }
  },
  model: {
    prop: 'val',
    event: 'select'
  },
  props: {
    val: { // 接收到的v-model
      default: '',
      type: [String, Number,Array]
    },
    filterable: { // 是否可搜索
      default: false,
      type: Boolean
    },
    clearable: { // 是否可清空
      default: false,
      type: Boolean
    },
    placeholder: {
      default: '请选择',
      type: String
    },
    multiple: { // 多选
      default: false,
      type: Boolean

    },
    disabled: { // 禁用
      default: false,
      type: Boolean
    },
    list: { // option数据列表
      default() { return [] },
      required: true,
      type: Array
    },
    options: { // label和value字段配置
      type: Object,
      default: () => {
        return {
          label: 'name',
          value: 'id'
        }
      }
    },
    popperClass: {
      type: String,
      default: 'select-popper-class'
    },
    size: {
      type: String,
      default: 'medium'
    },
    remote: {
      default: false,
      type: Boolean
    },
    active: {
      default: 0,
      type: Number
    }
    // remoteMethod: {
    //   type: Function
    //   // default:
    // },

  },

  data() {
    return {
      currentVal: '', // 当前选中值
      oldVal: '', // 用来保存上一次选中项
      renderList: [], // 渲染的数据列表
      searchList: [], // 查询结果列表
      oldList: [], // 查询之前的渲染的列表
      isSearch: false, // 是否是搜索状态
      curPageNo: 1, // 远程搜索懒加载页码
      queryContent: '', // 查询客户名称关键字
      listAll: [],
      listTemp: [],
      listTempSearch: [],
      isDisabled: true // 默认数据没有加载完时为禁用状态



    }
  },
  computed: {
    hasOption() {
      return this.renderList.length > 0
    }
  },
  watch: {
    list(val) {
      this.init()
    },
    val(val) {
      console.log('val', val)
      this.oldVal = this.currentVal = val
    }

  },
  created() {
    console.log('this.options', this.options)
    this.init()
    this.isDisabled = false
  },
  beforeDestroy() {
    this.renderList = []
  },
  methods: {
    remoteMethod(query) {
      this.isSearch = true
      this.queryContent = query
      this.curPageNo = 1
      this.queryData()
    },

    queryData() {
      let data = {
        pageNo: this.curPageNo,
        data: {
          name: this.queryContent
        }
      }
      this.$post('/info/crm/companyName', data).then((response) => {
        var data = response.data.list;
        if (response.code == 0) {
          var loadData = data;
          for (var i = 0; i < data.length; i++) {
            loadData[i].label = data[i].name;
            loadData[i].value = data[i].id;
          }
          this.renderList = this.curPageNo === 1 ? loadData : [...this.renderList, ...loadData];
        }
      }).catch(function(error) {
        console.log(error);
      });
    },

    /**
      初始化：
      深克隆list,防止被污染；
      处理renderList;
      处理回显数据
      */
    init() {
      // 回显数据
      if (this.active) {
        this.oldVal = this.currentVal = this.active
      }
      if (this.val) {
        this.oldVal = this.currentVal = this.val
      }
      // TODO处理远程搜索：

      this.listAll = this.$utils.cloneDeepArray(this.list)
      // 处理初次渲染的数据
      this.handleRenderList()

    },
    remoteInit() {
      // 查询第一页数据
      // 如果需要回显，判断第一页数据是否包含在第一页数据中，如果不在则查询到当前item数据，放入renderlist

    },

    /**
      * 下拉框刷选
      * @param query: 搜索关键字
      */
    filterList(query = '') {
      this.isSearch = true
      if (this.remote) {
        this.curPageNo = 1
        this.queryContent = query
        this.queryData()
        return
      }
      this.listTempSearch = this.listAll.filter(item => {
        return item[this.options.label].indexOf(query) > -1
      });
      this.renderList = this.listTempSearch.splice(0, 10);
    },

    loadmore() {
      if (this.remote) {
        this.handleRemoteLoadMore()
        return
      }
      if (this.isSearch) {
        this.renderList = [...this.renderList, ...this.listTempSearch.splice(0, 10)]
        return
      }
      this.renderList = [...this.renderList, ...this.listTemp.splice(0, 10)]
    },

    handleRemoteLoadMore() {
      this.curPageNo++
      this.queryData()
    },


    /**
     * 打开下拉框，更新项目列表
     * @param val: true 打开, false: 关闭
     */
    updateRenderList(val) {
      console.log(val, this.isSearch)

      // 关闭选项框，如果之前是搜索选中，需恢复原有选项列表
      if (!val) {
        if (this.isSearch) {
          this.queryContent = ''
          this.handleRenderList()
        }
      }
      // !val && this.isSearch && this.handleRenderList()

      this.isSearch = false
      if (!val) return
      this.oldVal = this.currentVal;

    },

    handleRenderList() {
      this.listTemp = this.$utils.cloneDeepArray(this.listAll)
      // 首先获取当前选中选项
      let idx = this.listTemp.findIndex(v => v[this.options.value] == this.currentVal)
      this.renderList = this.listTemp.splice(idx, 1)
      // 当前选中选项 + 后续9项
      this.renderList = [...this.renderList, ...this.listTemp.splice(0, 9)]
      // console.log('handleRenderList', this.renderList)

    },


    /**
     * 选择
     */
    handleSelectionChange(val) {
      this.$emit('select', val)
      this.$emit('change', val)
      let item = this.renderList.find(v => val === v[this.options.value])
      this.$emit('item', item)
    },
    handleClear() {
      this.$emit('clear')
    },

    // 方法：父组件调用。权限or业务判断，恢复上一次的选项
    recoverySelect(errMsg) {
      [this.currentVal, this.oldVal] = [this.oldVal, this.currentVal]
      this.$message.error(errMsg)
    }


  }
}
</script>

<style lang="scss">
.toggle-project-container .select-popper-class {
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
