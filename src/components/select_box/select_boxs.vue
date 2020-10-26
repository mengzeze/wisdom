<template>
    <div class="selectothers">
     <div class="selecttwo">
            <el-dialog
            title="选择角色"
            align="left"
            :close-on-click-modal="false"
            :visible.sync="state_box"
            @close="closes"
            @open="handleOpen"
            width="60%" class="">
            <span>
                <div class="auditorType clearfix">
                    <div class="typeLeft fl">
                        <span class="alerdy">待选角色</span>
                        <div style="border:1px solid #ddd;padding:10px;">
                                <el-input v-model="filterText" placeholder="输入关键字搜索" @input="searchWord" clearable>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                                <!--<el-select v-model="filterText" @change="filterTexts" filterable placeholder="请输入角色" style="margin-bottom:4px;">-->
                                    <!--<el-option-->
                                    <!--v-for="item in roledata"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.roleName">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <div class="wanc" style="height:336px;">
                                    <el-scrollbar style="height:100%">
                                <!-- <div v-for="item in roledata">{{item.roleName}}</div> -->
                                        <div class="typeRight fr"  style="width: 96%;padding-top: 10px;box-sizing: border-box" v-show="cxrolse">
                                            <ul class="choTypes">
                                                <li @click="roleNames(item)" class="clearfix" v-for="(item, ind) in dataObj" :key="ind" style="cursor: pointer;display: flex;">
                                                     <span><el-checkbox v-model="item.checked" @change="checkChange(item)"></el-checkbox></span>
                                                    <span class="fl" style="margin-left: 8px;">{{item.roleName}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--<div class="typeRight fr"  style="width: 91%;" v-show="cxrolses">-->
                                            <!--<ul class="choTypes">-->
                                                <!--<li @click="roleNamess(item)" class="clearfix" v-for="item in roledatas"> -->
                                                    <!--<span class="fl">{{item.roleName}}</span>-->
                                                <!--</li>-->
                                            <!--</ul>-->
                                        <!--</div>-->
                                        <div class="typeRight fr"  style="width: 91%;" v-show="cxrolses3">
                                            <ul class="choTypes">
                                                <li class="clearfix">
                                                    <span class="fl">暂无数据</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </el-scrollbar>
                                </div>
                        </div>
                    </div>
                    <div class="typeRight fr">
                        <span class="alerdy">已选角色</span>
                        <div style="border:1px solid #ddd;height:380px;padding:10px;">
                            <el-scrollbar style="height:100%">
                                <ul class="choTypes" v-if="seen">
                                    <li class="flex j-spaceBetween" v-for="(item,index) in olarr" :key="item.id">
                                        <div class="ellipsis1">{{item.roleName}}</div>
                                        <i @click="delect(item, index)" class="el-icon-delete flex-shrink0"></i>
                                    </li>
                                    <!-- <li v-if="seen2" class="clearfix" >
                                        <span class="fl">暂未选择角色</span>
                                    </li> -->
                                </ul>
                                <p v-if="seen2" class="pop_no_select_item_tips">暂无选中项</p>
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
        state_box: true,
        seen:false,
        seen2:true,
        seen3:false,
        cxrolse:true,
        cxrolses:false,
        cxrolses3:false,
        roledatas:'',
          dataObj:[],
        filterText: [],
        olarr:[],
        checkList: [],
          //filterText:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      };
    },
     props:['Role','roledata','stateRole', 'checkedData', 'process', 'findObj'],
     watch:{
        Role: function(newV, oldV) {
                if(newV.state == 2){
                this.state_box=true;
                this.dataObj=this.roledata;
                }
            },
         Role: function(newV, oldV) {
                 this.state_box=true
             this.dataObj=this.roledata;
         },
       dataObj (val, oldVal) {
          if (val) {
            val.forEach(v => {
              v.checked = false
            })
          }
       },
       olarr (val, oldVal) {
         if (!val.length) {
           this.checkList = []
         }
       },
       state_box (val) {
          if (val) {
            this.dataObj.forEach(val => {
              this.findObj.forEach(v => {
                if (val.id === v.id) {
                  val.checked = true
                }
              })
            })
            this.olarr = this.findObj
          }
       }
    },
      mounted(){
          this.dataObj=this.roledata;
          this.filterText = '';
          this.handleOpen()
      },
    methods: {
      handleClose(){
        this.$emit('close')
      },
      handleOpen(){
        // 新建流程页面，回显数据
        this.process && (this.olarr = this.checkedData)
      },
        searchWord(){
            if(this.filterText == ''){
                this.dataObj= this.roledata
            }else{
               this.querySearch(this.filterText);
            }
        },
        querySearch(queryString) {
            var restaurants = this.roledata;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            this.dataObj = results;
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
            }
        }
      },
      closes(){
          this.olarr=[]
        this.handleClose()
      } ,
      roleNames(item){
        if (item) {
          this.dataObj.forEach(v => {
            if (v.id === item.id) {
              v.checked = true
            }
          })
        }
          if(this.stateRole){
              this.olarr = [];
              this.olarr.push(item)
              this.seen=true
              this.seen2=false
          }else{
              for(var i=0;i<this.olarr.length;i++){
                  if(item == this.olarr[i]){
                      return;
                  }
              };
              this.olarr.push(item)
              this.seen=true
              this.seen2=false
          }
      },
      delect(item, index){
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
        this.dataObj.forEach(v => {
          if (v.id === item.id) {
            v.checked = false
          }
        })
      },
      checkChange (item) {
        this.checkList.push(item)
        this.dataObj.forEach(val => {
          this.checkList.forEach(v => {
            if (val.id === v.id) {
              val.checked = true
            }
          })
        })
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      dialogVisibles(){
        this.state_box=false
        this.olarr=[]
        this.handleClose()
      },
      ensure(){
       var arr=this.olarr;
        this.$emit('statesbox',this.olarr)
        this.state_box=false
        this.filterText= ''
      }
    }
  };
