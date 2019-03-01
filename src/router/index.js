import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/views/Layout/Index'
const Login = r => require.ensure([], () => r(require('@/views/login/index')), 'login')
const ChangePass = r => require.ensure([], () => r(require('@/views/login/changePass')), 'login')
// 发起业务
const Apply = r => require.ensure([], () => r(require('@/views/start/apply')), 'start')
const List = r => require.ensure([], () => r(require('@/views/start/list')), 'start')
const Reject = r => require.ensure([], () => r(require('@/views/start/reject')), 'start')
const Update = r => require.ensure([], () => r(require('@/views/start/update')), 'start')
//审批
const Check = r => require.ensure([], () => r(require('@/views/check/index')), 'check')
//历史审批
const History = r => require.ensure([], () => r(require('@/views/history/index')), 'history')
// 工作流管理
const Workflow = r => require.ensure([], () => r(require('@/views/workflowManage/index')), 'workflowManage')
const reUpdate = r => require.ensure([], () => r(require('@/views/start/rejectUpdate')), 'start')
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/changePass',
    component: Layout,
    hidden:true,
    redirect:'/changePass/page',
    children:[
      {
        path:'page',
        component:ChangePass,
        hidden:true
      }
    ]
  },
]
export const routerMap = {
  '00001':{
    path:'start/list',
    component:List,
    name:'表单列表',
    meta: {
      title:'表单列表'
    }
  },
  '00002':{
    path:'start/list',
    component:List,
    name:'表单列表',
    meta: {
      title:'表单列表'
    }
  },
  '00003':{
    path:'start/apply',
    component:Apply,
    name:'表单录入',
    meta: {
      title:'表单录入'
    }
  },
  '00009':{
    path:'start/update/:gzlId/:gzlFormId',
    component:Update,
    name:'表单修改',
    meta: {
      title:'表单修改'
    },
    hidden:true
  },
  '00004':{
    path:'start/reject',
    component:Reject,
    name:'驳回业务',
    meta: {
      title:'驳回业务'
    }
  },
  '00010':{
    path:'start/reUpdate/:gzlId/:gzlFormId',
    component:reUpdate,
    name:'驳回修改',
    meta: {
      title:'驳回修改'
    },
    hidden:true
  },
  '00005':{
    path:'check/index',
    component:Check,
    name:'审批业务',
    meta: {
      title:'审批业务'
    }
  },
  '00006':{
    path:'history/index',
    component:History,
    name:'历史审批业务',
    meta: {
      title:'历史审批业务'
    }
  },
  '00007':{
    path:'workflow/index',
    component:Workflow,
    name:'工作流列表',
    meta: {
      title:'工作流列表'
    }
  },
  '00008':{
    path:'workflow/index',
    component:Workflow,
    name:'工作流列表',
    meta: {
      title:'工作流列表'
    }
  },
}
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
