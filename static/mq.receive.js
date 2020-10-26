/**
 * 13.IE和CHROME兼容性显示问题
在IE中用message.text可以成功显示收到信息；在CHROME中用message.textContent可以成功显示收到信息，
没有一种方式可以兼容多浏览器？？
原理：
1.ActiveMQ的Ajax插件自动把消息内容解释成了DOM格式，也就是说Listener回调函数中的message参数是DOM结构的，
更有意思的是如果像这样一个消息：“<message>aaa</message><message>bbb</message>”，那么Listener回调函数会执行两次，
因为里面包含了两个Element，如果是这样的消息：“<message>aaa</message>asdfasdfaksd”，
 Listener回调函数也会执行两次，““<message>aaa</message>”是Element，而“asdfasdfaksd”是Text。
2.而用java代码TextMessage message = session.createTextMessage("MSG sent from java 2");创建的消息，就是字符串文本形式。
 * */
/************activemq监听 begin************/

// import MessagingMsg from '@/pages/common/js/mqttws31.js';
// import msgType from '@/pages/common/js/mq.params.js';
//**mq连接服务唯一ID
//**mq连接服务唯一ID
        var clientid = (new Date()).getTime().toString();

        var destination = null;
//启动定时连接mq的标识
        var reconnectionMQ = null;

//mq连接标识
        var MqttClient = null;

        var  flag = true;

        // var mqurl = "http://shrd.f3322.org:1066/activemq";
        var mqurl = mqAllurl;
        var isWss = mqurl.indexOf('https')>-1 || mqurl.indexOf('wss')>-1

        var mqReceiveJs = {
            initMqConfig: function () {
                 if(flag){
                     try {
                         destination = sessionStorage.getItem("userId")//$.cookie('rd_dms_user_id');
                         if (mqurl.indexOf("activemq") != -1) {
                             mq_url = parseUrl(mqurl);

                             // 如果返回地址中没有端口，则设置默认端口
                             if (mq_url.port == ""){
                                 if (mq_url.protocol == "http") {
                                     mq_url.port = "80";
                                 } else if (mq_url.protocol == "https" || mq_url.protocol == "wss") {
                                     mq_url.port = "443";
                                 }
                             }
                             MqttClient = new Paho.MQTT.Client(mq_url.hostname, parseInt(mq_url.port), "/activemq", clientid);
                         }else {
                             var regex = /ws:\/\/(\S*):/;
                             var mqHost = regex.exec(mqurl)[1];
                             regex = eval("/" + mqHost + ":(\\S*)" + "/");
                             var mqPort = regex.exec(mqurl)[1];
                             MqttClient = new Paho.MQTT.Client(mqHost, parseInt(mqPort), clientid);
                         }
                         MqttClient.onMessageArrived = function (e) {
                             console.log("收到消息:"+e.payloadString);
                             //消息的处理
                             getMessageFromMq(e.payloadString);
                         };


                         MqttClient.onConnectionLost = function (responseObject) {
                             if (responseObject.errorCode !== 0) {
                                 console.log("监听连接失败，正在重试 !!!" + new Date().getTime());
                             }
                             connectionMQ();
                         };

                         connectionClient();

                     } catch (e) {
                         console.log(e.message);
                     }
                 }
            }
        };

        function connectionMQ() {
            // destination = main_loginUserId;
            destination = sessionStorage.getItem("userId")
            if (reconnectionMQ == null) {
                reconnectionMQ = window.setInterval(function () {
                    connectionClient();
                }, 6000);
            }
        }

        function connectionClient() {
            var connectOptions = {
                timeout: 5,
                keepAliveInterval: 5,
                useSSL: isWss, // 是否启用wss协议
                onSuccess: function () {
                    var subscribeOptions = {
                        timeout: 5,
                        onFailure: function () {
                            console.log("订阅失败！！！");
                        }
                    };
                    MqttClient.subscribe(destination, subscribeOptions);
                    window.clearInterval(reconnectionMQ);
                    reconnectionMQ = null;
                    sessionStorage.isConnected=true
                    console.log("连接成功!!!" + new Date().getTime());
                },
                onFailure: function () {
                  sessionStorage.isConnected=false
                    console.log("连接失败!!!" + new Date().getTime());
                    connectionMQ();
                }
            };
            MqttClient.connect(connectOptions);
        }

        /************activemq监听 end************/

