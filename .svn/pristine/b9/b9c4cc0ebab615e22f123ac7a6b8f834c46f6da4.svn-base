<template>
    <div class="xuanzedepuart">
     <div class="selectduty">
            <el-dialog
            :close-on-click-modal="false"
            title="选择部门"
            :visible.sync="state_boxs"
            width="60%" class="choseAuditor">
            <span>
                <div class="auditorType clearfix">
                    <div class="typeLeft fl">
                        <span class="alerdy">选择部门</span>
                        <div class="container containerleft">
                                <el-input placeholder="输入关键字进行搜索" v-model="filterText" clearable>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                                <div class="containers-l">
                                    <el-scrollbar style="height:100%;overflow-x: hidden">
                                        <div class="wanc">
                                            <el-tree
                                                class="filter-tree"
                                                :data="tree"
                                                :props="defaultProps"
                                                default-expand-all
                                                :filter-node-method="filterNode"
                                                @node-click="handleNodeClick"
                                                ref="tree2">
                                                </el-tree>
                                        </div>
                                    </el-scrollbar>
                                </div>

                        </div>
                    </div>
                    <div class="typeRight fr">
                        <span class="alerdy">已选部门</span>
                        <div class="container">
                            <div class="containers" style="height:380px;border:1px solid #ddd;">
                                <el-scrollbar style="height:100%;overflow-x: hidden">
                                <ul class="choTypes" v-if="seen">
                                    <li class="clearfix" v-for="item in olarr">
                                        <span class="fl">{{item.name}}</span>
                                        <i @click="delect" class="el-icon-delete fr"></i>
                                    </li>
                                    <!-- <li v-if="seen2" class="clearfix" >
                                        <p class="pop_no_select_item_tips fl">暂无选中项</p>
                                    </li> -->
                                </ul>
                                <p v-if="seen2" class="pop_no_select_item_tips no_select_item_tips">暂无选中项</p>
                                </el-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footers" style="text-align:right">
                <el-button size="medium" @click="dialogVisibles">取 消</el-button>
                <el-button size="medium" type="primary" @click="ensure">确 定</el-button>
            </span>
        </el-dialog>
       <!-- <div class="selects"></div>
       <div class="select-content">
          <h3>
              <p>添加人员</p>
              <span><i class="el-icon-close"></i></span>
          </h3>
          <div>
              <ul>
                  <li>
                      <p>可选人员</p>
                      <div>
                          <input type="text" v-model="text">
                          <div id="select_frist">
                               <template v-if="seen3">
                                <div class="tree">
                                <el-tree :data="dat" node-key="id" default-expand-all >
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>
                                            <i :class="node.icon"></i>{{ node.label }}
                                        </span>
                                    </span>
                                </el-tree>
                                </div>
                            </template>
                          </div>
                      </div>
                  </li>
                  <li id="last_li">
                      <p>已选人员</p>
                      <div id="last_li_div">
                         <div @mouseover="open5" @mouseleave="open6" id="selest_last" v-for="i in 10">
                              <p class='select_right'><img src="../../assets/framework/1553305924(1).png" alt=""></p>
                              <p id="select_rights">荣大科技</p>
                         </div>
                      </div>
                  </li>
              </ul>

          </div>
          <div id="select_end">
              <div @click="cancels" style="margin-left: 23%;"><el-button  size="mini">取消</el-button></div>
              <div @click="cancels" style="margin-left: -6%;"><el-button style="background: #003866;color: white" size="mini">确定</el-button></div>
          </div>
       </div>
       <div>
        <div class="end" v-if="seen">
                <ul>
                    <li></li>
                    <li><p><span>姓名：王康</span><span></span></p></li>
                    <li><p><span>性别：男</span><span></span></p></li>
                    <li><span>手机号：110</span><span></span></li>
                    <li><span>邮箱：110</span></li>
                    <li><span>部门：110</span></li>
                    <li><span>职位：110</span></li>
                    <li><span>角色权限：110</span></li>
                </ul>
        </div>
       </div> -->
    </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        state_boxs: true,
        seen:false,
        seen2:true,
        seen3:false,
        filterText: '',
        olarr:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
     props:['treestate','tree','clearstate',
     'setDataInfo' // 回显的数据
     ],
     watch:{
        treestate: function(newV, oldV) {
            console.log(newV.state)
            if(newV.state == 1){
               this.state_boxs=true
               this.filterText = ''
               this.olarr = [...this.setDataInfo.data]
            }
        },
         clearstate: function(newV, oldV) {
            console.log(newV.state, this.setDataInfo)
            if(newV.state == 3){
                 this.olarr=[]
                 this.filterText = ''
                 this.olarr = this.setDataInfo ? [...this.setDataInfo.data] : []
                 this.seen2=true
                 this.seen=false
            }
        },
        filterText(val) {
            this.$refs.tree2.filter(val);
        },
        'olarr': {
            handler() {
                this.seen2 = this.olarr.length === 0;
                this.seen = this.olarr.length !== 0;
            },
            deep: true
        }
    },
    mounted(){
        // console.log(this)
        // this.$watch('dat', function(newVal, oldVal){
        //     if(newVal[1].label == '一级 2' == true){
        //         this.seen3=true
        //     }else{
        //         this.seen4=true
        //     }
        // });
        // if(this.olarr == ""){
        //     this.seen=false
        //     this.seen2=true

        // }
        this.olarr = this.setDataInfo ? [...this.setDataInfo.data] : []
    },
    methods: {
     handleNodeClick(data) {
        //  console.log(data);
        //  if(!data.children){
        //      this.olarr=[{
        //          name:data.name,
        //          id:data.id
        //      }]
        //      this.seen=true
        //      this.seen2=false
        //  }
         if(data.children == null){
              this.olarr=[{
                 name:data.name,
                 id:data.id
             }]
             this.seen=true
             this.seen2=false
         }else{
              this.olarr=[{
                 name:data.name,
                 id:data.id
             }]
             this.seen=true
             this.seen2=false
         }
         console.log(data.children)
      },
      delect(){
        this.seen=false
        this.seen2=true
        this.olarr=[]
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      dialogVisibles(){
        this.state_boxs=false
      },
      ensure(){
        this.$emit('states',this.olarr)
        this.state_boxs=false
      },
    }
  };
