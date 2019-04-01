<template>
    <div>
        <div class="titBox">
            <span class="main-title">工作流列表</span>
        </div>
        <div class="paddingBox">
            <div class="searchBox">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="工作流名称">
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
                        prop="gzlRealName"
                        label="工作流名称"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gzlRemark"
                        label="备注"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gzlUpdateTime"
                        min-width="180"
                        label="发布时间">
                        </el-table-column>
                        <el-table-column label="操作" min-width="230">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="success"
                                @click="upload(scope.$index, scope.row)">上传</el-button>
                                <el-button
                                size="mini"
                                type="primary"
                                @click="flow(scope.$index, scope.row)">流程</el-button>
                                <el-button
                                size="mini"
                                type="warning"
                                @click="handleDeploy(scope.$index, scope.row)">部署</el-button>
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
            tableData:[]
        }
    },
    mounted() {
        this.gzlGetDeployList()
    },
    methods:{
        //工作流列表
        gzlGetDeployList() {
            let self = this;
            self.$http.get(self.api.gzlGetDeployList, {}, function(data) {
                self.tableData = data.data
                self.tableData.forEach((e)=>{
                    let date = new Date(parseInt(e.gzlUpdateTime));
                    let Y = date.getFullYear() + '-'
                    let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                    let D = (date.getDate()<10?'0'+date.getDate() : date.getDate()) + ' '
                    let h = (date.getHours()<10?'0'+date.getHours() : date.getHours()) + ':'
                    let m = (date.getMinutes()<10? '0'+date.getMinutes() : date.getMinutes()) + ':'
                    let s =  (date.getSeconds() <10?'0'+date.getSeconds():date.getSeconds())
                    e.gzlUpdateTime = Y+M+D+h+m+s
                })
            }, function(response) {
                //失败回调
            })
        },
        onSearch() {

        },
        //上传
        upload(index, row) {

        },
        //流程
        flow(index, row) {

        },
        // 部署工作流
        handleDeploy(index, row) {
            let self = this
            let params = new FormData()
            params.append('gzlId',row.id)
            self.$http.post(self.api.gzlDeploy,params,{
            headers: {
                    "Content-Type": "multipart/form-data"
                },
            },function(data){
                if(data.status == 1){
                    self.$message({
                        type: 'success',
                        message: data.data
                    });
                }else{
                    self.$message({
                        type: 'error',
                        message: data.data
                    });
                }
                
            },function(response){
                self.$message.error('部署失败')
            })
        },
        //删除工作流
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该工作流, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let self = this
                    let params = new FormData()
                    params.append('gzlId',row.id)
                    self.$http.post(self.api.gzlDeletePD,params,{
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
