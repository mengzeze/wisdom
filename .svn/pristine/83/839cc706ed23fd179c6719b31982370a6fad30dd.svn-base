<template>
  <div class="edit_container" :title="isTaskUser ? '' : '无对应权限，请联系对应项目组负责人处理'">
    <div id="div1ggd" class="toolbar"></div>
    <div id="div2dhsg" class="text">
      <p>请输入内容</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      editorOption: {},
      editor: ""
    };
  },
  props: ["html2", "changes", "statelist",'forbiddenis',
    "isTaskUser"//是否有编辑权限
  ],
  watch: {
    forbiddenis(val){
     this.editor.$textElem.attr('contenteditable', this.forbiddenis == 4? false :true)
    },
    html2: function(newV, oldV) {
      this.editor.txt.html(newV.replace(/”/g, '"'));
    },
    changes: function(newV, oldV) {
      if (newV.state == 1) {
        this.editor.txt.clear();
        // this.html2 = "";
        this.$emit("htmlmsg2", false);
      }
    },
    isTaskUser(newVal,oldVal){
      console.log(1111, newVal)
      this.initContent()
    }
  },
  mounted() {
    this.initContent()
  },
  methods: {
    htmls(html) {
      this.$emit("htmls2", html);
    },
    initContent(){
      $('.w-e-text').remove()
      // this.editor.destroy();
      var E = window.wangEditor;
      this.editor = new E("#div1ggd", "#div2dhsg");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "undo", // 撤销
        "justify", // 对齐方式
        "image", // 插入图片
        "table" // 表格
      ];
      this.editor.customConfig.debug = true;
      this.editor.customConfig.debug =
        location.href.indexOf("wangeditor_debug_mode=1") > 0;
      this.editor.customConfig.uploadImgServer =
        allUrl + "/rfs/uploadWangEditorImg";
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgParamsWithUrl = true;
      this.editor.customConfig.uploadImgMaxLength = 1;
      let _this = this;
      _this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {},
        success: function(xhr, editor, result) {
          console.log("上传成功");
        },
        fail: function(xhr, editor, result) {
          console.log("上传失败,原因是" + result);
          console.log(result);
          console.log(xhr);
          console.log(editor);
        },
        error: function(xhr, editor) {
          console.log("上传出错");
        },
        timeout: function(xhr, editor) {
          console.log("上传超时");
        },
        customInsert: function(insertImg, result, editor) {
          let srcs = _this.$store.state.isPC ? allUrl : window.location.origin;
          if (result.data[0].trim().startsWith("/")) {
            insertImg(srcs + result.data[0]);
          } else {
            insertImg(result.data[0]);
          }
        }
      };
      _this.editor.customConfig.onchange = function(html) {
        _this.htmls(html);
      };
      _this.editor.create();
      if(this.isTaskUser){
        setTimeout(()=>{
          let ele = document.querySelectorAll('#div2dhsg div')
          ele.forEach(obj=>{
            obj.setAttribute("contenteditable", true)
          })
        },1000)
      } else {
        setTimeout(()=>{
          let ele = document.querySelectorAll('#div2dhsg div')
          ele.forEach(obj=>{
            obj.setAttribute("contenteditable", false)
          })
        },1000)
      }
      _this.editor.txt.html(_this.html2.replace(/”/g, '"'));
      if (this.statelist == 1) {
        if (this.statelist == 1) {
          _this.editor.$textElem.attr("contenteditable", false);
        }
      }
    }
  }
};
</script>
<style lang="">
.w-e-text{
  overflow: auto;
}
.w-e-toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 5px;
  /* flex-wrap: wrap; */
  height: 24px;
  line-height: 5px;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 400px;
  height: 150px;
  margin-top: 3px;
}
</style>
<style scoped>
/* .el-scrollbar__wrap {
  overflow-x: hidden;
}*/
.edit_container {
  width: 450px;
} 
</style>


