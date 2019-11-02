import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import BookDetail from "../views/BookDetail";
import Login from "../views/Login";
import UserReset from "../views/UserReset";
import Signup from "../views/Signup";
import Welcome from "../views/Welcome";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  {
    path: "/shop",
    name: "shop",
    component: Shop
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: BookDetail
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/resetPassword",
    name: "userreset",
    component: UserReset
  },
  {
    path: "/welcome",
    name: "userwelcome",
    component: Welcome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to ,from ,next) => {
      store.dispatch("logout");
      next();
    },
    redirect: "/"
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
})


export default router;