//处理消息方法
        function getMessageFromMq(receiveMsg) {
            try {
                receiveMsg = receiveMsg.replace(/@and@/g, "&");
                receiveMsg = receiveMsg.replace(/&lt;/g, "<");
                receiveMsg = receiveMsg.replace(/&gt;/g, ">");
                var msgJson = $.parseJSON(receiveMsg);
                var mq_module = msgJson.type;
                // console.log(555, msg_type.VERSION_MSG, mq_module)
                // 通知消息
                if(msg_type.NOTICE_MSG == mq_module){
                     setTimeout(function () {
                        receiveMsgFn(receiveMsg);
                     }, 10);
                   return;
                }
                // //聊天消息
                if(msg_type.CHAT_MAG == mq_module){
                    setTimeout(function () {
                        // receiveMsgFn(receiveMsg);
                        var msg = JSON.parse(receiveMsg);
                        let chatMessage = msg.content.data;
                        window.msg.$store.state.allFloatingObj.iconStyle = true;
                        window.msg.$store.commit('chatMessageFn', chatMessage)
                     }, 10);
                   return;
                }
                //项目消息
                if(msg_type.PROJECT_MSG == mq_module){
                    setTimeout(function () {
                        window.msg.$store.commit('setMessageIcon',true)
                        receiveMsgFn(receiveMsg);
                     }, 10);
                   return;
                }
                //审批消息
                if(msg_type.APPROVE_MSG == mq_module){
                    setTimeout(function () {
                        window.msg.$store.commit('setMessageIcon',true)
                        receiveMsgFn(receiveMsg);
                     }, 10);
                   return;
                }
                if(msg_type.VERSION_MSG == mq_module){
                    setTimeout(function () {
                        // console.log('msg', msgJson)
                        window.msg.$store.commit('setUpdateVersion',msgJson.content.data)
                        // 页面展示--不需要
                        // receiveMsgFn(receiveMsg);
                     }, 10);
                   return;

                }
                //普通消息
                // if(chat_msg.PROJECT_MSG == mq_module){
                       // setTimeout(function () {
                //            receiveMsgFn(receiveMsg);
                //      }, 10);
                //
                //    return;
                // }
                //图片
                /*if(chat_msg.IMG_CHAT == mq_module){
                        setTimeout(function () {
                            receiveMsgFn(receiveMsg);
                        }, 10);
                        return;
                    }
                    //底稿文件讨论消息
                    if(chat_msg.PAPER_FILE_MSG == mq_module){
                        setTimeout(function () {
                            receiveMsgFn(receiveMsg);
                        }, 10);

                        return;
                }
                //项目文件讨论消息
                if(chat_msg.PROJECT_FILE_MSG == mq_module){
                    setTimeout(function () {
                        receiveMsgFn(receiveMsg);
                    }, 10);
                    return;
                }*/
                //   console.log("Log_[mq.receive.js]_[getMessageFromMq]_无类型消息:"+receiveMsgFn);
            } catch (e) {
                console.log("Error_[mq.receive.js]_[getMessageFromMq]:" + e);
            }
        }
//消息提醒框样式设置
function transformFn(){
    var length = $(".app_msg_box").length;
        $(".app_msg_box").each(function(index){
            var left = index*5;
            $(this).css({
             "left": left + "px",
             "top": -left + "px",
         });
     });
        if(!length){
            $(".app_new_msg_box").hide();
        }
}
var msg_num;
 var messageDataDetail;

//查看详情
function lookDetailApp(el){
    msg_num = $(el).parent().parent().attr("num")
    $(el).parent().parent().remove();
    transformFn();
    console.log(1, msg_num)
    if(msg_num == 0){
        messageDataDetail = JSON.parse($(el).parent().parent().attr("data"));
        dateAjax(messageDataDetail)
    }else if(msg_num == 1){
        messageDataDetail = JSON.parse($(el).parent().parent().attr("data"));
        voteAjax(messageDataDetail);
    }else if(msg_num == 2){
        messageDataDetail = JSON.parse($(el).parent().parent().attr("data"));
        meetAjax(messageDataDetail);
    }else if(msg_num == 3){
        messageDataDetail = JSON.parse($(el).parent().parent().attr("data"));
        taskAjax(messageDataDetail);
    }else if(msg_num == 5){
        // urgeAjax(messageDataDetail);
        if(JSON.parse(sessionStorage.getItem("approval_pend"))){
            var url = window.location.href;
            url = url.split('#/');
            url[url.length - 1] ="myapproval";
            // 解决IE浏览器不跳转的问题
            // window.location.href = url.join("#/");
          window.msg.$router.push({path:'/myapproval'})
        }
    }
}
//关闭消息通知框
function closeHintApp(el){
     $(el).parent().parent().remove();
    transformFn();
}

