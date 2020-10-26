// 判断系统权限设置
var  flag = true;
var url = window.allUrl
 function sysPermissionFn(systemPerm) {
        // systemPerm = JSON.parse(sessionStorage.getItem("systemPerm"))
     setTimeout(function(){
         if(systemPerm == null){
             return;
         }
         if (systemPerm.length > 0) {
             for(var i=0;i<systemPerm.length;i++){
                 for(var j=0;j<permissionSysEnum.length;j++){
                     if(systemPerm[i] == permissionSysEnum[j]){
                         $("#app").find("#"+ systemPerm[i]).show();
                     }
                 }
             }
         }
         if (systemPerm.length > 0) {
             for(var i=0;i<systemPerm.length;i++){
                 for(var j=0;j<classSysEnum.length;j++){
                     if(systemPerm[i] == classSysEnum[j]){
                         $("#app").find("."+ systemPerm[i]).show();
                     }
                 }
             }
         }
        if($(".back_list_rout").is(":hidden")){
            $(".aaa").show();
            $(".bbb").hide();
        }else{
            $(".aaa").hide();
            $(".bbb").show();
        }
         var url = window.location.href;
         url = url.split('#/');
         if(url[1] == "myapproval"){
             // $(".el-menu-item").removeClass("is-active");
             // $(".el-menu-item").eq(0).addClass("is-active");
         };
     },70);
}

//判断项目权限
function projectPermissionFn(projectPerm) {
    $("#app .menu_btn").hide();
    var pro_id = JSON.parse(sessionStorage.getItem("project_id"));
        if(pro_id != 0 && pro_id != null && pro_id != undefined){
            if(projectPerm == null){
                return;
            }
            if (projectPerm.length > 0) {
                for(var i=0;i<projectPerm.length;i++){
                    for(var j=0;j<permissionProEnum.length;j++){
                        if(projectPerm[i] == permissionProEnum[j]){
                            $("#app").find("#"+ projectPerm[i]).show();
                        }
                    }
                }
            }
            if (projectPerm.length > 0) {
                for(var i=0;i<projectPerm.length;i++){
                    for(var j=0;j<classProEnum.length;j++){
                        if(projectPerm[i] == classProEnum[j]){
                            $("#app").find("."+ projectPerm[i]).show();
                        }
                    }
                }
            }
        }else{
            $(".menu_btn").hide();
        }

}

//获取系统权限
function getSysPermissionFn(id){
    if(id== null && id == undefined){
        id = 0;
    }
    var typeObj ={
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        "projectId":id
    }
    $.ajax({
        url:  url+'/sys/getUserPerm',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(typeObj),
        success: function(res){
            if(res.code == 0){
                sysPermissionFn(res.data);
                sessionStorage.setItem("systemPerm", JSON.stringify(res.data));
            }else{
                console.log(res.msg);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//获取项目权限

function getProPermissionFn(id){
    if(id== null && id == undefined){
        id = 0;
    }
    var proObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        "projectId": id,
        "data":{
            "projectId":id
        }
    }
    $.ajax({
        url:  url+'/info/project/getProjectPerm',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(proObj),
        success: function(res){
            if(res.code == 0){
                projectPermissionFn(res.data);
                sessionStorage.setItem("projectPerm", JSON.stringify(res.data));
            }else{
                console.log(res.msg);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//保留用户上次操作的项目id
function saveProjectId(id){
    sessionStorage.setItem("project_id", JSON.stringify(id));
    var dataObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        'projectId':id,
        'data': {
            "projectId":id,
            "userId":JSON.parse(sessionStorage.getItem("userId"))
        }
    };
    $.ajax({
        url:  url+'/info/project/saveProjectUserRecord',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        success: function(res){
            if(res.code == 0){
                console.log("成功");
            }else{
                console.log(res.msg);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}
//隐藏项目内的列表
function  hideProject(){
    $("#app").find(".project_task").hide();
    $("#app").find(".project_user").hide();
    $("#app").find(".project_role").hide();
    $("#app").find(".project_meet").hide();
    $("#app").find(".project_file").hide();
    $("#app").find(".projet_log").hide();
    flag =false;
}

function refresh() {
    if(sessionStorage.getItem("login")){
            var url = window.location.href;
            var tet = url.split('#');
            tet = tet[1];
            if (tet != "login" && tet != "" && tet != "/") {
                mqReceiveJs.initMqConfig();
                var id = JSON.parse(sessionStorage.getItem("project_id"));
                getSysPermissionFn(id);
                getProPermissionFn(id);
            } else if (tet == "/login" || tet == "/" || tet == "") {
                var url1 = window.location.href;
                url1 = url1.split('#');
                if(turnUrl != ""){
                    url1[1] = "/projectlist";
                }else if(sessionStorage.getItem("approval_pend") == "1"){
                    url1[1] = "/myapproval";
                }else{
                    url1[1] = "/maindesk";
                }
                window.location.href = url1.join("#");
            } else {
                turnUrl = "";
                sessionStorage.removeItem("approval_pend")
                for (var i in onloadRouter) {
                    var ii = "/" + i;
                    if (tet == ii) {
                        if ($("#" + onloadRouter[i]).is(":hidden")) {
                            window.location.href = url;
                        }
                    }
                }
            }
    }else{
        // var url = window.location.href;
        // url = url.split('/');
        // url[url.length - 1] ="login";
        // window.location.href = url.join("/");
        // window.location.href = "/";
    }
}

//页面刷新
function bind_uri_refresh() {
    // window.addEventListener('load', refresh.bind(this), false);
    // window.addEventListener('hashchange', refresh.bind(this), false);
}

// bind_uri_refresh();



//禁止浏览器后退
// $(function() {
//     if (window.history && window.history.pushState) {
//         $(window).on('popstate', function () {
//             window.history.pushState('forward', null, '#');
//             window.history.forward(1);
//         });
//     }
//     window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
//     window.history.forward(1);
// })



//右键权限判断
//右键项目权限
function rightProPermissionFn(id,cont){  //项目id  权限字段
    var proObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        "projectId": id,
        "data":{
            "projectId":id
        }
    }
    var hasPower = false;
    $.ajax({
        url:  url+'/info/project/getProjectPerm',
        type: 'POST',
        async: false,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(proObj),
        success: function(res){
            if(res.code == 0){
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i] == cont){
                        hasPower = true;
                    }
                }
            }else{
                hasPower = false;
            }
        },
        error: function(e) {
            hasPower = false;
        }
    });
    return hasPower;
}
//右键系统权限
function rightSysPermissionFn(id,cont){  //项目id  权限字段
    var proObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        "projectId": id,
    }
    var hasPower;
    $.ajax({
        url:  url+'/sys/getUserPerm',
        type: 'POST',
        async: false,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(proObj),
        success: function(res){
            if(res.code == 0){
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i] == cont){
                        hasPower = true;
                    }
                }
            }else{
                hasPower = true;
            }
        },
        error: function(e) {
            hasPower = false;
        }

    });
    return hasPower;
}


// window.onresize = function(){
//     window.location.reload();
// }


//ie浏览器版本验证
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return false;
        } else if (fIEVersion == 8) {
            return false;
        } else if (fIEVersion == 9) {
            return false;
        } else if (fIEVersion == 10) {
            return true;
        } else {
            return false;//IE版本<=7
        }
    } else if (isEdge) {
        return true;//edge
    } else if (isIE11) {
        return true; //IE11
    } else {
        return true;//不是ie浏览器
    }
}








