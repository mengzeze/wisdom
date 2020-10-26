<template>
    <div class="fullsearch" id="fullsearch">
        <div class="fullsearch_nav">
            <el-button icon="el-icon-back" circle @click="back" class="back_btn"></el-button>
            <div class="nav_fullsearch">
                <span>全文检索:</span>
                <el-input v-model="fullsearch_input" placeholder="请输入内容"></el-input>
            </div>
            <el-select
                v-model="fullsearch_select"
                filterable
                allow-create
                default-first-option

                class="nav_projectSelect"
                popper-class="nav_projectSelect_dropdown"
                disabled
                >
                <el-option
                    v-for="item in fullsearch_options"
                    :title="item.name"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" class="nav_query" @click="queryFn">查询</el-button>
            <el-button icon="el-icon-refresh" class="nav_reset" @click="resetFn">重置</el-button>
        </div>
        <el-table
            ref="table"
            :data="fullsearchData"
            tooltip-effect="dark"
            style="width: 100%"
            height="100%"
            @row-dblclick="dblclickFn"
            >
            <el-table-column
            label="文件名"
            prop="docName"
            width="540">
            <template slot-scope="scope">
                    <div class="table_fileName">
                        <div class="table_fileName_icon">
                            <img :src="scope.row.fileIcon">
                        </div>
                        <p v-html="scope.row.highlightName" class="table_fileName_title" :title="scope.row.docName"></p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="projName"
            label="所在项目"
            width="200"
            >
                <template slot-scope="scope">
                        <span class="table_projName" :title="scope.row.projName">{{scope.row.projName}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="parentName"
            label="所在目录"
            width="300"
            >
                <template slot-scope="scope">
                        <span class="table_parentName" :title="scope.row.parentName">{{scope.row.parentName}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="修改时间"
            align="center"
            width="200">
                <template slot-scope="scope">
                    <div v-if="scope.row.docType == 0" class="table_time">
                        <span class="table_time_updateTime">{{scope.row.createTime}}</span>
                        <div><span class="table_time_updateUserName" :title="scope.row.createUserName">{{scope.row.createUserName}}</span>&nbsp;生成<span class="table_time_time_docVersionNumber color-primary">v{{scope.row.docVersionNumber}}</span></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            align="left">
                <template slot-scope="scope">
                    <div class="table_operation">
                        <span class="icon-operate-btn iconfont zhaiyao" v-if="scope.row.docType != 1 && scope.row.isLinkDelete != 1" @click="toogleExpand(scope.row)" title="摘要"></span>
                        <span class="icon-operate-btn iconfont dingwei" @click="docPositon(scope.row)" title="定位"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            type="expand"
            class-name="fakeStyle"
            width="0">
                <template slot-scope="scope" >
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div v-html="scope.row.highlightContent"></div>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            token: '', //请求接口默认必传数据
            userId: '123', //请求接口默认必传数据
            projectId: '', //请求接口默认必传数据
            pro_id: '', //请求接口默认必传数据
            pageNo: 0,  //请求接口默认必传数据
            pageSize: 500, //请求接口默认必传数据
            requestCode: {}, //所有请求的状态码
            fullsearch_input: '', //全文检索搜索框
            fullsearch_select: '', //
            fullsearch_options: [],
            fullsearchData: [], //列表数据
            newProjId: '',
            fullsearchId: 1,
            sealFlag: '', //区分是从底稿管理进来还是查看底稿
        };
    },
    created() {
        this.fullsearch_input = this.$route.query.searchName;
        this.projectId = this.$route.query.projectId
        this.sealFlag = this.$route.query.sealFlag
        this.token = this.$store.state.loginObject.userToken;
        this.useId = this.$store.state.loginObject.userId;
        this.pro_id = this.$store.state.projectMsg.pro_id;
        this.requestCode = this.code.codeNum;
        if(this.sealFlag == 1) {
          this.pro_id = this.projectId;
        }
        this.fullsearch_select = this.$route.query.title;
        this.queryFn()

    },
    mounted() {
        document.getElementById("fullsearch").style.height = (this.getViewPortHeight() - 70 - 90 -14) + "px";
    },
    beforeRouteEnter(to, from, next) {
        if(from.fullPath.indexOf('/preview') === -1) {
          sessionStorage.fullPath = from.fullPath
        }
        next();
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = false;
        next();
    },
    methods: {
        back() {
          let fullPath = sessionStorage.fullPath;
          this.$router.push(fullPath);
        },
        getViewPortHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        resetFn() {
            this.fullsearch_input = '';
        },
        examineQueryFn() {
           var data = {}
            if(this.fullsearch_select != '') {
                 if (this.newProjId != '') {
                    this.fullsearch_options.map(item => {
                        if(item.id == this.pro_id) {
                            this.fullsearch_select = item.name
                            console.log(item.name)
                        }
                    })
                    data = {
                        token: this.token,
                        userId: this.useId,
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                        data: {
                            docPaperContent: this.fullsearch_input,
                            projectId: this.newProjId,
                        }
                    };

                }  else {
                    data = {
                        token: this.token,
                        userId: this.useId,
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                        data: {
                            docPaperContent: this.fullsearch_input,
                            projectId: this.pro_id,
                        }
                    };


                }
            } else {
                this.$message({
                    message: '搜索条件不能为空',
                    type: "warning"
                });
            }


            this.$post('/doc/paper/getProjectPaperFileParentId',data)
            .then((res) => {
                if(this.requestCode.SUCCESS == res.code) {
                    res.data.content.map(item => {
                        item.keyContenthHight = '40px'
                        this.iconFilter(item)
                    })
                    this.fullsearchData = res.data.content
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        queryFn() {
            //查询
            if(this.fullsearch_input != '') {
               if(this.sealFlag == 1) {
                  this.examineQueryFn()
                  this.$router.push({
                      path: '/examineFullsearch',
                      query: {
                          searchName: this.fullsearch_input,
                          projectId: this.newProjId != '' ? this.newProjId : this.pro_id,
                          title: this.fullsearch_select,
                          sealFlag: 1
                      }
                  });
                }
            } else {
                this.$message({
                    message: '搜索条件不能为空',
                    type: "warning"
                });
            }
        },
        getUrlKey(name){
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
        },
        dblclickFn(itemValue, event, column) { //双击每条数据
        if(column.type==="selection") return
            var proId = this.newProjId ? this.newProjId : this.pro_id
            var jurisdiction = rightSysPermissionFn(proId,'paper_file_file_preview')
            if(jurisdiction) {
                if(itemValue.docType == 0) {
                    var previewData = {
                      projectId: proId,
                        rfsId: itemValue.rfsId,
                        docId : itemValue.docId,
                        photoType: itemValue.type,
                        sourceType: 'manuscriptmanage',
                        docName: itemValue.docName
                    }
                    this.$store.commit('previewAllFn',previewData )
                }
            } else {
                this.$message({
                    message: '当前无权限',
                    type: "warning"
                });
            }
        },
        toogleExpand(row) {
            let $table = this.$refs.table;
            this.fullsearchData.map((item) => {
             if (row.id != item.id) {
               $table.toggleRowExpansion(item, false)
             }
            })
           $table.toggleRowExpansion(row)
        },
        docPositon(row) { //文件定位
          let fullPath = sessionStorage.fullPath;
          let obj ={
            token: this.token,
            userId: this.userId,
            data:{
              projectId: this.projectId,
              id: row.id,
              type: "borr",
              docType: row.docType
            }
          }
          var that = this;
          this.$post("/doc/paper/location",obj).then((res => {
            if(this.requestCode.SUCCESS !== res.code){
              if(this.requestCode.RESULT_EMPTY == res.code) {
                return;
              } else {
                this.$message.error(res.msg);
                return;
              }
            }

            res.data.id = row.id
            this.$router.push({
              path: fullPath,
              query: {
                locationData: JSON.stringify(res.data),
                isPosition: true
              }
            })
          })).catch(error => {

          });
        },
        iconFilter(itemValue) { //过滤重命名的icon
            if (itemValue.docType == 1) {
               itemValue.fileIcon = require("../../common/fileIcon/FolderType1.png");
            } else {
                var hz_name = itemValue.type.toLowerCase();
                if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
                    itemValue.fileIcon = require("../../common/fileIcon/DocType.png");
                } else if (
                    hz_name == "xls" ||
                    hz_name == "xlsx" ||
                    hz_name == "excel"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/XlsType.png");
                } else if (
                    hz_name == "ppt" ||
                    hz_name == "pptx" ||
                    hz_name == "pps" ||
                    hz_name == "ppsx" ||
                    hz_name == "ppsm"
                    ) {
                        itemValue.fileIcon = require("../../common/fileIcon/PptType.png");
                } else if (
                    hz_name == "jpg" ||
                    hz_name == "jpeg" ||
                    hz_name == "gif" ||
                    hz_name == "bmp" ||
                    hz_name == "png"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/ImgType.png");
                } else if (
                    hz_name == "wmv" ||
                    hz_name == "avi" ||
                    hz_name == "dat" ||
                    hz_name == "asf" ||
                    hz_name == "rm" ||
                    hz_name == "rmvb" ||
                    hz_name == "mpg"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
                } else if (
                    hz_name == "mpeg" ||
                    hz_name == "mkv" ||
                    hz_name == "dvix" ||
                    hz_name == "dv" ||
                    hz_name == "flv" ||
                    hz_name == "mov" ||
                    hz_name == "mp4" ||
                    hz_name == "qt" ||
                    hz_name == "smil" ||
                    hz_name == "swf" ||
                    hz_name == "wmv" ||
                    hz_name == "3gp"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/VideoType.png");
                } else if (
                    hz_name == "mp3" ||
                    hz_name == "wav" ||
                    hz_name == "wma" ||
                    hz_name == "mid"
                    ) {
                    itemValue.fileIcon = require("../../common/fileIcon/MusicType.png");
                } else if (hz_name == "pdf") {
                    itemValue.fileIcon = require("../../common/fileIcon/PdfType.png");
                } else if (hz_name == "indd") {
                    itemValue.fileIcon = require("../../common/fileIcon/indd.png");
                } else if (hz_name == "ai") {
                    itemValue.fileIcon = require("../../common/fileIcon/ai.png");
                } else if (hz_name == "psd") {
                    itemValue.fileIcon = require("../../common/fileIcon/ps.png");
                } else if (hz_name == "tif") {
                    itemValue.fileIcon = require("../../common/fileIcon/tiff.png");
                } else if (hz_name == "zip" || hz_name == "rar") {
                    itemValue.fileIcon = require("../../common/fileIcon/RarType.png");
                } else {
                    itemValue.fileIcon = require("../../common/fileIcon/other.png");
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.fullsearch{
    width: 100%;
    height: 891px;
    background: #ffffff;
    display: flex;
    font-size: MicrosoftYaHei;
    flex-direction: column;
    .fullsearch_nav{
        width: 100%;
        height: 82px;
        display: flex;
        align-items: center;
        .back_btn{
            margin-left: 15px;
        }
        .nav_fullsearch{
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                margin-left: 10px;
            }
            .el-input{
                width: 310px;
                margin-left: 10px;
            }
        }
        .nav_projectSelect{
            width: 250px;
            margin-left: 50px;
        }
        .nav_reset{
            width: 100px;
        }
        .nav_query{
            width: 100px;
            margin-left: 50px;
            background: #1A5FA4;
            color: #FFFFFF;
        }
        span{
            display: inline-block;
        }
    }
    .fullsearch_title{
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
        background: #FAFAFA;
        .fullsearch_title_fileName{
            margin-left: 68px;
        }
        .fullsearch_title_project{
            margin-left: 200px;
        }
        .fullsearch_title_catalogue{
            margin-left: 183px;
        }
        .fullsearch_title_time{
            margin-left: 281px;
        }
        .fullsearch_title_operation{
            margin-left: 132px;
        }
        span{
            display: inline-block;
        }
    }
    .table_fileName{
        display: flex;
        .table_fileName_icon{
            width: 23px;
            height: auto;
            margin-right: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 100%;
                height: auto;
            }
        }
        .table_fileName_title{
            width: 488px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
    }
    .table_projName{
        width: 100%;
        display: inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .table_parentName{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .table_time{
        width: 131px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .table_time_updateTime{
            display: flex;
            justify-content: flex-end;
            color: #999999;
            font-size: 12px;
        }
        div{
            display: flex;
            justify-content: flex-end;
            color: #999999;
            .table_time_updateUserName{
                display: inline-block;
                width: 60px;
                color: #333333;
                font-size: 12px;
                margin-left: 5px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            .table_time_time_docVersionNumber{
                font-size: 12px;
                font-weight: bold;
            }
        }

    }
    .table_operation{
        width: 100px;
        display: flex;
        align-items: center;
        .operation_abstract{
            color: #1A5FA4;
            font-size: 12px;
        }
        .operation_positioning{
            display: inline-block;
            width: 10px;
            height: 18px;
            background: url('../../../assets/manuscript_icon/positioning_icon.png') no-repeat;
            background-size: 10px 14px;
            margin-left: 7px;
        }
    }
}

</style>
<style>
    .fakeStyle{
        display: none;
    }
    .nav_projectSelect_dropdown{
        width: 250px;
    }
</style>