//消息内容详情弹框
function boxShowFn(){
    $(".msg_men_box").show();
    if(msg_num == 0){
        $(".date_det_msg").show();
    }else if(msg_num == 1){
        $(".vote_det_msg").show();
    }else if(msg_num == 2){
        $(".meet_det_msg").show();
    }else if(msg_num == 3){
        $(".task_det_msg").show();
    }
    // else if(msg_num == 5){
    //     $(".urge_det_msg").show();
    // }
}

var length;
var num;
//页面接收消息
function receiveMsgFn(msg){
    var msg = JSON.parse(msg);
    if(msg.type ==msg_type.NOTICE_MSG) {
            if ($(".app_new_msg_box").is(":hidden")) {
                $(".app_new_msg_box").show();
            }
            var html = '<div class="app_msg_box" style="display: block">' +
                '                <div class="clearfix app_msg_head">' +
                '                    <span class="app_hint_text"><i></i></span><span class="app_hint_close color-primary-hover" onclick="closeHintApp(this)">X</span>' +
                '                </div>' +
                '                <div class="app_msg_cont">' +
                '                    <div class="app_msg_cont_first"></div>' +
                '                    <div class="app_msg_cont_two"></div>' +
                '                    <div class="app_msg_cont_three">' +
                '                        <p></p>' +
                '                        <p></p>' +
                '                    </div>' +
                '                    <div class="app_msg_cont_four"></div>' +
                '                </div>' +
                '                <div class="app_msg_foot">' +
                '                    <button onclick="closeHintApp(this)" class="app_sure app_msg_know">我知道了</button>' +
                '                    <button type="primary" onclick="lookDetailApp(this)" class="app_btn app_msg_know">查看详情</button>' +
                '                </div>' +
                '            </div>';
            $(".app_new_msg_box").append(html);
            length = $(".app_msg_box").length
            num = 1000 - length + 1;
            var left = (length) * 5
            $(".app_msg_box").eq(length - 1).css({
                "z-index": num,
                "left": left + "px",
                "top": -left + "px",
            });
            if(msg.content.notice !=notice_option.TASK_COMPLETE){
                var cont = $.parseJSON(msg.content.context);
                //日程
                if(cont.startTime != null && cont.startTime != "" && cont.startTime != undefined){
                    cont.startTime = cont.startTime.substr(0,cont.startTime.lastIndexOf(':'))
                }
                if(cont.endTime != null && cont.endTime != "" && cont.endTime != undefined){
                    cont.endTime = cont.endTime.substr(0,cont.endTime.lastIndexOf(':'))
                }
                if (msg.content.noticeType == notice_Msg.SU_NOTICE_MSG && msg.content.notice == notice_option.ADD_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "发来一个[" + cont.scheduleName + "] 日程");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",0);
                }
                if (msg.content.noticeType == notice_Msg.SU_NOTICE_MSG && msg.content.notice == notice_option.UPDATE_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "修改[" + cont.scheduleName + "] 日程");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",0);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.SU_NOTICE_MSG && msg.content.notice == notice_option.NOTICE_TIME) {
                    var str = remindType(msg.content.remindType);
                    var startTime = "";
                    if(cont.scheduleStartTime != undefined){
                        startTime = cont.scheduleStartTime;
                    }else {
                        startTime= cont.startTime;
                    }
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.scheduleName + "]日程 将在 " + str + "  开始");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + startTime  + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",0);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }

                //投票
                if (msg.content.noticeType == notice_Msg.VOTE_NOTICE_MSG && msg.content.notice == notice_option.ADD_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "发来一个[" + cont.voteName + "] 投票");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",1);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.VOTE_NOTICE_MSG && msg.content.notice == notice_option.UPDATE_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "修改[" + cont.voteName + "] 投票");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",1);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.VOTE_NOTICE_MSG && msg.content.notice == notice_option.NOTICE_TIME) {
                    var str = remindType(msg.content.remindType);
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.voteName + "]投票 将在 " + str + "结束");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",1);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }

                //会议
                if (msg.content.noticeType == notice_Msg.MEET_NOTICE_MSG && msg.content.notice == notice_option.ADD_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "发来一个[" + cont.meetingName + "] 会议");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",2);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.MEET_NOTICE_MSG && msg.content.notice == notice_option.UPDATE_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "修改一个[" + cont.meetingName + "] 会议");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",2);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.MEET_NOTICE_MSG && msg.content.notice == notice_option.NOTICE_TIME) {
                    var str = remindType(msg.content.remindType);
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.meetingName + "]会议 将在 " + str + "开始");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",2);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }

                //任务
                if (msg.content.noticeType == notice_Msg.TASK_NOTICE_MSG && msg.content.notice == notice_option.ADD_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "发来一个[" + cont.taskName + "] 任务");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",3);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.TASK_NOTICE_MSG && msg.content.notice == notice_option.UPDATE_NOTICE) {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.userName + "修改[" + cont.taskName + "] 任务");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.startTime + "</span>");
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(1).html("结束时间：" + "<span>" + cont.endTime + "</span>");
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",3);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                }
                if (msg.content.noticeType == notice_Msg.TASK_NOTICE_MSG && msg.content.notice == notice_option.NOTICE_TIME) {
                    var str = remindType(msg.content.remindType);
                    if(msg.content.remindType == 5 || msg.content.remindType == 6){
                        $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.taskName + "]任务 将在 " + str + "开始");
                        $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("开始时间：" + "<span>" + cont.taskStartTime+ "</span>");
                    }else{
                        $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.taskName + "]任务 将在 " + str + "结束");
                        $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p").eq(0).html("结束时间：" + "<span>" + cont.taskEndTime + "</span>");
                    }
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",3);
                    $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p span").addClass("app_msg_p");
                }
            }

            if (msg.content.noticeType == notice_Msg.TASK_NOTICE_MSG && msg.content.notice == notice_option.TASK_COMPLETE) {
                $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(msg.content.context);
                $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",3);
                $(".app_msg_box").eq($(".app_msg_box").length-1).attr("data",JSON.stringify(msg.content));
                $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_three p span").addClass("app_msg_p");
            }


            //催办-跳转审核页面
            if (msg.content.noticeType == notice_Msg.APPROVE_NOTICE_MSG || msg.content.noticeType == notice_Msg.APPROVE_SUBMIT_NOTICE_MSG) {
                // $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text("[" + cont.userName + "]催办 " + cont.approvalName + " " + cont.urgeText);
                // $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_first").text(cont.content);
                var el = $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_two")
                el.css({"padding-left": '10px', "padding-right":'10px', "text-align":'left'})
                el.text(cont.content);

                $(".app_msg_foot").eq(length - 1).find(".app_msg_cont_three").hide();
                $(".app_msg_box").eq($(".app_msg_box").length-1).attr("num",5);
                sessionStorage.setItem("approval_pend", 1);
            }

            if(cont != undefined){
                if (cont.msgContent != undefined && cont.msgContent != "") {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_two").text(cont.msgContent);
                }

                if (cont.address != undefined && cont.address != "") {
                    $(".app_msg_cont").eq(length - 1).find(".app_msg_cont_four").text("地址：" + cont.address);
                }
            }

        } else if (msg.type == msg_type.PROJECT_MSG) {
            if(msg.content.data.type == 5){     //移除
                var proId = msg.content.data.projectId;
                var pro_id = JSON.parse(sessionStorage.getItem("project_id"));
                if(pro_id == proId){
                    $(".all_recov_msg .totas_box").show();
                    $(".all_recov_msg .totas_box").find("span").text(msg.content.data.context);
                    setTimeout(function(){
                        $(".all_recov_msg .totas_box").hide();
                        // todo 模块化--消息
                        window.msg.$utils.saveProjectId(0)
                        // megList();
                    },2000);
                }
            }else if(msg.content.data.type == 6){     //删除
                var proId = msg.content.data.projectId;
                var pro_id = JSON.parse(sessionStorage.getItem("project_id"));
                if(pro_id == proId){
                    $(".all_recov_msg .totas_box").show();
                    $(".all_recov_msg .totas_box").find("span").text(msg.content.data.context);
                    setTimeout(function(){
                        $(".all_recov_msg .totas_box").hide();
                        // todo 模块化--消息
                        window.msg.$utils.saveProjectId(0)
                        // megList();
                    },2000);
                }
            }else if(msg.content.data.type == 7){     //终止
                var proId = msg.content.data.projectId;
                var pro_id = JSON.parse(sessionStorage.getItem("project_id"));
                if(pro_id == proId){
                    $(".all_recov_msg .totas_box").show();
                    $(".all_recov_msg .totas_box").find("span").text(msg.content.data.context);
                    setTimeout(function(){
                        $(".all_recov_msg .totas_box").hide();
                        // todo 模块化--消息
                        window.msg.$utils.saveProjectId(0)
                        // megList();
                    },2000);
                }
            }else{
                var url = window.location.href;
                url = url.split('/');
                if (url[url.length - 1] == "messagecenter") {
                    //消息中心-项目消息
                    window.recProjMsg(msg.content);
                }
            }
        } else if (msg.type == 3) {
            var url = window.location.href;
            url = url.split('/');
            if (url[url.length - 1] == "messagecenter") {
                //消息中心-审批消息
                window.approMsg(msg.content)
            }
        }
}

