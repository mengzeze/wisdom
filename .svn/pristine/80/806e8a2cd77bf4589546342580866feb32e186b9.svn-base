<template>
    <div class="all_recov_msg">
    <!--消息弹框-->
        <div class="app_new_msg_box">
            <!--<div class="app_msg_box">-->
                <!--<div class="clearfix app_msg_head">-->
                    <!--<span class="app_hint_text"><i></i></span><span class="app_hint_close" @click="closeHintApp($event.target)">X</span>-->
                <!--</div>-->
                <!--<div class="app_msg_cont">-->
                    <!--<div class="app_msg_cont_first"></div>-->
                    <!--<div class="app_msg_cont_two"></div>-->
                    <!--<div class="app_msg_cont_three">-->
                        <!--<p></p>-->
                        <!--<p></p>-->
                    <!--</div>-->
                    <!--<div class="app_msg_cont_four"></div>-->
                <!--</div>-->
                <!--<div class="app_msg_foot">-->
                    <!--<button type="primary" @click="sureMsgApp($event.target)" class="app_btn app_msg_sure">确认</button>-->
                    <!--<button type="primary" @click="closeHintApp($event.target)" class="app_sure app_msg_know">我知道了</button>-->
                    <!--<button type="primary" @click="lookDetailApp($event.target)" class="app_btn app_msg_know">查看详情</button>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <!--会议详情-->
        <div class="meet_det_msg">
            <div class="clearfix meet_det_title">
                <span class="span_title">会议详情</span><span onclick="closeDetailMsg(this)" class="span_close">X</span>
            </div>
            <div class="clearfix meet_det_box">
                <label>参会人员：</label><div class="meet_user"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>列席人员：</label><div class="rank_meet"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>会议主题：</label><div class="meet_name"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>会议类型：</label><div class="meet_type"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>会议地点：</label><div class="meet_site"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>会议抄送人：</label><div class="meet_copy"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>时间：</label><div class="meet_date"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒类型：</label><div class="meet_hint"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒方式：</label><div class="meet_way"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>会议内容：</label><div class="meet_text"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>附件：</label><div class="meet_file"></div>
            </div>
        </div>
        <!--投票详情-->
        <div class="vote_det_msg">
            <div class="clearfix meet_det_title">
                <span class="span_title">投票详情</span><span onclick="closeDetailMsg(this)" class="span_close">X</span>
            </div>
            <div class="clearfix meet_det_box">
                <label>所属项目：</label><div class="vote_pro"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>投票名称：</label><div class="vote_name"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>投票类型：</label><div class="vote_type"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>投票时间：</label><div class="vote_time"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒类型：</label><div class="vote_hint"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒方式：</label><div class="vote_way"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>投票人员：</label><div class="vote_user"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>抄送人员：</label><div class="vote_copy"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>附件：</label><div class="vote_file"></div>
            </div>
        </div>
        <!--日程详情-->
        <div class="date_det_msg">
            <div class="clearfix meet_det_title">
                <span class="span_title">日程详情</span><span onclick="closeDetailMsg(this)" class="span_close">X</span>
            </div>
            <div class="clearfix meet_det_box">
                <label>日程名称：</label><div class="date_name"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>所属项目：</label><div class="date_pro"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>人员：</label><div class="date_user"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>时间：</label><div class="date_time"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒类型：</label><div class="date_hint"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>提醒方式：</label><div class="date_way"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>重复：</label><div class="date_recover"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>内容：</label><div class="date_cont"></div>
            </div>
          <div class="clearfix meet_det_box">
            <label>抄送人：</label><div class="date_copy"></div>
          </div>
        </div>
        <!--任务详情-->
        <div class="task_det_msg">
            <div class="clearfix meet_det_title">
                <span class="span_title">任务详情</span><span onclick="closeDetailMsg(this)" class="span_close">X</span>
            </div>
            <div class="clearfix meet_det_box">
                <label>任务名称：</label><div class="task_name"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>截止时间：</label><div class="stop_date"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>项目名称：</label><div class="task_pro"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>状态：</label><div class="task_state"></div>
            </div>
            <div class="clearfix meet_det_box">
                <label>创建时间：</label><div class="task_time"></div>
            </div>
            <!--<div class="clearfix meet_det_box">-->
                <!--<label>内容：</label><div class="task_cont"></div>-->
            <!--</div>-->
        </div>
        <div class="msg_men_box"></div>
        <!--提醒-->
        <div class="totas_box">
            <span></span>
        </div>
    </div>
