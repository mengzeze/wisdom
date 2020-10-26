<template>
  <div class="edit_container">
    <div id="div3" class="toolbar"></div>
    <div id="div4" class="text"></div>
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
  props: ["html2", "changes"],
  watch: {
    html2: function(newV, oldV) {
      this.editor.txt.html(newV.replace(/”/g, '"'));
    },
    changes: function(newV, oldV) {
      if (newV.state == 1) {
        this.editor.txt.clear();
      }
    }
  },
  mounted() {
    var E = window.wangEditor;
    this.editor = new E("#div3", "#div4");
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
    if (_this.html != "") {
      _this.editor.txt.html(_this.html2.replace(/”/g, '"'));
    }
  },
  methods: {
    htmls(html) {
      this.$emit("htmls2", html);
    }
  }
};
</script>
<style lang="">
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
  text-align: left;
}
</style>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.edit_container {
  height: 181px;
  width: 450px;
}
</style>


