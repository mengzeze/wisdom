import {wisdom_doc} from './doc.main'

let param = {
  browse_button: "file",
  docSource: 1,
  projId: 12345,
  parentId: 54,
  auditProjectId: null,
  callBack: () => {       //整体成功时回调
    console.dir("main.callBack");
  },
  error: (error) => {       //整体失败时回调
    console.dir("main.error---");
    console.dir(error);
  },
  fileAdd: (file) => {     //添加文件时触发
    let text = "<div id=\"" + file.id + "\">" +
      "<span>" + file.name + " </span><span id=\"" + file.id + "span\">初始化...</span>" +
      "<span class='status'>未上传</span><span><button class='but'>取消</button></span>" +
      "</div>";
    $("#file_item").append(text);

    $(".but").unbind("click").on('click', function () {    //移除文件

      let parents = $(this).parent().parent();

      let docId = parents.prop("id");

      parents.remove();

      doc.removeFile(docId);
    });
  },
  FileUploaded: (file, docId, docName) => {  //单个文件上传成功
    console.dir("文件上传成功：" + docId + "  name:" + docName);
    //TODO 修改文件的上传百分比为100%
    $("#" + file.id).find(".status").text("上传成功");
  },
  FileUploadedError: (file) => {  //单个文件上传失败
    $("#" + file.id).find(".status").text("上传失败");
  },
  fileInitComplete: (file) => {    //文件初始化完成
    document.getElementById(file.id + 'span').innerText = '初始化完成，等待上传';
  },
  //上传过程中不断触发
  UploadProgress: (up, file) => {
    if(up.files.length !== 0){
      $("#percent").text(up.total.percent + "%");
    }
    // console.dir(file.percent);
  },
  totalPercent: (percent) => {
    //TODO 总上传百分比
    $("#percent").text(percent + "%");
  },
  filters: {
    // mime_types : [ //只允许上传图片和zip文件
    //   { title : "Image files", extensions : "jpg,gif,png" },
    //   { title : "Zip files", extensions : "zip" }
    // ],
    // max_file_size : '400kb', //最大只能上传400kb的文件
    // prevent_duplicates : true, //不允许选取重复文件
    prevent_empty : false  //是否过滤空文件
  }

};


let doc = new wisdom_doc(param);

$("#upload").unbind("click").on('click', function () {    //移除文件

  doc.upload();
});
