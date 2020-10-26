//系统权限
//id
var permissionSysEnum = ["process_type_add","process_type_edit","process_type_remove","backstage","main_worktable","project_manage","crm_manage","paper_mange","approve","approve_core","project_list","crm_financing_add","crm_financing_del","crm_financing_edit","crm_financing_export","reception","crm_financing_contaacts","crm_financing_partner","crm_financing_file","crm_financing_visit","crm_financing_visit_add","crm_financing_visit_edit","crm_financing_visit_del","crm_financing_visit_export","crm_financing__file_upload","crm_financing__file_down","crm_financing__file_dition","crm_financing__vesion_retore","crm_financing__file_shear","crm_financing__file_del","crm_financing__file_rename","crm_financing__file_copy","crm_financing__file_lock","crm_financing__recye_retore","crm_financing__recye_clean","crm_financing__file_dir","crm_financing__file_preview","crm_financing__recye_del","crm_financing_cooperation_export","crm_financing_contacts_add","crm_financing_contacts_del","crm_financing_contacts_edit","crm_financing_contacts_export","crm_financing_partner_add","crm_financing_partner_del","crm_financing_partner_edit","crm_financing_cooperation","paper_file_file_upload","paper_file_file_down","paper_file_file_dition","paper_file_vesion_retore","paper_file_file_shear","paper_file_file_del","paper_file_file_rename","paper_file_file_copy","paper_file_file_lock","paper_file_file_dir","paper_file_file_preview","paper_file_mould","paper_file_annotation","paper_file_lookAll","paper_add_atalog","paper_del_atalog","paper_move_atalog","paper_rename_atalog","paper_template_u","paper_template_del","paper_template_create","paper_template_upload","organizational_structure","user_operation","bask_role_permission","process_engine","bask_paper_opation","bask_sys_operation","bask_sys_log","bask_add_sondept","bask_del_sondept","bask_up_sondept","bask_del_user","bask_update_user","bask_reset_pwd","bask_account_add","bask_account_frozen","bask_account_update","bask_account_del","bask_add_role","bask_edit_role","bask_del_role","permission_role_configure","bask_add_flow","bask_del_flow","bask_enable_flow","bask_prohibit_flow","bask_main_version","bask_del_version","bask_flow_release","bask_business_add","bask_project_stage_add","bask_project_stage_update","bask_metting_add","bask_metting_update","bask_metting_del","bask_vote_add","bask_vote_update","bask_vote_del","bask_task_model_add","bask_task_model_update","bask_task_model_del","bask_model_task_add","bask_model_task_update","bask_sys_log_export","bask_copy_atalog","bask_move_atalog","bask_template_upload","bask_template_op","bask_flow_export","project_add","project_apply","project_recyled","bask_project_config","process_type_configuration","bask_type_config","bask_task_config","bask_workbench_operation","project_termination","project_reduction","paper_file_mould_paper","sub_approve","crm_financing_partner_export","bask_add_user_dept"];
//class
var classSysEnum = ["process_type_add","process_type_edit","process_type_remove","bask_del_flow","bask_enable_flow","bask_prohibit_flow","bask_main_version","bask_del_version","bask_flow_release","bask_flow_export","project_reduction","crm_financing_add","crm_financing_del","crm_financing_edit","crm_financing_export","paper_move_atalog","paper_template_u","paper_template_del","paper_file_file_preview","bask_move_atalog","bask_copy_atalog","bask_del_atalog","bask_edit_atalog","bask_template_op","bask_template_upload","bask_del_role","bask_edit_role","bask_project_stage_update","bask_metting_del","bask_metting_update","bask_vote_update","bask_vote_del","bask_task_model_update","bask_task_model_del","bask_add_atalog"];
//项目权限
//id
var permissionProEnum = ["project_task","project_information","project_file","project_user","project_meet","project_task_distribution","project_task_del","project_task_claim","project_task_close","project_task_queryAll","project_task_edit","project_file_upload","project_file_dir","project_recye_retore","project_file_approve","project_file_lock","project_file_mould","project_add_user","project_del_user","project_edit_user","project_add_mett","project_export_mett","project_add_vote","project_export_vote","project_add_log","project_export_log","project_log_relation","project_vote","projet_log","project_transfer","project_del","project_role_add","config_permission_project","project_file_to_paper","project_dir_approve","project_file_dition","project_recye_clean","project_recye_del","project_out","project_role","project_file_model","project_add_model","project_join"];
//class
var classProEnum = ["project_del_user","project_edit_user","project_task_add","project_task_del","project_task_close","project_role_del","project_role_edit","project_edit_mett","project_del_mett","project_edit","project_del_mode","project_project_model","project_edit"]

