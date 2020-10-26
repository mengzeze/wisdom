<template>
  <div class="dir-tem-preview">
    <el-dialog :visible.sync="innerVisible" :title="previewData.dirName" :close-on-click-modal="false" top="70px">
      <div class="preview-box">
        <el-scrollbar style="height:100%">
          <el-tree node-key="id"
                   ref="tree"
                   :props='{children: "children",label: "docName"}'
                   lazy
                   :load="getDirData"
                   :default-expanded-keys="[this.previewData.dirId]"
                   :render-content="renderContent"
                    v-if="treeShow">
          </el-tree>
        </el-scrollbar>
      </div>
      <template slot="footer">
        <el-button @click="innerVisible = false">{{isCurrentBus?'取消':'关闭'}}</el-button>
        <el-button @click="quote" v-if="isCurrentBus" type="primary">确认引用</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "dirTemplatePreview",
    data() {
      return {
        innerVisible: false,
        treeShow:false
      }
    },
    props: {
      visible: { // 显示隐藏控制
        type: Boolean,
        default: false
      },
      previewData: {
        type: Object,
        default: () => {},
        require: true
      }
    },
    computed:{
      isCurrentBus() {
        return Number(this.previewData.financeId) === Number(this.$store.state.projectMsg.projectMsg.financingId)
      }
    },
    methods: {
      // 引用
      quote() {
        this.$confirm("引用后，当前目录将会清空！", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "我已确认",
          distinguishCancelAndClose: true,
          type: "warning"
        })
          .then(() => {
            this.innerVisible = false
            this.$emit('quote',this.previewData.dirId)
          })
          .catch(action => {})
      },
      getDirData(node, resolve) {
        if(node.level === 0) {
          return resolve([{
            id: this.previewData.dirId,
            docName:this.previewData.dirName
          }])
        }
        this.$post('/doc/paper/getSysCatalogsByParentId', {
          data: {
            parentId:node.data.id
          }
        }).then(res => {
          if(res.code === -504) {
            this.$refs.tree.getNode(node.data.id).isLeaf = false
            return resolve([])
          }
          if(res.code !== this.code.codeNum.SUCCESS) {
            this.$message.warning(res.msg)
            return resolve([])
          }
          resolve(res.data);
        })
      },
      renderContent(h, { node, data, store }) {
        if(node.expanded) {
          return (
            <span class="custom-tree-node">
            <i class='open'></i>
            <p style="padding-left:5px; width:100%;">{node.label}</p>
            </span>
        )
        } else {
          return (
            <span class="custom-tree-node">
            <i class='close'></i>
            <p style="padding-left:0px; width:100%;">{node.label}</p>
            </span>
        );
        }
      }
    },
    watch: {
      visible(val, oldVal) {
        if (val === oldVal) return
        this.innerVisible = val
      },
      innerVisible(val, oldVal) {
        if (val === oldVal) return
        this.$emit("update:visible", val)
        // 在这可以进行弹框显示的数据处理及清空操作
        this.treeShow = !this.treeShow
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dir-tem-preview {
   /deep/ .el-dialog {
      height:calc(96% - 70px);
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
    }
    .el-dialog__body {
      padding: 20px 20px 0 20px;
      height: calc(100% - 150px);
    }
    .preview-box {
      height: 100%;
      width: 100%;
    }
    .el-scrollbar__view {
      white-space: nowrap;
      .el-tree>.el-tree-node{
        min-width:100%;
        display: inline-block;
      }
    }
    .el-icon-caret-right:before {
      content: "";
    }
    @mixin iconPublic($url) {
      width: 30px;
      height: 15px;
      display: inline-block;
      background: url($url) no-repeat 0 0;
    }
    .open {
      @include iconPublic("../../assets/project_doc/treeopen.png");
    }
    .close{
      @include iconPublic("../../assets/project_doc/treenoopen.png");
      &::before {
        content: '';
      }
    }
    .custom-tree-node{
      display: flex;
      align-items: center;
    }
    }
  }
</style>
