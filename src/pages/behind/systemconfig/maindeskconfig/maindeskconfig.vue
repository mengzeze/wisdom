import customDetail from '@/pages/front/custommanage/financcustomdetail';
<template>
  <div class="maindeskconfig">
    <div class="maindeskconfig_contenti_headers">
      <el-breadcrumb separator="/" class="page-breadcrumb">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item>主工作台配置</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="headers_clearFix">
        <span class="headers_clearFix_title">自定义配置</span>
        <div class="header-btn">
          <el-button class="save-btn" type="primary"  @click="saveFn">保存</el-button>
        </div>
<!--        <span class="headers_clearFix_btn" @click="saveFn">-->
<!--          <b>保存</b>-->
<!--        </span>-->
      </h3>
    </div>
    <div class="contenti_container">
      <div class="left">
        <div class="container_header">
          <img src="../../../../assets/image/backstage/systemconfig/maindeskconfig/user.png" alt />
          <span>角色</span>
        </div>
        <div class="user_tree_container">
          <el-scrollbar style="height:100%; width: 100%">
          <div class="rolename"  ref="node" @click="nodeclickFn(item,index)" 
          :title="item.roleName" v-for="(item,index) in user_data" 
          :key="item.id"><img src="../../../../assets/image/people.png" alt="">
          <span>{{item.roleName}}</span></div>
          </el-scrollbar>
        </div>
      </div>
      <div class="right">
        <div class="container_header">
            <img src="../../../../assets/image/backstage/systemconfig/maindeskconfig/plate.png" alt />
            <span>工作台板块</span>
        </div>
        <div class="desk_container">
          <div class="plate-box" v-for="(item,i) in plate_datas" :key="i">
            <div>
              <el-checkbox
                :data-code="item.mainWorkCode"
                v-model="item.ischecked"
                @change="checkChange(i)"
              ></el-checkbox>
            </div>
            <div class="plate-img">
              <img
                style=" width: auto;  height: auto;  max-width: 100%;  max-height: 100%;   "
                :src="item.moduleImage"
                alt
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from "fs";
import { valid } from "semver";
export default {
  data() {
    return {
      token: "",
      userId: "",
      user_data: [], //角色数据
      defaultProps: {
        children: "children",
        label: "roleName"
      },
      selectId: "", //所选用户的数据
      plate_data: [], //右侧板块数据
      plate_datas: [],
      send_from: {
        token: "",
        userId: "",
        data: {
          roleId: "",
          module: {}
        }
      },
      saveFlag: true
    };
  },
  methods: {
    //  获取全部角色数据
    getUserDataFn() {
      var _this = this;
      var data = {
        data: {},
        pageNo: 0,
        pageSize: 0,
        token: this.token,
        userId: this.userId
      };
      this.$post("/sys/getQueryRole", data)
        .then((response)=> {
          _this.user_data = response.data;
          if (_this.selectId == "") {
            _this.selectId = _this.user_data[0].id;
          }
          _this.getPlateFn();
          setTimeout(()=>{
            _this.$refs.node[0].style.background="#F7F7F7"
          },1000)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  选中角色
    nodeclickFn(data,index) {
      this.selectId = data.id;
      this.initCheckFn();
      Array.from(this.$refs.node).filter((item,idex)=>{
        if(index == idex){
          item.style.background="#F7F7F7"
        }else{
          item.style.background=""
        }
      })
    },
    //  获取右侧板块数据
    getPlateFn() {
      var _this = this;
      var data = {
        token: this.token,
        userId: this.userId
      };
      this.$post("/sys/findModule", data)
        .then((response)=> {
          _this.plate_data = response.data;
          for (var i = 0; i < _this.plate_data.length; i++) {
            _this.plate_data[i].moduleImage =
              _this.$store.state.url.E_IP + _this.plate_data[i].moduleImage;
          }
          _this.plate_datas = _this.plate_data;
          _this.initCheckFn();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  复选框改变事件
    checkChange(i) {
      // console.log(this.plate_datas[i]["ischecked"])
      // this.plate_datas[i]["ischecked"] = !this.plate_datas[i]["ischecked"];
      this.$forceUpdate();
    },
    //  初始化角色选取数据
    initCheckFn() {
      var _this = this;
      var data = {
        token: this.token,
        userId: this.userId,
        data: {
          roleId: this.selectId
        }
      };
      this.reset();
      this.$post("/sys/findModuleByRole", data)
        .then((response)=> {
          if (
            _this.code.codeNum.SUCCESS == response.code ||
            response.code == -504
          ) {
            if(!response.data || !response.data.module) return
            var data = JSON.parse(response.data.module);
            for (var i = 0; i < _this.plate_data.length; i++) {
              var codeName = _this.plate_data[i].mainWorkCode;
              for (var str in data) {
                if (codeName === str) {
                  _this.plate_data[i]["ischecked"] = data[str];
                }
              }
            }
            _this.plate_datas = _this.plate_data;
          } else {
            _this.$message({
              message: response.msg,
              type: "warning"
            });
            _this.reset();
          }
          // for (var i = 0; i < _this.plate_datas.length; i++) {
          //   if (!_this.plate_datas[i].ischecked) {
          //     $(".el-checkbox__input")
          //       .eq(i)
          //       .removeClass("is-checked");
          //   } else {
          //     $(".el-checkbox__input")
          //       .eq(i)
          //       .addClass("is-checked");
          //   }
          // }
          _this.$forceUpdate();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //  重新渲染数据
    reset() {
      for (var i = 0; i < this.plate_datas.length; i++) {
        this.plate_datas[i]["ischecked"] = false;
      }
      this.$forceUpdate();
    },
    //  保存
    saveFn() {
      if (this.saveFlag) {
        this.saveFlag = false;
        this.send_from = {
          token: this.token,
          userId: this.userId,
          data: {
            roleId: this.selectId,
            module: {}
          }
        };

        for (var i = 0; i < this.plate_datas.length; i++) {
          var codeName = this.plate_datas[i]["mainWorkCode"];
          var obj = {};
          obj[codeName] = this.plate_datas[i]["ischecked"];
          this.send_from.data.module = $.extend(
            {},
            obj,
            this.send_from.data.module
          );
        }
        this.send_from.data.module = JSON.stringify(this.send_from.data.module);
        this.$post("/sys/updaModuleByRole", this.send_from)
          .then(response => {
            this.saveFlag = true;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.initCheckFn();
          })
          .catch(function(error) {
            this.saveFlag = true;
            console.log(error);
          });
      } else {
        this.$message({
          message: "点击过于频繁",
          type: "warning"
        });
      }
    }
  },
  created() {
    this.token = this.$store.state.loginObject.userToken;
    this.userId = this.$store.state.loginObject.userId;
    this.getUserDataFn();
  }
};
</script>

<style lang="scss" scoped>
.plate-box .plate-img {
  box-sizing: border-box;
  padding: 0px 8px;
}
  .header-btn{
    position: absolute;
    bottom: -4px;
    right: 10px;
  }
.maindeskconfig .maindeskconfig_contenti_headers {
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
    /*margin: 10px 0 19px;*/
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 5px;

    .headers_clearFix_title {
      font-size: 20px;
      font-weight: 600;
    }
    .headers_clearFix_btn {
      float: right;
      display: inline-block;
      width: 95px;
      height: 40px;
      background-color: #1a5fa4;
      line-height: 40px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border-radius: 5px;
      margin-right: 5px;
      margin-top: -10px;
      cursor: pointer;
    }
  }
}
.maindeskconfig .contenti_container {
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    height: auto;
    border-radius: 4px;
    border: solid 1px #e8eaef;
    text-align: left;
    overflow: hidden;
  }
  .left {
    width: 260px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
  }
  .container_header {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f7fa;
    border-bottom: solid 1px #e8eaef;
    vertical-align: middle;
    img {
      display: inline-block;
      margin-right: 8px;
      width: 16px;
      height: 15px;
    }
    span {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .user_tree_container,
  .desk_container {
    background-color: #f0f2f5;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .plate-box {
      position: relative;
      background-color: #fff;
      margin-bottom: 14px;
      width: 49.5%;

      .plate-img {
        height: 310px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .el-checkbox {
      top: 5px;
      left: 15px;
    }

    .plate-box:nth-child(1) .el-checkbox,
    .plate-box:nth-child(2) .el-checkbox {
      top: 5px;
    }
  }
  .user_tree_container {
    // height: max-content;
    // background-color: #fff;
    background-color: #fff;
    height: 900px;
    overflow: hidden;
  }
  .user_tree_container .el-tree {
    width: 100%;
  }
}
.maindeskconfig
  .maindeskconfig_contenti_headers
  .headers_clearFix
  .headers_clearFix_btn[data-v-34081f32] {
  float: right;
  display: inline-block;
  width: 72px;
  height: 37px;
  background-color: #1a5fa4;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: -10px;
  cursor: pointer;
}
.maindeskconfig .contenti_container .container_header span[data-v-34081f32] {
  font-size: 16px;
  font-weight: 600;
}
.rolename{
 width: 100%;
 height: 30px;
 line-height: 30px;
 padding-left: 20px;
 padding-top: 1px;
 cursor:pointer;
}
.rolename:hover{
  background: #F7F7F7;
}
.rolename span{
    width: 70%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 5px;
  font-weight: bold;
}
.rolename img{
    width: 15px;
    vertical-align: super;
}
</style>
