<template>
    <div class="rolechoseparent">
     <div class="selectrole">
            <el-dialog
            title="选择角色"
            :close-on-click-modal="false"
            align="left"
            :visible.sync="state_box"
            @close="closes"
            width="60%" class="choseAuditor">
            <span>
                <div class="auditorType clearfix">
                    <div class="typeLeft fl">
                        <span class="alerdy">全部</span>
                        <div style="border:1px solid #ddd;padding:10px;">
                             <el-input v-model="filterText" placeholder="输入关键字进行搜索" @input="searchWord" clearable>
                                 <el-button slot="append" icon="el-icon-search"></el-button>
                             </el-input>
                                <!-- <el-select v-model="filterText" @change="filterTexts" filterable placeholder="请输入角色" style="margin-bottom:4px;width:100%;">
                                    <el-option
                                    v-for="item in roledata"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.roleName">
                                    </el-option>
                                </el-select> -->
                                <div class="wanc" style="height:336px;">
                                    <el-scrollbar style="height:100%" v-show="optionList.length">
                                <!-- <div v-for="item in roledata">{{item.roleName}}</div> -->
                                        <div class="typeRight fr"  style="width: 91%;">
                                            <ul class="choTypes">
                                                <li @click="roleNames(item)" class="clearfix" v-for="item in optionList">
                                                    <span class="fl">{{item.roleName}}</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </el-scrollbar>
                                     <div v-show="!optionList.length" class="empty-data">
                                       暂无数据
                                     </div>
                                </div>
                        </div>
                    </div>
                    <div class="typeRight fr">
                        <span class="alerdy">已选</span>
                        <div style="border:1px solid #ddd;height:384px;padding:10px;">
                            <el-scrollbar style="height:100%">
                                <ul class="choTypes">
                                    <li v-if="seen" @click="delect(index)" class="clearfix" v-for="(item,index) in olarr">
                                        <span class="fl">{{item.roleName}}</span>
                                        <i @click="delect" style="margin-right: 15px;" class="el-icon-delete fr"></i>
                                    </li>
                                    <li v-if="seen2" class="clearfix" >
                                        <span class="fl">暂未选择角色</span>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </span>
            <span slot="footer" class="dialog-footers" style="text-align:right">
                <el-button size="medium" @click="dialogVisibles">取 消</el-button>
                <el-button size="medium" type="primary" @click="ensure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedData: [],
        optionList: [], // 左侧待选角色
        state_box:true,
        seen:false,
        seen2:true,
        seen3:false,
        cxrolse:true,
        cxrolses:false,
        cxrolses3:false,
        projectstats:[],
        roledatas:'',
          dataObj:[],
        filterText: [],
        olarr:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      };
    },
     props:['setdatas','Role','roledata','stateRole'],
     computed: {},
     watch:{
        //  setdatas: function(newV, oldV) {
        //      console.log(newV,oldV)
        // },
        Role: function(newV, oldV) {
                if(newV.state == 2){
                this.state_box=true
                }
            },
         Role: function(newV, oldV) {
                 this.state_box=true
         }
    },
    mounted(){
        this.seen=true
        this.seen2=false
        this.projectstats=this.$store.state.projectstat.setdatas
        // this.olarr=this.$store.state.projectstat.setdatas
        let [...delectTagis] = this.$store.state.projectstat.setdatas;
        this.olarr = delectTagis
        this.dataObj= this.$utils.cloneDeepArray(this.roledata); // 深克隆
        this.optionList = this.$utils.cloneDeepArray(this.roledata); // 待选
        this.filterText = '';
        // console.log(this.olarr)
    },
    methods: {
     searchWord(){
            if(this.filterText == ''){
               this.optionList = this.$utils.cloneDeepArray(this.roledata)
            }else{
               this.querySearch(this.filterText);
            }
        },
    querySearch(queryString) {
            var restaurants = this.roledata;
            var results = queryString ? restaurants.filter(this.createFilter(queryString,restaurants)) : restaurants;
            this.optionList = results;
            // console.log(this.dataObj)
    },
     createFilter(queryString,restaurants) {
            return (restaurants) => {
                return (restaurants.roleName.indexOf(queryString) !== -1);
            };
    },
      filterTexts(){
        var arr = this.roledata
        for (let i = 0; i < arr.length; i++) {
            if(this.filterText == arr[i].roleName){
                 this.olarr.push(arr[i])
                 this.olarr = Array.from(new Set(this.olarr));
                   this.seen=true
                   this.seen2=false
                 console.log( this.olarr)
            }
        }
      },
      closes(){
        this.$emit('statesbox',this.projectstats)
        // var state=1
        // this.state_box=false
        // this.$emit('states',this.state_box)
      } ,
      roleNames(item){
          if(this.stateRole){
              this.olarr = [];
              this.olarr.push(item)
              console.log(this.olarr)
              this.seen=true
              this.seen2=false
          }else{
            //   console.log(item.id)
            //   console.log(this.olarr)
              for(var i=0;i<this.olarr.length;i++){
                  if(item.id == this.olarr[i].id){
                      return;
                  }
              };
              this.olarr.push(item)
            //   console.log(this.olarr)
              this.seen=true
              this.seen2=false
          }
      },
      delect(index){
        // console.log(this.olarr.length == 1)
        if(this.olarr.length == 1){
              this.$message({
               message: '角色不能为空',
              type: 'warning'
         })
         return;
        }
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
        // this.olarr=[]
        this.$emit('statesbox',this.projectstats)
      },
      ensure(){
        var arr=this.olarr;
        this.$emit('statesbox',this.olarr)
        this.olarr=[]
        this.yzaisss=[]
      }
    }
  };
