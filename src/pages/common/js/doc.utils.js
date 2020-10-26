import SparkMD5 from 'spark-md5'
import {wisdom_doc} from './doc.main'

/***
 * 文件操作的工具类   计算hash值，获取浏览器类型等
 * **/
export class doc_utils {
  /***
   * 获取文件hash值
   * */
  static hashFile(file, callBack) {

    if (file.getSource() === null) {
      return;
    }

    file = file.getNative();

    if (window.FileReader) {
      //文件大小为0KB  直接通过文件属性进行hash
      if (file.size === 0) {
        this.getHashByFileProp(file, callBack);
      } else if (file.size <= 1024 * 1024 * 300) {
        //1.	如文件大小 < 300M，直接进行hash(文件属性+文件内容)
        this.getHashByWholeFile(file, callBack);
      } else if (1024 * 1024 * 300 < file.size < 1024 * 1024 * 400) {
        // 400M > 文件大小 > 300M
        // 分别从0%，50%，结尾处各取70M，进行hash(文件属性+取出的内容)
        this.getHashByFixedSize(file, 1024 * 1024 * 70, callBack);
      } else {
        //400M < 文件大小
        // 分别从0%，50%，结尾处各取100M，进行hash(文件属性+取出的内容)
        this.getHashByFixedSize(file, 1024 * 1024 * 100, callBack);
      }

    } else {
      //对于低版本浏览器的处理
      this.unsupportBrowserHandler();
    }
  }

  /***
   * hash(文件属性+文件内容)
   * */
  static getHashByWholeFile(file, callBack) {

    this.fileHash(file, callBack);

  }


  /**
   * 分别从0%，50%，结尾处各取固定长度，进行hash(文件属性+取出的内容)
   * **/
  static getHashByFixedSize(file, chunkSize, callBack) {
    let fileHash = () => {
      return new Promise((resolve, reject) => {
        let currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

        fileReader.onload = (e) => {
          spark.append(e.target.result);                   // 拼接 array buffer
          currentChunk++;

          if (currentChunk === 2) {
            loadNext();
          } else {
            resolve(spark.end());
          }
        };

        fileReader.onerror = () => {
          //读取文件发生错误的处理
        };

        let loadNext = () => {
          //获取当前起点
          let start = doc_utils.getCurrentStartByte(currentChunk, chunkSize, file.size),
            end = start + chunkSize;

          fileReader.readAsArrayBuffer(doc_utils.blobSlice(file, start, end));
        };

        //首先拼接文件属性
        spark.append(this.string2buffer(file.name + file.size + file.lastModified));

        loadNext();
      })
    };

    fileHash().then((result) => {
      callBack(result);
    });
  }

  //根据处理的分块数量获取当前的起始字节数
  static getCurrentStartByte(currentChunk, chunkSize, size) {
    switch (currentChunk) {
      case 0: //当前处理块为0  则从0字节开始
        return 0;
      case 1: //当前处理块为1   则从50%开始
        return 0.5 * size;
      case 2: //当前处理块为2  则从结尾取出chunkSize大小的字节
        return size - chunkSize;
    }
  }

  //字符串转为ArrayBuffer的方法
  static string2buffer(str) {
    // 首先将字符串转为16进制
    let val = ""
    for (let i = 0; i < str.length; i++) {
      if (val === '') {
        val = str.charCodeAt(i).toString(16)
      } else {
        val += ',' + str.charCodeAt(i).toString(16)
      }
    }
    // 将16进制转化为ArrayBuffer
    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    })).buffer
  }

  /**
   * 计算整个文件的hash值
   * **/
  static fileHash(file, callBack) {
    let fileHash = () => {
      return new Promise((resolve, reject) => {
        let chunkSize = wisdom_doc.getChunkSize(),
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

        fileReader.onload = (e) => {
          spark.append(e.target.result);                   // 拼接 array buffer
          currentChunk++;

          if (currentChunk < chunks) {
            loadNext();
          } else {
            resolve(spark.end());
          }
        };

        fileReader.onerror = () => {
          //读取文件发生错误的处理
        };


        let loadNext = () => {

          let start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

          fileReader.readAsArrayBuffer(doc_utils.blobSlice(file, start, end));
        };

        //首先拼接文件属性
        spark.append(file.name + file.size + file.lastModified);

        loadNext();
      })
    };

    fileHash().then((result) => {
      callBack(result);
    });

  }

  /**
   * 对于低版本浏览器的处理
   * **/
  static unsupportBrowserHandler() {
    //TODO 对于低版本浏览器的处理
  }

  /**
   * 进行文件切片
   * **/
  static blobSlice(file, start, end) {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    return blobSlice.call(file, start, end);
  }


  /**
   * 根据文件属性进行hash
   * **/
  static getHashByFileProp(file, callBack) {
    let result = SparkMD5.hash(file.name + file.lastModified);
    callBack(result);
  }


  /**
   * 将文件分片，并生成每一片的hashcode
   * @param file
   * @param callBack
   */
  static hashFileAllChunks(file, callBack) {
    if (file.getSource() === null) {
      return;
    }
    file = file.getNative();
    if (window.FileReader) {
      let fileHash = () => {
        return new Promise((resolve, reject) => {
          let chunkSize = wisdom_doc.getChunkSize(),
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            fileReader = new FileReader();
          // 储存所有文件片及相对应的hashcode
          let chunksArr = []

          fileReader.onload = (e) => {
            let spark = new SparkMD5.ArrayBuffer()
            // 首先拼接文件属性
            spark.append(file.name + file.size + file.lastModified);
            // 拼接 array buffer
            spark.append(e.target.result)

            chunksArr.push(spark.end())

            currentChunk++;

            if (currentChunk < chunks) {
              loadNext();
            } else {
              resolve(chunksArr);
            }
          };

          fileReader.onerror = () => {
            //读取文件发生错误的处理
          };


          let loadNext = () => {

            let start = currentChunk * chunkSize,
              end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(doc_utils.blobSlice(file, start, end));
          };

          loadNext();
        })
      };

      fileHash().then((result) => {
        console.log('result', result)
        callBack(result);
      });
    } else {
      //对于低版本浏览器的处理
      this.unsupportBrowserHandler();
    }
  }

}
