import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import domain from "../utils/host";

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
    collapseSidebar(state){
      state.sidebarCollapsed = true;
    },
    expandSidebar(state){
      state.sidebarCollapsed = false;
    },
    login(state,{ userid, email, exp }){
      state.loggedIn = true;
      state.email = email;
      state.userid = userid;
      state.exp = exp;
    },
    logout(state){
      state.loggedIn = false;
      state.email = "";
      state.userid = "";
      state.exp = null;
    }
  },
  actions: {
    async login (context,{ form }){
      try {
        const res = await axios.post(domain + "login", {
          ...form
        }, {
          timeout: 3000,
          withCredentials: true
        });
        if (res.status == 200) {
          context.commit("login",{
            userid: res.data.userid,
            email: res.data.email,
            exp: res.data.exp
          });
        }
      }
      catch (err) {
        console.log(err);
      }
    },
    async checklogin(context){
      try {
        const res = await axios.post(domain + "checklogin",{},{
          withCredentials: true,
          timeout: 3000
        });
        if (res.status == 200) {
          context.commit("login",{
            userid: res.data.userid,
            email: res.data.email,
            exp: res.data.exp
          });
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  },
  modules: {}
});
