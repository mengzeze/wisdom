<template>
<div class="projecmeeting">
    <div class="mymeeting">
        <div class="meet_content" v-on:keyup.enter="searchBtn">
            <el-form ref="form" :model="search_form" align="left" class="form_boxb clearfix">
                <el-form-item label="会议主题：" label-width="90px">
                <el-input v-model="search_form.pro_name" maxlength="50" placeholder="请输入会议主题" style="width:170px;"></el-input>
                </el-form-item>
                <el-form-item label="会议类型：" label-width="90px" v-if="mymettingType == 1">
                <!--<el-input v-model="search_form.type" placeholder="会议类型"></el-input>-->
                <el-autocomplete
                    v-model="search_form.type"
                    :fetch-suggestions="querySearchMeet"
                    placeholder="请输入会议类型"
                    @select="handleSelectMeet"
                ></el-autocomplete>
                </el-form-item>
                <!-- <el-form-item label="项目名称" label-width="100px">
                <el-autocomplete
                    v-model="search_form.usName"
                    :fetch-suggestions="querySearchProj"
                    placeholder="请输入项目名称"
                    @select="handleSelectProj"
                ></el-autocomplete>
                </el-form-item> -->
                <el-form-item label="项目名称：" label-width="100px" v-if="mymettingType == 1">
                    <el-select filterable class="q-308"
                        v-model="search_form.usName"
                        placeholder="请选择项目"
                        clearable
                        @change="handleSelectProj"
                    >
                        <el-option
                            v-for="(item, index) in loadAllProj"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                 <!-- 这是项目会议的两行 -->
                <el-form-item label="会议时间：" label-width="82px" class="project-from-item" v-if="mymettingType == 2">
                <date-range :date-start.sync="startTime" :date-end.sync="endTime" width="160" format="yyyy-MM-dd HH:mm:ss"></date-range>
                </el-form-item>
                <el-form-item label="参会人员：" label-width="82px" style="margin-right:10px;" class="project-from-item" v-if="mymettingType == 2">
                <el-input v-model="search_form.usName" maxlength="50" style="width:170px" placeholder="参会人员"></el-input>
                </el-form-item>
                <el-button size="medium" type="primary" @click="searchBtn" icon="el-icon-search">查询</el-button>
                <el-button size="medium" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
            </el-form>
            <div class="table_box">
                <div>
                <!-- <el-scrollbar style="height:100%"> -->
                    <el-table
                    ref="multipleTable"
                    :data="tableData"
                    fit
                    show-header
                    :header-cell-style="{background:'#FAFAFA',color:'#000'}"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="会议主题" align="center" min-width="100">
                        <template slot-scope="scope">
                            <!-- style="padding:0;width:100%;line-height:22px;" -->
                            <el-button @click="meetmeetVisible(scope.$index, scope.row)"
                             type="text"
                             class="ellipsis1"
                             :title="scope.row.name">{{ scope.row.name }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="typeName" label="会议类型" min-width="100" width="150" align="center">
                        <template slot-scope="scope">
                            <p :title="scope.row.typeName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.typeName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="projectName" label="项目名称" min-width="100" align="center" v-if="mymettingType == 1">
                        <template slot-scope="scope">
                            <p :title="scope.row.projectName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.projectName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTime" label="会议时间" min-width="100"  width="160" align="center">
                        <template slot-scope="scope">
                            <p :title="scope.row.startTime | filtertime" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.startTime | filtertime}}</p>
                        </template>
                    </el-table-column>
                     <el-table-column prop="usName" label="参会人员" min-width="100" align="center" v-if="mymettingType == 2">
                        <template slot-scope="scope">
                            <p :title="scope.row.usName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.usName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rankName" label="列席人员" min-width="100" align="center" v-if="mymettingType == 2">
                        <template slot-scope="scope">
                            <p :title="scope.row.rankName" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.rankName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="site" label="会议地点" min-width="100" align="center">
                        <template slot-scope="scope">
                            <p :title="scope.row.site" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.site}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="100"  width="150" align="center">
                        <template slot-scope="scope">
                        <el-button class="pv-0"
                        type="text"
                            @click="meetmeetVisible(scope.$index, scope.row)"
                            title="详情"
                        ><i class="icon-operate-btn iconfont wenzhang"></i></el-button>
                        <el-button
                        type="text" class="pv-0"
                            @click="meetedit(scope.$index, scope.row)"
                            title="编辑"
                        ><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
                        <el-button
                        type="text" class="pv-0"
                            @click="handleDeleteBtn(scope.$index, scope.row)"
                            title="删除"
                        ><i class="icon-operate-btn delete iconfont shanchu"></i></el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                <!-- </el-scrollbar> -->
                </div>
                <div class="table_foot">
                <div style="text-align: left;margin-left:20px" v-if="mymettingType == 1">
                    <!-- <el-checkbox @click="toggleSelection([tableData[1], tableData[2]])">全选</el-checkbox> -->
                    <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">全选</el-button> -->
                    <el-button type="primary" @click="toggleSelection()">导出</el-button>
                    <!-- <el-button @click="allDelet">删除</el-button> -->
                </div>
                <div style="float: left;">
                    <!-- <el-button type="primary" @click="toggleSelection()">导出</el-button> -->
                    <!-- <el-button @click="allDelet">删除</el-button> -->
                </div>

                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataTotal"
                    :pageSize="pageSize"
                    :page-sizes="pageSizes"
                    :current-page="currentPage"
                    @current-change="onPageChange"
                    @size-change="handleSizeChange"
                ></el-pagination>
                </div>
            </div>
        </div>
        <!-- 会议详情和编辑 -->
        <meeting-details v-if="meetingDetaVisible" :meetingDetaVisible.sync="meetingDetaVisible" :handleType="handleType"
                        :handleMeeting="handleMeeting" @sendValueToParent="meetingDetaClose" @editSucess="listTablse">
        </meeting-details>
    </div>
    </div>
