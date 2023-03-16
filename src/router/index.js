import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'Login',
    props: true,
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/400',
    component: () => import('@/views/error-page/400'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', affix: true },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sales',
    component: Layout,
    redirect: '/sales',
    meta: {
      icon: 'form',
      title: 'Penjualan',
      roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR']
    },
    children: [
      {
        path: 'invoices/list',
        component: () => import('@/views/error-page/404'),
        name: 'InvoiceList',
        props: true,
        meta: { title: 'Faktur', icon: 'form', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'] }
      },
      {
        path: 'invoices/create',
        component: () => import('@/views/error-page/404'),
        name: 'CreateInvoice',
        props: true,
        hidden: true,
        meta: { title: 'Create Faktur', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/sales/invoices/list' },
      },
      {
        path: 'customers/list',
        component: () => import('@/views/error-page/404'),
        name: 'CustomerList',
        props: true,
        meta: { title: 'Pelanggan', affix: true, icon: 'form', roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR']},
      },
      {
        path: 'customers/create',
        component: () => import('@/views/error-page/404'),
        name: 'CreateCustomer',
        props: true,
        hidden: true,
        meta: { title: 'Create Pelanggan', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/sales/customers/list' },
      }
    ]
  },
  {
    path: '/purchase',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      icon: 'form',
      title: 'Procurement',
      roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR']
    },
    children: [
      // bills
      {
        path: 'bills/list',
        component: () => import('@/views/purchase/bills'),
        name: 'BillList',
        props: true,
        meta: { title: 'Pembelian', icon: 'form', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'] }
      },
      {
        path: 'bills/create',
        component: () => import('@/views/purchase/bills/create'),
        name: 'CreateBill',
        props: true,
        hidden: true,
        meta: { title: 'Create Pembelian', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/bills/list' },
      },
      {
        path: 'bills/edit',
        component: () => import('@/views/purchase/bills/create'),
        name: 'EditBill',
        props: true,
        hidden: true,
        meta: { title: 'Edit Pembelian', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/bills/list' },
      },
      // operational
      {
        path: 'operational/list',
        component: () => import('@/views/purchase/operational'),
        name: 'OperationalList',
        props: true,
        meta: { title: 'Operasional', icon: 'form', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'] }
      },
      {
        path: 'operational/create',
        component: () => import('@/views/purchase/operational/create'),
        name: 'CreateOperational',
        props: true,
        hidden: true,
        meta: { title: 'Create Operasional', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/operational/list' },
      },
      {
        path: 'operational/create-saldo',
        component: () => import('@/views/purchase/operational/create_saldo'),
        name: 'CreateSaldo',
        props: true,
        hidden: true,
        meta: { title: 'Create Saldo', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/operational/list' },
      },
      {
        path: 'operational/history-saldo',
        component: () => import('@/views/purchase/operational/history_saldo'),
        name: 'HistorySaldo',
        props: true,
        hidden: true,
        meta: { title: 'History Saldo', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/operational/list' },
      },
      {
        path: 'operational/edit',
        component: () => import('@/views/purchase/operational/create'),
        name: 'EditOperational',
        props: true,
        hidden: true,
        meta: { title: 'Edit Operasional', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/operational/list' },
      },
      // supplier
      {
        path: 'supplier/list',
        component: () => import('@/views/purchase/supplier'),
        name: 'SupplierList',
        props: true,
        meta: { title: 'Supplier', affix: true, icon: 'form', roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR']},
      },
      {
        path: 'supplier/create',
        component: () => import('@/views/purchase/supplier/create'),
        name: 'CreateSupplier',
        props: true,
        hidden: true,
        meta: { title: 'Create Supplier', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'],  activeMenu: '/purchase/supplier/list' },
      },
      {
        path: 'supplier/item/list',
        component: () => import('@/views/items/index'),
        name: 'ItemList',
        props: true,
        hidden: true,
        meta: { title: 'Barang', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'], activeMenu: '/purchase/supplier/list' }
      },
      {
        path: 'supplier/item/create',
        component: () => import('@/views/items/create'),
        name: 'ItemCreate',
        props: true,
        hidden: true,
        meta: { title: 'Create Item', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'], activeMenu: '/purchase/supplier/list' },
      },
      {
        path: 'supplier/item/edit',
        component: () => import('@/views/items/create'),
        name: 'ItemEdit',
        props: true,
        hidden: true,
        meta: { title: 'Edit Item', affix: true, roles: ['SUPERADMIN', 'ADMINISTRATOR', 'OPERATOR'], activeMenu: '/purchase/supplier/list' },
      }
    ]
  },
  // {
  //   path: '/admin-management',
  //   component: Layout,
  //   redirect: '/admin-management/list',
  //   name: 'AdminManagement',
  //   meta: {
  //     title: 'Admin Management',
  //     icon: 'user-gear',
  //     roles: ['SUPERADMIN', 'ADMINISTRATOR']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'AdminList',
  //       component: () => import('@/views/admin-management/index'),
  //       meta: { title: 'Admin Mng.', roles: ['SUPERADMIN', 'ADMINISTRATOR'] }
  //     },
  //     {
  //       path: 'create-admin',
  //       name: 'CreateAdmin',
  //       component: () => import('@/views/admin-management/create-admin'),
  //       meta: { title: 'Create Admin', roles: ['SUPERADMIN', 'ADMINISTRATOR'], activeMenu: '/admin-management/list' },
  //       hidden: true
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
