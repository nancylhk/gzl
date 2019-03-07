<template>
    <div>
        <div class="titBox">
            <span class="main-title">驳回列表</span>
        </div>
        <div class="paddingBox">
            <div class="searchBox">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="查询条件">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
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
                                @click="reSubmit(scope.$index, scope.row)">重提</el-button>
                                <el-button
                                size="mini"
                                type="warning"
                                @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            
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
                name:''
            },
            tableData:[],
            groupId:''
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
                    groupId:self.groupId
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
        // 查询当前工作流的默认groupId
        getGroupId() {       
            let self = this;
            self.$http.get(self.api.getDefaultGroupIdByGzlId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                }
            }, function(data) {
                self.groupId = data.data   
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

        },
        // 修改
        handleUpdate(index, row) {
            this.$router.push({
                path:`/reject/update/${row.gzlId}/${row.gzlFormId}`
            })
        },

        //重提 = 未更新
        reSubmit(index, row) {
            let self = this
            let params = new FormData()
            params.append('gzlId',row.gzlId)
            params.append('formId',row.gzlFormId)
            params.append('isUpdate',0)
            self.$http.post(self.api.gzlReSubmitTaskAgree,params,{
            headers: {
                    "Content-Type": "multipart/form-data"
                },
            },function(data){
                self.$message({
                    type: 'success',
                    message: data.data
                });
            },function(response){
                self.$message.error('操作失败')
            })
        },
        //删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该驳回业务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let self = this
                    let params = new FormData()
                    params.append('gzlId',row.gzlId)
                    params.append('formId',row.gzlFormId)
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
                        self.$message.error('删除失败')
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });         
                })
            
           
        },
    }
}
</script>

