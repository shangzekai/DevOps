import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      // hideInMenu: true,
      icon: 'logo-buffer',
      title: '仪表盘',
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    component: Main,
    meta: {
      // hideInMenu: true,
      // access: ['super_admin'],
      icon: 'logo-buffer',
      title: '项目管理',
      notCache: true
    },
    children: [
      {
        path: '/project',
        name: 'project',
        meta: {
          hideInMenu: true,
          title: '项目管理',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/project/index.vue')
      }
    ]
  },
  {
    path: '/release',
    name: 'release',
    meta: {
      icon: 'logo-buffer',
      title: '代码发布',
    },
    component: Main,
    children: [
      {
        path: '/apply',
        name: 'apply',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '下发申请'
        },
        component: () => import('@/view/release/apply.vue')
      },
      {
        path: '/releaselist',
        name: 'releaselist',
        meta: {
          icon: 'md-trending-up',
          title: '发布列表'
        },
        component: () => import('@/view/release/list.vue')
      },
      {
        path: '/history',
        name: 'history',
        meta: {
          icon: 'md-trending-up',
          title: '发布历史'
        },
        component: () => import('@/view/release/history.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/usermanage',
    name: 'usermanage',
    meta: {
      icon: 'logo-buffer',
      title: '用户权限管理',
      role: ['admin']
    },
    component: Main,
    children: [
      {
        path: '/users',
        name: 'users',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '用户管理'
        },
        component: () => import('@/view/usermanage/users.vue')
      },
      {
        path: '/groups',
        name: 'groups',
        meta: {
          icon: 'md-trending-up',
          title: '用户组管理'
        },
        component: () => import('@/view/usermanage/groups.vue')
      }
    ]
  },
  {
    path: '/workorder',
    name: 'workorder',
    meta: {
      icon: 'logo-buffer',
      title: '工单系统'
    },
    component: Main,
    children: [
      {
        path: '/addorder',
        name: 'addorder',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '申请工单'
        },
        component: () => import('@/view/workorder/addorder.vue')
      },
      {
        path: '/handleorder',
        name: 'handleorder',
        meta: {
          icon: 'md-trending-up',
          title: '工单处理'
        },
        component: () => import('@/view/workorder/orderlist.vue')
      },
      {
        path: '/orderhistory',
        name: 'orderhistory',
        meta: {
          icon: 'md-trending-up',
          title: '工单历史'
        },
        component: () => import('@/view/workorder/orderhistory.vue')
      }
    ]
  },
  {
    path: '/autotask',
    name: 'autotask',
    meta: {
      icon: 'logo-buffer',
      title: '任务自动下发'
    },
    component: Main,
    children: [
      {
        path: '/addtask',
        name: 'addtask',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '添加ad-hoc任务'
        },
        component: () => import('@/view/autotask/addtask.vue')
      },
      {
        path: '/addplaybooktask',
        name: 'addplaybooktask',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '添加playbook任务'
        },
        component: () => import('@/view/autotask/addplaybooktask.vue')
      },
      {
        path: '/tasklist',
        name: 'tasklist',
        meta: {
          icon: 'md-trending-up',
          title: '任务列表'
        },
        component: () => import('@/view/autotask/tasklist.vue')
      }
    ]
  },
  // {
  //   path: '/bookmanage',
  //   name: 'bookmanage',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '图书管理测试'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/publisher',
  //       name: 'publisher',
  //       meta: {
  //         icon: 'md-arrow-dropdown-circle',
  //         title: '出版社管理'
  //       },
  //       component: () => import('@/view/bookmanage/publisher.vue')
  //     },
  //     {
  //       path: '/books',
  //       name: 'book',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '书籍管理'
  //       },
  //       component: () => import('@/view/bookmanage/book.vue')
  //     }
  //   ]
  // },

]
