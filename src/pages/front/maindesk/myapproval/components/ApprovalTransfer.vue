<template>
  <div>
      <el-dialog title="转交" :close-on-click-modal="false" :visible="showTransfer" @close="handleClose" width="600px">
    <div>
      <ul class="caresli">
        <li></li>
        <li class="text-left">
          <span> <i style="color:red;padding-right: 5px">*</i>转交人员：</span>
          <el-button @click="selectMember" style=" margin-top: 5px;margin-bottom: 5px;" size="mini" type="primary">选择人员</el-button>
          <div style="height:35px;margin-bottom:5px;">
            <el-scrollbar style="height:100%">
                  <span style="margin-top: 3px"><el-tag
                    style="margin-right: 3px;margin-top: 3px;"
                    v-for="(tag,index) in memberList"
                    :key="index"
                    closable
                    @close="tabclose(tag,index)"
                    :type="tag.type">
                      {{tag.name}}
                    </el-tag></span>
            </el-scrollbar>
          </div>
        </li>
        <li li class="text-left">
          <p style=" float: left"> <i style="color:red;padding-right: 5px">*</i>转交理由：</p>
          <el-input style="width: 85%;" type="textarea" :rows="2" maxlength="1000" placeholder="请输入转交理由" v-model="reason">
          </el-input>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleClose">取 消</el-button>
        <el-button size="medium" type="primary" @click="handleConfirm">确 定</el-button>
    </span>

  </el-dialog>
      <findDeptuser :findFlagShow.sync="findFlag" v-on:findAllUser="findAllUser"
                  :findState="findState" :checkState="checkState"></findDeptuser>
  </div>


</template>

<script>
import findDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";

    export default {
      name: "ApprovalTransfer",
      components: {
        findDeptuser,
      },
      props: ['visible','taskId', 'catItem'],
      data(){
        return {
          showTransfer: false,
          memberList: [], // 已选人员列表
          reason: '', // 转交理由
          findFlag: false,
          findState: {},
          checkState: {},


        }
      },
      created(){
        console.log('catItem3', this.catItem)
      },
      methods: {
        tabclose (item,index) {
          this.memberList.splice(index,1)
        },
        selectMember(){
          this.findFlag = true
          this.findState = { state: 0 };
          this.checkState = { state: 2 };
        },
        findAllUser (data) {
          if(!data || !data.length){
            this.findFlag = false;
            this.findState = {};
            this.checkState = {};
            return
          }
          console.log('findAllUser',data)
          this.findFlag = false;
          this.findState = {};
          this.checkState = {};
          this.memberList = this.$utils.uniqBy([...this.memberList, ...data], 'userId')
        },
        handleConfirm(){
          if (!this.memberList || !this.memberList.length) {
            this.$message.error('请选择转交人员');
            return
          }
          if (this.reason == "") {
            this.$message.error('请输入转交理由');
            return
          }
          let arr = this.memberList.map(v=>v.userId)
          var dataObj = {
            token: this.token,
            userId: this.userId,
            data: {
              userIds: arr,
              context: this.reason,
              taskId: this.taskId,
              projectId: this.catItem.projectId,
              projectName: this.catItem.projectName,
              id: this.catItem.id,
              categoryId: this.catItem.categoryId
            }
          };
          this.$post("/info/audit/handOver", dataObj)
            .then((response) => {
              if(response.code!==0) {
                this.$message.error(response.msg);
                return
              }
              
              this.$message.success(response.msg);

              this.memberList = []
              this.reason = ""
              // 关闭审批弹窗
              // this.$emit('updatainfo',true)
              // 关闭转交弹窗
              this.handleClose()
              // 转交成功跳转到我的审批页面
              this.$emit('update-filepage')
              // 如果当前就在我的审批页面，刷新页面数据
              // this.$router.replace({path: '/myapproval'})

            })
            .catch(function (error) {
              console.log(error);
            });
        },
        handleClose() {
          this.$emit("update:visible",false);
        }

      },
      watch: {
        visible(val){
          this.showTransfer = val
          
        }

      }

    }
</script>

<style scoped>

</style>
