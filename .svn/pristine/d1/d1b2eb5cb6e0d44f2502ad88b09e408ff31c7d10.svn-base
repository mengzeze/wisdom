var msg_type = {
        /**
         *  项目消息 1
         */
        PROJECT_MSG: "1",
        /**
         *  聊天消息 2
         */
        CHAT_MAG : "2",
        /**
         * 审批消息 3
         */
        APPROVE_MSG : "3",
        /**
         *  通知消息
         */
        NOTICE_MSG: "4",
        
        // 版本变更消息
        VERSION_MSG: '6'
    }


var chat_msg = {
    /**
     *  普通消息 1
     */
    PROJECT_MSG: "1",
    /**
     *  图片 2
     */
     IMG_CHAT : "2",
    /**
     * 项目文件讨论消息
     */
    PROJECT_FILE_MSG : "3",
    /**
     *  底稿文件讨论消息
     */
    PAPER_FILE_MSG: "4",
}


var notice_Msg ={

    /**
     *  日程通知 1
     */
    SU_NOTICE_MSG: "1",
    /**
     *  任务通知 2
     */
    TASK_NOTICE_MSG : "2",
    /**
     * 投票通知
     */
    VOTE_NOTICE_MSG : "3",
    /**
     *  审批催办
     */
    APPROVE_NOTICE_MSG: "4",
    /**
     *  会议通知
     */
    MEET_NOTICE_MSG: "5",
    // 任务重复提醒
    TASK_REME_PROJECT: "6",
    // 审批提交提醒
    APPROVE_SUBMIT_NOTICE_MSG: "7"

}

var notice_option = {
    /**
     *  新增
     */
    ADD_NOTICE: "1",
    /**
     *  修改
     */
    UPDATE_NOTICE: "2",
    /**
     *  到通知时间提醒
     */
    NOTICE_TIME : "3",

     /**
     *  任务完成通知
     */
    TASK_COMPLETE :"4",
}




function  remindType(remindType){
        var rStr = "";
        switch (remindType){
            case 1:
                rStr = "15分钟后";
                break;
            case 2 :
                rStr = "1小时后";
                break;
            case 3 :
                rStr = "3小时后";
                break;
            case 4 :
                rStr = "明天";
                break;
            case 5 :
                rStr = "明天";
                break;
            case 6 :
                rStr = "将要";
                break;
            default :
                rStr = "";
        }
        return rStr;
}


function remindWay(remindWay) {
    var rStr = "";
    switch (remindWay){
        case 0:
            rStr = "站内信";
            break;
        case 1 :
            rStr = "邮件";
            break;
        case 2 :
            rStr = "短信";
            break;
        default :
            rStr = "";
    }
    return rStr;
}
