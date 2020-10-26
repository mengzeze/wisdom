<template>
    <div class="borrowTime" id="borrowTime">
        <div class="b_header">
            <p class="b_header_break">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
                    <el-breadcrumb-item>借阅时间配置</el-breadcrumb-item>
                </el-breadcrumb>
            </p>
            <div>
                <h3 class="b_header_clearFix">借阅时间配置</h3>
            </div>

        </div>
        <div class="b_section">
            <div class="b_section_borrowTime">
                <div class="b_section_bt_top">
                    <div class="b_section_bt_top_left">
                        <p class="b_section_bt_top_left_title">借阅时间配置:</p>
                        <!-- :disabled="addConfigDisabled" -->
                        <el-button type="primary" @click="addConfigFn"  >添加配置</el-button>
                    </div>
                    <div class="b_section_bt_top_right">
                        <el-button v-if="!timeIsEndit" @click="tiemCancelFn">取消</el-button>
                        <el-button type="primary" v-if="!timeIsEndit" @click="timeSaveFn(2)">保存</el-button>
                        <el-button type="primary" icon="el-icon-edit-outline" v-if="timeIsEndit" @click="timeEditFn">编辑</el-button>
                    </div>

                </div>
                <div class="b_section_bt_bottom">
                    <div class="b_section_bt_bottom_list">
                        <!-- <el-tag size="medium" closable>中等标签</el-tag> -->
                        <el-tag
                            :key="idx"
                            v-for="(tag,idx) in borrowingTimeArray"
                            :closable="isClosable"
                            :disable-transitions="false"
                            @close="handleCloseFn(tag)">
                            {{tag}}
                        </el-tag>
                    </div>
                </div>
            </div>
            <div class="b_section_borrowJurisdiction">
                <div class="b_section_bj_left">
                    <div class="b_section_bj_left_top">
                      <div class="b_section_bj_left_top_leftTitle">借阅权限:</div>
                      <div class="b_section_bj_left_top_rightTitle">权限配置</div>
                    </div>
                    <div class="b_section_bj_left_bottom">
                        <div class="b_section_bj_left_bottom_allPro">
                            <el-radio v-model="jurisdiction_radio" :disabled="pro_disabled"  label="-1" @change="handleRadioFn">全部项目</el-radio>
                            <div class="b_section_bj_left_bottom_allPro_downLoad">
                              <el-checkbox v-model="allProChecked" :disabled="pro_disabled" v-if="allProIsShow">下载</el-checkbox>
                            </div>
                        </div>
                        <div class="b_section_bj_left_bottom_pro">
                            <el-radio v-model="jurisdiction_radio" :disabled="pro_disabled" label="1" @change="handleRadioFn">项目</el-radio>
                        </div>
                        <div class="b_section_bj_left_bottom_list">
                            <div class="b_section_bj_left_bottom_list_item" v-for="(item,idx) in jurisdictionArray" :key="idx">
                                <div class="b_section_bj_left_bottom_list_item_left">
                                    <el-checkbox v-model="item.checked" :disabled="item.disabled"></el-checkbox>
                                    <p>{{item.name}}</p>
                                </div>
                                <div class="b_section_bj_left_bottom_list_item_right" v-if="proDownload">
                                    <el-checkbox v-model="item.checked_opation" :disabled="item.disabled"></el-checkbox>
                                    <p>下载</p>
                                </div>
                            </div>

                          <!-- <div class="b_section_bj_left_bottom_list_item" v-for="(item,idx) in jurisdictionArray" :key="idx">
                            <div class="b_section_bj_left_bottom_list_item_left">
                              <el-checkbox v-model="item.checked" :disabled="item.disabled"></el-checkbox>
                              <p>{{item.name}}</p>
                            </div>
                            <div class="b_section_bj_left_bottom_list_item_right" v-if="proDownload">
                              <el-checkbox v-model="item.checked_opation" :disabled="item.disabled"></el-checkbox>
                              <p>下载</p>
                            </div>
                          </div> -->
                        </div>
                    </div>
                    <!-- <div class="b_section_bj_left_title">借阅权限:</div>
                    <div class="b_section_bj_left_proList">
                        <div class="b_section_bj_left_proList_allPro">
                            <div class="b_section_bj_left_proList_allPro_left">
                                <el-radio v-model="jurisdiction_radio" :disabled="pro_disabled"  label="-1" @change="handleRadioFn">全部项目</el-radio>
                                <el-checkbox v-model="allProChecked" :disabled="pro_disabled" v-if="allProIsShow">下载</el-checkbox>
                            </div>
                            <div class="b_section_bj_left_proList_allPro_right">权限配置</div>
                        </div>
                        <div class="b_section_bj_left_proList_pro">
                            <el-radio v-model="jurisdiction_radio" :disabled="pro_disabled" label="1" @change="handleRadioFn">项目</el-radio>
                        </div>

                    </div>
                    <div class="b_section_bj_left_bjConfig">

                    </div> -->
                </div>
                <div class="b_section_bj_right">
                    <el-button v-if="!proIsEndit" @click="proCancelFn">取消</el-button>
                    <el-button type="primary" v-if="!proIsEndit" @click="proSaveFn">保存</el-button>
                    <el-button type="primary" icon="el-icon-edit-outline" v-if="proIsEndit" @click="proEditFn">编辑</el-button>
                </div>
            </div>
        </div>
        <!--添加配置-->
        <el-dialog :close-on-click-modal="false" title="添加配置" class="addConfig_dialog" @close="addConfigClose" :visible.sync="addConfigVisible" width="500px" >
            <div class="addConfig_middle">
                <p class="addConfig_middle_title">借阅时间:</p>
                <div class="addConfig_middle_time">
                    <el-input placeholder="请输入时间" class="" v-model="addConfigTime_input" @input="timeVerifyFn" maxlength="4"></el-input>
                </div>
                <span class="addConfig_middle_titleOne">小时</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="addConfigVisible = false">取 消</el-button>
                <el-button size="medium" type="primary" @click="addConfigAffirmFn">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            token: '', //请求接口默认必传数据
            userId: '', //请求接口默认必传数据
            pro_id: '', //项目Id
            projectMsg: '', //项目信息
            requestCode: {}, //所有请求的状态码
            addConfigVisible: false, //添加配置弹框flag
            addConfigDisabled: true, //添加配置按钮flag
            timeIsEndit: true, //借阅时间的编辑开关
            isClosable: false, //每个借阅时间是否可以删除的开关
            borrowingTimeArray: [], //借阅时间的数据
            proIsEndit: true, //借阅权限的编辑开关
            addConfigTime_input: '', //添加配置借阅时间
            jurisdiction_radio: '', //借阅权限项目
            jurisdictionArray: [], //借阅权限列表
            allProIsShow: false, //全部项目的下载flag
            allProChecked: false,
            pro_disabled: true,
            proDownload: false,


        };
    },
    created() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.pro_id = this.$store.state.projectMsg.pro_id;
        this.projectMsg = this.$store.state.projectMsg.projectMsg;
        this.requestCode = this.code.codeNum;
        this.timeQueryFn();
        this.jurisdictionQueryFn();
    },
    mounted(){
    },
    methods: {
      addConfigClose() {
        this.addConfigTime_input = '';
      },
        addConfigFn() { //添加配置弹框函数
            this.addConfigVisible = true;
        },
        handleCloseFn(itemValue) { //删除当前的借阅时间
          if(this.borrowingTimeArray.length <= 1) {
            this.$message.error('当前时间不能删除');
            return;
          } else {
            this.borrowingTimeArray.splice(this.borrowingTimeArray.indexOf(itemValue), 1)
          }
        },
        timeEditFn() { //借阅时间的编辑函数
            this.timeIsEndit = false;
            this.addConfigDisabled = false;
            this.isClosable = true;
        },
        timeSaveFn(type) { //借阅时间的保存函数 type类型 1是添加 2是删除
           let data = {
                token: this.token,
                userId: this.userId,
                projectId: this.pro_id,
                data: {
                    borrowingTimeS: this.borrowingTimeArray
                }
            };
            this.$post("/doc/project/addDocPaperBorrTime",data).then((res => {
                if(this.requestCode.SUCCESS !== res.code){
                    this.$message.error(res.msg);
                    return;
                }
                if(type == 1) {
                  this.addConfigVisible = false;
                  this.$message.success('添加成功');
                } else if(type == 2) {
                  this.timeIsEndit = true;
                  this.addConfigDisabled = true;
                  this.isClosable = false;
                  this.$message.success(res.msg);
                }
                
            })).catch(error => {

            });
        },
        tiemCancelFn() { //借阅时间的取消函数
            this.timeQueryFn()
            this.timeIsEndit = true;
            this.addConfigDisabled = true;
            this.isClosable = false;
        },
        timeVerifyFn() { //验证输入的借阅时间是否正整数
            this.addConfigTime_input = this.addConfigTime_input.replace(/[^\.\d]/g,'');
            this.addConfigTime_input = this.addConfigTime_input.replace('.','');
            if(this.addConfigTime_input && Number(this.addConfigTime_input) === 0) {
              this.addConfigTime_input = 1;
            }
        },
        addConfigAffirmFn() { //确认配置弹框的确认
            if(this.addConfigTime_input == '') {
              this.$message.warning('时间不能为空');
              return
            }
            if(this.borrowingTimeArray.indexOf(Number(this.addConfigTime_input)) != -1) {
                this.$message.warning('当前输入的时间已存在');
            } else {
               this.borrowingTimeArray.push(Number(this.addConfigTime_input));
               this.timeSaveFn(1) // 添加是类型是1
              //  this.addConfigVisible = false;
            }
        },
        timeQueryFn() { //借阅时间的查询函数
            let data = {
                token: this.token,
                userId: this.userId,
                projectId: this.pro_id
            };
            this.$post("/doc/project/selectDocPaperBorrTime",data).then((res => {
                  this.borrowingTimeArray = []
                if(this.requestCode.SUCCESS !== res.code){
                  if(this.requestCode.RESULT_EMPTY == res.code) {
                    return;
                  } else {
                    this.$message.error(res.msg);
                    return;
                  }
                }
                res.data.map((item,idx) => {
                    this.borrowingTimeArray.push(item.borrowingTime);
                })
            })).catch(error => {

            });
        },
        jurisdictionQueryFn() { //借阅权限的查询函数
            let data = {
                token: this.token,
                userId: this.userId,
                projectId: this.pro_id
            };
            this.$post("/doc/project/selectDocPaperBorrPermiss",data).then((res => {
                if(this.requestCode.SUCCESS !== res.code){
                  if(this.requestCode.RESULT_EMPTY == res.code) {
                    return;
                  } else {
                    this.$message.error(res.msg);
                    return;
                  }
                }
                this.jurisdictionArray = res.data;
                this.jurisdiction_radio = res.data[0].checkAll ? '-1' : '1';
                if(this.jurisdiction_radio != '1'){
                  this.allProIsShow = true;
                  if(res.data[0].checkAll && res.data[0].opation === 1) {
                    this.allProChecked = true;
                  }
                  this.jurisdictionArray.map((item,idx) => {
                    this.$set(item,"checked",false);
                    this.$set(item,"disabled",true);
                  })
                } else {
                  this.jurisdictionArray.map((item,idx) => {
                    if(item.opation === 1) {
                      this.$set(item,"checked",true);
                      this.$set(item,'checked_opation',true)
                    } else {
                      this.$set(item,"checked",false);
                      this.$set(item,'checked_opation',false)
                    }
                    this.proDownload = true;
                    this.$set(item,"disabled",true);
                  })
                }
            })).catch(error => {

            });
        },
        proEditFn() { //借阅权限的编辑函数
            this.proIsEndit = false;
            this.pro_disabled = false;
            if(this.jurisdiction_radio === '1') {
                this.jurisdictionArray.forEach((item,idx) => {
                  this.$set(item,"disabled",false);
                })
            }
        },
        proSaveFn() { //借阅权限的保存函数
          let dpbPermissArray = [],obj = {},arr = [];
          if(this.jurisdiction_radio == -1) { //当前是全部项目数据处理
            obj.projectId = -1;
            obj.opation = this.allProChecked ? 1 : 0;
            dpbPermissArray.push(obj)
          } else {  //当前是项目数据处理
            this.jurisdictionArray.forEach((item,idx) => {
              if(item.checked) {
                dpbPermissArray.push({
                  projectId : item.projectId,
                  opation:item.checked_opation ? 1 : 0
                })
              }
            })
          }

          let data = {
              token: this.token,
              userId: this.userId,
              projectId: this.pro_id,
              data:{
                dpbPermiss: dpbPermissArray
              }
          };
          this.$post("/doc/project/updateDocPaperBorrPermiss",data).then((res => {
              if(this.requestCode.SUCCESS !== res.code){
                  this.$message.error(res.msg);
                  return;
              }
              this.$message.success(res.msg);
              this.proIsEndit = true;
              this.pro_disabled = true;
              this.jurisdictionQueryFn();
          })).catch(error => {

          });
        },
        proCancelFn() { //借阅权限的取消函数
          this.pro_disabled = true;
          this.allProIsShow = false;
          this.jurisdiction_radio = '';
          this.proDownload = false;
          this.proIsEndit = true;
          this.jurisdictionQueryFn()
        },
        handleRadioFn(e) {
          if(e == 1) {
            this.allProIsShow = false;
            this.allProChecked = false;
            this.jurisdictionArray.map((item,idx) => {
              this.$set(item,"disabled",false);
              this.proDownload = true;
            })
          } else {
            this.allProIsShow = true;
            this.allProChecked = false;
            this.jurisdictionArray.map((item,idx) => {
              this.$set(item,"checked",false);
              this.$set(item,"disabled",true);
              this.$set(item,"checked_opation",false);
              this.proDownload = false;
            })
          }
        }
    }
}
</script>
<style lang="scss" scoped>
    .borrowTime{
        width: 100%;
        display: flex;
        flex-direction: column;
        .b_header{
            width: 100%;
            height: 90px;
            margin: auto;
            overflow: hidden;
            background-color:#FFFFFF;
            text-align: left;
            .b_header_break {
                height: 20px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-top: 1%;
                margin-left: 10px;
            }
            div{
                display: flex;
                align-items: center;
                .b_header_clearFix {
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    margin-top: 16px;
                    margin-bottom: 10px;
                    font-weight: 600;
                    margin-left: 10px;
                }
            }

        }
        .b_section{
            width: 100%;
            margin-top: 14px;
            .b_section_borrowTime{
                // height: 113px;
                margin-bottom: 4px;
                background: rgba(255,255,255,1);
                .b_section_bt_top{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 13px 0 10px 0;
                    height: 70px;
                    .b_section_bt_top_left{
                        display: flex;
                        align-items: center;
                        .b_section_bt_top_left_title{
                            margin:0 20px 0 22px;

                        }
                    }
                    .b_section_bt_top_right{
                        display: flex;
                        align-items: center;
                        margin-right: 30px;
                    }

                }
                .b_section_bt_bottom{
                    padding-bottom: 20px;
                    .b_section_bt_bottom_list{
                        margin-left: 130px;
                        display: flex;
                        flex-wrap: wrap;
                        .el-tag {
                            margin-right: 10px;
                            margin-top: 10px;
                        }
                        // .b_section_bt_bottom_list_chunk{
                        //     width: 84px;
                        //     height: 34px;
                        //     display: flex;
                        //     align-items: center;
                        //     justify-content: center;
                        //     border-radius: 3px;
                        //     background: #DAE9FD;
                        //     color: #6CA6F8;

                        //     span{
                        //         display: inline-block;
                        //     }
                        //     .b_section_bt_bottom_list_chunk_title{

                        //     }
                        //     .b_section_bt_bottom_list_chunk_del{
                        //         margin-left: 5px;
                        //     }
                        // }
                    }
                }
            }
            .b_section_borrowJurisdiction{
                /*height: 774px;*/
              height:auto;
              padding-bottom: 30px;
                background:rgba(255,255,255,1);
                display: flex;
                justify-content: space-between;
                .b_section_bj_left{
                    display: flex;
                    flex-direction: column;
                    .b_section_bj_left_top{
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding-top: 19px;
                      .b_section_bj_left_top_leftTitle{
                        margin-left: 22px;
                      }
                      .b_section_bj_left_top_rightTitle{
                        margin-left: 502px;
                      }
                    }
                    .b_section_bj_left_bottom{
                      display: flex;
                      flex-direction: column;
                      margin-top: 20px;
                      .b_section_bj_left_bottom_allPro{
                        display: flex;
                        justify-items: flex-start;
                        margin-left: 115px;
                        .b_section_bj_left_bottom_allPro_downLoad{
                          margin-left: 360px;
                        }
                      }
                      .b_section_bj_left_bottom_pro{
                        display: flex;
                        justify-items: flex-start;
                        margin-left: 115px;
                        margin-top: 20px;
                      }
                      .b_section_bj_left_bottom_list{
                        display: flex;
                        flex-direction: column;
                        margin-left: 115px;
                        .b_section_bj_left_bottom_list_item{
                          display: flex;
                          justify-items: flex-start;
                          margin-top: 5px;
                          .b_section_bj_left_bottom_list_item_left{
                            display: flex;
                            align-items: center;
                            p{
                                width: 314px;
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                margin-left: 10px;
                                cursor: pointer;
                                text-align: left;
                            }
                          }
                          .b_section_bj_left_bottom_list_item_right{
                            margin-left: 135px;
                            display: flex;
                            align-items: center;
                            p{
                                margin-left: 10px;
                                cursor: pointer;
                            }
                          }
                        }
                      }
                    }
                    // .b_section_bj_left_title{
                    //   margin-left: 22px;
                    //   padding-top: 19px;
                    // }
                    // .b_section_bj_left_proList{
                    //     margin-left: 64px;
                    //     padding-top: 19px;
                    //     display: flex;
                    //     flex-direction: column;
                    //     .b_section_bj_left_proList_allPro{
                    //         display: flex;
                    //         align-items: center;
                    //         .b_section_bj_left_proList_allPro_left{
                    //             display: flex;
                    //             align-items: center;
                    //             height: 20px;
                    //             line-height: 20px;
                    //         }
                    //         .b_section_bj_left_proList_allPro_right{
                    //             margin-left: 270px;
                    //         }
                    //     }
                    //     .b_section_bj_left_proList_pro{
                    //         height: 30px;
                    //         text-align: left;
                    //         line-height: 30px;
                    //     }
                    //     .b_section_bj_left_proList_list{
                    //         display: flex;
                    //         flex-direction: column;
                    //         .b_section_bj_left_proList_list_item{
                    //             display: flex;
                    //             .b_section_bj_left_proList_list_item_left{
                    //                 display: flex;
                    //                 align-items: center;
                    //                 p{
                    //                     width: 314px;
                    //                     overflow:hidden;
                    //                     text-overflow:ellipsis;
                    //                     white-space:nowrap;
                    //                     margin-left: 10px;
                    //                     cursor: pointer;
                    //                     text-align: left;
                    //                 }
                    //             }
                    //             .b_section_bj_left_proList_list_item_right{
                    //                 margin-left: 100px;
                    //             }
                    //         }
                    //     }
                    // }
                    // .b_section_bj_left_bjConfig{
                    //     margin-left: 100px;
                    //     padding-top: 19px;
                    // }
                }
                .b_section_bj_right{
                    margin-right: 30px;
                    padding-top: 19px;
                }
            }
        }
        .addConfig_dialog{
            .addConfig_middle{
                margin: 44px 0 41px 31px;
                display: flex;
                align-items: center;
                .addConfig_middle_title{
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                }
                .addConfig_middle_time{
                    width: 172px;
                    margin-left: 22px;
                }
                .addConfig_middle_titleOne{
                    font-weight: 400;
                    color:rgba(51,51,51,1);
                    margin-left: 10px;
                }
            }
        }
    }
</style>
<style>
    .addConfig_dialog .el-dialog__header{
        text-align: left;
    }
    .addConfig_dialog .el-dialog__body{
        padding: 0;
    }
    .borrowTime .el-checkbox{
        margin-right: 0;
    }
</style>

