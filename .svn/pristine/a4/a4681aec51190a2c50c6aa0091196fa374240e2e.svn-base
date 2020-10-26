<template>
<div id="cancelRelatedApproval">
    <el-dialog title="取消关联审批" center width="640px" :close-on-click-modal="false" :visible="cancelRelatedExamVisible"
               @close="clickEvent" :class="[{'no-data': noData} ,'main-content']">
        <el-scrollbar style="height:calc(100% - 56px);margin-right: 10px;">
            <div class="approval-content">
                <p v-if="noData" class="no-data-title">此审批流程要求您要有关联的审批</p>
                <div v-if="!noData">
                    <div class="clearfix">
                        <span>项目名称</span>
                        <p>{{queryList.projectName}}</p>
                    </div>
                    <div class="clearfix">
                        <span>当前阶段</span>
                        <p>{{queryList.projectStageName}}</p>
                    </div>
                    <div class="clearfix">
                        <span>审批类型</span>
                        <p>{{queryList.categoryName}}</p>
                    </div>
                    <div class="clearfix">
                        <span>业务类型</span>
                        <p>{{queryList.financingTypeName}}</p>
                    </div>
                    <div class="clearfix">
                        <span>提交人员</span>
                        <p>{{queryList.username}}</p>
                    </div>
                    <div class="clearfix">
                        <span>提交时间</span>
                        <p>{{queryList.createDate}}</p>
                    </div>
                    <div class="clearfix">
                        <span>状态</span>
                        <p>{{queryList.approvalStatus}}</p>
                    </div>
                    <div class="request-content clearfix">
                        <span>申请内容</span>
                        <p v-if="queryList.remarks" class="fl">{{queryList.remarks | msg}}
                        </p>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <div slot="footer" class="dialog-footer" v-if="!noData">
            <el-button @click="handleUploadClick" type="primary" class="cancel-btn">
                <template>
                    <i class="iconfont quxiaoguanlian"></i>
                    <span>取消关联</span>
                </template>
            </el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
    name: 'cancelRelatedApproval',
    components: {
        
    },
    props: [
        'cancelRelatedExamVisible',
        'examObj',
        'queryList',
        'noData'
    ],
    data () {
        return {
            token: '',
            userId: '',
            // queryList: {},
            // noData: true//是否有内容
        }
    },
    created () {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.success_code = this.code.codeNum.SUCCESS;

    },
    mounted(){
        // this.getData()
    },
    methods: {
        getData(){//获取信息
            var sendData = {
                token: this.token,
                userId: this.userId,
                data:{
                    approvalId: this.examObj.id,//当前审批id
	                taskDefKey: this.examObj.taskDefKey//审批节点id
                }
            }
            this.$post("/info/audit/relevancy/getApproval",sendData).then(res => {
                if (this.code.codeNum.SUCCESS == res.code) {
                    this.queryList = res.data;
                    this.noData = res.data == undefined;
                }
            })
            .catch(err => {
            });
        },
        handleUploadClick(){
            this.$confirm('是否取消该关联', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.sendCancel()
                }).catch(() => {
            });
        },
        sendCancel(){
            var sendData = {
                token: this.token,
                userId: this.userId,
                data:{
                    id: this.queryList.relevancyApprovalId,
                }
            }
            this.$post("/info/audit/relevancy/cancelApproval",sendData).then(res => {
                if (this.code.codeNum.SUCCESS == res.code) {
                    this.clickEvent()
                    this.$message.success(res.msg)
                    this.emit('queryData')
                } else {
                    this.$message.warning(res.msg)
                    return
                }
            })
            .catch(err => {
            });
        },
        clickEvent(){
           this.$emit('update:cancelRelatedExamVisible',false);
        },
        
    },
    watch: {
        cancelRelatedExamVisible(val) {
            
        }
    },
    filters: {
        msg(val){
            var dom = document.createElement('div')
            dom.innerHTML = val
            return val = dom.innerText
        }
    },
}
</script>

<style scoped lang="scss">
    .approval-content {
        margin-left: 30px;
        margin-bottom: 15px;
        div{
            margin: 5px 0;
            span {
                float: left;
                width: 62px;
                line-height: 36px;
                text-align: right;
                margin-right: 15px;
                color:rgba(96,98,102,1);
            }
            p {
                float: left;
                line-height: 36px;
                color:rgba(0,0,0,1);
                font-weight:400;
            }
        }
    }
    .dialog-footer{
        text-align: center;
        margin-bottom: 10px;
        padding-top: 16px;
    }
    .cancel-btn{
        width: 240px;
    }
    .request-content p{
        width: 460px;
        line-height: 26px;
    }
    .no-data-title{
        margin-top: 20px;
        text-align: center;
    }
     
</style>
<style lang="scss">
#cancelRelatedApproval .el-dialog__header{
    height: 24px;
    border-bottom: 1px solid #eaeaea !important;
} 
#cancelRelatedApproval .el-dialog__body {
    min-height: 360px;
    max-height: 494px;
    padding-right: 10px;
    overflow-y: auto;
}
#cancelRelatedApproval .no-data .el-dialog__body {
    height: 110px;
    min-height: 110px;
    max-height: 110px;
    padding-right: 10px;
    overflow-y: auto;
}
#cancelRelatedApproval .el-scrollbar {
	.el-scrollbar__wrap {
		max-height: 494px;// 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
</style>
