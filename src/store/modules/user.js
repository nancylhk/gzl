import { getToken, setToken, removeToken } from '@/utils/auth'
import api from '../../api/api.js'
import axios from 'axios';
const user = {
	state: {
		status: '',
		token: getToken(),
		userInfo: {},
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_STATUS: (state, status) => {
			state.status = status
		},
		SET_USERINFO: (state, info) => {
			state.userInfo = info
		}

	},

	actions: {
		// 用户名登录
		LoginByUsername({
			commit
		}, userInfo) {
			commit('SET_TOKEN', userInfo)
			setToken(userInfo)
		},
		saveUserInfo({ commit }, userInfo) {
			commit('SET_USERINFO', userInfo)
		},		
		// 获取用户信息
		GetUserInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				axios.get(api.getUserInfo, {
					params: {}
				}).then(function(response) {
					commit('SET_USERINFO', response.data)
					resolve(response);
				}).catch(function(response) {
					return reject(response);
				}).catch(error => {
					reject(error)
				})

			})
		},

		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		},

	}
}

export default user