//项目入口
var projectEnit = ["project_task","project_information","project_file","project_user","project_meet"]

var onloadRouter = {
    //前台
    "medium":"crm_manage",
    "natural":"crm_manage",
    "financing":"crm_manage",
    "customcontact":"crm_manage",
    "customvisit":"crm_manage",
    "projectlist":"project_list",
    "tasks":"project_task",
    "projectmessage":"project_information",
    "projectrole":"project_role",
    "projecmeeting":"project_meet",
    "projecvote":"project_vote",
    "projectDoc":"project_file",
    "projecJournal":"projet_log",
    "manuscriptmanage":"paper_mange",
//    后台
    "role":"bask_role_permission",
    "framework":"organizational_structure",
    "management":"user_operation",
    "backstagedirectorylist":"bask_paper_opation",
    "processengine":"process_engine",
    "projectbusinconfig":"bask_project_config",
    "approvalTypeconfig":"process_type_configuration",
    "tasksconfig":"bask_task_config",
    "maindeskconfig":"bask_workbench_operation",
    "classification":"bask_type_config",
    "systemlog":"bask_sys_log",
}

//系统权限

// backstage	后台
// main_worktable	主工作台
// project_manage	项目管理
// crm_manage	客户管理
// paper_mange	底稿管理
// approve	我的审核
// approve_core	审核中心
// project_list	项目列表
// crm_financing_add	新增客户
// crm_financing_del	删除客户
// crm_financing_edit	编辑客户
// crm_financing_export	客户导出
// reception	前台
// crm_financing_contaacts	客户联系人
// crm_financing_partner	股东信息
// crm_financing_file	客户文档
// crm_financing_visit	客户拜访记录
// crm_financing_visit_add	新增拜访记录
// crm_financing_visit_edit	编辑拜访记录
// crm_financing_visit_del	删除拜访记录
// crm_financing_visit_export	导出拜访记录
// crm_financing__file_upload	文件上传
// crm_financing__file_down	文件下载
// crm_financing__file_dition	文件版本
// crm_financing__vesion_retore	版本还原
// crm_financing__file_shear	文件剪切
// crm_financing__file_del	文件删除
// crm_financing__file_rename	文件重名名
// crm_financing__file_copy	文件复制
// crm_financing__file_lock	文件锁定/解锁
// crm_financing__recye_retore	回收站还原文件
// crm_financing__recye_clean	回收站清空
// crm_financing__file_dir	新建文件夹
// crm_financing__file_preview	文件预览
// crm_financing__recye_del	删除回收站文件
// crm_financing_cooperation_export	导出合作记录
// crm_financing_contacts_add	客户联系人新增
// crm_financing_contacts_del	客户联系人删除
// crm_financing_contacts_edit	客户联系人编辑
// crm_financing_contacts_export	客户联系人导出
// crm_financing_partner_add	新增股东信息
// crm_financing_partner_del	删除股东信息
// crm_financing_partner_edit	修改股东信息
// crm_financing_cooperation	合作记录
// paper_file_file_upload	文件上传
// paper_file_file_down	文件下载
// paper_file_file_dition	文件版本
// paper_file_vesion_retore	版本还原
// paper_file_file_shear	文件剪切
// paper_file_file_del	文件删除
// paper_file_file_rename	文件重命名
// paper_file_file_copy	文件复制
// paper_file_file_lock	文件锁定/解锁
// paper_file_file_dir	引用目录
// paper_file_file_preview	文件预览
// paper_file_mould	引用模板
// paper_file_annotation	文件批注
// paper_file_lookAll	全局查看
// paper_add_atalog	增加目录
// paper_del_atalog	删除目录
// paper_move_atalog	移动目录
// paper_rename_atalog	重命名目录
// paper_template_u	引用项目模板
// paper_template_del	删除模板
// paper_template_create	新建模板
// paper_template_upload	上传项目模板
// organizational_structure	组织架构
// user_operation	用户管理
// bask_role_permission	角色权限
// process_engine	流程引擎
// bask_paper_opation	底稿管理
// bask_sys_operation	系统配置
// bask_sys_log	系统日志
// bask_add_sondept	添加部门
// bask_del_sondept	删除部门
// bask_up_sondept	修改部门
// bask_del_user	删除成员
// bask_update_user	调整部门
// bask_reset_pwd	重置密码
// bask_account_add	新增账户
// bask_account_frozen	冻结账户
// bask_account_update	修改账户
// bask_account_del	删除账户
// bask_add_role	新增角色
// bask_edit_role	修改角色
// bask_del_role	删除角色
// permission_role_configure	配置权限
// bask_add_flow	新增流程
// bask_edit_flow	编辑流程
// bask_del_flow	删除流程
// bask_enable_flow	启用流程
// bask_prohibit_flow	禁用流程
// bask_main_version	设为主版本
// bask_del_version	版本删除
// bask_flow_release	流程发布
// bask_business_add	新增业务类型
// bask_business_update	编辑业务类型
// bask_project_stage_add	新增项目阶段
// bask_project_stage_update	修改项目阶段
// bask_metting_add	新增会议类型
// bask_metting_update	编辑会议类型
// bask_metting_del	删除会议类型
// bask_vote_add	新增投票类型
// bask_vote_update	修改投票类型
// bask_vote_del	删除投票类型
// bask_task_model_add	新建任务模板
// bask_task_model_update	编辑任务模板
// bask_task_model_del	删除任务模板
// bask_model_task_add	新增模板任务
// bask_model_task_update	修改模板任务
// bask_sys_log_export	系统日志导出
// bask_add_atalog	增加目录
// bask_edit_atalog	修改目录
// bask_del_atalog	删除目录
// bask_copy_atalog	复制目录
// bask_move_atalog	移动目录
// bask_template_upload	下载模板
// bask_template_op	模板管理
// bask_flow_export	流程导出
// project_add	新增项目
// project_apply	申请加入
// project_recyled	项目回收站
// bask_project_config	后台项目业务配置
// bask_type_config	业务类型配置
// bask_task_config	任务配置
// bask_workbench_operation	主工作台
// project_termination	项目终止库
// project_reduction	项目还原
// paper_file_mould_paper	引用底稿模板
// sub_approve	提交审核
// crm_financing_partner_export	导出股东信息
// bask_add_user_dept	新增成员