</template>
<script>
import meetingDetails from "@/components/file/meetingDetails";
export default{
    name: "mymeeting",
    props: [
        'mymettingType',
        //'meetingDetaVisible',
        //'handleType',//操作类型1详情，2编辑
        //'handleMeeting'//当前操作的会议],
        'changeProjectId',
        'changeProjectValue'
    ],
    components: {
        meetingDetails
    },
    data(){
        return{
            search_form: {
                pro_name: "",
                type: "",
                usName: "",
                endTime: "",
                usName: "",
                startTime: "",
            },
            startTime:'',
            endTime:'',
            loadAllProj: "",
            //分页
            pageSize: 10,
            pageSizes: [10, 20, 50, 100], //每页显示数量
            currentPage: 1, //当前页
            dataTotal: 20, //总量
            tableData: [],
            handleMeeting:{},
            handleType:1,
            meetingDetaVisible:false,
            meetProjectId: "",
             uploadParamData: {
                docSource: 3,
                projId: "",
                parentId: null,
                auditProjectId: null
            },
            multipleSelection: [],
            showArray:[],//定义一个数组
				dynamicTags1: [],
            //mymettingType:1
            meetTypeId:"",
            exportlis: [], //导出数据集合
        }
    },
    mounted() {
        this.listTablse();
        this.success_code = this.code.codeNum.SUCCESS;
        this.projectList();
        this.meetTypeList();
    },
     created() {
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.$store.state.projectMsg.pro_id;
        this.projectMsg = this.$store.state.projectMsg.projectMsg;
        console.log(this.projectId)
        console.log(this.projectMsg)
        this.uploadParamData.projId = this.$store.state.projectMsg.pro_id;

           console.log(this.changeProjectValue)
         //       this.changeProjetId = this.projectId;
    //   this.changeProjectValue = this.projectMsg
    },
    watch:{
        changeProjectId(){
            console.log(9999)
            console.log(this.changeProjectId)
            this.listTablse();
        }
    },
    methods:{
        projectList() {
            var dataObj = {
                token: this.token,
                userId: this.userId,
                data: {}
            };
            var that = this;
            this.$post("info/project/getSimpleProjectList", dataObj)
                .then((response)=> {
                // console.log(response.data);
                if (response.code == that.code.codeNum.SUCCESS) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                    data[i].value = data[i].name;
                    }
                    that.loadAllProj = data;
                }
                })
                .catch(function(error) {
                console.log(error);
                });
        },
        //获取会议列表
    listTablse() {
        if(this.mymettingType == 1){
            var data = {
            token: this.token,
            userId: this.userId,
            projectName: this.projectMsg.name, //"项目名称"this.projectMsg.name
            projectStage: this.projectMsg.currentImplementStageName, // "项目阶段名称"
            stageId: this.projectMsg.currentImplementStageId, //"项目阶段id"
            // projectName: "项目名称", //"项目名称"
            // projectStage: "项目阶段名称", // "项目阶段名称"
            // stageId: 1, //"项目阶段id"
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            data: {
            projectId: this.meetProjectId,
            name: this.search_form.pro_name,
            //   startTime: this.searchTime[0],
            //   endDate: this.searchTime[1],
            typeId: this.meetTypeId
            }
        };
        this.$post("/info/project/getMyMeeting", data)
            .then((response)=> {
            if (response.code == this.code.codeNum.SUCCESS) {
                if(response.data.pageNum > response.data.pages) {
                this.currentPage = response.data.pages;
                this.listTablse();
                return
                }
                console.log(response.data.list)
                this.tableData = response.data.list;
                this.dataTotal = response.data.total;
            } else {
                this.$message.error(response.msg);
            }
            })
            .catch(function(error) {
            console.log(error);
            });
        }else if(this.mymettingType == 2){
           let projectId = this.$store.state.projectMsg.pro_id;
            var data = {
                token: this.token,
                userId: this.userId,
                projectName: this.projectMsg.name, //"项目名称"this.projectMsg.name
                projectStage: this.projectMsg.currentImplementStageName, // "项目阶段名称"
                stageId: this.projectMsg.currentImplementStageId, //"项目阶段id"
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                data: {
                    projectId: projectId,
                    name: this.search_form.pro_name,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    usName: this.search_form.usName
            }
        };
        this.$post("/info/project/getMeetingAll", data)
            .then((response)=> {
            if (response.code != this.code.codeNum.SUCCESS) {
                this.$message.error(response.msg);
                return
            }
            if(response.data.pageNum > response.data.pages && response.data.pages != 0) {
                this.currentPage = response.data.pages;
                this.listTablse();
                return
            }
            this.tableData = response.data.list;
            this.dataTotal = response.data.total;
            })
            .catch(function(error) {
            console.log(error);
            });
        }
    },
        // 分页
        onPageChange(currentPage) {
            this.currentPage = currentPage;
            this.listTablse();
        },
            meetTypeList() {
            var dataObj = {
                token: this.token,
                userId: this.userId
            };
            var that = this;
            this.$post("/info/project/getMeetingConfigsCopy", dataObj)
                .then((response)=> {
                // console.log(response.data);
                if (response.code == that.code.codeNum.SUCCESS) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                    data[i].value = data[i].name;
                    }
                    that.loadAllMeet = data;
                }
                })
                .catch(function(error) {
                console.log(error);
                });
            },
        handleSizeChange(val) {
            this.pageSize = val;
            this.listTablse();
        },
         //  查询条件-会议类型
        querySearchMeet(queryString, cb) {
            this.meetTypeId = "";
            var restaurants = this.loadAllMeet;
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        handleSelectMeet(item) {
            // console.log(item);
            this.meetTypeId = item.id;
        },
        createFilter(queryString) {
            return restaurant => {
                return restaurant.value.indexOf(queryString) != -1;
            };
        },
            //  查询条件-项目名称
            querySearchProj(queryString, cb) {
            this.meetProjectId = "";
            var restaurants = this.loadAllProj;
            var results = queryString
                ? restaurants.filter(this.createFilter(queryString))
                : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
            },
         handleSelectProj(item) {
            console.log(item);
            this.meetProjectId = item;
        },
         // 查询
    searchBtn() {
        // this.currentPage = 1;
        // this.pageSize = 10;
        if( this.mymettingType == 1){
            var data = {
            token: this.token,
            userId: this.userId,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            data: {
                name: this.search_form.pro_name,
                projectId: this.meetProjectId,
                typeId: this.meetTypeId
            }
            };
            var _this = this;
            this.$post("/info/project/getMyMeeting", data)
                .then((response)=> {
                // console.log(response);
                if (response.code == _this.code.codeNum.SUCCESS) {
                    _this.tableData = response.data.list;
                    _this.dataTotal = response.data.total;
                } else {
                    that.$message({
                    type: "info",
                    message: response.msg
                    });
                }
                })
            .catch(function(error) {
            console.log(error);
            });
        }else if(this.mymettingType == 2){
            let projectId = this.$store.state.projectMsg.pro_id;
            var data = {
                token: this.token,
                userId: this.userId,
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                data: {
                projectId: projectId,
                name: this.search_form.pro_name,
                startTime: this.startTime,
                endTime: this.endTime ? `${ this.endTime.substr(0, this.endTime.lastIndexOf(' ')) } 23:59:59` : '',
                usName: this.search_form.usName
            }
        };
        var _this = this;
        this.$post("/info/project/getMeetingAll", data)
            .then((response)=> {
            if (response.code == _this.code.codeNum.SUCCESS) {
                _this.tableData = response.data.list;
                _this.dataTotal = response.data.total;
            } else {
                _this.$message.error(response.msg);
            }
            })
            .catch(function(error) {
            console.log(error);
            });
        }

    },
        // 重置
        resetBtn() {
            if(this.mymettingType == 1){
                this.search_form = {
                    pro_name: "",
                    type: "",
                    usName: ""
                };
                this.meetProjectId = "";
                this.meetTypeId = "";
            }else if(this.mymettingType == 2){
                this.search_form = {
                    pro_name: "",
                    startTime: "",
                    endTime: "",
                    usName: ""
                }
                this.searchTime = []
                this.startTime=''
                this.endTime=''
            }
        },
        handleSelectionChange(val) {
            console.log(val)
                    var dynamicTags1 = [];
				    var arr = []
				    for(var i = 0; i < val.length; i++) {
                        var item = {};//定义一个空对象
                        item['typeName'] = val[i].typeName;//对象里添加属性
                        item['name'] = val[i].name;//对象里添加属性
                        item['date'] = val[i].startTime
                        item['usName'] = val[i].usName
                        item['rankName'] = val[i].rankName
                        item['site'] = val[i].site
                        dynamicTags1.push(item);//将对象追加到数组里。。。。
                    }
                        this.showArray = dynamicTags1;

                        this.$emit('transferChannel',this.showArray)
            this.multipleSelection = val;
            // console.log(val);
            var arrids = [];
            var exorts = [];
            if (val.length > 0) {
                this.multipleSelection.forEach(function(c) {
                if (c.id) {
                    arrids.push(c.id);
                }
                exorts.push({
                    name: c.name,
                    typeName: c.typeName,
                    date: c.startTime,
                    projectName: c.projectName,
                    site: c.site
                });
                });
            } else {
                arrids = [];
                exorts = [];
            }
            var hash = [];
            for (var i = 0; i < arrids.length; i++) {
                if (hash.indexOf(arrids[i]) == -1) {
                hash.push(arrids[i]);
                }
            }
            this.mulid_id = hash;
            this.exportlis = exorts;
            console.log(this.exportlis);
        },
            //会议导出列表
        toggleSelection() {
            var exortsList = [];

            console.log(this.exportlis)
            exortsList = JSON.stringify(this.exportlis);
            console.log(exortsList)
            if (this.exportlis.length <= 0) {
                this.$message({
                type: "info",
                message: "选择导出项"
                });
                return;
            } else {
                this.$store.commit("export", {
                url: "/info/project/exportMyMeeting",
                data: this.exportlis
                });
            }
        },

        meetmeetVisible(index, row){
        this.handleMeeting   = row;

        this.handleType = 1;
        this.meetingDetaVisible = true;
        console.log(this.handleMeeting)
        console.log(this.meetingDetaVisible)
        console.log(this.handleType)
        },
        meetingDetaClose(){
        this.meetingDetaVisible = false;
        },
        meetedit(index, row){
        this.handleMeeting = row;
        this.handleType = 2;
        this.meetingDetaVisible = true;
        console.log(this.handleMeeting)
        console.log(this.meetingDetaVisible)
        console.log(this.handleType)
        },

        // 删除会议
        handleDelete(index, row) {
        this.met_ar = row.id;
        this.met_arname = row.name;
        var _this = this;
        this.$confirm("确定删除该会议？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
            var data = {
                token: _this.token,
                userId: _this.userId,
                projectId: row.projectId,
                data: {
                id: _this.met_ar,
                name: _this.met_arname
                }
            };

            _this
                .$post("/info/project/delMeeting", data)
                .then((response)=> {
                if (response.code == _this.code.codeNum.SUCCESS) {
                    _this.$message({
                    type: "success",
                    message: "删除成功!"
                    });
                    _this.listTablse();
                    //_this.$refs.mymettingchild.listTablse()
                } else {
                    _this.$message({
                    type: "info",
                    message: response.msg
                    });
                }
                })
                .catch(function(error) {
                console.log(error);
                });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
            });
        },
        //删除前验证是否已被关联，没有被关联才能删除
        async canDelete(index, row) {
        let arr = [];
        arr.push(row.id)
        var _this = this;
        var send_data = {
            token: this.token,
            userId: this.userId,
            projectId: row.projectId,
            data: {
            meetingIds: arr
            }
        }
        var data = await _this
            .$post("/info/project/verifyMeetingRelevance", send_data)
            .then((response)=> {
                if (_this.success_code == response.code) {
                    let data = response.data;
                    if(data.result){
                    return true;
                    } else {
                    let str = response.data.content.substring(0,response.data.content.length -1) + '会议已被关联，不能删除';
                    _this.$message({
                        message: str,
                        type: "warning"
                    });
                    return false;
                    }
                } else {
                    _this.$message({
                        message: response.msg,
                        type: "error"
                    });
                    return false;
                }
            })
            .catch(function (error) {

            });
            return data;
        },
        handleDeleteBtn(index, row){
        this.canDelete(index, row).then(res => {
            if(res){
            this.handleDelete(index, row);
            } else {
            _this.$message({
                message: "不能删除",
                type: "warning"
            });
            }
        });
        },
        // 全删删除会议
        allDelet() {
        //  this.mulid_id
        if (this.mulid_id == "") {
            // console.log(9);
            return;
        }
        var _this = this;
        this.$confirm("确定删除所有会议？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
            var data = {
                token: _this.token,
                userId: _this.userId,
                data: {
                meetingIds: _this.mulid_id
                }
            };

            _this
                .$post("/info/project/delMeeting", data)
                .then((response)=> {
                // console.log(response);
                _this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                _this.currentPage = 1;
                _this.pageSize = 10;
                _this.searchBtn();
                })
                .catch(function(error) {
                console.log(error);
                });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
            });
        },


    }
}
</script>

