/***
 * @description 文件上传模块
 * **/
// import plupload from 'plupload'
import SparkMD5 from "spark-md5";
import {doc_utils} from '@/pages/common/js/doc.utils';
import axios from 'axios'; // 引入axios
import global from '@/global.js'
const  URL_UPLOAD = global.baseUrl;
export class wisdom_doc {
  constructor(param) {
    //初始化默认参数
    let defaultParam = {
      url: URL_UPLOAD + '/rfs/uploadChunk',
      chunk_size: wisdom_doc.getChunkSize(),
      preinit: {
        BeforeUpload : (up, file) => {
          if (file.complete) {
            //文件上传成功
            up.stop();
            this.fileUploadedComplete(up, file, file.rfsId, file.hashCode)
          }
        },
        UploadFile: (up, file) => {

          //计算文件第一片的hash值
          // if (!this.fileChunkSize) {
          //   up.stop();
          //   this.calculateChunkHash(up, file.getNative(), 0);
          // }


          //TODO 修改token
          let multipart_params = {
            token: JSON.parse(sessionStorage.getItem("userToken")),
            hashCode: file.hashCode,
            size: file.size,
            chunkHash: this.fileChunkSize
          };
          this.setParam({
            multipart_params
          });
        }
      },
      init: {
        Error: (up, errObject) => {
          switch (errObject.code) {
            //当选择的文件类型不符合要求时的错误代码
            case plupload.FILE_EXTENSION_ERROR:
              //TODO 当前选择的文件类型不符合要求
              break;
            default :
              this.param.error();
          }
        },
        FilesAdded: (uploader, files) => {
          console.log('FilesAdded', files)
          this.files += files.length;
          files.forEach((file) => {
            // //判断是否已经添加过此文件
            if (!this.isAddedThisFile(uploader, file)) {
              this.param.fileAdd(file);
              //将文件分片并获取相对应的hashcode
              // doc_utils.hashFileAllChunks(file,res=>{
              //   console.log('allChunks', res)
              // })
              // return
              doc_utils.hashFile(file, (hashCode) => {
                //进行文件初始化
                this.upload_chunk_init(file, hashCode)
                  .then((response) => {
                    this.upload_chunk_init_callBack(file, hashCode, response);
                  });
              });
            } else {
              uploader.removeFile(file);
            }
          });
        },
        //上传过程中不断触发
        UploadProgress: (up, file) => {
          if(isNaN(up.total.bytesPerSec)) {
              up.total.bytesPerSec = 0;
          }
          this.param.UploadProgress(up, file);
        },
        //每片上传之后触发
        // responseObject为服务器返回的信息对象，它有以下5个属性：
        //
        // offset：该文件小片在整体文件中的偏移量
        //
        // response：服务器返回的文本
        //
        // responseHeaders：服务器返回的头信息
        //
        // status：服务器返回的http状态码，比如200
        //
        // total：该文件(指的是被切割成了许多文件小片的那个文件)的总大小，单位为字节
        ChunkUploaded: (uploader, file, responseObject) => {
          // let result = JSON.parse(responseObject.response);
          // if (result.code === 0) { //成功
          //   if (result.data.complete) {   //判断是否秒传成功
          //       console.dir("文件块秒传成功:");
          //     this.fileUploadedComplete(uploader, file, result.data.rfsId, result.data.hashCode)
          //   }
          //   // else {      //计算每一片的hash
          //   //   if (responseObject.offset !== responseObject.total) {   //如果不是最后一片
          //   //     uploader.stop();    //暂停，计算每一片的hash
          //   //     this.calculateChunkHash(uploader, file.getNative(), responseObject.offset);
          //   //   }
          //   // }
          // } else {    //分片上传失败
          //   this.FileUploadedError(uploader, file);
          // }

        },
        FileUploaded: (uploader, file, responseObject) => {   //单个文件上传成功后触发
          let parse = JSON.parse(responseObject.response);
          if (parse.code === 0) {
            this.fileUploadedComplete(uploader, file, parse.data.rfsId, parse.data.hashCode);
          } else {
            this.param.FileUploadedError(file);
          }
        },
        QueueChanged: (up) => {
          let files = this.uploader.files;
          //TODO 没有选择文件时的交互
          if (files.length === 0) {
            //console.dir("无文件");
          } else {
            //console.dir("有文件");
          }
        },
        UploadComplete: (uploader,files) => {
            console.dir("全部文件上传成功~~~~" + this.files);
            let length = files.length + this.complete;
            let fn = setInterval(() => {
                if(this.files === 0) {
                    window.clearInterval(fn);
                    this.param.callBack(uploader,length);
                }
            },1000);
        }
      }
    };

    this.complete = 0;

    this.files = 0;

    this.param = param;

    // this.uploader = new plupload.Uploader(defaultParam);

    this.setParam(param);

    this.uploader.init();
    // this.uploader.destroy();

  }

    destroy(){
        this.uploader.destroy();
    }

  /**
   * 开始上传
   * **/
  upload() {
      if(this.uploader.files.length !== 0) {
          this.uploader.start();
      }

  }

