<template>
  <el-dialog
    title="选择项目"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleCancel">
    <el-select v-model="selectedProjectCode" @change="handleSelectProject" filterable placeholder="请输入项目名称">
        <el-option
        v-for="item in projectOptions"
        :key="item.projectCode"
        :label="item.projectName"
        :value="item.projectCode">
        </el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">跳过</el-button>
        <el-button type="primary" @click="handleSure">确定</el-button>
    </span>
  </el-dialog>
    
</template>

<script>
export default {
  name: 'SelectProjectFz',
  props: ['isShow','projectOptions'],
  data(){
    return{
      dialogVisible: false,
      selectedProjectCode: '',
      token:'',
      userId: ''
    }
  },
  created(){
    // this.initData()
  },
  methods:{
    openDialog(){
      this.dialogVisible = true
    },
    handleSelectProject(v){
      this.selectedProjectCode = v
    },

    handleSure(){
      if(!this.selectedProjectCode){
        this.$message.warning('请选择项目')
        return
      }
      this.$emit('sure',  this.selectedProjectCode)
      this.handleCancel()
    },
    handleCancel(){
      this.dialogVisible = false
      this.selectedProjectCode = ''
      this.$emit('cancel')

    }
  }
  
}

</script>


<style scoped>

</style>
   
