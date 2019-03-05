const BASE_URL = '/gzlMain'
export default{
    //图片上传
    "login":BASE_URL+'/gzlLogin',//登录
    //工作流管理
    "gzlGetDeployList":BASE_URL+'/gzlGetDeployList',//工作流列表
    "gzlDeploy":BASE_URL+'/gzlDeploy',//部署工作流
    "gzlDeletePD":BASE_URL+'/gzlDeletePD',//删除工作流
    // 表单录入
    "gzlGetFormUUId":BASE_URL+"/gzlGetFormUUId",//获取uuid
    "gzlInsertFormByDataMap":BASE_URL+'/gzlInsertFormByDataMap',//表单录入—保存
    "gzlStart":BASE_URL+'/gzlStart',//表单录入—提交审核
    // 表单列表
    "gzlGetMyFormListByGzlId":BASE_URL+'/gzlGetMyFormListByGzlId',//表单列表—本人
    "gzlGetGroupFormListByGzlId":BASE_URL+'/gzlGetGroupFormListByGzlId',//表单列表—组内
    "gzlDeleteFormById":BASE_URL+'/gzlDeleteFormById',//删除表单
    // 表单修改
    "gzlUpdateFormById":BASE_URL+'/gzlUpdateFormById',//修改表单-保存   
    "gzlGetFormById":BASE_URL+"/gzlGetFormById",//根据当前表单id和工作流id 查询 表单详细信息
    // 驳回表单
    "gzlGetGroupTaskListByUserId":BASE_URL+"/gzlGetGroupTaskListByUserId",//驳回列表
    "gzlGetHistoryCommentListByPiid":BASE_URL+'/gzlGetHistoryCommentListByPiid',//根据当前表单id和工作流id 查询历史评论 
    "getDefaultGroupIdByGzlId":BASE_URL+"/getDefaultGroupIdByGzlId",//查询当前工作流的默认groupId
    "gzlReSubmitTaskAgree":BASE_URL+"/gzlReSubmitTaskAgree",//重提
    "gzlSubmitTaskRefuse":BASE_URL+"/gzlSubmitTaskRefuse",//删除
    // 附件
    "gzlAddAnnexById":BASE_URL+"/gzlAddAnnexById",//添加附件
    "gzlGetFormAnnexListById":BASE_URL+"/gzlGetFormAnnexListById",//获取附件列表
    "gzlDeleteFormAnnexById":BASE_URL+"/gzlDeleteFormAnnexById",//删除附件
    //审批
    "gzlGetMyGroupListByUserIdAndGalId":BASE_URL+'/gzlGetMyGroupListByUserIdAndGalId',//获取所有组
    "gzlGetGroupTaskListByUserId":BASE_URL+'/gzlGetGroupTaskListByUserId',//审批任务列表
    "gzlSubmitTaskAgree":BASE_URL+"/gzlSubmitTaskAgree",//同意审批
    "gzlSubmitTaskRefuse":BASE_URL+"/gzlSubmitTaskRefuse",//驳回
    //历史列表
    "gzlGetMyHistoryTaskListByUserId":BASE_URL+"gzlGetMyHistoryTaskListByUserId",//表单提交人—本人
    "gzlGetGroupHistoryTaskListByUserId":BASE_URL+"gzlGetGroupHistoryTaskListByUserId",//表单提交人—组内
}