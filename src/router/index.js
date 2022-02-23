import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
  //首页
  {
    path: '/',
    redirect: '/login'
  },
  //登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  //系统页面
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
    redirect: '/home',
    children: [
      //我的首页
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          breadList: [{
            name: '库存数据报警（< 50）',
          }]
        }
      },
      //账号管理
      {
        path: '/account',
        name: 'account',
        component: () => import('@/views/account/account.vue'),
        redirect: '/account/accountList',
        children: [
          //系统管理
          {
            path: '/account/accountList',
            name: 'accountList',
            component: () => import('@/views/account/accountList.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '系统管理',
                url: '#'
              }, {
                name: '账号管理',
              }], permissions: ['USER_LIST']
            }
          },
          //角色管理
          {
            path: '/account/roleSetting',
            name: 'roleSetting',
            component: () => import('@/views/account/roleSetting.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '系统管理',
                url: '#'
              }, {
                name: '角色设置',
              }], permissions: ['ROLE_LIST']
            }
          },
          //权限管理
          {
            path: '/account/addPermissions',
            name: 'addPermissions',
            component: () => import('@/views/account/addPermissions.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '系统管理',
                url: '#'
              }, {
                name: '新增权限列表',
              }], permissions: ['PERMISSION_LIST']
            }
          },
          //登陆日志管理
          {
            path: '/account/userLoginLog',
            name: 'userLoginLog',
            component: () => import('@/views/account/userLoginLog.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '系统管理',
                url: '#'
              }, {
                name: '登陆日志',
              }], permissions: ['USER_LOGIN_LOG_LIST']
            }
          },
          //DB日志管理
          {
            path: '/account/dbBackLog',
            name: 'dbBackLog',
            component: () => import('@/views/account/dbBackLog.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '系统管理',
                url: '#'
              }, {
                name: '数据库日志',
              }], permissions: ['DB_BACK_LOG_LIST']
            }
          }

          ,
          //基础设置药品管理
          {
            path: '/drug/list',
            name: 'drugList',
            component: () => import('@/views/drug/list.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '基础设置',
                url: '#'
              }, {
                name: '药品管理',
              }], permissions: ['DRUG_LIST']
            }
          }, 
          {
            path: '/drugType/list',
            name: 'drugTypeList',
            component: () => import('@/views/drug/typeList.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '基础设置',
                url: '#'
              }, {
                name: '药品剂型管理',
              }], permissions: ['DRUG_TYPE_LIST']
            }
          }, 
          {
            path: '/customerType/list',
            name: 'customerTypeList',
            component: () => import('@/views/customer/customerTypeList.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '基础设置',
                url: '#'
              }, {
                name: '客人类型管理',
              }], permissions: ['CUSTOMER_TYPE_LIST']
            }
          }
        ]
      }, 
      // 药库实时列表
      {
        path: '/storage/list',
        name: 'storageList',
        component: () => import('@/views/storage/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '药库管理',
            url: '#'
          }, {
            name: '药库库存',
          }], permissions: ['STORAGE_LIST'
        ]
        }
      }, // 药库操作日志列表
      {
        path: '/storageLog/list',
        name: 'storageLogList',
        component: () => import('@/views/storageLog/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '药库管理',
            url: '#'
          }, {
            name: '药库操作管理',
          }], permissions: ['STORAGE_LOG_LIST']
        }
      },
      //物资管理-列表
          {
            path: '/goods/list',
            name: 'goodsList',
            component: () => import('@/views/goods/list.vue'),
            meta: {
              breadList: [{
                name: '首页',
                url: '/home'
              }, {
                name: '物资管理',
                url: '#'
              }, {
                name: '物资列表',
              }], permissions: ['GOODS_LIST']
            }
          },
           // 物资库存实时列表
      {
        path: '/goodsStorage/list',
        name: 'goodsStorageList',
        component: () => import('@/views/goodsStorage/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '物资管理',
            url: '#'
          }, {
            name: '物资库存',
          }], permissions: ['GOODS_STORAGE_LIST']
        }
      }, // 物资管理-操作日志列表
      {
        path: '/goodsStorageLog/list',
        name: 'goodsStorageLogList',
        component: () => import('@/views/goodsStorageLog/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '物资管理',
            url: '#'
          }, { 
            name: '物资操作管理',
          }], permissions: ['GOODS_STORAGE_LOG_LIST'] 
        }
      },
      // 药房库存实时列表
      {
        path: '/roomStorage/list',
        name: 'roomStorageList',
        component: () => import('@/views/roomStorage/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '药房管理',
            url: '#'
          }, {
            name: '药房库存',
          }], permissions: ['ROOM_STORAGE_LIST']
        }
      }, // 药房管理-操作日志列表
      {
        path: '/roomStorageLog/list',
        name: 'roomStorageLogList',
        component: () => import('@/views/roomStorageLog/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '药房管理',
            url: '#'
          }, { 
            name: '药房操作管理',
          }], permissions: ['ROOM_STORAGE_LOG_LIST'] 
        }
      },
       // 发药列表
       {
        path: '/roomSend/list',
        name: 'roomSendList',
        component: () => import('@/views/roomSend/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '药房管理',
            url: '#'
          }, {
            name: '发药记录',
          }], permissions: ['ROOM_SEND_LIST']
        }
      },
       // 挂号列表
       {
        path: '/register/list',
        name: 'registerList',
        component: () => import('@/views/register/list.vue'),
        meta: {
          breadList: [{
            name: '首页',
            url: '/home'
          }, {
            name: '挂号管理',
            url: '#'
          }, {
            name: '挂号列表',
          }], permissions: ['REGISTER_LIST']
        }
      }, 
    ]
  },
  // 403
  {

    path: '/error/403',
    name: '403',
    component: resolve => require(['@/views/error/error403.vue'], resolve),
  },
  // 500
  {
    path: '/error/500',
    name: '500',
    component: resolve => require(['@/views/error/error500.vue'], resolve),
  },
  // 404 放到最后
  {
    path: '*',
    name: '404',
    component: resolve => require(['@/views/error/error404.vue'], resolve),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


/* 免登录白名单页面 */
const whiteList = [
  '/error/403',
  '/error/404',
  '/error/500',
  '/login',
]

//路由守卫
router.beforeEach(async (to, from, next) => {
  const isLogin = localStorage.getItem("auth-user") ? true : false;//判断是否登录
  if (to.path === '/login') {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      isLogin ? next() : next("/login");
    }

  }
})


//阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default router