</script>
<style>
.xuanzedepuart .selectduty .el-dialog__footer{
    margin-top: -20px;
    margin-right: 12px;
    border-top: 0px;
    text-align: right;

}
.xuanzedepuart .selectduty .choseAuditor .el-dialog .el-dialog__header{
    background-color:#fff;
    text-align:center;
    color:#333;
}

.xuanzedepuart .selectduty .choseAuditor .el-dialog .el-dialog__header .el-dialog__title{
    color:#303133;
}
</style>

<style lang="scss" >
.xuanzedepuart .selectduty .el-dialog__header{
    border-bottom: solid 1px #ddd;
}
.xuanzedepuart .selectduty .el-dialog__body{
    padding: 15px 20px;
}
.xuanzedepuart .selectduty .container{
    height: 420px;
    padding: 0 12px
    // padding: 12px;
    // border: solid 1px #ddd;

}
.xuanzedepuart .selectduty .containers{
    border:  solid 1px #ddd;
    // height: 248px;
    // padding: 8px;
    padding: 10px;
    height: 380px;
}
.xuanzedepuart .selectduty .containers-l{
    height: 328px;
    margin-top: 10px;
}
.xuanzedepuart .selectduty .container.containerleft{
    // border-right: solid 1px #ddd;
    padding: 12px;
    height: 376px;
    border:  solid 1px #ddd;
}
.xuanzedepuart .selectduty .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: none ;
    border:none;
}
.xuanzedepuart .selectduty .wanc{
    width: 100%;
    // height: 260px;
    // background: red;
    margin-top: 4px;
    /*overflow: hidden;*/
    overflow: auto;
}
  .xuanzedepuart .selectduty  .contenti{
        // width: 99%;
        // height:90%;
        // background:#E7F2FF;
    }
   .xuanzedepuart .selectduty .contenti_headers{
        width: 98%;
        height: 9%;
        text-align: left;
        background: white;
        padding-left: 10px;
        margin-left: 14px;
        overflow: hidden;
        p{
            // width:56px;
            height:3%;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            margin-top: 0.5%;
            // line-height:0.5%;
        }
        h3{
            // width:82px;
            height:5%;
            font-size:20px;
            font-family:MicrosoftYaHei;
            font-weight:bold;
            color:rgba(51,51,51,1);
            // line-height:94px;
            margin-top: 30px;
        }
    }
   .xuanzedepuart .selectduty .contenti_content{
        width: 100%;
        height: 100%;
        margin-top: 12px;
        // background: #E7F2FF;
        // padding: 12px;
    }
   .xuanzedepuart .selectduty  .contenti_content{
        width: 100%;
        height:90%;
        .contenti_left{
            width:17%;
            height:98.5%;
             float: left;
            background:rgba(255,255,255,1);
            border-radius:3px;
            margin-left: 12px;
            li{
                width: 52px;
                line-height: 27px;
                float: left;
                background:rgba(242,243,245,1);
                border:1px solid rgba(231,231,231,1);
                border-radius:4px;
                line-height: 28px;
                margin-left:5%;
                margin-top: 5%;
                padding-left: 5px;;
                padding-right: 5px;
                font-size: 11px;
                background: rgba(242,243,245,1)
            }
            .contenti_left_img{
                margin-left: 17px;
                clear: both;
                padding-top: 15px;
                p{
                    width:80px;
                    height:22px;
                    img{
                        width: 100%;
                    }
                }
            }
            .contenti_left_tree{
                margin-left: 8%;
                padding-top: 10px;
            }
        }
        .contenti_right{
            width:80%;
            height:98.5%;
             float: left;
            // background:rgba(255,255,255,1);
            border:1px solid rgba(216,220,228,1);
            border-radius:3px;
            margin-left: 12px;
            .el-col-12{
                width: 50%;
            }
            .rightTop{
                .rightTitle{
                    height: 60px;
                    line-height: 60px;
                    background-color: #fff;
                    span:nth-child(1){
                        font-size: 16px;
                        color: #333;
                        margin-left: 20px;

                    }
                    span:nth-child(2){
                        width: 89px;
                        height: 34px;
                        background-color:#1A5FA4;
                        line-height: 34px;
                        color: #fff;
                        font-size: 14px;
                        margin-right: 15px;
                        margin-top: 14px;
                        cursor: pointer;

                        img{
                            width: 14px;
                            height: 14px;
                            position: relative;
                            top: 2px;
                            left: -6px;
                        }
                    }
                }
            }
            .rightLeftBottem{
                // width:450px;
                height:500px;
                background:rgba(255,255,255,1);
                border-radius:3px;
                margin-top: 10px;
                // float: left;

                p{
                    height: 60px;
                    line-height: 60px;
                    span:nth-child(1){
                        font-size: 16px;
                        color: #333;
                        margin-left: 20px;
                    }
                    span:nth-child(2){
                        width: 89px;
                        height: 34px;
                        background-color:#1A5FA4;
                        line-height: 34px;
                        color: #fff;
                        font-size: 14px;
                        margin-right: 15px;
                        margin-top: 14px;
                        cursor: pointer;

                        img{
                            width: 14px;
                            height: 14px;
                            position: relative;
                            top: 2px;
                            left: -6px;
                        }
                    }
                }
                 .proTypes{
                    text-align: left;
                    margin-left: 22px;
                    .typeDelete{
                        position: relative;
                        top: 15px;
                        right: 100px;

                    }
                    .othersType{
                        margin-left: 69px;
                    }
                }

            }
            .rightRightBottm{
                // width:450px;
                height:500px;
                background:rgba(255,255,255,1);
                border-radius:3px;
                margin-top: 10px;
                // float: left;
                margin-left: 10px;
                p{
                    height: 60px;
                    line-height: 60px;
                    span:nth-child(1){
                        font-size: 16px;
                        color: #333;
                        margin-left: 20px;
                    }
                    span:nth-child(2),
                    span:nth-child(3){
                        width: 89px;
                        height: 34px;
                        background-color:#1A5FA4;
                        line-height: 34px;
                        color: #fff;
                        font-size: 14px;
                        margin-right: 15px;
                        margin-top: 14px;

                        img{
                            width: 14px;
                            height: 14px;
                                position: relative;
                                top: 2px;
                                left: 1px;
                        }
                    }
                }
                .proTypes{
                    text-align: left;
                    margin-left: 22px;
                    .typeDelete{
                        position: relative;
                        top: 15px;
                        right: 100px;
                        margin-left: 6px;

                    }
                    .othersType{
                        margin-left: 69px;
                    }
                }
            }
            .no_select_item_tips{
                width: 100%;
            }
        }
    }


