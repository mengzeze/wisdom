<template>
  <div class="classification role-config">
    <!-- 分类 -->
    <div class="riheader">
      <el-breadcrumb separator="/" class="page-breadcrumb">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item>业务规则配置</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="finance_tit">
        <span class="spantil">业务规则配置</span>
        <div v-if="mettingadd" class="header-btn">
           <el-dropdown trigger="click">
             <el-button type="primary">
                <i class="el-icon-plus"></i>添加类型
            </el-button>
            <!-- <span class="el-dropdown-link" ref="echarType" style="cursor: pointer;font-size:14px;">
              <i class="el-icon-plus"></i>添加类型
            </span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="$utils.m('project_meeting') && $utils.checkSystemPermission('bask_metting_add')"
                @click.native="add_meetp">会议类型配置</el-dropdown-item>
              <el-dropdown-item
                v-if="$utils.m('project_vote') && $utils.checkSystemPermission('bask_vote_add')"
                @click.native="add_cvote">投票类型配置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>

    <div class="class_content">
        <div v-on:keyup.enter="searchAll">
      <el-form ref="form" :model="search_form" label-width="100px" class="form_box1 clearfix">
        <!-- <el-form-item label="配置分类：">
          <el-input v-model="search_form.pro_name" placeholder="请选择配置分类"></el-input>
        </el-form-item>-->
        <el-form-item label="类型名称：">
          <el-input v-model="search_form.pro_type" maxlength="20" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态：">
          <el-input v-model="search_form.pro_type" placeholder="请选择状态"></el-input>
        </el-form-item>-->
        <el-button  type="primary" @click="searchAll" icon="el-icon-search">查询</el-button>
        <el-button
          @click="resetBtn"
          icon="el-icon-refresh"
          style="margin-left: 15px"
        >重置</el-button>
      </el-form>
        </div>
      <el-tabs
        v-model="activeName"
        :header-cell-style="{background:'#F5F7FA',color:'#000'}"
        type="border-card"
        @tab-click="handleClick"
        class="tab_box"
        align="center"
      >
        <el-tab-pane v-if="$utils.m('project_meeting')" label="会议" name="first">
          <!-- <div style="height:560px;"> -->
          <!--<el-scrollbar style="height:100%">-->
          <el-table
            :data="meetData"
            style="width: 100%"
            :header-cell-style="{background:'#FAFAFA',color:'#000'}"
            @cell-mouse-enter="hoverChange"
          >
            <el-table-column prop="name" label="类型名称" align="center" min-width="100">
              <template slot-scope="scope">
                <div
                  :title="scope.row.name"
                  style="width:100%; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="maxCount" label="人数限制" align="center" min-width="100">
              <template slot-scope="scope">
                <div
                  :title="'不少于'+scope.row.maxCount+'人'"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >不少于{{scope.row.maxCount}}人</div>
                <!-- <div v-else>/</div> -->
              </template>
            </el-table-column>
            <el-table-column label="人员限制" align="center" min-width="100">
              <template slot-scope="scope">
                <div
                  :title="title_hover"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >
                  <span
                    v-for="item in scope.row.standardList"
                    :key="item.roleId"
                    v-show="item.roleName"
                    style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                  >{{item.roleName}}不少于{{item.count}}人,</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="类型说明" align="center" min-width="100">
              <template slot-scope="scope">
                <div
                  :title="scope.row.description"
                  style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                >{{scope.row.description}}</div>
              </template>
            </el-table-column>
            <el-table-column prop label="操作" align="center" min-width="100">
              <template slot-scope="scope">
                <el-button
                class="pv-0"
                type="text"
                  title="编辑"
                  v-if="$utils.checkSystemPermission('bask_metting_update')"
                  @click="meetmeetVisible(scope.$index, scope.row)"
                ><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>

                <el-button
                class="pv-0"
                 type="text"
                  title="删除"
                  v-if="$utils.checkSystemPermission('bask_metting_del')"
                  @click="handleDelete(scope.$index, scope.row)"
                ><i class="icon-operate-btn delete iconfont shanchu"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--</el-scrollbar>-->
          <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane v-if="$utils.m('project_vote')" label="投票" name="second">
          <!--<el-scrollbar>-->
          <el-table
            :data="cvoteData"
            style="width: 100%"
            :header-cell-style="{background:'#FAFAFA',color:'#000'}"
            @cell-mouse-enter="hoverChange"
          >
            <el-table-column prop="typeName" label="类型名称" align="center">
              <template slot-scope="scope">
                <div
                  :title="scope.row.typeName"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >{{scope.row.typeName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="voteTurnout" label="人数限制" align="center">
              <template slot-scope="scope">
                <div
                  :title="title_hover"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >不少于{{scope.row.voteTurnout}}人</div>
              </template>
            </el-table-column>
            <el-table-column label="人员限制" align="center" style="width:200px;">
              <template slot-scope="scope">
                <div
                  :title="title_hover"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >
                  <span
                    v-for="item in  scope.row.limitation"
                    :key="item.roleId"
                    v-show="item.count>0"
                  >{{item.roleName}}不少于{{item.count}}人,</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop label="投票规则" align="center">
              <template slot-scope="scope">
                <div
                  :title="title_hover"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >
                  <span v-for="(item,index) in  scope.row.voteRule" :key="index">
                    <span v-if="item.ruleId==1">大于等于{{item.number}}人同意允许通过</span>
                    <span v-if="item.ruleId==2">大于等于{{item.number}}人有条件通过为有条件通过</span>
                    <span v-if="item.ruleId==3">大于等于{{item.number}}人不同意不通过</span>
                    <span v-if="item.ruleId==4">大于等于{{item.number}}人暂缓表决为暂缓表决</span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="typeDesc" label="类型说明" align="center">
              <template slot-scope="scope">
                <div
                  :title="scope.row.typeDesc"
                  style="width:100%; overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >{{scope.row.typeDesc}}</div>
              </template>
            </el-table-column>
            <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                class="pv-0"
                type="text"
                  title="编辑"
                  v-if="$utils.checkSystemPermission('bask_vote_update')"
                  @click="cvoteVisible(scope.$index, scope.row)"
                ><i class="icon-operate-btn iconfont bianji2-copy"></i></el-button>
                <el-button
                class="pv-0"
                 type="text"
                  title="删除"
                    v-if="$utils.checkSystemPermission('bask_vote_del')"
                  @click="cvoteDelete(scope.$index, scope.row)"
                ><i class="icon-operate-btn delete iconfont shanchu"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--</el-scrollbar>-->
        </el-tab-pane>

        <!-- 分页 -->
        <div class="foot_fen">
          <el-pagination
            class="foot_fen_tab"
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
      </el-tabs>
    </div>

    <!-- 会议务类型配置 -->
    <el-dialog
      title="会议类型配置"
      :close-on-click-modal="false"
      @close="roudIdlistis"
      :visible.sync="dialogVisible"
      width="750px"
    >
      <div class="tan_dialog" style="height:400px;">
        <el-scrollbar style="height:80%">
          <el-form
            ref="form"
            :model="meet_obj"
            label-width="120px"
            class="form_box clearfix type_config_box"
          >
            <el-form-item required label="类型名称 ：" label-width="120px">
              <!-- <el-input v-model="meet_obj.name" placeholder="请输入关键词" ></el-input> -->
              <el-input class="typeInput"
                v-model="meet_obj.name"
                max="20"
                oninput="if(value.length>20)value=value.slice(0,20)"
                style="width:236px;"
                placeholder="请输入关键词"
              ></el-input>
            </el-form-item>
            <el-form-item label="人数限制：" label-width="120px">
              不少于
              <!-- <el-input-number
                v-model="meet_obj.maxCount"
                controls-position="right"
                width="35px"
                :min="0"
                :max="999"
              ></el-input-number>-->
              <el-input
                type="text"
                v-model="meet_obj.maxCount"
                maxlength="3"
                @keyup="inputValFilter(meet_obj,'maxCount',$event)"
                @change="inputValFilter(meet_obj,'maxCount',$event)"
                @input="inputValFilter(meet_obj,'maxCount',$event)"
                placeholder="请输入人数"
              ></el-input>人参加才能发起
            </el-form-item>
          </el-form>
          <ul class="ullisth" style="margin-left: 50px;">
            <li class="toupiao_leihxian">
              <span class="meet_title">人员限制：</span>
              <el-form ref="sryle" style="margin-left:7px">
                <el-form-item v-for="(item,index) in standardList" :key="index" style="height:30px">
                  <!-- {{item}} -->
                  <!-- {{item.roleName}} -->
                  <el-select
                    v-model="item.roleName"
                    width="130px"
                    placeholder="请选择"
                    style="margin-right:10px;"
                    @change="sermrChange(item.roleName, index)"
                  >
                    <el-option
                      
                      v-for="items in huilist"
                      :key="items.roleId"
                      :label="items.roleName"
                      :value="items.roleName"
                    ></el-option>
                  </el-select>不少于
                  <!-- {{item.count}} -->
                  <!-- <el-input-number
                    controls-position="right"
                    width="35px"
                    v-model="item.count"
                    :min="0"
                    :max="9999"
                  ></el-input-number>-->
                  <!-- <input type="text"> -->
                  <el-input
                    style="width: 150px;"
                    type="text"
                    v-model="item.count"
                    maxlength="3"
                    @keyup="inputValFilter(item,'count',$event)"
                    @change="inputValFilter(item,'count',$event)"
                    @input="inputValFilter(item,'count',$event)"
                    placeholder="请输入人数"
                  ></el-input>
                  <el-row style="float:right">
                    <el-button style="margin-left: 9px;" size="medium" @click="deletlist(index)">删除</el-button>
                  </el-row>
                </el-form-item>
              </el-form>
            </li>
            <li class="toupiao_leihbuto">
              <el-button
                size="medium"
                style="margin-left:77px;margin-top:-6px"
                type="primary"
                @click="addQuery"
              >添加限制人员</el-button>
            </li>
            <li class="toupiao_leihconcet">
              <span class="meet_title">类型说明：</span>
              <el-input
                type="textarea"
                :rows="3"
                v-model.trim="meet_obj.description"
                placeholder="请输入类型说明"
                maxlength="1000"
                style="width:515px;text-align: left; margin-left:7px; "
                resize="none"
              ></el-input>
            </li>
            <li></li>
          </ul>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="cancel">取 消</el-button>
          <el-button size="medium" type="primary" @click="didi" v-if="buue">提交</el-button>
          <el-button size="medium" type="primary" @click="meetEdit" v-else>保存</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 投票类型配置 -->
    <el-dialog
      title="投票类型配置"
      :close-on-click-modal="false"
      :visible.sync="dialogcvote"
      width="680px"
      @close="closeVoteFn"
    >
      <div class="tan_dialog type_config_box" style="height:600px;">
        <el-scrollbar style="height:90%">
          <ul style="text-align:left">
            <li class="toupiao_lei" style="height: 40px;line-height: 40px;">
              <span class="toupiao_title">
                <i class="btx">*</i>类型名称：
              </span>
              <el-input
                type="text"
                maxlength="20"
                class="toupiao_lei_t"
                v-model="cvote_obj.name"
                placeholder="请输入关键词"
              ></el-input>
            </li>
            <li
              class="toupiao_lei"
              style="height: 40px;line-height: 40px;font-size: 15px;margin-left: 22px;"
            >
              <i class="btx">*</i>人数限制：
              <span class="toupiao_lab">不少于</span>
              <!-- <el-input-number
                v-model="cvote_obj.maxCount"
                controls-position="right"
                width="35px"
                :min="1"
                :max="999"
              ></el-input-number>-->
              <el-input
                type="text"
                style="width: 293px;"
                v-model="cvote_obj.maxCount"
                maxlength="3"
                onkeyup="value=value.replace(/\D/g,'')"
                onchange="value=value.replace(/\D/g,'')"
                oninput="value=value.replace(/\D/g,'')"
                placeholder="请输入人数"
              ></el-input>
              <span class="toupiao_lab">人参加才能发起</span>
            </li>
            <li class="toupiao_lei">
              <span class="toupiao_title">人员限制：</span>
              <el-form ref="sryle">
                <!-- {{sum}} -->
                <el-form-item v-for="(item,index) in standardList" :key="index" style="height:30px">
                  <el-select
                    v-model="item.roleName"
                    width="130px"
                    placeholder="请选择"
                    style="margin-right:10px;"
                     @change="sermrChange(item.roleName, index)"
                  >
                    <el-option                    
                      v-for="items in huilist"
                      :key="items.roleId"
                      :label="items.roleName"
                      :value="items.roleName"
                    ></el-option>
                  </el-select>不少于
                  <!-- <el-input-number
                    controls-position="right"
                    width="35px"
                    v-model="item.count"
                    :min="1"
                    :max="9999" style="width:155px;"
                  ></el-input-number>-->
                  <el-input
                    type="text"
                    style="width: 174px;"
                    v-model="item.count"
                    maxlength="3"
                    onkeyup="value=value.replace(/\D/g,'')"
                    onchange="value=value.replace(/\D/g,'')"
                    oninput="value=value.replace(/\D/g,'')"
                    placeholder="请输入人数"
                  ></el-input>
                  <el-row style="float:right;margin-left: 5px;margin-top: -1px">
                    <el-button style="margin-left:-3px;" size="medium" @click="deletlist(index)">删除</el-button>
                  </el-row>
                </el-form-item>
              </el-form>
            </li>
            <li style="padding-left:107px;margin-top:5px">
              <el-button size="medium" @click="addQuery" type="primary">添加限制人员</el-button>
            </li>
            <li class="toupiao_lei" style="height: 30px;line-height: 30px;margin-top:12px">
              <span class="toupiao_title">投票结果：</span>
              <!-- {{checkList}} -->
              <div style="padding-left:5px;">
                <el-checkbox-group v-model="checkList" class="xuanzhe">
                  <el-checkbox label="1" disabled>同意（必选）</el-checkbox>

                  <el-checkbox label="2" disabled>不同意（必选）</el-checkbox>

                  <el-checkbox label="3">暂缓表决</el-checkbox>

                  <el-checkbox label="4">有条件通过</el-checkbox>
                </el-checkbox-group>
              </div>
            </li>
            <li class="toupiao_lei" style="padding-left: 13px;margin-top:11px">
              <span class="toupiao_title">投票规则：</span>
              <!-- {{typ_checklist}} -->
              <ul class="typchackul">
                <!-- {{typ_checklist}} -->
                <li v-for="(item,index) in typ_checklist" :key="index" class="typchackul_list">
                  <input
                    type="checkbox"
                    :id="item.id"
                    :checked="item.checked"
                    :disabled="item.disabled"
                    @change="changd"
                    class="checktype"
                  />
                  <span>{{item.nametype}}</span>
                  <input
                    type="text"
                    v-model="item.coutmin"
                    size="mini"
                    style="width:45px"
                    maxlength="3"
                    onkeyup="value=value.replace(/\D/g,'')"
                    onchange="value=value.replace(/\D/g,'')"
                    oninput="value=value.replace(/\D/g,'')"
                    class="number_mim"
                  />
                  /
                  <input
                    type="text"
                    v-model="item.coutmax"
                    size="mini"
                    style="width:45px"
                    maxlength="3"
                    onkeyup="value=value.replace(/\D/g,'')"
                    onchange="value=value.replace(/\D/g,'')"
                    oninput="value=value.replace(/\D/g,'')"
                    class="number_mim"
                  />的人
                  <span>{{item.name}}</span>
                </li>

                <!-- <li>
                  <span style="color:red">注：有条件通过默认为通过暂缓表决默认为不通过</span>
                </li>-->
              </ul>
            </li>
            <li style="padding-left: 105px;color: #DE4747;margin-top: 5px;">注：有条件通过默认为通过暂缓表决默认为不通过</li>
            <li class="toupiao_lei" style="height: 40px;line-height: 40px;">
              <span class="toupiao_title">类型说明：</span>
              <el-input
                type="textarea"
                :rows="3"
                v-model.trim="cvote_obj.description"
                placeholder="请输入类型说明"
                maxlength="1000"
                style="width:515px;text-align: left;"
                resize="none"
              ></el-input>
            </li>
          </ul>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" @click="closeVoteFn()">取 消</el-button>
          <el-button size="medium" type="primary" @click="adddCvote" v-if="adddCvotebul">提交</el-button>

          <el-button size="medium" type="primary" @click="cvoteEdit" v-else>保存</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script  >
import { constants } from "fs";
import { connect } from "net";
import { clearInterval, setInterval } from 'timers';
export default {
  name: "classification",
  data() {
    return {
      token: "",
      mettingadd:true,
      newmanagement:null,
      newmanagements:null,
      i:0,
      userId: "",
      dialogVisible: false,
      dialogcvote: false,
      activeName: "first",
      tapNamber: 1,
      search_form: {
        pro_name: "",
        pro_type: "",
        pro_type: ""
      },
      meet_obj: {
        name: "",
        description: "", //类型说明
        maxCount: 0 //人数
      },

      cvote_obj: {
        name: "",
        description: "", //类型说明
        maxCount: 1, //人数
        description: ""
      },

      //角色人员限制规则
      list_ty: { roleId: "", roleName: "", count: "" },
      standardList: [],
      huilist: [],
      //分页
      //分页
      pageSize: 10,
      pageSizes: [10, 20, 50, 100], //每页显示数量
      currentPage: 1, //当前页
      dataTotal: 0, //总量
      meetData: [],

      // 投票结果
      checkList: ["1", "2"],

      //投票规则
      checklist: [],
      checkids: [],
      tartfalse: "",
      //用于缓存数组
      typchecklist: [
        {
          id: 1,
          coutmin: "",
          coutmax: "",
          checked: true,
          disabled: true,
          nametype: "大于等于",
          name: "例：（2/3）的人大于等于同意允许通过"
        },
        {
          id: 2,
          coutmin: "",
          coutmax: "",
          checked: "",
          disabled: false,
          nametype: "大于等于",
          name: "例：有条件通过允许通过"
        },
        {
          id: 3,
          coutmin: "",
          coutmax: "",
          checked: true,
          disabled: true,
          nametype: "大于等于",
          name: "例：不同意为不通过"
        },
        {
          id: 4,
          coutmin: "",
          coutmax: "",
          checked: "",
          disabled: false,
          nametype: "大于等于",
          name: "例：暂缓表决为不通过"
        }
      ],
      typ_checklist: [
        {
          id: 1,
          coutmin: "",
          coutmax: "",
          checked: true,
          disabled: true,
          nametype: "大于等于",
          name: "例：（2/3）的人大于等于同意允许通过"
        },
        {
          id: 2,
          coutmin: "",
          coutmax: "",
          checked: "",
          disabled: true,
          nametype: "大于等于",
          name: "例：（2/3）有条件通过允许通过"
        },
        {
          id: 3,
          coutmin: "",
          coutmax: "",
          checked: true,
          disabled: true,
          nametype: "大于等于",
          name: "例：（2/3）不同意为不通过"
        },
        {
          id: 4,
          coutmin: "",
          coutmax: "",
          checked: "",
          disabled: true,
          nametype: "大于等于",
          name: "例：（2/3）暂缓表决为不通过"
        }
      ],
      //投票数据
      cvoteData: [],
      //要删除的会议id
      met_ar: "",

      // 会议编辑
      buue: true,
      //编辑投票
      adddCvotebul: true,
      //编辑球票返回多选条件数组
      cvoteChecklis: [],

      typ_mout: {
        counmni: "",
        counmax: ""
      },
      roudIdlist: [],
      //编辑投票查看详情获取到的id
      covet_id: "",
      title_hover: "",
      oldRoleNameList: []
    };
  },
  components: {},
  computed: {
    // 计算属性的 getter
    //计算参加人员数量
    sum: function() {
      var max = 0;
      for (var i = 0; i < this.standardList.length; i++) {
        max += this.standardList[i].count;
      }
      return max;
    }
  },
  mounted() {
    if(!this.$utils.checkSystemPermission('bask_metting_add') && !this.$utils.checkSystemPermission('bask_vote_add')){
      this.mettingadd = false
    }
    //查询会议
    this.queryMeetAll();
    this.stry();
  },
  beforeDestroy() {
    clearInterval(this.newmanagement)
  },
  methods: {
    /**
     * 过滤输入框的非数字字符
     * @params valObj 要修改的data对象
     * @params valName 要修改的对象字段
     * @params data 输入的值
     */
    inputValFilter(valObj,valName,data) {
      // 直接修改对象会修改失败，如果直接在input上过滤非数字，输入非数字后不会触发数据更新
      // 由于此方法共用，所以这样写
      this.$set(valObj,valName,data.replace(/\D/g,''))
    },
    hoverChange(row, column, cell, event) {
      // console.log(event.toElement.innerText)
      this.title_hover = event.toElement.innerText;
    },
    closeVoteFn() {
      this.dialogcvote = false;
      if (this.tapNamber == 2) {
        this.pageSize = 10;
        this.currentPage = 1;
        this.querycvoteAll();
      }
    },
    changd(e) {
      var srtid = e.target.id;
      var that = this;
      if (!e.target.checked) {
        for (var j = 0; j < that.checklist.length; j++) {
          if (that.checklist[j].id == srtid) {
            console.log(that.checklist[j]);
            that.checklist.splice(j, 1);
            // console.log(1);
          }
        }
      } else {
        for (var i = 0; i < that.typ_checklist.length; i++) {
          if (that.typ_checklist[i].id == srtid) {
            that.checklist.push(that.typ_checklist[i]);
          }
        }
      }
    },
    stry() {
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (this.typ_checklist[i].checked == true) {
          this.checklist.push(this.typ_checklist[i]);
        }
      }
    },

    tyoeppd() {
      var checli = document.getElementsByClassName("checktype");
      // console.log(checli);
      var that = this;
      for (var i = 0; i < checli.length; i++) {
        if (checli[i].checked == false) {
        }
      }
    },
    //查询重置
    resetBtn() {
      (this.search_form.pro_name = ""),
        (this.search_form.pro_type = ""),
        (this.search_form.pro_type = "");
    },
    //搜索
    searchAll() {
      var seachname = this.search_form.pro_type;
      this.currentPage = 1;
      // this.pageSize = 10;
      if (this.tapNamber == 1) {
        // console.log(seachname);
        this.queryMeetAll(seachname);
      } else {
        this.querycvoteAll(seachname);
      }
    },
    //查询会议
    queryMeetAll(seachname) {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          name: this.search_form.pro_type //"类型名称",
        }
      };
      this.$post("/info/project/getMeetingConfigAll", dataObj)
        .then((response)=> {
          if (response.code == this.code.codeNum.SUCCESS) {
            if(response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.queryMeetAll();
              return
            }
            this.meetData = response.data.list;
            this.dataTotal = response.data.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询投票
    querycvoteAll(seachname) {
      var dataObj = {
        token: this.token,
        userId: this.userId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        data: {
          typeName: this.search_form.pro_type
        }
      };
      var that = this;
      this.$post("/info/project/findVoteType", dataObj)
        .then((response)=> {
          if (response.code == 0) {
            if(response.data.pageNum > response.data.pages) {
              this.currentPage = response.data.pages;
              this.querycvoteAll();
              return
            }
            that.cvoteData = response.data.list;
            for (var i = 0; i < that.cvoteData.length; i++) {
              that.cvoteData[i].limitation = eval(
                "(" + that.cvoteData[i].limitation + ")"
              );
              that.cvoteData[i].voteRule = eval(
                "(" + that.cvoteData[i].voteRule + ")"
              );
            }
            that.dataTotal = response.data.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //tab切换筛选
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.tapNamber = 1;
        // this.queryMeetAll();
        this.pageSize = 10;
        this.currentPage = 1;
        this.queryMeetAll();
      } else {
        this.tapNamber = 2;
        if (this.tapNamber == 2) {
          this.pageSize = 10;
          this.currentPage = 1;
          this.querycvoteAll();
        }
      }
    },
    // 添加会议配置弹框
    add_meetp() {
      this.addMatch();
      this.addQuery();
      this.dialogVisible = true;
      setTimeout(function() {
        $(".type_config_box .typeInput .el-input__inner").attr("maxlength", "50");
      }, 10);

      // this.setTimeoutr();
      let draft = this.$utils.getDraft('conference', false)
          if(!draft){
            this.setTimeoutr()
            return}
         this.$confirm('是否载入上次保存的草稿?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            // 回显草稿数据
            // console.log(draft)
             this.meet_obj.name=draft.name
             this.meet_obj.maxCount=draft.num
             this.meet_obj.description=draft.textarea
             this.setTimeoutr()
        }).catch(() => {
            this.setTimeoutr()
        });
    },
    setTimeoutr() {
      console.log(this.newmanagement)
      this.newmanagement=setInterval(()=>{
        var data = {
           name:this.meet_obj.name,
           num:this.meet_obj.maxCount,
           textarea:this.meet_obj.description
        };
        // console.log(data)
        this.$utils.saveDraft("conference", data, false);
      },5000)
    },
    //查看人员配置
    addMatch() {
      var dataObj = {
        data: {},
        token: this.token,
        userId: this.userId
      };
      var that = this;
      this.$post("/sys/getQueryRole", dataObj)
        .then((response)=> {
          // console.log(response.data);
          that.huilist = response.data.map(function(item) {
            return {
              roleName: item.roleName.replace(/^\s*|\s*$/g, ""),
              roleId: item.id
            };
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //会议编辑取消按钮
    cancel() {
      this.dialogVisible = false;
      this.standardList = [];
      this.meet_obj.name = "";
      this.meet_obj.description = ""; //类型说明
      this.meet_obj.maxCount = 0; //人数
    },

    // 分页
    onPageChange(currentPage) {
      this.currentPage = currentPage;
      if (this.tapNamber == 1) {
        this.queryMeetAll();
      } else {
        this.querycvoteAll();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.tapNamber == 1) {
        setTimeout(()=>{
          this.queryMeetAll();
        },500)
      } else {
        setTimeout(()=>{
          this.querycvoteAll();
        },500)
      }
    },

    //添加投票配置弹框
    add_cvote() {
      this.standardList = [];
      this.addMatch();
      this.addQuery();
      this.dialogcvote = true;
      this.adddCvotebul = true;
      this.cvote_obj.name = ""; //"会议类型名称",
      this.cvote_obj.maxCount = 1;
      this.checkList = ["1", "2"];
      this.cvote_obj.description = ""; //"类型说明"
      // this.typchecklist = this.typ_checklist; //用于缓存数组
      setTimeout(function() {
        $(".type_config_box .typeInput .el-input__inner").attr("maxlength", "50");
      }, 10);
      
      let draft = this.$utils.getDraft('conferences', false)
          if(!draft){
            this.setTime()
            return}
         this.$confirm('是否载入上次保存的草稿?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            // 回显草稿数据
            // console.log(draft)
           this.cvote_obj.name=draft.name
           this.cvote_obj.maxCount=draft.num
          //  this.typ_checklist=draft.checklist
           this.checkList=draft.checkList
           this.cvote_obj.description=draft.textarea
           this.typ_checklist=draft.checklist
          this.setTime()
        }).catch(() => {
            this.setTime()
        });
    },
    setTime(){
        this.newmanagements=setInterval(()=>{
         var data = {
           name:this.cvote_obj.name,
           num:this.cvote_obj.maxCount,
           checklist:this.typ_checklist,
           checkList:this.checkList,
           textarea:this.cvote_obj.description,
        };
        this.$utils.saveDraft("conferences", data, false);
      },5000)
    },
    deletlist(v) {
      this.standardList.splice(v, 1);
    },
    //查看分类
    addQuery() {
      // if (this.sum >= this.cvote_obj.maxCount) {
      //   this.$message.error("人员限制不能大于人数限制");
      //   return;
      // }
      var obj = { roleId: "", roleName: "", count: ""};
      this.standardList.push(obj);
    },

    sermrChange(value,index) {
      if(this.oldRoleNameList.findIndex((n) => n == value) != -1){
        this.standardList[index].roleName = this.oldRoleNameList[index];
        this.$message.warning('该角色已存在')          
      } else {
        this.oldRoleNameList[index] = value;
      }
    },

    //添加会议
    didi() {
      if (this.meet_obj.name == "") {
        this.$message.error("会议类型名称不能为空");
        return;
      }
      if (this.meet_obj.maxCount == "") {
        this.meet_obj.maxCount = 0;
      }
      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName != "") {
          if (this.standardList[i].count == "") {
            this.$message.error("人员限制不能为空");
            return;
          }
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName == "") {
          this.standardList.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        for (var j = 0; j < this.huilist.length; j++) {
          if (this.standardList[i].roleName == this.huilist[j].roleName) {
            this.standardList[i].roleId = this.huilist[j].roleId;
          }
        }
      }
      var num = 0
      this.standardList.forEach(ele=>[
        num += Number(ele.count)
      ])
      if(num > Number(this.meet_obj.maxCount)){
        this.$message.error('人数限制小于人员限制人数总和')
        return
      }
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          name: this.meet_obj.name, //"会议类型名称",
          maxCount: this.meet_obj.maxCount,
          standardList: this.standardList, //角色人员限制规则 [{ "roleId":"角色1", "roleName":"质控", "count":"3" } ]
          description: this.meet_obj.description //"类型说明"
        }
      };
      var that = this;
      this.$post("/info/project/addMeetingConfig", dataObj)
        .then((response)=> {
          if (response.code == 0) {
            that.dialogVisible = false;
            that.queryMeetAll();
            that.standardList = [];
            that.meet_obj.name = "";
            that.meet_obj.description = ""; //类型说明
            that.$utils.removeDraft('conference', false)
            clearInterval(that.newmanagement)
            that.meet_obj.maxCount = 0; //人数
          } else {
            that.$message.error(response.msg);
          }
          // console.log(response);
          // that.huilist = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //会议详情
    meetmeetVisible(index, row) {
      this.addMatch();
      this.buue = false;
      this.meet_id = row.id;
      var data = {
        token: this.token,
        userId: this.userId,
        data: { id: row.id }
      };
      var _this = this;
      this.$post("/info/project/getMeetingConfig", data)
        .then((response)=> {
          // _this.mett_details = response.data;
          _this.meet_obj.name = response.data.name;
          _this.meet_obj.maxCount = response.data.maxCount;
          _this.meet_obj.description = response.data.description;
          _this.standardList = [];
          _this.standardList = JSON.parse(response.data.standard);
          _this.dialogVisible = true;
          // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      this.meetVisible = true;
    },
    //会议编辑保存
    meetEdit() {
      if (this.meet_obj.name == "") {
        this.$message.error("会议类型名称不能为空");
        return;
      }
      if (this.meet_obj.maxCount == "") {
        this.meet_obj.maxCount = 0;
      }

      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName == "") {
          this.standardList.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName != "") {
          if (this.standardList[i].count == "") {
            this.$message.error("人员限制不能为空");
            return;
          }
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        for (var j = 0; j < this.huilist.length; j++) {
          if (this.standardList[i].roleName === this.huilist[j].roleName) {
            this.standardList[i].roleId = this.huilist[j].roleId;
          }
        }
      }
      var num = 0
      this.standardList.forEach(ele=>[
        num += Number(ele.count)
      ])
      if(num > Number(this.meet_obj.maxCount)){
        this.$message.error('人数限制小于人员限制人数总和')
        return
      }
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.meet_id, //"会议配置id"
          name: this.meet_obj.name, //"会议类型名称",
          maxCount: this.meet_obj.maxCount,
          standardList: this.standardList, //角色人员限制规则 [{ "roleId":"角色1", "roleName":"质控", "count":"3" } ]
          description: this.meet_obj.description //"类型说明"
        }
      };
      console.log(dataObj);
      var that = this;
      this.$post("/info/project/updateMeetingConfig", dataObj)
        .then((response)=> {
          if (response.code == 0) {
            that.dialogVisible = false;
            that.buue = true;
            that.standardList = [];
            that.meet_obj.name = "";
            that.meet_obj.description = ""; //类型说明
            that.meet_obj.maxCount = 0; //人数
            that.$message({
              type: "success",
              message: response.msg
            });
            that.queryMeetAll();
          } else {
            that.$message.error(response.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 会议删除删除
    handleDelete(index, row) {
      this.met_ar = row.id;
      var _this = this;
      this.$confirm("确定删除所选会议", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              id: _this.met_ar,
              name: row.name
            }
          };

          _this
            .$post("/info/project/delMeetingConfig", data)
            .then((response)=> {
              // console.log(response);
              if (response.code == 0) {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                _this.queryMeetAll();
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
    //查询投票详情
    cvoteVisible(index, row) {
      this.$forceUpdate();
      // this.cvoteChecklis = "";
      this.addMatch();
      var that = this;
      this.covet_id = row.id; //获取投票id用于编辑
      this.adddCvotebul = false;
      this.cvote_obj.name = row.typeName;
      this.cvote_obj.maxCount = row.voteTurnout;
      this.standardList = [];
      this.standardList = row.limitation;
      this.dialogcvote = true;
      this.checkList = row.voteOption.split(",");
      this.cvote_obj.description = row.typeDesc;
      this.cvoteChecklis = row.voteRule;
      var obj = {};
      var dse = "";
      if (this.cvoteChecklis !== "") {
        for (var i = 0; i < this.cvoteChecklis.length; i++) {
          if (typeof this.cvoteChecklis[i].number == "string") {
            this.cvoteChecklis[i].number = this.cvoteChecklis[i].number.split(
              "/"
            );
          }
          for (var j = 0; j < that.typ_checklist.length; j++) {
            if (that.cvoteChecklis[i].ruleId == that.typ_checklist[j].id) {
              that.typ_checklist[j].coutmin = that.cvoteChecklis[i].number[0];
              that.typ_checklist[j].coutmax = that.cvoteChecklis[i].number[1];
              that.typ_checklist[j].checked = true;
            }
          }
        }
      }
    },
    roudIdlistis(){
      this.buue = true
    },
    // 投票修改
    cvoteEdit() {
      this.roudIdlist = [];
      var that = this;
      for (let i = 0; i < this.standardList.length; i++) {
        console.log(this.standardList[i]);
        if (this.standardList[i].roleName != "") {
          if (this.standardList[i].count == "") {
            this.$message.error("人员限制不能为空");
            return;
          }
        }
      }
      if (this.cvote_obj.name == "") {
        this.$message.error("投票类型名称不能为空");
        return;
      }
      if (this.cvote_obj.maxCount == '' || this.cvote_obj.maxCount == 0) {
        this.$message.error("人数限制不能为空");
        return;
      }
      // if (this.sum > this.cvote_obj.maxCount) {
      //   this.$message.error("人员限制不能大于人数限制");
      //   return;
      // }
      var sum = 0;
      for (let i = 0; i < this.standardList.length; i++) {
        sum += Number(this.standardList[i].count);
      }
      if (sum > this.cvote_obj.maxCount) {
        this.$message.error("人数限制小于人员限制人数总和");
        return;
      }
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (this.typ_checklist[i].checked == true) {
          if (
            this.typ_checklist[i].coutmax <= 0 ||
            this.typ_checklist[i].coutmin <= 0
          ) {
            this.$message.error("投票规则值不能为空");
            return;
          }
        }
      }
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (this.typ_checklist[i].coutmin > this.typ_checklist[i].coutmax) {
          this.$message.error("投票规则最大值不能小于最小值");
          return;
        }
      }
      var dsk = [];
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (this.typ_checklist[i].checked == true) {
          dsk.push({
            ruleId: this.typ_checklist[i].id,
            number:
              this.typ_checklist[i].coutmin +
              "/" +
              this.typ_checklist[i].coutmax
          });
        }
      }
      // console.log(dsk);
      // return;
      // standardList
      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName == "") {
          this.standardList.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        for (var j = 0; j < this.huilist.length; j++) {
          if (this.standardList[i].roleName === this.huilist[j].roleName) {
            this.standardList[i].roleId = this.huilist[j].roleId;
          }
        }
      }
      if (this.standardList !== "") {
        this.standardList.forEach(function(c) {
          if (c.roleId) {
            c.roleName = "";
          }
        });
      }
      var obj = {};
      for (var j = 0; j < this.checklist.length; j++) {
        this.roudIdlist.push({
          ruleId: this.checklist[j].id,
          number: this.checklist[j].coutmin + "/" + this.checklist[j].coutmax
        });
      }
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          id: this.covet_id,
          typeName: this.cvote_obj.name, //"会议类型名称",
          voteTurnout: this.cvote_obj.maxCount,
          voteOption: this.checkList.join(","),
          // voteRule: JSON.stringify(this.roudIdlist),
          voteRule: JSON.stringify(dsk),
          limitation: JSON.stringify(this.standardList), //角色人员限制规则 [{ "roleId":"角色1", "roleName":"质控", "count":"3" } ]
          typeDesc: this.cvote_obj.description //"类型说明"
        }
      };
      var that = this;
      this.$post("/info/project/updaVoteType", dataObj)
        .then((response)=> {
          // console.log(response);
          if (response.code == that.code.codeNum.SUCCESS) {
            that.dialogVisible = false;
            that.standardList = [];
            that.meet_obj.name = "";
            that.meet_obj.description = ""; //类型说明
            that.meet_obj.maxCount = 0; //人数
            that.adddCvotebul = true;
            that.roudIdlist = [];
            that.dialogcvote = false;
            that.$message({
              type: "success",
              message: response.msg
            });
            that.querycvoteAll();
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
    },
    // // 投票删除
    cvoteDelete(index, row) {
      var _this = this;
      this.$confirm("确定删除所选投票", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var data = {
            token: _this.token,
            userId: _this.userId,
            data: {
              id: row.id,
              typeName: row.typeName
            }
          };

          _this
            .$post("/info/project/delVoteType", data)
            .then((response)=> {
              // console.log(response);
              if (response.code == 0) {
                _this.querycvoteAll();
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
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

    //添加投票
    adddCvote() {
      this.roudIdlist = [];
      if (this.cvote_obj.name == "") {
        this.$message.error("投票类型名称不能为空");
        return;
      }
      for (let i = 0; i < this.standardList.length; i++) {
        console.log(this.standardList[i]);
        if (this.standardList[i].roleName != "") {
          if (this.standardList[i].count == "") {
            this.$message.error("人员限制不能为空");
            return;
          }
        }
      }
      if (this.cvote_obj.maxCount == '' || this.cvote_obj.maxCount == 0) {
        this.$message.error("人数限制不能为空");
        return;
      }
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (this.typ_checklist[i].checked == true) {
          if (
            this.typ_checklist[i].coutmax <= 0 ||
            this.typ_checklist[i].coutmin <= 0
          ) {
            this.$message.error("投票规则值不能为空");
            return;
          }
        }
      }
      for (var i = 0; i < this.typ_checklist.length; i++) {
        if (Number(this.typ_checklist[i].coutmin) > Number(this.typ_checklist[i].coutmax)) {
          this.$message.error("投票规则最大值不能小于最小值");
          return;
        }
      }
      var sum = 0;
      for (let i = 0; i < this.standardList.length; i++) {
        sum += Number(this.standardList[i].count);
      }
      if (sum > this.cvote_obj.maxCount) {
        this.$message.error("人数限制小于人员限制人数总和");
        return;
      }
      var that = this;
      for (var i = 0; i < this.standardList.length; i++) {
        if (this.standardList[i].roleName == "") {
          this.standardList.splice(i, 1);
          i--;
        }
      }
      for (var i = 0; i < this.standardList.length; i++) {
        for (var j = 0; j < this.huilist.length; j++) {
          if (this.standardList[i].roleName === this.huilist[j].roleName) {
            this.standardList[i].roleId = this.huilist[j].roleId;
          }
        }
      }
      if (this.standardList != "") {
        this.standardList.forEach(function(c) {
          if (c.roleId) {
            c.roleName = "";
          }
        });
      }
      this.stry();
      var obj = {};
      for (var j = 0; j < this.checklist.length; j++) {
        this.roudIdlist.push({
          ruleId: this.checklist[j].id,
          number: this.checklist[j].coutmin + "/" + this.checklist[j].coutmax
        });
      }

      console.log(this.checklist);
      var dataObj = {
        token: this.token,
        userId: this.userId,
        data: {
          typeName: this.cvote_obj.name, //"会议类型名称",
          voteTurnout: this.cvote_obj.maxCount,
          voteOption: this.checkList.join(","),
          voteRule: JSON.stringify(this.roudIdlist),
          limitation: JSON.stringify(this.standardList), //角色人员限制规则 [{ "roleId":"角色1", "roleName":"质控", "count":"3" } ]
          typeDesc: this.cvote_obj.description //"类型说明"
        }
      };
      var that = this;
      this.$post("/info/project/addVoteType", dataObj)
        .then((response)=> {
          if (response.code == that.code.codeNum.SUCCESS) {
            that.dialogcvote = false;
            that.adddCvotebul = false;
            that.standardList = [];
            that.$utils.removeDraft('conferences', false)
            clearInterval(that.newmanagements)
            that.cvote_obj.name = "";
            that.cvote_obj.description = ""; //类型说明
            that.cvote_obj.maxCount = 1; //人数
            that.roudIdlist = [];
            that.typ_checklist = that.typchecklist; //用于缓存数组
            that.$message({
              type: "success",
              message: response.msg
            });
            that.querycvoteAll();
          } else {
            that.$message({
              type: "error",
              message: response.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
  },

  watch: {
    tartfalse: function(valu) {
      this.tyoeppd();
    },
    dialogVisible: function(val) {
      if (val == false) {
        this.standardList = [];
        this.meet_obj.name = "";
        this.meet_obj.description = ""; //类型说明
        this.meet_obj.maxCount = 0; //人数
        clearInterval(this.newmanagement)
        this.oldRoleNameList = [];
      } else {
        this.oldRoleNameList = [];
        this.standardList.map((item) => {
          this.oldRoleNameList.push(item.roleName)
        })
      }
    },
    dialogcvote: function(val) {
      if (val == false) {
        clearInterval(this.newmanagements)
         
        this.standardList = [];
        this.cvote_obj.name = "";
        this.cvote_obj.description = ""; //类型说明
        this.cvote_obj.maxCount = 1; //人数
        this.roudIdlist = [];
        this.typ_checklist = [
          {
            id: 1,
            coutmin: "",
            coutmax: "",
            checked: true,
            disabled: true,
            nametype: "大于等于",
            name: "例：（2/3）的人大于等于同意允许通过"
          },
          {
            id: 2,
            coutmin: "",
            coutmax: "",
            checked: "",
            disabled: true,
            nametype: "大于等于",
            name: "例：有条件通过允许通过"
          },
          {
            id: 3,
            coutmin: "",
            coutmax: "",
            checked: true,
            disabled: true,
            nametype: "大于等于",
            name: "例：不同意为不通过"
          },
          {
            id: 4,
            coutmin: "",
            coutmax: "",
            checked: "",
            disabled: true,
            nametype: "大于等于",
            name: "例：暂缓表决为不通过"
          }
        ];
        this.oldRoleNameList = [];
      } else {
        this.oldRoleNameList = [];
        this.standardList.map((item) => {
          this.oldRoleNameList.push(item.roleName)
        })
      }
    },
    checkList: function(vale) {
      var that = this;
      if (this.checkList.length >= 4) {
        this.typ_checklist[3].checked = true;
        this.typ_checklist[1].checked = true;
      } else if (this.checkList.length == 2) {
        this.typ_checklist[3].checked = false;
        this.typ_checklist[1].checked = false;
      } else {
        for (var i = 0; i < vale.length; i++) {
          if (vale[i] == 3) {
            this.typ_checklist[3].checked = true;
          } else if (vale[i] !== 3) {
            this.typ_checklist[3].checked = false;
          }
          if (vale[i] == 4) {
            this.typ_checklist[1].checked = true;
          } else {
            this.typ_checklist[1].checked = false;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .header-btn{
    position: absolute;
    bottom: 4px;
    right: 20px;
  }
.classification {
  width: 99.7%;
  padding: 0px 0px;
  overflow: hidden;
  background: #f0f2f5;
  .riheader {
    width: 100%;
    // padding: 0 15px;
    height: 96px;
    padding: 0 8px;
    background: rgba(255, 255, 255, 1);
    // position: relative;
    .el-breadcrumb {
      line-height: 46px;
    }
    .finance_tit {
      position: relative;
      width: 100%;
      margin-top: 10px;
      // padding: 15px 5px;
      // position: relative;
      .spantil {
        color: #333;
        float: left;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .el-popover {
      padding-bottom: 10px;
    }
  }

  //内容模块
  .class_content {
    width: 100%;
    // height: 500px;
    // padding: 2px;
    margin: 14px auto;
    // padding-bottom: 20px;
    background: #ffffff;
  }
  .foot_fen {
    width: 99%;
    // height: 45px;
    padding-top: 17px;
    // line-height: 45;
    // margin: 8px auto;
    background: #ffffff;
  }
  .foot_fen_tab {
    float: right;
    margin-right: 60px;
  }

  .form_box {
    background: #fff;
    padding-top: 20px;
    padding-left: 10px;
    // padding-bottom: 20px;

    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 8px;
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
  .form_box1 {
    background: #fff;
    padding-top: 16px;
    padding-left: 10px;
    // padding-bottom: 10px;

    .el-form-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      height: 38px;
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
      margin-top: 2px;
    }
  }
  .tab_box {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }
  .tan_dialog {
    position: relative;

    // border-top: 1px soild #f2f3f5;
  }
  .dialog-footer {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }

  .ullisth .toupiao_leih:nth-child(1) {
    margin-top: 8px;
  }
  .toupiao_leih {
    margin-top: 10px;
    // padding-top: 3px;
    height: 40px;
    line-height: 40px;
    display: flex;
  }
  .toupiao_leihbuto {
    margin-top: 10px;
    // padding-top: 3px;
    // height: 40px;
    line-height: 35px;
    display: flex;
  }
  .toupiao_leihconcet {
    margin-top: 14px;
    // padding-top: 3px;
    height: 40px;
    line-height: 40px;
    display: flex;
  }
  .toupiao_leihxian {
    // padding-top: 3px;
    line-height: 40px;
    display: flex;
  }
  .toupiao_lei {
    margin-top: 21px;
    // height: 40px;
    // line-height: 40px;
    display: flex;
  }
  .toupiao_leier {
    margin-top: 12px;

    display: flex;
    padding-left: 13px;
  }
  .toupiao_lab {
    // width: 100px;
    // margin-top: 4px;
    // font-size: 17px;
    // line-height: 26px;
    margin-top: 4px;
    font-size: 13px;
    line-height: 34px;
  }
  .toupiao_title {
    display: inline-block;
    text-align: right;
    width: 100px;
    margin-top: 4px;
    margin-left: 4px;
    font-size: 15px;
    line-height: 26px;
  }
  .toupiao_lei_t {
    width: 300px;
    height: 36px;
  }
  .xuanzhe {
    display: flex;
    justify-content: column;
  }

  .typchackul {
    width: 100%;
    // height: 200px;
    padding-left: 5px;
    .typchackul_list {
      margin-top: 12px;
    }
    .number_mim {
      border-radius: 3px;
    }
  }
  .meet_title {
  }
  .cvote_button {
    margin-left: -1px;
  }
  .xial {
    width: 300px;
    .el-select {
      width: 130px;
    }
  }
  .btx {
    color: red;
  }
  .deletbutton {
    border: none;
    width: 28px;
    height: 28px;
    background: url("../../../../assets/manuscript_icon/lshanchu.png") no-repeat;
    background-size: 100% 100%;
  }



  .deletbutton:hover {
    // background-color: #de5252;
    // color: #ffffff;
    border: none;
    width: 28px;
    height: 28px;
    background: url("../../../../assets/manuscript_icon/lshnachuh.png")
      no-repeat;
    background-size: 100% 100%;
  }

}
</style>
<style>
.classification .el-tabs--border-card > .el-tabs__content {
  padding: 15px 2px 2px 2px;
}

.classification .el-input-number {
  margin-left: 10px;
  margin-right: 10px;
}
.classification .el-tabs {
  border-bottom: 0px;
}
.classification .el-tabs--border-card > .el-tabs__content {
  padding: 0px 2px 2px 0px;
}
.classification .el-button el-button--primary el-button--medium {
  height: 40px;
}
element.style {
  width: 110px;
  transform-origin: center top;
  z-index: 2005;
  position: absolute;
  top: 133px;
  left: 749px;
}
.classification .el-button .el-button--default {
  padding-left: 0px;
}
.classification .el-dialog__body {
  padding: 8px 20px;
  color: #606266;
  font-size: 14px;
}

.classification .el-popover {
  min-width: 100px;
  padding: 2px;
}
.classification .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #e8e8e8;
}

.classification .el-popover .el-button--text {
  color: #666666;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.classification .el-popover .el-button--text:hover {
  color: #666666;
  background: #f7f7f7;
  padding-left: 0;
  padding-right: 0;
}
.classification .classification .form_box .el-form-item[data-v-6208de1c] {
  float: left;
  margin-right: 20px;
  margin-bottom: 14px;
  height: 40px;
}
.classification .el-table_1_column_1 {
  padding-left: 12px;
}
.classification .el-dialog__body {
  padding: 0px 20px 20px 20px;
  color: #606266;
  font-size: 14px;
}
.classification .el-dropdown-menu__item:focus,
.classification .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #f5f7fa;
  color: #666666;
}
.classification .el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.classification .toupiao_leihxian {
  line-height: 40px;
  display: -ms-flexbox;
  display: flex;
  width: 632px;
}
</style>

