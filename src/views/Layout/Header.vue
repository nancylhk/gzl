<template>
    <div class="top">
		<el-dropdown @command="handleCommand">
			<span class="el-dropdown-link">
                <img src="../../assets/img/userIcon.png" class="headImg" />
                <span class="headName">欢迎你，{{userName}}</span>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="a">修改密码</el-dropdown-item>
				<el-dropdown-item command="b">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName:'xxx'
        }
    },
    methods:{
        handleCommand(command) {
            if(command == 'a') {
                this.$router.push({
                    path: '/changePass/page'
                })
            }
            if(command == 'b') {
                let self = this;
                self.$http.get(self.api.logout, {
                    params: {}
                }, function(response) {
                    console.log(response)
                    if(response.data) {
                        self.$store.dispatch('LogOut');
                        self.$message({
                            type: 'success',
                            message: '退出成功，页面即将跳转至登录页',
                            duration: 1000,
                            onClose: function() {
                                location.reload();
                            }
                        });
                    } else {
                        self.$message({
                            type: 'error',
                            message: '退出失败',
                            duration: 1000
                        });
                    }

                }, function(response) {})
            }
        }
    }
}
</script>
