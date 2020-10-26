<template>
    <div class="customdetails">
        <div class="customdetails_contenti_headers">
            <p class="headers_break">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>客户管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:routerCtype(urlBread)}">{{urlBread}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{detailTitle}}</el-breadcrumb-item>
                 </el-breadcrumb>
            </p>

            <!-- 导出和删除目前先不动  -->
            <div class="headersBox">
                <div class="headersL">
                    <h3 class="headers_clearFix" style="font-size:20px;color:#333;">
                         <span class="headers_clearFix_title">{{detailTitle}}</span>
                    </h3>
                </div>
                <div class="headersR" v-if="detailTitle == '客户联系人' || detailTitle == '机构联系人'">
                    <el-button type="primary" @click="$refs.contactChild.handleExport" v-if="$utils.checkSystemPermission('crm_financing_contacts_export')">导出</el-button>
                    <el-button type="primary" @click="$refs.contactChild.handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_contacts_add')">删除</el-button>
                </div>
                <div class="headersR" v-if="detailTitle == '股东信息'">
                    <el-button type="primary" @click="$refs.sharesChild.handleExport" v-if="$utils.checkSystemPermission('crm_financing_partner_export')">导出</el-button>
                    <el-button type="primary" @click="$refs.sharesChild.handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_partner_del')">删除</el-button>
                </div>
                <div class="headersR" v-if="detailTitle == '拜访记录'">
                    <el-button type="primary" @click="$refs.visitChild.handleExport" v-if="$utils.checkSystemPermission('crm_financing_visit_export')">导出</el-button>
                    <el-button type="primary" @click="$refs.visitChild.handleAllDelete" v-if="$utils.checkSystemPermission('crm_financing_visit_del')">删除</el-button>
                </div>
                <div class="headersR" v-if="detailTitle == '合作记录'">
                    <el-button type="primary" @click="$refs.workChild.handleExport" v-if="$utils.checkSystemPermission('crm_financing_cooperation_export')">导出</el-button>
                </div>
            </div>


            <h3 class="headers_clearFix" style="font-size:20px;color:#333;">
                <span class="headers_clearFix_title">{{detailTitle}}</span>
            </h3>
        </div>
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{urlBread}}</el-breadcrumb-item>
            <el-breadcrumb-item>客户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="finance_tit">
            <span>{{detailTitle}}</span>
        </el-row> -->
      <el-tabs type="border-card" v-model="tabs"  @tab-click="tabClick" class="no-padding">
            <el-tab-pane :label="labelObj.message">
                <custom-detail v-if="route_id == 1" @changeData="changeData" :custData="custData"></custom-detail>     <!-- 融资客户详情-->
                <natural-detail v-else-if="route_id == 2" @changeData="changeData" :naturalData="naturalData"></natural-detail>     <!-- 自然人客户详情-->
                <financ-detail v-else-if="route_id == 3" @changeData="changeData" :finacnData="finacnData"></financ-detail>           <!-- 中介机构详情-->
            </el-tab-pane>
            <el-tab-pane :label="labelObj.person" id="crm_financing_contaacts">
                <contact-person  :naturalData="naturalData"  :custData="custData"  :finacnData="finacnData" ref="contactChild"></contact-person>      <!-- 客户联系人-->
            </el-tab-pane>
            <el-tab-pane :label="labelObj.share" v-if="labelObj.flag" id="crm_financing_partner">    <!--股东信息-->
                <shares-change :custData="custData" ref="sharesChild"></shares-change>
            </el-tab-pane>
            <el-tab-pane :label="labelObj.document" id="crm_financing_file">
                <custom-file :custData="custData" :naturalData="naturalData" :finacnData="finacnData" ref="customChild"></custom-file>         <!--客户文档-->
            </el-tab-pane>
            <el-tab-pane :label="labelObj.visit" id="crm_financing_visit">
                <visit-note :naturalData="naturalData"  :custData="custData"  :finacnData="finacnData" ref="visitChild"></visit-note>               <!--拜访记录-->
            </el-tab-pane>
            <el-tab-pane :label="labelObj.work" v-if="labelObj.workfalg" id="crm_financing_cooperation">
                <work-note  :custData="custData"  :finacnData="finacnData" ref="workChild"></work-note>               <!--合作记录-->
            </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
