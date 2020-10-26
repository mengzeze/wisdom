<template>
  <div class="remark">
    <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="showDialog" 
    width="780px" @close="close" :class="[{'one-doc-dialog':this.docData.length == 1},{'lot-doc-dialog':this.docData.length != 1}]">
      <p class="docName" v-if="docData.length == 1">{{docData[0].docName}}</p>
      <!-- <div> -->
        <el-table
        v-if="docData.length == 1"
        empty-text="暂无备注信息"
        class="remark-list"
        :data="remarkList"
        :close-on-click-modal="false"
        :header-cell-style="{background:'#FAFAFA',color:'black',fontWeight:'bold'}"
        style="width: 100%;min-height: 150px"
        height="calc(100% - 200px)"
        >
            <el-table-column prop="content" label="备注内容">
                
            </el-table-column>
            <el-table-column prop="version" label="版本号" width="100">
              <template slot-scope="scope">                 
                <span>V{{scope.row.version}}</span>                
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="备注时间" width="160"></el-table-column>
        </el-table>
      <!-- </div> -->
      <p class="selected-total" v-if="docData.length != 1">
        当前已选中：<span>{{docData.length}}个文件</span>
      </p>
      <p class="sub-title">新增备注：</p>
      <el-input
        :class="[{'is-active': noRemarkText},{'lot-doc-input': docData.length != 1}]"
        resize="none"
        type="textarea"
        :rows="5"
        placeholder="请输入备注，最多输入1000字"
        maxlength="1000"
        v-model="remarkText">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveBtn">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "remark",
    props: ['remarkIsShow','title','docData','remarkList'],
    data() {
      return {
        showDialog: false,
        remarkText: '',//用户输入的备注内容
        noRemarkText: false,//保存时备注内容是否为空
      };
    },
    created() {
      
    },
    mounted(){
      // let bodyH = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
      //               - $('.head_top_qian').innerHeight();
      // if(this.docData.length == 1){
      //   this.layerHeight = bodyH - 240;
      // } else {
      //   this.layerHeight = bodyH - 480;
      // }
      // if(this.docData.length == 1){
      //   $('.el-dialog').addClass('one-doc-dialog')
      // }
    },
    methods: {
        saveBtn(){//保存
          if(this.remarkText == ''){
            this.noRemarkText = true;
            this.$message.warning('请新增备注内容');
            return;
          }         
          this.noRemarkText = false;
          this.$emit('saveRemark',this.remarkText);
        },
        close(){//关闭，取消
          this.$emit('colseModule');
        }    
    },
    watch: {
      remarkIsShow(val){
        this.remarkText = '';
        this.showDialog = val;
      }
    }
  };
</script>

<style scoped lang="scss">
  .el-dialog__header{
    border-bottom: 1px solid #dedede;
  }
  p{
    text-align: left;
  }
  .selected-total{
    padding-top: 30px;
    font-size: 16px;
    font-weight: 400;
    span{
      color: #000;
    }
  }
  .docName{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 16px;
  }
  .sub-title{
    padding: 10px 0;
    font-size: 14px;
  }
  .remark-list{
    margin-top: 16px;
    
  }
</style>
<style lang="scss">
.remark{
  .el-dialog{
    // height: calc(100% - 120px);
    // height: calc(80%);
    height: 100%;
  }
  .lot-doc-dialog .el-dialog{
    height: auto;
  }
  .one-doc-dialog .el-dialog{
    height: calc(100% - 60px);
    margin-top: 60px!important;
  }
  .el-dialog__header{
    border-bottom: 1px solid #dedede;
  }
  .el-dialog__body{
    padding-top: 0;
    height: calc(100% - 160px);
    overflow-y: hidden;
  }
  .el-table th>.cell{
    font-size: 14px;
    font-weight: 400;
  }
  .el-table td{
    border-bottom: 1px solid #dedede;
  }
  .el-table th.is-leaf{
    border-bottom: 1px solid #dedede;
  }
  .el-table__body-wrapper.is-scrolling-none{
    width: calc(100% - 6px);
  }
}
</style>


