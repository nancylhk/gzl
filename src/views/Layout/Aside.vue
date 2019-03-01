<template>
    <div class="left">
        <div class="logo">工作流系统</div>
        <div>
            <el-menu
            default-active="2"
            router
            class="el-menu-vertical-demo"
            text-color="#333"
            active-text-color="#177fec">
               <template v-for="item in routes" v-if="!item.hidden ">
                    <el-menu-item :index="'/'+item.children[0].path" v-if="hasOneShowingChildren(item.children)">
                        <span slot="title">{{item.meta.title}}</span>
                    </el-menu-item>
                    <el-submenu :index="item.name" :key="item.name" v-else >
                        <template slot="title">
                            <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
                        </template>
                        <template v-for="child in item.children" v-if="!child.hidden" >				
                            <!-- <router-link :to="item.path + '/'+child.path+'/0'" :key="child.name"> -->
                                <el-menu-item :index="item.path + '/'+child.path.split('/')[0]+'/'+child.path.split('/')[1]">
                                    <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
                                </el-menu-item>
                            <!-- </router-link> -->
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
     computed: {
        routes() {
            return this.$store.getters.permission_routers
        }
    },
    mounted() {
        this.console()
    },
    methods: {
        console() {
            // console.log(this.routes)
        },
        hasOneShowingChildren(children) {  
            // console.log(children)        
            const showingChildren = children.filter(item => {
                return !item.hidden
            })
            if(showingChildren.length === 1) {
                return true
            }
            return false
        },	
    }
}
</script>
