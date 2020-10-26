<template>
  <div>
    <el-dialog title="我的日程"
               :close-on-click-modal="false"
               :visible.sync="innerVisible"
							 @close="dialogClose"
               width="660px"
               class="clearfix addcander">
      <span>
        <el-form ref="formedit"
                 :model="formedit"
                 label-width="80px">
          <el-form-item label="日程名称">
            <el-input v-model="formedit.name"
                      disabled
                      type="textarea"
                      style="width:94%"></el-input>
          </el-form-item>
          <el-form-item label="所属项目"
                        :rules="[{required:true}]">
            <el-col :span="24">
              <select-lazy
                  v-model="formedit.progress"
                  disabled
                  placeholder="请选择"
                  :list='projectList'></select-lazy>
              <!-- <el-select v-model="formedit.progress"
                         disabled
                         placeholder="请选择"
                         filterable
                         style="z-inidex:-1;width:94%;">
                <el-option v-for="item in projectList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select> -->
            </el-col>
          </el-form-item>
          <el-form-item label="时间">
            <el-row>
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="开始日期"
                                v-model="formedit.date1"
                                style="width:100%;"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                disabled></el-date-picker>
              </el-col>
              <el-col :span="11">
                <el-date-picker @focus="$utils.handleTimeFocus"
                                type="datetime"
                                placeholder="结束日期"
                                v-model="formedit.date2"
                                style="width: 100%;margin-left:11px;"
                                format="yyyy-MM-dd HH:mm"
                                value-format="yyyy-MM-dd HH:mm"
                                disabled></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea"
                      v-model="formedit.desc"
                      disabled
                      style="width:94%"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="medium"
                   @click="edit"
                   :disabled="disabledsedit">编 辑</el-button>
        <el-button size="medium"
                   type="primary"
                   @click="delet"
                   :disabled="disabledsedit">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'myScheduleDialog',
  props: {
    visible: { // 显示隐藏控制
      type: Boolean,
      default: false
    },
    formedit: { // 数据
      type: Object,
      default: {}
    },
    disabledsedit: { // 编辑和删除状态
      type: Boolean,
      default: false
    },
    projectList: { // 项目数据
      type: Array,
      default: () => []
    },
    scheduleIds: { // 此条数据的id和pro_id
			type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      innerVisible: false
    }
  },
  watch: {
    visible (val, oldVal) {
      if (val === oldVal) return
      this.innerVisible = val
    },
    innerVisible (val, oldVal) {
      if (val === oldVal) return
      this.$emit('update:visible', val)
    }
  },
  methods: {
		dialogClose() {
			this.$emit('closeCallback')
		},
    edit () {
      this.$emit('editCallback')
      // this.innerVisible = false
    },
    delet () {
      this.$post("/sys/schedule/del_schedule", {
        data: {
          id: this.scheduleIds.id,
          name: this.formedit.name,
          projectId: this.scheduleIds.pro_id
        }
      }).then(res => {
        if (res.code != this.code.codeNum.SUCCESS) {
          this.$message(res.msg);
          return
        }
        this.$message.success('删除成功');
        this.$emit('deletCallback')
        this.innerVisible = false
      }).catch(err => { console.log(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
.addcander {
  /deep/ .el-textarea {
    width: 100%;
  }
	/deep/ .el-button {
  	height: 40px;
	}
	/deep/ .el-form-item__content {
		text-align: left;
	}
}
</style>
