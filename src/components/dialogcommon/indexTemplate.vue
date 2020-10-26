<template>
  <div class="index-template-box">
    <el-dialog
      :visible.sync="innerVisible"
      :title="title"
      :close-on-click-modal="false"
      width="70%"
      top="70px"
    >
      <div class="content-box flex j-spaceBetween" ref="contentBox">
        <div class="content-l" ref="contentL">
          <business-tree
            @method="treeNodeClick"
            @load="treeNodeClick"
            @noSearchBus="busDisable"
            :search="true"
            :general="false"
            :shadeShow="false"
            :isShowCurrentBus="true"
            :prot="['project']"
            ref="businessTree"
          ></business-tree>
        </div>

        <div class="content-r" ref="contentR">
          <div class="content-r-top">
            <!-- 业务类型下有目录内容  -->
            <el-scrollbar style="height:100%">
              <div
                class="dir-box"
                v-for="(item,index) in dataList"
                :key="index"
                @click="cardHandleClick($event)"
              >
                <!-- 业务类型标题 -->
                <div
                  :class="['dir-box-title','border-primary','ellipsis1',{'border-none':item[config.customData.financeId] != treeBusId}]"
                  :data-fid="item[config.customData.financeId]"
                  :title="item[config.dataFormat.title]"
                >{{item[config.dataFormat.title]}}{{item[config.customData.financeId] == financingId ?'（当前业务类型）':''}}</div>
                <!-- v-if="item[config.dataFormat.children].length !== 0" -->
                <template
                  v-if="item[config.dataFormat.children] && item[config.dataFormat.children].length !== 0"
                >
                  <!-- is-current-bus含有此class 为当前业务类型 -->
                  <div
                    :class="['dir-box-content','flex-wrap','flex',{'is-current-bus':item[config.customData.financeId] == financingId}]"
                    :data-fid="item[config.customData.financeId]"
                  >
                    <div
                      class="dir-box-item"
                      ref="dirItem"
                      item-current
                      v-for="(dirItem,index) in item[config.dataFormat.children]"
                      :key="index"
                      :data-id="dirItem[config.customData.id]"
                      :data-temname="dirItem[config.dataFormat.temTit]"
                      :data-financeid="item[config.customData.financeId]"
                    >
                      <div
                        class="preview-link clearfix color-primary"
                        :data-id="dirItem[config.customData.id]"
                      >预览</div>
                      <div
                        class="dir-box-item-msg ellipsis1"
                        item-current
                        :title="item[config.dataFormat.title]"
                      >{{item[config.dataFormat.title]}}</div>
                      <div
                        class="dir-box-item-tit flex j-spaceBetween"
                        item-current
                        :title="dirItem[config.dataFormat.temTit]"
                      >
                        <div
                          class="dir-box-item-tit-l ellipsis1"
                          item-current
                        >{{dirItem[config.dataFormat.temTit]}}</div>
                        <div class="dir-box-item-tit-r" item-current>
                          <i class="iconfont duihao1 suc-icon" item-current></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <!--  v-else -->
                <template v-else>
                  <div
                    v-if="item[config.customData.financeId] == financingId"
                    class="dir-box-empty is-current-bus flex a-center"
                  >
                    <div class="tit-box">
                      <div class="tit-t">{{config.emptyCurrentTit[0]}}</div>
                      <div class="tit-b">{{config.emptyCurrentTit[1]}}</div>
                    </div>
                  </div>
                  <div v-else class="dir-box-empty">暂无数据</div>
                </template>
              </div>
            </el-scrollbar>
          </div>
          <div class="content-r-bottom">
            <el-button size="small" type="primary" @click="confirm">确认</el-button>
            <el-button size="small" @click="jumpOver">跳过</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "indexTemplate",
  props: {
    source: {
      /**
       * 引用来源
       * 1. 任务模板引用
       * 2. 底稿引用目录
       */
      type: Number,
      default: 1
    },
    visible: {
      // 显示控制
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerVisible: false,
      currentDataId: "", // 当前点击数据的id
      currentDataTemName: "",
      currentDataFinanceId: "",
      treeNodeData: {}, // 树节点数据
      financingId: this.$store.state.projectMsg.projectMsg.financingId,
      dataList: [],
      treeBusDisableId:''
    }
  },
  created() {},
  mounted() {},
  computed: {
    // dialog Title
    title() {
      return this.config.title
    },
    /**
     * 根据来源配置
     * requestUrl 请求接口
     * requestData 请求data
     * customData 自定义属性的映射
     */
    globalConfig() {
      return {
        1: {
          title: "选择任务模板",
          emptyCurrentTit: ["该业务类型没有匹配的任务模板","（请联系管理员为该业务类型配置任务模板）"],
          requestUrl: "/info/taskTpl/getChooseTplList",
          requestData: {
            data: {}
          },
          customData: {
            // 自定义属性 可以自定义映射
            id: "id", // 模版id
            financeId: "id" // 业务类型id
          },
          dataFormat: {
            // 自定义展示内容
            title: "label",
            children: "children",
            temTit: "label"
          },
          confirmMsg: "未选择任务模板，请选中对应模板后重试" // 确认时为空时提示语
        },
        2: {
          title: "引用目录",
          emptyCurrentTit: ["该业务类型没有匹配的目录","（请联系管理员为该业务类型配置目录）"],
          requestUrl: "/doc/paper/getRootSysCatalogsByGroup",
          requestData: {
            data: {}
          },
          customData: {
            // 自定义属性 可以自定义映射
            id: "id", // 模版id
            financeId: "id" // 业务类型id
          },
          dataFormat: {
            // 自定义展示内容
            title: "name",
            children: "cataLogs",
            temTit: "docName"
          },
          confirmMsg: "未选择目录模板，请选中对应模板后重试"
        }
      }
    },
    config() { // 组件config
      return this.globalConfig[this.source]
    },
    treeBusId() {
      return this.treeBusDisableId || this.treeNodeData.id
    }
  },
  methods: {
    // 业务类型在树中没有找到
    busDisable(id) {
      this.treeBusDisableId = id
      this.scrollJq(id)
    },
    /**
     * 解决classList IE兼容问题
     * @param {Object} EL 要操作的DOM元素
     * @param {String} TYPE 操作类型
     * @param {String} LIST 要操作的class
     * @desc  this.classListPolyFill(element,"remove","active-item", "background-primary")
     */
    classListPolyFill() {
      const [EL,TYPE, ...LIST] = arguments
      LIST.forEach(classItem => {
        EL.classList[TYPE](classItem)
      })
    },
    /**
     * 手动设置选中项
     * @param {Number | String} id 模板id
     */
    setSelTemplate(id) {
      if (id == this.currentDataId) return
      this.$refs.dirItem.forEach(item => {
        item.dataset.id == id
          ? this.classListPolyFill(item,"add","active-item", "background-primary")
          : this.classListPolyFill(item,"remove","active-item", "background-primary")
        item.dataset.id == id && (this.currentDataId = id)
      })
    },
    cardHandleClick(event) {
      const targetElm = event.target
      // 单击事件
      if (targetElm.hasAttribute("item-current")) {
        let parentElm = targetElm.matches(".suc-icon")
          ? targetElm.parentElement.parentElement.parentElement
          : targetElm.matches(".dir-box-item-tit-l,.dir-box-item-tit-r")
          ? targetElm.parentElement.parentElement
          : targetElm.matches(".dir-box-item-msg,.dir-box-item-tit")
          ? targetElm.parentElement
          : targetElm
        // 不是当前业务类型
        if (!parentElm.parentElement.matches(".is-current-bus")) return
        this.$refs.dirItem.forEach(item => {
          // item.classList.remove("active-item", "background-primary")
          this.classListPolyFill(item,"remove","active-item", "background-primary")
        })
        // 判断点击的id和当前的id是否相同
        this.currentDataId != parentElm.dataset.id &&
          this.classListPolyFill(parentElm,"add","active-item", "background-primary")
        this.currentDataId =
          this.currentDataId == parentElm.dataset.id ? "" : parentElm.dataset.id
        this.currentDataTemName = parentElm.dataset.temname
        this.currentDataFinanceId = parentElm.parentElement.dataset.fid
        return
      }
      // 预览点击
      if (targetElm.matches(".preview-link")) {
        const parentElm = targetElm.parentElement
        const { id, financeid, temname } = parentElm.dataset
        this.$emit("preview", { id, financeid, temname })
      }
    },
    // 取消按钮
    jumpOver() {
      this.innerVisible = false
    },
    // 确认按钮
    confirm() {
      if (this.currentDataId == "") {
        this.$message.warning(this.config.confirmMsg)
        return
      }
      if (this.source === 2) {
        this.$confirm("引用后，当前目录将会清空！", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "我已确认",
          distinguishCancelAndClose: true,
          type: "warning"
        })
          .then(() => {
            this.innerVisible = false
            this.$emit("confirm", this.currentDataId)
          })
          .catch(action => {})
        return
      }
      this.innerVisible = false
      this.$emit("confirm", {
        id: this.currentDataId,
        financeid: this.currentDataFinanceId,
        temname: this.currentDataTemName
      })
    },
    // 树点击
    treeNodeClick(data, node) {
      console.log(data, node)
      if (!data) return
      this.treeBusDisableId = ''
      this.treeNodeData = data
      // 递归最末级
      const getLastNode = node => {
        if (node.childNodes === null || node.childNodes.length === 0) {
          this.treeNodeData = Array.isArray(node.data)
            ? node.data[0]
            : node.data
          return
        }
        getLastNode(node.childNodes[0])
      }
      getLastNode(node)
      this.scrollJq()
    },
    scrollJq(id = this.treeBusId) {
      // jQ滚动方法
      this.$nextTick(() => {
        $(".index-template-box .el-scrollbar__wrap").animate(
          {
            scrollTop: $(
              `.dir-box .dir-box-title[data-fid=${id}]`
            ).prop("offsetTop")
          },
          300
        )
      })
    },
    // 查询方法
    queryListData() {
      this.$post(this.config.requestUrl, this.config.requestData).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message.warning(res.msg)
          return
        }
        this.dataList = res.data
        this.scrollJq()
      })
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal === oldVal) return
      this.innerVisible = newVal
    },
    innerVisible(newVal, oldVal) {
      if (newVal === oldVal) return
      this.$emit("update:visible", newVal)
      // 在这可以进行弹框显示的数据处理及清空操作
      if (newVal) {
        this.financingId = this.$store.state.projectMsg.projectMsg.financingId
        this.queryListData()
        this.$nextTick(() => {
          this.$refs.businessTree.activeSelNode(this.financingId)
          this.$refs.contentR.style.width = `${this.$refs.contentBox.offsetWidth - this.$refs.contentL.offsetWidth}px`
        })
        return
      }
      this.$refs.dirItem.forEach(item => {
        this.classListPolyFill(item,"remove","active-item", "background-primary")
      })
      this.$refs.businessTree.select = ''
      this.currentDataId = ""
    }
  }
}
</script>

