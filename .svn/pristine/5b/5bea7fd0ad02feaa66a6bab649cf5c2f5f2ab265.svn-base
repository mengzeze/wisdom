
export default {
  // 时间格式化，去掉秒
  'filtertime': (val)=>{
    if(val != null && val != "" && val != undefined){
      return val.substr(0,val.lastIndexOf(':'))
    }
  },
  // 文件大小格式化
  'filesize': (val)=>{
    if (val == null) {
      return;
    }
    var size = "";
    if (val < 0.1 * 1024) {
      //小于0.1KB，则转化成B
      size = val.toFixed(2) + "B";
    } else if (val < 0.1 * 1024 * 1024) {
      //小于0.1MB，则转化成KB
      size = (val / 1024).toFixed(2) + "KB";
    } else if (val < 0.1 * 1024 * 1024 * 1024) {
      //小于0.1GB，则转化成MB
      size = (val / (1024 * 1024)).toFixed(2) + "MB";
    } else {
      //其他转化成GB
      size = (val / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizeStr = size + ""; //转成字符串
    var index = sizeStr.indexOf("."); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    if (dou == "00") {
      //判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;

  }
}
