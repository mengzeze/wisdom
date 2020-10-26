import store from "@/store/index";
import { post } from "@/api/axios";
import code from "@/pages/common/js/code.js"; //引入公共的js
import { Message } from "element-ui";
import axios from "axios";
import $crypto from "@/utils/crypto";
export default {
  getDownloadUrl(id) {
    // return `${window.allUrl}/rfs/download/${id}`
    return `${window.allUrl}/rfs/download/${encodeURIComponent(
      encodeURIComponent($crypto.encode(id))
    )}`;
  },
  /**
   * 根据权限编码判断是否有--系统权限
   * @param p 权限编码
   * @returns {boolean} 是否有权限
   */
  checkSystemPermission(p, key, n) {
    if (!p) {
      return false;
    }
    // 获取权限列表
    let list = store.state.systemPerm;
    if (!list || !list.length) return false;
    // 判断权限列表中是否包含当前权限编码
    let idx = list.findIndex(v => {
      return v === p;
    });
    key && console.log("checkSystemPermission", p, idx > -1, n);
    return idx > -1;
  },
  /**
   * 根据权限编码判断是否有--项目权限
   * @param p 权限编码
   * @returns {boolean} 是否有权限
   */
  checkProjectPermission(p, key, n) {
    if (!p) {
      return false;
    }
    // 获取权限列表
    let list = store.state.projectPerm;
    if (!list || !list.length) return false;
    // 判断权限列表中是否包含当前权限编码
    let idx = list.findIndex(v => v === p);
    // key && console.log('checkProjectPermission', p, idx > -1, n)
    return idx > -1;
  },
  /**
   * 保存草稿：统一添加储存时间，用户id，项目id和项目阶段字段
   * @param form 储存的标题。统一命名方式：draft+userId+表单名
   * @param draft 要保存的表单数据
   * @param hasProject
   */
  saveDraft(form, draft, hasProject) {
    let title = "draft" + form + store.state.loginObject.userId;
    let projectId = store.state.projectMsg.pro_id;
    projectId = projectId ? projectId.toString() : "";
    let stageId = store.state.projectMsg.projectMsg.currentImplementStageId;
    stageId = stageId ? stageId.toString() : "";
    if (hasProject) {
      title += projectId + stageId;
    }
    let data = {
      time: new Date().getTime()
    };
    data.data = draft;
    localStorage.setItem(title, JSON.stringify(data));
  },

  /**
   * 获取草稿数据：根据表单名，获取响应的表单数据
   * @param form 表单名
   * @param hasProject 是否跟随项目
   * @returns {boolean} 没有草稿返回false，有草稿则返回草稿数据
   */
  getDraft(form, hasProject) {
    let projectId = store.state.projectMsg.pro_id;
    projectId = projectId ? projectId.toString() : "";
    let stageId = store.state.projectMsg.projectMsg.currentImplementStageId;
    stageId = stageId ? stageId.toString() : "";
    var title = "draft" + form + store.state.loginObject.userId;
    if (hasProject) {
      title += projectId + stageId;
    }
    // 默认没有草稿数据
    var data = localStorage.getItem(title);
    // 1.尚未保存草稿
    if (!data) {
      return false;
    }
    // 2.判断缓存的数据是否为空
    let hasDraft = false;
    var dataObj = JSON.parse(data).data;
    // 基础属性不需要判断是否为空
    for (let item in dataObj) {
      if (dataObj.hasOwnProperty(item)) {
        // 判断空数组或空对象
        let p = JSON.stringify(dataObj[item]);
        if (dataObj[item] && !(p === "[]" || p === "{}")) {
          hasDraft = true;
          break;
        }
      }
    }
    return hasDraft ? dataObj : false;
  },
  /**
   * 移除草稿数据：根据表单名，清空该条草稿数据
   * @param form 表单名
   * @param hasProject 是否跟随项目
   */
  removeDraft(form, hasProject) {
    var title = "draft" + form + store.state.loginObject.userId;
    if (hasProject) {
      title +=
        store.state.projectMsg.pro_id.toString() +
        store.state.projectMsg.projectMsg.currentImplementStageId.toString();
    }
    localStorage.removeItem(title);
  },
  /**
   * 清理缓存：根据缓存时间判断，缓存超过30天，自动清除
   */
  clearDraft() {
    // 遍历所有本地存储记录
    for (let item in window.localStorage) {
      // 处理已 ‘draft’开头的草稿数据
      if (
        item &&
        window.localStorage.hasOwnProperty(item) &&
        /^draft/.test(item)
      ) {
        let dataObj = JSON.parse(localStorage.getItem(item));
        // 缓存超过30天，清理该条记录
        if (new Date().getTime() - dataObj.time > 1000 * 60 * 60 * 24 * 30) {
          localStorage.removeItem(item);
        }
      }
    }
  },
  /**
   * 根据指定字段排序
   * @param arr 要排序的集合
   * @param key 排序指定的字段
   */
  sortBy(arr, key) {
    arr.sort((a, b) => {
      return a[key] - b[key];
    });
  },
  /**
   * 数组深度拷贝
   * @param arr 待克隆的数组
   * @returns 克隆后返回的新数组
   */
  cloneDeepArray(arr) {
    // 数组深度拷贝
    // 异常参数处理
    if (!arr || !arr.length) {
      return [];
    }
    return arr.map(e => {
      if (typeof e === "object") {
        return Object.assign({}, e);
      } else {
        return e;
      }
    });
  },
  /**
   * object深克隆
   * @param obj
   * @returns {*}
   */
  copyObj(obj) {
    if (!obj) return;
    let str = {};
    let newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== "object") {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj); // 序列化对象
      newobj = JSON.parse(str); // 还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === "object" ? this.cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },

  /**
   * 异步验证项目权限
   * @param projectId 项目id
   * @param permissionCode 待验证的权限编码
   * @returns {Promise<*>} 异步验证结果。true有权限，否则无权限
   */
  async checkSystemPermissionAsync(permissionCode) {
    var obj = {
      token: sessionStorage.getItem("userToken"),
      userId: sessionStorage.getItem("userId"),
      projectId: ""
    };
    return await post("/sys/getUserPerm", obj).then(
      response => {
        if (response.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!response.data.length) {
          return;
        }
        // 判断是否有要验证的项目权限
        let idx = response.data.findIndex(v => v === permissionCode);
        return idx > -1;
      },
      err => {
        Message.error(err.message || "网络异常，请刷新重试");
      }
    );
  },

  /**
   * 异步验证项目权限
   * @param projectId 项目id
   * @param permissionCode 待验证的权限编码
   * @returns {Promise<*>} 异步验证结果。true有权限，否则无权限
   */
  async checkProjectPermissionAsync(projectId, permissionCode) {
    var obj = {
      token: sessionStorage.getItem("userToken"),
      userId: sessionStorage.getItem("userId"),
      projectId: projectId,
      data: {
        projectId: projectId
      }
    };
    return await post("/info/project/getProjectPerm", obj).then(
      response => {
        if (response.code !== code.codeNum.SUCCESS) {
          // Message.error(response.msg)
          return;
        } else if (!response.data.length) {
          // Message.error('无当前项目权限')
          return;
        }
        // 判断是否有要验证的项目权限
        let idx = response.data.findIndex(v => v === permissionCode);
        return idx > -1;
      },
      err => {
        Message.error(err.message || "网络异常，请刷新重试");
      }
    );
  },

  /**
   * 模块权限判断: 根据模块编码判断是否有模块权限
   * @param m 模块编码
   * @returns {boolean} true：有模块权限；false：无权限
   */
  m(m) {
    // console.log('m')
    let modulePerm = store.state.modulePerm;
    if (!modulePerm || !modulePerm.length) return false;
    let idx = modulePerm.indexOf(m);
    // console.log(m,'---',idx)
    return idx > -1;
  },
  /**
   * 保存项目
   * @param id 项目id
   */
  saveProjectId(id) {
    sessionStorage.setItem("project_id", JSON.stringify(id));
    var dataObj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      projectId: id,
      data: {
        projectId: id,
        userId: JSON.parse(sessionStorage.getItem("userId"))
      }
    };
    post("/info/project/saveProjectUserRecord", dataObj).then(
      res => {
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        }
        this.getProPermissionFn(id);
        this.getSysPermissionFn();
      },
      err => {}
    );
  },

  /**
   * 获取项目权限: 根据项目id获取项目权限
   * @param id 项目id
   */
  getProPermissionFn(id) {
    if (id == null && id == undefined) {
      id = 0;
    }
    var proObj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      projectId: id,
      data: {
        projectId: id
      }
    };

    post("/info/project/getProjectPerm", proObj).then(
      res => {
        let data = [];
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!res.data.length) {
          return;
        }
        data = res.data;
        // console.log('项目权限', data)
        store.commit("setProjectPerm", data);
      },
      err => {}
    );
  },

  /**
   * 获取系统权限
   */
  getSysPermissionFn() {
    var typeObj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      projectId: ""
    };

    post("/sys/getUserPerm", typeObj).then(
      res => {
        let data = [];
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!res.data.length) {
          return;
        }
        data = res.data;
        // console.log('系统权限', res)
        store.commit("setSystemPerm", data);
      },
      err => {}
    );
  },

  /**
   * 获取模块权限
   */
  getModule() {
    this.getModulePromise().then(res => {
      store.commit("setModule", res);
    });
  },
  /**
   * 获取系统权限，返回promise，axios.all中使用
   * @returns {*} promise
   */
  getUserPermPromise() {
    var typeObj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      projectId: ""
    };
    return post("/sys/getUserPerm", typeObj).then(
      res => {
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!res.data.length) {
          return;
        }
        return res.data;
      },
      err => {
        return false;
      }
    );
  },
  /**
   * 获取项目权限，返回promise，axios.all中使用
   * @param projectId 项目id : 可选参数，如果有则用，没有则默认当前项目管理中的项目id
   * @returns {*}
   */
  getProjectPermPromise(projectId) {
    var proObj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      projectId: projectId || store.state.projectMsg.pro_id,
      data: {
        projectId: projectId || store.state.projectMsg.pro_id
      }
    };

    return post("/info/project/getProjectPerm", proObj).then(
      res => {
        // console.log(55556, res)
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!res.data.length) {
          return;
        }
        // console.log(5555, res)
        return res.data;
      },
      err => {
        return false;
      }
    );
  },
  /**
   * 获取模块，返回promise，axios.all中使用
   * @returns {*}
   */
  getModulePromise() {
    // 批量查询机构是否存在 传数组

    return post("/sys/getsysMoudel").then(
      res => {
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (!res.data.length) {
          return;
        }
        return res.data;
      },
      err => {
        return false;
      }
    );
  },
  /**
   * 获取项目、系统权限，返回promise。导航守卫判断权限使用
   * @returns {Promise<any[] | boolean>}
   */
  async checkAllPerm() {
    return await axios
      .all([
        this.getUserPermPromise(),
        this.getProjectPermPromise(),
        this.getModulePromise()
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          return [res1, res2, res3];
        })
      )
      .catch(() => {
        return false;
      });
  },

  checkProjectPermissionAjax(projectId, permissionCode) {
    let result = { data: false, msg: "当前无权限" };
    let token = sessionStorage.getItem("userToken").replace(/"/g, "");
    var params = {
      token: token,
      userId: sessionStorage.getItem("userId"),
      projectId: projectId,
      data: {
        projectId: projectId
      }
    };
    $.ajax({
      url: window.allUrl + "/info/project/getProjectPerm",
      type: "POST",
      async: false,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      success: response => {
        if (response.code !== code.codeNum.SUCCESS) {
          result = { data: false, msg: response.msg };
          return;
        } else if (!response.data.length) {
          result = { data: false, msg: "当前无权限" };
          return;
        }
        // 判断是否有要验证的项目权限
        let idx = response.data.findIndex(v => v === permissionCode);
        result =
          idx > -1
            ? { data: true, msg: "" }
            : { data: false, msg: "当前无权限" };
      },
      error: function(e) {
        result = { data: false, msg: "系统异常，请刷新重试" };
      }
    });
    return result;
  },

  checkSystemtPermissionAjax(permissionCode) {
    let result = { data: false, msg: "当前无权限" };
    let token = sessionStorage.getItem("userToken").replace(/"/g, "");
    var params = {
      token: token,
      userId: sessionStorage.getItem("userId"),
      projectId: "",
      data: {}
    };
    $.ajax({
      url: window.allUrl + "/sys/getUserPerm",
      type: "POST",
      async: false,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      success: response => {
        if (response.code !== code.codeNum.SUCCESS) {
          result = { data: false, msg: response.msg };
          return;
        } else if (!response.data.length) {
          result = { data: false, msg: "当前无权限" };
          return;
        }
        // 判断是否有要验证的项目权限
        let idx = response.data.findIndex(v => v === permissionCode);
        result =
          idx > -1
            ? { data: true, msg: "" }
            : { data: false, msg: "当前无权限" };
      },
      error: function(e) {
        result = { data: false, msg: "系统异常，请刷新重试" };
      }
    });
    return result;
  },

  /**
   * @desc 根据项目ID获取项目信息
   * @param projectId 要查询的项目id
   */
  saveProjectmsg(projectId) {
    console.log("jinlail");
    var obj = {
      data: {
        id: projectId
      }
    };
    return post("/info/project/getProjectInfo", obj)
      .then(response => {
        console.log("查到项目信息了");
        if (response.code !== code.codeNum.SUCCESS) return;
        store.commit("projectMsg", response.data);
      })
      .catch(error => {
        // console.log(response.msg);
      });
  },

  /**
   * @desc 审批流：将扁平数据组件成树形数据
   * @param list 需要组件的数据
   */
  plainToTree(list) {
    let copyedObj = JSON.parse(JSON.stringify(list)); //深拷贝源数据
    return copyedObj.filter(parent => {
      let findChildren = copyedObj.filter(child => {
        return parent.id === child.parentId;
      });
      findChildren.length > 0
        ? (parent.children = findChildren)
        : (parent.children = []);
      return parent.parentId === -1; //返回顶层，依据实际情况判断这里的返回值
    });
  },
  /**
   * 验证邮箱格式
   * @param str 待验证的邮箱
   * @returns {boolean} true：验证通过；false：验证失败
   */
  testEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
  },
  /**
   * 验证邮箱格式
   * @param str 待验证的邮箱
   * @returns {boolean} true：验证通过；false：验证失败
   */
  testFax(str) {
    var reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    return reg.test(str);
  },
  /**
   * 获取浏览器类型
   * @returns {null}
   */
  checkBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    let browserType = null;
    let browserVersion = null;
    if (ua.match(/edge\/([\d.]+)/)) {
      browserType = "Edge";
    } else if (ua.match(/lbbrowser/) != null) {
      browserType = "猎豹";
    } else if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
      browserType = "IE";
      browserVersion =
        ua.match(/msie ([\d.]+)/) != null
          ? ua.match(/msie ([\d.]+)/)[1]
          : ua.match(/rv:([\d.]+)/)[1];
    } else if (ua.match(/firefox/) != null) {
      browserType = "火狐";
    } else if (ua.match(/ubrowser/) != null) {
      browserType = "UC";
    } else if (ua.match(/opera/) != null) {
      browserType = "欧朋";
    } else if (ua.match(/bidubrowser/) != null) {
      browserType = "百度";
    } else if (ua.match(/metasr/) != null) {
      browserType = "搜狗";
    } else if (
      ua.match(/tencenttraveler/) != null ||
      ua.match(/qqbrowse/) != null
    ) {
      browserType = "QQ";
    } else if (ua.match(/maxthon/) != null) {
      browserType = "遨游";
    } else if (ua.match(/lbbrowser/) != null) {
      browserType = "猎豹";
    } else if (ua.match(/chrome/) != null) {
      let mimeTypes = navigator.mimeTypes;
      let is360 = false;
      for (var mt in mimeTypes) {
        if (mimeTypes[mt].type == "application/vnd.chromium.remoting-viewer") {
          is360 = true;
        }
      }
      is360 && (browserType = "360");
    } else if (ua.match(/safari/) != null) {
      browserType = "Safari";
    }
    // console.log('browser',browserType)
    return browserType;
  },

  /**
   * 获取切换到的项目是否可以看到项目聊天菜单
   * @param number 项目id
   * @returns
   */
  queryProChatNum(proId = store.state.projectMsg.pro_id) {
    let obj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      data: {
        projectId: proId || store.state.projectMsg.pro_id
      }
    };
    post("/info/projectChat/queryProjectChatNum", obj)
      .then(res => {
        if (code.codeNum.SUCCESS !== res.code) {
          return;
        }
        let showChat = false;
        showChat =
          res.data && res.data.findIndex(v => v.projectId == proId) > -1;
        store.commit("proChatIsShow", showChat);
      })
      .catch(error => {});
  },
  /**
   * 获取切换到的项目是否可以看到项目审批菜单
   * @param number 项目id
   * @returns
   */
  queryProExamNum(proId = store.state.projectMsg.pro_id) {
    // console.log('请求接口')
    let obj = {
      token: JSON.parse(sessionStorage.getItem("userToken")),
      userId: JSON.parse(sessionStorage.getItem("userId")),
      data: {
        id: proId || store.state.projectMsg.pro_id
      }
    };
    post("/info/project/getProjectById", obj)
      .then(res => {
        // console.log(res)
        if (code.codeNum.SUCCESS !== res.code) {
          return;
        }
        let showExam = false;
        showExam = res.data && res.data.isHide != 1;
        store.commit("projectHide", showExam);
        store.commit("projectMsg", res.data);
      })
      .catch(error => {});
  },
  /**
   * 获取文件后缀名
   * @param fileName 完整的文件名称
   * @returns {*} 文件后缀名
   */
  iconFilter(fileName) {
    let fileIcon = "";
    var hz_name = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toLowerCase();
    if (hz_name == "doc" || hz_name == "docx" || hz_name == "rtf") {
      fileIcon = require("@/pages/common/fileIcon/DocType.png");
    } else if (hz_name == "xls" || hz_name == "xlsx" || hz_name == "excel") {
      fileIcon = require("@/pages/common/fileIcon/XlsType.png");
    } else if (
      hz_name == "ppt" ||
      hz_name == "pptx" ||
      hz_name == "pps" ||
      hz_name == "ppsx" ||
      hz_name == "ppsm"
    ) {
      fileIcon = require("@/pages/common/fileIcon/PptType.png");
    } else if (
      hz_name == "jpg" ||
      hz_name == "jpeg" ||
      hz_name == "gif" ||
      hz_name == "bmp" ||
      hz_name == "png"
    ) {
      fileIcon = require("@/pages/common/fileIcon/ImgType.png");
    } else if (
      hz_name == "wmv" ||
      hz_name == "avi" ||
      hz_name == "dat" ||
      hz_name == "asf" ||
      hz_name == "rm" ||
      hz_name == "rmvb" ||
      hz_name == "mpg"
    ) {
      fileIcon = require("@/pages/common/fileIcon/VideoType.png");
    } else if (
      hz_name == "mpeg" ||
      hz_name == "mkv" ||
      hz_name == "dvix" ||
      hz_name == "dv" ||
      hz_name == "flv" ||
      hz_name == "mov" ||
      hz_name == "mp4" ||
      hz_name == "qt" ||
      hz_name == "smil" ||
      hz_name == "swf" ||
      hz_name == "wmv" ||
      hz_name == "3gp"
    ) {
      fileIcon = require("@/pages/common/fileIcon/VideoType.png");
    } else if (
      hz_name == "mp3" ||
      hz_name == "wav" ||
      hz_name == "wma" ||
      hz_name == "mid"
    ) {
      fileIcon = require("@/pages/common/fileIcon/MusicType.png");
    } else if (hz_name == "pdf") {
      fileIcon = require("@/pages/common/fileIcon/PdfType.png");
    } else if (hz_name == "indd") {
      fileIcon = require("@/pages/common/fileIcon/indd.png");
    } else if (hz_name == "ai") {
      fileIcon = require("@/pages/common/fileIcon/ai.png");
    } else if (hz_name == "psd") {
      fileIcon = require("@/pages/common/fileIcon/ps.png");
    } else if (hz_name == "tif") {
      fileIcon = require("@/pages/common/fileIcon/tiff.png");
    } else if (hz_name == "zip" || hz_name == "rar") {
      fileIcon = require("@/pages/common/fileIcon/RarType.png");
    } else {
      fileIcon = require("@/pages/common/fileIcon/other.png");
    }

    return fileIcon;
  },
  tableRowClick(row, event, tableData) {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].index = i;
    }
    // 取消之前的选中状态
    tableData.forEach(v => {
      v.selected = false;
    });
    // console.log(row.index)
    // 当前行设置为选中
    tableData[row.index].selected = true;
    return tableData;
  },
  tableRowClassName(rowIndex, row) {
    row.index = rowIndex;
    let rest = "";
    if (row.selected) {
      // 选中的行
      rest = "table-row-selected";
    } else if ((rowIndex + 1) % 2 === 0) {
      // 未选中的偶数行（注意index下标从0开始的）
      rest = "table-row-striped";
    }
    return rest;
  },

  handleSelect(arg, list) {
    console.log(12, arg);
    let type = arg[0].type;
    let data = arg[0].data;
    let arr = [];
    let exist = [];
    data.forEach(v => {
      if (type !== 1 && list.findIndex(i => i.docId === v.docId) > -1) {
        // 过滤项目文档和底稿选择中重复选择的文件
        exist.push(v.docName);
        return;
      }
      v.addSource = type;
      v.rfsId = type === 1 ? v.fileData.rfsId : v.rfsId;
      v.checked = false; //项目文档发起文件审批时全选功能需要加上这个默认属性
      arr.push(v);
    });
    if (exist.length) {
      Message.warning(exist.join(",") + "已存在");
    }

    list.push(...arr);
  },
  handleUploadFilePreview(item, projectId) {
    console.log("utils", item);
    item.docName = item.docName ? item.docName : item.fileName; // 文件名称可能叫fileName
    item.docId = item.docId ? item.docId : item.fileId; // 文件id可能叫fileName
    let logObj = typeof projectId !== "object" ? { projectId } : projectId;
    var previewData = {
      docId: item.docId,
      rfsId: item.rfsId,
      docName: item.docName,
      photoType: item.docName.substring(item.docName.lastIndexOf(".") + 1),
      ...logObj
    };
    store.commit("previewAllFn", previewData);
  },
  handleDeleteSelected(list, item) {
    let idx = "";
    idx = list.findIndex(
      v => v.addSource === item.addSource && v.docId === item.docId
    );
    list.splice(idx, 1);
  },
  handleDownLoadSelected(item) {
    let download_arr = [];
    if (store.state.isPC) {
      store.commit("pcOtherDownload", {
        docId: item.docId,
        docName: item.docName
      });
    } else {
      download_arr.push({
        name: item.docName,
        id: item.docId
      });
    }
    store.commit("download", download_arr);
  },

  // 处理文件单位展示
  handleFileSize(limit) {
    if (limit == null) {
      return;
    } else {
      var size = "";
      if (limit < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
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
  },
  /**
   * @desc 函数节流
   * @param func 函数
   * @param wait 延迟执行毫秒数
   */
  throttle(func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  },
  /**
   * @desc 函数防抖
   * @param func 函数
   * @param wait 延迟执行毫秒数
   * @param immediate true 表立即执行，false 表非立即执行
   */
  debounce(func, wait, immediate) {
    let timeout;

    return function() {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
      }
    };
  },

  /**
   * @desc 按指定的字段删除json数组中符合条件的选项
   * @param arr 要删除的目标数组
   * @param key 依靠的字段名
   * @param val 值
   * @returns {*|Array|*} 删除后的新数组
   */
  removeByKey(arr, key, val) {
    let newArr = [];
    arr.forEach(v => {
      v[key] !== val && newArr.push(v);
    });
    return newArr;
  },

  /**
   * 处理IE浏览器中时间选择器光标穿透问题
   * @param val 时间选择器实例
   */
  handleTimeFocus(val) {
    val.blur();
  },

  /**
   * 根据指定字段去重
   * @param arr 要去重的数组
   * @param field 指定的字段
   * @param isUpdate 是否需要更新（有重复数据时，用后面数据替换之前数据）
   *
   */
  uniqBy(arr, field, isUpdate) {
    const cb = o => o[field];

    return [
      ...arr
        .reduce((map, item) => {
          const key = item === null || item === undefined ? item : cb(item);

          if (isUpdate) {
            // 更新已存在的数据
            map.has(key) && map.delete(key);
            map.set(key, item);
          } else {
            !map.has(key) && map.set(key, item);
          }

          return map;
        }, new Map())
        .values()
    ];
  },

  initRoleData() {
    //  初始化角色配置数据
    let token = sessionStorage.getItem("userToken").replace(/"/g, "");
    var data = {
      token: token,
      userId: sessionStorage.getItem("userId")
    };
    return post("/sys/findModuleByUser", data).then(
      res => {
        if (res.code !== code.codeNum.SUCCESS) {
          return;
        } else if (res.data == "") {
          return;
        }
        let initObj = JSON.parse(res.data[0].module);
        return initObj;
      },
      err => {
        return false;
      }
    );
  },
  /**
   * 角色配置数据: 根据模块编码判断当前用户是否有模块权限
   * @param roleM 角色模块编码
   * @returns {boolean} true：有模块权限；false：无权限
   */
  roleM(roleM) {
    let roleModulePerm = store.state.roleModulePerm;
    if (!roleModulePerm) return false;
    return roleModulePerm[roleM];
  },
  // 保存预览记录
  savePreviewHistory() {
    console.log("123999", store.state.previewData);
    let previewData = store.state.previewData;
    let sourceName = store.state.previewData.sourceName;
    let projectName =
      previewData.projectName || store.state.projectMsg.projectMsg.name;

    if (previewData.sourceType == "manuscriptmanage") {
      //底稿需要传文件id
      var data = {
        token: store.state.loginObject.userToken,
        userId: store.state.loginObject.userId,
        sourceName: sourceName, //页面位置，记录日志用
        projectName: projectName, //项目名称，记录日志用
        paperFlag: true,
        data: {
          docId: previewData.docId,
          id: previewData.id
        }
      };
    } else {
      var data = {
        token: store.state.loginObject.userToken,
        userId: store.state.loginObject.userId,
        sourceName: sourceName, //页面位置，记录日志用
        projectName: projectName, //项目名称，记录日志用
        data: {
          docId: previewData.docId
        }
      };
    }
    post("/doc/paper/previewDocLogRecord", data)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  },
  /**
   * 防抖函数
   * @param {function} fn 事件处理函数
   * @param {number} [delay=20] 延迟时间
   * @param {boolean} [isImmediate=false] 是否立刻执行
   * @param {object} [context=this] 上下文对象
   * @returns {Function} 事件处理函数
   */
  debounce1(fn, delay = 20, isImmediate = false, context = this) {
    console.log(12)
    // 使用闭包，保存执行状态，控制函数调用顺序
    let timer;

    return function() {
      const _args = [].slice.call(arguments)

      clearTimeout(timer);

      const _fn = function() {
        timer = null;
        if (!isImmediate) fn.apply(context, _args);
      };

      // 是否滚动时立刻执行
      const callNow = !timer && isImmediate;

      timer = setTimeout(_fn, delay);

      if (callNow) fn.apply(context, _args);
    }
  }


};

/**
 * 返回值处理
 * 所有"null"和"undefined"处理为""，其他的返回
 * @param val 要处理的值
 * @returns val || ""
 */
function handleValue(val) {
  if (val == null || val == undefined) {
    return ""
  } else {
    return val
  }
}
export  {
  handleValue
}
