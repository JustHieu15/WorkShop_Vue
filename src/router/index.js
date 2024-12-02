import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/HomePage.vue'),
      meta: { requiredAuth: true, requiredAdmin: true },
      children: [
        {
          //  http://localhost:5173/admin
          path: '',
          name: 'dashboard',
          component: () => import('../views/Admin/Dashboard.vue'),
        }, {
          //  http://localhost:5173/admin/account
          path: 'account',
          name: 'account',
          component: () => import('../views/Admin/Account.vue')
        }, {
          //  http://localhost:5173/admin/category
          path: 'category',
          name: 'category',
          component: () => import('../views/Admin/Category/Category.vue')
        }, {
          //  http://localhost:5173/admin/add-category
          path: 'add-category',
          name: 'addCategory',
          component: () => import('../views/Admin/Category/AddCategory.vue')
        }, {
          //  http://localhost:5173/admin/update-category/2
          path: 'update-category/:idCategory',
          name: 'updateCategory',
          component: () => import('../views/Admin/Category/UpdateCategory.vue')
        },

        {
          //  http://localhost:5173/admin/product
          path: 'product',
          name: 'product',
          component: () => import('../views/Admin/Product/Product.vue')
        },
        {
          //  http://localhost:5173/admin/add-product
          path: 'add-product',
          name: 'addProduct',
          component: () => import('../views/Admin/Product/AddProduct.vue')
        },
        {
          //  http://localhost:5173/admin/add-product
          path: 'update-product/:id',
          name: 'updateProduct',
          component: () => import('../views/Admin/Product/UpdateProduct.vue')
        },
        {
          //  http://localhost:5173/admin/order
          path: 'order',
          name: 'order',
          component: () => import('../views/Admin/Order.vue')
        },
        {
          //  http://localhost:5173/admin/order
          path: '/order-detail/:order_id',
          name: 'orderDetailAdmin',
          component: () => import('../views/Admin/OrderDetail.vue')
        }
      ]
    }, {
      path: '/',
      name: 'user',
      component: () => import('../views/User/HomePage.vue'),
      children: [
        {
          // http://localhost:5173/
          path: '',
          name: 'trangchu',
          component: () => import('../views/User/Dashboard.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: 'san-pham/:idCategory',
          name: 'sanpham',
          component: () => import('../views/User/Product.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: 'san-pham-chi-tiet/:id',
          name: 'sanphamchitiet',
          component: () => import('../views/User/ProductDetail.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: '/giohang',
          name: 'giohang',
          component: () => import('../views/User/Cart.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: '/thanh-toan',
          name: 'thanhtoan',
          component: () => import('../views/User/Checkout.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: '/don-hang',
          name: 'donhang',
          component: () => import('../views/User/Order.vue')
        },
        {
          // http://localhost:5173/san-pham/1
          path: '/don-hang-chi-tiet/:order_id',
          name: 'donhangchitiet',
          component: () => import('../views/User/OrderDetail.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  let userLogin = localStorage.getItem("userLogin")
  if (to.meta.requiredAuth && userLogin == null) {
    next({ path: '/login' })
  } else {
    userLogin = JSON.parse(userLogin)
    if (to.meta.requiredAdmin && userLogin.role != 'admin') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})



export default router