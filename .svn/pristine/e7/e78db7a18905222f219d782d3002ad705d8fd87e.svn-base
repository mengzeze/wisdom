<template>
    <div class="vote-decide">
        <!-- 投票弹框投票决策-->
        <el-dialog title="投票决策" :close-on-click-modal="false" :visible.sync="isShow" width="550px" @close="closeFn">
            <div style="height:350px;text-align: left;">
                <el-scrollbar style="height:100%">
                <el-form ref="form" label-width="120px" class="juechrbox">
                    <el-form-item label="投票类型：">{{Strategyname}}</el-form-item>
                    <el-form-item label="投票：">
                    <el-radio-group v-model="radio">
                        <el-radio v-for="itmm in Decide" :label="itmm.id" :key="itmm.id">{{itmm.name}}</el-radio>
                    </el-radio-group>
                    </el-form-item>
                    <el-form-item label="投票意见：" required>
                        <el-input type="textarea" :rows="3" resize="none" placeholder="请输入投票意见" :maxlength="500" v-model="Strategyname_y" style="width:340px;text-align: left;"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="附件:"></el-form-item> -->
                    <el-form-item label="附件：" label-width="120px" style="margin-top:10px;">
                    <add-attachment ref="attachment"
                                    :projectRequired="false"
                                    :projectId="projId"
                                    @select="$utils.handleSelect(arguments, selectedFileList)"></add-attachment>
                    <ul style="text-align: left;" class="attachment-wrap">
                        <li v-for="(item, index) in selectedFileList" :key="index">
                        <p class="attachemnt-list-doc">
                            <span class="doc-name" @click="$utils.handleUploadFilePreview(item,  {projectId:projId, sourceName: '投票决策', projectName: handleVote.projName})" :title="item.docName">{{item.docName}}</span>
                            <span class="doc-handle">
                                <el-button v-if="item.addSource!==1" type="text" @click="$utils.handleDownLoadSelected(item)">下载</el-button>
                                <el-button type="text" @click="$utils.handleDeleteSelected(selectedFileList, item)">删除</el-button>
                            </span>
                        </p>
                        </li>
                    </ul>
                    </el-form-item>
                </el-form>
                </el-scrollbar>
            </div>
        <span slot="footer">
            <el-button size="medium" @click="closeFn">取 消</el-button>

            <!-- <el-button type="primary" @click="cvoteStrategy">保存</el-button> -->
            <el-button size="medium" type="primary" @click="tDoc">保存</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
//选择人员
import findallDeptuser from "@/components/select_box/findAllDeptUserMultipleNew";
export default {
    name: 'voteDecide',
    components: {
       findallDeptuser
    },
    props: [
      'voteDecideVisible',
      'handleVote'
    ],
    data () {
        return { 
            token: '',
            userId: '',
            projId: "", //项目id
            success_code: '',
            isShow: true,
            //投票决策展示的项目名称
            Strategyname: "",
            Strategyid: "", //投票决策展示的项目id
            Strategyname_y: "", // 请输入投票意见"
            radio: 1, //投票表决
            Decide: [],
            selectedFileList: [],//附件
            //投票决策数据
            juece: [
                {
                    id: 1,
                    name: "同意"
                },
                {
                    id: 2,
                    name: "不同意"
                },
                {
                    id: 3,
                    name: "暂缓表决"
                },
                {
                    id: 4,
                    name: "有条件通过"
                }
            ],
        }
    },
    mounted(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projId = this.$store.state.projectMsg.pro_id;
        this.success_code = this.code.codeNum.SUCCESS;  
        this.initial();
        
    },
    methods:{
        initial(){
            this.Strategyname = this.handleVote.typeName;
            this.Strategyid = this.handleVote.id;
            this.selectedFileList = [];
            var dataObj = {
                token: this.token,
                userId: this.userId,
                data: {
                    id: this.handleVote.typeId
                }
            };
            var that = this;
            this.$post("/info/project/findVoteRuleOne", dataObj)
                .then((response) => {
                var xuan = response.data.voteOption.split(",");
                for (var i = 0; i < xuan.length; i++) {
                    for (var j = 0; j < that.juece.length; j++) {
                        if (xuan[i] == that.juece[j].id) {
                            that.Decide.push(that.juece[j]);
                        }
                    }
                }
                })
                .catch(function (error) {
                console.log(error);
                });
        },
        //投票决策保存
        tDoc () {
            var that = this;
            this.$confirm("投票决策仅可执行一次，是否执行本次投票?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.cvoteStrategy();
                })
                .catch(() => {
                    that.closeFn();
                    that.$message({
                        type: "info",
                        message: "已取消投票"
                    });
                });
        },
        cvoteStrategy () {
            var that = this;
            if (this.Strategyname_y == "") {
                this.$message.error("投票意见不能为空");
                return;
            }


            if(this.$store.state.isUpload) {
                this.$message.error('有文件正在上传，请稍后操作')
                return;
            }

            let localAttach = []
            let projectRelev = []

            this.selectedFileList.forEach(v=>{
                v.addSource===1 ? localAttach.push(v.docId) : projectRelev.push(v.docId)
            })

            var dataObj = {
                token: this.token,
                userId: this.userId,
                data: {
                    voteId: this.Strategyid,
                    result: this.radio,
                    suggestion: this.Strategyname_y, //"投票意见 "
                    localAttach: localAttach.join(","), //"【本地上传文件id】 1,2,3",
                    projectRelev: projectRelev.join(",") //"【关联项目文档】 1,2,3"}}
                }
            };

            this.$post("/info/project/compltVote", dataObj)
                .then((response) => {
                if (response.code == that.code.codeNum.SUCCESS) {
                    that.radio = 0;
                    that.Strategyname_y = "";
                    that.closeFn();
                    that.$message({
                        message: response.msg,
                        type: "success"
                    });
                } else {
                    that.radio = 0;
                    that.Strategyname_y = "";
                    that.closeFn();
                    that.$message({
                        type: "info",
                        message: response.msg
                    });
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        closeFn(){         
            this.$refs['attachment'] && this.$refs['attachment'].close()
            this.$emit('sendValueToParent',false);
        },
    },
    watch:{
        voteDecideVisible(val){
            this.isShow = val
        },  
    },
    computed: {
        
    }
}
</script>
<style scoped lang="scss" type="text/css">
.juechrbox .el-form-item {
  margin-bottom: 4px;
}
.attachment-wrap{
    overflow-y: auto;
    max-height: 113px;
}
.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

.attachemnt-list-doc {
  display: flex;
  align-items: center;
}

.attachemnt-list-doc .doc-name{
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.attachemnt-list-doc .doc-delete{
  font-size: 14px;
  font-weight: 400;
  color: #0061a9;
  cursor: pointer;
  margin-top: 2px;
}
.doc-handle .el-button{
    width: 40px;
    margin-left: 0;
}
</style>
<style lang="scss" type="text/css">

</style>

