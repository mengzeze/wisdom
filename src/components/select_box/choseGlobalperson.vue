<template>
     <div class="select">
            <el-dialog
            title="选择人员"
            align="left"
            :close-on-click-modal="false"
            :visible.sync="state_box"
            width="500px" class="choseAuditor"  @close="change">
            <span>
                <div class="auditorType clearfix">
                    <div class="typeLeft fl">
                        <span class="alerdy">已选人员</span>
                       <el-select v-model="filterText" @change="filterTexts" size="mini" filterable placeholder="请输入人员">
                        <el-option
                        v-for="item in roledata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.usName">
                        </el-option>
                    </el-select>
                      <div class="wanc">
                          <!-- <div v-for="item in roledata">{{item.roleName}}</div> -->
                        <div class="typeRight fr"  style="width: 91%;" v-show="cxrolse">
                        <ul class="choTypes">
                            <li @click="roleNames(item)" class="clearfix" v-for="item in roledata">
                                <span class="fl">{{item.usName}}</span>
                            </li>
                        </ul>
                    </div>
                     <div class="typeRight fr"  style="width: 91%;" v-show="cxrolses">
                        <ul class="choTypes">
                            <li @click="roleNamess(item)" class="clearfix" v-for="item in roledatas">
                                <span class="fl">{{item.usName}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="typeRight fr"  style="width: 91%;" v-show="cxrolses3">
                        <ul class="choTypes">
                            <li class="clearfix">
                                <span class="fl">暂无数据</span>
                            </li>
                        </ul>
                    </div>
                      </div>
                    </div>
                    <div class="typeRight fr">
                        <span class="alerdy">已选人员</span>
                        <ul class="choTypes">
                            <li v-if="seen" @click="delect(index)" class="clearfix" v-for="(item,index) in olarr">
                                <span class="fl">{{item.usName}}</span>
                                <i @click="delect" class="el-icon-delete fr"></i>
                            </li>
                             <li v-if="seen2" class="clearfix" >
                                <span class="fl">暂未选择人员</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footers" style="text-align:right">
                <el-button size="medium" @click="dialogVisibles">取 消{{roledatas}}</el-button>
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
</template>
<script>
  export default {
    data() {
      return {
        state_box: true,
        seen:false,
        seen2:true,
        seen3:false,
        cxrolse:true,
        cxrolses:false,
        cxrolses3:false,
        roledatas:'',
        filterText: [],
        olarr:[],
      };
    },
     props:['Role','roledata','stateRole'],
     watch:{
    //     roledatas: function(newV, oldV) {
    //         console.log(newV)
    //         if(newV.state == 3){
    //            this.state_box=true
    //         }
    //         deep: true
    //     },
        Role: function(newV, oldV) {
                if(newV.state == 2){
                this.state_box=true
                }
            },
    },
    methods: {
      filterTexts(){
        var arr = this.roledata
        for (let i = 0; i < arr.length; i++) {
            if(this.filterText == arr[i].usName){
                 this.olarr.push(arr[i])
                   this.seen=true
                   this.seen2=false
                 console.log( this.olarr)
            }
        }
      },
      roleNames(item){
          if(this.stateRole){
              this.olarr = [];
              this.olarr.push(item)
              console.log(this.olarr)
              this.seen=true
              this.seen2=false
          }else{
              for(var i=0;i<this.olarr.length;i++){
                  if(item == this.olarr[i]){
                      return;
                  }
              };
              this.olarr.push(item)
              console.log(this.olarr)
              this.seen=true
              this.seen2=false
          }
      },
      delect(index){
        Array.prototype.delete=function(delIndex){
        var temArray=[];
        for(var i=0;i<this.length;i++){
        if(i!=delIndex){
        temArray.push(this[i]);
        }
        }
        return temArray;
        }
        var arr=this.olarr
        this.olarr=arr.delete(index)
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      dialogVisibles(){
        this.state_box=false
      },
      change(value) {
        this.$emit('statesboxlist','')
      },
      ensure(){
       var arr=this.olarr
       var str
        this.$emit('statesboxlist',this.olarr)
      }
    }
  };
</script>
<style lang="scss"  scoped>
.el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: none ;
    border:none;
}
.wanc{
    width: 100%;
    height: 230px;
    // background: red;
    margin-top: 4px;
    overflow: hidden;
    overflow: auto;
}
    .contenti{
        width: 99%;
        height:90%;
        // background:#E7F2FF;
    }
    .contenti_headers{
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
    .contenti_content{
        width: 100%;
        height: 100%;
        margin-top: 12px;
        // background: #E7F2FF;
        // padding: 12px;
    }
    .contenti_content{
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
.choseAuditor .auditorType{
    text-align: left;
}
.choseAuditor .auditorType .typeLeft,
.choseAuditor .auditorType .typeRight{
    width: 45%;
    padding-right: 10px;
    border-right: 1px solid #e8e8e8;
}

.choseAuditor .auditorType .typeRight{
    border-right: 0px;
}
.choseAuditor .auditorType .typeLeft .alerdy,
.choseAuditor .auditorType .typeRight .alerdy{
    font-size: 14px;
    color:#333;
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
}
.choseAuditor .auditorType .typeLeft p{
    margin-top: 10px;
    margin-bottom: 8px;
}


.choseAuditor .auditorType .typeRight .choTypes li{
     height: 34px;
    line-height: 34px;
}
.choseAuditor .auditorType .typeRight .choTypes li:hover{
    background-color: #F7F7F7;
}
.choseAuditor .auditorType .typeRight .choTypes li span{
    font-size: 14px;
    color: #333;
    margin-left: 5px;
}
.choseAuditor .auditorType .typeRight .choTypes li i{
    margin-right: 5px;
    position: relative;
    top: 11px;

}
.choseAuditor  .el-dialog__footer{
    border-top: 1px solid #e8e8e8;
    // text-align: center;
}


// 项目阶段类型
.choseAuditor .auditorType .prophaseType{
    width: 100%;
}
.choseAuditor .auditorType .prophaseType .el-select{
    width: 85%;
}
//项目阶段关联
.choseAuditor .auditorType .progressassociated{
    width: 100%;
}
.choseAuditor .auditorType .progressassociated p{
    margin-bottom: 10px;
}
.choseAuditor .auditorType .progressassociated .el-select{
    width: 77%;
}

.choseAuditor .auditorType .progressassociated span{
    display: inline-block;
    width: 105px;
}
</style>
