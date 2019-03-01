import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({
	showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // 白名单

router.beforeEach((to, from, next) => {
	NProgress.start()
	if(store.getters.token) {
		if(to.path === '/login') {
			next({
				path: '/'
			})
			NProgress.done()
		} else {
			if(!store.getters.permission) { 
				store.dispatch('GenerateRoutes').then(() => {
					router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
					next({ ...to,
						replace: true
					})
				})
			}else {
				next();
			}

		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) { 
			next()
		} else {
			next('/login'); 
			NProgress.done(); 
		}
	}
})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})