<style scoped lang="scss" type="text/css">
.projecmeeting{
    .mymeeting {
  width: 99.7%;
  padding: 0px 0px;
  position: relative;
  background: #f0f2f5;
  overflow: hidden;
  .riheader {
    width: 100%;
    padding: 0 15px;
    height: 96px;
    padding: 0 8px;
    // padding-bottom: 5px;
    background: rgba(255, 255, 255, 1);
    .el-breadcrumb {
      line-height: 46px;
    }
    .finance_tit {
      position: relative;
      padding: 15px 5px;
      span {
        color: #333;
        // line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        position: absolute;
        left: 0px;
        bottom: 2px;
      }

      .el-button {
        padding-bottom: 10px;
        position: absolute;
        right: 33px;
        bottom: 4px;
        z-index: 10;
      }
    }
  }
  .pv-0{
      padding-top:0px;
      padding-bottom: 0px;
  }

  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .el-form-item {
      float: left;
      margin-right: 10px;
      margin-bottom: 12px;
      height: 40px;
      .el-input {
        width: 217px;
      }
      .inline-input {
        width: 217px;
      }
      .el-select {
        width: 217px;
      }
    }

    .el-button {
      float: left;
      margin-left: 20px;
      margin-top: 2px;
    }
  }
  .form_boxb {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    padding-bottom: 10px;
    .el-form-item {
      float: left;
    margin-right: 10px;
      margin-bottom: 12px;
      height: 40px;
      .el-input {
        width: 217px;
      }
      .inline-input {
        width: 217px;
      }
      .el-select {
        width: 217px;
      }
    }

    .el-button {
      float: left;
      margin-left: 20px;
      margin-top: 2px;
    }
  }
  .meet_content {
    width: 100%;
    margin: 14px auto;
    background-color: #ffffff;
    .el-pagination {
      text-align: right;
        margin-top: 10px;
        padding-right: 40px;
        float: right;
    }
  }
  .table_foot {
    margin-top: 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .tan_dialog {
    position: relative;

  }

  .dialog-footer {
    // position: absolute;
    right: 20px;
    bottom: 14px;
  }
  .cvote_button {
    margin-left: -6px;
  }
  .riwjn_we {
    margin-left: 58px;
    // margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
  }
  .riwjn_we li {
    margin-top: 6px;
    line-height: 30px;
  }
  .riwjn_wec {
    margin-left: 72px;
    // margin-top: 6px;
    display: flex;
    flex-wrap: nowrap;
  }
  .riwjn_wec li {
    margin-top: 6px;
    line-height: 30px;
  }

  .usernanmestlt {
    width: 16%;
  }
  .usernanmestlt2 {
    width: 13%;
  }
  .usernanmes {
    width: 84%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .deleth {
    text-decoration: line-through;
  }
  // .el-table-column:hover {
  //   background: red;
  // }
  // .meetbutton:hover {
  //   background: #1a5fa4;
  //   color: #ffffff;
  // }
  // .handbutton:hover {
  //   background: #dd5353;
  //   color: #ffffff;
  // }
  .table_box {
    padding-bottom: 16px;
  }

  .content_x {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .deletro {
    width: 15px;
    height: 15px;
    background: url("../../../../assets/image/sanc.png") no-repeat;
    background-size: 100% 100%;
  }
  .fujllistul {
    width: 400px;
  }
  .fujlliltitle {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .userbtn {
    position: relative;
  }
  .delusebtn {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  /deep/ .clip-self-deep{
    &:after{
      display:block;
      content:' ';
      width:1px;
      height: 1px;
      clear:both;
      zoom:0;
      visibility:hidden;
    }
  }
  .file-name {
    float:left;
    display:inline-block;
    width:80%;
    cursor:pointer;
    white-space: nowrap;
    text-overflow : ellipsis;
    overflow:hidden;
  }
  .del-file{
   text-decoration: line-through;
  }

}
}

</style>
