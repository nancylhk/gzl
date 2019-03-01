<template>
    <div>
        <div class="loginBox"> 
            <div>      
                <h1>工作流系统</h1>
                <div class="inputBox">
                    <img src="../../assets/img/user.png" class="icon">
                    <input type="text" class="input" placeholder="用户名" v-model="username"/>
                </div> 
                <div class="inputBox">
                    <img src="../../assets/img/pass.png" class="icon">
                    <input type="text" class="input" placeholder="密码" v-model="passward"/>
                </div> 
                <div class="inputBox">                  
                    <button class="input loginBtn" @click='handleLogin'>登录</button>
                </div>
            </div>     
        </div>
        <div class="bgBox">
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            username:'',
            passward:''
        }
    },
    methods:{
        handleLogin() {
            let self = this
            if(self.username == ''){
                self.$message.warning('请填写用户名')
            }else if(self.passward == ''){
                self.$message.warning('请填写密码')
            }else{           
                let params = new FormData()
                params.append('username',self.username)
                params.append('password',self.passward)
                self.$http.post(self.api.login,params,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },                  
                },function(response){                  
                    if(response.status == 1) {
                        self.$store.dispatch('LoginByUsername', response.status).then(() => {
                            self.loading = false                       
                            self.$store.dispatch('GenerateRoutes').then(() => {
                                self.$router.addRoutes(self.$store.getters.addRouters) // 动态添加可访问路由表
                                
                            })
                        }).catch(() => {
                            self.loading = false
                        })
                    //    self.$store.dispatch('saveUserInfo',response.data)
                    } else {
                        self.loading = false
                        self.$message({
                            type: 'error',
                            message: response.msg,
                            duration: 2000
                        })                          
                    }
                },function(res){
                    return false
                })
            }
        }
    }
}
</script>
<style scoped>

</style>
<style>

</style>