</script>
<style>
.rolechoseparent .selectrole .el-dialog__header{
    border-bottom: 1px solid #ddd;
    text-align: center;
}

</style>

<style lang="scss" >
.rolechoseparent .selectrole .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: none ;
    border:none;
}
.rolechoseparent .selectrole .wanc{
    width: 100%;
    height: 230px;
    // background: red;
    margin-top: 4px;
    overflow: hidden;
    overflow: auto;
}
   .rolechoseparent .selectrole .contenti{
        width: 99%;
        height:90%;
        // background:#E7F2FF;
    }
    .rolechoseparent .selectrole .contenti_headers{
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
    .rolechoseparent .selectrole .contenti_content{
        width: 100%;
        height: 100%;
        margin-top: 12px;
        // background: #E7F2FF;
        // padding: 12px;
    }
    .rolechoseparent .selectrole .contenti_content{
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
.rolechoseparent .selectrole .choseAuditor .auditorType{
    text-align: left;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeLeft,
.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight{
    width: 48%;
    padding-right: 10px;
    //margin-top: -10px;
    // border-right: 1px solid #e8e8e8;
}

.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight{
    border-right: 0px;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeLeft .alerdy,
.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight .alerdy{
    font-size: 14px;
    color:#333;
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeLeft p{
    margin-top: 10px;
    margin-bottom: 8px;
}


.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight .choTypes li{
     height: 34px;
    line-height: 34px;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight .choTypes li:hover{
    background-color: #f5f7fa;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight .choTypes li span{
    font-size: 14px;
    color: #6f7180;
    margin-left: 5px;
    /*width: 305px;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .typeRight .choTypes li i{
    margin-right: 5px;
    position: relative;
    top: 11px;

}
.rolechoseparent .selectrole .choseAuditor  .el-dialog__footer{
    // border-top: 1px solid #e8e8e8;
    // text-align: center;
}

// 项目阶段类型
.rolechoseparent .selectrole .choseAuditor .auditorType .prophaseType{
    width: 100%;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .prophaseType .el-select{
    width: 85%;
}
//项目阶段关联
.rolechoseparent .selectrole .choseAuditor .auditorType .progressassociated{
    width: 100%;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .progressassociated p{
    margin-bottom: 10px;
}
.rolechoseparent .selectrole .choseAuditor .auditorType .progressassociated .el-select{
    width: 77%;
}

.rolechoseparent .selectrole .choseAuditor .auditorType .progressassociated span{
    display: inline-block;
    width: 105px;
}
  .mt-20{
    margin-top: 20px;
  }
  .empty-data{
    padding-top: 20px;
    text-align: center;
    color: #6f7180;
  }
</style>