import contactPerson from '@/pages/front/custommanage/custom-info/custom-contact/contactperson'
import visitNote from '@/pages/front/custommanage/custom-info/visit-note/visitnote'
import workNote from '@/pages/front/custommanage/custom-info/work-note/worknote'
import sharesChange from '@/pages/front/custommanage/custom-info/share-info/shareschange'
import customDetail from '@/pages/front/custommanage/custom-info/custom-details/financcustomdetail'
import customFile from '@/pages/front/custommanage/custom-info/custom-file/customfile'
import naturalDetail from '@/pages/front/custommanage/custom-info/custom-details/naturaldetail'
import financDetail from '@/pages/front/custommanage/custom-info/custom-details/financdetail'

    export default {
        name:"customdetails",
        components:{
            contactPerson,
            visitNote,
            workNote,
            sharesChange,
            customDetail,
            customFile,
            naturalDetail,
            financDetail,
        },
        data(){
            return {
                    detailTitle: '客户信息',
                    urlBread:'',
                    tabs: 0,
                    labelObj:{
                        message: '客户信息',
                        person: '客户联系人',
                        share: '股东信息',
                        document: '客户文档',
                        visit: '拜访记录',
                        work: '合作记录',
                        flag: true,
                        workfalg:true
                    },
                    route_id:'',
                    custData:'',
                    naturalData:'',
                    finacnData:''
                }
        },
        computed:{
            // 判断二级导航跳转路径
            routerCtype() {
                return (urlBread) => {
                    switch (urlBread) {
                    case '融资客户':
                        return '/medium'
                        break;
                    case '自然人客户':
                        return '/natural'
                        break;
                    case '中介机构':
                        return '/financing'
                        break;
                    }
                }
            }
        },
        //   created () {
        // //    console.log(this.$route.query.rows)
        // },
        created(){
                this.route_id = this.$store.state.customObj.id;
                if(this.route_id == 1){
                    this.labelObj.person = "客户联系人";
                    this.labelObj.flag = true;
                    this.urlBread = "融资客户";
                    //console.log(JSON.parse(this.$store.state.customObj.row));
                    this.custData = JSON.parse(this.$store.state.customObj.row);
                }else if(this.route_id == 2){
                    this.labelObj.person = "客户联系人";
                    this.labelObj.flag = false;
                    this.labelObj.workfalg = false;
                    this.urlBread = "自然人客户";
                    this.naturalData = JSON.parse(this.$store.state.customObj.row);
                }else{
                    //alert(this.route_id)
                    this.labelObj.person = "机构联系人";
                    this.labelObj.flag = false;
                    this.urlBread = "中介机构";
                    this.finacnData = JSON.parse(this.$store.state.customObj.row);
                }
                this.$nextTick(() => {
                  // 跳转 直接进入客户联系人
                  if(!!this.$route.query.isContact) {
                    this.tabClick({index:'1'},{target:{innerText:'客户联系人'}})
                    return
                  }
                  // 跳转 直接进入拜访记录
                  if(!!this.$route.query.isVisit) {
                    this.route_id == 1? this.tabClick({index:'4'},{target:{innerText:'拜访记录'}}) :this.tabClick({index:'3'},{target:{innerText:'拜访记录'}})
                    return
                  }

                })
                //
        },
        // created () {
        //     this.childMethod();
        // },
        methods:{
            /**
             * 用于子组件更新数据
             * @param {Object} {dataName}
             */
            changeData(data) {
                this[data.dataName] = JSON.parse(this.$store.state.customObj.row);
            },
            // childMethod() {

            // },
            // tab切换
            tabClick(tab, e) {
                this.tabs = tab.index;
                switch (e.target.innerText) {
                case '客户信息':
                    this.detailTitle = "客户信息";
                    //this.$parent.handleClick(row);
                    // this.loadCatalog(this.$route.query.project_id, '1');
                    break;
                case '客户联系人':
                    this.detailTitle = "客户联系人";
                    this.$refs.contactChild.contactList();
                    // this.loadCatalog(this.$route.query.project_id, '2');
                    break;
                case '机构联系人':
                        this.detailTitle = "机构联系人";
                        this.$refs.contactChild.contactList();
                        // this.loadCatalog(this.$route.query.project_id, '2');
                        break;
                case '股东信息':
                    this.detailTitle = "股东信息";
                    this.$refs.sharesChild.shareList();
                    // this.loadCatalog(this.$route.query.project_id, '3');
                    break;
                case '客户文档':
                    this.detailTitle = "客户文档";
                    this.$refs.customChild.getTableData();
                    // this.loadCatalog(this.$route.query.project_id, '1');
                    break;
                case '拜访记录':
                    this.detailTitle = "拜访记录";
                    this.$refs.visitChild.custvustList();
                    // this.loadCatalog(this.$route.query.project_id, '2');
                    break;
                case '合作记录':
                    this.detailTitle = "合作记录";
                    this.$refs.workChild.workList();
                    // this.loadCatalog(this.$route.query.project_id, '3');
                    break;
                }
                setTimeout(()=>{
                  this.$utils.getSysPermissionFn()
                },100);
            },
        }
    }
</script>

<style scoped lang="scss" type="text/css">
.headersBox {
    overflow: hidden;
    zoom:1;
    line-height: 40px;
    .headersL {
        float: left;
    }
    .headersR {
        float:right;
    }
}

.customdetails .customdetails_contenti_headers {
  padding: 0 10px;
  margin: auto;
  height: 96px;
  overflow: hidden;
  background-color: #fff;
  text-align: left;

  .headers_break {
    height: 46px;
    line-height: 46px;
  }

  .headers_clearFix {
    margin: 5px 0 19px;

    .headers_clearFix_title {
      font-size: 20px;
      font-weight: 500;
      color:#333;
    }
  }
}
  .customdetails{
        position:relative;
    padding-right: 11px;
        // background: #fff;
      .el-breadcrumb{
          line-height: 40px;
      }
      .el-tabs{
          margin-top: 12px;
      }
      .finance_tit{
          padding:10px 0;
          span{
              float:left;
              color:#333;
              font-size:16px;
              line-height:32px;
              margin-left:10px;
          }
      }
  }
  .el-input__inner {
      height: 40px;
      line-height: 40px;
  }
</style>