</template>

<script>

    export default{
        data () {
            return {}
        },
        mounted(){
        },
        methods:{
            sureMsgApp(el){
                sureMsgApp(el);
            },
            closeHintApp(el){
                closeHintApp(el);
            },
            lookDetailApp(el){
                lookDetailApp(el);
            },
        }
    }
</script>

<style type="text/css">
    .all_recov_msg .app_new_msg_box{
        opacity: 1;
        border-radius: 4px;
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
        position: fixed;
        width: 330px;
        right: 20px;
        bottom:10px;
        box-sizing: border-box;
        display: none;
        height: 200px;
        border-radius: 5px;
        z-index: 1000;
    }
    .all_recov_msg .meet_det_title{
        line-height: 30px;
        text-align: center;
        margin-bottom: 24px;
    }
    .all_recov_msg .meet_det_title .span_title{
        font-size: 16px;
        font-weight: 600;
    }
    .all_recov_msg .meet_det_title .span_close{
        float: right;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    .all_recov_msg .app_msg_box{
        position: absolute;
        left:0;
        top:0;
        z-index: 1000;
        width:100%;
        height:100%;
        padding:10px;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .all_recov_msg .app_msg_head{
        height: 30px;
        line-height: 30px;
    }
    .all_recov_msg .app_hint_text{
        float: left;
        line-height: 30px;
    }
    .all_recov_msg .app_hint_close{
        float: right;
        padding:10px;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 10px;
        cursor: pointer;
    }
    .all_recov_msg .app_msg_foot{
        text-align: right;
        box-sizing: border-box;
    }
    .all_recov_msg .app_msg_foot button{
        margin-right: 10px;
        height:30px;
        line-height: 30px;
        background: #fff;
        border:1px solid #ccc;
        border-radius: 3px;
        padding:0 10px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .all_recov_msg .app_msg_foot .app_btn{
        color: #fff;
    }
    .all_recov_msg .app_msg_cont{
        width:100%;
        height:120px;
        text-align: center;
    }
    .all_recov_msg .app_msg_cont_first{
        font-weight: 600;
        font-size: 16px;
        text-align: left;
    }
    .all_recov_msg .app_msg_cont_first{
        line-height: 34px;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .all_recov_msg app_msg_cont_two{
        color:#666;
        text-align: left;
        overflow: hidden;
    }
    .all_recov_msg .app_msg_cont_three p{
        line-height: 30px;
        text-align: left;
        overflow: hidden;
    }
    .all_recov_msg .app_msg_cont_four{
        text-align: left;
        overflow: hidden;
    }
    .all_recov_msg .app_hint_text i{
        width:24px;
        height:24px;
        display: inline-block;
        background-image: url("../../assets/message/msg.png");
        background-size: 24px;
    }
    .all_recov_msg .msg_men_box{
        position: fixed;
        left: 0;
        top:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.5);
        display: none;
        z-index: 2000;
    }
    .all_recov_msg .meet_det_msg,.all_recov_msg .vote_det_msg,.all_recov_msg .date_det_msg,.all_recov_msg .task_det_msg,.all_recov_msg .urge_det_msg{
        background: #fff;
        display: none;
        z-index: 2010;
        position: absolute;
        width:600px;
        min-height:500px;
        left:50%;
        top:50%;
        margin-left: -300px;
        margin-top: -250px;
        padding:20px;
        box-sizing: border-box;
    }
    .all_recov_msg .meet_det_box{
        line-height: 40px;
        font-size: 16px;
    }
    .all_recov_msg .meet_det_box label{
        width:100px;
        text-align: right;
        float: left;
        font-weight: bold;
    }
    .all_recov_msg .meet_det_box div{
        width:450px;
        float: left;
        text-align: left;
        line-height:30px;
        padding-top: 5px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .all_recov_msg .app_msg_p{
        background: #ff0000;
        color:#fff;
        padding:3px 8px;
    }
    .all_recov_msg .totas_box{
        position: fixed;
        top:80px;
        left:0;
        width:100%;
        height:60px;
        z-index: 100;
        text-align: center;
        display: none;
    }
    .all_recov_msg .totas_box span{
        text-align: center;
        display: inline-block;
        height:60px;
        line-height: 60px;
        min-width:200px;
        padding:0 20px;
        background: rgba(0,0,0,0.82);
        color:#fff;
        border-radius: 4px;
    }
</style>