//项目权限

// project_task	项目任务
// project_information	项目信息
// project_file	项目文件
// project_user	项目成员
// project_meet	项目会议
// project_task_add	创建任务
// project_task_distribution	待分配任务
// project_task_del	删除任务
// project_task_claim	待认领任务
// project_task_close	关闭任务
// project_task_queryAll	查看项目组任务成员
// project_task_edit	任务编辑
// project_file_upload	项目文件上传
// project_file_dir	新建文件夹
// project_recye_retore	回收站还原文件
// project_file_approve	文件审核
// project_file_lock	文件锁定
// project_file_mould	引用模板
// project_add_user	添加成员
// project_del_user	删除人员
// project_edit_user	编辑人员
// project_add_mett	新增会议
// project_edit_mett	修改会议
// project_del_mett	删除会议
// project_export_mett	会议导出
// project_add_vote	新增投票
// project_edit_vote	修改投票
// project_del_vote	删除投票
// project_export_vote	导出投票
// project_add_log	日志新增
// project_export_log	导出日志内容
// project_log_relation	导出到项目文档
// project_vote	项目投票
// projet_log	项目日志
// project_edit	编辑项目
// project_transfer	项目移交
// project_del	删除项目
// project_role_add	新增角色
// project_role_edit	编辑角色
// project_role_del	删除角色
// config_permission_project	配置权限
// project_file_to_paper	设为底稿
// project_dir_approve	目录审核
// project_file_dition	文件版本
// project_recye_clean	清空回收站文件
// project_recye_del	删除回收站文件
// project_out	项目退出
// project_role	项目权限
// project_file_model	上传模板
// project_project_model	引用项目模板
// project_del_model	删除项目模板
// project_add_model	新建模板
// project_join	加入项目（同意/拒绝加入）





