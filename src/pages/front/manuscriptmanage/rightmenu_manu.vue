<template>
  <div class="rightmenu" v-if="rightmenuIsShow">
    <div class="right_menu">
      <ul class="el-scrollbar__view">
        <li
          v-for="(item,index) in menuList"
          :key="index"
          @click="clickFn(item.flag)"
          v-if="item.show"
          id="item.idName"
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
export default {
  props: ["rightmenuIsShow", "fileData", "enterType"],
  data() {
    return {
      menuList: [
        {
          lable: "下载",
          show: true,
          flag: "download",
          idName: "paper_file_file_down"
        },
        {
          lable: "上传新版本",
          show: true,
          flag: "upload",
          idName: "paper_file_vesion_uploadAdd"
        },
        {
          lable: "删除",
          show: true,
          flag: "delete",
          idName: "paper_file_file_del"
        },
        {
          lable: "重命名",
          show: true,
          flag: "rename",
          idName: "paper_file_file_rename"
        },
        {
          lable: "复制",
          show: true,
          flag: "copy",
          idName: "paper_file_file_copy"
        },
        {
          lable: "剪切",
          show: true,
          flag: "cut",
          idName: "paper_file_file_shear"
        },
        {
          lable: "粘贴",
          show: true,
          flag: "paste"
        },
        {
          lable: "锁定",
          show: true,
          flag: "lock",
          idName: "paper_file_file_lock"
        },
        {
          lable: "文件属性",
          show: true,
          flag: "attributes"
        }
      ]
    };
  },
  created() {
    this.initImgUrl();
  },
  methods: {
    clickFn(flag) {
      this.$emit("rightMenuClick", flag);
    },
    initImgUrl(){
      for (var i = 0; i < this.menuList.length; i++) {
        this.menuList[i]["url"] = require("../../common/rightmenuicon/" +
          this.menuList[i].flag +
          ".png");
      }
    }
  },
  watch: {
    fileData() {
      if(this.enterType == 2) {
        if (this.fileData.docType != "1") {
             this.menuList = [
                {
                  lable: "预览", // 右键菜单名称
                  show: true, //  是否显示该项
                  flag: "preview" //  判断标识
                },
                {
                    lable: "下载",
                    show: true,
                    flag: "download",
                    idName: "paper_file_file_down"
                }
              ]
        } else {
            this.menuList = [];
        }
      } else {
        if (this.fileData.docType == "1") {
          this.menuList = [
            {
              lable: "删除",
              show: true,
              flag: "delete"
            },
            {
              lable: "重命名",
              show: true,
              flag: "rename"
            },
          ];
        } else if (!this.fileData || this.fileData.docType != "1") {
            this.menuList = [

                  {
                      lable: "下载",
                      show: true,
                      flag: "download",
                      idName: "paper_file_file_down"
                  },
                  {
                      lable: "上传新版本",
                      show: true,
                      flag: "upload",
                      idName: "paper_file_vesion_uploadAdd"
                  },
                  {
                      lable: "删除",
                      show: true,
                      flag: "delete",
                      idName: "paper_file_file_del"
                  },
                  {
                      lable: "锁定",
                      show: true,
                      flag: "lock",
                      idName: "paper_file_file_lock"
                  },
                  {
                      lable: "文件属性",
                      show: true,
                      flag: "attributes"
                  }
              ]
            if(this.fileData.lockState === '-1') {
              this.menuList.map((item,idx) => {
                  if(item.flag == 'unlock') {
                      this.menuList.splice(idx,1,{
                          lable: "锁定",
                          show: true,
                          flag: "lock"
                      })
                  }
              })

            } else {
              this.menuList.map((item,idx) => {
                  if(item.flag == 'lock') {
                      this.menuList.splice(idx,1,{
                          lable: "解锁",
                          show: true,
                          flag: "unlock"
                      })
                  }
              })



            }

        } else if(this.fileData.empty === 'kong'){
            this.menuList[{
              lable: "粘贴",
              show: true,
              flag: "paste"
            }]
        }
      }

      this.initImgUrl();
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
    border: solid 1px #eef5fd;
    background-color: #eff6fe;
    box-shadow: 2px 2px 2px #eef5fd;
  }
}
</style>

