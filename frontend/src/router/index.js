import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Shop from "../views/Shop";
import BookDetail from "../views/BookDetail";


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
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