// .choseAuditor .el-dialog .el-dialog__header{
//     background-color: #1A5FA4;
//     text-align: left;

// }
// .choseAuditor .el-dialog .el-dialog__header span{
//     color: #fff;
// }
// .choseAuditor .el-dialog__headerbtn .el-dialog__close{
//     color:#fff;
// }
.xuanzedepuart .selectduty .choseAuditor .auditorType{
    text-align: left;
    // height:380px;
}
.xuanzedepuart .selectduty .auditorType .typeLeft{
    width: 50%;
    padding-right: 0px;
    border-right:0px;
    // margin-right: 10px;
}
.xuanzedepuart .selectduty .auditorType .typeRight{
    width: 50%;
    // border-right: 1px solid #e8e8e8;
}

.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight{
    border-right: 0px;
    padding-right: 0px;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeLeft .alerdy,
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .alerdy{
    font-size: 14px;
    color:#333;
    margin-top: 5px;
    padding-bottom: 8px;
    margin-left: 12px;
    display: block;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeLeft p{
    margin-top: 10px;
    margin-bottom: 8px;
}


.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .choTypes li{
     height: 34px;
    line-height: 34px;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .choTypes li:hover{
    background-color: #F7F7F7;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .choTypes li span{
    font-size: 14px;
    color: #333;
    margin-left: 5px;
    width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .choTypes li p{
    width: 100%;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .typeRight .choTypes li i{
    margin-right: 5px;
    position: relative;
    top: 11px;

}
.xuanzedepuart .selectduty .choseAuditor  .el-dialog__footer{
    // border-top: 1px solid #e8e8e8;

    // text-align: center;
}

// 项目阶段类型
.xuanzedepuart .selectduty .choseAuditor .auditorType .prophaseType{
    width: 100%;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .prophaseType .el-select{
    width: 85%;
}
//项目阶段关联
.xuanzedepuart .selectduty .choseAuditor .auditorType .progressassociated{
    width: 100%;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .progressassociated p{
    margin-bottom: 10px;
}
.xuanzedepuart .selectduty .choseAuditor .auditorType .progressassociated .el-select{
    width: 77%;
}

.xuanzedepuart .selectduty .choseAuditor .auditorType .progressassociated span{
    display: inline-block;
    width: 105px;
}
</style>
