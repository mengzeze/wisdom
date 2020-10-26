<template>
  <div>
    <el-dialog title="提示"
               :visible.sync="locationActive"
               :before-close="dialogClose"
               :close-on-click-modal="false"
               width="422px"
               class="set_draft_same_name">
      <div>
        <div class="set_draft_same_name-con clearfix" v-if="lodata">
          <i class="el-icon-warning"></i>
          <p>将会把目录全部显示于搜索结果页</p>
          <p>当前项目含已选中文件/状态，是否取消选中状态</p>
        </div>
        <div class="set_draft_same_name-con clearfix" v-else>
          <i class="el-icon-warning"></i>
          <p>将会把文件全部显示于已选文件列表</p>
          <p>当前项目含已选中文件，是否取消文件选中状态</p>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="deny">否</el-button>
          <el-button type="primary"
                     @click="yes">是</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'locationDialog',
  props: [ 'locationActive', 'source', 'fileList','lodata'],
  data () {
    return {
      pro_id: this.$store.state.projectMsg.pro_id,
      projectMsg: this.$store.state.projectMsg.projectMsg,
    }
  },
  mounted () { 
    // console.log(this.lodata)
  },
  methods: {
    // 弹框关闭
    dialogClose () {
      this.$emit('update:locationActive', false);
    },
    // 否
    deny () {
      this.dialogClose();
    },
    async yes () {
      this.$select.clearSelection(this.source == 1 ? 2 : 1, this.pro_id)
      await this.$select.handleFileSelect(this.source == 1 ? 2 : 1, this.pro_id, this.pro_id, this.fileList.length == 0?this.lodata.set:this.fileList)
      if((this.lodata != undefined && this.lodata)){
        this.$router.push({
            path: '/fullsearch',
            query: {
              searchData: JSON.stringify(this.lodata),
          }
        });
        return
      }
      if (this.source == 1) {
        // 如果是底稿
        this.$router.push({
          path: '/fullsearch',
          query: {
            isSelectList: true
          }
        })
        return
      }
      this.$router.push({
        path: '/proDocSelectList',
        query: {
          projectData: JSON.stringify({
            docParentId: 0,
            pathNameList: [],
            processId: this.projectMsg.currentImplementStageId,
            processName: this.projectMsg.currentImplementStageName,
            projectCreatBy: this.projectMsg.createBy,
            projectId: this.pro_id,
            projectName: this.projectMsg.name
          }),
          fromItem: 0
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.set_draft_same_name {
  /deep/ .el-dialog__header {
    text-align: left;
  }
  .el-dialog__body p {
    padding-left: 40px;
    text-align: left;
  }
  .dialog-footer {
    margin-top: 30px;
    text-align: right;
  }
  .set_draft_same_name-con {
    position: relative;
  }
  .el-icon-warning {
    position: absolute;
    left: 4px;
    top: 6px;
    font-size: 22px;
    color: #e6a23c;
  }
}
</style>