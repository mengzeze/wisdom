<template>
  <div class="rightmenu" v-if="rightmenuIsShow">
    <div class="right_menu">
      <ul class="el-scrollbar__view">
        <li
          v-for="(item,index) in menuList"
          :key="index"
          @click="clickFn(item.flag)"
          v-if="item.show"
        >
          <div class="left">
            <img :src="item.url">
          </div>
          <div class="right">
            <span>{{item.lable}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { type } from 'os';
export default {
  props: ["rightmenuIsShow", "fileData", "type",'hasDocAndFolder'],
  data() {
    return {
      menuList: [
        {
          lable: "预览", // 右键菜单名称
          show: true, //  是否显示该项
          flag: "preview", //  判断标识
          url: ""//图标地址
        },
        {
          lable: "下载",
          show: true,
          flag: "download",
          url: ""
        },
        {
          lable: "上传新版本",
          show: true,
          flag: "upload",
          url: ""
        },
        {
          lable: "删除",
          show: true,
          flag: "delete",
          url: ""
        },
        {
          lable: "重命名",
          show: true,
          flag: "rename",
          url: ""
        },
        {
          lable: "复制",
          show: true,
          flag: "copy",
          url: ""
        },
        {
          lable: "剪切",
          show: true,
          flag: "cut",
          url: ""
        },
        {
          lable: "普通粘贴",
          show: true,
          flag: "paste",
          url: ""
        },
        {
          lable: "锁定",
          show: true,
          flag: "lock",
          url: ""
        },
        {
          lable: "文件属性",
          show: true,
          flag: "attributes",
          url: ""
        }
        // {
        //   lable: "文件权限",
        //   show: false,
        //   flag: "permission"
        // }
      ]
    };
  },
  created() {
    this.initImgUrl();
    this.isunlock();
  },
  methods: {
    clickFn(flag) {
      this.$emit("rightMenuClick", flag);
    },
    initImgUrl(){
      for (var i = 0; i < this.menuList.length; i++) {
        this.menuList[i].url = require("../../pages/common/rightmenuicon/" +
          this.menuList[i].flag +
          ".png");
      }
    },
    //  判断文件的锁定状态
    isunlock(){
      for(var i=0;i<this.menuList.length;i++){
        if(this.menuList[i]["flag"] == "lock"){
          if(this.type == 'project'){
            if(this.fileData.lockState){
              this.menuList[i]["lable"] = "解锁";
            } else {
              this.menuList[i]["lable"] = "锁定";
            }
          } else {
            if(this.fileData.lockState != -1){
              this.menuList[i]["lable"] = "解锁";
            } else {
              this.menuList[i]["lable"] = "锁定";
            }
          }
        }
      }
    },
    listChange(){
      // docType == 1 -----文件夹，0---文件
      if (this.fileData.docType == "1") {
        if(this.hasDocAndFolder){
          this.menuList = [
            {
              lable: "删除",
              show: true,
              flag: "delete",
              url: ""
            },
            {
              lable: "复制",
              show: true,
              flag: "copy",
              url: ""
            },
            {
              lable: "剪切",
              show: true,
              flag: "cut",
              url: ""
            }
          ];
        } else {
          this.menuList = [
            {
              lable: "打开",
              show: true,
              flag: "open",
              url: ""
            },
            {
              lable: "删除",
              show: true,
              flag: "delete",
              url: ""
            },
            {
              lable: "重命名",
              show: true,
              flag: "rename",
              url: ""
            },
            {
              lable: "复制",
              show: true,
              flag: "copy",
              url: ""
            },
            {
              lable: "剪切",
              show: true,
              flag: "cut",
              url: ""
            },
            {
              lable: "普通粘贴",
              show: true,
              flag: "paste",
              url: ""
            },
            { // 文件夹也要有讨论权限
              lable: "讨论",
              show: false,
              flag: "docDiscuss",
              url: ""
            }
          ];
        }       
      } else if (!this.fileData || this.fileData.docType != "1") {
        if(this.hasDocAndFolder){
          this.menuList = [
            {
              lable: "删除",
              show: true,
              flag: "delete",
              url: ""
            },
            {
              lable: "复制",
              show: true,
              flag: "copy",
              url: ""
            },
            {
              lable: "剪切",
              show: true,
              flag: "cut",
              url: ""
            }
          ];
        } else {
          this.menuList = [
            {
              lable: "预览", // 右键菜单名称
              show: true, //  是否显示该项
              flag: "preview" ,//  判断标识
              url: ""
            },
            {
              lable: "下载",
              show: true,
              flag: "download",
              url: ""
            },
            {
              lable: "上传新版本",
              show: true,
              flag: "upload",
              url: ""
            },
            {
              lable: "删除",
              show: true,
              flag: "delete",
              url: ""
            },
            {
              lable: "重命名",
              show: true,
              flag: "rename",
              url: ""
            },
            {
              lable: "复制",
              show: true,
              flag: "copy",
              url: ""
            },
            {
              lable: "剪切",
              show: true,
              flag: "cut",
              url: ""
            },
            {
              lable: "普通粘贴",
              show: true,
              flag: "paste",
              url: ""
            },
            {
              lable: "锁定",
              show: true,
              flag: "lock",
              url: ""
            },
            {
              lable: "文件属性",
              show: true,
              flag: "attributes",
              url: ""
            },
            {
              lable: "文件权限",
              show: false,
              flag: "permission",
              url: ""
            },
            {
              lable: "讨论",
              show: false,
              flag: "docDiscuss",
              url: ""
            }
          ];
        }
      }
      if (this.type) {
        this.menuList[this.menuList.length - 1]["show"] = true;
        this.menuList[this.menuList.length - 2]["show"] = true;
      } else if(!type && this.fileData.docType != '1') {
        this.menuList[this.menuList.length - 1]["show"] = false;
        this.menuList[this.menuList.length - 2]["show"] = false;
      }
      this.isunlock();
      this.initImgUrl();
    }
  },
  watch: {
    fileData() {
      this.listChange();
    },
    hasDocAndFolder() {
      this.listChange();
    }
  }
};
</script>

<style lang="scss" scoped>
.right_menu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;

  li {
    width: 150px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .left {
      width: 30px;
      background-color: #f2f2f2;
      img {
        display: block;
        margin: 8px auto;
        width: 14px;
        height: 14px;
      }
    }
    .right {
      padding-left: 8px;
    }
  }

  li:hover {
    // border: solid 1px #eef5fd;
    background-color: #eff6fe;
    box-shadow: 2px 2px 2px #eef5fd;
  }
}
</style>

