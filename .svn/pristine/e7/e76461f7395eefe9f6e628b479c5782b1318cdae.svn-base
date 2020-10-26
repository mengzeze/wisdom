<template>
    <div class="proj_type" id="choserongzi">
        <el-dialog
            :close-on-click-modal="false"
            title="选择业务类型"
            :visible.sync="choseProject"
            @open="handleOpen"
            width="60%">
                <span>
                    <div class="chose_types clearfix">
                        <div class="fl choseLeft">
                            <h4>选择类型</h4>
                            <div style="border:1px solid #ddd;padding:12px;">
                                <el-input v-model="filterText" placeholder="输入关键字进行搜索" class="choseInput" clearable>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                                <div style="height:330px;">
                                    <el-scrollbar style="height:100%">
                                        <el-tree
                                            :data="typeObj"
                                            node-key="id"
                                            :props="defaultProps"
                                            :filter-node-method="filterNode"
                                            ref="tree2"
                                            @node-click="handleNodeClick"
                                            v-if="flags"
                                        >
                                        </el-tree>
                                        <el-tree
                                                :data="typeObj"
                                                node-key="id"
                                                :props="defaultProps"
                                                :filter-node-method="filterNode"
                                                ref="tree2"
                                                @node-click="handleNodeClick"
                                                v-if="!flags"
                                        >
                                        </el-tree>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                        <div class="fr choseRight">
                            <h4>已选择类型</h4>
                            <div style="border:1px solid #ddd;padding:12px;height:380px;">
                                <el-scrollbar style="height:100%">
                                    <p class="clearfix mr-5" v-for="(item,index) in optArr" v-if="null_flag == false">
                                      <span class="fl" style="width: calc(100% - 30px);text-overflow: ellipsis;overflow: hidden;white-space: nowrap;text-align:left;" :title="item.label">{{item.label}}</span>
                                      <i class="el-icon-delete fr mr-10" @click="deleteOpt(index)" style="cursor: pointer"></i>
                                    </p>
                                    <p v-if="null_flag == true" class="pop_no_select_item_tips">暂无选中项</p>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                </span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="choseProject = false">取 消</el-button>
                    <el-button type="primary" @click="sureType">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                choseProject:true,
                filterText:'',
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                optArr:[],
                null_flag:true,
                flags:true,
                opState:{},
            }
        },
        props:['typeObj',"state","optState","isProcessengineClick","singleSele","hasSelect"],//singleSele:1/2单选/多选
        created(){
            this.opState = this.optState
            this.optArr = this.$utils.cloneDeepArray(this.hasSelect) || [];
        },
        watch:{
            // 打开弹窗，清空之前已选
            choseProject(val) {
                if(this.singleSele != 2){
                    val && (this.optArr = [])
                }
                !val && this.$emit('sendValueToParent',false);
            },
            typeObj: function(newV, oldV) {
                this.choseProject=true;
                this.data = newV;

            },
            state: function(newV, oldV) {
                if(newV == 1){       //单选
                    this.choseProject=true
                }
            },
            optArr:function(newV,oldV){
                if(newV.length == 0){
                    this.null_flag = true;
                }else{
                    this.null_flag = false;
                }
            },
            filterText(val) {
                this.$refs.tree2.filter(val);
            },
            optState(val){
                this.optArr = [];
                if(val.value == 1){
                    this.flags = true;
                }else{
                    this.flags = false;
                }
            },
            opState(){
                if(this.optState.value == 1){
                    this.flags = true;
                }else{
                    this.flags = false;
                }
            }
        },
        methods: {
          handleOpen() {
            this.filterText = ''
            // this.optArr = []
            // this.null_flag=true
            // this.flags=true
            // this.opState={}
          },
            filterNode(value,data){
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            deleteOpt(ind){
                this.optArr.splice(ind,1);
            },
            sureType(){
                this.$emit('typeProject',this.optArr);
                this.choseProject=false;
            },
            handleNodeClick(data){
                let singleSele = this.singleSele || 1;
                if(singleSele == 1){//单选
                    this.optArr = [];
                    if(this.isProcessengineClick) {
                        // this.optArr = [];
                        this.optArr.push(data);
                        return
                    }
                    if(data.pid != 0){
                        if(this.flags){
                            // this.optArr = [];
                            this.optArr.push(data);
                        }else{
                            if(!data.disabled){
                                // this.optArr = [];
                                this.optArr.push(data);
                            }else{
                                this.$message.error("当前该业务类型不可选");
                            }
                        }
                    }
                } else {//多选
                    if(this.optArr.findIndex(v=>v.id==data.id) != -1){
                        this.$message.error("已选择");
                        return;
                    }
                    if(this.isProcessengineClick) {
                        this.optArr.push(data);
                        return
                    }
                    if(data.pid != 0){
                        if(this.flags){
                            this.optArr.push(data);
                        }else{
                            if(!data.disabled){
                                this.optArr.push(data);
                            }else{
                                this.$message.error("当前该业务类型不可选");
                            }
                        }
                    }
                }

            }
        }
    }
</script>

<style>
#choserongzi .el-dialog__header{
    border-bottom: 1px solid #ddd;
}
#choserongzi  .chose_types .choseLeft{
        width: 49%;
    }
    #choserongzi .chose_types .choseLeft h4,
    #choserongzi .chose_types .choseRight h4{
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        text-align: left;
    }

    #choserongzi .chose_types .choseLeft .choseInput{
        margin-bottom: 10px;
    }
    #choserongzi .chose_types .choseRight{
        width: 48%;
    }
    #choserongzi .chose_types .choseRight p{
        margin-bottom: 10px;
    }
    #choserongzi .el-dialog__body label{
        width:auto;
    }
    #choserongzi .el-dialog__footer{
        margin-right: 0px;
        padding:0px 20px 20px;
    }
  .mr-5{
    margin-right: 5px;
  }
</style>
