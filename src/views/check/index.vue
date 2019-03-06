<template>
    <div>
        <div class="titBox">
            <span class="main-title">待审核列表</span>
        </div>
        <div class="paddingBox">
            <div class="searchBox">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="用户组">
                        <el-select v-model="form.groupId" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.gzlGroupId"
                            :label="item.gzlGroupName"
                            :value="item.gzlGroupId">
                            </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="查询条件2">
                        <el-input v-model="form.field" placeholder="请输入"></el-input>
                    </el-form-item>             
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div> 
            <div>
                <template>
                    <el-table
                        :data="tableData"
                        stripe
                        class="tableDemo"
                        style="width: 100%">
                        <el-table-column
                        type="index"
                        label="序号"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gzlFormId"
                        label="工作流表单id"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gzlCreateTime"
                        label="创建时间"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gzlUpdateTime"
                        min-width="180"
                        label="更新时间">
                        </el-table-column>
                        <el-table-column label="操作" min-width="230">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="success"
                                @click="toDetail(scope.$index, scope.row)">详情</el-button>
                                <el-button
                                size="mini"
                                type="warning"
                                @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
                            
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
                groupId:''
            },
            tableData:[],
            groupId:'',
            options:[]
        }
    },
    mounted() {    
        this.getGroupId()
    },
    methods:{
        //工作流列表
        getList() {
            let self = this;
            self.$http.get(self.api.gzlGetGroupTaskListByUserId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                    groupId:self.form.groupId
                }
            }, function(data) {
                if(data.data != null) {
                    self.tableData = data.data 
                    for(let i = 0;i<self.tableData.length;i++){
                        self.tableData[i].gzlCreateTime = self.timeFormat(self.tableData[i].gzlCreateTime)
                        self.tableData[i].gzlUpdateTime = self.timeFormat(self.tableData[i].gzlUpdateTime)
                    }  
                }
                            
            }, function(response) {
                //失败回调
            })
        },
        // 查询当前工作流的group成员
        getGroupId() {       
            let self = this;
            self.$http.get(self.api.gzlGetMyGroupListByUserIdAndGalId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                }
            }, function(data) {
                self.options = data.data.filter(function(item){
                    return item.isDefault !='1'
                })  
                self.form.groupId =   self.options[0].gzlGroupId   
                self.getList()  
            }, function(response) {
                //失败回调
            })
        },
        //时间戳格式化
        timeFormat(formatTime) {          
            let date = new Date(parseInt(formatTime));
            let Y = date.getFullYear() + '-'
            let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
            let D = (date.getDate()<10?'0'+date.getDate() : date.getDate()) + ' '
            let h = (date.getHours()<10?'0'+date.getHours() : date.getHours()) + ':'
            let m = (date.getMinutes()<10? '0'+date.getMinutes() : date.getMinutes()) + ':'
            let s =  (date.getSeconds() <10?'0'+date.getSeconds():date.getSeconds())
            return formatTime = Y+M+D+h+m+s
        },
        onSearch() {
            this.tableData = []
            this.getList()
        },
        //点详情
        toDetail(index, row) {
            this.$router.push({
                path:`/check/detail/${row.gzlId}/${row.gzlFormId}`
            })
        },

        //同意
        handleAgree(index, row) {
            this.$prompt('请输入审批意见', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    let self = this
                    let params = new FormData()
                    params.append('gzlId',row.gzlId)
                    params.append('formId',row.gzlFormId)
                    params.append('comment',value)
                    self.$http.post(self.api.gzlSubmitTaskAgree,params,{
                    headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    },function(data){
                        if(data.status == 1){
                            self.$message({
                                type: 'success',
                                message:data.data
                            });
                            setTimeout(function(){
                                location.reload()
                            },1000)
                            
                        }else{
                            self.$message({
                                type: 'error',
                                message:data.msg
                            });
                        }
                        
                    },function(response){
                        self.$message.error('操作失败')
                    })
                 }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });         
                })
        },
        //驳回
        handleDelete(index, row) {
            this.$prompt('请输入驳回理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    let self = this
                    let params = new FormData()
                    params.append('gzlId',row.gzlId)
                    params.append('formId',row.gzlFormId)
                    params.append('comment',value)
                    self.$http.post(self.api.gzlSubmitTaskRefuse,params,{
                    headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    },function(data){
                        if(data.status == 1){
                            self.$message({
                                type: 'success',
                                message:data.data
                            });
                            setTimeout(function(){
                                location.reload()
                            },1000)
                            
                        }else{
                            self.$message({
                                type: 'error',
                                message:data.msg
                            });
                        }
                        
                    },function(response){
                        self.$message.error('驳回失败')
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消驳回'
                    });         
                })
            
           
        },
    }
}
</script>

