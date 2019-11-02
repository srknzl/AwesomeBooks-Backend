import Vue from "vue";
import Vuex from "vuex";
import domain from "../utils/host";
import axios from "axios";
import router from "../router"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapsed: true,
    loggedIn: false,
    email: "",
    userid: "",
    exp: null
  },
  mutations: {
    collapseSidebar(state) {
      state.sidebarCollapsed = true;
    },
    expandSidebar(state) {
      state.sidebarCollapsed = false;
    },
    login(state, { userid, email, exp, redirect }) {
      state.loggedIn = true;
      state.email = email;
      state.userid = userid;
      state.exp = exp;
      if(redirect)
        router.push(redirect);
      else if(router.currentRoute.path !== "/welcome"){
        router.push("welcome");
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.email = "";
      state.userid = "";
      state.exp = null;
    }
  },
  actions: {
    async login(context, { form, redirect }) {
      let res;
      try {
        res = await axios.post(domain + "login", {
          ...form,
          redirect: redirect
        }, {
          timeout: 3000,
          withCredentials: true
        });
      }
      catch (err) {
        console.log(err);
      }
      if (res && res.status == 200) {
        context.commit("login", {
          userid: res.data.userid,
          email: res.data.email,
          exp: res.data.exp
        });
      }
    },
    async checklogin(context) {
      let res;
      try {
        res = await axios.post(domain + "checklogin", {}, {
          withCredentials: true,
          timeout: 3000
        });
      }
      catch (err) {
        console.log(err);
      }
      if (res && res.status == 200) {
        context.commit("login", {
          userid: res.data.userid,
          email: res.data.email,
          exp: res.data.exp
        });
      }
    }
  },
  modules: {}
});
