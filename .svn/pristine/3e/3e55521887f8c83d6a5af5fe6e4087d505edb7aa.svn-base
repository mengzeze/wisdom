<template>
  <div>
    <el-dialog :visible.sync="show" width="1200px">
      <div slot="title" style="line-height:24px;font-size:18px;color:#303133;">
        {{title}}
      </div>
      <div>
        <!-- 查询组件 -->
        <form-item :data="formData" @enter="handleSelect($event)" @dialog="setDialog" ref="ruleForm">
          <div slot-scope="data">
            <el-button type="primary" @click="handleSelect(data)">
              <i class="el-icon-search"></i>
              <span>查询</span>
            </el-button>
            <el-button @click="resetForm('ruleForm',false)">
              <i class="el-icon-refresh"></i>
              <span>重置</span>
            </el-button>
          </div>
        </form-item>
        <!-- 内容详情组件 -->
        <details-list ref="page" :loading="loading" :header="header" :height="500" :tableData="tableData" :totals="totals" @pageChange="pageChange">
          <div slot="operate" slot-scope="data">
            <i @click="handleClick(data)" title="导出" class="el-icon-upload2"></i>
          </div>
        </details-list>
      </div>
    </el-dialog>
    <find-all-user :findState="findState" :checkState="checkState" :findFlagShow.sync="findFlagShow" :reportListType="reportListType" :reportPerson='reportPerson' @findAllUser="findAllUser">
    </find-all-user>
  </div>
</template>
<script>
import formItem from './formItem.vue'
import detailsList from './detailsList.vue'
import findAllUser from '@/components/select_box/findAllDeptUserMultiple.vue'
import { reportSelect, listHeader } from '../data/data.js'
export default {
  name: 'report-list',
  components: { formItem, detailsList, findAllUser },
  data() {
    return {
      loading: false,
      findFlagShow: false,
      findState: { state: 0 },
      checkState: {},
      tableData: [],
      findUserObj: [],
      show: false,
      totals: 0,
      title: '报送列表',
      formData: reportSelect,
      header: listHeader,
      dialogWork: {},
      submitCatch: {},
      reportListType: 'reportPeople',
      reportPerson: []
    }
  },
  methods: {
    setDialog(params) {
      this.dialogWork = params
      this.findFlagShow = true
    },
    handleSelect(params) {
      this.$refs.page.pageInit()
      this.handleSubmit(params)
    },
    handleClick(params) {
      const {
        data: { id }
      } = params
      this.$store.commit('export', {
        url: '/doc/project/reportExport',
        data: id
      })
    },
    handleShow() {
      this.show = true
      this.$nextTick(() => this.resetForm('ruleForm', true))
    },
    findAllUser(params) {
      this.$refs.ruleForm.setDialog(this.dialogWork, params)
      this.findFlagShow = false
      //清空上次已选人员
      this.reportPerson = []
      if (params.length > 0) {
        params.map(item => {
          this.reportPerson.push(item.id)
        })
        console.log(this.reportPerson)
      }
    },

    pageChange() {
      this.handleSubmit(this.submitCatch)
    },

    resetForm(formName, bool) {
      let params = this.$refs[formName].resetFields()
      this.reportPerson = []
      this.$refs.page.pageInit()
      if (bool) {
        this.handleSubmit()
      }
    },

    handleSubmit(params = { data: { time: [] } }) {
      this.submitCatch = params
      const {
        data: {
          itemName,
          itemStage,
          reportType,
          createBy: createBys,
          itemType,
          time: [createStartTime, createEndTime]
        }
      } = params
      const data = {
        itemName,
        itemType,
        createBys,
        createEndTime,
        createStartTime,
        itemStage,
        reportType
      }
      const {
        page: { size: pageSize, current: pageNo }
      } = this.$refs.page
      console.log(params, data, '查询查询')
      this.getTableData({ data, pageSize, pageNo })
    },

    getTableData(params) {
      this.loading = true
      this.$post('/doc/project/reportList', params)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data.reportList.list
            this.totals = res.data.reportList.total
            this.loading = false
            this.$forceUpdate()
          }
        })
        .catch(err => {
          throw new Error()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-icon-upload2 {
  background: #f2f3f5;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: #0061a9;
    color: #fff;
  }
}
</style>
