import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path : "/auth",
    name : "Auth",
    component: () => import(/* webpackChunkName: "Help" */ '../views/Auth.vue')
    ,
    meta : {
      layout : 'auth',
      auth : false
    }
  },
  {
    path : "/",
    name : "Shop",
    component: () => import(/* webpackChunkName: "Shop" */ '../views/Shop.vue')
    ,
    meta : {
      layout : 'main',
      auth : false
    },
    alias: "/shop",
  },
  {
    path : "/product/:id?",
    name : "Product",
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product.vue')
    ,
    meta : {
      layout : 'main',
      auth : false
    }
  },
  {
    path : "/cart",
    name : "Cart",
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue')
    ,
    meta : {
      layout : 'main',
      auth : false
    }
  },
  {
    path : "/admin",
    name : "Admin",
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    redirect: { name: 'Products' }
    ,
    meta : {
      layout : 'admin',
      auth : false
    },
    children: [
      {
        path : "products",
        name : "Products",
        component: () => import(/* webpackChunkName: "AdminProducts" */ '../views/admin/AdminProducts.vue')
        ,
        meta : {
          layout : 'admin',
          auth : false
        }
      },
      {
        path : "editproduct/:id?",
        name : "EditProduct",
        component: () => import(/* webpackChunkName: "AdminProduct" */ '../views/admin/AdminEditProduct.vue')
        ,
        meta : {
          layout : 'admin',
          auth : false
        }
      },
      {
        path : "categories",
        name : "Categories",
        component: () => import(/* webpackChunkName: "AdminCategories" */ '../views/admin/AdminCategories.vue')
        ,
        meta : {
          layout : 'admin',
          auth : false
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass : 'active',
  linkExactActiveClass : 'active'
})

router.beforeEach((to, from, next) => {
  
  const requiredAuth = to.meta.auth
  if (requiredAuth && store.getters['auth/isAuthenticated']){
    next()
  } else if (requiredAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }

})


export default router
