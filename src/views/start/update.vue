<template>
    <div class="main-content">
        <div class="titBox">
            <span class="main-title">表单修改</span>
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
                                <div class="uploadBox">
                                    <el-upload
                                    class="upload-demo"
                                    :data='uploadData'
                                    :on-preview="handlePreview"
                                    :action="uploadPic"
                                    :file-list="fileList"
                                    list-type="picture">
                                    <el-button size="small" type="primary">上传附件</el-button>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </el-form-item>
                     
                        </div>
                    </el-col>  
                </el-row>
                <el-form-item class="handleBtn">
                    <el-button type="success" @click="onSave">保存</el-button>                  
                    <el-button type="success" @click="onSubmit">提交审核</el-button>
                    <el-button type="success" @click="goback">返回</el-button>
                </el-form-item>
            </el-form>
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
            formId:this.$route.params.gzlFormId,
            fileList:[],
            uploadData:{picTitle:'123'},
            dialogImageUrl: '',
            dialogVisible: false,
            gzlId:this.$route.params.gzlId,
        }
    },
    computed: {
        uploadPic() {
            return this.api.gzlInsertFormByDataMap
        }
    },
    mounted() {
        this.getFormInfo()
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //
        getFormInfo() {
            let self = this;
            self.$http.get(self.api.gzlGetFormById, {
                params:{
                    gzlId:self.gzlId,
                    formId:self.formId
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
        //保存
        onSave() {
            let self = this
            let params = new FormData()
            params.append('gzlId',self.gzlId)
            params.append('formId',self.formId)
            params.append('Field1',self.form.field1)
            params.append('Field2',self.form.field2)
            params.append('Field3',self.form.field3)
            params.append('Field4',self.form.field4)
            self.$http.post(self.api.gzlUpdateFormById,params,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            },function(data){
                if(data.status == 1){
                    self.$message.success('修改成功')
                }else{
                   
                }
                
            },function(response){
                self.$message.error('操作失败')
            })              
        },
        //提交审核
        onSubmit() {
            let self = this
            let params = new FormData()
            params.append('gzlId',self.gzlId)
            params.append('formId',self.formId)
            self.$http.post(self.api.gzlStart,params,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            },function(data){
                if(data.status == 1){
                   self.$message.success('提交成功，等待审核...')
                }else{
                   self.$message.error(data.msg)
                }              
            },function(response){//失败回调
                self.$message.error('操作失败')
            })
        },
        //返回
        goback() {
            this.$router.back(-1)
        }
    }
}
</script>
