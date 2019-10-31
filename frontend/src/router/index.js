import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import BookDetail from "../views/BookDetail";
import Login from "../views/Login";
import UserReset from "../views/UserReset";
import Signup from "../views/Signup";

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
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