</script>
<style>
.selectothers .selecttwo .el-dialog__header{
    border-bottom: 1px solid #ddd;
    text-align: center;
}
</style>

<style lang="scss" >
.selectothers .selecttwo .el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: none ;
    border:none;
}
.selectothers .selecttwo .wanc{
    width: 100%;
    height: 230px;
    // background: red;
    margin-top: 4px;
    overflow: hidden;
    overflow: auto;
}
  .selectothers .selecttwo .contenti{
        width: 99%;
        height:90%;
        // background:#E7F2FF;
    }
   .selectothers .selecttwo .contenti_headers{
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
   .selectothers .selecttwo  .contenti_content{
        width: 100%;
        height: 100%;
        margin-top: 12px;
        // background: #E7F2FF;
        // padding: 12px;
    }
    .selectothers .selecttwo .contenti_content{
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


//  .el-dialog .el-dialog__header{
//     background-color: #1A5FA4;
//     text-align: left;

// }
// .choseAuditor .el-dialog .el-dialog__header span{
//     color: #fff;
// }
// .choseAuditor .el-dialog__headerbtn .el-dialog__close{
//     color:#fff;
// }
.selectothers .selecttwo  .auditorType{
    text-align: left;
}
.selectothers .selecttwo  .auditorType .typeLeft,
.selectothers .selecttwo  .auditorType .typeRight{
    width: 47%;
    padding-right: 10px;
    margin-top: -10px;
    // border-right: 1px solid #e8e8e8;
}

.selectothers .selecttwo  .auditorType .typeRight{
    border-right: 0px;
}
.selectothers .selecttwo  .auditorType .typeLeft .alerdy,
.selectothers .selecttwo  .auditorType .typeRight .alerdy{
    font-size: 14px;
    color:#333;
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
}
.selectothers .selecttwo  .auditorType .typeLeft p{
    margin-top: 10px;
    margin-bottom: 8px;
}


.selectothers .selecttwo  .auditorType .typeRight .choTypes li{
     height: 34px;
    line-height: 34px;
}
.selectothers .selecttwo  .auditorType .typeRight .choTypes li:hover{
    background-color: #f5f7fa;
}
.selectothers .selecttwo  .auditorType .typeRight .choTypes li span{
    font-size: 14px;
    color: #333;
    margin-left: 5px;
    /*width: 155px;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.selectothers .selecttwo  .auditorType .typeRight .choTypes li i{
    margin-right: 5px;
    position: relative;
    top: 11px;

}
.selectothers .selecttwo   .el-dialog__footer{
    // border-top: 1px solid #e8e8e8;
    // text-align: center;
}

// 项目阶段类型
.selectothers .selecttwo  .auditorType .prophaseType{
    width: 100%;
}
.selectothers .selecttwo  .auditorType .prophaseType .el-select{
    width: 85%;
}
//项目阶段关联
.selectothers .selecttwo  .auditorType .progressassociated{
    width: 100%;
}
.selectothers .selecttwo  .auditorType .progressassociated p{
    margin-bottom: 10px;
}
.selectothers .selecttwo  .auditorType .progressassociated .el-select{
    width: 77%;
}

.selectothers .selecttwo  .auditorType .progressassociated span{
    display: inline-block;
    width: 105px;
}
</style>
<style>
.selectothers .selecttwo .el-dialog__header{
    border-bottom: 1px solid #ddd;
}

.selectothers .selecttwo .el-dialog__footer{
    padding-top:0px;
}
</style>

