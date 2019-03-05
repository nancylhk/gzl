<template>
    <div class="main-content">
        <div class="titBox">
            <span class="main-title">驳回修改</span>
        </div>
        <div class="paddingBox">
            <el-form ref="form" :model="form" label-width="100px" class="formApply">
                <el-row :gutter="20">          
                    <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
                        <div>
                            <el-form-item label="字段1">
                                <el-input v-model="form.field1" class="formInput" ></el-input>
                            </el-form-item>
                            <el-form-item label="字段3">
                                <el-select v-model="form.field3" >
                                    <el-option label="有" value="1"></el-option>                                 
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
                        <div>
                            <el-form-item label="字段2">
                                <el-input v-model="form.field2"  class="formInput" ></el-input>
                            </el-form-item>
                            <el-form-item label="字段4">
                                <el-input v-model="form.field4"  class="formInput" ></el-input>
                            </el-form-item>
                     
                        </div>
                    </el-col>                          
                </el-row>                 
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
                        <div>
                            <el-form-item label="附件">
                                <div>
                                    <template v-for="item in fileList">
                                        <img :src="item.url" class="fujian" @click="handlePreview(item.url)"/>
                                    </template>                                 
                                </div>                             
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" >
                                </el-dialog>
                            </el-form-item>
                        
                        </div>
                    </el-col>  
                </el-row>
                <el-form-item class="handleBtn">
                    <el-button type="success" @click="goback">返回</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-table
                    :data="tableData"
                    stripe
                    class="tableDemo"
                    style="width: 100%">
                    <el-table-column
                    prop="commentTime"
                    label="审核时间"
                    min-width="280">
                    </el-table-column>
                    <el-table-column
                    prop="userName"
                    label="审核人"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="groupName"
                    min-width="180"
                    label="审核组名称">
                    </el-table-column>
                    <el-table-column
                    prop="action"
                    min-width="180"
                    label="操作">
                    </el-table-column>
                    <el-table-column
                    prop="fullMessage"
                    min-width="180"
                    label="审核意见">
                    </el-table-column>
                   
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
               field1:'',
               field2:'',
               field3:'',
               field4:'',
            },
            formId:'',
            fileList:[],
            tableData:[],
            uploadData:{picTitle:'123'},
            dialogImageUrl: '',
            dialogVisible: false,
            gzlId:this.$route.params.gzlId,
            gzlFormId:this.$route.params.gzlFormId
        }
    },
    computed: {
        uploadPic() {
            return this.api.gzlInsertFormByDataMap
        }
    },
    mounted() {
        this.getComment()
        this.getFormInfo()
        this.getPicInfo()
    },
    methods: {
        handlePreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        // 获取表单字段信息
        getFormInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetFormById, {
                params:{
                    gzlId:self.gzlId,
                    formId:self.gzlFormId
                }
            }, function(data) {
                self.form.field1 = data.data[0].field1
                self.form.field2 = data.data[0].field2
                self.form.field3 = data.data[0].field3
                self.form.field4 = data.data[0].field4
            }, function(response) {
                //失败回调
            })
        },
        // 获取附件列表
        getPicInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetFormAnnexListById, {
                params:{
                    gzlId:self.gzlId,
                    formId:self.gzlFormId
                }
            }, function(data) {
                self.fileList = data.data
                self.fileList.forEach((e)=>{
                    e.name = e.annexRealName
                    e.url = e.annexPath
                })
            }, function(response) {
                //失败回调
            })
        },
        // 审核信息列表
        getComment() {
            let self = this;
            self.$http.get(self.api.gzlGetHistoryCommentListByPiid, {
                params:{
                    gzlId:self.gzlId,
                    formId:self.gzlFormId
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
        //返回
        goback() {
            this.$router.back(-1)
        }
    }
}
</script>
