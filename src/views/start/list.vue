<template>
    <div>
        <div class="titBox">
            <span class="main-title">表单列表</span>
        </div>
        <div class="paddingBox">
            <div class="searchBox">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="表单提交人">
                        <el-select v-model="form.postName" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="查询条件2">
                        <el-input v-model="form.field" placeholder="请输入"></el-input>
                    </el-form-item>             
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                    <el-form-item class="floatRight">
                        <el-button type="danger" @click="toApply">表单录入</el-button>
                    </el-form-item>
                </el-form>
            </div> 
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
                label="工作流id"
                min-width="280">
                </el-table-column>
                <el-table-column
                prop="gzlCreateUserID"
                label="创建者id"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="gzlCreateTime"
                min-width="180"
                label="创建时间">
                </el-table-column>
                <el-table-column
                prop="gzlUpdateTime"
                min-width="180"
                label="最后更新时间">
                </el-table-column>
                <el-table-column label="操作" min-width="230">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="submit(scope.$index, scope.row)">提交审核</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="update(scope.$index, scope.row)">修改</el-button>                       
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
                postName:'',
                field:''
            },
            options:[{value:1,label:'本人'},{value:2,label:'组内'}],
            tableData:[]
        }
    },
    mounted() {
        this.form.postName = this.options[0].value
         this. getMyFormInfo()
    },
    methods:{
        onSearch() {
            if(this.form.postName == 1) {
                this. getMyFormInfo()
            }else if(this.form.postName == 2){
                this.getGroupFormInfo()
            }else{
                this.$message.warning('请选择表单提交人')
            }
        },
        toApply() {
            this.$router.push({
                path:'/start/apply'
            })
        },
        //表单列表—本人
        getMyFormInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetMyFormListByGzlId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                    field:self.form.field
                }
            }, function(data) {
                self.tableData = data.data
                for(let i = 0;i<self.tableData.length;i++){
                    self.tableData[i].gzlCreateTime = self.timeFormat(self.tableData[i].gzlCreateTime)
                    self.tableData[i].gzlUpdateTime = self.timeFormat(self.tableData[i].gzlUpdateTime)
                }
            }, function(response) {
                //失败回调
            })
        },

        //表单列表—组内
        getGroupFormInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetGroupFormListByGzlId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                    field:self.form.field
                }
            }, function(data) {
                self.tableData = data.data
                for(let i = 0;i<self.tableData.length;i++){
                    self.tableData[i].gzlCreateTime = self.timeFormat(self.tableData[i].gzlCreateTime)
                    self.tableData[i].gzlUpdateTime = self.timeFormat(self.tableData[i].gzlUpdateTime)
                }
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
        //提交
        submit(index, row) {
            let self = this
            let params = new FormData()
            params.append('gzlId',row.gzlId)
            params.append('formId',row.gzlFormId)
            self.$http.post(self.api.gzlStart,params,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            },function(data){
                if(data.status == 1){
                   self.$message.success('提交成功，等待审核...')
                   setTimeout(function(){
                       location.reload()
                   },1000)
                }else{
                   
                }
                
            },function(response){
                self.$message.error('操作失败')
            })
        },
        //修改
        update(index, row) {
            this.$router.push({
                path:`/start/update/${row.gzlId}/${row.gzlFormId}`
            })
        },
        //删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该工作流, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let self = this
                    let params = new FormData()
                    params.append('gzlId',row.gzlId)
                    params.append('formId',row.gzlFormId)
                    self.$http.post(self.api.gzlDeleteFormById,params,{
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    },function(data){
                        if(data.status == 1){
                            self.$message.success('删除成功')
                            setTimeout(function() {
                                location.reload()
                            },1000)
                        }else{
                        
                        }
                        
                    },function(response){
                        self.$message.error('操作失败')
                    })
                 }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });         
                })
        }
    }
}
</script>