function megList(){
    var url = window.location.href;
    url = url.split('#');
    url[1] = "#/projectlist";
    turnUrl = "projectlist";
    window.location.href = url.join("#");
}
// 消息路径地址
var url = allUrl;
// var url = "http://192.168.6.230";
//会议详情
function meetAjax(el){
    var dataObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        'projectId':el.projectId,
        'data': {
            "id":el.relationIds
        }
    };
    var _this = this;
    $.ajax({
        url:  url+'/info/project/getMeeting',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        success: function(res){
            if(res.code != 0){
                $(".all_recov_msg .totas_box").show();
                $(".all_recov_msg .totas_box").find("span").text(res.msg);
                setTimeout(function(){
                    $(".all_recov_msg .totas_box").hide();
                },3000);
                return;
            }
            boxShowFn();
            var data = res.data;
            var arr1 = [];
            if(data.meetingUserList){
                for(var i=0;i<data.meetingUserList.length;i++){
                    arr1.push(data.meetingUserList[i].usName);
                }
                arr1 = arr1.join(",")
            }else{
                arr1 = "";
            }

            var arr2 = [];
            if(data.rankUserList){
                for(var i=0;i<data.rankUserList.length;i++){
                    arr2.push(data.rankUserList[i].usName);
                }
                arr2 = arr2.join(",")
            }else{
                arr2 = "";
            }

            var arr3 = [];
            if(data.copyerUserList){
                for(var i=0;i<data.copyerUserList.length;i++){
                    arr3.push(data.copyerUserList[i].usName);
                }
                arr3 = arr3.join(",")
            }else{
                arr3 = '';
            }
            var arr4 = [];
            if(data.meetingFileList){
                for(var i=0;i<data.meetingFileList.length;i++){
                    arr4.push(data.meetingFileList[i].fileName);
                }
                arr4 = arr4.join(",")
            }else{
                arr4 = "";
            }
            var arr5 = [
                {
                    value: 0,
                    label: '无提醒'
                },
                {
                    value: 1,
                    label: '提前15分钟'
                },
                {
                    value: 2,
                    label: '提前1小时'
                },
                {
                    value: 3,
                    label: '提前3小时'
                },
                {
                    value: 4,
                    label: '提前1天'
                }
            ];
            var string = [];
            if(data.remindVay){
                var remind = data.remindVay;
                if(remind.indexOf(",") != -1){
                    var  remindType = data.remindVay.split(",");
                    for(var i=0;i<remindType.length;i++){
                        var  str = remindWay(parseInt(remindType[i]));
                        string.push(str);
                    }
                }else{
                    var  str = remindWay(parseInt(remind));
                    string.push(str);
                }
            }
            if(data.startTime != null && data.startTime != "" && data.startTime != undefined){
                data.startTime = data.startTime.substr(0,data.startTime.lastIndexOf(':'))
            }
            if(data.endTime != null && data.endTime != "" && data.endTime != undefined){
                data.endTime = data.endTime.substr(0,data.endTime.lastIndexOf(':'))
            }
            $(".meet_det_msg .meet_user").text(arr1);
            $(".meet_det_msg .rank_meet").text(arr2);
            $(".meet_det_msg .meet_name").text(data.name);
            $(".meet_det_msg .meet_type").text(data.typeName);
            $(".meet_det_msg .meet_site").text(data.site);
            $(".meet_det_msg .meet_copy").text(arr3);
            $(".meet_det_msg .meet_date").text(data.startTime + "~" + data.endTime);
            $(".meet_det_msg .meet_hint").text(string.join(","));
            $(".meet_det_msg .meet_way").text(arr5[data.remindType].label);
            $(".meet_det_msg .meet_text").text(data.content);
            $(".meet_det_msg .meet_file").text(arr4);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//投票详情
function voteAjax(el){
    var dataObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        'projectId':el.projectId,
        'data': {
            id: el.relationIds
        }
    };
    var _this = this;
    $.ajax({
        url:  url+'/info/project/findProjectVoteOne',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        success: function(res){
            if(res.code != 0){
                $(".all_recov_msg .totas_box").show();
                $(".all_recov_msg .totas_box").find("span").text(res.msg);
                setTimeout(function(){
                    $(".all_recov_msg .totas_box").hide();
                },3000);
                return;
            }
            boxShowFn();
            var data = res.data;
            var arr1 = [
                {
                    id: 0,
                    name: "不提醒"
                },
                {
                    id: 1,
                    name: "截至前15分钟"
                },
                {
                    id: 2,
                    name: "截至前1小时"
                },
                {
                    id: 3,
                    name: "截至前3小时"
                },
                {
                    id: 4,
                    name: "截至前1天"
                }
            ]
            var remind =data.remindWay+"";
            var string = [];
            if(remind.indexOf(",")!=-1){
                var  remindType = data.remindWay.split(",");
                for(var i=0;i<remindType.length;i++){
                    var str = remindWay(parseInt(remindType[i]));
                   string.push(str);
                }
            }else {
                remind =data.remindWay;
                var str = remindWay(parseInt(remind));
                string.push(str);
            }
            var arr3 = [];
            if(data.voteUserList){
                for(var i=0;i<data.voteUserList.length;i++){
                    arr3.push(data.voteUserList[i].name);
                }
                arr3 = arr3.join(",")
            }else{
                arr3 = '';
            }
            var arr4 = [];
            if(data.voteCarbonList){
                for(var i=0;i<data.voteCarbonList.length;i++){
                    arr4.push(data.voteCarbonList[i].name);
                }
                arr4 = arr4.join(",")
            }else{
                arr4 = "";
            }
            var arr5 = [];
            if(data.voteActtachList){
                for(var i=0;i<data.voteActtachList.length;i++){
                    arr5.push(data.voteActtachList[i].docName);
                }
                arr5 = arr5.join(",")
            }else{
                arr5 = "";
            }
            if(data.startTime != null && data.startTime != "" && data.startTime != undefined){
                data.startTime = data.startTime.substr(0,data.startTime.lastIndexOf(':'))
            }
            if(data.endTime != null && data.endTime != "" && data.endTime != undefined){
                data.endTime = data.endTime.substr(0,data.endTime.lastIndexOf(':'))
            }
            $(".vote_det_msg .vote_pro").text(data.projName);
            $(".vote_det_msg .vote_name").text(data.name);
            $(".vote_det_msg .vote_type").text(data.typeName);
            $(".vote_det_msg .vote_time").text(data.startTime + "~" + data.endTime);
            $(".vote_det_msg .vote_hint").text(arr1[data.remindType].name);
            $(".vote_det_msg .vote_way").text(string.join(","));
            $(".vote_det_msg .vote_user").text(arr3);
            $(".vote_det_msg .vote_copy").text(arr4);
            $(".vote_det_msg .vote_file").text(arr5);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//日程详情
function dateAjax(el){
    var dataObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        'projectId':el.projectId,
        'data': {
            id: el.relationIds
        }
    };
    var _this = this;
    $.ajax({
        url:  url+'/sys/schedule/select_schedule',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        success: function(res){
            if(res.code != 0){
                $(".all_recov_msg .totas_box").show();
                $(".all_recov_msg .totas_box").find("span").text(res.msg);
                setTimeout(function(){
                    $(".all_recov_msg .totas_box").hide();
                },3000);
                return;
            }
            boxShowFn();
            var data = res.data;
            var arr1 = [
                {
                    value: 0,
                    label: '不提醒'
                },
                {
                    value: 1,
                    label: '提前15分钟'
                },
                {
                    value: 2,
                    label: '提前1小时'
                },
                {
                    value: 3,
                    label: '提前3小时'
                },
                {
                    value: 4,
                    label: '提前1天'
                }
            ];
            var string = [];
            if(data.remindType){
                var remind = data.sendType;
                if(remind.indexOf(",") != -1){
                    var  remindType = data.sendType.split(",");
                    for(var i=0;i<remindType.length;i++){
                        var  str = remindWay(parseInt(remindType[i]));
                        string.push(str);
                    }
                }else{
                    var  str = remindWay(parseInt(remind));
                    string.push(str);
                }
            }

            var arr3 = [
                {
                    value:1,
                    label:'不重复'
                },
                {
                    value:2,
                    label:'每天'
                },
                {
                    value:3,
                    label:'每周'
                },
                {
                    value:4,
                    label:'每年'
                },
                {
                    value:5,
                    label:'工作日'
                }
            ];
            // var copy = data.scheduleUserlist.map(v=>v.name)
            var copy = []
            for(var m =0; m<data.scheduleUserlist.length; m++){
              copy.push(data.scheduleUserlist[m].name)
            }

            var copyStr = copy.toString()
            if(data.startDate != null && data.startDate != "" && data.startDate != undefined){
                data.startDate = data.startDate.substr(0,data.startDate.lastIndexOf(':'))
            }
            if(data.endDate != null && data.endDate != "" && data.endDate != undefined){
                data.endDate = data.endDate.substr(0,data.endDate.lastIndexOf(':'))
            }
            $(".date_det_msg .date_name").text(data.name);
            $(".date_det_msg .date_pro").text(data.projectName);
            $(".date_det_msg .date_user").text(data.personnelName);
            $(".date_det_msg .date_time").text(data.startDate + "~" + data.endDate);
            $(".date_det_msg .date_hint").text(arr1[data.remindType].label);
            $(".date_det_msg .date_way").text(string.join(","));
            $(".date_det_msg .date_recover").text(arr3[data.repeatType-1].label);
            $(".date_det_msg .date_cont").text(data.content);
            $(".date_det_msg .date_copy").text(copyStr);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

// 任务详情
function taskAjax(el){
    var dataObj = {
        'token': JSON.parse(sessionStorage.getItem("userToken")),
        'userId': JSON.parse(sessionStorage.getItem("userId")),
        'projectId':el.projectId,
        'data': {
            id: el.relationIds
        }
    };
    var _this = this;
    $.ajax({
        url:  url+'/info/task/getTaskDetailsByid',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        success: function(res){
            if(res.code != 0){
                $(".all_recov_msg .totas_box").show();
                $(".all_recov_msg .totas_box").find("span").text(res.msg);
                setTimeout(function(){
                    $(".all_recov_msg .totas_box").hide();
                },3000);
                return;
            }
            boxShowFn();
            var data = res.data;
            if(data.status == 0){
                data.status = "待分配"
            }else if(data.status == 1){
                data.status = "待认领"
            } else if(data.status == 2){
                data.status = "待进行"
            }else if(data.status == 3){
                data.status = "正在进行"
            }
            else if(data.status == 4){
                data.status = "已完成"
            }
            if(data.createTime != null && data.createTime != "" && data.createTime != undefined){
                data.createTime = data.createTime.substr(0,data.createTime.lastIndexOf(':'))
            }
            if(data.endTime != null && data.endTime != "" && data.endTime != undefined){
                data.endTime = data.endTime.substr(0,data.endTime.lastIndexOf(':'))
            }
            $(".task_det_msg .task_name").text(data.name);
            $(".task_det_msg .stop_date").text(data.endTime);
            $(".task_det_msg .task_pro").text(data.projectName);
            $(".task_det_msg .task_state").text(data.status);
            $(".task_det_msg .task_time").text(data.createTime);
            // $(".task_det_msg .task_cont").text(data.content);
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function closeDetailMsg(el){
    $(el).parent().parent().hide();
    $(".msg_men_box").hide();
}



//消息中心-同意或拒绝
function agreeRefuse(el,item){
        var projectId = parseInt($(el).attr("projectId"));
        var applyUserId = $(el).attr("applyUserId");
        var acceptId = $(el).attr("acceptId");
        var id = $(el).attr("id");
        var send_data = {
            token: JSON.parse(sessionStorage.getItem("userToken")),
            userId: JSON.parse(sessionStorage.getItem("userId")),
            projectId:projectId,
            data: {
                projectId: projectId,
                applyUserId: applyUserId,
            }
        };
        if (item == 1) {   //同意
            send_data.data["result"] = 1;
        } else {      //拒绝
            send_data.data["result"] = 2;
        }
        var operation = send_data.data["result"];
        var send_datas = {};
    $.ajax({
            url:  url+'/info/project/isJoinProject',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(send_data),
            success: function(res){
                if (res.code == 0) {
                    $(el).parent().find(".el_btn_result").hide();
                    if (item == 1) {
                        $(el).parent().find(".result_btn").show().text("同意");
                    } else {
                        $(el).parent().find(".result_btn").show().text("拒绝");
                    }
                    send_datas = {
                        token: JSON.parse(sessionStorage.getItem("userToken")),
                        userId: JSON.parse(sessionStorage.getItem("userId")),
                        data: {
                            acceptId: acceptId,
                            id: id,
                            operation: operation
                        }
                    };
                    stateMsgFn(send_datas);
                }else if(res.code == "-2006"){
                    send_datas = {
                        token: sessionStorage.getItem("userToken"),
                        userId: JSON.parse(sessionStorage.getItem("userId")),
                        data: {
                            acceptId: acceptId,
                            id: id,
                        }
                    };
                } else {
                    $(".all_recov_msg .totas_box").show();
                    $(".all_recov_msg .totas_box").find("span").text(res.msg);
                    setTimeout(function(){
                        $(".all_recov_msg .totas_box").hide();
                    },3000);
                }
                if(res.data == false) {
                    send_datas = {
                        token: _this.token,
                        userId: _this.userId,
                        data: {
                            id: data.id,
                            acceptId: acceptId,
                            operation: 3
                        }
                    }
                    stateMsgFn(send_datas);
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
}
function stateMsgFn(send_datas){
    $.ajax({
        url:  url+'/sys/readProjectMsg',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(send_datas),
        success: function(res){
            if (res.code == 0) {
            }else {
                $(".all_recov_msg .totas_box").show();
                $(".all_recov_msg .totas_box").find("span").text(res.msg);
                setTimeout(function(){
                    $(".all_recov_msg .totas_box").hide();
                },3000);
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}
//定位
// function docLocationFn(el,item){
//     var projectId = parseInt($(el).attr("projectId"));
//     var id = $(el).attr("id");
//     window.msg.$router.push({
//             path: "/projectDoc",
//             query:{
//             docId: id,
//             projectId: projectId
//         }
//     });
// }
function docLocationFn(el,item){
    var that = msg;
    var token = that.$store.state.loginObject.userToken;
    var userId = that.$store.state.loginObject.userId;
    var success_code = that.code.codeNum.SUCCESS;
    var projectId = parseInt($(el).attr("projectId"));
    var relationId = $(el).attr("id");
    var dataObj = {
        "token": token,
        "userId": userId,
        "data": {
            "id": relationId,
            "projectId": projectId,
        }
    }
    that.$post("/doc/project/position", dataObj)
        .then(function (response) {
            // var data = response.data;
            if (success_code == response.code) {
                that.$router.push({
                    path: "/projectDoc",
                    query: {
                        docId: relationId,
                        projectId: projectId,
                        isPosition: true
                    }
                });
            } else if (response.code == -1002) {
                that.$message.warning('文件已被删除')
            } else {
                that.$message.warning(response.msg)
            }
        })
        .catch(function (error) {

        });
}
//消息中心-设置已读
function readOne(el){
    $(el).find(".no_read").hide();
    $(el).removeClass("noread");
    $(el).addClass("read");
}


// 消息主动断开连接
function dis_connect() {
    MqttClient.disconnect();
    sessionStorage.isConnected=false
    console.log("断开连接");
}




function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        protocol: a.protocol.replace(':', ''),
        hostname: a.hostname,
        port: a.port,
        path: a.pathname,
        query: (function () {
            var query = a.search.substr(1);
            var queryArr = query.split('&');
            var queryObj = {};
            queryArr.forEach(function (item, index) {
                var item = item.split('=');
                var key = item[0];
                queryObj[key] = item[1];
            });
            return queryObj;
        })(),
        params: (function () {
            var params = a.hash.substr(1);
            var paramsArr = params.split('#');
            return paramsArr;
        })(),
    }
}




function parseUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        protocol: a.protocol.replace(':', ''),
        hostname: a.hostname,
        port: a.port,
        path: a.pathname,
        query: (function () {
            var query = a.search.substr(1);
            var queryArr = query.split('&');
            var queryObj = {};
            queryArr.forEach(function (item, index) {
                var item = item.split('=');
                var key = item[0];
                queryObj[key] = item[1];
            });
            return queryObj;
        })(),
        params: (function () {
            var params = a.hash.substr(1);
            var paramsArr = params.split('#');
            return paramsArr;
        })(),
    }
}