<style lang="scss" scoped>
// 右侧目录展示样式
.dir-box {
  text-align: left;
  padding-bottom: 10px;
  &-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding-left: 5px;
    border-left: 5px solid;
    line-height: 19px;
    transition: .3s;
  }
  &-title.border-none {
    border: none;
    padding-left:0;
  }
  // 当前业务类型样式
  &-content.is-current-bus {
    .dir-box-item {
      width: 31%;
      height: 140px;
      margin: 10px 1% 5px 0;
      display: inline-block;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
      .suc-icon {
        font-size: 25px;
        color: #1ad53d;
        display: none;
      }
      .preview-link {
        float: right;
        margin: 10px 15px 0 0;
      }
      &-msg {
        color: rgba(51, 51, 51, 0.4);
        margin: 50px 0 10px 12px;
        font-size: 26px;
      }
      &-tit {
        margin-left: 12px;
        font-size: 16px;
        padding-right: 15px;
        color: rgba(51, 51, 51, 1);
      }
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
    .dir-box-item.active-item {
      .preview-link {
        color: #fff !important;
      }
      .suc-icon {
        display: inline-block;
      }
      .dir-box-item-tit {
        color: #fff;
      }
      .dir-box-item-msg {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  // 其他业务类型样式
  &-content:not(.is-current-bus) {
    .dir-box-item {
      width: 23%;
      height: 110px;
      margin: 10px 1% 5px 0;
      display: inline-block;
      border: 1px solid rgba(220, 223, 230, 1);
      background-size: 74px 60px;
      background: rgba(96, 98, 102, 0.08) url(../../assets/image/noSet.png)
        no-repeat 95% 70%;
      border-radius: 6px;
      cursor: not-allowed;
      transition: 0.3s;
      .suc-icon {
        font-size: 25px;
        color: #1ad53d;
        display: none;
      }
      .preview-link {
        float: right;
        margin: 10px 15px 0 0;
        cursor: pointer;
      }
      &-msg {
        color: rgba(96, 98, 102, 0.4);
        margin: 35px 0 10px 12px;
        font-size: 22px;
      }
      &-tit {
        margin-left: 12px;
        font-size: 14px;
        padding-right: 15px;
        color: rgba(96, 98, 102, 0.7);
      }
      &:hover {
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  &-empty.is-current-bus {
    height: 170px;
    text-align: center;
    font-size: 16px;
    .tit-box {
      margin: 0 auto;
    }
    .tit-t {
      width: 100%;
      color:#333;
    }
    .tit-b {
      width: 100%;
      color: #909399;
    }
  }
  &-empty:not(.is-current-bus) {
    color: rgba(144, 147, 153, 1);
    padding: 15px 0;
  }
}
// 弹框内容
.content-box {
  height: 100%;
  .content-l {
    padding-right: 16px;
    border-right: 1px solid #dcdfe6;
  }
  .content-r {
    width: 100%;
    padding: 10px 0 0 30px;
    box-sizing: border-box;
    &-top {
      height: calc(100% - 50px);
    }
    &-bottom {
      height: 50px;
      text-align: right;
      padding-right: 5px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
  }
}
.index-template-box {
  /deep/ .el-dialog {
    height: calc(96% - 70px);
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
    }
    .el-dialog__body {
      padding: 0px 20px;
      height: calc(100% - 70px);
    }
  }
}
</style>
