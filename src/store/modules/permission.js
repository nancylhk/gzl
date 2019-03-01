import { routerMap, constantRouterMap } from '@/router'
import Layout from '@/views/Layout/Index'
import axios from 'axios';
import router from '@/router'
import store from '@/store/'
/**
 * 获取模块名称
 */
function getLoginMoudle() {
	return new Promise(function (resolve, reject) {
		axios.get('https://www.easy-mock.com/mock/5a5573d8982ef913bf06daac/example/user1#!method=get', {
			params: {}
		})
			.then(function (response) {
				resolve(response);
			})
			.catch(function (response) {
				return reject(response);
			})
	});
};
const permission = {
	state: {
		routers: constantRouterMap,
		addRouters: [],
		permission: false,
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
		},
		SET_PERMISSION: (state, flag) => {
			state.permission = flag
		}
	},
	actions: {
		GenerateRoutes({
			commit
		}) {
			return new Promise(resolve => {
				let tempRouter = []
				getLoginMoudle().then(function (res) {
					let routerList = res.data.data;
					if (res.errorCode == "system_login_noUserInfo") {
						store.dispatch('LogOut');
						location.reload();
					} else {
						// 动态添加路由数组
						if (routerList.length > 0) {
							commit('SET_PERMISSION', true)
							for (let i = 0; i < routerList.length; i++) {
								let moduleRouter = {
									path: '',
									component: Layout,
									redirect: '',
									children: [],
									name: routerList[i].menuId,
									meta: {
										title: routerList[i].menuName
									}
								}
								let flag = false;
								// 子菜单
								let routerChildren = routerList[i].childMenu;
								if (routerChildren.length == 0 && routerMap[routerList[i].menuId] != undefined) {
									moduleRouter.children.push(routerMap[routerList[i].menuId]);
									flag = true;

								} else {
									// 遍历三级菜单：列表、新增、编辑等
									for (let j = 0; j < routerChildren.length; j++) {
										let menuId = routerChildren[j].menuId;
										let subChildren =  routerChildren[j].childMenu;
										// 所有已配置的路由信息中存在相同menuId的
										if (routerMap[menuId] != undefined) {
											moduleRouter.children.push(routerMap[menuId]);
											flag = true;
										}
										if(subChildren.length > 0){
											for(let n = 0;n<subChildren.length;n++){
												let subMenuId = subChildren[n].menuId;
												if (routerMap[subMenuId] != undefined) {
													moduleRouter.children.push(routerMap[subMenuId]);
												}
											}	
										}

									}
								}
								if (flag) {
									tempRouter.push(moduleRouter);
								}

							}
							// 重定向路由
							let redirectModule = tempRouter[0].children;
							for (let i = 0; i < redirectModule.length; i++) {
								if (!redirectModule[i].hidden) {
									tempRouter[0].redirect = "/" + redirectModule[i].path;
									break
								}
							}
							router.push({
                                 path: '/'
						 })					
							commit('SET_ROUTERS', tempRouter)
							resolve()
						} else {
							commit('SET_PERMISSION', false)
							router.push({
								path: 'login'
							})
						}
					}

				}).catch(function onRejected(error) {
					console.error(error);
				});

			})
		}
	}
}

export default permission