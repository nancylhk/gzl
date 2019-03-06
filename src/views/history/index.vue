<template>
    <div>
        <div class="titBox">
            <span class="main-title">历史表单</span>
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
                    <el-form-item label="用户组">
                        <el-select v-model="form.groupName" placeholder="请选择">
                            <el-option
                            v-for="item in groupList"
                            :key="item.gzlGroupId"
                            :label="item.gzlGroupName"
                            :value="item.gzlGroupId">
                            </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="审核状态">
                        <el-select v-model="form.statusName" placeholder="请选择">
                            <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>             
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="download">下载</el-button>
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
                        @click="toDetail(scope.$index, scope.row)">查看</el-button>                       
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
                groupName:'',
                statusName:''
            },
            options:[{value:1,label:'本人'},{value:2,label:'组内'}],
            statusList:[{value:0,label:'全部'},{value:2,label:'审核中'},{value:3,label:'审核驳回'},{value:4,label:'审核通过'},{value:5,label:'审核删除'}],
            groupList:[],
            tableData:[]
        }
    },
    mounted() {
        this.getGroupId()
    },
    methods:{
        onSearch() {          
            if(this.form.postName == 1) {
                this. getMyFormInfo()
            }else if(this.form.postName == 2){
                this.getGroupFormInfo()
            }
            
        },
        //表单列表—本人
        getMyFormInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetMyHistoryTaskListByUserId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                    groupId:self.form.groupName,
                    gzlStatus:self.form.statusName
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
            self.$http.get(self.api.gzlGetGroupHistoryTaskListByUserId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                    groupId:self.form.groupName,
                    gzlStatus:self.form.statusName
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
        // 查询当前工作流的group成员
        getGroupId() {
            this.form.postName = this.options[0].value   
            this.form.statusName = this.statusList[0].value   
            let self = this;
            self.$http.get(self.api.gzlGetMyGroupListByUserIdAndGalId, {
                params:{
                    gzlId:self.gzlId.gzlId,
                }
            }, function(data) {
                self.groupList = data.data
                self.form.groupName = data.data[0].gzlGroupId    
                self.getMyFormInfo()  
            }, function(response) {
                //失败回调
            })
        },
        //查看
        toDetail(index, row) {
            this.$router.push({
                path:`/history/detail/${row.gzlId}/${row.gzlFormId}`
            })
        },
        //下载
        download() {
            
        }
        
    }
}
</script>