  /**
   * 对必要参数进行赋值
   * **/
  setParam(param) {
    //console.log(11111111111111111111111111111111111111);
    this.uploader.setOption(param);
  }

  /**
   * 获取文件分块大小 10M
   * **/
  static getChunkSize() {
    return 10 * 1024 * 1024;
  }

  /**
   * 初始化文件上传信息
   * **/

  upload_chunk_init(file, hashCode) {
    return new Promise(resolve => {
      //TODO 修改token
      let arg = {
        token: this.param.token,
        data: {
          docSize: file.size,
          docName: file.name,
          chunkSize: wisdom_doc.getChunkSize(),
          hashCode
        }
      };

      axios.post('/rfs/uploadChunk/init', arg, {
        baseURL: URL_UPLOAD
      }).then((response => {
        resolve(response);
      })).catch(error => {
        this.param.error(error);
      })

    })
  }

  /**
   * 文件信息初始化回调
   * **/
  upload_chunk_init_callBack(file, hashCode, response) {
    if (response.data.code === 0) {
      let data = response.data.data;
      if (data.complete) {
        //文件秒传成功
        file.complete = true;
        file.rfsId = data.rfsId;
        file.hashCode = data.hashCode;
      } else {
        //文件未上传或上传未结束
        file.startByte = data.startByte;
        file.endByte = data.endByte;
        file.hashCode = hashCode;
        file.rfsId = data.rfsId;
        //文件断点续传
        let number = data.chunkNumber;
        if(number > 0) {
            number += 1;
        }
        file.loaded = number * wisdom_doc.getChunkSize();
      }
      this.param.fileInitComplete(file);
    } else {
      this.param.error();
    }
  }

  /**
   * 当计算文件hash值的loading
   * **/
  loadingWhenHashFile() {
    //TODO 当计算文件hash值的loading
  }

  /**
   * 关闭计算文件hash值的loading
   * **/
  closeLoadingWhenHashFile() {
    //TODO 关闭计算文件hash值的loading
  }

  /**
   * 上传成功的文件处理
   * **/
  completeFileHandler(file) {

  }

  /**
   * 从队列中移除文件
   * **/
  removeFile(docId) {
    // console.log(docId);
    // console.log(this.uploader.getFile(docId));
    // console.log(this.uploader);
    this.files -= 1;
    this.uploader.removeFile(this.uploader.getFile(docId));
  }

  /**
   * 文件秒传成功后，要计算整体的上传百分比
   * **/
  calculateTotalPercent(up) {
    //上传百分比增加为: 1/文件总数*100
    let files = up.files;

    let number = 1 / files.length * 100;

    //加入原百分比
    number += up.total.percent;

    number = number > 100 ? 100 : number;

    up.total.percent = number;

    this.param.totalPercent(number);

  }

  //判断是否已经添加过此文件
  isAddedThisFile(up, file) {
    let files = up.files;
    let r = 0;
    files.forEach((item) => {
      if (item.name === file.name) {
        r++;
      }
    });
    return r > 1;
  }

  uploadComplete() {
      this.files -= 1;
  }

  //文件上传成功
  fileUploadedComplete(up, file, rfsId, hashCode) {
    //文件秒传成功后，要计算整体的上传百分比
    // this.calculateTotalPercent(up);
    // console.dir("上传成功！：" + file.name);
    try{
        //记录文件上传成功数量
        this.complete += 1;
        up.removeFile(file);
    }catch (e) {

    }
    //TODO 修改token,createBy,updateBy
    let arg = {
      token: this.param.token,
      userId: this.param.userId,
      data: {
        docSource: this.param.docSource,//项目文档为0，底稿文档为1，客户文档为2
        projId: this.param.projId,
        parentId: this.param.parentId,//顶级为0
        auditProjectId: this.param.auditProjectId,//项目阶段ID，可以为空
        docName: file.name,
        docSize: file.size,
        docHashcode: hashCode,
        docVersionRfs: rfsId,//
        createBy: this.param.userId,
        updateBy: this.param.userId,
        docDescript: '上传新文件'
      }
    };
    this.fileChunkSize = undefined;
    file.rfsId = rfsId;

    axios.post('/doc/insert', arg, {
      baseURL: URL_UPLOAD
    }).then((response => {
        if(response.data.code === 0) {
            this.param.FileUploaded(file, response.data.data.docId, response.data.data.docName);

            up.start();
        }
    })).catch(error => {
      this.param.error(error);
    });

  }

  //计算每一片的hash
  calculateChunkHash(uploader, file, start) {

    let total = start + wisdom_doc.getChunkSize();
    let end = total > file.size ? file.size : total;

    let reader = new FileReader(), spark = new SparkMD5.ArrayBuffer();

    reader.onloadend = (e) => {

      spark.append(e.target.result);

      this.fileChunkSize = spark.end();

      uploader.start();

    };

    reader.readAsArrayBuffer(doc_utils.blobSlice(file, start, end));
  }

  /**
   * 分片上传失败
   * **/
  FileUploadedError(uploader, file) {
    //文件成功或者失败后，要计算整体的上传百分比
    this.calculateTotalPercent(uploader);
    uploader.removeFile(file);
    this.param.FileUploadedError(file);
  }
}
